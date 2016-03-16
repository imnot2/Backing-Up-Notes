'use strict';

var requestUtil = require('../../util').Request;

module.exports={	
	/*
		@name	: 获取顶部图片列表
		@author	: 阿杜
		@param	: type 0 or 1  -整点抢，全球热
	*/
	bannerList:function(type,callback){
		requestUtil.get('/api/banner/bannerlist?type='+type,callback)
	},

	/*系统相关接口*/
	listsysteminfo:function(type,version,callback){
		requestUtil.get('api/system/ListSystemInfo?type='
			+type+'&currentversion='+version,callback)
	},

	clientconfigurations:function(callback){
		requestUtil.get('api/system/ClientConfigurations',callback)
	},

	saveFeedback:function(data,callback){
		requestUtil.post('/api/Feedback/AddFeedback?AccessToken='+data.AccessToken,data,callback)
	},
	/*
	* 获得用户的分享链接
	*/
	getShareInfo:function(data,callback){
		requestUtil.get('/api/User/Recommend?AccessToken='+data.AccessToken,callback)
	}
}