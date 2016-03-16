/* global core: true,angular:true*/
/* jshint strict: false,latedef:nofunc */
//工具方法
core.factory('utils', ['$http', '$window', 'shareUrl',
	function ($http, $window, shareUrl) {
		var imgHandl = {
			/**
			 * 替换图片地址
			 * @param {String} 替换的url
			 * @param {Array Or String} 替换的内容
			 * @param {String}
			 */
			getPicUrl: function (url, repList, repTarget) {
				if (url !== void 0 && url !== '') {
					if (typeof repList === 'string') {
						url = url.replace(repList, repTarget);
					}
					else if (angular.isArray(repList)) {
						for (var i = 0; i < repList.length; i++) {
							url = url.replace(repList[i], repTarget);
						}
					}
					return url;
				}
			},
			replaceToListPic: function (url) {
				url = this.getPicUrl(url, ['big', 'original', 'middle'], 'list');
				return this.getPicUrl(url, ['_b', '_o', '_m'], '_l');
			},
			replaceToSmallPic: function (url) {
				url = this.getPicUrl(url, ['big', 'original', 'middle'], 'small');
				return this.getPicUrl(url, ['_b', '_o', '_m'], '_s');
			},
			replaceToThumbnailPic: function (url) {
				url = this.getPicUrl(url, ['big', 'original', 'middle'], 'thumbnail');
				return this.getPicUrl(url, ['_b', '_o', '_m'], '_t');
			}
		};
		var common = {
			//html转义
			sanitize: function (html) {
				return escape(html);
			},
			//解析url成对象
			parseUrl : function(str) {
				///\?(:?[^#]+|.+)/
				var SEARCH_EXP = /\?([^#]*)/;
				var arr, 
					part,
					url = {};

				str = (str||'').replace(/^\s+|\s+$/,'');

				var match_result = str.match(SEARCH_EXP);

				if(!(str && match_result && match_result[1])){
					return {};
				}
				arr = match_result[1].split('&');
				for (var i in arr) {
					part = arr[i].split('=');
					url[part[0]] = part[1];
				}
				return url;
			},
			//获得服务器时间
			getServerTime: function (fn) {
				$http.get('/api/getServerTime').success(function (result) {
					fn && fn.call(this, parseInt(result.times));
				});
			}
		};

		/**
		 * 增加用户认证
		 * @param {string}  url     需要增加的的地址
		 * @param {Boolean} isForce 是否为强制认证，默认值：false；当为true
		 *                          	则会判断是否能得到用户认证，不能则触发登录。 
		 */
		var addAuth = function(url,isForce){
			var SEARCH_REG = /\?([^#]*)/,
				HASH_REG = /#(.*)/;
			var currSearch = common.parseUrl(window.location.search),
				search = {},
				searchMatch = url.match(SEARCH_REG);

			if(searchMatch){
				search =  common.parseUrl(searchMatch[0])
			}

			if(isForce){
				if(!currSearch.UserId || !currSearch.AccessToken){
					//@TODO utils 这里不能调用YmtApi 存在循环依赖
					if($window.YmtApi){
						$window.YmtApi.toLogin();
					}
					else{
						$window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
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
		}

		return {
			imgHandl: imgHandl,
			common: common,
			addAuth : addAuth
		};
	}
]);