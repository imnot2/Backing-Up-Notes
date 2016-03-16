'use strict';
/**
 * 用于grunt合并javascript脚本
 */
var path = 'src/js/';

var ymtappFiles = [
	path + '_part/ymtapp.prefix',
 	path + 'vendor/jquery-1.8.2.min.js',
	path + 'vendor/angular.min.js',
	path + 'vendor/ng-infinite-scroll.min.js',
	path + 'vendor/angular-touch.min.js',
	path + 'vendor/swiper.min.js',
	path + 'module.prefix',//前缀文件
	path + 'core/module.js',
	path + 'core/services/utils.js',
	path + 'core/services/ls.js',
	path + 'core/services/BIStatistics.js',
	path + 'core/directives/disabledScroll.js',
	//path + 'core/directives/dropDown.js',
	//path + 'core/directives/downconut.js',
	path + 'core/directives/fixedTop.js',
	path + 'core/directives/sildeSwiper.js',
	path + 'core/directives/textflow.js',
	path + 'core/directives/sideSlide.js',
	path + 'core/directives/ymtStyle.js',
	path + 'core/directives/ymtPlaceholderLeave.js',
	path + 'core/directives/compatible.js',
	path + 'core/directives/search.js',
	//path + 'core/directives/slippage.js',
	//path + 'core/directives/oldNewRecommend.js',
	path + 'core/directives/ImgLazyLoad.js',
	path + 'ymtBridge/module.js',
	path + 'ymtBridge/services/BridgeListen.js',
	path + 'ymtBridge/services/YmtApi.js',
	path + 'ymtBridge/directives/imgBooth.js',
	path + 'ymtBridge/directives/diffShow.js',
	path + 'ymtBridge/directives/topToolsBar.js',
	//path + 'ymtBridge/directives/fixedMenu.js',
	path + '_main.js',
	path + 'app/services/hotProduct.js',
	path + 'app/services/SearchCategoryService.js',
	path + 'app/services/UserOrderList.js',
	path + 'app/services/groupproduct.js',
	path + 'app/services/httpHandlService.js',	
	path + 'app/services/config.js',	
	path + 'app/services/ProductService.js',	
	path + 'app/services/AddressService.js',	
	path + 'app/services/SearchService.js',	
	path + 'app/filters/imageUrlAdaptFilter.js',
	path + 'app/filters/replacePriceHtml.js',
	path + 'app/directives/cheatRemind.js',
	path + 'app/controllers/homeController.js',
	path + 'app/controllers/addressController.js',
	path + 'app/controllers/hotController.js',
	path + 'app/controllers/hoursActivityController.js',
	path + 'app/controllers/expressInfoController.js',
	path + 'app/controllers/feedbackController.js',
	path + 'app/controllers/ordersController.js',
	path + 'app/controllers/ProductItemController.js', 
	path + 'app/controllers/shoppingBagController.js',
	path + 'app/controllers/successfulController.js',
	path + 'app/controllers/userCenterController.js',
	path + 'app/controllers/userOrderController.js',
	path + 'app/controllers/PayListController.js',
	path + 'app/controllers/SearchController.js',
	//path + 'app/controllers/groupProductController.js',
	path + 'module.suffix',//后缀文件
	path + '_part/ymtapp.suffix',
]
	
exports.ymtappFiles = ymtappFiles;

exports.mergeFilesFor = function() {

}
