/*=======================Add.js===========================*/
String.prototype.realLength = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

var lockProperty = false;
var layerbox = {};
Ymt.load('widget.LayerBox', function () {
    layerbox = Ymt.widget.LayerBox('Temps', {
        Temps: '<div class="alert_box layerTempsadd" style="display:block;position:relative;"><div class="alert_box_inner"><div class="alert_mod">{confirmText}</div><div  class="alert_mod" style="text-align:center"><span class="split"><a class="btn_1 wid2foot" ><i></i><span>确定</span></a></span><input type="checkbox" class="cec" /><span class="split">知道了，下次不再提醒</span></div></div></div>',
        isFrame: !1,
        zIndex: 1000,
        callback: function () {
            $('.layerTempsadd .btn_1').click(function (e) {
                layerbox.close();
                return false;
            });
            $('.layerTempsadd input:checkbox').click(function () {
                if ($(this).attr('checked')) {
                    layerbox.returnValue = true;
                } else {
                    layerbox.returnValue = false;
                }
            });
        }
    })
}, true);

function CheckValidTime() {
    if (j$("#AvailableLater").attr("checked") == true) {
        var reg = new RegExp(/^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/);
        if (j$("#ValidStart").val() == "") {
            alert("请选择开始日期");
            return false;
        }
        if (j$("#ValidStartTime").val() == "") {
            alert("请填写开始时间");
            return false;
        }
        if (!reg.test(j$("#ValidStartTime").val())) {
            alert("开始时间错误");
            return false;
        }
        if (j$("#ValidEnd").val() == "") {
            alert("请选择截止日期");
            return false;
        }
        if (j$("#ValidEndTime").val() == "") {
            alert("请填写截止时间");
            return false;
        }
        if (!reg.test(j$("#ValidEndTime").val())) {
            alert("截止时间错误");
            return false;
        }
    }
    return true;
}

function SetDateTime() {
    j$("#hValidStart").val(j$("#ValidStart").val() + " " + j$("#ValidStartTimeHour").val() + ":" + j$("#ValidStartTimeMinit").val() + ":00");
    j$("#hValidEnd").val(j$("#ValidEnd").val() + " " + j$("#ValidEndTimeHour").val() + ":" + j$("#ValidEndTimeMinit").val() + ":00");
}
function SetSKU() {
    var skus = "";
    var result = true;
    $('.UsedSKU:visible').each(function () {
        var sku = $(this).val();
        var catalog = $(this).attr("data");
        if (sku == "") {
            result = false;
        }
        skus += (catalog + ":" + sku + ",");
    });
    $('.CatalogSKUstring').val(skus);
    return result;
}

function SetCatalogSKU() {
    var skus = "";
    var result = true;
    $('.manuSKU').each(function () {
        var sku = $(this).val();
        var catalog = $(this).attr("data");
        if (sku == "") {
            result = false;
        }
        skus += (catalog + ":" + sku + ",");
    });
    $('.CatalogSKUstring').val(skus);
    return result;
}

j$(function () {
    KISSY.ready(function (S) {
        var KE = KISSY.Editor;
        var k = KE("#Description", { baseZIndex: 10000 }).use("enterkey,clipboard,elementpaths,preview,templates" +
                ",separator,undo" +
                ",separator,removeformat,font,format,forecolor,bgcolor" +
                ",separator,list,indent,justify" +
                ",separator,link,image,smiley" +
                ",separator,table,resize,draft,pagebreak,separator,maximize"
                );
        k.on("dataReady", function () {
            j$("#Button1").click(function () {
                if ($("#CatalogStatus").val() == "3" && $('#NeedAlertProtected').val() == "y") {
                    layerbox.alert({ confirmText: '<h3>您选择了码头护航直邮</h3><dl><dt>责任</dt><dd>发货时必须在洋码头选择洋码头国际物流进行包裹配送</dd><dt>优势</dt><dd>每售出一件商品，洋码头会给您的客户每磅五元的运费补贴。</dd><dd>商品获得护航标志，更值得信赖。</dd><dd></dd></dl>' }, null, function () {
                        if (layerbox.returnValue) {
                            $.get('/SellerProduct/NotAlertProtected', function () {
                                $('#NeedAlertProtected').val("y");
                            });
                        }
                    });
                }
                SaveProductReDirect();
            });
            j$("#Button2").click(function () {
                if ($("#CatalogStatus").val() == "3" && $('#NeedAlertProtected').val() == "y") {
                    layerbox.alert({ confirmText: '<h3>您选择了码头护航直邮</h3><dl><dt>责任</dt><dd>发货时必须在洋码头选择洋码头国际物流进行包裹配送</dd><dt>优势</dt><dd>每售出一件商品，洋码头会给您的客户每磅五元的运费补贴。</dd><dd>商品获得护航标志，更值得信赖。</dd><dd></dd></dl>' }, null, function () {
                        if (layerbox.returnValue) {
                            $.get('/SellerProduct/NotAlertProtected', function () {
                                $('#NeedAlertProtected').val("y");
                            });
                        }
                    });
                }
                SaveProductReload();
            });
        });

        function SaveProductReDirect() {
            SetDateTime();
            var checkTime = CheckValidTime();
            if (!checkTime)
                return false;
            var setSku = SetSKU();
            //            if (!setSku) {
            //                alert("商品编号不能为空");
            //                return false;
            //            }
            j$(".newProperty").each(function () {
                if (j$(this).val() == "属性名") {
                    j$(this).val("");
                }
            });
            j$(".newAttrText").each(function () {
                if (j$(this).val() == "属性内容") {
                    j$(this).val("");
                }
            });
            j$("#Description").val(k.getData());
            j$("#ProductProperty").val(j$("#AddProductPropertyDiv *").serialize());
            if (j$('#ProductName').val() == "") {
                alert('请填写商品标题');
                return false;
            }
            if (j$('#ProductName').val().replace(/[^\x00-\xff]/g, "**").length > 60) {
                alert('商品标题过长，最多为30个汉字或60个英文字符');
                return false;
            }
            if (j$("#Description").val() == "") {
                alert('请填写商品描述');
                return false;
            }
            //                if (isNaN(j$("#OverSeaMarketPrice").val()) || j$("#OverSeaMarketPrice").val() < 0) {
            //                    alert("请填写正确的海外专柜售价");
            //                    return false;
            //                }
            //                if (isNaN(j$("#InternalMarketPrice").val()) || j$("#InternalMarketPrice").val() < 0) {
            //                    alert("请填写正确的国内市场价格");
            //                    return false;
            //                }
            if (j$('#ProductPictureUrl1').val() == "") {
                alert('请选择商品展示图片');
                return false;
            }
            if (j$('#hCatalogCount').val() == 0) {
                alert('请添加商品报价');
                return false;
            }
            if (j$('#CatalogType').val() == -1) {
                alert('请选择备货状态');
                return false;
            }
            if (j$('#CatalogStatus').val() == -1) {
                alert('请选择配送方式');
                return false;
            }

            if (isNaN(j$('#LimitNum').val()) || j$('#LimitNum').val() < 0) {
                alert('请输入正确的限购数量');
                return false;
            }

            var wrongSKU = checkSKUFormat();
            if (wrongSKU != "") {
                alert("您输入的商品编码:" + wrongSKU + "无效！请输入6~13位，由数字和英文字母组成的商品编码。");
                return false;
            }

            var exisitSKU = checkExisitSKU();
            if (exisitSKU != "") {
                if (!confirm("您添加的商品编码重复" + exisitSKU + "，是否继续添加？")) {
                    return false;
                }
            }

            var form = j$('#formAddStep2');
            j$.ymatoupost(form.attr('action'), j$('#divAddStep2 *').serialize(), function (data) {
                if (data.success == '1') {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    }
                } else {
                    alert(data.message);
                }
            }, 'json');
            //form.submit();
            return true;
        }

        function SaveProductReload() {
            SetDateTime();
            var checkTime = CheckValidTime();
            if (!checkTime)
                return false;
            var setSku = SetSKU();
            //            if (!setSku) {
            //                alert("商品编号不能为空");
            //                return false;
            //            }
            j$(".newProperty").each(function () {
                if (j$(this).val() == "属性名") {
                    j$(this).val("");
                }
            });
            j$(".newAttrText").each(function () {
                if (j$(this).val() == "属性内容") {
                    j$(this).val("");
                }
            });
            j$("#Description").val(k.getData());
            j$("#ProductProperty").val(j$("#AddProductPropertyDiv *").serialize());
            if (j$('#ProductName').val() == "") {
                alert('请填写商品标题');
                return false;
            }
            if (j$('#ProductName').val().replace(/[^\x00-\xff]/g, "**").length > 60) {
                alert('商品标题过长，最多为30个汉字或60个英文字符');
                return false;
            }
            if (j$("#Description").val() == "") {
                alert('请填写商品描述');
                return false;
            }
            if (j$('#ProductPictureUrl1').val() == "") {
                alert('请选择商品展示图片');
                return false;
            }
            if (j$('#hCatalogCount').val() == 0) {
                alert('请添加商品售价');
                return false;
            }
            if (j$('#CatalogType').val() == -1) {
                alert('请选择备货状态');
                return false;
            }
            if (j$('#CatalogStatus').val() == -1) {
                alert('请选择配送方式');
                return false;
            }

            if (isNaN(j$('#LimitNum').val()) || j$('#LimitNum').val() < 0) {
                alert('请输入正确的限购数量');
                return false;
            }

            var wrongSKU = checkSKUFormat();
            if (wrongSKU != "") {
                alert("您输入的商品编码:" + wrongSKU + "无效！请输入6~13位，由数字和英文字母组成的商品编码。");
                return false;
            }

            var exisitSKU = checkExisitSKU();
            if (exisitSKU != "") {
                if (!confirm("您添加的SKU重复" + exisitSKU + "，是否继续添加？")) {
                    return false;
                }
            }

            var form = j$('#formAddStep2');
            j$.ymatoupost(form.attr('action'), j$('#divAddStep2 *').serialize(), function (data) {
                if (data.success == '1') {
                    alert("商品添加成功！继续发布。");
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }, 'json');
            return true;
        }

        j$(".openProCheck").click(function () {
            if ($('.openProCheck:checked').length == 2) {
                $('.openProCheck:unchecked').each(function () {
                    $(this).attr('disabled', 'disabled');
                });
            }
            else if (!lockProperty) {
                $('.openProCheck').attr('disabled', '');
            }
            var propertyId = j$(this).val();
            if (j$(this).attr("checked") == true) {
                //j$("." + propertyId + ".addattr").show();
                j$(".attrformat." + propertyId + " input").removeAttr("disabled");
            }
            else {
                //j$("." + propertyId + ".addattr").hide();
                j$(".attrformat." + propertyId + " input").attr("disabled", true);
                j$(".attrformat." + propertyId + " input").attr("checked", false);
            }
        });
    });


    //    j$("div.attrformat").buttonset();
    var attritem;
    var addattrIndex;
    var propertyid;
    // var addattr = false;
    j$("a.addattr").click(function () {
        //var that = j$(this);
        j$("input#txtPopVal").val("");
        // that.next('span.name').toggle()
        // if (!addattr) {
        //     that.html('取消添加');
        //     addattr = true;
        // } else {
        //     that.html('添加新数值');
        //     addattr = false;
        // }
        AttentionDialog("#PAttentionDialog", "#PadB");
        attritem = j$(j$(this).parent("div.attritem"));
        propertyid = j$(attritem).find('input[type=radio]').attr('name');
        j$('#' + propertyid).attr("checked", true);
        j$(".attrformat." + propertyid + " input").removeAttr("disabled");
        addattrIndex = j$('div.attritem').index(attritem) + 1;
    });
    //j$("#specificationAll .name .ui_btn").click(function () {
    j$("#bntPopVal").click(function () {
        var txt = j$("input#txtPopVal").val().replace(/^\s+|\s+$/g, "");
        if (txt == "") {
            alert("请填写规格值");
            return false;
        }
        var attrformat = attritem.children("div.attrformat");
        var count = attrformat.children("label").length + 1;
        attrformat.append("<input type='radio' class='" + propertyid + "' name='" + propertyid + "' value='" + txt + "' id='ck" + addattrIndex + count + "' /><label for='ck" + addattrIndex + count + "'>" + txt + "</label>");
        //j$(this).closest('span.name').hide()
        //j$(this).closest('span.name').prev('a').html('添加新数值')
        //        attrformat.buttonset();
    });

    var isDatePick = false;
    var dptraget;
    j$("a#pickdate").click(function () {
        var DP = j$("#datepicker");
        if (!isDatePick) {
            DP.datepicker({ changeMonth: true, changeYear: true, minDate: 0 });
            isDatePick = true;
        }
        AttentionDialog("#DPAttentionDialog", "#PadB");

        dptraget = j$("select#odata");
        j$("#DPAttentionDialog .Close").bind("click", function () {
            dptraget.get(0).selectedIndex = 0;
        });
        j$("#bntDPSub").one("click", function () {
            var day = j$("td a.ui-state-active", DP).text();
            var month = parseInt(j$("select.ui-datepicker-month", DP).val()) + 1;
            var year = j$("select.ui-datepicker-year", DP).val();
            var dataval = year + "/" + month + "/" + day;
            var datatext = year + "年" + month + "月" + day + "日";
            dptraget.addOption(datatext, dataval);
            dptraget.get(0).value = dataval;
        });
    });


    $('#ProductFreightForBuyer').click(function () {
        $('#ProductFreightForBuyerDiv').show();
    });
    $('#ProductFreightForSeller').click(function () {
        $('#ProductFreightForBuyerDiv').hide();
    });
    $('#FreigthForBuyerTypeTemplate').click(function () {
        var catalogStatu = $('#CatalogStatus').val();
        if (catalogStatu == "-1") {
            alert('请先选择配送方式');
            $('#notSelectTemplate').click();
        } else {
            var n = "";
            var amendUrl = "";
            if (catalogStatu == 1) {
                n = "国内";
                amendUrl = "/DeliveryTemplate/AddChinaDeliveryTemplate";
            } else {
                n = "国际";
                amendUrl = "/DeliveryTemplate/AddUsDeliveryTemplate";
            }
            if (hasTemplate(catalogStatu) == "False") {
                if (confirm("您还未设置" + n + "运费模板，请先设置。")) {
                    $('#SelectTemplageDiv').hide();
                    $('#notSelectTemplate').click();
                    window.open(amendUrl);
                }
            } else {
                $('#SelectTemplageDiv').show();
                if (catalogStatu == 1) {
                    $('#ChinaTemplateName').show();
                    $('#USTemplateName').hide();
                } else {
                    $('#ChinaTemplateName').hide();
                    $('#USTemplateName').show();
                }
            }

            //            $('#SetTemplate').show();
            //            $('#SetFreight').hide();
            $('#OneFlight').attr("disabled", "disabled");
        }
    });
    $('#FreigthForBuyerTypeManu').click(function () {
        //        $('#SetTemplate').hide();
        //        $('#SetFreight').show();
        $('#OneFlight').removeAttr("disabled");
    });

});

function hasTemplate(catalogStatu) {
    var result = false;
    $.ajax({
        type: "GET",
        url: "/SellerProduct/HasTemplate",
        data: "c=" + catalogStatu,
        dataType: "text",
        async: false,
        success: function (msg) {
            result = msg;
        }
    });
    return result;
}

function createNewSKU() {
    var sku = "";
    $('.UsedSKU').each(function () {
        sku += $(this).val() + ",";
    });
    $.ajax({
        type: "GET",
        url: "/SellerProduct/GetNewCatalogSKU",
        data: "autoSku=" + j$('#productSKU').val() + "&currentSkus=" + sku,
        dataType: "text",
        async: false,
        success: function (msg) {
            $('#newSKU').val(msg);
        }
    });
}

function checkExisitSKU() {
    var result = "";
    var skuString = $('#subCatalogSKUstring').val();
    $.ajax({
        type: "GET",
        url: "/SellerProduct/CheckExisitSku",
        data: "catalogSKUstring=" + skuString,
        dataType: "text",
        async: false,
        success: function (msg) {
            result = msg;
        }
    });
    return result;
}

function checkSKUFormat() {
    var result = "";
    var skuString = $('#subCatalogSKUstring').val();
    $.ajax({
        type: "GET",
        url: "/SellerProduct/CheckSkuFormat",
        data: "catalogSKUstring=" + skuString,
        dataType: "text",
        async: false,
        success: function (msg) {
            result = msg;
        }
    });
    return result;
}


j$(function () {
    j$('#btnSubmit').click(function () {
        createNewSKU();
        SetCatalogSKU();
        if (isNaN(j$('#Num').val()) || j$('#Num').val() < 0) {
            alert('请输入正确的库存');
            return false;
        }
        //        if (isNaN(j$('#LimitNum').val()) || j$('#LimitNum').val() < 0) {
        //            alert('请输入正确的限购数量');
        //            return false;
        //        }

        if (isNaN(j$('#Price').val()) || j$('#Price').val() <= 0) {
            alert('请输入正确的售价');
            return false;
        }
        if (isNaN(j$('#Shipping').val()) || j$('#Shipping').val() < 0) {
            alert('请输入正确的运费');
            return false;
        }
        //add catalog
        //var cform = j$('#formCommon');
        var form = j$('#formAddCatalog');
        //        var div = j$('#divAddCatalog');
        //        var price = div.find('input[name=Price]').val();
        //cform.attr('action', form.attr('action'));
        //form.submit();
        //        var model = { 'Price': 0 };
        //        model.Price = price;
        //        j$.post(form.attr('action'), j$.toJSON({ 'data': model }), function (data) {
        var postdata = j$('#divAddCatalog *').serialize();
        j$.ymatoupost(form.attr('action'), postdata, function (data) {
            if (data.success == '1') {
                //todo refresh list
                $('.openProCheck').each(function () {
                    if ($('input.' + $(this).val() + ':checked').length == 0) {
                        $(this).attr('checked', false);
                        $(this).attr('disabled', 'disabled');
                        $('input.' + $(this).val()).each(function () {
                            $(this).attr('disabled', 'disabled');
                        });
                    }
                });

                lockProperty = true;

                refreshCatalogList(data.data);

            } else {
                if (data.message == "") {
                    alert("售价、运费或库存超出范围，请修改。");
                }
                else {
                    alert(data.message);
                }
            }
        }, 'json');
    });
    j$('#freightForBuyer').click(function () {
        j$('#freightSpan').show();
    });
    j$('#freightForSeller').click(function () {
        j$('#Shipping').val(0);
        j$('#freightSpan').hide();
    });
    j$('a.buttonRemoveCatalog').live('click', function () {
        var form = j$('#formRemoveCatalog');
        var id = j$(this).attr('data');
        j$.post(form.attr('action'), j$.toJSON({ 'removeingCatalogId': id }), function (data) {
            if (data.success == "1") {
                //todo refresh list
                refreshCatalogList(data.data);
            }
            else {
                alert(data.message);
            }
        }, 'json');
    });
    $('a.buttonAmendCatalog').live('click', function () {
        $(this).parent().parent().find('.catalogNum').attr('disabled', '');
        $(this).parent().parent().find('.catalogPrice').attr('disabled', '');
        $(this).parent().parent().find('.catalogShipping').attr('disabled', '');
        $(this).parent().parent().find('.manuSKU').attr('disabled', '');
        $(this).next().show();
        $(this).hide();
        $(this).parent().parent().find('.buttonCancelAmendCatalog').show();
        $(this).parent().parent().find('.buttonRemoveCatalog').hide();
    });
    $('a.buttonCancelAmendCatalog').live('click', function () {

        $(this).parent().parent().find('.catalogNum').val($(this).parent().parent().find('.catalogNumHidden').val());
        $(this).parent().parent().find('.catalogPrice').val($(this).parent().parent().find('.catalogPriceHidden').val());
        $(this).parent().parent().find('.catalogShipping').val($(this).parent().parent().find('.catalogShippingHidden').val());
        $(this).parent().parent().find('.manuSKU').val($(this).parent().parent().find('.manuSKUHidden').val());
        $(this).parent().parent().find('.catalogNum').attr('disabled', 'disabled');
        $(this).parent().parent().find('.catalogPrice').attr('disabled', 'disabled');
        $(this).parent().parent().find('.catalogShipping').attr('disabled', 'disabled');
        $(this).prev().show();
        $(this).hide();
        $(this).parent().parent().find('.buttonAmendCatalog').show();
        $(this).parent().parent().find('.buttonSaveAmendCatalog').hide();
    });
    $('a.buttonSaveAmendCatalog').live('click', function () {
        var num = $(this).parent().parent().find('.catalogNum').val();
        var price = $(this).parent().parent().find('.catalogPrice').val();
        var shipping = $(this).parent().parent().find('.catalogShipping').val();
        var sku = $(this).parent().parent().find('.manuSKU').val();
        var id = $(this).attr('data');
        $.post('/SellerProduct/UpdateCatalog', j$.toJSON({ 'updateCatalogId': id, 'price': price, 'shipprice': shipping, 'num': num, 'sku': sku }), function (data) {
            if (data.success == "1") {
                //todo refresh list
                refreshCatalogList(data.data);
            }
            else {
                alert(data.message);
            }
        }, 'json');
    });

    //    $('#CreateSKUSelf').live('click', function () {
    //        $('#CreateSKUSelf').hide();
    //        $('#CreateSKUAuto').show();
    //        $('.manuSKU').show();
    //        $('.autoSKU').hide();
    //    });

    $('#CreateSKUAuto').live('click', function () {
        //        $('#CreateSKUAuto').hide();
        //        $('#CreateSKUSelf').show();
        //        $('.manuSKU').hide();
        //        $('.autoSKU').show();
        $.post('/SellerProduct/AddProductUseAutoSku', null, function (data) {
        }, 'json');
        $('.manuSKU').each(function () {
            $(this).val($(this).next().val());
        });
    });

    //    $('#testtt').onchange(function () {
    //        alert('as');
    //    });

    //upload pic
    // edited by Jeff @ 2011/5/25
    j$('button[id*="buttonProductPicture"]').click(function () {
        var index = this.id.substr(this.id.length - 1, 1);
        var filename = j$("#formUploadPic" + index + " input").val();
        if (filename == "") {
            alert("请选择文件。");
            return false;
        }
        var options = {
            type: "POST",
            dataType: "text",
            success: function (msg) {
                if (msg == "error") {
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                }
                else {
                    j$("#imgProductPicture" + index).attr("src", msg);
                    j$("#ProductPictureUrl" + index).val(msg);
                    j$("#imgProductPicture" + index).show();
                    j$("#dfPic" + index).hide();
                    j$("#buttonRemoveProductPicture" + index).show();
                    j$('input[name="fileProductPicture' + index + '"]').hide();
                    j$("#buttonProductPicture" + index).hide();
                }
            },
            error: function () {
                alert("图片上传异常，请重新选择较小的图片上传。");
            }
        };
        j$("#formUploadPic" + index).ajaxSubmit(options);
        return false;
    });
    j$("button[id*='buttonRemoveProductPicture']").click(function () {
        var index = this.id.substr(this.id.length - 1, 1);
        j$("#imgProductPicture" + index).attr("src", "");
        j$("#imgProductPicture" + index).hide();
        j$("#dfPic" + index).show();
        j$("#ProductPictureUrl" + index).val("");
        j$("#buttonRemoveProductPicture" + index).hide();
        j$('input[name="fileProductPicture' + index + '"]').show();
        j$("#buttonProductPicture" + index).show();
        return false;
    });
});



function refreshCatalogList(data) {
    j$('#divCatalogList').empty();
    j$.ymatoupost('/SellerProduct/CatalogList', null, function (data) {
        j$('#divCatalogList').append(data);
        if ($('.buttonRemoveCatalog').length == 0) {
            j$('.openProCheck').removeAttr("disabled");
        }
        //        j$('#divCatalogList').buttonset();
    }, 'html');
    //    //j$('#catalogTemplate').tmpl(data).appendTo('#divCatalogList');
    //    var h = "";
    //    for (var j = 0; j < data.length; j++) {
    //        var catalog = data[j];
    //        h += '<div class="attritem mb10">';
    //        h += '<span class="FL mr10">价格：' + catalog.Price + '元</span><br/>';
    //        for (var i = 0; i < catalog.PropertyValues.length; i++) {
    //            var property = catalog.PropertyValues[i];
    //            h += '<div class="attrformat FL mr10">';
    //            h += '<input type="checkbox" id="vck11"  /><label for="vck11"></label>';
    //            h += '</div><a class="buttonRemoveCatalog FL link ml10" data="' + catalog.Id + '">删除</a></div>';
    //        }
    //    }

    //    j$('#divCatalogList').append(h);
    //    j$('#divCatalogList').buttonset();
}
//j$(function () {
//    j$('.buttonRemoveProductPicture').live('click', function () {
//        var form = j$('#formRemoveProductPicture');
//        var div = j$(this).closest('div.divProductPicture');
//        j$.ymatoupost(form.attr('action'), div.find('*').serialize(), function (data) {
//            if (data.success == '1') {
//                alert('删除图片成功');
//                div.remove();
//            } else {
//                alert(data.message);
//            }
//        }, 'json');
//    });
//    j$('.buttonRemoveProductCatalog').live('click',function () {
//        //编辑页面，下线报价
//        var form = j$('#formRemoveProductCatalog');
//        var div = j$(this).closest('tr');
//        j$.post(form.attr('action'), j$.toJSON(div.find('*').serializeObject()), function (data) {
//            if (data.success == '1') {
//                alert('删除报价成功');
//                div.remove();
//            } else {
//                alert(data.message);
//            }
//        }, 'json');
//    });
//});

