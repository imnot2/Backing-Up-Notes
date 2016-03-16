/**
 * native 监听
 * param={"msgNum":2,"isRefresh":1}
 * @return {object} 
 *         	register 注册函数
 */
ymtBridge.provider('BridgeListen',function() {

	this.$get = ['$window','$document','$location',
			function($window,$document,$location){
				//是否是空对象
				var isEmptyObject = function(obj){
					for(var i in obj)return false;
					return true;
				},$$doc = $($document),lastHash;
				var _register = function(){
					$($window).on("hashchange",function(){
						var path = $location.$$path;
						if(lastHash == path){
							return;
						}
						lastHash = path;
						var param  = path.match(/param=\{[\s\S]*?\}/gi);
						if(param && param[0]){
							param = param[0].replace(/param\s?=/,'');
							try{
								var obj = JSON.parse(param);
								if(obj){
									if(obj.isRefresh == 1){
										$$doc.trigger('ymtappRefresh');
										delete obj.isRefresh;
									}
									if(obj.msgNum){
										$$doc.trigger('ymtappMsgChange',{msgNum:obj.msgNum});
										delete obj.msgNum;
									}
								}
							}catch(e){
								console.log("参数解析错误："+e);
							}
							$window.location.hash="!param="+JSON.stringify(obj);
						}
					})
				}
				return {
					register:_register			
				}
	}];
});
