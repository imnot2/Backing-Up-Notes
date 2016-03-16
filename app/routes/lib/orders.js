'use strict';

var ordersController = require('../../controller').Orders;
var apiController = require('../../controller').Api;

var routers = [{
		url: '/',
		method: 'get',
		ctrl: ordersController.orders
	}, {
		url: '/successful',
		method: 'get',
		ctrl: ordersController.successfulOrder
	}, {
		url: '/receive',
		method: 'get',
		ctrl: apiController.receive
	}, {
		url: '/:orderId/delayDelivery',
		method: 'get',
		ctrl: ordersController.delayDelivery
	}, {
	    url: '/paylist',
	    method: 'get',
	    ctrl: ordersController.renderPayList
	}, {
	    url: '/paylist',
	    method: 'post',
	    ctrl: ordersController.renderPayList
	},{
		url:'/paylist/:trandingIds',
		method:'get',
		ctrl:ordersController.getOrdersByTradingId
	},{
		url:'/listItem/:tid',
		method:'get',
		ctrl:ordersController.listItem
	},{
		url:'/bondPay/:tid',
		method:'get',
		ctrl:ordersController.bondPay
	},{
		url:'/updateTradingId',
		method:'post',
		ctrl:ordersController.updateTradingId
	},{
		url:'/getUploadIdCartInfo',
		method:'get',
		ctrl:ordersController.getUploadIdCartInfo
	},{
		url:'/directBuy',
		method:'post',
		ctrl:ordersController.directBuy
	}
];

module.exports = routers;