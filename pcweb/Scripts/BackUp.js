/*=======================BackUp.js===========================*/
    if (j$("#user").children().is("#signin_bt")) {
        j$("#signin_bt").toggle(
            function() {
                $
                j$("#signinbox").show();
                j$(this).addClass("action");
            },
            function() {
                j$("#signinbox").hide();
                j$(this).removeClass("action");
            }
        );
        mtInput_focus();
        zicBtHover();
        j$("#btnSigninCloes").click(function() { j$("#signin_bt").click(); });
    }

    j$("#navl li").hover(function() {
        j$(this).children(".nldropbox").show();
    }, function() {
        j$(this).children(".nldropbox").hide();
    }).bind("mousemove", function() { j$(this).children(".nldropbox").show(); });
    j$("#navl li .nldropbox").bind("mouseleave", function() {
        j$(this).hide();
    });

    j$("#searchcategory").hover(function() { j$(this).addClass('ui-state-hover'); }, function() { j$(this).removeClass('ui-state-hover'); });
    j$("#searchcategory").menu({
        content: j$("#searchcategory").next("#fg-content").html(),
        showSpeed: 400,
        positionOpts: {
            posX: 'left',
            posY: 'bottom',
            offsetX: 0,
            offsetY: 3,
            directionH: 'right',
            directionV: 'down',
            detectH: true,
            detectV: true,
            linkToFront: false
        },
        backLink: false,
        crumbDefaultText: '选择类别：',
        backLinkText: '返回上一级',
        flyOut: true,
        topLinkText: '主类别'
    });
    j$(".fg-button span").hover(function() { j$(this).parent().addClass("ui-state-hover"); }, function() { });
    j$("ul.fg-menu a").click(function() {
        j$("a.fg-button").text(j$(this).text());
        alert("aaaa");
    });

    j$("#searchcategory").click(function() {
        j$(".fg-menu-container li a .searchico").hover(
            function() { j$(this).addClass("searchico_hover"); },
            function() { j$(this).removeClass("searchico_hover"); }
        ).click(function(e) {
            stopBubble(e);
            var $fa = j$(this).parent("a");
            var $cBox = j$("#condSearchBox");
            if ($cBox.css("display") == "none") {
                $cBox.slideDown("fast");
            }
            j$("#condSearchTabs li:eq(0) a").click();
            j$("#condSearchTabs #tabs-1").empty().append("<div class='citem in_bk'>" + $fa.text() + "：</div>");
        });
    });

    j$("#parktarget").mouseover(function() {
        j$("#parknav").show().animate({ height: 75 }, 300, "easeOutQuad");
    });
    j$("#parknav").mouseout(function(e) {
        if (isMouseLeaveOrEnter(e, this)) {
            j$("#parknav").animate({ height: 0 }, 600, "easeInQuad", function() {
                j$(this).hide();
            });
        }
    });
    j$("#n_navul>li").not("#parktarget").mouseover(function() {
        if (j$("#parknav").css("display") == "block") {
            j$("#parknav").animate({ height: 0 }, 600, "easeInQuad", function() {
                j$(this).hide();
            });
        }
    });
    j$('#parknav').mousemove(function(e) {
        var s_left = parseInt(j$('#parknav').offset().left);
        var mleft = parseInt((j$('#parkmenu a').width() - 50) * j$('#parkmenu a').length);
        var left_value = Math.round(((s_left - e.pageX) / 100) * mleft / 4);
        j$('#parkmenu').animate({ left: left_value + 50 }, { queue: false, duration: 500 }, 1000);
    });

    var OPcartBnt = j$("#OPcartBnt");
    var CLcartBnt = j$("#CLcartBnt");
    var cartCon = j$("#cartCon");
    OPcartBnt.click(function() {
        cartCon.show();
        OPcartBnt.hide();
        CLcartBnt.show();
        j$("#blurPad").show().click(function() {
            j$(this).hide();
            cartCon.hide();
            CLcartBnt.hide();
            OPcartBnt.show();
        });
    });
    CLcartBnt.click(function() {
        cartCon.hide();
        CLcartBnt.hide();
        OPcartBnt.show();
    });

    j$("#navl li").hover(function() {
        j$(this).children(".nldropbox").show();
    }, function() {
        j$(this).children(".nldropbox").hide();
    }).bind("mousemove", function() { j$(this).children(".nldropbox").show(); });
    j$("#navl li .nldropbox").bind("mouseleave", function() {
        j$(this).hide();
    });
    j$("#signin_bt").click(function() {
        AttentionDialog("#signboxbox","#PadB");
    });

    j$("#condSearchBox input").bind("click", function() {
        j$("#txtSearchBox").val("输入" + j$(this).next("label").text() + "关键字搜索");
    });


    
    if (j$.browser.msie) {

        if (j$.browser.version == "6.0") {

        } else {

        }
    } else {
    
    }

    var initCorners = function(o, tl, tr, bl, br) {
        var settings = {
            tl: { radius: tl },
            tr: { radius: tr },
            bl: { radius: bl },
            br: { radius: br },
            antiAlias: true
        }
        curvyCorners(settings, o);
    }

    var CheckCart = function(){
        var CartCount = $.cookie('CartCount');
        var sp = j$("#mCartBnt span.ctnum");
        if (CartCount != null) {
            sp.text(CartCount);
        }else{
            sp.text("0");
        }
    }
    var scrollheadbackground = function() {
        var backgroundheight = 4000;
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var hourpercent = hour / 24 * 100;
        var minutepercent = minute / 60 / 24 * 100;
        var percentofday = Math.round(hourpercent + minutepercent);
        var offset = backgroundheight / 100 * percentofday;
         offset = offset - (backgroundheight / 4);
        function scrollbackground() {
            offset = (offset < 1) ? offset + (backgroundheight - 1) : offset - 1;
            j$("body").css("background-position", "50% " + offset + "px");
            setTimeout(function() { scrollbackground(); }, 100);
        }
        scrollbackground();
    }

var SetPosition = function(x, y, $tipbox, maxh, maxw) {
    var pageheight = getClientHeight();
    var pagewidth = getClientWidth();
    var m = 11;
//    if(y > maxh){
//        m = 11;
//        if((x+maxw)>pagewidth){
//            m = 12;
//            j$("#fgttip-tt",$tipbox).removeClass().addClass("fgttip-botr");
//        }
//    } else {
//        m = 21;
//        j$("#fgttip-tt",$tipbox).removeClass().addClass("fgttip-topl");
//        if((x+maxw)>pagewidth) {
//            m = 22;
//            j$("#fgttip-tt",$tipbox).removeClass().addClass("fgttip-topr");
//        }
//    }
    switch (m) {
        case 11:
            $tipbox.css({ "bottom": pageheight - y, "left": x });
            break;
        case 21:
            $tipbox.css({ "top": y, "left": x });
            break;
        case 12:
            $tipbox.css({ "bottom": pageheight - y, "right": pagewidth - x });
            break;
        case 22:
            $tipbox.css({ "top": y, "right": pagewidth - x });
            break;
        default:
            return false;
    }
}

    var Config = {
        url: {
            src1: "test1.aspx",
            src2: "test2.aspx"
        },
        tips: {
            src1Suc: "请求1完成",
            src2Suc: "请求2完成",
            src3Suc: "请求2完成"
        }
    };

        j$(".filetree").treeview();
    j$(".treeview .folder").unbind().hover(
        function() { j$(this).addClass("folder_h"); },
        function() { j$(this).removeClass("folder_h"); }
    );
    j$(".treeview .file").unbind().hover(
        function() { j$(this).addClass("file_h"); },
        function() { j$(this).removeClass("file_h"); }
    );
// **全局事件绑定 -----------------------------------------------------------------
// 对于所有 class="ae_xxx yyy" id="xxx-123"的元素执行事件绑定, xxx-123部分用来获取元素的ID，比如一个帖子的ID,
// a_xxx  后面的部分用来标识应用如 vote / review / blog 等. 绑定的事件就是 :  yMatou.init_vote / yMatou.init_blog 等.
//function EventMonitor(root) {
//    var re = /a_(\w+)/;
//    var fns = {};
//    j$(root + " .ae_nav", root + " .ae_forder", root + " .ae_pj").each(function(i) {
//        var m = re.exec(this.className);
//        if (m) {
//            var f = fns[m[1]];
//            if (!f) { //如果事件处理函数不存在则创建函数对象.
//                f = eval("yMatou.init_" + m[1]);
//                fns[m[1]] = f; //调用绑定函数.
//            }
//            f && f(this);
//        }
//    });
//}

//一般来说文档加载的时候应该绑定所有的事件, 但是有一种情况例外.
//比如 通过Ajax方法取回来的内容里面还含有动作按钮的，这时需要手动调用 load_event_monitor(element);  方法.
//j$(function() {
//    EventMonitor(document);
//});

//yMatou.init_forder = function(o) {
//    var eid = j$(o).attr("id").split("-")[1];
//    var fo = j$("#f-" + eid);
//    var unfo = j$("#unf-" + eid);
//    fo.click(function() {
//        j$(o).hide();
//        unfo.show();
//        fo.hide();
//    });
//}


