'use strict';

var activitysController = require('../../controller').Activitys;

var routers = (function(basePaths) {
	var routesCfgs = [];
	for (var i = 0, len = basePaths.length; i < len; i++) {
		routesCfgs = routesCfgs.concat([{
			/*获取配置文件*/
			url: '/'+basePaths[i]+'',
			method: 'get',
			ctrl: activitysController[basePaths[i]].index
		}, {
			/*活动中*/
			url: '/'+basePaths[i]+'/:code/info',
			method: 'get',
			ctrl: activitysController[basePaths[i]].inActivity
		}, {
			/*购买页*/
			url: '/'+basePaths[i]+'/:code/buy',
			method: 'get',
			ctrl: activitysController[basePaths[i]].shopping
		}, {
			/*分享页*/
			url: '/'+basePaths[i]+'/:code/share',
			method: 'get',
			ctrl: activitysController[basePaths[i]].share
		}, {
			/*参团跳转*/
			url: '/'+basePaths[i]+'/join',
			method: 'get',
			ctrl: activitysController[basePaths[i]].toJoin
		}, {
			/*参团*/
			url: '/'+basePaths[i]+'/:code/join',
			method: 'post',
			ctrl: activitysController[basePaths[i]].join
		}, {
			/*创团*/
			url: '/'+basePaths[i]+'/create',
			method: 'post',
			ctrl: activitysController[basePaths[i]].create
		}, {
			/*购买接口*/
			url: '/'+basePaths[i]+'/buy',
			method: 'post',
			ctrl: activitysController[basePaths[i]].buy
		}, {
			/*购买接口*/
			url: '/'+basePaths[i]+'/profile',
			method: 'get',
			ctrl: activitysController[basePaths[i]].getProfileNumber
		}]);
	}
	return routesCfgs;

})(['diaper', 'milk']);

routers.push({
	url:'/milk/productInfos',
	method:'get',
	ctrl:activitysController.bargainGroups.productInfos
},{
	url:'/bargainGroups/:topicId',
	method:'get',
	ctrl:activitysController.bargainGroups.index
},{
	url:'/bargainGroups/:topicId/info/:code',
	method:'get',
	ctrl:activitysController.bargainGroups.inActivity
},{
	url:'/bargainGroups/:topicId/create',
	method:'post',
	ctrl:activitysController.bargainGroups.create
},{
	url:'/bargainGroups/:topicId/join',
	method:'get',
	ctrl:activitysController.bargainGroups.toJoin
},{
	url:'/bargainGroups/:topicId/join/:code',
	method:'post',
	ctrl:activitysController.bargainGroups.join
},{
	url: '/bargainGroups/:topicId/profile',
	method: 'get',
	ctrl: activitysController.bargainGroups.getProfileNumber
}, {
	url: '/bargainGroups/:topicId/:code/share',
	method: 'get',
	ctrl: activitysController.bargainGroups.share
},{
	url: '/bargainGroups/:topicId/buy',
	method: 'get',
	ctrl: activitysController.bargainGroups.shopping
},{
	url:'/bargainGroups/:topicId/productInfos',
	method:'get',
	ctrl:activitysController.bargainGroups.getProductInfos
},{
	url:'/bargainGroups/:topicId/GroupInfo',
	method:'get',
	ctrl:activitysController.bargainGroups.getGroupInfoByTopicId
},{
	url:'/bargainGroups/:topicId/GroupInfo/:code',
	method:'get',
	ctrl:activitysController.bargainGroups.getGroupInfoByCode
});

routers.push({
	url:'/templet',
	method:'get',
	ctrl:activitysController.templet
},{
	url:'/templet',
	method:'post',
	ctrl:activitysController.saveTemplet
},{
	url:'/group',
	method:'get',
	ctrl:activitysController.group
})

module.exports = routers;