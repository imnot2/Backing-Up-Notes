Ymt.add(function(require, exports, module) {

    var Dialog = require('module/ui/dialog');

    var retUrl = ($m.isOnline ? "http://www.ymatou.com/login?ret=" : "http://www.alpha.ymatou.com/login?ret=") + window.location.href;

    var waterfall = require('module/widget/waterfall'),
        curDomIndex = 0,
        nodes = $(".bask-order .col");
    waterfall({
        "selector": ".bask-order .col",
        "url": "/Order/OrderShow/ShowList?",
        "options": {
            "pageIndex": 1,
            "pagesize": 10
        },
        "increment": "pageIndex",
        "isCol": true,
        callback: function(res, pageIndex, isContinue) {

            var orderlist = res.Result,
                i = 0,
                domIndex,
                len = orderlist.length;
            if (!len) {
                isContinue();
            }
            for (; i < len; i++) {
                domIndex = (i + curDomIndex) % nodes.length;
                nodes.eq(domIndex).append(parseHtml(orderlist[i], i));
                if (i == orderlist.length - 1) curDomIndex = domIndex + 1;
            }

        }
    });


    myDialog = new Dialog();
            alertDialog = new Dialog({
                showTitle : false,
                showFooter : false,
                width : 460,
                height : 460
    });

    function parseHtml(order, i) {


        var html = [],
            Comments = order.Comments,
            Comment, i, proImgs = order.WebProductPic.split(";"),
            maxImgLen = proImgs.length > 2 ? 2 : proImgs.length,
            isSupportPlaceholder = "placeholder" in document.createElement("input"); //建议删除
        html.push([
            '<div class="item" ordershowid="' + order.OrderShowId + '" src="">',
            '   <div class="item-hd j_show_share" data-href="/Order/OrderShow/Detail?Id=' + order.OrderShowId + '">',
            '       <div class="img-box-overflow ' + (proImgs.length > 1 ? "img-box-height" : "") + '"><div class="img-box">'
        ].join(""));
        for (i = 0; i < maxImgLen; i++) {
            html.push('<a class="img_' + i + ' ' + (i == maxImgLen - 1 ? "img_last" : "") + '"  target="_blank" href="/Order/OrderShow/Detail?Id=' + order.OrderShowId + '"><img src="' + proImgs[i] + '" /></a>');
        }
        html.push([
            '</div></div>',
            '       <div class="cover-bt">',
            '           <div class="cover-inner">',
            '               <span class="country-flag"><img src="' + order.SellerFlagUrl + '"></span>',
            '               <span class="price">&yen;' + order.Price + '</span>',
            '               <span class="brands">' + order.Brand + '</span>',
            '           </div>',
            '       </div>',
            '       <div class="cover-top">',
            '           <div class="like-wrap j_praise hide" data-order-id="' + order.OrderShowId + '"><span ' + (order.IsTop ? "class='active'" : "") + '> <i class="c2c-icon i-like-b"></i></span></div>',
            '           <div class="share-wrap share-light j_share">',
            '               <div class="share-type">',
            '                   <span class="weibo">',
            '           <a target="_blank" href="http://service.weibo.com/share/share.php?title=' + encodeURIComponent(order.Description.replace('#', '').replace('@', '')) + '&amp;url=' + encodeURIComponent("http://" + location.host + "/Order/OrderShow/Detail?Id=" + order.OrderShowId) + '&amp;source=bookmark&amp;appkey=2992571369&amp;pic=' + proImgs[0] + '&amp;ralateUid=" class="share-icon i-weibo"></a></span>',
            '                   <span class="weixin" data-order-id="' + order.OrderShowId + '"><a href="#" class="share-icon i-weixin"></a></span>',
            '               </div>',
            '               <span class="share-btn">分享</span>',
            '           </div>',
            '       </div>',
            '   </div>',
            '   <div class="item-bd">',
            '       <p class="opertate">',
            '           <span class="comment" > <i class="c2c-icon i-comment"></i>' + order.CommentNum + '</span>',
            '           <span class="prise" ><i class="c2c-icon i-prise"></i><em class="prise-num">' + order.TopNum + '</em></span>',
            '       </p>',
            '       <div class="user-hd">',
            //'           <a href="/Order/OrderShow/Detail?Id=' + order.OrderShowId + '">',
            '               <img src="' + order.UserLogoUrl + '" class="avator">',
            '               <div class="content">',
            '                   <p class="name">' + order.UserName + '</p>',
            '                   <p class="time"><i class="seller-icon si-time"></i>' + order.StrAddTime + '</p>',
            '               </div>',
            //  '           </a>',
            '       </div>',
            '       <a class="desc" href="/Order/OrderShow/Detail?Id=' + order.OrderShowId + '" target="_blank">' + order.Description + '</a>',
            '   </div>',
            '   <div class="item-ft">',
            '       <ul class="comment">',
        ].join(""))
        for (i = 0; i < Comments.length; i++) {
            Comment = Comments[i];
            html.push('         <li>');
            html.push('             <p class="name">' + (Comment.Anonymity == 1 ? Comment.UserName + "（匿名）" : Comment.UserName) + '</p>');
            html.push('             <p class="content">' + Comment.Content + '</p>');
            html.push('         </li>');
        };
        html.push([
            '       </ul>',
            '       <div class="replay-wrap">',
            '           <div class="fl"><textarea class="replay-area" name="content" placeholder="写你想问的吧~"></textarea></div>',
            '           <div class="fr operateBox">',
            '               <label class="checkbox"><input type="checkbox" name="isHideName">匿名</label>',
            '               <button class="btn c2c-btn j-commentsSend " data-param-id="' + order.OrderShowId + '">发送</button>',
            '           </div>',
            '       </div>',
            '   </div>',
            '</div>',
        ].join(""));

        return html.join("");
    };
    $(".j_show_share").live({
        mouseenter: function() {
            var $this = $(this);
            // $this.find(".cover-bt").fadeIn(400)
            //     .end().find(".j_praise").fadeIn(400);
            $this.find(".j_praise").fadeIn(400);
        },
        mouseleave: function() {
            var $this = $(this);
            // $this.find(".cover-bt").fadeOut(400)
            //     .end().find(".j_praise").fadeOut(400);
            $this.find(".j_praise").fadeOut(400);
        }
    });
    $(".j_share").live("mouseenter", function(event) {
        var _this = $(this);
        _this.find(".share-type").fadeIn(300)
    }).live("mouseleave", function() {
        var _this = $(this);
        _this.find(".share-type").fadeOut(300);
    });
    $(".j_share .weibo").live("click", function() {});
    $(".j_share .weixin").live("click", function(e) {
        e.preventDefault();
        var _this = $(this),
            url = '/order/ordershow/qrcode?size=10&type=0&showId=' + $(this).attr("data-order-id");

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
            url: '/Order/OrderShow/AddOrderShowPraise?orderShowId=' + $(this).attr("data-order-id"),
            success: function(res) {
                if (res.Status == 200) {
                    var $span = _this.find("span"),
                        $em = _this.parents(".item").find(".prise-num"), //_this.find("em"),
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
        })
    })

    function OrderShowComment(self) {
        var _self = $(self),
            name = $('#hidUserName').val();
            $param = _self.parents('.replay-wrap'),
            orderShowId = _self.attr("data-param-id"),
            content = $param.find('[name=content]'),
            commentText = content.val().replace('写你想问的吧~',''), //临时解决方案
            $isHideName = $param.find('[name=isHideName]'),
            status = $isHideName.attr("checked") ? 1 : 0;

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

        $.ajax({
            type: "post",
            url: "/Order/OrderShow/AddOrderShowComment",
            data: "orderShowId=" + orderShowId + "&content=" + encodeURIComponent(commentText) + "&anonymity=" + status,
            success: function(result) {
                if (result.Status == 200) {
                    //评论成功
                    content.val("");
                    $isHideName.attr("checked", false);
                    $('.replay-wrap').find('.operateBox').hide();


                    var subSelf=_self.parent().parent().parent();

                    var htmlBody='<li><p class="name">' + name + '：</p><p class="content">' + commentText + '</p></li>';

                    subSelf.find('.comment').prepend(htmlBody);

                    myDialog.show('评论成功')
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
    });

    $('.replay-area').live('focus', function() {
        $(this).parents('.replay-wrap').find('.operateBox').show();
    }).live('blur', function() {
        if (!$.trim($(this).val()).length) $(this).parents('.replay-wrap').find('.operateBox').hide();
    })

});