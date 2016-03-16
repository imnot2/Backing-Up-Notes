define(function (require, exports, module) {
    function adapt(cg) {
        cg = $m.merge(config, cg);
        var cssLoaded = !1;
        var handle = window.onresize = function () {
            var bro = navigator.userAgent.match(/MSIE\s(\d)/),
            cwidth = (document.body || document.documentElement).clientWidth,
            ie678 = bro && bro[1] && bro[1] < 9,
            header = document.getElementsByTagName('head')[0];
            if (cwidth <= 1024) {
                if (!cssLoaded && ie678) {
                    elem = $m.onload(cg.stylesheet);
                    cssLoaded = !0;
                }
                cg.callback(!1);
            } else {
                if (ie678 && cssLoaded) {
                    location.reload();
                    cssLoaded = !1;
                }
                cg.callback(!0);
            }
        };
        handle();
    }
    var config = {
        stylesheet: '',
        callback: null
    };
    return adapt;
})