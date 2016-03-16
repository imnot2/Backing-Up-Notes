/*=======================sCatalog.js===========================*/
j$(function() {
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
    
    j$(".s_navs,.s_navsr").not("#s_navprice,.droppad,.unused").hover(
        function() { j$(this).addClass("s_navs_hover"); },
        function() { j$(this).removeClass("s_navs_hover"); }
    );
    j$("#s_navprice").hover(
        function() { j$(this).children(".droppad").show(); },
        function() { j$(this).children(".droppad").hide(); }
    );
    j$("#s_navpage").click(function() {
        var $pg = j$("#pagebox");
        if ($pg.css("display") == "none") {
            $pg.show();
            $pg.children(".fg-tooltip-clo").click(function() {
                $pg.hide();
            });
        } else {
            $pg.hide();
        }
    });

    j$("#f_accordion").accordion({});

    j$("#fltree").treeview();
    j$(".treeview .folder").unbind().hover(
        function() { j$(this).addClass("folder_h"); },
        function() { j$(this).removeClass("folder_h"); }
    );
    j$(".treeview .file").unbind().hover(
        function() { j$(this).addClass("file_h"); },
        function() { j$(this).removeClass("file_h"); }
    );

    var flbrands_bt = j$("#flbrands_bt");
    flbrands_bt.data("init", false);
    flbrands_bt.click(function() {
        if (j$(this).data("init") != true) {
            j$("#flbrands ul li").ahover({ toggleEffect: "both", moveSpeed: 75, toggleSpeed: 250, className: 'y_fhover' });
            j$(this).data("init", true);
        }
    });

    j$("#s_list2 .s_detial_bt").click(function() {
        if (j$(this).hasClass("act")) {
            j$(this).removeClass("act").text("展开");
            j$(this).prevAll(".s_ditial_ts").show();
            j$(this).prev(".s_ditial_t").hide();
        } else {
            j$(this).addClass("act").text("收缩");
            j$(this).prev(".s_ditial_t").show();
            j$(this).prevAll(".s_ditial_ts").hide();
        }
    });
});
