Ymt.add(function (require, exports, module) {

    var Validate = require("ui/form/Validate");

    var NewPassword = Validate('#NewPassword', {
        TipMsg: '密码不能为空',
        validateType: [1,
        { k: 2, p: '6', msg: "最小6位密码" },
        { k: 3, p: 16, msg: "密码最长16位" }
        ]
    });

    var NewPasswordConfirm = Validate('#NewPasswordConfirm', {
        TipMsg: '密码不能为空',
        validateType: [1,
        { k: 2, p: '6', msg: "最小6位密码" },
        { k: 3, p: 16, msg: "密码最长16位" },
        { k: 9, p: "#NewPassword:#NewPasswordConfirm", msg: "两次输入不一致" }
        ]
    });
    $('#go').click(function () {
        NewPassword.validate() && NewPasswordConfirm.validate() && $('#resetform').submit();
        return !1
    });
})