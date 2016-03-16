define(function(require, exports, module) {
    var baseUrl = /alpha|file:|localhost/ig.test(window.location.href) ? 'mobile.alpha.ymatou.com' : 'm.ymatou.com';

    exports.wechatExtend = function(options) {

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

        var config = $.extend({
            debug: false,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        }, weChatConf || {});

        //脚本加载器。
        function loadScript(url, callback) {
            var node = document.createElement("script");
            var timeID;
            var supportLoad = "onload" in node;
            var onEvent = supportLoad ? "onload" : "onreadystatechange";
            var head = document.getElementsByTagName('head')[0];
            node[onEvent] = function onLoad() {
                if (!supportLoad && !timeID && /complete|loaded/.test(node.readyState)) {
                    timeID = setTimeout(onLoad)
                    return
                }
                if (supportLoad || timeID) {
                    clearTimeout(timeID);
                    callback && callback();
                }
            }
            head.insertBefore(node, head.firstChild) //chrome下第二个参数不能为null
            node.src = url
        };
        //获取签名
        function getSignature(callback) {
            $.ajax({
                url: 'http://' + baseUrl + '/GetJsSignature.aspx',
                type: "GET",
                dataType: "jsonp",
                data: {
                    appId: appid,
                    u: window.location.href.split(/\?|#/)[0]
                },
                success: function(res) {
                    res = res || {};
                    if (!res.Signature || !res.TimeStamp || !res.NonceStr) return;
                    config['signature'] = res.Signature;
                    config['timestamp'] = res.TimeStamp;
                    config['nonceStr'] = res.NonceStr;
                    config['appId'] = res.AppId;
                    callback && callback(config);
                }
            });
        };
        //微信配置
        function setWechatOptions() {
            getSignature(function(conf) {
                wx.config(conf);
            });
        };

        function init() {
            setWechatOptions();
            wx.error(function(res) {
                //重新获取签名,进行配置
                if (res['errMsg'] === 'config:invalid signature') setWechatOptions();
            });
            wx.ready(function() {
                if ('title' in shareConf) {
                    wx.onMenuShareTimeline(shareConf);
                    wx.onMenuShareAppMessage(shareConf);
                }
                wechatFn();
            });
        }

        if ('ready' in (window.wx || {})) {
            init();
        } else {
            loadScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
                init();
            });
        }
    }
})