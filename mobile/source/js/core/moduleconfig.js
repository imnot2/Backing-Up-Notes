(function (require) {
    var _host = /staticwap.ymatou.com/ig;

    if (_host.test(require.config.base)) {
        require.config.version = "2015020310";
        $m.isOnline = true;
    } else {
        require.config.version = "2015020310";
        $m.isOnline = !1;
    }

})($m.load);