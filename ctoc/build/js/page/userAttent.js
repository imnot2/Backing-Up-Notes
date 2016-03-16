(function() {
    var ymthost = $m.isOnline ? "http://www.ymatou.com" : "http://www.alpha.ymatou.com",
        loginurl = ymthost + "/login?ret=" + escape(window.location.href),
        contactseller = ymthost + "/Message/Message/ListMessage?contactUserId=";
    //获取分页提交的ids，pagesize：一页几条
    $.getpageids = function(ids, pagesize) {

        var idsarray = ids.split(',');

        var pagecount = Math.floor((idsarray.length + pagesize - 1) / pagesize);

        for (var i = 0; i < pagecount; i++) {

            var strids = '';

            for (var j = 0; j < pagesize; j++) {
                var index = i * pagesize + j;

                if (index > idsarray.length - 1)
                    break;

                strids += idsarray[index] + ',';
            }

            if (strids.length > 0)
                strids = strids.substr(0, strids.length - 1);

            $.idsarray.push(strids);
        }
    };

    $.idsarray = [];

    $.tototalqty = function(qty) {
        if (qty > 9999)
            return '9999+';
        return qty;
    };

    $.getdatetime = function(fromtime) {

        //2015-02-13 22:33:06
        var g = fromtime.split(' ');

        var g0 = g[0].split('-');
        var g1 = g[1].split(':');

        return new Date(g0[0], g0[1], g0[2], g1[0], g1[1], g1[2]);
    };

    $.gettimearray = function(endtime, servertime) {

        var fromtime = new Date(parseInt(endtime.replace(/\D/igm, "")));

        var nowtime = new Date(parseInt(servertime.replace(/\D/igm, "")));

        var fromhours = fromtime.getHours();
        var fromminues = fromtime.getMinutes();

        var nowhours = nowtime.getHours();
        var nowminues = nowtime.getMinutes();

        var hours = fromhours - nowhours;
        var minues = fromminues - nowminues;

        var rtnRst = [0, 0, 0, 0];

        rtnRst[0] = Math.floor(hours / 10);
        rtnRst[1] = Math.floor(hours % 10);
        rtnRst[2] = Math.floor(minues / 10);
        rtnRst[3] = Math.floor(minues % 10);

        return rtnRst;
    };

    $.getnostarttime = function(begintime, servertime) {

        var fromtime = new Date(parseInt(begintime.replace(/\D/igm, "")));

        var nowtime = new Date(parseInt(servertime.replace(/\D/igm, "")));

        if (fromtime.getTime() < servertime.getTime())
            return '';

        var fromyear = fromtime.getFullYear();
        var frommonths = fromtime.getMonth();
        var fromdays = fromtime.getDay();
        var fromhours = fromtime.getHours();
        var fromminues = fromtime.getMinutes();

        var nowyear = nowtime.getFullYear();
        var nowmonths = nowtime.getMonth();
        var nowdays = nowtime.getDay();
        var nowhours = nowtime.getHours();
        var nowminues = nowtime.getMinutes();

        var totalminues = parseInt(fromminues - nowminues);
        var totalhours = parseInt(fromhours - nowhours);
        var totaldays = parseInt(fromdays - nowdays);

        if (totalhours < 1)
            return totalminues + '分钟后';
        else if (totaldays < 1)
            return totalhours + '小时后';
        else if (totaldays < 3)
            return totaldays + '天后,' + frommonths + '月' + fromdays + '日';
        else if (fromyear === nowyear)
            return frommonths + '月' + fromdays + '日';
        else
            return fromyear + '年' + frommonths + '月' + fromdays + '日';

    };

    $.setlivinghtml = function(info, servertime) {
        if (!$('div.living-seller')[0])
            $('div.seller-content').append('<div class="sc-living living-seller"><h3 class="main-title">正在直播的买手(<span id="restcount">' + $('#livingCount').val() + '</span>)</h3></div>');

        var header = '<div class="sc-hd"><a class="seller-address" href="/shangou/activity/detail?activityid=' + info.ActivityId + '" target="_blank"><i class="seller-icon si-site-w"></i><div class="address"><p>' + info.ActivityName + '</p><p class="number">' + info.ShopAddress + '</p></div></a></div>';

        var userinfo = '<div class="user-info"><div class="user-hd"><a href="/seller/seller/index?id=' + info.SellerId + '" target="_blank"><img src="' + info.Logo + '" class="avator"><div class="content"><p class="name">' + info.Seller + '</p><p class="country"><span class="country-flag"><img src="' + info.Flag + '"></span><span class="country-name">' + info.Country + '</span></p></div></a></div><div class="user-bd"><div class="nav-inline"><a href="javascript:void(0)">直播<span class="num">' + $.tototalqty(info.ActivityCount) + '</span></a><a href="javascript:void(0)">粉丝<span class="num">' + $.tototalqty(info.FollowUserNum) + '</span></a><a href="javascript:void(0)">商品<span class="num">' + $.tototalqty(info.TotalProductCount) + '</span></a></div></div><div class="user-ft"><a class="c-btn btn-gray" href="javascript:void(0)" data-area="0" data-sellerid="' + info.SellerId + '"><i lass="seller-icon si-atten"></i>已关注</a><a class="c-btn btn-light" href="' + contactseller + info.SellerId + '" target="_blank">联系买手</a></div></div>';

        var arrtime = $.gettimearray(info.EndTime, servertime);

        var livingcontent = '<div class="living-content"><p class="countDown end"><span class="timeItem">' + arrtime[0] + '</span><span class="timeItem">' + arrtime[1] + '</span><i class="fl">:</i><span class="timeItem">' + arrtime[2] + '</span><span class="timeItem">' + arrtime[3] + '</span></p><div class="desc"><a ref="/shangou/activity/detail?activityid=' + info.ActivityId + '" target="_blank">' + info.ActivityContent + '</a></div><div class="product-list">';

        if (info.ProductPics.length > 0) {
            for (var i = 0; i < info.ProductPics.length; i++) {
                var g = info.ProductPics[i].split('@@');
                livingcontent += '<a class="product" href="/shangou/product/detail?productid=' + info.ProductIds[i] + '" target="_blank"><img src="' + g[0] + '"><span class="cover"><em>¥</em>' + g[1] + '</span></a>';
            }
        }

        livingcontent += '</div></div>';

        var body = '<div class="sc-bd">' + userinfo + livingcontent + '</div>';

        var html = '<div class="sc-item" data-sellerid="' + info.SellerId + '">' + header + body + '</div>';

        $('div.living-seller').append(html);

        $('div.living-seller a[data-sellerid]').unbind('click').bind({
            'click': $.cancelatten
        });
    };

    $.setwillhtml = function(info, servertime) {
        if (!$('div.will-seller')[0])
            $('div.seller-content').append('<div class="will-seller"><h3 class="main-title">将要直播的买手(<span id="restcount">' + $('#willCount').val() + '</span>)</h3></div>');

        var userinfo = '<div class="user-info"><div class="user-hd"><a href="/seller/seller/index?id=' + info.SellerId + '" target="_blank"><img src="' + info.Logo + '" class="avator"><div class="content"><p class="name">' + info.Seller + '</p><p class="country"><span class="country-flag"><img src="' + info.Flag + '"></span><span class="country-name">' + info.Country + '</span></p></div></a></div><div class="user-bd"><div class="nav-inline"><a href="javascript:void(0)">直播<span class="num">' + $.tototalqty(info.ActivityCount) + '</span></a><a href="javascript:void(0)">粉丝<span class="num">' + $.tototalqty(info.FollowUserNum) + '</span></a><a href="javascript:void(0)">商品<span class="num">' + $.tototalqty(info.TotalProductCount) + '</span></a></div></div><div class="user-ft"><a class="c-btn btn-gray" href="javascript:void(0)" data-area="1" data-sellerid="' + info.SellerId + '"><i lass="seller-icon si-atten"></i>已关注</a><a class="c-btn btn-light" href="' + contactseller + info.SellerId + '" target="_blank">联系买手</a></div></div>';

        var livingcontent = '<div class="living-content"><p class="start-time">' + $.getnostarttime(info.BeginTime, servertime) + '</p><a class="seller-address" href="/shangou/activity/detail?activityid=' + info.ActivityId + '" target="_blank"><i class="seller-icon si-site"></i><div class="address"><p>' + info.ActivityName + '</p><p class="number">' + info.ShopAddress + '</p></div></a><div class="desc"><a href="/shangou/activity/detail?activityid=' + info.ActivityId + '" target="_blank">' + info.ActivityContent + '</a></div></div>';

        var body = '<div class="sc-bd">' + userinfo + livingcontent + '</div>';

        var html = '<div class="sc-item" data-sellerid="' + info.SellerId + '">' + body + '</div>';

        $('div.will-seller').append(html);

        $('div.will-seller a[data-sellerid]').unbind('click').bind({
            'click': $.cancelatten
        });
    };

    $.setresthtml = function(info) {
        if (!$('div.rest-seller')[0])
            $('div.seller-content').append('<div class="rest-seller"><h3 class="main-title">休息中的买手(<span id="restcount">' + $('#restCount').val() + '</span>)</h3><div class="rest-seller-list"></div></div>');

        var body = '<div class="sc-item" data-sellerid="' + info.SellerId + '"><div class="sc-bd"><div class="user-info"><div class="user-hd"><a href="/seller/seller/index?id=' + info.SellerId + '" target="_blank"><img src="' + info.Logo + '" class="avator"><div class="content"><p class="name">' + info.Seller + '</p><p class="country"><span class="country-flag"><img src="' + info.Flag + '"></span><span class="country-name">' + info.Country + '</span></p></div></a></div><div class="user-bd"><div class="nav-inline"><a href="javascript:void(0)">直播<span class="num">' + $.tototalqty(info.ActivityCount) + '</span></a><a href="javascript:void(0)">粉丝<span class="num">' + $.tototalqty(info.FollowUserNum) + '</span></a><a href="javascript:void(0)">商品<span class="num">' + $.tototalqty(info.TotalProductCount) + '</span></a></div></div><div class="user-ft"><a class="c-btn btn-gray" href="javascript:void(0)" data-area="2" data-sellerid="' + info.SellerId + '"><i class="seller-icon si-atten"></i>已关注</a><a class="c-btn btn-light" href="' + contactseller + info.sellerId + '" target="_blank">联系买手</a></div></div></div></div>';

        $('div.rest-seller-list').append(body);

        $('div.rest-seller-list a[data-sellerid]').unbind('click').bind({
            'click': $.cancelatten
        });
    };

    $.setempty = function() {
        var html = '<div class="seller_nodata"><div class="seller_icons"><i class="icon icon-followseller"></i>还没有关注任何买手呢~</div><div class="seller_txt"><p>扫一扫</p><p>下载扫货神器APP</p><p>可以搜索买手哦~</p><img src="http://static.ymatou.com//content/home/images/globalqr.jpg" width="200" height="200" /></div></div>';

        $('.seller-content').html(html);
    };

    $.cancelatten = function() {
        var sellerid = $(this).data('sellerid');
        var area = $(this).data('area');

        /*if (!confirm('是否取消关注此买手?'))
            return false;*/

        $.ajax({
            type: 'post',
            url: '/user/Attention/CancelAttentionSeller',
            data: {
                sellerid: sellerid
            },
            success: function(json) {
                if (json.Status === 401) {
                    window.location.href.replace(loginurl);
                    return;
                }

                if (json.Status === 200) {
                    $('div.sc-item[data-sellerid=' + sellerid + ']').remove();

                    var areaid = '';
                    var countid = '';

                    switch (area) {
                        case 0:
                            {
                                areaid = 'living-seller';
                                countid = 'livingcount';
                                break;
                            }
                        case 1:
                            {
                                areaid = 'will-seller';
                                countid = 'willcount';
                                break;
                            }
                        case 2:
                            {
                                areaid = 'rest-seller';
                                countid = 'restcount';
                                break;
                            }
                        default:
                            return;
                    }

                    var curAreaCount = parseInt($('#' + countid).text()) - 1;
                    $('#' + countid).text(curAreaCount);

                    var totalCount = parseInt($('#livingcount').text() || 0) + parseInt($('#willcount').text() || 0) + parseInt($('#restcount').text() || 0);
                    //如果当前类型的买手数量小于1
                    if (curAreaCount < 1) {
                        $('div.' + areaid).remove();
                    }
                    //如果总数少于1
                    if (totalCount < 1) {
                        $.setempty();
                    }
                    var html = $('.user-bd li.current').html();
                    html = html.replace(/\(\s*\d*\s*\)/ig, '(' + totalCount + ')');
                    $('.user-bd li.current').html(html);
                } else
                    alert(json.Msg);
            },
            error: function(error) {}
        });

        return false;
    };

    $(function() {

        if (!$('#sellerids')[0])
            return;

        var ids = $('#sellerids').val();

        if (ids.length === 0)
            return;

        $.getpageids(ids, 10);

        $(window).scroll(function() {
            if ($.idsarray.length === 0)
                return;

            var data = '';

            $.each($.idsarray[0].split(','), function(i, v) {
                data += 'SellerIds=' + v + '&';
            });

            if (data.length > 0)
                data = data.substr(0, data.length - 1);

            $.idsarray.splice(0, 1);

            $.ajax({
                type: 'post',
                url: '/user/Attention/GetAttentionSellerList',
                data: data,
                success: function(json) {

                    if (json.Status === 401) {
                        window.location.href.replace(loginurl);
                        return;
                    }

                    $.each(json.Result, function(i, v) {

                        if (v.ActivityState === 0)
                            $.setlivinghtml(v, json.ServerTime);
                        else if (v.ActivityState === -1)
                            $.setwillhtml(v, json.ServerTime);
                        else
                            $.setresthtml(v);

                    });

                },
                error: function(error) {}
            });
        });

    });

    $('a[data-sellerid]').bind({
        'click': $.cancelatten
    });

})();