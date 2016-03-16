/**
 * 兼容性脚本
 * 不管怎么兼容处理虽然要做槽我还是要吐 fuck
 */
////////////////////以下是兼容性处理/////////////////////
/*
 * 暂只针对全球热卖
 * 底部悬浮分类
 */
core.directive('compatibleStatusBarHide', ['$window', '$timeout',
	function ($window, $timeout) {
		return {
			restrict: 'A',
			link: function (scope, ele) {
				var $win = angular.element($window),
					initHeight,
					interval = 400;
				/*webview初始化时，窗口宽高取值不准确，又不能获得页面是否初始化完毕，只能延时取值，这种方式也不合理
				 * 不过经测试除了有部分延迟的情况，没有出现被遮盖的问题
				 */
				$timeout(function () {
					initHeight = $win.height();
				}, interval);

				var resize = function () {
					$timeout(function () {
						if (initHeight) {
							if ($win.height() === initHeight) {
								ele.removeClass('compatible-status-bar-hide');
							}
							else {
								ele.addClass('compatible-status-bar-hide');
							}
						}
					});
				};
				$win.resize(resize);
			}
		};
	}
]);

/*
 * 兼容不支持fixed功能
 * 只解决部分机型webview 第一次打开所在的fixed不能点击bug
 *
 * #实现原理：默认使用absolute定位，当用户滑动之后使用fixed定位
 * 然后移除事件
 *
 * #【注意】：兼容fixed 并不是解决低端机不支持fixed功能，只处理我上面的场景！！
 */
core.directive('compatibleAndroidClickInvalid', ['$window', '$timeout','userAgent',
	function ($window, $timeout,userAgent) {
		return {
			restrict: 'A',
			link: function (scope, ele) {
				if (!userAgent.isAndroid) {
					return;
				}

				$timeout(function () {
					var top = ele.css('top'),
						left = ele.css('left'),
						bottom = ele.css('bottom');
					ele.css('position', 'absolute');
				});
				//@TODO 这里不能绑定scroll事件否则会导致整个功能失效，原因后续查找
				$($window).on('touchstart scroll', function () {
					ele.css('position', 'fixed');
				});
			}
		};
	}
]);

/**
 * 针对ios input 呼出position fixed 会下滑的问题
 */
core.directive('iosInputPanelPosition', ['$window','$timeout','$document','userAgent',
	function ($window,$timeout,$document,userAgent) {
		return {
			restrict: 'A',
			link: function (scope, ele) {
				if (!userAgent.isIos) {
					return;
				}
				var $ele = $(ele),
					$win = $($window),
				focus = function(){
					setTimeout(function(){
			           $ele.css({
							position:'absolute',
							top:$win.scrollTop()
						});
					},3E2);
					$win.on('scroll',focus);					
				},blur = function(){
					$ele.css({
						position:'fixed',
						top:0
					});
					$win.off('scroll',focus);
				};

				$ele.find('input').focus(focus).blur(blur);
				
			}
		};
	}
]);