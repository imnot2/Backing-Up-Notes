/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/*
	Express Info Controller
*/
ymtapp.controller('ExpressInfoController', ['$scope', 'httpHandlService', '$window', 'utils',
	function ($scope, $http, $window, utils) {

		var search = utils.common.parseUrl($window.location.search);

		$scope.expIndex = 0;

		$scope.selectExpress = function (eid) {
			$scope.expIndex = eid;
		};
		if (search && search['tid']) {
			$http.get('/api/getExpressInfo?oid=' + search.tid).success(function (resultExprss) {
				$scope.expressInfo = resultExprss.LogisticsInfo;
			});
		}
		else {
			prompt('无效订单号');
		}

		$scope.removeTag = function(tagStr){
			return (tagStr+'').replace(/<a(.*?)href=("|')(.*?)('|").*?>(.*?)<\/a>/ig,'')
		}
	}
]);