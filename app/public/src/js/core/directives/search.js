/**
 * 搜索
 */
core.directive('search', ['$window','searchService',
	function ($window,searchService) {
		return {
			restrict: 'E',
			template:[
				'<div class="search-wrap" ios-input-panel-position>',
					'<em class="logo icon icon-home-logo"></em>',
					'<div class="input-wrap" ng-class="{focus:isfocus || search.keyword}">',
						'<input type="text" placeholder="购在全球 我们只做洋货" ng-focus="isfocus = true" ',
							'ng-blur="isfocus = fasle" ymt-placeholder-leave="search.keyword"  maxlength="16" ng-model="search.keyword">',
						'<em class="icon icon-home-search"></em>',
						'<em class="icon icon-shut-round ng-cloak" ng-if="search.keyword" ng-click="search.clearKeyword()"></em>',
						'<button type="button hide" ng-click="search.toSearch()"></button>',
					'</div>	',		
				'</div>'	
			].join(''),
			link: function (scope, ele) {
				scope.search = searchService;				
			}
		};
	}
]);