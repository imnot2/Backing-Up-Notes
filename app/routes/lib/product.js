var ProductController=require('../../controller').Product;
var routers = [{
		url: '/pid',
		method: 'get',
		ctrl: ProductController.renderProduct
	},{
		url: '/pid1',
		method: 'get',
		ctrl: ProductController.renderProduct
	}, {
		url: '/:pid/info',
		method: 'get',
		ctrl: ProductController.renderProductInfo
	}, 
	{
		url:'/:productId/detail',
		method: 'get',
		ctrl:ProductController.getProductDetail
	}, 
	{
		url:'/:productId/description',
		method: 'get',
		ctrl:ProductController.getProductDescription
	},{
		url:'/:productId/remindStatus',
		method:'get',
		ctrl:ProductController.getRemindStatus
	},{
		url:'/search',
		method:'post',
		ctrl:ProductController.searchProducts
	},{
		url:'/filterBrands',
		method:'post',
		ctrl:ProductController.filterBrands
	},{
		url:'/filterCategories',
		method:'post',
		ctrl:ProductController.filterCategories
	},{
		url:'/jump/:pid',
		method: 'get',
		ctrl: ProductController.jump
	}	
]
module.exports = routers;