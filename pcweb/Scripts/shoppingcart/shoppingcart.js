$(function () {
    $m.load('component/topbar')
    $('.v-fanli').bind({
        mouseenter: function () {
            var o = $(this).find('.tooltip-1'), pos = $(this).position();
            o.position({ left: pos.left, top: pos.top + 18 })
            o.show();

        },
        mouseleave: function () {
            $(this).find('.tooltip-1').hide();
        }
    })
    //if ($("#hasExpireCatalog").val() == "yes") {
    //    alert("购物车中有商品的报价已经过期，系统已自动删除。");
    //}
    $('#leavehandle').live('mouseleave', function () {
        $('#chinaAreaBox').hide();
        return false;
    });
    $('#chinaAreaBox').live('mouseleave', function () {
        $(this).hide();
        return false;
    })
    $('#chinaAreaHandle').live('click', function () {
        $('#chinaAreaBox').toggle(10);
        return false
    });

    $("div[class='in_bk zic-button']").click(function () {
        var id = $(this).attr("id");
        var cata = $(this).attr("cata");
        var groupid = $(this).attr("groupid");
        DeleteFromCart(id, cata, groupid);
    });

    $('.selectalll').click(function () {
        if ($(this).attr("checked") == true) {
            ChangeAll(true);
        }
        else {
            ChangeAll(false);
        }
    });

    Ymt.load('widget.LayerBox', function () {
        var struc = Ymt.widget.LayerBox('struc', { zIndex: 998, isFrame: !1 });

        var collectTemps = Ymt.widget.LayerBox('Temps', {
            zIndex: 10,
            isFrame: false,
            Temps: '<div class="layerTemps collectTemps" id="layerTemps" style="display:block;position:relative;"><div class="alert_box_inner" style="width: 550px;height: 140px;"><div class="alert_mod"><span class="icon {icon}"></span>您购买<b>{title}</b>活动的商品数量，超过了限购数量{num}，请调整后再购买！</div><div class="alert_mod" style="margin-top: 35px;"><a class="btn_1 wid4foot"><i></i>确认</a></div><div class="shut_alert_box"></div></div></div>',
            callback: function () {
                $('#layerTemps .btn_1,#layerTemps .shut_alert_box').live('click', function () {
                    collectTemps.close();
                    return false;
                });
            }
        });

        $('#bntBuyNow').bind('click', payorder);

        $('.alert_single .shut').live('click', function () {
            struc.close()
        })

        function gotoUrl(url) {
            if ($('#activeOrNot').val() == "1") {
                if ($('#orderWithActive').val() == "1") {
                    $.get('/ShoppingCart/ExistedPayedOrder', function (data) {
                        if (data.Result == 0) {
                            //不允许再下单
                            //$('#alterbbbhtml').html('<span style=\"text-align:left;float:left;margin-left:40px;width:330px\">您已成功使用'+ thirdPartyName +'账户登陆。为保障您的交易安全请您先填写或修改个人信息，然后在去结算付款。</span>');
                            if (isNotNullUser) {
                                $('#alterbbbhtml').html('<span style=\"font-size:14px;line-height:22px; text-align:center;float:left;margin-left:40px;width:330px\"><span style=\"font-weight:bold;color:#f04e00;margin-bottom:10px;display:block;\">' + userLoginId + ', 感谢您再次购物</span> 您还未验证个人信息，为保障您的消费者权益并确保账户安全，请立即去填写个人信息并进行邮箱验证！</span>');
                            }

                            $('#alterbbb').show();
                            $('#gookok').hide();
                            $('#activeUrl').attr('href', url);
                            $('#recomplete').attr('href', url);

                            struc.alert('#notActiveDiv');
                        } else {
                            //允许下单    
                            location.href = url;
                        }
                    });
                } else {
                    $('#alterbbb').show();
                    $('#gookok').hide();
                    $('#activeUrl').attr('href', url);
                    $('#recomplete').attr('href', url);

                    struc.alert('#notActiveDiv');
                }
            }
            else {

                //已激活   
                location.href = url;
            }
            return false;
        }


        function payorder() {

            var islog = $("#isLog").val();
            if (islog == "no") {
                window.location.href = "/login?ret=/shoppingcart";
            }
            else {
                $.ajax({
                    url: "/ajax/checkcart?t=" + Math.random(),
                    type: "POST",
                    success: function (m) {                        
                        //alert(m.result);
                        if (m.result == "true") {

                            window.location.href = "/purchase/orderinfo?t=" + Math.random();
                        }
                        else {
                            if (m.errcode == "1") {
                                alert("购物车中没有商品！")
                            }
                            else if (m.errcode == "4") {
                                alert(m.errmsg);
                            }
                            else if (m.errcode == "5") {
                                if (m.errmsg <= 0) {
                                    alert("很抱歉，免运卡用完了！您无法再购买免国际运费周活动商品。\n邀请朋友注册可以获得更多免运卡哟，详情请见免国际运费周活动。");
                                } else {
                                    alert("很抱歉，免邮卡不够！您最多能购买" + m.errmsg + "件免国际运费周活动商品。");
                                }
                            }else if (m.errcode == "6") {
                                collectTemps.alert({ 'icon': 'ico-msg-error', 'title': m.errmsg.title, 'num': m.errmsg.num });
                                return;
                            }
                            else {
                                alert("购物车出了点小毛病，请重试一下。");
                                window.location.href = "/shoppingcart?t=" + Math.random();
                            }
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        alert("error");
                        alert(xhr.status);
                        alert(thrownError);
                    }
                });
            }
            return false;
        }


    }, true)

    

    

});

//    function goload() {
//        $.get('/Shared/Reset', function (data) {
//            location.reload();
//        });
//    }


try {
     //$.getJSON(RecommendProduct, function (data) { $('#bottomProductList').html(data.content); });
    $.ajax({
        url:RecommendProduct,
        dataType: "jsonp",
        success: function (res) {
            if(res.Blocks == null){
                return;
            }
            var html = [],
                i,
                res = res.Blocks[0].Products || [],
                o;
            for (i = 0; i < res.length; i++) {
                o = res[i];
                html.push('<li class="item"><div class="pic"><a href="/product/'+o.PID+'.html?recmd=shoppingcart" target="_blank">');
                html.push('<!--[if lte ie 7]><i class="mid"></i><![endif]--><img src="' + o.Pic + '" class="img" alt="'+o.Name+'" title="'+o.Name+'"><i class="r center"></i></a></div>');
                html.push('<div class="txt"><h3 class="title"><a class="link blue" href="/product/'+o.PID+'.html?recmd=shoppingcart" target="_blank" title="'+o.Name+'">'+o.Name+'</a></h3>');
                html.push('<div class="price"><span class="matou"><i class="yen">¥</i><em class="em">'+o.Price+'</em></span></div></div>');
                html.push('</li>');
            }
            $("#bottomProductList").append(html.join(''));
        }
    });
}
catch (e) { }

function refreshTotal() {
    $.get('/ShoppingCart/GetShoppingCartPrice?areaCode=' + $('#areaCode').val() + "&t=" + Math.random(), function (data) {
        $('#totaltotalPrice').html(data.TotalWithFreight);
        $('#flightflight').html(data.Freight);
        $('#ttWithOutFlight').html(data.TotalWithOutFreight);

    });

}





function selectallcheck(isallchecked) {
    $('.selectalll').attr('checked', isallchecked);
    if ($('.ooo').length == 0) {
        $('.selectalldiv').hide();
    }
    else {

        $('.selectalldiv').show();
    }
}


function DeleteFromCart(catalogId, cat, groupid) {
    $.ajax({
        url: "/ajax/deletefromcart?c=" + catalogId + "&gid=" + groupid + "&t=" + Math.random(),
        success: function (m) {

            if (m.result == "true") {
                alert('删除成功！');
                $('#tr_' + cat).remove();
                var orderboxs = $('.ooo');
                orderboxs.each(function (index, value) {
                    if ($(value).find(".cartitem").length == 0) {
                        $(value).remove();
                    }
                });
                refreshTotal();
                refreshSelected(m.Data);
                $('#FreeShippingCartMsg').load('/ShoppingCart/FreeShippingCartMsg');
            }
            else {
                alert("删除失败，请稍后再试！");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("error");
        }
    });
}

function red(url, c) {
    var currNum = $('.add_' + c).val();
	if(parseInt(currNum) == 0) return;
	url = url + "&n=" + (parseInt(currNum) -1);

	$.post(url, function (data) {
        if (data.Status == "Success") {
            $('.add_' + c).val(data.NewNum);
            $('.price_' + c).html(data.Price);
            refreshTotal();
        } else {
            if (data.Msg != "") {
                alert(data.Msg);
            }
        }
    }, 'json');
}

function add(url, c, LimitNum) {
	var currNum = $('.add_' + c).val();
	if(parseInt(LimitNum) > 0 && parseInt(currNum) >= parseInt(LimitNum)) 
 	{
		alert("您购买的数量大于可购买的数量");
		return;    
    }
	url = url + "&n=" + (parseInt(currNum) + 1);

    $.post(url, function (data) {
        if (data.Status == "Success") {
            $('.add_' + c).val(data.NewNum);
            $('.price_' + c).html(data.Price);
            refreshTotal();
        } else {
            alert(data.Msg);
        }
    }, 'json');

}
function DeleteAll() {
    var items = $('input[name="CheckedProductIds"]:checked');
    var ids = new Array();
    items.each(function (index, data) {
        ids.push($(data).val());
    });
    if (ids.length == 0) {
        alert('请选择商品');
        return false;
    } else {
        if (confirm('确定要删除选中的商品吗？')) {
            var url = shoppingCartDeleteAll;
            $.post(url, $.toJSON({ 'checkedProductIds': ids }), function (r) {
                if (r.result == "true") {

                    items.each(function (index, id) {
                        $('#tr_' + $(id).val()).remove();
                    });

                    var orderboxs = $('.ooo');
                    orderboxs.each(function (index, value) {
                        if ($(value).find(".cartitem").length == 0) {
                            $(value).remove();
                        }
                    });
                    refreshTotal();
                    refreshSelected(r.Data);
                } else {
                    alert('fail');
                }
            }, 'json');
        }

    }
}

function ChangeAll(v) {
    var url = "/ShoppingCart/ChangeAll?";
    $.ajax({
        url: url + "selected=" + v,
        type: "POST",
        success: function (m) {
            if (m) {

                refreshTotal();

                $(':checkbox').each(function (index, data) {
                    if (!$(this).is(':disabled')) {
                        $(this).attr('checked', v);
                    }
                });
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("error");
        }
    });
}

function GroupSelect(groupId, status) {
    this.groupId = groupId;
    this.status = status;
}

function refreshSelected(data) {

    var allcheckedcount = GetAllCheckedCount(data);
    var allcount = GetAllCount(data);


    selectallcheck(allcheckedcount == allcount);

    var groupSelect = GetGroupSelect(data);

    for (var i = 0; i < groupSelect.length; i++) {
        var gs = groupSelect[i];
        groupcheck(gs.groupId, gs.status);
    }
}

function GetGroupSelect(data) {
    var gs = $.map(data.ShoppingCartItems, function (a) {
        return new GroupSelect(a.SellerId, a.AllChecked);
    });
    return gs;

}
function GetAllCount(data) {
    var allcount = 0;
    for (var i = 0; i < data.ShoppingCartItems.length; i++) {
        var cart = data.ShoppingCartItems[i];
        allcount++;
    }
    return allcount;
}
function GetAllCheckedCount(data) {

    var allcheckedcount = 0;
    for (var i = 0; i < data.ShoppingCartItems.length; i++) {
        var cart = data.ShoppingCartItems[i];
        if (data.AllChecked) {
            allcheckedcount++;
        }
    }
    return allcheckedcount;
}

function ChangeSelected(url, groupCheckBoxId) {
    if ($("#" + groupCheckBoxId).attr("checked") == true) {
        $.ajax({
            url: url + "&selected=true",
            type: "POST",
            success: function (m) {
                if (m.status == "true") {

                    refreshTotal();

                    refreshSelected(m.Data);

                    $("#" + groupCheckBoxId).closest('.order_box').find('input[name="CheckedProductIds"]').each(function (index, data) {
                        if (!$(this).is(':disabled')) {
                            $(this).attr('checked', true);
                        }
                    });
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error");
            }
        });
    }
    else {
        $.ajax({
            url: url + "&selected=false",
            type: "POST",
            success: function (m) {
                if (m.status == "true") {
                    refreshTotal();
                    refreshSelected(m.Data);


                    $("#" + groupCheckBoxId).closest('.order_box').find('input[name="CheckedProductIds"]').each(function (index, data) {
                        if (!$(this).is(':disabled')) {
                            $(this).attr('checked', false);
                        }
                    });

                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error");
            }
        });
    }
    return false;
}

function groupcheck(groupid, isgroupcheck) {
    $('#' + groupid).attr('checked', isgroupcheck);
}

function SetSelected(url, checkboxid, groupid) {
    if ($("#" + checkboxid).attr("checked") == true) {
        $.ajax({
            url: url + "&selected=true",
            type: "POST",
            success: function (m) {
                if (m.status == "true") {
                    refreshTotal();

                    refreshSelected(m.Data);


                    //selectallcheck(m.isallchecked);
                    //groupcheck(groupid,m.isgroupchecked);
                } else {

                    alert(m.message);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error");
            }
        });
    }
    else {
        $.ajax({
            url: url + "&selected=false",
            type: "POST",
            success: function (m) {
                if (m.status == "true") {
                    refreshTotal();

                    refreshSelected(m.Data);

                    //selectallcheck(m.isallchecked);
                    //groupcheck(groupid,m.isgroupchecked);
                }
                else {

                    alert(m.message);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("error");
            }
        });
    }
    return false;

}