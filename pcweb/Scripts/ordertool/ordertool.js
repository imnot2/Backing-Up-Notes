/*=======================ordertool.js===========================*/
var orderItemIndex = 0, orderItemCount = 1, itemselect;
var struc;
$(function() {
 $('.needValidationEmail').click(function () {
        $('#alterbbbhtml').html('<span style=\"font-size:14px;line-height:22px; text-align:center;float:left;margin-left:40px;width:330px\">' +
             '您还未验证个人信息，为保障您的消费者权益并确保账户安全，请立即去填写个人信息并进行邮箱验证！</span>');

        $('#alterbbb').show();
        $('#gookok').hide();
        $('#activeUrl').attr('href', "/UserProfile/CompleteLoginInfo");
        $('#recomplete').attr('href', "/UserProfile/CompleteLoginInfo");
     // $('#notActiveDiv').css('width','400px');
     //    struc.alert('#notActiveDiv');
        return false;
    });
    
    $('.NotLogined').click(function() {
        this.blur();
        struc.alert('#alert_login');
        return false;
    });

    $('.shut').live('click', function() {
        struc.close();
    });

    $('#finishLogin').click(function() {
        location.reload();
    });
});

Ymt.load("widget.Tabs, widget.LayerBox, widget.SeamlesScroll", function () {
    struc = Ymt.widget.LayerBox('struc');

    var imgCon = "<div class='form_info clearfix alert_box_show'><div class='item'><div class='title'><label>输入参考网址：</label></div><div class='fill'><div class='fill_left'><input type='text' value='' class='text extUrl' /></div><div class='fill_right'><span class='btn_0 btn_URL'><i></i><a href='javascript:void' title='确定'>确 定</a></span></div></div></div></div>";
    var orderTab = Ymt.widget.Tabs('.setorder_main', {
        panels: '.con_box .con_box_item',
        triggers: '.tab_box .tab li',
        triggerType: 'click'
    });
    $('#gointofastorder').click(function () { orderTab.switchTo(1); return false })
    //alert tab
    var alertTab = Ymt.widget.Tabs('#image_box', {
        panels: '.alert_show .content',
        triggers: '.alert_tab ul li',
        triggerType: 'click'
    });
    alertTab.on('switch', function (c) {
        var id = alertTab.activeIndex + 1;
        id = id == 3 ? 0 : id;
        // $('#image_box .fix .order_submit').attr('id', '#image_submit' + id);
        $('#image_box .alert_show>div:not(current)').find('input.text').attr('value', "");
        $('#img_Upload').val('')
        itemselect = id;
    });
    //alert box imageUrl
    var showImageBox = function (event) {
        orderItemIndex = j$(event.currentTarget).closest('.form_info').attr("id").replace('orderItem', '');
        imagebox.alert('#image_box');
        $('#image_box .content').eq(1).html('');
        $('#image_box .content').eq(1).append(imgCon);
    }
    var showImageBox2 = function (event) {
        orderItemIndex = j$(event.currentTarget).closest('.form_info').attr("id").replace('orderItem', '');
        imagebox.alert('#image_box');
        $('#image_box .content').eq(1).html('');
        $('#image_box .content').eq(1).append(imgCon);
        alertTab.switchTo(1)
        $(".extUrl").val(defaultRefUrl);
        $('.btn_URL').click();
    }
    var imagebox = Ymt.widget.LayerBox('struc');
    $('.reseturl').live('click', function () {
        $('#image_box .content').eq(1).html('');
        $('#image_box .content').eq(1).append(imgCon);
        return false;
    })
    $('#order_content .form_img_default,#order_content .releaseimg').live('click', showImageBox);
    $('#order_content .form_info_topic,#order_content .forum').live('click', showImageBox2);
    $('.shut_alert_box').live('click', function () { imagebox.close(); })
    //$('#image_cancel').live('click', function () { imagebox.close(); return false; });
    $('#image_submit').live('click', image_submit);
    $('.btn_IMG').live('click', image_submit);
    $('.form_info_img').live({
        mouseover: function () { $(this).find('.form_img_default').show(); return false; },
        mouseout: function () { !!$(this).find('.form_info_insert').find('img').size() && $(this).find('.form_img_default').hide(); return false }
    });
    $('.bottom .btn_1').live('click', function () {
        var url = $('#selectedImageUrl').val();
        setImageUrl(url);
        imagebox.close();
    })
    function image_submit(event) {
        var imageUrl = $('#selectedImageUrl').val();

        if (imageUrl == "") {
            alert("请选择图片");
            return false;
        }

        var ext = imageUrl.substr(imageUrl.length - 3).toUpperCase();
        if (ext != "JPG" && ext != "GIF" && ext != "BMP" && ext != "PNG") {
            alert("请上传符合要求的图片文件。");
            return false;
        }

        if (imageUrl.indexOf("http") != 0) {
            var form = j$('form#picForm0');
            var options = {
                type: "POST",
                dataType: "text",
                success: function (msg) {
                    $(event.target).html("确 定");
                    try {
                        var data = j$.parseJSON(msg);
                        if (data.result == "false") {
                            alert("图片上传失败，请核实文件类型后重新上传，文件大小不能大于3.5M。");
                        }
                        else {
                            setImageUrl(getSmallPicUrl(data.pictureUrl));
                            imagebox.close();
                        }
                    } catch (e) {
                        alert("图片上传异常。");
                    }
                },
                error: function (data, status, e) {
                    alert("图片上传异常，请重新选择较小的图片上传，文件大小不能大于3.5M。");
                    $(event.target).html($(event.target).attr("title"));
                }
            };
            $(event.target).html("上传中");
            form.ajaxSubmit(options);
        } else {
            var url = "/OrderTool/SavePic";

            j$.post(url, j$.toJSON({ 'url': imageUrl }), function (result) {
                $(event.target).html("确 定");
                if (result.success == 1) {
                    setImageUrl(getSmallPicUrl(result.url));
                    imagebox.close();
                }
                else {
                    alert(result.message);
                }
            });
            $(event.target).html("上传中");
        }
        return false;
    }
    function setImageUrl(imageUrl) {
        $('#orderItem' + orderItemIndex).find('.productImg').val(imageUrl);
        var o = $("<img />");
        $('#orderItem' + orderItemIndex).find('.form_info_insert').html(o).show(200);
        o.attr('src', imageUrl);
        if (o.outerHeight() > 140) {
            o.height(140)
        }
        if (o.outerWidth() > 140) {
            o.width(140)
        }
        $('#selectedImageUrl').val('');
        o = null;
        imagebox.close();
    }
    function getSmallPicUrl(url) {
        return url.replace("/original/", "/list/").replace("_o.", "_l.");
    }
    ////alert scroll
    function btn_URL() {
        var content = $(this).closest('.content');
        var obj = $(this).closest('.form_info');
        var url = obj.find('.extUrl').val();
        var form = j$('form#formGetImageUrls');
        j$.ymatoupost(form.attr('action'), "url=" + url, function (data) {
            if (data.urls) {
                if (data.urls.length > 0) {
                    var imgHtml = '<ul class="clearfix">';
                    for (var i = 0; i < data.urls.length; i++) {
                        imgHtml += '<li><a href="javascript:;" title=""><img src="' + data.urls[i] + '" /></a></li>';
                    }
                    imgHtml += '</ul>';

                    $('.seamlesScroll .scroller').html(imgHtml);
                    if (!content.find('.seamlesScroll').size()) {
                        content.html($('.seamlesScroll').clone().css('display', 'block'));
                    }

                    var scro = Ymt.widget.SeamlesScroll('.seamlesScroll', {
                        panels: '.scroller li',
                        btnPrev: '.btn_prev',
                        btnNext: '.btn_next',
                        speed: 500,
                        scroll: 2,
                        circular: false,
                        visible: 5
                    });
                    var con = $('#image_box .seamlesScroll .scroller');
                    con.find('img').live('click', function () {
                        //var index = con.find('img').index($(this));
                        con.find('img').css('border', 'none');
                        $(this).css('border', '1px solid #FF0000');
                        $('#selectedImageUrl').val($(this).attr('src'));
                    })
                } else {
                    alert("没有找到有效的图片");
                }
            } else {
                alert("暂时无法从改URL获取图片信息");
            }
        });
        return false
    }
    $('.btn_URL').live('click', btn_URL)
    $('.extImage').blur(function () {
        $('#selectedImageUrl').val($(this).val());
        return false;
    });

    var text0 = $('#order_content .form_info_hd .text');
    var area0 = $('#order_content .form_info_hd');
    var area1 = $('#fast_order_content .form_info').eq(0).find('.item');
    var text1 = area1.find('.text');
    !text0.attr('value') && area0.hover(
    //function () { $(this).find('.fill_right').css('display', 'block'); return false },
    //function () { !text0.attr('value') && $(this).find('.fill_right').css('display', 'none'); return false }
    );
    !text1.attr('value') && area1.hover(
    //function () { $(this).find('.fill_right').css('display', 'block'); return false },
    //function () { !text1.attr('value') && $(this).find('.fill_right').css('display', 'none'); return false }
    );
    text0.live({
        focusin: function () {
            area0.find('.fill_right').addClass('LH').html('支付的定金建议为商品售价的30%,每件商品定<br />金不低于50元.请先联系买手约定定金金额.')
        },
        focusout: function () {
            !area0.attr('value') && area0.find('.fill_right').removeClass('LH').html("填写订单信息太麻烦? 进入<a href='javascript:void'>快速下单</a>模式.")
        }
    })
    //type="fill"
    $('.img_Upload').bind('change', function () {
        var va = $(this).val();
        $('#selectedImageUrl').val($(this).val());
        // alert($('#imageUrl').val());
        $(this).closest('.form_info').find("input[type='text']").attr('value', va);
    })
    $('.add').live('click', function () {
        var objNum = $(this).parent().find('.productNum');
        var num = parseInt(objNum.val());
        if (isNaN(num))
            num = 0;
        objNum.val(++num);
    });
    $('.reduce').live('click', function () {
        var objNum = $(this).parent().find('.productNum');
        var num = parseInt(objNum.val());
        if (isNaN(num))
            num = 0;
        objNum.val(num > 0 ? --num : 0);
    });
    //验证模块
    function focusevent(obj, text) {
        var verifi = obj.next('.verifi');
        verifi.html(text);
        verifi.hide();
    }
    //    function priceblur(obj, text) {
    //        var va = obj.attr('value');
    //        var verifi = obj.next('.verifi');
    //        if (!$.trim(va)) {
    //            verifi.css('display', 'inline-block');
    //            validateform_0 = false;
    //        }
    //        if (!!$.trim(va) && !(/^\+?[1-9][0-9]*$|^\d+(\.\d*)?$/.test(va))) {
    //            verifi.html('定金总价须是大于零的数字')
    //            verifi.css('display', 'inline-block');
    //            validateform_0 = false;
    //        }
    //    }
    var validateform_0 = false, validateform_1 = false;
    $('#order_content .txtPrice').live({
        keyup: function () {
            var verifi = $(this).next('.verifi');
            verifi.html('定金总价不能为空');
            verifi.hide();
        },
        blur: function () {
            var va = $(this).attr('value');
            var verifi = $(this).next('.verifi');
            if (!$.trim(va)) {
                verifi.html('定金总价不能为空');
                verifi.css('display', 'inline-block');
                validateform_0 = false;
            }
            if (!!$.trim(va) && !(/^\+?[1-9][0-9]*$|^\d+(\.\d*)?$/.test(va))) {
                verifi.html('定金总价须是大于零的数字')
                verifi.css('display', 'inline-block');
                validateform_0 = false;
            }
        }
    })
    $('#order_content .productName').live({
        focus: function () {
            var verifi = $(this).next('.verifi');
            verifi.html('商品名称不能为空');
            verifi.hide();
        },
        blur: function () {
            var va = $(this).attr('value');
            var verifi = $(this).next('.verifi');
            if (!$.trim(va)) {
                verifi.html('商品名称不能为空');
                verifi.css('display', 'inline-block');
                validateform_0 = false;
            }
        }
    })
    $('#order_content .productNum').live({
        keyup: function () {
            var verifi = $(this).parent().next('.verifi');
            verifi.html('商品数量不能为空');
            verifi.hide();
        },
        blur: function () {
            var va = $(this).attr('value');
            var verifi = $(this).parent().next('.verifi');
            if (!$.trim(va)) {
                verifi.html('商品数量不能为空');
                verifi.css('display', 'inline-block');
                validateform_0 = false;
            }
            if (!!$.trim(va) && !(/^\+?[1-9][0-9]*$/.test(va))) {
                verifi.html('商品数量为大于零的正整数');
                verifi.css('display', 'inline-block');
                validateform_0 = false;
            }
        }
    })
    $('#fast_order_content .txtPrice').live({
        keyup: function () {
            var verifi = $(this).next('.verifi');
            verifi.html('定金总价不能为空');
            verifi.hide();
        },
        blur: function () {
            var va = $(this).attr('value');
            var verifi = $(this).next('.verifi');
            if (!$.trim(va)) {
                verifi.html('定金总价不能为空');
                verifi.css('display', 'inline-block');
                validateform_1 = false;
            }
            if (!!$.trim(va) && !(/^\+?[1-9][0-9]*$|^\d+(\.\d*)?$/.test(va))) {
                verifi.html('定金总价只能是数字.')
                verifi.css('display', 'inline-block');
                validateform_1 = false;
            }
        }
    })
    $('#fast_order_content .txtDesc').live({
        keyup: function () {
            var verifi = $(this).next('.verifi');
            verifi.html('描述信息不能为空');
            verifi.hide();
        },
        blur: function () {
            var va = $(this).attr('value');
            var verifi = $(this).next('.verifi');
            if (!$.trim(va)) {
                verifi.html('描述信息不能为空');
                verifi.css('display', 'inline-block');
                validateform_1 = false;
            }
        }
    })

    //添加模块
    $('.form_info_add').live('click', function () {
        var o = $(this)
        var html = $('.order_item_mod').clone().css('display', 'block').removeClass('order_item_mod');
        html.find(".productName").val("");
        html.find(".productDesc").val("");
        html.find(".productUrl").val("");
        html.insertAfter(o.parent().find('.form_info:last'))
        var newBlock = o.parent().find('.form_info:last');
        newBlock.attr("id", "orderItem" + orderItemCount++);
        newBlock.find('.form_info_img').click(showImageBox);
        $('#image_box .content').eq(1).append(imgCon);
        return false;
    })
    $('.shut').live('click', function () {
        if (orderItemCount > 1) {
            var o = $(this);
            o.parent().remove();
            o = null;
            orderItemCount--;
            return false;
        }
    })
    $('.layerbox-0 .shut').click(function () {
        $(this).closest('.layerbox-0').find('.box').hide()
        return false;
    })
    function getFastOrderJson() {
        var obj = null, o = $('#fast_order_content'), info = o.find('.form_info'), len = info.size(), i, arr = [];

        return {
            Price: info.eq(0).find('.txtPrice').val(),
            TopicId: $('.topicId').val(),
            OrderInfoType: "Earnest",
            Item: [{
                ProductName: escape('快速下单商品'),
                ProductNum: 1,
                ProductDesc: o.find('.txtDesc').val() == productDescHint2 ? "" : escape(o.find('.txtDesc').val())
            }]
        }
    }

    function getOrderJson() {
        var obj = null, o = $('#order_content'), info = o.find('.form_info'), len = info.size(), i, arr = [];

        for (i = 1; i < len; i++) {
            obj = createObj(info.eq(i));
            if (obj.ProductName == escape(productNameHint))
                obj.ProductName = "";
            if (obj.ProductDesc == escape(productDescHint))
                obj.ProductDesc = "";
            if (obj.ProductUrl == escape(productUrlHint))
                obj.ProductUrl = "";
            arr.push(obj)
        }
        return {
            Price: info.eq(0).find('.txtPrice').val(),
            TopicId: $('.topicId').val(),
            Item: arr,
            OrderInfoType: $("input[name=buyerPayType]:checked").val()
        }
    }
    function createObj(o) {
        return {
            //            ProductName: o.find('.productName').val(),
            //            ProductNum: o.find('.productNum').val(),
            //            ProductDesc: o.find('.productDesc').val(),
            //            ProductUrl: o.find('.productUrl').val(),
            //            ProductImg: o.find('.productImg').val()
            ProductName: escape(o.find('.productName').val().replace(new RegExp("\"","gm"),"'")),
            ProductNum: o.find('.productNum').val(),
            ProductDesc: escape(o.find('.productDesc').val().replace(new RegExp("\"", "gm"), "'")),
            ProductUrl: escape(o.find('.productUrl').val().replace(new RegExp("\"", "gm"), "'")),
            ProductImg: o.find('.productImg').val()
        }
    }
    //验证
    function validate(obj) {
        if (isNaN(parseFloat(obj.Price)))
            return false;

        for (var i = 0; i < obj.Item.length; i++) {
            if (!$.trim(obj.Item[i].ProductName) || isNaN(parseInt(obj.Item[i].ProductNum)) ) {
                return false;
            }
        }

        return true;
    }

    function showVerifyMessage_0() {
        $('#order_content .txtPrice').each(function () {
            this.focus();
            this.blur();
        });
        $('#order_content .productName').each(function () {
            this.focus();
            this.blur();
        });
        $('#order_content .productNum').each(function () {
            this.focus();
            this.blur();
        });
    }

    function showVerifyMessage_1() {
        $('#fast_order_content .txtPrice').focus();
        $('#fast_order_content .txtPrice').blur();

        $('#fast_order_content .txtDesc').focus();
        $('#fast_order_content .txtDesc').blur();
    }

    //提交按钮
    $('#order_submit_btn').bind('click', function () {
        var obj = getOrderJson();

        if (validate(obj)) {
            saveOrder(obj);
        } else {
            showVerifyMessage_0();
        }
        return false;
    });


    $('#order_fast_sub .submit_btn_box').bind('click', function () {
        var obj = getFastOrderJson();

        if (validate(obj)) {
            saveOrder(obj);
        } else {
            showVerifyMessage_1();
        }
        return false;
    });

    function saveOrder(obj) {
        var form = j$('form#formSubmitOrder');
        j$.ymatoupost(form.attr('action'), "json=" + j$.toJSON(obj), function (data) {
            if (data.result == true) {
                form = j$('form#formChangeAddressPreCheck');
                j$.ymatoupost(form.attr('action'), form.serialize(), function (data) {
                    if (data.result == true) {
                        j$('form#formChangeAddress').submit();
                    } else {
                        alert("系统无法保存订单：\n" + data.errorMessage);
                    }
                }, 'json');
            } else {
                alert(data.message);
            }
        });
    }

    var productNameHint = "如：timberland防水男鞋", productDescHint = "如：\n尺寸：8.5 2E US  颜色：Black nubuck\n其他留言：官网价格超过50$不要下单", productUrlHint = "http://", productDescHint2 = "如：timberland防水男鞋 \n尺寸：8.5 2E US  颜色：Black nubuck\n购买链接：http://\n其他留言";

    var _inputFocus = function () {
        j$(this).addClass("mt_text_act");
        j$(this).val();
        if (j$.trim(j$(this).val()) == j$(this).data("txt")) {
            j$(this).val("");
        }
    };

    var _inputBlur = function () {
        j$(this).addClass("mt_text_act");
        if (j$.trim(j$(this).val()) == j$(this).data("txt")) {
            j$(this).val("");
        }
    };

    j$(".productName").each(function () {
        if (j$(this).val() == "") {
            j$(this).val(productNameHint);
            j$(this).data("txt", productNameHint);
        }
    }).focus(_inputFocus).blur(_inputBlur);

    j$(".productDesc").each(function () {
        if (j$(this).val() == "") {
            j$(this).val(productDescHint);
            j$(this).data("txt", productDescHint);
        }
    }).focus(_inputFocus).blur(_inputBlur);

    j$(".productUrl").each(function () {
        if (j$(this).val() == "") {
            j$(this).val(productUrlHint);
            j$(this).data("txt", productUrlHint);
        }
    }).focus(_inputFocus).blur(_inputBlur);

    j$(".txtDesc").each(function () {
        if (j$(this).val() == "") {
            j$(this).val(productDescHint2);
            j$(this).data("txt", productDescHint2);
        }
    }).focus(_inputFocus).blur(_inputBlur);

    

    if (defaultRefUrl != "")
        j$(".productUrl").val(defaultRefUrl);


    if (j$('.usedpic').length > 0) {
        j$('.form_info_insert').show();
    }

    if (j$('#OldProductName').val() != "") {
        j$('.productName').val(j$('#OldProductName').val());
    }

    if (j$('#OldDescript').val() != "") {
        j$('.productDesc').val(j$('#OldDescript').val());
    }

    if (j$('#OldRefUrl').val() != "") {
        j$('.productUrl').val(j$('#OldRefUrl').val());
    }

}, true)

