var requestUtil		= require('../../util').Request;

var config          = require('../../config');

module.exports={

	/*获取个人信息*/
	ProfileInfo:function(UserObj,callback){
		requestUtil.get("/api/user/ProfileInfo?UserId="
				+UserObj.UserId+"&AccessToken="+UserObj.AccessToken,callback);

	},

	/*获取用户地址列表*/
	userAddressList:function(UserObj,callback){
		requestUtil.get("/api/address/addressList?UserId="
				+UserObj.UserId+"&AccessToken="+UserObj.AccessToken,callback);
	},

	/*获取单个货运地址*/
	userAddressOne:function(addressObj,callback){
		requestUtil.get("/api/address/GetAddressById?UserId="
				+addressObj.UserId+"&AccessToken="
				+addressObj.AccessToken+"&AddressId="
				+addressObj.addressId,callback);
	},

	/*删除用户地址*/
	delAddress:function(addressObj,callback){
		requestUtil.post("/api/address/deleteaddress?UserId="
				+addressObj.UserId+"&AccessToken="+addressObj.AccessToken,addressObj,callback);
	},

	/*编辑用户地址*/
	editAddress:function(addressObj,callback){
		requestUtil.post("/api/address/editaddress?UserId="
				+addressObj.UserId+"&AccessToken="+addressObj.AccessToken,addressObj,callback);
	},


	/*新增用户收货地址*/
	addUserAddress:function(addressObj,callback){
		requestUtil.post("/api/address/addaddress?AccessToken="
				+addressObj.AccessToken,addressObj,callback);
	},

	/*获取用户订单*/
	userOrdersList:function(orderObj,callback){		
		requestUtil.get("/api/order/ListOrders?OrderNum="+orderObj.OrderNum
				+"&OrderType="+orderObj.OrderType+"&LastOrderId="
				+orderObj.LastOrderId+"&UserId="+orderObj.UserId
				+"&AccessToken="+orderObj.AccessToken,callback);
	},

	/*
		获取订单物流信息
	*/
	getExpressInfo:function(expressObj,callback){
		requestUtil.get("/api/order/ListLogisticsInfo?UserId="
			+expressObj.USER.UserId+'&AccessToken='+expressObj.USER.AccessToken
			+'&OrderId='+expressObj.OrderId,callback);
	},
	/*
	*	订单号获取用户信息
	*/
	getOrderInfo:function(obj,callback){
		requestUtil.get('/api/IdCardManage/GetRecipientByOrderId?UserId='
				+obj.UserId+'&AccessToken='+obj.AccessToken
				+"&OrderId="+obj.OrderId,callback);
	},
	couponBind:function(data,callback){
		requestUtil.post('/api/Coupon/Bind?UserId='+data.UserId
				+"&AccessToken="+data.AccessToken,data,callback);
	},
	sendBindMobileValidateCode:function(data,callback){
		requestUtil.post('/api/User/SendBindMobileValidateCode?UserId='
				+data.UserId+"&AccessToken="+data.AccessToken,data,callback);
	},
	verifyBindMobileValidateCode:function(data,callback){
		requestUtil.post('/api/User/VerifyBindMobileValidateCode?UserId='
				+data.UserId+"&AccessToken="+data.AccessToken,data,callback);
	},
	bindMobile:function(data,callback){
		requestUtil.post('/api/User/BindMobile?UserId='+data.UserId
				+"&AccessToken="+data.AccessToken,data,callback);
	},
	hasBoundMobile:function(data,callback){
		requestUtil.post('/api/User/HasBoundMobile?UserId='+data.UserId
				+"&AccessToken="+data.AccessToken,data,callback);
	}
}