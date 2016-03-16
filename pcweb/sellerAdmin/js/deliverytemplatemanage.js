$m.load(['widget/layerbox'], function (LayerBox) {
    /**
       商家后台运费模板模块  cpx 2014年7月13日 
    **/
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });

    //绑定修改操作
    $(".modifyLogistic").click(function () {
        var val = $(this).attr("data-value") || "";
        var dataVal = val.split(';');
        if (loadTemplate(dataVal)) {
            InitDetailWnd(dataVal);
        }
    });

    $("#CreateDeliveryTemplate").click(function () {
        if (loadTemplate()) {
            InitDetailWnd();
        }
    });

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
            var isError = true;
            $("input[checktype='Standard']").each(function () {
                if ($(this).val() == "") {
                    alert("不能为空！")
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
                    alert("不能为空！")
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
                    if ("" + data.success == 'true') {
                        alert(data.message);
                        window.location.reload();
                    } else {
                        alert(data.message);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('修改运费模板失败,请联系客服。');
                }
            });
        });

    }

    //切换运费模板
    function switchRadio(tempVal) {
        var desc = tempVal === "0" ? "件" : "重";
        $("#StartFreightName").text("首" + desc + "运费：");
        $("#AddFreightName").text("续" + desc + "运费：");
    }

    //初始化
    //dataVal[0], dataVal[1], dataVal[7], dataVal[8], dataVal[3], dataVal[4], dataVal[5], dataVal[6]
    //templateId, templateDetailId, templateName, templateType, isUsa, startStandard, startFee, addStandard, addFee
    function InitDetailWnd(dataVal) {
        dataVal = dataVal || {};
        layerbox.alert("#logisticsTemplate");

        $("#TempLateName").val(dataVal[2] || "");
        $("#TemplateId").val(dataVal[0] || "");
        $("#TemplateDetailId").val(dataVal[1] || "");
        $("input[name='deliveryType']").attr("disabled", dataVal[7] ? true : false)
                .filter("[value=" + (dataVal[7] || 1) + "]").attr("checked", "true");
        $("#StartStandard").val(dataVal[3] || "");
        $("#StartFee").val(dataVal[4] || "");
        $("#AddStandard").val(dataVal[5] || "");
        $("#AddFee").val(dataVal[6] || "");

        switchRadio(dataVal[8]);
    }

    //check重量与件数
    function CheckStandard(t) {
        var tempVal = $(t).val();
        var reg = /^(0|([1-9]\d*))$/;
        if (!reg.test(tempVal)) {
            alert("输入格式不正确，必须输入大于0的整数");
            return false;
        }
        return true;
    }

    //check运费
    function CheckFee(t) {
        var tempVal = $(t).val();
        var regInt = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        if (!regInt.test(tempVal)) {
            alert("输入格式不正确");
            return false;
        }
        return true;
    }

    //check续重或续件运费
    function CheckAddFee() {
        var startFee = $("#StartFee").val();
        var addFee = $("#AddFee").val();
        var desc = $("input[name='spec']").val() === "0" ? "件" : "重";
        if (addFee > startFee) {
            alert("续" + desc + "运费必须小于或等于首" + desc + "运费");
            return false;
        }
        return true;
    }
});