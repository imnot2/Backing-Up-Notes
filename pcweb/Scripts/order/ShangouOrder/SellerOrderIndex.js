/*=======================index.js===========================*/
j$(function () {
    j$(".unav_tit").toggle(
			function () {
			    j$(this).children(".ico").addClass("ico_shrink");
			    j$(this).parent(".unav_group").children(".unav_item").hide();
			},
			function () {
			    j$(this).children(".ico").removeClass("ico_shrink");
			    j$(this).parent(".unav_group").children(".unav_item").show();
			}
		);
    j$(".bntRef").click(function () {
        AttentionDialog("#TAttentionDialog", "#TAttentionDialogShadow", ".bntTAttentionClose", 20, 30);
    });

});
function updateOrderNote(a, note) {
    ///<summary>备注</summary>
    if (note && note.length > 0) {
        showOrderNote(a, note);
    } else {
        hideOrderNote(a);
    }
}
function showOrderNote(a, note) {
    j$(a).attr('title', note);
    j$(a).html("<span style=\"color:Red\">查看备注</span>");
    //    j$(a).children('img').show();
}
function hideOrderNote(a) {
    j$(a).removeAttr('title');
    j$(a).html("<span>添加备注</span>");
    //    j$(a).children('img').hide();
}
function postExportOrderList(ids) {
    //alert("ids is:" + ids);
    var thisForm = document.forms["ExportForm"];
    thisForm.orderIds.value = ids;
    //alert("tradingStatus is: " + document.getElementById("s").value);
    thisForm.tradingStatus.value = document.getElementById("s").value;
    thisForm.submit();
}

function postOnlineDeliver(ids) {
    var thisForm = document.forms["DeliveryForm"];
    thisForm.orderIds.value = ids;
    thisForm.submit();
}

function postMergeDelivery(ids) {
    var thisForm = document.forms["MergeForm"];
    thisForm.orderIds.value = ids;
    thisForm.submit();
}

j$(function () {
    //    j$('#buttonMergeDelivery').click(function () {
    //        var ids = j$('#divOrderList input:checked').map(function (i, n) {
    //            return j$(n).val();
    //        }).get();
    //        if (ids == null) {
    //            alert("请选择至少一个订单");
    //            return false;
    //        }

    //        else if (ids.length < 2) {
    //            alert("请选择至少两个订单");
    //            return false;
    //        }

    //        postMergeDelivery(ids)
    //    });
    //    j$('#buttonBatchDeliver').click(function () {
    //        var ids = j$('#divOrderList input:checked').map(function (i, n) {
    //            return j$(n).val();
    //        }).get();
    //        if (ids == null) {
    //            alert("请选择至少一个订单");
    //            return false;
    //        }
    //        else if (ids.length == 0) {
    //            alert("请选择至少一个订单");
    //            return false;
    //        }

    //        postOnlineDeliver(ids)
    //    });

    j$('#buttonBatchOnlineDispatch').click(function () {
        var form = j$("form#BatchOnlineDispatchForm");
        form.submit();
    });
    j$('#buttonBatchSendAssets').click(function () {
        var form = j$("form#BatchSendAssetsForm");
        form.submit();
    });
    j$('#buttonBatchDispatch').click(function () {
        var form = j$("form#BatchDispatchForm");
        form.submit();
    });
    j$('#buttonBatchRefund').click(function () {
        var form = j$("form#BatchRefundForm");
        form.submit();
    });
    j$('#buttonExportOrderList').click(function () {
        ///<summary>全选功能</summary>
        var ids = j$('#divOrderList input:checked').map(function (i, n) {
            return j$(n).val();
        }).get();
        if (ids == null) {
            alert("请选择至少一个订单");
            return false;
        }
        else if (ids.length == 0) {
            alert("请选择至少一个订单");
            return false;
        }
        //alert("ids is:" + ids);
        postExportOrderList(ids);
    });
    j$('#buttonExportShipmentList').click(function () {
        ///<summary>全选功能</summary>
        var ids = j$('#divOrderList input:checked').map(function (i, n) {
            return j$(n).val();
        }).get();
        if (ids == null) {
            alert("请选择至少一个订单");
            return false;
        }
        else if (ids.length == 0) {
            alert("请选择至少一个订单");
            return false;
        }

        var thisForm = document.forms["ExportShipmentForm"];
        thisForm.orderIds.value = ids;
        thisForm.tradingStatus.value = document.getElementById("s").value;
        thisForm.submit();
    });
    $('#btnBatchDelay').click(function () {
        var ids = j$('#divOrderList input:checked').map(function (i, n) {
            return j$(n).val();
        }).get();
        if (ids == null) {
            alert("请选择至少一个订单");
            return false;
        }
        else if (ids.length == 0) {
            alert("请选择至少一个订单");
            return false;
        }

        $.post('/SellerOrder/SellerBatchDelayOrderAtuoReceive', $.toJSON({ 'orderIds': ids }), function (data) {
            alert(data.msg);
            window.location.reload();
        });
    });
    j$('#checkboxSelectAllOrder').click(function () {
        ///<summary>全选功能</summary>
        var inputs = j$('#divOrderList input[type=checkbox]');
        inputs.attr('checked', j$(this).attr('checked'));
    });
    j$('.buttonSellerAcceptOrder').click(function () {
        ///<summary>单个确认接单</summary>
        var divform = j$(this).closest('.divform').find('*');
        var postdata = j$.toJSON(divform.serializeObject());
        var isInBlackList = $(this).next().val();
        if (isInBlackList == "True") {
            if (confirm('该订单来自黑名单用户，您是否要接单？')) {
                j$.post('/App/SellerOrder/SellerAcceptOneOrder', postdata, function (data) {
                    if (data.success == '1') {
                        alert('确认接单成功');
                        window.location.href = data.redirect;
                    }
                    else {
                        alert(data.message);
                    }
                }, 'json');
            }
        } else {
            j$.post('/App/SellerOrder/SellerAcceptOneOrder', postdata, function (data) {
                if (data.success == '1') {
                    alert('确认接单成功');
                    window.location.href = data.redirect;
                }
                else {
                    alert(data.message);
                }
            }, 'json');
        }
    });
    j$('#buttonSellerAcceptOrder').click(function () {
        ///<summary>批量确认接单</summary>
        //        var divform = j$('#divOrderList input *');
        //        var postdata = j$.toJSON(divform.serializeObject());
        var db = j$('#divOrderList input:checked').map(function (i, n) {
            return j$(n).val();
        }).get(); //get converts it to an array
        if (db == null) {
            alert("请选择至少一个订单");
            return;
        }
        else if (db.length == 0) {
            alert("请选择至少一个订单");
            return;
        }
        //alert(db);
        var postdata = j$.toJSON({ 'OrderIds': db });
        j$.post('/App/SellerOrder/SellerAcceptOrderBatch', postdata, function (data) {
            if (data.success == '1') {
                alert('确认接单成功');
                if (data.message != '') {
                    alert(data.message);
                }
                //postExportOrderList(db);
                //window.location.href = data.redirect;
                window.location.href = "/App/SellerOrder/SellerPostpayOrder?orderIds=" + db.join("&orderIds=");
            }
            else {
                alert(data.message);
            }
        }, 'json');
    });
    j$('.buttonSellerRefuseOrder').click(function () {
        ///<summary>取消接单</summary>
        var divform = j$(this).closest('.divform').find('*');
        var postdata = j$.toJSON(divform.serializeObject());
        j$.post('/App/SellerOrder/SellerRejectOrder', postdata, function (data) {
            if (data.success == '1') {
                alert('取消接单成功');
                window.location.href = data.redirect;
            }
            else {
                alert(data.message);
            }
        }, 'json');
    });
    $('#btnSellerRejectUnpayedOrder').click(function () {
        var db = j$('#divOrderList input:checked').map(function (i, n) {
            return j$(n).val();
        }).get(); //get converts it to an array
        if (db == null) {
            alert("请选择至少一个订单");
            return;
        }
        else if (db.length == 0) {
            alert("请选择至少一个订单");
            return;
        }
        var postdata = j$.toJSON({ 'OrderIds': db });
        if (confirm("您确定要批量取消这些订单吗？")) {
            j$.post('/App/SellerOrder/SellerRejectUnpayedOrder', postdata, function (data) {
                if (data.success == '1') {
                    alert('取消接单成功');
                    window.location.href = data.redirect;
                }
                else {
                    alert(data.message);
                }
            }, 'json');
        }
    });
    j$('#buttonSellerRejectOrder').click(function () {
        var db = j$('#divOrderList input:checked').map(function (i, n) {
            return j$(n).val();
        }).get(); //get converts it to an array
        if (db == null) {
            alert("请选择至少一个订单");
            return;
        }
        else if (db.length == 0) {
            alert("请选择至少一个订单");
            return;
        }
        var postdata = j$.toJSON({ 'OrderIds': db });
        if (confirm("您确定要批量取消这些订单吗？")) {
            j$.post('/App/SellerOrder/SellerRejectOrder', postdata, function (data) {
                if (data.success == '1') {
                    alert('取消接单成功');
                    window.location.href = data.redirect;
                }
                else {
                    alert(data.message);
                }
            }, 'json');
        }
    });
    //show event
    j$("a[name=buttonChangeNote]").click(function () {
        //show dialog
        var orderid = j$(this).attr('data');
        var content = j$(this).attr('title');
        var divdialog = j$('#MonoDialog');
        divdialog.find('input[type=hidden][name=OrderId]').val(orderid);
        divdialog.find('textarea[name=Content]').val(content);
        AttentionDialog("#MonoDialog", "#PadB");
    }); //end show event
    j$("a[name=buttonShowLeaveWord]").click(function () {
        //show dialog
        var orderid = j$(this).attr('data');
        var content = j$(this).attr('title');
        var divdialog = j$('#LeaveWordDialog');
        divdialog.find('textarea[name=LeaveWord]').val(content);
        AttentionDialog("#LeaveWordDialog", "#PadB");
    });
    //ok event
    j$('#buttonOK').live('click', function () {
        var divdialog = j$('#MonoDialog');
    });
    j$('#buttonMonoOk').live('click', function () {
        var divdialog = j$('#MonoDialog');
        var form = divdialog.find('form');
        j$.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: j$.toJSON(form.serializeObject()),
            msg: this,
            success: function (data) {
                var container = j$('#containerChangeNoteDialog');
                container.html(data);
                container.find('.zicBtn').zicBtn();
                var buttonClose = container.find('.Close');
                AttentionDialog("#MonoDialog", "#PadB");
                var orderid = container.find('input[type=hidden][name=OrderId]').val();
                var note = container.find('textarea[name=Content]').val();
                var result = container.find('input[type=hidden][name=result]').val();
                if (result && result.toLowerCase() == 'true') {
                    var a = j$('a[name=buttonChangeNote][data=' + orderid + ']');
                    updateOrderNote(a, note);
                    alert("更新成功");
                    buttonClose.click();
                } else {
                    //AttentionDialog("#MonoDialog", "#PadB");
                    alert("更新失败，备注过长。");
                }
            },
            dataType: 'html'
        }); //end ajax
        return false;
    }); //end ok event
});

j$(function () {
    j$("button#buttonSearchSellerOrder").click(function () {
        if (j$("#Text1").val() == "输入订单号、买家、商品名称" && startTime == "" && endTime == "") {
            alert("请输入要搜索的订单、买家名称或商品名称，选择查询的日期范围。");
            return false;
        }
        if (j$("#Text1").val() == "输入订单号、买家、商品名称") {
            j$("#Text1").val("");
        }
        var form = j$("form#formSearchSellerOrder");
        form.submit();
    });
    $('.buttonSellerSkipPostPay').click(function () {
        //跳过补款申请
        if (confirm('您确定该笔订单不需要补款吗？')) {
            var orderid = $(this).attr('data-orderid');
            $.post('/App/SellerOrderPostPay/Skip', $.toJSON({ 'OrderId': orderid, 'Reason': "默认" }), function (data) {
                if (data.success == '1') {
                    alert('操作成功！');
                    window.location.href = data.redirect;
                } else {
                    alert(data.message);
                }
            }, 'json');
        }
        return false;
    });
});

j$(document).ready(function () {
    j$("div.col-sub a").attr("style", "width:118px");

    //$('.delayBtn').click(function () {
    //    var orderId = $(this).next().val();
    //    if (confirm('延长收货期限可延长买家“确认收货”的时限。您确定要延长5天收货期限吗？')) {
    //        $.post('/SellerOrder/SellerDelayOrderAutoReceive', $.toJSON({ 'orderId': orderId }), function (data) {
    //            if (data.success == true) {
    //                alert('延期成功');
    //                window.location.reload();
    //            }
    //            else {
    //                alert('延期失败，请重新尝试');
    //            }
    //        }, 'json');
    //    }
    //    alert(orderId);
    //});

    //$('.canNotDelayBtn').click(function () {
    //    alert($(this).next().val());
    //});

    //延长收货时间
    var id = '#alert_box_6';
    $('.delayBtn').live('click', function () {
        var orderId = $(this).next().val();
        $(".orderID").val(orderId);
        struc.alert(id);
    });
    $('.canNotDelayBtn').click(function () {
        alert($(this).next().val());
    });
    $('.shut').live('click', function () {
        struc.close();
    });
    $('#alert_box_6 .btn-0-0').live('click', function () {
        struc.close();
    });
    $("#alert_box_6 .btn-0").live('click', function () {
        var orderId = $('.orderID').val();
        var delayDays = $('input[name=delayDays]').val();
        var regInt = /^[0-9]*$/;
        if (!regInt.test(delayDays)) {
            $('.mr').empty();
            $('.mr').append("<font color='red'>必须为数字</font>")
            //alert("");
            return;
        }

        if (delayDays < 3 || delayDays > 15) {
            $('.mr').empty();
            $('.mr').append("<font color='red'>不在时间范围内！</font>")
            return;
        }

        $.post('/SellerOrder/SellerDelayOrderReceive', $.toJSON({ 'orderId': orderId, 'delayDays': delayDays }), function (data) {
            if (data.success == true) {
                alert('延期成功');
                window.location.reload();
            } else {
                alert('延期失败，请重新尝试');
            }
        });
        //alert(orderId);
    });

    $('.cancelPostPay').click(function () {
        var orderId = $(this).next().val();
        if (confirm('要撤销补款申请吗？')) {
            $.post('/App/SellerOrderPostPay/SellerCancelPostPay', $.toJSON({ 'orderId': orderId }), function (data) {
                if (data.success == true) {
                    alert('补款申请已撤销，您可以重新发起补款或直接发货！');
                    window.location.reload();
                }
                else {
                    alert('撤销失败：' + data.msg);
                }
            }, 'json');
        }
    });

});

