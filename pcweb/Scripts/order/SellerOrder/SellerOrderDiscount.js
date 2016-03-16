/*=======================SellerOrderDiscount.js===========================*/
function refreshTotalPrice() {
    var orderOriginalPriceText = $('#OrderOriginalPrice').html();
    var freightText = $('#freightText').val();
    var discountText = $('#discountText').val();
    var k = 0;
    if ($('.ChangeType:checked').length > 0) {
        k = $('.ChangeType:checked').val();
    }
    if (isNaN(discountText) || isNaN(freightText) || (parseFloat(orderOriginalPriceText) + parseFloat(discountText) * k) < 0 || parseFloat(freightText) < 0) {
        alert("修改金额错误");
        $('#totalAmount').html(0);
        return false;
    }
    var newTotalPrice = parseFloat(orderOriginalPriceText) + parseFloat(discountText) * k + parseFloat(freightText);
    $('#totalAmount').html(newTotalPrice.toFixed(2));
    return true;
}

function checkForm() {
    if ($('.ChangeType:checked').length == 0) {
        alert("请选择价格变动方式");
        return false;
    }

    if (!refreshTotalPrice()) {
        return false;
    }

    var freightText = $('#freightText').val();
    var discountText = $('#discountText').val();
    var k = $('.ChangeType:checked').val();
    var discount = parseFloat(k) * parseFloat(discountText);
    $('#discount').val(discount);
    $('#freight').val(parseFloat(freightText));

    var form = $("#discountForm");
    $.post(form.attr('action'), $.toJSON(form.serializeObject()), function(data) {
        var json = data;
        if (json.success == 1) {
            alert("订单价格修改成功，请返回！");
            location.href = $('#refUrl').val();
        } else {
            alert(json.msg);
        }
    }, 'json');

}

$(function () {
    $('.ChangeType').click(function () {
        refreshTotalPrice();
    });

    $('#discountText').change(function () {
        refreshTotalPrice();
    });

    $('#freightText').change(function() {
        refreshTotalPrice();
    });
});
