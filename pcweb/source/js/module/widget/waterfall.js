/*
 * 滚动加载组件v1.0.0
 */
define(function (require, exports, module) {
    var fall = {},
        timer = null,
        isData = true,
        isTrue = true,
        apicdn = require('../config/apiCDN');
    $(window).bind("scroll", scrollEvent);

    function waterfall(opt) {
        fall = $.extend({
            selector: "", //jq选择器，
            url: "", //用户请求资源的url
            type: "get", //请求类型。
            increment: "", //options需要递增的属性
            offset: 400,
            options: {}, //请求需要的参数，如果当中有需要递增的页标属性，递增的参数increment里应把此属性名加上。
            timeout: 1
        }, opt || {});

        //默认加载
        reqSrc();
    };

    function scrollEvent() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
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
                abrogate()
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
        var $fisrt = $(fall.selector).eq(0);
        if (!$fisrt.find(".__isloading__")[0]) {
            $fisrt.append("<div class='__isloading__'></div>");
        }

        /*for (i in opt.options) {
			url += i + "=" + opt.options[i] + "&"
		}*/
        url += $.param(opt.options);
        if (opt.dataType == "jsonp") url += "callback=?";

        //判断无数据
        if (isData) {

            //请求结束后再请求
            if (isTrue) {
                isTrue = false;

                $.getJSON(apicdn + url, function (res) {

                    if (res.Result && res.Result.length == 0) {
                        isData = false;
                    }

                    isTrue = true
                    var pIndex;
                    opt.options[fall.increment]++;

                    //把页标通过回调暴露出去，并通过回调获取新的页标，这样用户可以在发送请求时自定义页标了
                    if (opt.callback) {
                        pIndex = opt.callback(res, opt.options[fall.increment], isContinue);
                        if (pIndex) opt.options[fall.increment] = pIndex;
                    }

                }).complete(function () {
                    $(".__isloading__").remove();
                    isBind && $(window).bind("scroll", scrollEvent);

                    //如果数据为空不在请求数据
                });
            }

        } else {
            $(".__isloading__").remove();
        }

    }
    return waterfall;
});