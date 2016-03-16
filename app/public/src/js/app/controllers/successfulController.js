/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/*
 *	Order Finsh
 */
ymtapp.controller('SuccessfulController', ['$scope', '$window', 'ls', 'httpHandlService', 'utils','YmtApi','userAgent',
	function ($scope, $window, ls, $http, utils,YmtApi,userAgent) {
		var search = utils.common.parseUrl($window.location.search);
		var trandingId;
		//是否Android
		$scope.isAndroid = userAgent.isAndroid ;
		
		if (search.tid) {
			trandingId = search.tid;
			hasNeedUploadIdCardByTrandingId(search.tid);
		}
		$scope.$on('onUpload', function (d, data) {
			hasNeedUploadIdCardByTrandingId(data);
		});

		function hasNeedUploadIdCardByTrandingId(tid) {
			trandingId = tid;
			$http.get('/forYmatouApp/orders/getUploadIdCartInfo?tid=' + tid).success(function (result, code) {
				if (code == 200) {
					if (result.RecipientInfos && result.RecipientInfos.length) {
						$scope.isUpload = true;
					}
				}
			});
		}
		$scope.toUploadCardId = function () {
			var url = location.origin + '/forymatouapp/uploadIdCard/' + trandingId + '/list?title=上传身份证';
			//@TODO 基于Android 不能file上传 采用外部浏览器上传身份证
			if ($scope.isAndroid) {
				url = location.origin + '/forYmatouApp/loadUrlForlocalBrowser?url=' + url;
				return prompt('安卓版暂时不支持');
			}
			YmtApi.open({
				url:url,
				title:'上传身份证'
			});
		};
	}
]);