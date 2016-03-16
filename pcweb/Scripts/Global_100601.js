/*=======================Global_100601.js===========================*/
/* ---------------------------------------------------------------------------------------------- 
FileName: Global.js
Description: Global JS include Config&EventHander&jQueryComponent&ThemeHelp
Author: Cheney Jin
WebSite: yMatou.com
Version: 1.0.0|2010-5-25
------------------------------------------------------------------------------------------------- */

j$(function() {
    j$("ul#n_navul").pngFix();
    j$("ul.s_navul").pngFix();

    // Theme ----------------------------------------
    j$("a.ttips").tooltip();
    mtButton_hover();
    mtInput_focus();
    zicBtHover();
    ui_btn();
    j$("div.notification img.close").click(function(){
        j$(this).parent("div.notification").fadeOut("slow");
    });

    var m0 = j$("#m0");
    var m_subnav = m0.children("ul#m_subnav");
    var cate_nav = m0.children("a#cate_nav");
    var span = cate_nav.children("span");
    zicSlideDownFn(m0,span,function(){
    	cate_nav.addClass("cate_nav_act");
        m_subnav.slideDown("fast");
    },function(){
        m_subnav.slideUp(function(){
            cate_nav.removeClass("cate_nav_act");
        });
    });
    j$("li.fli",m_subnav).hover(function(){
        j$(this).addClass("hv");
    },function(){
        j$(this).removeClass("hv");
    });

    // Action ----------------------------------------
    j$('.trigger').each(function() {
        if (!j$.browser.msie || j$.browser.version != "6.0") {
            $this = j$(this);
            var pop = $this.next("table.popup");
            $this.hover(function() {
                if (j$.browser.msie) {
                    pop.show().css({ top: -46 });
                } else {
                    pop.show().css({ opacity: "0" }).animate({ opacity: '1', top: -46 }, 500);
                }
            }, function() {
                if (j$.browser.msie) {
                    pop.hide();
                } else {
                    pop.animate({ opacity: "0", top: -40 }, 500);
                }
            });
        }
    });

    // Config ----------------------------------------
    j$("a#gotop").click(function() {
        j$("body").scrollTop(0);
    });
    j$.ajaxSetup({
        type: "POST",
        dataType: "json",
        global: true
    });
    j$("#ajaxload").ajaxStart(function(){
       j$(this).show();
    }).ajaxStop(function(){
       j$(this).hide();
    });
});

var zicSlideDownFn = function(m0,span,slideDownFn,slideUpFn){
    m0.hover(function(e){
        if(e.target == span[0]){
            slideDownFn();
        }
    },function(){
        slideUpFn();
    });
}

var ui_btn = function(){
    j$(".ui_btn").button();
    j$(".ui_btn_newwin").button({
        icons: {
            primary: 'ui-icon-newwin'
        }
    });
    j$(".ui_btn_comment").button({
        icons: {
            primary: 'ui-icon-comment'
        }
    });
    j$(".ui_btn_plus").button({
        icons: {
            primary: 'ui-icon-plus'
        }
    });
}
var navTurn = function(nav){
    var navul = j$("ul#n_navul");
    j$("li"+nav,navul).addClass("act");
    navul.lavaLamp({
        fx: "easeOutCirc",
        speed: 700,
        click: function(event, menuItem) {
            return true;
        }
    });
    var liback = navul.children("li.back");
    liback.addClass("height0");
    navul.hover(function(){
        liback.removeClass("height0");
    },function(){
        liback.addClass("height0");
    });
}
var mtButton_hover = function() {
    j$(".mt_button:not(.ui-state-disabled)").hover(
        function() { j$(this).addClass("ui-state-hover"); },
        function() { j$(this).removeClass("ui-state-hover"); }
    ).mousedown(function() {
        j$(this).parents('.mt_buttonset-single:first').find(".mt_button.ui-state-active").removeClass("ui-state-active");
        if (j$(this).is('.ui-state-active.mt_button-toggleable, .mt_buttonset-multi .ui-state-active'))
        { j$(this).removeClass("ui-state-active"); }
        else { j$(this).addClass("ui-state-active"); }
    }).mouseup(function() {
        if (!j$(this).is('.mt_button-toggleable, .mt_buttonset-single .mt_button, .mt_buttonset-multi .mt_button'))
        { j$(this).removeClass("ui-state-active"); }
    });
}
var zicBtHover = function() {
    j$(".zic-button").hover(function() {
        if (!j$(this).hasClass("zic-button-disabled")) {
            j$(this).addClass("zic-button-hover");
        }
    }, function() {
        if (!j$(this).hasClass("zic-button-disabled")) {
            j$(this).removeClass("zic-button-hover");
        }
    });
    j$(".zic-button").mousedown(function() {
        if (!j$(this).hasClass("zic-button-disabled")) {
            j$(this).addClass("zic-button-checked");
        }
    }).mouseup(function() {
        if (!j$(this).hasClass("zic-button-disabled")) {
            j$(this).removeClass("zic-button-checked");
        }
    });
    j$(".zic-button").focus(function() { j$(this).addClass("zic-button-focused") });
    j$(".zic-button").blur(function() { j$(this).removeClass("zic-button-focused") });
}
var mtInput_focus = function() {
    j$(".mt_text").each(function() {
        j$(this).data("txt", j$.trim(j$(this).val()));
    }).focus(function() {
        j$(this).addClass("mt_text_act");
        if (j$.trim(j$(this).val()) == j$(this).data("txt")) {
            j$(this).val("");
        }
    }).blur(function() {
        j$(this).removeClass("mt_text_act");
        if (j$.trim(j$(this).val()) == "") {
            j$(this).val(j$(this).data("txt"));
        }
    });
    j$(".mt_text_wval").focus(function(){
        j$(this).addClass("mt_text_act");
    }).blur(function() {
        j$(this).removeClass("mt_text_act");
    });
    j$(".mt_textarea").focus(function() {
        j$(this).addClass("mt_textarea_act");
    }).blur(function() {
        j$(this).removeClass("mt_textarea_act");
    });
    j$("#txtSearchBox").each(function() {
        j$(this).data("txt", j$.trim(j$(this).val()));
    }).focus(function() {
        j$(this).addClass("txtSearchBox_hover");
        if (j$.trim(j$(this).val()) == j$(this).data("txt")) {
            j$(this).val("");
        }
    }).blur(function() {
        j$(this).removeClass("txtSearchBox_hover");
        if (j$.trim(j$(this).val()) == "") {
            j$(this).val(j$(this).data("txt"));
        }
    });
}

// **自定义组件 ----------------------------------------------------------------

//Url参数
var rrequest = function(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

//数组去重复
jQuery.extend({    
    uniqueArray:function(a) {    
        var r=[];    
        for (var i=0,l=a.length; i<l; ++i)jQuery.inArray(a[i],r)<0&&r.push(a[i]);    
        return r;
   }
});

//检测reltg是否是el的子孙结点
function isMouseLeaveOrEnter(e, el) {
    if (e.type != 'mouseout' && e.type != 'mouseover') return false;
    var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
    while (reltg && reltg != el)
        reltg = reltg.parentNode;
    return (reltg != el);
}

//获取鼠标定位
var getMousePosition = function(e) {
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
}

//获取窗口可视范围的高度 
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}
//当前窗口的width
function getClientWidth(){
    var winWidth = 0;
    if (window.innerWidth){
        winWidth = window.innerWidth;
    } else if ((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }
    if (document.documentElement  && document.documentElement.clientWidth){
        winWidth = document.documentElement.clientWidth;
    }
    return winWidth;
}

//停止事件冒泡
var stopBubble = function(e) {
    var e = e ? e : window.event;
    if (j$.browser.msie) {
        e.cancelBubble = true;
    } else {
        e.preventDefault();
    }
}

//弹出窗口
var AttentionDialog = function(div, pad, sub, error) {
    var $Dialog = j$(div); 
    var $DialogShadow = j$(div + "Shadow");
    var top = (document.documentElement.clientHeight - $Dialog.height() - 20) / 2;
    var left = (document.documentElement.clientWidth - $Dialog.width() - 20) / 2;
    $Dialog.css({ 'top': top, 'left': left }).show();
    $DialogShadow.css({ 'top': top, 'left': left, 'height': $Dialog.height(), 'width': $Dialog.width() }).show();

    j$("iframe",$Dialog).css({"width":"100%","height":"100%"});
    $Dialog.bgiframe();
    $DialogShadow.bgiframe();

    var closeFn = function(){
        $Dialog.hide();
        $DialogShadow.hide();
        if(pad != null) {
            $Pad.hide();
        }
    }
    j$(".Close", $Dialog).click(function() {
        closeFn();
    });

    if(pad != null) {
        var $Pad = j$(pad);
        $Pad.show();
        $Pad.bgiframe();
    }
    if(sub != null){
        j$(sub, $Dialog).click(function() {
            if(error != null){
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
}
var alert = function(txt){
    j$("#txtAlert").text(txt);
    AttentionDialog("#AlertDialog", "#PadA");
}
var ConvertJson = function(m) {
    var json = m.d;
    var value = eval("(" + json + ")");
    return value;
}

// 预加载图片
jQuery.preloadImages = function() {
    for (var i = 0; i < arguments.length; i++) {
        jQuery("<img>").attr("src", arguments[i]);
    }
}

//toJSON
jQuery.extend({
    toJSON: function(object) {
        var type = typeof object;
        if ('object' == type) {
            if (Array == object.constructor) type = 'array';
            else if (RegExp == object.constructor) type = 'regexp';
            else type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
                break;
            case 'function':
            case 'boolean':
            case 'regexp':
                return object.toString();
                break;
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string':
                return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
                    var a = arguments[0];
                    return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : ""
                }) + '"';
                break;
            case 'object':
                if (object === null) return 'null';
                var results = [];
                for (var property in object) {
                    var value = jQuery.toJSON(object[property]);
                    if (value !== undefined) results.push(jQuery.toJSON(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for (var i = 0; i < object.length; i++) {
                    var value = jQuery.toJSON(object[i]);
                    if (value !== undefined) results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    }
});
