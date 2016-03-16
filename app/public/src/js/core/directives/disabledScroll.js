/* global core: true */
/* jshint strict: false */
//禁止滚动条
core.directive('disabledScroll', [
	function () {
		return {
			restrict: 'A',
			link: function (scope, ele) {
				ele[0].addEventListener('touchmove', function (event) {
					event.preventDefault();
				}, false);
			}
		};
	}
]);