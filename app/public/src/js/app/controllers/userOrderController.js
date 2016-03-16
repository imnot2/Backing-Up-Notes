/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/*
	用户订单
*/
ymtapp.controller('UserOrderController', [
	'$scope',
	'httpHandlService',
	'$window',
	'UserOrderList',
	'utils',
	'$timeout',
	'shareUrl',
	'ls',
	'ProductService',
	'YmtApi',
	'userAgent',
	function ($scope,
		$http,
		$window,
		UserOrderList,
		utils,
		$timeout,
		shareUrl,
		ls,
		ProductService,
		YmtApi,
		userAgent) {

		var urlObj = $scope.orderUrl = utils.common.parseUrl($window.location.search);

		var tid = urlObj['col'];

		$scope.columeType = tid;
		$scope.ordersList = new UserOrderList(tid);

		//兼容Android首次不能将第一个tab数据加载 
		$timeout(function () {
			!$scope.ordersList.busy && $scope.ordersList.page === 1 && $scope.ordersList.nextPage();
		}, 100);

		//替换图片
		$scope.getPicUrl = function (url) {
			return utils.imgHandl.replaceToListPic(url);
		};
		//是否Android
		$scope.isAndroid = userAgent.isAndroid;

		$scope.selectTab = function (id) {
			if ($scope.columeType == id) {
				return;
			}
			$scope.columeType = id;
			YmtApi.open({
				url:'/forYmatouApp/personal/orderInfo?col=' + id,
				title:'我的订单'
			});
		};
		var getTradingId = function (orderId, cb) {
				$http.get('/api/getTrading?orderId=' + orderId).success(function (resultTid, code) {
					if (code == '200' && cb) {
						cb(resultTid.TradingId);
					}
				});
			};
			//上传身份证
		$scope.toUploadCardId = function (tid) {
			var url = location.origin + '/forymatouapp/uploadIdCard/' + tid + '/list';
			
			if (userAgent.isAndroid) {
				url = location.origin + '/forYmatouApp/loadUrlForlocalBrowser?url=' + url;
			}
			YmtApi.open({
				url:url,
				isNew:true,
				title:'上传身份证'
			});
		};
		//购买付款
		$scope.toPay = function (orderTid, IsXloboBonded) {
			getTradingId(orderTid, function (tid) {
				//判断是否为杭保订单
				if (IsXloboBonded) {
					ls.set('trandingIds', tid);
					YmtApi.open({
						url:'/forYmatouApp/orders/paylist',
						isNew:true,
						title:'支付订单'
					});
				}
				else {
					ls.set('trandingIds', '');
					YmtApi.openPay(tid);
				}
				
			});
		};
		//购买付款
		$scope.toExpress = function (orderTid) {
			if (orderTid !== null) {
				YmtApi.open({
					url:'/forYmatouApp/personal/orderInfo/express?tid=' + orderTid,
					isNew:true,
					title:'物流信息'
				});
			}
			else {
				prompt('无效订单号');
			}
		};
		var OrderId;
		$scope.receive = function (id) {
			OrderId = id;
			$scope.confirmReceiving = true;
		};
		$scope.confirmReceive = function () {
			$http.get('/forYmatouApp/orders/receive?OrderId=' + OrderId).success(function (result) {
				prompt(result || '确认收货成功！', function () {
					$scope.confirmReceiving = false;
					$window.location.reload();
				});
			})
		};
		$scope.toChat = function (toid, toLoginId, toLogoUrl) {
			$http.get('/forYmatouApp/personal/isLogin').success(function (result,code) {
				if(code == 200){
					YmtApi.openChatDetail({
						SessionId:result.UserId + '_' + toid,
						ToId:toid,
						ToLoginId:toLoginId,
						ToLogoUrl:toLogoUrl
					});
				}				
			});
		}

		$scope.toProduct = function (pid, shareTitle, sharePic, price, type) {
			if (type == '4' || type == '5' || type == '0' || type == '6') {
				prompt('暂时不支持此类订单查看');
				return;
			}
			ProductService.toProduct(pid, shareTitle, sharePic, price, type)
		};
		//延长收货
		$scope.delayDelivery = function (orderId) {
			$http.get('/forYmatouApp/orders/' + orderId + '/delayDelivery').success(function (result, code) {
				if (code == 200) {
					prompt('成功延长收货时间');
				}
			})
		};
		//订单来源图片替换
		$scope.orderSource = function (type) {
			var typeObject = {
				'0': 'official', //官网
				'1': 'official',
				'2': 'official',
				'3': 'app', //app
				'4': 'artifact', //神器
				'5': 'artifact',
				'6': 'artifact'
			};
			return 'order-from-' + (typeObject[type] || '');
		};
		$scope.ProductService = ProductService;
	}
]);