/* global core: true*/
/* jshint strict: false,latedef:nofunc */
/**
 * 动态计算css值
 *
 */
core.directive('ymtStyle', ['$window', function ($window) {
	return {
		restrict: 'A',
		link: function (scope, ele, attrs) {
			var $elem = $(ele),
				css = attrs.ymtStyle || '';
			var UNIT_EXP = /px|em|rem|vw|vh|ex|ch|vmin|vmax/ig,
				OPERRA_EXP = /\+|\-|\*|\%/;
			//属性的方法集
			var attributeFunSet = {
					fullHeight: function () {
						return $(document).height();
					},
					clientHeight: function () {
						return $(window).height();
					},
					fullWidth: function () {
						return $(document).width();
					},
					clientWidth: function () {
						return $(window).width();
					}
				},
				ATTR_FUN_EXP = new RegExp((function () {
					var repexp = '';
					for (var i in attributeFunSet){
						repexp += '|' + i;
					}
					return repexp.substring(1);
				})(), 'gi');

			function setCss(css) {
				$elem.css(css);
			}

			function parse() {
				var attrList = css.split(';'),
					len = attrList.length,
					attr,
					tempCss = {},
					unit;
				while (len--) {
					unit = '';
					attr = (attrList[len] || '').split(':');
					if (attr.length > 1) {
						//替换区域函数并执行返回结果
						attr[1] = attr[1].replace(ATTR_FUN_EXP, function (c) {
							return attributeFunSet[c]();
						});
						if (OPERRA_EXP.test(attr[1])) {
							if (UNIT_EXP.test(attr[1])) {
								attr[1] = attr[1].replace(UNIT_EXP, function (a) {
									//保留第一个单位
									if (!unit){
										unit = a;
									}
									return '';
								});
								unit = unit || 'px';
							}
							try {
								attr[1] = (new Function('return ' + attr[1]))() + unit;
							}
							catch (e) {
								console.error(attr[1], 'attribute Invalid value');
								return;
							}
						}
						tempCss[attr[0]] = attr[1];
					}
				}
				setCss(tempCss);
			}
			parse();
			/**
			 * 监听窗口变更
			 * 在安卓部分机型存在webview 在加载页面同时size会变更
			 * 导致计算窗体值会出现偏差
			 * 对于Android webview初始化的问题 我已无力吐槽！！！
			 */
			$($window).resize(function () {
				parse();
			});

		}
	};
}]);