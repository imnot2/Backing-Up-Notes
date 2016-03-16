/*=======================editn.js===========================*/
var productPropertyCount = 1;

function checkSubData(subData) {
    var errorMsg = "";
    if (subData.ProductName == "") {
        errorMsg += "请填写商品名称|";
    }

    if (subData.PictureUrl1 == "") {
        errorMsg += "请上传第一张商品图片做为商品主图|";
    }

    for (var i = 0; i < subData.Catalogs.length; i++) {
        if (isNaN(subData.Catalogs[i].Price)) {
            errorMsg += "请输入正确的价格|";
        }
        if (isNaN(subData.Catalogs[i].Num)) {
            errorMsg += "请输入正确的库存|";
        }
    }

    if (subData.Catalogs.length == 0) {
        errorMsg += "请选择是否设置商品规格，并添加报价。|";
    }

    if (!subData.CatalogType) {
        errorMsg += "请选择备货状态|";
    }

    if (!subData.CatalogStatus) {
        errorMsg += "请选择配送方式|";
    }

    if (!subData.productFreight) {
        errorMsg += "请设置运费|";
    }

    if (subData.productFreight == 1 && !subData.FreightForBuyerType) {
        errorMsg += "请设置运费模式|";
    }

    if (subData.FreightForBuyerType == 0 && (subData.Flight == '' || isNaN(subData.Flight))) {
        errorMsg += "请输入正确的运费|";
    }

    if (subData.LimitNum == '' || isNaN(subData.LimitNum)) {
        errorMsg += "请输入正确的限购数量|";
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

$(function () {
    //名称
    $('#ProductName').bind({
        keyup: function () {
            var str = $(this).val(), len = str.length;
            if (len > 30) {
                $(this).val(str.slice(0, 30))
            } else {
                $(this).next('.attetion').find('.num').html(30 - len)
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
        var filename = j$("#formUploadPic" + index + " input").val();
        if (filename == "") {
            alert("请选择文件。");
            return false;
        }
        var options = {
            type: "POST",
            dataType: "text",
            success: function (msg) {
                if (msg == "error") {
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                } else {
                    $('#uploadedPic' + index).html('<img src="' + msg + '"/>');
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

    //2.设置规格和报价

    function observer() {
        this.list = [];
        this.type = '';
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
    var obs_3 = new observer;

    function changeprice(a, b, c, d, e, f) {
        if (b == 'delete') {
            reDrawTable(c, d);
            return;
        }
        var obj = { name: a.val(), pid: a.attr('data'), id: b };

        function fn(m, n) {
            m = m && m.id;
            return m === obj.id;
        }

        var bool = c.list.some(fn);
        c.type = f || "";
        if (e) {
            bool && c.list.push(obj);
        } else {
            c.list.filter(function (m, n) {
                return obj.id == m.id;
            })
        }
        console.log(c)
        reDrawTable(c, d);
    }

    //选择规格的值
    function selectDetail(e) {
        var o = $(e.target), box = o.closest('.sec-item'), id = $('#pd-specify').find('.sec-item').index(box), tr, count = box.find('input:checkbox:checked').size(), num, str = 'addcolorpic_', index = box.find('input:checkbox').index(o);
        var propertyId = box.find('.PropertyId').val();
        o.val(o.next('label').html());
        o.attr("data", propertyId);
        var L1 = obs_3.list[0], L2 = obs_3.list[1];
        if (!L2) {
            if (L1 && L1.id != id) {
                L1 = new observer;
            }
            L2 = new observer;
        } else {
            if (L1.id != id) {
                L1 = obs_3.list[1];
                L2 = obs_3.list[0];
            }
        }
        var propertyTypeValue = box.find('.PropertyTypeValue').val();
        var propertyName = box.find('.PropertyName').val();
        switch (propertyTypeValue) {
            case "1":
                if (count > 0) {
                    box.find('.table').show();
                    if (!!o.attr('checked')) {
                        count++;
                        num = str + count;
                        o.attr('colorid', num);
                        tr = box.find('.table tbody').find('tr:first').clone().attr('id', num);
                        tr.find('.color').html(o.val());
                        tr.appendTo(box.find('.table tbody')).removeClass();
                        changeprice(o, index, L1, L2, true, propertyName);
                    } else {
                        if (o.attr('colorid')) {
                            num = str + o.attr('colorid').split('_')[1];
                            $('#' + num).remove();
                            $('#seleteimgcolor').show();
                        } else {
                            $('#seleteimgcolor').hide();
                        }
                        changeprice(o, index, L1, L2, false, propertyName);
                        count--;
                    }
                }
                else {
                    box.find('.table').hide();
                    box.find('.table tbody').find("tr:not('.defalut')").remove();
                }
                break;
            case "0":
                if (!!o.attr('checked')) {
                    changeprice(o, index, L1, L2, true, propertyName);
                } else {
                    changeprice(o, index, L1, L2, false, propertyName);
                }
                break;
            default:
                if (!!o.attr('checked')) {
                    changeprice(o, index, L1, L2, true, propertyName);
                } else {
                    changeprice(o, index, L1, L2, false, propertyName);
                }
        }
        e.stopPropagation();
    }

    function reDrawTable(a, b) {
        var str = "", m = '', mpid = '', n = '', npid = '', len = a.list.length, len1 = b.list.length, i, j;
        if (len && len1) {
            for (i = 0; i < len; i++) {
                m = a.list[i].name || '';
                mpid = a.list[i].pid || '';
                for (j = 0; j < len1; j++) {
                    n = b.list[j].name || '';
                    npid = b.list[j].pid || '';
                    str += "<tr><td><input type='checkbox' name='checked' class='checkUseCatalog' checked='checked' ></td><td clsss='one'><span>" + m + "</span><input type='hidden' class='PropertyId' value='" + mpid + "' /><input type='hidden' class='CatalogImg' /></td><td clsss='two'><span>" + n + "</span><input type='hidden' class='PropertyId' value='" + npid + "' /><input type='hidden' class='CatalogImg' /></td><td><input type='text' name='price' class='inp inp60' value='0'></td><td><input type='text' name='count' class='inp inp50' value='0'></td><td><input type='text' name='number' class='inp inp100 oneCatalogSku'></td></tr>";
                }
            }
        } else {
            if (len || len1) {
                if (len) {
                    for (j = 0; j < len; j++) {
                        m = a.list[j].name || '';
                        mpid = a.list[j].pid || '';
                        str += "<tr><td><input type='checkbox' name='checked' class='checkUseCatalog' checked='checked' ></td><td clsss='one'><span>" + m + "</span><input type='hidden' class='PropertyId' value='" + mpid + "' /><input type='hidden' class='CatalogImg' /></td><td clsss='two'></td><td><input type='text' name='price' class='inp inp60' value='0'></td><td><input type='text' name='count' class='inp inp50' value='0'></td><td><input type='text' name='number' class='inp inp100 oneCatalogSku'></td></tr>";
                    }
                }
                if (len1) {
                    for (j = 0; j < len1; j++) {
                        m = b.list[j].name || '';
                        mpid = b.list[j].pid || '';
                        str += "<tr><td><input type='checkbox' name='checked' class='checkUseCatalog' checked='checked' ></td><td clsss='one'></td><td clsss='two'><span>" + m + "</span><input type='hidden' class='PropertyId' value='" + mpid + "' /><input type='hidden' class='CatalogImg' /></td><td><input type='text' name='price' class='inp inp60' value='0'></td><td><input type='text' name='count' class='inp inp50' value='0'></td><td><input type='text' name='number' class='inp inp100 oneCatalogSku'></td></tr>";
                    }
                }
            }
        }
        $('#setProductPrice').find('th.one').html('规格：' + a.type);
        $('#setProductPrice').find('th.two').html('规格：' + b.type);
        $('#setProductPrice').show();
        $('#set-price tbody').html(str);
        if (!(a.list.length || b.list.length)) {
            $('#setProductPrice').hide();
        }
    }

    //启用规格后执行
    function detection(o, b, e) {
        var obs, id = $('#pd-specify').find('.sec-item').index(b.closest('.sec-item')), son, son1;

        function fn(m, n) {
            return m.id === id;
        }

        if (e && obs_3.list.length < 2) {
            obs = new observer;
            obs.id = id;
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
                        son1 = obs_3.list[0] || new observer;
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
        var o = $(e.target), bd = o.closest('.sec-item').find('.bd'), bool;
        if (o.attr('checked')) {
            bool = detection(o.closest('.sec-item .bd input:checkbox'), o, true);
            bool && bd.show();
        } else {
            detection(o.closest('.sec-item').find('.bd input:checkbox'), o, false);
            bd.hide();
        }
        e.stopPropagation();
    }

    function selectModify(e) {
        var o = $(e.target), li = $(this).closest('li'), v = o.html();
        if (!e.data.add) {
            li.find('label').hide();
            if (li.find('.btn').size() == 0) {
                $("<input class='l inp inp40' type='text'><span class='l btn'>修改</span>").insertAfter(o);
            } else {
                li.find('.btn').show();
                li.find('input.inp').empty().show();
            }
        }
        $('#pd-specify .sec-item').find('.btn').live('click', function (e) {
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

    $('#pd-specify .sec-sec input:radio').bind('click', function () {
        var bool = $(this).hasClass('nousing'), che = $('#pd-specify .hd input:checkbox');
        var seletor = "#selectcolor .bd,#selectsize .bd,#pd-specify .selectnew .bd", seletor2 = ".sec-item .hd label"
        if (bool) {
            che.attr('disabled', true);
            $(seletor).hide();
            $(seletor2).css('color', '#999');
            $('#pd-specify .sec-item').find('.hd input:checkbox').attr('checked', false);
            $('#setProductPrice tbody').empty();
            obs_3 && (obs_3.list = []);
            $('#setProductPrice').hide();
            $('.noCatalogInput').attr('disabled', false);
        } else {
            che.attr('disabled', false);
            $(seletor2).css('color', '#666');
            $('.noCatalogInput').attr('disabled', true);
        }
    })

    //启用规格的checkbox
    $('#pd-specify .sec-item').find('.hd input:checkbox').bind('click', showmod)
    //选择规格的值的checkbox
    $('#pd-specify .sec-item').find('.box input:checkbox').live('click', selectDetail);
    $('#pd-specify .sec-item').find('.box label').live('dblclick', { add: false }, selectModify);
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
            str = str.replace(/\{[a-zA-Z]+\}/g, text);
            $(str).insertBefore($(this).closest('.control'))
        } else {
            alert('规格属性不能为空')
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

    $('.tooltips label,.tooltips input:radio').bind('mouseenter', { parent: '.node', find: '.tooltip-1', enter: true }, findtooltip);
    $('.tooltips label,.tooltips input:radio').bind('mouseleave', { parent: '.node', find: '.tooltip-1', enter: false }, findtooltip);

    $("#selectfreight input[name='productFreight']").bind('click', function () {
        if ($(this).val() == "0") {
            $('input[name=FreightForBuyerType]').attr('checked', false);
            $('input[name=FreightForBuyerType]').attr('disabled', true);
            $('input[name=ProductFlight]').attr('disabled', true);
        } else {
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
        //                    top: o.offset().top+191,
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

    KISSY.ready(function (S) {
        var KE = KISSY.Editor;
        var k = KE("#Description",
            {
                baseZIndex: 10000,
                pluginConfig: {
                    "image": {
                        upload: {
                            serverUrl: "/SellerProduct/UploadProductDesPic",
                            serverParams: {
                            },
                            fileInput: "Filedata",
                            sizeLimit: 1000,
                            formatRespone: function (data) {
                                //alert(data);



                            }
                        }
                    }
                }
            }).use("enterkey,clipboard,elementpaths,preview,templates" +
            ",separator,undo" +
            ",separator,removeformat,font,format,forecolor,bgcolor" +
            ",separator,list,indent,justify" +
            ",separator,link,image,smiley" +
            ",separator,table,resize,draft,pagebreak,separator,maximize"
        );
        k.on("dataReady", function () {
            //提交数据
            $('#submit').bind('click', spellObject);

            function spellObject(e) {
                $("#Description").val(k.getData());

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

                function Catalogs() {
                    var box = $('#set-price tbody'), tr = box.find('tr'), len = tr.size(), i, catalogs = [];
                    for (i = 0; i < len; i++) {
                        var currentTr = tr.eq(i);
                        var firstAttribute = currentTr.children(':first').next().find('span').html();
                        var firstAttributePropertyId = currentTr.children(':first').next().find('input.PropertyId').val();
                        var firstAttributeImg = currentTr.children(':first').next().find('input.CatalogImg').val();
                        var secondAttribute = currentTr.children(':first').next().next().find('span').html();
                        var secondAttributePropertyId = currentTr.children(':first').next().next().find('input.PropertyId').val();
                        var secondAttributeImg = currentTr.children(':first').next().next().find('input.CatalogImg').val();
                        if (currentTr.find('input.checkUseCatalog').attr("checked")) {
                            var obj = {
                                CatalogId: i,
                                Price: currentTr.find("[name='price']").val(),
                                Num: currentTr.find("[name='count']").val(),
                                SKU: currentTr.find("[name='number']").val(),
                                Deleted: false
                            }
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
                    if (catalogs.length == 0) {
                        if ($('input[name=openProCheck]:checked').val() == 0) {
                            var o = {
                                CatalogId: 1,
                                Price: $('#productPrice').val(),
                                Num: $('#productNum').val(),
                                SKU: $('#productSKU').val(),
                                Deleted: false
                            }
                            catalogs.push(o);
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
                    PictureUrl5 = $('#ProductPictureUrl5').val(),
                    LimitNum = $("#limitNumber input[name='LimitNum']").val(),
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
                    DeliveryTemplateId: '',
                    dExpireTime: '',
                    LimitNum: LimitNum,
                    Available: false,
                    ProductProperty: ProductProperty,
                    sProductId: $('#ProductId').val(),
                    AvailableNow: false,
                    ValidStart: $('#ValidStartDate').val() + " " + $('#ValidStartHour').val() + ":" + $('#ValidStartMin').val() + ":00",
                    ValidEnd: $('#ValidEndDate').val() + " " + $('#ValidEndHour').val() + ":" + $('#ValidEndMin').val() + ":00",
                    OnSaleType: $('input[name=OnSaleType]:checked').val(),
                    AutoRefresh: $('input[name=AutoRefresh]:checked').length > 0,
                    CatalogType: $('input[name=CatalogType]:checked').val(),
                    CatalogSKUstring: $('#AutoCatalogSkus').val(),
                    FreightForBuyerType: $('input[name=FreightForBuyerType]:checked').val(),
                    productFreight: $("input[name='productFreight']:checked").val(),
                    Catalogs: Catalogs()
                };
                var ErrorMsg = checkSubData(subData);
                if (ErrorMsg == "") {
                    $('#ErrorMsgDiv').hide();
                    $.ajax({
                        url: "/SellerProduct/Edit",
                        type: "POST",
                        dataType: "json",
                        data: $.toJSON(subData),
                        contentType: 'application/json',
                        success: function (data) {
                            if (data.success == "1") {
                                alert("修改成功");
                                window.location.reload();
                            } else {
                                alert(data.message);
                            }
                        }
                    });
                } else {
                    var errors = ErrorMsg.split("|");
                    var index = 1;
                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i] != "") {
                            $('#ErrorMsgs').append("<p class='dec'>" + index + "." + errors[i] + "</p>");
                        }
                        index++;
                    }
                    $('#ErrorMsgDiv').show();
                    window.location.hash = 'ErrorMsgDiv';
                }
            }
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
                amendUrl = "/DeliveryTemplate/AddChinaDeliveryTemplate";
            } else {
                n = "国际";
                amendUrl = "/DeliveryTemplate/AddUsDeliveryTemplate";
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
            }

            //            $('#SetTemplate').show();
            //            $('#SetFreight').hide();
            $('#OneFlight').attr("disabled", "disabled");
        }
    });

    $('input.CatalogPicFile').live('change', function () {
        var filename = $(this).val();
        if (filename == "") {
            alert("请选择图片文件。");
            return false;
        }
        var options = {
            type: "POST",
            dataType: "text",
            success: function (msg) {
                if (msg == "error") {
                    alert("图片上传失败，请核实文件类型和文件大小（最大3M）后重新上传。");
                } else {
                    alert("上传成功");
                    $(this).next().attr('src', msg);
                    $(this).next().show();
                }
            },
            error: function () {
                alert("图片上传异常，请重新选择较小的图片上传。");
            }
        };
        j$(this).closest('.CatalogPicForm').ajaxSubmit(options);
        return false;
    });

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
                    $(this).val(autoSkus[i]);
                    i++;
                });
                $('#AutoCatalogSkus').val($('#AutoCatalogSkus').val() + data);
            }
        });
    });

    $('#AutoOneSku').click(function () {
        $.ajax({
            url: "/SellerProduct/GetNewCatalogSkus?n=1",
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
        $('#FreightTemplateName').html('运费模板');
    });

    if ($('#templateId').val() != "") {
        $('.ProductFreightForBuyer').click();
        $('.UseFreightTemplate').click();
    }
    else if ($('#flight').val() > 0) {
        $('.ProductFreightForBuyer').click();
        $('.UseFreightSelf').click();
    }
    else {
        $('.ProductFreightForSeller').click();
    }
});

