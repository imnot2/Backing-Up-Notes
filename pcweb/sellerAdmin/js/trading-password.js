$m.load(['ui/form/Validate'], function (Validate) {
 
    //修改密码
    var oldTradePwd = Validate('#oldTradePwd', {
        TipMsg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdRequire,
        validateType: [1, { k: 2, p: '6', msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdLenth }]
    });

    var newTradePwd = Validate('#newTradePwd', {
        TipMsg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdRequire,
        validateType: [1, { k: 2, p: '6', msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdLenth }]
    });
    var reTradePwd = Validate('#reTradePwd', {
        TipMsg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdRequire,
        validateType: [1, { k: 2, p: '6', msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdLenth }, {
            k: 9,
            p: "#newTradePwd:#reTradePwd",
            msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdError
        }]
    });
    //修改密码，然后提交
    $('#submit_update').bind('click', function () {
        if (oldTradePwd.validate() && newTradePwd.validate() && reTradePwd.validate()) {
            $(this).closest('form').submit();
        }
    });

    //设置密码
    var loginPwd = Validate('#oldTradePwd1', {
        TipMsg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdRequire,
        validateType: [1, { k: 2, p: '6', msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdLenth }]
    });

    var setTradePwd = Validate('#newTradePwd1', {
        TipMsg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdRequire,
        validateType: [1, { k: 2, p: '6', msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdLenth }]
    });
    var reSetTradePwd = Validate('#reTradePwd1', {
        TipMsg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdRequire,
        validateType: [1, { k: 2, p: '6', msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdLenth }, {
            k: 9,
            p: "#newTradePwd1:#reTradePwd1",
            msg: ResourceJS.Seller_SellerCenter_TradingPassword_js_PwdError
        }]
    });
    //设置密码，然后提交
    $('#submit_save').bind('click', function () {
        if (loginPwd.validate() && setTradePwd.validate() && reSetTradePwd.validate()) {
            $(this).closest('form').submit();
        }
    });
})