/* 
	UserOrderList 
*/
ymtapp.factory('UserOrderList',['httpHandlService', function($http) {

	var UserOrderList = function(type) {
		this.items = [];
		this.busy = false;
		this.noDate = false;
		this.page = 1;
		this.orderType = type || 4;
		this.lastOrder = new Number;
		this.isLoaded = true;
	};

	UserOrderList.prototype.setOrderType = function(type){
		this.orderType = type || 4;
		this.items = [];
		this.page = 1;
		this.nextPage();
		return this;
	}

	UserOrderList.prototype.nextPage = function() {
		var self = this;
		if (this.busy) return;
		this.busy = true;
		self.isLoaded = true;

		var url = '/api/getUserOrder?orderType=' + this.orderType + '&lastOrder=' + this.lastOrder + '&page=10';

		$http.get(url).success(function(data) {
			self.isLoaded = false;
			if (typeof data != 'string') {
				if (data.length < 1) {
					self.noDate = true;
				}
				var items = data.Orders;
				for (var i = 0; i < items.length; i++) {
					self.items.push(items[i]);
				}
				if (self.items.length > 0) {
					self.lastOrder = self.items[self.items.length - 1].OrderId;
				}
			} else {
				prompt(data)
			}
			self.page += 1;
			self.busy = false;
		}.bind(this)
		);
	}

	return UserOrderList;
}])