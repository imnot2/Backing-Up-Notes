(function(require) {
	var _host = /static\.c\.ymatou\.com/ig;

	if (_host.test(require.config.base)) {
		require.config.version = "2015031212";
		$m.isOnline = true;
	} else {
		require.config.version = "";
		$m.isOnline = !1;
	}

})($m.load);