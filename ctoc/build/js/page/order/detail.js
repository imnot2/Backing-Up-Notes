/**
 * 订单详情
 */
Ymt.add(function(require, exports, module) {

    var retUrl = ($m.isOnline ? "http://www.ymatou.com/login?ret=" : "http://www.alpha.ymatou.com/login?ret=") + window.location.href; //当前请求次数


    $('.sd_btn').hover(function() {
        $(this).css('height', 490).find('.sd_btn_pop').fadeIn();
    }, function() {
        $(this).css('height', 90).find('.sd_btn_pop').fadeOut();
    })


    var beforeTime = function(date) {

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

    function OrderShowComment(self) {
        var _self = $(self),
            $param = _self.parent(),
            orderShowId = _self.attr("data-param-id"),
            content = $param.find('[name=content]'),
            commentText = content.val(),
            status = $param.find('[name=isHideName]').attr("checked") ? 1 : 0;

        if (!commentText || commentText == '') {
            alert("评论内容不允许为空！");
            return false;
        }

        if (!/^[\S]/.test(commentText)) {
            alert("评论第一个字符不允许为空格！");
            return false;
        }

        if (commentText.length > 60) {
            alert("评论内容最多只能60个字符！");
            return false;
        }


        //评论假数据
        var name = $('#hidUserName').val();

        if (!name && !status) {
            window.location.href = retUrl;
            return;
        }

        $.ajax({
            type: "post",
            url: "/Order/OrderShow/AddOrderShowComment",
            data: "orderShowId=" + orderShowId + "&content=" + commentText + "&anonymity=" + status,
            success: function(result) {
                if (result.Status == 200) {
                    //评论成功
                    //商品详情、晒单详情评论假数据 
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
            }
        })
    }
    $(".j-commentsSend").live("click", function(e) {
        e.preventDefault();
        var $this = $(this);
        OrderShowComment(this)
    })

    /**
     * 模板编译
     * @param {string} html模板
     * @param {object} 绑定对象
     * @descrtion 前后缀为{{ }}
     */
    var compileTpls = function(htmlTpls, obj) {
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
        }
        //显示评论
    var showComment = function(data) {
        var tpls = [
                '<li>',
                '<p><span class="name">{{showName}}</span><span class="time"><em></em>{{AddTime}}</span></p>',
                '<h3 class="article">{{Content}}</h3>',
                '</li>'
            ],
            contents = "",
            i = 0,
            len = (data = data.Result).length,
            tmpTime, tmpDate;
        for (; i < len; i++) {
            data[i].showName = data[i].UserName;
            if (data[i].Anonymity == 1) {
                data[i].showName = data[i].UserName + "(匿名)";
            }
            if (/\/Date\(\d*\)\//.test(data[i].AddTime)) {
                tmpTime = data[i].AddTime.replace(/[^0-9]/g, "");
                tmpDate = new Date(parseInt(tmpTime, 10));
                //data[i].AddTime = tmpDate.getFullYear() + "年" + (tmpDate.getMonth() + 1) + "月" + tmpDate.getDate() + "日";

                tmpDate = new Date(parseInt(tmpTime, 10));
                data[i].AddTime = beforeTime(new Date(parseInt(tmpTime)).getTime());
            }
            contents += compileTpls(tpls.join(''), data[i]);
        }
        return contents;
    }

    require('module/widget/waterfall')({
        "selector": ".comments",
        //"dataType": "jsonp",
        "url": "/Order/OrderShow/GetOrderShowComment?",
        "options": {
            "orderShowId": $("#hidOrderShowId").val(),
            "pageIndex": 1,
            "pagesize": 10
        },
        "increment": "pageIndex",
        callback: function(res, pageIndex, isContinue) {
            var len = res.Result.length;
            if (!len) {
                return isContinue();
            }
            $(".comments").append(showComment(res));
        }
    })
    $(".j_share").live("mouseenter", function(event) {
        var _this = $(this);
        _this.find(".share-type").fadeIn(300)
    }).live("mouseleave", function() {
        var _this = $(this);
        _this.find(".share-type").fadeOut(300)
    })
    $(".j_share .weibo").live("click", function() {});
    $(".j_share .weixin").live("click", function(e) {
        e.preventDefault();
        var _this = $(this),
            url = '/order/ordershow/qrcode?size=10&type=0&showId=' + $("#hidOrderShowId").val();

        var shareNodeHtml = '<div id="mask" style="display:none"><div class="mask-warp"><div class="mw-bd"><h3>打开微信”扫一扫“,然后点击手机屏幕右上角分享按钮</h3><p id="shareimg"><img src="" /></p></div></div></div>';
        $mask = $("#mask");
        if (!$mask[0]) {
            ($mask = $(shareNodeHtml)).appendTo('body');
        }
        var $window = $(window);
        $mask.one("click", function() {
                $(this).hide();
            }).find("img")
            .attr("src", url).end()
            .show().find(".mask-warp").css({
                height: document.documentElement.offsetHeight
            }).find(".mw-bd")
            .css({
                top: "200px"
            });

    });
    $(".j_praise").live('click', function(e) {
        e.preventDefault();
        var _this = $(this);
        $.ajax({
            url: '/Order/OrderShow/AddOrderShowPraise?orderShowId=' + $("#hidOrderShowId").val(),
            type: 'POST',
            success: function(res) {
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
    });

    /*
     * @name 浮动回复框
     * @Description 需要添加浮动外框增加fixedReplay 即可，当
     *              需要显示会增加一个fixed-replay-warp ，如果样式有差异 可以针对fixed-replay-warp进行覆盖
     */

    ;
    (function(window) {
        var $fixedReplay = $(".fixedReplay"),
            offset, //初始化位置
            $window = $(window),
            $clone;
        if (!$fixedReplay[0]) return;

        $('body').append('<div class="replay_fixed_box showOrderDetail clearfix"></div>');
        $clone = $fixedReplay.clone();
        $clone.appendTo($('.replay_fixed_box'))
            .addClass("fixed-replay-warp").hide();

        // $clone.find('.fix_box').css({
        //     'width': '1060px',
        //     'paddingLeft': '150px'
        // })

        //判断是否再舞台中间
        var onTheStage = function() {
            return ($fixedReplay.offset().top >= $window.scrollTop() && $fixedReplay.offset().top <= $window.scrollTop() + $window.height());
        }
        var listen = function() {

        }

        function perform() {
            $clone[onTheStage() ? "fadeOut" : "fadeIn"]();
        }
        perform();
        $(window).scroll(perform)
    })(window);

    //商品详情评论。
    + (function() {
        var tabBox = $('.fix_tab'),
            detailTop = $('.p_content').offset().top,
            commentTop = $('#p_comment').offset().top - tabBox.height(),
            //detail = tabBox.find('.fix_bab_detail'),
            detail = tabBox.find('ul.fl li').eq(0),
            //comment = tabBox.find('.fix_bab_comment'),
            comment = tabBox.find('ul.fl li').eq(1),
            scrollArr = [{
                "node": detail,
                "top": detailTop
            }, {
                "node": comment,
                "top": commentTop
            }];

        function selectCur(node) {
            node.addClass('active').siblings().removeClass('active');
        }

        function scrollToNode(node) {
            var i, s;
            for (i = 0; i < scrollArr.length; i++) {
                s = scrollArr[i];
                if (node[0] == s["node"][0]) {
                    scrollTo(0, s["top"]);
                }
            }

        }
        $('ul.fl li').bind('click', function(e) {
            detailTop = $('.p_content').offset().top;
            commentTop = $('#p_comment').offset().top - tabBox.height();
            selectCur($(this));
            //scrollToNode($(this));
        })
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            if (tabBox.length > 0) {
                if (scrollTop > detailTop) {

                    tabBox.css({
                        position: "fixed",
                        top: "0"
                    });
                    // if (scrollTop >= commentTop) {
                    //     selectCur(comment);
                    // } else {
                    //     selectCur(detail);
                    // }
                } else {
                    tabBox.css({
                        position: "relative",
                        top: "0"
                    })
                }
            }
        });
    })()
})