'use strict';
(function(win) {
    var gui = win.gui || (win.gui = {});

    var isString = isType('String');
    var isFunction = isType('Function');
    var isObject = isType('Object');

    function isType(type) {
        return function(str) {
            return Object.prototype.toString.call(str) === '[object ' + type + ']';
        };
    }

    function singleton(fn) {
        var res;
        return function() {
            return res || (res = fn.apply(null, arguments));
        };
    }

    function bindScope(func, scope) {
        if (isString(func)) {
            func = scope[func];
        }
        if (isFunction(func)) {
            throw '"func" is null';
        }
        var xargs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
        return function() {
            var fn = isString(func) ? scope[func] : func,
                args = (xargs) ? xargs.concat([].slice.call(arguments, 0)) : arguments;
            return fn.apply(scope || fn, args);
        };
    }
    //异步
    function Promise() {
        this.list = [];
    }
    Promise.prototype.push = function(fn) {
        var _fn = fn,
            next = bindScope(this.next, this);
        fn = function() {
            _fn.apply(null, [next].concat([].slice.call(arguments, 0)));
        };
        this.list.push(fn);
        return this;
    };
    Promise.prototype.next = function() {
        if (this.list.length > 0) {
            var fn = this.list.shift();
            fn.apply(null, [].slice.call(arguments, 0));
        }
    };

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
        urlQuery: function(url) {
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
        },
        param: function(o) {
            var i, str = '';
            if (!isObject(o)) o = {};
            for (i in o) {
                str += '&' + i + '=' + encodeURIComponent(o[i]);
            }
            return str;
        },
        //创建遮罩
        creatMask: singleton(function() {
            var temp = document.createElement('div');

            temp.innerHTML = '<div class="floatbox"><div class="floatbox-content"></div></div>';
            return document.body.appendChild(temp.firstChild);
        }),
        showDialog: function(html) {
            var mask, cont;
            if (!$.trim(html).length) return;
            mask = this.creatMask();
            mask.classList.add('show');
            cont = mask.querySelector('.floatbox-content');
            cont.innerHTML = html;
            cont.querySelector('.close').setAttribute('onclick', 'gui.utils.hideMask()');
        },
        //显示tip。
        showError: function(text) {
            var mask,cont;
            if (!$.trim(text).length) return;
            mask = this.creatMask();

            mask.classList.add('show');
            mask.setAttribute('onclick', 'gui.utils.hideMask()');
            cont = mask.querySelector('.floatbox-content');
            cont.innerHTML = '<div class="msg ui-msg">' + text + '</div>';
        },
        hideMask: function(node) {
            if (!node || !node.tagName) node = this.creatMask();
            node.classList.remove('show');
        },

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
        checkMobile: function(n) {
            return gui.MOBILEREG.test(n || '');
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
        },
        wechatExtend: function(options) {
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
    };
    gui.StartCountDown = function(node, callback) {
        this.node = node;
        this.timer_sendCheckCode = null;
        if (!isFunction(callback)) this.callback = function() {};
    };
    gui.StartCountDown.prototype.init = function() {
        var node = this.node;
        var that = this;
        that.timer_sendCheckCode = setInterval(function() {
            var countDownNode = node.querySelector('.count-down');
            var curTime = parseInt(countDownNode.text());
            if (curTime === 1) {
                that.callback();
                clearInterval(that.timer_sendCheckCode);
            } else {
                countDownNode.text(--curTime);
            }
        }, 1000);
    };
})(window);