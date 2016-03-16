define(function (require, exports, module) {
    var selectData = null, modifyIndex = null;
    var layer = require('widget/layerbox')
    exports.index = function (html, data) {
        if (selectData) {
            if (selectData.DefaultAddress) {
                data = $m.mix(data, selectData);
            } else if (modifyIndex != null) {
                $m.each(data.OrderInfos, function (a, b) {
                    if (b == modifyIndex) {
                        a.Address = selectData.FullAddress;
                        a.vNewAddress = selectData.sAddress2;
                        a.ReceivePerson = selectData.sRecipient;
                        a.Phone = selectData.sCellPhone;
                        a.PostCode = selectData.sPostCode;
                        a.Telephone = selectData.sTelphone;
                    }
                });
            }
        }
        //selectData = null;
        modifyIndex = null;
        $m.mobile.insertContent(html, data);

        $m.node('#cantaddress').bind('click', function () {
            layer.alert("地址数量最多为5条，不能新增地址。")
        })


        //优惠券和红包
        var totalPrice = data.TotalPrice;
        var TotalPriceCls = $m.node('#TotalPrice');
        var cloneData = $m.mix({}, data);

        function diabled(parent) {
            $m.node(parent).find('input[type="text"]').each(function (a, b) {
                a.value = "";
                $m.node.attr(a, 'disabled', 'disbaled');
            })
            $m.node('.AvailGiftBox').hide();
            
        }

        function recover(parent) {
            diabled(parent.parentNode)
            $m.node(parent).find('input[type="text"]').each(function (a, b) {
                $m.node.attr(a, 'disabled', false);
            })
        }

        

        function changeprice(elem, reduce, index,isadd) {
            index = parseInt(index);
            var parent = elem.parentNode.parentNode.parentNode;
            var price = cloneData.OrderInfos[index].TotalPriceForSeller;
            var reduceItem, TotalReductPrice = 0;
            if (!isadd) {
                cloneData.OrderInfos[index].reducePrice = reduce;
                $m.node(parent).find('.TotalPriceForSeller').html(price - reduce)
            } else {
                cloneData.OrderInfos[index].reducePrice = 0;
                $m.node(parent).find('.TotalPriceForSeller').html(price)
            }
            for (var i = 0, length = cloneData.OrderInfos.length; i < length; i++) {
                reduceItem = cloneData.OrderInfos[i];
                if (reduceItem && reduceItem.reducePrice !=void 0) {
                    TotalReductPrice += reduceItem.reducePrice;
                }
            }
            TotalPriceCls.html(totalPrice - TotalReductPrice);
            
        }

        $m.node('[id*="select"]').bind('click', function () {
            var checked = !0, index = parseInt($m.node.attr(this,'index'));
            if ($m.node.hasClass(this, 'NoCoupon')) {
                checked = $m.node(this).val();
                if (checked) {
                    diabled(this.parentNode.parentNode);
                    cloneData.OrderInfos[index] = data.OrderInfos[index];
                }
            } else {
                checked = $m.node(this).val();
                if (checked) {
                    recover(this.parentNode)
                } else {
                    diabled(this.parentNode.parentNode)
                }
            }
            changeprice(this, null, index, true);
        })

        $m.node('.GiftAmountText').bind('focus', function () {
            $m.node.next(this).style.display = "block";
        })

        $m.node('.GiftAmountText').bind('blur', function () {
            var index = $m.node.attr(this, 'index'), max = $m.node.attr(this, 'max'), val = $m.node(this).val();
            if (val) {
                if (parseFloat(val) > parseFloat(max)) {
                    layer.alert("最多可使用红包" + max + "元");
                    $m.node.attr(this, 'value', '')
                } else {
                    changeprice(this, parseFloat(val), index);
                }
            }
        })

        $m.node('.CouponText').bind('blur', function () {
            var index = $m.node.attr(this, 'index'), val = $m.node(this).val(), that = this;
            val && $m.post("/Purchase/IsPromotionCodeAndAdUser/?code=" + val, function (data) {
                if (data != "True") {
                    $m.node.attr(taht, 'value', '')
                } else {
                    $m.get('/Purchase/GetCouponValue?orderIndex=' + index + "&couponCode=" + code, function (json) {
                        if (json.result == false) {
                            $m.node.next(that).innerHTML = "无法使用优惠券" + code + "," + json.msg;
                        } else {
                            changeprice(this, parseFloat(json.result), index);
                            $m.node.next(that).innerHTML = json.msg;
                        }
                    });
                }
            });
        });

        //结算
        var orderInfo = [], def = data.DefaultAddress;
        $m.each(data.OrderInfos, function (a, b) {
            orderInfo.push({
                vSellerId: a.SellerId,
                vAddress: a.Address || def.FullAddress,
                vPostCode: a.PostCode || def.sPostCode,
                vName: data.ReceivePerson || def.sRecipient,
                vPhone: a.Phone || def.sCellPhone,
                vTelephone: a.Telephone || def.sTelphone,
                vQQ: a.QQ,
                vEmail: a.Email,
                vLeaveWord: a.LeaveWord,
                vNewAddress: a.vNewAddress || def.sAddress2,
                UseGiftAmount: $m.node.attr($m.node('#UseGiftAmount-' + b)[0], 'value') || 0,
                CouponCode: $m.node.attr($m.node('#CouponCode-' + b)[0], 'value') || null,
                SkipAd: false
            });
        });

        var env = "http://www.ymatou.com";
        if ($m.isAlpha) {
            env = "http://www.alpha.ymatou.com"
        } else if ($m.isNative) {
            env = "http://localhost:33093"
        } else {
            env = "http://www.ymatou.com"
        }


        $m.event.bind($m.node('#btnSaveOrder')[0], 'click', function () {
            var d = { saveOrderInfoAddresses: orderInfo, tempEmailAddress: data.UserEmail };
            $m.ajax({
                url: 'SaveOrderInfo',
                data: d,
                method: 'post',
                type: 'json',
                //timeout:1000,
                success: function (msg) {
                    if (msg.result == true) {
                        //location.href = env + "/PurchaseInfo/Checkout?tid=" + msg.order;
                        location.href = "/checkout?tid=" + msg.order;
                    } else {
                        if (msg.message) {
                            layer.alert(msg.message);
                        } else if (msg.canNotBuyProductsByStock) {
                            layer.alert("购物车内的商品可购买数量不足");
                        } else if (msg.canNotBuyProductsByLimit) {
                            layer.alert("您购买的商品已超过限购额度，无法继续购买！");
                        } else if (msg.canNotByVipProductName) {
                            layer.alert("您购买的商品只限于VIP用户购买。");
                            //alert("商品：" + msg.canNotByVipProductName + "只限于VIP用户购买。");
                        } else {
                            layer.alert("error");
                        }
                    }
                }
            });
        });

    };
    exports.addressList = function (param, html, data) {
        if (param.ret && param.ret == "usercenter") {
            data.ismycenter = !0;
        }
        $m.node('header .title').html("修改地址");
        data.ret = param.ret;

        //修改添加，默认地址
        $m.mobile.insertContent(html, data);

        if (data.ismycenter && data.length < 5) {
            $m.node('#AddAddress').attr('href', 'modify/ret=usercenter')
        }

        if (param.ret.search('sAddress') > -1) {
            modifyIndex = param.ret.split('-')[1];
        }


        var radios = $m.node('input[type="radio"]').items;
        $m.event.bind(radios, 'click', function (e) {
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i] === e.target) {
                    if (param.ret == "default") {
                        selectData = {
                            DefaultAddress: {
                                FullAddress: data[i].FullAddress,
                                sRecipient: data[i].sRecipient,
                                sCellPhone: data[i].sCellPhone,
                                iAddressId: data[i].iAddressId,
                                sPostCode: data[i].sPostCode,
                                sTelphone: data[i].sTelphone,
                                sAddress1: data[i].sTelphone,
                                sAddress2: data[i].sAddress2
                            }
                        }
                    } else {
                        selectData = data[i];
                    }
                    break;
                }
            }
            $m.mobile.toURL('index');
        })

        //delete
        $m.node('a[id^="delete"]').bind('click', function () {
            var ids = this.id.split('-');
            $m.ajax({
                url: '/UserAddress/DelAddress?id=' + ids[2],
                type: 'json',
                success: function (d) {
                    if (d.result == "success") {
                        $m.node.remove($m.node('#addressli-' + ids[1])[0]);
                        data.splice(ids[1], 1);
                        if (data.length < 5) {
                            $m.node('#LiAddAddress').show()
                        }
                    } else {
                        layer.alert(d.msg);
                    }
                }
            })
            return false;
        })
    }

    exports.modify = function (param, html) {
        //../UserAddress/GetAddressById
        //console.log(data);
        $m.node('header .title').html("修改地址");
        var area = require('module/location'), ads, isModify = !!param.addressId;
        $m.mobile.insertContent(html);


        if (isModify) {
            $m.node('#modifyAddress input').each(function () {
                $m.node.attr(this, 'placeholder', '');
            })
            $m.ajax({
                type: 'json',
                url: '/UserAddress/GetAddressById?addressId=' + param.addressId,
                success: function (data) {
                    ads = data.sAddress1.split(',');
                    data && $m.each(['sRecipient', 'sCellPhone', 'sTelphone', 'sPostCode', 'sAddress2'], function (a, b) {
                        if (data[a]) {
                            $m.node.attr($m.node('#' + a)[0], 'value', data[a]);
                        }
                    });

                    area.init({
                        container: '#chinaArea',
                        s1: ads[0],
                        s2: ads[1],
                        s3: ads[2]
                    });
                }
            })
        } else {
            area.init({
                container: '#chinaArea',
                s1: '上海市',
                s2: '上海市',
                s3: ''
            });
        }

        $m.node('#submitAddress').bind('click', function () {
            var ca = [];
            $m.node('#chinaArea select').each(function (a, b) {
                ca.push(a.options[a.selectedIndex].innerHTML);
            });
            var data = {
                AdsText: $m.node('#sAddress2')[0].value,
                TextboxRecipient: $m.node('#sRecipient')[0].value,
                TextboxTelephone: $m.node('#sTelphone')[0].value,
                TextboxCellphone: $m.node('#sCellPhone')[0].value,
                TextboxPostCode: $m.node('#sPostCode')[0].value,
                TProvince: ca[0],
                TCity: ca[1],
                TCounty: ca[2]
            }

            if (!data.TProvince || !data.TCity || !data.TCounty) {
                layer.alert('请选择完整省、市、县区');
                return
            }
            if (!data.AdsText) {
                layer.alert('请填写详细地址');
                return
            }
            if (!data.TextboxRecipient) {
                layer.alert('请填写联系人');
                return
            }
            if (!data.TextboxPostCode || !/^\d{6}$/.test(data.TextboxPostCode)) {
                layer.alert('请填写6位邮政编码');
                return
            }
            if (!data.TextboxTelephone && !data.TextboxCellphone) {
                layer.alert('电话号码和手机号码至少填写一项');
                return
            }
            if (!!data.TextboxTelephone && !/^\d{3,4}-?[\d-]{5,9}$/.test(data.TextboxTelephone)) {
                layer.alert('请按"区号电话号码"正确填写电话');
                return
            }
            if (!!data.TextboxCellphone && !/(?:\+?\d{1,4}[\s-]?)?\d{11}$/.test(data.TextboxCellphone)) {
                layer.alert('请填写正确手机号码');
                return
            }

            isModify && (data.AddressId = param.addressId);
            $m.post(isModify ? '../UserAddress/UpdateAddress' : '../UserAddress/AddNewAddress', data, function (d) {
                if (d.success == 0) {
                    layer.alert(d.message);
                } else {
                    selectData = {
                        DefaultAddress: {
                            iAddressId: data.iAddressId,
                            FullAddress: data.TProvince + ',' + data.TCity + ',' + data.TCounty + ',' + data.AdsText,
                            sRecipient: data.TextboxRecipient,
                            sCellPhone: data.TextboxCellphone,
                            sPostCode: data.TextboxPostCode,
                            sTelphone: data.TextboxTelephone,
                            sAddress2: data.AdsText
                        }
                    }
                    if (param.ret == "usercenter") {
                        location.href = "/usercenter/";
                    } else {
                        $m.mobile.toURL('index');
                    }
                }
            });
            return !1
        })
    }

})