/*=======================SupplierDetail.js===========================*/
j$(function () {
    j$(".b_detial_bt").click(function () {
        if (j$(this).hasClass("act")) {
            j$(this).removeClass("act").text("显示全部");
            j$(".b_ditial_s").show();
            j$(".b_ditial").hide();
        }
        else {
            j$(this).addClass("act").text("隐藏");
            j$(".b_ditial_s").hide();
            j$(".b_ditial").show();
        }
    });
});

