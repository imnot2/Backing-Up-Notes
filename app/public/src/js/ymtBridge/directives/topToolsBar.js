/**
 * 微信顶部工具条
 *
 */
core.directive('topToolsBar', ['$window', 'YmtApi', 'utils',
	function ($window, YmtApi, utils) {
		return {
			restrict: 'E',
			template: [
				'<div class="navbar-inner">',
				'<i class="icon-back navbar-back" ng-click="goBack()"></i>',
				'<h2 class="navbar-title">',
				'{{title}}',
				'</h2>',
				'</div>',
			].join(''),
			link: function ($scope, $ele, $attrs) {
				if (YmtApi.isWechat) {
					var search = utils.common.parseUrl($window.location.href);

					$scope.goBack = function () {
						$window.history.back();
					}
					$scope.title = decodeURIComponent(search['title'] || '');

				}
				else {
					$ele.remove();
				}
			}
		}
	}
]);