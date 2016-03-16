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

function GetCheckAndSubData(redUrl) {
    //获取数据
    var pics = [];
    var firstPic;
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

    var subData = {
        GroupId: $('#GroupId').val(),
        ProductId: $('#ProductId').val(),
        IsNew: $('#isEdit').val() != "y",
        ProductName: $('#ProductName').val(),
        ProductDescript: kissyEditor.get("data"),
        PictureUrls: pics,
        IsManualStock: $('#IsManualInventory').val(),
        Catalogs: GetDmsCatalogs(),
        MarketPrice: $('#MarketPrice').val()
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
    if (isNaN(subData.MarketPrice) || subData.MarketPrice <= 0) {
        addErrMsg("请填写正确的市场价格");
    }
    if (errMsg != "") {
        $('#ErrorMsgs').html(errMsg);
        $('#ErrorMsgDiv').show();
        scroll(0, 0);
        return false;
    }
    //提交
    $.ajax({
        url: "/DMSProductAdd/SaveTczProduct",
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
    $('#SaveToList').click(function () {
        GetCheckAndSubData("");
    });


    $('.distributorTag').click(function () {
        GetCheckAndSubData($(this).attr('data'));
    });
    if ($('#IsFromEditCatalog').val() == 'true') {
        location.hash = "StockNum";
    }
});
