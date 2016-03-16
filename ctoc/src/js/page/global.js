Ymt.add(function(require, exports, module) {

    //网站头部导航条 
    var TopBar = require("module/component/topbar");

    //floatbuttons
    var floatBtn = require('module/widget/floatBtn');

    //全部分类
    var categories = require('module/component/categories');

    //图片时钟
    var ImgClock = require('module/widget/imgclock');

    floatBtn();

    var newLayerBox;

    var _isAlpha = /\.alpha\.ymatou.com/.test(location.href);



    var _parseUrlArray = /_ac=([\w_]+)/g.exec(location.href);

    if (_parseUrlArray && _parseUrlArray.length > 0) {
        var _acval = _parseUrlArray[1];
        var _isAlpha = /\.alpha\./i.test(location.href);
        var _acurl = _acval ? "http://ac" + (_isAlpha ? ".alpha" : "") + ".ymatou.com/adrecord_" + _acval : "";
        if (_acurl) {

            $.ajax({
                url: _acurl + "?callback=?",
                dataType: 'jsonp'
            })
        }
    }

    $.ajax({
        url: 'http://op.ymatou.com/getDate?callback=?',
        dataType: "jsonp",
        success: function(data) {
            var curTime = data.dateTime;
            var imgsrc = $('#ImgSmallClockUrl').val();
            ImgClock('#AmericanHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: -5
            });

            ImgClock('#AoXinHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: 10
            });

            ImgClock('#EuropeHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: 1
            });
            ImgClock('#AsiaHome', {
                sprite: imgsrc,
                time: curTime,
                spacing: 28,
                timezone: 9
            });

        }
    })



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

    window.onresize = function() {
        dropdownresize()
    }


    $('#AllCategories').hover(function() {
        dropdownresize();
        sidebar.css('visibility', 'visible');
        $(this).addClass("all-cate-hover");
    });

    $('#AllCategories').mousemove(function(e) {
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

    $('#AllCategories').mouseleave(function(e) {
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
        } else {
            sidebar.css('visibility', 'visible')
        }
        return false;
    });

    $('#site-menus').live('mouseleave', function() {
        sidebar.css('visibility', 'hidden');
        $('#AllCategories').removeClass("all-cate-hover");
    });

    sidebar.live('mouseleave', function() {
        sidebar.css('visibility', 'hidden');
        $('#AllCategories').removeClass("all-cate-hover");
    })

    //indexmenu
    var menu, t1, t2, index = 0,
        navItem = $('#nav-sidebar .nav-item:not(".last")'),
        timeout;
    navItem.each(function(m, n) {
        var pos = null,
            mright, h = $(this).height(),
            w = $(this).width();
        $(this).bind('mouseenter', function(e) {
            $(this).addClass('hover');
            menu.find('li').eq(index).removeClass('current');
            menu.find('li').eq(m).addClass('current')
            menu.show();
        });
        $(this).bind('mouseleave', function(e) {
            $(this).removeClass('hover');
            menu.find('li').eq(m).removeClass('current');
            var y = e.offsetY || e.layerY,
                x = e.offsetX || e.clientX;
            mright = mright && (y > 0 && y < h);
            if (!mright) {
                menu.hide();
                return;
            } else {
                menu.show()
            }
            if (mright && (x >= w)) {
                menu.find('li').eq(m).addClass('current')
            }
            index = m;
            return false;
        });
        $(this).bind('mousemove', function(e) {
            if (pos != null) {
                mright = e.clientX >= pos.x;
            }
            pos = {
                x: e.clientX
            };
            return false;
        });
    });

    //new head nav
    var siteSearch = $('#site-search');
    var searchProduct = $("#site-search .s-default").html() == "商品" ? !0 : !1;
    $('#site-search .s-name').live('mouseenter', function() {
        siteSearch.addClass("sw-type-change");
        var html = $("#site-search .s-default").html() == "商品" ? "店铺" : "商品";
        $('#site-search .s-kind').html('<li>' + html + '</li>').toggle();
        return !1
    });

    $('#site-search .search-type').live('mouseleave', function() {
        $('#site-search .s-kind').hide();
        return !1
    });

    var searchInp = $('#search-inp');
    $('#site-search .s-kind').live('click', function() {
        siteSearch.removeClass("sw-type-change");
        var html = $(this).find('li').html();
        $("#site-search .s-default").html(html);
        searchProduct = html == "商品";
        $('#site-search .s-kind').hide();
        //searchInp.attr('value', searchProduct ? '搜索商品名称 多个关键字用空格分隔' : '搜索买手、店铺名称');
    });
    searchInp.live('keyup', function(e) {
        var key = e.which;
        if (key == 13 && $(this).attr('value') != "") {
            $(this).next().click();
        }
    });
    $('#search-btn').live('click', function() {
        var v = $('#search-inp').val();
        if (v != '' && v != '搜索商品名称 多个关键字用空格分隔') {
            if (searchProduct)
                window.location.href = (_isAlpha ? "http://www.alpha.ymatou.com/Products?k=" : "http://www.ymatou.com/Products?k=") + encodeURIComponent(v);
            else
                window.location.href = (_isAlpha ? "http://www.alpha.ymatou.com/ShopSearch/Search?k=" : "http://www.ymatou.com/ShopSearch/Search?k=") + encodeURIComponent(v);
        } else {
            searchInp.focus();
        }
        return false;
    });

    searchInp.focus(function() {
        searchInp.removeClass('c-gray');
        if ($(this).attr('value') == '搜索商品名称 多个关键字用空格分隔' || $(this).attr('value') == '搜索买手、店铺名称')
            $(this).attr('value', '');
    })
    searchInp.blur(function() {
        if ($(this).attr('value') == '') {
            //$(this).attr('value', searchProduct ? '搜索商品名称 多个关键字用空格分隔' : '搜索买手、店铺名称');
            searchInp.addClass('c-gray');
        }
    })

    //v账户激活
    var vaccount = $('#V_Account_tip')
    $('#V_Account_tip .shut').live('click', function() {
        vaccount.hide()
    });
    $('#V_Account_tip .jihuo').live('click', function() {
        $('#V_Account_tip .shut').click()
        $.ajax({
            type: "POST",
            url: "/Shared/CloseVIPNotice",
            async: true,
            success: function() {},
            error: function() {}
        });
    });



    var currentLayoutTest = $('#topnavigator .area');
    var currentMinWidth = 1000;

    if (currentLayoutTest != null && currentLayoutTest.size() > 0) {
        currentMinWidth = currentLayoutTest.width();
    }
    $('.vbanner').css('min-width', currentMinWidth + 'px');

    $(document).delegate('a[href*="void"]', 'click', function() {
        return !1
    });



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


    var maskHtml = $("<a class='shareMask' target='_blank'></a>");
    //maskHtml = "";
    $('.j_show_share').live("mouseenter", function(event) {
        var _this = $(this),
            _href = $(this).attr('data-href');

        maskHtml.attr('href', _href);

        _this.append(maskHtml).find(".j_share").show();

    }).live("mouseleave", function() {
        var _this = $(this);
        _this.find('.shareMask').remove();
        _this.find(".j_share").hide()
    });

    $(".j_share").live("mouseenter", function(event) {
        var _this = $(this);
        _this.find(".share-type").show()
    }).live("mouseleave", function() {
        var _this = $(this);
        _this.find(".share-type").hide()
    });
    //$(".j_share .weibo").live("click", function() {})

    $(".j_share .weixin").live("click", function(e) {
        e.preventDefault();
        var _this = $(this),
            url = '/order/ordershow/qrcode?size=10&type=2&showId=' + ($(this).attr("data-product-id") || $("#productid").val());

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


    //弹出层
    $('.pop_layout').live('click', function() {
        $(this).parent().fadeOut(80).remove()
    })


    //红包微博分享
    $('.hongbao_share .weibo_s').live('click', function() {

    })

    //微信分享
    $('.hongbao_share .weichat_s').live('click', function() {

    });
    //弥补部分浏览支持placeholder
    $(function() {
        if ('placeholder' in document.createElement("input")) {

            var setVal = function() {
                var $this = $(this);
                if ($this.val() == '') {
                    $this.val($this.attr('placeholder'))
                }
            }

            $(":input[type != hidden]").each(function() {
                setVal.apply(this, arguments)
            })

            $(":input[type != hidden]").live({
                focus: function() {
                    var $this = $(this);
                    $(this).addClass('focus');
                    if ($this.val() == $this.attr('placeholder')) {
                        $this.val('');
                    }
                },
                blur: function() {
                    $(this).removeClass('focus');
                    setVal.apply(this, arguments);
                }
            });
        }
    })
});