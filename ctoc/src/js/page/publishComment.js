Ymt.add(function(require, exports, module) {
	var waterfall = require('module/widget/waterfall'),
		dateFormat = require('lib/dateformat'),
		beforeTime= require('lib/beforeTime');
	lastCommentid = $("#hidLastCommentId").val();
	waterfall({
		"selector": ".comment-list",
		"type": "jsonp",
		"url": "/User/Comment/GetPublishComments?",
		"options": {
			"LastCommentId": 0
		},
		"increment": "LastCommentId",
		callback: function(res, pageIndex, isContinue) {
			if (res.Status == 200) {
				if (res.Result && !res.Result.length) {
					return isContinue();
				}
				$(".comment-list").append(parseHtml(res.Result));
			} else if (res.Status = 401) {

			}
			return res.Result[res.Result.length - 1].ReplyInfo.CommentId;
		}
	});

	function parseHtml(arr) {
		var html = [],
			o, arr = arr || [],
			i, ReplyInfo,
			ReplyToInfo,
			SubjectInfo,
			replyId,
			replyContent,
			replyPic;;
		/*
		 * @param {string} 商品编号
		 */
		// var redirectUrl = function(id) {

		// 	if (!id)
		// 		return "javascript:;"
		// 	return "/shangou/product/detail?productid=" + id;
		// }

		for (i = 0; i < arr.length; i++) {
			o = arr[i];

			//ReplyInfo = o.ReplyInfo;
			//ReplyToInfo = o.ReplyToInfo;
			//SubjectInfo = o.SubjectInfo;

			// if (SubjectInfo.OrderShowId) {
			// 	replyId = SubjectInfo.OrderShowId;
			// 	replyContent = SubjectInfo.OrderShowContent;
			// 	replyPic = SubjectInfo.OrderShowPic;
			// } else if (SubjectInfo.ProductId) {
			// 	replyId = SubjectInfo.ProductId;
			// 	replyContent = SubjectInfo.ProductDesc;
			// 	replyPic = SubjectInfo.ProductPics[0];
			// } else if (SubjectInfo.SellerNewsId) {
			// 	replyId = "";
			// 	replyContent = SubjectInfo.SellerNewsContent;
			// 	replyPic = SubjectInfo.SellerNewsPic;
			// }

			var linkUrl="javascript:void(0)",
				imgUrl='',
				contentTxt="",
				isA=true;

			if(o.SubjectInfo.OrderShowId!=null){
				linkUrl="/Order/OrderShow/Detail?Id="+o.SubjectInfo.OrderShowId+"";
				imgUrl=o.SubjectInfo.OrderShowPic;
				contentTxt=o.SubjectInfo.OrderShowContent;

			}else if(o.SubjectInfo.ProductId != null){
				linkUrl="/shangou/product/detail?productid="+o.SubjectInfo.ProductId+"";
				imgUrl=o.SubjectInfo.ProductPics[0];
				contentTxt=o.SubjectInfo.ProductDesc;

			}else{
				linkUrl="javascript:void(0)",
				imgUrl=o.SubjectInfo.SellerNewsPic,
				contentTxt="";
				isA=false;
			}



			if(isA){
				html.push(['<li class="comment-item">',
					'	<div class="ci-l">',
					'		<div class="user-hd">',
					'			<span>',
					'				<img class="avator" src="' + o.ReplyInfo.UserLogo + '">',
					'				<div class="content">',
					'					<p class="name">我</p>',
					'					<p class="time"> <i class="seller-icon si-time"></i>' + beforeTime(new Date(parseInt(o.ReplyInfo.AddTime.replace(/\D/igm, ""))), "yyyy-mm-dd") + '</p>',
					'				</div>',
					'			</span>',
					'		</div>',
					'	</div>',
					'	<div class="ci-r">',
					'		<div class="c2c-box">',
					'			<span class="c2c-arrow"> <i class="seller-icon si-arrow"></i>',
					'			</span>',
					'			<div class="c2c-bd">',
					'				<h3 class="article">' + o.ReplyInfo.Content + '</h3>',
					'				<h3 class="article-replay">' + contentTxt + '</h3>',
					'				<p class="replay-img">',
					'					<a target="_blank" href="' + linkUrl + '"><img class="avator" src="' + imgUrl + '"></a>',
					'				</p>',
					'			</div>',
					'		</div>',
					'	</div>',
					'</li>'
				].join(''));
			}
		}
		return html.join("");
	}
});