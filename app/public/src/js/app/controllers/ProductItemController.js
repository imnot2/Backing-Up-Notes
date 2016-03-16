/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/* 
	Proudct Item Controller 
*/
ymtapp.controller('ProductItemController', [
	'$scope',
	'$filter',
	'httpHandlService',
	'$window',
	'$sce',
	'utils',
	'BIS',
	'YmtApi',
	function ($scope, $filter, $http, $window, $sce, utils, BIS,YmtApi) {
		//过滤商品详情页
		var DETAILS_REGEXP = /(max-|mix-)*width\s*[=:]\s*['"]?[^'";><]*['";]?|href=[\"\'](http:\/\/|\.\/|\/)?\w+(\.\w+)*(\/\w+(\.\w+)?)*(\/|\?\w*=\w*(&\w*=\w*)*)?[\"\']?/ig;
		var search = utils.common.parseUrl($window.location.search);
		var userId = search['UserId'];
		$scope.focusOpts = {
			slidesPerView: 'auto',
			centeredSlides: true,
			pagination: '.slide-triggers',
			paginationClickable: true,
			//initialSlide:3,
			//tdFlow:{rotate:30,stretch:10,depth:150}
		};

		//显示参数
		$scope.showParam = true;

		$scope.toggleParam = function () {
			//$scope.showParam = !$scope.showParam;
		};

		/*
		 * 获得卖家信息
		 *
		 */
		var getBuyerInfo = function () {
			if (!($scope.product && $scope.product.SellerId)) {
				prompt('获取卖家信息失败');
				return;
			}
			$http.get('/api/buyerInfo/' + $scope.product.SellerId).success(function (data) {
				$scope.buyerInfo = data;
				//用户等级
				$scope.PraiseCount = new Array(parseInt(data.PraiseCount, 10));

				$scope.PraiseCountHalf = new Array(parseInt(data.PraiseCount) == parseFloat(data.PraiseCount) ? 0 : 1);
			});
		};

		$scope.product = [];
		$scope.isLoad = false;

		//if ($window.location.hash) {
		var hash = $window.location.hash,
			isDetail = /\/forymatouapp\/product\/\S*?\/info/gi.test($window.location.href),
			productId = '',
			startInx = 1,
			length;
		//判断是否是详情页
		/*if(isDetail){
			startInx = 9
		}*/
		productId = search['pid'];
		if (!productId) {
			//解决客户url添加多余信息
			if (/\&/.test(hash)) {
				length = hash.indexOf('&');
			}
			if (hash[1] === '/') {
				startInx++;
			}
			productId = hash.substring(startInx, length);
			productId = productId.replace(/\?.*/, '');
		}

		//如果search 和hash中都不存在直接返回
		if(productId){
			$http.get('/forYmatouApp/product/' + productId + '/detail').success(function (data) {
				//商品浏览统计
				BIS.send({
					userId: userId || 0,
					action: '10001',
					productId: productId
				});
				var product = $scope.product = data;
				$scope.product.ProductId = productId;
				//获得卖家信息
				getBuyerInfo();

				init();

				$scope.isLoad = true;

				//当页面有价格区间则显示区间
				if ($scope.product.SellingPrice < $scope.product.MaxSellingPrice) {
					$scope.product.SellingPrice = $scope.product.SellingPrice + '~' + $scope.product.MaxSellingPrice;
				}
				//只有整点抢才去获取是否有商品提示	
				if ($scope.product.ActivityEnum == 1) {
					//获得商品提醒信息
					$http.get('/forYmatouApp/product/' + productId + '/remindStatus').success(function (data) {
						$scope.HasRemind = data.HasRemind;
					});
				};


				$scope.product.DistributionDesc = (function () {
					var desc = '',
						distribution = {
							'1': '国内',
							'2': '海外直邮',
							'3': '护航直邮',
							'4': '保税发货',
							'5': '保税发货'
						};

					return distribution[product.Distribution] || '';
				})();

				$scope.product.TariffTypeDesc = (function () {
					var desc = '';
					switch (product.TariffType) {
					case 0:
						desc = '卖家';
						break;
					case 1:
						desc = '买家';
						break;
					}
					return desc + '承担关税';
				})();
			});

			//获得详情
			if (isDetail) {
				$http.get('/forYmatouApp/product/' + productId + '/description').success(function (data) {
					$scope.productDec = $sce.trustAsHtml(data.Content.replace(DETAILS_REGEXP, ''));
				});
			}
		}
		

		//获取购物车记录
		$http.get('/forYmatouApp/shoppingCart/quantity').success(function (data) {
			var quantity = (data.Quantity || 0) + '';
			//为了显示将不足两位的自动补空格，超过3位的显示99
			switch (quantity.length) {
				case 0:
					quantity = 0;
					break;
				case 1:
					quantity = '&nbsp;' + quantity;
					break;
				case 3:
					quantity = 99;
					break;
			}
			$scope.quantity = $sce.trustAsHtml(quantity);
		});

		function catInit(catObj) {
			var catShowOjbColor = [],
				catShowOjbSize = [],
				spec = {};
			var isExist = {}; //用来检测存在性的
			for (i in catObj) {
				if (catObj[i].CatalogPropertys.length) {
					var c = getCatalogPropertys(catObj[i], 0),
						s = getCatalogPropertys(catObj[i], 1);
					catShowOjbColor.indexOf(c) === -1 ? catShowOjbColor.push(c) : '';
					(s && catShowOjbSize.indexOf(s) === -1) ? catShowOjbSize.push(s): '';
					//获得规格列表
					for (var j = 0, prop = catObj[i].CatalogPropertys; j < prop.length; j++) {
						var propTmp = spec[prop[j].CatalogName] = spec[prop[j].CatalogName] || [],
							isExistTmp = isExist[prop[j].CatalogName] = isExist[prop[j].CatalogName] || {},
							children = isExistTmp[prop[j].CatalogValue] = isExistTmp[prop[j].CatalogValue] || {};
						if (!children[prop[j].CatalogValue]) {
							propTmp.push({
								name: prop[j].CatalogValue,
								url: prop[j].PicUrl
							});
							children[prop[j].CatalogValue] = true;
						}

					}
				}
			}
			$scope.productType = {
				color: catShowOjbColor,
				size: catShowOjbSize
			}

			var attr = [];
			for (var i in spec) {
				attr.push({
					name: i,
					val: spec[i]
				});
			}
			//最多两种规格
			$scope.spec = attr.slice(0, 2);
		}

		/*
		 * 提醒设置
		 * @param {EventObjcet}
		 * @param {String} 商品编号
		 * @param {Number} 时间
		 */
		$scope.setRemind = function (pid, time) {

			var action = $scope.HasRemind ? 'cancel' : 'add',
				sucMsg = $scope.HasRemind ? '已取消提醒' : '已成功设置提醒';

			$http.get('/api/setProductRemind?ProductId=' + $scope.product.ProductId 
				+ '&StartTime=' + $scope.product.ActivityStartTime + '&action=' + action).success(function (resultSet) {
				if (typeof resultSet !== 'string') {
					prompt(sucMsg);
					$scope.HasRemind = !$scope.HasRemind;
				}
				else {
					prompt(resultSet);
				}
			});
		}

		/*
		 * 获得规格值
		 * @param {object} 当前规格状态
		 * @param {number}
		 */
		function getCatalogPropertys(currCatObj, val, prop) {
			return currCatObj.CatalogPropertys[val] && currCatObj.CatalogPropertys[val][prop || 'CatalogValue'];
		}
		var firstIndex;
		/*
		 * 选择规格
		 * @param
		 */
		$scope.selSpec = function (obj, val, index) {

				var product = $scope.product,
					catObj = $scope.product.Catalogs,
					catShowObjVal = [];
				obj.selected = val;
				var isExist = {}; //用来检测存在性的

				//当有多规格 则两个规格都要选择，如果是单规格则相关规格必须选中
				for (var i = 0, len = catObj.length; i < len; i++) {
					//判断是否是单规格
					if ($scope.spec.length === 1) {
						if (val == catObj[i].CatalogPropertys[0].CatalogValue) {
							$scope.selectCid = catObj[i];
							$scope.product.SellingPrice = product.IsActivityOn ? catObj[i].Price : catObj[i].OriginalPrice;
							$scope.product.Stock = catObj[i].Stock;
							break;
						}

					}
					else if ($scope.spec.length > 1) {
						//如果是多规格，则都被选中才去计算价格
						if ($scope.spec[0].selected && $scope.spec[1].selected && (firstIndex !== obj.index)) {
							if (catObj[i].CatalogPropertys[0].CatalogValue == $scope.spec[0].selected &&
								catObj[i].CatalogPropertys[1].CatalogValue == $scope.spec[1].selected) {
								$scope.selectCid = catObj[i];
								$scope.product.SellingPrice = product.IsActivityOn ? catObj[i].Price : catObj[i].OriginalPrice;
								$scope.product.Stock = catObj[i].Stock;
							}
						}
						else {
							$scope.spec[obj.index == 0 ? 1 : 0].selected = '';
							var Obj = catObj[i].CatalogPropertys[(obj.index == 0 ? 1 : 0)];
							var s = getCatalogPropertys(catObj[i], obj.index);
							var c = getCatalogPropertys(catObj[i], (obj.index == 0 ? 1 : 0));
							if (s == val && !isExist[c]) {
								catShowObjVal.push({
									name: c,
									url: Obj.PicUrl
								});
								isExist[c] = true;
							}
						}
					}
				}
				if ($scope.spec.length > 1 && firstIndex === obj.index) {
					$scope.spec[(obj.index == 0 ? 1 : 0)].val = catShowObjVal;
					$scope.spec[obj.index == 0 ? 1 : 0].selected = '';
					$scope.selectCid = {}
				}
				if (firstIndex === undefined) {
					firstIndex = obj.index;
				}
				$scope.selectDesc = '';

				if ($scope.spec) {
					len = $scope.spec.length;
					for (i = 0; i < len; i++) {
						$scope.spec[i].selected && ($scope.selectDesc += '  ' + $scope.spec[i].name + ': ' + $scope.spec[i].selected);
					};
				}

			}
			//提交颜色规格
		$scope.postTypes = {
			color: {
				val: '',
				index: null
			},
			size: {
				val: '',
				index: null
			}
		};

		var init = function () {
			//规格初始化
			catInit($scope.product.Catalogs);

			var hour = 0,
				minute,
				val;
			var time = $scope.product.ActivityExpiresIn;
			if (time > 0) {
				hour = parseInt(time / 1000 / 60 / 60 % 24, 10);
				hour = hour ? (hour + '小时') : '';
				minute = parseInt(time / 1000 / 60 % 60, 10) + '分钟';
				time = hour + minute + '后';
			}
			$scope.ActivityCountDown = time + ($scope.product.IsActivityOn ? '结束' : '开始');

			$scope.OnShelf = true;
			$scope.hasStock = hasStock();
		};
		//是否售罄
		function hasStock() {
			var catObj = $scope.product.Catalogs;
			for (var i = 0, len = catObj.length; i < len; i++) {
				if (catObj[i].Stock > 0) {
					return true;
				}
			}
			return false;
		}

		//添加购物车
		$scope.addCart = function () {
			$scope.toType = 'cart';
			$scope.showTypeModel = true;
		};

		$scope.postAdd = function (type) {
			if ($scope.productType.color.length || $scope.productType.size.length) {
				if (!($scope.selectCid && $scope.selectCid.CatalogPropertys && $scope.selectCid.CatalogPropertys.length)) {
					prompt('请选择规格')
					return false;
				}
			}

			var p = $scope.product;
			var pType = [];
			if ($scope.spec.length) {
				for (var i = 0, prop = $scope.selectCid.CatalogPropertys; i < prop.length; i++) {
					pType.push({
						Property: prop[i].CatalogName,
						PropertyId: prop[i].CatalogAttributeId,
						PropertyAttribute: prop[i].CatalogValue,
						PropertyAttributeId: prop[i].CatalogPropertyId,
						PropertyAttributePic: prop[i].PicUrl
					});
				}
			}

			var data = {
				sellerId: p.SellerId,
				sellerName: $scope.buyerInfo.SellerName,
				CatalogId: ($scope.selectCid && $scope.selectCid.CatalogId) || p.Catalogs[0].CatalogId,
				ProductNumber: p.ProductNumber || 1, //数量
			}
			if (type == 'cart') {
				$http.post('/api/addshoppingcart', data).success(function (datas) {
					if (typeof datas != 'string') {
						prompt('成功添加购物袋');
						$scope.showTypeModel = false;
						BIS.send({
							userId: userId || 0,
							action: '20001',
							productId: p.ProductId
						});
					}
					else {
						prompt(datas);
					}
				})

			}
			else if (type == 'buy') {
				$http.get('/forYmatouApp/personal/isLogin').success(function (result) {
					$http.post('/api/addshoppingcart', data).success(function (datas, code) {
						if (code == 200) {
							BIS.send({
								userId: userId || 0,
								action: '30001',
								productId: p.ProductId
							});
							YmtApi.open({
								url:'/forYmatouApp/shoppingBag',
								isNew:true,
								title:'购物袋'
							});
						}
					});

				});

			}
		};


		$scope.closeType = function () {
			$scope.showTypeModel = false;
		};

		//立即购买
		$scope.toOrders = function () {
			$scope.toType = 'buy';
			$scope.showTypeModel = true;
		};

		/*
		 * 数量增减的方法
		 * @param {numer}1 ++ 0 --
		 */
		$scope.incOrDec = function (param) {
			var factor = param ? 1 : -1;
			var num = $scope.product.ProductNumber = $scope.product.ProductNumber || 1,
				limit = $scope.product.LimitNum;
			if (param) {
				if (limit && num >= limit) {
					prompt('购买商品不得多余于' + limit + '件');
					return false;
				}
			}
			else {
				if (num < 2) {
					prompt('购买商品不得少于一件');
					return false;
				}
			}

			if (!(param == 2)) {
				$scope.product.ProductNumber = parseInt(num) + factor;
			}

			//$scope.product.SellingPrice = $scope.orgPrice * $scope.product.ProductNumber; 
		}

		//查看商品详情
		$scope.seeDetail = function () {		
			YmtApi.open({
				url: '/forYmatouApp/product/pid/info?pid=' + $scope.product.ProductId ,
				isNew:true,
				title:'商品详情（完整版）'
			});
		};

		//去购物袋
		$scope.toShoppingBag = function () {
			YmtApi.open({
				url: '/forYmatouApp/shoppingBag',
				isNew:true,
				title:'购物袋'
			});
		};

		$scope.toChat = function (toid, toLoginId, toLogoUrl) {
			if ($scope.isLoad) {
				$http.get('/forYmatouApp/personal/isLogin').success(function (result) {
					YmtApi.openChatDetail({
						SessionId:result.UserId + '_' + toid,
						ToId:toid,
						ToLoginId:toLoginId,
						ToLogoUrl:toLogoUrl
					});
				});
			}
		};
		//查看优惠券
		$scope.seeCoupon = function () {
			YmtApi.open({
				url: '/forYmatouApp/personal/coupon/list',
				isNew:true,
				title:'我的优惠券'
			});
		};

			//获得用户的优惠券
		$http.get('/api/coupon/summary').success(function (result) {
			if (result && result.Count > 0) {
				$scope.couponDesc = '您有' + result.Count + '张优惠券，最多可省' +
					result.Total + '元，' + result.EarliestExpired.split(' ')[0] + '过期   查看';
			}
		});
	}
]);