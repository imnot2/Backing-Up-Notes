Ymt.add(function (require, exports, module) {
    //

    var Validate = require("ui/form/Validate");

    var msgCode = Validate('#msgCode', {
        TipMsg: "确认验证码",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#msgCode~.verifi",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "验证码不允许为空" }
        ]
    });
    var Val_password = Ymt.ui.form.Validate('#loginPassword', {
        TipMsg: "请输入密码",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#loginPassword~.verifi",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "密码不允许为空" }
        ]
    });

    var NeedPassword = $('#NeedPassword').val();

    $('#ValidatePhone').click(function () {
        if ($('#mobile').val() == '') {
            return false;
        }
        var password = true;
        if (NeedPassword == "true") {
            password = Val_password.validate();
        }
        password && msgCode.validate() && $('#bindForm').submit();
    })


    //点击获取短信
    function countdown(obj) {
        var i = 59;
        var time = setInterval(function () {
            if (i > 0) {
                obj.text(i + "秒后重新发送")
                i--
            } else {
                obj.removeClass('getCodeStop');
                obj.text("获取验证码")
                clearInterval(time)
            }
        }, 1000)
    }


    //获取手机短信，并不判断手机是否存在
    function sendMsg(mobile) {
        $.get('/UserProfile/GetMobileVerifyCode?mobile=' + mobile + '', function (result) {
            $('.msgContent').text(result).css('display', 'inline-block')
        })
    }

    $('.getCode').click(function () {
        if ($('#mobile').val().length == 11) {
            var outTime = $(this).text()
            if (outTime === '获取验证码') {
                $(this).text("60秒后重新发送")
                $(this).closest("div").find(".verifi").hide();
                $('.getCode').addClass('getCodeStop');
                sendMsg($('#mobile').val())
                countdown($(this));
            }
        } else {
            $(this).closest("div").find(".verifi").text("需填写正确的手机号").css({ "display": "inline-block" });
        }
        return !1
    })



})