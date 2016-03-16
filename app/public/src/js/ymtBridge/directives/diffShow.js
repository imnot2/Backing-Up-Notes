/**
 * 差异显示
 * 控制在不同端之间的显示差异
 * 默认增加这个标签 只在app中显示 其他需要增加相应的标示
 * 	扫货 shApp
 * 	微信 wx
 * 
 */
core.directive('diffShow', ['$window', 'YmtApi',function($window,YmtApi){
	return {
		restrict:'A',
		link:function($scope, $ele, $attrs){
			var isApp,
				isWechat = YmtApi.isWechat,
				isSaohuoApp  = YmtApi.isSaohuoApp;
			var rule = $attrs.diffShow;
			if(rule){
				if(rule == 'shApp'){
					isSaohuoApp = false;
				}else if(rule == 'wx'){
					isWechat = false;
				}
			}
			//如果在微信和扫货中默认删除当前标签
			if(isWechat || isSaohuoApp){
				$ele.remove();
			}
			
		}
	}
}]);