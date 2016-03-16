/*=======================Brand.js===========================*/
j$(function() {
    //j$(".dialogbt").hover(function() { j$(this).addClass("ui-state-hover") }, function() { j$(this).removeClass("ui-state-hover") });

//        j$(".cloud a", $AttentionDialog).click(function() {
//            if (j$(this).data("init") != true) {
//                var $txt = j$("#txtTags", $AttentionDialog);
//                if (j$.trim($txt.val()) == $txt.data("txt")) {
//                    var txtval = "";
//                } else {
//                    var txtval = $txt.val();
//                }
//                txtval = txtval + j$(this).text() + "、";
//                $txt.val(txtval);
//                j$(this).data("init", true);
//            }
//        });
    j$(".s_navs,.s_navsr").not("#s_navprice,.droppad,.unused").hover(
            function() { j$(this).addClass("s_navs_hover"); },
            function() { j$(this).removeClass("s_navs_hover"); }
        );
    j$("#s_navprice").hover(
            function() { j$(this).children(".droppad").show(); },
            function() { j$(this).children(".droppad").hide(); }
        );
//    j$("#s_navpage_p").click(function() {
//        var $pg = j$("#pagebox_p");
//        if ($pg.css("display") == "none") {
//            $pg.show();
//            $pg.children(".fg-tooltip-clo").click(function() {
//                $pg.hide();
//            });
//        } else {
//            $pg.hide();
//        }
//    });

    //j$(".f_accordion").accordion({});

//    j$(".filetree").treeview();
//    j$(".treeview .folder").unbind().hover(
//        function() { j$(this).addClass("folder_h"); },
//        function() { j$(this).removeClass("folder_h"); }
//    );
//    j$(".treeview .file").unbind().hover(
//        function() { j$(this).addClass("file_h"); },
//        function() { j$(this).removeClass("file_h"); }
//    );

//    j$('h1 .b_star').each(function() {
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
//    j$('.s_star').each(function() {
//        var vae = parseInt(j$(this).attr("title"));
//        var options = {
//            min: 0,
//            max: 4,
//            step: 1,
//            image: 'http://img.ymatou.com/portal/images/star2.gif',
//            width: 16,
//            height: 16,
//            value: vae - 1,
//            enabled: false
//        }
//        j$(this).rater(options);
//    });

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
