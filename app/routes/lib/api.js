var apiController = require('../../controller').Api,	
	logger = require('../../util').Logger,
	UserController=require('../../controller').User;

var routers = [{
		/*获取配置文件*/
		url: '/config',
		method: 'get',
		ctrl: apiController.getConfig
	},{
		/*获取顶部图片*/
		url: '/getBanner',
		method: 'get',
		ctrl: apiController.getBanner
	}, {
		url: '/getHotProduct',
		method: 'get',
		ctrl: apiController.hotProduct
	}, /*获取全球热列表*/ {
		url: '/getHotCategoryProduct',
		method: 'get',
		ctrl: apiController.prodcutCategory
	}, /*获取全球热分类列表*/ {
		url: '/getHomeProduct',
		method: 'get',
		ctrl: apiController.homeProduct
	}, /*获取整点商品列表*/ {
		url: '/product/:productid',
		method: 'get',
		ctrl: apiController.getBasicProductInfo
	}, /*获取卖家信息*/ {
		url: '/buyerInfo/:sellerId',
		method: 'get',
		ctrl: apiController.getBuyerInfo
	}, /*获取商品详情*/ {
		url: '/addshoppingcart',
		method: 'post',
		ctrl: apiController.AddCatalog
	}, /*添加购物车*/ {
		url: '/delshoppingcart',
		method: 'post',
		ctrl: apiController.deleteCatalog
	}, /*删除购物车*/
	//{url:'/MergeCart',method:'post',ctrl:apiController.MergeCart},
	{
		url: '/changeAllSelected',
		method: 'post',
		ctrl: apiController.changeAllSelected
	}, /*更新购物车所有商品选中状态*/ {
		url: '/ChangeSellerSelected',
		method: 'post',
		ctrl: apiController.ChangeSellerSelected
	}, /*更新购物车单个卖家所有商品选中状态*/ {
		url: '/changeCatalogSelected',
		method: 'post',
		ctrl: apiController.changeCatalogSelected
	}, /*更新购物车单个商品选中状态*/ {
		url: '/changeCatalogNum',
		method: 'post',
		ctrl: apiController.changeCatalogNum
	}, /*更新购物车单个商品商品数量*/ {
		url: '/getListOrderInfo',
		method: 'get',
		ctrl: apiController.getListOrderInfo
	}, /*根据购物车获取待下单信息*/ {
		url: '/SaveOrder',
		method: 'post',
		ctrl: apiController.SaveOrder
	}, /*保存订单*/ {
		url: '/getUserInfo',
		method: 'get',
		ctrl: apiController.getUserInfo
	}, /*获取用户信息*/ {
		url: '/getExpressInfo',
		method: 'get',
		ctrl: apiController.getExpressInfo
	}, /*获取物流信息*/ {
		url: '/getAddressList',
		method: 'get',
		ctrl: apiController.getAddressList
	}, /*获取收货地址列表*/ {
		url: '/getAddressOne',
		method: 'get',
		ctrl: apiController.userAddressOne
	}, /*获取单个收货地址*/ {
		url: '/addAddress',
		method: 'post',
		ctrl: apiController.addAddress
	}, {
		url:'/editAddress',
		method:'post',
		ctrl:apiController.editAddress
	}, /*添加到收货地址*/ {
		url: '/setProductRemind',
		method: 'get',
		ctrl: apiController.setProductRemind
	}, /*设置商品提示*/ {
		url: '/getCoupons',
		method: 'post',
		ctrl: apiController.getCoupons
	}, /*获取优惠券*/ {
		url:'/coupon/summary',
		method:'get',
		ctrl:apiController.getCouponsSummary
	}, {
		url: '/delAddress',
		method: 'post',
		ctrl: apiController.delAddress
	}, /*删除收货地址*/ {
		url: '/getUserOrder',
		method: 'get',
		ctrl: apiController.getUserOrderList
	}, /*获取订单列表*/ {
		url: '/getTrading',
		method: 'get',
		ctrl: apiController.getTrading
	}, /*获取支付单号*/ {
		url: '/getCityList',
		method: 'get',
		ctrl: apiController.getCityList
	}, /*获取城市列表*/ {
		url: '/getServerTime',
		method: 'get',
		ctrl: apiController.getServerTime
	}, /*获取服务器时间*/ {
		url: '/checkUserLogin',
		method: 'get',
		ctrl: apiController.checkUserLogin
	}, /*检测用户是否登陆*/ {
		url: '/saveFeedback',
		method: 'post',
		ctrl: apiController.saveFeedback
	}, /*提交返回*/ {
		url: '/getGroupProductList',
		method: 'get',
		ctrl: apiController.getGroupProductList
	}, {
		url: '/log',
		method: 'get',
		ctrl: logger.showLog
	}, //日志信息
	{
		url: '/showLogFile',
		method: 'get',
		ctrl: logger.showLogFile
	},{
		url:'/coupon/bind',
		method:'post',
		ctrl:UserController.couponBind
	},{
		url:'/verifyBindMobileValidateCode',
		method:'post',
		ctrl:UserController.verifyBindMobileValidateCode
	},{
		url:'/sendBindMobileValidateCode',
		method:'post',
		ctrl:UserController.sendBindMobileValidateCode
	},{
		url:'/bindMobile',
		method:'post',
		ctrl:UserController.bindMobile
	}
];
module.exports = routers;