/* global core: true */
/* jshint strict: false */
/*
 * 倒计时
 *
 */
core.directive('countdown', ['$timeout',
	function ($timeout) {
		return {
			restrict: 'A',
			scope: {
				currTime: '@currTime',
				targetHour: '@targetHour',
				targetTime: '@targetTime'
			},
			controller: function ($scope) {
				var currDate = new Date(),
					targetDate = new Date(+($scope.targetTime) || new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate(), +($scope.targetHour), 0, 0));
				$scope.surplus = targetDate.getTime() - $scope.currTime;

				$scope.timing = function (time) {
					time = time || $scope.surplus;
					var hh = parseInt(time / 1000 / 60 / 60 % 24, 10), //计算剩余的小时数 
						mm = parseInt(time / 1000 / 60 % 60, 10), //计算剩余的分钟数  
						ss = parseInt(time / 1000 % 60, 10); //计算剩余的秒数
					//格式化时间;补零
					var format = function (timer) {
						return timer > 9 ? timer : '0' + timer;
					};
					return {
						hours: format(hh),
						minute: format(mm),
						second: format(ss)
					};
				};
			},
			link: function (scope, ele) {
				var timer,
					timing = function (time) {
						var timeObj = scope.timing(time),
							timeStr = timeObj.hours + ':' + timeObj.minute + ':' + timeObj.second;
						scope.surplus -= 1000;
						ele.html(timeStr);
						if (scope.surplus > 0) {
							timer = $timeout(function () {
								timing(scope.surplus);
							}, 1000);
						}
						else {
							if (timer) {
								$timeout.cancel(timer);
							}
							//$window.location.reload();
						}
					};
				timing(scope.surplus);
				scope.$on('$destroy', function () {
					if (timer) {
						$timeout.cancel(timer);
					}
				});
			}
		};
	}
]);