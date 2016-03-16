/**
 * 彻底解决position的问题，
 * 但是又掉到另一个坑中了android 的刷新策略有问题，我还能说什么呢？FUCK
 */
core.directive('slippage', ['$window','$timeout','$document','userAgent',
	function ($window,$timeout,$document,userAgent) {
		return {
			restrict: 'A',
			link: function (scope, ele) {
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

				var startX,
					lastY,
					startY,
					endY,
					timerId,
					drift = 0,
					direction = 1,//方向
					radix = 2.5, //当页面已经到底部，加上一个基数，当页面越拉拉的距离越小。
					recoil = false;
				$document.on('touchstart',function(e){
					startX = e.originalEvent.changedTouches[0].pageX;
					startY = e.originalEvent.changedTouches[0].pageY;
				}).on('touchmove',function(e){
					endY = e.originalEvent.changedTouches[0].pageY;

					direction = endY >= startY ? -1 : 1;

					drift += endY - startY;

					e.preventDefault();
					$(ele).css({
						'-webkit-transform': 'translate(0px, ' + drift + 'px)',
						'-webkit-transition': '-webkit-transform 0',
						'transition': '-webkit-transform 0'
					});

					//将本次作为下次的开始
					startY = endY;
				});
			}
		};
	}
]);