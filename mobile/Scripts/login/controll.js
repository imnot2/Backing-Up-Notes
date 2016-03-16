define(function (require, exports, module) {
    
    var layer = require('widget/layerbox')

    exports.index = function (html) {
        $m.mobile.insertContent(html);

        $m.event.bind($m.node('#tologin')[0], 'click', function () {
            var name = $m.node.attr($m.node('#userName')[0], 'value');
            var password = $m.node.attr($m.node('#userPassword')[0], 'value');

            if (!name) {
                layer.alert('请输入用户名');
                return;
            }
            if (!password) {
                layer.alert('请输入密码');
                return;
            }

            var data = {
                loginName: name,
                passWord: password
            };
            $m.post('/login/AjaxLoginResult', data, function (e) {
                if (e.success) {
                    $m.mobile.route('success/loginId=' + e.loginId);
                } else {
                    layer.alert(e.message);
                }
            });
            return !1
        })
    };
    exports.success = function (param, html) {
        $m.mobile.insertContent(html);
        $m.node('#loginIdName')[0].innerHTML = param.loginId;
        //登录成功之后修改状态
        $m.mobile.loginHandle(!0)
        
        function redirect(){
            if (!redir || /login/ig.test(redir))
                location.href = "/";
            else
                location.href = decodeURIComponent(redir);
        }

        var time = 5;
        var timehandle = $m.node('#quitSecond')[0], countPause;

        $m.node('#loginBottom').bind('click', function () {
            interval.cancel();
            $m.mobile.toURL('index');
            return !1
        })
        $m.event.bind($m.node('#toRedirect')[0], 'click', function () {
            location.href = decodeURIComponent(redir);
            return !1
        });
        
        var interval = $m.later(function () {
            --time;
            if (time >= 0) {
                timehandle.innerHTML = time;
            }
            if (time == 0) { 
                redirect()
            }
        }, 1000, !0);
    };
    exports.logout = function (data) {
        if (data.success) {
            $m.mobile.toURL('index');
        }
    };
})