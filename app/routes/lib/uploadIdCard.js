'use strict';
//购物车路由配置
var UploadIdCardController = require('../../controller').UploadIdCard;

var routers = [{
		url: '/:tid/list',
		method: 'get',
		ctrl: UploadIdCardController.getlist
	},{
		url: '/:tid/list/:orderId/userInfo/:userId/:name/:mobile',
		method: 'get',
		ctrl: UploadIdCardController.renderAddCardId
	},{
		url: '/:tid/list/:orderId/userInfo/:userId/:name/:mobile',
		method: 'post',
		ctrl: UploadIdCardController.addCardId
	},{
		url: '/:tid/list/:orderId/userInfo/:userId/:name/:mobile/upload',
		method: 'get',
		ctrl: UploadIdCardController.renderUpload
	},{
		url: '/:tid/list/:orderId/userInfo/:userId/:name/:mobile/upload/progress',
		method: 'post',
		ctrl: UploadIdCardController.upload
	},{
		url:'/provision/:type',
		method:'get',
		ctrl:UploadIdCardController.provision
	},{
		url:'/success/:tid',
		method:'get',
		ctrl:UploadIdCardController.success
	}]

module.exports = routers;