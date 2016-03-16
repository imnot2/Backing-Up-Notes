var core = angular.module('core', [])
				  .factory('isAlpha', function(){
				  	return /\.alpha\.ymatou.com|localhost|127.0.0.1/.test(window.location.host);
				  })
				  .factory('userAgent',['$window',function($window){
				  	var userAgent = $window.navigator.userAgent;
				  	return {
				  		isAndroid:/Android|Linux/.test(userAgent),
				  		isIos:/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent)
				  	}
				  }]);

