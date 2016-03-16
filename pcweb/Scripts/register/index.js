Ymt.add(function (require, exports, module) {
    //
    if ($('#RegistryType').val() == "1") {
        $('.reg_tabs li').removeClass('active');
        $('.reg_tabs li:eq(1) ').addClass('active');
        $('#emailForm').hide();
        $('#mobileForm').show();
    }

    var Validate = require("ui/form/Validate");

    var Val_mail = Validate('#Email', {
        TipMsg: "请填写您常用的Email地址，方便您接收验证邮件、找回密码。",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#Email~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [{ k: 1, msg: "邮箱地址不能为空" }, {
            k: 5,
            msg: "邮箱格式不正确，例如abc@efg.com"
        }
        , {
            Ajax: {
                open: !0,
                url: "/Register/ValidateRegEamil?email="
            }
        }]
    }), Val_pad_1 = Validate('#Password', {
        TipMsg: "6~16个字符，请使用英文字母（区分大小写）、符号或数字。",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#Password~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "密码不能为空" },
            { k: 2, p: 6, msg: "密码最短6位" },
            { k: 3, p: 16, msg: "密码最长16位" }
        ]
    }), Val_pad_2 = Validate('#RePassword', {
        TipMsg: "确认您上面输入的密码",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#RePassword~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "密码不能为空" },
            { k: 2, p: 6, msg: "密码最短6位" },
            { k: 3, p: 16, msg: "密码最长16位" },
            { k: 9, p: "#Password:#RePassword", msg: "两次输入不一致" }
        ]
    }), Val_name = Validate('#NickName', {
        TipMsg: "4~20个字符，可使用、英文、下划线。注册后用户名不能修改",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#NickName~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "用户名不能为空" },
            { k: 2, p: 4, msg: "用户名最短4个字符" },
            {
                Ajax: {
                    open: !0,
                    url: "/Register/ValidateRegNickName2?nickName="
                }
            }
        ]
    }),



        //手机验证
    Val_pad_3 = Validate('#Passwords', {
        TipMsg: "6~16个字符，请使用英文字母（区分大小写）、符号或数字。",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#Passwords~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "密码不能为空" },
            { k: 2, p: 6, msg: "密码最短6位" },
            { k: 3, p: 16, msg: "密码最长16位" }
        ]
    }), Val_pad_4 = Validate('#RePasswords', {
        TipMsg: "确认您上面输入的密码",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#RePasswords~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "重复密码不能为空" },
            { k: 2, p: 6, msg: "密码最短6位" },
            { k: 3, p: 16, msg: "密码最长16位" },
            { k: 9, p: "#Passwords:#RePasswords", msg: "两次输入不一致" }
        ]
    }), Val_name2 = Validate('#NickName2', {
        TipMsg: "4~20个字符，可使用、英文、下划线。注册后用户名不能修改",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#NickName2~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "用户名不能为空" },
            { k: 2, p: 4, msg: "用户名最短4个字符" },
            {
                Ajax: {
                    open: !0,
                    url: "/Register/ValidateRegNickName2?nickName="
                }
            }
        ]
    }),
    Val_phone = Validate('#mobile', {
        TipMsg: "输入有效的手机号",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#mobile~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "手机号不允许为空" },
            { k: 2, p: 11, msg: "手机号格式不正确" },
            {
                Ajax: {
                    open: !0,
                    url: "/Register/ValidateRegMobile?mobile="
                }
            }]
    }), Val_msgcode = Validate('#msgCode', {
        TipMsg: "输入有效的验证码",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#msgCode~.verifi",
        FixedDefaultClass: ".greybg",
        validateForm: !0,
        validateType: [
            { k: 1, msg: "短信验证码不允许为空" }
        ]
    });

    function Val_agree() {
        return $("input[name=IsAgreeContract][type=checkbox]").attr("checked");
    };
    $('#registerbtn').click(function () {
        Val_mail.validate() && Val_pad_1.validate() && Val_pad_2.validate() && Val_name.validate() && Val_agree() && $('#regForm').submit();
    });


    $('#registerbtnPhone_two').click(function () {
        Val_phone.validate() && Val_pad_3.validate() && Val_pad_4.validate() && Val_name2.validate() && Val_agree() && $('#regForm_two').submit();
    });

    //切换注册状态
    $('.reg_tabs li').bind('click', function () {
        $('.reg_tabs li').removeClass('active');
        $(this).addClass('active');
        if ($(this).index() === 1) {
            $('#emailForm').show();
            $('#mobileForm').hide();
        } else {
            $('#mobileForm').show();
            $('#emailForm').hide();
        }

    })

    //点击获取短信倒计时
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
        $.get('/Register/GetMobileVerifyCode?mobile=' + mobile , function (result) {
            $('.msgContent').text(result).css('display', 'inline-block')
        })
    }

    function sendMsg_v2(mobile, Signature, ValidateCode) {
        $.get('/Register/GetMobileVerifyCode_v2?mobile=' + mobile + '&Signature=' + Signature + '&ValidateCode=' + ValidateCode, function (result) {
            $('.msgContent').text(result).css('display', 'inline-block')
        })
    }

    //触发获取短信
    $('.getCode').click(function () {
        if ($('#mobile').val().length == 11) {
            var outTime = $(this).text()
            if (outTime === '获取验证码') {
                $(this).text("60秒后重新发送")
                $(this).closest("div").find(".verifi").hide();
                $('.getCode').addClass('getCodeStop');
                 
                if (($('#ValidateCode').size() > 0 && $('#Signature').size() > 0) || ($('#ValidateCode2').size() > 0 && $('#Signature2').size() > 0)) {
                    var ValidateCode = "";
                    var Signature = "";
                    if ($('#ValidateCode2').size() > 0) {
                        ValidateCode = $('#ValidateCode2').val();
                        Signature = $('#Signature2').val();
                    }
                    else {
                        Signature = $('#Signature').val();
                        ValidateCode = $('#ValidateCode').val();
                    }
                    sendMsg_v2($('#mobile').val(), Signature, ValidateCode);
                }
                else { 
                    sendMsg($('#mobile').val());
                }
                countdown($(this));
            }
        } else {
            $(this).closest("div").find(".verifi").text("手机号不正确").css({ "display": "inline-block" });
        }
    })


    $("input[name=IsAgreeContract][type=checkbox]").click(function () {
        if ($(this).attr("checked")) {
            $(this).closest("div").find("span.verifi").css("display", "none");
            $(this).closest("div").find("span.verifi").text("");
        }
        else {
            $(this).closest("div").find("span.verifi").css("display", "inline-block");
            $(this).closest("div").find("span.verifi").text("需同意协议才能注册");
        }
    });

    $(".sina_login").click(function () {
        location.href = "/Sina/SinaLogin";
    });

    $("#buttonAlipayFastPayment").click(function () {
        $('form#formAlipayFastPayment').submit();
    });

    $("#Email").autocomplete({
        source: "/Register/Emails",
        minChars: 1,
        select: function (event, ui) {
            $('#emailverifi').html('');
        }
    });

    $("#Email").focus();
})