gui.utils.wechatExtend = function(options) {
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

    //win.wx = {};

    var config = $.extend({
        debug: false,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    }, weChatConf || {});


    //获取签名
    function getSignature(callback) {
        var u = win.encodeURIComponent(win.location.href.split(/#/)[0]);
        gui.utils.jsonp('http://' + gui.baseUrl + '/GetJsSignature.aspx?v=' + new Date().getTime() + '&appId=' + appid + '&u=' + u, function(res) {
            res = res || {};
            if (!res.Signature || !res.TimeStamp || !res.NonceStr) return;
            config['signature'] = res.Signature;
            config['timestamp'] = res.TimeStamp;
            config['nonceStr'] = res.NonceStr;
            config['appId'] = res.AppId;
            callback && callback(config);
        });
    }

    function setWechatOptions() {
        getSignature(function(conf) {
            wx.config(conf);
        });
    }

    function init() {
        var guid = 0;
        setWechatOptions();
        wx.error(function(res) {
            //重新获取签名,进行配置
            if (res['errMsg'] === 'config:invalid signature') {
                if (guid > 3) {
                    return;
                } else {
                    setWechatOptions();
                    guid++;
                }
            }
        });
        wx.ready(function() {
            if ('title' in shareConf) {
                wx.onMenuShareTimeline(shareConf);
                wx.onMenuShareAppMessage(shareConf);
            }
            wechatFn();
        });
    }

    if ('ready' in (win.wx || {})) {
        init();
    } else {
        gui.utils.loadScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
            init();
        });
    }
}