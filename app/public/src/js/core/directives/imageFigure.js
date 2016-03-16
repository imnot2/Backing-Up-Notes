/* global core: true,angular:true */
/* jshint strict: false */
/*
 * 图片查看功能
 *
 */
core.directive('imageFigure', ['$window', function ($window) {
	return {
		restrict: 'A',
		link: function (scope, ele) {
			//厂商前缀
			var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];

			//exclude //排除
			//isZoom //是否缩放
			var $win = angular.element($window),
				interval = 400;

			function prefixed(obj, property) {
				var prefix,
					prop;
				var camelProp = property[0].toUpperCase() + property.slice(1);

				var i = 0;
				while (i < VENDOR_PREFIXES.length) {
					prefix = VENDOR_PREFIXES[i];
					prop = (prefix) ? prefix + camelProp : property;

					if (prop in obj) {
						return prop;
					}
					i++;
				}
				return undefined;
			}

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
							array.push('-' + vendor[i++] + '-');
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

			var Figure = function (cfg) {
				this.isOpen = false; //是否已经打开
				this.create();
				this.bind();
			};

			Figure.prototype = {
				$mask: null,
				$arae: null,
				getWinSize: function () {
					return {
						width: document.documentElement.clientWidth,
						height: document.documentElement.clientHeight
					};
				},
				create: function () {
					var html = ['<div class="image-figure">',
						'<div class="image-figure-area">',
						'<div class="image-figure-wrap" id="imageFigure"></div>',
						'</div>',
						'</div>'
					];
					if (!(this.$stage && this.$stage[0])) {
						//创建
						this.$mask = $(html.join('')).appendTo('body');
						this.$stage = this.$mask.find('#imageFigure');
					}
				},
				/*
				 * @param clone image
				 */
				exhibit: function (img) {
					var that = this,
						originalImg = this.originalImg = img, //原图
						originalImgOffset = originalImg.offset();
					this.isOpen = true;

					img = this.img = img.clone();

					var winSize = this.getWinSize(),
						maxSize = {
							'maxHeight': winSize.height,
							'maxWidth': winSize.width
						};

					img.data('maxSize', maxSize);

					img.css(maxSize);

					this.$mask.fadeIn(interval);
					//设置图片的初始化位置
					that.$stage.css({
							'top': originalImgOffset.top,
							'left': originalImgOffset.left
						}).append(img)
						.closest('.image-figure')
						.show();
					/**
					 * 让图片从原来位置移动到中心位置
					 *
					 */
					var appear = function () {
						var top = (winSize.height - that.$stage.height()) / 2,
							left = (winSize.width - that.$stage.width()) / 2;
						that.$stage.animate({
							'top': top,
							'left': left
						}, interval);
					};

					//在部分ios中图片是重新加载
					img.on('load', appear);

					//图片的位置，用于拖动
					this.imgPosition = {
						x: 0,
						y: 0
					};
				},
				close: function () {
					var originalImg = this.originalImg, //原图
						originalImgOffset = originalImg.offset();
					this.isOpen = false;
					this.$stage.css(addVendorPre(this.$stage[0], {
						'transform': ''
					})).animate({
						'top': originalImgOffset.top,
						'left': originalImgOffset.left
					}, interval, function () {
						$(this).closest('.image-figure').hide()
							.find('img')
							.remove();
					});
					this.$mask.fadeOut(interval);

				},
				bind: function () {
					var that = this,
						lastTouch = [],
						reference = {},
						x, y,
						triggerMove = false;

					var firstClick = false, //首次点击
						isZoom = false; //是否缩放

					ele.on('click', 'img', function (e) {
						var target = e.target;
						that.exhibit($(target));
						zoom();
					});

					this.$mask.on('click', function () {
						that.close();
					}).on('touchmove', function (e) {
						e.preventDefault();
					});
					/*
					 * 图片区域重新定位
					 */
					function reposition() {
						var winSize = that.getWinSize();
						that.$stage.css({
							'top': (winSize.height - that.$stage.height()) / 2,
							'left': (winSize.width - that.$stage.width()) / 2
						});
					}

					$win.resize(reposition);

					/*
					 * @function 缩放
					 * @description
					 *  缩放分两种方式：
					 * 	1、直接双击为去掉图片最大限制，显示原图。为最大模式则还原
					 * 	2、通过手指缩放，放大可以为原图的5倍大小，缩小最小是原来显示的尺寸
					 * 		也就是只提供对原尺寸的放大和还原功能
					 */
					function zoom() {
							if (isZoom) {
								that.img.css(addVendorPre(that.img[0], {
									'transform': 'scale(1)'
								}));
							}
							else {
								that.img.css(addVendorPre(that.img[0], {
									'transform': 'scale(1.5)'
								}));
							}

							//reposition()
							isZoom = !isZoom;
						}
						/**
						 * 手指操作集合
						 * @type {Object}
						 */
					var touchActions = {};

					touchActions[1] = function (e) {
						var touches = e.originalEvent.changedTouches;
						var imgPosition = that.imgPosition;
						x = imgPosition.x + touches[0].pageX - reference.startX;
						y = imgPosition.y + touches[0].pageY - reference.startY;
						that.$stage.css(addVendorPre(that.$stage[0], {
							'transform': 'translate(' + x + 'px,' + y + 'px)'
						}));
					};
					touchActions[2] = function (e) {
						triggerMove = true;
						var touches = e.originalEvent.changedTouches;

						lastTouch[0].pageX = touches[0].pageX;
						lastTouch[0].pageY = touches[0].pageY;

						lastTouch[1].pageX = touches[1].pageX;
						lastTouch[1].pageY = touches[1].pageY;

					};

					//绑定缩放功能
					this.$stage.on('click', function () {
						that.close();
					}).on('touchstart', 'img', function (e) {
						var touchs = e.originalEvent.changedTouches;
						if (!firstClick) { //如果在限定时间内点击就产生双击事件
							firstClick = true;
							setTimeout(function () {
								firstClick = false;
							}, interval);
						}
						else {
							zoom();
						}
						lastTouch = [{}, {}];
						reference = {
							startX: touchs[0].pageX,
							startY: touchs[0].pageY
						};
						triggerMove = false;

						if (!isZoom) {
							event.stopPropagation();
						}
					}).on('touchmove', 'img', function (e) {
						e.preventDefault();
						var touches = e.originalEvent.changedTouches;

						touchActions[touches.length](e);

					}).on('touchend', 'img', function (e) {
						//if(isZoom){
						var touches = e.originalEvent.changedTouches;
						that.imgPosition.x = x;
						that.imgPosition.y = y;
						//}
					});
				}
			}
			var figure = new Figure();
		}
	};
}]);