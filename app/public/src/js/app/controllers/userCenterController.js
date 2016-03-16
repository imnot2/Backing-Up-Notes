/* global ymtapp: true*/
/* jshint strict: false,latedef:nofunc */
/*
	User Center Controller
	by xiaokang
	date 14/9/10
*/
ymtapp.controller('UserCenterController', ['$scope', 'httpHandlService', '$window', 'ls', 'YmtApi',
	function ($scope, $http, $window, ls, YmtApi) {

		/*var cache = function (url, callback) {
			try {
				var val = ls.get(url);
				if (val) {
					callback(JSON.parse(val));
				}
			}
			catch (e) {
				console.log(e, 'json解析错误');
			}

			$http.get(url).success(function (data) {
				ls.set(url, data);
				callback(data);
			});
		};

		cache('/api/getUserInfo', function (resultUser) {
			if (typeof result !== 'string') {
				$scope.UserInfo = resultUser.ProfileInfo;
			}
			else {
				$window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
			}

		});*/

		$http.get('/api/getUserInfo').success(function (data, code) {
			if (code == 200) {
				$scope.UserInfo = data.ProfileInfo;
			}
			else {
				$window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
			}
		});

		$scope.toCoupon = function(){
			YmtApi.open({
				url:'/forYmatouApp/personal/coupon/list',
				isNew:true,
				title:'我的优惠券'
			});
		}
		$scope.toAddress = function () {
			YmtApi.open({
				url: '/forYmatouApp/personal/address',
				isNew: true,
				title: '管理收货地址'
			});
		};
		$scope.toChatList = function () {
			$http.get('/forYmatouApp/personal/isLogin').success(function () {
				YmtApi.open({
					url: '/forYmatouApp/chatList'
				});
			});
		};

		$scope.toHelp = function () {
			YmtApi.open({
				url: '/forYmatouApp/help',
				isNew: true,
				title: '帮助中心'
			});
		};
		$scope.toFeedback = function () {
			YmtApi.open({
				url: '/forYmatouApp/feedback',
				isNew: true,
				title: '意见反馈'
			});
		};
		$scope.toOrders = function (col) {
			YmtApi.open({
				url: '/forYmatouApp/personal/orderInfo?col=' + col,
				isNew: true,
				title: '我的订单'
			});
		};
	}
]);