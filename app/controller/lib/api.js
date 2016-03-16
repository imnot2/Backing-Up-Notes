'use strict';
/*Proxy*/
var commonProxy = require('../../proxy').Common;
var productProxy = require('../../proxy').Product;
var userProxy = require('../../proxy').User;
var config = require('../../config');
var ShoppingCartProxy = require('../../proxy').ShoppingCart;
/*Controller*/
var userController = require('./user');
/*Util*/
var utils = require('../../util');
var formUtil = utils.Forms;
var imgSizeUtil = utils.ImgSize;
var cityUtil = utils.City;
var userAgentUtil=utils.userAgent;

module.exports = {

	/*
		@name 	: 获取头部banner
		@params	: bid			:栏目海报[整点,-全球热]
	*/
	getBanner: function(req, res) {

		var type = req.query.bid || 0;
		commonProxy.bannerList(type, function(result) {
			res.send(result);
		})
	},


	/*
		@name	: 获取热卖商品列表
		@params	: page			: 分页ID
		@date 	: 
	*/
	hotProduct: function(req, res) {

		var page = req.query.page || 0;

		productProxy.hotProductList(page, req.query.keyword, function(result) {
			res.send(result)
		})
	},


	/*
		@name	: 按分类标签获取商品列表
		@params	: page			: 分页ID
				  cat 			: [object]分类名称 [衣帽间,吃货控,美妆大人,妈咪宝贝,日用品]
		@date 	: 
	*/
	prodcutCategory: function(req, res) {
		var data = {};
		data.page = req.query.page || '',
		data.catId = req.query.catId || '';
		data.tabId = req.query.tabId || '';
		productProxy.categoryProductList(data, function(result) {
			res.send(result);
		});
	},



	/*
		@name	: 获取首页点档商品列表
		@params	: null	
	*/
	homeProduct: function(req, res) {
		var user = utils.getUserInfo(req);
		var userObj = {}

		if (utils.validateUser(req)) {
			userObj.AccessToken = user.AccessToken;
		}
		productProxy.homeProduct(userObj, function(result) {
			res.send(result);
		});
	},

	/*设置商品提醒*/
	setProductRemind: function(req, res) {
		var user = utils.getUserInfo(req);
		if (!req.query.action || !req.query.ProductId || !req.query.StartTime) {
			res.send({
				Code:201,
				Msg:'参数错误，请刷新后再试'
			})
			return false;
		}

		if (!utils.validateUser(req,res)) {
			return false;
		}

		var type = req.query.action;
		var ProductObj = {
			USER: user,
			ProductId: req.query.ProductId,
			StartTime: req.query.StartTime
		}

		productProxy.setProductRemind(type, ProductObj, function(resultSet) {
			res.send(resultSet);
		})
	},

	/*
		@name 	:获取商品详情
		@params :
	*/

	getproductdetail: function(req, res) {
		var user = utils.getUserInfo(req);
		var data = {
			productid: req.param('productid'),
			AccessToken: user.AccessToken
		}
		
		productProxy.getproductdetail(data, function(result) {
			res.send(result);
			
		})

	},

	/*
		@name  		: 添加购物车
		@params		: UserId						: 用户ID (无则不传)
					  ShoppingCartId 				: 购物车ID (无则不传)
					  UserIp 						: 用户IP
					  SellerId 						: 卖家ID
					  SellerName 					: 卖家名称
					  CatalogInfo					: {object}商品规格类型
					  	-CatalogId 					: 商品规格ID
					  	-ProductId 					: 商品ID
					  	-ProductName				: 商品名称
					  	-PictureUrl  				: 商品图片地址
					  	-QuotePrice					: 规格价格
					  	-ProductNumber 				: 商品数量
					  	-Freight 					: 商品运费
					  	-Selectd 					: 商品是否被选中
					  	-CatalogAddTime 			: 添加购物车时间
					  	-CatalogPropertyList		: [array]规格属性类型
					  		-Property 				: 属性名称
					  		-PropertyId 	 		: 属性名ID
					  		-PropertyAttribute		: 属性值
					  		-PropertyAttributeId 	: 属性值ID
					  		-PropertyAttributePic 	: 属性图片
		@date 		: 14/9/3 15:25
	*/
	AddCatalog: function(req, res) {
		formUtil.fields(req, function(field) {
			userController.isShoppingCartId(req, field, function(resultData) {
				resultData = utils.extends(resultData,field);
				productProxy.AddCatalog(resultData, function(result) {
					if (result && result.Code == '200') {
						var shoppingId = req.cookies.ShoppingCartId;
						//如果返回了购物车编号且cookie中没有购物车编号或者编号为undefined或null
						if (result.Data.ShoppingCartId && 
								(!shoppingId ||  shoppingId && (shoppingId == 'null' || shoppingId == 'undefined') )) {
							res.cookie('ShoppingCartId', result.Data.ShoppingCartId, {httpOnly: true});
						}
					} 
					res.send(result);
				})

			})
		})
	},

	/*
		@name 		: 删除购物车
		@params		: SellerId          :卖家ID
					  CatalogId         :商品ID
					  ShoppingCartId    :匿名购物车ID
					  UserIp            :用户ip
		@date 		: 14/9/4 16:21
	*/
	deleteCatalog: function(req, res) {
		formUtil.fields(req, function(field) {
			field.AccessToken = utils.getUserInfo(req).AccessToken;
			productProxy.deleteCatalog(field, function(result) {
				res.send(result);
			});
		});
	},

	/*
	@TODO 现在购物车merge操作已经被购物车服务化合并，后续这个接口可以移除
		@name 		: 合并购物车
		@params 	: ShoppingCartId 	: 未登陆购物车ID
					  UserId            : 用户ID
					  UserIp 			: 用户IP
		@date 		: 14/9/4 18:05
	*/
	MergeCart: function(req, callback) {
		var user = utils.getUserInfo(req);
		if (req.cookies.ShoppingCartId) {

			var postDate = {
				AccessToken: user.AccessToken,
				ShoppingCartId: req.cookies.ShoppingCartId,
				UserIp: req.ip
			}

			productProxy.MergeCart(postDate, function(result) {
				callback(result)
			})
		} else {
			callback('null')
		}
	},


	/*
		@name 		: 更新购物车所有商品选中状态
		@params 	: ShoppingCartId 		: 购物车ID
					  Selected 				: 是否选中
					  UserIp				: 用户IP
		@date  		: 14/9/4 19:00
	*/
	changeAllSelected: function(req, res) {
		formUtil.fields(req, function(field) {
			field = utils.extends(field,utils.getUserInfo(req));
			ShoppingCartProxy.changeAllSelected(field, function(result) {
				res.send(result);
			});
		});
	},

	/*
		@name 		: 更新购物车单个卖家所有商品选中状态
		@params 	: ShoppingCartId 		: 购物车ID
				      ShllerId				: 卖家ID
				      Selerted 				: 是否选中
				      UserIp				: 用户IP
		@date 		: 14/9/4 19:00
	*/
	ChangeSellerSelected: function(req, res) {
		formUtil.fields(req, function(field) {
			field = utils.extends(field,utils.getUserInfo(req));
			productProxy.ChangeSellerSelected(postdata, function(result) {
				res.send(result);
			});
		});
	},

	/*获取优惠券*/
	getCoupons: function(req, res) {

		var postObj,
		user = utils.getUserInfo(req);

		formUtil.fields(req, function(field) {

			postObj = field;
			postObj.AccessToken = user.AccessToken;
			productProxy.getCoupons(postObj, function(resultCoupons) {
				res.send(resultCoupons)
			})

		})

	},
	/*
		@name 			: 更新购物车单个商品选中状态
		@params 		: ShoppingCartId 			: 购物车ID
						  SellerId 					: 卖家ID
						  CatalogId 				: 商品规格ID
						  Selected 					: 是否被选中
						  UserIp					: 用户IP
		@date 			: 14/9/4 19:24
	*/
	changeCatalogSelected: function(req, res) {
		formUtil.fields(req, function(field) {
			field.AccessToken = utils.getUserInfo(req).AccessToken;
			ShoppingCartProxy.changeCatalogSelected(field, function(result) {
				res.send(result);
			});
		})
	},
	/*
	 * 变更购物车商品数量
	 * @params AccessToken
	 *         ShoppingCartid
	 *         cartid
	 *         catalogNum
	 *
	 */
	changeCatalogNum: function(req, res) {
		formUtil.fields(req, function(field) {
			field.AccessToken = utils.getUserInfo(req).AccessToken;
			productProxy.ChangeCatalogNum(field, function(result) {
				res.send(result);
			})
		});		
	},


	/*
		根据购物车获取待下单信息
	*/
	getListOrderInfo: function(req, res) {
		
		if (!utils.validateUser(req,res)) {
			return false;
		}

		var user = utils.getUserInfo(req);

		productProxy.getListOrderInfo(user, function(result) {
			res.send(result);
		})
	},


	/*保存订单*/
	SaveOrder: function(req, res, next) {
		var user = utils.getUserInfo(req);

		if (!utils.validateUser(req,res)) {
			return false;
		}

		var ClientType = userAgentUtil.isIphone(req)?1:userAgentUtil.isAndroid(req)?2:0;

		formUtil.fields(req, function(field) {
			field.AccessToken = user.AccessToken;
			field.UserIp = utils.getIp(req);
			field.Channel = req.query["User-Agent"] || "";
			field.ClientType = ClientType;
			productProxy.SaveOrder(field, function(result) {
				res.send(result);
			});

		})

	},

	getCityList: function(req, res) {
		res.send(cityUtil);
	},

	getAddressList: function(req, res) {
		var user = utils.getUserInfo(req);
		if (!utils.validateUser(req,res)) {
			return false;
		}

		var data = {
			AccessToken: user.AccessToken
		}

		userProxy.userAddressList(data, function(result) {
			res.send(result)
		})
	},

	/*
		@name 		: 获取单个收货地址
		@params 	: AddressId 		收货地址Id
		@date 		: 14/9/12
	*/
	userAddressOne: function(req, res) {
		var user = utils.getUserInfo(req);

		if (!utils.validateUser(req,res)) {
			return;
		}

		if (!req.query.AddressId) {
			res.send('收货地址编号不正确')
		}

		var addressOjb = {
			AccessToken: user.AccessToken,
			addressId: req.query.AddressId
		}

		userProxy.userAddressOne(addressOjb, function(resultAddressOne) {
			res.send(resultAddressOne)
		});
	},

	/*
		@name  	 : 添加收货地址
		@params  : AccessToken  		  用户ID
				   ProvinceName   省份名称
				   CityName       城市名称
				   DistrictName   行政区域名称
				   Details 		  详细地址信息
				   PostCode 	  邮编
				   Mobile 		  联系手机
				   Recipient 	  收货人姓名
				   Email 		  联系邮箱
				   IsDefault  	  是否设置默认
		@date    : 14/9/12
	*/
	addAddress: function(req, res) {
		var user = utils.getUserInfo(req);

		if (!utils.validateUser(req,res)) {
			return false;
		}

		formUtil.fields(req, function(field) {

			field.AccessToken =user.AccessToken;

			userProxy.addUserAddress(field, function(result) {
				res.send(result);
			});
		})
	},

	editAddress: function(req, res) {
		var user = utils.getUserInfo(req);

		if (!utils.validateUser(req,res)) {
			return false;
		}

		formUtil.fields(req, function(field) {

			field.AccessToken = user.AccessToken;

			userProxy.editAddress(field, function(result) {
				res.send(result);
			});
		})

	},

	/*
		@name  	 : 删除收货地址
		@params  : AccessToken  		  用户ID
				   AddressId      地址ID编号
		@date    : 14/9/12
	*/
	delAddress: function(req, res) {
		var user = utils.getUserInfo(req);
		
		if (!utils.validateUser(req,res)) {
			return false;
		}

		formUtil.fields(req, function(field) {

			field.AccessToken = user.AccessToken;

			userProxy.delAddress(field, function(result) {
				res.send(result);
			});
		})
	},


	/*
		@name 	: 获取订单列表
		@params : UserId		用户ID
				  OrderNum 		返回订单数量
				  OrderType     订单类型 1、等待支付 2、等待收货 3、完成的订单 4、全部订单
				  LastOrderId   上次请求最后的订单
		@date   : 14/9/15
	*/
	getUserOrderList: function(req, res) {
		var user = utils.getUserInfo(req);
		
		if (!utils.validateUser(req,res)) {
			return false;
		}

		var Orders = {
			AccessToken: user.AccessToken,
			OrderNum: req.query.page ? req.query.page : 10,
			OrderType: req.query.orderType ? req.query.orderType : 4,
			LastOrderId: req.query.lastOrder ? req.query.lastOrder : ''
		}
		userProxy.userOrdersList(Orders, function(resultDate) {
			res.send(resultDate)

		})
	},



	/*
		@name 	:获取用户信息
		@params	:
		@data 	: 14/9/10
	*/
	getUserInfo: function(req, res) {

		var user = utils.getUserInfo(req);
		
		if (!utils.validateUser(req,res)) {
			return false;
		}

		userProxy.ProfileInfo(user, function(resultUserInfo) {
			res.send(resultUserInfo)
		})
	},

	getTrading: function(req, res) {
		var user = utils.getUserInfo(req);

		var data = {
			AccessToken: user.AccessToken,
			OrderId: req.query.orderId
		}
		productProxy.getTrading(data, function(resultTrading) {
			res.send(resultTrading)
		})

	},

	getExpressInfo: function(req, res) {
		var user = utils.getUserInfo(req);
		
		if (!utils.validateUser(req,res)) {
			return false;
		}

		if (!req.query.oid) {
			res.send('订单号无效');
			return 0;
		}

		var expressObj = {
			USER: user,
			OrderId: req.query.oid
		}

		userProxy.getExpressInfo(expressObj, function(resultExpress) {
			res.send(resultExpress)
		})
	},

	/*
		提交意见反馈
	*/
	saveFeedback: function(req, res) {
		var user = utils.getUserInfo(req);
		var data = {
			AccessToken: user.AccessToken,
		}
		formUtil.fields(req, function(resultForm) {
			data.Content = resultForm.Content;
			commonProxy.saveFeedback(data, function(result) {
				res.send(result)
			})

		})
	},

	/*
	*	服务端时间
	*/
	getServerTime: function(req, res) {
		var dates = new Date().getTime();
		res.send({
			times: dates
		});
	},
	/**
	 * 检查用户是否登录
	 */
	checkUserLogin: function(req, res) {
		var user = utils.getUserInfo(req);
		res.send({
			userLogin: !!user,
			AccessToken: user.AccessToken
		})
	},
	/*确认收货*/
	receive: function(req, res) {
		var data = req.query;
		var user = utils.getUserInfo(req);
		if (user) {
			data.AccessToken = user.AccessToken;
		}
		productProxy.Receive(data, function(result) {
			res.send(result);
		})
	},
	/*
	*  每日团
	*/
	getGroupProductList:function(req, res){
		var data = {
			size:req.query.size,
			page:req.query.page
		}
		productProxy.getGroupProductList(data,function(result){
			res.send(result);
		})
	},
	/*
	* 首页整点抢
	*/
	getHomeHourlyProductList:function(req,res){
		productProxy.getHomeHourlyProductList({},function(result){
			var HourProduct = result.Data.HourProduct,
				resultAttr = [],
				i=0,j=0;
			for(len=HourProduct.length;i<len;i++){
				for(j=0,l=HourProduct[i].Products.length;j<l;j++){
					HourProduct[i].Products[j].Date = HourProduct[i].Date;
					resultAttr.push(HourProduct[i].Products[j])
				}
			}
			res.send({
				Code:"200",
				Data:resultAttr
			});
		})
	},
	/*
	* 获得商品详情
	* @createDate 2014/01/08
	* @cerater river
	* @email lijiang@ymatou.com
	*/
	getBasicProductInfo:function(req,res){
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
	* 获得卖家信息
	*
	*/
	getBuyerInfo:function(req,res){
		var sellerId = req.param('sellerId')
		productProxy.getBuyerInfo(sellerId,function(result){
			res.send(result);
		})
	},
	/*
	* 变更运费
	*/
	changeAddress:function(req,res){
		var user = utils.getUserInfo(req);
		var data = {
			AccessToken: user.AccessToken
		}
		formUtil.fields(req, function(resultForm) {
			data.orders = resultForm;
			productProxy.changeAddress(data, function(result) {
				res.send(result)
			})

		})
	},
	/*
	* 获得优惠券
	*/
	getCouponsSummary:function(req,res){
		var user = utils.getUserInfo(req);
		if(!utils.validateUser(req)){
			res.send({
				Code:'200',
				Data:null
			})
			return;
		}
		
		var data = {
			AccessToken: user.AccessToken
		}
		productProxy.getCouponsSummary(data, function(resultCoupons) {
			//防止token过期，触发登录
			if(resultCoupons.Code == 600){
				res.send({
					Code:200,
					Data:{
						Quantity:0
					},
					Msg:''
				});
			}else{
				res.send(resultCoupons);
			}
		})

	},
	/*
	* 重定向
	* 用于当前客户端只识别forymatouapp地址，导致其他站点不能直接和客户端
	* 交互，所以采用重定向方式来进行客户端交互之后进行跳转
	* @param {string} url           重定向的地址
	*        {string} hostname      重定向host 默认为主站
	*        {number} addAuth [0|1] 是否添加认证
	*
	**/
	redirect: function(req, res) {
		var url = (req.query.url),
			query = "",
			addAuth = req.query.addAuth,
			authStr=[];
			console.log(req.url)
		if (!url) {
			res.send("参数错误")
			return;
		}
		var userInfo = utils.getUserInfo(req);
		//判断是否增加认证信息	
		if(addAuth == 1 && userInfo.AccessToken){			
			authStr.push('AccessToken=' + userInfo.AccessToken);
			authStr.push('UserId=' + userInfo.UserId);
			query = (/\?/.test(url) ? '&':'?') + authStr.join('&');
			//判断是否有存在锚点，有就替换且在query后面追加#
			if(/#/.test(url)){
				url.replace('#',query+'#');
			}else{
				url += query;
			}
		}	
		if(url.substr(0,1)  != '/' && url.substr(0,7) != 'http://'){
			url = '/'+url;
		}
		console.log(url)
		res.redirect('http://' + (req.query.hostname || config.redirectHostName) + url);
	},
	getConfig:function(req,res){
		var configInfo = config.shareInfo;
		var user = utils.getUserInfo(req);
		if(!utils.validateUser(req,res)){
			return;
		}
		var data = {
			AccessToken: user.AccessToken,
		}

		commonProxy.getShareInfo(data,function(result){
			if(result.Data){
				result.Data = utils.extends(result.Data,configInfo);
			}
			res.send(result)
		})
	}
}