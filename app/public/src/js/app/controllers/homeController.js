/* global ymtapp: true*/
/* jshint strict: false,latedef:nofunc */
/*
	整点数据脚本
*/
ymtapp.controller('HomeController', [
	'$scope',
	'$window',
	'utils',
	'GroupProduct',
	'httpHandlService',
	'ls',
	'searchService',
	'ProductService',
	'YmtApi',
	'isAlpha',
	function ($scope, $window, utils, GroupProduct, $http, ls, searchService,ProductService,YmtApi,isAlpha) {
		//banner 配置
		$scope.bannerOpts = {
			pagination: '.pagination',
			paginationClickable: true,
			autoplay: 5000,
			loop: true,
		};

		var cache = function (url, callback) {
			try {
				var val = ls.get(url);
				if (val) {
					callback(JSON.parse(val));
				}
			}
			catch (e) {
				console.log(e, 'json解析错误');
			}
			$http.get(url).success(function (data, code) {
				if (code == 200) {
					ls.set(url, data);
					callback(data);
				}
			});
		};
		//获取banner
		cache('/api/getBanner?bid=0', function (data) {
			$scope.banner = data.Banners;
		});

		//特卖专场
		cache('/api/getBanner?bid=3', function (data) {
			$scope.saleSpecials = data.Banners;
		});

		//大家逛
		cache('/api/getBanner?bid=4', function (data) {
			var banners = data.Banners;
			$scope.allShoppingSpan3 = banners.slice(0, 3);
			$scope.allShoppingSpan2 = banners.slice(3, 5);
		});
		//新频道
		cache('/api/getBanner?bid=5', function (data) {
			$scope.channels = data.Banners;
		});
		
		var currPageNo = 1;

		$scope.recommendProducts = {
			item:[],
			isBuy:false,
			isEnd:false
		};
		$scope.loadRecommend = function(){
			if(currPageNo > 5){
				$scope.recommendProducts.isEnd = true;
				return;
			}
			if(!$scope.recommendProducts.isEnd && !$scope.recommendProducts.isBuy){
				$scope.recommendProducts.isBuy = true;
				$http.jsonp('http://t'+(isAlpha?'.alpha':'')+'.ymatou.com/Rec?bsize=8&bcount='+currPageNo+'&callback=JSON_CALLBACK').success(function(result){
					if(result && result.Blocks && result.Blocks[currPageNo-1]){
						Array.prototype.push.apply($scope.recommendProducts.item, result.Blocks[currPageNo-1].Products);
					}else{
						$scope.recommendProducts.isEnd = true;
					}
					currPageNo ++ ;
					$scope.recommendProducts.isBuy = false;
				});				
			}			
		}
		$scope.loadRecommend();

		$scope.escape = function (html) {
			return utils.common.sanitize(html);
		};

		$scope.open = function(url,title){
			url = decodeURIComponent(url);
			YmtApi.open({
				url:url,
				isNew:true,
				title:title||''
			});
		}

		$scope.GroupProductLists = GroupProduct;

		$scope.GroupProductLists.nextPage('page');

		$scope.toProduct = ProductService.toProduct;

		$scope.search = searchService;

	}
]);