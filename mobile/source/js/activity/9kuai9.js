'use strict';
//url查询
function urlQuery(url) {
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
};

(function(){

    var script = document.createElement('script');
    script.src = 'http://static.gridsumdissector.com/js/Clients/GWD-002431-CB1FD0/gs.js';
    document.querySelector('head').appendChild(script);

    
    //ac code
    var _parseUrlObject = urlQuery();
    var _acval = _parseUrlObject['ac'] || _parseUrlObject['_ac'];
    var isOnline = !~window.location.href.indexOf('.alpha');
    var _acurl = _acval ? "http://ac" + (isOnline ? "" : ".alpha") + ".ymatou.com/adrecord_" + _acval : "";
    if (_acurl) {
        $.ajax({
            url: _acurl + "?callback=?",
            dataType: 'jsonp'
        })
    }

})();
    
$(function() {

    //单例
    var singleton = function(fn) {
        var result;
        return function() {
            return result || (result = fn.apply(this, arguments));
        }
    }

    //检查是否为微信浏览器;
    var is_weixin = singleton(function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    });

    //创建遮罩
    var createMask = singleton(function() {
        return $('<div class="mask-box"><div class="mask-inner"></div></div>').appendTo($('body'));
    });

    //检查手机号
    function checkMobile() {
        var regCheckMobile = /^1[3|4|5|8][0-9]\d{4,8}$/;
        var mobileInput = $('input.mobile-input');
        var mobile = mobileInput.val();
        return regCheckMobile.test(mobile);
    }

    //显示错误信息遮罩
    function showFloatBox(text) {
        var clientHeight = document.documentElement.clientHeight; //fix ios4，遮罩不全屏
        text = text || '';
        if (!$.trim(text).length) return;
        $('.floatbox').addClass('show').css('height', clientHeight).find('.msg').text(text);
    }

    

    //倒计时。
    function startCountDown(node, callback) {

        var timer_sendCheckCode = null;

        timer_sendCheckCode = setInterval(function() {
            var countDownNode = node.find('.count-down');
            var curTime = parseInt(countDownNode.text());
            if (curTime === 1) {
                callback && callback();
                clearInterval(timer_sendCheckCode);
            } else {
                countDownNode.text(--curTime);
            }
        }, 1000);
    };
    //请求结束
    // function reqComplete(xmlhttp,callback){
    //     var timeID;
    //     xmlhttp.onreadystatechange = function onchange() {
    //         if (!timeID && xmlhttp.readyState === 4) {
    //             timeID = setTimeout(onchange)
    //             return
    //         }
    //         if (timeID) {
    //             clearTimeout(timeID);
    //             callback && callback();
    //         }                          
    //     };
    // };

    //购买按钮
    var reqIsSend = false;
    $('.buy-btn').on('click', function(e) {
        if (reqIsSend) return;
        var c = $(this).attr('c');
        reqIsSend = true;
        $.post('/singleproduct/AddToShoppingCart', {
            c: c
        }, function(res) {
            window.location.href = '/shoppingcart';
        }).onloadend = function() {
            reqIsSend = false;
        };
    });

    //获取url的query对象。
    var urlObj = urlQuery();

    //是否微信浏览器；
    var isWeixin = is_weixin();

    //发送验证码
    $('.send-btn').on('click', function(e) {
        var that = $(this);
        if (that.hasClass('disable')) return;
        if (!checkMobile()) {
            showFloatBox('请输入正确的手机号');
        } else {
            that.html('<span class="count-down">59</span>秒后重发').addClass('disable');

            $.post('/register/getmobileverifycode', {
                mobile: $('.mobile-input').val()
            }, function(res) {
                showFloatBox(res.msg);
                if(res.msg === '发送成功'){
                    startCountDown(that, function() {
                        that.removeClass('disable');
                        that.text('发送验证码');
                    });
                }                
            })
        }
    });

    //取消遮罩
    $('.floatbox').on('click', function() {
        $(this).removeClass('show').find('.msg').text('');
    });

    //查看更多
    $('.article-more').on('click', function() {
        if ($(this).hasClass('top-arrows')) {
            $(this).removeClass('top-arrows').text('查看更多');
            $('.article-main').addClass('min-height');
        } else {
            $('.article-main').removeClass('min-height');
            $(this).addClass('top-arrows').text('');
        }
    });


    //请求是否已完成
    var reqIsCompleted = true;

    //提交注册
    $('.confirm-btn').on('click', function(e) {
        if (!checkMobile()) {
            showFloatBox('请输入正确的手机号');
            return;
        } else if (!$.trim($('.message-input').val()).length) {
            showFloatBox('验证码不允许为空');
            return;
        } else if ($.trim($('.password-input').val()).length < 6) {
            showFloatBox('密码不允许少于6位！');
            return;
        } else {
            if (!reqIsCompleted) return;
            reqIsCompleted = false;
            $.post('/subregistfromqrcode', {
                phone: $('.mobile-input').val(),
                code: $('.message-input').val(),
                passWrod: $('.password-input').val(),
                name: urlObj['name'],
                p: urlObj['p']
            }, function(res) {
                console.log(res);
                if (res.success === true) {
                    showFloatBox('注册成功！');
                    window.location.href = '/activitypage/nineactivity';
                } else {
                    showFloatBox(res.msg);
                }
            }).onloadend = function() {
                reqIsCompleted = true;
            };
        }
    });

    //test
    var isLogined = $('#isLogined').val();
    var canBuy = $('#canBuy').val();
    var mask;

    if (isLogined === 'true') {
        if (canBuy === 'false') {
            mask = createMask();
            if (isWeixin) {
                mask.find('.mask-inner').addClass('olduser-wechat').html('<span class="guide-arrows"></span>');
            } else {
                mask.find('.mask-inner').addClass('olduser-plain');
            }
        }
    } else if (isLogined === 'false') {
        //isLogined === 'false' 这么写是因为，不是每个页面都有isLogined参数。
        mask = createMask();
        mask.find('.mask-inner').addClass('not-register').html('<a href="/registfromqrcode?name=xinkehaoli&p=wap" class="register-btn"></a>');
    }
    if (isWeixin) {
        $('.share-main').addClass('isWechat')
    }

    //微信配置。
    var wechatConfig = {
        debug: false,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
    };

    //微信分享信息。
    var shareInfo = {
        title: '只要9元，畅选百元洋货！', // 分享标题
        desc: '女神or女汉子？一试便知！百元洋货9元拿', // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: 'http://staticontent.ymatou.com/images/activity/9kuai9/share.jpg', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    };
    var baseUrl = !/alpha|localhost|file:/ig.test(location.href) ? 'm.ymatou.com' : 'mobile.alpha.ymatou.com';
    //获取签名
    function getSignature(callback) {

        window.bigui_jsonpcallback = function(res) {
            res = res || {};
            if (!res.Signature || !res.TimeStamp || !res.NonceStr) return;
            wechatConfig['signature'] = res.Signature;
            wechatConfig['timestamp'] = res.TimeStamp;
            wechatConfig['nonceStr'] = res.NonceStr;
            wechatConfig['appId'] = res.AppId;

            callback && callback(wechatConfig);
        };
        var jsonp = document.createElement('script');
        var reqUrl = window.encodeURIComponent(window.location.href.split(/#/)[0]);
        jsonp.src = 'http://' + baseUrl + '/GetJsSignature.aspx?callback=bigui_jsonpcallback&appId=wxa06ebe9f39751792&u=' + reqUrl;
        document.body.appendChild(jsonp);
    };

    //微信配置
    function setWechatOptions() {
        getSignature(function(conf) {
            wx.config(conf);
        });
    };

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

    //wechat。
    function init() {
        setWechatOptions();
        wx.error(function(res) {
            //重新获取签名,进行配置
            if (res['errMsg'] === 'config:invalid signature') setWechatOptions();
        });

        wx.ready(function() {
            wx.onMenuShareAppMessage(shareInfo);
            wx.onMenuShareTimeline(shareInfo);
            wx.onMenuShareQQ(shareInfo);
        });
    };
    //如果是微信浏览器
    if (isWeixin) {
        if ('ready' in (window.wx || {})) {
            init();
        } else {
            loadScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function() {
                init();
            });
        }
    }
})