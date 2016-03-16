/*=======================PurchaseOrder.js===========================*/
var PurchaseOrders;

function RefreshResult(obj) {
    if (obj == null || obj.length == 0) {
        $('#ResultLine').hide();
        alert('很抱歉，没有找到符合条件的记录！');
        $('#selectedResult').html('');
        $('.exportDiv').hide();
    } else {
        $('#ResultLine').show();
        $('#selectedResult').html($('#purchaseOrder').tmpl(obj));
        $('.exportDiv').show();
    }
}

//function RemoveOrderInfo(orderInfoId) {
//    var breakKey = false;
//    for (var i = PurchaseOrders.length-1; i >= 0; i--) {
//        for (var j = 0; j < PurchaseOrders[i].OrderInfos.length; j++) {
//            if (PurchaseOrders[i].OrderInfos[j].OrderInfoId == orderInfoId) {
//                PurchaseOrders[i].OrderInfos.splice(j, 1);
//                breakKey = true;
//                break;
//            }
//        }
//        if(PurchaseOrders[i].OrderInfos.length==0) {
//            PurchaseOrders.splice(i, 1);
//        }
//        if(breakKey) {
//            break;
//        }
//    }
//    RefreshResult(PurchaseOrders);
//}

function RemoveOrder(orderId) {
    for (var i = 0; i < PurchaseOrders.length; i++) {
        if(PurchaseOrders[i].OrderId==orderId) {
            PurchaseOrders.splice(i, 1);
            break;
        }
    }
    RefreshResult(PurchaseOrders);
}

//function GetOrderTypes() {
//    var r = [];
//    $('input[name=OrderType]:checked').each(function() {
//        r.push($(this).val());
//    });
//    return r;
//}

function GetCatalogTypes() {
    var r = [];
    $('input[name=CatalogType]:checked').each(function () {
        r.push($(this).val());
    });
    return r;
}

function GetOrderTypes() {
    var r = [];
    $('input[name=OrderType]:checked').each(function () {
        r.push($(this).val());
    });
    return r;
}

$(function () {
    $("#PayDataBegin").datepicker();
    $("#PayDataEnd").datepicker();

    $('#submitBtn').click(function () {
        //        var params = $('#subForm').find('*').serializeObject();
        var params = {
            PayTimeBegin: $('#PayDataBegin').val() + " " + $('#PayHourBegin').val() + ":00:00",
            PayTimeEnd: $('#PayDataEnd').val() + " " + $('#PayHourEnd').val() + ":59:59",
            WaitForPostPay: $('#WaitForPostPay').attr('checked'),
            WaitForBuyPostPay: $('#WaitForBuyPostPay').attr('checked'),
            WaitForSendProduct: $('#WaitForSendProduct').attr('checked'),
            OrderTypes: GetOrderTypes(),
            //CatalogTypes: GetCatalogTypes(),
            OrderType: $('input[name=hidOrderType]').val()
        };
        $.ajax({
            url: "/SendProductsToolForSeller/GetPurcahseOrderResult",
            type: "POST",
            data: $.toJSON(params),
            contentType: 'application/json',
            dataType: "json",
            async: false,
            success: function (pos) {
                PurchaseOrders = pos;
                RefreshResult(PurchaseOrders);
            }

        });
    });

    //$('input[name=OrderType]').click(function () {
    //    if ($(this).val() == 0) {
    //        $('#seleteitem-2').show();
    //    } else {
    //        $('#seleteitem-2').hide();
    //    }
    //});

    $('.exportBtn').click(function () {
        $('#formExport').empty();
        for (var i = 0; i < PurchaseOrders.length; i++) {
            for (var j = 0; j < PurchaseOrders[i].OrderInfos.length; j++) {
                $('#formExport').append('<input type="hidden" name="orderInfoId" value="' + PurchaseOrders[i].OrderInfos[j].OrderInfoId + '" />');
            }
        }
        $('#formExport').submit();
        //        $.ajax({
        //            url: "/SendProductsToolForSeller/CreatePurchaseOrder",
        //            type: "post",
        //            data: $.toJSON(orderInfoId),
        //            contentType: 'application/json',
        //            dataType: "text",
        //            async: false,
        //            success: function (pos) {

        //            }
        //        });
        /*Make sure you cancel the default action by returning false so that the browser doesn't follow the link*/
        return false;
    });
});

