/**
 * YmtApi
 * @description 提前将所有与客户端操作封装到这个factory中，
 *              为后续客户端支持jsbridge做铺垫。
 *              并为兼容多个端做处理，不同端覆盖原有的ymtapi接口
 */
ymtBridge.factory('YmtApi', ['$window','utils',
	function ($window,utils) {
	//判断是否存在YmtApi，存在则直接返回；
	if($window.YmtApi){
		return $window.YmtApi;
	}
	var parseUrl = function (str) {
		var arr,
			part,
			url = {};
		if (!(str || '').replace(/^\s+|\s+$/, '')) {
			return {};
		}
		if(str[0] === '?'){
			str = str.substring(1, str.length)
		}
		if(str){
			arr = str.split('&');
			for (var i in arr) {
				part = arr[i].split('=');
				//@TODO 这里是客户端BUG 不能将url转义，因为客户端取值不会转回来导致会乱码
				url[part.shift()] = part.shift();
			}
		}
		return url		
	};

	var param = function(paramObj){
		var str = [];
		for(var i in paramObj){
			//@TODO 这里是客户端BUG 不能将url转义，因为客户端取值不会转回来导致会乱码
			str.push(i + '=' +paramObj[i]);	
		}
		return str.join('&');
	}
	return {
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
			var SEARCH_EXP = /\?([^#]*)/ig,
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
				_param = parseUrl(searchs[0]);
				options.url = options.url.replace(SEARCH_EXP,'');
			}

			if(hash){
				options.url = options.url.replace(HASH_EXP,'');
			}

			hash = hash || [''];
			if(options.isNew){
				_param.needJumpFlag = +options.isNew;
			}
			if(options.title){
				_param.title = options.title;
			}
			if (options.backType) {
				_param.backType = options.backType;
			}

			$window.location.href = utils.addAuth(options.url + '?'+ param(_param) + hash[0]);
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
			var shareUrl = ['/forYmatouApp/share?title=分享',
				'&shareTitle=' + options.shareTitle,
				'&sharePicUrl=' + options.sharePicUrl,
				'&shareTip=' + options.shareTip,
				'&shareUrl=' + options.Url + '&shareFlag=1'
			];

			$window.location.href = shareUrl.join('');
		},
		/**
		 * 打开聊天列表
		 * @param  {object} options
		 *
		 */
		openChatList: function (options) {
			$window.location.href = '/forYmatouApp/chatList';
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
			var url = [
				'/forYmatouApp/chatDetail?param={',
				'"SessionId": '+options.sessionId,
				',"ToId": ' +options.toid ,
				',"ToLoginId": ' + options.toLoginId,
				',"ToLogoUrl": ' + options.toLogoUrl + ' }'
			];
			$window.location.href = '/forYmatouApp/chatDetail?param='+JSON.stringify(options);
		},
		/**
		 * 预览图片接口
		 * @param  {object} options
		 *         urls 	{array}  图片地址
		 *         current	{number} 当前图片的索引值，对应urls中的数组坐标
		 *
		 */
		previewImage: function (options) {
			var param = '{"images":' + JSON.stringify(options.urls) + ',"currentInx":' + options.current + '}';
			$window.location.href = '/forYmatouApp/imagePreview?param='+param;
		},
		//打开支付面板
		openPay:function(tid){
			$window.location.href= '/forYmatouApp/orders/toPay?tid=' + tid ;
		},
		/**
		 * 去登录
		 * 
		 */
		toLogin:function(){
			window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
		}
	}
}]);