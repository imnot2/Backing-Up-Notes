/**
* @autor river
* @email e23jiang@sina.com
* 商家后台订单详细
*
**/
$m.load(['widget/comfirm'], function (pop) {
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
+function () {
    'use strict';
    $(function () {
        remarksCtrl();
        modifyLogistics();
        refreshLogiInfo();
    });

    //备注操作
    function remarksCtrl() {
        //remarkCtrl
        var remarkCtrl = $(".remarkCtrl"),
            msg = remarkCtrl.find(".msg"),
            modifyCtrl = remarkCtrl.find(".modify"),
            addCtrl = remarkCtrl.find(".add"),
            saveCtrl = remarkCtrl.find(".save"),
            textarea = remarkCtrl.find("[name=remarks]");
        //add
        addCtrl.click(function () {
            msg.hide();
            $(this).hide()
            textarea.show();
            saveCtrl.css('display','inline-block');
        })
        //update
        modifyCtrl.click(function () {
            $(this).hide();
            textarea.val(msg.hide().text()).show();
            saveCtrl.css('display', 'inline-block');
        });
        //save
        saveCtrl.click(function () {
            var val = textarea.val();
            if (val.length == "") {
                errorAlert("备注不能为空。");
                return;
            }
            if (val.length > 500) {
                errorAlert("备注的字数不能超过500，请修改备注。");
                return;
            }
            msg.text(val).show();
            $(this).hide();
            textarea.hide();
            modifyCtrl.show();
            $.ajax({
                url: '/Order/SaveOrderNote',
                data: JSON.stringify({
                    OrderId: $("[name=OrderId]").val(),
                    Content: val
                }),
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        successAlert(data.msg)
                        //window.location.reload();
                    } else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Delivery_ChangeBillCodeFailure);
                }
            });
        })
    }
    //修改物流
    function modifyLogistics() {
        $(".logistics-no").click(function (e) {
            var target = e.target,
            $target = $(target),
            $this = $(this);

            if ($target.hasClass("modify")) {
                $target.hide().parent().find(".new-input").show().end().find(".text").hide();
            } else if ($target.hasClass("btn-confirm")) {
                var parent = $target.parent(),
                    input = parent.find("input"),
                val = input.val(),
                text = $this.find(".text"),
                    modify = $this.find(".modify");
                if (val == "") {
                    errorAlert(ResourceJS.Order_SellerOrderDetail_msg_BillCodeEmpty);
                    return;
                }
                var isXlobo = input.attr("data-isxlobo");
                var reg = /^([dD][bB]|[bB][bB])[0-9]{9}([uU][sS]|[cC][aA]|[uU][kK]|[dD][eE]|[jJ][pP]|[aA][uU]|[nN][zZ]|[fF][rR])$/;
                if (isXlobo === "True") {
                    if (!reg.test(val)) {
                        errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Delivery_BillCodeFormatError);
                        return
                    }
                }
                var defaulatVal = input[0].defaultValue;
                //var billCodeList = $("[name=billCode").map(function () {
                //    return this.value;
                //}).get().join("\r\n")
                text.html(val).show();
                modify.show();
                parent.hide();

                $.ajax({
                    url: '/OrderDetail/ChangeOrderDeliveryNumber',
                    data: JSON.stringify({
                        orderId: $("[name=OrderId]").val(),
                        //illCodeList: billCodeList
                        orginalBillCode: defaulatVal,
                        newBillCode: val
                    }),
                    type: "post",
                    async: true,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.result == '1') {
                            successAlert(data.msg, function () {
                                window.location.reload();
                            })                           
                        } else {
                            failureAlert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Delivery_ChangeBillCodeFailure);
                    }
                });

            }
        })
    }

    //刷新物流信息
    function refreshLogiInfo() {
        $(".refreshLogisticsInfo").click(function () {
            var orderId = $(this).attr("data-billCode");
            $.ajax({
                url: '/OrderDetail/GetLogisticsInfoList',
                data: JSON.stringify({
                    billCodeText: orderId
                }),
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        updateData(orderId, data.data);
                    } else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Logistics_RefreshLogisticsInfoFailure);
                }
            });
        })

        /**
        * @param orderId {String} 
        * @param data{object} 返回的运单信息
        * {"Success":1,"info":{"EmsCode":"","BillCode":"DB493204059US","BillStatusList":[{"timeStamp":"2014-07-08 22:18:44","description":"正发往贝海速递海外转运中心。
        * ","operatorName":"洋码头","actionName":"面单生成"}],"QuerySuccess":true,"Message":"","EmsStatusResult":null}}
        * 
        */
        function updateData(orderId, data) {
            var bill = data.BillStatusList,
                html = [];
            if ($.isArray(bill)) {
                for (var i = 0; i < bill.length; i++) {
                    html.push("<tr><td>" + bill[i]["timeStamp"] + "</td><td>" + bill[i]["operatorName"] + "</td><td>" + bill[i]["actionName"] + "</td><td>" + bill[i]["description"] + "</td></tr>");
                }
                $("#" + orderId).children().remove().end().append(html.join(""));
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Logistics_UpdateInfoSuccess);
            }
        }
    }

}();
})