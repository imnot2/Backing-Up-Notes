/*
* 导购二级模块
* create by：river
* create time: 2014-08-08
* 
*/
$m.load(['util/cookie', 'ui/json'], function (cookie, JSON) {
    //分享
    function share(param) {
        var shareSite = {
            sina:   "http://service.weibo.com/share/share.php?url={{url}}&appkey={{appkey}}&title={{title}}&pic={{pic}}&ralateUid=&language=&searchPic=false",
            qqzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{url}}&title={{title}}&pics={{pic}}&summary=&desc=",
            qqWb:   "http://share.v.t.qq.com/index.php?c=share&a=index&title={{title}}&url={{url}}&appkey=appkey&site=&pic=",
            rr:     "http://widget.renren.com/dialog/share?resourceUrl={{url}}&srcUrl={{url}}&title={{title}}&pic=&description="
        }
        var url = shareSite[param.name];
        //绑定数据
        var bindData = function (data) {
            //包裹器
            var wrap = ["{{", "}}"],
                paramReg = /{{.*?}}/g;
            for (var k in data) {
                url = url.replace(wrap[0] + k + wrap[1], data[k])
            }
            //再次替换将没有匹配的参数
            url = url.replace(paramReg, "");
            return url;
        }
        if(!url){
            throw new Error("-1", "分享站点名称错误！");
        }
        window.open(bindData(param))
    }
    $(".ico-groud .ico").live("click", function () {
        var $this = $(this);
        share({
            name: $this.attr("data-site-name"),
            url: encodeURIComponent(document.location),
            title: encodeURI(document.title),
            pic:encodeURI("")
        })
    })
    var isAgree = function () {
        var articles = cookie.get("article");
        var oper = $(".oper");
        if (articles && articles.length>0) {
            var index = articles.indexOf("|" + oper.attr("data-id") + "|");
            if (index > -1) {
                $(".oper").find(".ico")
                    .removeClass("ico-agree")
                    .addClass("ico-cancel")
                    .end().find(".text")
                    .text("取消");
            }
        }
       
    }
    isAgree()
    //点赞
    $(".oper").click(function () {
        var $this = $(this),
            ico = $this.find(".ico"),
            url = "/article/like";
        if (ico.hasClass("ico-cancel")) {
            url = "/article/DisLike";
        }
        var agreeNum = function (num) {
            var $this = $("#agreeNum"),
                agreeNum = $.trim($this.text());
            $this.text(+agreeNum+num)
        }
        var id = $this.attr("data-id");
        $.ajax({
            url: url + "?id=" + $this.attr("data-id"),
            cache: false,
            type: 'POST',
            data: JSON.stringify({
                id: id
            }),
            dataType: "json",
            success: function (data) {
                if (data.status == 1) {                    
                    var text = $this.find(".text");
                    if (ico.hasClass("ico-agree")) {
                        ico.removeClass("ico-agree").addClass("ico-cancel");
                        text.text("取消");
                        //将已赞文章放到cookie中
                        cookie.set("article", cookie.get("article") + "|" + id + "|", 30);
                        agreeNum(1)
                    } else if (ico.hasClass("ico-cancel")) {
                        ico.removeClass("ico-cancel").addClass("ico-agree");
                        text.text("点赞");
                        //将已赞文章放到cookie中删除
                        var regExp = new RegExp("\\|" + id + "\\|", 'g');
                        cookie.set("article", cookie.get("article").replace(regExp, ""), 30)
                        agreeNum(-1)
                    }
                }
              
            },
            error: function () {
                alert("服务器繁忙，请稍候再试。")
            }

        })
    })
    $(".content").pagination({
        container: ".content",
        pagerRender: "#pager"
    })

    var currentTag = "";
    var currentPage = 0,
        size = 4;

    function loadCommodity(data) {
        if (!data) {
            return;
        }
        var commHtml = [
            '<div class="pro-item {{end}}">',
                '<div class="pic-box pro-row">',
                    '<div class="pic-area">',
                        '<a href="{{url}}" target="_blank">',
                            '<img src="{{pic}}" alt="" />',
                        '</a>',
                    '</div>',
                '</div>',
                '<div class="prc-title pro-row">',
                    '<span class="prc-tager">今日特卖</span>',
                    '<a href="{{url}}" target="_blank">{{name}}</a>',
                '</div>',
                '<div class="price pro-row">',
                    '<span class="current-price">',
                        '<i>￥</i>{{price}}',
                    '</span>',
                '</div>',
            '</div>'
        ];
        var createHtml = [];
        //绑定数据
        var bindData = function (data) {
            //包裹器
            var wrap = ["{{", "}}"],
                paramReg = /{{.*?}}/g;
            var html = commHtml.join("");
            for (var k in data) {
                html = html.replace(new RegExp(wrap[0] + k + wrap[1],'g'), data[k])
            }
            //再次替换将没有匹配的参数
            html = html.replace(paramReg, "");
            return html;
        }
        for (var i = 0; i < data.length; i++) {
            createHtml.push(bindData(data[i]));
        }
        $(".complex .pro-list").append(createHtml.join(""));

    }
    /**
    *
    * @param {String} 需要加载商品标签
    * @param {number} 加载的数量
    *
    */
    function requestData(tag, size) {
        if (!tag) {
            return false;
        }
        currentPage++;
        var data = {
            tag:tag,
            page: currentPage,
            size:40*size
        };
        $.ajax({
            url: "/Article/Products",
            cache: false,
            type: 'GET',
            data:data,
            dataType: "json",
            complete: function () {
                isLoadIng = false;
            },
            success: function (data) {
                loadCommodity(data.result);
                if (data.status == 0) {
                    isCanLoad = false;
                    $(".load-more .load-text,.load-more .load-img").hide();
                } else {
                    $(".load-more").find(".load-img").hide().end().find(".load-text").show();
                }                
            },
            error: function () {

            }
        })
    }
    $("#loadMore").click(function () {
        $(".load-more").find(".load-img").show().end().find(".load-text").hide();
        requestData(currentTag);
    });
    var initScrollTop=0,
        isLoadIng=false,
        isCanLoad = true;
    $(document).scroll(function () {
        if (isLoadIng || !isCanLoad) {
            return;
        }
        var elm = $(".complex");
        if (!elm[0]) {
            return;
        }
        var top = elm.offset().top,
            heigth = elm.height(),
            elmSpoce = top + heigth;
        
        //第一种匹配模式 ：滚动条到底部
        var body = document.documentElement || document.body,
            scrollTop = body.scrollTop || document.body.scrollTop,
            clientHeight = body.clientHeight,
            scrollHeight = body.scrollHeight;
        if (scrollTop > initScrollTop && scrollTop + clientHeight >= elmSpoce) {
            isLoadIng = true;
            $(".load-more").find(".load-img").show().end().find(".load-text").hide();
            setTimeout(function () { requestData(currentTag, size) }, 1000);
        }
        initScrollTop = scrollTop;
    });

    $('#tags a').each(function () {
        $(this).click(function () {
            $('#tags a').removeClass('active')
            $(".complex .pro-list").html('');
            currentPage = 0;
            currentTag = $(this).html();
            requestData(currentTag,size);
            $(this).addClass('active');
            
        });
    });
    requestData($('#tags a:eq(0)').addClass('active').html(),1);
    currentTag = $("#tags .active").html();
    
})