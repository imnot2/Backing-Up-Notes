/* global core: true */
/* jshint strict: false */
/**
 * 侧滑功能
 */
core.directive('sideSlide', ['$window', function ($window) {
	return {
		restrict: 'A',
		scope: {
			sideSlide: '='
		},
		link: function (scope, ele) {
			//厂商前缀
			var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
			/**
			 * 增加厂商前缀
			 */
			function addVendorPre(obj, propertys) {
				var prefix,
					prop,
					property,
					camelProp,
					i = 0,
					_o = {},
					_VENDOR_PREFIXES = (function (vendor) {
						var i = 0,
							array = [];
						while (i < vendor.length) {
							array.push(vendor[i++] ? '' : '-' + vendor[i] + '-');
						}
						return array;
					})(VENDOR_PREFIXES);

				for (property in propertys) {
					camelProp = property[0].toUpperCase() + property.slice(1);
					i = 0;
					while (i < VENDOR_PREFIXES.length) {
						prefix = VENDOR_PREFIXES[i];
						prop = (prefix) ? prefix + camelProp : property;

						if (prop in obj.style) {
							prefix = _VENDOR_PREFIXES[i] + property;
							_o[prefix] = propertys[property];
						}
						i++;
					}
				}
				return _o;
			}

			var $ele = $(ele),
				$win = $($window);
			$ele.css('min-height', $win.height() + 'px').hide();

			var enterStage = function () {
				$ele.show();
				process(true);
			};
			var process = function (isInStage) {
				setTimeout(function () {
					$ele.css(addVendorPre($ele[0], {
						'transform': 'translate3d(' + (isInStage ? 0 : '101%') + ',0,0)',
						'transition': '.4s ease'
					}));
				});
				setTimeout(function () {
					$ele[isInStage ? 'show' : 'hide']();
				}, 4E2);
			};
			var exiteStage = function () {
				process(false);
			};

			exiteStage();

			scope.$watch('sideSlide', function (l) {
				l ? enterStage() : exiteStage();
			});
		}
	};
}]);