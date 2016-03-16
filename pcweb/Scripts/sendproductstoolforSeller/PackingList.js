/*=======================PackingList.js===========================*/
var PackingList;
var CountInPage = 50;
var CurrentPage = 1;
var CurrentPageData = [];
var BillsTotalCount = 0;

function RefreshResult(obj) {
    if (obj == null || obj.length == 0) {
        alert("很抱歉，没有找到符合条件的记录！");
        $('#selectedResult').html('');
        $('.exportDiv').hide();
        $('.ResultLine').hide();
        $('.PageList').hide()
    } else {
        BillsTotalCount = 0;
        CurrentPageData = [];
        $('.delk').remove();
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].UnShow == 1) {
                $('#lCompany').append('<input type="checkbox" class="l checkLCompany delk" id="CheckBoxCompany' + i + '" /><label for="CheckBoxCompany' + i + '" class="r m4 delk">' + obj[i].LogisticsProvider + '</label>');
            } else {
                BillsTotalCount += obj[i].Bills.length;
                $('#lCompany').append('<input type="checkbox" checked class="l checkLCompany delk" id="NoneCheckBoxCompany' + i + '" /><label for="NoneCheckBoxCompany' + i + '" class="r m4 delk">' + obj[i].LogisticsProvider + '</label>');
            }
        }

        obj = PageList();

        $('#selectedResult').html('');
        $('#selectedResult').html($('#packList').tmpl(obj));
        $('.exportDiv').show();
        $('.ResultLine').show();
    }
}

function PageList() {
    
    var count = 0;
    var poor = 0;
    var pageount = Math.ceil(BillsTotalCount / CountInPage);
    var obj = null;
    var isEnd = !1;
    var isToStart = !0;

    CurrentPage = CurrentPage > pageount ? pageount : CurrentPage < 1 ? 1 : CurrentPage;

    var firstIndex = (CurrentPage - 1) * CountInPage, lastIndex = CurrentPage * CountInPage;

    if (pageount > 1) {
        PageListHandle(pageount);
    } else {
        $('.PageList').hide()
    }

    for (var i = 0, len1 = PackingList.length; i < len1; i++) {
        if (!PackingList[i].UnShow) {
            if (isEnd) {
                break;
            }
            obj = {};
            obj.LogisticsProvider = PackingList[i].LogisticsProvider;
            obj.UnShow = PackingList[i].UnShow;
            obj.Bills = [];

            var bills = PackingList[i].Bills;
            for (var j = 0, len2 = bills.length; j < len2; j++) {
                if (count >= firstIndex) {
                    isToStart = !0;
                    if (count == lastIndex) {
                        isEnd = !0;
                        break;
                    }
                    obj.Bills.push(bills[j]);
                } else {
                    isToStart = !1;
                }
                count++;
            }
            if (isToStart) {
                CurrentPageData.push(obj);
            }
        }
    }
    return CurrentPageData;
}

function PageListHandle(pageount) {
    $('.TotalCount').html(BillsTotalCount);
    $('.TotalPageCount').html(pageount);
    $('.CurrentPage').html(CurrentPage);
    $('.PageList').show();
}

function GetSendTypes() {
    var r = [];
    $('input[name=SendType]:checked').each(function () {
        r.push($(this).val());
    });
    return r;
}

function RemoveBill(billCode) {
    var breakKey = false;
    for (var i = PackingList.length - 1; i >= 0; i--) {
        for (var j = 0; j < PackingList[i].Bills.length; j++) {
            if (PackingList[i].Bills[j].BillCode == billCode) {
                PackingList[i].Bills.splice(j, 1);
                breakKey = true;
                break;
            }
        }
        if (PackingList[i].Bills.length == 0) {
            PackingList.splice(i, 1);
        }
        if (breakKey) {
            break;
        }
    }
    RefreshResult(PackingList);
}
/*从相关同名页面提出*/
function getBillCodes() {
    var BillCodes = [];
    var data = CurrentPageData.length > 0 ? CurrentPageData : PackingList;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].Bills.length; j++) {
            var OneBillCode = {
                BillCode: data[i].Bills[j].BillCode,
                OrderIds: []
            };
            for (var k = 0; k < data[i].Bills[j].Orders.length; k++) {
                OneBillCode.OrderIds.push(data[i].Bills[j].Orders[k].OrderId);
            }
            if (data[i].UnShow != 1) {
                BillCodes.push(OneBillCode);
            }
        }
    }
    return BillCodes;
}

$(function () {

    //分页事件
    $('.PageList .PrevPage').bind('click', function () {
        CurrentPage--;
        RefreshResult(PackingList);
        return false;
    })
    $('.PageList .NextPage').bind('click', function () {
        CurrentPage++;
        RefreshResult(PackingList);
        return false;
    })

    $("#SendDataBegin").datepicker();
    $("#SendDataEnd").datepicker();

    $('.buttonExportPackingDetail').click(function () {
        var BillCodes = getBillCodes();
        var subPara = $.toJSON(BillCodes);
        $('#formExportPackingDetail').find('input[name="billCodes"]').val(subPara);
        $('#formExportPackingDetail').submit();
    });

    $('.checkLCompany').live("click", function () {
        var provider = $(this).next().html();
        for (var i = 0; i < PackingList.length; i++) {
            if (PackingList[i].LogisticsProvider == provider) {
                if ($(this).attr('checked')) {
                    PackingList[i].UnShow = 0;
                }
                else {
                    PackingList[i].UnShow = 1;
                }
            }
        }
        RefreshResult(PackingList);
    });

    $('#submitBtn').click(function () {

        var params = {
            SendTimeBegin: $('#SendDataBegin').val() + " " + $('#SendHourBegin').val() + ":00:00",
            SendTimeEnd: $('#SendDataEnd').val() + " " + $('#SendHourEnd').val() + ":59:00",
            Sended: true,
            //SendType: GetSendTypes(),
            CatalogStatus: getCatalogStatus(),
            OrderTypes: GetOrderTypes()
            //OrderType: $('input.filterOrderType:checked').val()
        };
        var app = "";
        if (location.href.toLowerCase().indexOf('app') > 0) {
            app = "/app";
        }
        $.ajax({
            url: app + '/SendProductsToolForSeller/GetPackingList',
            type: "POST",
            data: $.toJSON(params),
            contentType: 'application/json',
            dataType: "json",
            async: false,
            success: function (spa) {
                PackingList = spa;
                RefreshResult(PackingList);
            }
        });
    });

    function getCatalogStatus() {
        var r = [];
        $('input[name=CatalogStatu]:checked').each(function () {
            r.push($(this).val());
        });
        return r;
    }

    function GetOrderTypes() {
        var r = [];
        $('input[name=OrderType]:checked').each(function () {
            r.push($(this).val());
        });
        return r;
    }

    $('.exportBtn').click(function () {
        var BillCodes = [];
        var data = CurrentPageData.length > 0 ? CurrentPageData : PackingList;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].Bills.length; j++) {
                var OneBillCode = {
                    BillCode: data[i].Bills[j].BillCode,
                    OrderIds: []
                };
                for (var k = 0; k < data[i].Bills[j].Orders.length; k++) {
                    OneBillCode.OrderIds.push(data[i].Bills[j].Orders[k].OrderId);
                }
                if (data[i].UnShow != 1) {
                    BillCodes.push(OneBillCode);
                }
            }
        }
        var subPara = $.toJSON(BillCodes);
        $('#formExport').find('input[name="billCodes"]').val(subPara);
        $('#formExport').submit();
    });
});

