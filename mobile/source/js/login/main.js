define(function (require, exports, module) {
    var redirIndex = /ret=(.+)/i.exec(location.href), redir = redirIndex ? redirIndex[1] : !1;
    var layer = require('widget/layerbox')
    
    var subValidate = false;


    $('#ValidatePic').click(function(){
    $.get('/login/GetNewValidate',function(e){
            $("#ValidatePic").attr("src", e.ValidateCodeUrl);
            $("#ValidateSign").val(e.Sign);
        })
    })

    $('.icon-refresh').click(function(){
    $.get('/login/GetNewValidate',function(e){
            $("#ValidatePic").attr("src", e.ValidateCodeUrl);
            $("#ValidateSign").val(e.Sign);
        })
    })

    //login
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
            passWord: password,
            isRemember:!0
        };
        
        if (subValidate) {
            data = {
                loginName: name,
                passWord: password,
                isRemember: !0,
                sign: $m.node("#ValidateSign").val(),
                vc: $("#validateCode").val()
            }
        }

        $m.post('/login/AjaxLoginResult', data, function (e) {
            if (e.success) {
                if (e.success == 2) {
                    layer.alert('手机版网站的卖家功能正在建造中，<a class="co-white" href="http://www.ymatou.com/login">在此期间请您访问电脑版网站</a>');
                    $("#ValidateCode").hide();
                    subValidate = false;
                } else {
                    location.reload();
                }
            } else {
                layer.alert(e.message);
                if (e.showValidate) {
                    $("#ValidateCodeDiv").show();
                    subValidate = true;
                    $("#ValidatePic").attr("src", e.validateCodeUrl);
                    $m.node("#ValidateSign").val(e.validateSign);
                }
                else {
                    $("#ValidateCodeDiv").hide();
                    subValidate = false;
                }
            }
        });
        return !1
    })

    //success
    function redirect() {
        if (!redir || /login/ig.test(redir))
            location.href = "/";
        else
            location.href = decodeURIComponent(redir);
    }

    var time = 5;
    var timehandle = $m.node('#quitSecond')[0], countPause;

    $m.node('#loginBottom').bind('click', function () {
        return false;
    })
    $m.event.bind($m.node('#toRedirect')[0], 'click', function () {
        location.href = decodeURIComponent(redir);
        return !1
    });
    if (timehandle) {
        var interval = $m.later(function () {
            --time;
            if (time >= 0) {
                timehandle.innerHTML = time;
            }
            if (time == 0) {
                redirect()
            }
        }, 1000, !0); 
    }

    $("#LoginContinue").click(function() {
        location.href = $m(this).attr('data');
        return !1;
    });

});