define(function (require, exports, module) {
    //教程显示
    var IsShowCourse2 = !1;
    var layerboxModule = require("widget/layerbox");
    var layerbox = layerboxModule("struc", {
        backcolor: "#000",
        opacity:0.7,
        close: ".closehandle",
        closeCallback: function () {
            var src = $('#BillCourseImg').val();
            var clientHeight = $(document.body).outerHeight()
            if (!IsShowCourse2) {
                $(document.body).append('<div class="billcoursefloatbox" id="billcourse-2" style="height:' + Math.floor(clientHeight) + 'px"><div class="bd"><img src="' + src + '" /><div class="closebill"></div></div>').show();
            }
            $("#billcourse-2").show()
        }
    })

    $('.closebill').live('click', function () {
        $("#billcourse-2").hide()
    })

    $('#NewAction').bind('click', function () {
        layerbox.alert("#billcourse")
    })

    if (!IsShowCourse) {
        layerbox.alert("#billcourse")
    }

    //$("#Remark").dialog({
    //    autoOpen: false,
    //    height: 100,
    //    width: 478,
    //    modal: true,
    //    close: function () {
    //    }
    //});
    $(".OrderRemark").click(function () {
        $("#Remark").html($(this).next().html());
        layerbox("#Remark");
    });
    $("#queryText").focus(function () {
        if ($(this).val() == "输入运单号、订单号、收件人") {
            $(this).val("");
        }
    });
    $("#queryText").blur(function () {
        if ($(this).val() == "") {
            $(this).val("输入运单号、订单号、收件人");
        }
    });
    $("#queryBtn").click(function () {
        if ($("#queryText").val() != "输入运单号、订单号、收件人") {
            location.href = "/querybills?w=" + $("#queryText").val();
        }
    });
    $("#orderQueryDataBtn").click(function () {
        if ($("#orderStartTime").val() == "" || $("#orderStartTime").val() == "") {
            alert("请选择日期");
        }
        else {
            location.href = "/querydatabills?s=" + $("#orderStartTime").val() + "&e=" + $("#orderEndTime").val();
        }
    });

    $("#cardQueryDataBtn").click(function () {
        if ($("#cardStartTime").val() == "" || $("#cardStartTime").val() == "") {
            alert("请选择日期");
        }
        else {
            location.href = "/querydatabillsByCard?s=" + $("#cardStartTime").val() + "&e=" + $("#cardEndTime").val();
        }
    });



    $("#orderStartTime").datepicker();
    $("#orderEndTime").datepicker();
    $("#cardStartTime").datepicker();
    $("#cardEndTime").datepicker();

    $(".delBillSelfBtn").click(function () {
        alert("删除运单后将退回已支付的物流运费！");
        $.ajax({
            url: "/logistics/deletebillself?bid=" + $(this).next().val(),
            dataType: "json",
            success: function (data) {
                alert(data.m);
                window.location.reload();
            }
        });
    });

    $("#CheckAllBill").click(function () {
        $(".OneBillCheck:enabled").attr('checked', $(this).attr('checked'));
    });

    $('#PayFee').click(function () {
        if ($('input.OneBillCheck.NeedNotPay:checked').length > 0) {
            var billCodes = "";
            $('input.OneBillCheck.NeedNotPay:checked').each(function () {
                billCodes += $(this).val() + "\n";
            });
            alert('以下运单号的运单目前不需要补款：\n' + billCodes);
            return false;
        }
        var count = $('input.OneBillCheck.NeedPay:checked').length;
        if (count > 0) {
            if (confirm("是否确认批量补款？")) {
                var billCodes = "";
                $('input.OneBillCheck.NeedPay:checked').each(function () {
                    billCodes += $(this).val() + ",";
                });
                $.post("/logistics/PayCharge4Bills",
                $.toJSON({ 'bcs': billCodes }),
                function (m) {
                    if (isNaN(m)) {
                        alert(m);
                    }
                    else {
                        alert("您已成功完成" + m + "笔运单的" + $('#HiddenPayText').val() + "补款");
                    }
                    location.reload();
                });
            }
        }
        else {
            alert('请选择需要补款的运单');
        }
    });

    $('#PayTaxFee').click(function () {
        if ($('input.OneBillCheck.NeedNotPay:checked').length > 0) {
            var billCodes = "";
            $('input.OneBillCheck.NeedNotPay:checked').each(function () {
                billCodes += $(this).val() + "\n";
            });
            alert('以下运单号的运单目前不需要补款：\n' + billCodes);
            return false;
        }
        var count = $('input.OneBillCheck.NeedPay:checked').length;
        if (count > 0) {
            if (confirm("是否确认批量补款？")) {
                var billCodes = "";
                $('input.OneBillCheck.NeedPay:checked').each(function () {
                    billCodes += $(this).val() + ",";
                });
                $.post("/logistics/PayTaxCharge4Bills",
                $.toJSON({ 'bcs': billCodes }),
                function (m) {
                    if (isNaN(m)) {
                        alert(m);
                    }
                    else {
                        alert("您已成功完成" + m + "笔运单的" + $('#HiddenPayText').val() + "补款");
                    }
                    location.reload();
                });
            }
        }
        else {
            alert('请选择需要补款的运单');
        }
    });
    
    $('#PayOtherFee').click(function () {
        if ($('input.OneBillCheck.NeedNotPay:checked').length > 0) {
            var billCodes = "";
            $('input.OneBillCheck.NeedNotPay:checked').each(function () {
                billCodes += $(this).val() + "\n";
            });
            alert('以下运单号的运单目前不需要补款：\n' + billCodes);
            return false;
        }
        var count = $('input.OneBillCheck.NeedPay:checked').length;
        if (count > 0) {
            if (confirm("是否确认批量补款？")) {
                var billCodes = "";
                $('input.OneBillCheck.NeedPay:checked').each(function () {
                    billCodes += $(this).val() + ",";
                });
                $.post("/logistics/PayOtherCharge4Bills",
                $.toJSON({ 'bcs': billCodes }),
                function (m) {
                    if (isNaN(m)) {
                        alert(m);
                    }
                    else {
                        alert("您已成功完成" + m + "笔运单的" + $('#HiddenPayText').val() + "补款");
                    }
                    location.reload();
                });
            }
        }
        else {
            alert('请选择需要补款的运单');
        }
    });

    var layerbox2 = layerboxModule("struc", {
        backcolor: "#000",
        close: ".closehandle"
    })
    $("#GetBills").click(function () {
        if ($('input.OneBillCheck.CanNotDownLoad:checked').length > 0) {
            var billCodes = "";
            $('input.OneBillCheck.CanNotDownLoad:checked').each(function () {
                billCodes += $(this).val() + "\n";
            });
            alert('需要补款的运单和转运单不能下载。\n以下运单号的运单不能下载：\n' + billCodes);
            return false;
        }

        if ($('input.OneBillCheck.CanDownLoad:checked').length > 0) {
            layerbox2.alert("#DealingDiv")
            var billCodes = "";
            $('input.OneBillCheck.CanDownLoad:checked').each(function () {
                billCodes += $(this).val() + ",";
            });
            //                    $("#downLoaded").val("1");
            var iframe = document.getElementById("printBillsFrame");
            iframe.src = "/logistics/printbills?bcs=" + billCodes;
            setTimeout(function () { layerbox2.close() }, 2000);
        }
        else {
            alert("请选择可以下载的运单。");
        }
    });
    $("#UnDownLoaded").click(function () {
        var downLoaded = $("#UnDownLoaded").attr("checked");
        if (downLoaded) {
            location.href = location.href.indexOf("?") > -1 ? location.href + "&d=0" : location.href + "?d=0";
        }
        else {
            location.href = location.href.replace("&d=1", "").replace("?d=0", "");
        }
    });
})