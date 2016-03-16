define(function(require, exports, module){

	var noop = function(){};

	function Dialog(opts){
		opts = opts||{};
		
		this.height = opts.height||210;
		this.width = opts.width||380;
		this.showTitle = opts.showTitle===true;
		this.showFooter = opts.showFooter!==false;
		this.css = $.extend(opts.css||{},{
			height : this.height,
			width : this.width
		});
		this.btns = opts.btns||[];
		this.init();
	}

	/**
	 *@name 初始化dialog
	 *@return this;
	 **/
	Dialog.prototype.init = function(){
		this.create();
		this.setSize(this.width, this.height);
		if (this.showTitle){
			this.title.find('.ymt-c2c-close').bind('click',  $.proxy(this.close, this));
		}
		return this;
	}

	/**
	 *@name 创建dialog结构
	 *@return this;
	 **/
	Dialog.prototype.create = function(){
		this.contianer = $('<div class="ymt-c2c-dialog"></div>');
		this.cbody = $('<div class="ymt-c2c-dialog-body"></div>');
		this.ccontent = $('<div class="ymt-c2c-dialog-content"></div>');
		this.footer = $('<div class="ymt-c2c-dialog-footer"></div>');
		this.title = $('<div class="ymt-c2c-title"><span class="icon ymt-c2c-close">&#xe62e;</span></div>');
		this.titleTxtCon = $('<div class="ymt-c2c-title-txt"></div>');
		
		// 默认按钮
		var btn = $('<div class="ymt-c2c-dialog-btn">确定</div>');
		this.btns.push({
			btn : btn,
			fn : this.close
		});
		// 是否显示标题
		if (this.showTitle){
			this.contianer.append(this.title);
			this.title.append(this.titleTxtCon);
		}
		this.contianer.append(this.cbody).css(this.css);
		this.cbody.append(this.ccontent);
		
		$('body').append(this.contianer);


		// 是否显示按钮栏
		if(this.showFooter){
			this.contianer.append(this.footer);
			// 构建按钮
			for (var i=0; i<this.btns.length; i++){
				this.footer.append(this.btns[i].btn);
				this.btns[i].btn.bind(this.btns[i].evType||'click', $.proxy(this.btns[i].fn||noop, this));
			}
		}
		
		// 创建半透明模态蒙板
		if ($('#c2c-mask').length<=0){
			this.mask = $('<div id="c2c-mask"></div>');
			$('body').append(this.mask);
		}else{
			this.mask = $('#c2c-mask');
		}
		return this;
	}

	/**
	 *@name 隐藏dialog
	 *@return this;
	 **/
	Dialog.prototype.close = function(e){
		e.stopPropagation();
		this.contianer.css({
			display : 'none'
		});
		this.mask.css({
			display : 'none'
		}).unbind('click');
		return this;
	}

	/**
	 *@name 显示定位dialog
	 *@para text {String} 显示的内容
	 *@return this;
	 **/
	Dialog.prototype.show = function(text){
		var wsize = {
			height : $(window).height(),
			width : $(window).width()
		}
		if (!!text){
			this.setContent(text);
		}
		this.contianer.css({
			display : 'block',
			top : (wsize.height - this.height) * 0.5,
			left : (wsize.width - this.width) * 0.5
		});

		this.mask.css({
			display : 'block'
		});

		this.mask.bind('click', $.proxy(this.close, this));
		return this;
	}

	/**
	 *@name 设置显示内容
	 *@para text {String}显示的内容
	 *@return this;
	 **/
	Dialog.prototype.setContent = function(text){
		this.text = text;
		this.ccontent.html(text);
		return this;
	}

	/**
	 *@name 设置大小
	 *@para width {Number} 对话框宽
	 *@para height {Number} 对话框高
	 *@return this;
	 **/
	Dialog.prototype.setSize = function(width, height){
		this.width = width;
		this.height = height;
		var height = 0;
		if (this.showTitle){
			height+=70;
		}
		if (this.showFooter){
			height+=70;
		}

		height = this.height - height;

		this.cbody.css({
			height : height,
			lineHeight : height + 'px'
		});
		this.ccontent.css({
			height : height-40,
			width : this.width-40
		});
		return this;
	}

	/**
	 *@name 设置大小
	 *@para txt {String} 对话框宽
	 *@return this;
	 **/
	Dialog.prototype.setTitleTxt = function(txt){
		this.titleTxt = txt||'';
		this.titleTxtCon.html(this.titleTxt);
		return this;
	}

	module.exports = Dialog;
});