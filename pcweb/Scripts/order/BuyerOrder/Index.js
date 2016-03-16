/*=======================Index.js===========================*/
var struc, addComment, smallLayer;
$(function () {
    Ymt.load('widget.LayerBox,util.placeholder', function () {
        $('.addcomment').bind('click', function (e) {
            var addCommentHtml = [
                '<div class="layerTemps add-comment-layer" buyerid="{buyerid}" id="add-comment-layer" orderid="{orderid}" productid="{productid}">',
                '    <div class="alert_box_inner">',
                '        <p class="tip">对此商品追加评论</p>',
                '        <div class="product-comment add-comment">',
                '            <div class="product-img"><img src="{src}" alt="" width="66" /></div>',
                '            <div class="product-info">',
                '                <h3 class="product-title">{title}</h3>',
                '            </div>',
                '            <div class="comment-desc smart-input">',
                '                <label for="comment_textarea" class="smart-label">请输入您对该商品的使用心得。最多输入255个字</label>',
                '                <textarea class="comment_textarea"></textarea>',
                '                <div class="comment-error">您输入的内容有敏感词，请核对后提交</div>',
                '            </div>',
                '            <p class="submit-box">',
                '                <a href="javascript:;" class="submit-button">追加评价</a>',
                '            </p>',
                '        </div>',
                '    </div>',
                '    <span class="icon-font close {a}">&#xf0004;</span>',
                '</div>'
            ].join('');

            addComment = Ymt.widget.LayerBox('Temps', {
                zIndex: 999,
                isFrame: true,
                Temps: addCommentHtml,
                callback: function () {}
            });

            addCommentLayer({
                "buyerid": $(this).attr("buyerid"),
                "productid": $(this).attr("productid"),
                "src": $(this).attr("pictureurl"),
                "title": $(this).attr("productname"),
                "orderid": $(this).attr("orderid")
            });
        });

        //小窗口提示
        var layerHtml = [
            '<div class="small-layer">',
            '   <i class="{color} icon-font ">{icon}</i>',
            '   <p class="layer-content">{html}</i>',
            '</div>'

        ].join('');
        smallLayer = Ymt.widget.LayerBox('Temps', {
            zIndex: 999,
            isFrame: false,
            Temps: layerHtml,
            callback: function () {}
        });

        struc = Ymt.widget.LayerBox('struc', {
            zIndex: 998,
            isFrame: !1
        });
    }, true);

    $('.alert_box .shut,.alert_box .btn-0-0').live('click', function () {
        struc.close();
    });


    $('.readCreditReply').click(function () {
        var buyerName = $(this).parent().find('.SellerName').val();
        var replyContent = $(this).parent().find('.CreditReply').val();
        $('#ReplyerName').html(buyerName);
        $('#ReplyContent').html(replyContent);
        struc.alert('#notActiveDiv');
    });
});

function addCommentLayer(o) {
    var o = o || {};

    addComment.alert(o);

    $('.comment_textarea').smartInput();

    $('.add-comment-layer .submit-button').click(function (e) {
        var productName = [],
            productComments = [],
            productIdArr = [],
            optionsForBanWord,
            optionsForOrderCredit,
            node = $('.add-comment-layer[productid="' + o.productid + '"]'),
            textarea = node.find('.comment_textarea'),
            comment = textarea.val(),
            productid = node.attr("productid"),
            isComplete = true,
            title = node.find('.product-title').text();


        if (!$.trim(comment)) {
            isComplete = false;
            isShowErrorNode(node.find('.comment-desc'), true, "请您填写内容后再提交！");
        }
        else if ($.trim(comment).length > 255) {
            isComplete = false;
            isShowErrorNode(node.find('.comment-desc'), true, "您提交的评价过长！");
        }

        productIdArr.push(productid);
        productComments.push(comment);
        productName.push(title);

        optionsForBanWord = {
            "StrProductId": productIdArr.join('^$^'),
            "StrComment": productComments.join('^$^')
        };

        optionsForOrderCredit = {
            "BuyerId": o.buyerid,
            "OrderId": o.orderid,
            "ProductId": productIdArr.join('^$^'),
            "SecondComment": productComments.join('^$^')
        };
        if (!isComplete) return;
        //敏感词验证
        $.post('/Order/BuyerOrderDetail/ValidateBanWord', $.toJSON(optionsForBanWord), function (res) {
            var banWordList, i = 0,
                res = $.parseJSON(res) || {},
                banWordList = res.BanWordList || [];
            if (!banWordList.length) {
                //无敏感词
                $(".comment_textarea").removeClass('err');
                $.post('/Order/BuyerOrderDetail/SecondCredit', $.toJSON(optionsForOrderCredit), function (res) {
                    res = $.parseJSON(res) || {};
                    addComment.close();
                    if (res.StatusCode == 200) {
                        showSmallLayer();
                    }
                    else {
                        alert(res.Message);
                    }
                });
            }
            else {
                node.find(".comment_textarea").addClass('err');
                isShowErrorNode(node.find(".comment-desc"), true, "您输入的内容有敏感词，请核对后提交");
            }
        });
    });
};
//是否显示错误提示框。
function isShowErrorNode(node, isShowErrorNode, txt) {
    var errNode;
    if (!node.length) return;
    errNode = node.find('.comment-error');
    txt && errNode.text(txt);
    isShowErrorNode ? errNode.addClass('show') : errNode.removeClass('show');
};
//小窗口提示
function showSmallLayer() {

    var html = "追加评论成功";

    smallLayer.alert({
        "color": "icon-success",
        "icon": "&#x34ae;",
        "html": html
    });

    setTimeout(function () {
        smallLayer.close();
        window.location.href = "http://" + window.location.hostname + "/buyer/order";
    }, 800);
};

function CheckRealWeight(orderId) {
    $.ajaxSetup({
        // Disable caching of AJAX responses */
        cache: false
    });

    $('#creditOrderId').val(orderId);
    $.post("/BuyerOrder/CheckRealWeight?orderId=" + orderId, null, function (data) {
        if (data.result == 2) {
            struc.alert("#creditDiv");
        }
        else {
            ShowCreditDialog(orderId);
        }
    });
}

function updateOrderNote(a, note) {
    ///<summary>更新备注</summary>
    if (note && note.length > 0) {
        showOrderNote(a, note);
    }
    else {
        hideOrderNote(a);
    }
}

function showOrderNote(a, note) {
    ///<summary>显示备注,隐藏图标</summary>
    //    $(a).attr('title', note);
    //    $(a).children('img').show();
    //    $(a).children('span').hide();
    $(a).attr('title', note);
    if (note.length > 5) {
        $(a).html(note.substring(0, 5) + '...');
    }
    else {
        $(a).html(note);
    }
}

function hideOrderNote(a) {
    ///<summary>隐藏备注,显示图标</summary>
    //    $(a).removeAttr('title');
    //    $(a).children('img').hide();
    //    $(a).children('span').show();
    $(a).removeAttr('title');
    $(a).html("<span>备注</span>");
}
$(function () {
    //评价：包裹重量浮层
    $("#creditDiv .btn-0").live("click", function () {
        struc.close();
        var orderId = j$('#creditOrderId').val();
        ShowCreditDialog(orderId);
        return false;
    })
    //show event
    $("a[name=buttonChangeNote]").click(function () {
        //show dialog
        var orderid = $(this).attr('data');
        var content = $(this).attr('title');
        var divdialog = $('#MonoDialog');
        divdialog.find('input[type=hidden][name=OrderId]').val(orderid);
        divdialog.find('textarea[name=Content]').val(content);
        AttentionDialog("#MonoDialog", "#PadB");
    }); //end show event
    //ok event
    $('#buttonMonoOk').live('click', function () {
        var divdialog = $('#MonoDialog');
        var form = divdialog.find('form');
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: $.toJSON(form.serializeObject()),
            msg: this,
            success: function (data) {
                var container = $('#containerChangeNoteDialog');
                container.html(data);
                container.find('.zicBtn').zicBtn();
                var buttonClose = container.find('.Close');
                AttentionDialog("#MonoDialog", "#PadB");
                var orderid = container.find('input[type=hidden][name=OrderId]').val();
                var note = container.find('textarea[name=Content]').val()
                var result = container.find('input[type=hidden][name=result]').val();
                if (result && result.toLowerCase() == 'true') {
                    var a = $('a[data=' + orderid + ']');
                    //updateOrderNote(a, note);
                    a.html("<span style=\"color:Red\">查看备注</span>");
                    alert("更新成功");
                    buttonClose.click();
                }
                else {
                    alert("更新失败，备注过长。");
                }
            },
            dataType: 'html'
        }); //end ajax
        return false;
    }); //end ok event
});

function GetCancelOrderId(a) {
    ///<summary>取得要取消的订单的编号</summary>
    var input = $(a).parent().children("input[type='hidden'][name='PreCancelOrderId']");
    var id = input.val();
    return id;
}

$(function () {

    $("#giftConfirm").dialog({
        autoOpen: false,
        height: 185,
        width: 331,
        modal: true,
        buttons: {

            "确认": function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            window.location.reload();
        }
    });

    $("#merchantGiftConfirm").dialog({
        autoOpen: false,
        height: 185,
        width: 331,
        modal: true,
        buttons: {

            "确认": function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            window.location.reload();
        }
    });

    $("#mergePackageAlert").dialog({
        autoOpen: false,
        height: 185,
        width: 331,
        modal: true,
        buttons: {

            "确认": function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            window.location.reload();
        }
    });

    ///<summary>提交取消订单的表单</summary>
    $("button#btnCloseOD").click(function () {
        var form = $("form#formBuyerOrderCancelControllerDoCancel");
        form.submit();
    });

    $(".Close").click(function () {
        $("#AlertDialog").hide();
        $("#AlertDialogShadow").hide();
    });

    $('.CanNotCancelOrder').click(function () {
        var m = $(this).prev();
        m.show();
        setTimeout(function () {
            m.hide();
        }, 2000);
    });

    function updateLimitTime(node, res) {
        var LimitHours, LimitDays;
        LimitHours = res.LimitHourInterval;
        LimitDays = LimitHours / 24;
        node.find(".hours").html(LimitHours);
        node.find(".dayCount").html(LimitDays);
    }
    $('.noticeDelay').click(function () {
        var orderid = $(this).attr("orderid"),
            delayReceiveFrozened = $(this).attr("delayReceiveFrozened"),
            delayReceiveUserId = $(this).attr("delayReceiveUserId"),
            autoreceivetime = $(this).attr("autoreceivetime");
        $.get("/buyer/order/CanExtendReceipt?orderid=" + orderid + "&delayReceiveFrozened=" + delayReceiveFrozened + "&delayReceiveUserId=" + delayReceiveUserId + "&autoreceivetime=" + autoreceivetime, function (res) {

            if (res.Status == "-1") {
                //已经延长过一次
                struc.alert("#ConfirmAgainLayer");
            }
            else if (res.Status == "0") {
                //距离收货时间大于规定时间，不可以延长收货时间   
                updateLimitTime($("#unableConfirmLayer"), res)
                struc.alert("#unableConfirmLayer");
            }
            else if (res.Status == "1") {
                //可以延长收货时间              
                $("#confirmLayer .btn").attr({
                    "orderid": orderid
                });
                $("#confirmLayer .dayCount").html(res.ExtendReceiptDay);
                struc.alert("#confirmLayer");
            }
        });
    });
    $("#unableConfirmLayer .toClose .btn, #ConfirmAgainLayer .toClose .btn, #confirmedLayer  .toClose .btn, .layerTemps .close, #confirmLayer .cancel").click(function () {
        struc.close();
    });
    $("#confirmLayer .btn").click(function () {
        var orderid = $(this).attr("orderid");
        struc.close();
        $.get("/buyer/order/ToExtendReceipt?orderid=" + orderid, function (res) {
            var date = [];
            if (res.Status == "1") {
                //已经延长过一次
                struc.alert("#ConfirmAgainLayer");
            }
            else if (res.Status == "2") {
                //延期成功
                $('.noticeDelay').attr("delayreceiveuserid", res.UserId);
                $('.noticeDelay').attr("autoreceivetime", res.ReceiveTime);

                date = res.ReceiveTime.split(/\/|-|\s/);
                date[0] += "年";
                date[1] += "月";
                date[2] += "日";
                $("#confirmedLayer .ReceiveTime").html(date.join(""));

                struc.alert("#confirmedLayer");
            }
            else if (res.Status == "3") {
                //距离收货时间大于规定时间，不可以延长收货时间                
                updateLimitTime($("#unableConfirmLayer"), res)
                struc.alert("#unableConfirmLayer");
            }
            else if (res.Status == "4") {
                alert("延期失败，请稍后再试！！！");
            }
        })
    });
    //    $('.complainA').click(function () {
    //        $('#151404live800130869').find('img').click();
    //    });
});

$(document).ready(function () {
    ///<summary>提示支付成功信息</summary>
    var paySuccess = document.getElementById("paySuccess");
    if (paySuccess) {
        if (paySuccess.value == "1") {
            alert("恭喜！支付成功！");
            $("#PadA").attr("style", "");
        }
        $("div.col-sub a").attr("style", "width:118px");
    }
    if ($("#CanNotPayProducts").length > 0) {
        var CanNotPayProducts = $("#CanNotPayProducts").val();
        if (CanNotPayProducts != "") {
            if (confirm("商品：<" + CanNotPayProducts + ">库存不足，或购买数量超过买手限购设置，不能付款，请与买手联系。\r\n您也可以现在取消订单。是否取消订单？")) {
                var orderId = $("#CanNotPayOrderId").val();
                self.location = "/Order/BuyerOrderCancel/BuyerOrderCancel?item=" + orderId;
            }
        }
    }
    $('#checkboxSelectAll').change(function () {
        $('input[type="checkbox"][name="OrderIds"]:not(:disabled)').prop('checked', $('#checkboxSelectAll').prop('checked'));
    });
    $('#buttonMergeOrder').click(function () {
        var postdata = $('input[type="checkbox"][name="OrderIds"]:checked').map(function () {
            return $(this).attr('value');
        }).get();
        $.post("/Order/BuyerOrderPrePay/PreparePrePayOrders", $.toJSON(postdata), function (data) {
            if (data.success == '1') {
                window.location.href = data.redirect;
            }
            else if (data.success == '-1') {
                alert('因杭保订单不支持合并付款，请重新选择订单再支付！');
            }
            else {
                alert(data.message);
            }
        }, 'json');
    });

    $('#btnSetCredit').live('click', function () {
        if ($("input:radio[checked]").length <= 0 || $('input:radio[name="creditPoint2"]:checked').length <= 0 || $('input:radio[name="creditPoint3"]:checked').length <= 0 || $('input:radio[name="creditPoint"]:checked').length <= 0) {
            alert("请选择评分。");
        }
        else {

            var subData = {
                horderid_id: $('#horderid_id').val(),
                hcreditid_id: $('#hcreditid').val(),
                hid_type: $('#hid_type').val(),
                hid_orderId: $('#hid_orderId').val(),
                creditPoint: $('input[name=creditPoint]:checked').val(),
                creditPoint2: $('input[name=creditPoint2]:checked').val(),
                creditPoint3: $('input[name=creditPoint3]:checked').val(),
                creditDescription: $('#creditDescription').val()
            }

            $.post('/Order/BuyerOrder/SetCreditDetail', $.toJSON(subData), function (data) {
                struc.close();
                var json = data;
                if (json.result == 2) {

                    $("#btnOk").click();
                    $('#mergeAlert').html(json.message);
                    $("#mergePackageAlert").dialog("open");
                }
                else if (json.result == 1) {
                    $("#btnCredit_" + $("#hid_orderId").val()).val("修改评价");
                    //alert("感谢您的评价。");
                    $("#btnOk").click();

                    if (json.getReword) {
                        if (json.isSailProtected) {
                            $('.sailpro').show();
                            $('.notsailpro').hide();
                        }
                        else {

                            $('.sailpro').hide();
                            $('.notsailpro').show();
                        }
                        if (json.reward > 0) {
                            $('.giftNum').html(json.reward);
                            if (json.rewardType == 0) {
                                $("#giftConfirm").dialog("open");
                            }
                            else if (json.rewardType == 1) {
                                $("#merchantGiftConfirm").dialog("open");
                            }
                        }
                    }
                    else {
                        window.location.reload();
                    }
                }
                else {
                    alert(json.message);
                }
            }, 'json');
        }
    });

    $('#btnCancelCredit').live('click', function () {
        struc.close();
    });
});



function ShowCreditDialog(orderId) {
    ///<summary>显示评分窗口</summary>
    $.ajax({
        type: "POST",
        url: "/BuyerOrder/GetCreditDetail?id=" + orderId,
        dataType: "json",
        success: function (json) {
            if (json.result == 1) {
                if (json.type == 0) {
                    $("#horderid_id").val(orderId);
                    $("input:radio").removeAttr("checked");
                    $("#creditDescription").empty();
                }
                else if (json.type == 1) {
                    $("input:radio[name='creditPoint'][value=" + json.point + "]").attr("checked", "checked");
                    $("input:radio[name='creditPoint2'][value=" + json.point2 + "]").attr("checked", "checked");
                    $("input:radio[name='creditPoint3'][value=" + json.point3 + "]").attr("checked", "checked");
                    $("#creditDescription").text(json.description);
                    $("#hcreditid").val(json.creditDetailId);
                }

                $("#hid_type").val(json.type);
                $("#hid_orderId").val(orderId);
            }
            else {
                alert("请选择您要评价的交易对象");
                return false;
            }
        }
    });
    try {
        if ($.browser.msie && $.browser.version == 6.0) {
            scroll(0, 0);
        }
    }
    catch (e) {

    }
    //            AttentionDialog("#CreditAttentionDialog", "#CreditAttentionDialogShadow", ".bntCAttentionClose", 20, 30);
    //$("#CreditAttentionDialog").dialog("open");
    struc.alert("#CreditAttentionDialog");
    //            AttentionDialog("#CreditAttentionDialog", "#PadB");


}