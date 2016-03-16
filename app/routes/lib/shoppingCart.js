'use strict';
//购物车路由配置
var ShoppingCartController = require('../../controller').ShoppingCart;

var routers = [{
		url: '/quantity',
		method: 'get',
		ctrl: ShoppingCartController.getShoppingCartQty
	}, /*获取用户商品列表*/ {
		url: '/',
		method: 'get',
		ctrl: ShoppingCartController.getshoppingcart
	},{
		url:'/total',
		method:'get',
		ctrl: ShoppingCartController.getTotal
	}]

module.exports = routers;