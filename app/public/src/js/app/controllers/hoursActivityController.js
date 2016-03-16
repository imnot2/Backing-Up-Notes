/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/*
 * 整点抢
 */
ymtapp.controller('HoursActivityController', ['$scope', 'httpHandlService', '$window', 'utils','ProductService',
	function ($scope, $http, $window, utils,ProductService) {
		//默认显示今日抢购
		$scope.activity = 1;

		utils.common.getServerTime(function (times) {
			$scope.nowTime = parseInt(times);
			$scope.newDate = {
				day: new Date($scope.nowTime).getDay(),
				hours: new Date($scope.nowTime).getHours()
			};
		});
		//整点数据
		$http.get('/api/getHomeProduct').success(function (data) {
			if (typeof data !== 'string') {
				var products = data.Products;

				$scope.todayProducts = products[0] || null; //今日商品
				$scope.tomorrowProducts = products[1] || []; //明日商品

				$scope.soldOut = !$scope.todayProducts || $scope.todayProducts.HourProducts.length === 0;

				$scope.loadComple = true;
				console.log($scope.todayProducts);
			}

		});
		//替换图片
		$scope.getPicUrl = function (url) {
			return utils.imgHandl.replaceToListPic(url);
		};

		/*
		 * 提醒设置
		 * @param {EventObjcet}
		 * @param {String} 商品编号
		 * @param {Number} 时间
		 */
		$scope.setRemind = function (obj, pid, time, status) {

			var action = status ? 'cancel' : 'add',
				sucMsg = status ? '已取消提醒' : '已成功设置提醒';

			$http.get('/api/setProductRemind?ProductId=' + pid + '&StartTime=' + time + '&action=' + action).success(function (resultSet) {
				if (typeof resultSet !== 'string') {
					obj.HasRemind = !status;
					prompt(sucMsg);
				}
				else {
					prompt(resultSet);
				}
			});
		};

		$scope.toProduct = ProductService.toProduct;

		$scope.ifTomorrow = function (time) {
			return (new Date(time.replace(/-/g, '/')).getTime()) > $scope.nowTime;
		};
		//显示时间描述
		$scope.showTimeDesc = function (time) {
			return $scope.ifTomorrow(time) ? '明天' : '即将';
		};
	}
]);