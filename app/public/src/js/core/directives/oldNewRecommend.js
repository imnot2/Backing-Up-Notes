/* global core: true */
/* jshint strict: false */
/*
* 老推新弹层功能
*   1、shareTitle：分享标题
	2、sharePicUrl：分享图片
	3、shareTip：分享内容
	4、shareUrl：分享url地址
	5、shareFlag：分享标志
*/
core.directive('oldNewRecommend', ['$window', 'config','YmtApi',
 function ($window, config,YmtApi) {
	return {
		restrict: 'A',
		link: function (scope, ele) {
			var layer = $('#oldNewRecommendLayer'),
				shareing = false,
				$win = $($window);

			layer.on('click',function (e) {
				if(e.target.className === 'recommend-close'){
					return layer.hide();
				}
				if (shareing) {
					return;
				}
				shareing = true;
				config(function (cfg) {
					shareing = false;
					layer.hide();
					$('#shareTips').show();
					YmtApi.openShare({
						shareTitle:encodeURIComponent(cfg.shareTitle),
						sharePicUrl:encodeURIComponent(cfg.sharePicUrl),
						shareTip:encodeURIComponent(cfg.shareTip),
						shareUrl:encodeURIComponent(cfg.Url)
					});
				});
			}).on('touchmove', function (e) {
				e.preventDefault();
			});

			var timer;
			$win.on('touchmove', function () {
				//是否透明度
				if (ele.attr('data-is-opacity') === 'false') {
					!ele.hasClass('old-new-recommend-opacity') && ele.addClass('old-new-recommend-opacity');
					//兼容Android 4x 不能触发touchend
					timer && clearTimeout(timer);
					timer = setTimeout(function () {
						ele.removeClass('old-new-recommend-opacity');
					}, 300);
				}
			}).on('touchend', function () {
				ele.removeClass('old-new-recommend-opacity');
			});
			if (ele.attr('data-is-opacity') === 'false') {
				$win.on('load', function () {
					$(ele).show();
				});
			}
			if ($('.userOrder')[0]) {
				var nav = $('.userOrder .userOrderNav'),
					navTop = nav.css('top');
				$($window).scroll(function () {
					if ($(document).scrollTop() > ele.height()) {
						nav.css('top', 0);
					}
					else {
						nav.css('top', navTop);
					}
				});
			}

			var reset = function () {
				//w 320, h 568
				var $$win = $($window),
					width = $$win.width(),
					height = $$win.height();
				var scale = Math.min(width/320,height/568);
				layer.css('fontSize',scale*10);
			};

			$win.resize(reset);

			ele.on('click', function () {
				layer.css('display', 'block');
				reset();
			});
		}
	};
}]);