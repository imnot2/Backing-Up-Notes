/*=======================XloboInvoice.js===========================*/
var SendProductAddresses;

function RefreshResult(obj) {
    ///<summary>重新渲染界面</summary>
    $('#selectedResult').html($('#ResultTemplate').tmpl(obj));
}

function SetOrderAlone(orderId) {
    var newSendProductAddress;
    var breakKey = false;
    for (var i = SendProductAddresses.length - 1; i >= 0 ; i--) {
        for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
            if (SendProductAddresses[i].Orders[j].OrderId == orderId) {
                newSendProductAddress = SendProductAddresses[i].clone();
                newSendProductAddress.Orders = [];
                newSendProductAddress.Orders.push(SendProductAddresses[i].Orders[j].clone());
                SendProductAddresses[i].Orders.splice(j, 1);
                breakKey = true;
                break;
            }
        }
        if (SendProductAddresses[i].Orders.length == 0) {
            SendProductAddresses.splice(i, 1);
        }
        if (breakKey && newSendProductAddress != null) {
            SendProductAddresses.push(newSendProductAddress);
            break;
        }
    }
    RefreshResult(SendProductAddresses);
}

function RemoveOrder(orderId) {
    ///<summary>移除订单</summary>
    var breakKey = false;
    for (var i = SendProductAddresses.length - 1; i >= 0; i--) {
        for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
            if (SendProductAddresses[i].Orders[j].OrderId == orderId) {
                SendProductAddresses[i].Orders.splice(j, 1);
                breakKey = true;
                break;
            }
        }
        if (SendProductAddresses[i].Orders.length == 0) {
            SendProductAddresses.splice(i, 1);
        }
        if (breakKey) {
            break;
        }
    }
    RefreshResult(SendProductAddresses);
}

$(function () {
    $('#submitBtn').click(function () {
        var params = $('#formFilter').find('*').serializeObject();
        params.OrderType= $('input.filterOrderType:checked').val();
        $.ajax({
            url: "/SendProductsToolForSeller/GetXloboInvoice",
            type: "POST",
            data: $.toJSON(params),
            contentType: 'application/json',
            dataType: "json",
            async: false,
            success: function (spa) {
                SendProductAddresses = spa;
                RefreshResult(SendProductAddresses);
            }
        });
    });

    $('#export').click(function () {
        ///<summary>新窗口打开下载页面</summary>
        var orderIds = [];
        for (var i = 0; i < SendProductAddresses.length; i++) {
            var orders = "";
            for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
                orders += (SendProductAddresses[i].Orders[j].OrderId + ",");
            }
            orderIds.push(orders);
        }
        $('#formExport').find('input[type="hidden"]').val(orderIds);
        $('#formExport').submit();
    });
});


