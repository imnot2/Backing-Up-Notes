Ymt.add(function (require, exports, module) {
    //
    //$("#tab_panels_1").click(function () {
    //    $("#amendDiv").show();
    //    $("#resetDiv").hide();
    //    $(this).addClass('current');
    //    $("#tab_panels_2").removeClass('current')
    //});
    //$("#tab_panels_2").click(function () {
    //    $("#amendDiv").hide();
    //    $("#resetDiv").show();
    //    $(this).addClass('current');
    //    $("#tab_panels_1").removeClass('current')
    //});


    var Validate = require("ui/form/Validate");

    //修改密码

    var Password1 = Validate('#Password1', {
        TipMsg: '密码不能为空',
        FixedContainer: $('#Password1').next(".verifi"),
        validateType: [1, { k: 2, p: '6', msg: "最小6位密码" }]
    });

    var passWord_3 = Validate('#Password3', {
        TipMsg: '密码不能为空',
        FixedContainer: $('#Password3').next(".verifi"),
        validateType: [1, { k: 2, p: '6', msg: "最小6位密码" }]
    });

    var passWord_1 = Validate('#Pwd', {
        TipMsg: '密码不能为空',
        FixedContainer: $('#Pwd').next(".verifi"),
        validateType: [1, { k: 2, p: '6', msg: "最小6位密码" }]
    });
    var passWord_2 = Validate('#rePwd', {
        TipMsg: '密码不能为空',
        FixedContainer: $('#rePwd').next(".verifi"),
        validateType: [1, { k: 2, p: '6', msg: "最小6位密码" }, {
            k: 9,
            p: "#Pwd:#rePwd",
            msg: "两次密码不一致"
        }]
    });
    //修改密码，然后提交
    $('#form_submit_1').bind('click', function () {
        if (Password1.validate() && passWord_1.validate() && passWord_2.validate()) {
            $(this).closest('form').submit();
        }
    });
    //设置密码
    var Password_4 = Validate('#Password4', {
        TipMsg: '密码不能为空',
        FixedContainer: $('#Password4').next(".verifi"),
        validateType: [1, { k: 2, p: '6', msg: "最小6位密码" }]
    });
    var Password_5 = Validate('#Password5', {
        TipMsg: '密码不能为空',
        FixedContainer: $('#Password5').next(".verifi"),
        validateType: [1, { k: 2, p: '6', msg: "最小6位密码" }, {
            k: 9,
            p: "#Password4:#Password5",
            msg: "两次密码不一致"
        }]
    });
    //设置密码，然后提交
    $('#form_submit_2').bind('click', function () {
        if (passWord_3.validate() && Password_4.validate() && Password_5.validate()) {
            $(this).closest('form').submit();
        }
    });
    //设置密码，然后提交
    $('#form_submit_3').bind('click', function () {
        $(this).closest('form').submit();
    });

})