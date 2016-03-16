/* 
*	每日团
*/
ymtapp.service('GroupProduct',['httpHandlService',function($http) {
	this.items = [];
	this.busy = false;
	this.noData = false;
	this.page = 1;
	this.size = 10;
	this.ResultCount=0;

	this.nextPage = function(callback) {
		if (this.busy || this.noData) return;

		this.busy = true
		var self = this,
			url = "/api/getGroupProductList?page="+this.page+"&size="+this.size+"&current=1";		

		$http.get(url).success(function(data) {
			var orginData=data;

			if (typeof data != 'string') {

				data = data.Products;

				if (data.length < 1) {
					self.noData = true;
				}else{					
					self.ResultCount=orginData.ResultCount;

					if(callback === "page"){
						Array.prototype.push.apply(self.items,data)
						/*for(;i<data.length;i++){
							self.items.push(data[i])
						}*/
					}else{
						self.items = data;
					}				
					angular.isFunction(callback)&&callback();

					if(data.length>0){
						self.page++;
					}
				}


			} else {
				prompt(data)
			}
			self.busy = false;
		})
	}
}])