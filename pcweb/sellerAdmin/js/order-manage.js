$m.load(['widget/layerbox', 'ui/json', 'widget/comfirm'],
    function (LayerBox, JSON, pop) {

    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });


    var layerboxtwolevel = LayerBox('struc', {
        close: '.J-close'
    });

    /*

    */
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
    var failureAlert = function (msg, title) {
        if (title == void 0) {
            pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Failure, msg, "warning");
        } else {
            pop.alertPop(title, msg, "warning");
        }
        
    }
    var successComfirm = function (msg, title) {
        pop.alertPop(title, msg, "success");
    }
        var comfirmAlert = function (title, msg, fn) {
        pop.comfirmPop(title, msg, 'error', { comfirm: ResourceJS.SellerOrder_Common_Alert_msg_Confirm, cancel: ResourceJS.SellerOrder_Common_Alert_msg_Cancel }, fn);
    }
    //inputhover('[name="oskey"]', {
    //    defaultValue: 'Search for OrderID, Buyer name, Product name'
    //});

    //inputhover('[name="st"]', {
    //    defaultValue: 'Start date'
    //})

    //inputhover('[name="et"]', {
    //    defaultValue: 'End date'
    //})

    //layerbox.alert('#wndCancelOrder')
    //layerbox.close();

    CancelOrder();
    CancelOrderSingle();
    EditPrice();
    BatchAcceptOrder();
    BatchDelayReceiveDate();
    DelayOrder();
    Delivery();
    ChangeAddress();
    Refund();
    Evaluate();
    AcceptSingleOrder();
    AcceptSingleOrderDetail();
    bindCacelOrder();
    bindRemark();
    unPostPay();
    MergeBatchDelivery();
    BatchBillDelivery();
    BatchDelivery();
    revokePostPay();
    BatchApplyPostpay();
    EditPostpayInfo();
    SaveBatchApplyPostpayInfo();
    textflow(".textflow-title", { row: 2 });
    if ($.datepicker) {
        $.datepicker.regional['zh-CN'] =
              {
                  clearText: '清除', clearStatus: '清除已选日期',
                  closeText: '关闭', closeStatus: '不改变当前选择',
                  prevText: '<上月', prevStatus: '显示上月',
                  nextText: '下月>', nextStatus: '显示下月',
                  currentText: '今天', currentStatus: '显示本月',
                  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'],
                  monthNamesShort: ['一', '二', '三', '四', '五', '六',
                    '七', '八', '九', '十', '十一', '十二'],
                  monthStatus: '选择月份', yearStatus: '选择年份',
                  weekHeader: '周', weekStatus: '年内周次',
                  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                  dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                  dayStatus: '设置 DD 为一周起始', dateStatus: '选择 m月 d日, DD',
                  dateFormat: 'yy-mm-dd', firstDay: 1,
                  initStatus: '请选择日期', isRTL: false
              }
        var culture = ResourceJS.CurrentLanguage || "";
        if (culture !== "" && culture.toLocaleLowerCase() === "zh-cn")
            $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
        $("[name=st]").datepicker();
        $("[name=et]").datepicker();
    }

    //绑定弹窗功能
    $("a[plugin=pop]").each(function () {
        var $this = $(this),
            href = $this.attr("href");
        $this.click(function (e) {
            e.preventDefault();
            layerbox.alert(href);
        });
    });

    allSelect($("[name=selAll]"), "no");
    /**
    * @name全选事件
    * @param ctrlEle     {element} 控制对象
    * @param checkBoxName {string} checkBox name 值 
    * @param isReverse {Boolen} 是否反选 默认：false
    */
    function allSelect(ctrlEle, checkBoxName, reverse) {
        ctrlEle.live("click", function () {
            var checked = this.checked & !reverse;
            ctrlEle.attr("checked", checked);
            $("[name=" + checkBoxName + "]").attr("checked", checked);
        });
    }

    //无需补款   
    function unPostPay() {
        $("a[name='UnPostPay']").click(function () {
            var orderIdVal = $(this).attr("data-orderid");
            
            var postdata = JSON.stringify({ 'orderId': orderIdVal });
            $("#orderId").val(orderIdVal);
            comfirmAlert(ResourceJS.Order_OrderList_OrderList_lbl_NoPostPay, ResourceJS.SellerOrder_SellerOrderList_Msg_UnPostPay, function () {
                $.ajax({
                    url: '/Order/SellerSkipPostpay',
                    data: postdata,
                    type: "post",
                    async: true,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.result == '1') {
                                successAlert(data.msg, function () {
                            window.location.reload();
                                })
                        }
                        else {
                                failureAlert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                            errorAlert(ResourceJS.SellerOrder_SellerOrderList_Msg_UnPostPay_Failure);
                    }
                });
            })
            })

    }

    //取消补款
    function revokePostPay() {
        $("a[name='RevokePostpay']").click(function () {
            var orderIdVal = $(this).attr("data-OrderId");
            var postdata = JSON.stringify({ 'orderId': orderIdVal });
            //if (confirm(ResourceJS.Order_SellerOrder_SellerOrderList_Msg_RevokePostpay)) {
            comfirmAlert(ResourceJS.Order_SellerOrder_SellerOrderList_button_RevokePostpay, ResourceJS.Order_SellerOrder_SellerOrderList_Msg_RevokePostpay, function () {
                $.ajax({
                    url: '/Order/SellerCancelPostpay',
                    data: postdata,
                    type: "post",
                    async: true,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.result == '1') {
    
                            //layerbox.close();
                            successAlert(data.msg, function () {
                            window.location.reload();
                            });
                            
                        } else {
                            failureAlert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        errorAlert(ResourceJS.SellerOrder_SellerOrderList_Msg_UnPostPay_Failure);
                    }
                });
        });
        });
    }

    //绑定备注
    function bindRemark() {
        $('#btnRemarksComfirm').hide();
        $('.c-table .note').each(function () {
            var $this = $(this),
                _text = $this.text();
            if (_text !== "" && _text !== null) {
                    $this.prev().find('.addRemarks').attr('title', _text);
            }
        })
        $(".addRemarks").click(function () {
            var remarks = $("[name=remarks]");
            ariseErr(remarks, remarks.next().find(".error-text"), "");
            var $this = $(this);
            var orderIdVal = $this.attr("data-OrderId");
            $("#orderId").val(orderIdVal);
            var hadNote = $this.attr("hadNote"),
                note = $this.parents("tr").find(".note");
            $("[name=remarks]").val(note.text());
            $("#btnRemarks").data("ymt.addRemarks", $(this)).data("ymt.note", note);
            // if (note.text() !== null && note.text() !== "") {
            //     $('.ly-pl-20').hide();
            //     $('.view-remarks').text(note.text());
            //     $("#btnRemarks").hide();
            //     $("#btnRemarksComfirm").show();
            // } else {
            //     $('.ly-pl-20').show();
            //     $('.view-remarks').text('');
            //     $("#btnRemarks").show();
            //     $("#btnRemarksComfirm").hide();
            // }
        });
        // $("#btnRemarksComfirm").click(function () {
        //     layerbox.close();
        // })
        //保存
        $("#btnRemarks").click(function () {
            var remarks = $("[name=remarks]");
            var Content = remarks.val(),
                UserId = "",
                OrderId = $("#orderId").val();
            if (Content == "") {
                ariseErr(remarks, remarks.next().find(".error-text"), ResourceJS.Order_SellerOrderList_Remark_CheckRemarkNotEmpty);
                return;
            }
            if (Content.length > 500) {
                ariseErr(remarks, remarks.next().find(".error-text"), ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_CheckRemarkLength);
                //alert(ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_CheckRemarkLength);
                return;
            }
            var data = {
                Content: Content,
                UserId: UserId,
                OrderId: OrderId
            }
            $.ajax({
                url: '/Order/SaveOrderNote',
                data: JSON.stringify(data),
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        layerbox.close();
                        successAlert(data.msg, function () {
                            //$("#btnRemarks").data("ymt.addRemarks").text(ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_ShowRemark)
                            $("#btnRemarks").data("ymt.addRemarks").html("<i class='order-icon order-remarks-view'></i>"+ResourceJS.Order_SellerOrder_SellerOrderList_link_ShowRemark+"");
                            $("#btnRemarks").data("ymt.addRemarks").attr('title', Content);
                        $("#btnRemarks").data("ymt.note").text(Content);
                        });
                        
                    }
                    else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_AddRemarkFailure);
                }
            });

        });
    }

    //用户评价
    function Evaluate() {
        $("a[name='ShowEvaluate']").click(function () {
            var selTr = $(this).parent().parent().parent();
            var buyerName = $(selTr).find("#buyerLoginId").text();
            $("b[name='BuyerName']").text(buyerName);
            var orderIdVal = $(this).attr("data-OrderId");//$(selTr).find("td[name='OrderIdVal']").find("a").text().trim();
            var postdata = JSON.stringify({ 'orderId': orderIdVal });
            var canSellerReply = $.trim($(selTr).find("div[name='CanSellerReply']").text());
            $("[name='CanReply']").val(canSellerReply);
            $("#orderId").val(orderIdVal);
            //alert(orderIdVal);
            $.ajax({
                url: '/Order/ShowOrderCreditDetail',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        data = data.data;
                        $("#CreditServiceRange").text("" + data.Attitude + ResourceJS.Order_SellerOrderList_jsmsg_EvaluateScore);
                        var point = "";
                        switch (data.EvaluateRange) {
                            case 1:
                                point = ResourceJS.Order_SellerOrderList_jsmsg_BadEvaluate;
                                break;
                            case 2:
                                point = ResourceJS.Order_SellerOrderList_jsmsg_NormalEvaluate;
                                break;
                            case 3:
                                point = ResourceJS.Order_SellerOrderList_jsmsg_GoodEvaluate;
                                break;
                        }
                        $("#CreditScoreRange").text(point);
                        $("#CreditUniformityRange").text("" + data.Coincidence + ResourceJS.Order_SellerOrderList_jsmsg_EvaluateScore);
                        $("#CreditDescript").text(data.Description);
                        $("#FinalDate").text(data.UpdateTime);
                        $("[name=creditId]").val(data.CreditDetailId);
                        var isOutOfDate = data.replayIsOutOfDate;
                        var sellerHasReplayed = data.sellerHasReplayed;
                        //
                        var _node = '<div id="lblMyExplainTip"></div>';
                        var _node1 = '<div id="lblMyExplainTips"></div>';
                        if($('#lblMyExplainTip').size() < 1){
                            $(_node).insertAfter($("#lblMyExplain span")).hide();
                        }
                        if($('#lblMyExplainTips').size() < 1){
                            $(_node1).insertBefore($("#txtExplain")).hide();
                        }
                         // 
                        if (isOutOfDate == "0" && sellerHasReplayed == "0" && data.sellerCanReplayed == true) {//卖家解释期限没有过期，并且卖家没有解释过
                            $("#lblMyExplain").hide();
                            $("#txtExplain").show();
                            var _text = ResourceJS.SellerOrder_SellerOrderEvaluate_msg_CanExplain,
                                _newText = _text.replace("*",data.LastCanEditTime);
                            $('#lblMyExplainTips').text(_newText).show();
                        }
                        else {
                            if (sellerHasReplayed == "1" && data.SellerReply != "" && data.SellerReply != undefined) {//卖家已经解释过
                                $("#lblMyExplain span").text(data.SellerReply);
                                $("#lblMyExplain").show();
                                $('#lblMyExplainTips').remove();
                                $('#lblMyExplainTip').text(ResourceJS.SellerOrder_SellerOrderEvaluate_msg_Explained).show();
                            }
                            else if(isOutOfDate == "1") {
                                $("#lblMyExplain").show();
                                $('#lblMyExplainTip').text(ResourceJS.SellerOrder_SellerOrderEvaluate_msg_CannotExplain).show();
                            }
                            $("#txtExplain").hide();
                        }
                    } else {
                        layerbox.close();
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_EvaluateFailure);
                }
            });
        });
        $("button[name='btnEvaluate']").click(function () {
            var creditId = $("input[name=creditId]").val();
            var replyStr = $("textarea[name='txtExplain']").val();
            var orderId = $("#orderId").val();
            if (!replyStr) {
                alert(ResourceJS.Order_SellerOrderList_jsmsg_EvaluateReplyEmpty);
                return;
            }
            if (replyStr.length > 250) {
                alert(ResourceJS.Order_SellerOrderList_jsmsg_EvaluateReplyLimit);
                return;
            }
            var saveData = JSON.stringify({ 'iCreditDetailId': creditId, 'sSellerReply': replyStr, 'dSellerReplyUpdateTime': Date.now, 'sTargetId': orderId });
            $.ajax({
                url: '/Order/SaveOrderCreditDetail',
                data: saveData,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        // alert(data.msg);
                        $("textarea[name='txtExplain']").val('');
                        $("#lblMyExplain").show().find("span").text(replyStr);
                        $("#txtExplain").hide();
                        $("#lblMyExplainTips").remove();
                    } else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_EvaluateSaveFailure);
                }
            });
        });
    }

    //退款
    function Refund() {
        $("a[name='Refund']").click(function () {
            //清除错误信息
            ariseErr($("input[name='txtRefundAmount']").val(""), $("#WndRefund").find(".error-text"), "");
            var selTr = $(this).parent().parent().parent();
            // var orderIdVal = $.trim($(selTr).find("td[name='OrderIdVal']").find("a").text());
            var orderIdVal = $(this).attr("data-OrderId");
            if (orderIdVal)
                $("#orderId").val(orderIdVal);
            orderIdVal = $("#orderId").val()
            $("#ordreIdText").text(orderIdVal);
            var postdata = JSON.stringify({ "item": orderIdVal }) //{ item : orderIdVal };
            $.ajax({
                url: '/Order/SellerRefund',
                data: postdata,
                type: "post",
                async: true,
                dataType: "json",
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        $("#BuyerName").val(data.BuyerName);
                        $("[name=lastRefund]").val(data.LastRefund);
                        $("#orderId").val(orderIdVal);
                    } else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_RefundFailure);
                }
            });
        });
        $("input[name='txtRefundAmount']").keyup(function () {
            var txtRefundAmount = $(this);
            var refundAmount = txtRefundAmount.val();
            var errText = $("#WndRefund").find(".error-text");
            ariseErr(txtRefundAmount, errText, "");
            if (!valiNumberFormate(refundAmount)) {
                ariseErr(txtRefundAmount, errText, ResourceJS.Order_SellerOrderList_jsmsg_RefundFormatError);
                return;
            }
        })
        $("button[name='btnRefund']").click(function () {
            var txtRefundAmount = $("input[name='txtRefundAmount']");
            var refundAmount = txtRefundAmount.val();
            var orderId = $("#orderId").val();
            var errText = $("#WndRefund").find(".error-text");
            var userName = $("#BuyerName").val();
            var lastRefund = $("[name=lastRefund]").val();

            ariseErr(txtRefundAmount, errText, "");
            if (!valiNumberFormate(refundAmount)) {
                ariseErr(txtRefundAmount, errText, ResourceJS.Order_SellerOrderList_jsmsg_RefundFormatError);
                return;
            }
            if (refundAmount == "") {
                ariseErr(txtRefundAmount, errText, ResourceJS.Order_SellerOrderList_Refund_RefundAmountNotNull);
                return;
            }

            //if (confirm(ResourceJS.Order_SellerOrderList_jsmsg_RefundAlertEx.replace('*', refundAmount).replace('#', userName))) {
            comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.Order_SellerOrderList_jsmsg_RefundAlertEx.replace('*', refundAmount).replace('#', userName), function () {
                    if (isNaN(refundAmount) || parseFloat(refundAmount) <= 0) {
                    ariseErr(txtRefundAmount, errText, ResourceJS.Order_SellerOrderList_jsmsg_RefundCheck1);
                    return;
                }
                else if (parseFloat(lastRefund) < parseFloat(refundAmount)) {
                    ariseErr(txtRefundAmount, errText, ResourceJS.Order_SellerOrderList_jsmsg_RefundCheck);
                    return;
                }
                else {
                    layerbox.close();
                    var refundData = JSON.stringify({ 'operateOrderId': orderId, 'refund': refundAmount, 'lastRefund': lastRefund });
                    $.ajax({
                        url: '/Order/SaveSellerRefund',
                        data: refundData,
                        type: "post",
                        async: true,
                        cache: false,
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.result == "1") {
                                layerbox.close();
                                successAlert(data.msg, function () {
                                window.location = "/OrderDetail?item=" + orderId;
                                });
                                
                            } else {
                                failureAlert(data.msg);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            layerbox.close();
                            errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_RefundFailure);
                        }
                    });
                }
            })
        });
    }

    //保存批量申请补款信息
    function SaveBatchApplyPostpayInfo() {
        var tempVal = [];
        $("button[name='btnConfirmBatchPostpay']").click(function () {
            var $checkeds = $("input[name='no']:checked");
            var checkPostpayAmount = getTxtRealPostpay($checkeds);
            var checkPostpayReason = getTxtPostpayReason($checkeds);
            if (checkPostpayAmount && checkPostpayReason) {
                if (!$checkeds[0]) {
                    errorAlert(ResourceJS.SellerOrder_SellerOrder_msg_ChooseOrder, ResourceJS.SellerOrder_SellerOrderPostpay_msg_ChooseNoneOrder);
                    return;
                }
                tempVal = [];
                //if (confirm(ResourceJS.SellerOrder_SellerOrderPostpay_msg_ConfirmBatchPostpay)) {
                comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.SellerOrder_SellerOrderPostpay_msg_ConfirmBatchPostpay, function () {
                    $("input[name='no']:checked").each(function (index, obj) {
                        var tempTr = $(this).closest("tr");
                        tempVal.push({
                            ApplyReason: $(tempTr).find("textarea[name='txtPostpayReason']").val(),
                            OrderId: $(obj).val(),
                            PostPayAmount: $(tempTr).find("input[name='txtRealPostpay']").val()
                        });
                    });
                    $.ajax({
                        url: '/Order/SaveBatchApplyPostpay',
                        data: JSON.stringify(tempVal),
                        type: "post",
                        async: true,
                        cache: false,
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.result == "1") {
                                
                                successComfirm(data.msg.split(',')[1], data.msg.split(',')[0]);
                            } else {
                                
                                    failureAlert(data.msg.split(',')[1], data.msg.split(',')[0]);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            errorAlert(ResourceJS.SellerOrder_SellerOrderPostpay_msg_Failure);
                        }
                    });
                });
                }
        });
    }

    //修改收货人地址
    function ChangeAddress() {
        var phone;
        $("a[name='ChangeAddress']").click(function () {
            // var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(this).attr("data-OrderId")//$(selTr).find("td[name='OrderIdVal']").find("a").text().trim();

            $("#orderId").val(orderIdVal);
            var postdata = JSON.stringify({ 'orderId': orderIdVal });
            $.ajax({
                url: '/Order/SellerChangeAddress',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        data = data.data;
                        $("input[name='txtReceieverName']").val(data.Receiver);
                        $("textarea[name='txtStreetAddress']").val(data.Address);
                        $("input[name='txtPostCode']").val(data.PostCode);
                        $("input[name='txtContact']").val(data.Phone);
                        telePhone = data.Telephone;
                        phone = data.Phone;
                        $("#ChangeAddressArea").jChinaArea({
                            aspnet: true,
                            s1: data.Province, //默认选中的省名
                            s2: data.City, //默认选中的市名
                            s3: data.Region//默认选中的县区名
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddressFailure, ResourceJS.SellerOrder_SellerOrder_title_ChangeAddress);
                }
            });
        });

        $("button[name='btnConfirm']").click(function () {
            var receieverName = $("input[name='txtReceieverName']").val();
            var province = $("[name='selProvince'] option:selected").text();
            var city = $("[name='selCity'] option:selected").text();
            var region = $("[name='selArea'] option:selected").text();
            var address = $("textarea[name='txtStreetAddress']").val();
            var postCode = $("input[name='txtPostCode']").val();
            var phone = $("input[name='txtContact']").val();

            var orderId = $("#orderId").val();
            if (receieverName == "") {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckReceiever);
                return;
            }
            if (province == "") {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckArea);
                return;
            }
            if (city == "") {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckArea);
                return;
            }
            if (region == "") {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckArea);
                return;
            }
            if (address == "") {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckAddress);
                return;
            }
            if (postCode == "") {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckPostCode);
                return;
            }
            if (phone == "") {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckPhone);
                return;
            }
            if (address.length > 250) {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckAddressLength);
                return;
            }
            var info = {
                'OrderId': orderId,
                'Receiver': receieverName,
                'Province': province,
                'City': city,
                'Region': region,
                'Address': address,
                'PostCode': postCode,
                'Phone': phone
            };
            info = JSON.stringify(info);
            $.ajax({
                url: '/Order/SaveChangedAddress',
                data: info,
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        layerbox.close();
                        successAlert(data.msg, function () {
                        window.location.reload();
                        });                     
                    } else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddress_CheckAddressFailure);
                }
            });
        });
    }

        //发货 发货逻辑做了相应的调整 使用新的发货逻辑
    function Delivery() {
            var orderIdVal;
            var logisticTypeVal;
            $("a[name='Delivery']").click(function () {
                var $this = $(this);
                orderIdVal = $(this).attr("data-OrderId");
                logisticTypeVal = $(this).attr("data-LogisticType");
            $("#orderId").val(orderIdVal);
                $("#logisticType").val(logisticTypeVal);
                if (logisticTypeVal == "4") { //如果是保税区发货
                orderIdVal = $("#orderId").val();
                    siteUrl = $(this).attr('site-url') + '/SendProductsToolForSeller/BatchDispatch?orderIds=' + orderIdVal;
                    $this.attr("href", siteUrl);
            } else {
                    layerbox.alert("#WndSingleDelivery");
                }
            });
            var orderIdList = [];
            orderIdList.push(orderIdVal);
            var siteUrl;
            $("button[name='btnSingleDeliveryNo']").click(function () {
                orderIdVal = $("#orderId").val();
                logisticTypeVal = $("#logisticType").val();
                if (logisticTypeVal != "4") {
                $(this).closest("form").find("[name=orderIds]").val(orderIdVal);
                siteUrl = $(this).attr('site-url') + '/SendProductsToolForSeller/BatchDispatch';
                FormSubmit($(this).closest("form"), siteUrl);
                }
            });
            $("button[name='btnSendSingleDelivery']").click(function () {
                orderIdVal = $("#orderId").val();
                logisticTypeVal = $("#logisticType").val();
                if (logisticTypeVal != "4") {
                $(this).closest("form").find("[name=orderId]").val(orderIdVal);
                siteUrl = $(this).attr('site-url') + '/Delivery/CreateSingleDelivery';
                FormSubmit($(this).closest("form"), siteUrl);
                }
            }); 
             $("button[name='btnTransportSingleDelivery']").click(function () {
                orderIdVal = $("#orderId").val();
                logisticTypeVal = $("#logisticType").val();
                if (logisticTypeVal != "4") {
                $(this).closest("form").find("[name=orderId]").val(orderIdVal);
                siteUrl = $(this).attr('site-url') + '/Transport/CreateSingleDelivery';
                FormSubmit($(this).closest("form"), siteUrl);
                }
            });          
        }

        //表单提交
        function FormSubmit(obj, ationUrl) {
            $(obj).attr("action", ationUrl).submit();
        }

    //延迟收货
    function DelayOrder() {
        $("a[name='UnDelayOrderDate']").click(function () {
            var selTr = $(this).parent().parent().parent();
            errorAlert(selTr.find("div[name='delayAlertText']").text());
        });
        $("a[name='UnDelayOrderDateDetail']").click(function () {
            var selTr = $(this).parent().parent();
            errorAlert(selTr.find("div[name='delayAlertText']").text());
        });
        $("a[name='DelayOrderDate']").click(function () {
            $("input[name='txtDelayDays']").val("3");
            $("#WndDelayOrder").css("display", "block");
            var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(this).attr("data-OrderId");//$.trim($(selTr).find("td[name='OrderIdVal']").text());
            $("#orderId").val(orderIdVal);
        });
        $("button[name='btnDelayOrder']").click(function () {
            var delayDays = $('input[name=txtDelayDays]').val();
            var orderIdVal = $("#orderId").val();
            var regInt = /^[0-9]*$/;
            if (!regInt.test(delayDays)) {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_FormatError);
                $('input[name=txtDelayDays]').val("3");
                return;
            }
            if (delayDays < 3 || delayDays > 15) {
                $('input[name=txtDelayDays]').val("3");
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_DayRangeError);
                return;
            }
            var postdata = JSON.stringify({ 'orderId': orderIdVal, 'delayDays': delayDays });
            $.ajax({
                url: '/Order/SellerDelayOrderReceive',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        layerbox.close();
                        successAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_DelayOrderSuccess, function () {
                        window.location.reload();
                        })
                        
                    }
                    else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_DelayOrderFailure);
                }
            });
        });

        $("button[name='btnDelayOrderDetail']").click(function () {
            var delayDays = $('input[name=txtDelayDays]').val();
            var orderIdVal = $.trim($(this).attr("data-OrderId"));
            var regInt = /^[0-9]*$/;
            if (!regInt.test(delayDays)) {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_FormatError);
                $('input[name=txtDelayDays]').val("3");
                return;
            }
            if (delayDays < 3 || delayDays > 15) {
                $('input[name=txtDelayDays]').val("3");
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_DayRangeError);
                return;
            }
            var postdata = JSON.stringify({ 'orderId': orderIdVal, 'delayDays': delayDays });
            $.ajax({
                url: '/Order/SellerDelayOrderReceive',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_DelayOrderSuccess);
                        window.location.reload();
                    }
                    else {
                        errorAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayOrder_DelayOrderFailure);
                }
            });
        });
    }

    //修改价格与运费
    function EditPrice() {
        $("#EditPriceAndFreight").click(function () {
            //TODO 解决订单详细页问题
            $("a[name='EditPriceAndFreight']").click();
        });
        $("a[name='EditPriceAndFreight']").click(function () {
            var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(this).attr("data-OrderId")//$(selTr).find("td[name='OrderIdVal']").text().trim();

            $("#orderId").val(orderIdVal);
            var buyerName = $(selTr).find("td[name='buyerVal']"),
                totalPrice = 0;
            $("div[name='BuyerName']").find("span").text(buyerName.text());
            var postdata = JSON.stringify({ 'orderIdText': orderIdVal });
            $.ajax({
                url: '/Order/GetSellerOrderDiscountInfo',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        totalPrice = data.data.totalPrice;
                        var productPrice = totalPrice - data.data.Freight - data.data.Discount;
                        var input = $("[name=txtFrieightPrice],[name=txtUpOrDownPrice]");
                        ariseErr(input, input.next().find(".error-text"), "");
                        if (parseFloat(data.data.Discount) >= 0) {
                            $("input[name='UpOrDown']").eq(0).attr("checked", "true");
                            $("i[name='CutOrRisePrice']").removeClass("cut-price").addClass("rise-price")
                       .text("+￥" + data.data.Discount);
                        } else {
                            $("input[name='UpOrDown']").eq(1).attr("checked", "true");
                            $("i[name='CutOrRisePrice']").removeClass("rise-price").addClass("cut-price")
                       .text("-￥" + Math.abs(data.data.Discount));
                        }
                        $("b[name='OrderTotalPrice']").text("￥" + totalPrice);
                        $("i[name='ProductPriceTotal']").text("￥" + productPrice);
                        $("input[name='txtUpOrDownPrice']").val(Math.abs(data.data.Discount));
                        $("input[name='txtFrieightPrice']").val(data.data.Freight);
                        $("i[name='Frieight']").text("￥" + data.data.Freight);
                    }
                    else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Discount_DiscountFailure);
                }
            });
            //buyerName.text(buyerName.text());
        });

        $("input[name='UpOrDown']").click(function () {
            var radioIdVal = $("input[name='UpOrDown']:checked").attr("id");
            var changePriceVal = $("input[name='txtUpOrDownPrice']").val();
            switch (radioIdVal) {
                case "RadioUp":
                    $("small[name='CutOrRise']").text(ResourceJS.Order_SellerOrder_SellerOrderDiscount_label_Markup + "：");
                    $("i[name='CutOrRisePrice']").removeClass("cut-price").addClass("rise-price")
                    $("i[name='CutOrRisePrice']").text("+￥" + changePriceVal);
                    break;
                case "RadioDown":
                    $("small[name='CutOrRise']").text(ResourceJS.Order_SellerOrder_SellerOrderDiscount_label_OnSale + "：");
                    $("i[name='CutOrRisePrice']").removeClass("rise-price").addClass("cut-price")
                    $("i[name='CutOrRisePrice']").text("-￥" + changePriceVal);
                    break;
            }
            CalculateOrderTotalPrice();
        });

        $("input[name='txtFrieightPrice']").keyup(function () {
            var val = $(this).val();
            if (val != "") {
                if (!validPrice($(this), $(this).next().find(".error-text"))) {
                    return;
                }
                var priceVal = val > 0 ? val : "0.00"
                $("i[name='Frieight']").text("￥" + priceVal);
                CalculateOrderTotalPrice()
            }
        });

        $("input[name='txtUpOrDownPrice']").keyup(function () {
            var val = $(this).val();
            var cutOrRisePriceTxt = $("i[name='CutOrRisePrice']").text().substr(0, 2);
            if (val != "") {
                if (!validPrice($(this), $(this).next().find(".error-text"))) {
                    return;
                }
                var number = val > 0 ? val : "0.00";
                $("i[name='CutOrRisePrice']").text(cutOrRisePriceTxt + number);
                CalculateOrderTotalPrice()
            }

        });
        /*
       * 验证价格
       * @param {jqObject} $input
       * @param {jqObject} $errText
       */
        var validPrice = function ($input, $errText) {
            var val = $input.val();
            ariseErr($input, $errText, "")
            if (val != "") {
                if (!valiNumberFormate(val)) {
                    ariseErr($input, $errText, ResourceJS.Order_SellerOrderList_jsmsg_Discount_CheckPrice)
                    return false;
                }
            }
            return true;
        }

        $("button[name='btnEditPrice']").click(function () {
            var orderIdVal = $("#orderId").val();
            var radioIdVal = $("input[name='UpOrDown']:checked").attr("id");
            var textFprice = $("input[name='txtFrieightPrice']");
            var txtUODprice = $("input[name='txtUpOrDownPrice']");
            var frieightPrice = parseFloat(textFprice.val() || 0);
            var txtUpOrDownPrice = parseFloat(txtUODprice.val() || 0);
            var changePrice = 0;
            switch (radioIdVal) {
                case "RadioUp":
                    changePrice = txtUpOrDownPrice;
                    break;
                case "RadioDown":
                    changePrice = -txtUpOrDownPrice;
                    break;
            }
            if (!validPrice(textFprice, textFprice.next().find(".error-text"))) {
                return;
            }
            if (!validPrice(txtUODprice, txtUODprice.next().find(".error-text"))) {
                return;
            }


            var postdata = JSON.stringify({ 'item': orderIdVal, 'discount': changePrice, 'freight': frieightPrice });
            $.ajax({
                url: '/Order/SellerOrderDiscount',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        layerbox.close();
                        successAlert(data.msg, function () {
                        window.location.reload();
                        });
                    }
                    else {
                        layerbox.close();
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_Discount_DiscountFailure);
                }
            });
        });
    }

    //计算修改价格与运费中订单的总价格
    function CalculateOrderTotalPrice() {
        //买家实付（订单总金额） = 商品合计 +涨价或降价+运费
        var radioIdVal = $("input[name='UpOrDown']:checked").attr("id");
        var frieightPrice = parseFloat($("input[name='txtFrieightPrice']").val() || 0);
        var changePrice = parseFloat($("input[name='txtUpOrDownPrice']").val() || 0);
        var OriginalTotalPrice = $("i[name='ProductPriceTotal']").text();
        OriginalTotalPrice = parseFloat(OriginalTotalPrice.substring(1, OriginalTotalPrice.length));
        var totalPrice = 0;
        switch (radioIdVal) {
            case "RadioUp":
                totalPrice = OriginalTotalPrice + frieightPrice + changePrice;
                break;
            case "RadioDown":
                totalPrice = OriginalTotalPrice + frieightPrice - changePrice;
                break;
        }
        totalPrice = isNaN(totalPrice) ? 0 : totalPrice.toFixed(2);
        $("b[name='OrderTotalPrice']").html("￥" + totalPrice);
    }

    //接受单个订单
    function AcceptSingleOrder() {
        $("a[name='AcceptSingleOrder']").click(function () {
            // var selTr = $(this).parent().parent().parent();
            // var orderIdVal = $(selTr).find("td[name='OrderIdVal']").find("a").text();
            var orderIdVal = $(this).attr("data-OrderId");
            var postdata = JSON.stringify({ 's': orderIdVal });
            $.ajax({
                url: '/Order/SellerAcceptOneOrder',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        successAlert(data.msg, function () {
                        window.location.reload();
                        });   
                    }
                    else {
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_AcceptOrder_AcceptOrderFailure);
                }
            });
        });
    }

    //订单详情页接单个订单
    function AcceptSingleOrderDetail() {
        $("a[name='AcceptSingleOrderDetail']").click(function () {
            var orderIdVal = $(this).attr("data-OrderId");
            var postdata = JSON.stringify({ 's': orderIdVal });
            $.ajax({
                url: '/Order/SellerAcceptOneOrder',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        alert(data.msg);
                        window.location.reload();
                    }
                    else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(ResourceJS.Order_SellerOrderList_jsmsg_AcceptOrder_AcceptOrderFailure);
                }
            });
        });
    }

    //取消单个订单
    function CancelSingleOrder(orderId) {
        var orderName = $.trim($("input[name='no']:checked").parents("tr").find("td[name='OrderStatusName']").find("span").text());
        $("#CancelOrderStatusName").text(orderName);
        layerbox.alert("#wndCancelOrder");
        $("#orderId").val(orderId);
    }

    //取消单个订单 只是针对等待发货状态的取消订单功能
    function CancelSingleOrderFix(orderId, orderName) {
        $("#CancelOrderStatusName").text(orderName);
        layerbox.alert("#wndCancelOrder");
        $("#orderId").val(orderId);
    }

    function bindCacelOrder() {
        $("#btnCancelOrder").click(function () {
            var reasonText = $("textarea[name='txtCancelOrderReason']").val();
            if (reasonText.length >= 500) {
                layerbox.close();
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_CheckRemarkLength);
                return;
            }
            var postdata = JSON.stringify({ 'item': $("#orderId").val(), 'reason': reasonText });
            $.ajax({
                url: '/Order/SellerOrderCancel',
                data: postdata,
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        layerbox.close();
                        successAlert(data.msg, function () {
                        window.location.reload();
                        })                       
                    }
                    else {
                        layerbox.close();
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_CancelOrder_CancelOrderFailure);
                }
            });
        });
    }

    //取消订单（用于fix在等待发货状态下的单个取消功能）
    function CancelOrderSingle() {
        $("[name='CancelOrderSingle']").click(function () {
            var selTr = $(this).parent().parent().parent();
            var orderId = $(this).attr("data-OrderId")//selTr.find("input[name='no']").val();
            $("#orderId").val(orderId);
            var orderName = $.trim(selTr.find("td[name='OrderStatusName']").text());
            CancelSingleOrderFix(orderId, orderName);
        });
    }

    //取消订单 
    function CancelOrder() {
        $("[name='BatchCancelOrder']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            if (orderIdList == null || orderIdList.length == 0) {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_CancelOrder_CheckNum);
                return;
            }
            if (orderIdList.length == 1) {
                CancelSingleOrder(orderIdList[0]);
            }
            else {
                var postdata = JSON.stringify({ 'orderIds': orderIdList });
                //if (confirm(ResourceJS.Order_SellerOrderList_jsmsg_CancelOrder_AlertBatchCancelOrder)) {
                    comfirmAlert('提示', ResourceJS.Order_SellerOrderList_jsmsg_CancelOrder_AlertBatchCancelOrder, function () {
                    $.ajax({
                        url: '/Order/SellerCancelOrderBatch',
                        data: postdata,
                        type: "post",
                        async: true,
                        cache: false,
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.result == '1') {
                                successAlert(data.msg, function () {
                                    window.location.reload();
                                })
                            }
                            else {
                                failureAlert(data.msg);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_CancelOrder_CancelOrderFailure);
                        }
                    });
                    return false;
                })
            }
        });
    }

    //批量接单
    function BatchAcceptOrder() {
        $("button[name='BatchAcceptOrder']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            if (orderIdList == null || orderIdList.length == 0) {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_CancelOrder_CheckNum);
                return;
            }
            var postdata = JSON.stringify({ 'orderIds': orderIdList });
            comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.Order_SellerOrderList_jsmsg_AcceptOrder_BatchAcceptOrder, function () {
                $.ajax({
                    url: '/Order/SellerAcceptOrderBatch',
                    data: postdata,
                    type: "post",
                    async: true,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.result == '1') {
                            successAlert(data.msg, function () {
                            window.location.reload();
                            })                            
                        }
                        else {
                            failureAlert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_AcceptOrder_AcceptOrderFailure);
                    }
                });


            });
        });
    }

    //在线做运单合并发货
    function MergeBatchDelivery() {
        $("[name='MergeDelivery']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
                var catalogTypeList = $("input[name='no']:checked").map(function (index, obj) {
                    return $(obj).attr("Catalog-Type");
                }).get();
                if (catalogTypeList != null && catalogTypeList != undefined && arrayContains(catalogTypeList, 0) != -1) {
                    errorAlert(ResourceJS.SellerOrder_SellerOrderList_msg_BondedDelivery);
                    return;
                }
            var $this = $(this)
            if (orderIdList == null || orderIdList.length == 0) {
                errorAlert(ResourceJS.SellerOrder_SellerOrderPostpay_msg_ChooseDispatch, ResourceJS.SellerOrder_OrderList_jsmsg_NoneCheck);
                return;
            }
            var postdata = JSON.stringify({ 'orderIds': orderIdList });
            var siteUrl = $this.attr('site-url') + '/Delivery/ChooseSendTypeForMerge';
            var $parent = $this.parent();
            $parent.find("[name=orderIds]").val(orderIdList)

            //if (confirm(ResourceJS.Seller_OrderList_jsmsg_OnlineMergeDelivery)) {
            comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.Seller_OrderList_jsmsg_OnlineMergeDelivery, function () {
                $parent.attr("action", siteUrl).submit();
            })
                
        });
    }

    //在线做运单发货
    function BatchBillDelivery() {
        $("[name='OnlineDelivery']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            var $this = $(this)
            if (orderIdList == null || orderIdList.length == 0) {
                errorAlert(ResourceJS.SellerOrder_SellerOrderPostpay_msg_ChooseDispatch, ResourceJS.SellerOrder_OrderList_jsmsg_NoneCheck);
                return;
            }
                var catalogTypeList = $("input[name='no']:checked").map(function (index, obj) {
                    return $(obj).attr("Catalog-Type");
                }).get();
                if (catalogTypeList != null && catalogTypeList != undefined && arrayContains(catalogTypeList, 0) != -1) {
                    errorAlert(ResourceJS.SellerOrder_SellerOrderList_msg_BondedDelivery);
                    return;
                }
            var postdata = JSON.stringify({ 'orderIds': orderIdList });
            var siteUrl = $this.attr('site-url') + '/Delivery/BatchDeliver';
            var $parent = $this.parent();
            $parent.find("[name=orderIds]").val(orderIdList)

            //if (confirm(ResourceJS.SellerOrder_OrderList_jsmsg_OnlineDelivery)) {
            comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.SellerOrder_OrderList_jsmsg_OnlineDelivery, function () {
                $parent.attr("action", siteUrl).submit();
            });
        });
    }

    //批量发货
    function BatchDelivery() {
        $("[name='BatchDelivery']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            var $this = $(this)
            if (orderIdList == null || orderIdList.length == 0) {
                errorAlert(ResourceJS.SellerOrder_SellerOrderPostpay_msg_ChooseDispatch, ResourceJS.SellerOrder_OrderList_jsmsg_NoneCheck);
                return;
            }
            var siteUrl = $this.attr('site-url') + '/SendProductsToolForSeller/BatchDispatch';
            var $parent = $this.parent();
            $parent.find("[name=orderIds]").val(orderIdList)

            //if (confirm(ResourceJS.SellerOrder_OrderList_jsmsg_OnlineDelivery)) {
            //comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.SellerOrder_OrderList_jsmsg_OnlineDelivery, function () {
                $parent.attr("action", siteUrl).submit();
            //})
        });
    }

    //批量申请补款
    function BatchApplyPostpay() {
        $("button[name='BatchApplyPostpay']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            var $this = $(this)
            if (orderIdList == null || orderIdList.length == 0) {
                errorAlert(ResourceJS.SellerOrder_OrderList_jsmsg_NoneCheck);
                return;
            }
            var siteUrl = '/Order/BatchApplyPostpay';
            var $parent = $this.parent();
            $parent.find("[name=orderIds]").val(orderIdList)

            //if (confirm(ResourceJS.SellerOrder_OrderList_jsmsg_BatchApplyPostPay)) {
            comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.SellerOrder_OrderList_jsmsg_BatchApplyPostPay, function () {
                $parent.attr("action", siteUrl).submit();
            });
        });
    }

    //批量延长收货时间
    function BatchDelayReceiveDate() {
        $("button[name='BatchDelayReceive']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            if (orderIdList == null || orderIdList.length == 0) {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_CancelOrder_CheckNum);
                return;
            }
            var postdata = JSON.stringify({ 'orderIds': orderIdList });
            //if (confirm(ResourceJS.Order_SellerOrderList_jsmsg_DelayReceive_AlertBatchDelay)) {
            comfirmAlert(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, ResourceJS.Order_SellerOrderList_jsmsg_DelayReceive_AlertBatchDelay, function () {
                $.ajax({
                    url: '/Order/SellerBatchDelayOrderAtuoReceive',
                    data: postdata,
                    type: "post",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.result == '1') {
                            successAlert(data.msg, function () {
                            window.location.reload();
                            })                            
                        }
                        else {
                            failureAlert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_DelayReceive_BatchDelayFailure);
                    }
                });
            });
        });
    }

    //添加备注
    function addRemarks() {
        $("button[name='btnRemarks']").click(function () {
            var Content = $("[name=remarks]").val(),
                UserId = "",
                OrderId = $("#orderId").val();
            if (Content.length > 500) {
                alert(ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_CheckRemarkLength);
                return;
            }
            var data = {
                Content: Content,
                UserId: UserId,
                OrderId: OrderId
            }
            $.ajax({
                url: '/Order/SaveOrderNote',
                data: JSON.stringify(data),
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == '1') {
                        alert(data.msg);
                        $("#btnRemarks").data("ymt.addRemarks").text(ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_ShowRemark)
                        $("#btnRemarks").data("ymt.note").text(Content);
                    }
                    else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(ResourceJS.Order_SellerOrderList_jsmsg_AddRemark_AddRemarkFailure);
                }
            });

        });
    }


    ///验证数字格式
    function valiNumberFormate(number) {
        var regInt = /^\d{1,8}([\.]\d{1,2})?$/;
        return regInt.test(number);
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

    ///**
    //* 文字显示固定行数，超过显示省略号
    //* 
    //* @param {number} 行数
    //*/
    //function textflow(row) {
    //    $(".textflow").each(function () {
    //        var $this = $(this),
    //            clientHeight = this.clientHeight,//容器高度
    //            fontSize = parseFloat($this.css("fontSize")),
    //            lineHeight = parseFloat($this.css("lineHeight"));
    //        var title = $this.attr("title");
    //        //将原来的值保存到title中
    //        if (title === undefined || title === "") {
    //            $this.attr("title", title = $this.text());
    //        }
    //        //将原来的值还原重新计算
    //        $this.text(title);

    //        var dheight = parseInt(row * lineHeight);
    //        if (clientHeight >= dheight) {
    //            while (dheight * 3 < this.clientHeight) {
    //                $this.text(title.substring(0, title.length / 2));
    //                title = $this.text();
    //            }
    //            //减去末尾文字
    //            while (dheight < this.clientHeight) {
    //                title = $this.text();
    //                $this.text(title.replace(/(\s)*([a-zA-Z0-9]?|\W)(\.\.\.)?$/, "..."));
    //            }
    //        }
    //    })

    //}

    //tab已发货选中 select默认时间
    $('.tab-header > li.active').each(function (index, item) {
        
            var _text = item.getAttribute('data-name'),
                $orderDateVal = $('#OrderDateVal'),
                orderDate = urlToObj();
        //如果url中存在orderDate 则优先按url传递的类型显示
        if (orderDate && orderDate.orderdate) {
            $orderDateVal.val(orderDate.orderdate);
            return
        }
        if (_text == ResourceJS.Order_SellerOrder_SellerOrderList_tab_DeliveryedOrder) {
            $orderDateVal.val('3');
        }
        if (_text == ResourceJS.Order_SellerOrder_SellerOrderList_tab_WaitAcceptOrder) {
            $('#select-time').val()
            $orderDateVal.val('2');
        }
        if (_text == ResourceJS.Order_SellerOrder_SellerOrderList_tab_AllOrder || _text == ResourceJS.Order_SellerOrder_SellerOrderList_tab_WaitPayOrder || _text == ResourceJS.Order_SellerOrder_SellerOrderList_tab_WaitDeliveryOrder) {
            $orderDateVal.val('1');
        }
        if (_text == ResourceJS.SellerOrder_SellerOrderList_tab_PostPaying) {
            $orderDateVal.val('4');
        }
        if (_text == ResourceJS.SellerOrder_SellerOrderList_tab_ApplyPostPay) {
            $orderDateVal.val('2');
        }

    });

    $('#select-time').change(function () {
        var _value = $(this).children('option:selected').val();
        $('#OrderDateVal').val(_value);
    })

    //设置订单日期下拉框
    $('#select-time').val($('#OrderDateVal').val());
    //重置表单   
    $("#J-formReset").click(function () {
        var ua = navigator.userAgent.toLowerCase();
        var IE = "";
        if (window.ActiveXObject) {
            IE = ua.match(/msie ([\d.]+)/)[1];
            if (IE <= 9) {
                var _input = $(":input", document.forms[0]);
                var _select = $("select", document.forms[0]);
                _input.each(function () {
                    var _placeholder = $(this).attr('placeholder');
                    $(this).val(_placeholder);
                    $(this).addClass('placeholder');
                })
                _select.val(1);
                $('#J-tiperror').hide();
            }
            return;
        }                
        $(":input", document.forms[0]).val("");
        $('#J-tiperror').hide();
    })
    
    
    $('.order-form').submit(function () {
        var $this = $(this);            
        var _key = $('.c-input-large', $this);
        var _st = $("input[name='st']", $this);
        var _et = $("input[name='et']", $this);
        if (_key.val() == _key.attr('placeholder')) {
            _key.val('');
        }
        if (_st.val() == _st.attr('placeholder')) {
            _st.val('');
        }
        if (_et.val() == _et.attr('placeholder')) {
            _et.val('');
        }      
    })
    //$.urlParam = function (name) {
    //    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    //    if (results) {
    //        return results[1] || 0;
    //    }
    //}
    //$('#select-time').val($.urlParam("orderdate"));
    //新增搜索条件
    $('#btnConfirmSearch').click(function () {
        var _starTime = $('#st').val(),
            _sPlaceholder = $('#st').attr('placeholder');
        var _endTime = $('#et').val(),
            _ePlaceholder = $('#et').attr('placeholder');
        var _nowTime = getDay();
        $('#J-tiperror').hide();
        //开始时间和结束时间不能为空
        //if (_endTime == "" && _starTime == "") {
        //    $('#J-tiperror').html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderList_jsmsg_SearchError).show();
        //    return false;
        //}
        if (!((_endTime === "" || _endTime === _ePlaceholder) && (_starTime === "" || _starTime === _sPlaceholder))) {
        //开始时间结束时间不为空 开始时间不能大于结束时间
            if (_endTime !== "" && _endTime !== _ePlaceholder && _starTime !== "" && _starTime !== _sPlaceholder) {
            if (_starTime > _endTime) {
                $('#J-tiperror').html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderList_jsmsg_SearchDateError).show();
                return false;
            }
        }

            if ((_starTime !== "" || _starTime !== _sPlaceholder) && (_endTime == "" || _endTime == _ePlaceholder)) {

            if (_starTime <= _nowTime) {
                $('#et').val(_nowTime);
                } else {
                    $('#J-tiperror').html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderList_jsmsg_SearchDateError).show();
                    return false;
                }
            }
            if ((_endTime !== "" || _endTime !== _ePlaceholder) && (_starTime == "" || _starTime == _sPlaceholder)) {
                $('#st').val(getDayTime(_endTime));
        }
        }
    })
    
    function getDay() {
        var today = new Date();
        var intYear = today.getFullYear() + "-";
        var intMonth = today.getMonth() + 1;
        if (intMonth < 10) {
            intMonth = "0" + intMonth + "-";
        } else {
            intMonth = intMonth + "-";
        }
        var intDay = today.getDate();
        if (intDay < 10) {
            intDay = "0" + intDay;
        }
        var todate = intYear + intMonth + intDay;
        return todate;
    }
    function getDayTime(str) {
        var today = new Date();
        str = str.split('-');
        //var date = new Date(); 
        today.setUTCFullYear(str[0], str[1] - 1, str[2]);
        today.setDate(today.getDate() - 30);
        var intYear = today.getFullYear() + "-";
        var intMonth = today.getMonth() + 1;
        if (intMonth < 10) {
            intMonth = "0" + intMonth + "-";
        } else {
            intMonth = intMonth + "-";
        }
        var intDay = today.getDate();
        //alert(intDay);
        if (intDay < 10) {
            intDay = "0" + intDay;
        }
        var todate = intYear + intMonth + intDay;
        return todate;
    }
    //补款验证
    function getTxtRealPostpay(checkeds) {
        var result = true;
        checkeds.each(function () {
            var $this = $(this),
                parent = $this.closest('tr');
            var _inputDom = parent.find("[name='txtRealPostpay']");
            var _DomNode = parent.find('.JErrorInp');
            var _value = _inputDom.val();

            if (!checkTxtRealPostpay(_inputDom, _DomNode, _value) && result) {
                result = false;
            }
            
        });
        return result;
    }
    function checkTxtRealPostpay(_parentNode, _DomNode, _value) {
        _DomNode.hide();
        _parentNode.focus();
        _parentNode.css({ 'border-color': '#bbb' });
        var result = true;
        var regInt = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        if (_value == "" || _value == null) {
            _DomNode.html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderPostpay_jsmsg_PostpayErrorEmpty).show();
            _parentNode.css({ 'border-color': '#ff0000' });
            result = false;
        } else {
            if (!regInt.test(_value)) {
                _DomNode.html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderPostpay_jsmsg_PostpayErrorFormat).show();
                _parentNode.css({ 'border-color': '#ff0000' });
                result = false;
            }
            if (_value <= 0) {
                _DomNode.html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderPostpay_jsmsg_PostpayErrorZero).show();
                _parentNode.css({ 'border-color': '#ff0000' });
                result = false;
            }
        }
        return result;
    }
    //补款原因
    function getTxtPostpayReason(checkeds) {
        var result = true;
        checkeds.each(function () {
            var $this = $(this),
                parent = $this.closest('tr');
            var _inputDom = parent.find("[name='txtPostpayReason']");
            var _DomNode = parent.find('.JErrorArea');
            var _value = _inputDom.val();

            if (!checkTxtPostpayReason(_inputDom, _DomNode, _value) && result) {
                result = false;
            }
        });
        return result;
    }

    function checkTxtPostpayReason(_parentNode, _DomNode, _value) {
        _DomNode.hide();
        _parentNode.css({ 'border-color': '#bbb' });
        var result = true;
        if (_value == "" || _value == null) {
            _DomNode.html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderPostpay_jsmsg_PostpayReasonErrorEmpty).show();
            _parentNode.css({ 'border-color': '#ff0000' });
            result = false;
        } else {
            if (_value.length > 500) {
                _DomNode.html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerOrder_SellerOrderPostpay_jsmsg_PostpayErrorLegth).show();
                _parentNode.css({ 'border-color': '#ff0000' });
                result = false;
            }
        }
        return result;
    }
    //修改补款信息
    function EditPostpayInfo() {
        $("button[name='btnEditPostpayInfo']").click(function () {
            var $checkeds = $("input[name='no']:checked");
            if (!$checkeds[0]) {
                errorAlert(ResourceJS.SellerOrder_SellerOrder_msg_ChooseOrder, ResourceJS.SellerOrder_SellerOrderPostpay_msg_ChooseNoneOrder);
                return;
            }
            //商品id数组
            var tempVal = $("input[name='no']:checked").closest("tr").map(function () {
                return $(this).attr("data-ProductId");
            }).get();
            //订单类型数组
            var orderTypeVal = $("input[name='no']:checked").closest("tr").map(function () {
                return $(this).attr("data-IsShangou");
            }).get();
            tempVal = filterArray(tempVal);
            var tempOrderTypeVal = filterArray(orderTypeVal);
                if (tempVal.length > 1 || tempOrderTypeVal > 1 || ($.inArray('False', orderTypeVal) && orderTypeVal.length > 2)) {
                errorAlert(ResourceJS.SellerOrder_SellerOrderPostpay_jsmsg_PostpayErrorDifferent);
                return;
            }
            $('.JErrorInp ').hide();
            $('.JErrorArea ').hide();
            modifyPostpay($checkeds);
        })
    }

    //过滤数组中重复元素
    function filterArray(receiveArray) {
        var arrResult = new Array(); //定义一个返回结果数组.  
        for (var i = 0; i < receiveArray.length; ++i) {
                if (arrayContains(arrResult, receiveArray[i]) == -1) {
                //在这里做i元素与所有判断相同与否  
                arrResult.push(receiveArray[i]);
                //　添加该元素到新数组。如果if内判断为false（即已添加过），  
                //则不添加。  
            }
        }
        return arrResult;
    }
    /*
    * 将url中seach字符串转换成{}
    *
    */
    function urlToObj() {
        var search = window.location.search.substr(1),
            searchAttr = search.split("&"),
                obj = {}, i = 0, _t;
        for (; i < searchAttr.length; i++) {
            _t = searchAttr[i].split("=");
            if (_t[1]) {
                obj[_t[0]] = _t[1];
            }

        }
        return obj;
        
    }
    //重复元素的check
        function arrayContains(receiveArray, checkItem) {
        var index = -1; //　函数返回值用于布尔判断  
        for (var i = 0; i < receiveArray.length; ++i) {
            if (receiveArray[i] == checkItem) {
                index = i;
                break;
            }
        }
        return index;
    }


    //弹出补款弹窗
    function modifyPostpay(checkeds) {
        checkeds.each(function () {
            var $this = $(this);
            layerbox.alert("#modifyPostpay");
            var _domBox = $("#modifyPostpay"), result;
            var _checkedParent = $this.closest('tr'),
                _inpVal = $("[name='txtRealPostpay']", _checkedParent).val(),
                _areaVal = $("[name='txtPostpayReason']", _checkedParent).val();
            var postPay = $("[name='txtRealPostpay']", _domBox);
            var reason = $("[name='txtPostpayReason']", _domBox);
            postPay.val(_inpVal);
            reason.val(_areaVal);
            
            $("button[name='btnConfirmModifyPostPay']").click(function () {
                var postPay = $("[name='txtRealPostpay']", _domBox),
                    postPayVal = postPay.val();
                var postPayNode = $('.JErrorInp', _domBox);

                if (!checkTxtRealPostpay(postPay, postPayNode, postPayVal))
                    return;

                var reason = $("[name='txtPostpayReason']", _domBox),
                    reasonValue = $(reason).val();
                var reasonNode = $('.JErrorArea', _domBox);
                if (!checkTxtPostpayReason(reason, reasonNode, reasonValue))
                    return;
                
                
                
                var parent = $this.closest('tr');
                $("[name='txtRealPostpay']", parent).val(postPayVal);
                $("[name='txtPostpayReason']", parent).val(reasonValue);
                layerbox.close();

                $(this).unbind('click');
            })
        })

    }
    //查看留言
    $('.leave-word').each(function () {
        var $this = $(this);
        $this.click(function () {
            var _leaveWord = $this.attr('data-leaveword');
            errorAlert(_leaveWord, ResourceJS.SellerOrder_SellerOrderList_msg_ViewLeaveWord);

        })
    })
    //分页
    $('.pagination-form form').submit(function () {
        var _value = $('.pageNo').val();
        var _liNode = $('.pagination-page li').length - 2;
        var _page = $('.pagination-page  li').eq(_liNode).find('a').text();
        if (_value > _page) {
            $('.pageNo').val(_page)
        }
    })
    //搜索为空
    var _serchNull = $('.order-result-null');
    var _orderNum = $('.order-list-info i').text();
    if (_serchNull.length > 0 || _orderNum == "0") {
        $('.order-list-info').css('border-width', '0');
        $('.c-table').css({'height': '180px','display':'block'});
    }
    $('.order-leave-note').each(function(){

        var $this = $(this);
        var LeaveNotes = $('.leave-notes',$this),
            LeaveNotesVal = LeaveNotes.text(),
            AllNotes = $('.all-notes',$this),
            LeaveNoteHeight = LeaveNotes.height();
        AllNotes.hide();
        textflow(".leave-notes", { row: 2 });
        if(LeaveNoteHeight > 36){
            AllNotes.show();
        }
    })
})