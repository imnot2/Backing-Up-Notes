Ymt.add(function(require, exports, module) {
	var waterfall = require('module/widget/waterfall'),
		dateFormat = require('lib/dateformat'),
		beforeTime= require('lib/beforeTime');

	waterfall({
		"selector": ".comment-list",
		"type": "jsonp",
		"url": "/User/Comment/GetReplyComments?",
		"options": {
			"LastCommentId": 0
		},
		"increment": "LastCommentId",
		callback: function(res, pageIndex) {

			//console.log(res);

			if (res.Status == 200) {
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
			replyPic,
			isSupportPlaceholder = "placeholder" in document.createElement("input");
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

			// ReplyInfo = o.ReplyInfo;
			// ReplyToInfo = o.ReplyToInfo;
			// SubjectInfo = o.SubjectInfo;

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


			var linkUrl = "javascript:void(0)",
				imgUrl = '',
				contentTxt = "",
				isA = true;

			if (o.SubjectInfo.OrderShowId != null) {
				linkUrl = "/Order/OrderShow/Detail?Id=" + o.SubjectInfo.OrderShowId + "";
				imgUrl = o.SubjectInfo.OrderShowPic;
				contentTxt = o.SubjectInfo.OrderShowContent;

			} else if (o.SubjectInfo.ProductId != null) {
				linkUrl = "/shangou/product/detail?productid=" + o.SubjectInfo.ProductId + "";
				imgUrl = o.SubjectInfo.ProductPics[0];
				contentTxt = o.SubjectInfo.ProductDesc;

			} else {
				linkUrl = "javascript:void(0)",
					imgUrl = o.SubjectInfo.SellerNewsPic,
					contentTxt = "";
				isA = false;
			}

			if (isA) {
				html.push(['<li class="comment-item">',
					'	<div class="ci-l">',
					'		<div class="user-hd">',
					'			<span href="#">',
					'				<img class="avator" src="' + o.ReplyInfo.UserLogo + '">',
					'				<div class="content">',
					'					<p class="name">' + o.ReplyInfo.UserName + '</p>',
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
					'				<h3 class="article-replay" >' + contentTxt + '</h3>',
					'				<p class="replay-img">',
					'					<a target="_blank" href="' + linkUrl + '"><img class="avator" src="' + imgUrl + '"></a>',
					'				</p>',
					'			</div>',
					'	<div class="c2c-ft">',
					'		<button class="c2c-btn j-show-comments">回复</button>',
					'		<div class="replay-wrap" style="display: none;">',
					'			<div class="fl">',
					'				<textarea rows="1" placeholder="写你想问的吧~" name="content" class="replay-area"></textarea>',
					'			<label class="checkbox"><input type="checkbox" name="isHideName" />匿名</label>',
					'			</div>',
					'			<div class="fr">',
					'				<button class="c2c-btn j-commentsSend" data-param-id="' + o.ReplyInfo.CommentId + '">发送</button>',
					'			</div>',
					'			</div>',
					'			</div>',
					'		</div>',
					'	</div>',
					'</li>'
				].join(''));
			}
		}
		return html.join("");
	}


	//回复
	function replyComment(self) {
		var _self = $(self),
			$param = _self.parent().parent(), // .replyComments-box
			orderShowId = _self.attr("data-param-id"),
			content = $param.find('[name=content]'),
			commentText = content.val(),
			status = $param.find('[name=isHideName]').attr("checked") ? 1 : 0;

		if (!commentText || commentText == '') {
            alert("评论内容不允许为空！");
            return false;
        }

        if(!/^[\S]/.test(commentText)){
            alert("评论第一个字符不允许为空格！");
            return false;
        }

        if (commentText.length > 60) {
            alert("评论内容最多只能60个字符！");
            return false;
        }




		$.ajax({
			type: "get",
			url: "/User/Comment/AddComment",
			data: "CommentId=" + orderShowId + "&Content=" + encodeURIComponent(commentText) + "&Anonymity=" + status,
			success: function(result) {
				if (result.Status == 200) {
					content.val("");
					$param.hide().prev().show();
					alert('回复已发送');
				} else if (result.Status == 401) {
					window.location.href = retUrl;
				} else {
					alert(result.Msg)
				}
			}
		})
	}

	//显示评论块
	$(".j-show-comments").live("click", function() {
		$(this).hide().next().show();
	})
	$(".j-commentsSend").live("click", function() {
		replyComment(this)
	})
});