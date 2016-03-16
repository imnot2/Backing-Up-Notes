/**
 * 全球热卖搜索商品
 */
ymtapp.service("searchCategory",function(){

	this.isShowDefault=false;
	this.isShowSearch=false;
	this.lastY=0;
	this.currentY=0;
	
	this.isSearchOver=false;
	this.searchKeyword="";
	this.searchNumber=0;

	//还原方法
	this.reduction =  function(){};
	//打开搜索框
	this.openSearchBox=function(){
		if(!(this.isShowSearch = !this.isShowSearch)){
			this.closeSearchBox();
		}
	}
	this.closeSearchBox = function(){
		this.isSearchOver=false;
		this.reduction && this.reduction()
	}

	//搜索关键字
	this.searchVal=function(val){
		if(!val){
			return ;
		}
		this.savekeyword(val);
		this.toSearch(val);
	}

	//保存关键字
	this.savekeyword = function(val){
		//关键字 key
		var SEARCH_KEY = "keywordHistory",
		 histories=localStorage.getItem(SEARCH_KEY);

		//判断是否有历史记录
		if(!histories){
			localStorage.setItem(SEARCH_KEY,[]);
			histories=[];
		}else{
			histories=histories.split("|");
		}
		
		var i = histories.length;
		while(i--){
			if(histories[i]===val){
				return;
			}
		}

		histories.unshift(val);

		localStorage.setItem(SEARCH_KEY,histories.join("|"));

		this.keywordHistory=histories;
	}

	this.toSearch = function(val){}

	this.initHistory = function(){
		var histories=localStorage.getItem("keywordHistory");
		if(!histories){
			return [];
		}else{
			return histories.split("|");
		}
	}
	//清理历史记录
	this.clear = function(){
		localStorage.removeItem("keywordHistory");
		this.keywordHistory=[];
	}
	this.keywordHistory = this.initHistory();
	
})