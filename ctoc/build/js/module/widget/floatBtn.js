var online = new Array();
Ymt.add(function (require, exports, module) {
    //默认选项
    var defOptions = {
        //selector:"",
        container: '',
        size: [64, 175],
        isShow: true, //显示条件是否为true
        bottom: 60,
        minHeightShowBackTop: 400,
        mainWidth: 1200, //页面主体宽度
        defaultHideBackTop: !0,
        zIndex: 1000,
        struc: '<div style="display:none" id="_____FloatButtons_____" class="float-buttons"><span class="png backtotop"></span><span class="png qa"></span><span class="png redbag"></span></div>',
        backToTopCls: ".backtotop",
        buttons: [{
            btnCls: '.backtotop',
            handle: null,
            isShow: null
        }, {
            btnCls: '.qa',
            handle: null,
            isShow: null
        }, {
            btnCls: '.redbag',
            handle: null,
            isShow: null
        }, {
            btnCls: '.QQline',
            handle: null,
            isShow: null
        }],
        onLineQQSeller: "800076056", //卖家QQ在线
        sellerQQScriptUrl: "http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDA3NjA1Nl8yMDU2ODFfODAwMDc2MDU2Xw",
        onLineQQBuyer: "800005150", //买家QQ在线
        buyerQQScriptUrl: "http://wpa.b.qq.com/cgi/wpa.php?key=XzgwMDAwNTE1MF8yMzAzMjdfODAwMDA1MTUwXw",
        initFn: function () {}
    }

    var Widget = function (options) {
        this.config = defOptions;
        //处理最后一个参数 如果是options，则和默认参数合并
        if (typeof arguments[0] != "string") {
            this.config = $m.merge(defOptions, options)
        }

        this.init(options && options.container);
    }
    Widget.VERSION = "1.1.5";

    Widget.prototype = {
        init: function (container) {
            //如果传入选择器 则只启动浮窗
            if (container) {
                this.container = $(container);
            } else {
                $(document.body).append(this.config.struc);
                this.container = $('#_____FloatButtons_____');
            }
            if (!this.config.isShow) {
                return;
            }

            //自定义

            this.config.initFn && this.config.initFn(this.container);

            if (this.config.defaultHideBackTop) {
                this.container.find(this.config.backToTopCls).hide();
            }

            this.rePosition();

            this.container.show();

            this.qqLine();

            this._parseButtonAction();

            this.bind();

        },
        rePosition: function () {
            this.isSetStyle = false;
            this.position();
        },
        position: function () {
            if (!this.isSetStyle) {
                var isIe6 = !-[1, ] && !window.XMLHttpRequest,
                    config = this.config,
                    body = document.documentElement || document.body,
                    scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                    width = config.size[0] || this.container.width(),
                    height = config.size[1] || this.container.height();

                var left = (Math.max(body.clientWidth, config.mainWidth) - ((body.clientWidth - config.mainWidth) / 2) + 20);

                this.container.css({
                    width: width + 'px',
                    height: height + 'px',
                    left: (Math.max(body.clientWidth, config.mainWidth) - ((body.clientWidth - config.mainWidth) / 2) + 20) + 'px',
                    zIndex: config.zIndex
                });

                if (isIe6) {
                    this.container.css({
                        position: 'absolute',
                        top: (body.clientHeight - height + $(document).scrollTop() - config.bottom) + 'px'
                    })
                } else {
                    this.isSetStyle = true;
                    this.container.css({
                        position: 'fixed',
                        bottom: config.bottom
                    });
                }
            }

        },
        _parseButtonAction: function () {
            var config = this.config,
                btn, that = this;
            for (var i = 0, length = config.buttons.length; i < length; i++) {
                btn = config.buttons[i];
                if (btn.isShow === false || typeof btn.isShow == 'function' && btn.isShow() === false) {
                    this.container.remove(btn.btnCls);
                    break;
                }
                switch (btn.btnCls) {
                case '.backtotop':
                    btn.isShow = btn.isShow === null && ShowBackTop;
                    btn.handle = btn.handle === null && function () {
                        window.scrollTo(0, 0);
                    };
                    break;
                case '.qa':
                    btn.handle = btn.handle === null && Qa;
                    break;
                case '.redbag':
                    btn.handle = btn.handle === null && RedBag;
                    break;
                case '.QQline':
                    btn.handle = btn.handle === null && QQline;
                    break;
                }
            }

            function ShowBackTop() {
                that.position();
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                return scrollTop > that.config.minHeightShowBackTop;
            }

            function Qa() {
                window.open("/qa/qa");
            }

            function RedBag(e) {
                var body = '<div class="pop_mod" style="height:' + document.documentElement.offsetHeight + 'px"><div class="hongbao_share"><a class="weibo_s"></a><a class="weichat_s"><span class="wchat_pic"></span></a></div><div class="pop_layout" style="height: ' + $(document).height() + 'px"></div></div>';
                var retUrl = ($m.isOnline ? "http://www.ymatou.com/login?ret=" : "http://www.alpha.ymatou.com/login?ret=") + window.location.href;
                $('body').append(body);

                if ($('#hidUserId').size() > 0) {
                    $('.pop_mod .weibo_s').attr({
                        'href': 'http://service.weibo.com/share/share.php?title=' + encodeURIComponent('全球购物季来袭，红包送不停！国际大牌低价秒杀。拆开好友为你准备的红包，即刻优惠价购买应季热品！') + '&url=' + encodeURIComponent('http://www.ymatou.com/Register/RegisterByRecommend?uid=' + $('#hidUserId').val() + '&channel=4') + '&desc=' + encodeURIComponent('') + '&summary=' + encodeURIComponent(''),
                        'target': '_blank'
                    });
                    $('.pop_mod .weichat_s').live('click', function () {
                        $('.pop_layout').trigger('click');

                        var _url = $m.isOnline ? 'http://c.ymatou.com/order/ordershow/qrcodetourl?url=' : 'http://c.alpha.ymatou.com/order/ordershow/qrcodetourl?url='
                        _url += encodeURIComponent($m.isOnline ? 'http://m.ymatou.com' : 'http://mobile.alpha.ymatou.com');
                        _url += encodeURIComponent('/Register/RegisterByRecommend?uid=' + $('#hidUserId').val() + '&channel=4');
                        var shareNodeHtml = '<div id="mask" style="display:block"><div class="mask-warp"><div class="mw-bd"><h3>打开微信”扫一扫“,然后点击手机屏幕右上角分享按钮</h3><p id="shareimg"><img src="' + _url + '"/></p></div></div></div>';
                        $mask = $("#mask");
                        if (!$mask[0]) {
                            ($mask = $(shareNodeHtml)).appendTo('body');
                        }
                        var $window = $(window);
                        $mask.one("click", function () {
                            $(this).hide();
                        }).find(".mask-warp").css({
                            height: document.documentElement.offsetHeight
                        }).find(".mw-bd")
                            .css({
                                top: "200px"
                            });
                    });
                } else {
                    $('.pop_mod .weibo_s,.pop_mod .weichat_s').attr({
                        'href': retUrl,
                        'target': '_blank'
                    });
                }
            }

            function QQline() {
                $($("#qq-link iframe")[0].contentWindow.document).find("#launchBtn").click();
            }
        },
        bind: function () {
            var that = this;
            this.container.live('click', function (event) {
                var $container = $(event.target),
                    config = that.config,
                    btn;

                for (var i = 0, length = config.buttons.length; i < length; i++) {
                    btn = config.buttons[i];
                    if ($container.hasClass(btn.btnCls.slice(1))) {
                        if (typeof btn.handle === 'function') {
                            btn.handle.call($container, that)
                        }
                    }
                }
                return !1;
            });

            function changeElement() {
                var config = that.config,
                    btn;

                for (var i = 0, length = config.buttons.length; i < length; i++) {
                    btn = config.buttons[i];
                    if (typeof btn.isShow === 'function') {
                        if (btn.isShow()) {
                            that.container.find(btn.btnCls).fadeIn();
                        } else {
                            that.container.find(btn.btnCls).fadeOut();
                        }
                    }
                }
            }
            $(window).scroll(function () {

                var scrollTop = $(this).scrollTop();

                if ($('.fix_tab').length > 0) {

                    if (scrollTop > 450) {
                        $('.fix_tab').css({
                            position: "fixed",
                            top: "0"
                        })
                    } else {
                        $('.fix_tab').css({
                            position: "relative",
                            top: "0"
                        })
                    }

                    //$('.fix_tab').css()
                }

                changeElement();
                return !1
            });
            var resizeTimer = null;
            $(window).resize(function () {
                if (resizeTimer) {
                    return;
                }
                resizeTimer = setTimeout(function () {
                    that.rePosition();
                    clearTimeout(resizeTimer);
                    resizeTimer = null;
                }, 500);
            });
        },
        qqLine: function () {
            var _this = this;
            _this.judgeUser(function (data) {
                var isSeller = data.iType > 0,
                    opts = _this.config,
                    qq, scriptUrl, qqNode;

                _this.container.children(':first').after('<span class="png QQline"></span>');
                qqNode = _this.container.find('.QQline');

                if (isSeller) {
                    qq = opts.onLineQQSeller;
                    scriptUrl = opts.sellerQQScriptUrl;
                } else {
                    qq = opts.onLineQQBuyer;
                    scriptUrl = opts.buyerQQScriptUrl;
                }

                $.getScript('http://webpresence.qq.com/getonline?type=1&' + qq + ":", function () {
                    if (online[0] == 1) {
                        qqNode.addClass('QQonLine');
                    } else {
                        qqNode.addClass('QQoffLine');
                    }
                });

                if (!$("#qq-link")[0]) {
                    $("<div id='qq-link' style='display:none;'></div>").appendTo('body');
                    //$("#qq-link").append("<script src='"+scriptUrl+"' charset='utf-8' type='text/javascript' async='true' defer='true'>");
                    var scriptBlock = document.createElement("script");
                    scriptBlock.src = scriptUrl;
                    scriptBlock.async = true;
                    scriptBlock.defer = true;
                    scriptBlock.charset = "utf-8";
                    scriptBlock.type = "text/javascript";
                    document.getElementById("qq-link").appendChild(scriptBlock);
                }
            });
        },
        judgeUser: function (callback) {
            var _instanceUrl = !$m.isOnline ? "http://top.alpha.ymatou.com" : "http://top.ymatou.com";
            $.ajax({
                url: _instanceUrl + "/shared/GetUserIdAndType",
                dataType: "jsonp",
                success: function (data) {
                    try {
                        if (data && data.iUserId > 0) {
                            callback(data)
                        }
                    } catch (e) {}
                }
            });
        }
    }

    return function (container, config) {
        new Widget(container, config)
    }
});