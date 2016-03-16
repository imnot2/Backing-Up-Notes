/*
* 配置信息
*/
ymtapp.factory('config',['httpHandlService',function($http) {
	function getConfig(cb){
		var config = null;
		if(config){
			return cb(config);
		}
		$http.get('/api/config?;'+Math.round(Math.random()*999)).success(function(data) {
			cb(config = data);
		})
	}
	return getConfig;
}])