/*=======================sProject.js===========================*/
j$(function() {
    j$("#brandKey").zicAutoLi({ul:"ul#brandKeyUl",participle:true});
    j$("#brandKey").bind("keydown",function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) {
            window.location.href = j$("ul#brandKeyUl li:first-child a").attr("href");
        }
    });
    if (j$.browser.version != 6.0) {
        j$("#sch_def").hover(
            function() {
                j$(this).addClass("sch_tit_hover");
            },
            function() {
                j$(this).removeClass("sch_tit_hover");
            }
        ).click(function(e) {
            this.y = (e.pageY);
            this.x = (e.pageX);
            j$("#sch_querybox,#sch_queryshadow").css({ "top": this.y - 25, "left": this.x - 120 }).show();
            j$("#txtSearchBoxF").each(function() {
                j$(this).data("txt", j$.trim(j$(this).val()));
            }).focus(function() {
                if (j$.trim(j$(this).val()) == j$(this).data("txt")) {
                    j$(this).val("");
                }
            }).blur(function() {
                if (j$.trim(j$(this).val()) == "") {
                    j$(this).val(j$(this).data("txt"));
                }
            });
        });
        j$("#sch_close").click(function() {
            j$("#sch_querybox,#sch_queryshadow").hide();
        });
    }

//    j$(".s_navs,.s_navsr").not("#s_navprice,.droppad,.unused").hover(
//        function() { j$(this).addClass("s_navs_hover"); },
//        function() { j$(this).removeClass("s_navs_hover"); }
//    );
//    j$("#s_navprice").hover(
//        function() { j$(this).children(".droppad").show(); },
//        function() { j$(this).children(".droppad").hide(); }
//    );
//    j$("#s_navpage").click(function() {
//        var $pg = j$("#pagebox");
//        if ($pg.css("display") == "none") {
//            $pg.show();
//            $pg.children(".fg-tooltip-clo").click(function() {
//                $pg.hide();
//            });
//        } else {
//            $pg.hide();
//        }
//    });

    //j$(".droppad").dropShadow({ left: 2, top: 2, blur: 2, opacity: .5, swap: true });
    //j$("#s_navpage").dropShadow({ left: 2, top: 2, blur: 2, opacity: .5, swap: true });
    //j$("#f_accordion").accordion({});

//    var flbrands_bt = j$("#flbrands_bt");
//    flbrands_bt.data("init", false);
//    flbrands_bt.click(function() {
//        if (j$(this).data("init") != true) {
//            j$("#flbrands ul li").ahover({ toggleEffect: "both", moveSpeed: 75, toggleSpeed: 250, className: 'y_fhover' });
//            j$(this).data("init", true);
//        }
//    });

    //    var flprices_bt = j$("#flprices_bt");
    //    flprices_bt.data("init", false);
    //    flprices_bt.click(function() {
    //        if (j$(this).data("init") != true) {
    //            j$("#flprices ul li").ahover({ toggleEffect: "width", moveSpeed: 75, toggleSpeed: 250, className: 'y_fhover' });
    //            j$(this).data("init", true);
    //        }
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

//    j$("#s_list2 .s_detial_bt").click(function() {
//        if (j$(this).hasClass("act")) {
//            j$(this).removeClass("act").text("展开");
//            j$(this).prevAll(".s_ditial_ts").show();
//            j$(this).prev(".s_ditial_t").hide();
//        } else {
//            j$(this).addClass("act").text("收缩");
//            j$(this).prev(".s_ditial_t").show();
//            j$(this).prevAll(".s_ditial_ts").hide();
//        }
//    });

//    j$(".s_viewB").click(function() {
//        if (!j$(this).hasClass("s_viewSel")) {
//            j$(".s_viewV").removeClass("s_viewSel");
//            j$(this).addClass("s_viewSel");
//            j$(".s_list_mod").hide();
//            j$("#s_list").show();
//        }
//    });
//    j$(".s_viewL").click(function() {
//        if (!j$(this).hasClass("s_viewSel")) {
//            j$(".s_viewV").removeClass("s_viewSel");
//            j$(this).addClass("s_viewSel");
//            j$(".s_list_mod").hide();
//            j$("#s_list2").show();
//        }
//    });
});
