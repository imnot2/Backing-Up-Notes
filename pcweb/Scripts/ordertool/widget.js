/*=======================widget.js===========================*/
/// <reference path="~/Scripts/Enums/UserType.js" />
/// <reference path="~/Scripts/jquery-1.6.2.js" />

//-----找我下单按钮
j$(function () {
    j$('.buttonGotoOrderTool').live('click', function () {
        j$(this).attr('target', '_self');
        var type = j$('#CurrentUserType').val();
        if (type == UserType.NotLogin || type == UserType.Normal) {
            var sellerUserId = j$(this).attr('data-SellerUserId');
            var productName = j$(this).attr('data-ProductName');
            var productUrl = j$(this).attr('data-ProductUrl');
            var productPictureUrl = j$(this).attr('data-ProductPictureUrl');
            var officalPrice = j$(this).attr('data-OfficalPrice');
            var topicId = j$('input#OrderToolTopicId').val();
            window.location.href = '/buyer/order/ordertool-for-' + sellerUserId + '/IndexFromTopicWithDiscount?topicId=' + topicId + '&title=' + encodeURIComponent(productName) + '&price=' + officalPrice + '&ref=' + encodeURIComponent(productUrl) + '&pic=' + encodeURIComponent(productPictureUrl);
        } else {
            alert('您不是买家，不能使用下单器');
        }
    });
});
