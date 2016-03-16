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
            lang_034: "Please choose a city",
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
            lang_102: "Please fill in your Email address",
            lang_103: "Only English, numerals and underlines are allowed.",
            lang_104: "Confirm Password",
            lang_105: "Please enter your confirm password",
            lang_106: "Please enter your name",
            lang_107: "This is very import for us to check your information",
            lang_108: "Only text allowed",
            lang_FillInfo_BankAccountName: "Account name cannot be empty",
            lang_FillInfo_BankAccountId: "Account No. cannot be empty",
            lang_FillInfo_BankName: "Bank name cannot be empty",
            lang_FillInfo_BankCode: "Bank code cannot be empty",
            lang_FillInfo_BankAddress: "Bank address cannot be empty",
            lang_FillInfo_BankRemittanceNo: "Bank remittance route No. cannot be empty",
            lang_Regist_Country: "Please Select Country/Area",
            lang_Regist_State: "Please Select State/Region/District",
            lang_Regist_Phone: "Mobile phone cannot be empty",
            lang_109: "exceeds the limit of characters",
        }, {
            lang_002: "郵箱地址不能為空",
            lang_003: "必須是電子郵件郵箱，用此郵件接收驗證郵件才能完成註冊",
            lang_004: "郵箱格式不正確，例如abc@efg.com",
            lang_005: "此郵箱已經被使用，請更換郵箱。",
            lang_006: "6~16個字符，請使用英文字母（區分大小写）、符號、數字",
            lang_007: "登录密碼不能為空",
            lang_008: "登录密碼最短6位",
            lang_009: "登录密碼超出字符範圍，最多16位",
            lang_010: "確認您上面輸入的登录密碼",
            lang_011: "兩次輸入的登录密碼不一致",
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
            lang_031: "請填寫完整的公司名稱",
            lang_032: "請選擇國家/地區",
            lang_033: "請選擇州/省/地區",
            lang_034: "請填寫城市/地區",
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
            lang_101: "4~20個字符、英文、下劃線。註冊後不能修改",
            lang_102: "請填寫您常用的Email地址，用於帳號登陸、找回密碼",
            lang_103: "只能填寫英文字母（區分大小寫）、符號、數字的密碼",
            lang_104: "請再次輸入密碼",
            lang_105: "確認密碼不能為空",
            lang_106: "姓名不能為空",
            lang_107: "此內容將成為核對註冊買手信息的重要依據",
            lang_108: "姓名只能為字母或漢字組成",
            lang_FillInfo_BankAccountName: "帳戶名稱不能為空",
            lang_FillInfo_BankAccountId: "帳戶號碼不能為空",
            lang_FillInfo_BankName: "銀行名稱不能為空",
            lang_FillInfo_BankCode: "銀行代碼不能為空",
            lang_FillInfo_BankAddress: "銀行地址不能為空",
            lang_FillInfo_BankRemittanceNo: "銀行匯款路線號不能為空",
            lang_Regist_Country: "請選擇國家/地區",
            lang_Regist_State: "請選擇州/省/地區",
            lang_Regist_Phone: "手機號不能為空",
            lang_109: "超出字符範圍",
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
            { k: 3, p: 16, msg: langArray[business_lang_tag].lang_009 },
            { k: 12, msg: langArray[business_lang_tag].lang_103 }
            ]
        })

        //compare password
        Val_Password2 = validate('#checkPassword', {
            TipMsg: langArray[business_lang_tag].lang_104,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#checkPassword~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_105 },
            { k: 9, p: "#txtPassword:#checkPassword", msg: langArray[business_lang_tag].lang_011 }
            ]
        })


        //compare country ara


        Val_realName = validate('#realName', {
            TipMsg: langArray[business_lang_tag].lang_107,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#realName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_106 },
            { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 },
            { k: 13, msg: langArray[business_lang_tag].lang_108 }
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
        Val_city = validate('#city', {
            TipMsg: langArray[business_lang_tag].lang_034,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#city~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_034 },
            { k: 3, p: 20, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        //address
        Val_address = validate('#address', {
            TipMsg: langArray[business_lang_tag].lang_026,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#address~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_026 },
            { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        //phone
        Val_phone = validate('#phone', {
            TipMsg: langArray[business_lang_tag].lang_Regist_Phone,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#phone~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_027 },
            { k: 3, p: 20, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        //wechat
        Val_wechatOrQq = validate('#wechatOrQq', {
            TipMsg: langArray[business_lang_tag].lang_028,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#wechatOrQq~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_028 },
            { k: 3, p: 20, msg: langArray[business_lang_tag].lang_109 }
            ]
        })


        Val_companyName = validate('#companyName', {
            TipMsg: langArray[business_lang_tag].lang_031,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#companyName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_031 },
            { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        Val_zipCode = validate('#zipCode', {
            TipMsg: langArray[business_lang_tag].lang_037,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#zipCode~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang_tag].lang_037 },
            { k: 3, p: 15, msg: langArray[business_lang_tag].lang_109 }
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
            TipMsg: langArray[business_lang_tag].lang_040,
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
            TipMsg: langArray[business_lang_tag].lang_048,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#txtValidationCode~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: 0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_048 }
            ]
        })

        Val_BankAccountName = validate('#bankAccountName', {
            TipMsg: langArray[business_lang_tag].lang_FillInfo_BankAccountName,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#bankAccountName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: 0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_FillInfo_BankAccountName },
                { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        Val_BankAccountId = validate('#bankAccountId', {
            TipMsg: langArray[business_lang_tag].lang_FillInfo_BankAccountId,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#bankAccountId~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: 0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_FillInfo_BankAccountId },
                { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        Val_BankName = validate('#bankName', {
            TipMsg: langArray[business_lang_tag].lang_FillInfo_BankName,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#bankName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: 0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_FillInfo_BankName },
                { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        Val_BankCode = validate('#bankCode', {
            TipMsg: langArray[business_lang_tag].lang_FillInfo_BankCode,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#bankCode~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: 0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_FillInfo_BankCode },
                { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        Val_BankAddress = validate('#bankAddress', {
            TipMsg: langArray[business_lang_tag].lang_FillInfo_BankAddress,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#bankAddress~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: 0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_FillInfo_BankAddress },
                { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })

        Val_BankRemittanceNo = validate('#bankRemittanceNo', {
            TipMsg: langArray[business_lang_tag].lang_FillInfo_BankRemittanceNo,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#bankRemittanceNo~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: 0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_FillInfo_BankRemittanceNo },
                { k: 3, p: 50, msg: langArray[business_lang_tag].lang_109 }
            ]
        })
        
        Val_Country = validate('#CountryVal', {
            TipMsg: langArray[business_lang_tag].lang_Regist_Country,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#CountryVal~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_Regist_Country }
            ]
        })
        
        Val_State = validate('#StateVal', {
            TipMsg: langArray[business_lang_tag].lang_Regist_State,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#StateVal~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
                { k: 1, msg: langArray[business_lang_tag].lang_Regist_State }
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