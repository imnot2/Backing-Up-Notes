/*=======================Category.js===========================*/
j$(function() {

    j$("#brandKey").zicAutoLi({ul:"ul#brandKeyUl",participle:true});

//    j$("#brandKey").keydown(function(){
//        var txtBrandLi = "";
//        var c = GetFirstCharArray(j$(this).val());
//        var d = [];
//        j$.each(c,function(ci,cv){
//            j$("a",ul).each(function(){
//                var a = j$(this);
//                var ind = j$("a",ul).index(a);
//                var exists = true;
//                j$.each(d,function(di,dv){
//                    if(dv == ind){
//                        exists = false;
//                        return false;
//                    }
//                });
//                if(exists){
//                    var s = GetFirstCharArray(a.text());
//                    j$.each(s,function(si,sv){
//                        if(sv == cv){
//                            txtBrandLi += a.html();
//                            a.remove();
//                            d.push(ind);
//                            return false;
//                        }
//                    });
//                }
//            });
//        });
//    });
//    j$(".stat").hover(function() {
//        j$(this).addClass("statHover").children("ul.toc").show();
//    },
//    function() {
//        j$(this).removeClass("statHover").children("ul.toc").hide();
//    });

//    j$(".s_navs,.s_navsr").not("#s_navprice,.droppad,.unused").hover(
//        function() { j$(this).addClass("s_navs_hover"); },
//        function() { j$(this).removeClass("s_navs_hover"); }
//    );
//    j$("#s_navprice").hover(
//        function() { j$(this).children(".droppad").show(); },
//        function() { j$(this).children(".droppad").hide(); }
//    );

//    var flbrands_bt = j$("#flbrands_bt");
//    flbrands_bt.data("init", false);
//    flbrands_bt.click(function() {
//        if (j$(this).data("init") != true) {
//            j$("#flbrands ul li").ahover({ toggleEffect: "both", moveSpeed: 75, toggleSpeed: 250, className: 'y_fhover' });
//            j$(this).data("init", true);
//        }
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

