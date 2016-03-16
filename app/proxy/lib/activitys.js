'use strict';

var requestUtil = require('../../util').Request;

/*
* 砍价团功能
*/
module.exports.bargainGroups = {
	/**
	 * 获得用户在团中间的状态
	 * @param {string} 用户编号
	 * @param {string} 主题编号
	 */
	getUserAtGroupInfo:function(data,callback){
		requestUtil.get('/api/Tuan/GetTuanInfoByUserAndTopicID?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken+'&TopicId='+data.TopicId,callback);
	},
	/**
	 * 获得团信息通过口令
	 * @param {string} [口令]
	 * @param {string} 主题编号
	 */
	getGroupInfoByCode:function(data,callback){
		requestUtil.get('/api/Tuan/GetTuanInfoByCodeAndTopicID?UserId='
				+data.UserId+'&Code='+data.Code
				+'&AccessToken='+data.AccessToken
				+'&TopicId='+data.TopicId,callback);
	},
	/**
	 * 加入团
	 */
	join:function(data,callback){
		requestUtil.post('/api/Tuan/JoinTuan?UserId='+data.UserId
				+'&AccessToken='+data.AccessToken,data,callback);
	},
	/**
	 * 创建团
	 */
	create:function(data,callback){
		requestUtil.post('/api/Tuan/CreateTuan?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,data,callback);
	},
	buy:function(data,callback){
		requestUtil.post('/api/Tuan/Buy?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,data,callback);
	},
	/**
	 * 获得人数
	 */
	getProfileNumber:function(data,callback){
		requestUtil.get('/api/Tuan/ProfileByTopicID?UserId='+data.UserId
				+'&AccessToken='+data.AccessToken
				+'&TopicId='+data.TopicId,callback);
	},	
	/**
	 * 获得商品编号
	 */
	getProductsId:function(data,callback){
		requestUtil.get('/api/GroupBuying/GetProducts_MilkPowder?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,callback);
	},
	/**
	 * 获得商品信息
	 */
	getProducts:function(data,callback){
		requestUtil.get('/api/GroupBuying/GetProducts_MilkPowder?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,callback);
	},
	/**
	 * 获得所有的活动主题
	 */
	getAllTopicList:function(data,callback){
		requestUtil.get('/api/Tuan/GetTuanTopicList?UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,callback);
	},
	/**
	 * 获得单个主题
	 */
	getTopicInfoByTopicId:function(data,callback){
		requestUtil.get('/api/Tuan/GetTuanTopicInfoByTopicID?TopicId='+data.TopicId,callback);
	},
	/**
	 * 获得所有的活动主题
	 */
	getProductCateGoryInfo:function(data,callback){
		requestUtil.get('/api/Tuan/GetCategoryByTopicIdAndProductID?TopicId='+data.TopicId
			+'&ProductID='+data.ProductID,callback);
	},
	/**
	 * 获得商品编号通过主题
	 */
	getProdutListByTopicId:function(data,callback){
		requestUtil.get('/api/Tuan/GetProdutListByTopicID?TopicId='+data.TopicId+'&UserId='
				+data.UserId+'&AccessToken='
				+data.AccessToken,callback);
	}
}

module.exports.diaper = require('./activitys/diaper');

module.exports.milk = require('./activitys/milk');