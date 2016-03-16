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

    ShowVerfiedPop();
    ShowRejectPop();

    function ShowVerfiedPop() {
        try{
            if (userStatus == 2 && registNote == 0) {
                layerbox.alert("#AuditActiveSuccess");
            }
        } catch (e) {
            
        }
    }

    function ShowRejectPop() {
        try{
            if (auditStatus == 1) {
                $("#auditRejectExplan").empty();
                $("#auditRejectExplan").append(rejectExplan);
                $("#auditReject").show();
                layerbox.alert("#rejectError");
            }
        } catch (e) {
            
        }
    }

   

    $('.btnActivation').click(function() {
        var validateCode = $('#txtValidateCode').val();
        var postData = JSON.stringify({ 'validateCode': validateCode });
        $.ajax({
            url: "/SellerCenter/SellerValidateCode",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if (data.result == 200 || data.result == 201) {
                    if (data.result == 200) {
                        layerbox.alert('#ActiveSuccess');
                        $('#activationCode').hide();
                        $('#activationSuccess').show();
                    } else {
                        $('#activationCode').hide();
                        $('.audit-title').hide();
                        layerbox.alert('#ActiveAuditSuccess');
                    }
                    
                } else {
                    $('#activationErrorMessage').empty();
                    $('#activationErrorMessage').append(data.message);
                    //alert(data.message);
                    $('#activationError').show();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    });

    $('.btnPublishProduct').click(function() {
        var userId = $('#txtboxUserId').val();
        var postData = JSON.stringify({ 'userId': userId });
        $.ajax({
            url: "/SellerCenter/UpdateRegistNote",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 200) {
                    location.href = "/publishproduct/step1";
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(textStatus);
            }
        });
    });





    //global
    $(".btnSuccess").click(function () {
        layerbox.close();
        window.location.reload();
    });


});