'use strict';


    var wxApp = (window.wxApp || (window.wxApp = {}));

    wxApp.utils = {
        //创建遮罩
        creatMask: function () {
            var result;
            return function () {
                return result || (result = $('<div class="floatbox" onclick="wxApp.utils.hideMask(this)"><div class="floatbox-content"></div></div>').appendTo($('body')));
            };
        }(),
        confirmDialog: function (text, callback) {
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
            mask.find('.btn-min-100').click(function () {
                callback($(this).hasClass('ok'), mask);
            })
        },
        //显示tip。
        showError: function (text) {
            var mask;
            if (!$.trim(text).length) return;
            mask = this.creatMask()
            mask.addClass('show').find('.floatbox-content').html('<div class="msg ui-msg">' + text + '</div>');
        },
        hideMask: function (node) {
            $(node).removeClass('show');
        },
        fn: function (func, scope) {
            if (Object.prototype.toString.call(func) === '[object String]') {
                func = scope[func];
            }
            if (Object.prototype.toString.call(func) !== '[object Function]') {
                throw 'Error "hui.util.fn()": "func" is null';
            }
            var xargs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
            return function () {
                var fn = '[object String]' == Object.prototype.toString.call(func) ? scope[func] : func,
                    args = (xargs) ? xargs.concat([].slice.call(arguments, 0)) : arguments;
                return fn.apply(scope || fn, args);
            };
        }
    };

    //登录页
    wxApp.loginPage = {
        init: function () {
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
                }
                else {
                    o.emptyBtn.hide();
                }
                if (loginObj.name.hasContent && loginObj.password.hasContent) {
                    bindYmtBtn.removeClass('disable');
                }
                else {
                    bindYmtBtn.addClass('disable');
                }
            }

            loginObj.name.inputNode.on('input', function () {
                inputEvent(loginObj.name);
            });
            loginObj.password.inputNode.on('input', function () {
                inputEvent(loginObj.password);
            });

            wxApp.loginRequestIsComplete = true;
            //提交绑定
            
            wxApp.onUseWechatLogin = function (elem, type){


                if (!wxApp.loginRequestIsComplete || $(elem).hasClass('disable')) return;
                wxApp.loginRequestIsComplete = false;
                var isWechatLogin = $(elem).hasClass('btn-wechatlogin');
                var wxAccessToken = window.WechatToken;
                var returnUrl = window.ReturnUrl;
                var loginName = $('.user-input').get(0).value;
                var passWord = $('.password-input').get(0).value;
				var randcode =  '' // + '&randcode=' + (new Date()).getTime();
                // alert((new Date()).getTime());
                $.get('http://wx.alpha.ymatou.com/LoginResult?loginName=' + loginName + '&passWord=' + passWord + '&isWeiXinLogin=' + 
                    isWechatLogin + '&parms=' + wxAccessToken + randcode, function (res) {
                    if (!res.success) {
                        wxApp.utils.showError(res.message || '登录失败！');
                    }
                    else {
                        var url = returnUrl ? returnUrl : 'http://m.ymatou.com',
                            token = res.token,
                            urlTemp = url.split('#'),
                            url = urlTemp[0],
                            hash = urlTemp.length > 1 ? urlTemp[1] : '';

                        if (!~url.indexOf('?')) url += '?';

                        window.location.href = (/\?$/g.test(url) ? url : url + '&') + 'AccessToken=' + token + hash;
                    }
                }).complete(function () {
                    wxApp.loginRequestIsComplete = true;
                }).error(function (e) {
                    alert('请求错误');
                });
            };

            //清空输入
            $('.empty-btn').on('click', function (e) {
                var inputNode = $(this).siblings('.user-input, .password-input');
                inputNode.prop('value', '');
                inputNode.trigger('input');
                $(this).hide();
            });
            $('.toggle-trigger').on('click', function (e) {
                var parent = $(this).parent(),
                    isdown = parent.hasClass('direction-down');
                if (isdown) {
                    parent.removeClass('direction-down');
                    $(this).children('.title').text('洋码头账号登录');
                    $(this).children('.icon-font').css('transform', 'rotate(180deg)');
                }
                else {
                    parent.addClass('direction-down');
                    $(this).children('.title').text('绑定洋码头账号并登录');
                    $(this).children('.icon-font').css('transform', 'rotate(0deg)');
                }
            });
        }
    };

    $(function () {
        wxApp.loginPage.init();
    });
