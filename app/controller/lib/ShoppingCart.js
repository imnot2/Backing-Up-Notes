'use strict';
/*
* 购物车
*
*/
var ShoppingCartProxy = require('../../proxy').ShoppingCart;
var utils = require('../../util');

/*
* 获得购物车信息
* @param 
* @return {object} 包含用户信息和shoppingcartId
* 
*/
function getShoppingCartInfo(req){
	 var data = utils.getUserInfo(req);			
	if(req.cookies.ShoppingCartId){
		data.ShoppingCartId=req.cookies.ShoppingCartId;
	}
	return data;
}

module.exports = {
	/*
	* 获得购物车商品的数量
	*	@params : AccessToken 			: 用户ID (无则不传)
	*			  ShoppingCartId 	: 购物车ID (无则不传)
	*	
	*/
	getShoppingCartQty:function(req,res){		
		var data = getShoppingCartInfo(req);
		//当没有登录且没有shoppingcartId,则直接返回0
		if(data.AccessToken || data.ShoppingCartId){
			ShoppingCartProxy.getShoppingCartQty(data,function(result){
				//防止token过期，触发登录
				if(result.Code == 600){
					res.send({
						Code:200,
						Data:{
							Quantity:0
						},
						Msg:''
					});
				}else{
					res.send(result);
				}
				
			});
		}else{			
			res.send({
				Code:200,
				Data:{
					Quantity:0
				},
				Msg:''
			});
		}
		
	},	
	/*
		@name 	: 获取购物车
		@params : AccessToken 			: 用户ID (无则不传)
				  ShoppingCartId 	: 购物车ID (无则不传)
		@date 	: 14/9/4 19:33
	*/
	getshoppingcart: function(req, res) {
		var data = getShoppingCartInfo(req);
		if(data.AccessToken || data.ShoppingCartId){
			ShoppingCartProxy.getshoppingcart(data, function(result) {
				res.send(result);
			});
		}else{
			res.send({
				Code:200,
				Msg:'',
				Data:{
					InvalidNum:0,
					ItemCount:0,
					SelectedAll:false,
					ShoppingCartId:'',
					ShoppingCartInfo:{
   						SellerProducts:[]
					},
					TotalFeight:0,
					TotalPrice:100
				}
			});
		}
		
	},
	getShoppingCartInfo:getShoppingCartInfo,
	/*
	* 获得购物实际价格和运费
	* 之前通过获得购物车数据返回的价格和运费为【不准确】数据
	* 
	*/
	getTotal:function(req,res){
		var data = getShoppingCartInfo(req);
		ShoppingCartProxy.getTotal(data, function(result) {
			res.send(result);
		});
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
			ShoppingCartProxy.changeCatalogSelected(field, function(result) {
				res.send(result);
			});
		})
	},
}
