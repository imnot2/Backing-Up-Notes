Ymt.add(function(a){function b(a){var b,c,d=[],a=a||[],f="placeholder"in document.createElement("input");for(c=0;c<a.length;c++){b=a[c];var g="javascript:void(0)",h="",i="",j=!0;null!=b.SubjectInfo.OrderShowId?(g="/Order/OrderShow/Detail?Id="+b.SubjectInfo.OrderShowId,h=b.SubjectInfo.OrderShowPic,i=b.SubjectInfo.OrderShowContent):null!=b.SubjectInfo.ProductId?(g="/shangou/product/detail?productid="+b.SubjectInfo.ProductId,h=b.SubjectInfo.ProductPics[0],i=b.SubjectInfo.ProductDesc):(g="javascript:void(0)",h=b.SubjectInfo.SellerNewsPic,i="",j=!1),j&&d.push(['<li class="comment-item">','	<div class="ci-l">','		<div class="user-hd">','			<span href="#">','				<img class="avator" src="'+b.ReplyInfo.UserLogo+'">','				<div class="content">','					<p class="name">'+b.ReplyInfo.UserName+"</p>",'					<p class="time"> <i class="seller-icon si-time"></i>'+e(new Date(parseInt(b.ReplyInfo.AddTime.replace(/\D/gim,""))),"yyyy-mm-dd")+"</p>","				</div>","			</span>","		</div>","	</div>",'	<div class="ci-r">','		<div class="c2c-box">','			<span class="c2c-arrow"> <i class="seller-icon si-arrow"></i>',"			</span>",'			<div class="c2c-bd">','				<h3 class="article">'+b.ReplyInfo.Content+"</h3>",'				<h3 class="article-replay" >'+i+"</h3>",'				<p class="replay-img">','					<a target="_blank" href="'+g+'"><img class="avator" src="'+h+'"></a>',"				</p>","			</div>",'	<div class="c2c-ft">','		<button class="c2c-btn j-show-comments">回复</button>','		<div class="replay-wrap" style="display: none;">','			<div class="fl">','				<textarea rows="1" placeholder="写你想问的吧~" name="content" class="replay-area">'+(f?"":"写你想问的吧~")+"</textarea>",'			<label class="checkbox"><input type="checkbox" name="isHideName" />匿名</label>',"			</div>",'			<div class="fr">','				<button class="c2c-btn j-commentsSend" data-param-id="'+b.ReplyInfo.CommentId+'">发送</button>',"			</div>","			</div>","			</div>","		</div>","	</div>","</li>"].join(""))}return d.join("")}function c(a){var b=$(a),c=b.parent().parent(),d=b.attr("data-param-id"),e=c.find("[name=content]"),f=e.val(),g=c.find("[name=isHideName]").attr("checked")?1:0;return f&&""!=f?/^[\S]/.test(f)?f.length>60?(alert("评论内容最多只能60个字符！"),!1):void $.ajax({type:"get",url:"/User/Comment/AddComment",data:"CommentId="+d+"&Content="+encodeURIComponent(f)+"&Anonymity="+g,success:function(a){200==a.Status?(e.val(""),c.hide().prev().show(),alert("回复已发送")):401==a.Status?window.location.href=retUrl:alert(a.Msg)}}):(alert("评论第一个字符不允许为空格！"),!1):(alert("评论内容不允许为空！"),!1)}var d=a("module/widget/waterfall"),e=(a("lib/dateformat"),a("lib/beforeTime"));d({selector:".comment-list",type:"jsonp",url:"/User/Comment/GetReplyComments?",options:{LastCommentId:0},increment:"LastCommentId",callback:function(a){return 200==a.Status?$(".comment-list").append(b(a.Result)):a.Status=401,a.Result[a.Result.length-1].ReplyInfo.CommentId}}),$(".j-show-comments").live("click",function(){$(this).hide().next().show()}),$(".j-commentsSend").live("click",function(){c(this)})});