/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/*
	Orders Controlller
	by xiaokang 
	date 2014/9/2
*/
ymtapp.controller('OrdersController', [
	'$scope',
	'httpHandlService',
	'$window',
	'utils',
	'ls',
	'ProductService',
	'YmtApi',
	'AddressService',
	function ($scope, $http, $window, utils, ls, ProductService,YmtApi,AddressService) {
		var search = utils.common.parseUrl($window.location.search);

		$http.get('/api/getListOrderInfo').success(function (result,code) {
			if(code == 200){
				for (var i in result.Orders) {
					result.Orders[i].PromotionUsed = {};
				}
				$scope.ordersList = result;
				$scope.ordersList.TotalPrice = $scope.originalTotal = $scope.ordersList.TotalPrice || 0;
			}
			
		});

		$scope.usedGiftAcount = 0;
		//已使用的免运卡
		$scope.usedFreeCard = 0;

		//替换图片
		$scope.getPicUrl = function (url) {
			return utils.imgHandl.replaceToListPic(url);
		};
		/*
		 * 可用红包
		 */
		$scope.canUseGift = function (o) {
			o.isUseGift = false;
			//已使用的红包金额
			o.usedGift = parseInt(o.Promotion.MaxUseGiftAmount > $scope.ordersList.AvailableGiftAmount ? $scope.ordersList.AvailableGiftAmount : o.Promotion.MaxUseGiftAmount) || 0;
		};

		$scope.tid = '';
		var isPay = false;
		//购买付款
		$scope.goPay = function () {
			if (isPay) {
				return;
			}
			isPay = true;
			var data = {
				Orders: $scope.ordersList.Orders
			};

			if (!data.Orders[0].Address) {
				return prompt('收件地址不能为空');
			}

			$http.post('/api/SaveOrder?User-Agent=' + (search['User-Agent'] || 'wap'), data).success(function (result, code) {
				isPay = false;
				if (code == 200) {
					if (!(result.TradingIds && result.TradingIds[0])) {
						prompt('获取交易号失效');
						ls.set('trandingIds', '');
						return;
					}
					var trandingIds = trandingIds = result.TradingIds.join(',');
					//是否包含杭保
					if (result.IncludeXloboBonded) {
						//如果是杭保订单或者只有一个支付号就直接支付 清空之前的
						ls.set('trandingIds', trandingIds);
						YmtApi.open({
							title:'支付订单',
							url:'/forYmatouApp/orders/paylist',
							isNew:true
						});
					}
					else {
						ls.set('trandingIds', '');
						YmtApi.openPay(trandingIds);
					}
				}
			});
		};

		/*
		 * @param {array} 假如有值则是赋值操作
		 *
		 */
		var orderInfo = function (freights) {
			var orderList = $scope.ordersList.Orders,
				i = 0,
				j,
				len = orderList.length,
				orders = [],
				product,
				productLength,
				tmp;
			if (freights && freights.length !== len) {
				prompt('接口错误');
				return;
			}
			for (; i < len; i++) {
				if (freights) {
					orderList[i].Freight = freights[i];
					continue;
				}
				orderList[i].Freight = 1;
				productLength = (product = orderList[i].Products).length;
				tmp = {};
				for (j = 0; j < productLength; j++) {
					tmp[product[j].CatalogId] = product[j].ProductNumber;
				}
				orders.push(tmp);
			}
			return orders;
		};
		//和卖家沟通
		$scope.toChat = function (toid, toLoginId,toLogoUrl) {
			$http.get('/forYmatouApp/personal/isLogin').success(function (result) {
				YmtApi.openChatDetail({
					SessionId:result.UserId + '_' + toid,
					ToId:toid,
					ToLoginId:toLoginId,
					ToLogoUrl:toLogoUrl
				});
			});
		};

		$scope.closeDiscount = function (obj) {
			obj.showCoupon = false;
		};

		$scope.discountAll = function (obj) {

			clearUsedCouponList();

			if (!obj.selectDiscountAll) {
				return;
			}

			obj.selectDiscountAll = false;
			//$scope.usedGiftAcount = 0;
			obj.useDiscount = '';
			//是否使用红包
			if (obj.isUseGift) {
				$scope.usedGiftAcount -= obj.usedGift;
			}
			//是否使用免运卡
			obj.freeCard = 0;
			var orders = $scope.ordersList.Orders,
				i = 0;
			//重置红包选择
			for (; i < orders.length; i++) {
				$scope.canUseGift(orders[i]);
			}
			obj.PromotionUsed = {}
			discount(true);
		};

		$scope.selectDiscountAll = false;

		var usedCouponList = [];


		function indexOfUsedCouponsList(CouponCode) {
			for (var i = 0, len = usedCouponList.length; i < len; i++) {
				if (usedCouponList[i] == CouponCode) {
					return i;
				}
			}
			return -1;
		}

		function checkCouponIsUsed() {
			var list = $scope.CouponsList;

			for (var i = 0, len = list.length; i < len; i++) {
				if (indexOfUsedCouponsList(list[i].CouponCode) > -1) {
					list[i].isUsed = true;
				}
			}
		}

		function releaseCoupon(CouponCode) {

			var index = indexOfUsedCouponsList(CouponCode);
			console.log(index);
			if (index > -1) {
				usedCouponList.splice(index, 1);
			}

			var list = $scope.CouponsList;

			for (var i = 0, len = list.length; i < len; i++) {
				if (list[i].CouponCode == CouponCode) {
					list[i].isUsed = false;
				}
			}
		}


		function clearUsedCouponList() {
			usedCouponList = [];
		}

		$scope.selectQ = function (obj, uid, target, money, type) {

			obj.PromotionUsed = {};
			obj.PromotionUsed.UseCouponCode = uid;
			obj.PromotionUsed.UseCouponAmount = parseInt(type == 1 ? money : 0);
			obj.useDiscount = '满' + target + (type == 1 ? '抵' : '返') + money;
			obj.selectDiscountAll = true;
			obj.showCoupon = false;

			//取消免运卡
			obj.PromotionUsed.UseFreeCard = false;
			obj.freeCard = 0;

			//是否使用红包
			if (obj.isUseGift) {
				$scope.usedGiftAcount -= obj.usedGift;
				obj.isUseGift = false;
			}
			//优惠券多订单
			var CouponCode = uid,
				index = indexOfUsedCouponsList(CouponCode);
			obj.bindCouponCode = CouponCode;

			(index < 0) && usedCouponList.push(CouponCode);

			discount();
		};

		$scope.selectCC = function (obj, type, val) {
			$scope.CouponsList = [];
			$scope.couponLoading = true;
			obj.showCoupon = true;

			var Catalogs = [];

			//obj.PromotionUsed = {}

			for (var i in obj.Products) {
				Catalogs.push({
					CatalogId: obj.Products[i].CatalogId,
					QuotePrice: obj.Products[i].QuotePrice,
					Amount: obj.Products[i].ProductNumber
				});
			}

			$scope.showDiscount = true;

			var pdata = {
				SellerId: obj.SellerId,
				TotalPrice: obj.TotalPrice,
				Catalogs: Catalogs
			};

			$http.post('/api/getCoupons', pdata).success(function (result) {
				if (typeof result === 'string') {
					obj.couponLoading = false;
					return;
				}
				$scope.CouponsList = result.Coupons;
				$scope.couponLoading = false;
				$scope.couponsDesc = $scope.CouponsList && $scope.CouponsList.length == 0 ? '没有可使用的优惠券' : '';
				//优惠券多订单
				checkCouponIsUsed();
				releaseCoupon(obj.bindCouponCode);
			})
		};
		//使用红包
		$scope.selectUGA = function (obj, val) {
			if (obj.isUseGift || obj.usedGift == 0) {
				return;
			}
			obj.PromotionUsed = {}
			obj.PromotionUsed.UseGiftAmount = val;
			//取消免运卡
			obj.PromotionUsed.UseFreeCard = false;
			obj.freeCard = 0;
			obj.useDiscount = '￥' + val + '红包';
			obj.selectDiscountAll = true;
			$scope.usedGiftAcount += val;
			console.log($scope.usedGiftAcount);
			obj.isUseGift = true;
			discount();
		};

		$scope.selectUFC = function (obj, val) {
			//免运卡使用规则，金额大于20 可以使用免运卡 和免运卡次数大0
			if (obj.TotalPrice < 20 || obj.PromotionUsed.UseFreeCard || $scope.ordersList.AvailableFreeCardNum < 1) {
				return;
			}
			obj.PromotionUsed = {};
			//是否使用红包
			if (obj.isUseGift) {
				$scope.usedGiftAcount -= obj.usedGift;
				obj.isUseGift = false;
			}

			obj.PromotionUsed.UseFreeCard = !val;
			obj.freeCard = 20;
			obj.PromotionUsed.UseGiftAmount = 0;
			obj.useDiscount = '1张免运卡';
			obj.selectDiscountAll = true;
			discount();
		};

		//计算优惠券
		function discount(clear) {
			var orders = $scope.ordersList.Orders,
				total = $scope.usedGiftAcount;
			var usedGift = parseInt($scope.ordersList.AvailableGiftAmount - $scope.usedGiftAcount);
			for (var i = 0; i < orders.length; i++) {
				total = parseFloat(total) + parseInt(orders[i].PromotionUsed && orders[i].PromotionUsed.UseCouponAmount || 0) + (orders[i].freeCard || 0);
				//if(clear != true){
				if (!orders[i].isUseGift && !orders[i].PromotionUsed.UseFreeCard) {
					orders[i].usedGift = orders[i].Promotion.MaxUseGiftAmount > usedGift ? usedGift : orders[i].Promotion.MaxUseGiftAmount;
				}
				//}			
			}
			$scope.discountPrice = total;
			$scope.ordersList.TotalPrice = ($scope.originalTotal - total).toFixed(2);
		}
		var couponObj,
			couponInfo,
			currOrder, //当前订单
			//确认使用优惠券
			confirmCoupon = function () {
				currOrder.PromotionUsed = {};

				currOrder.PromotionUsed.UseCouponCode = $scope.couponCode;
				currOrder.PromotionUsed.inputCouponCode = true;

				currOrder.PromotionUsed.UseCouponAmount = parseInt(couponInfo.Type == 1 ? couponInfo.Value : 0, 10);
				currOrder.useDiscount = couponInfo.Type == 1 ? '本单抵扣' + couponInfo.Value + '元' : '账户返' + couponInfo.Value + '元红包';
				currOrder.selectDiscountAll = true;
				//取消选择优惠券
				//currOrder.PromotionUsed.UseCouponCode = false;
				//取消免运卡
				//currOrder.PromotionUsed.UseFreeCard = false;
				currOrder.freeCard = 0;

				//是否使用红包
				if (currOrder.isUseGift) {
					$scope.usedGiftAcount -= currOrder.usedGift;
					currOrder.isUseGift = false;
				}
				discount();
			};
		//输入优惠券
		$scope.inputCoupon = function (order, sellerId, products) {

			$scope.inputCouponMask = true;

			$scope.validateStep = 1;

			currOrder = order;

			var ProductsAmount = [];
			for (var i = 0, len = products.length; i < len; i++) {
				ProductsAmount.push({
					CatalogId: products[i].CatalogId,
					ProductId: products[i].ProductId,
					Price: products[i].QuotePrice,
					Quantity: products[i].ProductNumber
				});
			}
			couponObj = {
				ProductsAmount: ProductsAmount,
				SellerId: sellerId,
				CouponCode: ''
			};
		};
		$scope.coupon = {
			code: ''
		};
		$scope.toValidate = function (code) {
			if (!code) {
				prompt('优惠码不能为空');
				return;
			}
			$scope.couponCode = code = String.prototype.toLocaleUpperCase.call(code);
			couponObj.CouponCode = code;
			$http.post('/api/coupon/bind', couponObj).success(function (result, code) {
				if (code != 200) {
					return;
				}
				if (result.Status == 0) {
					prompt('您输入的优惠码不正确或不能使用');
					return;
				}

				couponInfo = result.Coupon;

				if (result.Status == 1) {
					confirmCoupon()
					$scope.inputCouponCancel();
				}
				else if (result.Status == 2) {
					$scope.validateStep = 2;
				}
			})
		};

		$scope.ToValidateConfirmDalog = function () {
			$scope.validateStep = 3;
		};

		var validatePhoneNumber = function () {
			var phone = $scope.phoneNumber;
			//验证是否为空
			if (phone == '') {
				prompt('手机号码不能为空,请重新输入');
				return false;
			}
			if (!/^1[3|4|5|8][0-9]\d{8}$/.test(phone)) {
				prompt('手机号码有误，请重新输入');
				return false;
			}
			return true;
		};

		var isSend = false;
		//获得验证码
		$scope.getValidateCode = function () {
			if (!isSend && $scope.countDown) {
				return;
			}
			isSend = true;

			if (!validatePhoneNumber()) {
				return;
			}

			$http.post('/api/sendBindMobileValidateCode', {
				Phone: $scope.phoneNumber
			}).success(function (result, code) {
				isSend = false;
				if (code != 200) {
					return prompt('发送失败');
				}
				else {
					prompt('验证码已发送，请查收短信');
				}
				countDown(60);
			});

			var countDown = function (time) {
				$scope.countDown = time + 's后重发';
				if (time--) {
					$timeout(function () {
						countDown(time)
					}, 1000);
				}
				else {
					$scope.countDown = '';
				}
			};
		};
		//完成验证
		$scope.completeValidate = function () {
			var validateCode = $scope.validateCode;
			if (!validateCode || $scope.isComplete) {
				return;
			}
			if (!validatePhoneNumber()) {
				return;
			}
			$scope.isComplete = true;

			$http.post('/api/bindMobile', {
				Phone: $scope.phoneNumber,
				ValidateCode: validateCode
			}).success(function (result, code) {
				$scope.isComplete = false;
				if (code == 200) {
					prompt('已完成手机号码验证');
					confirmCoupon()
					$scope.inputCouponCancel();
				}
				else {
					prompt('无法绑定此号码，请稍后再试');
					$scope.isComplete = false;
				}
			});
		};

		//取消
		$scope.inputCouponCancel = function () {
			$scope.inputCouponMask = false;
			$scope.coupon.code = '';
			$scope.phoneNumber = '';
			$scope.vaildateCode = '';
		};
		$scope.ProductService = ProductService;

		//获得地址服务
		$scope.AddressService = AddressService;
		
		//选择地址
		$scope.addressState;
		$scope.switchAddressState = function(state){
			$scope.addressState = state;
			if(state == 1 && !AddressService.list[0]){
				AddressService.queryAddressList();
			}
		}
		$scope.closeAddressState = function(state){
			$scope.addressState = 0;
		}
		$scope.editAddress = function(aid){
			$scope.switchAddressState(2);
			AddressService.queryAddress(aid);
		}
		$scope.insterAddress = function(){
			AddressService.item = {};
			$scope.switchAddressState(2);
		}
		$scope.setDefault = function(address){
			AddressService.setDefault(address,function(){
				changeOrderAddress(address);
				AddressService.queryAddressList();
			});
		}
		/**
		 * 更改订单收货地址
		 */
		var changeOrderAddress = function(address){
			var orders = $scope.ordersList.Orders[0] || {},
				orderAddress = orders.Address;

			if(!address){
				$scope.ordersList.Orders[0].Address = {}
			}
			if( address.IsDefault ){
				$scope.ordersList.Orders[0].Address = {
					AddressId: address.AddressId,
					Addressee: address.Recipient,
					Area: address.Address1,
					DetailAddress: address.Details,
					Email: address.Email,
					IsDefault: address.IsDefault,
					Mobile: address.Mobile,
					PostCode: address.PostCode,
					Telphone: address.Telephone
				};
			}


			
		}
		$scope.saveAddress = function(){
			AddressService.saveAddress(AddressService.item,function(){
				prompt('修改成功');
				$scope.switchAddressState(1);
				AddressService.queryAddressList();
				changeOrderAddress(AddressService.item);
			});
		}
		$scope.deleteAddress = function(aid){
			AddressService.delAddress(aid,function(){
				$scope.switchAddressState(1);
				AddressService.queryAddressList();
				changeOrderAddress(AddressService.item);
			});
		}

	}
]);