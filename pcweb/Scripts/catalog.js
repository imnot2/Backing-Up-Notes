﻿/*=======================catalog.js===========================*/
j$(function () {
    j$("#simg_slider ul").cycle({
        fx: 'scrollLeft',
        speed: 1000,
        delay: 50000,
        timeout: 100000,
        next: '#Next',
        prev: '#Prev',
        prevNextClick: function (a, z, s) {
            j$("#simg_PN .curcount").text(z + 1);
        }
    });
    var img_count = j$("#simg_slider ul").children("li").size();
    j$("#simg_PN .count").text(img_count);
    j$("#simg_slider a.zoom").fancybox({
        'overlayOpacity': 0.7,
        'overlayColor': '#2B2A25',
        'zoomSpeedIn': 600,
        'zoomSpeedOut': 400
    });

    j$(".selol li").click(function () {
        j$(this).parent(".selol").children("li").removeClass("sel");
        j$(this).addClass("sel");
    });
    getpop();

    j$('.u_star').each(function () {
        var vae = parseInt(j$(this).attr("title"));
        var options = {
            min: 0,
            max: 4,
            step: 1,
            image: 'http://img.ymatou.com/portal/images/star2.gif',
            width: 16,
            height: 16,
            value: vae - 1,
            enabled: false
        }
        j$(this).rater(options);
    });

    j$('.bbnt a')
    .css({ 'backgroundPosition': '0 0' })
	.hover(
      function () {
          j$(this).stop()
          .animate({
              'opacity': 0
          }, 650);
      },
	  function () {
	      j$(this).stop()
          .animate({
              'opacity': 1
          }, 650, function () {
              j$(this).removeAttr("style");
          });
	  }
	);

    var $b_chief = j$(".b_chief");
    j$(".b_detial_bt", $b_chief).click(function () {
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

    j$("#checkboxtabs").tabs();
});

var getpop = function(){
    j$("input.hdpop").each(function(){
        var val = j$(this).prev("ol.selol li.sel").text();
        j$(this).val(val);
    });
}
