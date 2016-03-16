'use strict';

var config=require('../../config');

/*Util*/
var userAgentUtil=require('../../util').userAgent;
var loggerUtil=require('../../util').Logger;

/*Controller Module*/
var APIController=require('./api');

/*Proxy*/
var commonProxy = require('../../proxy').Common;

var viewObj=config.viewModule;

module.exports={

	home:function(req,res,next){
		viewObj.isAndroid = userAgentUtil.isAndroid(req);
		viewObj.isIphone = userAgentUtil.isIphone(req);
		res.render('home',viewObj);
	},
	hot:function(req,res){
		viewObj.isAndroid = userAgentUtil.isAndroid(req);
		viewObj.isIphone = userAgentUtil.isIphone(req);
		res.render('hot',viewObj);
	},
	/*
	* 整点抢
	*/
	hoursActivity:function(req,res){
		res.render('hoursActivity',viewObj);
	},
	/*
	* 每日团
	*/
	groupProduct:function(req,res){
		res.render('groupProduct',viewObj);
	},
	shoppingBag:function(req,res){
		res.render('shopping_bag',viewObj);		
	},

	feedback:function(req,res){
		res.render('feedback',viewObj);
	},

	helpInfo:function(req,res){		
		res.render('help',viewObj);
	},

	regProtocol:function(req,res){
		res.render('reg_protocol',viewObj);
	},
	updateLogin:function(req,res){
		var accessToken = req.query.AccessToken,
			userId = req.query.UserId;
		if(accessToken !== 'nil'){
			res.cookie('UserId', userId , {
				maxAge:1000*60*60*10,
				httpOnly: true,
				domain:'.ymatou.com'//设置domain 共享当前域下面登录状态
			});
			res.cookie('AccessToken', accessToken , {
				maxAge:1000*60*60*10,
				httpOnly: true,
				domain:'.ymatou.com'//设置domain 共享当前域下面登录状态
			});
		}else{
			res.clearCookie('UserId',{
				domain:'.ymatou.com'
			});
			res.clearCookie('AccessToken',{
				domain:'.ymatou.com'
			});
		}
		res.send({StatusCode:200,Msg:"更新登陆成功"});
	},
	//搜索
	search:function(req,res){
		res.render('search',viewObj);
	},
	tools:function(req,res){
		res.render('tools',viewObj);
	}
}