/**
 * 地址服务
 */
ymtapp.factory('AddressService', [
	'httpHandlService',
	'$window',
	'utils',
	'ls',
	'YmtApi',
	 function ($http, $window, utils, ls, YmtApi) {

	var addressService = {
		list:[]
	};

	addressService.setDefault = function (address,callback) {
		address.IsDefault = true;	
		addressService.saveAddress(address,callback);
	};

	addressService.select = {};

	addressService.selectCity = function (id) {
		for (var i in addressService.cityList['0']) {
			if (addressService.item.ProvinceName == addressService.cityList['0'][i]) {
				addressService.select.CityNameId = '0,' + i;
				addressService.selectCityObj = addressService.cityObj['0,' + i]
			};
		}
		//addressService.select.DistrictNameId = undefined;
		addressService.selectDistrictObj = '';
	};

	addressService.areaCity = function (id) {
		for (var i in addressService.cityList[addressService.select.CityNameId]) {
			if (addressService.item.CityName == addressService.cityList[addressService.select.CityNameId][i]) {
				//addressService.select.DistrictNameId = addressService.select.CityNameId + ',' + i;
				addressService.selectDistrictObj = addressService.cityObj[addressService.select.CityNameId + ',' + i]
			}
		}
	};

	///@TODO 这个接口新增一个检查用户是否有邮箱的接口
	$http.get('/api/getUserInfo').success(function (resultUser) {
		addressService.hasEmail = !!resultUser.ProfileInfo.Email;
	});
	/**
	 * 获得城市列表
	 */
	var getCityList = function(cb){
		$http.get('/api/getCityList').success(function (resultCityData) {
			addressService.cityList = resultCityData;
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
			addressService.cityObj = cityList;
			console.log(addressService.cityObj)
			cb && cb();
		});
	}

	/**
	 * 获得单个地址
	 */
	addressService.queryAddress = function(aid){
		$http.get('/api/getAddressOne?AddressId=' + aid).success(function (resultCityData, code) {
			if (code == 200) {
				addressService.item = resultCityData.Address;
				getCityList(function(){
					addressService.selectCity();
					addressService.areaCity();
				});
				
			}
		});
	}
	/**
	 * 获得当前用户的地址列表
	 */
	addressService.queryAddressList = function(){
		getCityList();
		/*用户收货地址列表*/
		$http.get('/api/getAddressList').success(function (result, code) {
			if (code == 200) {
				var resultAddress = result.AddressList;
				addressService.list = resultAddress.slice(0, 5);
			}
		});
	}


	/**
	 * 保存收货地址
	 * @param  {object}   obj [description]
	 * @param  {Function} cb  回调
	 * @return {[type]}       [description]
	 */
	addressService.saveAddress = function (obj,cb) {
			var title = '添加',
			url = 'addAddress';
		if (obj && obj.AddressId) {
			title = '修改';
			url = 'editAddress';
		}

		if (!obj) {
			prompt('请填写收货人信息');
			return false;
		}


		if (!obj.Recipient || obj.Recipient === '' || !obj.Mobile || obj.Mobile === '') {
			prompt('收货人或手机不允许为空');
			return false;
		}

		if (!/^([\u4e00-\u9fa5])*$/.test(obj.Recipient)) {
			prompt('收货人姓名只能是中文');
			return false;
		}

		if (!/^\d{11}$/.test(obj.Mobile)) {
			prompt('手机号码必须是11位的数字');
			return false;
		}

		if (!obj.CityName || obj.CityName == '' || !obj.DistrictName || obj.DistrictName == '' || !obj.ProvinceName || obj.ProvinceName == '' 
			|| !obj.Details || obj.Details == '' || !obj.PostCode || obj.PostCode == '') {
			prompt('地址与邮编填写不完整');
			return false;
		}
		if (/^((\d)*|([a-z]|[A-Z]))$/.test(obj.Details)) {
			prompt('地址不能只是数字和字母');
			return false;
		}
		if (!/^\d*$/.test(obj.PostCode)) {
			prompt('邮政编码只能是数字');
			return false;
		}
		if (!addressService.hasEmail && !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(obj.Email))) {
			prompt('邮箱地址不正确');
			return false;
		}

		$http.post('/api/' + url, obj).success(function (resultAddress) {
			//不能去掉等于true的判断 因为错误返回的字符串
			if (resultAddress.Result == true) {
				cb && cb();
			}
			else {
				prompt(title + '收货地址错误');
			}
		});
	};

	addressService.delAddress = function (aid,cb) {
		confirmBox('是否删除收货地址？', function () {
			$http.post('/api/delAddress', {
				AddressId: aid
			}).success(function (resultAddress) {
				if (resultAddress.Result != 'false') {
					cb && cb();
				}
				else {
					prompt('删除地址错误');
				}
			});
		});

	};

	return addressService;
}]);
