/*=======================NGlobal.js===========================*/
/**************************网站头部脚本 Star*********************************/
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器需要使用Ctrl+D进行添加");
        }
    }
}
var struc;
$(function () {

    //头部浮层
    try {
        $('#ConditionVertify .close').live('click', function () {
            $('#ConditionVertify').hide()
        })

        Ymt.load('widget.InfiniteScroll,widget.Timezone,widget.LayerBox,home.indexmenu', function (a, b) {
            struc = Ymt.widget.LayerBox('struc', { zIndex: 998, close: '.closeTrigger', isloc: !0 });
            var shutchs = $('.alert_single .shut');
            shutchs && shutchs.live('click', function () {
                struc.close()
                return false;
            })
            //var cssPlug = 'global1000.css';
            //$('#topmain .site-nav') && Ymt.widget.ClientWidth({
            //    stylesheet: cssPlug,
            //    callback: removeBrand
            //});
            if ($('#toptime').size() > 0) {
                Ymt.widget.InfiniteScroll('#toptime ul', {
                    type: 1,
                    visible: 1
                });
                Ymt.widget.Timezone('#toptime .time_1 .timebox', {
                    timezone: '-5',
                    time: t
                })
                Ymt.widget.Timezone('#toptime .time_2 .timebox', {
                    timezone: '-8',
                    time: t
                })
                Ymt.widget.Timezone('#toptime .time_3 .timebox', {
                    timezone: '+8',
                    time: t
                })
            }

            //会员等级浮层
            try {
                if (memberLogined) {
                    struc.alert('#layer-member-grade');
                }
            } catch (e) { }


            //码头升级卖家提醒
            if ($('#SellerNotice').size() > 0) {
                var NoticeLayerBox = Ymt.widget.LayerBox('struc', {
                    zIndex: 100000000,
                    position: 'rightbottom',
                    isFrame: !1,
                    isloc: !0
                });

                NoticeLayerBox.alert('#SellerNotice')

                $("#SellerNotice .close_notice").bind("click", function () {
                    $.post(closeNoticeUrl, null, null);
                    closeNotice();
                });

                $("#SellerNotice .ignore_notice").bind("click", function () {
                    //$.post(ignoreNoticeUrl, getNoticeIds(), null);

                    $.ajax({
                        url: ignoreNoticeUrl,
                        data: getNoticeIds(),
                        contentType: "application/x-www-form-urlencoded",
                        type: "post"
                    });

                    closeNotice();
                });

                function getNoticeIds() {
                    var ids = '';
                    $("input[name=noticeId]").each(function (index, data) {
                        ids += "noticeIds=" + $(data).val() + "&";
                    });
                    return ids;
                }

                function closeNotice() {
                    NoticeLayerBox.close()
                }

            }


        });

        //下拉菜单
        var sidebar = $('#nav-sidebar'), pos = null, isDirecty;
        if (sidebar.hasClass('nav-sidebar-float')) {
            $('#topnavigator .all').hover(function () {
                var that = $(this);
                that.find('.nav-item').addClass('hover');
                sidebar.css({
                    top: that.offset().top + that.height(),
                    left: that.offset().left,
                    zIndex: 100000000
                })
                sidebar.css('visibility', 'visible')
            });
            $('#topnavigator .all').mousemove(function (e) {
                var that = $(this);
                if (pos != null) {
                    isDirecty = e.clientY >= pos.y;
                }
                pos = {
                    y: e.clientY
                };
                return false;
            });
            $('#topnavigator .all').mouseleave(function (e) {
                var that = $(this), w = that.width();
                var x = e.offsetX || e.layerX, y = e.offsetY || e.clientY;
                isDirecty = isDirecty && (x > 0 && x < w);
                if (!isDirecty) {
                    sidebar.css('visibility', 'hidden')
                    return;
                } else {
                    sidebar.css('visibility', 'visible')
                }
                return false;
            });
            $('#site-menus').live('mouseleave', function () {
                sidebar.css('visibility', 'hidden')
            })
            sidebar.live('mouseleave', function () {
                sidebar.css('visibility', 'hidden')
            })
        }

        //new head nav
        var siteSearch = $('#site-search');
        var searchProduct = $("#site-search .s-default").html() == "商品" ? !0 : !1;
        $('#site-search .s-name').bind('click', function () {
            var html = $("#site-search .s-default").html() == "商品" ? "店铺" : "商品";
            searchProduct = !searchProduct;
            $('#site-search .s-kind').html('<li>' + html + '</li>').show();
            return !1
        });
        var searchInp = $('#search-inp');
        $('#site-search .s-kind').bind('click', function () {
            $("#site-search .s-default").html($(this).find('li').html());
            $('#site-search .s-kind').hide();
            //searchInp.attr('value', searchProduct ? '搜索商品名称 多个关键字用空格分隔' : '搜索买手、店铺名称');
        });
        searchInp.keyup(function (e) {
            var key = e.which;
            if (key == 13 && $(this).attr('value') != "") {
                $(this).next().click();
            }
        });
        $('#search-btn').live('click', function () {
            var v = $('#search-inp').val();
            if (v != '' && v != '搜索商品名称 多个关键字用空格分隔') {
                if (searchProduct)
                    window.location.href = "/promptgoods?k=" + encodeURIComponent(v);
                else
                    window.location.href = "/ShopSearch/Search?k=" + encodeURIComponent(v);
            } else {
                searchInp.focus();
            }
            return false;
        });
        searchInp.focus(function () {
            searchInp.removeClass('c-gray');
            if ($(this).attr('value') == '搜索商品名称 多个关键字用空格分隔' || $(this).attr('value') == '搜索买手、店铺名称')
                $(this).attr('value', '');
        })
        searchInp.blur(function () {
            if ($(this).attr('value') == '') {
                //$(this).attr('value', searchProduct ? '搜索商品名称 多个关键字用空格分隔' : '搜索买手、店铺名称');
                searchInp.addClass('c-gray');
            }
        })


        //头部下拉框
        var selectext = $('.selectext');
        $('.selectext').mouseenter(function () {
            $(this).find('.pr').addClass('hover');
            $(this).find('.icon-phone').addClass('icon-red-phone');
            $(this).addClass('thover');
            return false;
        })
        $('.selectext').mouseleave(function () {
            $(this).find('.pr').removeClass('hover');
            $(this).find('.icon-phone').removeClass('icon-red-phone')
            $(this).removeClass('thover');
            return false;
        });

        //v账户激活
        var vaccount = $('#V_Account_tip')
        $('#V_Account_tip .shut').live('click', function () {
            vaccount.hide()
        });
        $('#V_Account_tip .jihuo').live('click', function () {
            $('#V_Account_tip .shut').click()
            $.ajax({
                type: "POST",
                url: "/Shared/CloseVIPNotice",
                async: true,
                success: function () { },
                error: function () { }
            });
        });

    }
    catch (e) {
    }
})
/***************网站头部脚本over********************************************/
//Old Global
var mtext = $(".mt_text");
if (mtext && mtext.size() > 0) {
    $(".mt_text").each(function () {
        $(this).data("txt", $.trim($(this).val()));
    }).focus(function () {
        $(this).addClass("mt_text_act");
        if ($.trim($(this).val()) == $(this).data("txt")) {
            $(this).val("");
        }
    }).blur(function () {
        $(this).removeClass("mt_text_act");
        if ($.trim($(this).val()) == "") {
            $(this).val($(this).data("txt"));
        }
    });
}

jQuery(function () {
    jQuery.ymatoupost = function (url, data, callback, dataType) {
        jQuery.ajax({
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            url: url,
            data: data,
            success: callback,
            dataType: dataType
        });
    };
    jQuery.ajaxSetup({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        global: true
    });
    jQuery.ajaxSetup({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            return xhr;
        }
    });
    jQuery.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        jQuery.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    jQuery.fn.prop = function (name, value) {
        ///
        ///<summary>1.5.1预先兼容1.6.2</summary>
        ///
        if (name == "checkbox") {
            return jQuery.access(this, name, value, true, jQuery.attr);
        } else {
            return jQuery.access(this, name, value, true, jQuery.attr);
        }
    };

    var currentLayoutTest = $('#topnavigator .area');
    var currentMinWidth = 1000;

    if (currentLayoutTest != null && currentLayoutTest.size() > 0) {
        currentMinWidth = currentLayoutTest.width();
    }
    $('.vbanner').css('min-width', currentMinWidth + 'px');

    $(document).delegate('a[href*="void"]', 'click', function () {
        return !1
    })

});




