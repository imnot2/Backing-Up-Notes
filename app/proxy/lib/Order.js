'use strict';

var requestUtil = require('../../util').Request;

module.exports = {
	delayDelivery: function(data, callback) {
		requestUtil.post('/api/Order/BuyerDelayReceive?AccessToken='
				+data.AccessToken, data,callback);
	},
	getOrdersByTradingId:function(data,callback){
		requestUtil.get('/api/Order/GetOrdersByTradingId?AccessToken='+data.AccessToken
			+'&TradingIds='+data.trandingIds,callback);
	},
	/**
	 * 获得订单信息
	 * @param  {object}   data     
	 *         UserId    用户编号
	 *         TradingId 交易号
	 */
	listItem:function(data,callback){
		requestUtil.get('/api/Trading/ListItem?&AccessToken='+data.AccessToken
			+'&TradingId='+data.TradingId,callback);
	},
	/**
	 * 通过tradingId更新tradingId
	 * @parma {string} trandingId
	 * @return {string} trandingId 更新之后的trandingId
	 */
	updateTradingId:function(data,callback){
		requestUtil.post('/api/Trading/TradingIdUpdate?AccessToken='
				+data.AccessToken,data,callback);
	},
	directBuy:function(data,callback){
		requestUtil.post('/api/PreOrder/QuickBuy?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,data,callback);
	}
}