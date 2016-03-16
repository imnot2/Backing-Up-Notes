'use strict';
/*
 * 购物车
 *
 */
var requestUtil = require('../../util').Request;

/*
 * 获得shoppingCart参数
 * @param {object} 传递
 * @return {string} UserId='' || ShoppingCartId=''
 * @description 如果有用户编号则传递用户编号，否则传递shoppingCartId
 */
function getShoppingCartParam(data) {
	var paramStr = [];
	if (data.AccessToken) {
		paramStr.push('AccessToken=' + data.AccessToken);
	}
	if (data.ShoppingCartId) {
		paramStr.push('ShoppingCartId=' + data.ShoppingCartId);
	}
	return paramStr.join('&');
}

module.exports = {
	getShoppingCartQty: function (data, callback) {
		var paramStr = getShoppingCartParam(data);
		requestUtil.get('/api/shoppingcart/ShoppingCartQty?' + paramStr, callback)
	},
	/*获取购物车*/
	getshoppingcart: function (data, callback) {
		var paramStr = getShoppingCartParam(data);
		requestUtil.get('/api/shoppingcart/ListInfo?' + paramStr, callback)
	},
	/*获得购物价格和运费*/
	getTotal: function (data, callback) {
		var paramStr = getShoppingCartParam(data);
		requestUtil.get('/api/shoppingcart/Total?UserIp=' + data.ip + '&' + paramStr, callback)
	},
	/*更新购物车单个商品选中状态*/
	changeCatalogSelected: function (data, callback) {
		var paramStr = getShoppingCartParam(data);
		requestUtil.post('/api/shoppingcart/changeCatalogSelected?' + paramStr, data, callback)
	},
	/*更新购物车所有商品选中状态*/
	changeAllSelected: function (data, callback) {
		var paramStr = getShoppingCartParam(data);
		requestUtil.post('/api/shoppingcart/ChangeAllSelected?' + paramStr, data, callback)
	},
}