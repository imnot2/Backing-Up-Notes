Ymt.add(function(require, exports, module) {

    var waterfall = require('module/widget/waterfall'),
        dateformat = require('lib/dateformat');
    waterfall({
        "selector": ".topic-list",
        //"dataType": "jsonp",
        "url": "/special/special/getlistspecialtojson?",
        "options": {
            "pagenum": 1,
            "pagesize": 10
        },
        "increment": "pagenum",
        callback: function(res, pageIndex) {
            $(".topic-list").append(parseHtml(res));
        }
    });

    //str len
    function cutstr(str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length;
        for (var i = 0; i < str_len; i++) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                str_cut = str_cut.concat("...");
                return str_cut;
            }
        }
        if (str_length < len) {
            return str;
        }
    }

    function parseHtml(arr) {
        var html = [],
            o, arr = arr || [],
            i;
        for (i = 0; i < arr.length; i++) {
            o = arr[i];
            html.push('	<li class="topic-item">');
            html.push('		<div class="ti-l">');
            html.push('			<a href="/special/special/getspecialbyid?bannerid=' + o.BannerId + '" target="_blank"><img src="' + o.PicUrl + '"></a>');
            html.push('		</div>');
            html.push('		<div class="ti-r">');
            html.push('			<h3 class="title"><a href="/special/special/getspecialbyid?bannerid=' + o.BannerId + '" target="_blank">' + cutstr(o.Title, 64) + '</a></h3>');
            html.push('			<p class="opertate">');
            html.push('				<span class="time">' + dateformat(new Date(parseInt(o.PulishTime.replace(/\D/igm, ""))), "yyyy-mm-dd") + '</span>');
            html.push('				<a href="#" class="comment"><i class="c2c-icon i-comment"></i>' + o.CommentNum + '</a>');
            html.push('				<a href="#" class="prise"><i class="c2c-icon i-prise"></i>' + o.PraiseNum + '</a>');
            html.push('			</p>');
            //html.push('			<a href="/special/special/getspecialbyid?bannerid=' + o.BannerId + '" target="_blank"><h3 class="article"><i class="c2c-icon i-sup"></i>' + cutstr(o.ShowIntroduction, 328) + ' <i class="c2c-icon i-sub"></i></h3></a>');
            html.push('         <a href="/special/special/getspecialbyid?bannerid=' + o.BannerId + '" target="_blank"><h3 class="article">“' + cutstr(o.ShowIntroduction, 328) + '”</h3></a>');
            html.push('			<div class="share-wrap share-light j_share">');
            html.push('				<div class="share-type">');
            html.push('					<span class="weibo"><a href="http://service.weibo.com/share/share.php?title=' + o.Title + '&url=' + encodeURIComponent("http://" + location.host + "/special/special/getspecialbyid?bannerid=" + o.BannerId) + '&source=bookmark&appkey=2992571369&pic=' + o.PicUrl + '&ralateUid="');
            html.push('						target = "_blank" class = "share-icon i-weibo" > </a></span > ');
            html.push('					<span class="weixin" data-special-id="' + o.BannerId + '"><a href="#" class="share-icon i-weixin"></a></span>');
            html.push('				</div>');
            html.push('				<span class="share-btn">分享</span>');
            html.push('			</div>');
            html.push('		</div>');
            html.push('	</li>');
        }
        return html.join("");
    }
    $(".j_share").live("mouseenter", function(event) {
            var _this = $(this);
            _this.find(".share-type").show()
        }).live("mouseleave", function() {
            var _this = $(this);
            _this.find(".share-type").hide()
        })
        //$(".j_share .weibo").live("click", function() {})

    $(".j_share .weixin").live("click", function(e) {

        e.preventDefault();
        var _this = $(this),
            url = '/order/ordershow/qrcode?size=10&type=1&showId=' + $(this).attr("data-special-id");

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
    $(".j_praise").live('click', function() {
        var _this = $(this);
        $.ajax({
            url: '/Special/Special/PraiseSpecial?Type=1&SpecialId=' + $("#specialId").val(),
            type: 'post',
            success: function(res) {
                if (res.Status == 200) {
                    var $span = _this.find("span"),
                        $em = _this.find("em"),
                        num;
                    //如果有点赞数则更新点赞
                    if ($em[0]) {
                        num = parseInt(res.Result.PraiseNum, 10);
                        //res.Result.IsPraise ? num++ : num++; //判断是点赞还是取消
                        if (num > 9999) {
                            num = "9999+";
                        }
                        $em.text(num);
                    }

                    $span.toggleClass("active");
                } else if (res.Status == 401) {
                    var href = window.location.href;
                    window.location.href = ($m.isOnline ? "http://www.ymatou.com/login?ret=" : "http://www.alpha.ymatou.com/login?ret=") + window.location.href;
                }
            }
        })
    })
});