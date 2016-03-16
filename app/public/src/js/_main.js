var ymtapp = angular.module('ymtapp', ['infinite-scroll', 'ymtBridge'])
				    .run(['BridgeListen',function(BridgeListen){
				    	BridgeListen.register();
				    }])
				
//分享后访问地址
ymtapp.factory('shareUrl', ['isAlpha',function(isAlpha){
	return 'matouapp.'+(isAlpha?'alpha.':'')+'ymatou.com'+(isAlpha?':3200':'');
}]);