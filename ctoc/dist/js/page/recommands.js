Ymt.add(function(a){function b(a){var b=new Date(parseInt(a.replace(/\D/gim,""))),c=new Date;ts=b-c;var d=(parseInt(ts/1e3/60/60/24,10)>=0?parseInt(ts/1e3/60/60/24,10):0,parseInt(ts/1e3/60/60%24,10)>=0?parseInt(ts/1e3/60/60%24,10):0),e=parseInt(ts/1e3/60%60,10)>=0?parseInt(ts/1e3/60%60,10):0,f=parseInt(ts/1e3%60,10)>=0?parseInt(ts/1e3%60,10):0,g=0==d&&30>e;d=d.toString().length>1?d:"0"+d,e=e.toString().length>1?e:"0"+e,f=f.toString().length>1?f:"0"+f;for(var h=d.toString()+e.toString(),i=[],j=0;j<h.length;j++)i.push(h.substring(j,j+1));return{isTrue:g,date:i}}function c(a){var c,d,e=[],a=a||[];for(d=0;d<a.length;d++){c=a[d];var f="";f+='<div class="share-wrap j_share share-light">',f+='<div class="share-type" style="display: none;">',f+='<span class="weibo"><a class="share-icon i-weibo" href="http://service.weibo.com/share/share.php?title='+c.Description+"&amp;url="+encodeURIComponent("http://"+location.host+"/shangou/product/detail?productid="+c.ProductId)+"&amp;source=bookmark&amp;appkey=2992571369&amp;pic="+c.ProductPic+'&amp;ralateUid=" target="_blank"></a></span>',f+='<span class="weixin" data-product-id="'+c.ProductId+'"><strong class="share-icon i-weixin"></strong></span>',f+="</div>",f+='<span class="share-btn j_praise">分享</span>',f+="</div>",e.push('<li class="recommandItem ">'),e.push('    <a class="des png" href="/shangou/product/detail?productid='+c.ProductId+'&currentpage=2" target="_blank">'+c.AppRecommendContent+"</a>"),e.push('    <div class="proShow j_show_share" data-href="/shangou/product/detail?productid='+c.ProductId+'&currentpage=2">'+f),e.push('        <a href="/shangou/product/detail?productid='+c.ProductId+'&currentpage=2" target="_blank"><img class="img" src="'+c.ProductPic+'" width="288" height="288" alt=""/></a>'),e.push('        <a class="userInfo mask" href="/seller/seller/index?id='+c.SellerId+'" target="_blank">'),e.push('            <img class="buyerPhoto fl" width="46" height="46" src="'+c.SellerLogo+'" alt="">'),e.push('            <div class="infoBox fl">'),e.push('                <p class="buyerName">'+c.SellerName+"</p>"),e.push('               <p class="from">'),e.push('                    <img class="flag" width="14" height="14" src="'+c.Flag+'" alt="">美国'),e.push("                </p>"),e.push("            </div>"),e.push("        </a>"),e.push("    </div>"),e.push('    <div class="buyOprateBox clearfix">'),e.push('        <div class="aboutPrice fl">'),e.push('            <p class="priceTip">预估到手价</p>'),e.push('            <p class="priceNumber">&yen;'+c.Price+"</p>"),e.push("        </div>"),e.push('        <div class="buyBox fr">');var g=b(c.ExpireTime);e.push(g.isTrue?'            <p class="countDown fr">':'            <p class="countDown end fr">'),e.push('                <span class="timeItem">'+g.date[0]+"</span>"),e.push('                <span class="timeItem">'+g.date[1]+'</span><i class="fl">:</i>'),e.push('                <span class="timeItem">'+g.date[2]+"</span>"),e.push('                <span class="timeItem">'+g.date[3]+"</span>"),e.push("            </p>"),e.push(c.OnShelf?c.StockNum<=0?'            <a href="javascript:void(0)" class="btn btn-unbuy fr">已售罄</a>':'            <a href="/order/order/buy?pid='+c.ProductId+'" class="buyBtn fr">立即购买</a>':'            <a href="javascript:void(0)" class="btn btn-unbuy fr">已下架</a>'),e.push("        </div>"),e.push("    </div>"),e.push("</li>")}return e.join("")}{var d=a("module/widget/waterfall");a("module/widget/countdown")}d({selector:".recommandList",type:"jsonp",url:"/shangou/product/ShowRecommandProductsToJson",options:{PageIndex:1,pagesize:10},increment:"PageIndex",callback:function(a){$(".recommandList").append(c(a))}})});