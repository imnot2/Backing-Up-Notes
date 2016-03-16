/* global core: true */
/* jshint strict: false */
/**
 * placeholder 离开清空
 */
core.directive('ymtPlaceholderLeave', [
	function () {
		return {
			restrict: 'A',
			scope: {
				ymtPlaceholderLeave: '='
			},
			link: function (scope, ele) {
				'use strict';
				$(ele).focus(function () {
					if (!this.value) {
						$(this).attr('data-old-placeholder', this.placeholder);
						this.placeholder = '';
					}
				}).blur(function () {
					if (!this.value) {
						this.placeholder = $(this).attr('data-old-placeholder');
					}
				});
				scope.$watch('ymtPlaceholderLeave', function (n) {
					if (!n) {
						var $ele = $(ele);
						$ele.attr('placeholder', $ele.attr('data-old-placeholder'));
					}
				});
			}
		};
	}
]);