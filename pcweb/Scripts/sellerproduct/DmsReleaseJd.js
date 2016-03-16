/*=======================DmsReleaseJd.js===========================*/
function GetDmsCatalogs() {
    var catalogs = [];
    if ($('#OneCatalogProperty').val() == "y") {
        var catalog = {
            CatalogId: $('#OneCatalogId').val(),
            Price: $('#OneCatalogPrice').val(),
            LimitNum: $('input[name=LimitNum]').val(),
            StockNum: $('#OneCatalogStock').val()
        };
        if ($('#OneCatalogStock').attr('disabled')) {
            catalog.StockNum = -1;
        }
        catalogs.push(catalog);
    }
    else {
        $('#set-price tbody tr').each(function () {
            var stocknum = -1;
            if ($('#isEdit').val() != "y") {
                stocknum = $(this).find('input[name=StockNum]').val();
            }
            else if ($(this).find('input[name=StockNum]').hasClass('newstock')) {
                stocknum = $(this).find('input[name=StockNum]').val();
            }
            var catalog = {
                CatalogId: $(this).attr('data'),
                Price: $(this).find('input[name=price]').val(),
                LimitNum: $('input[name=LimitNum]').val(),
                StockNum: stocknum
            };
            catalogs.push(catalog);
        });
    }
    return catalogs;
}

function GetDesProperties() {
    var properties = [];
    $('tr.CategoryProperty select').each(function () {
        var propertyValue = $(this).find('option:selected').val().split(":");
        var property = {
            PropertyId: $(this).parent().find('input.PropertySourceId').val(),
            PropertyName: $(this).parent().find('input.PropertyName').val(),
            Value: {
                PropertyValueSourceId: propertyValue[0],
                PropertyValueId: "",
                PropertyValue: propertyValue[1]
            }
        };
        properties.push(property);
    });
    return properties;
}

function GetCheckAndSubData(redUrl) {
    //获取数据
    var firstPic = $("#ProductPictureUrl1").val();
    var pics = [];
    if(firstPic!="") {
        pics.push(firstPic);
    }
    var subData = {
        GroupId: $('#GroupId').val(),
        ProductId: $('#ProductId').val(),
        IsNew: $('#isEdit').val() != "y",
        ProductName: $('#ProductName').val(),
        ProductDescript: kissyEditor.get("data"),
        PictureUrls: pics,
        Flight: $('input[name=ProductFlight]').val(),
        DesProperties: GetDesProperties(),
        IsManualStock: $('#IsManualInventory').val(),
        
        Length: $('#Length').val(),
        Widht: $('#Widht').val(),
        Height: $('#Height').val(),
        Weight: $('#Weight').val(),
//        JingdongPrice: $('#JingdongPrice').val(),
        CostPrice: $('#CostPrice').val(),
        MarketPrice: $('#MarketPrice').val(),
        
        Catalogs: GetDmsCatalogs()
    };
    //验证
    var errMsg = "";
    var errIndex = 1;
    function addErrMsg(msg) {
        errMsg += errIndex + "、" + msg + "<br />";
        errIndex++;
    }
    if (subData.ProductName == "") {
        addErrMsg("请填写商品名称");
    }
    if (firstPic == "") {
        addErrMsg("请上传商品图片");
    }
    for (var j = 0; j < subData.Catalogs; j++) {
        if (isNaN(subData.Catalogs[j].Price)) {
            addErrMsg("请填写正确的售价");
        } else if (subData.Catalogs[j].Price <= 0) {
            addErrMsg("请填写正确的售价");
        }
    }
    var r=/^\+?[1-9][0-9]*$/;
    if (!r.test(subData.Length)) {
        addErrMsg("商品长度必须为正整数");
    }
    if (!r.test(subData.Widht)) {
        addErrMsg("商品宽度必须为正整数");
    }
    if (!r.test(subData.Height)) {
        addErrMsg("商品高度必须为正整数");
    }
    if (!r.test(subData.Weight)) {
        addErrMsg("商品重量必须为正整数");
    }
//    if (!r.test(JingdongPrice)) {
//        addErrMsg("京东价格必须为正整数");
//    }
    if (subData.CostPrice!=''&&!r.test(subData.CostPrice)) {
        addErrMsg("进货价格必须为正整数");
    }
    if (!r.test(subData.MarketPrice)) {
        addErrMsg("市场价格必须为正整数");
    }
    if (errMsg != "") {
        $('#ErrorMsgs').html(errMsg);
        $('#ErrorMsgDiv').show();
        scroll(0, 0);
        return false;
    }
    //提交
    $.ajax({
        url: "/DMSProductAdd/SaveJdProduct",
        type: "POST",
        dataType: "json",
        data: $.toJSON(subData),
        contentType: 'application/json',
        success: function (data) {
            if (data.result == true) {
                alert('保存成功');
                //if ($('#IsFromAddDistribute').val() == 'True' && $('#IsManualInventory').val() == 'True') {
                //    if (confirm('请启用智能模式进行库存管理！智能模式下您只需管理商品的总库存，渠道管理系统将按照各渠道的销量自动分配库存。确定则启用智能模式管理库存，取消则继续手动管理库存。')) {
                //        $.ajax({
                //            url: "/DMSProduct/SetToAutoInventory?groupId=" + $('#GroupId').val(),
                //            type: "POST",
                //            dataType: "json",
                //            success: function (d) {
                //                if (d.result == true) {
                //                    alert('智能模式启用成功');
                //                } else {
                //                    alert('智能模式启用失败：' + d.msg);
                //                }
                //            }
                //        });
                //    }
                //}
                if (redUrl == "") {
                    location.href = "/DMSProduct/List";
                }
                else {
                    location.href = redUrl;
                }
            }
            else {
                alert('保存失败：' + data.message);
            }
        }
    });
    return false;
}

$(function () {
    $('#SaveToNext').click(function () {
        GetCheckAndSubData($('#NextUrl').val() + '&distributor=' + $(this).attr('data'));
    });
    $('#SaveToNextFromEditCatalog').click(function () {
        GetCheckAndSubData($('#NextUrl').val() + "&fc=true" + '&distributor=' + $(this).attr('data'));
    });
    $('#SaveToNextFromAddDistributor').click(function () {
        GetCheckAndSubData($('#NextUrl').val() + "&fromAddDistribute=true" + '&distributor=' + $(this).attr('data'));
    });
    $('#SaveToList').click(function () {
        GetCheckAndSubData("");
    });
    

    $('.distributorTag').click(function () {
        GetCheckAndSubData($(this).attr('data'));
    });
    if($('#IsFromEditCatalog').val()=='true') {
        location.hash = "StockNum";
    }
});



