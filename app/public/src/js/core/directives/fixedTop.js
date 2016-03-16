/* global core: true */
/* jshint strict: false */
//固定头
core.directive('fixedTop', [
	function() {
		return {
			restrict: 'A',
			controller: function($scope, $element) {
				var top = $element.offset().top,
					height = $element.height();

				$scope.floatBar = function() {

					if ($(document).scrollTop() > parseInt(top) + parseInt(height)) {
						$element.parent().addClass('home-list-fixed');
					} else {
						$element.parent().removeClass('home-list-fixed');
					}
				};

			},
			link: function(scope) {
				//$(window).scroll(scope.floatBar)
				var bindScroll = function() {
					$(window).scroll(scope.floatBar);
					document.removeEventListener('touchstart', bindScroll);
				};
				document.addEventListener('touchstart', bindScroll, false);
				/*document.addEventListener('touchmove',scope.floatBar, false);
				document.addEventListener('touchend',function(){
					setTimeout(scope.floatBar, 50);
				}, false);*/
			}
		};
	}
]);