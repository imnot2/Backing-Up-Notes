/*=======================SellerPage.js===========================*/
j$(function() {
    j$(".rdMore").click(function() {
        if (j$(this).hasClass("rdMoreEx")) {
            j$(this).removeClass("rdMoreEx").text("更多");
            j$(this).nextAll().addClass("hidden");
        } else {
            j$(this).addClass("rdMoreEx").text("收起");
            j$(this).nextAll().removeClass("hidden");
        }
    });

    j$(".s_navs,.s_navsr").not("#s_navprice,.droppad,.unused").hover(
        function() { j$(this).addClass("s_navs_hover"); },
        function() { j$(this).removeClass("s_navs_hover"); }
    );
//    j$("#s_navprice").hover(
//        function() { j$(this).children(".droppad").show(); },
//        function() { j$(this).children(".droppad").hide(); }
//    );

    var minprice = 300;
    var maxprice = 2000;
    var pricesstat = rrequest('pst');
    if (pricesstat != "" && pricesstat == 1) {
        minprice = rrequest('minp');
        maxprice = rrequest('maxp');
        j$("#opPriceRange").click();
    }
    j$("#price_range").slider({
        range: true,
        min: 0,
        max: 5000,
        values: [minprice, maxprice],
        slide: function(event, ui) {
            j$("#amount").val('￥' + ui.values[0] + ' - ￥' + ui.values[1]);
        }
    });
    j$("#amount").val('￥' + j$("#price_range").slider("values", 0) + ' - ￥' + j$("#price_range").slider("values", 1));

//    var op;
//    j$(".uheader").hover(function() { j$(this).addClass("uheader_h"); }, function() { j$(this).removeClass("uheader_h"); });
//    j$(".uheader a.tipico").click(function() {
//        if (!j$(this).hasClass("op")) {
//            var fs = j$(this).offset();
//            op = j$(this);
//            op.addClass("op");
//            j$("#dd_menu_boxitem").css({ top: fs.top + 12, left: fs.left }).show();
//            j$("#blurPad").show().click(function() {
//                j$(this).hide();
//                op.removeClass("op");
//                j$("#dd_menu_boxitem").hide();
//            });
//        } else {
//            j$(this).removeClass("op");
//            j$("#dd_menu_boxitem").hide();
//        }
//    });
//    j$("#linkMsgDialog").click(function() {
//        op.removeClass("op");
//        j$("#dd_menu_boxitem").hide();
//        AttentionDialog("#MsgDialog","#PadB");
//    });
//    j$("#bntMsnConnect").click(function() {
//        if (j$(this).text() == "联系MSN") {
//            var msncode = j$("#msncode").text();
//            j$(this).after("<iframe src='http://settings.messenger.live.com/Conversation/IMMe.aspx?invitee=" + msncode + "@apps.messenger.live.com&mkt=zh-cn' width='300' height='300' style='border: solid 1px black; width: 300px; height: 300px;' frameborder='0'></iframe>");
//            j$(this).text("关闭MSN");
//        } else {
//            j$(this).text("联系MSN").nextAll().remove();
//        }
//    });

//    j$(".pl_tit_a").click(function() {
//        if (!j$(this).hasClass("op")) {
//            j$(this).addClass("op").parent(".pl_tit").next(".pl_con").hide();
//        } else {
//            j$(this).removeClass("op").parent(".pl_tit").next(".pl_con").show();
//        }
//    });
//    j$(".plss").each(function() {
//        j$(this).find(".pl_tit_a").click();
//    });
//    j$(".pl_ctl_l").click(function() {
//        var $slider = j$(this).closest(".pl_con");
//        var left = parseInt(j$(".win", $slider).css("margin-left"));
//        j$(".win", $slider).animate({ marginLeft: left + 244 }, 1000, function() {
//            testingSlider($slider);
//        });
//    });
//    j$(".pl_ctl_r").click(function() {
//        var $slider = j$(this).closest(".pl_con");
//        var left = parseInt(j$(".win", $slider).css("margin-left"));
//        j$(".win", $slider).animate({ marginLeft: left - 244 }, 1000, function() {
//            testingSlider($slider);
//        });
//    });
//    var testingSlider = function(o) {
//        var left = parseInt(j$(".win", o).css("margin-left"));
//        j$(".pl_ctl_l,.pl_ctl_r", o).removeClass("height0");
//        var conutW = -((j$("img", o).size() - 2) * 122);
//        if (left < conutW + 1) {
//            j$(".pl_ctl_r", o).addClass("height0");
//        }
//        if (left > -1) {
//            j$(".pl_ctl_l", o).addClass("height0");
//        }
//    }
});


