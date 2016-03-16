/*=======================WithDrawalManage.js===========================*/
function handle(wdid) {
    $.ajax({
        url: "/WithDrawalManage/HandleWithDrawal?id=" + wdid,
        type: "post",
        async: false,
        success: function (msg) {
            if (msg == "True") {
                alert("受理成功");
                location.reload();
            } else {
                alert("受理失败");
            }
        }
    });
}

function pass(wdid) {
    $.ajax({
        url: "/WithDrawalManage/PassWithDrawal?id=" + wdid,
        type: "post",
        async: false,
        success: function (msg) {
            if (msg == "True") {
                alert("成功通过");
                location.reload();
            } else {
                alert("通过失败");
            }
        }
    });
}

function refuse(wdid, explain) {
    $.ajax({
        url: "/WithDrawalManage/RefuseWithDrawal?id=" + wdid + "&e=" + encodeURIComponent(explain),
        type: "post",
        async: false,
        success: function(msg) {
            if (msg == "True") {
                alert("成功拒绝");
                location.reload();
            } else {
                alert("拒绝失败");
            }
        }
    });
}

function showRefuseBox(wdid) {
    $('#messageBoxTitle').html('拒绝理由：');
    $('#subId').val(wdid);
    $('#subType').val('refuse');
    $("#messageBox").dialog("open");    
}

function finish(wdid) {
    if (confirm("提现号为：" + wdid + "的提现即将标志为转账成功，是否继续？")) {
        $.ajax({
            url: "/WithDrawalManage/FinishTransfer?id=" + wdid,
            type: "post",
            async: false,
            success: function(msg) {
                if (msg == "True") {
                    alert("记录成功");
                    $('.tr_' + wdid).remove();
                } else {
                    alert("记录失败");
                }
            }
        });
    }
}

function failed(wdid, explain) {
    $.ajax({
        url: "/WithDrawalManage/TransferFailed?id=" + wdid + "&e=" + encodeURIComponent(explain),
        type: "post",
        async: false,
        success: function(msg) {
            if (msg == "True") {
                alert("记录成功");
                location.reload();
            } else {
                alert("记录失败");
            }
        }
    });
}

function showFailedBox(wdid) {
    $('#messageBoxTitle').html('打款失败理由：');
    $('#subId').val(wdid);
    $('#subType').val('failed');
    $("#messageBox").dialog("open");
}

function getSelectedWdr() {
    var t = $('#seller_info');
    var items = t.find('input[class="selectedWdr"]:checked');
    var ids = new Array();
    items.each(function (index, data) {
        ids.push(j$(data).val());
    });
    return ids;
}

$(function () {
    //    $('.Finish').click(function () {
    //        var wid = $(this).next().val();
    //        $.ajax({
    //            url: "/WithDrawalManage/FinishTransfer?id=" + wid,
    //            type: "post",
    //            async: false,
    //            success: function (msg) {
    //                if (msg == "True") {
    //                    alert("记录成功ll");
    //                    $('.tr_' + wid).remove();
    //                } else {
    //                    alert("记录失败");
    //                }
    //            }
    //        });
    //    });

    $('#batchAccept').click(function () {
        var ids = getSelectedWdr();
        if (ids.length == 0) {
            alert("请选择要受理的申请");
        } else {
            var url = '/WithDrawalManage/HandleBatchWithDrawals';
            j$.post(url, j$.toJSON({ 'ids': ids }), function (data) {
                if (data == "True") {
                    alert("批量受理成功");
                    window.location.reload();
                } else {
                    alert("批量受理失败：状态错误");
                }
            }, 'text');
        }
    });

    $('#batchExportToTaoBao').click(function () {
        var ids = getSelectedWdr();
        if (ids.length == 0) {
            alert("请选择要转账到淘宝的申请");
        } else {
            $('#idsForTaobao').val(ids);
            $('#TaobaoForm').submit();
            alert("下载后请手动刷新页面");
            //            var url = '/WithDrawalManage/ExportTransferToTaoBao?ids=' + ids;
            //            window.open(url);
            //            window.location.reload();
        }
    });

    $('#batchExportToBank').click(function () {
        var ids = getSelectedWdr();
        if (ids.length == 0) {
            alert("请选择要转账到银行的申请");
        } else {
            $('#idsForBank').val(ids);
            $('#BankForm').submit();
            alert("下载后请手动刷新页面");
            //            var url = '/WithDrawalManage/ExportTransferToBank?ids=' + ids;
            //            window.open(url);
            //            window.location.reload();
        }
    });

    $('#batchExportToAbroadBank').click(function () {
        var ids = getSelectedWdr();
        if (ids.length == 0) {
            alert("请选择要转账到银行的申请");
        } else {
            $('#idsForBank').val(ids);
            $('#BankForm').submit();
            alert("下载后请手动刷新页面");
            //            var url = '/WithDrawalManage/ExportTransferToAbroadBank?ids=' + ids;
            //            window.open(url);
            //            window.location.reload();
        }
    });

    j$("#messageBox").dialog({
        autoOpen: false,
        height: 300,
        width: 600,
        modal: true,
        buttons: {

            "确认": function () {
                if ($('#subType').val() == 'refuse') {
                    refuse($('#subId').val(), $('#explain').val());
                }
                if ($('#subType').val() == 'failed') {
                    failed($('#subId').val(), $('#explain').val());
                }
                $('#explain').val("");
                j$(this).dialog("close");
            },
            "取消": function () {
                j$(this).dialog("close");
            }
        },
        close: function () {
        }
    });

    $("#CheckAll").click(function () {
        $(".selectedWdr").attr("checked", $(this).attr("checked") == true);
    });
});
