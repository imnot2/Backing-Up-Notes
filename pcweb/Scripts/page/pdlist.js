/*=======================pdlist.js===========================*/
/**
* productList,brandList @zhangdong
*/
function cookie(a, b, c, d) {
    var selectview = getCookie(d), bd = $('#mainallpd .bd'), o = $(a), b = $(b);
    if (!selectview) {
        bd.show();
        return false;
    } else if (selectview == 'small') {
        changeview('levelshow', c, 'select1', 'select2', o, b, true);
    } else {
        changeview(c, 'levelshow', 'select2', 'select1', b, o, false);
    }
}
function getCookie(NameOfCookie) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(NameOfCookie + "=");
        if (begin != -1) {
            begin += NameOfCookie.length + 1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}
function setCookie(NameOfCookie, value, expiredays) {
    var ExpireDate = new Date();
    ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));
    document.cookie = NameOfCookie + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}
function delCookie(NameOfCookie) {
    if (getCookie(NameOfCookie)) {
        document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}
function changeview(a, b, c, d, e, f, g) {
    var bd = $('#mainallpd .bd');
    function t() {
        e.addClass(c)
        f.removeClass(d)
    }
    if (bd.hasClass(a)) {
        t()
        bd.show();
        return false;
    }
    else if (bd.hasClass(b)) {
        t()
        bd.animate({ opacity: 0.5 }, 100, function () {
            bd.animate({ opacity: 1 }, 100, function () {
                bd.removeClass(b);
                bd.addClass(a).show();
                g && bd.find('.pdremark').show() || bd.find('.pdremark').hide()
            })
        });
    }
    else {
        t()
        bd.animate({ opacity: 0.5 }, 100, function () {
            bd.animate({ opacity: 1 }, 100, function () {
                bd.addClass(a).show();
                g && bd.find('.pdremark').show() || bd.find('.pdremark').hide();
            })
        });
    }

}
function changecookie(g, c, f) {
    delCookie(c);
    setCookie(c, g, f || 30)
}
$(function () {
    var list = {
        item: null,
        con: $('#mainallpd .bd'),
        brand: $('#mainbrand .brand'),
        brandInner: $('#mainbrand .brand .inner'),
        toggle_1: $('#mainbrand .toggle span'),
        navLeft: $('#firstnav'),
        navbt: $('#firstnav dt.bt'),
        navddl: $('#firstnav .ddl'),
        swh: !1,
        swhnav: !1,
        cookie: [0, 0, 0]
    }
    //左侧导航
    list.navddl.find('.dd').size() > 15 && (list.swhnav = !0, list.navddl.find('.dd:gt(14)').hide(), list.navbt.show()) || list.navbt.hide();
    list.navLeft.find('.bt a').click(function () {
        if (list.swhnav) {
            $(this).html('<span class="close"></span>收起')
            list.navddl.find('.dd:gt(14)').toggle(100);
            list.swhnav = !1;
        } else {
            $(this).html('<span class="close"></span>显示更多分类')
            list.navddl.find('.dd:gt(14)').toggle(100);
            list.swhnav = !0;
        }
        return false;
    })
    $('#firstnav .dd').bind({
        mouseenter: function () {
            if (!$(this).hasClass('current')) {
                $(this).toggleClass('hover');
                if (!!$(this).find('.secondnav').size()) {
                    $(this).css('bordeTop', '1px solid #999')
                } else {
                    $(this).css('borderTop', '1px solid #e2e2e2')
                }
            }
            return false;
        },
        mouseleave: function () {
            if (!$(this).hasClass('current')) {
                $(this).toggleClass('hover');
            }
            return false;
        }
    })
    //品牌产品收缩按钮
    if (list.brand.length > 0) {
        list.height_1 = list.brandInner.outerHeight();
        list.height_1 > 56 && (list.swh = !0, list.toggle_1.css('display', 'inline-block')) || list.toggle_1.hide();
        list.h = 30;
        if (list.height_1 >= 56) {
            list.brand.height(56)
            list.h = 56;
        }
        list.brandHtml = list.brandInner.html();
        var sortArray = [], innerHtml = "";
        function getHTML(m) {
            var str = m.html(), array = [];
            str = str.replace(/<\/a>/gi, function (m, n) {
                return m + "::::"
            })
            array = str.split(/:{4}/ig);
            innerHtml = array.shift();
            array.pop();
            return array;
        }
        sortArray = getHTML(list.brandInner);
        function sortLetter(a, b) {
            var reg = /(?:title=)["']([\w\u00c0-\uFFFF\-.\s]+?)["']/gi;
            a = reg.exec(a);
            reg.lastIndex = 0;
            b = reg.exec(b);
            if (a!= null && b!= null) {
                return a[1].localeCompare(b[1]);
            } else {
                return 0
            }
        }
        //.charCodeAt(0)
        sortArray.sort(sortLetter);
        sortArray.unshift(innerHtml);
        innerHtml = sortArray.join("");
        //alert(sortArray)
        list.toggle_1.bind({
            click: function () {
                $(this).toggleClass('open');
                var o = list.brand;
                if (list.swh && o.height() != list.h) {
                    o.animate({ height: list.h }, 'slow', function () {
                        list.brandInner.html(list.brandHtml);
                    });
                    list.swh = !1;
                }
                else {
                    list.brandInner.html(innerHtml)
                    o.animate({ height: list.height_1 }, 'slow');
                    list.swh = !0;
                }
                return false;
            }
        })
    }
    //列表经过效果
    list.con.bind({
        mouseenter: function () {
            if (!list.item) {
                list.item = $('<div></div>');
                //$(this).append(list.item)
            }
        },
        mouseleave: function () {
            list.item.hide();
        }
    })
    $('#mainallpd .verticalshow .item,#mainallpd .verticalshow3 .item').live('mouseenter', function () {
        var o = $(this), p = o.offset(), time;
        list.item.css({ left: p.left + 'px', top: p.top + 'px', position: 'absolute', border: '2px solid #F04E00', height: o.outerHeight() + 'px', width: o.outerWidth() - 1 + 'px', zIndex: 0 });
        o.prepend(list.item);
        if (list.item.css('display') != 'block')
            list.item.css('display', 'block')
        o.find('.pdremark').show();
        return false;
    })
    $('#mainallpd .verticalshow .item,#mainallpd .verticalshow3 .item').live('mouseleave', function () {
        if (list.item.css('display') != 'none')
            list.item.css('display', 'none')
        $(this).find('.pdremark').hide();
        return false;
    })
    $('#prductview2 .small').click(function () {
        list.item = null
        var o = $(this), b = $('#prductview2 .big');
        changecookie('small', 'selectview')
        changeview('levelshow', 'verticalshow', 'select1', 'select2', o, b, true);
        return false;
    })
    $('#prductview2 .big').click(function () {
        var o = $(this), b = $('#prductview2 .small');
        changecookie('big', 'selectview')
        changeview('verticalshow', 'levelshow', 'select2', 'select1', o, b, false);
        return false;
    })
    $('#prductview1 .small').click(function () {
        list.item = null
        var o = $(this), b = $('#prductview1 .big');
        changecookie('small', 'selectview1')
        changeview('levelshow', 'verticalshow3', 'select1', 'select2', o, b, true);
        return false;
    })
    $('#prductview1 .big').click(function () {
        var o = $(this), b = $('#prductview1 .small');
        $('#mainallpd .bd').find('.pdremark').hide();
        changecookie('big', 'selectview1')
        changeview('verticalshow3', 'levelshow', 'select2', 'select1', o, b, false);
        return false;
    })
    //delCookie('listCookie')
    //			    function checkboxdatermine() {
    //			        var i = 0, list = getCookie('listCookie'), arr, o = $('#seleteitem');
    //			        list && (arr = list.split(','));
    //			        while (arr && i < arr.length) {
    //			            if (!!parseInt(arr[i])) {
    //			                !o.hasClass('seletebtn') && o.addClass('seletebtn');
    //			                return;
    //			            } else {
    //			                ++i;
    //			                continue;
    //			            }

    //			        }
    //			        o.hasClass('seletebtn') && o.removeClass('seletebtn');
    //			    }
    //			    checkboxdatermine();
    //			    var oldCookie;
    //			    $('#seleteitem input').bind('click', function () {
    //			        var o = $('#seleteitem'), t = $(this), inp = o.find('input'), len = inp.size(), b = 0;
    //			        oldCookie = getCookie('listCookie') && getCookie('listCookie').split(',');
    //			        if (oldCookie) {
    //			            for (var i = 0; i < list.cookie.length; i++) {
    //			                list.cookie[i] = parseInt(oldCookie[i]);
    //			            }
    //			        }
    //			        if (t.attr('checked')) {
    //			            list.cookie[inp.index(t)] = 1;
    //			            !o.hasClass('seletebtn') && o.addClass('seletebtn');
    //			            changecookie(list.cookie.join(','), 'listCookie');
    //			        } else {
    //			            list.cookie[inp.index(t)] = 0;
    //			            changecookie(list.cookie.join(','), 'listCookie')
    //			        }
    //			        if (oldCookie) {
    //			            while (b < list.cookie.length) {
    //			                if (list.cookie[b] == oldCookie[b]) {
    //			                    ++b;
    //			                    continue;
    //			                } else {
    //			                    !o.hasClass('seletebtn') && o.addClass('seletebtn');
    //			                    return;
    //			                }
    //			            }
    //			        }
    //			    })
    //			    $('#seleteitem .btn').live('click', function () {
    //			        //			        var o = $('#seleteitem'), inp = o.find('input'), len = inp.size(), i;
    //			        //			        for (i = 0; i < len; i++) {
    //			        //			            $(inp.eq(i)).attr('checked', false);
    //			        //			        }
    //			        //			        o.removeClass('seletebtn');
    //			        checkboxdatermine();
    //			        return false;
    //			    })
    $('#seleteitem input').bind('click', function () {
        var o = $('#seleteitem'), t = $(this);
        !o.hasClass('seletebtn') && o.addClass('seletebtn');
    })
    $('#sortType').change(function () {
        $('#formSort').val($(this).val());
        $('#subForm').submit();
    });
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
        if ($('#inputxhuo').attr('checked') == true) {
            $('#formSeller').val('1');
        }
        else {
            $('#formSeller').val('0');
        }
        $('#subForm').submit();
        return false;
    });
    $('#prei').click(function () {
        var currentPage = parseInt($('#formPage').val());
        if (currentPage > 1) {
            currentPage--;
            $('#formPage').val(currentPage);
            $('#subFormPage').submit();
        }
    });
    $('#nexti').click(function () {
        var currentPage = parseInt($('#formPage').val());
        var totalPage = parseInt($('#totalPage').val());
        if (currentPage < totalPage) {
            currentPage++;
            $('#formPage').val(currentPage);
            $('#subFormPage').submit();
        }
    });
    var category = [1086, 1313, 1177, 1199, 1149, 1268, 1232, 1001, 1051], dds = $('#firstnav').find('.dd'), ndds = [], fdds;

    if (dds.size() > 0 && $(dds).attr('sortId') && category.length > 0) {
        $.each(category, function (c, d) {
            dds.each(function (a, b) {
                var id = parseInt($(b).attr('sortId'));
                if (d == id) {
                    ndds[c] = b;
                } else {
                    return;
                }
            })
        });
        dds.closest('dl').prepend(ndds);
    }
})

