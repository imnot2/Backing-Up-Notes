/**
 * 商品服务
 */
ymtapp.factory('ProductService', ['utils', 'shareUrl', 'YmtApi', function (utils, shareUrl, YmtApi) {
	return {
		//替换商品邮寄方式
		deliveryWay:function(product){
			var text,
				ico;
				if(product.CatalogStatus==3&&!product.IsPurchasingOrder){
					text = "护航直邮";
					ico = "icon icon-SFly01";
				}else if(product.CatalogStatus==2&&!product.IsPurchasingOrder){
					text = "海外直邮";
					ico = "icon icon-ITransport";
				}else if(product.CatalogStatus==1){
					text = "护航直邮";
					ico = "icon icon-SFly01";
					if(product.StockStatus == 0 || product.CatalogType == 0){
						text = "国内现货";
						ico="";
					}else if(product.StockStatus == 1 || product.CatalogType == 1){
						text = "国内转运";
						ico="";
					}
				}else if(product.CatalogStatus == 4 || product.CatalogStatus == 5){
					text = "保税发货";
					ico = "icon icon-pro-bshh";
				}
			product.delverText = text;
			product.delverIco = ico;
		},
		/**
		 * 去商品详情页
		 * @param  {string} pid        [商品编号]
		 * @param  {string} shareTitle [分享标题]
		 * @param  {string} sharePic   [分享图片]
		 * @param  {string} price      [价格]
		 * @param  {string} type       [类型]
		 */
		toProduct: function (pid, shareTitle, sharePic, price, type) {			
			var shareLink = 'http://' + shareUrl + '/forYmatouApp/product/jump/' + pid;		
			var href = ['/forYmatouApp/product/pid',
				'?shareTitle=' + shareTitle,
				'&sharePicUrl=' + sharePic,
				'&price=' + price,
				'&pid=' + pid,
				'&shareUrl='+ shareLink
			].join('');
			YmtApi.open({
				url:href,
				isNew:true,
				title:'商品详情'
			});
		}
	}
}]);
