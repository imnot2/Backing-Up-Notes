'use strict';
var win = window;
(function() {
    var ac = win.ac || (win.ac = {});
    ac.MOBILEREG = /^1[3|4|5|7|8][0-9]\d{8}$/;
    ac.isWechat = function() {
        var res;
        return function() {
            return res || (res = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger');
        };
    }();
    ac.notLine = function() {
        var res;
        return function() {
            return res || (res = /alpha|localhost|file:/ig.test(location.href));
        };
    }();
    ac.baseUrl = !ac.notLine() ? 'm.ymatou.com' : 'mobile.alpha.ymatou.com';
    ac.utils = {
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
        //创建遮罩
        creatMask: function() {
            var result;
            return function() {
                return result || (result = $('<div class="floatbox"><div class="floatbox-content"></div></div>').appendTo($('body')));
            };
        }(),
        showDialog: function(html) {
            var mask;
            if (!$.trim(html).length) return;
            mask = this.creatMask();
            mask.addClass('show').find('.floatbox-content').html(html).find('.close').attr('onclick', 'ac.utils.hideMask()');
        },
        //显示tip。
        showError: function(text) {
            var mask;
            if (!$.trim(text).length) return;
            mask = this.creatMask();
            mask.addClass('show').attr('onclick', 'ac.utils.hideMask(this)').find('.floatbox-content').html('<div class="msg ui-msg">' + text + '</div>');
        },
        hideMask: function(node) {
            if (!node || !node.tagName) node = this.creatMask();
            $(node).removeClass('show');
        },
        fn: function(func, scope) {
            if (Object.prototype.toString.call(func) === '[object String]') {
                func = scope[func];
            }
            if (Object.prototype.toString.call(func) !== '[object Function]') {
                throw 'Error "hui.util.fn()": "func" is null';
            }
            var xargs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
            return function() {
                var fn = '[object String]' == Object.prototype.toString.call(func) ? scope[func] : func,
                    args = (xargs) ? xargs.concat([].slice.call(arguments, 0)) : arguments;
                return fn.apply(scope || fn, args);
            };
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
            return ac.MOBILEREG.test(n || '');
        },
        jsonp: function(url, callback) {
            var urlObj = ac.utils.urlQuery(url);
            win[urlObj['callback']] = function(res) {
                callback && callback(res);
            };
            var jsonp = document.createElement('script');
            //var reqUrl = window.encodeURIComponent(window.location.href.split(/#/)[0]);
            //jsonp.src = 'http://' + baseUrl + '/GetJsSignature.aspx?callback=bigui_jsonpcallback&appId=wxa06ebe9f39751792&u=' + reqUrl;
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
                ac.utils.jsonp('http://' + ac.baseUrl + '/GetJsSignature.aspx?callback=guiWechatJsonpCallback&v=' + new Date().getTime() + '&appId=' + appid + '&u=' + u, function(res) {
                    res = res || {};
                    if (!res.Signature || !res.TimeStamp || !res.NonceStr) return;
                    config['signature'] = res.Signature;
                    config['timestamp'] = res.TimeStamp;
                    config['nonceStr'] = res.NonceStr;
                    config['appId'] = res.AppId;
                    callback && callback(config);
                });
            }
            //微信配置
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
                ac.utils.loadScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
                    init();
                });
            }
        }
    };
    ac.StartCountDown = function(node, callback) {
        this.node = node;
        this.timer_sendCheckCode = null;
        this.callback = callback || function() {};
    };
    ac.StartCountDown.prototype.init = function() {
        var node = this.node;
        var that = this;
        that.timer_sendCheckCode = setInterval(function() {
            var countDownNode = node.find('.count-down');
            var curTime = parseInt(countDownNode.text());
            if (curTime === 1) {
                that.callback();
                clearInterval(that.timer_sendCheckCode);
            } else {
                countDownNode.text(--curTime);
            }
        }, 1000);
    };
    ac.fenzhong = {
        globalFn: function() {
            $('.look-rules a').on('click', function() {
                var html = [
                    '<div class="rules-dialog">',
                    '    <div class="rules-title">活动规则</div>',
                    '    <p>1、 购物满51元减50元</p>',
                    '    <p>2、 仅限首次下单的新注册用户使用</p>',
                    '    <p>3、 使用期限自即日起至2015年7月10日</p>',
                    '    <p>4、 每个用户每个券码仅限使用1次(同一用户定义，收件人姓名、地址、手机号及同一部手机均视为同一用户)</p>',
                    '    <p>5、 该优惠券仅限洋码头移动端使用（WAP/洋码头海外商城APP/洋码头扫货神器APP）,特价商品除外</p>',
                    '    <p>6、 需使用验证码进行手机验证后方可使用</p>',
                    '    <p>7、 优惠券码一经使用，不可退回</p>',
                    '    <p>8、 数量有限，先到先用</p>',
                    '    <p>9、 本活动不支持非正常交易行为，包括但不限于虚假交易、刷单、套现等恶意行为，一经发现洋码头有权采取扣回优惠券、删除订单、关闭账号等措施      </p>',
                    '    <div class="bottom-tips">本次活动洋码头享有法律允许范围内解释权</div>',
                    '    <span class="close"></span>',
                    '</div>'
                ].join('');
                ac.utils.showDialog(html);
            });
            if (ac.isWechat()) {
                ac.utils.wechatExtend({
                    appid: 'wxa06ebe9f39751792',
                    shareConf: {
                        title: '速点，洋码头50元全球畅购券限量抢！手快有，手慢无！', // 分享标题
                        desc: '洋码头只做洋货，50元全球畅购券，全场通用，限量抢，再看？再看就没了！', // 分享描述
                        link: window.location.href, // 分享链接
                        imgUrl: 'http://staticontent.ymatou.com/images/activity/fenzhong/share.jpg', // 分享图标
                    }
                });
            }

            //调整body的高度。
            $('body').css('height', $(document).height());
        },
        register: {
            init: function() {
                // function getAuthUi(o) {
                //     var b = !!o.codepicurl;
                //     return b ? [
                //         '<div class="auth-box operate-item">',
                //         '    <span class="icon-item icon-auth"></span>',
                //         '    <input type="text" placeholder="请输入右图的验证码" class="input-item input-auth" />',
                //         '    <div class="auth-code">',
                //         '        <img src="' + src + '" sign="' + o.Sign + '" />',
                //         '        <span class="auth-tips">换一张</span>',
                //         '    </div>',
                //         '</div>'
                //     ].join('') : '';
                // };

                // function showOldUserError(err) {
                //     $('.operate-tips').html('<span class="err-tips">' + err + '</span>');
                // }
                $('.btn-get').on('click', function(e) {
                    var operateNode = $(this).prev('.register-box');
                    $(this).remove();
                    operateNode.addClass('show');
                });
                $('body').delegate('input[type=text]', 'input', function() {
                    var val = this.value;
                    if (val.length > 0) {
                        $(this).addClass('change');
                    } else {
                        $(this).removeClass('change');
                    }
                });

                //有些安卓系统的focus时间会冒泡到父节点，导致键盘弹出后会马上就消失。
                $('input[type=text]').on('click focus', function(e) {
                    e.stopPropagation();
                });

                //倒计时
                var messageCountDown = new ac.StartCountDown();
                //手机号输入处理。
                $('body').delegate('.input-mobile', 'input', function() {
                    var num = $(this).val();
                    var old = $(this).data('old');
                    var timer = messageCountDown.timer_sendCheckCode;
                    if (!ac.utils.checkMobile(num)) return;
                    if (num === old) {
                        messageCountDown.node.addClass('disable').html('<span class="count-down">59</span>秒后发送');
                        messageCountDown = new ac.StartCountDown(messageCountDown.node, messageCountDown.callback);
                        messageCountDown.init();
                        return;
                    } else {
                        if (timer) {
                            clearInterval(timer);
                            messageCountDown.callback();
                        }
                    }
                });


                //发送短信验证码
                $('.btn-send').on('click', function() {
                    var mobile = $('.input-mobile');
                    var phone = mobile.val();
                    var that = $(this);

                    if (that.hasClass('disable')) return;

                    if (ac.utils.checkMobile(phone)) {

                        that.addClass('disable').html('<span class="count-down">59</span>秒后发送');

                        messageCountDown.node = that;
                        messageCountDown.callback = function() {
                            that.removeClass('disable').html('发送验证码');
                        };
                        messageCountDown.init();

                        var d = {
                            mobile: phone
                        };
                        $.post('/Register/GetFenzhongMobileVerifyCode', d, function(res) {
                            mobile.data('old', phone);
                            if (res.statu === 200) {
                                //注册成功
                                ac.utils.showError('验证码已发送');
                            } else if (res.statu === 1) {
                                //ac.utils.showDialog('仅限新用户参加哦，不如转给朋友来领吧!');
                                ac.utils.showError('仅限新用户参加哦，不如转给朋友来领吧!');
                            } else {
                                ac.utils.showError('验证码发送失败，请重新尝试');
                            }
                        });
                    } else {
                        ac.utils.showError('手机号错误，请检查');
                    }
                });

                //新用户确认领取
                $('.btn-confirm').on('click', function() {
                    var phone, code, passWrod, that;

                    if($(this).hasClass('disable')) return;                    

                    that = this;
                    phone = $('.input-mobile').val();
                    code = $('.input-message').val();
                    passWrod = $('.input-password').val();

                    if (!ac.utils.checkMobile(phone)) {
                        ac.utils.showError('手机号错误，请检查');
                        return;
                    }
                    if ($.trim(code).length < 4) {
                        ac.utils.showError('验证码错误！');
                        return;
                    }
                    if (passWrod.length < 6) {
                        ac.utils.showError('密码至少设置6位字符');
                        return;
                    }
                    var d = {
                        phone: phone,
                        code: code,
                        passWrod: passWrod
                    };

                    $(this).addClass('disable');
                    $.post('/Register/SubFenzhongRegist', d, function(res) {
                        if (res.success) {
                            ac.utils.showError('注册成功');
                            //location.href = '/activitypage/FenzhongActivity';
                            location.href='/ActivityPage/DMInJune';
                        } else {
                            ac.utils.showError(res.msg);
                            $(that).removeClass('disable');
                        }
                    }).error(function() {
                        ac.utils.showError('网络不稳定，请稍后再试!');
                        $(that).removeClass('disable');
                    });
                });
                ac.fenzhong.globalFn();
            }
        },
        productlist: {
            init: function() {
                $('.btn-buy').on('click', function() {

                    var that = this;

                    $.get('/Login/AjaxCurrentUserInfo', function(res) {
                        if(res.userId){
                            buyEvent();
                        }else{
                            win.location.href = '/register/registfromfenzhong';
                        }                        
                    });

                    function buyEvent() {
                        var catalogStr = $(that).attr('c');

                        var addedToShoppingCart = false;

                        //清空购物车
                        // var cleard = {
                        //     s: 0,
                        //     c:'',
                        //     selected: false
                        // };
                        // $.ajax({
                        //     type: 'post',
                        //     url: '/shoppingcart/ChangeCatalogAllSelected',
                        //     data: cleard,
                        //     async: false,
                        //     success: function(res) {

                        //     }
                        // });

                        //添加到购物车
                        var addCatalogd = {
                            c: catalogStr
                        };
                        $.ajax({
                            type: 'post',
                            url: '/singleproduct/AddToCart',
                            data: addCatalogd,
                            async: false,
                            success: function(res) {
                                if (res.result === 'true') {
                                    addedToShoppingCart = true;
                                }
                            }
                        });

                        //如果成功添加到购物车，跳转到结算页
                        if (addedToShoppingCart) {
                            location.href = ac.notLine() ? '/purchase' : 'http://m.ymatou.com/purchase';
                        }
                    }
                });
                ac.fenzhong.globalFn();
            }
        }
    };
})();
win.ac.router = function(url, obj) {
    var pathname;
    if (!url) return;

    url = url.toLowerCase();
    pathname = window.location.pathname.toLowerCase();

    if (~pathname.indexOf(url) && Object.prototype.toString.call(obj.init) === '[object Function]') obj.init();
};
win.ac.router('/FenzhongActivity', win.ac.fenzhong.productlist);
win.ac.router('/DM', win.ac.fenzhong.register);

//localhost debug
// win.ac.router('/productlist',ac.fenzhong.productlist);
// win.ac.router('/fenzhong',ac.fenzhong.register);


(function() {
    var script = document.createElement('script');
    script.src = 'http://static.gridsumdissector.com/js/Clients/GWD-002431-CB1FD0/gs.js';
    document.querySelector('head').appendChild(script);

    //ac code
    var _parseUrlObject = win.ac.utils.urlQuery();
    var _acval = _parseUrlObject['ac'] || _parseUrlObject['_ac'];
    var isOnline = !~window.location.href.indexOf('.alpha');
    var _acurl = _acval ? 'http://ac' + (isOnline ? '' : '.alpha') + '.ymatou.com/adrecord_' + _acval : '';
    if (_acurl) {
        $.ajax({
            url: _acurl + '?callback=?',
            dataType: 'jsonp'
        });
    }
})();