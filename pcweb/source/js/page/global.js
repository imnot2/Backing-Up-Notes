define(function (require, exports, module) {

    //网站头部导航条 
    var TopBar = require("../module/component/topbar");

    var floatBtn = require('../module/widget/floatbtn');
    floatBtn()

    var LayerBox = require('../module/widget/layerbox');

    struc = LayerBox('struc', {
        zIndex: 998,
        close: '.closeTrigger',
        isloc: !0
    });

    var newLayerBox;

    var _isAlpha = /\.alpha\.ymatou.com/.test(location.href);

    var shutchs = $('.alert_single .shut');
    shutchs && shutchs.live('click', function () {
        struc.close()
        return false;
    })


    var categories = require('../data/categories');

    //图片时钟
    var ImgClock = require('../module/widget/imgclock');

    $.ajax({
        url: 'http://op.ymatou.com/getDate?callback=?',
        dataType: "jsonp",
        success: function (data) {
            var curTime = data.dateTime;
            var imgsrc = $('#ImgSmallClockUrl').val();
            var hasHover = imgsrc && $('.gb-common-header').size() > 0
            ImgClock('#AmericanHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: -5,
                hasHover: hasHover
            });

            ImgClock('#AoXinHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: 10,
                hasHover: hasHover
            });

            ImgClock('#EuropeHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: 1,
                hasHover: hasHover
            });
            ImgClock('#AsiaHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: 9,
                hasHover: hasHover
            });

        }
    })


    //会员等级浮层
    try {
        if (memberLogined) {
            struc.alert('#layer-member-grade');
        }
    }
    catch (e) {}


    //码头升级卖家提醒
    if ($('#SellerNotice').size() > 0) {
        var NoticeLayerBox = Ymt.widget.LayerBox('struc', {
            zIndex: 100000000,
            position: 'rightbottom',
            isFrame: !1,
            isloc: !0
        });

        NoticeLayerBox.alert('#SellerNotice')

        $("#SellerNotice .close_notice").live("click", function () {
            $.post(closeNoticeUrl, null, null);
            closeNotice();
        });

        $("#SellerNotice .ignore_notice").live("click", function () {
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


    //下拉菜单
    var sidebar = $('#nav-sidebar'),
        pos = null,
        isDirecty;


    function dropdownresize() {
        if ($('#AllCategories')[0]) {
            var hoverPositon = $('#AllCategories').offset();
            var that = $('#AllCategories');
            that.find('.nav-item').addClass('hover');
            sidebar.css({
                top: hoverPositon.top + that.height(),
                left: hoverPositon.left,
                zIndex: 100000000
            })
        }
    }

    window.onresize = function () {
        dropdownresize()
    }


    $('#AllCategories').hover(function () {
        dropdownresize();
        sidebar.css('visibility', 'visible');
        $(this).addClass("all-cate-hover");
    });
    $('#AllCategories').mousemove(function (e) {
        var that = $(this);
        that.addClass("all-cate-hover");
        if (pos != null) {
            isDirecty = e.clientY >= pos.y;
        }
        pos = {
            y: e.clientY
        };
        return false;
    });
    $('#AllCategories').mouseleave(function (e) {
        var that = $(this),
            w = that.width();
        that.addClass("all-cate-hover");
        var x = e.offsetX || e.layerX,
            y = e.offsetY || e.clientY;
        isDirecty = isDirecty && (x > 0 && x < w);
        if (!isDirecty) {
            sidebar.css('visibility', 'hidden');
            that.removeClass("all-cate-hover");
            return;
        }
        else {
            sidebar.css('visibility', 'visible')
        }
        return false;
    });
    $('#site-menus').live('mouseleave', function () {
        sidebar.css('visibility', 'hidden');
        $('#AllCategories').removeClass("all-cate-hover");
    })
    sidebar.live('mouseleave', function () {
        sidebar.css('visibility', 'hidden');
        $('#AllCategories').removeClass("all-cate-hover");
    })

    //indexmenu
    var menu, t1, t2, index = 0,
        navItem = $('#nav-sidebar .nav-item:not(".last")'),
        timeout;
    navItem.each(function (m, n) {
        var pos = null,
            mright, h = $(this).height(),
            w = $(this).width();
        $(this).bind('mouseenter', function (e) {
            $(this).addClass('hover');
            menu.find('li').eq(index).removeClass('current');
            menu.find('li').eq(m).addClass('current')
            menu.show();
        });
        $(this).bind('mouseleave', function (e) {
            $(this).removeClass('hover');
            menu.find('li').eq(m).removeClass('current');
            var y = e.offsetY || e.layerY,
                x = e.offsetX || e.clientX;
            mright = mright && (y > 0 && y < h);
            if (!mright) {
                menu.hide();
                return;
            }
            else {
                menu.show()
            }
            if (mright && (x >= w)) {
                menu.find('li').eq(m).addClass('current')
            }
            index = m;
            return false;
        });
        $(this).bind('mousemove', function (e) {
            if (pos != null) {
                mright = e.clientX >= pos.x;
            }
            pos = {
                x: e.clientX
            };
            return false;
        });
    });
    //menu.live('mouseenter', function () {
    //    navItem.eq(index).addClass('hover')
    //})
    //menu.live('mouseleave', function () {
    //    navItem.eq(index).removeClass('hover')
    //    menu.hide();
    //})

    //new head nav
    var siteSearch = $('#site-search');
    var searchProduct = $("#site-search .s-default").html() == "商品" ? !0 : !1;
    $('#site-search .s-name').live('mouseenter', function () {
        $(".sw-type").addClass("sw-type-change");
        var html = $("#site-search .s-default").html() == "商品" ? "店铺" : "商品";
        $('#site-search .s-kind').html('<li>' + html + '</li>').toggle();
        return !1
    });
    $('#site-search .search-type').live('mouseleave', function () {
        $('#site-search .s-kind').hide();
        return !1
    });
    $('#site-search.sw-type').live('mouseleave', function () {
        $(".sw-type").removeClass("sw-type-change");
        $('#site-search .s-kind').hide();
        return !1
    });
    var searchInp = $('#search-inp');
    $('#site-search .s-kind').live('click', function () {
        $(".sw-type").removeClass("sw-type-change");
        var html = $(this).find('li').html();
        $("#site-search .s-default").html(html);
        searchProduct = html == "商品";
        $('#site-search .s-kind').hide();
        //searchInp.attr('value', searchProduct ? '搜索商品名称 多个关键字用空格分隔' : '搜索买手、店铺名称');
    });
    searchInp.live('keyup', function (e) {
        var key = e.which;
        if (key == 13 && $(this).attr('value') != "") {
            $(this).next().click();
        }
    });
    $('#search-btn').live('click', function () {
        var v = $('#search-inp').val();
        if (v != '' && v != '搜索商品名称 多个关键字用空格分隔') {
            if (searchProduct)
                window.location.href = (_isAlpha ? "http://plist.alpha.ymatou.com/Products?k=" : "http://www.ymatou.com/Products?k=") + encodeURIComponent(v);
            else
                window.location.href = (_isAlpha ? "http://plist.alpha.ymatou.com/ShopSearch/Search?k=" : "http://www.ymatou.com/ShopSearch/Search?k=") + encodeURIComponent(v);
        }
        else {
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
            success: function () {},
            error: function () {}
        });
    });


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
            }
            else {
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
        }
        else {
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
    });

    //老推新弹框。
    $(function () {
        var opt = window.options || {},
            b = opt.NeedCouponAlert,
            html = [],
            tpl, cdnUrl, o;
        if (!b) return;
        $.get("/Shared/CouponAlert?timestamp=" + new Date().getTime(), function (res) {
            o = $.parseJSON(res) || {};
            tpl = o.Temp;
            if (!o.NeedAlert || tpl == "BindUserMobile") return;
            cdnUrl = o.ContentServerUrl;
            html.push('<div class="couponlayerbox"><div class="cont {a}">');
            html.push('<div class="tip clearfix"><i class="icon-font yes">&#x34ae;</i>');
            switch (tpl) {
            case "GetExclusiveCoupon":
                html.push('<div class="coupontext"><p class="info">恭喜你，已获得手机APP专享现金劵</p><p>下载APP购物，立减20元</p></div></div>');
                html.push('<div class="qr"><img src="http://staticontent.ymatou.com/matou_img/code/qr.png" width="98" height="98">');
                html.push('<p>扫一扫，极速下载</p></div>');
                break;
            case "BindUserMobile":
                html.push('<div class="bindtext"><p class="info">恭喜获得手机APP专享现金劵20元</p></div></div>');
                html.push('<div class="bindbtn"><a class="receiveBtn" href="' + o.BindUserMobileUrl + '">绑定手机，去领取</a></div>');
                break;
            }

            html.push('</div><a class="closeBtn" href="javascript:;"></a></div>');
            html = html.join('');

            newLayerBox = LayerBox('temps', {
                zIndex: 1000,
                close: '.closeBtn',
                isloc: !0,
                backgroundColor: 'transparent',
                Temps: html
            });
            newLayerBox.alert({
                "a": ""
            });
        })

    })


    //_ac code monitor
    var _parseUrlObject = $m.parseURL(location.href);

    if (_parseUrlObject.query) {
        var _acval = _parseUrlObject.query['_ac'];
        var _isAlpha = /\.alpha\./i.test(location.href);
        var _acurl = _acval ? "http://ac" + (_isAlpha ? ".alpha" : "") + ".ymatou.com/adrecord_" + _acval : "";
        if (_acurl) {

            $.ajax({
                url: _acurl + "?callback=?",
                dataType: 'jsonp'
            })
        }
    }

})


var ConvertJson = function (m) {
    var json = m.d;
    var value = eval("(" + json + ")");
    return value;
};
//弹出窗口
var AttentionDialog = function (div, pad, sub, error) {
    var $Dialog = $(div);
    var $DialogShadow = $(div + "Shadow");
    var top = (document.documentElement.clientHeight - $Dialog.height() - 20) / 2;
    var left = (document.documentElement.clientWidth - $Dialog.width() - 20) / 2;
    $Dialog.css({
        'top': top,
        'left': left
    }).show();
    $DialogShadow.css({
        'top': top,
        'left': left,
        'height': $Dialog.height(),
        'width': $Dialog.width()
    }).show();

    $("iframe", $Dialog).css({
        "width": "100%",
        "height": "100%"
    });
    $Dialog.bgiframe();
    $DialogShadow.bgiframe();

    var closeFn = function () {
        $Dialog.hide();
        $DialogShadow.hide();
        if (pad != null) {
            $Pad.hide();
        }
    };
    $(".Close", $Dialog).click(function () {
        closeFn();
        return false;
    });

    if (pad != null) {
        var $Pad = $(pad);
        $Pad.show();
        $Pad.bgiframe();
    };

    if (sub != null) {
        $(sub, $Dialog).click(function () {
            if (error != null) {
                if ($(error).validationEngine({
                    returnIsValid: true
                })) {
                    closeFn();
                }
                else {
                    alert("请按要求填写！");
                }
            }
            else {
                closeFn();
            }
        });
    }
};
String.prototype.replaceAll = function (AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return this.replace(raRegExp, ARepText);
};