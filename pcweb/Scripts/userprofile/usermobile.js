Ymt.add(function (require, exports, module) {
    //

    var Validate = require("ui/form/Validate");

    var Val_phone = Ymt.ui.form.Validate('#mobile', {
        TipMsg: "输入有效的手机号",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#mobile~.verifi",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "手机号不允许为空" },
            { k: 2, p: 11, msg: "手机号格式不正确" },
            {
                Ajax: {
                    open: !0,
                    url: "/Register/ValidateRegMobile?mobile="
                }
            }]
    }),
    Val_vertify = Ymt.ui.form.Validate('#msgCode', {
        TipMsg: "确认验证码",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#msgCode~.verifi",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "验证码不允许为空" }
        ]
    }),
    Val_loginId = Ymt.ui.form.Validate('#LoginId', {
        TipMsg: "请填写用户名",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#LoginId~.verifi",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "用户名不允许为空" }
        ]
    }),
    Val_password = Ymt.ui.form.Validate('#loginPassword', {
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


    //获取短信方法
    function sendMsg(mobile) {
        $.get('/Register/GetMobileVerifyCode?mobile=' + mobile + '', function (result) {
            $('.msgContent').text(result).css('display', 'inline-block')
        })
    }

    //获取手机短信，并不判断手机是否存在
    function getMsg(mobile) {
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
                $(this).addClass('getCodeStop');
                if ($(this).attr("isNotValidate")) {
                    getMsg($('#mobile').val())
                } else {
                    sendMsg($('#mobile').val())
                }
                countdown($(this));
            }
        } else {
            $(this).closest("li").find(".verifi").text("需填写正确的手机号").css({ "display": "inline-block" });
        }
        return !1
    })

    var NeedPassword = $('#NeedPassword').val();
    var IsThirdParty = $('#IsThirdParty').val();

    $('.bindPhone').click(function () {

        Val_password.validate() && Val_vertify.validate() && Val_phone.validate() && $('#bindForm').submit();
        
    })

    $('#BindPhone').click(function () {

        Val_phone.validate() && $('#bindForm').submit();
        
    })

    

    $('#BindUserMobile').click(function () {
        var password = true, thirdParty = true;
        if (NeedPassword=="true") {
            password = Val_password.validate();
        }
        if (IsThirdParty == "true") {
            thirdParty = Val_loginId.validate();
        }
        password && thirdParty && Val_phone.validate() && $('#bindForm').submit();

    })

    $('#ModifyPhone').click(function () {
        var password = true;
        if (NeedPassword == "true") {
            password = Val_password.validate();
        }
        password && Val_phone.validate() && $('#bindForm').submit();

    })

})