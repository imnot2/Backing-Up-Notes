Ymt.add(function (require, exports, module) {

    var retUrl = ($m.isOnline ? "http://www.ymatou.com/login?ret=" : "http://www.alpha.ymatou.com/login?ret=") + window.location.href;



    var beforeTime = function (date) {

        var d_minutes, d_hours, d_days;
        var timeNow = parseInt(new Date().getTime() / 1000);
        var publishTime = parseInt(new Date(date).getTime() / 1000);
        var d;
        d = timeNow - publishTime;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        d_minutes = parseInt(d / 60);

        if (d_days > 0 && d_days < 365) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else {
            return "刚刚";
        }
    };

    if ($('.detail-article').length > 0) {
        $('img').each(function (i, d) {
            var pid = $(d).attr('productid');
            if (pid) {
                $(d).wrap("<a class='linkToProduct' href='/shangou/product/detail?productid=" + pid + "'></a>");
                $(d).closest("a").append("<span class='link_txt'>去看看</span>");
            }
        })
    }

    //专题评论
    /*$('.sendComment').click(function() {
		var parent = $(this).parent().parent(),
			specialId = $('#specialId').val(),
			text = parent.find('#commentTxt').val(),
			isTrue = parent.find("#commentCheckbox").attr("checked") ? 1 : 0;

		if (!text || text == '') {
			alert("评论内容不允许为空");
			return false;
		}

		$.ajax({
			type: "post",
			url: "/special/special/addspecialcomment",
			data: "SpecialId=" + specialId + "&status=" + isTrue + "&Content=" + text,
			success: function(result) {


				if (result.Status == 200) {
					//评论成功

				} else if (result.Status == 401) {
					window.location.href = returl;
				} else {
					alert(result.Msg)
				}
			}
		})
	});*/


    /**
     * 模板编译
     * @param {string} html模板
     * @param {object} 绑定对象
     * @descrtion 前后缀为{{ }}
     */
    var compileTpls = function (htmlTpls, obj) {
        var prefix = "{{\\s*",
            suffix = "\\s*}}",
            _regExp;
        /* if( htmlTpls && $.inArray(htmlTpls) ){
			     htmlTpls = htmlTpls.jion("");
			 }*/
        for (var i in obj) {
            _regExp = new RegExp(prefix + i + suffix, 'g');
            htmlTpls = htmlTpls.replace(_regExp, obj[i]);
        }
        //去掉所有空的表达式
        htmlTpls = htmlTpls.replace(/{{}}/g, '');
        return htmlTpls;
    };
    //显示评论
    var showComment = function (data) {

        var tpls = [
                '<li>',
                '<p><span class="name">{{showName}}</span><span class="time"><em></em>{{AddTime}}</span></p>',
                '<h3 class="article">{{Content}}</h3>',
                '</li>'
            ],
            contents = "",
            i = 0,
            len = data.length,
            tmpTime, tmpDate;
        for (; i < len; i++) {
            data[i].showName = data[i].UserName;
            if (data[i].HideUser == 1) {
                data[i].showName = data[i].UserName + "(匿名)";
            }
            if (/\/Date\(\d*\)\//.test(data[i].AddTime)) {
                tmpTime = data[i].AddTime.replace(/[^0-9]/g, "");
                tmpDate = new Date(parseInt(tmpTime, 10));
                data[i].AddTime = beforeTime(new Date(parseInt(tmpTime)).getTime());
            }
            contents += compileTpls(tpls.join(''), data[i]);
        }


        return contents;
    }

    //滚动留言显示
    require('module/widget/waterfall')({
        "selector": ".comments",
        //"dataType": "jsonp",
        "url": "/special/special/GetSpecaialCommentByIdToJson?",
        "options": {
            "SpecialId": $("#specialId").val(),
            "pagenum": 1,
            "pagesize": 10
        },
        "increment": "pagenum",
        callback: function (res, inx, isContinue) {

            $(".comments").append(showComment(res));
            //if (res && !res.Result) {
            //	return isContinue();
            //}

        }
    });

    //浮动回复框
    ;
    (function (window) {
        var $fixedReplay = $(".fixedReplay"),
            offset, //初始化位置
            $window = $(window),
            $clone;
        if (!$fixedReplay[0]) return;

        $('body').append('<div class="replay_fixed_box clearfix"></div>');
        $clone = $fixedReplay.clone();
        $clone.appendTo($('.replay_fixed_box'))
            .addClass("fixed-replay-warp").hide();


        //判断是否再舞台中间
        var onTheStage = function () {
            return ($fixedReplay.offset().top >= $window.scrollTop() && $fixedReplay.offset().top <= $window.scrollTop() + $window.height());
        }
        var listen = function () {

        }

        function perform() {
            $clone[onTheStage() ? "fadeOut" : "fadeIn"]();
        }
        perform();
        $(window).scroll(perform)
    })(window);

    //直播评论
    /*	$('.a_sendComment').click(function() {
			var parent = $(this).parent().parent(),
				ProductId = $('#prodictid').val(),
				text = parent.find('#a_commentText').val(),
				isTrue = parent.find("#a_commentCheckbox").attr("checked") ? 1 : 0;

			if (!text || text == '') {
				alert("评论内容不允许为空");
				return false;
			}

			$.ajax({
				type: "post",
				url: "/shangou/product/addcomment",
				data: "ProductId=" + ProductId + "&Anonymity=" + isTrue + "&Content=" + text,
				success: function(result) {
					if (result.Status == 200) {
						//评论成功
						parent.find('#a_commentText').val("")
						alert("评论成功！")
					} else if (result.Status == 401) {
						window.location.href = returl;
					} else {
						alert(result.Msg)
					}
				}
			})
		})*/

    $(".j_share").live("mouseenter", function (event) {
        var _this = $(this);
        _this.find(".share-type").fadeIn(300)
    }).live("mouseleave", function () {
        var _this = $(this);
        _this.find(".share-type").fadeOut(300)
    })
    $(".j_share .weibo").live("click", function () {


    })
    $(".j_share .weixin").live("click", function (e) {
        e.preventDefault();
        var _this = $(this),
            url = '/order/ordershow/qrcode?size=10&type=1&showId=' + $("#specialId").val();

        var shareNodeHtml = '<div id="mask" style="display:none"><div class="mask-warp"><div class="mw-bd"><h3>打开微信”扫一扫“,然后点击手机屏幕右上角分享按钮</h3><p id="shareimg"><img src="" /></p></div></div></div>';
        $mask = $("#mask");
        if (!$mask[0]) {
            ($mask = $(shareNodeHtml)).appendTo('body');
        }
        var $window = $(window);
        $mask.one("click", function () {
            $(this).hide();
        }).find("img")
            .attr("src", url).end()
            .show().find(".mask-warp").css({
                height: $(document).height()
            }).find(".mw-bd")
            .css({
                //top: ($window.height() - $mask.find(".mask-warp .mw-bd").height()) / 2 + $window.scrollTop()
                top: "200px"
            });

    });
    $(".j_praise").live('click', function (e) {
        e.preventDefault();
        var _this = $(this);
        $.ajax({
            url: '/Special/Special/PraiseSpecial?Type=1&SpecialId=' + $("#specialId").val(),
            type: 'POST',
            success: function (res) {
                if (res.Status == 200) {
                    var $span = _this.find("span"),
                        $em = _this.find("em"),
                        num;
                    //如果有点赞数则更新点赞
                    if ($em[0]) {
                        num = parseInt(res.Result.PraiseNum, 10);
                        //res.Result.IsPraise?num--:num++;//判断是点赞还是取消
                        if (num > 9999) {
                            num = "9999+";
                        }
                        $em.text(num);
                    }

                    $span.toggleClass("active");
                } else if (res.Status == 401) {
                    var href = window.location.href;
                    window.location.href = retUrl;
                }
            }
        });
    })

    function OrderShowComment(self) {
        var _self = $(self),
            $param = _self.parent(),
            orderShowId = _self.attr("data-param-id"),
            content = $param.find('[name=content]'),
            commentText = content.val().replace(/^\s+|\s+$/g, ''),
            status = $param.find('[name=isHideName]').attr("checked") ? 1 : 0;

        if (!commentText || commentText == '' || /^[\s]/.test(commentText)) {
            alert("评论内容不允许为空");
            return false;
        }

        if (commentText.length > 60) {
            alert("评论内容最多只能60个字符！");
            return false;
        }

        var name = $('#hidUserName').val();

        if (!name && !status) {
            window.location.href = retUrl;
            return;
        }


        $.ajax({
            type: "post",
            url: "/special/special/addspecialcomment",
            data: "SpecialId=" + orderShowId + "&Anonymity=" + status + "&Content=" + commentText,
            success: function (result) {
                if (result.Status == 200) {
                    //评论成功
                    if ($('#p_comment').size() > 0) {
                        var count = parseInt($('#p_comment .CommentCount').html()) + 1;
                        $('#p_comment .CommentCount').html(count)
                        name = status ? '爱海购的TA' : name;
                        $('#p_comment .comments').prepend('<li><p><span class="name">' + name + '</span><span class="time"><em></em>刚刚</span></p><h3 class="article">' + commentText + '</h3></li>');
                    }
                    content.val("");
                    alert('评论成功')
                } else if (result.Status == 401) {
                    window.location.href = retUrl;
                } else {
                    alert(result.Msg)
                }
            },
            error: function () {
                alert("添加评论失败，请稍后再试");
            }
        })
    }
    $(".j-commentsSend").live("click", function (e) {
        e.preventDefault();
        var $this = $(this);
        OrderShowComment(this)
    })

})