/*=======================Help.js===========================*/
j$(function() {
    var $b_chief = j$(".b_chief");
    j$(".b_detial_bt", $b_chief).click(function() {
        if (j$(this).hasClass("act")) {
            j$(this).removeClass("act").text("展开>>");
            j$(".b_ditial_s", $b_chief).show();
            j$(".b_ditial", $b_chief).hide();
        } else {
            j$(this).addClass("act").text("<<收缩");
            j$(".b_ditial", $b_chief).show();
            j$(".b_ditial_s", $b_chief).hide();
        }
    });
});
