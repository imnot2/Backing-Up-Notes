/*=======================ShopBuySetting.js===========================*/
j$(function () {
    initPage();

    j$('#submitSuppliers').click(function () {
        var ids = "";
        j$("#StoreList input:checked").each(function () {
            ids += "," + j$(this).attr("id");
        });
        if (ids.length > 1) {
            j$("#supplierIds").val(ids.substring(1));
        }
        else {
            j$("#supplierIds").val("");
        }
        var form = j$("form#formSetSuppliers");
        j$.ymatoupost(form.attr("action"), form.serialize(), function (data) {
            if (data.success == 1) {
                alert("修改成功");
            }
            else {
                alert(data.message);
            }
        }, "json");
        return false;
    });

    j$("#submitBrands").click(function () {
        var ids = "";
        j$("#BrandList input:checked").each(function () {
            ids += "," + j$(this).attr("id").substring(1);
        });
        if (ids.length > 1) {
            j$("#brandIds").val(ids.substring(1));
        }
        else {
            j$("#brandIds").val("");
        }
        var form = j$("form#formSetBrands");
        j$.ymatoupost(form.attr("action"), form.serialize(), function (data) {
            if (data.success == 1) {
                alert("修改成功");
            }
            else {
                alert(data.message);
            }
        }, "json");
        return false;
    });

    j$(".categoryA").click(function () {
        j$(".categoryA").removeClass("ln-selected");
        j$(this).addClass("ln-selected");
        j$(".subCategory").hide();
        var id = j$(this).attr("id");
        j$(".subc" + id).show();
    });

    j$("#submitCategorys").click(function () {
        var ids = "";
        j$("#subCategory input:checked").each(function () {
            ids += "," + j$(this).attr("id").substring(1);
        });
        if (ids.length > 1) {
            j$("#categoryIds").val(ids.substring(1));
        }
        else {
            j$("#categoryIds").val("");
        }
        var form = j$("form#formSetCategorys");
        j$.ymatoupost(form.attr("action"), form.serialize(), function (data) {
            if (data.success == 1) {
                alert("修改成功");
            }
            else {
                alert(data.message);
            }
        }, "json");
        return false;
    });

    j$("#btnSubmitChangeShopCharge").click(function () {
        j$("#NoTxtServiceRate").val(j$("#TxtServiceRate").val());
        j$("#NoTxtFreight").val(j$("#TxtFreight").val());
        var form = j$("form#formChangeShopChargeInfo");
        j$.ymatoupost(form.attr("action"), form.serialize(), function (data) {
            if (data.success == 1) {
                alert("修改成功");
            }
            else {
                alert(data.message);
            }
        }, "json");
        return false;
    });

    KISSY.ready(function (S) {
        var KE = KISSY.Editor;
        var k = KE("#desc", { baseZIndex: 10000 }).use("enterkey,clipboard,elementpaths,preview,templates" +
                            ",separator,undo" +
                            ",separator,removeformat,font,format,forecolor,bgcolor" +
                            ",separator,list,indent,justify" +
                            ",separator,link,image,smiley" +
                            ",separator,table,resize,draft,pagebreak,separator,maximize"
                        );
        k.on("dataReady", function () {
            j$('#btnSubmitChangeSellDescript').click(function () {
                j$('textarea#desc').val(k.getData());
                var form = j$("form#formChangeSellDescript");
                j$('textarea#desc').val(j$("#formChangeSellDescript iframe").contents().find("body").html());
                j$.ymatoupost(form.attr("action"), form.serialize(), function (data) {
                    if (data.success == 1) {
                        alert("修改成功");
                    }
                    else {
                        alert(data.message);
                    }
                }, "json");
                return false;
            });
        });
    });
});

function initPage() {
    //初始化选择的商家
    var supplierIdstring = j$("#supplierIds").val();
    var suppliserIds = supplierIdstring.split(',');
    for (i in suppliserIds) {
        if (suppliserIds[i] != "") {
            j$("#" + suppliserIds[i]).attr("checked", "checked");
        }
    }

    j$("#StoreList").listnav({
        initLetter: 'a',
        showCounts: true,
        noMatchText: '当前首字母没有商家 ... ',
        cookieName: 'shopSupplierList'
    });

    //初始化选择的品牌
    var brandIdstring = j$("#brandIds").val();
    var brandIds = brandIdstring.split(',');
    for (i in brandIds) {
        if (brandIds[i] != "") {
            j$("#b" + brandIds[i]).attr("checked", "checked");
        }
    }

    j$('#BrandList').listnav({
        initLetter: 'a',
        showCounts: true,
        noMatchText: '当前首字母没有品牌 ... ',
        cookieName: 'shopSupplierList'
    });

    //初始化分类
    var categoryIdString = j$("#categoryIds").val();
    var categoryIds = categoryIdString.split(',');
    for (i in categoryIds) {
        if (categoryIds[i] != "") {
            j$("#c" + categoryIds[i]).attr("checked", "checked");
        }
    }
}
