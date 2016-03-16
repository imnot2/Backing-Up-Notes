/* global ymtapp: true,prompt:true,angular:true*/
/* jshint strict: false,latedef:nofunc */
/**
 * 搜索结果页
 * @autor abel
 * @created date 2015/04/15
 */
ymtapp.controller('SearchController', [
	'$scope',
	'$window',
	'httpHandlService',
	'utils',
	'searchService',
	'ProductService',
	function ($scope, $window, http, utils, searchService,ProductService) {

		$scope.search = searchService;

		var param = $scope.param = {
			SortType: 105
		};

		$scope.sequence = 0;
		var _oldAllBrandLists, _oldAllCategorys;

		var search = utils.common.parseUrl($window.location.search);

		var keyword = $scope.search.keyword = decodeURIComponent(search.w || '');


		//筛选步骤
		$scope.screeningStep = '';
		$scope.brandLists = [];

		var selectBrandMap = {};

		$scope.openScreening = function (step) {
			$scope.screeningStep = step;
		};
		$scope.closeScreening = function () {
			$scope.screeningStep = (!!$scope.screeningStep ? 0 : 1);
		};
		//选择分类
		$scope.selectClassify = function (id, name) {
			$scope.classify = name;
			$scope.param.SortIds = [id];
			$scope.openScreening(1);
		};

		$scope.firstLoading = true;
		$scope.toSort = function (inx) {
			if (inx === 104 && param.SortType === 104) {
				$scope.sequence = !$scope.sequence;
			}
			else {
				$scope.sequence = false;
			}
			//0 升 1降
			param.SortType = inx;
			updateResult();
		};

		$scope.selectBrand = function (brand) {
			if (brand.isSelect = !brand.isSelect) {
				selectBrandMap[brand.BrandName] = brand.BrandID;
			}
			else {
				delete selectBrandMap[brand.BrandName];
			}
		};
		$scope.confirmBrand = function () {
			var _temp = [],
				_val = [];
			for (var i in selectBrandMap) {
				_temp.push(i);
				_val.push(selectBrandMap[i]);
			}
			$scope.brandDescLists = _temp;
			$scope.brandLists = _val;
			//selectBrandMap = {};
			//$scope.allBrandLists = _oldAllBrandLists;
			$scope.screeningStep = 1;
		};

		//海外直发、保税区发货、国内现货
		$scope.sendBy = '';
		//商家包邮
		$scope.FreeShipping = 0;
		//商家包税
		$scope.TaxFarming = 0;

		$scope.clear = function () {
			$scope.param = param = {};
			$scope.classify = '';
			$scope.brandDescLists = [];
			$scope.brandLists = [];
			selectBrandMap = {};
			$scope.allBrandLists = _oldAllBrandLists;
			$scope.allCategorys = _oldAllCategorys;
			$scope.dispatchingMap = {};
		};
		$scope.toProduct = ProductService.toProduct;
		
		$scope.gotoAlphabet = function (pos) {
			prompt(pos);
			location.hash = '#/_' + pos;
		};
		//配送方式
		var dispatchingMap = {};
		$scope.dispatchingWay = function (way) {
				if (dispatchingMap[way]) {
					delete dispatchingMap[way];
				}
				else {
					dispatchingMap[way] = 'holle';
				}
			};
			//级联变更
			/*$scope.$watch(function(){
				return $scope.param.CategoryIds;
			},function(n,l){
				if(n)
					searchService.filterBrands();
			});
			$scope.$watch(function(){
				return $scope.param.BrandIds;
			},function(n,l){
				if(n)
					searchService.filterCategories();
			});*/
		$scope.logo = {
			loading: true
		}
		var updateResult = $scope.updateResult = function (isClear) {
			$scope.logo.loading = true;
			param = $scope.param;
			if (isClear) {
				//重新更改关键字 将所有个过滤条件清空
				//$scope.param = param = {};
				$scope.clear();
			}
			else {
				param.SortBy = Number($scope.sequence);
				/*param.SendBy = (function(){
					var _temp = [];
					for(var i in dispatchingMap){
						Array.prototype.push.apply(_temp, i.split(',')); 
					}
					return _temp;
				})();*/
				param.FreeShipping = +param.FreeShipping;
				param.TaxFarming = +param.TaxFarming;
				param.BrandIds = $scope.brandLists;
				param.CategoryIds = $scope.classify;

				searchService.paramData = param;
			}
			param.Keywords = searchService.keyword;

			searchService.paramData = param;

			searchService.filter(function () {
				$scope.logo.loading = false;
			});
			if (isClear) {
				searchService.filterBrands(function (list) {
					_oldAllBrandLists = angular.copy($scope.allBrandLists = list);
				});
				searchService.filterCategories(function (list) {
					_oldAllCategorys = angular.copy($scope.allCategorys = list);
				});
			}

		};

		if (keyword) {
			updateResult(1);
		}
	}
]);