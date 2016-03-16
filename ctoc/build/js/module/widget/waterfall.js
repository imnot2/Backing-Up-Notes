/*
 * 滚动加载组件v1.0.0
 */
Ymt.add(function(require, exports, module) {
    var fall = {},
        timer = null,
        isData = true,
        isCompleted = true,
        notData = {},
        apicdn = require('module/config/apiCDN');

    $(window).bind("scroll", scrollEvent);

    function waterfall(opt) {
        fall = $.extend({
            selector: "", //jq选择器，
            url: "", //用户请求资源的url
            type: "get", //请求类型。
            increment: "", //options需要递增的属性
            offset: 400,
            options: {}, //请求需要的参数，如果当中有需要递增的页标属性，递增的参数increment里应把此属性名加上。
            timeout: 1,
            isCol: false //是否为多列瀑布流布局，以便调整正在加载的菊花显示位置。
        }, opt || {});

        if ($(fall.selector).size() == 0) {
            return;
        }
        //默认加载
        reqSrc();
    };

    function scrollEvent() {
        //节流
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            scroll.call();
        }, fall.timeout);
    }

    function scroll() {
        var scrollTop = $(window).scrollTop(),
            clientHeight = $(window).height(),
            nodeHeight, i, nodes = $(fall.selector) || [];

        for (i = 0; i < nodes.length; i++) {
            nodeHeight = parseInt($(nodes[i]).css("height"));
            if (nodeHeight + $(nodes[i]).offset().top <= scrollTop + clientHeight - fall.offset) {
                //需要加载
                abrogate();
                reqSrc();
                return;
            } else {
                continue;
            }
        }
    }

    /**
     * 取消滚动事件
     *
     */
    function abrogate() {
        $(window).unbind("scroll", scrollEvent);
    }

    //是否再次绑定事件
    var isBind = true;

    function isContinue() {
        isBind = false;
    }

    function reqSrc() {

        var opt = fall,
            i,
            url = /\?$/.test(opt.url) ? opt.url : opt.url + "?";

        url += $.param(opt.options);
        if (opt.dataType == "jsonp") url += "callback=?";

        //如果此接口所有数据已经加载完毕
        if (notData[url]) return;


        var $fisrt = $(fall.selector).eq(0);
        if (opt.isCol) {
            $fisrt = $(fall.selector).parent();
        }
        if (!$fisrt.find(".__isloading__")[0]) {
            $fisrt.append("<div class='__isloading__'></div>");
        }

        //请求结束后再请求
        if (isCompleted) {

            isCompleted = false;

            $.getJSON(apicdn + url, function(res) {
                if (res.Result && res.Result.length == 0 || res.length == 0) {
                    notData[url] = true;
                    return;
                }

                var pIndex;
                opt.options[fall.increment] ++;

                //把页标通过回调暴露出去，并通过回调获取新的页标，这样用户可以在发送请求时自定义页标了
                if (opt.callback) {
                    pIndex = opt.callback(res, opt.options[fall.increment], isContinue);
                    if (pIndex) opt.options[fall.increment] = pIndex;
                }
            }).complete(function() {
                isCompleted = true;
                $(".__isloading__").remove();
                isBind && $(window).bind("scroll", scrollEvent);
            });
        }

    }
    return waterfall;
});