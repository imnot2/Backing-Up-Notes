/* global ymtapp: true,prompt:true*/
/* jshint strict: false,latedef:nofunc */
/*
	Feedback Controller
*/
ymtapp.controller('FeedbackController', ['$scope', 'httpHandlService', '$window', function ($scope, $http, $window) {

	$scope.submitPropose = function () {

		var data = {
			Content: $scope.feedbackContent
		};
		if (data.Content === 'www.ymatou.com') {
			$window.location.href = '/forYmatouApp/tools?needJumpFlag=1';
		}
		$http.post('/api/saveFeedback', data).success(function (result) {
			if (result.Result) {
				prompt('非常感谢你的反馈意见 ：）');
			}
			else {
				prompt('提交失败请重试 ：（');
			}
		});
	};
}]);