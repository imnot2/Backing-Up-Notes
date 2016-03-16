/* global core: true,angular:true */
/* jshint strict: false */
core.directive('dropdown', ['$window', '$document',
	function (window, $document) {
		return {
			restrict: 'A',
			link: function ($scope, $ele, $attrs) {
				var $win = angular.element(window),
					document = $document[0],
					element = $ele[0];

				function windowHeight() {
					return document.documentElement.clientHeight;
				}

				function getBodyHeight() {
					return document.body.clientHeight;
				}

				function scrollTop() {
					return window.pageYOffset || document.documentElement.scrollTop;
				}

				function clientHeight() {
					return element.clientHeight;
				}

				function onScroll() {
					//判断滚动条是否到了底部
					if (scrollTop() >= getBodyHeight() - windowHeight()) {
						$scope.$apply($attrs.dropdown);
					}
				}

				var startX,
					startY,
					//endX,
					endY,
					//isTouchend=false,
					//timer,
					timerId,
					drift,
					radix = 2.5, //当页面已经到底部，加上一个基数，当页面越拉拉的距离越小。
					recoil = false;
				var touchendFn = function () {
					if (!timerId) {
						timerId = null;
					}
					radix = 2.5;

					if (startY >= endY && recoil) {
						recoil = false;
						$('.page-content').css({
							'-webkit-transform': 'translate(0px, 0px)',
							'-webkit-transition': '-webkit-transform 0.45s',
							'transition': '-webkit-transform 0.45s'
						});
						if (endY < startY) {
							onScroll();
						}
					}

				};

				$win.on('touchstart', function (e) {
					radix++;
					//定义滑动初始时的坐标
					startX = e.originalEvent.changedTouches[0].pageX;
					startY = e.originalEvent.changedTouches[0].pageY;
					//timerId = new Date().getTime();
				}).on('touchmove', function (e) {
					/*var $this =$(this);
					timer && clearTimeout(timer)
					timer = setTimeout(function(){
						touchendFn(e)
					}, 300);	*/
					endY = e.originalEvent.changedTouches[0].pageY;

					drift = (endY - startY) / radix;
					if (startY >= endY && scrollTop() >= getBodyHeight() - windowHeight()) {
						//e.preventDefault();
						recoil = true;
						$('.page-content').css({
							'-webkit-transform': 'translate(0px, ' + drift + 'px)',
							'-webkit-transition': '-webkit-transform 0',
							'transition': '-webkit-transform 0'
						});
					}
				}).on('touchend', touchendFn)
				  .one('scroll', function () {
						$scope.$eval($attrs.dropdown);
				  });;

				function onDestroy() {
					$win.unbind('scroll', onScroll);
				}
				$scope.$on('$destroy', onDestroy);
			}
		};
	}
]);