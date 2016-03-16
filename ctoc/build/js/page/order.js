Ymt.add(function(require, exports, module) {
    var addresss = require('module/component/address');
    addresss('#AddressList', {
        //页面中的隐藏域
        importAddrssCls: '#hidAddressId',
        addressApiHost: '',
        selectAddress: function(address) {
            if ($('.userinfo .address').size() == 0) {
                $('.userinfo').html('<p>寄送至：<span class="address">' + address.Area + ' ' + address.DetailAddress + '</span></p><p>收件人：<span class="name">' + address.Addressee + '</span><span class="phone">' + address.Phone + '</span></p>');
            } else {
                $('.userinfo .address').html(address.Area + " " + address.DetailAddress);
                $('.userinfo .name').html(address.Addressee);
                $('.userinfo .phone').html(address.Phone);
            }

        }
    });

    $('.add-del-count').attr('unselectable', 'on')
        .css({
            '-moz-user-select': '-moz-none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        }).bind('selectstart', function() {
            return false;
        });
    //添加商品数量
    NeedPayAmount();
    var LimitedNumber = parseInt($("#hidLimitedNumber").val()) || 0;
    var stockCount = parseInt($('#Stock').text()) || 0;
    $("#txtNum").bind({
        keyup: function() {
            var reg = /[^\d]|^0*/g;
            $(this).val($(this).val().replace(reg, ""));
            $(this).val() == "" || $(this).val(parseInt($(this).val()));
            NeedPayAmount();
            return false;
        },
        focus: function(e) {
            this.select();
            e.stopPropagation();
            e.preventDefault();
        },
        mouseup: function(e) {
            this.select();
            e.stopPropagation();
            e.preventDefault();
        },
        change: function(e) {
            this.select();
            e.stopPropagation();
            e.preventDefault();
            NeedPayAmount();
        }
    });
    $(".clearfix span").live('click', function(e) {
        addDelHander(this);
        NeedPayAmount();
    });
    //add del 购买数量
    function addDelHander(o, textNum) {
        var el = textNum || $("#txtNum"),
            count = textNum && textNum.val() || el.val();

        if ($(o).hasClass("op_disabled")) return;
        if ($(o).hasClass("add")) {
            count++;
            if (!isLtMin(count, 1)) $(o).siblings('.del').removeClass('op_disabled');
            if (isOverstepLimit(count)) {
                $(o).addClass('op_disabled');
                alert('限购' + LimitedNumber + '件');
                el.val(--count);
                return;
            }

            // if (LimitedNumber) {
            //     if (count > LimitedNumber) {
            //         alert('限购' + LimitedNumber + '件');
            //         el.val(--count);
            //         $(o).addClass('op_disabled');
            //         return;
            //     }
            // }
            if (count == stockCount) {
                $(o).addClass('op_disabled');
            }
            if (count > stockCount) {
                $(o).addClass('op_disabled');
                alert('库存不够');
                el.val(stockCount);
                return;
            }
            el.val(count);
        }
        if ($(o).hasClass("del")) {
            count--;
            count = count < 1 ? 1 : count;
            el.val(count);
            if (isLtMin(count, 1)) $(o).addClass('op_disabled');
            if (!isOverstepLimit(count)) $(o).siblings('.add').removeClass('op_disabled');
        }
    };
    //验证当前购买的数量是否超出限购
    function isOverstepLimit(count) {
        return LimitedNumber && count > LimitedNumber;
    };
    //验证是否小于最小购买数
    function isLtMin(count, min) {
        return count <= min;
    };
    //计算需支付金额
    function NeedPayAmount() {
        var num = $("#txtNum").val();
        var earnest = $("#hidEarnest").val();
        if (parseInt(earnest) > 0 && parseInt(num) > 0) {
            $("#needPayAmount").html(parseInt(earnest) * parseInt(num));
            GetUserAccountInfo($("#hidProductId").val(), parseInt(num), $("#hidSellerId").val());
        } else {
            $("#needPayAmount").html(0);
        }
    }


    //    $('.add-del-count .add').live('click', function() {
    //        numberchange(1);
    //    });
    //    $('.add-del-count .del').live('click', function() {
    //        numberchange(-1);
    //    });
    //    $('.add-del-count .count').live('change', function() {
    //        numberchange($(this).val(), !0);
    //    });

    //    function numberchange(num, isChange) {
    //        var countElem = $('.add-del-count .count');
    //        num = parseInt(num);
    //        var count = countElem.val() || 1;
    //        if (/^-?\d+$/.test(num)) {
    //            count = parseInt(count);
    //            if (count == 1 && num < 0) {
    //                alert('最小数量为1');
    //            } else {
    //                if (LimitedNumber) {
    //                    if (count + num > LimitedNumber || isChange > LimitedNumber) {
    //                        alert('限购' + LimitedNumber + '件');
    //                        return;
    //                    }
    //                }
    //                if (isChange) {
    //                    countElem.val(num < 0 ? 1 : num);
    //                } else {
    //                    countElem.val(count + num);
    //                }

    //            }
    //        } else {
    //            alert('请输入数字');
    //            countElem.val(1);
    //        }

    //    }



    //规格的思路，每个规格属性（红色）都知道自己拥有哪些CatalogId，别的种类（比如尺寸）里规格属性和自己没有共同id值的为disabled

    var categories;
    var CatalogKinds = {

    }
    var SelfCatalogIds = {

    }
    var CatalogNumber = 0;

    $(function() {
        GetCatalogData();
    });

    function GetCatalogData() {
        $.ajax({
            type: "get",
            async: false,
            url: "/Order/Order/GetProductCatalogs?productId=" + $("#hidProductId").val(),
            dataType: "jsonp",
            success: function(data) {
                categories = data.Result;
                parseCategory();
            },
            error: function() {

            }
        });
    }

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
        parseHtml(SelfCatalogIds);
        bindEvent();
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



    function bindEvent() {
        $('#CategorySelect a[cid]').live('click', function() {
            if ($(this).hasClass('disabled') || $(this).hasClass('hover')) {
                return;
            }
            $(this).closest('.item').find('a').removeClass('hover');
            $(this).addClass('hover');
            $('#CategorySelect').find('a').removeClass('disabled');
            var disableTags = [];
            var cid = $(this).attr('cid').split(':');
            var selfIds = SelfCatalogIds[cid[0]][cid[1]];
            for (var i in SelfCatalogIds) {
                if (i != cid[0]) {
                    for (var j in SelfCatalogIds[i]) {
                        if (!hasSameData(SelfCatalogIds[i][j], selfIds)) {
                            disableTags.push(i + ':' + j);
                        }
                    }
                }
            }
            //console.log(disableTags);
            for (var m = 0; m < disableTags.length; m++) {
                $('#CategorySelect').find('a[cid="' + disableTags[m] + '"]').addClass('disabled');
            }

            //规格选择完成,catalogid填充隐藏域
            var hovers = $('#CategorySelect').find('a.hover'),
                that = this,
                secondID;
            if (hovers.size() == CatalogNumber) {
                if (CatalogNumber == 1) {
                    $("#hidCatalogId").val(selfIds[0]);
                }

                //偷懒下
                if (CatalogNumber == 2) {
                    hovers.each(function(index, elem) {
                        if (elem != that) {
                            secondID = $(this).attr('cid').split(':');
                        }
                    })
                    $("#hidCatalogId").val(hasSameData(selfIds, SelfCatalogIds[secondID[0]][secondID[1]]))
                        //console.log(hasSameData(selfIds, SelfCatalogIds[secondID[0]][secondID[1]]))
                }
            }



        })
    }

    function hasSameData(arr1, arr2) {
        for (var i = 0, len1 = arr1.length; i < len1; i++) {
            for (var j = 0, len2 = arr2.length; j < len2; j++) {
                if (arr1[i] == arr2[j]) {
                    return arr1[i];
                }
            }
        }
        return !1;
    }

    function parseHtml(obj) {
        var str = [],
            key;
        for (var i in obj) {
            key = codeToChar(i);
            str.push('<div class="item"><div class="cate-hd"><b class="label">商品' + key + '</b></div>');
            for (var j in obj[i]) {
                str.push('<a class="btn-small" cid="' + i + ':' + j + '" href="javascript:;">' + codeToChar(j) + '</a>');
            }
            str.push('</div>');
        }
        $('#CategorySelect').html(str.join(''));
        $("#CategorySelect").css("display", "block");
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


    //pantao

    $("#validateBtn").click(function() {
        //check优惠类型
        if (!subCheckCoupons()) {
            return false;
        }
        SaveOrder();
    });

    //提交check优惠类型
    function subCheckCoupons() {
        var usecoupons = $("input[name='couponItem']:checked").val();
        //alert(usecoupons);
        $("#hidCouponsCode").val("");
        $("#hidUseGiftlAmount").val(0);
        if (usecoupons == "GiftAvailAmount") {
            $("#hidUseGiftlAmount").val($("#hidGiftAvailAmount").val());
        } else if (usecoupons == "CouponsCount") {
            var couponslistcode = $("input[name='codeItem']:checked").val();
            if (couponslistcode != "" && couponslistcode != undefined) {
                $("#hidCouponsCode").val(couponslistcode);
                //alert($("#hidCouponsCode").val());
            } else {
                alert("请选择优惠券！");
                return false;
            }
        } else if (usecoupons == "CouponsCode") {
            var txtcode = $.trim($("#txtCouponsCode").val());
            if (txtcode != "" && txtcode != undefined) {
                $("#hidCouponsCode").val(txtcode);
                //alert($("#hidCouponsCode").val());
            } else {
                alert("请输入优惠码！");
                return false;
            }
        }
        return true;
    }

    //优惠券码验证
    $("#txtCouponsCode").live('blur', function() {
        var val = $(this).val();
        if (/[^a-zA-Z0-9]/g.test(val)) {
            alert("请输入正确验证码")
            $(this).val(val.replace(/[^a-zA-Z0-9]/g, ""));
        }
    });

    //获取账户使用优惠信息
    function GetUserAccountInfo(productId, productNum, sellerId) {
        if (productId != "" && productNum > 0 && sellerId != "") {
            $("#couponItems").html("");
            $.ajax({
                type: 'get',
                //dataType: "jsonp",
                url: '/Order/Order/GetUserAccountInfo?productId=' + productId + '&productNum=' + productNum + '&sellerId=' + sellerId,
                success: function(data) {
                    if (data.Status == 200) {
                        var html = "",
                            html0 = "",
                            html1 = "",
                            html2 = "";
                        cdisp = "disabled";
                        gdisp = "disabled";
                        $.each(data.Result, function(i, item) {
                            var txtCoupons = "无可使用优惠券";
                            var txtAmount = "可使用金额<i>&yen;</i><b>0</b>";
                            if (parseInt(data.Result.CouponsCount) > 0) {
                                txtCoupons = "<b>" + data.Result.CouponsCount + "</b>张优惠券可使用";
                                cdisp = "";
                            }
                            if (parseInt(data.Result.GiftAvailAmount) > 0) {
                                txtAmount = "可使用金额<i>&yen;</i><b id='availAmount'>" + data.Result.GiftAvailAmount + "</b>";
                                $("#hidGiftAvailAmount").val(data.Result.GiftAvailAmount);
                                gdisp = "";
                            }
                            html = "<div class=\"item\" ><input type=\"radio\" id='radionoAmount' name=\"couponItem\" value=\"NoDiscount\"/><label class=\"label\" for=\"radionoAmount\">不使用任何优惠</label></div>";
                            html0 = "<div class=\"item " + gdisp + "\" ><input type=\"radio\" id='radioAvailAmount' name=\"couponItem\" value=\"GiftAvailAmount\" " + gdisp + "/><label class=\"label\" for=\"radioAvailAmount\">使用红包</label><span class=\"price mr\">" + txtAmount + "</span></div>";
                            html1 = "<div class=\"item " + cdisp + "\"><input type=\"radio\" id='radioCouponsCount' name=\"couponItem\" value=\"CouponsCount\" " + cdisp + "/><label class=\"label\" for=\"radioCouponsCount\"> 使用优惠券</label><span>" + txtCoupons + "</span> <ul class=\"couponlist\" id=\"couponlist\"></ul></div>";
                            html2 = "<div class=\"item\"><input type=\"radio\" id='radioCouponsCode' name=\"couponItem\" value=\"CouponsCode\" /><label class=\"label\" for=\"radioCouponsCode\">使用优惠码</label><input class=\"code\" id=\"txtCouponsCode\" name=\"couponCode\" type=\"text\" value=\"\" disabled=disabled/></div>";
                        });
                        $("#couponItems").html(html + html0 + html1 + html2);
                    }
                }
            });
        }
    }

    //  优惠信息切换
    $("input:radio[name='couponItem']").live('click', function() {
        $("#couponlist").html("");
        $("#txtCouponsCode").attr("disabled", "disabled");
        $("#txtCouponsCode").val("");
        var usecoupons = $("input:radio[name='couponItem']:checked").val();
        if (usecoupons == "CouponsCount") {
            GetListUserCoupons();
        } else if (usecoupons == "CouponsCode") {
            $("#txtCouponsCode").removeAttr("disabled"); //取消不可用的设置
            $("#txtCouponsCode").val("");
        }
    })

    //加载可使用优惠券列表
    function GetListUserCoupons() {
        var sellerId = $("#hidSellerId").val();
        var price = $("#hidPrice").val();
        var pnum = $("#txtNum").val();
        if (price > 0 && pnum > 0 && sellerId != "") {
            $.ajax({
                type: 'get',
                //dataType: "jsonp",
                url: '/Order/Order/GetListUserCoupons?productPrice=' + price + '&productNum=' + pnum + '&sellerId=' + sellerId,
                success: function(data) {
                    if (data.Status == 200) {
                        var html = "";
                        $.each(data.Result, function(i, item) {
                            html += "<li class=\"li\"><input type=\"radio\" id=\"couponcode" + i + "\" name=\"codeItem\" value=\"" + item.CouponCode + "\"/><label class=\"price\" for=\"couponcode" + i + "\">" + item.CouponValue + "</label></li>";
                        });
                        $("#couponlist").append(html);
                    }
                }
            });
        }
    }

    //保存订单
    function SaveOrder() {
        var proId = $("#hidProductId").val();
        var cataId = $("#hidCatalogId").val();
        var proNum = $("#txtNum").val();
        var addrId = $("#hidAddressId").val();
        var leaveWord = $("#txtLeaveWord").val();
        var giftAmount = $("#hidUseGiftlAmount").val();
        var couponCode = $("#hidCouponsCode").val();
        var limitedNumber = $("#hidLimitedNumber").val();
        //var hidAccessToke = $("#hidAccessToke").val();
        var stockNum = $("#hidStockNum").val();
        var modifyType = $("#hidBuyType").val();
        if (modifyType != "T") {
            alert("请勿重复提交订单");
            return false;
        }
        if (proId == null || proId == "") {
            alert("商品不存在");
            return false;
        }
        if (proNum <= 0) {
            alert("请选择购买数量");
            return false;
        }
        if (cataId == false || cataId == "" || cataId == undefined) {
            alert("请先选择规格");
            return false;
        }
        if (addrId <= 0) {
            alert("请先设置收货地址");
            return false;
        }
        if (leaveWord.indexOf("写下你的留言吧") > -1) {
            leaveWord = "";
        }
        if (parseInt(stockNum) == 0) {
            alert("库存已被无情的抢走了，其他小伙伴下单比你快哦！看看别的宝贝，继续加油咯！");
            return false;
        } else if (parseInt(stockNum) < parseInt(proNum)) {
            alert("该商品仅剩" + stockNum + "件库存，请修改购买数量");
            return false;
        }
        if (parseInt(limitedNumber) > 0) //如果商品有限购数量的设置
        {
            //判断该用户购买商品的数量超出限购数
            if (parseInt(proNum) > parseInt(limitedNumber)) {
                alert("买手设置了此商品的购买数量限制，最多可购买" + limitedNumber + "件");
                return false;
            }
        }
        if (proId != "" && cataId != "" && proNum > 0 && addrId > 0) {
            $.ajax({
                type: 'POST',
                url: '/Order/Order/SaveOrder?productId=' + proId + '&CatalogId=' + cataId + '&ProductNum=' + proNum + '&AddressId=' + addrId + '&LeaveWord=' + leaveWord + '&UseGiftAmount=' + giftAmount + '&CouponCode=' + couponCode,
                success: function(data) {
                    if (data.Status == 200) {
                        $("#hidOrderId").val(data.Result);
                        $("#hidBuyType").val("F");
                        //alert("下单成功，订单号：" + data.Result);
                        self.location = $("#hidYmtUrl").val() + "/BuyerOrderPrepay/PreparePay?oid=" + data.Result;
                    } else {
                        alert(data.Msg);
                        return false;
                    }
                }
            });
        } else {
            alert("下单失败");
            return false;
        }
    }

});