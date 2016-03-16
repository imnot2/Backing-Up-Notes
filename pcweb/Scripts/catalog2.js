/*=======================catalog2.js===========================*/
j$(function() {
    j$("#simg_slider").cycle({
        fx: 'scrollLeft',
        speed: 1000,
        delay: 50000,
        timeout: 100000,
        next: '#Next',
        prev: '#Prev',
        prevNextClick: function(a, z, s) {
            j$("#simg_PN .curcount").text(z + 1);
        }
    });
    var img_count = j$("#simg_slider").children("a").size();
    j$("#simg_PN .count").text(img_count);
    j$("a.zoom").fancybox({
        'overlayOpacity': 0.7,
        'overlayColor': '#2B2A25',
        'zoomSpeedIn': 600,
        'zoomSpeedOut': 400
    });

    j$(".selol li").click(function() {
        j$(this).parent(".selol").children("li").removeClass("sel");
        j$(this).addClass("sel");
    });

    j$('.bbnt a')
    .css({ 'backgroundPosition': '0 0' })
	.hover(
      function() {
          j$(this).stop()
          .animate({
              'opacity': 0
          }, 650);
      },
	  function() {
	      j$(this).stop()
          .animate({
              'opacity': 1
          }, 650, function() {
            j$(this).removeAttr("style");
          });
	  }
	);
	
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
    
    j$("#checkboxtabs").tabs();
    
    j$("ol.selol li").click(function(){
        var val = j$(this).attr("title");
        var text = j$(this).text();
        j$(this).parent("ol").nextAll().val(text);
        j$(this).parent("ol").next("input.hdpopV").val(val);
    });
    
    j$(".txtNumVal").validationEngine({ validationEventTriggers: "keyup blur" });

    
});

//var getpop = function(){
//    j$("input.hdpopT").each(function(){
//        var sel = j$(this).prev("ol.selol").children("li.sel");
//        var text = sel.text();
//        j$(this).val(text);
//    });
//    j$("input.hdpopV").each(function(){
//        var sel = j$(this).prev("ol.selol").children("li.sel");
//        var val = sel.attr("title");
//        j$(this).val(val);
//    });    
//}
