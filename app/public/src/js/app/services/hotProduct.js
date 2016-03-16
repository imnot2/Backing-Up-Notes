/* 
	Hot Server 
*/
ymtapp.factory('hotProduct', ['httpHandlService', function($http) {

	var hotProduct = function() {
		this.items = [];
		this.busy = false;
		this.noDate = false;
		this.page = 1;
		this.category;
		this.tabId = 99;
		this.keyword = null;
		this.HotKeywords = [];
		this.ResultCount = 0;
	};

	hotProduct.prototype.nextPage = function(callback) {
		if (this.busy) return;

		this.busy = true
		var self = this,
			url = "",
			i = 0;
		//
		//this.tabId = (this.category ? 0 : 10);
		if(this.keyword){
			url += '/api/getHotProduct?page='+ this.page+'&keyword=' + encodeURIComponent(this.keyword);
		}else{
			if (this.tabId == 99) {
				url = '/api/getHotProduct?page=' + this.page;
			} else {
				url = '/api/getHotCategoryProduct?catId=' + (this.category || '') + '&page=' + this.page + "&tabId=" + this.tabId;
			}
		}

		$http.get(url).success(function(data, code) {

			var orginData = data;

			if (code == 200) {
				data = data.Products;
				if (data.length < 1) {
					self.noDate = true;
				}

				self.HotKeywords = orginData.HotKeywords;
				self.ResultCount = orginData.ResultCount;

				if (callback === "page") {
					Array.prototype.push.apply(this.items, data)
						/*for(;i<data.length;i++){
							this.items.push(data[i])
						}*/
				} else {
					this.items = data;
				}
				angular.isFunction(callback) && callback();

				if (data.length > 0) {
					this.page++;
				}

			}
			this.busy = false;
		}.bind(this))
	}

	return hotProduct;
}])