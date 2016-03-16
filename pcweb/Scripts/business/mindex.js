Ymt.add(function (require, exports, module) {
    Ymt.load("widget/LayerBox,ui/form/validate", function (layerbox, validate) {

        var dialog = layerbox('struc', {
            close: '.closeTrigger',
            isloc: !0
        });

        $(document).delegate('#approve', 'click', function () {
            dialog.alert('#dialogConfirm');
        });

        //未定义语言判断
        var business_lang_tag = 1;
        if (typeof (business_lang) == "undefined") {
            business_lang_tag = 1;
        }
        else {
            business_lang_tag = business_lang;
        }

        var langArray = [{
            lang_002: "Please enter your email address",
            lang_003: "Make sure your email address is correct so that it could receive the verification email",
            lang_004: "Incorrect email format, please enter a valid email address",
            lang_005: "Sorry, this email has already been taken, please try aother one.",
            lang_006: "Password should be within 6-16 characters<br/> (a-z,A-Z,numbers or special characters)",
            lang_007: "Please enter your password",
            lang_008: "Please enter at lease 6 characters",
            lang_009: "Password length has exceeded its maximum limit(16 characters), please try again",
            lang_010: "Please type your password again",
            lang_011: "Password does not match the one you entered above, pls try again",
            lang_012: "Username length should be within 4~20 chararters( One Chinese chararter equals to one Engilsh character) ",
            lang_013: "Username cannot be empty, please enter a username",
            lang_014: "Username length should be at lease 4 characters",
            lang_015: "Username length has exceeded its maximum limit, please try again",
            lang_016: "Pls use Chinese characters/ alphabetical letters/ numerical numbers / or '_'",
            lang_017: "Verification code is incorrect",
            lang_018: "Activation code cannot be empty",
            lang_019: "Activation code is incorrect",
            lang_020: "Please enter your first name",
            lang_021: "Please enter your last name",
            lang_022: "Please choose a country",
            lang_023: "Please choose a state/province",
            lang_024: "Please choose a city/region",
            lang_025: "Please use Engilsh ONLY ",
            lang_026: "Please enter detailed mailing address",
            lang_027: "Please enter mobile phone number",
            lang_028: "Please enter QQ/Wechat number",
            lang_029: "Please upload your ID picture",
            lang_030: "Please upload at lease one type of statement",
            lang_031: "Please enter your company name",
            lang_032: "Please choose a country",
            lang_033: "Please choose a state/province",
            lang_034: "Please choose a city/region",
            lang_035: "Please use Engilsh ONLY",
            lang_036: "Please enter detailed company address",
            lang_037: "Please enter zip code",
            lang_038: "Please enter contact personnel name",
            lang_039: "Please enter contact personnel mobile phone number",
            lang_040: "Please enter contact personnel business telephone number",
            lang_041: "Please enter contact personnel's QQ/Wechat number",
            lang_042: "Please upload a copy of business license",
            lang_043: "Please upload a copy of seller permit",
            lang_044: "Please upload a copy of monthly banking  statement",
            lang_045: "Please upload a copy of  legal person's ID",
            lang_046: "Please upload a copy of purchase proof statement",
            lang_047: "Please upload at least two copies of trade reference documents",
            lang_048: "Verification code can not be empty",
            lang_101: "<i class=\"mj_ipt_usermsg\">Caution: Username can’t be revised after<br> registration</i>",
            lang_102: "Please fill in your Email address"
        }, {
            lang_002: "郵箱不能為空",
            lang_003: "必須是電子郵件郵箱，用此郵件接收驗證郵件才能完成註冊",
            lang_004: "郵箱格式不正確",
            lang_005: "此郵箱已經被使用，請更換郵箱。",
            lang_006: "6〜16個字符，請使用英文字母（區分符合），符號和數字",
            lang_007: "密碼不能為空",
            lang_008: "密碼最短6位",
            lang_009: "密碼超出字符範圍，最多16位",
            lang_010: "確認您上面輸入的密碼",
            lang_011: "兩次輸入的密碼不一致",
            lang_012: "可使用中，英文，數字，“_”，4〜20個字符，一個漢字佔一個字符",
            lang_013: "用戶名不能為空",
            lang_014: "用戶名最短4位",
            lang_015: "用戶名超出字符範圍",
            lang_016: "只能使用中，英文，數字，“_”，4〜20個字符",
            lang_017: "驗證碼不正確",
            lang_018: "確認碼不能為空",
            lang_019: "確認碼不正確",
            lang_020: "姓氏不能為空",
            lang_021: "名字不能為空",
            lang_022: "請選擇國家",
            lang_023: "請選州或省",
            lang_024: "請填寫城市或地區",
            lang_025: "只能使用英文",
            lang_026: "請填寫詳細地址",
            lang_027: "請填寫手機號",
            lang_028: "請填寫QQ或微信號",
            lang_029: "請上傳身份證件照片",
            lang_030: "請至少上傳一份賬單",
            lang_031: "請填寫公司名稱",
            lang_032: "請選擇國家",
            lang_033: "請選擇州或省",
            lang_034: "請填寫城市或地區",
            lang_035: "只能使用英文",
            lang_036: "請填寫公司詳細地址",
            lang_037: "請填寫郵編",
            lang_038: "請填寫聯繫人姓名",
            lang_039: "請填寫聯繫人手機號",
            lang_040: "請填寫聯繫人固定電話",
            lang_041: "請填寫聯繫人的QQ或微信號",
            lang_042: "請上傳營業執照照片",
            lang_043: "請上傳零售資質照片",
            lang_044: "請上傳公司銀行對賬單照片",
            lang_045: "請上傳公司法人身份證件照片",
            lang_046: "請上傳商品進貨憑證照片",
            lang_047: "請只是上傳2張交易參考憑證照片",
            lang_048: "驗證碼不能為空",
            lang_101: "<i class=\"mj_ipt_usermsg\">登陸用戶昵稱即掃貨買手和店鋪名稱，註冊後<br>是不可修改的，請慎選！</i>",
            lang_102: "請填寫您常用的Email地址"
        }]

        //地址认证
        $('#Active').bind('click', function () {
            //语言判断
            var lang = business_lang_tag == 0 ? "_en" : "";

            $.post("/MShopApply/Active?code=" + $('#ActiveCode').val(), function (result) {
                if (result.result == "success") {
                    dialog.alert('#dialogSuccess' + lang)
                    location.href = "/MShopApply/SigningOnLine";
                }
                else if (result.result == "actived") {
                    window.location.href = "/MShopApply/ActivedMShop";
                }
                else {
                    dialog.alert('#dialogError' + lang)
                }
            });
        });
        window.onload = function () {
            //审核通过
            //dialog.alert('#dialogCheckPass')

            //审核未通过
            //dialog.alert('#dialogNotCheckPass')

            //未填写缺人码
            //dialog.alert('#dialogNotFillCode')

        }
        //userName
        Val_name = validate('#userName', {
            TipMsg: langArray[business_lang_tag].lang_101,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#userName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [{ k: 1, msg: langArray[business_lang_tag].lang_013 }, {
                Ajax: {
                    open: !0,
                    url: "/Register/ValidateRegUserName?lan=" + (business_lang_tag == 1 ? "0" : "1") + "&username="
                }
            }]
        });

        //mail
        Val_mail = validate('#userMail', {
            TipMsg: langArray[business_lang_tag].lang_102,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#userMail~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [{ k: 1, msg: langArray[business_lang_tag].lang_002 }, {
                k: 5,
                msg: langArray[business_lang_tag].lang_004
            }, {
                Ajax: {
                    open: !0,
                    url: "/Register/ValidateRegEamil?lan=" + (business_lang_tag == 1 ? "0" : "1") + "&email="
                }
            }]
        })

        //password
        Val_Password = validate('#txtPassword', {
            TipMsg: langArray[business_lang_tag].lang_006,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#txtPassword~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_007 },
            { k: 2, p: 6, msg: langArray[business_lang_tag].lang_008 },
            { k: 3, p: 16, msg: langArray[business_lang_tag].lang_009 }
            ]
        })

        //compare password
        Val_Password2 = validate('#checkPassword', {
            TipMsg: langArray[business_lang_tag].lang_006,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#checkPassword~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_007 },
            { k: 2, p: 6, msg: langArray[business_lang_tag].lang_008 },
            { k: 3, p: 16, msg: langArray[business_lang_tag].lang_009 },
            { k: 9, p: "#txtPassword:#checkPassword", msg: langArray[business_lang_tag].lang_011 }
            ]
        })


        //firstName
        Val_firstName = validate('#firstName', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#firstName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_020 }
            ]
        })

        //lastName
        Val_lastName = validate('#lastName', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#lastName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_021 }
            ]
        })

        //address
        Val_address = validate('#address', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#address~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_026 }
            ]
        })

        //phone
        Val_phone = validate('#phone', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#phone~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_027 }
            ]
        })

        //wechat
        Val_wechatOrQq = validate('#wechatOrQq', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#wechatOrQq~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_028 }
            ]
        })


        Val_companyName = validate('#companyName', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#companyName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_031 }
            ]
        })

        Val_zipCode = validate('#zipCode', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#zipCode~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_037 }
            ]
        })

        Val_contacts = validate('#contacts', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#contacts~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_038 }
            ]
        })


        Val_telphone = validate('#telphone', {
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#telphone~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_040 }
            ]
        })

        Val_ValidationCode = validate('#txtValidationCode', {
            TipMsg: "请输入验证码",
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#txtValidationCode~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
                { k: 1, msg: "驗證碼不能為空" }
            ]
        })
    });

});


//修改邮箱
$('.sendInfo a').click(function () {
    $('.sendInfo').hide();
    $('.editEmail').show();
    return false
})

$('.editEmail a:last').click(function () {
    $('.editEmail').hide();
    $('.sendInfo').show();

    return false
})
function Val_Agree() {
    return $("input[name=IsAgreeContract][type=checkbox]").attr("checked");
}

j$(function () {


    $('#btnChangeMail').live('click', function () {
        var mail = $('#txtEmail').val();
        var reg = /^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\_]+\.)+[a-zA-Z0-9]{2,4}$/;
        if (!reg.test(mail)) {
            $('.mj_err').html("郵件格式錯誤");
            $('.mj_err').show();
            return;
        }
        function validateTime() {
            j$.ajax({
                url: "/Register/UpdateRegValidateEmail?email=" + $("#txtEmail").val() + "&id=" + encodeURIComponent($('#hidNickName').val()),
                dataType: "text",
                success: function (data) {
                    if (data == "") {
                        $('.mj_err').html("郵件修改成功");
                        $('.mj_err').show();
                        $('#spReadonlyMail').html($('#txtEmail').val());
                        $('.editEmail').hide();
                        $('.sendInfo').show();
                    }
                    else {
                        $('.mj_err').html(data);
                        $('.mj_err').show();
                    }
                }
            });
        }
        validateTime()
        return false;
    });
});