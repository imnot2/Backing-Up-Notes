/*=======================jquery.validationEngine.js===========================*/
/*
* Inline Form Validation Engine 1.6.2, jQuery plugin
* 
* Copyright(c) 2009, Cedric Dugas
* http://www.position-relative.net
*	
* Form validation engine allowing custom regex rules to be added.
* Thanks to Francois Duquette
* Licenced under the MIT Licence
*/


(function (j$) {
    j$.fn.validationYMatou = function () { };
    j$.validationYMatou = {
        newLang: function() {
            j$.validationYMatou.allRules = {
                "required": {
                    "regex": "none",
                    "alertText": "此项必填",
                    "alertTextCheckboxMultiple": "请选择",
                    "alertTextCheckboxe": "请选择"
                },
                "noEComma": {
                    "regex": "/^[^,]*$/",
                    "alertText": "不能包含英文逗号"
                },
                "noCComma": {
                    "regex": "/^[^，]*$/",
                    "alertText": "不能包含逗号"
                },
                "length": {
                    "regex": "none",
                    "alertText": "在 ",
                    "alertText2": " 到 ",
                    "alertText3": " 个字符间"
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Checks allowed Exceeded"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "请选择",
                    "alertText2": " options"
                },
                "confirm": {
                    "regex": "none",
                    "alertText": "匹配不成功"
                },
                "telephone": {
                    "regex": "/^[0-9\-\(\)\ ]+$/",
                    "alertText": "电话号码格式不正确"
                },
                "phone": {
                    "regex": "/^[0-9\-\ ]+$/",
                    "alertText": "电话号码格式不正确"
                },
                "validate": {
                    "regex": "/^[0-9\-\(\)\ ]+$/",
                    "alertText": "验证码格式不正确"
                },
                "email": {
                    "regex": "/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\_]+\.)+[a-zA-Z0-9]{2,4}$/",
                    "alertText": "Email格式不正确"
                },
                "date": {
                    "regex": "/^[0-9]{4}\-\[0-9]{1,2}\-\[0-9]{1,2}$/",
                    "alertText": "日期格式不正确，必须为'YYYY-MM-DD'格式"
                },
                "onlyNumber": {
                    "regex": "/^[0-9\ ]+$/",
                    "alertText": "必须是数字"
                },
                "price": {
                    "regex": "/^\\d+(.\\d{1,2})?$/",
                    "alertText": "价格格式不正确"
                },
                "noSpecialCaracters": {
                    "regex": "/^[0-9a-zA-Z]+$/",
                    "alertText": "* No special caracters allowed"
                },
                "ajaxUser": {
                    "file": "validateUser.php",
                    "extraData": "name=eric",
                    "alertTextOk": "* This user is available",
                    "alertTextLoad": "* Loading, please wait",
                    "alertText": "* This user is already taken"
                },
                "ajaxName": {
                    "file": "validateUser.php",
                    "alertText": "* This name is already taken",
                    "alertTextOk": "* This name is available",
                    "alertTextLoad": "* Loading, please wait"
                },
                "onlyLetter": {
                    "regex": "/^[a-zA-Z\ \']+$/",
                    "alertText": "必须是字母"
                },
                "postCode": {
                    "regex": "/^[0-9]\\d{5}(?!\\d)$/",
                    "alertText": "邮编格式不正确"
                },
                "AmericaPostCode": {
                    "regex": "/^[0-9]\\d{4}(?!\\d)$/",
                    "alertText": "邮编格式不正确"
                },
                "ChineseName": {
                    "regex": "/^[\u4e00-\u9fa5]{0,}$/",
                    "alertText": "必须为中文"
                },
                "EnglishName": {
                    "regex": "/^[a-zA-Z][a-zA-Z']*[a-zA-Z]+$/",
                    "alertText": "必须为英文名称"
                },
                "EnglishAddress": {
                    "regex": "/^[\\-\\.a-zA-Z\\s,0-9`~!@#$%^&*()-=+_[\\]{}|/?,.<>;:\"'\\\\]*$/ ",
                    "alertText": "必须为英文地址"
                },
                "MSN": {
                    "regex": "/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
                    "alertText": "必须为正确的MSN地址"
                }
            };
        }
    };
})(jQuery);

j$(document).ready(function () {
    j$.validationYMatou.newLang();
}); 

(function (j$) {

    j$.fn.validationEngine = function (settings) {

        if (j$.validationYMatou) {				// IS THERE A LANGUAGE LOCALISATION ?
            allRules = j$.validationYMatou.allRules;
        } else {
            j$.validationEngine.debug("Validation engine rules are not loaded check your external file");
        }
        settings = jQuery.extend({
            allrules: allRules,
            validationEventTriggers: "blur",
            inlineValidation: true,
            returnIsValid: false,
            animateSubmit: true,
            unbindEngine: true,
            ajaxSubmit: false,
            promptPosition: "topRight", // OPENNING BOX POSITION, IMPLEMENTED: topLeft, topRight, bottomLeft, centerRight, bottomRight
            success: false,
            failure: function () { }
        }, settings);
        j$.validationEngine.settings = settings;
        j$.validationEngine.ajaxValidArray = new Array(); // ARRAY FOR AJAX: VALIDATION MEMORY 

        if (settings.inlineValidation == true) { 		// Validating Inline ?
            if (!settings.returnIsValid) {					// NEEDED FOR THE SETTING returnIsValid
                allowReturnIsvalid = false;
                j$(this).find("[class*=validate]").not("[type=checkbox]").bind(settings.validationEventTriggers, function (caller) { _inlinEvent(this); })
                j$(this).find("[class*=validate][type=checkbox]").bind("click", function (caller) { _inlinEvent(this); })

                firstvalid = false;
            }
            function _inlinEvent(caller) {
                j$.validationEngine.settings = settings;
                if (j$.validationEngine.intercept == false || !j$.validationEngine.intercept) {		// STOP INLINE VALIDATION THIS TIME ONLY
                    j$.validationEngine.onSubmitValid = false;
                    j$.validationEngine.loadValidation(caller);
                } else {
                    j$.validationEngine.intercept = false;
                }
            }
        }
        if (settings.returnIsValid) {		// Do validation and return true or false, it bypass everything;
            if (j$.validationEngine.submitValidation(this, settings)) {
                return false;
            } else {
                return true;
            }
        }
        j$(this).bind("submit", function (caller) {   // ON FORM SUBMIT, CONTROL AJAX FUNCTION IF SPECIFIED ON DOCUMENT READY
            j$.validationEngine.onSubmitValid = true;
            j$.validationEngine.settings = settings;
            if (j$.validationEngine.submitValidation(this, settings) == false) {
                if (j$.validationEngine.submitForm(this, settings) == true) { return false; }
            } else {
                settings.failure && settings.failure();
                return false;
            }
        })
    };
    j$.validationEngine = {
        defaultSetting: function (caller) {
            if (j$.validationEngineLanguage) {				// IS THERE A LANGUAGE LOCALISATION ?
                allRules = j$.validationEngineLanguage.allRules;
            } else {
                j$.validationEngine.debug("Validation engine rules are not loaded check your external file");
            }
            settings = {
                allrules: allRules,
                validationEventTriggers: "blur",
                inlineValidation: true,
                returnIsValid: false,
                animateSubmit: true,
                unbindEngine: true,
                ajaxSubmit: false,
                promptPosition: "topRight", // OPENNING BOX POSITION, IMPLEMENTED: topLeft, topRight, bottomLeft, centerRight, bottomRight
                success: false,
                failure: function () { }
            }
            j$.validationEngine.settings = settings;
        },
        loadValidation: function (caller) {		// GET VALIDATIONS TO BE EXECUTED
            if (!j$.validationEngine.settings) {
                j$.validationEngine.defaultSetting()
            }
            rulesParsing = j$(caller).attr('class');
            rulesRegExp = /\[(.*)\]/;
            getRules = rulesRegExp.exec(rulesParsing);
            str = getRules[1];
            pattern = /\W+/;
            result = str.split(pattern);

            var validateCalll = j$.validationEngine.validateCall(caller, result)
            return validateCalll;
        },
        validateCall: function (caller, rules) {	// EXECUTE VALIDATION REQUIRED BY THE USER FOR THIS FIELD
            var promptText = ""

            if (!j$(caller).attr("id")) { j$.validationEngine.debug("This field have no ID attribut( name & class displayed): " + j$(caller).attr("name") + " " + j$(caller).attr("class")) }

            caller = caller;
            ajaxValidate = false;
            var callerName = j$(caller).attr("name");
            j$.validationEngine.isError = false;
            j$.validationEngine.showTriangle = true;
            callerType = j$(caller).attr("type");

            for (i = 0; i < rules.length; i++) {
                switch (rules[i]) {
                    case "optional":
                        if (!j$(caller).val()) {
                            j$.validationEngine.closePrompt(caller);
                            return j$.validationEngine.isError;
                        }
                        break;
                    case "required":
                        _required(caller, rules);
                        break;
                    case "custom":
                        _customRegex(caller, rules, i);
                        break;
                    case "ajax":
                        if (!j$.validationEngine.onSubmitValid) {
                            _ajax(caller, rules, i);
                        };
                        break;
                    case "length":
                        _length(caller, rules, i);
                        break;
                    case "maxCheckbox":
                        _maxCheckbox(caller, rules, i);
                        groupname = j$(caller).attr("name");
                        caller = j$("input[name='" + groupname + "']");
                        break;
                    case "minCheckbox":
                        _minCheckbox(caller, rules, i);
                        groupname = j$(caller).attr("name");
                        caller = j$("input[name='" + groupname + "']");
                        break;
                    case "confirm":
                        _confirm(caller, rules, i);
                        break;
                    default: ;
                };
            };
            radioHack();
            if (j$.validationEngine.isError == true) {
                linkTofield = j$.validationEngine.linkTofield(caller);

                (j$("div." + linkTofield).size() == 0) ? j$.validationEngine.buildPrompt(caller, promptText, "error") : j$.validationEngine.updatePromptText(caller, promptText);
            } else { j$.validationEngine.closePrompt(caller); }
            /* UNFORTUNATE RADIO AND CHECKBOX GROUP HACKS */
            /* As my validation is looping input with id's we need a hack for my validation to understand to group these inputs */
            function radioHack() {
                if (j$("input[name='" + callerName + "']").size() > 1 && (callerType == "radio" || callerType == "checkbox")) {        // Hack for radio/checkbox group button, the validation go the first radio/checkbox of the group
                    caller = j$("input[name='" + callerName + "'][type!=hidden]:first");
                    j$.validationEngine.showTriangle = false;
                }
            }
            /* VALIDATION FUNCTIONS */
            function _required(caller, rules) {   // VALIDATE BLANK FIELD
                callerType = j$(caller).attr("type");
                if (callerType == "text" || callerType == "password" || callerType == "textarea") {

                    if (!j$(caller).val()) {
                        j$.validationEngine.isError = true;
                        promptText += j$.validationEngine.settings.allrules[rules[i]].alertText + "<br />";
                    }
                }
                if (callerType == "radio" || callerType == "checkbox") {
                    callerName = j$(caller).attr("name");

                    if (j$("input[name='" + callerName + "']:checked").size() == 0) {
                        j$.validationEngine.isError = true;
                        if (j$("input[name='" + callerName + "']").size() == 1) {
                            promptText += j$.validationEngine.settings.allrules[rules[i]].alertTextCheckboxe + "<br />";
                        } else {
                            promptText += j$.validationEngine.settings.allrules[rules[i]].alertTextCheckboxMultiple + "<br />";
                        }
                    }
                }
                if (callerType == "select-one") { // added by paul@kinetek.net for select boxes, Thank you		
                    if (!j$(caller).val()) {
                        j$.validationEngine.isError = true;
                        promptText += j$.validationEngine.settings.allrules[rules[i]].alertText + "<br />";
                    }
                }
                if (callerType == "select-multiple") { // added by paul@kinetek.net for select boxes, Thank you	
                    if (!j$(caller).find("option:selected").val()) {
                        j$.validationEngine.isError = true;
                        promptText += j$.validationEngine.settings.allrules[rules[i]].alertText + "<br />";
                    }
                }
            }
            function _customRegex(caller, rules, position) {		 // VALIDATE REGEX RULES
                customRule = rules[position + 1];
                pattern = eval(j$.validationEngine.settings.allrules[customRule].regex);

                if (!pattern.test(j$(caller).attr('value'))) {
                    j$.validationEngine.isError = true;
                    promptText += j$.validationEngine.settings.allrules[customRule].alertText + "<br />";
                }
            }
            function _ajax(caller, rules, position) {				 // VALIDATE AJAX RULES

                customAjaxRule = rules[position + 1];
                postfile = j$.validationEngine.settings.allrules[customAjaxRule].file;
                fieldValue = j$(caller).val();
                ajaxCaller = caller;
                fieldId = j$(caller).attr("id");
                ajaxValidate = true;
                ajaxisError = j$.validationEngine.isError;

                if (!j$.validationEngine.settings.allrules[customAjaxRule].extraData) {
                    extraData = j$.validationEngine.settings.allrules[customAjaxRule].extraData;
                } else {
                    extraData = "";
                }
                /* AJAX VALIDATION HAS ITS OWN UPDATE AND BUILD UNLIKE OTHER RULES */
                if (!ajaxisError) {
                    j$.ajax({
                        type: "POST",
                        url: postfile,
                        async: true,
                        data: "validateValue=" + fieldValue + "&validateId=" + fieldId + "&validateError=" + customAjaxRule + extraData,
                        beforeSend: function () {		// BUILD A LOADING PROMPT IF LOAD TEXT EXIST		   			
                            if (j$.validationEngine.settings.allrules[customAjaxRule].alertTextLoad) {

                                if (!j$("div." + fieldId + "formError")[0]) {
                                    return j$.validationEngine.buildPrompt(ajaxCaller, j$.validationEngine.settings.allrules[customAjaxRule].alertTextLoad, "load");
                                } else {
                                    j$.validationEngine.updatePromptText(ajaxCaller, j$.validationEngine.settings.allrules[customAjaxRule].alertTextLoad, "load");
                                }
                            }
                        },
                        error: function (data, transport) { j$.validationEngine.debug("error in the ajax: " + data.status + " " + transport) },
                        success: function (data) {					// GET SUCCESS DATA RETURN JSON
                            data = eval("(" + data + ")"); 			// GET JSON DATA FROM PHP AND PARSE IT
                            ajaxisError = data.jsonValidateReturn[2];
                            customAjaxRule = data.jsonValidateReturn[1];
                            ajaxCaller = j$("#" + data.jsonValidateReturn[0])[0];
                            fieldId = ajaxCaller;
                            ajaxErrorLength = j$.validationEngine.ajaxValidArray.length;
                            existInarray = false;

                            if (ajaxisError == "false") {			// DATA FALSE UPDATE PROMPT WITH ERROR;

                                _checkInArray(false)				// Check if ajax validation alreay used on this field

                                if (!existInarray) {		 			// Add ajax error to stop submit		 		
                                    j$.validationEngine.ajaxValidArray[ajaxErrorLength] = new Array(2);
                                    j$.validationEngine.ajaxValidArray[ajaxErrorLength][0] = fieldId;
                                    j$.validationEngine.ajaxValidArray[ajaxErrorLength][1] = false;
                                    existInarray = false;
                                }

                                j$.validationEngine.ajaxValid = false;
                                promptText += j$.validationEngine.settings.allrules[customAjaxRule].alertText + "<br />";
                                j$.validationEngine.updatePromptText(ajaxCaller, promptText, "", true);
                            } else {
                                _checkInArray(true);
                                j$.validationEngine.ajaxValid = true;
                                if (j$.validationEngine.settings.allrules[customAjaxRule].alertTextOk) {	// NO OK TEXT MEAN CLOSE PROMPT	 			
                                    j$.validationEngine.updatePromptText(ajaxCaller, j$.validationEngine.settings.allrules[customAjaxRule].alertTextOk, "pass", true);
                                } else {
                                    ajaxValidate = false;
                                    j$.validationEngine.closePrompt(ajaxCaller);
                                }
                            }
                            function _checkInArray(validate) {
                                for (x = 0; x < ajaxErrorLength; x++) {
                                    if (j$.validationEngine.ajaxValidArray[x][0] == fieldId) {
                                        j$.validationEngine.ajaxValidArray[x][1] = validate;
                                        existInarray = true;

                                    }
                                }
                            }
                        }
                    });
                }
            }
            function _confirm(caller, rules, position) {		 // VALIDATE FIELD MATCH
                confirmField = rules[position + 1];

                if (j$(caller).attr('value') != j$("#" + confirmField).attr('value')) {
                    j$.validationEngine.isError = true;
                    promptText += j$.validationEngine.settings.allrules["confirm"].alertText + "<br />";
                }
            }
            function _length(caller, rules, position) {    	  // VALIDATE LENGTH

                startLength = eval(rules[position + 1]);
                endLength = eval(rules[position + 2]);
                feildLength = j$(caller).attr('value').length;

                if (feildLength < startLength || feildLength > endLength) {
                    j$.validationEngine.isError = true;
                    promptText += j$.validationEngine.settings.allrules["length"].alertText + startLength + j$.validationEngine.settings.allrules["length"].alertText2 + endLength + j$.validationEngine.settings.allrules["length"].alertText3 + "<br />"
                }
            }
            function _maxCheckbox(caller, rules, position) {  	  // VALIDATE CHECKBOX NUMBER

                nbCheck = eval(rules[position + 1]);
                groupname = j$(caller).attr("name");
                groupSize = j$("input[name='" + groupname + "']:checked").size();
                if (groupSize > nbCheck) {
                    j$.validationEngine.showTriangle = false;
                    j$.validationEngine.isError = true;
                    promptText += j$.validationEngine.settings.allrules["maxCheckbox"].alertText + "<br />";
                }
            }
            function _minCheckbox(caller, rules, position) {  	  // VALIDATE CHECKBOX NUMBER

                nbCheck = eval(rules[position + 1]);
                groupname = j$(caller).attr("name");
                groupSize = j$("input[name='" + groupname + "']:checked").size();
                if (groupSize < nbCheck) {

                    j$.validationEngine.isError = true;
                    j$.validationEngine.showTriangle = false;
                    promptText += j$.validationEngine.settings.allrules["minCheckbox"].alertText + " " + nbCheck + " " + j$.validationEngine.settings.allrules["minCheckbox"].alertText2 + "<br />";
                }
            }
            return (j$.validationEngine.isError) ? j$.validationEngine.isError : false;
        },
        submitForm: function (caller) {
            if (j$.validationEngine.settings.ajaxSubmit) {
                if (j$.validationEngine.settings.ajaxSubmitExtraData) {
                    extraData = j$.validationEngine.settings.ajaxSubmitExtraData;
                } else {
                    extraData = "";
                }
                j$.ajax({
                    type: "POST",
                    url: j$.validationEngine.settings.ajaxSubmitFile,
                    async: true,
                    data: j$(caller).serialize() + "&" + extraData,
                    error: function (data, transport) { j$.validationEngine.debug("error in the ajax: " + data.status + " " + transport) },
                    success: function (data) {
                        if (data == "true") {			// EVERYTING IS FINE, SHOW SUCCESS MESSAGE
                            j$(caller).css("opacity", 1)
                            j$(caller).animate({ opacity: 0, height: 0 }, function () {
                                j$(caller).css("display", "none");
                                j$(caller).before("<div class='ajaxSubmit'>" + j$.validationEngine.settings.ajaxSubmitMessage + "</div>");
                                j$.validationEngine.closePrompt(".formError", true);
                                j$(".ajaxSubmit").show("slow");
                                if (j$.validationEngine.settings.success) {	// AJAX SUCCESS, STOP THE LOCATION UPDATE
                                    j$.validationEngine.settings.success && j$.validationEngine.settings.success();
                                    return false;
                                }
                            })
                        } else {						// HOUSTON WE GOT A PROBLEM (SOMETING IS NOT VALIDATING)
                            data = eval("(" + data + ")");
                            if (!data.jsonValidateReturn) {
                                j$.validationEngine.debug("you are not going into the success fonction and jsonValidateReturn return nothing");
                            }
                            errorNumber = data.jsonValidateReturn.length
                            for (index = 0; index < errorNumber; index++) {
                                fieldId = data.jsonValidateReturn[index][0];
                                promptError = data.jsonValidateReturn[index][1];
                                type = data.jsonValidateReturn[index][2];
                                j$.validationEngine.buildPrompt(fieldId, promptError, type);
                            }
                        }
                    }
                })
                return true;
            }
            if (j$.validationEngine.settings.success) {	// AJAX SUCCESS, STOP THE LOCATION UPDATE
                if (j$.validationEngine.settings.unbindEngine) { j$(caller).unbind("submit") }
                j$.validationEngine.settings.success && j$.validationEngine.settings.success();
                return true;
            }
            return false;
        },
        buildPrompt: function (caller, promptText, type, ajaxed) {			// ERROR PROMPT CREATION AND DISPLAY WHEN AN ERROR OCCUR
            if (!j$.validationEngine.settings) {
                j$.validationEngine.defaultSetting()
            }
            var divFormError = document.createElement('div');
            var formErrorContent = document.createElement('div');

            linkTofield = j$.validationEngine.linkTofield(caller)
            j$(divFormError).addClass("formError")

            if (type == "pass") { j$(divFormError).addClass("greenPopup") }
            if (type == "load") { j$(divFormError).addClass("blackPopup") }
            if (ajaxed) { j$(divFormError).addClass("ajaxed") }

            j$(divFormError).addClass(linkTofield);
            j$(formErrorContent).addClass("formErrorContent");

            j$("body").append(divFormError);
            j$(divFormError).append(formErrorContent);

            if (j$.validationEngine.showTriangle != false) {		// NO TRIANGLE ON MAX CHECKBOX AND RADIO
                var arrow = document.createElement('div');
                j$(arrow).addClass("formErrorArrow");
                j$(divFormError).append(arrow);
                if (j$.validationEngine.settings.promptPosition == "bottomLeft" || j$.validationEngine.settings.promptPosition == "bottomRight") {
                    j$(arrow).addClass("formErrorArrowBottom")
                    j$(arrow).html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                }
                if (j$.validationEngine.settings.promptPosition == "topLeft" || j$.validationEngine.settings.promptPosition == "topRight") {
                    j$(divFormError).append(arrow);
                    j$(arrow).html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                }
            }
            j$(formErrorContent).html(promptText)

            callerTopPosition = j$(caller).offset().top;
            callerleftPosition = j$(caller).offset().left;
            callerWidth = j$(caller).width();
            inputHeight = j$(divFormError).height();

            /* POSITIONNING */
            if (j$.validationEngine.settings.promptPosition == "topRight") { callerleftPosition += callerWidth - 30; callerTopPosition += -inputHeight - 10; }
            if (j$.validationEngine.settings.promptPosition == "topLeft") { callerTopPosition += -inputHeight - 10; }

            if (j$.validationEngine.settings.promptPosition == "centerRight") { callerleftPosition += callerWidth + 13; }

            if (j$.validationEngine.settings.promptPosition == "bottomLeft") {
                callerHeight = j$(caller).height();
                callerleftPosition = callerleftPosition;
                callerTopPosition = callerTopPosition + callerHeight + 15;
            }
            if (j$.validationEngine.settings.promptPosition == "bottomRight") {
                callerHeight = j$(caller).height();
                callerleftPosition += callerWidth - 30;
                callerTopPosition += callerHeight + 15;
            }
            j$(divFormError).css({
                top: callerTopPosition,
                left: callerleftPosition,
                opacity: 0
            })
            return j$(divFormError).animate({ "opacity": 0.87 }, function () { return true; });
        },
        updatePromptText: function (caller, promptText, type, ajaxed) {	// UPDATE TEXT ERROR IF AN ERROR IS ALREADY DISPLAYED

            linkTofield = j$.validationEngine.linkTofield(caller);
            var updateThisPrompt = "." + linkTofield;

            if (type == "pass") { j$(updateThisPrompt).addClass("greenPopup") } else { j$(updateThisPrompt).removeClass("greenPopup") };
            if (type == "load") { j$(updateThisPrompt).addClass("blackPopup") } else { j$(updateThisPrompt).removeClass("blackPopup") };
            if (ajaxed) { j$(updateThisPrompt).addClass("ajaxed") } else { j$(updateThisPrompt).removeClass("ajaxed") };

            j$(updateThisPrompt).find(".formErrorContent").html(promptText);
            callerTopPosition = j$(caller).offset().top;
            inputHeight = j$(updateThisPrompt).height();

            if (j$.validationEngine.settings.promptPosition == "bottomLeft" || j$.validationEngine.settings.promptPosition == "bottomRight") {
                callerHeight = j$(caller).height();
                callerTopPosition = callerTopPosition + callerHeight + 15;
            }
            if (j$.validationEngine.settings.promptPosition == "centerRight") { callerleftPosition += callerWidth + 13; }
            if (j$.validationEngine.settings.promptPosition == "topLeft" || j$.validationEngine.settings.promptPosition == "topRight") {
                callerTopPosition = callerTopPosition - inputHeight - 10;
            }
            j$(updateThisPrompt).animate({ top: callerTopPosition });
        },
        linkTofield: function (caller) {
            linkTofield = j$(caller).attr("id") + "formError";
            linkTofield = linkTofield.replace(/\[/g, "");
            linkTofield = linkTofield.replace(/\]/g, "");
            return linkTofield;
        },
        closePrompt: function (caller, outside) {						// CLOSE PROMPT WHEN ERROR CORRECTED
            if (!j$.validationEngine.settings) {
                j$.validationEngine.defaultSetting()
            }
            if (outside) {
                j$(caller).fadeTo("fast", 0, function () {
                    j$(caller).remove();
                });
                return false;
            }
            if (!ajaxValidate) {
                linkTofield = j$.validationEngine.linkTofield(caller);
                closingPrompt = "." + linkTofield;
                j$(closingPrompt).fadeTo("fast", 0, function () {
                    j$(closingPrompt).remove();
                });
            }
        },
        debug: function (error) {
            if (!j$("#debugMode")[0]) {
                j$("body").append("<div id='debugMode'><div class='debugError'><strong>This is a debug mode, you got a problem with your form, it will try to help you, refresh when you think you nailed down the problem</strong></div></div>");
            }
            j$(".debugError").append("<div class='debugerror'>" + error + "</div>");
        },
        submitValidation: function (caller) {					// FORM SUBMIT VALIDATION LOOPING INLINE VALIDATION
            var stopForm = false;
            j$.validationEngine.ajaxValid = true;
            j$(caller).find(".formError").remove();
            var toValidateSize = j$(caller).find("[class*=validate]").size();

            j$(caller).find("[class*=validate]").each(function () {
                linkTofield = j$.validationEngine.linkTofield(this);

                if (!j$("." + linkTofield).hasClass("ajaxed")) {	// DO NOT UPDATE ALREADY AJAXED FIELDS (only happen if no normal errors, don't worry)
                    var validationPass = j$.validationEngine.loadValidation(this);
                    return (validationPass) ? stopForm = true : "";
                };
            });
            ajaxErrorLength = j$.validationEngine.ajaxValidArray.length; 	// LOOK IF SOME AJAX IS NOT VALIDATE
            for (x = 0; x < ajaxErrorLength; x++) {
                if (j$.validationEngine.ajaxValidArray[x][1] == false) {
                    j$.validationEngine.ajaxValid = false;
                }
            }
            if (stopForm || !j$.validationEngine.ajaxValid) {		// GET IF THERE IS AN ERROR OR NOT FROM THIS VALIDATION FUNCTIONS
                if (j$.validationEngine.settings.animateSubmit) {
                    destination = j$(".formError:not('.greenPopup'):first").offset().top;
                    j$(".formError:not('.greenPopup')").each(function () {
                        testDestination = j$(this).offset().top;
                        if (destination > testDestination) {
                            destination = j$(this).offset().top;
                        }
                    })
                    j$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 1100);
                }
                return true;
            } else {
                return false;
            }
        }
    }

})(jQuery);
