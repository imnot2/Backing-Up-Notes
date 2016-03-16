/*=======================DmsReleaseYmt.js===========================*/
function GetDesProperties() {
    var properties = [];
    $('#ProductPropertyBox div.node .propertyName').each(function () {
        var name = $(this).val();
        var value = $(this).next().val();
        var property = {
            PropertyId: "",
            PropertyName: name,
            Value: {
                PropertyValueSourceId: "",
                PropertyValueId: "",
                PropertyValue: value
            }
        };
        if (name != "" && name != "属性名称" && value != "" && value != "属性内容") {
            properties.push(property);
        }
    });
    return properties;
}

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
function GetCheckAndSubData(redUrl) {
    //获取数据
    var pics = [];
    var firstPic = "";
    var otherPics = [];
    $('input[name=selectMainPic]').each(function () {
        var picUrl = $(this).parent().parent().find('input.PicUrl').val();
        if ($(this).attr('checked') == true && picUrl != "") {
            firstPic = picUrl;
        } else if (picUrl != "") {
            otherPics.push(picUrl);
        }
    });
    if (firstPic != "") {
        pics.push(firstPic);
        for (var i = 0; i < otherPics.length; i++) {
            pics.push(otherPics[i]);
        }
    }
    //var validStartTime = $('#ValidStartDate').val() + " " + $('#ValidStartHour').val() + ":" + $('#ValidStartMin').val() + ":00";
    //var validEndTime = $('#ValidEndDate').val() + " " + $('#ValidEndHour').val() + ":" + $('#ValidEndMin').val() + ":00";
    var validStartTime = "2013-4-1 12:12:00";
    var validEndTime = "2014-4-1 12:12:00";
    if ($('input[name=OnSaleType]:checked').val()=="-1") {
        var timetext = $('#OldValidTime').val();
        validStartTime = timetext.split('|')[0];
        validEndTime = timetext.split('|')[1];
    }

    var subData = {
        GroupId: $('#GroupId').val(),
        ProductId: $('#ProductId').val(),
        IsNew: $('#isEdit').val() != "y",
        ProductName: $('#ProductName').val(),
        ProductDescript: kissyEditor.get("data"),
        PictureUrls: pics,
        //OnSaleType: $('input[name=OnSaleType]:checked').val(),
        OnSaleType:0,
        ValidStart: validStartTime,
        ValidEnd: validEndTime,
        NeedFlight: $('input[name=productFreight]:checked').val(),
        Flight: $('input[name=ProductFlight]').val(),
        CatalogStatus: $('input[name=CatalogStatus]:checked').val(),
        CatalogType: $('input[name=CatalogType]:checked').val(),
        TariffType: $('input[name=TariffType]:checked').val(),
        AcceptReturn: $('input[name=AcceptReturn]:checked').val(),
        DeliveryTemplateId: $('#FreightTemplateId').val(),
        Weight: $("#weight").val(),
        AutoRefresh: $('input[name=AutoRefresh]').attr("checked"),
        DesProperties: GetDesProperties(),
        IsManualStock: $('#IsManualInventory').val(),
        Catalogs: GetDmsCatalogs(),
        LimitNum: $("#limitNumber input[name='LimitNum']").val(),
        LimitNumStartTime: $('#BuyLimitTime').val(),
        Limited: $('.BuyLimit').attr('checked'),
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
        addErrMsg("请上传主图");
    }
    var checkedPrice = false;
    for (var j = 0; j < subData.Catalogs.length; j++) {
        if (isNaN(subData.Catalogs[j].Price) && !checkedPrice) {
            addErrMsg("请填写正确的售价");
            checkedPrice = true;
        } else if (subData.Catalogs[j].Price <= 0 && !checkedPrice) {
            addErrMsg("请填写正确的售价");
            checkedPrice = true;
        }
    }
    if(!subData.CatalogType) {
        addErrMsg("请选择备货状态");
    }
    if(!subData.CatalogStatus) {
        addErrMsg("请选择配送方式");
    }
    if(!subData.NeedFlight) {
        addErrMsg("请选择运费设置");
    }
    if (!subData.TariffType) {
        addErrMsg("请选择海关关税承担方");
    }
    if (subData.Limited) {
        if (isNaN(subData.LimitNum) || subData.LimitNum == '') {
            addErrMsg("请填写限购件数");
        }
        else if (subData.LimitNum < 1 || subData.LimitNum > 999) {
            addErrMsg("超出限购数，限购数范围为1~999");
        }
    }
    if (subData.Limited) {
        if (isNaN(subData.LimitNum) || subData.LimitNum < 1 || subData.LimitNum > 999) {
            addErrMsg("请填写正确的限购，范围是1~999");
        }
    }
    //if(!subData.OnSaleType) {
    //    addErrMsg("请选择上架时间");
    //}
    if(errMsg!="") {
        $('#ErrorMsgs').html(errMsg);
        $('#ErrorMsgDiv').show();
        scroll(0, 0);
        return false;
    }
    //提交
    $.ajax({
        url: "/DMSProductAdd/SaveYmtProduct",
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
                //            success: function(d) {
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
    $('#SaveToList').click(function() {
        GetCheckAndSubData("");
    });
    
    $('.distributorTag').click(function () {
        GetCheckAndSubData($(this).attr('data'));
    });
    if ($('#IsFromEditCatalog').val() == 'true') {
        location.hash = "StockNum";
    }
});

