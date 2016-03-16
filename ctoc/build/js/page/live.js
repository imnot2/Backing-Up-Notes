    var number = 9, //每次获取数量
        _PostArr = [], //现有所有数据对象[Array[9],Array[9]]
        LiveArr = $('#activityids').val() ? $('#activityids').val().split(',') : [], //当前直播所有ID
        isId = 0,
        retUrl = ($m.isOnline ? "http://www.ymatou.com/login?ret=" : "http://www.alpha.ymatou.com/login?ret=") + window.location.href, //当前请求次数
        timer = null,
        isStart = true,
        isAstat = true,
        even = null,
        pid = $('.plist .pli:last').find('.pli_prodictid').val(),
        aend = true,

        cTrue = true,
        cEnd = true,
        isLoading = false,
        hasData = true;

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

    //直播列表结束时间Switchable
    function endTimes(endDates, newDate) {


        var fromtime = new Date(parseInt(endDates.replace(/\D/igm, "")));
        var serverTime = new Date(parseInt(newDate.replace(/\D/igm, "")));

        ts = fromtime - serverTime;


        var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10) >= 0 ? parseInt(ts / 1000 / 60 / 60 / 24, 10) : 0;
        var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10) >= 0 ? parseInt(ts / 1000 / 60 / 60 % 24, 10) : 0;
        var mm = parseInt(ts / 1000 / 60 % 60, 10) >= 0 ? parseInt(ts / 1000 / 60 % 60, 10) : 0;
        var ss = parseInt(ts / 1000 % 60, 10) >= 0 ? parseInt(ts / 1000 % 60, 10) : 0;

        var isRed = (hh == 0 && mm < 30);

        hh = hh.toString().length > 1 ? hh : "0" + hh;
        mm = mm.toString().length > 1 ? mm : "0" + mm;
        ss = ss.toString().length > 1 ? ss : "0" + ss;

        var sdate = hh.toString() + mm.toString();
        var retDate = [];

        //for (var i in sdate) {
        for (var i = 0; i < sdate.length; i++) {

            //retDate.push(sdate[i]);
            retDate.push(sdate.substring(i, i + 1));
        }

        //{isTrue:false,date:[1,2,3,0]}  未少于30分钟 时间为12:30
        return {
            isTrue: isRed,
            date: retDate
        };
    }
    //判断是否存在有需要继续填充的节点。
    function hasNeedFillNode(node) {
        // var node = $('.li_list:last .sql_content'),
        //     childrenLen = node.children('.cli').length;
        return node.children('.cli').length < 3;
    }

    function templet(liSize, data, serverTime) {

        even = even == null ? (!liSize % 2 == 0) : even;

        var timeModel = '',
            LiveModel = '',
            body = '',

            timeLiModel = '',
            picList = '', //图片列表
            LiveListModel = '',
            t = '',
            lastNode = $('.li_size:last .sql_content'),
            needFill = lastNode.length && hasNeedFillNode(lastNode),
            fillCount = 0;


        for (var i in data) {

            //结束时间与服务当前时间
            var times = endTimes(data[i].EndTime, serverTime);

            //时间模版
            t = "<li><span class=\"clock " + (times.isTrue ? "s1" : "s2") + "\">";
            t += "<span class=\"c1\">" + times.date[0] + "</span>";
            t += "<span class=\"c2\">" + times.date[1] + "</span>";
            t += "<span class=\"c3\">" + times.date[2] + "</span>";
            t += "<span class=\"c4\">" + times.date[3] + "</span></span></li>";

            //一组图片
            for (s in data[i].ProductPics) {
                if (s < 3) {
                    data[i].ProductPics[s] = data[i].ProductPics[s].split('@');

                    picList += "<li><a href=\"/shangou/product/detail?productid=" + data[i].ProductIds[s] + "\" target=\"_blank\"><img src=\"" + data[i].ProductPics[s][0] + "\"/><strong class=\"txt\">￥" + data[i].ProductPics[s][1] + "</strong><span class=\"bg\"></span></a></li>";
                }
            }
            //一组内容
            LiveListModel = "<li class=\"cli\">";
            LiveListModel += "<a class='productLinkBox' href=\"/shangou/activity/detail?activityid=" + data[i].ActivityId + "\" target=\"_blank\"><span class=\"cli_local\">";
            LiveListModel += "<i class=\"icon icon-location\"></i>";
            LiveListModel += "<h5>" + data[i].ActivityName + "</h5>";
            LiveListModel += "<p>" + data[i].ShopAddress + "</p>";
            LiveListModel += "<img src=" + data[i].ActivityPicture + " width=\"100%\" />";
            LiveListModel += "</span></a>";
            LiveListModel += "<span class=\"cli_seller\">";
            LiveListModel += "<span class=\"seller_info\">";
            LiveListModel += "<span class=\"seller_avatar\"><a href=\"/seller/seller/index?id=" + data[i].SellerId + "\" target=\"_blank\"><img src=\"" + data[i].SellerLogo + "\" /></a></span>";
            LiveListModel += "<span class=\"seller_name\">";
            LiveListModel += "<h5><a href=\"/seller/seller/index?id=" + data[i].SellerId + "\" target=\"_blank\">" + data[i].Seller + "</a></h5>";
            LiveListModel += "<p><span class=\"country_logo\"><img src=\"" + data[i].Flag + "\" /></span>" + data[i].Country + "</p>";
            LiveListModel += "</span>";
            LiveListModel += "</span>";
            LiveListModel += "<span class=\"follow_seller\">";
            LiveListModel += "<span class=\"btn " + (!data[i].BeConcerned ? "btn-follow" : "btn-unfollow") + "\" onclick=\"clickFollow(this," + data[i].ActivityId + "," + data[i].BeConcerned + ")\">";
            LiveListModel += "<i class=\"icon " + (!data[i].BeConcerned ? "icon-add" : "icon-check01") + "\"></i><strong class=\"txt\">" + (!data[i].BeConcerned ? "关注" : "已关注") + "</strong>";
            LiveListModel += "</span>"
            LiveListModel += "</span>";
            LiveListModel += "</span>";
            LiveListModel += "<a class=\"cli_des\" href=\"/shangou/activity/detail?activityid=" + data[i].ActivityId + "\">" + data[i].ActivityInfo + " </a><span class=\"cli_product\">";
            LiveListModel += "<ol class='clearfix'>" + picList + "</ol>";
            LiveListModel += "</span>";
            LiveListModel += "</li>";

            if (needFill) {
                lastNode.append(LiveListModel);
                LiveListModel = '';
                picList = '';
                lastNode = $('.li_size:last .sql_content');
                needFill = hasNeedFillNode(lastNode);
                fillCount++;
                continue;
            }

            if ((i - fillCount + 1) % 3 == 0) {

                timeLiModel += t;
                LiveModel += LiveListModel;
                timeModel = "<div class=\"sql_time " + (liSize == 0 ? "linetop" : (even ? "line_s1" : "line_s2")) + "\"><ol class=\"time_list\">" + timeLiModel + "</ol></div>";
                body += "<div class=\"sql_i_list li_size\">" + timeModel + "<ul class=\"sql_content clearfix " + (even ? "line_left" : "line_right") + "\">" + LiveModel + "</ul></div>";
                LiveModel = '';
                timeModel = '';
                timeLiModel = '';
                liSize++;
                even = !even;

            } else {
                timeLiModel += t;
                LiveModel += LiveListModel;
            }

            picList = ""
        }

        if (data.length < 3 && data.length != 0 || (data.length % 3 != 0)) {

            timeModel = "<div class=\"sql_time " + (liSize == 0 ? "linetop" : (even ? "line_s1" : "line_s2")) + "\"><ol class=\"time_list\">" + timeLiModel + "</ol></div>";
            body += "<div class=\"sql_i_list li_size\">" + timeModel + "<ul class=\"sql_content clearfix " + (even ? "line_left" : "line_right") + "\">" + LiveModel + "</ul></div>";
            even = !even
        }

        //判断该直播是否有活动
        var bodyFooter = "";
        if (_PostArr.length != 0) {
            bodyFooter = "<div class=\"sql_i_list\" id=\"endList\"><div class=\"sql_time " + (even ? "linebottom_r" : "linebottom_l") + "\"><div class=\"sq_loaddate\"></div></div></div>";
        }

        return body + bodyFooter;
    }

    //滚动加载直播
    function liveLoad(isLiveArr) {


        //获取现有的模块内li的数量给予 linetop,line_s1或line_s2
        var liveSize = $('.sql_list .li_size').size(); //获取现有行数并删除尾部多余行数
        var saveObj = [],
            PostArr = [], //暂存直播ID对象
            s = 0, //每次请求数据数组次数
            urlParams = "";

        LiveArr = (typeof isLiveArr != 'undefined' ? isLiveArr : LiveArr);


        if (LiveArr.length < 0) {
            return false;
        }

        if (LiveArr && LiveArr.length == 0) {
            $('.sq_live_list').hide()
            $('.sq_nodata').show()
            return false;
        } else {
            $('.sq_live_list').show()
            $('.sq_nodata').hide()
        }


        if (_PostArr.length == 0) {
            //将该国家现有直播ID以number数量分割成多维数组
            for (var i in LiveArr) {
                if (s == (number - 1)) {
                    saveObj.push(LiveArr[i]);
                    PostArr.push(saveObj);
                    saveObj = []
                    s = 0;
                } else {
                    saveObj.push(LiveArr[i]);
                    s++
                }
            }

            //如果现有直播少于number请求数量
            if (saveObj.length < number) {
                PostArr.push(saveObj);
            }

            _PostArr = PostArr;
        }



        if (_PostArr[isId] && _PostArr[isId].length > 0) {


            //开始请求

            //组成参数集用户给予post
            for (var id in _PostArr[isId]) {
                urlParams += "activityids=" + _PostArr[isId][id] + "&";
            }
            urlParams = urlParams.substring(0, urlParams.lastIndexOf('&'));

            if (isStart) {
                isStart = false;

                //请求直播活动
                $.ajax({
                    type: "post",
                    url: "/shangou/activity/GetActivityListByIds",
                    data: urlParams,
                    success: function (result) {

                        $('.sql_list').append(templet(liveSize, result.Result.Activities, result.ServerTime));

                        isId++ //参数递增
                        isStart = true;
                    }
                })
            }
        } else {

            $('.sql_time .sq_loaddate').remove();
            $(".sql_time:last").html("<span class=\"end_txt\">当前的直播被你刷完啦~ 过一会再来看看吧</span>");

        }

    }

    //Tab切换国家
    $('.slt_list li').click(function () {
        var a = $(this).attr('data-desc') && $(this).attr('data-desc') != '' ? $(this).attr('data-desc') : ''; //直播国家
        var b = $(this).attr('data-count') && $(this).attr('data-count') != '' ? $(this).attr('data-count') : false; //直播数量
        var c = $(this).attr('data-groupid') && $(this).attr('data-groupid') != '' ? $(this).attr('data-groupid') : false; //直播国家ID

        if (b && c) {

            _PostArr = [];
            isId = 0;
            even = null

            $('.count').text(b);
            $('.country').text(a)

            $('.sql_list').html("");
            $('.slt_list li').removeClass('active');
            $(this).addClass('active');


            $.ajax({
                type: "GET",
                url: "/shangou/activity/GetActivityIds?groupid=" + c,
                success: function (result) {
                    var isLiveArr = []
                    for (var i in result.Activities) {
                        isLiveArr.push(result.Activities[i].ActivityId)
                    }
                    liveLoad(isLiveArr);
                }
            })

        }
    })

    function parseCategoryAndReturnHtml(categories) {
        var categories;
        var CatalogKinds = {

        }
        var SelfCatalogIds = {

        }
        var CatalogNumber = 0;

        function parseCategory() {
            var categorydetail, index, catalog, key, val;
            for (var i = 0, length = categories.length; i < length; i++) {
                catalog = categories[i].Catalog;
                if (catalog != null && catalog != undefined) {
                    index = catalog.indexOf("@");
                    categorydetail = categories[i].Catalog.slice(index + 1).split(',');
                    if (categorydetail.length == 0) {
                        return;
                    } else {
                        for (var j = 0; j < categorydetail.length; j++) {
                            key = categorydetail[j].split(':');
                            val = key[1];
                            key = 'k' + unicode(key[0])
                            CatalogKinds[key] = CatalogKinds[key] || [];
                            CatalogKinds[key].push(val);
                        }
                    }
                } else if (catalog == null || catalog == undefined) {
                    $("#hidCatalogId").val(categories[i].CatalogId);
                }
            }
            for (var m in CatalogKinds) {
                CatalogNumber += 1;
                CatalogKinds[m] = delrepeat(CatalogKinds[m]);
                parseSelfCatalogIds(CatalogKinds[m], m);
            }
            //console.log(SelfCatalogIds)
            return parseHtml(SelfCatalogIds);
        }



        function parseSelfCatalogIds(kinds, key) {
            var k;
            for (var i = 0, len = categories.length; i < len; i++) {
                for (var j = 0; j < kinds.length; j++) {
                    if (categories[i].Catalog.indexOf(codeToChar(key) + ':' + kinds[j]) > -1) {
                        k = unicode(kinds[j]);
                        SelfCatalogIds[key] = SelfCatalogIds[key] || {};

                        SelfCatalogIds[key]['v' + k] = SelfCatalogIds[key]['v' + k] || [];
                        SelfCatalogIds[key]['v' + k].push(categories[i].CatalogId)
                    }
                }
            }
        }


        function parseHtml(obj) {
            var str = [],
                key;
            str.push('<div class="size">');
            for (var i in obj) {
                key = codeToChar(i);
                str.push('<p>商品' + key + ':');
                for (var j in obj[i]) {
                    str.push(codeToChar(j) + '，');
                }
                if (str[str.length - 1]) {
                    str[str.length - 1] = str[str.length - 1].slice(0, -1);
                }
                str.push('</p>');
            }

            str.push('</div>');
            return str.join('');
        }

        function codeToChar(str) {
            str = str.slice(1).split('-');
            for (var i = 0; i < str.length; i++) {
                str[i] = String.fromCharCode(str[i]);
            }
            return str.join('');
        }

        function unicode(str) {
            var s = [];
            for (var i = 0, length = str.length; i < length; i++) {
                s.push(str.charCodeAt(i));
            }
            return s.join('-');
        }

        function delrepeat(arr) {
            var yy = [];
            for (var i = 0; i < arr.length; i++) {
                if ($m.indexOf(arr[i], yy) == -1) {
                    yy.push(arr[i]);
                }
            }
            return yy;
        }


        return parseCategory();
    }


    var activityHtml = function (data) {

        var body = "",
            i, n;

        for (i in data) {


            var status = '',
                pics = data[i]['ProductPics'];
            if (data[i].TariffType && data[i].FreeShipping) {
                status = "<span class=\"labels_b labels_b_red\">包邮包税</span>";
            } else if (data[i].TariffType == 0) {
                status = "<span class=\"labels_b labels_b_red\">包税</span>";
            } else if (data[i].FreeShipping) {
                status = "<span class=\"labels_b labels_b_red\">包邮</span>"
            }

            var a = "",
                b = "",
                c = "";

            body += '<div class="pli">';
            body += '<input type="hidden" name="prodictid" class="pli_prodictid" value="' + data[i].ProductId + '">';
            body += '<div class="pic j_show_share" data-href="/shangou/product/detail?productid=' + data[i].ProductId + '">';
            body += '<div class="share-wrap j_share share-light">';

            body += '<div class="share-type" style="display: none;">';
            body += '<span class="weibo"><a class="share-icon i-weibo" href="http://service.weibo.com/share/share.php?title=' + data[i].ProductDesc + '&amp;url=' + encodeURIComponent("http://" + location.host + "/shangou/product/detail?productid=" + data[i].ProductId) + '&amp;source=bookmark&amp;appkey=2992571369&amp;pic=' + data[i].ProductPics[0] + '&amp;ralateUid=" target="_blank"></a></span>';
            body += '<span class="weixin" data-product-id="' + data[i].ProductId + '"><strong class="share-icon i-weixin"></strong></span>';
            body += '</div>';
            body += '<span class="share-btn j_praise">分享</span>';
            body += '</div>';

            if (pics.length >= 4) {
                body += '<ul class="pic_list">';
                for (n = 0; n < 4; n++) {
                    body += '<li class="item' + n + '"><a href="/shangou/product/detail?productid=' + data[i].ProductId + '" target="_blank"><img width="150" src="' + pics[n] + '"></a></li>';
                }
                body += '</ul>';
            } else {
                body += '<a href="/shangou/product/detail?productid=' + data[i].ProductId + '" target="_blank"><img width="100%" src="' + pics[0] + '"></a>';
            };

            body += '</div>';
            body += '<div class="info">';
            body += '<div class="mian">';
            body += '<div class="title">';
            body += '<a href="/shangou/product/detail?productid=' + data[i].ProductId + '" target="_blank">';
            body += status + " " + data[i].ProductDesc + '</a>';
            body += '</div>';
            body += parseCategoryAndReturnHtml(data[i].Catalogs);

            body += '</div>';
            body += '<div class="outher">';
            body += '<div class="price">';
            body += '<span>预估到手价</span>';
            body += '<strong>￥' + data[i].Price + '</strong>';
            body += '</div>';
            body += '<div class="buybtn">';
            if (data[i].StockNum > 0) {
                body += '<a class="btn btn-buy" href="/order/order/buy?pid=' + data[i].ProductId + '">立刻购买</a>';
            } else {
                body += '<a class="btn btn-unbuy" href="javascrpt:void(0)">已售罄</a>';

            }

            body += '</div>';
            body += '</div>';
            body += '</div>';
            body += '<div class="comment">';
            body += '<div class="ct"><i class="icon icon-comment"></i>评论' + data[i].CommentCount + '</div>';
            body += '<div class="cli">';
            if (data[i].Comments.length > 0) {
                body += '<ol>';
                $(data[i].Comments).each(function (m, comment) {
                    body += '<li><h6>' + comment.UserName + '：</h6><p>' + comment.Content + '</p></li>'
                })
                body += '</ol>';
            }
            body += ' </div>';
            body += '<div class="csend">';
            body += '<textarea name="content"></textarea>';
            body += '<span class="fl">';
            body += '<label class="label"><input type="checkbox" id="a_commentCheckbox" name="isHideName">匿名</label>';
            body += '</span>';
            body += '<span class="btn btn-mini j-commentsSend fr" data-param-id="' + data[i].ProductId + '">发送</span>';
            body += '</div>';
            body += '</div>';
            body += '</div>';

        }

        return body;

    }


    function loadActivity(activityid) {
        if (pid !== undefined && aend && !isLoading && hasData) {
            aend = false;
            var url = '/shangou/activity/GetActivityProductList?ActivityId=' + activityid + '&LastProductId=' + pid;
            isLoading = true;
            $.ajax({
                type: "GET",
                url: url,
                success: function (result) {
                    if (result.Status == 200) {
                        if (result.Result.length > 0) {
                            aend = true;
                            $('.live_product .plist').append(activityHtml(result.Result));
                            pid = result.Result[(result.Result.length - 1)].ProductId;
                        } else {
                            hasData = false;
                        }
                        //window.location.href = retUrl;
                    } else {
                        alert(result.Msg)
                    }

                },
                complete: function () {
                    console.log("complete");
                    isLoading = false;
                }
            })
        }
    }



    var OutTime = 0;
    $(window).scroll(function () {
        if (OutTime) clearTimeout(OutTime);
        OutTime = setTimeout(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
            if ($('.sq_live_list').length > 0) {
                var box = $('.sq_live_list');
                var boxoffset = box.offset();
                var boxHeight = parseInt(box.css("height"));

                if (boxHeight + boxoffset.top <= scrollTop + windowHeight) {

                    if (LiveArr.length > 0) {
                        liveLoad();
                    } else {
                        $('.sql_time .sq_loaddate').remove();
                        $(".sql_time:last").html("<span class=\"end_txt\">当前的直播被你刷完啦，过一会再来看看吧。</span>");
                    }


                }
            }

            if ($('.live_product .plist').length > 0) {
                var abox = $('.live_product .plist');
                var aboxoffset = abox.offset();
                var aboxHeight = parseInt(abox.css("height"));

                var activityid = $('#activityid').val();
                if (scrollHeight - $('.footer').height() - scrollTop - windowHeight <= 303) loadActivity(activityid);

            }
        }, 100)

    })

    /*
     * @name 浮动回复框
     * @Description 需要添加浮动外框增加fixedReplay 即可，当
     *              需要显示会增加一个fixed-replay-warp ，如果样式有差异 可以针对fixed-replay-warp进行覆盖
     */

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

    /**
     * @name 加关注绑定
     * @parma 根据两个属性 data-is-follow 判断是加关注还是取消
     *                     data-follow-id 关注的编号
     *
     */
    $(".j_follow").live("click", function () {
        var _this = $(this),
            isFollow = _this.attr("data-is-follow") == "false";
        clickFollow(this, _this.attr("data-follow-id"), isFollow);
    })

    function clickFollow(self, id, BeConcerned) {

        var self = $(self);
        var url = "";

        if (self.attr('class').indexOf("btn-follow") != -1) {
            url = "/user/Attention/AttentionSeller";
            self.find(".icon").removeClass("icon-add").addClass("icon-check01");
            self.addClass("btn-unfollow").find(".txt").text("已关注");
        } else {
            url = "/user/Attention/CancelAttentionSeller";
            self.find(".icon").removeClass("icon-check01").addClass("icon-add");
            self.removeClass("btn-unfollow").find(".txt").text("关注");
        }


        $.ajax({
            type: "post",
            url: url,
            data: {
                SellerId: id,
                BeConcerned: BeConcerned
            },
            success: function (result) {
                if (result.Status != 200) {
                    window.location.href = retUrl;
                } else {
                    //关注和评论数量假数据
                    var count = parseInt($('#FocusCount').html());
                    if (!self.hasClass('btn-unfollow')) {
                        count = count > 0 ? count - 1 : 0;
                    } else {
                        ++count;
                    }
                    $('#FocusCount').html(count);

                    if (self.attr('class').indexOf("btn-follow") != -1) {
                        self.removeClass("btn-follow")
                            .addClass("btn-unfollow")
                            .find(".txt").text("已关注").end()
                            .find(".icon")
                            .removeClass("icon-add")
                            .addClass("icon-check01");;
                    } else {
                        self.find(".icon")
                            .removeClass("icon-check01")
                            .addClass("icon-add").end()
                            .removeClass("btn-unfollow")
                            .addClass("btn-follow")
                            .find(".txt").text("关注");
                    }



                }

            }
        })
        return !1;
    }

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
    }

    //显示评论
    var showComment = function (data) {

        for (i in data) {
            if (/\/Date\(\d*\)\//.test(data[i].AddTime)) {
                tmpTime = data[i].AddTime.replace(/[^0-9]/g, "");
                tmpDate = new Date(parseInt(tmpTime, 10));
                data[i].AddTime = beforeTime(new Date(parseInt(tmpTime)).getTime());
            }
        }
        //beforeTime


        var tpls = [
                '<li><input type="hidden" name="commentid" value="{{CommentId}}">',
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
                data[i].showName = "匿名";
            }
            if (/\/Date\(\d*\)\//.test(data[i].AddTime)) {
                tmpTime = data[i].AddTime.replace(/[^0-9]/g, "");
                tmpDate = new Date(parseInt(tmpTime, 10));
                data[i].AddTime = tmpDate.getFullYear() + "年" + (tmpDate.getMonth() + 1) + "月" + tmpDate.getDate() + "日";
            }
            contents += compileTpls(tpls.join(''), data[i]);
        }
        return contents;
    }



    //滚动留言显示
    $m.load("module/widget/waterfall", function (waterfall) {
        waterfall({
            "selector": ".comments",
            "url": "/shangou/Product/GetProductCommentList?",
            "options": {
                "ProductId": $("#productid").val(),
                "LastCommentId": 0,
                "CommentNum": '10'
            },
            "increment": "LastCommentId",
            callback: function (res) {
                var result = res.Result || [];
                $(".comments").append(showComment(result));

                if (result.length < 0) {
                    cTrue = false;
                }
                return result.length && result[result.length - 1]['CommentId'];
            }
        });
    });


    $m.load("module/widget/slide", function (Slide) {
        Slide('#FocusImages', {
            panels: '.images .item',
            triggers: '.focus .item',
            effect: 'fade',
            hasDirection: !0,
            directionTriggers: ['.prevarrow', '.nextarrow'],
            interval: 3,
            triggerType: 'mouse'
        });
    });

    function OrderShowComment(self, selfcommentlist) {
        var _self = $(self),
            $param = _self.parent(),
            orderShowId = _self.attr("data-param-id"),
            content = $param.find('[name=content]'),
            commentText = content.val().replace(/^\s+|\s+$/g, ""),
            status = $param.find('[name=isHideName]').attr("checked") ? 1 : 0;



        if (!commentText || commentText == '' || /^\s/.test(commentText)) {
            alert("评论内容不允许为空！");
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
            url: "/shangou/product/AddComment",
            data: "ProductId=" + orderShowId + "&content=" + commentText + "&anonymity=" + status,
            success: function (result) {
                if (result.Status == 200) {
                    //评论成功
                    content.val("");

                    //商品详情、晒单详情评论假数据 
                    if ($('#p_comment').size() > 0) {
                        var count = parseInt($('#p_comment .CommentCount').html()) + 1;
                        $('#p_comment .CommentCount').html(count)
                        name = status ? '爱海购的TA' : name;
                        $('#p_comment .comments').prepend('<li><p><span class="name">' + name + '</span><span class="time"><em></em>刚刚</span></p><h3 class="article">' + commentText + '</h3></li>');
                    }
                    // else {
                    //     name = _self.closest('.comment').find('[name="isHideName"]').attr('checked') ? '爱海购的TA' : name;
                    //     var _commentBox = _self.closest('.comment').find('.cli');
                    //     if (_commentBox.find('ol').size() > 0) {
                    //         _commentBox.find('ol').prepend('<li><h6>' + name + '：</h6><p>' + commentText + '</p></li>');
                    //     } else {
                    //         _commentBox.prepend('<ol><li><h6>' + name + '：</h6><p>' + commentText + '</p></li></ol>');
                    //     }
                    // }

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
    });

    //新手引导
    Ymt.add(function (require, exports, module) {

        var cookie = require('module/util/cookie');
        var isOlder = cookie.get('isOlder');
        var isIndex = location.pathname === '/';
        var top = ($(window).height() - 568) / 2;
        if (!isOlder && isIndex) {
            //if (true) {
            var newerGuideHtml = [];
            newerGuideHtml.push('<div id="mask" style="display:block">');
            newerGuideHtml.push('<div class="mask-inner">');
            newerGuideHtml.push('<div class="step1" style="margin-top:' + top + 'px">');
            newerGuideHtml.push('<p><span  class="new-tips nt-step1"></span></p>');
            newerGuideHtml.push('<p class="new-tips nt-next" id="J-step1"></p>');
            newerGuideHtml.push('</div>');
            newerGuideHtml.push('<div class="step2" style="display:none;margin-top:' + top + 'px">');
            newerGuideHtml.push('<p><span  class="new-tips nt-step2"></span></p>');
            newerGuideHtml.push('<p class="new-tips nt-next" id="J-step2"></p>');
            newerGuideHtml.push('</div>');
            newerGuideHtml.push('<div class="step3" style="display:none">');
            newerGuideHtml.push('<span  class="new-tips nt-step3-1"></span>');
            newerGuideHtml.push('<span  class="new-tips nt-step3-2"></span>');
            newerGuideHtml.push('<span  class="new-tips nt-step3-3"></span>');
            newerGuideHtml.push('<span  class="new-tips nt-step3-4"></span>');
            newerGuideHtml.push('<p id="J-close"><span class="new-tips nt-close"></span></p>');
            newerGuideHtml.push('</div>');
            newerGuideHtml.push('</div>');
            newerGuideHtml.push('</div>');
            scrollTo(0, 0);
            $('body').append(newerGuideHtml.join(''));
            $('body').css('overflow', 'hidden');
            //$("#mask").css('height', $(document).height());
            //$("#mask .mask-inner").css('left', ($(document).width() - $("#mask .mask-inner").width()) / 2);
            //$(".step1,.step2").css("margin-top", ($(window).height() - 568) / 2);
            $("#J-step1").click(function () {
                $(".step1").hide();
                $(".step2").show();
            })
            $("#J-step2").click(function () {
                $(".step2").hide();
                $(".step3").show();
            })
            $("#J-close").click(function () {
                $('body').css('overflow', 'auto');
                $("#mask").remove();

            });
            cookie.set('isOlder', true);
        }
    });
    //商品详情评论。
    + (function () {
        if ($('#p_comment').size() > 0) {

            var tabBox = $('.fix_tab'),
                detailTop = $('.p_main').offset().top,
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
            $('ul.fl li').bind('click', function (e) {
                detailTop = $('.p_main').offset().top;
                commentTop = $('#p_comment').offset().top - tabBox.height();
                selectCur($(this));
                //scrollToNode($(this));
            })
            $(window).scroll(function () {
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
        }

    })()