/*=======================Global.js===========================*/
j$(function () {
    //j$(".png").pngFix();
    j$("[limit]").limitChar({ fx: true });
    j$("[limit_a]").limitChar({ numobj: "limit_a", all: true });
    j$("button.zicBtn").zicBtn();
    //    j$(".ttips").tooltip();
    j$(".ttips").cluetip();

    mtInput_focus();

    if (j$.browser.msie && j$.browser.version == 6.0) {
        j$("img.img_700").imgLimit({ size: 700 });
        j$("img.img_600").imgLimit({ size: 600 });
        j$("img.img_320").imgLimit({ size: 320 });
        j$("img.img_230").imgLimit({ size: 230 });
        j$("img.img_160").imgLimit({ size: 160 });
        j$("img.img_130").imgLimit({ size: 130 });
        j$("img.img_100").imgLimit({ size: 100 });
        j$("img.img_80").imgLimit({ size: 80 });
        j$("img.img_48").imgLimit({ size: 48 });
    }

    //j$("a#mast_msg").flashClass({ newClass: "turnClass" });
    //j$("a#mast_msg").flashClass({run:false});

    j$("button.ui_btn,input.ui_btn").button();
    j$("button.ui_btn_newwin").button({ icons: { primary: 'ui-icon-newwin'} });
    j$("button.ui_btn_comment").button({ icons: { primary: 'ui-icon-comment'} });
    j$("button.ui_btn_plus").button({ icons: { primary: 'ui-icon-plus'} });
    j$("button.ui_btn_cart").button({ icons: { primary: 'ui-icon-cart'} });
    j$("button.ui_btn_circle").button({ icons: { primary: 'ui-icon-circle-plus'} });

    j$("div.notifi").each(function () {
        var on = j$(this);
        if (on.text() == "") {
            on.remove();
        } else {
            j$('<span class="close" title="关闭"></span>').appendTo(on).click(function () {
                on.fadeOut("slow");
            });
        }
    });



    j$('span.clo').click(function () {
        j$(this).parent('div.titlebox').fadeOut("slow");
    });
    // Master ----------------------------------------
    var m0 = j$("#m0");
    var m_subnav = m0.children("ul#m_subnav");
    var cate_nav = m0.children("a#cate_nav");
    var span = cate_nav.children("span");
    m0.hover(function (e) {
        if (e.target == span[0]) {
            m_subnav.stop(false, true);
            cate_nav.addClass("cate_nav_act");
            m_subnav.slideDown("fast");
        }
    }, function () {
        m_subnav.slideUp(function () {
            cate_nav.removeClass("cate_nav_act");
        });
    });
    j$("li.fli", m_subnav).hover(function () {
        j$(this).addClass("hv");
    }, function () {
        j$(this).removeClass("hv");
    });

    j$("a.trigger").each(function () {
        if (!j$.browser.msie || j$.browser.version != "6.0") {
            $this = j$(this);
            var pop = $this.next("table.popup");
            $this.hover(function () {
                if (j$.browser.msie) {
                    pop.show().css({ top: -46 });
                } else {
                    pop.show().css({ opacity: "0" }).animate({ opacity: '1', top: -46 }, 500);
                }
            }, function () {
                if (j$.browser.msie) {
                    pop.hide();
                } else {
                    pop.animate({ opacity: "0", top: -40 }, 500);
                }
            });
        }
    });
    j$("a.connect").click(function () {
        var Name = j$(this).nextAll(".SellerName").val();
        var QQ = j$(this).nextAll(".SellerQQ").val();
        var MSN = j$(this).nextAll(".SellerMSN").val();
        var Wang = j$(this).nextAll(".SelleWang").val();
        var MessageToId = j$(this).nextAll(".SellerId").val();
        if (Name == null || Name == "") {
            j$("#sellerNameInMain").html("");
        }
        else {
            j$("#sellerNameInMain").html(Name);
        }
        if (QQ == null || QQ == "") {
            j$("#sellerQQContentInMain").html("");
        }
        else {
            j$("#sellerQQContentInMain").html("<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=" + QQ + "&site=qq&menu=yes'><img border='0' src='http://wpa.qq.com/pa?p=2:" + QQ + ":41' alt='点击这里给我发消息' title='点击这里给我发消息'></a>");
        }
        if (MSN == null || MSN == "") {
            j$("#sellerWangWangContentInMain").html("");
        }
        else {
            j$("#sellerWangWangContentInMain").html("<a target='_blank' href='http://amos1.taobao.com/msg.ww?v=2&uid=" + Wang + "&s=1' ><img border='0' src='http://amos1.taobao.com/online.ww?v=2&uid=" + Wang + "&s=1' alt='点击这里给我发消息' /></a>");
        }
        if (Wang == null || Wang == "") {
            j$("#sellerMSNContentInMain").html("");
        }
        else {
            j$("#sellerMSNContentInMain").html("<a href='msnim:chat?contact=" + MSN + "' target='_blank'><img style='width:22px' src='http://p3.img.ymatou.com/service/msn.png' border='0'></a>");
        }
        j$("#sellerMessageInMain").attr("href", "/user/sendmessage?toid=" + MessageToId);
        AttentionDialog("#CCAttentionDialog", "#PadB");
    });

    // Config ----------------------------------------
    j$.ajaxSetup({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        global: true
    });
    //j$("#ajaxload").ajaxStart(function () {
    //    j$(this).show();
    //}).ajaxStop(function () {
    //    j$("#ajaxload").offset({ left: 0 });
    //    j$(this).hide();
    //});
    j$("#mCartBnt").bind('click', function () {
        window.location.href = "/shoppingcart";
    });
    j$('#singe_out .weibZox') && j$('#singe_out .weibox').bind('mouseenter mouseleave', function () {
        j$(this).closest('.weibox').toggleClass('border');
        j$('.zhifubaobmod').toggle();
        return false;
    });
});

function ShowAttentionDialog(Name, QQ, MSN, Wang, MessageToId) {
    if (Name == null || Name == "") {
        j$("#sellerNameInMain").html("");
    }
    else {
        j$("#sellerNameInMain").html(Name);
    }
    if (QQ == null || QQ == "") {
        j$("#sellerQQContentInMain").html("");
    }
    else {
        j$("#sellerQQContentInMain").html("<a target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=" + QQ + "&site=qq&menu=yes'><img border='0' src='http://wpa.qq.com/pa?p=2:" + QQ + ":41' alt='点击这里给我发消息' title='点击这里给我发消息'></a>");
    }
    if (MSN == null || MSN == "") {
        j$("#sellerWangWangContentInMain").html("");
    }
    else {
        j$("#sellerWangWangContentInMain").html("<a target='_blank' href='http://amos1.taobao.com/msg.ww?v=2&uid=" + Wang + "&s=1' ><img border='0' src='http://amos1.taobao.com/online.ww?v=2&uid=" + Wang + "&s=1' alt='点击这里给我发消息' /></a>");
    }
    if (Wang == null || Wang == "") {
        j$("#sellerMSNContentInMain").html("");
    }
    else {
        j$("#sellerMSNContentInMain").html("<a href='msnim:chat?contact=" + MSN + "' target='_blank'><img style='width:22px' src='http://p3.img.ymatou.com/service/msn.png' border='0'></a>");
    }
    j$("#sellerMessageInMain").attr("href", "/user/sendmessage?toid=" + MessageToId);
    AttentionDialog("#CCAttentionDialog", "#PadB");
}

var navTurn = function (nav) {
    var navul = j$("ul#n_navul");
    j$("li" + nav, navul).addClass("act");
    navul.lavaLamp({
        fx: "easeOutCirc",
        speed: 700,
        click: function (event, menuItem) {
            return true;
        }
    });
    var liback = navul.children("li.back");
    liback.addClass("height0");
    navul.hover(function () {
        liback.removeClass("height0");
    }, function () {
        liback.addClass("height0");
    });
};
var mtInput_focus = function () {
    j$(".mt_text").each(function () {
        j$(this).data("txt", j$.trim(j$(this).val()));
    }).focus(function () {
        j$(this).addClass("mt_text_act");
        if (j$.trim(j$(this).val()) == j$(this).data("txt")) {
            j$(this).val("");
        }
    }).blur(function () {
        j$(this).removeClass("mt_text_act");
        if (j$.trim(j$(this).val()) == "") {
            j$(this).val(j$(this).data("txt"));
        }
    });
    j$(".mt_text_wval").focus(function () {
        j$(this).addClass("mt_text_wval_act");
    }).blur(function () {
        j$(this).removeClass("mt_text_wval_act");
    });
    j$(".mt_textarea").focus(function () {
        j$(this).addClass("mt_textarea_act");
    }).blur(function () {
        j$(this).removeClass("mt_textarea_act");
    });
    j$("#txtSearchBox").each(function () {
        j$(this).data("txt", j$.trim(j$(this).val()));
    }).focus(function () {
        j$(this).addClass("txtSearchBox_hover");
        if (j$.trim(j$(this).val()) == j$(this).data("txt")) {
            j$(this).val("");
        }
    }).blur(function () {
        j$(this).removeClass("txtSearchBox_hover");
        if (j$.trim(j$(this).val()) == "") {
            j$(this).val(j$(this).data("txt"));
        }
    });
};

//Url参数
var rrequest = function (paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
};

//获取鼠标定位
var getMousePosition = function (e) {
    var x = 0, y = 0;
    var e = e || window.event;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    } else if (e.clientX || e.clientY) {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { 'x': x, 'y': y };
};

//弹出窗口
var AttentionDialog = function (div, pad, sub, error) {
    var $Dialog = j$(div);
    var $DialogShadow = j$(div + "Shadow");
    var top = (document.documentElement.clientHeight - $Dialog.height() - 20) / 2;
    var left = (document.documentElement.clientWidth - $Dialog.width() - 20) / 2;
    $Dialog.css({ 'top': top, 'left': left }).show();
    $DialogShadow.css({ 'top': top, 'left': left, 'height': $Dialog.height(), 'width': $Dialog.width() }).show();

    j$("iframe", $Dialog).css({ "width": "100%", "height": "100%" });
    $Dialog.bgiframe();
    $DialogShadow.bgiframe();

    var closeFn = function () {
        $Dialog.hide();
        $DialogShadow.hide();
        if (pad != null) {
            $Pad.hide();
        }
    };
    j$(".Close", $Dialog).click(function () {
        closeFn();
        return false;
    });

    if (pad != null) {
        var $Pad = j$(pad);
        $Pad.show();
        $Pad.bgiframe();
    }
    if (sub != null) {
        j$(sub, $Dialog).click(function () {
            if (error != null) {
                if (j$(error).validationEngine({ returnIsValid: true })) {
                    closeFn();
                } else {
                    alert("请按要求填写！");
                }
            } else {
                closeFn();
            }
        });
    }
};
var AlertDialog = function (txt) {
    j$("#LoadingDialog h5").text(txt);
    AttentionDialog("#LoadingDialog", "#PadA");
};
var CheckDialog = function (txt, fun) {
    j$("#txtCheck").text(txt);
    AttentionDialog("#CheckDialog", "#PadA");
    j$("#btncheckok").one("click", function () {
        fun();
        return false;
    });
};
//var alert = function (txt) {
//j$("#txtAlert").text(txt);
//  AttentionDialog("#AlertDialog", "#PadA");
//}
var ConvertJson = function (m) {
    var json = m.d;
    var value = eval("(" + json + ")");
    return value;
};
jQuery(document).ready(function () {
    jQuery.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            return xhr;
        }
    });
});


String.prototype.replaceAll = function(AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return this.replace(raRegExp, ARepText);
};

