'use strict';
var cluster = require('cluster');
var path = require('path');

var config=require('../../config');
var record      = require('../../util').record;
var productProxy = require('../../proxy').Product;
var UserProxy = require('../../proxy').User;
var userAgentUtil=require('../../util').userAgent;

var utils = require('../../util');
var formUtil = utils.Forms;
var logger = utils.logger;

module.exports={
	/*
		检测用户是否登陆
		by xiaokang
		date 14/9/3
	*/
	userAuth:function(req,res,next){
		/*var query = req.query,
			sess = req.session || {},
			UserId = query.UserId,
			AccessToken = query.AccessToken;

		if(UserId&&AccessToken){
			//过滤参数重复问题
			if(AccessToken && Array.isArray(AccessToken) && AccessToken.length > 1){
				AccessToken = AccessToken[0]
			}
			if(UserId && Array.isArray(UserId) && UserId.length > 1){
				UserId = UserId[0]
			}
			
			if(UserId=='nil'&&AccessToken=='nil'){
				if(sess.USER){
					sess.USER=undefined;
				}
			}else{
				if(!sess.USER){
					sess.USER={
						UserId:UserId,
						AccessToken:AccessToken
					};
				}else{
					if(sess.USER.AccessToken!=AccessToken||sess.USER.UserId!=UserId){
						sess.USER={
							UserId:UserId,
							AccessToken:AccessToken
						}
					}
				}
			}
		}*/
		next();
	},
	/**
	 * 检查是否登录
	 * 如果没有登录则返回600直接加载登录页面
	 *  在页面中做了过滤器会拦截所以600错误请求
	 */
	checkLogin:function(req,res){
		var user = utils.getUserInfo(req),
			code = 200,
			msg = "",
			data = {
				isLogin:true
			};
		if (!utils.validateUser(req)) {
			code = 600;
			//msg = "";
			data.isLogin = false;
		}
		res.send({
			Code:code,
			Msg:msg,
			Data:data
		});
	},
	/**
	 * 判断是否登录
	 * @param {string} own 如果传递为1，则为自己处理，
	 * 直接返回601，在页面中做了过滤器会拦截所以601错误请求，
	 * 会直接打开登录操作
	 * 否则返回JSON接口，让前端根据是否登录做相应处理
	 */
	isLogin:function(req,res){
		var user = utils.getUserInfo(req),
			code = 200,
			msg = "",
			data = {
				isLogin:true,
				UserId:(user||{}).UserId
			},errCode = req.query["own"] == 1 ? 201 : 600;
		if (!utils.validateUser(req)) {
			code = errCode;
			//msg = "";
			data.isLogin = false;
		}else{
			data.UserId = user.UserId
		}
		res.send({
			Code:code,
			Msg:msg,
			Data:data
		});
	},
	userCenter:function(req,res){
		var viewObj=config.viewModule,
		user = utils.getUserInfo(req);

		viewObj.isIphone = userAgentUtil.isIphone(req);
		viewObj.isAndroid = userAgentUtil.isAndroid(req);
		if(user){
			viewObj.userid=user.UserId;
			res.render('user',viewObj)
		}else{
			//未登陆
			res.redirect(config.urlModel.toLogin)
		}
		
	},

	/*
		用户收货地址列表
		by xiaokang
		date 14/9/11
	*/
	AddressList:function(req,res){
		var viewObj=config.viewModule,
			user = utils.getUserInfo(req);

		if(user){
			viewObj.userid=user.UserId;
			res.render('address_list',viewObj)
		}else{
			//未登陆
			res.redirect(config.urlModel.toLogin)
		}		
	},

	/*
		添加用户收货地址
		by xiaokang
		date 14/9/11
	*/
	addressAdd:function(req,res){
		
		var viewObj=config.viewModule,
			user = utils.getUserInfo(req);

		if(user){

			viewObj.userid=user.UserId;

			res.render('address_add',viewObj)

		}else{
			//未登陆
			res.redirect(config.urlModel.toLogin)

		}
	},

	post_addressAdd:function(req,res){

	},

	/*
		修改用户收货地址
		by xiaokang
		date 14/9/11
	*/
	addressEdit:function(req,res){
		var viewObj=config.viewModule,
			user = utils.getUserInfo(req);

		if(user){
			viewObj.userid=user.UserId;

			res.render('address_edit',viewObj)

		}else{

			//未登陆
			res.redirect(config.urlModel.toLogin)

		}
	},

	/*
		用户所有订单
		
	*/
	allOrder:function(req,res){
		var viewObj=config.viewModule,
		user = utils.getUserInfo(req);

		if(user){
			viewObj.userid=user.UserId;
			viewObj.isIphone = userAgentUtil.isIphone(req);
			viewObj.isAndroid = userAgentUtil.isAndroid(req);
			res.render('user_orders',viewObj);
		}else{
			//未登陆
			res.redirect(config.urlModel.toLogin)
		}

	},

	getExpressInfo:function(req,res){

		//还未加用户判断
		var viewObj=config.viewModule;

		res.render('expressInfo',viewObj)
	},

	/*
		检测用户购物车或匿名用户是否存在是否存在
		by xiaokang
		date 14/9/4
	*/
	isShoppingCartId:function(req,obj,callback){
		var user = utils.getUserInfo(req);
		if(!user.AccessToken && req.cookies.ShoppingCartId){
			user.ShoppingCartId = req.cookies.ShoppingCartId;
		}
		callback(user);
	},

	/*注册协议*/
	protocol:function(req,res){
		res.render('protocol', config.viewModule);
	},
	/*
	* 优惠券列表
	*
	*/
	getCouponList:function(req,res){
		var user = utils.getUserInfo(req),data;
		if(user){
			data = {
				AccessToken:user.AccessToken
			}
		}else{
			res.send("用户未登录");
		}
		productProxy.getCouponList(data, function(result) {
			config.viewModule.data = result.Data;
			//日期格式化
			config.viewModule.format = function(date){
				var dates = date.split("-");
				return dates[0]+"年"+dates[1]+"月"+dates[2].split(" ")[0]+"日";
			}
			res.render(path.normalize("coupon/list"), config.viewModule);
		})
	},
	/**
	 * 绑定优惠券
	 * @param
	 * 	{
		  "ProductsAmount": [
		    {
		      "CatalogId": "sample string 1",
		      "ProductId": "sample string 2",
		      "Quantity": 3
		    },
		    {
		      "CatalogId": "sample string 1",
		      "ProductId": "sample string 2",
		      "Quantity": 3
		    }
		  ],
		  "SellerId": 1,
		  "CouponCode": "sample string 2"
		}
	 *	@return 
		{
		  "Code": 1,
		  "Msg": "sample string 2",
		  "Data": {
		    "Status": 1,
		    "Coupon": {
		      "Value": "sample string 1",
		      "Type": 2
		    }
		  }
		}
	 */
	couponBind:function(req,res){
		var user = utils.getUserInfo(req);
		formUtil.fields(req, function(field) {
			field.AccessToken = user.AccessToken;
			UserProxy.couponBind(field,function(result){
				res.send(result)
			})
		})		
	},
	/**
	 * 发送绑定手机验证码
	 * @param  {
				  "Phone": "sample string 1"
				}
	 * @return {[type]}     [description]
	 */
	sendBindMobileValidateCode:function(req,res){
		var data = utils.getUserInfo(req) || {};			
		formUtil.fields(req, function(field) {
			field.AccessToken = data.AccessToken;
			UserProxy.sendBindMobileValidateCode(field,function(result){
				res.send(result);
			})
		})
	
	},
	verifyBindMobileValidateCode:function(req,res){
		var data = utils.getUserInfo(req) || {};		
		formUtil.fields(req, function(field) {
			field.AccessToken = data.AccessToken;
			UserProxy.verifyBindMobileValidateCode(field,function(result){
				res.send(result);
			})
		})
		
	},
	bindMobile:function(req,res){
		var data = utils.getUserInfo(req) || {};		
		formUtil.fields(req, function(field) {
			field.AccessToken = data.AccessToken;
			UserProxy.bindMobile(field,function(result){
				res.send(result);
			})
		})
	
	},
	hasBoundMobile:function(req,res){
		var data = utils.getUserInfo(req) || {};
		UserProxy.hasBoundMobile(data,function(result){
			res.send(result)
		});
	}

}
