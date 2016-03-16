/**
 * gui.js 
 */
(function(win, undefined) {
    'use strict';
    var gui = win.gui || (win.gui = {});

    function singleton(fn) {
        var res;
        return function() {
            return res || (res = fn.apply(null, arguments));
        };
    }
    gui.MOBILEREG = /^1[3|4|5|7|8][0-9]\d{8}$/;

    //是否为微信浏览器
    gui.isWechat = singleton(function() {
        return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
    });

    //是否为线上环境
    gui.isLine = singleton(function() {
        return !/alpha|localhost|file:/ig.test(location.href);
    });

    gui.baseUrl = gui.isLine() ? 'm.ymatou.com' : 'mobile.alpha.ymatou.com';
    
    gui.utils = {              
        
        loadScript: function(url, callback) {
            var node = document.createElement('script');
            var timeID;
            var supportLoad = 'onload' in node;
            var onEvent = supportLoad ? 'onload' : 'onreadystatechange';
            var head = document.getElementsByTagName('head')[0];
            node[onEvent] = function onLoad() {
                if (!supportLoad && !timeID && /complete|loaded/.test(node.readyState)) {
                    timeID = setTimeout(onLoad);
                    return;
                }
                if (supportLoad || timeID) {
                    clearTimeout(timeID);
                    callback && callback();
                }
            };
            head.insertBefore(node, head.firstChild); //chrome下第二个参数不能为null
            node.src = url;
        },
        
        jsonp: function(url, callback) {
            var jsonpCallback = 'jsonp' + Math.floor(Math.random() * 1000000 * new Date().getTime()).toString(16);
            url = url.split('#')[0];
            if (!~url.indexOf('?')) {
                url += '?';
            }
            if (!~url.indexOf(/(\?|&)callback=/)) {
                url += '&callback=' + jsonpCallback;
            }
            win[jsonpCallback] = function(res) {
                callback && callback(res);
            };
            var jsonp = document.createElement('script');
            jsonp.src = url;
            document.body.appendChild(jsonp);
        }
    };
   
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
})(this);