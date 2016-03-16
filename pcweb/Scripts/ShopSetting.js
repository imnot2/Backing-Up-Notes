/*=======================ShopSetting.js===========================*/
function showSelectMerchantDialog() {
    remoteGetAdeptMerchantList();
    AttentionDialog("#STAttentionDialog", "#PadB");
    var actBorder = j$("#STAttentionDialog div.actBorder");
    actBorder.children("a").remove();
    var clone = j$(this).prev("span.ccitem").children("a").clone();
    clone.children("span").remove();
    clone.removeClass().addClass("link").appendTo(actBorder);
}
function showSelectBrandDialog() {
    AttentionDialog("#BDAttentionDialog", "#PadB");
    var actBorder = j$("#BDAttentionDialog div.actBorder");
    actBorder.children("a").remove();
    var clone = j$(this).prev("span.ccitem").children("a").clone();
    clone.children("span").remove();
    clone.removeClass().addClass("link").appendTo(actBorder);
}
function showSelectCategoryDialog() {
    AttentionDialog("#CGAttentionDialog", "#PadB");
}
function remoteGetAdeptMerchantList() {
    var form = j$('#formGetAdeptMerchantInfoList');
    j$.postsync(form.attr('action'), form.serialize(), function (data) {

        var o = j$('#STAttentionDialog ul.zicList a:not(.itselect)');
        // o.addClass("itselect");
        var box = o.closest("ul").next("div.actBorder");
        j$.each(data.data, function () {
            box.append("<a class='link' href='javascript:void(0);' data='" + this.sId + "'>" + this.sName + "</a><input type='hidden' name='selectedSuppliers' value='" + this.sId + "' />");
        });
        //                data.data.each();
        //                box.append("<a class='link' href='javascript:void(0);' data='" + o.attr('data') + "'>" + o.text() + "</a><input type='hidden' name='selectedSuppliers' value='" + o.attr('data') + "' />");
    }, 'json');
}
//function InitKissy() {
//    KISSY.ready(function (S) {
//        var KE = KISSY.Editor;
//        var k = KE("#Content", { baseZIndex: 10000 }).use("enterkey,clipboard,elementpaths,preview,templates" +
//                            ",separator,undo" +
//                            ",separator,removeformat,font,format,forecolor,bgcolor" +
//                            ",separator,list,indent,justify" +
//                            ",separator,link,image,smiley" +
//                            ",separator,table,resize,draft,pagebreak,separator,maximize"
//                        );
//        k.on("dataReady", function () {
//            j$('#btnSubmitChangeShopContent').click(function () {
//                j$('textarea#Content').val(k.getData());
//                return true;
//            });
//        });
//    });
//}
//j$(InitKissy);
//function ajaxChangeShopDescription() {
//    var form = j$("form#formChangeShopDescription");
//    j$('textarea#txtDetial').val(j$("#formChangeShopDescription iframe").contents().find("body").html());
//    j$.ymatoupost(form.attr("action"), form.serialize(), function (data) {
//        if (data.success == 1) {
//            alert("修改描述成功");
//        } else {
//            alert(data.message);
//        }
//    }, "json");
//}
function ajaxChangeShopContent() {
    var form = j$("form#formChangeShopContent");
    j$('textarea#Content').val(j$("#formChangeShopContent iframe").contents().find("body").html());
    j$.ymatoupost(form.attr("action"), form.serialize(), function (data) {
        if (data.success == 1) {
            alert("修改成功");
        }
        else {
            alert(data.message);
        }
    }, "json");
}

function FillSubCat(o) {
    j$('select#selact').empty();
    j$.ajax({
        type: "GET",
        url: "/ajax/getsubcat",
        data: "p=" + o,
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                for (var i = 0; i < msg.length; i++) {
                    j$('select#selact').append('<option value="' + msg[i].Key + '">' + msg[i].Value + '</option>');
                }
            }
        }
    });
}
function ajaxChangeAdeptBrand() {
    var form = j$('#formChangeAdeptBrand');
    j$.post(form.attr('action'), j$.toJSON(form.serializeObject()), function (data) {
        if (data.success == '1') {
            alert('修改擅长代购的品牌成功！');
            //j$('#bntSTSub').click();
            window.location.href = "/shopsetting/index?t=" + Math.random();
        } else {
            alert(data.message);
        }
    }, 'json');
}
function ajaxChangeAdeptCategory() {
    var form = j$('#formChangeAdeptCategory');
    j$.post(form.attr('action'), j$.toJSON(form.serializeObject()), function (data) {
        if (data.success == '1') {
            alert('修改擅长代购的分类成功！');
            //j$('#bntSTSub').click();
            window.location.href = "/shopsetting/index?t=" + Math.random();
        } else {
            alert(data.message);
        }
    }, 'json');
}
function ajaxChangeAdeptMerchant() {
    var form = j$('#formChangeAdeptMerchant');
    //                j$.ajax({
    //                    type: 'POST',
    //                    url: form.attr('action'),
    //                    data: j$.toJSON(form.serialize()),
    //                    success: function (data) {
    //                        if (data.success == '1') {
    //                            alert('修改擅长代购的商家成功！');
    //                        } else {
    //                            alert(data.message);
    //                        }
    //                    },
    //                    dataType: 'json'
    //                });
    //        j$.post(form.attr('action'), j$.toJSON(form.serialize()), function (data) {
    //        form.ajaxSubmit({
    //            dataType: 'json',
    //            success: function (data) {
    //                if (data.success == '1') {
    //                    alert('修改擅长代购的商家成功！');
    //                    j$('#bntSTSub').click();
    //                } else {
    //                    alert(data.message);
    //                }
    //            }
    //        });
    j$.post(form.attr('action'), j$.toJSON(form.serializeObject()), function (data) {
        if (data.success == '1') {
            alert('修改擅长代购的商家成功！');
            j$('#bntSTSub').click();
            window.location.href = "/shopsetting/index?t=" + Math.random();
        } else {
            alert(data.message);
        }
    }, 'json');
}
function ajaxAddTaoboCreditImportRequest() {
    var form = j$('form#fromAddTaobaoCreditImportRequest');
    //                form.ajaxForm({ dataType: 'json', success: function (data) {
    //                    if (data.success == '1') {
    //                        alert('添加淘宝积分导入申请成功！');
    //                        j$('#bntSTSub').click();
    //                    } else {
    //                        alert(data.message);
    //                    }
    //                }
    //                });
    j$.post(form.attr('action'), j$.toJSON(form.serializeObject()), function (data) {
        if (data.success == '1') {
            alert('添加淘宝积分导入申请成功！');
            j$('#bntSTSub').click();
        } else {
            alert(data.message);
        }
    }, 'json');
    //        j$.post(form.attr('action'), j$.toJSON(form.serializeObject()), function (data) {
    //            var container = j$('#stiitem.containerChangeAdeptMerchant');
    //            container.empty();
    //            container.append(data);
    //            //            if (data.success == '1') {
    //            //                alert('添加淘宝积分导入申请成功！');
    //            //                j$('#bntSTSub').click();

    //            //            } else {
    //            //                alert(data.message);
    //            //            }
    //        }, 'html');
}
function initializeComponents() {
    j$('#BrandList').listnav({
        initLetter: 'a',
        showCounts: true,
        noMatchText: '当前首字母没有品牌 ... ',
        cookieName: 'myBrandList',
        afterClick: function () {
            j$("ul#BrandList a").cluetip({
                open: function () {
                    var tooltip = j$(this).cluetip("widget");
                    j$("body").mousemove(function (event) {
                        tooltip.position({ my: "left bottom", at: "center bottom", offset: "-20 -10", of: event });
                    }).mousemove();
                },
                close: function () {
                    j$("body").unbind("mousemove");
                }
            });
        }
    });
    j$('#StoreList').listnav({
        initLetter: 'a',
        showCounts: true,
        noMatchText: '当前首字母没有商店 ... ',
        cookieName: 'myStoreList'
    });
    j$('ul.zicList a:not(.itselect)').live("click", function () {
        var o = j$(this);
        o.addClass("itselect");
        var box = o.closest("ul").next("div.actBorder");
        box.append("<a class='link' href='javascript:void(0);' data='" + o.attr('data') + "'>" + o.text() + "</a><input type='hidden' name='selectedSuppliers' value='" + o.attr('data') + "' />");
    });
    j$('ul.zicList a.itselect').live("click", function () {
        var o = j$(this);
        o.removeClass("itselect");
        var box = o.closest("ul").next("div.actBorder");
        for (var i = 0; i < box.children("a").length; i++) {
            if (box.children("a").eq(i).text() == o.text()) {
                box.children("a").eq(i).remove();
            }
        }
    });
    FillSubCat(j$('#mainCat').val());
    j$('#mainCat').change(function () {
        var v;
        j$("select#mainCat option:selected").each(function () {
            v = j$(this).val();
        });
        FillSubCat(v);
    });

    j$("a#addcg").click(function () {
        showSelectCategoryDialog();
    });
    j$("a#addbd").click(function () {
        showSelectBrandDialog();
    });

    j$("a#addst").click(showSelectMerchantDialog);
    j$("#bntBDSub").click(function () {
        var ccitem = j$("#bdiitem span.ccitem");
        ccitem.empty();
        var clone = j$(this).prev("div.actBorder").children("a").clone();
        clone.removeClass().addClass("citem in_bk").append("<span></span>").attr({ href: "javascript:void(0);" }).appendTo(ccitem);
    });
    j$("#bntSTSub").click(function () {
        var ccitem = j$("#stiitem span.ccitem");
        ccitem.empty();
        var clone = j$(this).prev("div.actBorder").children("a").clone();
        clone.removeClass().addClass("citem in_bk").append("<span></span>").attr({ href: "javascript:void(0);" }).appendTo(ccitem);
    });
    j$(".ccitem.AdenptBrandList a span").live("click", function () {
        //var form = j$("/ShopSetting/RemoveAdeptBrand");
        var item = j$(this).parent("a");
        var id = item.attr('data');
        j$.post("/ShopSetting/RemoveAdeptBrand", j$.toJSON({ id: id }), function (data) {
            if (data.success == "1") {
                alert("操作成功");
            } else {
                alert(data.message);
            }
        }, 'json');
        item.remove();

    });
    j$(".ccitem.AdeptCategoryList a span").live("click", function () {
        //var form = j$("/ShopSetting/RemoveAdeptBrand");
        var item = j$(this).parent("a");
        var id = item.attr('data');
        j$.post("/ShopSetting/RemoveAdeptCategory", j$.toJSON({ id: id }), function (data) {
            if (data.success == "1") {
                alert("操作成功");
            } else {
                alert(data.message);
            }
        }, 'json');
        item.remove();

    });
    j$(".ccitem.AdeptSupplierList a span").live("click", function () {
        //var form = j$("/ShopSetting/RemoveAdeptBrand");
        var item = j$(this).parent("a");
        var id = item.attr('data');
        j$.post("/ShopSetting/RemoveAdeptSupplier", j$.toJSON({ id: id }), function (data) {
            if (data.success == "1") {
                alert("操作成功");
            } else {
                alert(data.message);
            }
        }, 'json');
        item.remove();

    });
    j$("#bntCGSub").click(function () {
        var ccitem = j$("#cgiitem span.ccitem");
        var seltxt = j$("select#selact").getSelectedText();
        ccitem.append("<a class='citem in_bk' href='javascript:void(0);'>" + seltxt + "<span></span></a>");
    });
    //change shop contact info
   
    //ajaxChangeShopDescription();
//    j$("#btnSubmitChangeShopDescription").click(function () {
//        ajaxChangeShopDescription();
//    });
    j$("#btnSubmitChangeShopContent").click(function () {
        ajaxChangeShopContent();
        return false;
    });
    ///修改擅长代购的商家
    j$('#buttonSTSub').click(function () {
        ajaxChangeAdeptMerchant();
    });
    //修改擅长的品牌
    j$('#bntBDSub').click(function () {
        ajaxChangeAdeptBrand();
    });
    //修改擅长的分类
    j$('#bntCGSub').click(function () {
        ajaxChangeAdeptCategory();
    });
 
    //淘宝积分导入
    j$('#buttonAddTaobaoCreditImportRequest').click(function () {
        ajaxAddTaoboCreditImportRequest();
    });
}
j$(function () {
    initializeComponents();
});
  
