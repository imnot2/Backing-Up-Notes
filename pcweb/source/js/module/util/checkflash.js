define(function (require, exports, module) {
	function CheckFlash() {

		var isIE = (navigator.appVersion.indexOf("MSIE") >= 0);

		var hasFlash = true;

		if (isIE) {
			try {
				var objFlash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			}
			catch (e) {
				hasFlash = false;
			}
		}
		else {
			if (!navigator.plugins["Shockwave Flash"]) {
				hasFlash = false;
			}
		}

		return hasFlash;
	}
	return {
		hasFlash: CheckFlash()
	}
})