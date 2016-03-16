/*
 * 滚动加载组件v1.0.0
 */
Ymt.add(function(require, exports, module) {
	var fall = {},
		timer = null,
		apicdn = require('module/config/apiCDN');
	

	function waterfall(opt) {
		fall = $.extend({
			selector: "", //jq选择器，
			colSelector:"",//列选择器
			url: "", //用户请求资源的url
			type: "get", //请求类型。
			increment: "", //params需要递增的属性
			cols:4,//列数
			params: {}, //请求需要的参数，如果当中有需要递增的页标属性，递增的参数increment里应把此属性名加上。
			offset:0//偏移量
		}, opt || {});

		$(window).bind("scroll", scrollEvent);

		//默认加载
		reqSrc();
	};

	function scrollEvent() {
		if (timer) clearTimeout(timer);
		timer = setTimeout(function() {
			scroll.call();
		}, 1000);
	}

	function scroll() {
		var $window = $(window),
			scrollTop = $window.scrollTop(),
			clientHeight = $window.height(),
			nodeHeight, i=0,len, nodes = $(fall.selector) || [];


		for (len = nodes.length ; i < len; i++) {
			nodeHeight = parseInt($(nodes[i]).css("height"),10);
			if (nodeHeight + $(nodes[i]).offset().top - fall.offset <= scrollTop + clientHeight) {
				//需要加载
				$window.unbind("scroll", scrollEvent);
				reqSrc();
				return;
			} else {
				continue;
			}
		}
	}

	/*
	* 获得当前插入的列号
	*
	*/
	function getCurInsertCol(){
		var i=0,
			cols = $(fall.selector).find(fall.colSelector) || [],
			len = cols.length,
			_height,
			minInx = 0,
			minHeight = 0;
		for(;i<len;i++){
			_height = cols.eq(i).height();
			//如果最小高度为零则直接赋值
			if(!minHeight){
				minHeight = _height;
			}else{
				//如果最小高度大于当前高度，则将当前对象赋值为最小
				if(minHeight > _height){
					minHeight = _height;
					minInx = fall.cols == i ? fall.cols -1 : i % fall.cols;
				}
			}
		}
		return minInx;
	}
	/*
	* 插入内容
	* @param {string} 需要插入的内容
	*/
	function insert(html){
		var $cols = $(fall.selector).find(fall.colSelector) ,
			inx = getCurInsertCol();
		$cols.eq(inx).append(html);
	}

	function reqSrc() {
		var opt = fall,
			i,
			url = /\?/.test(opt.url) ? opt.url : opt.url + "?";

		$(fall.selector).eq(0).append("<div class='__isloading__'></div>");

		for (i in opt.params) {
			url += i + "=" + opt.params[i] + "&"
		}

		//if (opt.type == "jsonp") url += "callback=?";

		if(!/^http:\/\//.test(url)){
			url = apicdn + url;
		}
		$.ajax({
			url:url,
			type:opt.type,
			success:function(res) {
				var pIndex;
				opt.params[fall.increment] ++;
				//把页标通过回调暴露出去，并通过回调获取新的页标，这样用户可以在发送请求时自定义页标了
				opt.callback && opt.callback(JSON.parse(res),insert)

				$(".__isloading__").remove();
				$(window).bind("scroll", scrollEvent);
			}
		})

	}
	return waterfall;
});