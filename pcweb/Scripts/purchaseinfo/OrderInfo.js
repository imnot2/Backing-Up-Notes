/*=======================OrderInfo.js===========================*/
var selectedAddressText = "", selectedAddressValue = "", thisOrderIndex = -1, useNewAddress = false;
var clicked = false;

var modify = false;

String.prototype.replaceAll = function (AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return this.replace(raRegExp, ARepText);
};


var _maxSetting = {};
var hidIsHaveIDCard = $('#hidIsHaveIDCard').val() == "1";
var isNeedUploadIdCard = $('#hidIsNeedUploadIdCard').val() == "True";

//var oldaddressAddData = null;

var initHasMail = $('#tempEmailAddress').val() ? !0 : !1;

Ymt.load(["widget/LayerBox", "ui/form/Validate"], function (LayerBox, Validate) {

    $('.address_radio input:checked') && $('.address_radio input:checked').closest('.address_item').addClass('default')
    ////alert box
    var alertbox = LayerBox('struc');

    var Val_PostCode = Validate('#inputPostCode', {
        TipMsg: "请输入邮编",
        FixedDefaultClass: ".greybg",
        validateType: [
        { k: 0, regexp: /^\d{6}$/, msg: "邮编格式不正确" },
            { k: 1, msg: "邮编不允许为空" }
        ]
    });



    var Val_Address = Validate('#inputAddress', {
        TipMsg: "请输入详细地址",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "地址不允许为空" }
        ]
    });

    var Val_Name = Validate('#inputName', {
        TipMsg: "请输入收货人姓名",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "收货人姓名不允许为空" }]
    });

    var Val_phone = Validate('#inputPhone', {
        TipMsg: "输入有效的手机号",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "手机号不允许为空" },
            { k: 2, p: 11, msg: "手机号格式不正确" }]
    });

    var Val_mail = Validate('#inputEmail', {
        TipMsg: "请填写您常用的邮箱，以便及时收到订单状态的提醒！",
        FixedDefaultClass: ".greybg",
        FixedContainer: '#inputEmail~.verifi',
        validateType: [{ k: 1, msg: "邮箱地址不能为空" }, {
            k: 5,
            msg: "邮箱格式不正确，例如abc@efg.com"
        }
        , {
            Ajax: {
                open: !0,
                url: "/Register/ValidateRegEamil?email="
            }
        }]
    });

    $('.address_btn').click(function () {
        $('.verifi').html();
        $('#inputEmail~.verifi').html('请填写您常用的邮箱，以便及时收到订单状态的提醒！').css('display', 'inline-block');
        //  $('.alert_current #address_new').show();
        var suffix = this.id.replace("address_btn_", "");

        if (suffix == "add") {
            useNewAddress = true;
            $('#address_new').show();
            $('#oldaddress').hide();
        } else if (suffix == "set") {

            useNewAddress = false;
            $('#oldaddress').show();
        } else {
            if (isNaN(parseInt(suffix)) == false) {

                thisOrderIndex = parseInt(suffix);
                useNewAddress = true;

                $('.order_submit').show();
                $('#oldaddress').show();

                if ($(".ao .address_item").length == 5) {
                    $("#address_btn_add").hide();
                    $('#address_new').hide();
                    useNewAddress = false;
                    $('.order_submit').hide();
                }
                else {
                    $("#address_btn_add").show();
                    $('#address_new').show();
                }


            } else {
                return false;
            }
        }

        if (canAddAddress == false || $(".alert_current").find(".address_item").length >= 5) {
            $('#address_btn_new').hide();
        }

        $('#address_new').find('.tProvince').val("");
        $('#address_new').find('.tCity').val("");
        $('#address_new').find('.tCounty').val("");
        $('#address_new').find('.txtAddress').val("");
        $('#address_new').find('.txtPost').val("");
        $('#address_new').find('.txtName').val("");
        $('#address_new').find('.txtPhone').val("");
        $('#address_new').find('.txtTel').val("");
        $('#address_new').find('.txtQQ').val("");
        $('#address_new').find('.txtEmail').val("");
        // $('#address_new').hide();

        $('.province option[value=]').attr("selected", true);
        $('.city option[value=]').attr("selected", true);
        $('.county option[value=]').attr("selected", true);

        alertbox.alert('#alert_box');
		$('#currSellerId').val($(this).attr("sellerid"));
        return false;
    });

    function setSelectedAddress() {
        alertbox.close();

        //$('.address_text_default').html(selectedAddressText);
        if (thisOrderIndex >= 0) {
            $('#order_' + thisOrderIndex).find('.address_text_con').html(selectedAddressText);
            $('#order_' + thisOrderIndex).find('.vAddress').val(selectedAddressValue);
        } else {
            $('.oneorder').each(function () {
                $(this).find('.address_text_con').html(selectedAddressText);
                $(this).find('.vAddress').val(selectedAddressValue);
            });
        }
    }



    function updateAlertBox(oldvalue, newvalue) {
        $('.sel .address_item').each(function (index, element) {
            var value = $(element).find('.address_value').val();
            if (value == oldvalue) {
                $(element).find('.address_value').val(newvalue);
            }
        });

    }


    function GenerateSelectedText() {
        selectedAddressText = $('#address_new').find('.tProvince').val() + ",";
        selectedAddressText += $('#address_new').find('.tCity').val() + ",";
        selectedAddressText += $('#address_new').find('.tCounty').val() + ",";
        selectedAddressText += $('#address_new').find('.txtAddress').val();
        selectedAddressText += "邮编：<span>" + $('#address_new').find('.txtPost').val() + "</span>";
        selectedAddressText += "姓名：<span class='asn'>" + $('#address_new').find('.txtName').val().replace(" ", "") + "</span>";
        selectedAddressText += "手机：<span class='ash'>" + $('#address_new').find('.txtPhone').val() + "</span>";
        selectedAddressText += "座机：<span>" + $('#address_new').find('.txtTel').val() + "</span>";
    }

    function GenerateSelectedValue(addressId) {
        selectedAddressValue = $('#address_new').find('.tProvince').val() + ",";
        selectedAddressValue += $('#address_new').find('.tCity').val() + ",";
        selectedAddressValue += $('#address_new').find('.tCounty').val() + ",";
        selectedAddressValue += $('#address_new').find('.txtAddress').val() + "\n";
        selectedAddressValue += $('#address_new').find('.txtPost').val() + "\n";
        selectedAddressValue += $('#address_new').find('.txtName').val() + "\n";
        selectedAddressValue += $('#address_new').find('.txtPhone').val() + "\n";
        selectedAddressValue += $('#address_new').find('.txtTel').val() + "\n";
        selectedAddressValue += addressId;
    }

    function setHighlistAddress(lastAddress) {
        $('.bdcurrent .address_item').each(function () {
            $(this).removeClass('default');
        });

        $(lastAddress).addClass('default')

        $('.bdcurrent .modadd').hide();
        $(lastAddress).find('.modadd').show();
    }



    //#region 判断新增的地址里的收货人是否有身份证而显示上传身份的提示标记 author: adu 2014-07-15
    //zhangdong
    function CheckoutIdCard(cardOwner, mobile, elem) {
        var bonded = $("#hidBondedNotNeedIdCard").val();
        $('#AddressList').find('.JSnoid').hide();
        $('#address').find('.JSnoid').hide();
        //有护航直邮的商品才会上传身份证的必要性
        if (isNeedUploadIdCard) {
            $.get('/IdCardManage/IdCardExistsByMobile?cardOwner=' + encodeURIComponent(cardOwner) + '&mobile=' + encodeURIComponent(mobile)+ '&BondedNotNeedIdCard=' +encodeURIComponent(bonded), function (data) {

                //alert(data);
                if (data == "True") {
                    //alert("fff");
                    $('#hidIsHaveIDCard').val('1');
                } else {
                    elem.hasClass('default') && elem.find('.JSnoid').show();//只显示被选的验证身份证提醒
                    $('#hidIsHaveIDCard').val('0');
                }

            });
        }
        //#endregion 判断新增的地址里的收货人是否有身份证而显示上传身份的提示标记

    }

    CheckoutIdCard($('#AddressList .default .asn').text(), $('#AddressList .default .ash').text(), $('#AddressList .default'));


    $('#alert_box .order_submit').click(function () {

        if (!(Val_PostCode.validate() && Val_Address.validate() && Val_Name.validate() && Val_phone.validate())) {
            return
        }

        if (clicked) {
            return;
        }

        if (useNewAddress == true) {

            var addressAddData = {
                AdsText: $('#address_new').find('.txtAddress').val(),
                TextboxRecipient: $('#address_new').find('.txtName').val(),
                TextboxTelephone: $('#address_new').find('.txtTel').val(),
                TextboxCellphone: $('#address_new').find('.txtPhone').val(),
                TextboxPostCode: $('#address_new').find('.txtPost').val(),
                TProvince: $('#address_new').find('.tProvince').val(),
                TCity: $('#address_new').find('.tCity').val(),
                TCounty: $('#address_new').find('.tCounty').val(),
                LoginEmail: $('#address_new').find('[name="LoginEmail"]').val()
            };

            if (!initHasMail) {
                if (!Val_mail.validate()) {
                    return;
                }
            }

            var url = "/UserAddress/AddNewAddress";
            $.post(url, $.toJSON({ 'addressAddData': addressAddData }), function (data) {
                if (data.success == 1) {
                    alert('保存成功');

                    if (addressAddData.LoginEmail) {
                        $('#AddressList .EmailTemplate').html("").hide();
                        $('#tempEmailAddress').val(addressAddData.LoginEmail)
                    }

                    GenerateSelectedText();
                    GenerateSelectedValue(data.addressid);



                    //                    var lastAddress = $(".alert_current").find(".address_item:last").clone();
                    //                    lastAddress.insertAfter($(".alert_current").find(".address_item:last"));
                    //                    lastAddress.find(".address_text").html(selectedAddressText);


                    //var lastAddress = $(".bdcurrent").find(".address_item:last").clone();



                    var lastAddress = $(".sel").find(".address_item:last").clone();

                    $(lastAddress).attr("addressid", data.addressid);
                    lastAddress.insertAfter($(".sel").find(".address_item:last"));



                    lastAddress.find(".address_text").html(selectedAddressText);
                    lastAddress.find(".address_value").val(selectedAddressValue);
                    lastAddress.show();
                    lastAddress.find(".radio").attr('checked', true);


                    lastAddress = $(".ao").find(".address_item:last").clone();
                    $(lastAddress).attr("addressid", data.addressid);


                    //显示高亮，修改地址链接
                    setHighlistAddress(lastAddress);


                    lastAddress.insertAfter($(".ao").find(".address_item:last"));
                    lastAddress.find(".address_text").html(selectedAddressText);
                    lastAddress.find(".address_value").val(selectedAddressValue);

                    //#region 判断新增的地址里的收货人是否有身份证而显示上传身份的提示标记 author: adu 2014-07-15
                    //ZHANGDONG
                    CheckoutIdCard(addressAddData.TextboxRecipient, addressAddData.TextboxCellphone, lastAddress);


                    lastAddress.show();
                    lastAddress.find(".radio").attr('checked', true);
                    $('.address_text_default').hide();

                    setSelectedAddress();

                    if ($(".ao .address_item").length >= 5) {
                        $("#address_btn_add").hide();
                    }
                    else {
                        $("#address_btn_add").show();
                    }

                    //全局更改地址
                    ReCalculateFeight(selectedAddressValue)
                    checkIdCardExistsByNames();
                    clicked = false;
                    //window.location.reload();
                } else {
                    clicked = false;
                    alert(data.message);
                    //alert(data.Message);
                }
            }, 'json');

            return false;
        }

        if (modify == true) {
            var addressAddData = {
                AdsText: $('#address_new').find('.txtAddress').val(),
                TextboxRecipient: $('#address_new').find('.txtName').val(),
                TextboxTelephone: $('#address_new').find('.txtTel').val(),
                TextboxCellphone: $('#address_new').find('.txtPhone').val(),
                TextboxPostCode: $('#address_new').find('.txtPost').val(),
                TProvince: $('#address_new').find('.tProvince').val(),
                TCity: $('#address_new').find('.tCity').val(),
                TCounty: $('#address_new').find('.tCounty').val(),
                LoginEmail: $('#address_new').find('[name="LoginEmail"]').val()

            };

            if (!initHasMail) {
                if (!Val_mail.validate()) {
                    return;
                }
            }

            var url = "/UserAddress/UpdateAddress";
            var addressData = $(".ao .default").find('.address_value').val().split("\n");
            var addressId = addressData[5];

            $.post(url, $.toJSON({ 'addressAddData': addressAddData, 'addressId': addressId }), function (data) {
                if (data.success == 1) {
                    alert('保存成功');

                    if (addressAddData.LoginEmail) {
                        $('#AddressList .EmailTemplate').html("").hide();
                        $('#tempEmailAddress').val(addressAddData.LoginEmail)
                    }

                    GenerateSelectedText();
                    GenerateSelectedValue(data.addressid);

                    var defaultElem = $(".ao .default");
                    defaultElem.find(".address_text").html(selectedAddressText);
                    defaultElem.find(".address_value").val(selectedAddressValue);

                    //ZHANGDONG
                    CheckoutIdCard(addressAddData.TextboxRecipient, addressAddData.TextboxCellphone, defaultElem);

                    $(".sel").find("[addressid=" + addressId + "]").find(".address_text").html(selectedAddressText);
                    $(".sel").find("[addressid=" + addressId + "]").find(".address_value").val(selectedAddressValue);

                    setSelectedAddress();

                    //全局更改地址
                    ReCalculateFeight(selectedAddressValue)
                    checkIdCardExistsByNames();
                    clicked = false;

                }
                else {
                    clicked = false;
                    alert(data.message);
                }
            });
            return false;
        }
        modify = false;
        clicked = false;
        setSelectedAddress();
        checkIdCardExistsByNames();
        return false;

    });

    $('#alert_box .order_submit_cancel').click(function () {
        //    $('#address_new').css('display', 'none');
        alertbox.close();
        return false;
    });
    var mv = {
        ie: function () {
            return !!window.ActiveXObject
        },
        version: function () {
            if (window.ActiveXObject) {
                var e = !!window.ActiveXObject,
                a = e && !window.XMLHttpRequest,
                b = e && !!document.documentMode;
                if (e) if (a) return "6.0";
                else if (b) return "8.0";
                else if (e && !a && !b) return "7.0"
            }
        }
    };
    $('#address_btn_new').bind('click', function () {
        //var obj=$(this).find('b');
        $('.address_new .address_item').each(function () {
            $(this).removeClass('default');
            $(this).find('input').attr('checked', false);
        });
        useNewAddress = true;
        $('#address_new').css('display', 'block');
        var offobj = $('#alert_box');
        var top = center(offobj);
        $(window).resize(function () { $('#alert_box').animate({ top: top }, 500); });
        $('#alert_box').animate({ top: top }, 500);
        return false;
    });

    function center(obj) {
        var a = obj.outerHeight();
        mv.version() == 6 ? obj.attr('position', 'absolute') : obj.attr('position', 'fixed');
        var top = (mv.version() != 6 ? (document.documentElement.clientHeight - a) / 2 : (document.documentElement.clientHeight - a) / 2 + document.documentElement.scrollTop);
        return top;
    }
	
	//全局地址
    function ReCalculateFeight(address) {
        $.post('/PurchaseInfo/JsonReCalculateFreight?address=' + encodeURIComponent(address), function (data) {
            var json = data;

            var frieghts = data.Freights;
            $(frieghts).each(function (index, d) {
                //alert(d.SellerFreightHtmlId);
                //alert(d.SellerFreightValue);

                $('#freight_' + d.SellerFreightHtmlId).html(d.SellerFreightValue);
                $('#totalprice_' + d.SellerTotalHtmlId).html(d.SellerTotalValue);

            });
            $('#totalall').html("<b>¥" + data.TotalValue.replace("¥","") + "</b>");
            $('#totalflight').html("¥" + data.TotalFreight.replace("¥",""));

			$('#totalallVal').val(parseFloat(data.TotalValue.replace("¥","").replace(/,/g, '')).toFixed(2));
			$('#totalFreight').val(parseFloat(data.TotalFreight.replace("¥","").replace(/,/g, '')).toFixed(2));

        }, 'json');
    }

	// 单个订单的地址修改
	function ReCalculateFeightSingle(address, orderIndex) {
        $.post('/PurchaseInfo/JsonReCalculateFreight?address=' + encodeURIComponent(address), function (data) {
            var json = data;
			var sellerId = $('#currSellerId').val();
            var frieghts = data.Freights;
            $(frieghts).each(function (index, d) {
               
				 // 取订单中商品数量
                var prodCount = $("#order_"+orderIndex).find(".product_name").length || 1;
                // 订单和运费有两个项
                var tempPriceAndFreightCount = 2;
                
                // 循环时需要过滤的阙值
                var filterValue = prodCount + tempPriceAndFreightCount;

                if(((orderIndex + 1) * filterValue) > index && (orderIndex * filterValue) <= index )
				{
					$('#freight_' + d.SellerFreightHtmlId).html(d.SellerFreightValue);
					$('#totalprice_' + d.SellerTotalHtmlId).html(d.SellerTotalValue);

					$('#freight_' + d.SellerFreightHtmlId).attr("num",(d.SellerFreightValue||'').replace("¥",""));
					$('#totalprice_' + d.SellerTotalHtmlId).attr("num",(d.SellerTotalValue||'').replace("¥",""));
				}
            });

			var totalPrice = 0;
			var totalFreight = 0;
			$(".singleprice").each(function(){
				totalPrice += parseFloat($(this).attr("num").replace(/,/g, ''));
			});
			
			$(".singlefreight").each(function(){
				totalFreight += parseFloat($(this).attr("num").replace(/,/g, ''));
			});

            $('#totalall').html("<b>¥" + parseFloat(totalPrice).toFixed(2) + '</b>');
            $('#totalflight').html("¥" + parseFloat(totalFreight).toFixed(2));
			
			$('#totalallVal').val(parseFloat(totalPrice).toFixed(2));
			$('#totalFreight').val(parseFloat(totalFreight).toFixed(2));

        }, 'json');
    }


    $('.shut').live('click', function () {
        alertbox.close();
    })

    function ChangeAddress() {
        alertbox.alert('#alert_box');

        $('#oldaddress').hide();
        var addressData = $(".ao .default").find('.address_value').val().split("\n");
        //address
        $('#address_new #inputAddress').val(addressData[0].split(',')[3]);
        //name
        $('#address_new #inputName').val(addressData[2]);

        //mobile
        $('#address_new #inputPhone').val(addressData[3]);

        //zipcode
        $('#address_new #inputPostCode').val(addressData[1]);


        //telephone
        $('#address_new #inputTelepone').val(addressData[4]);

        //province
        var pstr = addressData[0].split(',')[0];
        var cstr = addressData[0].split(',')[1];
        var astr = addressData[0].split(',')[2];



        $(".ChinaArea").jChinaArea({
            aspnet: true,
            s1: pstr, //默认选中的省名
            s2: cstr, //默认选中的市名
            s3: astr//默认选中的县区名
        });


        useNewAddress = false;

        $('#address_new').show();
        $('.order_submit').show();

        modify = true;
        CheckoutIdCard($('#AddressList .default .asn').text(), $('#AddressList .default .ash').text(), $('#AddressList .default'));
        //            oldaddressAddData = {
        //                AdsText: addressData[0].split(',')[3],
        //                TextboxRecipient: addressData[2],
        //                TextboxTelephone: '',
        //                TextboxCellphone: addressData[3],
        //                TextboxPostCode: addressData[1],
        //                TProvince: pstr,
        //                TCity: cstr,
        //                TCounty: astr
        //            };
    }


    $('#AddressList .modifyaddr').live('click', function () {
        ChangeAddress();
        return false;
    })

    $('.bdcurrent .hd').live("click", function (e) {

        var address_item = $(this).closest('.address_item');

        if (address_item.hasClass("default")) {
            return false;
        }

        //有地址无邮箱状态添加邮箱

        var hasEmail = $('#tempEmailAddress').val() ? !0 : !1;
        var EmailTemplate = '<div class="tooltip-3 addemail"><p class="yel">请填写您的常用邮箱，以便及时收到订单状态的提醒！</p><div>邮箱：<input type="text" class="mailfield" value="" name="AddNewEmail" /><span class="vertify"></span></div></div>';

        if (!confirm('更新地址后，您需要重新确认订单信息')) {
            return false;
        }

        $('.bdcurrent .address_item').each(function () {
            $(this).removeClass('default');
        });

        address_item.addClass('default')



        if (!hasEmail) {
            $('#AddressList .EmailTemplate').html("").hide()
            address_item.find('.EmailTemplate').html(EmailTemplate).show();
            //return;
        }

        if (!address_item.hasClass("bo")) {
            $('.bdcurrent .modadd').hide();
            address_item.find('.modadd').show();
        }

        if (!address_item.hasClass("bo")) {
            useNewAddress = false;
        }

        $('#AddressList').find('[type="radio"]').attr('checked', false);
        address_item.find('[type="radio"]').attr('checked', true);

        //====== js控制选择收货地址时是否显示上传身份证的提示 start author:adu 2014-07-07
        //隐藏所有的验证身份证提醒

        //ZHANGDONG
        CheckoutIdCard(address_item.find('.asn').text(), address_item.find('.ash').text(), address_item);

        selectedAddressValue = address_item.find('.address_value').val();
        selectedAddressText = address_item.find('.address_text').html();

        var className = address_item.parent().attr('class');
        if (thisOrderIndex >= 0 && className == "bd bdcurrent sel") {
            $('#order_' + thisOrderIndex).find('.address_text_con').html(selectedAddressText);
            $('#order_' + thisOrderIndex).find('.vAddress').val(selectedAddressValue);
            //单个更改地址
            ReCalculateFeightSingle(selectedAddressValue, thisOrderIndex);

        } else {
            $('.oneorder').each(function () {
                $(this).find('.address_text_con').html(selectedAddressText);
                $(this).find('.vAddress').val(selectedAddressValue);
            });
            //全局更改地址
            ReCalculateFeight(selectedAddressValue);
        }
        checkIdCardExistsByNames();

    });



    //浮动层内修改地址
    $('#oldaddress .address_item').live("click", function (e) {

        var address_item = $(this);

        if (address_item.hasClass("default")) {
            return false;
        }

        //有地址无邮箱状态添加邮箱

        var hasEmail = $('#tempEmailAddress').val() ? !0 : !1;
        var EmailTemplate = '<div class="tooltip-3 addemail"><p class="yel">请填写您的常用邮箱，以便及时收到订单状态的提醒！</p><div>邮箱：<input type="text" class="mailfield" value="" name="AddNewEmail" /><span class="vertify"></span></div></div>';

        if (!confirm('更新地址后，您需要重新确认订单信息')) {
            return false;
        }

        $('.bdcurrent .address_item').each(function () {
            $(this).removeClass('default');
        });

        address_item.addClass('default')



        if (!hasEmail) {
            $('#AddressList .EmailTemplate').html("").hide()
            address_item.find('.EmailTemplate').html(EmailTemplate).show();
            //return;
        }

        if (!address_item.hasClass("bo")) {
            useNewAddress = false;
        }
        address_item.find('[type="radio"]').attr('checked', true);

        selectedAddressValue = address_item.find('.address_value').val();
        selectedAddressText = address_item.find('.address_text').html();

        var className = address_item.parent().attr('class');
        if (thisOrderIndex >= 0 && className == "bd bdcurrent sel") {
            $('#order_' + thisOrderIndex).find('.address_text_con').html(selectedAddressText);
            $('#order_' + thisOrderIndex).find('.vAddress').val(selectedAddressValue);
            //单个更改地址
            ReCalculateFeightSingle(selectedAddressValue, thisOrderIndex);

        } else {
            $('.oneorder').each(function () {
                $(this).find('.address_text_con').html(selectedAddressText);
                $(this).find('.vAddress').val(selectedAddressValue);
            });
            //全局更改地址
            ReCalculateFeight(selectedAddressValue)
        }
        checkIdCardExistsByNames();
        alertbox.close();
    });

    $('.mailfield').live('blur', function () {
        var val = $(this).val();
        $('#tempEmailAddress').val(val)
        if (!val) {
            $(this).next('.vertify').html("邮箱地址不能为空").css('visibility', 'visible');
            return false;
        }
        if (!/[\w-]+@[\w-]+\.[\w-]+/.test(val)) {
            $(this).next('.vertify').html("邮件地址输入不正确").css('visibility', 'visible');
            return false;
        }
        $(this).next('.vertify').html("").css('visibility', 'hidden')
    });

    var isUploadAfterPay = !1;
    $('#UploadAfterPay').bind('click', function () {
        isUploadAfterPay = !0;

        IDCartAlert.close();
        return !1
    })

    $("#btnSaveOrder a").live('click', function () {

        var btnSaveOrder = $('#btnSaveOrder');

        $('.mailfield').trigger('blur')

        var tempEmailAddress = $('#tempEmailAddress').val();

        if (tempEmailAddress == "") {
            alert("请先填写收件地址再提交订单！");
            return;
        }

        if (!/[\w-]+@[\w-]+\.[\w-]+/.test(tempEmailAddress)) {
            $('.vertify').html("邮件地址输入不正确").css('visibility', 'visible');
            return false;
        }

        btnSaveOrder.find('a').html("正在处理中，请等待");
        topay = true;

        ////检查是否需要填写身份证
        //var uploadIdCard = false;
        //if ($("#IdCardNotice input[name=uploadIdCard]:checked").length > 0) {
        //    //选择了选项
        //    var data = $("#IdCardNotice input[name=uploadIdCard]:checked").val();
        //    if (data == 'true') {
        //        uploadIdCard = true;
        //    }
        //}



        var r = GetOrderInfo();
        if (r) {
            var data = { SaveOrderInfoAddresses: OneOrderObjsProperty, topay: topay, tempEmailAddress: tempEmailAddress };
            var json = jQuery.toJSON(data);
            var url = '/PurchaseInfo/SaveOrderInfo';
            $.ajax({
                type: 'POST',
                url: url,
                data: json,
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg.result == true) {
                        //clear shopcart
                        try {
                            //$.cookie("Cart", null, { domain: 'ymatou.com' });
                        } catch (e) { }
                        var uploadIdCardUrl = '/IdCardManage/IdCardFromOrderStr';

                        var orderids = msg.orderids;//.split(',');
                        var names = msg.names;
                        var mobiles = msg.mobiles;
                        var red = "";

                                               
                        if(msg.internationalPay == "0"){
                            red = "/PurchaseInfo/Checkout?tid=" + msg.order;
                        }else if(msg.internationalPay == "1"){
                            red = "/PurchaseInfo/WaitingPay?tid=" + msg.order;
                        }else if(msg.internationalPay == "2"){
                            red = "/PurchaseInfo/CheckoutInternational?tid="+ msg.order;
                        }else{
                            red = "/user/order?s=1";
                        }                       
                        

                        //有护航直邮的商品才会上传身份证的必要性
                        if (isNeedUploadIdCard) {
                            var IDCartAlert = LayerBox('struc', {
                                close: '.ClosedTrigger',
                                closeCallback: function () {
                                    //alert("你真的要关闭窗口吗");
                                    window.location.href = red;
                                    //if (!isUploadAfterPay) {
                                    //    uploadIdCardUrl = uploadIdCardUrl + "?orderIds=" + orderids;
                                    //    red = escape(uploadIdCardUrl + "&redirect=" + red);
                                    //    window.location.href = "/adPurchaseCps?orderids=" + orderids + "&redirect=" + encodeURI(red);
                                    //} else {
                                    //    window.location.href = red;
                                    //}
                                }
                            });
                            var isHaveIDCard = $('#hidIsHaveIDCard').val() == "1";
                            if (!isHaveIDCard) {

                                //url参数
                                var namesParam = names.replaceAll(",", "&names=");
                                var orderidsParam = orderids.replaceAll(",", "&orderIds=");
                                var mobilesParam = mobiles.replaceAll(",", "&mobiles=");
                                var param = "names=" + namesParam + "&orderIds=" + orderidsParam + "&mobiles=" + mobilesParam;

                                var linkComleteUpload = "/IdCardManage/IdCardFromOrderStr" + "?orderIds=" + orderids + "&redirect=" + encodeURI(red);
                                $("#lnkCompleteUpload").attr("href", linkComleteUpload);//已完成上传链接

                                $("#UploadAtOnce").attr("href", linkComleteUpload);//立即上传链接
                                $("#UploadAfterPay").attr("href", red);//付款后上传链接

                                $("#QRcodeImage").attr("src", "/IdCardManage/QRcodeByMultiple?" + encodeURI(param));//生成二维码图片

                                //==========================
                                var nameArr = names.split(",");
                                var orderidArr = orderids.split(",");
                                var mobileArr = mobiles.split(",");
                                $.ajax({

                                    url: '/idcardmanage/GetWapUploadIDCardUrlByMultiple',

                                    type: "get",

                                    dataType: "text",
                                    traditional: true,
                                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',

                                    data: {
                                        names: nameArr,
                                        orderids: orderidArr,
                                        mobiles: mobileArr
                                    },

                                    success: function (result) {
                                        //alert("获取app上传身份页链接成功！");
                                        $("#applink").text(result);//获取app上传身份页链接
                                    },
                                    error: function (errorMsg) { alert("获取app上传身份页链接失败" + errorMsg) }
                                })
                                //==============================
                                IDCartAlert.alert('#IDCardAlertBox');
                                return;
                            } else {
                                window.location.href = red;
                            }
                        } else {//如果没有护航直邮的商品，则不用检上传身份证的必要性直接去付款
                            window.location.href = red;
                        }

                    }
                    else {
                        if (msg.message) {
                            alert(msg.message);
                        } else if (msg.canNotBuyProductsByStock) {
                            alert("购物车内的商品可购买数量不足");
                        } else if (msg.canNotBuyProductsByLimit) {
                            alert("您购买的商品已超过限购额度，无法继续购买！");
                        } else if (msg.canNotByVipProductName) {
                            alert("您购买的商品只限于VIP用户购买。");
                            //alert("商品：" + msg.canNotByVipProductName + "只限于VIP用户购买。");
                        } else {
                            alert("error");
                        }
                        btnSaveOrder.find('a').html("重新提交");
                    }
                }
            });
            return false;
        } //end if
    });
    //使用红包
    $(".numberUseGiftAmount").change(function () {
        if (!/^[0-9]*[1-9][0-9]*$/.test(this.value)) {
            alert("红包格式不正确,请重新输入。");
            return false;
        }
        //获得总计红包数
        var availGiftAmount = $('input[type="hidden"][name="AvailGiftAmount"]').val();
        //获得已使用的红包数
        var giftUsingAmount = getUsedGiftAmount(this);

        var max = _maxSetting[this.id];

        if (availGiftAmount - giftUsingAmount < max)
            max = availGiftAmount - giftUsingAmount;
        var v = parseInt(this.value);
        if (v) {
            v = (max < v ? max : v);
            this.value = v;
        }
        else {
            this.value = 0;
        }
        resetGiftUpperBoundLimit(availGiftAmount);
    });

    //$(".numberUseGiftAmount").focus(function () {
    //    $(this).next().next().css('display', 'inline');
    //    $(this).next().css('display', 'none');
    //});

    //$(".numberUseGiftAmount").blur(function () {
    //    if (this.value != 0) {
    //        $(this).next().css('display', 'inline');
    //        $(this).next().next().css('display', 'none');
    //    } else {
    //        $(this).next().css('display', 'none');
    //        $(this).next().next().css('display', 'none');
    //    }
    //});

    $(".numberUseGiftAmount").each(function () {
        _maxSetting[this.id] = $(this).prev().val();
    });

    function checkIdCardExistsByNames() {
        var names = "";
        $("div.orderInfo:has(input[type=hidden][name=SailProtected][value=True]) span.asn").each(function (index, value) {
            names += $(value).text() + ",";
        });
        //alert(names)
        $.get("/IdCardManage/IdCardExist?cardOwnerStr=" + encodeURIComponent(names), function (data) {
            if (data == "True") {
                $('#IdCardNotice').css("display", "none");
            } else {
                $('#IdCardNotice').css("display", "block");
            }
        });
    }


    /// <reference path="../Patterns/patterns.js" />
    /// <reference path="~/Scripts/jquery-1.6.2.js" />
    /// <reference path="~/Scripts/Lib/yh_tb.js" />

    var OneOrderObjs = [];

    var OneOrderObjsProperty = [];
    var GetOrderInfo = function () {
        var r = true;
        OneOrderObjsProperty = [];
        for (var x = 0; OneOrderObjs[x] != null; x++) {
            if (!OneOrderObjs[x].InputAds()) r = false;
            OneOrderObjsProperty.push(OneOrderObjs[x].Property);
        }
        return r;
    };

    var OneOrder = function (o, i) {
        this.o = o;
        this.i = i;
        //    var sch = $("input[name='sch" + i + "']", o);
        //    sch.click(function () {
        //        $("div.boxer", o).removeClass("boxer_act");
        //        o.parent("div.boxer").addClass("boxer_act");
        //    });
        //    sch.last().click(function () {
        //        $(".addaddress", o).show();
        //    });
        //    sch.not(sch.last()).click(function () {
        //        $(".addaddress", o).hide();
        //    });
        //    sch.first().click();
        //    $(".addaddress", o).validationEngine({ validationEventTriggers: "keyup" });

        this.Property = { vSellerId: "", vAddress: "", vPostCode: "", vName: "", vPhone: "", vTelephone: "", vQQ: "", vEmail: "", vLeaveWord: "", vNewAddress: "", UseGiftAmount: 0, CouponCode: "", SkipAd: false, HasFreeCard: false };
    };

    OneOrder.prototype.InputAds = function () {
        //    var rr = true;
        //    var schs = $("input[name='sch" + this.i + "']:checked", this.o);
        //    var label = schs.next("label");
        //    if (useNewAddress == true) {

        //        if ($("input.tProvince", this.o).val() == "") {
        //            alert("请选择省");
        //            rr = false;
        //        } else if ($("input.tCity", this.o).val() == "") {
        //            alert("请选择市");
        //            rr = false;
        //        } else if ($("input.tCounty", this.o).val() == "") {
        //            alert("请选择区");
        //            rr = false;
        //        } else if ($("input.txtTel", this.o).val() == "" && $("input.txtPhone", this.o).val() == "") {
        //            alert("手机和座机必填一个");
        //            rr = false;
        //        } else if ($(".addaddress", this.o).validationEngine({ returnIsValid: true })) {
        //            var result = "";
        //            result = $("input.tProvince", this.o).val() + ",";
        //            result += $("input.tCity", this.o).val() + ",";
        //            result += $("input.tCounty", this.o).val() + ",";
        //            result += $("input.txtAddress", this.o).val();

        //            this.Property = {
        //                vSellerId: $("input.vSellerId", this.o).val(),
        //                vAddress: result,
        //                vPostCode: $("input.txtPost", this.o).val(),
        //                vName: $("input.txtName", this.o).val(),
        //                vPhone: $("input.txtPhone", this.o).val(),
        //                vTelephone: $("input.txtTel", this.o).val(),
        //                vQQ: $("input.txtQQ", this.o).val(),
        //                vEmail: $("input.txtEmail", this.o).val(),
        //                vNewAddress: "1"

        //            };
        //        } else {
        //            alert("请按要求填写。");
        //            rr = false;
        //        }
        //    } else {
        //    }

        var addressData = $(".vAddress", this.o).val().split("\n");
        this.Property = {
            vSellerId: $("input.vSellerId", this.o).val(),
            vAddress: addressData.length > 0 ? addressData[0] : "",
            vPostCode: addressData.length > 1 ? addressData[1] : "",
            vName: addressData.length > 2 ? addressData[2] : "",
            vPhone: addressData.length > 3 ? addressData[3] : "",
            vTelephone: addressData.length > 4 ? addressData[4] : "",
            vQQ: addressData.length > 5 ? addressData[5] : "",
            vEmail: addressData.length > 6 ? addressData[6] : "",
            vNewAddress: "0" // useNewAddress == true ? "1" : "0" @2012-7-17 16:18 revised by jeff, no new address any more, all selected addresses would be saved before order saved
        };
        this.Property.vLeaveWord = $('textarea#txtLeaveWord', this.o).val();
        var gift = $('.numberUseGiftAmount', this.o).val();
        if (!gift)
            gift = '0';
        this.Property.UseGiftAmount = gift;
        this.Property.CouponCode = $('#hidCouponCode', this.o).val();
        this.Property.SkipAd = $('.skipAd', this.o).val();
        this.Property.HasFreeCard = $('.hidfreecard', this.o).val();
        return true;
    };

    //计算已使用的红包数
    function getUsedGiftAmount(ignore) {
        var giftUsingAmount = 0;
        $(".numberUseGiftAmount").each(function () {
            if (this == ignore)
                return;
            var v = parseInt(this.value);
            giftUsingAmount += (v ? v : 0);
        });
        return giftUsingAmount;
    }

    function resetGiftUpperBoundLimit(availGiftAmount) {

        $(".numberUseGiftAmount").each(function () {
            // reset the upper bound of gift using limitation of other input
            var giftUsingAmount = getUsedGiftAmount(this);
            var remain = availGiftAmount - giftUsingAmount;
            if (remain < this.max) {
                this.max = remain;
            } else if (_maxSetting[this.id] > remain) {
                this.max = remain;
            } else {
                this.max = _maxSetting[this.id];
            }
            $(this).next().find(".spanGiftCanUseAmount").html(this.max);
        });
        //使用红包之后变更总价
        computeTotal();
    }

    $('span.usecouponcontent .disabled').attr('disabled', 'disabled');

    $('div.youhuiquanHidden').hide(10);
    $('div.youhuiquanHidden .disabled').attr('disabled', 'disabled');

    $('div.hongbao .numberUseGiftAmount').attr('disabled', 'disabled');

    //优惠券
    $('div.couponbase input.userwhat').click(function () {
        if ($(this).attr('checked')) {
          
            var curr = $(this).closest('div.spemod');

            //$(this).closest('.couponbase').find('.numberCouponCode').attr('disabled', '');
            curr.find('div.hongbao .numberUseGiftAmount').attr('disabled', 'disabled').val("");

            curr.find('div.youhuiquanHidden').hide(10);
            curr.find('div.youhuiquanHidden .disabled').attr('disabled', 'disabled');

            curr.find('.freecardresult').hide();
            curr.find('input[name=hidfreecard]').attr('value', 'false');

            showFreeCardInfo();
            curr.find("#coupons-area").show();
            computeTotal();
        }
    });


    /*orderInfo*/
    $('.orderInfo').each(function () {
        var that = $(this);
        var productids = $(this).find('input[name="hidProductIds"]').val();
        var sellerId = $(this).find('input.vSellerId').val();
        var amount = $(this).find('input[name="TotalPriceForSeller"]').val();
        var str = [];

        $.get('/PurchaseInfo/GetVaildCouponList?sellerId=' + sellerId + '&productIds=' + productids + '&amount=' + amount, function (data) {
            if (data != null && data.length > 0) {
                $(data).each(function (i, obj) {
                    var flag = "";
                    if (obj.UseType == "1") //1--抵现金
                        flag = "满" + obj.MinOrderValue + "减" + obj.CouponValue;
                    else   //2--返红包
                        flag = "满" + obj.MinOrderValue + "返" + obj.CouponValue + "红包";

                    if (obj.UserType == "1")  //1--首次下单用户
                        obj.ValidEnd = '<small class="cr-yen">仅限首次购物使用</small>';
                    else
                        obj.ValidEnd = '<small>有效时间：' + obj.ValidEnd + '</small>';

                    str.push('<li class="coupons-item" data-coupons-type="' + obj.UseType + '" data-coupons-money="' + obj.CouponValue + '" data-coupons-id="' + obj.CouponCode + '"><i class="coupons-flag"></i><b class="coupons-price">' + flag + '</b>' + obj.ValidEnd + '</li>');
                });
                that.find('.coupons-groud').html(str.join(""));
            } else {
                that.find('.coupons-groud').html('<li class="none-coupons">你没有可使用的优惠券</li>');
            }
        });
    });


    //选中优惠券
    $("#coupons-area .coupons-item").live('click', function () {
        var self = this,
            $this = $(this),
            parent = $this.closest(".spemod"),
            hidCouponCode = parent.find("#hidCouponCode"),
            code = $this.attr("data-coupons-id");
        if ($this.hasClass("coupons-used")) {
            return false;
        }
        if ($this.hasClass("coupons-current")) {
            //如果是再次点击去掉优惠券
            clearCoupons(parent);
            $("[data-coupons-id=" + code + "]").removeClass("coupons-used").find(".coupons-flag").text("");
            //计算总价
            computeTotal();
            return false;
        }
        //将以前的清空
        $("[data-coupons-id=" + hidCouponCode.val() + "]").removeClass("coupons-used").find(".coupons-flag").text("");
        $("[data-coupons-id=" + code + "]").each(function () {
            if (this != self) {
                $(this).addClass("coupons-used").removeClass("coupons-current").find(".coupons-flag").text("已使用");
            }
        })
        //
        parent.find('.none-coupons').html("").hide();
        parent.find(".coupons-item").removeClass("coupons-current");
        $this.toggleClass("coupons-current");
        var money = $this.attr("data-coupons-money");
        hidCouponCode.val(code);                
        parent.find(".usecouponcontent").html("您已使用<i class='yen'>" + money + "</i>元优惠");
        //如果是类型是1，将优惠金额添加到计算字段中，其他不处理。
        if ($this.attr("data-coupons-type") !== "1") {
            money = 0;
        }
        parent.find("#hidCouponMoney").val(money);
        //计算总价
        computeTotal();
    });

    //输入优惠券
    //$(".J-coupons-exchange-toggle").click(function () {
    //    var input = $(this).closest(".coupons-exchange").find(".J-coupons-exchange-input");
    //    if (input.css("display") == "none") {
    //        input.show();
    //        $(this).text("点击收起");
    //    } else {
    //        input.hide();
    //        $(this).text("点击输入");
    //    }
    //});

    /*
    * 清除优惠券选择
    * @param {jqObject} parent
    */
    function clearCoupons(parent) {
        parent.find(".usecouponcontent").html("");
        parent.find("#hidCouponCode").val("");
        parent.find("#hidCouponMoney").val("").triggerHandler("change");
        parent.find(".coupons-item").removeClass("coupons-current");
        parent.find('.J-coupons-exchange-error').html("");
        parent.find('.usecouponcode').html("");
    }

    //输入优惠券
    //$('div.couponbase input.numberCouponCode').blur(function () {
    //var isBml = LayerBox('Temps', {
    //    zIndex: 999,
    //    isloc: !0,
    //    backgroundColor: 'transparent',
    //    close: '.shut_alert_box',
    //    Temps: layerHtml.join(''),
    //    callback: function () {
    //    }
    //});

    var isBml = LayerBox('struc', { zIndex: 998, close: '.shut_alert_box', isloc: !0, backgroundColor: 'transparent' });
    function checkMobile(num){
        return /^1[3458]\d{9}$/.test(num);
    }
    function submitCoupon(curr,code){
        var orderIndex = curr.find('input[name=currOrderIndex]').val();
        clearCoupons(curr);
        $.get('/PurchaseInfo/GetCouponValue?orderIndex=' + orderIndex + "&couponCode=" + code, function (res) {

            if (res.result == 1) {
                curr.find('.J-coupons-exchange-error').html("");
                curr.find('.usecouponcode').html("您已使用了<span class='cr-yen'>" + res.msg + "</span>元优惠");
                curr.find("input[name=hidCouponCode]").val(code);
                curr.find("#hidCouponMoney").val(res.couponusingtype == "1" ? res.msg : 0);
                //计算总价
                computeTotal();
            }
            if (!res.result) {
                curr.find('.usecouponcode').html("");
                curr.find('.J-coupons-exchange-error').html('<span class="icon-font cr-yen">&#xe600;</span>&nbsp;<span class="error cr-yen">' + res.msg + '</span>');
            }
        });
        curr.find('div.hongbao .numberUseGiftAmount').attr('disabled', 'disabled');
    }
    function countdown(obj) {
        var i = 59;
        var time = setInterval(function () {
            if (i > 0) {
                obj.text(i + "秒后重新发送")
                i--
            } else {
                obj.removeClass('unClick');
                obj.text("获取验证码")
                clearInterval(time)
            }
        }, 1000)
    }
    $('.validCode').click(function () {
        var curr = $(this).closest('div.spemod');
        var code = $.trim($(this).parent().find("[name=CouponCode]").val());
        $.get("/PurchaseInfo/NeedUserMobileCouponBatch?couponcode=" +code,function(res){

            var mobileBox,isBmlIdentifying,isBmlMessageCode,getCode,mobileErrorTipBox,identifyingErrorTipBox,messageCodeErrorTipBox,isBmlSubmitBtn;

            if(res.NeedBindUserMobile){
                isBml.alert('#isBml');
                $(".isBmlGetCode").addClass("unClick");

                //input框
                mobileBox = $("#isBml .isBmlMobile");
                isBmlIdentifying = $("#isBml .isBmlIdentifying");
                isBmlMessageCode = $("#isBml .isBmlMessageCode");

                //获取验证码按钮
                getCode = $("#isBml .isBmlGetCode");

                //错误提示框
                mobileErrorTipBox = $(".mobileErrorTipBox");
                identifyingErrorTipBox = $(".identifyingErrorTipBox");
                messageCodeErrorTipBox = $(".messageCodeErrorTipBox");

                //确定按钮
                isBmlSubmitBtn = $("#isBml .isBmlSubmitBtn");

                mobileBox.bind('blur',function(e){
                    if(!checkMobile(this.value)){
                        mobileErrorTipBox.show().find(".errorMobileTips").text("请输入正确的手机号码");
                        mobileBox.addClass('errorBorder');
                        return;
                    }else{
                        $.get('/Register/ValidateRegMobile?mobile='+this.value,function(res){

                            if(res.indexOf("手机号已经存在") != -1){
                                mobileErrorTipBox.show().find(".errorMobileTips").text("该手机号已经存在，请更换其他号码");
                                mobileBox.addClass('errorBorder');
                                $(".isBmlGetCode").addClass("unClick");
                            } else{
                                mobileErrorTipBox.hide();
                                mobileBox.removeClass('errorBorder');
                                $(".isBmlGetCode").removeClass("unClick");
                            }
                        })
                    }
                });
                getCode.bind('click',function(e){
                    if($(this).hasClass('unClick')) return;
                    var text = $(this).text(),
                        mobileNum = mobileBox.val();
                    if(!checkMobile(mobileNum)){
                        mobileErrorTipBox.show();
                        return;
                    }else{
                        if(text === "获取验证码"){
                            $(this).addClass("unClick");
                            countdown($(this));
                            $(this).text("60秒后重新发送");
                            $.get('/Register/GetMobileVerifyCode_v2?mobile=' + mobileNum + '&Signature=' + $('#Signature').val() + '&ValidateCode=' + isBmlIdentifying.val(), function (res) {
                                if(res !== "发送成功！"){
                                    identifyingErrorTipBox.show().find('.errorIdentifyingTips').text(res);
                                    isBmlIdentifying.addClass('errorBorder');
                                }else{
                                    identifyingErrorTipBox.hide().find('.errorIdentifyingTips').text("");
                                    isBmlIdentifying.removeClass('errorBorder');
                                }
                            })
                        }
                    }
                });
                isBmlSubmitBtn.bind('click',function(e){
                    $.post('/UserProfile/BindUserMobileByCoupon?verifyCode='+isBmlMessageCode.val()+'&mobile='+mobileBox.val(),function(res){
                        if(res.Status == 303 || res.Status == 304 ){
                            mobileErrorTipBox.show().find(".errorMobileTips").text("请输入正确的手机号码");
                            mobileBox.addClass('errorBorder');
                        }
                        if(res.Status == 305 ){
                            mobileErrorTipBox.show().find(".errorMobileTips").text("该手机号已经存在，请更换其他号码");
                            mobileBox.addClass('errorBorder');
                        }
                        if(res.Status == 700 || res.Status == 701 || res.Status == 400 || res.Status == 501 || res.Status == 500 ){
                            messageCodeErrorTipBox.show().find(".errorMessageTips").text(res.Msg);
                            isBmlMessageCode.addClass('errorBorder');
                        }

                        if(res.Status == 200){
                            $('.shut_alert_box').trigger('click');
                            submitCoupon(curr,code);
                        }
                    });
                });
                $('.shut_alert_box').bind('click',function(e){
                    $('#isBml').hide();
                    //$("#isBml .errorBorder").removeClass("errorBorder");
                    //$("#isBml .unClick").removeClass("unClick");
                    //$("#isBml .isBmlMobile, #isBml .isBmlIdentifying, #isBml .isBmlMessageCode").val("");
                    //$(".mobileErrorTipBox, .identifyingErrorTipBox, .messageCodeErrorTipBox").hide();
                });
                $('.isBmlTipsSub').bind('click',function(e){
                    $('.shut_alert_box').trigger('click');
                });
                $(".isBmlIdentifyingImg").bind('click',function(e){
                    $(this).attr("src",$(this).attr("data")+"&t="+ Math.random());
                });
            }else{
                submitCoupon(curr,code);
            }
        });
    });

    //不是使用任何优惠券
    $('.noneuseyouhuiquan input.userwhat').click(function () {
        var curr = $(this).closest('div.spemod');
        if ($(this).attr('checked')) {

            //curr.find('span.usecouponcontent .disabled').attr('disabled', 'disabled');

            curr.find('div.youhuiquanHidden').hide(10);
            curr.find('div.youhuiquanHidden .disabled').attr('disabled', 'disabled');

            curr.find('div.hongbao .numberUseGiftAmount').attr('disabled', 'disabled');

            curr.find('div.hongbao .numberUseGiftAmount').attr('value', '');
            curr.find('input[name=CouponCode]').attr('value', '');
            curr.find('.couponresult').hide();
            curr.find('.freecardresult').hide();
            curr.find('input[name=hidfreecard]').attr('value', 'false');
            showFreeCardInfo();
            curr.find("#coupons-area").hide();

            clearCoupons(curr);
            //清空错误数据
            curr.find('.J-coupons-exchange-error').html("");

            //计算总价
            computeTotal();
        }
    });

    //使用红包
    $('div.hongbao input.userwhat').click(function () {
        var curr = $(this).closest('div.spemod');
        if ($(this).attr('checked')) {
            curr.find('div.youhuiquanHidden').hide(10);
            curr.find('div.youhuiquanHidden .disabled').attr('disabled', 'disabled');
            //curr.find('span.usecouponcontent .disabled').attr('disabled', 'disabled');
            curr.find('div.hongbao .numberUseGiftAmount').attr('disabled', '');
            curr.find('input[name=CouponCode]').attr('value', '');
            curr.find('.couponresult').hide();
            curr.find('.freecardresult').hide();
            curr.find('input[name=hidfreecard]').attr('value', 'false');
            showFreeCardInfo();
            curr.find("#coupons-area").hide();
            clearCoupons(curr);
            //计算总价
            computeTotal();
        }
    });
    //使用免运卡
    $('div.freedeliverycard input.userwhat').click(function () {
        if ($(this).attr('checked')) {
            $("#totalall>b").text("¥" + parseFloat($("#totalallVal").val()).toFixed(2));
            var curr = $(this).closest('div.spemod');
            curr.find('div.youhuiquanHidden').hide(10);
            curr.find('div.youhuiquanHidden .disabled').attr('disabled', 'disabled');
            //curr.find('span.usecouponcontent .disabled').attr('disabled', 'disabled');

            curr.find('div.hongbao .numberUseGiftAmount').attr('disabled', 'disabled');
            curr.find('div.hongbao .numberUseGiftAmount').attr('value', '');
            curr.find('input[name=CouponCode]').attr('value', '');
            curr.find('.couponresult').hide();
            curr.find('.freecardresult').show();
            curr.find('input[name=hidfreecard]').attr('value', 'true');

            showFreeCardInfo();
            curr.find("#coupons-area").hide();
            clearCoupons(curr);
            freightFreeCensus(curr);

        }
    });


    //计算总计
    function computeTotal() {
        var totalallVal = 0;//parseFloat($("#totalallVal").val());
        //优惠券||红包
        $("[name=hidCouponMoney],.numberUseGiftAmount").each(function () {
            totalallVal += parseFloat(this.value) || 0;
        })
        $("#totalall>b").text("¥" + (parseFloat($("#totalallVal").val()) - totalallVal).toFixed(2));
    }
    //免费运费计算
    function freightFreeCensus(curr) {
        var totalFreight = 0;
        $(".freedeliverycard>input[name=hidfreecard][value=true]").each(function () {
            totalFreight += (parseFloat($(this).next().val())) || 0;
        })
        $("#totalflight").text("¥" + (parseFloat($("#totalFreight").val()) - totalFreight).toFixed(2));
    }


    $('div.youhuiquanHidden div.usecoupon input[type=radio]').click(function () {
        if ($(this).attr('checked')) {
            $(this).closest('div.spemod').find('input[name=skipAd]').attr('value', 'true');
            $(this).closest('div.spemod').find('input[name=CouponCode]').attr('value', $(this).closest('div.spemod').find('input[name=temp_coupon]').val());
        }
    });

    $('div.youhuiquanHidden div.nonecoupon input[type=radio]').click(function () {
        if ($(this).attr('checked')) {
            $(this).closest('div.spemod').find('input[name=skipAd]').attr('value', 'false');
            $(this).closest('div.spemod').find('input[name=CouponCode]').attr('value', '');
        }
    });

    $('.v-fanli').bind({
        mouseenter: function () {
            var o = $(this).find('.tooltip-1');
            o.css({ 'position': 'absolute', 'left': '-238px', 'top': 18 + 'px', zIndex: '1000' });
            o.show();

        },
        mouseleave: function () {
            $(this).find('.tooltip-1').hide();
        }
    })

    function reCalcualteFreight() {

    }

    function showCoupon(orderIndex) {

        var couponCode = $('#CouponCode_' + orderIndex).val();
        if (couponCode != "") {

            $.get('/PurchaseInfo/GetCouponValue?orderIndex=' + orderIndex + "&couponCode=" + couponCode, function (data) {

                $('#couponResult_' + orderIndex).html(data);
            });
        }
    }
    /*免运卡*/
    function showFreeCardInfo() {
        var totalFreeCardCount = parseInt($("#totalFreeCardCount").val());
        if (totalFreeCardCount > 0) {
            var useFreeCardCount = $('.orderInfo').find('input[name=hidfreecard][value=true]').length;

            var unUseFerrCardCount = totalFreeCardCount - useFreeCardCount;
            $('.orderInfo .freecardresult .inner').each(
                function () {
                    $(this).html('已选定 1 张，剩余 ' + unUseFerrCardCount + ' 张免运卡');
                });

            $('.orderInfo').find('input[name=hidfreecard][value=false]').each(
                function () {
                    if (unUseFerrCardCount > 0) {
                        $(this).closest("div.freedeliverycard").show();
                    } else
                        $(this).closest("div.freedeliverycard").hide();
                });
        }
    }
    if ($(".ChinaArea").length == 1)
        $(".ChinaArea").jChinaArea({ aspnet: true });

    $("div.oneorder").each(function (i) {
        OneOrderObjs[i] = new OneOrder($(this), i);
    });

});
$(function () {
     $m.load('component/topbar')
    //checkIdCardExistsByNames();
});





$(function () {

   
    //$.doTimeout(500, function () {
    //    var Y = YAHOO.util;
    //    var provSelc = Y.Dom.get('ads_pc');
    //    var citySelc = Y.Dom.get('ads_cc');
    //    var distSelc = Y.Dom.get('ads_ac');
    //    TB.form.DistrictSelector.attach(provSelc, citySelc, distSelc);
    //    $(".ads_box").each(function () {
    //        var adscode = $(".idAds", this).val();
    //        if (adscode == "") {
    //            return;
    //        }
    //        var pc = adscode.substring(0, 2) + "0000";
    //        var cc = adscode.substring(0, 4) + "00";
    //        $("#ads_pc").setSelectedValue(pc);
    //        tbb($(citySelc), $("#ads_pc").val());
    //        $("#ads_cc").setSelectedValue("");
    //        $("#ads_cc").setSelectedValue(cc);
    //        tbb($(distSelc), $("#ads_cc").val());
    //        $("#ads_ac").setSelectedValue("");
    //        $("#ads_ac").setSelectedValue(adscode);
    //        var textNamep = $("#ads_pc").getSelectedText();
    //        var textName = textNamep;
    //        var textNamec = $("#ads_cc").getSelectedText();
    //        if (textNamec != "") {
    //            textName = textNamep + "，" + textNamec;
    //            var textNamea = $("#ads_ac").getSelectedText();
    //            if (textNamea != "") {
    //                textName = textNamep + "，" + textNamec + "，" + textNamea;
    //            }
    //        }
    //        $(".adsName", this).text(textName);
    //    });

    //});


    //    var availgiftamount = $('input[type="hidden"][name="AvailGiftAmount"]').val();
    //    $('span.spanGiftCanUseAmount').val(availgiftamount);
});

/*结算页脚本移除至此*/


