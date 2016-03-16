/* global ymtapp: true,prompt:true,confirmBox:true*/
/* jshint strict: false,latedef:nofunc */
/*
	User Address
*/
ymtapp.controller('AddressController', [
	'$scope',
	'httpHandlService',
	'$window',
	'utils',
	'ls',
	'YmtApi',
	function ($scope, $http, $window, utils, ls, YmtApi) {

		$scope.setDefault = function (address) {
			$scope.saveAddress(address);
		};

		$scope.selectDefault = function (address) {
			address.IsDefault = !address.IsDefault;
		};

		$scope.select = {};

		$scope.selectCity = function (id) {
			for (var i in $scope.cityList['0']) {
				if ($scope.address.ProvinceName == $scope.cityList['0'][i]) {
					$scope.select.CityNameId = '0,' + i;
				};
			}
			$scope.select.DistrictNameId = undefined;
		};

		$scope.areaCity = function (id) {
			for (var i in $scope.cityList[$scope.select.CityNameId]) {
				if ($scope.address.CityName == $scope.cityList[$scope.select.CityNameId][i]) {
					$scope.select.DistrictNameId = $scope.select.CityNameId + ',' + i;
				}
			}
		};

		/*获取单地址*/
		var urlObj = utils.common.parseUrl($window.location.search);

		///@TODO 这个接口新增一个检查用户是否有邮箱的接口
		$http.get('/api/getUserInfo').success(function (resultUser) {
			$scope.hasEmail = !!resultUser.ProfileInfo.Email;
		});

		/**
		 * 获得城市列表
		 */
		var getCityList = function(cb){
			$http.get('/api/getCityList').success(function (resultCityData) {
				$scope.cityList = resultCityData;
				var cityList = {};
				for (var i in resultCityData) {
					var tempAttr = [];
					for (var j in resultCityData[i]) {
						var temp = {};
						temp['id'] = i + ',' + j;
						temp['name'] = resultCityData[i][j];
						tempAttr.push(temp);
					}
					cityList[i] = tempAttr;
				}
				$scope.cityObj = cityList;
				cb && cb();
			});
		}

		var aid = urlObj['aid'];
		if (aid && aid !== '' && aid !== void 0) {
			/*所有城市*/
			$http.get('/api/getAddressOne?AddressId=' + aid).success(function (resultCityData, code) {
				if (code == 200) {
					$scope.address = resultCityData.Address;
					getCityList(function(){
						$scope.selectCity();
						$scope.areaCity();
					});
					
				}
			});
		}else{
			getCityList();
			/*用户收货地址列表*/
			$http.get('/api/getAddressList').success(function (result, code) {
				if (code == 200) {
					var resultAddress = result.AddressList;
					$scope.addressList = resultAddress.slice(0, 5);
				}
			});
		}


		/*保存收货地址*/
		$scope.saveAddress = function (obj) {
			var f = obj || $scope.address,
				title = '添加',
				url = 'addAddress';
			if (aid || (obj && obj.AddressId)) {
				title = '修改';
				f.AddressId = aid || f.AddressId;
				url = 'editAddress';
			}
			if (!f) {
				prompt('请填写收货人信息');
				return false;
			}


			if (!f.Recipient || f.Recipient === '' || !f.Mobile || f.Mobile === '') {
				prompt('收货人或手机不允许为空');
				return false;
			}

			if (!/^([\u4e00-\u9fa5])*$/.test(f.Recipient)) {
				prompt('收货人姓名只能是中文');
				return false;
			}

			if (!/^\d{11}$/.test(f.Mobile)) {
				prompt('手机号码必须是11位的数字');
				return false;
			}

			if (!f.CityName || f.CityName == '' || !f.DistrictName || f.DistrictName == '' || !f.ProvinceName || f.ProvinceName == '' || !f.Details || f.Details == '' || !f.PostCode || f.PostCode == '') {
				prompt('地址与邮编填写不完整');
				return false;
			}
			if (/^((\d)*|([a-z]|[A-Z]))$/.test(f.Details)) {
				prompt('地址不能只是数字和字母');
				return false;
			}
			if (!/^\d*$/.test(f.PostCode)) {
				prompt('邮政编码只能是数字');
				return false;
			}
			if (!$scope.hasEmail && !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(f.Email))) {
				prompt('邮箱地址不正确');
				return false;
			}
			if (obj) {
				f.IsDefault = true;
			}

			$http.post('/api/' + url, f).success(function (resultAddress) {
				//不能去掉等于true的判断 因为错误返回的字符串
				if (resultAddress.Result == true) {
					//设置地址已经被修改
					//ls.set('editAddress', f.PostCode);
					YmtApi.open({
						url: '/forYmatouApp/personal/address?hasEmail=' + $scope.hasEmail,
						title: '管理收货地址'
					});
				}
				else {
					prompt(title + '收货地址错误');
				}
			});
		};

		$scope.delAddress = function () {
			confirmBox('是否删除收货地址？', function () {
				var delObj = {
					AddressId: aid
				};
				$http.post('/api/delAddress', delObj).success(function (resultAddress) {
					if (resultAddress.Result != 'false') {
						YmtApi.open({
							url: '/forYmatouApp/personal/address',
							title: '管理收货地址'
						});
					}
					else {
						prompt('删除管理地址错误');
					}
				});
			});

		};

		$scope.toAddAddress = function () {
			YmtApi.open({
				url: '/forYmatouApp/personal/address/add',
				title: '新增收货地址'
			});
		};

		$scope.toEditAddress = function (aid) {
			YmtApi.open({
				url: '/forYmatouApp/personal/address/edit?aid=' + aid,
				title: '编辑收货地址'
			});
		};
	}
]);