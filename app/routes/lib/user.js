var UserController=require('../../controller').User;
var routers = [{
		url: '/',
		method: 'get',
		ctrl: UserController.userCenter
	}, {
		url: '/orderInfo',
		method: 'get',
		ctrl: UserController.allOrder
	}, {
		url: '/orderInfo/express',
		method: 'get',
		ctrl: UserController.getExpressInfo
	},{
		url: '/orderInfo/express',
		method: 'get',
		ctrl: UserController.addressEdit
	},{
		url: '/address',
		method: 'get',
		ctrl: UserController.AddressList
	},{
		url: '/address/add',
		method: 'get',
		ctrl: UserController.addressAdd
	},{
		url: '/address/edit',
		method: 'get',
		ctrl: UserController.addressEdit
	},{
		url:'/coupon/list',
		method:'get',
		ctrl:UserController.getCouponList
	},{
		url:'/hasBoundMobile',
		method:'post',
		ctrl:UserController.hasBoundMobile
	},{
		url:'/isLogin',
		method:'get',
		ctrl:UserController.isLogin
	}
]
module.exports = routers; 