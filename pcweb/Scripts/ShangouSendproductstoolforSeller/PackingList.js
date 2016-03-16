/*=======================PackingList.js===========================*/
var PackingList;

function RefreshResult(obj) {
    if (obj == null || obj.length == 0) {
        alert("很抱歉，没有找到符合条件的记录！");
        $('#selectedResult').html('');
        $('.exportDiv').hide();
        $('.ResultLine').hide();
    } else {
        $('.delk').remove();
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].UnShow == 1) {
                $('#lCompany').append('<input type="checkbox" class="l checkLCompany delk" /><label class="r m4 delk">' + obj[i].LogisticsProvider + '</label>');
            } else {
                $('#lCompany').append('<input type="checkbox" checked class="l checkLCompany delk" /><label class="r m4 delk">' + obj[i].LogisticsProvider + '</label>');
            }
        }
        $('#selectedResult').html('');
        $('#selectedResult').html($('#packList').tmpl(obj));
        $('.exportDiv').show();
        $('.ResultLine').show();
    }
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

$(function () {
    $("#SendDataBegin").datepicker();
    $("#SendDataEnd").datepicker();

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
            SendTimeEnd: $('#SendDataEnd').val() + " " + $('#SendHourEnd').val() + " :59:00",
            Sended: true,
            SendType: GetSendTypes(),
            OrderType: $('input.filterOrderType:checked').val()
        };
        $.ajax({
            url: "/SendProductsToolForSeller/GetPackingList",
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

    $('.exportBtn').click(function () {
        var BillCodes = [];
        for (var i = 0; i < PackingList.length; i++) {
            for (var j = 0; j < PackingList[i].Bills.length; j++) {
                var OneBillCode = {
                    BillCode: PackingList[i].Bills[j].BillCode,
                    OrderIds: []
                };
                for (var k = 0; k < PackingList[i].Bills[j].Orders.length; k++) {
                    OneBillCode.OrderIds.push(PackingList[i].Bills[j].Orders[k].OrderId);
                }
                if (PackingList[i].UnShow != 1) {
                    BillCodes.push(OneBillCode);
                }
            }
        }
        var subPara = $.toJSON(BillCodes);
        $('#formExport').find('input[name="billCodes"]').val(subPara);
        $('#formExport').submit();
        //$.ajax({
        //    url: "/SendProductsToolForSeller/CreatePackingList",
        //    type: "POST",
        //    data: subPara,
        //    contentType: 'application/json',
        //    dataType: "json",
        //    async: false,
        //    success: function () {
        //    }
        //});
    });
});

