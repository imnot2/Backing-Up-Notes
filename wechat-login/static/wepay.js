/**
 * gui.js 
 */
'use strict';
var gui = window.gui || (window.gui = {});
alert(123)
//是否为微信浏览器
gui.isWechat = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';

//是否为线上环境
gui.isLine = !/alpha|localhost|file:/ig.test(location.href);

gui.baseUrl = gui.isLine ? 'm.ymatou.com' : 'mobile.alpha.ymatou.com';

gui.utils = {
    urlQuery: function (url) {
        var url = url || window.location.href;
        var seach = url.match(/\?.*/);
        var queryArr, queryObj = {};

        seach = seach ? seach[0].substring(1) : '';
        queryArr = seach.split('&');

        for (var i = 0, tempArr; i < queryArr.length; i++) {
            tempArr = queryArr[i].split('=');
            if (tempArr.length < 2) continue;
            queryObj[tempArr[0]] = tempArr[1];
        }
        return queryObj;
    }
};

gui.utils.wechatExtend = function (options) {
    /**
     * @name wechatExtend
     * @param options  => json
     * @desc
     *  appid 微信公众号id
     *  weChatConf 微信配置信息，详细见http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
     *  wechatFn 功能函数
     *  shareConf 分享配置
     */
    var appid = options.appid;
    var weChatConf = options.weChatConf;
    var wechatFn = options.wechatFn;
    var shareConf = options.shareConf || {};

    //window.wx = {};

    //获取签名
    function getSignature() {
        var u = window.encodeURIComponent(window.location.href.split(/#/)[0]);
        Requester.JSONP('http://' + gui.baseUrl + '/GetJsSignature.aspx?v=' + new Date().getTime() + '&appId=' + appid + '&u=' + u, {
            callback: function (res) {
                res = res || {};
                if (!res.Signature || !res.TimeStamp || !res.NonceStr) return;
                weChatConf['signature'] = res.Signature;
                weChatConf['timestamp'] = res.TimeStamp;
                weChatConf['nonceStr'] = res.NonceStr;
                weChatConf['appId'] = res.AppId;
                
                wx.config(weChatConf);
                // callback && callback(weChatConf);
            }
        });
    }

    function init() {
        var guid = 0;
        getSignature();
        wx.error(function (res) {
            //重新获取签名,进行配置
            if (res['errMsg'] === 'config:invalid signature') {
                if (guid > 3) {
                    return;
                }
                else {
                    getSignature();
                    guid++;
                }
            }
        });
        wx.ready(function () {
            if ('title' in shareConf) {
                wx.onMenuShareTimeline(shareConf);
                wx.onMenuShareAppMessage(shareConf);
            }
            wechatFn();
        });
    }

    init();
}

var tid = gui.utils.urlQuery().tradingId;
var token = gui.utils.urlQuery().AccessToken || gui.utils.urlQuery().token;

gui.utils.wechatExtend({
    appid: 'wxa06ebe9f39751792',
    weChatConf: {
        debug: false,
        jsApiList: ['chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage']
    },

    wechatFn: function () {
        var d = {
            AccessToken: token,
            tradingId: tid,
            platForm: '2'
        };

        Requester.post('/Pay/WeChat/PayJson', {
            data: d, 
            onsuccess: function (res) {
                res = res || {};
                if (res.IsSuccess) {
                    var opt = res.PayOrderRequest;
                    wx.chooseWXPay({
                        'timestamp': opt.TimeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        'nonceStr': opt.NonceStr, // 支付签名随机串，不长于 32 位
                        'package': opt.Package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        'signType': opt.SignType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        'paySign': opt.Sign, // 支付签名
                        success: function (res) {
                            // alert(window.location.href)
							var ret = gui.utils.urlQuery().ret || 'http://m.ymatou.com';
                            window.location.href = decodeURIComponent(ret);
                        }
                    });
                }
                else {
                    alert(res.ErrorMessage);
                }
            }
        });
    }
});