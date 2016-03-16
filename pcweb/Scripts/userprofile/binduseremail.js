Ymt.add(function (require, exports, module) {
    //

    var Validate = require("ui/form/Validate");

    var NeedConfirm = $("#NeedConfirm").val();
    var NeedPassword = $("#NeedPassword").val();

    var Val_pad_1, Val_pad_2;
    var Val_mail = Ymt.ui.form.Validate('#LoginEmail', {
        TipMsg: "请输入邮箱地址",
        eventShow: "blur",
        eventHide: "keyup",
        eventFocus: "focus",
        FixedContainer: "#LoginEmail~.verifi",
        FixedDefaultClass: ".greybg",
        validateType: [{ k: 1, msg: "邮箱地址不能为空" }, {
            k: 5,
            msg: "邮箱格式不正确"
        }, {
            Ajax: {
                open: !0,
                url: "/UserProfile/IsEmailUsed?email="
            }
        }]
    });
    if (NeedPassword == "1") {
        Val_pad_1 = Validate('#txtloginPassword', {
            TipMsg: "确认您上面输入的密码",
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedDefaultClass: ".greybg",
            validateType: [
                { k: 1, msg: "密码不能为空" },
                { k: 2, p: 6, msg: "密码最短6位" },
                { k: 3, p: 16, msg: "密码最长16位" }
            ]
        })
    }
    if (NeedConfirm == "1") {
        Val_pad_2 = Validate('#RePasswords', {
            TipMsg: "确认您上面输入的密码",
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedDefaultClass: ".greybg",
            validateType: [
                { k: 1, msg: "密码不能为空" },
                { k: 2, p: 6, msg: "密码最短6位" },
                { k: 3, p: 16, msg: "密码最长16位" },
                { k: 9, p: "#txtloginPassword:#RePasswords", msg: "两次输入不一致" }
            ]
        })
    }

    $('.regetmail').live('click', function () {
        var thisForm = document.forms["form1"], isvitify = !1;
        thisForm.method = "post";
        if (Val_mail.validate()) {
            isvitify = true;
        }
        if (Val_pad_1) {
            if (Val_pad_1.validate()) {
                isvitify = true;
            } else {
                isvitify = false;
                return;
            }
        }
        if (Val_pad_2) {
            if (Val_pad_2.validate()) {
                isvitify = true;
            } else {
                isvitify = false;
                return;
            }
        }
        isvitify && thisForm.submit();
    });

})