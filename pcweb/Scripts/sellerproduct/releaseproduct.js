/*=======================releaseproduct.js===========================*/
var kissyEditor;
var canAdd = true;

function GetLength(value) {
    var _tmp = value;
    var _length = 0;
    for (var i = 0; i < _tmp.length; i++) {
        if (_tmp.charCodeAt(i) > 255) {
            _length = _length + 2;
        }
        else {
            _length++;
        }
    }
    return _length;
}

function GetPartStr(value, length) {
    var _length = 0;
    var j = 0;
    for (var i = 0; i < value.length; i++) {
        _length++;
        if (value.charCodeAt(i) > 255) {
            j = j + 2;
        }
        else {
            j++;
        }
        if (j >= length) {
            break;
        }
    }
    return value.slice(0, _length);
}
function Propertys() {
    var box = $('#ProductPropertyBox'), str1 = "NewPropertyName_", str2 = "NewProperty_", str, node = box.find('.node');
    str = "";
    for (var i = 0, len = node.size() - 1; i < len; i++) {
        var propertyName = node.eq(i).find(".propertyName").val();
        var newProperty = node.eq(i).find(".propertyValue").val();
        if (propertyName != '属性名称' && newProperty != '属性内容') {
            str += str1 + i + "=" + propertyName + "&" + str2 + i + "=" + newProperty + "&";
        }
    }
    return str;
}

var productPropertyCount = 1;

function checkSubData(subData) {
    var errorMsg = "";
    if (subData.ProductName == "") {
        errorMsg += "请填写商品名称|";
    }

    if (subData.PictureUrl1 == "") {
        errorMsg += "请上传第一张商品图片做为商品主图|";
    }
    if ($('#isEdit').val() == 'y') {
        for (var i = 0; i < subData.Catalogs.length; i++) {
            if (isNaN(subData.Catalogs[i].Price) || subData.Catalogs[i].Price <= 0) {
                errorMsg += "请输入正确的价格|";
            }
            if (isNaN(subData.Catalogs[i].Num) || subData.Catalogs[i].Num < 0) {
                errorMsg += "请输入正确的库存|";
            }
        }
    }
    else {
        for (var i = 0; i < subData.Catalogs.length; i++) {
            if (isNaN(subData.Catalogs[i].Price) || subData.Catalogs[i].Price <= 0) {
                errorMsg += "请输入正确的价格|";
            }
            if (isNaN(subData.Catalogs[i].Num) || subData.Catalogs[i].Num <= 0) {
                errorMsg += "请输入正确的库存|";
            }
        }
    }

    if (subData.Catalogs.length == 0) {
        errorMsg += "请选择是否设置商品规格，并添加报价。|";
    }

    if (!subData.CatalogType) {
        errorMsg += "请选择备货状态|";
    }

    if (!subData.TariffType) {
        errorMsg += "请选择海关关税承担方|";
    }

    if (subData.Limited) {
        if (isNaN(subData.LimitNum) || subData.LimitNum == '') {
            errorMsg += "请填写限购件数|";
        }
        else if (subData.LimitNum < 1 || subData.LimitNum > 999) {
            errorMsg += "超出限购数，限购数范围为1~999|";
        }
    }

    if (!subData.CatalogStatus) {
        errorMsg += "请选择配送方式|";
    }

    if (!subData.productFreight) {
        errorMsg += "请设置运费|";
    }

    if (subData.productFreight == 1 && subData.FreightForBuyerType == 1) {
        if (subData.DeliveryTemplateId == '') {
            errorMsg += "请设置运费模式|";
        }

        for (var i = 0; i < weightTemplates.length; i++) {
            if (subData.DeliveryTemplateId == weightTemplates[i] && subData.Weight == '') {
                errorMsg += "请设置商品估重|";
            }
        }
    }

    if (subData.FreightForBuyerType == 0 && (subData.Flight == '' || isNaN(subData.Flight))) {
        errorMsg += "请输入正确的运费|";
    }

    if (!subData.OnSaleType) {
        errorMsg += "请选择上架时间|";
    }

    if (!subData.AcceptReturn) {
        errorMsg += "请选择退货条件|";
    }

    return errorMsg;
}

function hasTemplate(catalogStatu) {
    var result = false;
    $.ajax({
        type: "GET",
        url: "/SellerProduct/HasTemplate",
        data: "c=" + catalogStatu,
        dataType: "text",
        async: false,
        success: function (msg) {
            result = msg;
        }
    });
    return result;
}

function hideSkusError() {
    $('.warnbox').hide();
    $('.SkuText').hide();
    $('.SkuCount').hide();
}

$(function () {
    //名称
    

    var layer, orderid = 2, alertbox = $('#alert_box_3'), alertitem = '', match = /([a-zA-Z0-9]+:+\d+-?)+/;
    Ymt.load('widget.LayerBox', function () {
        layer = Ymt.widget.LayerBox('struc');
    }, !0);
    $('#set-price .group').live('click', function () {
        //打开设置多个编号的浮层时，隐藏“内容不能为空”的提示
        hideSkusError();
        $('#skusType').val("0");
        orderid = 2;
        var o = $(this);
        alertitem = o.closest('tr').attr('data');
        alertbox.find('div.node:first').after($('<div class="node" order="1"><span class="l width75">第<em class="num">1</em>件商品：</span><input type="text" class="r inp number" style="margin-right:26px"><input type="text" class="r inp width75 count"></div><div class="node" order="2"><span class="l width75">第<em class="num">2</em>件商品：</span><input type="text" class="r inp number" style="margin-right:26px"><input type="text" class="r inp width75 count"></div>'))
        !!layer && layer.alert('#alert_box_3');
        return false;
    });
    $('#SetMultiplySku').click(function () {
        hideSkusError();
        $('#skusType').val("1");
        orderid = 2;
        alertbox.find('div.node:first').after($('<div class="node" order="1"><span class="l width75">第<em class="num">1</em>件商品：</span><input type="text" class="r inp number" style="margin-right:26px"><input type="text" class="r inp width75 count"></div><div class="node" order="2"><span class="l width75">第<em class="num">2</em>件商品：</span><input type="text" class="r inp number" style="margin-right:26px"><input type="text" class="r inp width75 count"></div>'))
        !!layer && layer.alert('#alert_box_3');
        return false;
    });
    alertbox.delegate('.btn-0-0,.shut', 'click', function () {
        !!layer && layer.close();
        clearalert();
        return false;
    });
    alertbox.delegate('.btn-0', 'click', function () {
        var str = '', inp = alertbox.find('input');
        var textErr = false;
        var countErr = false;
        inp.each(function (m, n) {
            if (m % 2) {
                if (!$(n).val() || isNaN($(n).val()) || $(n).val() == 0) {
                    countErr = true;
                }
                str += ":" + $(n).val() + '-';
            } else {
                if (!$(n).val()) {
                    textErr = true;
                }
                str += $(n).val();
            }
        });
        var err = false;
        if (textErr) {
            alertbox.find('.warnbox').show();
            alertbox.find('.SkuText').show();
            err = true;
        }
        if (countErr) {
            alertbox.find('.warnbox').show();
            alertbox.find('.SkuCount').show();
            err = true;
        }
        if (err) {
            return false;
        }
        if ($('#skusType').val() == "0") {
            if (alertitem) {
                $('#set-price tbody tr').each(function (m, n) {
                    n = $(n);
                    if (n.attr('data') == alertitem) {
                        n.find('.oneCatalogSku').val(str.slice(0, -1));
                        n.find('.oneCatalogSku').change();
                        n.find('.oneCatalogSku').attr("disabled", true);
                        if (n.find('.group') && !!n.find('.group').html() && !n.find('.group').html().match(match)) {
                            n.find('td:last').addClass('node').html('<a class="blue l edit" edit="' + str.slice(0, -1) + '" href="javascript:void(0)">编辑</a><span class="blue l"></span><a class="blue r delete" href="javascript:void(0)">删除组合</a>')
                        } else {
                            $(this).find('.edit').attr('edit', str.slice(0, -1));
                        }
                    }
                });
            }
        }
        if ($('#skusType').val() == "1") {
            $('#productSKU').val(str.slice(0, -1));
            $('#productSKU').change();
            $('#productSKU').attr("disabled", true);
            $('.AddedMultiplySku').show();
            $('#SetMultiplySku').hide();
        }
        !!layer && layer.close();
        clearalert();
        orderid = 2;
        return false;
    });
    $('#set-price').delegate('.edit', 'click', function () {
        hideSkusError();
        var str = $(this).attr('edit'), tr = $(this).closest('tr');
        alertitem = tr.attr('data');
        fillalertbox(str);
        !!layer && layer.alert('#alert_box_3');
        return false;
    });
    $('#set-price').delegate('.delete', 'click', function () {
        var td = $(this).closest('td'), tr = $(this).closest('tr');
        alertitem = tr.attr('data');
        tr.find('.oneCatalogSku').val('');
        tr.find('.oneCatalogSku').attr('disabled', false);
        tr.find('.oneCatalogSku').change();
        td.empty();
        td.append('<a href="javascript:void(0)" class="blue group">设置多个商品编号</a>');
        orderid = 2;
        return false;
    });
    $('#EditMultiplySku').click(function () {
        hideSkusError();
        var str = $('#productSKU').val();
        fillalertbox(str);
        $('#skusType').val(1);
        !!layer && layer.alert('#alert_box_3');
        return false;
    });
    $('#DelMultiplySku').click(function () {
        $('.AddedMultiplySku').hide();
        $('#SetMultiplySku').show();
        $('#productSKU').val("");
        $('#productSKU').attr("disabled", false);
    });
    function fillalertbox(str) {
        var box = alertbox, str = str.split('-'), html = [];
        if (str.length >= 2) {
            for (var j = 0, len = str.length; j < len; j++) {
                var delHtml = "";
                if (j > 1) {
                    delHtml = '<a href="javascript:void(0)" class="delOneSkuItem">删除</a>';
                }
                html.push('<div class="node" order="' + parseInt(j + 1) + '"><span class="l width75">第<em class="num">' + parseInt(j + 1) + '</em>件商品：</span><input type="text" value="' + str[j].split(':')[0] + '" class="r inp number" style="margin-right:26px"><input type="text" value="' + str[j].split(':')[1] + '" class="r inp width75 count">' + delHtml + '</div>');
            }
            //            console.log(html.join(''));
            box.find('div.node:first').after($(html.join('')));
            orderid = str.length;
        }
    }
    function clearalert() {
        alertbox.find('div.node[order]').remove();
    }
    function resetOrderIds() {
        alertbox.find('.num').each(function (m, n) {
            $(n).html(m + 1);
        });
    }
    alertbox.delegate('.addNumber', 'click', function () {
        var order = $("#alert_box_3 div.node[order='" + orderid + "']");
        //        console.log(orderid);
        ++orderid;
        if (orderid > 6) {
            alert('最多可以添加6件商品');
            return false;
        }
        var str = '<div class="node" order="' + orderid + '"><span class="l width75">第<em class="num">' + orderid + '</em>件商品：</span><input type="text" class="r inp number" style="margin-right:26px"><input type="text" class="r inp width75 count"><a href="javascript:void(0)" class="delOneSkuItem">删除</a></div>';
        order.after(str);
    });
    alertbox.delegate('.delOneSkuItem', 'click', function () {
        $(this).parent().remove();
        resetOrderIds();
        orderid--;
    });
    //    alertbox.delegate('input', 'blur', function () {
    //        if ($(this).hasClass('number')) {
    //            if (!$(this).val()) {
    //                alertbox.find('.warnbox').show();
    //                alertbox.find('.SkuText').show();
    //            }
    //        }
    //        if ($(this).hasClass('count')) {
    //            alertbox.find('.warnbox').show();
    //            alertbox.find('.SkuCount').show();
    //        }
    //    })
    $('#ProductName').bind({
        keyup: function () {
            var str = $(this).val(), len = GetLength(str);
            if (len > 60) {
                $(this).val(GetPartStr(str, 60));
            } else {
                $(this).next('.attetion').find('.num').html(60 - len);
            }
        },
        blur: function () {
            var name = $(this).attr('name');
        }
    });

    function prop(name, id, text) {
        var con = $('#ProductPropertyBox'), p = con.find("[name='" + name + id + "']");
        p.live({
            focus: function () {
                var that = $(this), verify = that.closest('.node').find('.verify');
                if (that.val() == text) {
                    that.val('');
                }
                return false;
            },
            blur: function () {
                var that = $(this), verify = that.closest('.node').find('.verify');
                if (that.val() == '') {
                    that.val(text);
                    verify.html(text + "不为空")
                } else {
                    verify.html('')
                }
                return false;
            }
        });

    }

    function propbind(id) {
        prop('NewPropertyName_', id, '属性名称');
        prop('NewProperty_', id, '属性内容');
    }

    $('.UserPropertyName').live({
        focus: function () {
            var that = $(this);
            if (that.val() == '规格名称') {
                that.val('');
            }
            return false;
        },
        blur: function () {
            var that = $(this);
            if (that.val() == '') {
                that.val('规格名称');
            }
            return false;
        }
    });

    propbind(0);
    $('#ProductPropertyBox .add').bind('click', function () {
        var o = $('#ProductPropertyBox').find('.node').first().clone();
        o.find("[name*='NewPropertyName_']").val('属性名称');
        o.find("[name*='NewProperty_']").val('属性内容');
        o.find('input').each(function () {
            var name = $(this).attr('name').replace(/\d/, '');
            $(this).attr('name', name + productPropertyCount);
        })
        o.insertBefore($(this).closest('.node'));
        propbind(productPropertyCount);
        productPropertyCount++;
    })
    $('#ProductPropertyBox .close').live('click', function () {
        var box = $('#ProductPropertyBox');
        if (box.find('.node').size() > 2) {
            $(this).closest('.node').remove();
        }
    })
    //上传图片
    var pic = {
        box: $('#PictureUrlBox')
    }
    pic.box.find('input:file').bind('change', function () {
        var index = this.id.substr(this.id.length - 1, 1);
        var filename = j$("#formUploadPic" + index + " input").val(), imgcon = $('#uploadedPic' + index); ;
        if (filename == "") {
            alert("请选择文件。");
            return false;
        }
        imgcon.ajaxStart(function (e) {
            var o = $(this);
            if (o.find('.loading').size() > 0) {
                o.find('.loading').show();
            } else {
                o.append("<img src='http://static.ymatou.com/content/img/loading_16_16.gif' class='loading' />")
            }
        });
        var options = {
            type: "POST",
            dataType: "text",
            success: function (msg) {
                if (msg == "error") {
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                } else {
                    if (imgcon.find('.loading').size() > 0) {
                        imgcon.find('.loading').hide();
                    }
                    imgcon.html("<img src='" + msg + "' class='img'/>");
                    $("#ProductPictureUrl" + index).val(msg);
                }
            },
            error: function () {
                alert("图片上传异常，请重新选择较小的图片上传。");
            }
        };
        j$("#formUploadPic" + index).ajaxSubmit(options);
        return false;
    })
    $('#PictureUrlBox li').live({
        mouseenter: function (e) {
            var o = $(this).find('.handle');
            if ($(this).find('.img').size() > 0) {
                $(this).find('.pic').css({ border: '1px solid #f04e00' });
                o.show();
            }
        },
        mouseleave: function (e) {
            var o = $(this).find('.handle');
            o.css('display') == "block" && ($(this).find('.pic').css({ border: '1px solid #e2e2e2' }), o.hide());
        }
    })
    $('#PictureUrlBox .handle').live('click', function () {
        $(this).closest('li').find('.img').remove();
        $(this).closest('li').find('input[id*=ProductPictureUrl]').val('');
    })
    //2.设置规格和报价

    function observer() {
        this.list = [];
        this.type = '';
        this.name = '';
    }

    Array.prototype.some = function (fn) {
        var len = this.length, i = 0;
        for (i; i < len; i++) {
            if (fn.call(this, this[i], i)) {
                return false;
            }
        }
        return true;
    }
    Array.prototype.filter = function (fn) {
        var len = this.length, i = 0;
        for (i; i < len; i++) {
            if (fn.call(this, this[i], i)) {
                return this.splice(i, 1);
            }
        }
        return this;
    }
    var obs_3 = new observer, cataloggroup = [];

    function changeprice(a, b, c, d, e, f, id) {
        if (b == 'delete') {
            reDrawTable(c, d);
            return;
        }
        var src = a.data('src') || ''
        var obj = { name: a.val(), pid: a.attr('data'), id: b, bid: id + "_" + b, src: src };

        function fn(m, n) {
            m = m && m.id;
            return m === obj.id;
        }
        if (c.id != id) {
            var g = d;
            d = c;
            c = g;
        }
        var bool = c.list.some(fn);
        //c.type = f || "";
        if (e) {
            bool && c.list.push(obj);
        } else {
            c.list.filter(function (m, n) {
                return obj.id == m.id;
            });
        }
        reDrawTable(c, d);
    }
    var s1 = [], s2 = [];
    function createcatalog(a, b, c, d) {
        var obj = {
            id: '',
            modify: false,
            price: 0,
            count: 0,
            number: '',
            src: []
        }, str;
        if (c) {
            obj.modify = c;
            obj.id = a + '-' + b;
            obj.catalogId = d.find("input:[name='id']").val();
            obj.price = d.find("input:[name='price']").val();
            obj.count = d.find("input:[name='count']").val();
            obj.number = d.find("input:[name='number']").val();
            cataloggroup.push(obj)
            return;
        }
        var abid = a.bid || '',
        bbid = b.bid || '',
        id = abid + "-" + bbid;
        obj.id = id;

        for (var j = 0, len = cataloggroup.length; j < len; j++) {
            var log = cataloggroup[j].id,
            log = log.split('-').reverse().join("-");
            if ((cataloggroup[j].id == id) || (log == id)) {
                if ($('#propertysForjs').size() > 0) {
                    obj = cataloggroup[j];
                } else {
                    obj.modify = cataloggroup[j].modify;
                    obj.price = cataloggroup[j].price;
                    obj.count = cataloggroup[j].count;
                    obj.number = cataloggroup[j].number;
                    obj.src = cataloggroup[j].src;
                }
                break;
            }
        }
        function fn(m, n) {
            if (m == undefined) {
                return false;
            }
            m = m && m.id;
            var arr = m.split('-'), len = arr.length;
            var reg = new RegExp("(" + arr[0] + ")" + "(" + arr[1] + ")", "ig");
            var a1 = reg.exec(abid), a2 = reg.exec(bbid), bool = false;
            if (a1 == null && a2 == null) {
                return false;
            } else {
                if (a1 != null) {
                    if (a2 == null) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }
        }
        function fn1(m, n) {
            if (m == undefined) {
                return false;
            }
            var mo = m && m.id;
            var arr = mo.split('-'), len = arr.length, i = 0;
            if (arr[0] == abid) {
                if (arr[1] == bbid || arr[1] == "") {
                    obj = m;
                    obj.id = id;
                    return true;
                }
            }
            if (arr[0] == bbid) {
                if (arr[1] == abid || arr[1] == "") {
                    obj = m;
                    obj.id = id;
                    return true;
                }
            }
            if (arr[0] == "") {
                if (arr[1] == abid || arr[1] == bbid) {
                    obj = m;
                    obj.id = id;
                    return true;
                }
            }

        }
        var bool = cataloggroup.some(fn);
        cataloggroup.filter(fn1);
        bool && cataloggroup.push(obj);
    }
    //选择规格的值
    function selectDetail(e) {
        var o = $(e.target), box = o.closest('.sec-item'), id = $('#pd-specify').find('.sec-item').index(box), tr, count = box.find('input:checkbox:checked').size(), num, index = box.find('.bd input:checkbox').index(o);
        var propertyId = box.find('.PropertyId').val();
        var propertyName = box.find('.PropertyName').val();
        o.val(o.next('label').html());
        o.attr("data", propertyId);
        //obs_3.list[1] = obs_3.list[1] || new observer;
        var L1 = obs_3.list[0], L2 = obs_3.list[1] || new observer;
        if (L1.type == propertyId) {
            L1.name = propertyName;
        }
        if (L2 && L2.type == propertyId) {
            L2.name = propertyName;
        }

        var propertyTypeValue = box.find('.PropertyTypeValue').val();
        var propertyName = box.find('.PropertyName').val();
        switch (propertyTypeValue) {
            case "1":
                if (count > 0) {
                    box.find('.table').show();
                    if (!!o.attr('checked')) {
                        num = id + "_" + index;
                        o.attr('colorid', num);
                        tr = box.find('.table tbody').find('tr:first').clone().attr('item', num);
                        if (o.data('src') && o.data('filename')) {
                            //saveimgsrc(num, o.data('src'));
                            $("<span class='v'><img src='" + o.data('src').replace('original', 'thumbnail').replace('_o', '_t') + "' width='32' /><!--<em class='yel'>" + o.data('filename') + "</em>-->上传成功&nbsp;&nbsp;<a class='blue cancel' href='javascript:void(0)'>取消</a></span>").insertAfter(tr.find('.CatalogPicFile'));
                        }
                        tr.find('.color').html(o.val());
                        tr.appendTo(box.find('.table tbody')).removeClass();
                        changeprice(o, index, L1, L2, true, propertyName, id);
                    } else {
                        if (o.attr('colorid')) {
                            num = o.attr('colorid');
                            $("tr:[item='" + num + "']").remove();
                            $('#seleteimgcolor').show();
                        } else {
                            $('#seleteimgcolor').hide();
                        }
                        changeprice(o, index, L1, L2, false, propertyName, id);
                    }
                }
                else {
                    box.find('.table').hide();
                    box.find('.table tbody').find("tr:not('.defalut')").remove();
                }
                break;
            case "0":
                if (!!o.attr('checked')) {
                    changeprice(o, index, L1, L2, true, propertyName, id);
                } else {
                    changeprice(o, index, L1, L2, false, propertyName, id);
                }
                break;
            default:
                if (!!o.attr('checked')) {
                    changeprice(o, index, L1, L2, true, propertyName, id);
                } else {
                    changeprice(o, index, L1, L2, false, propertyName, id);
                }
        }
        e.stopPropagation();
    }

    function reDrawTable(a, b) {
        var str = "", m = '', mpid = '', n = '', npid = '', len = a.list.length, len1 = b.list.length, i, j, abid, bbid, bid;
        if (len && len1) {
            for (i = 0; i < len; i++) {
                m = a.list[i].name || '';
                mpid = a.list[i].pid || '';
                abid = a.list[i].bid || '';
                for (j = 0; j < len1; j++) {
                    n = b.list[j].name || '';
                    npid = b.list[j].pid || '';
                    bbid = b.list[j].bid || '';
                    bid = abid + "-" + bbid;
                    str += "<tr data='" + bid + "'><td><input type='checkbox' name='checked' class='checkUseCatalog' checked='checked' ><input type='hidden' name='id' value=''/></td><td clsss='one'><span>" + m + "</span><input type='hidden' class='PropertyId' value='" + mpid + "' /><input type='hidden' class='CatalogImg' value='" + a.list[i].src + "' /></td><td clsss='two'><span>" + n + "</span><input type='hidden' class='PropertyId' value='" + npid + "' /><input type='hidden' class='CatalogImg' value='" + b.list[j].src + "' /></td><td><input type='text' name='price' class='inp inp60' value='0'></td><td><input type='text' name='count' class='inp inp50' value='0'></td><td><input type='text' name='number' class='inp inp100 oneCatalogSku'></td><td><a class='blue group' href='javascript:void(0)'>设置多个商品编号</a></td></tr>";
                    createcatalog(a.list[i], b.list[j]);
                }
            }
        } else {
            if (len || len1) {
                if (len) {
                    for (j = 0; j < len; j++) {
                        m = a.list[j].name || '';
                        mpid = a.list[j].pid || '';
                        abid = a.list[j].bid || '';
                        bid = abid + "-" + "";
                        str += "<tr data='" + bid + "'><td><input type='checkbox' name='checked' class='checkUseCatalog' checked='checked' ></td><td clsss='one'><span>" + m + "</span><input type='hidden' class='PropertyId' value='" + mpid + "' /><input type='hidden' class='CatalogImg' value='" + a.list[j].src + "' /></td><td clsss='two'></td><td><input type='text' name='price' class='inp inp60' value='0'></td><td><input type='text' name='count' class='inp inp50' value='0'></td><td><input type='text' name='number' class='inp inp100 oneCatalogSku'></td><td><a class='blue group' href='javascript:void(0)'>设置多个商品编号</a></td></tr>";
                        createcatalog(a.list[j], '');
                    }
                }
                if (len1) {
                    for (j = 0; j < len1; j++) {
                        m = b.list[j].name || '';
                        mpid = b.list[j].pid || '';
                        bbid = b.list[j].bid || '';
                        bid = "" + "-" + bbid;
                        str += "<tr data='" + bid + "'><td><input type='checkbox' name='checked' class='checkUseCatalog' checked='checked' ></td><td clsss='one'></td><td clsss='two'><span>" + m + "</span><input type='hidden' class='PropertyId' value='" + mpid + "' /><input type='hidden' class='CatalogImg' /></td><td class='two'><input type='text' name='price' class='inp inp60' value='0'><input type='hidden' class='CatalogImg' value='" + b.list[j].src + "' /></td><td><input type='text' name='count' class='inp inp50' value='0'></td><td><input type='text' name='number' class='inp inp100 oneCatalogSku'></td><td><a class='blue group' href='javascript:void(0)'>设置多个商品编号</a></td></tr>";
                        createcatalog('', b.list[j]);
                    }
                }
            }
        }
        $('#setProductPrice').find('th.one').html('规格：' + a.name);
        $('#setProductPrice').find('th.two').html('规格：' + b.name);
        $('#setProductPrice').show();
        $('#set-price tbody').html(str);
        filldata(cataloggroup, a)
        //console.log(cataloggroup);

        if (!(a.list.length || b.list.length)) {
            $('#setProductPrice').hide();
        }
    }
    function filldata(a, b) {
        var i = 0, len = a.length, index = b.id;
        for (i; i < len; i++) {
            if (a[i].modify) {

                var log = a[i].id;
                var o = $("tr:[data='" + log + "']");
                if (o.size() < 1) {
                    log = log.split('-').reverse().join('-');
                    o = $("tr:[data='" + log + "']");
                }
                o.find("input:[name='id']").val(a[i].catalogId);
                o.find("input:[name='price']").val(a[i].price);
                o.find("input:[name='count']").val(a[i].count);
                o.find("input:[name='number']").val(a[i].number);
                if (a[i].number != "" && a[i].number != undefined && a[i].number.indexOf('-') > 0) {
                    o.find("input:[name='number']").attr("disabled", true);
                    o.find('td:last').addClass('node').html('<a class="blue l edit" edit="' + a[i].number + '" href="javascript:void(0)">编辑</a><span class="blue l"></span><a class="blue r delete" href="javascript:void(0)">删除组合</a>');
                }
                $("#set-price tbody tr").each(function () {
                    var o = $(this), g;
                    if (index == 1) {
                        g = log.split('-')[1];
                        if (o.attr('data').split('-')[1] == g) {
                            o.find('input.CatalogImg').eq(1).val(a[i].src[1] || a[i].src[0]);
                        }
                    } else {
                        g = log.split('-')[0];
                        if (o.attr('data').split('-')[0] == g) {
                            o.find('input.CatalogImg').eq(0).val(a[0].src[0] || a[i].src[1]);
                        }
                    }
                });
            }
        }
    }
    $('#set-price tbody input.inp').live('change', function (e) {
        var name = $(this).attr('name'), data = $(this).closest('tr').attr('data'), value = $(this).val();
        for (var i = 0, len = cataloggroup.length; i < len; i++) {
            if (cataloggroup[i].id == data) {
                cataloggroup[i][name] = value;
                cataloggroup[i].modify = true;
            }
        }
        e.stopPropagation();
    })
    //启用规格后执行
    var selected = 0;
    function detection(o, b, e) {
        var obs, id = $('#pd-specify').find('.sec-item').index(b.closest('.sec-item')), son, son1;

        function fn(m, n) {
            return m.id === id;
        }

        if (e && obs_3.list.length < 2) {
            obs = new observer;
            obs.id = id;
            obs.type = b.closest('.sec-item').find('.PropertyId').val();
            obs.name = b.closest('.sec-item').find('.PropertyName').val();
            obs.selected = selected++;
            obs_3.list.push(obs);
        } else {
            clearcheck(o, b);
            if (!e) {
                if (id == 0) {
                    $("#seleteimgcolor tbody tr:not('.defalut')").remove();
                    $("#seleteimgcolor").hide();
                }
                for (var i = 0, len = obs_3.list.length; i < len; i++) {
                    if (obs_3.list[i].id == id) {
                        son = obs_3.list[i];
                        son.list = [];
                        obs_3.list.splice(i, 1);
                        if (son.seleted == 1) {
                            son1 = obs_3.list[0] || new observer;
                        } else {
                            son1 = son;
                            son = obs_3.list[0] || new observer;
                        }
                        changeprice(o, 'delete', son, son1, false, "");
                        return;
                    }
                }
            }
            if (obs_3.list.length >= 2) {
                alert('规格种类最多两种。');
                clearcheck(o, b);
                return false;
            }
        }
        return true;
    }

    function clearcheck(o, p) {
        p.attr('checked', false);
        o.each(function (a, b) {
            $(b).triggerHandler('click');
            $(b).attr('checked', false);
        })
    }

    //启用规格
    function showmod(e) {
        showmod_(e.target);
        e.stopPropagation();
    }
    function showmod_(o) {
        o = $(o);
        var bd = o.closest('.sec-item').find('.bd'), bool;
        if (o.attr('checked')) {
            bool = detection(o.closest('.sec-item .bd input:checkbox'), o, true);
            bool && bd.show();
        } else {
            detection(o.closest('.sec-item').find('.bd input:checkbox'), o, false);
            bd.hide();
            bd.parent().find('.table').hide();
            bd.parent().find('.table tbody').find("tr:not('.defalut')").remove();
        }
    }

    function selectModify(e) {
        var o = $(e.target), li = $(this).closest('li'), v = o.html();
        if (!e.data.add) {
            li.find('label').hide();
            if (li.find('.btn').size() == 0) {
                $("<input class='l inp inp40' type='text'><span class='l btn amend'>修改</span>").insertAfter(o);
            } else {
                li.find('.btn').show();
                li.find('input.inp').empty().show();
            }
        }
        $('#pd-specify .sec-item').find('.btn.amend').live('click', function (e) {
            var value = $(this).prev('input.inp').val(), label = $(this).closest('li').find('label');
            if (!!value) {
                label.html(value).show();
            } else {
                label.html(v).show();
            }
            $(this).hide();
            $(this).prev('input.inp').hide();
            //$(this).unbind();
            return false;
        })
        e.stopPropagation();
    }

    //    $('#pd-specify .sec-sec input:radio').bind('click', function () {
    //        var bool = $(this).hasClass('nousing'), che = $('#pd-specify .hd input:checkbox');
    //        var seletor = "#selectcolor .bd,#selectsize .bd,#pd-specify .selectnew .bd", seletor2 = ".sec-item .hd label"
    //        if (bool) {
    //            che.attr('disabled', true);
    //            $(seletor).hide();
    //            $(seletor2).css('color', '#999');
    //            $('#pd-specify .sec-item').find('.hd input:checkbox').attr('checked', false);
    //            $('#setProductPrice tbody').empty();
    //            obs_3 && (obs_3.list = []);
    //            $('#setProductPrice').hide();
    //            $('.noCatalogInput').attr('disabled', false);
    //        } else {
    //            che.attr('disabled', false);
    //            che.each(function (x, y) {
    //                showmod_(y);
    //            });
    //            $(seletor2).css('color', '#666');
    //            $('.noCatalogInput').attr('disabled', true);
    //        }
    //    })

    $('.usingCatalog').click(function () {
        var che = $('#pd-specify .hd input:checkbox');
        var seletor = ".sec-item .hd label";
        che.attr('disabled', false);
        che.each(function (x, y) {
            showmod_(y);
        });
        $(seletor).css('color', '#666');
        $('.noCatalogInput').attr('disabled', true);
    });

    $('.nousingCatalog').click(function () {
        var che = $('#pd-specify .hd input:checkbox');
        var seletor = "#selectcolor .bd,#selectsize .bd,#pd-specify .selectnew .bd", seletor2 = ".sec-item .hd label";

        che.attr('disabled', true);
        $(seletor).hide();
        $(seletor2).css('color', '#999');
        $('#pd-specify .sec-item').find('.hd input:checkbox').attr('checked', false);
        $('#setProductPrice tbody').empty();
        obs_3 && (obs_3.list = []);
        $('#setProductPrice').hide();
        $('.noCatalogInput').attr('disabled', false);

    });

    //启用规格的checkbox
    $('#pd-specify .sec-item').find('.hd input:checkbox').bind('click', showmod)
    //选择规格的值的checkbox
    $('#pd-specify .sec-item').find('.box input:checkbox').live('click', selectDetail);
    //$('#pd-specify .sec-item').find('.box label').live('dblclick', { add: false }, selectModify);
    //用户添加自定义值
    $('#pd-specify .sec-item').find('.add').bind('click', function (e) {
        var c = $(this).closest('.sec-item').find('.bd .control');
        if (c.css('display') != 'block')
            c.show();
        e.stopPropagation();
    })
    $('#pd-specify .control').find('.btn').live('click', function () {
        var count = $(this).closest('.bd').find('input:checkbox').size() + Math.random();
        var str = "<li class='node'><input id='addnewcheckbox_" + count + "' type='checkbox' name='' value='{value}' class='l' /><label for='addnewcheckbox_" + count + "' class='r'>{value}</label></li>", text = $(this).prev('input.inp').val();
        if (text != '') {
            var repeated = false;
            $(this).parent().parent().find('label').each(function () {
                if ($(this).html() == text) {
                    repeated = true;
                }
            });
            if (repeated) {
                alert('不能添加重复的规格值');
            }
            else {
                str = str.replace(/\{[a-zA-Z]+\}/g, text);
                $(str).insertBefore($(this).closest('.control'));
                $(this).prev('input.inp').val("");
                $(this).closest('ul').find('input[id*=addnewcheckbox_]:last').attr('checked',true);
                $(this).closest('ul').find('input[id*=addnewcheckbox_]:last').click();
                $(this).closest('ul').find('input[id*=addnewcheckbox_]:last').attr('checked', true);
            }
        } else {
            alert('规格属性不能为空');
        }
        return false;
    })
    $('#pd-specify .sec-item').find('.remove').bind('click', function (e) {
        if ($(this).closest('.sec-item').find('.bd').size() > 1) {
            $(this).closest('.sec-item').find('.bd:last').remove();
        }
        return false;
    })
    $('#addSelectnew').bind('click', function () {
        //var str = "<div class='item clearfix box'><div class='left'><input type='text' value='自定义规格' class='inp inp100' /></div><ul class='r'><li class='node control' style='display:block'><input type='checkbox' name='control' value='90' class='l' /><input type='text' class='l inp inp60' /><span class='r btn'>添加</span></li></ul><div class='node'><a class='add l' href='javascript:void(0)'>+新增自定义规格</a></div></div>"
        var o = $(this).closest('.sec-item').next();
        if (o.hasClass('hidden')) {
            o.removeClass('hidden');
            o.find('.bd').show();
            $(this).html('删除自定义规格模块');
        } else {
            o.addClass('hidden');
            $(this).html('添加自定义规格模块')
        }
        return false;
    })
    //label
    var text = 'releasepd';
    $.each(['input:radio', 'input:checkbox'], function (m, n) {
        var inp = $('#releaseproduct').find(n);
        inp.each(function (a, b) {
            var num = text + m + a;
            $(b).attr('id', num);
            $(b).next('label').attr('for', num);
        })
    })

    function findtooltip(e) {
        var o = $(e.target), parent = o.closest(e.data.parent), find = parent.find(e.data.find);
        if (e.data.enter) {
            find.css('top', '-40px')
            find.show();
        } else {
            find.hide();
        }
        e.stopPropagation();
    }

    $('.tooltips .query').bind('mouseenter', { parent: '.node', find: '.tooltip-1', enter: true }, findtooltip);
    $('.tooltips .query').bind('mouseleave', { parent: '.node', find: '.tooltip-1', enter: false }, findtooltip);

    $("#selectfreight input[name='productFreight']").bind('click', function () {
        if ($(this).val() == '0') {
            $('input[name=FreightForBuyerType]').attr('checked', false);
            $('input[name=FreightForBuyerType]').attr('disabled', true);
            $('input[name=ProductFlight]').attr('disabled', true);
        }
        else {
            $('input[name=FreightForBuyerType]').attr('checked', true);
            $('input[name=FreightForBuyerType]').attr('disabled', false);
            $('input[name=ProductFlight]').attr('disabled', false);
        }
        //        var o = $('#selectfreight .freight'), div = $('<div class="mask">'), mask = $('#selectfreight .mask');
        //        if ($(this).hasClass('seller')) {
        //            if (mask.size() < 1) {
        //                $('#selectfreight').append(div);
        //                div.css({
        //                    position: 'absolute',
        //                    width: o.outerWidth(),
        //                    height: o.outerHeight(),
        //                    left: o.offset().left,
        //                    top: o.offset().top,
        //                    backgroundColor: '#ccc',
        //                    opacity: 0.2
        //                })
        //            } else {
        //                mask.show();
        //            }
        //        } else {
        //            if (!!mask.size()) {
        //                mask.hide();
        //            }
        //        }
    })

    KISSY.use("editor/full", function (S, Editor) {

        var cfg = {
            // 是否初始聚焦
            //focused: true,
            autoRender: true,
            attachForm: true,
            // 自定义样式
            // customStyle:"p{line-height: 1.4;margin: 1.12em 0;padding: 0;}",
            // 自定义外部样式
            // customLink:["http://localhost/customLink.css","http://xx.com/y2.css"],
            // render:"#container",
            srcNode: '#editorEl',
            width: '100%',
            height: "400px"
        };

        var plugins = ("source-area" +
            ",separator" +
            ",bold" +
            ",italic," +
            "font-family," +
            "font-size," +
            "strike-through," +
            "underline," +
            "separator," +
            "checkbox-source-area" +
            ",image" +
            ",link" +
            ",fore-color" +
            ",back-color" +
            ",resize" +
            ",draft" +
            ",undo" +
            ",indent" +
            ",outdent" +
            ",unordered-list" +
            ",ordered-list" +
        //",elementPath" +
            ",page-break" +
            ",preview" +
            ",maximize" +
            ",remove-format" +
            ",heading" +
            ",justify-left" +
            ",justify-center" +
            ",justify-right" +
            ",table" +
            ",smiley" +
            ",flash" +
        //",xiami-music" +
            ",multiple-upload" +
        //",video" +
            ",drag-upload").split(",");

        var fullPlugins = [];

        S.each(plugins, function (p, i) {
            fullPlugins[i] = "editor/plugin/" + p + "/";
        });

        var pluginConfig = {
            link: {
                target: "_blank"
            },
            "image": {
                defaultMargin: 0,
                // remote:false,
                upload: {
                    serverUrl:$m.parseHost(location.href)[0]+ "/SellerProduct/UploadProductDesPic",
                    serverParams: {
                    },
                    suffix: "png,jpg,jpeg,gif",
                    fileInput: "Filedata",
                    sizeLimit: 1000 //k
                }
            },
            "flash": {
                "defaultWidth": "300",
                "defaultHeight": "300"
            },
            //            "templates": [
            //                {
            //                    demo: "模板1效果演示html",
            //                    html: "<div style='border:1px solid red'>模板1效果演示html</div><p></p>"
            //                },
            //                {
            //                    demo: "模板2效果演示html",
            //                    html: "<div style='border:1px solid red'>模板2效果演示html</div>"
            //                }
            //            ],
            "multiple-upload": {
                serverUrl: $m.parseHost(location.href)[0] + "/AnonymousProductPicUpload/BatchUploadProductDesPic",
                serverParams: {
                    cookie: function () {
                        return document.cookie;
                    }
                },
                "previewWidth": "80px",
                sizeLimit: 1000, //k
                numberLimit: 5
                /*extraHtml: "<p style='margin-top:10px;'>" +
                "<input type='checkbox' " +
                "style='vertical-align:middle;margin:0 5px;' " +
                "id='ke_img_up_watermark_2'>" +
                "<span style='vertical-align:middle;'>图片加水印，防止别人盗用</span></p>"*/
            },
            "draft": {
                // 当前编辑器的历史是否要单独保存到一个键值而不是公用
                // saveKey:"xxx",
                interval: 5,
                limit: 10,
                "helpHtml": "<div " +
                    "style='width:200px;'>" +
                    "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容，" +
                    "如果发现内容丢失，" +
                    "请选择恢复编辑历史</div></div>"
            },
            "resize": {
                //direction:["y"]
            },

            "drag-upload": {
                suffix: "png,jpg,jpeg,gif",
                fileInput: "Filedata",
                sizeLimit: 1000,
                serverUrl: $m.parseHost(location.href)[0] + "/AnonymousProductPicUpload/BatchUploadProductDesPic",
                serverParams: {
                }
            }
        };

        KISSY.use(fullPlugins, function (S) {
            var args = S.makeArray(arguments);

            args.shift();

            S.each(args, function (arg, i) {
                var argStr = plugins[i], cfg;
                if (cfg = pluginConfig[argStr]) {
                    args[i] = new arg(cfg);
                }
            });

            cfg.plugins = args;

            kissyEditor = new Editor(cfg);

            $('#submit').bind('click', spellObject);
            var useDuplicateSKU = false;
            function spellObject(e) {
                if (!canAdd) {
                    alert("正在添加信息，请稍后。");
                    return false;
                }
                $("#Description").val(kissyEditor.get("data"));
                function createSKU(val) {
                    var match = /([a-zA-Z0-9]+:+\d+-?)+/, str, str1;
                    if (match.test(val)) {
                        str = val.split('-');
                        val = {};
                        for (var i = 0, len = str.length; i < len; i++) {
                            str1 = str[i].split(':');
                            i == 0 && (val.SKU = str1[0], val.SKUNum = str1[1]) || (val['Sku' + i] = str1[0], val['Sku' + i + 'Num'] = str1[1]);
                        }
                    }
                    return val;
                }
                function Catalogs() {
                    var catalogs = [];
                    var useProperty = $('input[name=openProCheck]:checked').val();
                    if (useProperty == 0) {
                        var o = {
                            CatalogId: '',
                            Price: $('#productPrice').val(),
                            Num: $('#productNum').val(),
                            //                            SKU: $('#productSKU').val(),
                            Deleted: false
                        };
                        var skuText1 = $('#productSKU').val();
                        var skus1 = skuText1.split("-");
                        if (skus1.length > 1) {
                            o.SKU = skus1[0].split(':')[0];
                            o.SKUNum = skus1[0].split(':')[1];
                            for (var j = 1; j < skus1.length; j++) {
                                switch (j) {
                                    case 1:
                                        o.Sku1 = skus1[j].split(':')[0];
                                        o.Sku1Num = skus1[j].split(':')[1];
                                        break;
                                    case 2:
                                        o.Sku2 = skus1[j].split(':')[0];
                                        o.Sku2Num = skus1[j].split(':')[1];
                                        break;
                                    case 3:
                                        o.Sku3 = skus1[j].split(':')[0];
                                        o.Sku3Num = skus1[j].split(':')[1];
                                        break;
                                    case 4:
                                        o.Sku4 = skus1[j].split(':')[0];
                                        o.Sku4Num = skus1[j].split(':')[1];
                                        break;
                                    case 5:
                                        o.Sku5 = skus1[j].split(':')[0];
                                        o.Sku5Num = skus1[j].split(':')[1];
                                        break;
                                    default:
                                }
                            }
                        } else {
                            o.SKU = skuText1;
                        }
                        catalogs.push(o);
                    }
                    else if (useProperty == 1) {
                        var box = $('#set-price tbody'), tr = box.find('tr'), len = tr.size(), i;
                        for (i = 0; i < len; i++) {
                            var currentTr = tr.eq(i);
                            var firstAttribute = currentTr.children(':first').next().find('span').html();
                            var firstAttributePropertyId = currentTr.children(':first').next().find('input.PropertyId').val();
                            var firstAttributeImg = currentTr.children(':first').next().find('input.CatalogImg').val();

                            var secondAttribute = "";
                            var secondAttributePropertyId = "";
                            var secondAttributeImg = "";
                            if (currentTr.children(':first').next().next().find('span').length > 0) {
                                secondAttribute = currentTr.children(':first').next().next().find('span').html();
                                secondAttributePropertyId = currentTr.children(':first').next().next().find('input.PropertyId').val();
                                secondAttributeImg = currentTr.children(':first').next().next().find('input.CatalogImg').val();
                            }
                            if (currentTr.find('input.checkUseCatalog').attr("checked")) {
                                var obj = {
                                    catalogId: '',
                                    Price: currentTr.find("[name='price']").val(),
                                    Num: currentTr.find("[name='count']").val(),
                                    //                                    SKU: createSKU(currentTr.find("[name='number']").val()),
                                    Deleted: false
                                };
                                var skuText0 = currentTr.find("[name='number']").val();
                                var skus0 = skuText0.split("-");
                                if (skus0.length > 1) {
                                    obj.SKU = skus0[0].split(':')[0];
                                    obj.SKUNum = skus0[0].split(':')[1];
                                    for (var jj = 1; jj < skus0.length; jj++) {
                                        switch (jj) {
                                            case 1:
                                                obj.Sku1 = skus0[jj].split(':')[0];
                                                obj.Sku1Num = skus0[jj].split(':')[1];
                                                break;
                                            case 2:
                                                obj.Sku2 = skus0[jj].split(':')[0];
                                                obj.Sku2Num = skus0[jj].split(':')[1];
                                                break;
                                            case 3:
                                                obj.Sku3 = skus0[jj].split(':')[0];
                                                obj.Sku3Num = skus0[jj].split(':')[1];
                                                break;
                                            case 4:
                                                obj.Sku4 = skus0[jj].split(':')[0];
                                                obj.Sku4Num = skus0[jj].split(':')[1];
                                                break;
                                            case 5:
                                                obj.Sku5 = skus0[jj].split(':')[0];
                                                obj.Sku5Num = skus0[jj].split(':')[1];
                                                break;
                                            default:
                                        }
                                    }
                                } else {
                                    obj.SKU = skuText0;
                                }
                                currentTr.find("[name='id']").val() && (obj.catalogId = currentTr.find("[name='id']").val());
                                var property = [];
                                if (firstAttribute != '') {
                                    property.push({
                                        PropertyId: firstAttributePropertyId,
                                        PropertyName: $('#set-price').find('thead th.one').html().split('：')[1],
                                        PropertyValues: [{
                                            PropertyValue: firstAttribute,
                                            AttributeUrl: firstAttributeImg
                                        }]
                                    })
                                }
                                if (secondAttribute != '') {
                                    property.push({
                                        PropertyId: secondAttributePropertyId,
                                        PropertyName: $('#set-price').find('thead th.two').html().split('：')[1],
                                        PropertyValues: [{
                                            PropertyValue: secondAttribute,
                                            AttributeUrl: secondAttributeImg
                                        }]
                                    })
                                }
                                obj.PropertyValues = property;
                                catalogs.push(obj);
                            }
                        }
                    }
                    return catalogs;
                }

                function verify() {

                }

                var ProductName = $('#ProductName').val(),
                    PictureUrl1 = $('#ProductPictureUrl1').val(),
                    PictureUrl2 = $('#ProductPictureUrl2').val(),
                    PictureUrl3 = $('#ProductPictureUrl3').val(),
                    PictureUrl4 = $('#ProductPictureUrl4').val(),
                    PictureUrl5 = $('#ProductPictureUrl5').val();
                var mainPicIndex = $('input[name=selectMainPic]:checked').val();
                if (mainPicIndex == 2) {
                    PictureUrl1 = $('#ProductPictureUrl2').val();
                    PictureUrl2 = $('#ProductPictureUrl1').val();
                }
                else if (mainPicIndex == 3) {
                    PictureUrl1 = $('#ProductPictureUrl3').val();
                    PictureUrl3 = $('#ProductPictureUrl1').val();
                } else if (mainPicIndex == 4) {
                    PictureUrl1 = $('#ProductPictureUrl4').val();
                    PictureUrl4 = $('#ProductPictureUrl1').val();
                } else if (mainPicIndex == 5) {
                    PictureUrl1 = $('#ProductPictureUrl5').val();
                    PictureUrl5 = $('#ProductPictureUrl1').val();
                }

                var LimitNum = $("#limitNumber input[name='LimitNum']").val(),
                            ProductProperty = Propertys();
                var subData = {
                    ProductName: ProductName,
                    PictureUrl1: PictureUrl1,
                    PictureUrl2: PictureUrl2,
                    PictureUrl3: PictureUrl3,
                    PictureUrl4: PictureUrl4,
                    PictureUrl5: PictureUrl5,
                    OverSeaMarketPrice: '',
                    InternalMarketPrice: '',
                    BuyPlace: '',
                    iCategoryId: $('#CategoryId').val(),
                    iThirdCategoryId: $('#ThirdCategoryId').val(),
                    ThirdCategoryName: $('#ThirdCategoryName').val(),
                    MainCategoryName: $('#MainCategoryName').val(),
                    SubCategoryName: $('#SubCategoryName').val(),
                    sBrandName: '',
                    sBrandEnName: $('#BrandEnName').val(),
                    IsSailProtected: $('input[name=CatalogStatus]:checked').val() == 3,
                    ReferenceUrl: '',
                    Description: $("#Description").val(),
                    iBrandId: $('#BrandId').val(),
                    AcceptReturn: $('input[name=AcceptReturn]:checked').val(),
                    CatalogStatus: $('input[name=CatalogStatus]:checked').val(),
                    Flight: $('input[name=ProductFlight]').val(),
                    DeliveryTemplateId: $('#FreightTemplateId').val(),
                    Weight: $("#weight").val(),
                    dExpireTime: '',
                    LimitNum: LimitNum,
                    LimitNumStartTime: $('#BuyLimitTime').val(),
                    Limited:$('.BuyLimit').attr('checked'),
                    Available: false,
                    ProductProperty: ProductProperty,
                    sProductId: $('#ProductId').val(),
                    AvailableNow: false,
                    ValidStart: $('#ValidStartDate').val() + " " + $('#ValidStartHour').val() + ":" + $('#ValidStartMin').val() + ":00",
                    ValidEnd: $('#ValidEndDate').val() + " " + $('#ValidEndHour').val() + ":" + $('#ValidEndMin').val() + ":00",
                    OnSaleType: $('input[name=OnSaleType]:checked').val(),
                    //OnSaleType: 0,
                    AutoRefresh: $('input[name=AutoRefresh]:checked').length > 0,
                    CatalogType: $('input[name=CatalogType]:checked').val(),
                    TariffType: $('input[name=TariffType]:checked').val(),
                    CatalogSKUstring: $('#AutoCatalogSkus').val(),
                    CurrentSKUstring: $('#CurrentSkus').val(),
                    FreightForBuyerType: $('input[name=FreightForBuyerType]:checked').val(),
                    productFreight: $("input[name='productFreight']:checked").val(),
                    Catalogs: Catalogs(),
                    UseDuplicateSKU: useDuplicateSKU
                };
                var ErrorMsg = checkSubData(subData);
                var postUrl = "";
                var alertMsg = "";
                if ($('#isEdit').val() == 'y') {
                    postUrl = "/SellerProduct/Edit";
                    alertMsg = "商品修改成功。";
                }
                else {
                    postUrl = "/SellerProduct/AddStep2";
                    alertMsg = "商品添加成功！继续发布。";
                }
                if (ErrorMsg == "") {
                    $('#ErrorMsgDiv').hide();
                    canAdd = false;
                    $.ajax({
                        url: postUrl,
                        type: "POST",
                        dataType: "json",
                        data: $.toJSON(subData),
                        contentType: 'application/json',
                        success: function (data) {
                            canAdd = true;
                            if (data.success == "1") {
                                alert(alertMsg);
                                if ($('#isEdit').val() == 'y') {
                                    window.location.href = data.redirect;
                                } else {
                                    window.location.reload();
                                }
                            } else if (data.success == "2") {
                                if (confirm(data.message)) {
                                    useDuplicateSKU = true;
                                    $('#submit').click();
                                }
                            }
                            else {
                                alert(data.message);
                            }
                        }
                    });
                } else {
                    var errors = ErrorMsg.split("|");
                    var index = 1;
                    $('#ErrorMsgs').html("");
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i] != "") {
                            $('#ErrorMsgs').append("<p class='dec'>" + index + "." + errors[i] + "</p>");
                        }
                        index++;
                    }
                    $('#ErrorMsgDiv').show();
                    //                    window.location.hash = 'ErrorMsgDiv';
                    window.scrollBy(0, -2000);
                }
            }
            //测试用id
            $("#editorEl .ks-editor-status input[type='checkbox']").attr('id', 'editorCheckbox')
        });
        
    });

    $('.UseFreightTemplate').click(function () {
        var selectCatalogStatu = $('input[name=CatalogStatus]:checked').length > 0;
        var catalogStatu = $('input[name=CatalogStatus]:checked').val();
        if (!selectCatalogStatu) {
            alert('请先选择配送方式');
            $(this).attr('checked', false);
        } else {
            var n = "";
            var amendUrl = "";
            if (catalogStatu == 1) {
                n = "国内";
                amendUrl = "/DeliveryTemplate/Index";
            } else {
                n = "国际";
                amendUrl = "/DeliveryTemplate/Index?type=1";
            }
            if (hasTemplate(catalogStatu) == "False") {
                if (confirm("您还未设置" + n + "运费模板，请先设置。")) {
                    $(this).attr('checked', false);
                    $('#FreightTemplateName').html('运费模板');
                    window.open(amendUrl);
                }
                else {
                    $(this).attr('checked', false);
                }
            } else {
                if (catalogStatu == 1) {
                    $('#FreightTemplateName').html('国内运费模板');
                } else {
                    $('#FreightTemplateName').html('国际运费模板');
                }
                $('.buyer').attr('checked', true);
            }

            //            $('#SetTemplate').show();
            //            $('#SetFreight').hide();
            $('#OneFlight').attr("disabled", "disabled");
        }
    });

    $('.UseFreightSelf').click(function () {
        $('.buyer').click();
    });

    $('input.CatalogPicFile').live('change', function () {
        var filename = $(this).val();

        //var tr = $(this).closest("tr").attr('item'), that = $(this);
        var that = $(this);
        var tr = that.closest("tr").attr('item');
        if (filename == "") {
            undatecatalog(tr, '');
            return false;
        }
        var options = {
            type: "POST",
            dataType: "text",
            success: function (msg) {
                if (msg == "error") {
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                } else {
                    saveimgsrc(tr, msg);
                    undatecatalog(tr, msg);
                    $("input:[colorid='" + tr + "']").data('src', msg);
                    $("input:[colorid='" + tr + "']").data('filename', filename);
                    $(that).next('span').remove();
                    $("<span class='v'><img src='" + msg.replace('original', 'thumbnail').replace('_o', '_t') + "' width='40' /><!--<em class='yel'>" + filename + "</em>-->上传成功&nbsp;&nbsp;<a class='blue cancel' href='javascript:void(0)'>取消</a></span>").insertAfter(that);
                    //alert("上传成功");
                }
            },
            error: function () {
                alert("图片上传异常，请重新选择较小的图片上传。");
            }
        };
        j$(this).closest('.CatalogPicForm').ajaxSubmit(options);
        return false;
    });
    function undatecatalog(tr, msg) {
        for (var i = 0, len = cataloggroup.length; i < len; i++) {
            var id = cataloggroup[i].id.split("-");
            if (id[0] != "" && id[0] == tr) {
                cataloggroup[i].src[0] = msg;
                cataloggroup[i].modify = true;
            }
            if (id[1] != "" && id[1] == tr) {
                cataloggroup[i].src[1] = msg;
                cataloggroup[i].modify = true;
            }
        }
    }
    $('#pd-specify .cancel').live('click', function () {
        var id = $(this).closest("tr").attr('item');
        $(this).closest('.v').remove();
        $("input:[colorid='" + id + "']").data('src', '');
        $("input:[colorid='" + id + "']").data('filename', '');
        $('input.CatalogPicFile').val("");
        $('input.CatalogPicFile').change();
        saveimgsrc(id, '');
        return false;
    })
    function saveimgsrc(tr, msg) {
        $('#set-price tbody tr').each(function () {
            var data = $(this).attr('data').split('-');
            if (data[0] == tr) {
                $(this).find('.CatalogImg').eq(0).val(msg);
            }
            if (data[1] == tr) {
                $(this).find('.CatalogImg').eq(1).val(msg);
            }
        })

    }
    $('.autoCreateSku').live('click', function () {
        var catalogNum = $('#set-price').find('tbody').find('tr').length;
        $.ajax({
            url: "/SellerProduct/GetNewCatalogSkus?n=" + catalogNum + "&tt=" + Math.random(),
            type: "GET",
            async: false,
            dataType: 'text',
            success: function (data) {
                var autoSkus = data.split(",");
                var i = 0;
                $('.oneCatalogSku').each(function () {
                    if (!$(this).val()) {
                        $(this).val(autoSkus[i]);
                        $(this).change();
                        i++;
                    }
                });
                $('#AutoCatalogSkus').val($('#AutoCatalogSkus').val() + data);
            }
        });
    });

    $('#AutoOneSku').click(function () {
        $.ajax({
            url: "/SellerProduct/GetNewCatalogSkus?n=1&tt=" + Math.random(),
            type: "GET",
            async: false,
            dataType: 'text',
            success: function (data) {
                $('#productSKU').val(data);
                $('#AutoCatalogSkus').val($('#AutoCatalogSkus').val() + data);
            }
        });
    });

    $('input[name=CatalogType]').click(function () {
        if ($(this).val() == 1) {
            $('#ChinaCatalogStatu').html('国内转运');
        } else {
            $('#ChinaCatalogStatu').html('国内现货');
        }
    });

    $('input[name=CatalogStatus]').click(function () {
        $('input[name=productFreight]').attr('checked', false);
        $('input[name=FreightForBuyerType]').attr('checked', false);
        $('input[name=FreightForBuyerType]').attr('disabled', false);
        $('#flight').attr('disabled', false);
        if ($(this).val() == "1") {
            $('#localFreightTemplates').show();
            $('#usFreightTemplates').hide();
            $('#productWeight').find('.l').html("商品估重（公斤）：");

            $('.TariffTypeBySeller').attr('checked', true);
            $('.TariffTypeByBuyer').attr('disabled', true);
        } else {
            $('#usFreightTemplates').show();
            $('#localFreightTemplates').hide();
            if ($('#SellerIsUSA').val() == '1') {
                $('#productWeight').find('.l').html("商品估重（磅）：");
            }
            else {
                $('#productWeight').find('.l').html("商品估重（公斤）：");
            }
            
            $('.TariffTypeBySeller').attr('disabled', false);
            $('.TariffTypeByBuyer').attr('disabled', false);
        }
        showWeight($('#FreightTemplateId').val());
        $('#FreightTemplateName').html('运费模板');
    });

    $('select[name=FreightTemplates]').change(function () {
        $('#FreightTemplateId').val($(this).val());

        if ($(this).val() == "") {
            return;
        }

        showWeight($('#FreightTemplateId').val());
    });

    function showWeight(templateId) {
        for (var i = 0; i < weightTemplates.length; i++) {
            if (templateId == weightTemplates[i]) {
                $('#productWeight').show();
                return;
            }
        }
        $('#productWeight').hide();
    }

    //edit
    //var obj = { name: a.val(), pid: a.attr('data'), id: b, bid: id + "_" + b,src:src };
    (function () {
        var proplab = $('#propertysForjs'), selected = 0;
        if (proplab.size() > 0 && proplab.val() != '') {
            var proparray = $.parseJSON(proplab.val()), len = proparray.length, i, j, obs, obj, len1, propertyid;
            for (i = 0; i < len; i++) {
                obs = new observer;
                obs.selected = selected++;
                obs.type = proparray[i].PropertyId;
                obs.name = proparray[i].PropertyName;
                $('#pd-specify input.PropertyId').each(function () {
                    if ($(this).val() == obs.type) {
                        propertyid = $('#pd-specify .sec-item').index($(this).closest('.sec-item'));
                        obs.id = propertyid;
                    }
                })
                for (j = 0, len1 = proparray[i].PropertyValues.length; j < len1; j++) {
                    obj = { name: proparray[i].PropertyValues[j].PropertyValue, pid: proparray[i].PropertyId, id: j, bid: propertyid + "_" + j, src: proparray[i].PropertyValues[j].AttributeUrl }
                    obs.list.push(obj);
                }
                obs_3.list.push(obs);
            }
            //createcatalog;
            var count1 = 0, o1 = new observer, a, b;
            $('input:checkbox.catalogtypecls').each(function (m, n) {
                var o;
                if ($(this).attr('checked')) {
                    o = $(this).closest('.sec-item');
                    var o2 = new observer;
                    o2.id = $('#pd-specify').find('.sec-item').index(o);
                    o2.type = o.find('.PropertyId').val();
                    o2.name = o.find('.PropertyName').val();
                    o.find('.bd input:checkbox').each(function (a, b) {
                        if ($(this).attr('checked')) {
                            o2.list.push(m + "_" + a)
                        }
                    })
                    o1.list.push(o2);
                }
            })
            if (o1.list.length == 0) {
                return
            } else {
                a = o1.list[0], b = o1.list[1] || new observer, tr = $('#set-price tbody tr');
                len = a.list.length;
                len1 = b.list.length;
                for (var e = 0; e < len; e++) {
                    if (!len1) {
                        catalogId = tr.eq(count1).find('input[name=id]').val();
                        //tr.eq(count1).attr('data', a.list[e] + "-");
                        createcatalog(a.list[e], '', true, $("tr:[data=" + a.list[e] + "-]").eq(0), catalogId);
                        count1++
                    }
                    for (var f = 0; f < len1; f++) {
                        //tr.eq(count1).attr('data', a.list[e] + "-" + b.list[f]);
                        createcatalog(a.list[e], b.list[f], true, $("tr:[data=" + a.list[e] + "-" + b.list[f] + "]").eq(0));
                        count1++
                    }
                }
            }
        }
    })()

    if ($('#isEdit').val() == 'y' || $('#isCopy').val() == 'y') {
        if ($('#templateId').val() != "") {
            $('.ProductFreightForBuyer').click();
            $('.UseFreightTemplate').click();
        } else if ($('#flight').val() > 0) {
            $('.ProductFreightForBuyer').click();
            $('.UseFreightSelf').click();
        } else {
            $('.ProductFreightForSeller').click();
        }
        if ($('.nousingCatalog').attr("checked")) {
            $('.nousingCatalog').click();
        }
    } else {
        $('.nousingCatalog').click();
    }

    if ($('input[name=CatalogStatus]:checked').val()=='1') {
        $('.TariffTypeBySeller').attr('checked', true);
        $('.TariffTypeByBuyer').attr('disabled', true);
    }
    else {
        $('.TariffTypeBySeller').attr('disabled', false);
        $('.TariffTypeByBuyer').attr('disabled', false);
    }

    $('.SetAutoRefresh').click(function () {
        if ($('#isEdit').val() == 'y') {
            if ($(this).attr('checked') == true) {
                $('.OnSaleNow').click();
                $('.OnSaleSpecial').attr('disabled', true);
                $('.OnSaleOff').attr('disabled', true);
                $('.OneSaleOld').attr('disabled', true);
                $('.OnSaleNow').attr('checked', false);
            } else {
                $('.OnSaleSpecial').attr('disabled', false);
                $('.OnSaleOff').attr('disabled', false);
                $('.OneSaleOld').attr('disabled', false);
            }
        } else {
            if ($(this).attr('checked') == true) {
                $('.OnSaleNow').click();
                $('.OnSaleSpecial').attr('disabled', true);
                $('.OnSaleOff').attr('disabled', true);
            } else {
                $('.OnSaleSpecial').attr('disabled', false);
                $('.OnSaleOff').attr('disabled', false);
            }
        }
    });
    
    $('.BuyLimit').click(function () {
        if ($(this).attr('checked')) {
            var t = new Date();
            var tMonth = t.getMonth() + 1;
            var tHour = t.getHours();
            var tMinits = t.getMinutes();
            $('#BuyLimitTimeShow').html(t.getFullYear() + '年' + tMonth + '月' + t.getDate() + '日 ' + tHour + ':' + tMinits);
            $('#BuyLimitTime').val(t.getFullYear() + '-' + tMonth + '-' + t.getDate() + ' ' + tHour + ':' + tMinits + ':' + t.getSeconds());
            $('#BuyLimitMsg').show();
            $("input[name='LimitNum']").attr('disabled', false);
        } else {
            $('#BuyLimitMsg').hide();
            $("input[name='LimitNum']").attr('disabled', true);
        }
    });

});
// batch upload product pics
$(function () {
    var _uploadLimit = 5;
    var _batchFiles = [];
    var _batchUploadButtonId = "#batch_file_upload";
    var _uploadActionUrl = "http://" + location.href.substr(7).substring(0, location.href.substr(7).indexOf("/")) + "/AnonymousProductPicUpload/UploadPic";
    var _swfUrl = "http://static.ymatou.com/scripts/lib/uploadify/uploadify.swf";

    function getFileIndex(file) {
        var fileIndex = 0;
        for (var i = 0; i < _batchFiles.length; i++) {
            if (_batchFiles[i] == file) {
                fileIndex = i + 1;
                break;
            }
        }
        return fileIndex;
    }

    $(_batchUploadButtonId).uploadify({
        'formData': {
            'timestamp': '',
            'token': ''
        },
        'swf': _swfUrl,
        'uploader': _uploadActionUrl,
        'fileSizeLimit': '5000KB',
        'onDialogClose': function (queueData) {
            if (queueData.filesSelected > _uploadLimit) {
                alert("最多只能上传" + _uploadLimit + "个文件");
                $(_batchUploadButtonId).uploadify('cancel', '*');
            }
        },
        'onDialogOpen': function () {
            _batchFiles = [];
        },
        'onUploadStart': function (file) {
            var index = _batchFiles.length + 1;
            var imgcon = $('#uploadedPic' + index);
            //$('#progress' + index).html(file.name);
            _batchFiles[_batchFiles.length] = file.name;

            if (imgcon.find('.loading').size() > 0) {
                imgcon.find('.loading').show();
            } else {
                imgcon.append("<img src='http://static.ymatou.com/content/img/loading_16_16.gif' class='loading' />")
            }
        },
        'onUploadProgress': function (file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
            var index = getFileIndex(file.name);
            if (index > 0) {
                //$('#uploadedPic' + index).html("上传中");
                //$('#progress' + index).html(file.name + ': ' + totalBytesUploaded + ' bytes uploaded of ' + totalBytesTotal + ' bytes.');
            }
            else {
                alert("progress error:" + file.name);
            }
        },
        'onUploadSuccess': function (file, data, response) {
            var index = getFileIndex(file.name);
            if (index > 0) {
                var imgcon = $('#uploadedPic' + index);
                if (data == "error") {
                    imgcon.html("上传失败");
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                }
                else {
                    $('#ProductPictureUrl' + index).val(data);
                    imgcon.html("<img src='" + data + "' class='img'/>");
                }
                //$('#progress' + index).html('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
            }
            else {
                alert("error:" + file.name);
            }
        },
        'onQueueComplete': function (queueData) {
            //alert(queueData.uploadsSuccessful + '个图片上传结束');
            _batchFiles = [];
        }
    });
});
