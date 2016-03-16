/*=======================OrderInfo.js===========================*/
var selectedAddressText = "", selectedAddressId = -1, thisOrderIndex = 0, useNewAddress = false;
var modify = false;




j$(function () {
    Ymt.load("widget.LayerBox", function () {

        ////alert box
        var alertbox = Ymt.widget.LayerBox('struc');
        j$('.address_btn').click(function () {
            var suffix = this.id.replace("address_btn_", "");
            if (suffix == "add") {
                useNewAddress = true;
                j$('#address_new').show();
            } else if (suffix == "set") {
                useNewAddress = false;
            } else {
                if (isNaN(parseInt(suffix)) == false) {

                    useNewAddress = true;
                    thisOrderIndex = parseInt(suffix);

                    if (j$(".ao .address_item").length == 5) {
                        j$("#address_btn_add").hide();
                        j$('#address_new').hide();
                    }
                    else {
                        j$("#address_btn_add").show();
                        j$('#address_new').show();
                    }

                } else {
                    return;
                }
            }


            if (canAddAddress == false || j$(".alert_current").find(".address_item").length >= 5) {
                j$('#address_btn_new').hide();
            }


            j$('#address_new').find('.tProvince').val("");
            j$('#address_new').find('.tCity').val("");
            j$('#address_new').find('.tCounty').val("");
            j$('#address_new').find('.txtAddress').val("");
            j$('#address_new').find('.txtPost').val("");
            j$('#address_new').find('.txtName').val("");
            j$('#address_new').find('.txtPhone').val("");
            j$('#address_new').find('.txtTel').val("");
            j$('#address_new').find('.txtQQ').val("");
            j$('#address_new').find('.txtEmail').val("");

            j$('.hidProvinceName').val("");
            j$('.hidCityName').val("");
            j$('.hidCountyName').val("");
            j$('.hidAddress').val("");
            j$('.hidPost').val("");
            j$('.hidName').val("");
            j$('.hidPhone').val("");
            j$('.hidTel').val("");
            j$('.hidQQ').val("");
            j$('.hidEmail').val("");

            j$(".ChinaArea").jChinaArea({
                aspnet: true,
                s1: "", //默认选中的省名
                s2: "", //默认选中的市名
                s3: ""//默认选中的县区名
            });

            j$('.province option[value=]').attr("selected", true);
            j$('.city option[value=]').attr("selected", true);
            j$('.county option[value=]').attr("selected", true);

            //        j$('#address_new').hide();

            alertbox.alert('#alert_box');
        });



        j$('#alert_box .order_submit').click(function () {

            if (useNewAddress == true) {

                var addressAddData = {
                    AdsText: j$('#address_new').find('.txtAddress').val(),
                    TextboxRecipient: j$('#address_new').find('.txtName').val(),
                    TextboxTelephone: j$('#address_new').find('.txtTel').val(),
                    TextboxCellphone: j$('#address_new').find('.txtPhone').val(),
                    TextboxPostCode: j$('#address_new').find('.txtPost').val(),
                    TProvince: j$('#address_new').find('.tProvince').val(),
                    TCity: j$('#address_new').find('.tCity').val(),
                    TCounty: j$('#address_new').find('.tCounty').val(),
                    LoginEmail:j$('#address_new').find('#inputEmail').val()

                };

                var url = "/UserAddress/AddNewAddress";

                j$.post(url, j$.toJSON({ 'addressAddData': addressAddData }), function (data) {
                    if (data.success == 1) {
                        alert('保存成功');
                        location.reload();
                    }
                    else {
                        alert(data.message);
                    }
                }, "json");



            } else {
                j$('.hidProvinceName').val("");
                j$('.hidCityName').val("");
                j$('.hidCountyName').val("");
                j$('.hidAddress').val("");
                j$('.hidPost').val("");
                j$('.hidName').val("");
                j$('.hidPhone').val("");
                j$('.hidTel').val("");
                j$('.hidQQ').val("");
                j$('.hidEmail').val("");
            }


            if (modify == true) {
                var addressAddData = {
                    AdsText: j$('#address_new').find('.txtAddress').val(),
                    TextboxRecipient: j$('#address_new').find('.txtName').val(),
                    TextboxTelephone: j$('#address_new').find('.txtTel').val(),
                    TextboxCellphone: j$('#address_new').find('.txtPhone').val(),
                    TextboxPostCode: j$('#address_new').find('.txtPost').val(),
                    TProvince: j$('#address_new').find('.tProvince').val(),
                    TCity: j$('#address_new').find('.tCity').val(),
                    TCounty: j$('#address_new').find('.tCounty').val()

                };

                var url = "/UserAddress/UpdateAddress";

                var addressId = j$(".ao .default").find('.addid').val();

                j$.post(url, j$.toJSON({ 'addressAddData': addressAddData, 'addressId': addressId }), function (data) {
                    if (data.success == 1) {
                        alert('保存成功');
                        location.reload();
                    }
                    else {
                        alert(data.message);
                    }
                });

                return false;
            }
            j$('.address_text_default').html(selectedAddressText);
            j$('.addressid').val(selectedAddressId);

            //        j$('#address_new').css('display', 'none');
            //        alertbox.close();

            return false;
        });

        j$('.adradio').click(function () {
            j$('form#formChangeAddress .addressid').val(j$(this).attr('adid'));
        });
        j$('#alert_box .order_submit_cancel').click(function () {
            j$('#address_new').css('display', 'none');
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
        j$('#address_btn_new').bind('click', function () {
            //var obj=$(this).find('b');
            j$('.address_new .address_item').each(function () {
                j$(this).removeClass('default');
                j$(this).find('input').attr('checked', false);
            });
            useNewAddress = true;
            j$('#address_new').css('display', 'block');
            var offobj = j$('#alert_box');
            var top = center(offobj);
            j$(window).resize(function () { j$('#alert_box').animate({ top: top }, 500); });
            j$('#alert_box').animate({ top: top }, 500);
            return false;
        });
        function center(obj) {
            var a = obj.outerHeight();
            mv.version() == 6 ? obj.attr('position', 'absolute') : obj.attr('position', 'fixed');
            var top = (mv.version() != 6 ? (document.documentElement.clientHeight - a) / 2 : (document.documentElement.clientHeight - a) / 2 + document.documentElement.scrollTop);
            return top;
        }


        j$('.address_new .address_item').click(function () {





            useNewAddress = false;
            j$('.address_new .address_item').each(function () {
                j$(this).removeClass('default');
                j$(this).find('input').attr('checked', false);
            });
            j$(this).addClass('default');
            j$(this).find('input').attr('checked', true);
            selectedAddressId = j$(this).find('.vAddressId').val();
            selectedAddressText = j$(this).find('.vAddressText').val();
            return false;
        });



        function ChangeAddress() {
            alertbox.alert('#alert_box');

            j$('#oldaddress').hide();
            var addressData = j$(".ao .default").find('.address_value').val().split("\n");
            //address
            j$('#address_new #inputAddress').val(addressData[0].split(',')[3]);
            //name
            j$('#address_new #inputName').val(addressData[2]);

            //mobile
            j$('#address_new #inputPhone').val(addressData[3]);

            //zipcode
            j$('#address_new #inputPostCode').val(addressData[1]);


            //telephone
            j$('#address_new #inputTelepone').val(addressData[4]);

            //province
            var pstr = addressData[0].split(',')[0];
            var cstr = addressData[0].split(',')[1];
            var astr = addressData[0].split(',')[2];



            j$(".ChinaArea").jChinaArea({
                aspnet: true,
                s1: pstr, //默认选中的省名
                s2: cstr, //默认选中的市名
                s3: astr//默认选中的县区名
            });


            useNewAddress = false;

            j$('#address_new').show();
            j$('.order_submit').show();

            modify = true;

        }


        j$('.bdcurrent .address_item').live("click", function (e) {


            if (j$(e.target).hasClass("modifyaddr")) {
                ChangeAddress();
                return false;
            }

            if (j$(this).hasClass("default")) {
                return false;
            }

            if (!confirm('更新地址后，您需要重新确认订单信息')) {
                return false;
            }


            j$('.bdcurrent .modadd').hide();
            j$(this).find('.modadd').show();

            j$('.bdcurrent .address_item').each(function () {
                j$(this).removeClass('default');
                j$(this).find(':radio').attr('checked', false);
            });
            j$(this).find(':radio').attr('checked', true);
            j$(this).addClass('default');
            selectedAddressId = j$(this).find('.addid').val();
            j$('.addressid').val(selectedAddressId);
        });
    }, true);

    j$("#btnSaveOrder").click(function () {
        var btnSaveOrder = j$(this);
        btnSaveOrder.html("正在处理中，请等待");
        var form = j$('form#formChangeAddress');
        if (j$('form#formChangeAddress .addressid').val() == "") {
            alert("请选择收货地址");
            return false;
        }

        j$.ymatoupost(form.attr('action'), form.serialize(), function (data) {
            if (data.result == true) {
                var orderids = data.orderIds;
                var red = "/PurchaseInfo/Checkout?tid=" + data.tradingId;

                window.location.href = "/adPurchaseCps?orderids=" + orderids + "&redirect=" + encodeURI(red);
                //                window.location.href = data.redirect;
            } else {
                alert(data.message);
                btnSaveOrder.html("重新提交");
            }
        }, 'json');
        return false;
    });
    j$(".numberUseGiftAmount").change(function () {
        var availGiftAmount = j$('input[type="hidden"][name="UseGiftAmountMax"]').val();
        var max = j$('input[type="hidden"][name="UseGiftAmountMax"]').val();

        if (availGiftAmount < max)
            max = availGiftAmount;

        var v = parseInt(this.value);
        if (v) {
            v = (max < v ? max : v);
            this.value = v;
        }
        else {
            this.value = 0;
        }
    });

    //j$(".numberUseGiftAmount").focus(function () {
    //    j$(this).next().next().css('display', 'inline');
    //    j$(this).next().css('display', 'none');
    //});

    //j$(".numberUseGiftAmount").blur(function () {
    //    if (this.value != 0) {
    //        j$(this).next().css('display', 'inline');
    //        j$(this).next().next().css('display', 'none');
    //    } else {
    //        j$(this).next().css('display', 'none');
    //        j$(this).next().next().css('display', 'none');
    //    }
    //});
});

/*j$(function () {

    if (j$(".ChinaArea").length == 1)
        j$(".ChinaArea").jChinaArea({ aspnet: true });

    j$.doTimeout(500, function () {
        var Y = YAHOO.util;
        var provSelc = Y.Dom.get('ads_pc');
        var citySelc = Y.Dom.get('ads_cc');
        var distSelc = Y.Dom.get('ads_ac');
        TB.form.DistrictSelector.attach(provSelc, citySelc, distSelc);
        j$(".ads_box").each(function () {
            var adscode = j$(".idAds", this).val();
            if (adscode == "") {
                return;
            }
            var pc = adscode.substring(0, 2) + "0000";
            var cc = adscode.substring(0, 4) + "00";
            j$("#ads_pc").setSelectedValue(pc);
            tbb($(citySelc), j$("#ads_pc").val());
            j$("#ads_cc").setSelectedValue("");
            j$("#ads_cc").setSelectedValue(cc);
            tbb($(distSelc), j$("#ads_cc").val());
            j$("#ads_ac").setSelectedValue("");
            j$("#ads_ac").setSelectedValue(adscode);
            var textNamep = j$("#ads_pc").getSelectedText();
            var textName = textNamep;
            var textNamec = j$("#ads_cc").getSelectedText();
            if (textNamec != "") {
                textName = textNamep + "，" + textNamec;
                var textNamea = j$("#ads_ac").getSelectedText();
                if (textNamea != "") {
                    textName = textNamep + "，" + textNamec + "，" + textNamea;
                }
            }
            j$(".adsName", this).text(textName);
        });

    });
});*/