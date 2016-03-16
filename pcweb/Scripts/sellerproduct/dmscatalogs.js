/*=======================dmscatalogs.js===========================*/
var model = window.Spine.Model, controll = window.Spine.Controller;
var catalog = model.setup('catalog', ['checked', 'CatalogId', 'CatalogIds', 'Price', 'TotalStock', 'Properties', 'SKUText', 'SKUs', 'display']),
    sku = model.setup('sku', ['Sku', 'Amount']);
releaselabel = "RELEASELABELCOUNTID",
    com = {
        container: $('#release'),
        prop0: null,
        prop1: null,
        drawtable: $('#setProductPrice'),
        catalogid: 0,
        log: 'RELEASECATALOGID',
        catalogs: [],
        oldCatalogs: [],
        cancelall: !1,
        index: 0,
        current: null
    },
    _slice = Array.prototype.slice;
com.container.find('input.l').each(function (m, n) {
    var o = $(this)
    if (o.next().is('label')) {
        m = releaselabel + m;
        o.attr('id', m);
        (o.attr('propid') == '' || o.attr('propid') == null) && o.attr('propid', m);
        o.next().attr('for', m)
    }
});
com.container.bind('catalogchange', catalogchange);
com.container.bind('imgchange', imgchange);
com.container.bind('catalogkindchange', catalogkindchange);
com.container.delegate('input.l:checkbox:not([name="catalogkind"])', 'click', togglecatalog);
com.container.delegate('input[name="catalogkind"]', 'click', togglecatalogkind);
com.container.delegate('.CatalogPicFile', 'change', selectimgs);
com.container.delegate('.addtext', 'change', addcatalog);
com.drawtable.delegate('input', 'change', datachange);
//取消规格选取更新com.cagalogs
//com.drawtable.delegate('input:checkbox.checkUseCatalog', 'change', checkedchange);
//表格中选取启用规格
function checkedchange() {
    var o = $(this), c = com, id = o.closest('tr').attr('catalogid'), record;
    record = model.findByAttribute('CatalogId', id);
    for (var i = 0, len = c.catalogs.length; i < len; i++) {
        if (c.catalogs[i] == record) {
            c.catalogs.splice(i, 1);
            return;
        }
    }
}
function addcatalog() {
    var o = $(this), value = o.val(), html, c = com, str;
    if (value != '') {
        str = "ADDRELEASELABELCOUNTID";
        while (c.container.find("#" + str + c.catalogid).size() > 0) {
            c.catalogid++;
        }
        str += c.catalogid++;
        html = '<li class="node"><input type="checkbox" class="l" value="' + value + '" name="" propid="' + str + '" id="' + str + '"><label class="r" for="' + str + '">' + value + '</label></li>';
        o.closest('li.control').before(html);
        $('input#' + str).attr('checked', true);
        $('input#' + str).click();
        $('input#' + str).attr('checked', true);
    }
}
function datachange() {
    var o = $(this), model = catalog, id = o.closest('tr').attr('catalogid'), record, value = o.val(), name = o.attr('name'), obj = {};
    record = model.findByAttribute('CatalogId', id);
    if (o.is('input.inp')) {
        obj[name] = value;
        record != null && model.update(record.id, obj);
    }
    if (o.is(':checkbox')) {
        record != null && model.update(record.id, { checked: o.attr('checked') })
    }
}
function selectimgs() {
    var c = com, o = $(this), id = o.closest('tr').attr('catalogimgid'), parent = o.closest('.sec-item'), index = c.container.find('.sec-item').index(parent), prop = c['prop' + index] || {}, record;

    var filename = $(this).val();
    if (filename == "") {
        return false;
    }
    var options = {
        type: "POST",
        dataType: "text",
        success: function (msg) {
            if (msg == "error") {
                alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
            } else {
                //to do保存图片并预览
                o.next().attr("src", msg);
                o.next().show();
                record = prop.findByAttribute('PropertyValueId', id);
                prop.update(record.id, { PropertyValuePic: msg });
                c.container.trigger("imgchange", [record, parent, id]);
            }
        },
        error: function () {
            alert("图片上传异常，请重新选择较小的图片上传。");
        }
    };
    $(this).closest('.CatalogPicForm').ajaxSubmit(options);
    return false;
}
function imgchange(e, record, parent, id) {
    if (parent)
    var tr = parent.find(".PropertyImgTable tr[catalogimgid='" + id + "']");
    tr.find("img").attr("src", record.PropertyValuePic);
    tr.find("img").show();
}
function togglecatalogkind(e) {
    var c = com, o = $(this), parent = o.closest('.sec-item'), bd = parent.find('.bd'), index = c.container.find('input[name="catalogkind"]').index(o), prop, checked = o.attr('checked');
    c.index = index;
    displaytoggle(checked, bd);
    prop = c['prop' + index] = c['prop' + index] || model.setup('prop', ['PropertyId', 'PropertyName', 'PropertyValueId', 'PropertyValue', 'PropertyValuePic', 'Cancel']);
    c.container.trigger('catalogkindchange', [prop, checked, bd, parent]);
    e.stopPropagation();
}
function togglecatalog(e) {
    var c = com, o = $(this), id = o.attr('propid'), text = o.next().html(), parent = o.closest('.sec-item'), table = parent.find('table.table'), tbody = table.find('tbody'), index = c.container.find('.sec-item').index(parent), prop = c['prop' + index] || {}, value = o.val(), checked = o.attr('checked');
    if (checked) {
        table.show();
        table.find('tr.defalut').clone().appendTo(tbody).attr('catalogimgid', id).removeClass('defalut');
        tbody.find('[catalogimgid="' + id + '"]').children('td.color').html(text);
    } else {
        tbody.find('[catalogimgid="' + id + '"]').remove();
    }
    //c.cancelall = parent.find('.bd input:checkbox:checked').size() == 0 ? !0 : !1;
    c.current = { id: id, cancel: !checked };
    c.index = index;
    var object = {
        PropertyId: parent.find('.hd input:[name="catalogkind"]').attr('PropertyId'),
        PropertyName: parent.find('.hd input:[name="catalogkind"]').val(),
        PropertyValueId: id,
        PropertyValue: value,
        PropertyValuePic: tbody.find("tr:[catalogimgid='" + id + "'] .CatalogPicFile").val(),
        Cancel: !checked
    };
    c.container.trigger('catalogchange', [prop, checked, object,parent,id]);
    e.stopPropagation();
}
function displaytoggle(bool, ele) {
    if (bool) {
        ele.show();
    } else {
        ele.hide();
    }
}
function catalogchange(e, prop, add, obj,parent,id) {
    var record = prop.findByAttribute('PropertyValueId', obj.PropertyValueId);
    if (record == null) {
        record = prop.create(obj);
    } else {
        prop.update(record.id, { Cancel: !add });
    }
    com.container.trigger("imgchange", [record, parent, id]);
    createsinglecatalog(record);
    createcatalog();
}
function catalogkindchange(e, prop, add, bd, parent) {
    if (!add) {
        displaytoggle(add, bd);
        displaytoggle(add, parent.find('table.table'));
        bd.find('input.l:checked').each(function () {
            var c = com, o = $(this), object = {
                PropertyValueId: o.attr('propid'),
                PropertyValue: o.val(),
                Cancel: !1
            };
            parent.find('table.table [catalogimgid="' + object.PropertyValueId + '"]').remove();
            $(this).attr('checked', false);
            c.container.trigger('catalogchange', [prop, false, object]);
        });
    }
}
function createcatalog() {
    var c = com, prop0 = c.prop0 && c.prop0.toJSON() || [], prop1 = c.prop1 && c.prop1.toJSON() || [], i = 0, j = 0, leni, lenj, log, model = catalog;
    if (!(prop0.length != 0 || prop1.length != 0)) {
        return
    } else {
        leni = prop0.length == 0 ? 1 : prop0.length;
        lenj = prop1.length == 0 ? 1 : prop1.length;
        if (prop0.length == 0 && prop1.length == 0) {
            c.drawtable.hide();
            return
        }
    }
    for (i = 0; i < leni; i++) {
        for (j = 0; j < lenj; j++) {
            (function (a, b, c, d, e) {
                var log = { checked: !0, CatalogId: '', Price: '', TotalStock: '', Properties: [], SKUText: '', display: !0 }, m, n, p, record2;
                m = a[c], n = b[d];
                if (m && n) {
                    p = createcatalogid(m.PropertyValueId, n.PropertyValueId), log.Properties[0] = m, log.Properties[1] = n;
                    log.CatalogId = p, record2 = model.findByAttribute('CatalogId', p);
                    if (record2 == null) {
                        record2=model.create(log);
                        if (!m.Cancel && !n.Cancel) {
                            model.update(record2.id, { display: !0 })
                        }else{
                            model.update(record2.id, { display: !1 })
                        }
                    } else {
                        if (m.Cancel || n.Cancel) {
                            model.update(record2.id, { display: !1 });
                        } else {
                            model.update(record2.id, { display: !0 })
                        }
                    }
                }
            })(prop0, prop1, i, j, c);
        }
    }
    c.catalogs = model.select(filtecatalog);
    drawtable();
}
function createsinglecatalog(m) {
    var c = com, log = { checked: !0, CatalogId: '', Price: '', TotalStock: '', Properties: [], SKUText: '', display: !0 }, p, record1, model = catalog;
    if (c.index) {
        p = createcatalogid('', m.PropertyValueId), log.Properties.push('', m);
    } else {
        p = createcatalogid(m.PropertyValueId, ''), log.Properties.push(m, '');
    }
    log.CatalogId = p, log.display = !m.Cancel, record1 = model.findByAttribute('CatalogId', p);
    record1 == null && model.create(log) || model.update(record1.id, { display: !m.Cancel });
}
function createcatalogid(a, b) {
    return "0" + encodeURIComponent(a) + "::1" + encodeURIComponent(b);
}
function filtecatalog(record) {
    if (!record.display)
        return false;
    var model = catalog, arr = record.CatalogId.split('::'), all = !0;
    if (arr[0] != '0' && arr[1] != '1') {
        return true;
    } else {
        if (arr[0] == '0') {
            return compare(arr[1], 1);
        } else if (arr[1] == '1') {
            return compare(arr[0], 0);
        }
    }
    function compare(a, b) {
        var d = b ? 0 : 1, old = record;
        var arr = model.select(function (cord) {
            if (cord != old) {
                var id = cord.CatalogId.split('::');
                return id[b] == a && cord.display;
            }
        });
        return !arr.length;
    }
}

var IntelligenceStockType = true;
function drawtable() {
    var c = com, model = c.catalogs, len = model.length, i = 0, str = [], perty0, perty1, editstr = "", skudisabled, stockdisabled, hasStock = c.container.find("input:radio:[name='StockType']:checked").hasClass('IntelligenceStockType'), stock, skuReg = /[-:]+/, editbool;
    for (i; i < len; i++) {
        perty0 = (model[i].Properties[0] != '' && model[i].Properties[0] != undefined) ? model[i].Properties[0].PropertyValue : '';
        perty1 = (model[i].Properties[1] != '' && model[i].Properties[1] != undefined) ? model[i].Properties[1].PropertyValue : '';
        stockdisabled = "";
        if ($('#IsEdit').val() == "y") {
            if (firstEdit) {
                stockdisabled = " disabled ";
            }
            else if (c.oldCatalogs.length != 0 && c.oldCatalogs.contains(model[i])) {
                stockdisabled = " disabled ";
            }
        }
        stock = '<input type="text" value="' + model[i].TotalStock + '" class="inp inp50" ' + stockdisabled + ' name="TotalStock">';
        editbool = skuReg.test(model[i].SKUText);
        editstr = editbool ? '<a class="blue l edit" edit="' + model[i].SKUText + '" href="javascript:void(0)">编辑</a><span class="blue l"></span><a class="blue r delete" href="javascript:void(0)">删除组合</a>' : '<a href="javascript:void(0)" class="blue group">设置多个商品编号</a>';
        skudisabled = editbool ? " disabled " : " ";
        str.push('<tr catalogid="' + model[i].CatalogId + '"><td><input type="checkbox" checked="' + model[i].checked + '" class="checkUseCatalog"></td><td clsss="one">' + perty0 + '</td><td clsss="two">' + perty1 + '</td><td class="TotalStock">' + stock + '</td><td><input type="text" value="' + model[i].SKUText + '" class="inp inp100 oneCatalogSku" ' + skudisabled + ' name="SKUText" /></td><td  class="node">' + editstr + '</td></tr>')
    }
    c.drawtable.find('tbody').html(str.join(""));
    !!len && c.drawtable.show() || c.drawtable.hide();
    if ($("input[name=StockType]:checked").val() == "0") {
        $('.TotalStock').show();
    }
    else {
        $('.TotalStock').hide();
    }
}
Array.prototype.contains = function (o,n) {
    var i, len = this.length;
    for (i = 0; i < len; i++) {
        if (this[i].CatalogId == o.CatalogId) {
            return n==undefined?true:this[i][n];
        }
    }
    return false;
}
function getSkuGroup(skuText) {
    var group = [];
    if (skuText.indexOf('-') > 1) {
        var skus = skuText.split('-');
        for (var j = 0; j < skus.length; j++) {
            var skuItemText = skus[j].split(':')[0];
            var skuItemAmount = skus[j].split(':')[1];
            var skusItem = {
                Sku: skuItemText,
                Amount: skuItemAmount
            };
            if (skusItem.Sku != "") {
                group.push(skusItem);
            }
        }
    } else {
        var skuItem = {
            Sku: skuText,
            Amount: 1
        };
        if (skuItem.Sku != "") {
            group.push(skuItem);
        }
    }
    return group;
}
Array.prototype.filter = function (fn) {
    var arr = [], i, len = this.length;
    for (i = 0; i < len; i++) {
        if (!fn.call(this, this[i], i)) {
            arr.push(this[i])
        }
    }
    return arr;
}
function getCatalogs() {
    var catalogs = [], model = catalog;
    $('#set-price tbody tr input:checked').each(function () {
        var catalogId = $(this).closest('tr').attr('catalogid');
        var catalog = model.findByAttribute('CatalogId', catalogId);
        var oldcatalogids = com.oldCatalogs.contains(catalog, 'actualID');
        var catalogItem = {
            TotalStock: catalog.TotalStock,
            Properties: [],
            SKUs: [],
            CatalogIds: oldcatalogids === undefined || oldcatalogids === false ? [] : oldcatalogids.split("|").filter(function (m, n) {
                if (m == "") {
                    return true
                }
                return false
            })
        };
        for (var i = 0; i < catalog.Properties.length; i++) {
            if (catalog.Properties[i].PropertyName != null && catalog.Properties[i].PropertyName != "" && catalog.Properties[i].PropertyValue != null && catalog.Properties[i].PropertyValue != "") {
                var property = {
                    PropertyId: catalog.Properties[i].PropertyId,
                    PropertyName: catalog.Properties[i].PropertyName,
                    PropertyValueId: catalog.Properties[i].PropertyValueId,
                    PropertyValue: catalog.Properties[i].PropertyValue,
                    PropertyValuePic: catalog.Properties[i].PropertyValuePic
                };
                catalogItem.Properties.push(property);
            }
        }
        var skuText = catalog.SKUText;
        catalogItem.SKUs = getSkuGroup(skuText);
        catalogs.push(catalogItem);
    });
    return catalogs;
}

$(window).bind('unload', function () {
    model = catalog = sku = com = null;
})
function initimg() {
    $(".PropertyImgTable").each(function (m, n) {
        var prop = com["prop" + m];
        $(this).find("tbody tr:[catalogimgid]").each(function (a,b) {
            var record = prop.findByAttribute('PropertyValueId', $(this).attr("catalogimgid"));
            prop.update(record.id, { PropertyValuePic: $(this).find("img").attr("src") });
        })
    })
}
$(function () {
    $('#set-price').find('input:disabled').each(datachange);
    drawtable();
    initimg();
    //控制商品名称长度
    function getLength(value) {
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

    function getPartStr(value, length) {
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

    $('#ProductName').bind({
        keyup: function () {
            var str = $(this).val(), len = getLength(str);
            if (len > 60) {
                $(this).val(getPartStr(str, 60));
            } else {
                $(this).next('.attetion').find('.num').html(60 - len);
            }
        },
        blur: function () {
            var name = $(this).attr('name');
        }
    });
    //开启关闭设置规格
    $("input[name=openProCheck]").click(function () {
        if ($(this).hasClass("nousingCatalog")) {
            $(".sec-item").hide();
            $("#setProductPrice").hide();
            $('#NoPropertyDiv').show();

        } else if ($(this).hasClass("usingCatalog")) {
            $(".sec-item").show();
            $("#setProductPrice").show();
            $('#NoPropertyDiv').hide();
        }
    });
    //选择渠道
    $(".check-distribut").click(function () {
        var onlyOneDistribut = $(".check-distribut:checked").length == 1;
        if (onlyOneDistribut) {
            $(".ManualStockType").click();
            //$(".IntelligenceStockType").attr("disabled", true);
            IntelligenceStockType = false;
        }
        else {
            //$(".IntelligenceStockType").attr("disabled", false);
            //            $(".IntelligenceStockType").click();
            //IntelligenceStockType = true;
        }
    });
    //选择库存管理方式
    $("input[name=StockType]").click(function () {
        if ($(this).val() == "0") {
            IntelligenceStockType = true;
            $('#NoProperty-StockDiv').show();
            $('.TotalStock').show();
        }
        else {
            IntelligenceStockType = false;
            $('#NoProperty-StockDiv').hide();
            $('.TotalStock').hide();
        }
        drawtable();
    });
    //自动编写商品编号
    $('.autoCreateSku').live('click', function () {
        var catalogNum = $('#set-price').find('tbody').find('tr').length;
        $.ajax({
            url: "/SellerProduct/GetNewCatalogSkus?n=" + catalogNum,
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
            }
        });
    });
    $('#NoProperty-AutoSku').click(function () {
        $.ajax({
            url: "/SellerProduct/GetNewCatalogSkus?n=1",
            type: "GET",
            async: false,
            dataType: 'text',
            success: function (data) {
                $('#NoPropertySku').val(data);
            }
        });
    });
    /////////////////////生成提交数据
    function getDistributors() {
        var distributors = [];
        $('.check-distribut').each(function () {
            if ($(this).attr('checked') == true) {
                distributors.push($(this).val());
            }
        });
        return distributors;
    }
    $('#SaveToNext').click(function () {
        //生成提交数据
        var subData = {
            CategoryId: $('#ThirdCategoryId').val(),
            BrandId: $('#BrandId').val(),
            Title: $('#ProductName').val(),
            Distributors: getDistributors(),
            Catalogs: [],
            IsAutoInventory: $('input[name=StockType]:checked').val() == "0"
        };
        if ($('input[name=openProCheck]:checked').length == 0) {
            alert('请选择规格设置');
            return false;
        } else {
            //选择不设规格
            if ($('input[name=openProCheck]:checked').val() == "0") {
                var stock = $('#NoPropertyStock').val();
                if ((stock == "" || isNaN(stock)) && $('input[name=StockType]:checked').val() == "0") {
                    alert("请填写总库存");
                    return false;
                }
                var catalogItem = {
                    TotalStock: $('#NoPropertyStock').val(),
                    Properties: [],
                    SKUs: getSkuGroup($('#NoPropertySku').val()),
                    CatalogIds: []
                };
                subData.Catalogs.push(catalogItem);
            }
            else {
                subData.Catalogs = getCatalogs();
            }
        }
        //数据验证
        if (subData.Distributors.length == 0) {
            alert('请选择渠道');
            return false;
        }
        if ($('input[name=StockType]:checked').length == 0) {
            alert('请选择库存管理方式');
            return false;
        }
        if (subData.Title == "") {
            alert('请填写商品名称');
            return false;
        }
        if (subData.Title.length > 60) {
            alert('商品名称过长');
            return false;
        }
        if (subData.Catalogs.length == 0) {
            alert('请添加报价');
            return false;

        }
        else if ($('input[name=StockType]:checked').val() == "0") {
            var temp = true;
            $('input[name=TotalStock]').each(function () {
                if ($(this).val() == "" || isNaN($(this).val())) {
                    alert('智能库存需要设置正确的总库存');
                    temp = false;
                    return false;
                }
            });
            if (temp == false) {
                return false;
            }
        }


        var postUrl = '/DMSProductAdd/SaveStep2';
        $.ajax({
            url: postUrl,
            type: "POST",
            dataType: "json",
            data: $.toJSON(subData),
            contentType: 'application/json',
            success: function (data) {
                if (data.result) {
                    self.location = '/DMSProductAdd/AddStep3?productsGroupId=' + data.GroupId;
                }
                else {
                    alert(data.err);
                }
            }
        });
    });


    ///////////////设置多个商品编号浮层
    var currentCatalogKey;

    //隐藏浮层里的错误提示
    function hideErr() {
        $('.warnbox').hide();
        $('.SkuText').hide();
        $('.SkuCount').hide();
    }
    function resetSkuAlert() {
        //清空多余的商品编号
        $('div.skuItem input').val("");
        $('div.addSkuItem').remove();

        hideErr();
    }
    //重置浮层里的sku编号
    function resetOrderIds() {
        $('#alert_box').find('.num').each(function (m, n) {
            $(n).html(m + 1);
        });
    }


    var layer;
    Ymt.load('widget.LayerBox', function () {
        layer = Ymt.widget.LayerBox('struc');
    }, !0);
    //添加新的规格组合显示浮层
    $('#NoProperty-AddSkuGroup').live('click', function () {
        currentCatalogKey = null;
        resetSkuAlert();
        !!layer && layer.alert('#alert_box');
        return false;
    });
    $('#set-price .group').live('click', function () {
        currentCatalogKey = $(this);
        //打开设置多个编号的浮层时，隐藏“内容不能为空”的提示
        resetSkuAlert();
        !!layer && layer.alert('#alert_box');
        return false;
    });
    //编辑规格组合显示浮层
    function fillSkuGroup(skuGroupText) {
        var skuItems = skuGroupText.split('-');
        var skuItemInAlertCount = $('#alert_box div.skuItem').length;
        for (var j = 0; j < skuItems.length - skuItemInAlertCount; j++) {
            $('.addNumber').click();
        }
        $('#alert_box div.skuItem').each(function (index, m) {
            var skuItem = skuItems[index];
            var skuText = skuItem.split(':')[0];
            var skuCount = skuItem.split(':')[1];
            $(m).find('input.number').val(skuText);
            $(m).find('input.count').val(skuCount);
        });
        !!layer && layer.alert('#alert_box');
    }
    $('#NoProperty-EditSkuGroup').live('click', function () {
        currentCatalogKey = null;
        resetSkuAlert();
        var skuGroup = $('#NoPropertySku').val();
        fillSkuGroup(skuGroup);
    });
    $('#set-price .edit').live('click', function () {
        currentCatalogKey = $(this);
        resetSkuAlert();
        var skuGroup = $(this).closest('tr').find('input.oneCatalogSku').val();
        fillSkuGroup(skuGroup);
    });
    //删除规格组合
    $('#NoProperty-DelSkuGroup').live('click', function () {
        $('#NoPropertySku').attr('disabled', false);
        $('#NoPropertySku').val('');
        $('#NoProperty-SkuGroup').html('<a class="blue" href="javascript:void(0)" id="NoProperty-AddSkuGroup">设置多个商品编号</a>');
    });
    $('#set-price .delete').live('click', function () {
        currentCatalogKey = $(this);
        var skuTextBox = currentCatalogKey.closest('tr').find('input.oneCatalogSku');
        skuTextBox.attr('disabled', false);
        skuTextBox.val('');
        currentCatalogKey.parent().html('<a href="javascript:void(0)" class="blue group">设置多个商品编号</a>');
    });
    //添加商品编号
    $('.addNumber').click(function () {
        var lastSku = $('#alert_box div.skuItem:last');
        var skuCount = $('#alert_box div.skuItem').length;
        if (skuCount >= 6) {
            alert('最多可以添加6件商品');
            return false;
        }
        var str = '<div class="node skuItem addSkuItem"><span class="l width75">第<em class="num">' + (skuCount + 1) + '</em>件商品：</span><input type="text" class="r inp number" style="margin-right:26px"><input type="text" class="r inp width75 count"><a href="javascript:void(0)" class="delOneSkuItem">删除</a></div>';
        lastSku.after(str);
    });
    //删除商品编号
    $('.delOneSkuItem').live('click', function () {
        $(this).parent().remove();
        hideErr();
        resetOrderIds();
    });
    //不做处理关闭商品组合窗口
    $('.btn-0-0,.shut').click(function () {
        !!layer && layer.close();
    });
    //保存添加的规格组合
    $('.btn-0').click(function () {
        var skuGroup = "";
        var textErr = false;
        var countErr = false;
        $('div.skuItem').each(function () {
            //数据检验并生成结果
            var skuText = $(this).find('.number').val();
            var skuCount = $(this).find('.count').val();
            if (skuText == "") {
                textErr = true;
            }
            if (skuCount == "" || isNaN(skuCount) || skuCount == 0) {
                countErr = true;
            }
            if (skuGroup == "") {
                skuGroup = skuText + ":" + skuCount;
            }
            else {
                skuGroup = skuGroup + "-" + skuText + ":" + skuCount;
            }
        });
        //数据验证结果
        var err = false;
        if (textErr) {
            $('#alert_box').find('.warnbox').show();
            $('#alert_box').find('.SkuText').show();
            err = true;
        }
        if (countErr) {
            $('#alert_box').find('.warnbox').show();
            $('#alert_box').find('.SkuCount').show();
            err = true;
        }
        if (err) {
            return false;
        }
        //设置没有规格的多个商品编号
        if (currentCatalogKey == null) {
            $('#NoPropertySku').val(skuGroup);
            $('#NoPropertySku').attr("disabled", true);
            $('#NoProperty-SkuGroup').html('<a class="blue l" id="NoProperty-EditSkuGroup" href="javascript:void(0)">编辑</a><a class="blue r" id="NoProperty-DelSkuGroup" href="javascript:void(0)">删除组合</a>');
        }
        else {
            var currentTr = currentCatalogKey.closest('tr');
            var skuTextBox = currentTr.find('input.oneCatalogSku');
            skuTextBox.val(skuGroup);
            var obj = {};
            obj['SKUText'] = skuGroup;
            var record = catalog.findByAttribute('CatalogId', currentTr.attr('catalogid'));
            record != null && catalog.update(record.id, obj);

            skuTextBox.attr("disabled", true);
            currentCatalogKey.parent().html('<a class="blue l edit" href="javascript:void(0)">编辑</a><a class="blue r delete" href="javascript:void(0)">删除组合</a>');
        }
        !!layer && layer.close();
    });
});


