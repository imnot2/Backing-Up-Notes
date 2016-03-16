/*
 *  author: dingbigui@ymatou.com
 *  description: hover气泡
 *
 * example:
 *   html:
 *    <a class="link-blue" href="javascript:;"></a>
 *   js:
 *		var Bubble = require("util/bubble");
 *      Bubble($('.link-blue'), {
 *			"width": 396,
 *			"direction": "top",
 *			"backgroundColor": "#fff",
 *			"borderColor": "#d3d3d3",
 *			"fontColor": "#666",
 *			"triangleWidth": "8px",
 *			"borderWidth": "1",
 *			"text": '这是一个气泡'
 *		});
 */

Ymt.add(function(require, exports, module) {
	function Bubble(triggerNode, config) {
		if (!(this instanceof Bubble)) return new Bubble(triggerNode, config);
		this.node = null;
		this.triggerNode = triggerNode;
		this.config = $.extend({
			"backgroundColor": "#fff", //背景颜色
			"borderColor": "#ccc", //边框颜色
			"direction": "top", //方向
			"width": 200, //宽度
			"borderWidth": 1, //边框大小
			"text": "this is a bubble", //气泡中的html
			"triangleWidth": 10, //三角形大小
			"padding": 10, //内边距
			"fontColor": "#fff", //字体颜色
			mouseIn: function() {}, //鼠标移入时的回调
			mouseOut: function() {} //鼠标移出时的回调
		}, config || {});
		this.init && this.init();
	}
	Bubble.prototype = {
		init: function() {
			var cnf = this.config,
				timer = null,
				_this = this;

			cnf.width = parseInt(cnf.width);
			cnf.borderWidth = parseInt(cnf.borderWidth);
			cnf.triangleWidth = parseInt(cnf.triangleWidth);
			cnf.padding = parseInt(cnf.padding);

			this.node = this.parseHtml();
			$("body").append(this.node);
			this.addStyle();
			$(_this.triggerNode).bind('mouseenter', function(e) {
				cnf.mouseIn(this, this.node);
				_this.node.css({
						"visibility": "visible"
					})
					.bind('mouseenter', function(e) {
						if (timer) clearTimeout(timer);
					}).bind("mouseleave", function(e) {
						$(_this.node).css({
							"visibility": "hidden"
						});
						cnf.mouseOut(this, this.node);
					})
			}).bind('mouseleave', function(e) {
				timer = setTimeout(function() {
					$(_this.node).css({
						"visibility": "hidden"
					});
					cnf.mouseOut(this, this.node);
				}, 300);
			});
		},
		parseHtml: function() {
			var html = [];
			html.push('<div id="ymt-bubble' + new Date().getTime() + '"');
			html.push('style="visibility:hidden; text-align:left; width:' + this.config.width + 'px; position:absolute; padding:' + this.config.padding + 'px">');
			html.push('<span class="triangleBorder"></span>');
			html.push('<span class="triangleMask"></span>');
			html.push(this.config.text);
			html.push('</div>');
			return $(html.join(""));
		},
		addStyle: function() {
			var left, top, bubble_w, bubble_h, trigger_w, trigger_h, cnf = this.config,
				parent = this.node,
				triangleBorder = parent.find(".triangleBorder"),
				triangleMask = parent.find(".triangleMask"),
				triangle = parent.find(".triangleBorder, .triangleMask");

			left = this.triggerNode.offset().left;
			top = this.triggerNode.offset().top;
			bubble_w = this.node[0].offsetWidth;
			bubble_h = this.node[0].offsetHeight;
			trigger_w = this.triggerNode[0].offsetWidth;
			trigger_h = this.triggerNode[0].offsetHeight;
			parent.css({
				"background-color": cnf.backgroundColor,
				"border": cnf.borderWidth + "px solid " + cnf.borderColor,
				"color": cnf.fontColor
			});
			triangle.css({
				"width": 0,
				"height": 0,
				"font-size": 0,
				"overflow": "hidden",
				"border-width": cnf.triangleWidth,
				"position": "absolute"
			});
			switch (cnf.direction) {
				case "top":
					parent.css({
						"left": left + (trigger_w - bubble_w) / 2,
						"top": top - bubble_h - cnf.triangleWidth - 5
					});
					triangle.css({
						"border-style": "solid dashed dashed",
						"left": (bubble_w - cnf.triangleWidth * 2) / 2
					});
					triangleBorder.css({
						"border-color": cnf.borderColor + " transparent transparent",
						"bottom": -(cnf.triangleWidth * 2)
					});
					triangleMask.css({
						"border-color": cnf.backgroundColor + " transparent transparent",
						"bottom": -(cnf.triangleWidth * 2 - cnf.borderWidth)
					});
					break;
				case "right":
					parent.css({
						"left": left + trigger_w + cnf.triangleWidth + 5,
						"top": top + (trigger_h - bubble_h) / 2
					});
					triangle.css({
						"border-style": "dashed solid dashed dashed",
						"top": (bubble_h - cnf.triangleWidth * 2) / 2
					});
					triangleBorder.css({
						"border-color": "transparent " + cnf.borderColor + " transparent transparent ",
						"left": -(cnf.triangleWidth * 2)
					});
					triangleMask.css({
						"border-color": "transparent  " + cnf.backgroundColor + " transparent transparent",
						"left": -(cnf.triangleWidth * 2 - cnf.borderWidth)
					});
					break;
				case "bottom":
					parent.css({
						"left": left + (trigger_w - bubble_w) / 2,
						"top": top + trigger_h + cnf.triangleWidth + 5
					});
					triangle.css({
						"border-style": "dashed dashed solid dashed",
						"left": (bubble_w - cnf.triangleWidth * 2) / 2
					});
					triangleBorder.css({
						"border-color": "transparent transparent " + cnf.borderColor + " transparent",
						"top": -(cnf.triangleWidth * 2)
					});
					triangleMask.css({
						"border-color": "transparent transparent " + cnf.backgroundColor + " transparent",
						"top": -(cnf.triangleWidth * 2 - cnf.borderWidth)
					});
					break;
				case "left":
					parent.css({
						"left": left - bubble_w - cnf.triangleWidth - 5,
						"top": top + (trigger_h - bubble_h) / 2
					});
					triangle.css({
						"border-style": "dashed dashed dashed  solid",
						"top": (bubble_h - cnf.triangleWidth * 2) / 2
					});
					triangleBorder.css({
						"border-color": "transparent transparent transparent " + cnf.borderColor,
						"right": -(cnf.triangleWidth * 2)
					});
					triangleMask.css({
						"border-color": "transparent transparent transparent" + cnf.backgroundColor,
						"right": -(cnf.triangleWidth * 2 - cnf.borderWidth)
					});
					break;
			}
		}
	};
	return Bubble;
});