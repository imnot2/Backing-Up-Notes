;(function(){
	var utils = {

		/**
		 * 增加用户认证
		 * @param {string}  url     需要增加的的地址
		 * @param {Boolean} isForce 是否为强制认证，默认值：false；当为true
		 *                          	则会判断是否能得到用户认证，不能则触发登录。 
		 */
		addAuth : function(url,isForce){

			var SEARCH_REG = /\?([^#]*)/,
				HASH_REG = /#(.*)/;
			var currSearch = utils.parseUrl(window.location.search),
				search = {},
				searchMatch = url.match(SEARCH_REG);

			if(searchMatch){
				search =  utils.parseUrl(searchMatch[0])
			}

			if(isForce){
				if(!currSearch.UserId || !currSearch.AccessToken){
					//@TODO utils 这里不能调用YmtApi 存在循环依赖
					if(window.YmtApi){
						window.YmtApi.toLogin();
					}
					else{
						window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
					}
					return;
				}
			}
			if(currSearch){
				currSearch.UserId && (search.UserId = currSearch.UserId);
				currSearch.AccessToken && (search.AccessToken = currSearch.AccessToken);
				var searchStr = '',
					searchAttr = [];
				for(var i in search){
					searchAttr.push(i+'='+search[i]);
				}
				if(searchAttr[0]){
					searchStr = '?'+searchAttr.join('&');
				}

				//是否存在search
				if(SEARCH_REG.test(url)){
					url = url.replace(SEARCH_REG,searchStr);
				}else{
					//是否存在hash
					if(HASH_REG.test(url)){
						url = url.replace(HASH_REG,searchStr+'#'+HASH_REG);
					}else{
						url += searchStr;
					}
				}
			}
			return url;
		},
		parseUrl : function (str) {
			var arr,
				part,
				url = {};
			if (!(str || '').replace(/^\s+|\s+$/, '')) {
				return {};
			}
			if(str = str.substring(1, str.length)){
				arr = str.split('&');
				for (var i in arr) {
					part = arr[i].split('=');
					url[part[0]] = part[1];
				}
			}
			return url		
		}
	}

	window.YmtApiUtils = utils;

	var param = function(paramObj){

		var str = [];
		for(var i in paramObj){
			//@TODO 这里是客户端BUG 不能将url转义，因为客户端取值不会转回来导致会乱码
			str.push(i + '=' +paramObj[i]);	
		}
		return str.join('&');
	}
	
	window.YmtApi =  {
		isSaohuoApp:true,
		/**
		 * 打开窗口
		 * @type function
		 * @param  {object} options
		 *       url:打开的地址
		 *       isNew:是否新窗口打开
		 *       title:窗口标题
		 *       backType：[0|1] 默认：0 则采用goback网页内部
		 *       			一级级返回到顶部触发关闭,1为直接关闭返回
		 */
		open: function (options) {
			var SEARCH_EXP = /\?[^#]*/ig,
				HASH_EXP = /#.*/ig;
			if (!options.url) {
				throw new Error('open: url Can not be empty!!');
			}
			options.isNew = options.isNew || 0;
			//获得原有url中search参数
			var searchs = options.url.match(SEARCH_EXP),
						  _param = {},
						  hash = options.url.match(HASH_EXP);
			if(searchs){
				//去掉search部分方便后面参数变更重组
				options.url = options.url.replace(SEARCH_EXP,'');
				_param = utils.parseUrl(searchs[0]);
			}

			if(hash){
				options.url = options.url.replace(HASH_EXP,'');
			}

			hash = hash || [''];
			if(options.isNew){
				_param.forBuyerApp_needJumpFlag = +options.isNew;
			}
			if(options.title){
				_param.title = options.title;
			}
			if (options.backType) {
				_param.backType = options.backType;
			}

			window.location.href = utils.addAuth(options.url + '?'+ param(_param) + hash[0]);
		},
		/**
		 * 打开分享面板
		 * @type function
		 * @param {object} options
		 *        sharePicUrl   分享图片地址
		 *        shareTip 		分享内容
		 *        shareTitle    分享标题
		 *        shareUrl      分享的链接
		 *
		 */
		openShare: function (options) {
		},
		/**
		 * 打开聊天列表
		 * @param  {object} options
		 *
		 */
		openChatList: function (options) {
		},
		/**
		 * 打开聊天详情
		 * @param  {object} options
		 *         	   SessionId
		 *		       ToId
		 *             ToLoginId
		 *			   ToLogoUrl
		 *
		 */
		openChatDetail: function (options) {
		},
		/**
		 * 预览图片接口
		 * @param  {object} options
		 *         urls 	{array}  图片地址
		 *         current	{number} 当前图片的索引值，对应urls中的数组坐标
		 *
		 */
		previewImage: function (options) {
		},
		//打开支付面板
		openPay:function(tid){
			var token = utils.parseUrl(window.location.search);
			window.location.href= 'http://mobile.alpha.ymatou.com/checkout?loginaccesstoken='+token.AccessToken+'&tid='
			+tid+'&returnurl='+encodeURIComponent(window.location.origin+'/forYmatouApp/orders/successful');
		},
		/**
		 * 去登录
		 * 
		 */
		toLogin:function(){
			window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
		}
	}
})();