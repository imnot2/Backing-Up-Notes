/*=======================SendProductAddress.js===========================*/
var SendProductAddresses;
function clone(myObj) {
    if (typeof (myObj) != 'object') return myObj;
    if (myObj == null) return myObj;

    var myNewObj = new Object();

    for (var i in myObj)
        myNewObj[i] = clone(myObj[i]);

    return myNewObj;
}  

function RefreshSendProductAddresses() {
    for (var i = 0; i < SendProductAddresses.length; i++) {
        if (SendProductAddresses[i].Orders.length > 1) {
            for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
                SendProductAddresses[i].Orders[j].CanBeAlone = true;
            }
        }
        else {
            for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
                SendProductAddresses[i].Orders[j].CanBeAlone = false;
            }
        }
    }
}

function RefreshResult(obj) {
    if (obj.length > 0) {
        $('.op').show();
        $('.norecord').hide();
    }
    else {
        $('.op').hide();
        $('.norecord').show();
    }

    RefreshSendProductAddresses();
  
    $('#selectedResult').html($('#sendProductAddress').tmpl(obj));
}

function SetOrderAlone(orderId) {
    var newSendProductAddress;
    var breakKey = false;
    for (var i = SendProductAddresses.length-1; i >=0 ; i--) {
        for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
            if(SendProductAddresses[i].Orders[j].OrderId==orderId) {
                newSendProductAddress = clone(SendProductAddresses[i]);
            //    SendProductAddresses[i].Orders[j].CanBeAlone = false;
                newSendProductAddress.Orders = [];
                newSendProductAddress.Orders.push(clone(SendProductAddresses[i].Orders[j]));
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
    var breakKey = false;
    for (var i = SendProductAddresses.length - 1; i >= 0; i--) {
        for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
            if (SendProductAddresses[i].Orders[j].OrderId == orderId) {
                SendProductAddresses[i].Orders.splice(j, 1);
                breakKey = true;
                break;
            }
        }
        if(SendProductAddresses[i].Orders.length==0) {
            SendProductAddresses.splice(i, 1);
        }
        if(breakKey) {
            break;
        }
    }
    RefreshResult(SendProductAddresses);
}


$(function () {
    $('#submitBtn').click(function () {
        //        var params = $('#formFilter').find('*').serializeObject();
        var params = {
            PName: $('#filter_PName').val(),
            PayTimeBegin: $('#filter_PayTimeBegin').val() + " " + $('#Begin_h').val() + ":00:00",
            PayTimeEnd: $('#filter_PayTimeEnd').val() + " " + $('#End_h').val() + ":59:59",
            WaitForSendProduct: $('input[name=WaitForSendProduct]').attr('checked'),
        };
        $.ajax({
            url: "/App/SendProductsToolForSeller/GetSendProductsInfo",
            type: "POST",
            data: $.toJSON(params),
            contentType: 'application/json',
            dataType: "json",
            async: false,
            success: function (spa) {
                if (spa != null) {
                    SendProductAddresses = spa;
                    RefreshResult(SendProductAddresses);
                } else {
                    $('#selectedResult').html('');
                    $('.op').hide();
                    $('.norecord').show();
                }
            }
        });
    });

    $('input[name=OrderType]').click(function () {
        if ($('#OrderTypeNormal').attr('checked') == true) {
            $('#CatalogDiv').show();
        } else {
            j$('input[name="CatalogType"]').attr('checked', false);
            j$('input[name="CatalogStatu"]').attr('checked', false);
            $('#CatalogDiv').hide();
        }
    });

    $('.export').click(function () {
        $('#formExport').empty();
        for (var i = 0; i < SendProductAddresses.length; i++) {
            var orderIds = [];
            for (var j = 0; j < SendProductAddresses[i].Orders.length; j++) {
                orderIds.push(SendProductAddresses[i].Orders[j].OrderId);
            }
            $('#formExport').append('<input type="hidden" name="orderIds" value="' + orderIds.join(",") + '" />');
        }
        $('#formExport').submit();
    });
});


