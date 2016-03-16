$m.load(['widget/layerbox', 'ui/json', 'widget/comfirm'], function (LayerBox, JSON, pop) {
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });

    var errorAlert = function (msg, title) {
        if (title == void 0) {
            pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, msg, "error");
        } else {
            pop.alertPop(title, msg, "error");
        }
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


    /**
      *
      * 运单删除申请
      *
      **/
    $(".DeleteApply").click(function () {
        var billId = $(this).attr("billId");
        $("#dr").val("");
        $("#bid").val(billId);
        layerbox.alert("#wndDelete");
    });

    /**
    *
    * 运单删除申请提交
    *
    **/
    $(".btnDeleteOrderApply").click(function () {
        var billId = $("#bid").val();
        var deleteReason = $("#dr").val();
        var postData = JSON.stringify({
            'bid': billId,
            'dr': deleteReason
        });
        $.ajax({
            url: "/Bills/DeleteBillApply",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    successAlert(data.message);
                } else {
                    layerbox.close();
                    window.location.reload();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /**
    *
    * 删除2天内新生成的运单
    *
    **/
    $(".DeleteSelf").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#deleteBillSelf");
    });

    /*
    *
    * 确认删除运单
    *
    */
    $(".btnDeleteBillSelf").click(function () {
        //alert($("#bid").val());
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/DeleteBillSelf",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    successAlert(data.message);
                } else {
                    layerbox.close();
                    window.location.href = "/Bills/BillsManage_All";
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /*
    *
    * 运费补款
    *
    */
    $(".NeedToFreight").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#needToFreight");
    });

    /*
    *
    * 确认运费补款
    *
    */
    $(".btnNeedToFreight").click(function () {
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/PayWeightChargeToBill",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    window.location.reload();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /*
    *
    * 缴税补款
    *
    */
    $(".NeedToTxt").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#needToTxt");
    });

    /*
    *
    * 确认缴税补款
    *
    */
    $(".btnNeedToTxt").click(function () {
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/PayTxtChargeToBill",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    window.location.reload();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /*
    *
    * 其他补款
    *
    */
    $(".NeedToOther").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#needToOther");
    });

    /*
    *
    * 确认其他补款
    *
    */
    $(".btnNeedToOther").click(function () {
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/PayOtherChargeToBill",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    $(".successMessageInfo").empty();
                    $(".successMessageInfo").append(data.message);
                    layerbox.alert("#successMessage");

                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });










    //global
    $(".btnSuccess").click(function () {
        layerbox.close();
        window.location.reload();
    });

})