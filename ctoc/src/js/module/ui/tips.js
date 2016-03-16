define(function(require, exports, module){
	/**
	 *@class Tips
	 *@para arrPos {String} 箭头位置 top,left,bottom,right
	 *@para height {Number} 提示框高度
	 *@para width {Number} 提示框高度
	**/
	function Tips(opts){
		opts = opts || {};
		this.width = opts.width||158;
		this.height = opts.height||48;
		this.arrPos = opts.arrPos||'bottom';
		this.init();
	}

	/**
	 *@name 初始化
	**/
	Tips.prototype.init= function(){
		var that = this;
		this.createHtml();
		this.container.css({
			height : this.height,
			width : this.width,
			textAlign : 'left'
		});
	}

	/**
	 *@name 创建html结构
	 *@return this;
	**/
	Tips.prototype.createHtml= function(){
		this.container = $('<div class="c2c-tips-container"></div');
		this.content = $('<div class="c2c-tips-content"></div');
		this.arrow = $('<div class="c2c-tips-arrow"></div');

		$('body').append(this.container);
		this.container.append(this.content).append(this.arrow);
		this.arrow.addClass('c2c-tips-arrow-' + this.arrPos);
		return this;
	}

	/**
	 *@name 显示提示框
	 *@para html {String}显示内容
	 *@para css {Object}提示框样式
	**/
	Tips.prototype.show = function(html,css){
		var that = this;
		this.close();
		css = $.extend(css || {}, {display : 'block'});
		this.container.css(css);
		this.content.html(html);
		clearTimeout(this.timmer);
		this.timmer = setTimeout(function(){
			that.close();
		}, 3000);
		return this;
	}

	/**
	 *@name 显示提示框，相对一个对象
	 *@para html {String}显示内容
	 *@para css {Object}提示框样式
	**/
	Tips.prototype.showWithFollw = function(html,css){
		var that = this, 
		ofs = this.target.offset(),
		scrollT = Math.max(document.body.scrollTop, document.documentElement.scrollTop),
        scrollL = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);

		this.close();
		css = $.extend(css || {}, {
			top: (ofs.top - scrollT - this.height - 8) + 'px',
            left: (ofs.left - scrollL - (this.width - this.target.width()) * 0.5) + 'px',
			display : 'block'
		});
		this.container.css(css);
		this.content.html(html);
		clearTimeout(this.timmer);
		this.timmer = setTimeout(function(){
			that.close();
		}, 3000);
		return this;
	}

	/**
	 *@name 隐藏提示框
	**/
	Tips.prototype.close= function(e){
		!!e && e.stopPropagation();
		clearTimeout(this.timmer);
		this.container.css({
			display : 'none'
		});

		this.content.html('');
		return this;
	}

	/**
	 *@name 设置箭头位置
	 *@para pos {String} 小箭头位置
	**/
	Tips.prototype.setArrowPos= function(pos){
		this.arrPos = pos;
		this.arrow [0].className = 'c2c-tips-arrow c2c-tips-arrow-' + this.arrPos;
		return this;
	}

	/**
	 *@name 设置相对哪个对象提示
	 *@para target {jQuery} 小箭头位置
	**/
	Tips.prototype.setFollow= function(target){
		this.target = target;
		return this;
	}

	module.exports = Tips;
});