/*=======================release.js===========================*/
var model = window.Spine.Model,controll = window.Spine.Controller;
var catalog = model.setup('catalog', ['checked', 'CatalogId', 'Price', 'StockNum', 'Properties', 'SKUs', 'display']),
    sku = model.setup('sku', ['Sku', 'Amount']);
    releaselabel = "RELEASELABELCOUNTID",
    com = {
        container: $('#release'),
        prop0:null,
        prop1:null,
        drawtable: $('#setProductPrice'),
        catalogid: 0,
        log:'RELEASECATALOGID',
        catalogs:[],
        cancelall:!1,
        index:0,
        current:null
    },
    _slice=Array.prototype.slice;
    com.container.find('input.l').each(function (m, n) {
        var o = $(this)
        if (o.next().is('label')) {
            m = releaselabel + m;
            o.attr('id', m);
            (o.attr('propid')==''||o.attr('propid')==null)&&o.attr('propid', m);
            o.next().attr('for', m)
        }
    });
com.container.bind('catalogchange', catalogchange);
com.container.bind('catalogkindchange', catalogkindchange);
com.container.delegate('input.l:checkbox:not([name="catalogkind"])', 'click', togglecatalog);
com.container.delegate('input[name="catalogkind"]', 'click', togglecatalogkind);
com.container.delegate('CatalogPicFile', 'change', selectimgs);
com.container.delegate('.addtext', 'change', addcatalog);
com.drawtable.delegate('input', 'change', datachange);
com.drawtable.delegate('input:checkbox.checkUseCatalog', 'change', checkedchange);
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
    var o = $(this), value = o.val(),html,c=com,str;
    if (value != '') {
        str = "ADDRELEASELABELCOUNTID";
        str += c.catalogid++;
        html = '<li class="node"><input type="checkbox" class="l" value="'+value+'" name="" propid="' + str + '" id="' + str + '"><label class="r" for="' + str + '">'+value+'</label></li>';
        o.closest('li.control').before(html);
    }
}
function datachange(){
    var o = $(this),model=catalog, id = o.closest('tr').attr('catalogid'),record,value=o.val(),name=o.attr('name'),obj={};
    record=model.findByAttribute('CatalogId', id);
    if(o.is('input.inp')){
        obj[name]=value;
        record!=null&&model.update(record.id,obj);
    }
    if(o.is(':checkbox')){
        record!=null&&model.update(record.id,{checked:o.attr('checked')})
    }
}
function selectimgs() {
    var o = $(this), id = o.closest(tr).attr('id'), value = o.val(), parent = o.closest('.sec-item'), index = c.container.find('.sec-item').index(parent), prop = c['prop' + index] || {}, record;
    record = prop.findByAttribute('PropertyValueId', id);
    prop.update(record.id, { PropertyValuePic: value});
}
function togglecatalogkind(e) {
    var c=com,o = $(this), parent = o.closest('.sec-item'), bd = parent.find('.bd'), index = c.container.find('input[name="catalogkind"]').index(o), prop, checked = o.attr('checked');
    c.index=index;
    displaytoggle(checked, bd);
    prop = c['prop' + index] = c['prop' + index] || model.setup('prop', ['PropertyId', 'PropertyName', 'PropertyValueId', 'PropertyValue', 'PropertyValuePic','Cancel']);
    c.container.trigger('catalogkindchange', [prop, checked, bd, parent]);
    e.stopPropagation();
}
function togglecatalog(e) {
    var c=com,o = $(this),id = o.attr('propid'),text=o.next().html(), parent = o.closest('.sec-item'), table = parent.find('table.table'), tbody = table.find('tbody'), index = c.container.find('.sec-item').index(parent), prop = c['prop' + index] || {}, value = o.val(), checked = o.attr('checked');
    if (checked) {
        table.show();
        table.find('tr.defalut').clone().appendTo(tbody).attr('catalogimgid', id).removeClass('defalut');
        tbody.find('[catalogimgid="'+id+'"]').children('td.color').html(text);
    } else {
        tbody.find('[catalogimgid="' + id + '"]').remove();
    }
    //c.cancelall = parent.find('.bd input:checkbox:checked').size() == 0 ? !0 : !1;
    c.current = {id:id,cancel:!checked};
    c.index=index;
    var object = {
        PropertyId: parent.find('hd input:[name="catalogkind"]').attr('PropertyId'),
        PropertyValueId: id,
        PropertyValue: value,
        Cancel:!checked
    };
    c.container.trigger('catalogchange', [prop, checked, object]);
    e.stopPropagation();
}
function displaytoggle(bool,ele) {
    if (bool) {
        ele.show();
    } else {
        ele.hide();
    }
}
function catalogchange(e, prop, add,obj) {
    var record = prop.findByAttribute('PropertyValueId', obj.PropertyValueId);
    if (record == null) {
        record=prop.create(obj);
    } else {
        prop.update(record.id,{Cancel:!add});
    }
    createsinglecatalog(record);
    createcatalog();
}
function catalogkindchange(e, prop, add, bd, parent) {
    if (!add) {
        displaytoggle(add, bd);
        displaytoggle(add, parent.find('table.table'));
        bd.find('input.l:checked').each(function(){
            var c=com, o=$(this),object = {
                PropertyValueId: o.attr('propid'),
                PropertyValue: o.val(),
                Cancel:!1
            };
            parent.find('table.table [catalogimgid="' + object.PropertyValueId + '"]').remove();
            $(this).attr('checked', false);
            c.container.trigger('catalogchange',[prop,false,object]);
        });
    }
}
function createcatalog(index) {
    var c = com, prop0 = c.prop0 && c.prop0.toJSON()||[], prop1 = c.prop1 && c.prop1.toJSON()||[], i = 0, j = 0, leni, lenj, log, model = catalog;
    if (!(prop0.length!=0 || prop1.length!=0)) {
        return
    } else {
        leni = prop0.length==0 ? 1 : prop0.length;
        lenj = prop1.length == 0 ? 1 : prop1.length;
        if (prop0.length == 0 && prop1.length == 0) {
            c.drawtable.hide();
            return
        }
    }
    for (i=0; i < leni; i++) {
        for (j=0; j < lenj; j++) {
            (function (a, b, c, d, e) {
                var log = { checked: !0, CatalogId: '', Price: '', StockNum: '', Properties: [], SKUs: [], display: !0 }, m, n, p, record2;
                m = a[c], n = b[d];
                if (m && n) {
                    p = createcatalogid(m.PropertyValueId, n.PropertyValueId), log.Properties[0] = m, log.Properties[1] = n;
                    log.CatalogId = p, record2 = model.findByAttribute('CatalogId', p);
                    record2 == null && model.create(log)|| ((m.Cancel || n.Cancel) && model.update(record2.id, { display: !1 }) || model.update(record2.id, { display: !0 }))
                }
            })(prop0, prop1, i, j, c);
        }
    }
    c.catalogs = model.select(filtecatalog);
    drawtable();
}
function createsinglecatalog (m){
    var c=com,log = { checked: !0, CatalogId: '', Price: '', StockNum: '', Properties: [], SKUs: '', display: !0 }, p, record1,model=catalog;
    if (c.index) {
        p = createcatalogid('', m.PropertyValueId), log.Properties.push('', m);
    } else {
        p = createcatalogid(m.PropertyValueId, ''), log.Properties.push(m, '');
    }
    log.CatalogId = p,log.display=!m.Cancel, record1 = model.findByAttribute('CatalogId', p);
    record1 == null && model.create(log)||model.update(record1.id, { display: !m.Cancel });
}
function createcatalogid(a,b) {
    return "0" + encodeURIComponent(a) + "::1" + encodeURIComponent(b);
}
function filtecatalog(record) {
    if (!record.display)
        return false;
    var model = catalog, arr = record.CatalogId.split('::'), all = !0;
    if (arr[0] != '0' && arr[1] != '1') {
        return true;
    }else{
        if(arr[0]=='0'){
            return compare(arr[1], 1);
        }else if(arr[1]=='1'){
            return compare(arr[0], 0);
        }
    }
    function compare(a, b) {
        var d=b?0:1,old=record;
        var arr = model.select(function (cord) {
            if (cord != old) {
                var id = cord.CatalogId.split('::');
                return id[b] == a&&cord.display;
            }
        });
        return !arr.length;
    }
}

var IntelligenceStockType = true;
function drawtable() {
    var c = com, model = c.catalogs, len = model.length, i = 0, str = [], perty0, perty1,editstr="",hasStock=c.container.find("input:radio:[name='StockType']:checked").hasClass('.IntelligenceStockType')?"disabled":"";
    console.log(hasStock)
    for (i; i < len; i++) {
        perty0 = (model[i].Properties[0] != '' && model[i].Properties[0]!=undefined) ? model[i].Properties[0].PropertyValue : '';
        perty1 = (model[i].Properties[1] != '' && model[i].Properties[1] != undefined) ? model[i].Properties[1].PropertyValue : '';
        if (model[i].SKUs.Count && model[i].SKUs.Count == 1) {
            editstr = '<a class="blue l edit" href="javascript:void(0)">编辑</a><span class="blue l">&nbsp;&nbsp;&nbsp;&nbsp;</span><a class="blue r delete" href="javascript:void(0)">删除组合</a>'
        } else {
            editstr='<a href="javascript:void(0)" class="blue group">设置多个商品编号</a>'
        }
        str.push('<tr catalogid="' + model[i].CatalogId + '"><td><input type="checkbox" checked="' + model[i].checked + '" class="checkUseCatalog"></td><td clsss="one">' + perty0 + '</td><td clsss="two">' + perty1 + '</td><td><input type="text" value="' + model[i].StockNum + '" class="inp inp100" '+model[i].SKUs.length>0&&hasStock+' name="StockNum"></td><td class="TotalStock"><input type="text" value="' + model[i].SKUs + '" class="inp inp50" name="SKUs"></td><td>+'editstr'+</td></tr>')
    }
    c.drawtable.find('tbody').html(str.join(""));
    !!len && c.drawtable.show() || c.drawtable.hide();

    if (IntelligenceStockType) {
        $(".TotalStock").show();
    }
    else {
        $(".TotalStock").hide();
    }
}
$(window).bind('unload', function () {
    model = catalog = sku = com = null;
})
$(function () {
    $(".check-distribut").click(function () {
        var onlyOneDistribut = $(".check-distribut:checked").length == 1;
        if (onlyOneDistribut) {
            $(".ManualStockType").click();
            $(".IntelligenceStockType").attr("disabled", true);
            IntelligenceStockType = false;
        }
        else {
            $(".IntelligenceStockType").attr("disabled", false);
            $(".IntelligenceStockType").click();
            IntelligenceStockType = true;
        }
    });
    $("input[name=StockType]").click(function () {
        if ($(this).val() == "0") {
            IntelligenceStockType = true;
        }
        else {
            IntelligenceStockType = false;
        }
        drawtable();
    });
});
/** the third of release product**/
var channelMatou, channelJD;
channelMatou = model.setup('channelMatou', ['ProductId', 'ProductName', 'ProductDescript', 'PictureUrls', 'ValidStart', 'ValidEnd', 'Flight', 'Catalogs', 'DesProperties', 'CatalogStatus', 'CatalogType', 'AcceptReturn', 'DeliveryTemplateId', 'Weight']);
channelJD = model.setup('channelJD', ['ProductId', 'ProductName', 'ProductDescript', 'PictureUrls', 'ValidStart', 'ValidEnd', 'Flight', 'Catalogs', 'DesProperties', 'ShopCategoryIds', 'Length', 'Widht', 'Height', 'Weight', 'JingdongPrice', 'CostPrice', 'MarketPrice']);
channelMatou.create({
    ProductId: '',
    ProductName: '',
    ProductDescript: '',
    PictureUrls: '',
    ValidStart: '',
    ValidEnd: '',
    Flight: '',
    Catalogs: '',
    DesProperties: '',
    CatalogStatus: '',
    CatalogType: '',
    AcceptReturn: '',
    DeliveryTemplateId: '',
    Weight: ''
});
channelJD.create({
    ProductId: '',
    ProductName: '',
    ProductDescript: '',
    PictureUrls: '',
    ValidStart: '',
    ValidEnd: '',
    Flight: '',
    Catalogs: '',
    DesProperties: '',
    ShopCategoryIds: '',
    Length: '',
    Widht: '',
    Height: '',
    Weight: '',
    JingdongPrice:'',
    CostPrice:'',
    MarketPrice:''
});
