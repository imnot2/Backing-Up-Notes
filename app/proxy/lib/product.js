var requestUtil = require('../../util').Request;
var config          = require('../../config');
var http            = require('http');

/**
 * 增加认证参数
 * @return {string} [description]
 */
function getAuthParam (data){
	var paramStr = [];
	if (data.AccessToken) {
		paramStr.push('AccessToken=' + data.AccessToken);
	}
	return paramStr.join('&');
}


module.exports={

	/*
		@name	: 获取热卖的商品列表
		@author	: 阿杜
		@param	: page default 0
	*/
	hotProductList:function(page, keyword, callback){
		var path = '/api/product/HotProductList?page='+page;
		if(keyword){
			path += '&keyword='+encodeURIComponent(keyword)
		}
		requestUtil.get(path,function(result){
			callback(result);
		});
	},
	/*
		@name	: 按分类标签获取商品列表
		@author	: 阿杜
		@param	: page default 0  |  Tab  0->4  -衣帽间,吃货控,美妆大人,妈咪宝贝,日用品
	*/
	categoryProductList:function(data,callback){
		requestUtil.get('/api/product/ProductListByCategory?Tab='+data.tabId
				+'&PageIndex='+data.page+'&CategoryIds='+data.catId,callback)
	},
	/*
		@name	: 获取首页点档商品列表
		@author	: 阿杜
	*/
	homeProduct:function(userObj,callback){
		var userParams = '';

		if(userObj){
			userParams= '?'+getAuthParam(userObj);
		}

		requestUtil.get('/api/product/HourlyProductList'+userParams,function(result){
			callback(result);
		});
	},

	/*
		@name	: 删除和新增商品提示
		@author	: 阿杜
		@params : type      		类型 add:添加提醒  cancel:取消提示
				  ProductObj 		数据对象
				  	ProductId   	商品ID
				  	StartTime 		商品开始时间
	*/
	setProductRemind:function(type,productObj,callback){
		var path;
		if(type === 'add'){
			path='/api/product/AddProductRemind'
		}else if(type === 'cancel'){
			path='/api/product/CancelProductRemind'
		}	

		path += '?' + getAuthParam(productObj.USER);

		requestUtil.post(path,productObj,callback)
	},

	/*4.	获取商品详情
	*/
	getproductdetail:function(data,callback){
		requestUtil.get('/api/product/ProductDetail?productid='
				+data.productid+'&'+getAuthParam(data),callback)
	},
	
	/*添加购物车*/
	AddCatalog:function(data,callback){
		requestUtil.post('/api/shoppingCart/AddCatalog?'+getAuthParam(data),data,callback)
	},

	/*删除购物车*/
	deleteCatalog:function(data,callback){
		requestUtil.post('/api/shoppingcart/RemoveCatalog?'+getAuthParam(data),data,callback)
	},


	/*合并购物车*/
	MergeCart:function(data,callback){
		requestUtil.post('/api/shoppingcart/MergeCart',data,callback)
	},

	/*更新购物车单个卖家所有商品选中状态*/
	ChangeSellerSelected:function(data,callback){
		requestUtil.post('/api/shoppingcart/ChangeSellerSelected?'+getAuthParam(data),data,callback)
	},
	
	/*更新购物车单个商品数量*/
	ChangeCatalogNum:function(data,callback){
		requestUtil.post('/api/shoppingcart/ChangeCatalogNum?'+getAuthParam(data),data,callback)
	},

	/*根据购物车获取待下单信息*/
	getListOrderInfo:function(UserObj,callback){
		requestUtil.get('/api/preorder/ListOrderInfo?'+getAuthParam(UserObj),callback)
	},
	/*
		@name 	: 获取购物券类型
		@author	: 四有
		@parmas : 
		@date 	: 14/9/18
	*/
	getCoupons:function(productObj,callback){
		requestUtil.post('/api/preorder/ListAvailableCoupons?'+getAuthParam(productObj),productObj,callback)
	},

	/*通过order获取付款单号*/
	getTrading:function(orderObj,callback){
		requestUtil.post('/api/Order/GenerateTradingByOrder?'+getAuthParam(orderObj),orderObj,callback)
	},

	//根据交易号获取需要的上传身份证信息
	TradingId:function(TradingObj,callback){
		requestUtil.get('/api/IdCardManage/GetRecipientByTradingId?'
				+getAuthParam(TradingObj)
				+'&UserId='+TradingObj.UserId
				+'&TradingId='
				+TradingObj.Trading,callback);
	},

	/**
	 * 保存订单
	 * @param {[type]}   data     [description]
	 * @param {Function} callback 回调方法
	 */
	SaveOrder:function(data,callback){
		requestUtil.post('/api/preorder/SaveOrder?'+getAuthParam(data),data,callback)
	},
	/*确认收货*/
	Receive:function(data,callback){
		requestUtil.post('/api/Order/Receive?'+getAuthParam(data),data,callback)
	},
	getGroupProductList:function(data,callback){
		requestUtil.get('/api/product/GroupProductList?page='
				+data.page+'&size='+data.size+'&current=1',callback)
	},
	/*
	* 获得用户优惠券
	*/
	getCouponList:function(data,callback){
		requestUtil.get('/api/coupon/list?'+getAuthParam(data),callback)
	},
	/*
	* 获得商品详情
	* @param {object}
	* 		ProductId
	*
	*/
	getBasicProductInfo:function(data,callback){
		requestUtil.get('/api/product/BasicProductInfo?ProductId='
				+data.ProductId+'&'+getAuthParam(data),callback);
	},
	/**
	 * 获得卖家信息
	 * @param  {string}   sellerId [description]
	 * @param  {Function} callback [description]
	 */
	getBuyerInfo:function(sellerId,callback){
		requestUtil.get('/api/product/BuyerInfo?sellerId='+sellerId,callback)
	},
	changeAddress:function(data,callback){
		requestUtil.post('/api/PreOrder/ChangeAddress?'+getAuthParam(data),data.orders,callback)
	},
	/**
	 * 获得有效优惠券总数
	 * @param  {string}   data     [description]
	 * @param  {Function} callback [description]
	 */
	getCouponsSummary:function(data,callback){
		requestUtil.get('/api/Coupon/Summary?'+getAuthParam(data),callback)
	},
	/**
	 * 获得商品详情
	 * @param  {object}   data     [description]
	 * @param  {Function} callback [description]
	 */
	getProductDescription:function(data,callback){
		requestUtil.get('/api/product/ProductDescription?ProductId='
				+data.ProductId,callback)
	},
	/**
	 * 获得商品的提醒状态
	 * @param  {object}   data     [description]
	 * @param  {Function} callback [description]
	 */
	getRemindStatus:function(data,callback){
		requestUtil.get('/api/Product/ProductRemindInfo?ProductId='
				+data.ProductId+'&'+getAuthParam(data),callback)
	},
	/**
	 * 搜索商品
	 * @param  {object}   data     [description]
	 * @param  {Function} callback 回调
	 */
	searchProducts:function(data,callback){
		var pageIndex = data.pageIndex,
			pageSize = data.pageSize;
		delete data.pageIndex;
		delete data.pageSize;
		requestUtil.post('/api/ProductSearch/Products?pageIndex='+pageIndex+'&pageSize='+pageSize,data,callback)
	},
	/**
	 * 过滤品牌
	 * @param {object} param 
	 *        {string} keywords 关键字
	 */
	filterBrands:function(data,callback){
		requestUtil.post('/api/ProductSearch/FilterBrands',data,callback);
	},
	/**
	 * 过滤分类
	 * @param {object} param 
	 *        {string} keywords 关键字
	 */
	filterCategories:function(data,callback){
		requestUtil.post('/api/ProductSearch/FilterCategories',data,callback);
	}

}