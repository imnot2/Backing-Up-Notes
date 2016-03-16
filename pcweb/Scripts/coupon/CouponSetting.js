/*=======================CouponSetting.js===========================*/
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}
function checkNumeric(text) {
    var reg = /^([0-9]{1,8}\.\d{1,2})|([1-9][0-9]{0,8})$/;
    if (!reg.test(text))
        return false;
    else
        return true;
}

function checkNumer(text) {
    var reg = /^[1-9][0-9]{0,8}$/;
    if (!reg.test(text))
        return false;
    else
        return true;
}

function tempSaveData() {
    
    var valueType = $(".use_type input[name=type]:checked").val();
    var orderValue = new Array();
    var couponValue = new Array();
    var valueUseType = "1";
    if (valueType == "common") {
        orderValue.push($("#common_coupon input[name=orderValue]").val());
        couponValue.push($("#common_coupon input[name=couponValue]").val());
        valueUseType = $("#common_coupon input[name=useType]:checked").val();
    }
    else {
        $("#multi_coupon input[name=orderValue]").each(function () {
            orderValue.push($(this).val());
        });

        $("#multi_coupon input[name=couponValue]").each(function () {
            couponValue.push($(this).val());
        });

        valueUseType = $("#multi_coupon input[name=useType]:checked").val();
    }

    var usedTimes = $("input[name=maxUseTime]").val();
    var startTime = $("input[name=validStart]").val();
    var endTime = $("input[name=validEnd]").val();
    var userType = $("input[name=userType][type=radio]:checked").val();
    var userLevel = $("#userLevel").val();
    var activityId = $("#activityId").val();

    var data = {
        ValueType: valueType,
        OrderValues: orderValue,
        CouponValues: couponValue,
        UsedTimes: usedTimes,
        TimeStart: startTime,
        TimeEnd: endTime,
        ValueUseType: valueUseType,
        UserType: userType,
        UserLevel: userLevel,
        ActivityId: activityId
    };

    $.ajax({
        url: "/Admin/CouponManage/SaveCouponSetting",
        dataType: "json",
        type: "post",
        data: $.toJSON(data),
        async: false,
        success: function () {
            window.location.href = "/Admin/CouponManage/SetCouponScenario";
        }
    });

}

function setData(data) {

    $(".use_type input[name=type][value=" + data.ValueType + "]").attr("checked", "checked");

    if (data.ValueType == "common") {

        $("#common_coupon input[name=orderValue]").attr("value", data.OrderValues[0]);
        $("#common_coupon input[name=couponValue]").attr("value", data.CouponValues[0]);
        $("#common_coupon input[name=useType][value=" + data.ValueUseType + "]").attr("checked", "checked");
    }
    else {
        //$("#common_coupon input[name=useType][value=multiple]").attr("checked", "checked");
        $("#multi_coupon input").removeAttr("disabled");
        $("#multi_coupon").css("display", "block");
        $("#common_coupon input").attr("disabled", "disabled");
        $("#common_coupon").css("display", "none");

        //清空原来的一行
        $("#mutil_table tr").eq(2).remove();

        var valueHtml = '<tr><td>&nbsp;订单满:&nbsp;<input type="text" name="orderValue" value="{0}" /></td><td><input type="text" name="couponValue" value="{1}" />元<span><a href="javascript:void(0)">X</a></span>&nbsp;</td></tr>';
        for (var i = 0; i < data.CouponValues.length; i++) {
            $("#mutil_table").append(valueHtml.format(data.OrderValues[i], data.CouponValues[i]));
        }
        $("#multi_coupon input[name=useType][value=" + data.ValueUseType + "]").attr("checked", "checked");
    }

    $("input[name=validStart]").attr("value", data.TimeStart);
    $("input[name=validEnd]").attr("value", data.TimeEnd);
    $("input[name=maxUseTime]").attr("value", data.UsedTimes);
    $("input[name=userType][type=radio][value=" + data.UserType + "]").attr("checked", "checked");
    $("#activityId").attr("value", data.ActivityId);
    $("#userLevel").attr("value", data.UserLevel);
}


$(function () {
    $("#addCondition").bind("click", function () {
        var trhtml = '<tr><td>&nbsp;订单满:&nbsp;<input type="text" name="orderValue" /></td><td><input type="text" name="couponValue" />元<span><a href="javascript:void(0)">X</a></span>&nbsp;</td></tr>';
        $("#mutil_table").append(trhtml);
    });

    $("#mutil_table span").live("click", function () {
        $(this).closest("tr").remove();
    });

    $(".use_type input[name=type]").bind("click", function () {

        //普通优惠券
        if (this.value == 'common') {
            $("#common_coupon").css("display", "block");
            $("#multi_coupon").css("display", "none");

            $("#multi_coupon input").attr("disabled", "disabled");
            $("#common_coupon input").removeAttr("disabled");

            $(".common_type_value input[value=1][type=radio]").attr("checked", "checked");
        }
        //多级优惠券
        else {
            $("#common_coupon").css("display", "none");
            $("#multi_coupon").css("display", "block");

            $("#common_coupon input").attr("disabled", "disabled");
            $("#multi_coupon input").removeAttr("disabled");            

            $(".mutil_type input[value=1][type=radio]").attr("checked", "checked");
        }
    });

    ////设置用户适用类型
    //if ($("#coupontUserType").val() == null) {

    //    //前面阶段没有设置用户类型
    //    $("#userType input").removeAttr("disabled");
    //    $("#userType input[value=0]").attr("checked", "checked");
    //}
    //else {
    //    //按已存在的类型自动选择

    //    var userTypeValue = $("#coupontUserType").val();
    //    $("#userType input[value=" + userTypeValue + "]").attr("checked", "checked");

    //    //设定不可用
    //    $("#userType input").attr("disabled", "disabled");
    //}

    $("#set_scenario").bind("click", function () {
        tempSaveData();

    });

    $("#btn_submit").bind("click", function () {

        //检测数据有效性

        var valueType = $(".use_type input[name=type]:checked").val();
        if (valueType == "common") {
            //普通优惠券
            var value = $(".common_type input[name=couponValue]").val();
            if (!checkNumeric(value)) {
                displayMsg("检测面值出错");
                return false;
            }

            var coupon = $(".common_type input[name=orderValue]").val();
            if (!checkNumeric(coupon)) {
                displayMsg("检测使用条件出错");
                return false;
            }
        }
        else {
            //多级优惠券
            $(".mutil_type input[name=couponValue]").each(function () {
                var value = this.value;
                if (!checkNumeric(value)) {
                    displayMsg("检测金额出错");
                    return false;
                }
            });

            $(".mutil_type input[name=orderValue]").each(function () {
                var value = this.value;
                if (!checkNumeric(value)) {
                    displayMsg("检测多级使用条件出错");
                    return false;
                }
            });
        }

        var maxUseTime = $("input[name=maxUseTime]").val();
        if (!checkNumer(maxUseTime)) {
            displayMsg("检测使用次数出错");
            return false;
        }

        var validStart = $("input[name=validStart]").val();
        var validEnd = $("input[name=validEnd]").val();
        if (validStart == "" || validEnd == "" || validEnd < validStart) {
            displayMsg("检测有效期出错");
            
            return false;
        }

        //获取选择的使用平台
        var platforms = "";
        if ($("input[type=radio][name=platform]:checked").val() == "2") {
            $("input[type=checkbox][name=chkUsePlatform]:checked").each(function() {
                platforms += $(this).val() + ",";
            });
            if (platforms == "") {
                alert("您未选择优惠券的使用平台，请选定后再提交！");
                return false;
            }
        }

        $("#usePlatform").val(platforms);

        $("#create_coupon_form").submit();
        //displayMsg("提交成功");
        return true;

    });

    $("#validStart").datepicker({
        dateFormat: 'yy/mm/dd',
        yearRange: '2001:2099',
        showOtherMonths: true,
        showWeeks: true,
        clearText: 'clear',
        closeText: 'close',
        prevText: 'prev',
        nextText: 'next',
        currentText: ' ',
        //minDate: "+1D",
        //maxDate: "D",
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        changeFirstDay: false
    });

    $("#validEnd").datepicker({
        dateFormat: 'yy/mm/dd',
        yearRange: '2001:2099',
        showOtherMonths: true,
        showWeeks: true,
        clearText: 'clear',
        closeText: 'close',
        prevText: 'prev',
        nextText: 'next',
        currentText: ' ',
        //minDate: "+1D",
        //maxDate: "D",
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        changeFirstDay: false
    });


    function displayMsg(msg) {
        $(".error_msg").text(msg);
    }

});



