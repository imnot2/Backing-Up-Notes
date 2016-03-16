/*=======================project.js===========================*/
j$(function () {
    j$(".bntEnquiry").click(function () {
        cttr = j$(this).closest("div.cttrdivwh");
        var seller = j$("span.u", cttr).text();
        var loc = j$("span.s", cttr).text();
        var proprice = j$("span.b", cttr).text();
        var ret = j$("span.r", cttr).text();
        var tim = j$("span.t", cttr).text();
        enquiry = j$("#EnquiryDialog");
        j$("a.u", enquiry).text(seller);
        j$("span.s", enquiry).text(loc);
        j$("span.b", enquiry).text(proprice);
        j$("span.r", enquiry).text(ret);
        j$("span.t", enquiry).text(tim);
        j$("#txtEnquiry").val("    您好" + seller + "：\n" +
    "    本人想想你询问" + j$("span#projtxt").text() + "商品的报价，希望的规格是：\n\n" +
    "    请速回复，谢谢！");
        AttentionDialog("#EnquiryDialog", "#PadB");
    });
    j$("#simg_slider").cycle({
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
    var img_count = j$("#simg_slider").children("a").size();
    j$("#simg_PN .count").text(img_count);
    j$("a.zoom").fancybox({
        'overlayOpacity': 0.7,
        'overlayColor': '#2B2A25',
        'zoomSpeedIn': 600,
        'zoomSpeedOut': 400
    });

    j$(".stat").hover(function () {
        j$(this).addClass("statHover").children("ul.toc").show();
    },
    function () {
        j$(this).removeClass("statHover").children("ul.toc").hide();
    });

    j$(".filetree").treeview();
    j$(".treeview .folder").unbind().hover(
        function () { j$(this).addClass("folder_h"); },
        function () { j$(this).removeClass("folder_h"); }
    );
    j$(".treeview .file").unbind().hover(
        function () { j$(this).addClass("file_h"); },
        function () { j$(this).removeClass("file_h"); }
    );

    //    j$('.p_star').each(function() {
    //        var vae = parseInt(j$(this).attr("title"));
    //        var options = {
    //            min: 0,
    //            max: 4,
    //            step: 1,
    //            image: 'http://img.ymatou.com/portal/images/star.gif',
    //            width: 25,
    //            height: 25,
    //            value: vae - 1,
    //            enabled: false
    //        }
    //        j$(this).rater(options);
    //    });

    j$("h3 .com_dbt").click(function () {
        $comment = j$(this).closest(".pjcomment");
        if (j$(this).hasClass("act")) {
            j$(this).removeClass("act").text("展开");
            j$(".com_bs", $comment).show();
            j$(".com_b", $comment).hide();
        } else {
            j$(this).addClass("act").text("收缩");
            j$(".com_b", $comment).show();
            j$(".com_bs", $comment).hide();
        }
    });

    var $samelist = j$("#p_samelist");
    j$("#win_arrl", $samelist).click(function () {
        var left = parseInt(j$(".win", $samelist).css("margin-left"));
        if (left != 0) {
            j$(".win", $samelist).animate({ marginLeft: left + 650 }, 1000, function () {
                left = parseInt(j$(".win", $samelist).css("margin-left"));
                if (left > -1) {
                    j$("#win_arrl", $samelist).removeClass("act");
                }
            });
        }
    });
    j$("#win_arrr", $samelist).click(function () {
        var left = parseInt(j$(".win", $samelist).css("margin-left"));
        var size = j$(".win", $samelist).children("li").size();
        if ((size * 130 - 1) < -(left - 650)) {
            var html = "<li><a href='#'><img class='img_a' src='http://img.ymatou.com/portal/images/loading.gif'></a></li>";
            for (var i = 0; i < 5; i++) {
                j$(".win", $samelist).append(html);
            }
        }
        j$(".win", $samelist).animate({ marginLeft: left - 650 }, 1000);
        j$("#win_arrl", $samelist).addClass("act");
    });

    j$(".p_brand").hover(function () {
        var $tit = j$(this).children(".p_brandtitbox");
        if (j$.browser.msie && j$.browser.version <= "7.0") {
            $tit.children(".p_brandtit").animate({ lineHeight: 42, top: 0, color: "#ABC8E2" });
        } else {
            $tit.children(".p_brandtit").animate({ lineHeight: 32, top: 0, color: "#ABC8E2" });
        }
        $tit.children(".p_brandtit_ass").animate({ left: 100 }).hide();
    }, function () {
        var $tit = j$(this).children(".p_brandtitbox");
        if (j$.browser.msie && j$.browser.version <= "7.0") {
            $tit.children(".p_brandtit").animate({ lineHeight: 32, top: -14, color: "#B0250E" });
        } else {
            $tit.children(".p_brandtit").animate({ lineHeight: 0, top: -14, color: "#B0250E" });
        }
        $tit.children(".p_brandtit_ass").show().animate({ left: 0 });
    });

    j$("#showCatalog").bind("click", function () {
        var catalogbox = j$("#catalogbox");
        var dom = j$("#catalogcon", catalogbox);
        if (j$(dom).css("display") == "none") {
            catalogbox.animate({ width: 550, height: 255 });
            j$(dom).slideDown("slow");
            j$(this).children("span").text("收起");
            j$("#moreBnt").show();
        } else {
            catalogbox.animate({ width: 336, height: 25 }).removeClass("exStat");
            j$(dom).slideUp();
            j$(this).children("span").text("我想买");
            j$("#moreBnt").hide();
        }
    });

    //    j$(".cttrdiv").hover(function(){
    //        j$(this).addClass("cttrdiv_hover");
    //    },function(){
    //        j$(this).removeClass("cttrdiv_hover");
    //    });

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

    j$("a.bntEnquiry").hover(function () {
        j$(this).next("span.hdtips").show();
    }, function () {
        j$(this).next("span.hdtips").hide();
    });
});
