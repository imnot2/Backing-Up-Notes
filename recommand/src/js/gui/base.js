'use strict';
var gui = win.gui || (win.gui = {});

function isType(type) {
    return function(str) {
        return Object.prototype.toString.call(str) === '[object ' + type + ']';
    };
}

function singleton(fn) {
    var res;
    return function() {
        return res || (res = fn.apply(null, arguments));
    };
}
gui.MOBILEREG = /^1[3|4|5|7|8][0-9]\d{8}$/;

//是否为微信浏览器
gui.isWechat = singleton(function() {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
});

//是否为线上环境
gui.isLine = singleton(function() {
    return !/alpha|localhost|file:/ig.test(location.href);
});

gui.baseUrl = gui.isLine() ? 'm.ymatou.com' : 'mobile.alpha.ymatou.com';