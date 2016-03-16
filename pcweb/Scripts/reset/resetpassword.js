Ymt.add(function (require, exports, module) {
    //

    var Validate = require("ui/form/Validate");

    var Val_msgcode = Validate('#msgCode', {
        TipMsg: "输入有效的验证码",
        FixedContainer: "#msgCode~.verifi",
        FixedDefaultClass: ".greybg",
        validateType: [
            { k: 1, msg: "短信验证码不允许为空" }
        ]
    });
    $('#txtEmail').blur(function () {
        var checkVal = $(this).val();
        var re = /^\d{11}$/;
        var ere = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (re.test(checkVal)) {
            //$('.numberCode').hide();
            $('.phoneCode').show();
            $('.btnSubmitPhone').show();
            $('.btnSubmitEmail').hide();
            $(this).parent().find('.verifi').html("").hide();
            return false;
        }

        if (ere.test(checkVal)) {
            $('.numberCode').hide();
            $('.phoneCode').hide();
            $('.numberCode').show();
            $('.btnSubmitPhone').hide();
            $('.btnSubmitEmail').show();
            $(this).parent().find('.verifi').html("").hide();
            return false;
        }
        $(this).parent().find('.verifi').html("账户格式错误").css({ 'display': 'inline-block', 'margin-left': '4px' });
        return false;
    })

    $('#submitForm').click(function () {
        if ($('#txtEmail').val() == '' || $('#txtEmail').val() == '登录邮箱或手机号码') {
            $('#txtEmail').parent().find('.verifi').html("账户不允许为空").css({ 'display': 'inline-block', 'margin-left': '4px' });
            return !1;
        }
        var input = $("#txtEmail").val();
        var isMobile = mobileCheck(input);
        var isMail = emailCheck(input);

        if (isMobile) {
            if (isNotExistPhone) {
                return;
            }
            document.location.href = "短信验证码";
        }
        var sign = $('#ValidateSign').val();
        var code = $("#txtCode").val();
        $.get("/Reset/ValidateCode?sign=" + sign + "&code=" + code + "&r=" + Math.random(), function (data) {
            var codeurl = $('#ConfirmImageField').val();
            if (data == "False") {
                $('#ValidateCodeTip').html("请输入正确验证码").css('display', 'inline-block');
                initValidatePic(codeurl);
                return;
            }
            $('#ValidateCodeTip').html("").css('display', 'none');
            var totalTime = 60, time, obj = $('.regetmail');
            obj.hide();
            $('.resendmail').css('display', 'inline-block');
            function ShowTime() {
                if (totalTime >= 0) {
                    $('.resendmail').find('.num').text(totalTime);
                    totalTime--;
                }
                else {
                    clearInterval(time);
                    initValidatePic(codeurl);
                    obj.css('display', 'inline-block');
                    $('.resendmail').css('display', 'none');
                    //alertBox.alert('#activation');
                }
            }
            time = setInterval(function () { ShowTime() }, 1000);

            $.ajax({
                url: "/Reset/SendPasswordResetEmail?txtEmail=" + $("#txtEmail").val(),
                dataType: "text",
                success: function (data) {
                    $(".des").html(data != "" ? data : "重置登录密码的链接已经发送至您的注册邮箱。<br/><span style=\"color: #F04D00;\"> 系统邮件可能被视为垃圾邮件，请留意邮箱中的垃圾信箱</span>");
                    alertBox.alert('#activation')
                }
            });
        });
        return false;
    });

    var isNotRightPhone = !1;

    $('.regetphone').bind('click', function () {
        if (isNotRightPhone) {
            return;
        }
        if (!Val_msgcode.validate()) {
            return;
        }
        var url = "/reset/ResetPasswordByMobile?mobile=" + $('#txtEmail').val() + "&verifycode=" + $('#msgCode').val();
        //alert(url);
        //$.ajax({ url: "/reset/FindPasswordByMobile?mobile=" + $('#txtEmail').val() + "&verifycode=" + $('#msgCode').val() + "" })
        window.location.href = url;
    })


    $(function () {
        $('#gologin').attr("href", "/login");
    });





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


    //获取短信方法
    function sendMsg(mobile, signature, validatecode, obj) {
        $.get('/Reset/GetMobileVerifyCode?mobile=' + mobile + '&signature=' + signature + '&validatecode=' + validatecode, function (result) {
            if (result.Status != 200) {
                isNotRightPhone = !0;

                //{"Msg":"验证码无效,请输入正确验证码","Status":700,"ServerTime":"2014-10-10 04:59:42","Result":false}
                var codeurl = $('#ConfirmImageField').val();
                if (result.Result == false) {
                    var msg = (result.Msg != "" ? result.Msg : "请输入正确验证码");
                    $('#ValidateCodeTip').html(msg).css('display', 'inline-block');
                    initValidatePic(codeurl);
                    return;
                }
            }
            else {
                isNotRightPhone = !1;
                $("#ValidateCodeTip").hide();
                $('.getCode').addClass('getCodeStop');
                obj.text("60秒后重新发送")
                countdown(obj);
            }
            $('.msgContent').text(result.Msg).css('display', 'inline-block')
        })
    }

    $('.getCode').click(function () {
        if ($("#txtCode").val() == "") {
            return;
        }
        var sign = $('#ValidateSign').val();
        var code = $("#txtCode").val();

        if ($('#txtEmail').val().length == 11) {
            var outTime = $(this).text()
            if (outTime === '获取验证码') {
                sendMsg($('#txtEmail').val(), $("#ValidateSign").val(), $("#txtCode").val(), $(this))
            }
        } else {
            $(this).closest("div").find(".verifi").text("需填写正确的手机号").css({ "display": "inline-block" });
        }
    })

    $('.bindPhone').click(function () {
        if ($('#mobile').val() == '') {
            return false;
        }

        if ($('#msgCode').val() == '') {
            return false;
        }
        $('#bindForm').submit()
    })

    var LayerBox = require('widget/layerbox');
    var alertBox = LayerBox('struc');

    $('.regetmail').live('click', function () {

    });
    $('.shut_alert_box').live('click', function () {
        alertBox.close();
    });
    function emailCheck(email) {
        var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (!pattern.test(email)) {
            return false;
        }
        return true;
    }
    function mobileCheck(mobile) {
        var pattern = /^1[3|4|5|8][0-9]{9}$/;
        if (!pattern.test(mobile)) {
            return false;
        }
    }
})