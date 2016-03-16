'use strict';
(function() {
    var wxApp = (window.wxApp || (window.wxApp = {}));

    wxApp.utils = {
        //创建遮罩
        creatMask: function() {
            var result;
            return function() {
                return result || (result = $('<div class="floatbox" onclick="wxApp.utils.hideMask(this)"><div class="floatbox-content"></div></div>').appendTo($('body')));
            };
        }(),
        confirmDialog: function(text, callback) {
            var mask, html;
            if (!$.trim(text).length) return;
            mask = this.creatMask()
            html = [
                '<div class="modal-dialog">',
                '    <div class="modal-content">',
                '        <div class="modal-header">',
                '            <p class="modal-title">' + text + '</p>',
                '        </div>',
                '        <div class="modal-footer">',
                '            <button class="btn btn-warning btn-min-100 ok">确定</button>',
                '            <button class="btn btn-white btn-min-100 cancel">取消</button>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('');

            mask.addClass('show').removeAttr('onclick').find('.floatbox-content').html(html);
            mask.find('.btn-min-100').click(function() {
                callback($(this).hasClass('ok'),mask);
            })
        },
        //显示tip。
        showError: function(text) {
            var mask;
            if (!$.trim(text).length) return;
            mask = this.creatMask()
            mask.addClass('show').find('.floatbox-content').html('<div class="msg ui-msg">' + text + '</div>');
        },
        hideMask: function(node) {
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
        }
    };
    //tab效果。
    wxApp.utils.TabSwitch = function(id, o) {

        //if(!this instanceof wxApp.utils.TabSwitch) return new wxApp.utils.TabSwitch.apply(null,[id,o]);
        o.triggers = id + ' ' + o.triggers;
        o.panels = id + ' ' + o.panels;

        this.opt = $.extend({
            activeTriggerCls: 'active',
            triggers: '.triggerItem',
            panels: '.panelItem',
            triggerType: 'click',
            callback: function() {}
        }, o || {});

        var me = this,
            opt = this.opt;

        me.requestIsComplete = true;
        $(opt.triggers).on(opt.triggerType, function(e) {
            var index = $(this).index();
            $(this).addClass(opt.activeTriggerCls).siblings().removeClass(opt.activeTriggerCls);
            $(opt.panels).eq(index).show().siblings().hide();
            opt.callback(this, me);
        });
        return this;
    };
    //滚动加载类
    wxApp.utils.ScrollLoad = function(opt) {
        var o = $.extend({
            selector: '', //jq选择器，
            url: '', //用户请求资源的url
            type: 'get', //请求类型。
            increment: '', //options需要递增的属性
            offset: 400,
            options: {}, //请求需要的参数，如果当中有需要递增的页标属性，递增的参数increment里应把此属性名加上。
            timeout: 1,
            isCol: false //是否为多列瀑布流布局，以便调整正在加载的菊花显示位置。
        }, opt || {});

        o.isCompleted = true;
        o.needBind = true;
        o.notData = false;

        this.opt = o;

        if ($(this.opt.selector).size() === 0) {
            return;
        }
        //默认加载
        this.reqSrc();
    };
    wxApp.utils.ScrollLoad.prototype = {
        reqSrc: function() {

            var _this = this;

            this.abrogate();

            var opt = this.opt,
                url = /\?$/.test(opt.url) ? opt.url : opt.url + '?';

            url += $.param(opt.options);
            if (opt.dataType == 'jsonp') url += '&callback=?';

            //如果此接口所有数据已经加载完毕
            if (opt.notData[url]) return;


            var $fisrt = $(opt.selector).eq(0);
            if (opt.isCol) {
                $fisrt = $(opt.selector).parent();
            }
            if (!$fisrt.find('.__isloading__')[0]) {
                $fisrt.append('<div class="__isloading__"></div>');
            }

            //请求结束后再请求
            if (opt.isCompleted) {

                opt.isCompleted = false;

                $.getJSON(url, function(res) {
                    if (res.Result && res.Result.length === 0 || res.length === 0) {
                        opt.notData[url] = true;
                        opt.needBind = false;
                        return;
                    }
                    var pIndex;
                    opt.options[opt.increment] ++;

                    //把页标通过回调暴露出去，并通过回调获取新的页标，这样用户可以在发送请求时自定义页标了
                    if (opt.callback) {
                        pIndex = opt.callback(res, opt.options[opt.increment]);
                        if (pIndex) opt.options[opt.increment] = pIndex;
                    }
                }).complete(function() {
                    opt.isCompleted = true;
                    $('.__isloading__').remove();
                    opt.needBind && _this.bindScroll(_this);
                }).error(function() {
                    opt.needBind = true;
                });
            }
        },


        scroll: function() {
            var _this = this;
            //节流
            if (_this.timer) clearTimeout(_this.timer);
            _this.timer = setTimeout(function() {
                var scrollTop = $(window).scrollTop(),
                    clientHeight = $(window).height(),
                    nodeHeight, i, opt = _this.opt,
                    nodes = $(opt.selector) || [];

                for (i = 0; i < nodes.length; i++) {
                    nodeHeight = parseInt($(nodes[i]).css('height'));
                    if (nodeHeight + $(nodes[i]).offset().top <= scrollTop + clientHeight + opt.offset) {
                        //需要加载                    
                        _this.reqSrc();
                        return;
                    } else {
                        continue;
                    }
                }
            }, _this.opt.timeout);
        },
        abrogate: function() {
            $(window).off('scroll');
        },
        bindScroll: function() {
            $(window).on('scroll', wxApp.utils.fn(this.scroll, this));
        }
    };
    //登录页
    wxApp.loginPage = {
        init: function() {
            var bindYmtBtn = $('.old-user .btn-login, .btn-bind');
            var loginObj = {
                //用户名
                name: {
                    node: $('.operate-username'),
                    input: '.user-input',
                    emptyClass: '.empty-btn'
                },
                //密码
                password: {
                    node: $('.operate-password'),
                    input: '.password-input',
                    emptyClass: '.empty-btn'
                }
            };

            for (var i in loginObj) {
                var o = loginObj[i];
                o.inputNode = o.node.find(o.input);
                o.val = '';
                o.valLength = 0;
                o.hasContent = false;
                o.emptyBtn = o.node.find(o.emptyClass);
            }

            function inputEvent(o) {
                o.val = o.inputNode.val();
                o.valLength = o.val.length;
                o.hasContent = o.valLength ? true : false;
                if (o.hasContent) {
                    o.emptyBtn.show();
                } else {
                    o.emptyBtn.hide();
                }
                if (loginObj.name.hasContent && loginObj.password.hasContent) {
                    bindYmtBtn.removeClass('disable');
                } else {
                    bindYmtBtn.addClass('disable');
                }
            }

            loginObj.name.inputNode.on('input', function() {
                inputEvent(loginObj.name);
            });
            loginObj.password.inputNode.on('input', function() {
                inputEvent(loginObj.password);
            });

            var loginRequestIsComplete = true;
            //提交绑定
            $('.btns-box .btn').on('click', function(e) {
                if (!loginRequestIsComplete) return;
                loginRequestIsComplete = false;
                var isWechatLogin = $(this).attr('wechatlogin') === 'true';
                $.getJSON('http://wx.alpha.ymatou.com/wechatymtlogin?loginName=' + loginObj.name.val + '&passWord=' + loginObj.password.val + '&isWeiXinLogin=' + isWechatLogin + '&callback=?', function(res) {
                    //document.title += res.message;                    
                    if (!res.success) {
                        wxApp.utils.showError(res.message || '登录失败！');
                    } else {
                        var ret = res.retrunurl || 'http://m.ymatou.com';
                        window.location.href = ret;
                    }
                }).complete(function() {
                    loginRequestIsComplete = true;
                });
            });

            //清空输入
            $('.empty-btn').on('click', function(e) {
                var inputNode = $(this).siblings('.user-input, .password-input');
                inputNode.prop('value', '');
                inputNode.trigger('input');
                $(this).hide();
            });
            $('.toggle-trigger').on('click', function(e) {
                var parent = $(this).parent(),
                    isdown = parent.hasClass('direction-down');
                if (isdown) {
                    parent.removeClass('direction-down');
                    $(this).children('.title').text('洋码头账号登录');
                    $(this).children('.icon-font').css('transform', 'rotate(180deg)');
                } else {
                    parent.addClass('direction-down');
                    $(this).children('.title').text('绑定洋码头账号并登录');
                    $(this).children('.icon-font').css('transform', 'rotate(0deg)');
                }
            });
        }
    };
    //订单列表页
    wxApp.orderlistPage = {
        init: function() {
            var _this = this;
            new wxApp.utils.TabSwitch('#orderlistTabs', {
                triggers: '.userOrderNav li',
                panels: '.orderWrap .orderitem',
                callback: function(node, me) {
                    var wrap, tradingStatus;

                    wrap = $(me.opt.panels).eq($(node).index());
                    wrap.attr('id', 'orderlist' + $(node).index());
                    if (wrap.children().length > 1) return;
                    tradingStatus = $(node).attr('tradingStatusText');

                    if (!wrap.isScrollLoad) {
                        wrap.isScrollLoad = new wxApp.utils.ScrollLoad({
                            selector: '#' + wrap.attr('id'), //jq选择器，
                            url: 'http://172.16.2.131:85/order/BuyerOrder', //用户请求资源的url
                            options: {
                                tradingStatusText: tradingStatus
                            },
                            offset: 400,
                            dataType: 'jsonp',
                            callback: function(res) {
                                wrap.append(_this.parseHtml(res));
                            }
                        });
                    }
                }
            });
            $('#orderlistTabs .userOrderNav li').eq(0).trigger('click');
        },
        tpl: {
            orderlist: function() {
                return [
                    '<div class="p_mod orders_list">',
                    '    <div class="pm-t">',
                    '        <div class="pull-left">',
                    '            <em class="order-origin {{platform}}"></em>',
                    '            <span class="pm-name spb-name">{{sellerName}}</span>',
                    '        </div>',
                    '        <div class="pull-right orders_number_type">',
                    '            <p>{{OrderId}}</p> <strong>{{orderStatusText}}</strong>',
                    '        </div>',
                    '    </div>',
                    '    <div class="pm-m">',
                    '        <ol class="ol_list">',
                    '           {{ui-productList}}',
                    '        </ol>',
                    '    </div>',
                    '    <div class="pm-bottom order-pm-bottom">',
                    '        <div class="order-line">',
                    '            <p>',
                    '                <span class="type">',
                    '                共计{{Count}}件商品',
                    '                </span>',
                    '                <span class="type">',
                    '                含运费: &yen;{{freightPrice}}',
                    '                </span>',
                    '                <span class="type">',
                    '                实付:',
                    '                <strong>&yen;{{paidPrice}}</strong>',
                    '                </span>',
                    '            </p>',
                    '        </div>',
                    '        {{ui-hbOrderTips}}',
                    '        {{ui-payBtns}}',
                    '        {{ui-paidOrderTips}}',
                    '    </div>',
                    '</div>'
                ].join('');
            },
            productlist: function() {
                return [
                    '            <li>',
                    '                <span class="pic"><img src="{{productImg}}"></span>',
                    '                <h3> <strong class="ng-binding">{{productName}}</strong>',
                    '                <span class="price">',
                    '                    &yen;{{productPrice}}',
                    '                </span>',
                    '                <span class="number">',
                    '                    x{{boughtCount}}',
                    '                </span>',
                    '                </h3>',
                    '                {{ui-catalogs}}',
                    '                <p class="freight_method"> <i class="icon {{productTypeIcon}}"></i> {{logisticsTypeText}}',
                    '                </p>',
                    '            </li>'
                ].join('');
            },
            catalogs: function() {
                return '<p>{{Property}}：{{Attribute}}</p>';
            },
            payBtn: function(orderModule) {
                var html = [],
                    code = orderModule.orderStatusCode;
                if (code == 1 || code == 3 || code == 4) {
                    html.push('<div class="order-btns-groud order-line">');
                    if (code == 3 || code == 4) {
                        html.push('<a class="btn btn-white" orderid="' + orderModule.OrderId + '" onclick="wxApp.orderlistPage.lookLogistics(this)">查看物流</a>');
                    }
                    if (code == 3 && !orderModule.IsNeedUploadIdCard) {
                        html.push('<a class="btn btn-warning-boder" orderid="' + orderModule.OrderId + '" onclick="wxApp.orderlistPage.confirmRecev(this)">确认收货</a>');
                    }
                    if (code == 1) {
                        //待付款
                        html.push('<a class="btn btn-warning-boder" orderid="' + orderModule.OrderId + '" hb="' + orderModule.isHBorder + '" onclick="wxApp.orderlistPage.topay(this)">付款</a>');
                    }
                    html.push('</div>');
                }
                return html.join('');
            },
            hbOrderTips: function(orderModule) {
                return ''; //wap端暂不处理杭保订单。
                //return orderModule.logisticsTypeCode === 3 ? '<p class="warn-msg">杭州保税区订单不支持合并付款，且仅限盛付通支付</p>' : '';
            },
            paidOrderTips: function(orderModule) {
                return ''; //wap端暂时不提示延长收货
                //return orderModule.orderStatusCode === 3 ? '<p class="delay-delivery-msg order-line">系统将于' + orderModule.autoReceiveTime + '自动确认收货，如未收到商品，请及时<strong>延长收货时间</strong></p>' : '';
            }
        },
        perfectionModule: function(module) {
            var orderlist = module.data || [],
                i, n, productlistModule, orderItemModule, productModule;
            for (i = 0; i < orderlist.length; i++) {
                orderItemModule = orderlist[i];
                switch (parseInt(orderItemModule['platform'])) {
                    case 0:
                    case 1:
                        orderItemModule['platform'] = 'order-from-official';
                        break;
                    case 2:
                    case 3:
                        orderItemModule['platform'] = 'order-from-app';
                        break;
                    case 4:
                    case 5:
                        orderItemModule['platform'] = 'order-from-artifact';
                        break;
                }
                productlistModule = orderItemModule['Products'];
                for (n = 0; n < productlistModule.length; n++) {
                    productModule = productlistModule[n];
                    switch (productModule['logisticsTypeText']) {
                        case '海外直邮':
                            productModule['productTypeIcon'] = 'icon-infotransport';
                            break;
                        case '护航直邮':
                            productModule['productTypeIcon'] = 'icon-servicefly01';
                            break;
                        case '保税发货':
                            productModule['productTypeIcon'] = 'icon-baoshuifahuo';
                            break;
                    }
                }
            }
            console.log(module);
            return module;
        },
        parseHtml: function(module) {

            var orderlist, orderlistTpl, orderItemModule, productlistTpl, i, n, productlistArrModule, productModule, catalogsTpl;

            module = this.perfectionModule(module);

            orderlist = module.data || [];
            orderlistTpl = this.tpl.orderlist();
            productlistTpl = this.tpl.productlist();
            catalogsTpl = this.tpl.catalogs();

            for (i = 0; i < orderlist.length; i++) {

                orderItemModule = orderlist[i];

                orderItemModule['ui-hbOrderTips'] = this.tpl.hbOrderTips(orderItemModule);
                orderItemModule['ui-payBtns'] = this.tpl.payBtn(orderItemModule);
                orderItemModule['ui-paidOrderTips'] = this.tpl.paidOrderTips(orderItemModule);

                productlistArrModule = orderItemModule.Products || [];

                for (n = 0; n < productlistArrModule.length; n++) {
                    productModule = productlistArrModule[n];
                    productModule['ui-catalogs'] = this.loopParse(catalogsTpl, productModule.CatalogPropertyList);
                }

                orderItemModule['ui-productList'] = this.loopParse(productlistTpl, productlistArrModule);
            }

            return this.loopParse(orderlistTpl, orderlist);
        },
        loopParse: function(tpl, arrModule) {
            tpl = tpl || '';
            arrModule = arrModule || [];
            var i, html = [];

            for (i = 0; i < arrModule.length; i++) {
                html.push(this.parseTpl(tpl, arrModule[i]));
            }

            return html.join('');
        },
        parseTpl: function(tpl, objModule) {
            tpl = tpl || '';
            objModule = objModule || {};
            return tpl.replace(/\{\{[^\}]+\}\}/g, function(match, index, src) {
                //console.log(match);
                var val = objModule[match.replace(/\{|\}/g, '')];
                return val === undefined ? match : val;
            });
        },
        lookLogistics: function(node) {
            window.location.href = '/order/logisticinfo?orderId=' + $(node).attr('orderid');
        },
        confirmRecev: function(node) {
            wxApp.utils.confirmDialog('您是否确认已收到该商品', function(b,mask) {
                if(b){
                    window.location.href = '/order/confirmorder?orderId=' + $(node).attr('orderid');
                }else{
                    wxApp.utils.hideMask(mask);
                } 
            })
        },
        topay: function(node) {
            var canPay = $(node).attr('hb') === 'true';
            if (!canPay) {
                wxApp.utils.showError('杭州保税区商品订单暂不支持WAP端支付，请至PC端支付。');
            } else {
                $.get('/PreparePay?oid=' + $(node).attr('orderid'), function(res) {
                    if (res.canPay) {
                        window.location.href = '/checkout?tid=' + res.tradingId;
                    } else {
                        wxApp.utils.showError(res.canNotSellProductName + '不能购买');
                    }
                });
            }
        }
    };
    $(function() {
        wxApp.loginPage.init();
        wxApp.orderlistPage.init();
    });
})();