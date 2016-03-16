$('.show-pop').click(function () {
    $('.pop-allcontent').show();
})
$('.pop-allcontent .close').click(function () {
    $('.pop-allcontent').hide();
});

$('#xshop-list li').hover(function () {
    $(this).find('.item-box').addClass('active');
    $(this).find('.item-box').css({"z-index":"999999"})
    $(this).find('.pdremark').show();
}, function () {
    $(this).find('.item-box').removeClass('active')
    $(this).find('.item-box').css({ "z-index": "1" })
    $(this).find('.pdremark').hide();
})
$('.popover').hover(function () {

    $('.popover-win').show();
}, function () {
    $('.popover-win').hide();
})

//
$('.other-sort input[type=checkbox]').click(function () {
    $('.other-sort .sort-xbtn').show();
})

//右侧鼠标经过事件
// $('.right-content ul li').live({
//     mouseenter: function () {
//         $(this).addClass('active');
//     },
//     mouseleave: function () {
//         $(this).removeClass('active');
//     }
// })


////猜你喜欢分页切换
//$('.tab-bd .guess-ul:first').show();
//$('.tab-page a').mouseover(function () {
//    $('.tab-bd .guess-ul').stop().fadeOut(100);
//    $('.tab-bd .guess-ul:eq(' + $('.tab-page a').index(this) + ')').stop().fadeIn(200);
//})

$('#productTypeCheck').click(function () {
    if ($('#inputavi').attr('checked') == true) {
        $('#formProtected').val('1');
    }
    else {
        $('#formProtected').val('0');
    }
    if ($('#inputmall').attr('checked') == true) {
        $('#formMall').val('1');
    }
    else {
        $('#formMall').val('0');
    }
    $('#subForm').submit();
    return false;
});
$('#sortType').change(function () {
    $('#formSort').val($(this).val());
    $('#subForm').submit();
});

function ChangeSort(sort) {
    $('#formSort').val(sort);
    $('#subForm').submit();
}

$(function() {
    $('#SeeLikedProducts').mouseover(function () {
        $('#LikedProducts').show();
        $('#VisitedProducts').hide();
        $(this).parent().addClass('active');
        $('#SeeVisitedProducts').parent().removeClass('active');
    });
    $('#SeeVisitedProducts').mouseover(function () {
        $('#LikedProducts').hide();
        $('#VisitedProducts').show();
        $(this).parent().addClass('active');
        $('#SeeLikedProducts').parent().removeClass('active');
    });
    var scrollLoaded = false;
    j$(window).scroll(function () {
        if (scrollLoaded == false) {

           // $.getJSON($('#LikedProductsRecommendUrl').val(), function (data) { $('#LikedProducts ul').html(data.content); });
           var _url = $('#LikedProductsRecommendUrl').val(),
               ad_recmd = $("#input_hidden_ad_recmd_all").val(),
               _href = $m.isOnline ?'http://www.ymatou.com':'http://www.alpha.ymatou.com';
           $.ajax({
                url:_url,
                dataType: "jsonp",
                success:function(res){
                    var html = [],
                    i,
                    j,
                    data = res.Blocks || [],
                    o;
                    for(j=0;j<data.length;j++){
                        for (i = 0; i < data[j].Products.length; i++) {
                            o = data[j].Products[i];
                            html.push('<li><div class="item-box">');
                            html.push('<div class="pic"><a href="'+_href+'/product/'+o.PID+'.html?'+ad_recmd+'" target="_blank"><img src="' + o.Pic + '"></a></div>');
                            html.push('<h3><a href="'+_href+'/product/'+o.PID+'.html?'+ad_recmd+'" target="_blank" title="'+o.Name+'">' + o.Name + '</a></h3>');
                            html.push('<div class="row"><div class="col price"><i class="xbtn-icon icon-price"></i> <strong>'+o.Price+'</strong></div>');
                            html.push('<div class="col shipping last"><i class="xbtn-icon '+(o.IsMall ? "icon-business":"")+'" title="'+(o.IsMall ? "海外认证商家":"")+'"></i><a href="http://www.ymatou.com/Mall/'+o.SellerID+'" title="'+o.SellerName+'" target="_blank" rel="nofollow">'+o.SellerName+'</a></div></div></div></li>');
                        }
                    }
                    $('#LikedProducts ul').append(html.join(''));
                }
            })

            scrollLoaded = true;
        }
    });
    // $.getJSON($('#RghtRecommendUrl').val(),i function (data) { $('#RightRecommend').html(data.content); });

});
$m.load('util.imglazyload,widget.Vscroll,widget/countdown', function (imglazyload, Vscroll,CountDown) {

    $.get("/shared/GetC2CRecProductForRight", { rand: Math.random() }, function (v_data) {
        $('#RightRecommend').html(v_data);
        //扫货倒计时
        $(".recomment-item").each(function () {
            var that = $(this),
            _index = that.index() + 1,
            activityEndTime = parseInt($("#ShCountdown_id" + _index, that).attr("endtime"));
            CountDown("#ShCountdown_id" + _index, {
                date: activityEndTime,
                isHasSecond: !1,
                timeItemCls: 'timeItem',
                prevText: '',
                afterText: '',
                remindTime: 60 * 30,
                remindBgColor: '#dd3333'
            })
        });

        $(".recomment-item").live("mouseenter", function () {
            var _this = $(this);
            _this.addClass("order-item-hover");
            var j_share = _this.find(".share-wrap");
            j_share.addClass("share-wrap-show");
            shareFun(j_share);

        }).live("mouseleave", function () {
            var _this = $(this);
            _this.removeClass("order-item-hover");
            _this.find(".share-wrap").removeClass("share-wrap-show");
        })

        function shareFun(obj) {
            $(obj).live("mouseenter", function (event) {
                var _this = $(this);
                _this.find(".share-type").fadeIn(300);
            }).live("mouseleave", function () {
                var _this = $(this);
                _this.find(".share-type").fadeOut(300)
            })

            $(obj).find(".weixin").live("click", function () {
                var _this = $(this),
                    _img = _this.attr("wxurl");

                var shareNodeHtml = '<div id="mask" style="display:none"><div class="mask-warp"><div class="mw-bd"><h3>打开微信”扫一扫“,然后点击手机屏幕右上角分享按钮</h3><p id="shareimg"><img src="" /></p></div></div></div>';
                $mask = $("#mask");
                if (!$mask[0]) {
                    ($mask = $(shareNodeHtml)).appendTo('body');
                }
                var $window = $(window);
                $mask.one("click", function () {
                    $(this).hide();
                }).find("#shareimg")
                    .html('<img src='+_img+' />').end()
                    .show().find(".mask-warp").css({
                        height: $("body").height()
                    }).find(".mw-bd")
                    .css({
                        top: (document.documentElement.clientHeight - $(".mw-bd").height()) / 2 + $(document).scrollTop()
                    });
            });
        }
    })
//
    imglazyload('.row-left');
    Vscroll("#LikedProducts", {
        panel: ".panel",
        content: ".panel ul",
        event: "mouse",
        auto: !0,
        trigger: ".xbtn"
    });

});


