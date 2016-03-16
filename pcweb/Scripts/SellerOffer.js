/*=======================SellerOffer.js===========================*/
j$(function() {
    j$(".rdMore").click(function() {
        if (j$(this).hasClass("rdMoreEx")) {
            j$(this).removeClass("rdMoreEx").text("展开");
            j$(this).nextAll("a").addClass("hidden");
        } else {
            j$(this).addClass("rdMoreEx").text("收起");
            j$(this).nextAll("a").removeClass("hidden");
        }
    });
});
