/* global core: true,angular:true */
/* jshint strict: false */
//图片懒加载
core.directive('lazyLoad', ['$window', function (root) {
	return {
		restrict: 'A',
		link: function (scope) {
			'use strict';
			/*var opts; 
			if(attrs.lazyCfg){
				opts = (new Function("return" + attrs.lazyCfg))();

				if(opts.isFade){
					elem.css("opacity",0);
				}
			}*/

			var lazyLoad = {};

			var callback = function () {};

			var offset, poll, throttle, unload;
			/**
			 *
			 * @param  {element} element 图片对象
			 * @param  {object}  view 视图及页面显示部分
			 * @return {Boolean} 是否在视图中
			 */
			var inView = function (element, view) {
				var box = element.getBoundingClientRect();
				return !(box.right >= view.r && box.left <= 0 && box.top <= 0 && box.bottom > view.b);
			};

			var debounce = function () {
				clearTimeout(poll);
				poll = setTimeout(lazyLoad.render, throttle);
			};

			lazyLoad.init = function (opts) {
				opts = opts || {};
				var offsetAll = opts.offset || 0;
				var offsetVertical = opts.offsetVertical || offsetAll;
				var offsetHorizontal = opts.offsetHorizontal || offsetAll;
				var optionToInt = function (opt, fallback) {
					return parseInt(opt || fallback, 10);
				};
				offset = {
					t: optionToInt(opts.offsetTop, offsetVertical),
					b: optionToInt(opts.offsetBottom, offsetVertical),
					l: optionToInt(opts.offsetLeft, offsetHorizontal),
					r: optionToInt(opts.offsetRight, offsetHorizontal)
				};
				throttle = optionToInt(opts.throttle, 250);
				unload = !!opts.unload;
				callback = opts.callback || callback;
				lazyLoad.render();
				if (document.addEventListener) {
					/*root.addEventListener('scroll', debounce, false);
					root.addEventListener('touchstart', debounce, false);
					root.addEventListener('load', debounce, false);*/
					$(root).on('scroll', debounce)
						.on('touchstart', debounce)
						.on('load', debounce);
				}
				/* else {//去掉ie的兼容
									root.attachEvent('onscroll', debounce);
									root.attachEvent('onload', debounce);
								}*/
			};

			lazyLoad.render = function () {
				var nodes = document.querySelectorAll('img[lazy-load]');
				var length = nodes.length;
				var src, elem;
				var view = {
					l: (root.pageXOffset || document.documentElement.scrollLeft) - offset.l,
					t: (root.pageYOffset || document.documentElement.scrollTop) - offset.t,
					b: (root.innerHeight || document.documentElement.clientHeight) + offset.b,
					r: (root.innerWidth || document.documentElement.clientWidth) + offset.r
				};
				var loadError = function(){
					elem.removeEventListener('error');
					elem.removeEventListener('load');
					this.src = 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEHAAIALAAAAAABAAEAAAICVAEAOw==';
					
				}
				for (var i = 0; i < length; i++) {
					elem = nodes[i];
					if (inView(elem, view)) {
						if (unload) {
							elem.setAttribute('lazy-load-placeholder', elem.src);
						}
						src = elem.getAttribute('lazy-load');
						if (/{{/.test(src)) {
							return;
						}
						elem.src = src;

						if (!unload) {
							elem.removeAttribute('lazy-load');
						}
						elem.addEventListener('load', function () {
							callback(this, 'load');
						})
						elem.addEventListener('error',loadError);	
					}
					else if (unload && !!(src = elem.getAttribute('lazy-load-placeholder'))) {
						elem.src = src;
						elem.removeAttribute('lazy-load-placeholder');
						//callback(elem, 'unload');
						elem.addEventListener('load', function () {
							callback(this, 'unload');
						})
						elem.addEventListener('error',loadError);;
					}
				}
				/*if (!length) {
					lazyLoad.detach();
				}*/
			};

			lazyLoad.detach = function () {
				if (document.removeEventListener) {
					$(root).off('scroll')
						.off('touchstart');
				}
				/* else {
									root.detachEvent('onscroll', debounce);
								}*/
				clearTimeout(poll);
			};

			lazyLoad.init({
				throttle: 250,
				unload: false,
				offset: 250,
				callback: function (element) {
					//懒加载完毕 移除多余的初始化状态
					angular.element(element)
						.removeClass('img-init')
						.removeClass('img-err-product');
				}
			});

			scope.$watch(function () {
				lazyLoad.render();
			});
		}
	};
}]);