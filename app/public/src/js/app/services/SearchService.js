/**
 * 搜索服务
 * @author abel
 * @created Date 2015/04/15
 *
 * 提供搜索功能
 */
ymtapp.service("searchService",['$window','httpHandlService','YmtApi',function($window,http,YmtApi){
	this.keyword = "";
	this.results = [];
	this.paramData;
	this.busy = false;
	this.pageSize = 30;
	this.currInx = 1;
	this.isEnd = false;

	this.toSearch = function(){
		if(this.keyword){
			YmtApi.open({
				url:'/forYmatouApp/search?w='+this.keyword,
				title:'搜索结果',
				isNew:true
			})
		}
	}
	this.clearKeyword = function(){
		this.keyword="";
	}
	this.nextPage = function(){
		var self = this;
		this.busy = true;
		http.post('/forYmatouApp/product/search?pageSize='+this.pageSize+'&pageIndex='+(++this.currInx),this.paramData).success(function(result,code){
			if(code == 200){
				Array.prototype.push.apply(self.results,result.Products)
			}
			self.busy = false;
		})
	}

	this.filter = function(cb){
		var self = this;
		this.busy = true;
		http.post('/forYmatouApp/product/search?pageSize='+this.pageSize,this.paramData).success(function(result){
			self.results = result.Products;
			self.currInx = 1;
			self.busy = false;
			cb && cb(self.results);
		});

	}

	this.filterBrands = function(cb){
		http.post('/forYmatouApp/product/filterBrands',this.paramData).success(function(result){
			self.brands = result.Brands
			cb && cb(self.brands);
		})
	}

	this.filterCategories = function(cb){
		http.post('/forYmatouApp/product/filterCategories',this.paramData).success(function(result){
			self.categories = result.Categories;
			cb && cb(self.categories);
		})
	}
}])