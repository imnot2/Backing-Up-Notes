'use strict';

var requestUtil = require('../../../util').Request;

module.exports = {
	/**
	 * 获得用户在团中间的状态
	 * @param  {string} 用户编号
	 */
	getUserAtGroupInfo:function(data,callback){
		requestUtil.get('/api/GroupBuying/ByUser?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,callback);
	},
	/**
	 * 获得团信息通过口令
	 * @param {string} [口令]
	 */
	getGroupInfoByCode:function(data,callback){
		requestUtil.get('/api/GroupBuying/ByCode?UserId='
				+data.UserId+'&Code='+data.Code
				+'&AccessToken='+data.AccessToken,callback);
	},
	/**
	 * 获得商品编码
	 * @return {[type]} [description]
	 */
	getProductId:function(data,callback){
		requestUtil.get('/api/GroupBuying/ProdutId?UserId='
				+data.UserId+'&Code='+data.Code
				+'&AccessToken='+data.AccessToken,callback);
	},
	/**
	 * 加入团
	 */
	join:function(data,callback){
		requestUtil.post('/api/GroupBuying/Join?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,data,callback);
	},
	/**
	 * 创建团
	 */
	create:function(data,callback){
		console.log('/api/GroupBuying/Join?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,data)
		requestUtil.post('/api/GroupBuying/Create?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,data,callback);
	},
	buy:function(data,callback){
		requestUtil.post('/api/GroupBuying/Buy?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,data,callback);
	},
	/**
	 * 获得人数
	 */
	getProfileNumber:function(data,callback){
		requestUtil.get('/api/GroupBuying/Profile?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,callback);
	}
}