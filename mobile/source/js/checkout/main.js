define(function(require, exports, module) {
    //var c = require('checkout/controll');
    //$m.mobile.when('/:tid', {
    //    template: 'checkout/checkout.html',
    //    data:['GetUserAccountInfo'],
    //    controller: c.checkout,
    //    config: {
    //        title: '收银台'
    //    }
    //})
    //.when('/zfbmt/:a/:p/:s/:tid', {
    //    template: 'checkout/payment.html',
    //    controller: c.zfbmt,
    //    config: {
    //        title: '收银台'
    //    }
    //})
    //.when('/query', {
    //    template: 'checkout/query.html',
    //    controller: c.query,
    //    config: {
    //        title: '收银台',
    //        header: '<h1 class="title">收银台</h1><div class="fl"><a href="/#/index"><img src="/img/logo.png" title="" alt=""></a></div>',
    //        footer:''
    //    }
    //})
    //.when('/result', {
    //    template: 'checkout/result.html',
    //    controller: c.result,
    //    config: {
    //        title: '收银台',
    //    }
    //})
    //.defaultWish({ redirect: '/:tid', app: c });
    function submit(url, data, vertify) {
        $m.ajax({
            url: "/checkout/" + url,
            data: data,
            method: 'post',
            cache: true,
            type: 'json',
            success: function(msg) {
                if (msg.result == 'success') {
                    var url = msg.PayUrl;
                    var redirect =
                        $m.isOnline ? "http://m.ymatou.com/checkout/NoticePaymentResult" :
                        $m.isAlpha ? "http://mobile.alpha.ymatou.com/checkout/NoticePaymentResult" :
                        $m.isBeta ? "http://mobile.beta.ymatou.com/checkout/NoticePaymentResult" :
                        $m.isNative ? "http://localhost:12020/checkout/NoticePaymentResult" : "http://m.ymatou.com/checkout/NoticePaymentResult";
                    vertify.hide();
                    location.href = url.search('checkout') > -1 ? url : url + "&call_back_url=" + redirect;
                } else if (msg.msg) {
                    vertify.html(msg.msg).show()
                }
            }
        });
    }

    var AvailAmountStatus = parseInt($m.node('#AvailAmountStatusField').val());
    var TradingId = $m.node('#TradingIdField').val();
    var Signature = $m.node('#SignatureField').val();
    var TotalPrice = $m.node('#TotalPriceField').val();

    $m.node('#toPayByMatou').bind('click', function() {
        var input = $m.node('#mtpassword').val();
        if (!input) {
            alert('请输入码头密码')
            return;
        }
        var d = {
            payPrice: TotalPrice,
            tradingId: TradingId,
            tradingPassword: input,
            sign: Signature
        }
        var vertify = $m.node('#vertifypassword');
        submit('PayByYmtAccount', d, vertify, $m.node('#mttradebox'));
        return !1
    });

    $m.node('#mtavaiamount').bind('click', function() {
        var checked = $m.node(this).val()
        if (!checked) {
            $m.node('#PayYmtpasswd').hide()
        } else {
            $m.node('#PayYmtpasswd').show()
        }
    })

    $m.node('#toPays').bind('click', function() {
        var input = $m.node('#zhifubao').val()
        if (!input) {
            alert('请选择第三方支付方式')
            return;
        }

        var vertify = $m.node('#vertifypasswordpayment'),
            d;

        var hasymtpay = AvailAmountStatus == 2 && $m.node('#mtavaiamount').val();

        if (hasymtpay) {
            d = {
                tradingId: $m.node('#TradingIdField').val(),
                tradingPassword: $m.node('#mtpasswordpayment').val(),
                sign: $m.node('#SignatureField').val()
            }
            submit('PayByAlipayAndYmatou', d, vertify);
        } else {
            d = {
                tradingId: TradingId
            }
            submit('PayByAlipay', d, vertify);
        }

        return !1
    });

    var wechat = require('module/extendWechat');
    wechat.wechatExtend({
        appid: 'wxa06ebe9f39751792',
        weChatConf: {
            //debug: true,
            jsApiList: ['hideMenuItems']
        },
        wechatFn: function() {
            wx.hideMenuItems({
                menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        }
    });

    //检查是否为微信浏览器;
    var is_weixin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
        html,
        hasBalances = $('#CanPayByYmt').val() === 'true',
        staticBaseUrl = /alpha|file:|localhost/ig.test(window.location.href) ? 'staticwap.alpha.ymatou.com' : 'staticwap.ymatou.com';
    
    if (is_weixin && !hasBalances) {
        html = [
            '<div class="pay-mask show">',
            '    <div class="top-box">',
            '        <div class="top-tips"><img src="http://' + staticBaseUrl + '/img/pay/toptips.png" height="77" alt=""></div>',
            '    </div>',
            '    <div class="main-box">',
            '        <img src="http://' + staticBaseUrl + '/img/pay/pay_03.png" height="302" alt="">',
            '        <a class="down-btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ymatou.app&g_f=991653"></a>',
            '    </div>',
            '    <div class="guide-btn">',
            '        <img src="http://' + staticBaseUrl + '/img/pay/mask2_03.png" height="164" alt="">',
            '    </div>',
            '</div>'
        ].join('');

        $('body').append(html);
    };
});