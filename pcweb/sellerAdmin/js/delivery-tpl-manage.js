$m.load(['widget/layerbox', 'widget/comfirm'], function (LayerBox,pop) {
    /**
       商家后台运费模板模块  cpx 2014年7月13日 
    **/
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });

    var errorAlert = function (msg) {
        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, msg, "error");
    }
    var successAlert = function (msg, fn) {
        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Success, msg, "success", fn);
    }
    var failureAlert = function (msg) {
        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Failure, msg, "warning");
    }
    var comfirmAlert = function (title, msg, fn) {
        pop.comfirmPop(title, msg, 'error', { comfirm: ResourceJS.SellerOrder_Common_Alert_msg_Confirm, cancel: ResourceJS.SellerOrder_Common_Alert_msg_Cancel }, fn);
    }


    //绑定修改操作
    $(".modifyLogistic").click(function () {
        //清空错误
        clearError()
        var val = $(this).attr("data-value") || "";
        var dataVal = val.split(';');
        if (loadTemplate(dataVal)) {
            InitDetailWnd(dataVal);
        }
    });

    $("#CreateDeliveryTemplate").click(function () {
        clearError()
        if (loadTemplate()) {
            InitDetailWnd();
        }
    });

    DeleteData();

    //加载模板
    function loadTemplate(dataVal) {
        if ($("#logisticsTemplate")[0])
            return true;
        var href = "/Logistics/ShowTemplateDetail";
        $("#DeliveryItemWnd").load(href, function () {
            InitDetailWnd(dataVal);
            BindAllEvents();
        });

    }

    //绑定所有事件
    function BindAllEvents() {
        //radio切换
        $("input[name='deliveryType']").change(function () {
            switchRadio($(this).val());
        });

        //运费模板修改
        $("#SaveDeliveryInfo").click(function () {
            clearError()
            var isError = true;
            $("input[checktype='Standard']").each(function () {
                if ($(this).val() == "") {
                    ariseDelivery($(this), ResourceJS.Logistics_DeliveryTemplate_jsmsg_CannotEmpty)
                    //alert(ResourceJS.Logistics_DeliveryTemplate_jsmsg_CannotEmpty);
                    return isError = !1;
                }
                if (!(isError = CheckStandard(this))) {
                    return isError;
                }

            })
            if (!isError)
                return;
            $("input[checktype='Fee']").each(function () {
                if ($(this).val() == "") {
                    ariseDelivery($(this), ResourceJS.Logistics_DeliveryTemplate_jsmsg_CannotEmpty)
                    //alert(ResourceJS.Logistics_DeliveryTemplate_jsmsg_CannotEmpty);
                    return isError = !1;
                }
                if (!(isError = CheckFee(this))) {
                    return isError;
                }

            })
            if (!isError)
                return;

            if (!CheckAddFee())
                return;

            $.ajax({
                url: ' /Logistics/SaveDeliveryTemplate',
                data: JSON.stringify({
                    tempLateName: $("#TempLateName").val(),
                    templateId: $("#TemplateId").val(),
                    templateDetailId: $("#TemplateDetailId").val(),
                    deliveryType: $("input[name='deliveryType']:checked").val(),
                    startStandard: $("#StartStandard").val(),
                    startFee: $("#StartFee").val(),
                    addStandard: $("#AddStandard").val(),
                    addFee: $("#AddFee").val()
                }),
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        layerbox.close();
                        successAlert(data.msg, function () {
                            window.location.reload();
                        })
                    } else {
                        layerbox.close();
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Logistics_DeliveryTemplate_jsmsg_EditFailure);
                }
            });
        });

    }

    //切换运费模板
    function switchRadio(tempVal) {
        switch (tempVal) {
            case "0":
                $("#StartFreightName").text(ResourceJS.Logistics_DeliveryTemplateList_label_StartPieceFee);
                $("#AddFreightName").text(ResourceJS.Logistics_DeliveryTemplateList_label_AddPieceFee);
                $(".unit").text(ResourceJS.Logistics_DeliveryTemplateList_label_Piece);
                break;
            case "1":
                $("#StartFreightName").text(ResourceJS.Logistics_DeliveryTemplateList_label_StartWeightFee);
                $("#AddFreightName").text(ResourceJS.Logistics_DeliveryTemplateList_label_AddWeightFee);
                $(".unit").text($("#weightUnitName").val());
                break;
        }
    }

    //初始化
    //dataVal[0], dataVal[1], dataVal[7], dataVal[8], dataVal[3], dataVal[4], dataVal[5], dataVal[6]
    //templateId, templateDetailId, templateName, templateType, isUsa, startStandard, startFee, addStandard, addFee
    function InitDetailWnd(dataVal) {
        layerbox.alert("#logisticsTemplate");
        if (dataVal != void 0) {
            $(".pop-title span").text(ResourceJS.Logistics_LogisticsDetail_label_EditFreightTemplate);
            switchRadio(dataVal[7]);
        } else {
            $(".pop-title span").text(ResourceJS.Logistics_LogisticsDetail_label_CreateFreightTemplate);
            $(".unit").text($("#weightUnitName").val());
        }
        dataVal = dataVal || {};
        $("#TempLateName").val(dataVal[2] || "");
        $("#TemplateId").val(dataVal[0] || "");
        $("#TemplateDetailId").val(dataVal[1] || "");
        $("input[name='deliveryType']").attr("disabled", dataVal[7] ? true : false)
                .filter("[value=" + (dataVal[7] || 1) + "]").attr("checked", "true");
        $("#StartStandard").val(dataVal[3] || "");
        $("#StartFee").val(dataVal[4] || "");
        $("#AddStandard").val(dataVal[5] || "");
        $("#AddFee").val(dataVal[6] || "");
    }

    //check重量与件数
    function CheckStandard(t) {
        var tempVal = $(t).val();
        var reg = /^(([1-9]\d*))$/;
        if (!reg.test(tempVal)) {
            ariseDelivery($(t), ResourceJS.Logistics_DeliveryTemplate_jsmsg_BiggerThanZero)
            //alert(ResourceJS.Logistics_DeliveryTemplate_jsmsg_BiggerThanZero);
            return false;
        }
        return true;
    }

    //check运费
    function CheckFee(t) {
        var tempVal = $(t).val();
        var regInt = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        if (!regInt.test(tempVal)) {
            ariseDelivery($(t), ResourceJS.Logistics_DeliveryTemplate_jsmsg_BiggerThanZero)
            //alert(ResourceJS.Logistics_DeliveryTemplate_jsmsg_FormatError);
            return false;
        }
        return true;
    }

    //check续重或续件运费
    function CheckAddFee() {
        var startFee = parseFloat($("#StartFee").val());
        var addFee = parseFloat($("#AddFee").val());
        var desc = $("input[name='spec']").val() === "0" ? "件" : "重";
        if (addFee > startFee) {
            var msg = desc == "件" ? ResourceJS.Logistics_DeliveryTemplate_jsmsg_PieceCheckError : ResourceJS.Logistics_DeliveryTemplate_jsmsg_WeightCheckError;
            ariseDelivery($("#StartFee").add($("#AddFee")), msg);
            return false;
        }
        return true;
    }

    //删除运费模板
    function DeleteData() {
        $("a[name='delTemplate']").click(function () {
            var tempId = $(this).attr("temp-Id");
            $.ajax({
                url: '/Logistics/DeleteTemplate',
                data: JSON.stringify({
                    templateId: tempId
                }),
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        successAlert(data.msg, function () {
                            window.location.reload();
                        })
                    } else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Logistics_RefreshLogisticsInfoFailure);
                }
            });
        });
    }

    /*
    * @name显示错误
    * @param errInput{element} 错误的输入框
    * @param errText {element} 错误的信息
    * @param msg {string} 错误信息
    */
    var ariseErr = function (errInput, errText, msg) {
        msg = msg || "";
        errText.text(msg);
        errInput[msg ? "addClass" : "removeClass"]("error");
        errText.parent()[msg ? "show" : "hide"]();
    };
    //清空错误
    var clearError = function () {
        ariseDelivery($(":input"), "")
    }

    var ariseDelivery = function (errInput, msg) {
        var errText = $("#error-text");
        ariseErr(errInput, errText, msg)
    }


});