/**
* 请求处理
*
*/
ymtapp.provider('HttpHandl',function(){
	this.config = {
		/*
		* 请求成功前置处理
		* @paran {*} 
		* @param {number}
		* @param headers
		* @return {Boolean} 返回false则成功的方法不再执行
		*/
		successFrontHandl:function(data,status,headers,successFn,promise){
			var result = data;
			data.Code = data.Code || data.Status;
			if (typeof result === 'string'){
				prompt(result);
				promise._error && promise._error();
			}else if(data.Code == '600'){
				if(window.YmtApi){
					YmtApi.toLogin();
				}
				else{
					window.location.href = '/forYmatouApp/loginStatus?hasLogin=0';
				}
				return;
			}else if( data.Code=='200' ){
				result = data.Result || data.Data;
			}else{
				if(data.Code && data.Msg){
					prompt(data.Msg);
				}
			}
			promise._all && promise._all();	
			successFn(result,data.Status || data.Code,headers);
		} 
	}
	this.setConfig = function(cfg){
		angular.extend(this.config,cfg)
	}

	this.$get = function(){
		return this.config;
	}
});

ymtapp.factory('httpHandlService',['$http','HttpHandl','utils',
	function($http,httpHandlProvider,utils){
	return (function(){
		var Http = function(){

		},promise,httpPromise={};
		angular.forEach(['get','post'],function(name){
			Http.prototype[name] = function(url){
				//增加用户认证，达到无状态
				url = utils.addAuth(url);
				console.log(url);
				promise = $http[name](url,arguments[1]);
				httpPromise._all;
				httpPromise.success = function(successFn){
					promise.then(function(response) {
						httpHandlProvider.successFrontHandl(response.data, response.status, response.headers,successFn,httpPromise)
			        });
			        return httpPromise;
				}
				httpPromise.error = function(fn){
					httpPromise._error = fn
					promise.then(null,function(response) {
			          	fn(response.data, response.status, response.headers);
			        });
			        return httpPromise;
				}

				httpPromise.all = function(fn){
					//promise.finally(function(response){
					//	fn(response.status,response.headers);
					//})
					httpPromise._all = fn;
					return httpPromise;
				}

				return httpPromise
			}
		});
		Http.prototype.jsonp = $http.jsonp;

		return new Http;
	})()
}])