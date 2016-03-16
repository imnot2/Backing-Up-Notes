/*
 * 替换价格
 * @param {String}
 * 将price 比如 12.03 替换成 <b>&yen;</b>1.2<i>03</i>
 */
ymtapp.filter('replacePriceHtml', ['$sce',function($sce) {
	return function(price) {
		if (!price) {
			return "";
		}
		var priceAttr, i = 0,
			len, priceHtml = "",
			/**
			 * [transform description]
			 * @param  {string}  priceStr 价格字符串
			 * @param  {Boolean} isRange  是否是范围
			 * @return {string}           [description]
			 */
			transform = function(priceStr, isRange) {
				var _price = (priceStr + "").split(".");
				priceHtml += "<b>&yen;</b>" + _price[0] + (_price[1] ? ".<i>" + _price[1] + "</i>" : "") + (isRange ? "~" : "");
			}

		priceAttr = (price+"").split("~");
		for (len = priceAttr.length; i < len; i++) {
			transform(priceAttr[i], (i + 1 != len) /*不是最后一个都添加*/ );
		}

		return $sce.trustAsHtml(priceHtml);
	}
}])