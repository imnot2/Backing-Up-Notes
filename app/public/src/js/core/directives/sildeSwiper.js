/* global core: true,angular:true,Swiper:true */
/* jshint strict: false */
/**
 * 将sildeSwiper插件指令化
 *
 */
core.directive('sildeSwiper', ['$timeout', '$window',
	function ($timeout, $window) {
		return {
			restrict: 'A',
			scope: {
				sildeSwiper: '='
			},
			link: function (scope, ele) {
				var opts = scope.sildeSwiper /*scope.$eval(attrs.sildeSwiper) || {}*/ ,
					newSwiper,
					createSwiper = function () {
						opts.onSlideNext = function () {
							//每次滚动触发一次滚动事件
							//为了性能不在window上面绑定过去事件
							//每一次轮播 可以视为一次滚动
							$($window).triggerHandler('scroll');
						};
						if (ele.find('.swiper-slide')[0]) {
							newSwiper = new Swiper(ele[0], opts);
							if (opts.onReady) {
								opts.onReady(newSwiper);
							}
						}
						else {
							$timeout(createSwiper, 30);
						}
					};
				createSwiper();
			}
		};
	}
]);
