'use strict';

var config=require('../../config');
var userAgentUtil=require('../../util').userAgent;
var productProxy = require('../../proxy').Product;
var utils = require('../../util');
var formUtil = utils.Forms;
var logger = utils.log4js.logger;

module.exports={

	/*
	*	商品详情渲染
	*/
	renderProduct:function(req,res){
		var viewObj=config.viewModule;
		var userInfo = utils.getUserInfo(req);
		viewObj.isAndroid = userAgentUtil.isAndroid(req);
		if(!req.query['pid']){
			logger('error').error('productid is undefined ; referer:'+req.headers['referer']+'  user-agent:'+req.headers['user-agent']);
		}
		res.render('product_item',viewObj);	
	},
	/*
		商品详情-》完整介绍页面
	*/
	renderProductInfo:function(req,res){
		var viewObj=config.viewModule;
		viewObj.isAndroid = userAgentUtil.isAndroid(req);
		viewObj.isIphone = userAgentUtil.isIphone(req);
		res.render('product_item_info',viewObj);
	},
	/* 
	* 商品详情
	* 
	*/
	getProductDetail:function(req,res){
		var user = utils.getUserInfo(req);
		var data = {
			ProductId:req.param('productId'),
			AccessToken: user.AccessToken 
		}
		productProxy.getBasicProductInfo(data,function(result){
			res.send(result);
		})
	},
	/*
	* 商品描述
	*/
	getProductDescription:function(req,res){
		var data = {
			ProductId:req.param('productId')
		}
		productProxy.getProductDescription(data,function(result){
			res.send(result);
		})
	},
	/**
	 * 获得商品提醒状态
	 */
	getRemindStatus:function(req,res){
		var data = utils.getUserInfo(req) || {};
		data.ProductId = req.param('productId');

		productProxy.getRemindStatus(data,function(result){
			res.send(result)
		})		
	},
	/**
	 * 搜索商品
	 */
	searchProducts:function(req,res){
		formUtil.fields(req, function(field) {
			field.pageSize = req.query.pageSize || 30;
			field.pageIndex = req.query.pageIndex || 1;
			productProxy.searchProducts(field,function(result){
				res.send(result);
			})
		})
	},
	/**
	 * 过滤品牌
	 */
	filterBrands:function(req,res){
		formUtil.fields(req, function(field) {
			productProxy.filterBrands(field,function(result){
				res.send(result);
			})
		})
	},
	/**
	 * 过滤分类
	 * @param {object} param 
	 *        {string} keywords 关键字
	 */
	filterCategories:function(req,res){
		formUtil.fields(req, function(field) {
			productProxy.filterCategories(field,function(result){
				res.send(result);
			})
		})
	},
	/**
	 * 因为ios客户端问题不能encode 做一次restful重定向
	 */
	jump:function(req,res){
		res.redirect('/forYmatouApp/product/pid?pid='+req.param('pid')+'&title=%E5%95%86%E5%93%81%E8%AF%A6%E6%83%85');
	}

}