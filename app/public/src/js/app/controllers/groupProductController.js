/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/*
 *  每日团
 */
ymtapp.controller('GroupProductController', ['$scope', '$window', 'GroupProduct', 'ProductService',
	function ($scope, $window, GroupProduct, ProductService) {
		$scope.GroupProductLists = GroupProduct;
		$scope.toProduct = ProductService.toProduct;
	}
])