Ymt.add(function (require, exports, module) {
    
    Ymt.load("widget/LayerBox,ui/form/validate", function (layerbox, validate) {

        var dialog = layerbox('struc', {
            close: '.closeTrigger',
            isloc: !0
        });
        var business_lang = 0;
        //未定义语言判断
        try{
            if (business_lang_flag){
                business_lang = 1;
            } else {
                business_lang = 0;
            }
        }catch(e){
            
        }
        var langArray = [{
            lang_002: "郵箱地址不能為空",
            lang_003: "必須是電子郵件郵箱，用此郵件接收驗證郵件才能完成註冊",
            lang_004: "郵箱格式不正確，例如abc@efg.com",
            lang_005: "此郵箱已經被使用，請更換郵箱。",
            lang_006: "6~16個字符，請使用英文字母（區分大小寫）、符號、數字",
            lang_007: "登錄密碼不能為空",
            lang_0071: "確認密碼不能為空",
            lang_008: "密碼最短6位",
            lang_009: "密碼超出字符範圍",
            lang_010: "請再次輸入密碼",
            lang_011: "兩次輸入的密碼不一致",
            lang_012: "可使用中，英文，數字，“_”，4〜20個字符，一個漢字佔一個字符",
            lang_013: "用戶名不能為空",
            lang_014: "用戶名最短4位",
            lang_015: "用戶名超出字符範圍",
            lang_016: "只能使用中，英文，數字，“_”，4〜20個字符",
            lang_017: "驗證碼不正確",
            lang_018: "確認碼不能為空",
            lang_019: "確認碼不正確",
            lang_020: "姓名不能為空",
            lang_020_0: "此內容將成為核對註冊買手信息的重要依據。",
            lang_020_1: "姓名只能為字母或漢字組成。",
            lang_020_2: "姓名只能為字母或漢字組成。",
            lang_020_3: "姓名只能為字母或漢字組成。",
            lang_021: "名字不能為空",
            lang_022: "請選擇註冊國家/地區",
            lang_023: "請選擇州 /省/地區",
            lang_024: "請填寫地區/城市",
            lang_025: "只能使用英文",
            lang_026: "請填寫詳細地址",
            lang_027: "手機號不能為空",
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
            lang_101: "<i class=\"mj_ipt_usermsg\">4~20個字符、英文、下劃線。註冊後不能修改。</i>",
            lang_102: "請填寫您的常用Email，用於帳號登錄、找回密碼。",
            lang_103: "超出字符範圍"
        },{
            lang_002: "Email address cannot be empty",
            lang_003: "Make sure your email address is correct so that it could receive the verification email",
            lang_004: "Wrong email format, such as abc@efg.com",
            lang_005: "Sorry, this email has already been taken, please try aother one.",
            lang_006: "6-16 characters, please use English letters (case-sensitive), symbols or digits",
            lang_007: "Login password cannot be empty",
            lang_0071: "Confirm the password cannot be empty",
            lang_008: "Password shall contain at least 6 characters",
            lang_009: "Password exceeds the limit of characters",
            lang_010: "Please enter the password again",
            lang_011: "Passwords entered are inconsistent",
            lang_012: "Username length should be within 4~20 chararters( One Chinese chararter equals to one Engilsh character) ",
            lang_013: "Username cannot be empty",
            lang_014: "Username length should be at lease 4 characters",
            lang_015: "Username length has exceeded its maximum limit, please try again",
            lang_016: "Pls use Chinese characters/ alphabetical letters/ numerical numbers / or '_'",
            lang_017: "Verification code is incorrect",
            lang_018: "Activation code cannot be empty",
            lang_019: "Activation code is incorrect",
            lang_020: "Name cannot be empty",
            lang_020_0: "The name will be the important basis for verifying the information of a registered buyer.",
            lang_020_1: "Name shall consist of only letters or Chinese characters",
            lang_021: "Please enter your last name",
            lang_022: "Please select the country of registration",
            lang_023: "Please select the state/province/region",
            lang_024: "Please enter the region/city",
            lang_025: "Please use Engilsh ONLY ",
            lang_026: "Please enter the detailed address",
            lang_027: "Mobile phone No. cannot be empty",
            lang_028: "Please enter QQ/Wechat number",
            lang_029: "Please upload your ID picture",
            lang_030: "Please upload at lease one type of statement",
            lang_031: "Please enter your company name",
            lang_032: "Please choose a country",
            lang_033: "Please choose a state/province",
            lang_034: "Please choose a city/region",
            lang_035: "Please use Engilsh ONLY",
            lang_036: "Please enter detailed company address",
            lang_037: "Please enter the zip code",
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
            lang_048: "Verification code cannot be empty",
            lang_101: "<i class=\"mj_ipt_usermsg\">4-20 characters, English letters or underlines. No change is allowed after the registration.</i>",
            lang_102: "Please enter your frequently used email for account login and password retrieval",
            lang_103: "exceeds the limit of characters"
        }]

        //地址认证
        $('#activeApprove').bind('click', function () {
            //语言判断
            //var lang=business_lang==0?"_en":"";
            //if (0) {
            //   dialog.alert('#dialogError' + lang)
            //} else {
            dialog.alert('#dialogSuccess')
            //}
        });

        //userName
        Val_name = validate('#userName', {
            TipMsg: langArray[business_lang].lang_101,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#userName~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [{ k: 1, msg: langArray[business_lang].lang_013 }, {
                Ajax: {
                    open: !0,
                    url: "/SellerApplyV2/CheckNickName?lang=" + business_lang + "&nickname="
                }
            }]
        });

        //mail
        Val_mail = validate('#userMail', {
            TipMsg: langArray[business_lang].lang_102,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#userMail~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [{ k: 1, msg: langArray[business_lang].lang_002 }, {
                k: 5,
                msg: langArray[business_lang].lang_004
            }, {
                Ajax: {
                    open: !0,
                    url: "/SellerApplyV2/CheckEmail?lang=" + business_lang + "&email="
                }
            }]
        })

        //password
        Val_Password = validate('#Password', {
            TipMsg: langArray[business_lang].lang_006,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#Password~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_007 },
            { k: 2, p: 6, msg: langArray[business_lang].lang_008 },
            { k: 3, p: 16, msg: langArray[business_lang].lang_009 }
            ]
        })

        //compare password
        Val_Password2 = validate('#checkPassword', {
            TipMsg: langArray[business_lang].lang_010,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#checkPassword~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_0071 },
            { k: 2, p: 6, msg: langArray[business_lang].lang_008 },
            { k: 9, p: "#Password:#checkPassword", msg: langArray[business_lang].lang_011 }
            ]
        })


        //realname
        Val_realname = validate('#realname', {
            TipMsg: langArray[business_lang].lang_020_0,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#realname~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_020 },
             { k: 3, p: 50, msg: langArray[business_lang].lang_103 },
             { k: 13, msg: langArray[business_lang].lang_020_1 }
            //{
            //    Ajax: {
            //        open: !0,
            //        url: "/SellerApplyV2/CheckRealName?lang=" + business_lang + "&realname="
            //    }
            //}
            ]
        })

        //address
        Val_address = validate('#address', {
            TipMsg: langArray[business_lang].lang_026,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#address~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_026 },
            { k: 3, p: 50, msg: langArray[business_lang].lang_103 }
            ]
        })

        //phone
        Val_phone = validate('#phone', {
            TipMsg: langArray[business_lang].lang_027,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#phone~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_027 },
             { k: 3, p: 20, msg: langArray[business_lang].lang_103 }
            ]
        })

        ////wechat
        //Val_wechatOrQq = validate('#wechatOrQq', {
        //    eventShow: "blur",
        //    eventHide: "keyup",
        //    eventFocus: "focus",
        //    FixedContainer: "#wechatOrQq~.mj_err",
        //    FixedDefaultClass: ".c_validate",
        //    validateForm: !0,
        //    validateType: [
        //    { k: 1, msg: langArray[business_lang].lang_028 }
        //    ]
        //})


        //Val_companyName = validate('#companyName', {
        //    eventShow: "blur",
        //    eventHide: "keyup",
        //    eventFocus: "focus",
        //    FixedContainer: "#companyName~.mj_err",
        //    FixedDefaultClass: ".c_validate",
        //    validateForm: !0,
        //    validateType: [
        //    { k: 1, msg: langArray[business_lang].lang_031 }
        //    ]
        //})

        Val_zipCode = validate('#zipCode', {
            TipMsg: langArray[business_lang].lang_037,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#zipCode~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_037 },
             { k: 3, p: 10, msg: langArray[business_lang].lang_103 }
            ]
        })

        Val_Country = validate('#selectcountry01', {
            TipMsg: langArray[business_lang].lang_022,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#selectcountry01~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_022 }
            ]
        })

        Val_State = validate('#sState01', {
            TipMsg: langArray[business_lang].lang_023,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#sState01~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_023 }
            ]
        })
        //check City
        Val_checkCity = validate('#checkCity', {
            TipMsg: langArray[business_lang].lang_024,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#checkCity~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_024 },
             { k: 3, p: 50, msg: langArray[business_lang].lang_103 }
            ]
        })

        //Val_telphone = validate('#telphone', {
        //    eventShow: "blur",
        //    eventHide: "keyup",
        //    eventFocus: "focus",
        //    FixedContainer: "#telphone~.mj_err",
        //    FixedDefaultClass: ".c_validate",
        //    validateForm: !0,
        //    validateType: [
        //    { k: 1, msg: langArray[business_lang].lang_040 }
        //    ]
        //})

        Val_ValidateCode = validate('#txtValidationCode', {
            TipMsg: langArray[business_lang].lang_048,
            eventShow: "blur",
            eventHide: "keyup",
            eventFocus: "focus",
            FixedContainer: "#txtValidationCode~.mj_err",
            FixedDefaultClass: ".c_validate",
            validateForm: !0,
            validateType: [
            { k: 1, msg: langArray[business_lang].lang_048 }
            //, {
            //    Ajax: {
            //        open: !0,
            //        url: "/SellerApplyV2/CheckValidationCode?lang=" + business_lang + "&signature=" + $('#txtSignature').val() + "&validationCode="
            //    }
            //}
            ]
        });

    });
    //$('#login').click(function () {
    //    Val_name.validate() && Val_mail.validate() && Val_Password.validate() && Val_Password2.validate() && alert(1);
    //});
});





//修改邮箱
//$('.sendInfo a').click(function () {
//    $('.sendInfo').hide();
//    $('.editEmail').show();
//    return false
//})

//$('.editEmail a:last').click(function () {
//    $('.editEmail').hide();
//    $('.sendInfo').show();

//    return false
//})