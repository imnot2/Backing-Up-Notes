define(function (require, exports, module) {

    var m = require('ui/popModel');

    function submit(url, data, vertify,container) {
        $m.ajax({
            url: url,
            data: data,
            method: 'post',
            type: 'json',
            timeout: 1000,
            success: function (msg) {
                if (msg.result == 'success') {
                    vertify.hide();
                    container.html('恭喜您已经支付成功！');
                } else if (msg.msg) {
                    vertify.html(msg.msg).show()
                }
            }
        });
    }

    exports.checkout = function (param,html, data) {
        $m.mobile.insertContent(html, data);
        $m.node('#toRedirect').bind('click', function () {
            var input = $m.node('#mtpassword').val();
            if (!input) {
                alert('请输入码头密码')
                return;
            }
            var d = {
                payPrice: data.TotalPrice,
                tradingId: param.tid,
                tradingPassword: input,
                sign: data.Signature
            }
            var vertify = $m.node('#vertifypassword');
            submit('PayByYmtAccount', d, vertify, $m.node('#mttradebox'))
        })

        $m.node('#toPays').bind('click', function () {
            var input = $m.node('#zhifubao').val()
            if (!input) {
                alert('请选择第三方支付方式')
                return;
            }
            if (data.AvailAmountStatus == 2) {
                var mtavai = $m.node('#mtavaiamount');
                if (mtavai.val()) {
                    $m.mobile.toURL('/zfbmt/a=' + data.AvaliableAccount + '/p=' + data.TotalPrice + '/s=' + data.Signature + '/tid=' + param.tid);
                }
            } else {
                $m.mobile.toURL('/zfbmt/tid=' + param.tid + '/p=' + data.TotalPrice);
            }
            
            return !1
        });
    }

    exports.zfbmt = function (param, html) {
        param.other = param.a ? parseInt(param.p) - parseInt(param.a) : parseInt(param.p);
        $m.mobile.insertContent(html, param);
        $m.node('#toSubmit').bind('click', function () {
            var vertify = $m.node('#vertifypasswordpayment'), d, parent = $m.node('#submitPayment');
            if (param.a && param.a == 2) {
                d = {
                    tradingId: param.tid,
                    tradingPassword: input,
                    sign: data.Signature
                }
                submit('PayByAlipayAndYmatou', d, vertify, parent);
            } else {
                d = {
                    tradingId: param.tid
                }
                submit('PayByAlipay', d, vertify, parent);
            }
        });
    }
    exports.query = function (html) {
        $m.mobile.insertContent(html);
    }

    exports.result = function (html) {
        $m.mobile.insertContent(html);
    }
})