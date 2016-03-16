/* global core: true*/
/* jshint strict: false,latedef:nofunc */
//文字截断
core.directive('textflow', [

	function () {
		return {
			restrict: 'AE',
			scope: {
				textflow: '@'
			},
			link: function (scope, ele, attrs) {
				var defaultOpts = {
					row: 3,
					superaddition: '...'
				};
				defaultOpts.row = attrs.textflow || defaultOpts.row;

				//使用css3 -webkit-line-clamp 来处理多行溢出
				/*if('webkitLineClamp' in document.documentElement.style){
					ele.css({
						'display': '-webkit-box',
					    '-webkit-line-clamp': defaultOpts.row,
					    '-webkit-box-orient': 'vertical'
					})
					return ;
				}*/
				scope.$watch('textflow', intercept);

				function intercept() {
					var opts = defaultOpts;
					opts.row = attrs.textflow || opts.row;

					var origHeight = ele.height();
						//fontSize = parseFloat(ele.css('fontSize'));

					var text = ele.text(),
						title = ele.attr('title');

					//将原来的值保存到title中
					if (!title){
						ele.attr('title', text);
					}

					//获得高度
					ele.text('x');
					var lineHeight = parseFloat(ele.css('lineHeight'), 10),
						rowHeight = ele.height(); //容器高度;


					var gapHeight = lineHeight > rowHeight ? (lineHeight - rowHeight) : 0;
					var targetHeight = gapHeight * (opts.row - 1) + rowHeight * opts.row;
					ele.text(text);
					if (origHeight <= targetHeight || !text) {
						return;
					}
					var len = 0,
						start = 1,
						end = text.length;
					while (start < end) {
						len = Math.ceil((start + end) / 2);
						ele.text(text.slice(0, len) + opts.superaddition);
						if (ele.height() <= targetHeight) {
							start = len;
						}
						else {
							end = len - 1;
						}
					}
					text = text.slice(0, start) ;//.replace(/[\w]+$/, '');
					ele.text(text + opts.superaddition);
				}

			}
		};
	}
]);