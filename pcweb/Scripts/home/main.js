/*=======================main.js===========================*/
$(function () {
    //tab
    Ymt.load("util.ImgLazyLoad", function () {
        Ymt.util.ImgLazyLoad("#ymtmain")
    },true)
    function cur(ele, cls, tag) {
        var ele = $(ele) || ele;
        var tag = tag || "";
        var mark = cls || "cur";
        ele.addClass(mark).siblings(tag).removeClass(mark);
    }
    function tab(id_tab, tag_tab, id_con, tag_con, act) {
        var act = act || "click";
        $(id_tab).find(tag_tab).bind(act,
		function () {
		    var idx = $(this).index();
		    cur(this, "cur");
		    $(id_con).find(tag_con).eq(idx).show().siblings(tag_con).hide();
		    return false;
		});
    }
    tab("#v-acc-tab", "li", "#v-acc-con", ".v-acc-panel", "mouseover");
    tab("#tab-nav", "li", "#tab-con", ".tab-panel", "mouseover");

    //鐑棬娲诲姩
    $("#tab-nav li").mouseover(function () {
        $(this).parent().toggleClass("tab-nav-change");
    });
    //浜у搧鍒楄〃
    //	$(".prt-list li").hover(function(){
    //		$(this).addClass("cur").siblings().removeClass("cur");
    //	},function(){
    //		$(this).removeClass("cur");
    //	});
    //ppt
    $.fn.adfocus = function (options) {
        var opts = {
            drection: "",
            numbox: "",
            imgbox: "",
            speed: "",
            addClass: "",
            imgboxWidth: "",
            imgboxHeight: "",
            imgLen: "",
            pull: "",
            usevent: ""
        }
        $.extend(opts, options);
        return this.each(function () {
            var adTimer = null;
            var _this = $(this);
            var index = 0;
            var oNumList = _this.children(opts.numbox).children();
            var len = opts.imgLen || oNumList.size();
            var imgListBox = _this.children(opts.imgbox);
            var imglistWidth = opts.imgboxWidth || _this.width();
            var imglistHeight = opts.imgboxHeight || _this.height();
            var imglistBoxChid = imgListBox.children();
            if (opts.pull == "true") {
                imgListBox.css({
                    "position": "static"
                })
                imglistBoxChid.not("script").css({
                    "position": "absolute",
                    "z-index": 1
                }).first().css({
                    "z-index": 2
                })
            }
            oNumList.bind(opts.usevent, function () {
                index = oNumList.index(this);
                action(index);
            }).eq(0).trigger("mouseleave");

            _this.hover(function () {
                clearInterval(adTimer);
            }, function () {
                timer();
            }).trigger("mouseleave");
            //浠ヤ笅鏄帶鍒舵粦鍔ㄧ殑鏂规硶
            function timer() {
                adTimer = setInterval(function () {
                    action(index)
                    index++;
                    if (index == len) {
                        index = 0;
                    }
                }, opts.speed)
            }
            function action(index) {
                if (opts.drection == "left") { //鍍忓乏绉诲姩
                    imgListBox.width(imglistWidth * len);
                    imglistBoxChid.css({
                        float: "left"
                    });
                    imgListBox.stop().animate({
                        left: -imglistWidth * index
                    }, 1000);
                } else if (opts.drection == "up") { //鍍忎笂绉诲姩
                    // alert(1);
                    imgListBox.stop().animate({
                        top: -imglistHeight * index
                    }, 1000);
                } else if (opts.drection == "filter") { //娓愬彉鏁堟灉
                    _this.css({
                        "position": "relative"
                    })
                    imglistBoxChid.eq(index).css({
                        "position": "absolute",
                        "left": "0px",
                        "top": "0px"
                    }).stop().animate({
                        opacity: 1
                    }, 500).css({
                        "z-index": "1"
                    }).siblings().stop().animate({
                        opacity: 0
                    }, 500).css({
                        "z-index": "0"
                    });
                } else if (opts.pull == "true") {
                    var pull_drection = {}
                    var pull_drection2 = {}
                    if (opts.drection == "pull_right") {
                        key = "left";
                        pull_drection[key] = "0";
                        pull_drection2[key] = -opts.imgboxWidth;
                        pull(pull_drection, pull_drection2);
                    }
                    else if (opts.drection == "pull_left") {
                        key = "left";
                        pull_drection[key] = "0";
                        pull_drection2[key] = opts.imgboxWidth;
                        pull(pull_drection, pull_drection2);
                    }
                    else if (opts.drection == "pull_top") {
                        key = "top";
                        pull_drection[key] = "0";
                        pull_drection2[key] = -opts.imgboxHeight;
                        pull(pull_drection, pull_drection2);
                    }
                    else if (opts.drection == "pull_bottom") {
                        key = "top";
                        pull_drection[key] = "0";
                        pull_drection2[key] = opts.imgboxHeight;
                        pull(pull_drection, pull_drection2);
                    }

                }
                oNumList.removeClass(opts.addClass).eq(index).addClass(opts.addClass);

                function pull(pull_drection, pull_drection2) {
                    imglistBoxChid.not("script").eq(index).css({
                        "z-index": 3
                    }).siblings().css({
                        "z-index": 1
                    });

                    imgListBox.children().not("script").eq(index).stop().animate(pull_drection, 500, function () {
                        $(this).siblings().stop().animate(pull_drection2, 0).css({
                            "z-index": 1
                        })
                    })
                }
            }
        });
    };
    $("#focus-wrap").adfocus({
        drection: "left",
        numbox: ".focus-number",
        imgbox: ".focus-list",
        speed: 3000,
        addClass: "on",
        pull: "",
        usevent: "mouseover"
    });
});

