define(function (require, exports, module) {
    //var c = require('purchase/controller');
    //$m.mobile.when('index',
    //{
    //    template: 'purchase/index.html',
    //    controller: c.index,
    //    data: ['OrderInfo']
    //})
    //.when('addressList/:ret',{
    //    template: 'purchase/addressList.html',
    //    controller: c.addressList,
    //    data: ['AllAddresses'],
    //    isInit: !0
    //})
    //.when('modify/:addressId/:ret', {
    //    template: 'purchase/modifyAddress.html',
    //    controller: c.modify
    //})
    //.defaultWish({ redirect: 'index', app: c });

    //优惠券和红包
    var layer=require("widget/layerbox")
    var TotalPriceCls = $m.node('#TotalPrice');
    var data = {
        TotalPrice: parseFloat($m.node('#TotalPriceField').val()),
        FreeCardCount: parseInt($m.node('#FreeCardCountField').val()),
        OrderInfos: [],
        AvailGiftAmount: parseFloat($m.node('#AvailGiftAmount').val())
    };

    data.RemainFreeCardCount = data.FreeCardCount;

    var totalPrice = data.TotalPrice;

    $m.node('input[name="TotalPriceForSeller"]').each(function () {
        data.OrderInfos.push({
            TotalPriceForSeller:parseFloat($m.node(this).val()),
            SellerId: $m.node.attr(this, 'SellerId'),
            reduceCart:0,
            ordergif:$m.node.attr(this, 'maxvalue')
        })
    });

    $m.node('#address-0').bind('click', function () {
        location.href = "/useraddress/alladdresses";
    })

    var freecarttemplate = '<div temp-data="data"><input index="${data.index}" type="radio" id="select1-${data.index}" ${data.OrderInfos[data.index].reduceCart==1?"checked":""} name="Coupon-${data.index}"  class="vm FreeCard" /><label for="select1-${data.index}" class="vm name">使用免运卡<span class="none TheRemainder">1张，还剩<span class="RemainFreeCard">${data.RemainFreeCardCount}</span>张</span></label></div>';
    var cloneData = $m.mix({}, data);

    function diabled(parent, index) {
        $m.node(parent).find('input[type="text"]').each(function (a, b) {
            a.value = "";
            $m.node.attr(a, 'disabled', 'disbaled');
        })
        $m.node('.AvailGiftBox').hide();
        $m.node('#CouponDescription-' + index).html('');
        //$m.node.toggleClass(parent, 'none', 'show')
    }

    function recover(parent, index) {
        diabled(parent.parentNode, index)
        $m.node(parent).find('input[type="text"]').each(function (a, b) {
            $m.node.attr(a, 'disabled', false);
        })
    }

    function reduceFloat(a,b){
        return parseFloat((a - b).toFixed(2));
    }
    
    /**
    * 价格变更
    * @param {element} elem
    * @param {number} reduce
    * @param {number} index 
    * @param {boolean} isadd 是否新增
    */
    function changeprice(elem, reduce, index, isadd) {
        var $elem = $(elem),
            TotalReductPrice = 0;
        if (!$elem.find("#select3-" + index)[0]) {
            clearCoupons($elem.closest(".orderinfo"))
        }
        index = parseInt(index);
       
        var parent = elem.parentNode.parentNode.parentNode;
        var price = cloneData.OrderInfos[index].TotalPriceForSeller;
        var reduceItem, TotalReductPrice = 0;
        if (!isadd) {
            cloneData.OrderInfos[index].reducePrice = reduce;
            //获得当前组的合计价格
            $m.node(parent).find('.TotalPriceForSeller').html(reduceFloat(price, reduce))
        } else {
            cloneData.OrderInfos[index].reducePrice = 0;
            $m.node(parent.parentNode).find('.TotalPriceForSeller').html(price)
        }
        for (var i = 0, length = cloneData.OrderInfos.length; i < length; i++) {
            reduceItem = cloneData.OrderInfos[i];
            if (reduceItem && (reduceItem.reducePrice != void 0) && !isNaN(parseFloat(reduceItem.reducePrice))) {
                TotalReductPrice += parseFloat(reduceItem.reducePrice);
            }
        }
        TotalPriceCls.html(reduceFloat(totalPrice, TotalReductPrice));
    }

    /**
    * 红包变更
    *
    *
    */
    function gatherEnvelope(index) {
        //红包总额
        var availgifttotal = data.AvailGiftAmount,
            TotalReductPrice = 0;
        for (var i = 0, length = cloneData.OrderInfos.length; i < length; i++) {
            reduceItem = cloneData.OrderInfos[i];
            if (reduceItem && (reduceItem.reducePrice != void 0) && !isNaN(parseFloat(reduceItem.reducePrice))) {
                TotalReductPrice += parseFloat(reduceItem.reducePrice);
            }
        }
        TotalPriceCls.html(reduceFloat(totalPrice, TotalReductPrice));
        var remainprice = availgifttotal > TotalReductPrice;
                
        //var surplus = reduceFloat(availgifttotal, TotalReductPrice);
        if (remainprice) {
            $m.node('.availgifttotal').html(reduceFloat(availgifttotal, TotalReductPrice));
            $m.node('.GiftAmount').each(function (a, b) {
                a.removeAttribute('disabled')
            })
        } else {
            $m.node('.GiftAmount').each(function (a, b) {
                if (b != index) {
                    $m.node(a).attr('disabled', 'true')
                }
            })
            $m.node('.availgifttotal').html(0);
        }
        $(".orderinfo").each(function (inx) {
            var self = $(this),
                moeny = self.find(".orderavailgift"),
                input = self.find("#select2-"+inx);

            if ((inx != index || index === -1) && !input.attr("checked")) {
                var currPrice = Math.min(data.OrderInfos[inx].ordergif, reduceFloat(availgifttotal, TotalReductPrice));
                if (currPrice < 0) {
                    currPrice = data.OrderInfos[b].ordergif;
                }
                moeny.text(currPrice);
                input.attr("maxvalue", currPrice);
            }
        })
                    
    }

    function changedescript(index,str) {
        $m.node('#CouponDescription-' + index).html(str)
    }

    function changefreecart(index, checked) {
        var totalcarts = data.FreeCardCount;
        var totalreducecarts = 0;
        if (checked) {
            cloneData.OrderInfos[index].reduceCart = 1;
            
        } else {
            cloneData.OrderInfos[index].reduceCart = 0;
            
        }
        for (var i = 0, length = cloneData.OrderInfos.length; i < length; i++) {
            reduceItem = cloneData.OrderInfos[i];
            if (reduceItem && reduceItem.reduceCart != void 0) {
                totalreducecarts += reduceItem.reduceCart;
            }
        }

        //totalreducecarts = totalreducecarts < 1 ? 1 : totalreducecarts;
        data.RemainFreeCardCount = data.FreeCardCount - totalreducecarts;

        var remainprice = data.RemainFreeCardCount;

        if (remainprice>0) {
            $m.node('.RemainFreeCard').html(remainprice);
            $m.node('.FreeCard').each(function (a, b) {
                a.removeAttribute('disabled')
            })
        } else {
            $m.node('.FreeCard').each(function (a, b) {
                if (b != index) {
                    $m.node(a).attr('disabled', 'true')
                }
            })
            $m.node('.RemainFreeCard').html(0);
        }
    }
    $m.node('[id*=select0]').bind('click', function () {
        var checked = $m.node(this).val(),
            index = parseInt($m.node.attr(this, 'index'));
        if (checked) {
            diabled(this.parentNode.parentNode, index);
            cloneData.OrderInfos[index] = data.OrderInfos[index];
            changeprice(this, null, index, true);
            //$m.node.toggleClass(this.parentNode.parentNode, 'none', 'show');
            changedescript(index, '');
            gatherEnvelope(-1)
        }
        changefreecart(index, !1);
    })

    $m.node('[id*=select2]').bind('click', function () {
        var checked = $m.node(this).val(),
            index = parseInt($m.node.attr(this, 'index')),
            val = parseFloat($(this).parent().find(".orderavailgift").text());
        if (checked) {
            recover(this.parentNode, index);
            changeprice(this.parentNode, val, index);
            changedescript(index, '使用红包' + val + '元');
            gatherEnvelope(index);
            //$m.node.toggleClass(this.parentNode.parentNode, 'none', 'show')
        }
        changefreecart(index, !1);
    })
    //使用优惠券
    $m.node('[id*=select3]').bind('click', function () {
        var checked = $m.node(this).val(),
            index = parseInt($m.node.attr(this, 'index'));
        if (checked) {           
            $("#choice-coupons").attr("data-index", index)
                                .data("parent", this.parentNode)
                                .find(".coupons-msg").text("正在加载中...")
                                .parent().find('.choice-list').html("");
            togglePanel();
            loadCoupons($(this).closest(".orderinfo"));
            gatherEnvelope(-1);
        }
    });
    $(".btn-group button").bind('click',function () {
        var self = $(this);
        if (self.hasClass("btn-primary")) {
            return;
        }
        $(".btn-group button").removeClass("btn-primary");
        $(".toggle-area").hide();
        self.addClass("btn-primary");
        $("#" + self.attr("data-toggle")).show();
    });

    $("#choice-coupons").on('click', '.choice-item', function () {
        var self = $(this),
            money = self.attr("data-coupons-money"),
            code = self.attr("data-coupons-code"),
            type = self.attr("data-coupons-type");
        couponsInvolve(code, money, type);
    });

    //清除优惠券
    function clearCoupons(scope) {
        scope.find("#hidCouponCode").val("");
        scope.find("#hidCouponMoney").val("");
        scope.find("#couponsTotal").html("");
    }
    /* 加载优惠券
    * @param {element} 作用域 ps:每一个订单为一个优惠作用域
    *
    */
    function loadCoupons(scope) {
        var that = $("#choice-coupons");
        var sellerInfo = scope.find("[name=TotalPriceForSeller]");
        var productids = scope.find('input[name="hidProductIds"]').val();
        var sellerId = sellerInfo.attr("SellerId");
        var amount = sellerInfo.val();
        var str = [],
            tepml = [];

        $.get('/Purchase/GetVaildCouponList?sellerId=' + sellerId + '&productIds=' + productids + '&amount=' + amount, function (data) {
            var msg = '';
            if (data != null && data.length > 0) {
                $(data).each(function (i, obj) {
                    var flag = "";
                    if (obj.UseType == "1") //1--抵现金
                        flag = "满" + obj.MinOrderValue + "减" + obj.CouponValue;
                    else   //2--返红包
                        flag = "满" + obj.MinOrderValue + "返" + obj.CouponValue + "红包";

                    if (obj.UserType == "1")  //1--首次下单用户
                        obj.ValidEnd = '<i class="stress">仅限首次购物使用</i>';
                    else
                        obj.ValidEnd = '有效时间：' + obj.ValidEnd;
                    tepml = [
                       "<li class=\"choice-item\" data-coupons-type=\"" + obj.UseType + "\" data-coupons-code=\"" + obj.CouponCode + "\" data-coupons-money=\"" + obj.CouponValue + "\">",
                       "    <p class=\"info\">" + flag + "</p>",
                       "    <p class=\"choice-term\">" + obj.ValidEnd + "</p>",
                       "    <p class=\"choice-term\">编号：" + obj.CouponCode + "</p>",
                       "    <em class=\"choice-icon icon-font-ymt\">&#x344c;</em>",
                       "</li>"]
                    str.push(tepml.join(""));
                });
                that.find('.choice-list').html(str.join(""));
            } else {
                msg = '您没有可选择的优惠券';
            }
            that.find('.coupons-msg').text(msg);
        });

    }

    /**
    * 优惠券牵连变更
    * @param {string} 优惠券码
    * @param {string} 金额
    * @param {string} 优惠券类型
    */
    function couponsInvolve(code,money,type) {
        var index = $("#choice-coupons").attr("data-index"),
            scope = $(".orderinfo").eq(index);
        scope.find("#couponsTotal").html((type=="1"?"抵扣":"返还")+'<span class="yen co-red" class="vm">&yen;</span><span class="co-red" >' + money + '</span>');
        changedescript(index, (type == "1" ? "使用优惠券" : "返还") + money + '元');
        togglePanel(true);
        scope.find("#hidCouponCode").val(code);
        
        if (type != "1") {
            money = 0;
        }
        scope.find("#hidCouponMoney").val(money);
        changeprice(scope.find("#select3-" + index).parent()[0], money, index);
    }

    /*
    * 切换面板
    * @param {boolean} status false：显示选择优惠券|true：显示订单信息
    */
    function togglePanel(status) {
        var status1 = "show",
            status2 = "hide",
            back = $(".top-bar .back");
            back.on("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                togglePanel(true);
                back.unbind("click")
            })
        if (status) {
            status1 = "hide";
            status2 = "show";
        } 
        $("#choice-coupons")[status1]();
        $("#orders-info")[status2]();
        $("#input-code").val('')
    }


    var IsNeedBindMobile=void 0;

    //NeedBindMobile,验证是否需要绑定手机
    function NeedBindMobile(code,callback){
        $m.ajax({
            url:"/Purchase/CheckCoupon?couponCode="+code,
            success:function(data){
                if(data&&data.NeedBindMobile){
                    ValidateCode()
                    IsNeedBindMobile=!0;
                    ClearValue();
                    $m.node('#SpecialCoupons').show();
                    $m.node('#input-code').css('backgroundColor','#eee').attr('disabled','true');
                    $m.node('#NextCoupon').css('display','inline-block')

                }else{
                    //IsNeedBindMobile=!1;
                    callback&&callback();
                }
            }
        })
    }

    $m.node('#NextCoupon').bind('click',function(){
        $m.node(this).hide()
        $m.node('#input-code').css('backgroundColor','#fff').attr('disabled','');
        $m.node('#input-code')[0].value="";
        $m.node('#SpecialCoupons').hide();
        IsNeedBindMobile=void 0
    })

    var iscountdowning=!1;
    //一分钟倒计时
    function MinuteCountDown(container,callback){
        var time=60;
        var timeout=setInterval(function(){
            if(time<=0){
                clearTimeout(timeout);
                callback();
                iscountdowning=!1;
                return;
            }
            time--;
            container.html(time+"秒");
            iscountdowning=true;
        },1000)
    }

    //
    function ClearValue(){
        $('#SpecialCoupons input').val("");
    }

    //send info
    function SendMobileValidateCode(number){
        $m.ajax({
            url:"/Purchase/SendMobileValidateCode?mobile="+encodeURIComponent(number),
            success:function(data){
                if(data.success){
                    var elem=$m.node('#SendValidate');
                    elem.css({color:'#fff'})
                    MinuteCountDown(elem,function(){
                        elem.css({color:'#666'}).html("发送验证码")
                    })
                }else{
                    layer.alert("验证码发送失败");
                }
            }
        })
        
    }

    $m.node('#SendValidate').bind('click',function(){
        if(iscountdowning){
            return;
        }
        var phone=$m.node('#Phone').val();

        if(phone&&/^\d{11}$/.test(phone)){
            SendMobileValidateCode(phone)
        }else{
            layer.alert("请填写正确的手机号码");
        }
        
    })

    var __validatesign="";

    function ValidateCode(callback){
        $m.ajax({
            url:"/Purchase/GetNewValidate",
            success:function(data){
                if(data){
                    __validatesign=data.Sign;
                    $m.node('#ValidatePic').attr('src',data.ValidateCodeUrl);
                    callback&&callback()
                }
            }
        })
    }

    //BindAndValateMobile
    function BindAndValateMobile(callback){
        var Phone=$m.node('#Phone').val();
        var Code=$m.node('#Code').val();
        var validateCode=$m.node('#validateCode').val();
        if(!__validatesign){
            return;
        }
        if(!Phone){
            layer.alert("请填写手机号码");
            return;
        }
        if(!/^\d{11}$/.test(Phone)){
            layer.alert("请填写正确的手机号码");
            return;
        }
        if(!Code){
            layer.alert("请输入短信验证码");
            return;
        }
        if(!validateCode){
            layer.alert("请输入验证码");
            return;
        }

        $m.ajax({
            url:"/Purchase/BindMobile?mobile="+encodeURIComponent(Phone)+"&mobileCode="+encodeURIComponent(Code)+"&sign="+__validatesign+"&validationCode="+encodeURIComponent(validateCode),
            success:function(data){
                if(data.success){
                    callback&&callback()
                }else{
                    layer.alert(data.msg);
                    ValidateCode()
                }
            }
        })
    }

    $m.node('.ValidateButton').bind('click',function(){
        ValidateCode()
    });

    //输入优惠券
    $("#use-code").click(function () {
        var index = $("#choice-coupons").attr("data-index"), code = $("#input-code").val();
        function handle(){
            $.get('/Purchase/GetCouponValue?orderIndex=' + index + "&couponCode=" + code, function (res) {
                if (res.result == 1) {
                    couponsInvolve(code, res.msg, res.couponusingtype)
                }
                if (!res.result) {
                    layer.alert(res.msg);
                }
            });
        }
        if(IsNeedBindMobile==void 0){
            NeedBindMobile(code,handle);
            return !1;
        }
        if(IsNeedBindMobile===!1){
            handle()
            return !1
        }
        if(IsNeedBindMobile){
            BindAndValateMobile(handle);
        }
        return !1;

    });
    $m.node('.coupon .hed').bind('click', function () {
        var next = $m.node.next(this), index = parseInt($m.node.attr(this, 'index'));

        if (data.RemainFreeCardCount > 0) {
            var freecart = $m.node('#FreeCart-' + index);
            data.index = index;
            $m.template({
                container: freecart[0],
                html: freecarttemplate,
                data: data
            });
            freecart.show()
        }
        $m.node.toggleClass(next, 'none', 'show');
        
    })
    $m.event.delegate('.FreeCard', 'click', function () {
        var checked = $m.node(this).val(), index = parseInt($m.node.attr(this, 'index'));
        if (checked) {
            //$m.node.toggleClass(this.parentNode.parentNode.parentNode, 'none', 'show');
            changeprice(this, null, index, true);
            changedescript(index, '使用1免运卡');
            $m.node(this.parentNode).find('.TheRemainder').css("display","inline-block")
        }
        if (data.RemainFreeCardCount > 0) {
            changefreecart(index, checked);
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

    var env = "http://www.ymatou.com";
    if ($m.isAlpha) {
        env = "http://www.alpha.ymatou.com"
    } else if ($m.isNative) {
        env = "http://localhost:33093"
    } else {
        env = "http://www.ymatou.com"
    }


    function SaveOrder() {
        //$m.node('#LoaddingGif').show();
        $('#btnSaveOrder').innerHTML = "结算中...";
        var orderInfo = [];
        $m.each(data.OrderInfos, function (a, b) {
            orderInfo.push({
                vSellerId: a.SellerId,
                vAddress: $m.node('#FullAddressField').val(),
                vPostCode: $m.node('#sPostCodeField').val(),
                vName: $m.node('#sRecipientField').val(),
                vPhone: $m.node('#sCellPhoneField').val(),
                vTelephone: $m.node('#sTelphoneField').val(),
                vQQ: "",
                vEmail: $m.node('#UserEmailField').val(),
                vLeaveWord: "",
                vNewAddress: $m.node('#sAddress2Field').val(),
                UseGiftAmount: $m.node('#select2-' + b).val() ? parseFloat($m.node('#select2-' + b).attr('maxvalue')) : 0,
                //CouponCode: $m.node.attr($m.node('#CouponCode-' + b)[0], 'value') || null,
                CouponCode: $(".orderinfo").eq(b).find("#hidCouponCode").val(),
                SkipAd: false,
                HasFreeCard: $m.node('#select1-' + b).length > 0 && $m.node('#select1-' + b).val() ? true : false
            });
        });
        var d = { saveOrderInfoAddresses: orderInfo, tempEmailAddress: data.UserEmail };
        $m.ajax({
            url: 'SaveOrderInfo',
            data: d,
            method: 'post',
            type: 'json',
            success: function (msg) {
                if (msg.result == true) {
                    //location.href = env + "/PurchaseInfo/Checkout?tid=" + msg.order;

                    CheckIdPicExist(msg.orderids, msg.order);
                    //var orders = msg.orderids.split(",");
                    //for (var i = 0; i < orders.length; i++) {
                    //    SaveCps(orders[i], $("#CurrentUserId").val());
                    //}

                    //location.href = "/checkout?tid=" + msg.order;
                } else {
                    $m.node('#LoaddingGif').hide();
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
                    $('#btnSaveOrder').innerHTML = "结算"
                }
            }
        });
    }

    function CheckIdPicExist(orderids,tradingid) {
        var alertedSailProducted = false;
        var orders = orderids.split(",");
        var orderPara = "";
        for (var i = 0; i < orders.length; i++) {
            orderPara += ("&businessid=" + orders[i]);
        }
        //如果有护航直邮商品需要上传省份证
        var HasSailProtected = $('#HasSailProtected').val();
        if (HasSailProtected == "true") {
            var saildate = { cardOwner: $m.node('#sRecipientField').val(), mobile: $m.node('#sCellPhoneField').val() };
            $m.ajax({
                url: '/purchase/IdCardExistsByMobile',
                data: saildate,
                method: 'post',
                type: 'json',
                async: false,
                success: function (msg) {
                    if (!msg.result) {
                        $("#UploadIdPic").attr("href", $("#IdPicUploadSiteUrl").val() + "?userid=" + $("#CurrentUserId").val() + "&name=" + $m.node('#sRecipientField').val() + "&mobile=" + $m.node('#sCellPhoneField').val() + orderPara + "&type=Order&action=add&ret=" + $("#MobileSiteUrl").val() + "/checkout?tid=" + tradingid);
                        $("#IDCardAlertBox").show();
                        alertedSailProducted = true;
                        $("#ContinueToPay").click(function () {
                            location.href = "/checkout?tid=" + tradingid + "&loginaccesstoken="+ $('#UserAccessToken').val();
                        });
                        return false;
                    }
                    else {
                        location.href = "/checkout?tid=" + tradingid + "&loginaccesstoken="+ $('#UserAccessToken').val();
                    }
                }
            });
        }
        else {
            location.href = "/checkout?tid=" + tradingid + "&loginaccesstoken="+ $('#UserAccessToken').val();
        }
    }

    //function SaveCps(orderId, userId) {
    //    $.ajax({
    //        type: "POST",
    //        url: $("#CPSSiteUrl").val() + "cpsRedirect_" + orderId + "_" + userId,
    //        data: { },
    //        dataType: "jsonp",
    //        complete: function(d) {
    //            return d.responseText;
    //        }
    //    });
    //}

    $m.event.bind($m.node('#btnSaveOrder')[0], 'click', function () {
        if ($m.node('#HasDefaultAddress').val() == "0") {
            layer.alert("请填写收货地址");
            return;
        }
        SaveOrder();
    });
})
