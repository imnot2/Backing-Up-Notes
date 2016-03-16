/*
 * 注册页
 * created by river
 * created  date by 2014-09-04
 *
 */
define(function(require, exports, module) {
    var layer = require('widget/layerbox')
        //注册第一步发送手机验证码
    $m.node('#SendValidate').bind('click', function() {
        if ($('#SendValidate').hasClass("btn-primary")) {

            var re = /^(1[0-9]{10})$/;
            if (!re.test($m.node('#Phone').val())) {
                layer.alert('请输入正确的手机号码');
                return false;
            }
            var data = {
                mobile: $m.node('#Phone').val()
            };
            $m.post('/Register/GetMobileVerifyCode', data, function(e) {
                if (e.msg != "发送成功！") {
                    layer.alert(e.msg);
                    return false;
                }
                layer.alert(e.msg);
                var self = $('#SendValidate'),
                    phoneCode = $("#phoneCode").val(),
                    curTime = 60;
                if (self.hasClass("btn-primary")) {
                    var countdown = function() {
                        self.removeClass("btn-primary").text(curTime-- + "秒重新发送");
                        if (curTime) {
                            setTimeout(countdown, 1000);
                        } else {
                            self.addClass("btn-primary").text("再次发送");
                        }
                    }
                    countdown();
                }
            });
        }
    });

    $m.node('#SendValidateInRecommend').bind('click', function() {
        if ($('#SendValidateInRecommend').hasClass("start")) {
            var re = /^(1[0-9]{10})$/;
            if (!re.test($m.node('#Phone').val())) {
                layer.alert('请输入正确的手机号码');
                return false;
            }
            var data = {
                mobile: $m.node('#Phone').val()
            };
            $m.post('/Register/GetMobileVerifyCode', data, function(e) {
                if (e.msg != "发送成功！") {
                    layer.alert(e.msg);
                    return false;
                }
                layer.alert(e.msg);
                var self = $('#SendValidateInRecommend'),
                    phoneCode = $("#phoneCode").val(),
                    curTime = 60;
                if (self.hasClass("start")) {
                    var countdown = function() {
                        self.removeClass("start").text(curTime-- + "秒重新发送");
                        if (curTime) {
                            setTimeout(countdown, 1000);
                        } else {
                            self.addClass("start").text("再次发送");
                        }
                    }
                    countdown();
                }
            });
        }
    });

    //注册第一步提交
    $m.node('#Next').bind('click', function() {
        var re = /^(1[0-9]{10})$/;
        var me = $(this);
        if (!re.test($m.node('#Phone').val())) {
            layer.alert('请输入正确的手机号码');
            return false;
        }
        if ($(this).hasClass('disable')) return;
        $(this).addClass('disable');
        var data = {
            mobile: $m.node('#Phone').val(),
            code: $m.node('#Code').val(),
        };
        $m.post('/Register/CheckMobileCode', data, function(e) {
            me.removeClass('disable');
            if (!e.success) {
                layer.alert(e.msg);
                return false;
            } else {
                if ($m.node('#IsRecommend').val() == "1") {
                    location.href = '/register/otherInfobyrecommend?mobile=' + data.mobile + '&code=' + data.code + '&uid=' + $m.node('#RecommenderId').val() + '&channel=' + $m.node('#Channel').val();
                } else {
                    location.href = '/register/otherinfo?mobile=' + data.mobile + '&code=' + data.code + '&back=' + $m.node('#ReturnUrl').val() + '&pla=' + $m.node('#PlantForm').val();
                }
            }
        })
    });

    //注册第二步提交
    $m.node('#Sub').bind('click', function() {
        var self = $(this);
        if (self.hasClass("btn-primary")) {
            $("#subform").submit();
        }
    });

    $m.node('#CheckAgree').bind('click', function() {
        if (!$m.node(this).val()) {
            $m.node('#Sub').removeClass('btn-primary')
        } else {
            $m.node('#Sub').addClass('btn-primary')
        }
    })

    if ($m.node('#ErrorMsg').val() != null && $m.node('#ErrorMsg').val() != '') {
        layer.alert($m.node('#ErrorMsg').val());
    }

    $m.node('#GoToHome').bind('click', function() {
        location.href = "/";
    });
})