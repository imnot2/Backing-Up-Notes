function SpecificationModel(config) {
    this.isset = !1;
    this.categorykinds = [];
    //this.categorykinds=[new categorykinds(name)];
    this.categories = [];
    this.categorykindnames = [];
    this.categoryAttribute = ['kinds', 'price', 'count', 'number', 'imgsrc', 'ischecked', 'canupload'];
    this._uid = 0;

    this.config = $m.merge({
        categoryimport: '.categoryimport',
        addspecification: '#AddSpecification',
        delspecification: '[delspecification]',
        delcategory: '[delcategory]',
        addspecificationfield: '#AddSpecificationField',
        addcategory: '[addcategory]',
        container: '#SpecificationContainer',
        template: '#SpecificationTemplate',
        setspecification: '#setspecification',
        categorychecked: '[name="categorychecked"]',
        allcategorychecked: '[name="allcategorychecked"]',
        max: 2,
        data: null
    }, config);

    if (this.config.categorykindnames) {
        this.categorykindnames = this.config.categorykindnames;
    }

    if (this.config.isset) {
        this.isset = !0;
    }

    this.template = $(this.config.template);

    this.init();


    this.controller();
}

function categorykinds(name) {
    this.name = name;
    this.values = [];
}
categorykinds.prototype = {
    add: function (val) {
        var that = this;
        if ($m.isArray(val)) {
            $m.each(val, function (a, b) {
                that.add(a);
            })
        }
        if ($m.indexOf(val, this.values) < 0) {
            this.values.push(val);
        }
    },
    del: function (val) {
        for (var i = 0; i < this.values.length; i++) {
            if (val == this.values[i]) {
                this.values.splice(i, 1);
                i--;
            }
        }
    }
}

SpecificationModel.prototype = {
    controller: function () {
        var c = this.config, that = this;
        //添加规格种类
        var _isadd=!1;
        $(c.addspecification).live('click', function () {
            var $this = $(this),
                $parent = $this.closest('.ly-dy-ib'),
                _width = $parent.find('.spec-block').width() + 18,
                oVal = $parent.find('.spec-block small').text();
                
            var _errorNode = '<div class="error-div" style="font-size:12px;color:red;margin-left:'+_width+'px"><i class="order-icon order-error-s"></i>'+ResourceJS.ProductPublish_AddStep2_js_CatalogyCheck+'</div>';
            var val = $(c.addspecificationfield).val();
         
            if($('.error-div').size() < 1) $(_errorNode).insertBefore($parent.find('.spec-list')).hide();
            
            if(val == oVal){
                $('.error-div').show();
                $parent.find('.ly-abs').hide();
                $("#AddSpecificationField").css('border-color','red');
                return false;
            }    
            if (val) {
                that.addkind(val);
            }
        });

        $(c.addspecificationfield).live('focus', function () {
            $(this).closest('.addspe').find('.ly-abs').show()
        })

        $("body").live("click", function (e) {
            var target = e.target;
            if (!($(target).hasClass("addspe") ||target.id == "AddSpecificationField")) {
                $(".defaultspecification").parent().hide();
            } 
            return true;
        })

        $('.defaultspecification').live('click', function () {
            $(c.addspecificationfield).val($(this).html())
            $(this).closest('span').hide();
            return !1
        })

        //删除规格种类
        $(c.delspecification).live('click', function () {
            var val = $(this).attr('delspecification');
            if (val) {
                var index = $m.indexOf(val, that.categorykindnames);
                that.delkind(val);
            }
        })

        var addtemp = '<span class="c-input-sm"><input type="text" class="c-input-text-md w50 addcategoryfield" ><button class="iconfont btn-confirm" id="addcategorykind">&#xf0002;</button></span>';
        //
        var currentname = null;
        $(c.addcategory).live('click', function () {
            var val = $(this).attr('addcategory');
            $('.c-input-sm').remove();
            if (val) {
                currentname = val;
                $(this).after(addtemp);
                $('.addcategoryfield').val('')
            }
        })
        //添加规格具体的
        $('#addcategorykind').live('click', function () {
            var val = $('.addcategoryfield').val();
            if (val) {
                that.addkind(currentname, val);
            }
        })
        //删除具体规格
        $(c.delcategory).live('click', function () {
            var name = $(this).attr('spename'), category = $(this).attr('delcategory');
            that.delkind(name, category);
        })

        //修改规格内容
        $(c.categoryimport).live('change', function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            var id = $(this).closest('tr').attr('categoryid');
            if (val) {
                that.getcategorybyid(id)[name] = val;
            }
            if (name == "imgsrc") {
                $(this).closest('form').ajaxSubmit({
                    success: function (data) {
                        if (data != "error") {
                            //
                            that.updataimgbyid(id, data);
                            //that.getcategorybyid(id)[name] = data;
                            that.showcategory();
                        } else {
                            alert(data);
                        }
                    }
                });
            }
        });

        //取消规格图片
        $(".cancelcatalogimg").live('click', function () {
            var id = $(this).closest('tr').attr('categoryid');
            that.getcategorybyid(id)["imgsrc"] = "";
            that.showcategory();
        });

        //取消全部规格
        $(c.allcategorychecked).live('click', function () {
            var checked = $(this).attr('checked');

            $(c.categorychecked).each(function () {
                var id = $(this).closest('tr').attr('categoryid');
                $(this).attr('checked', checked);
                that.getcategorybyid(id)['ischecked'] = $(this).attr('checked');
            });

        })

        //取消规格
        $(c.categorychecked).live('click', function () {
            var id = $(this).closest('tr').attr('categoryid');
            that.getcategorybyid(id)['ischecked'] = $(this).attr('checked');
        })

        //set specification or not
        $(c.setspecification).live('click', function () {
            that.set($(this).attr('checked'));
            if ($(this).attr('checked')) {
                $('#SpecificationContainer').show();
            }
        })

    },
    set: function (bool) {
        this.isset = bool;
        this.showcategory();
    },
    init: function () {
        var data = this.config.data;

        if (data) {
            this.isInitStart = !0;
            for (var i = 0, len = data.length; i < len; i++) {
                this.addcategoryitem(data[i]);
                for (var j = 0; j < data[i].kinds.length; j++) {
                    this.addkind(data[i].kinds[j].key, data[i].kinds[j].value);
                }
            }
            this.isInitStart = !1;
            this.showcategory();
        }
    },
    addkind: function (name, value) {

        var kinds = this.categorykinds;
        var isexits = !1;
        var k;

        if ($m.indexOf(name, this.categorykindnames) < 0 && this.categorykindnames.length < this.config.max) {
            this.categorykindnames.push(name);
        }

        if (!value && kinds.length >= this.config.max) {
            return;
        }
        if (kinds.length == 0) {
            k = new categorykinds(name);
            value && k.add(value);
            kinds.push(k);
        } else {
            for (var i = 0, len = kinds.length; i < len; i++) {
                if (kinds[i].name == name) {
                    isexits = !0;
                    value && kinds[i].add(value);
                }
            }
            if (!isexits && kinds.length < this.config.max) {
                k = new categorykinds(name);
                value && k.add(value);
                kinds.push(k);
            }
        }
        this.createcategory();
    },
    delkind: function (name, value) {
        var kinds = this.categorykinds;
        if (kinds.length == 0) {
            return;
        }
        for (var i = 0; i < kinds.length; i++) {
            if (kinds[i].name == name) {
                if (value) {
                    kinds[i].del(value)
                    this.delrelatecategory(value);
                    if (kinds[i].values.length == 0) {
                        kinds.splice(i, 1);
                        this.categorykindnames.splice(i, 1);
                        this._isnull = !0;
                        i--;
                    }
                } else {
                    kinds.splice(i, 1);
                    this.categorykindnames.splice(i, 1);
                    this._isnull = !0;
                    i--;
                }
            }
        }
        this.createcategory();
    },
    delrelatecategory: function (val) {
        var kinds
        for (var i = 0; i < this.categories.length; i++) {
            kinds = this.categories[i].kinds;
            for (var j = 0; j < kinds.length; j++) {
                if (kinds[j] && val == kinds[j].value) {
                    this.categories.splice(i, 1);
                    i--;
                }
            }
        }
    },
    updataimgbyid: function (id, src) {
        var c = this.getcategorybyid(id);
        var kinds;
        for (var i = 0; i < this.categories.length; i++) {
            kinds = this.categories[i].kinds;
            for (var j = 0; j < kinds.length; j++) {
                if (kinds[j] && /颜色|Color/i.test(kinds[j].key) && (kinds[j].key == c.kinds[j].key) && (c.kinds[j].value == kinds[j].value)) {
                    this.categories[i]['imgsrc'] = src;
                }
            }
        }
    },
    addcategoryitem: function (category) {
        if (category) {
            for (var i = 0, len = this.categoryAttribute.length; i < len; i++) {
                category[this.categoryAttribute[i]] = category[this.categoryAttribute[i]] || "";
            }
            if (!category.id) {
                category.id = this._uid;
                this._uid++;
            }
            if (category.kinds && category.kinds.length > 0) {
                for (var j = 0; j < category.kinds.length; j++) {
                    if (/颜色|Color/i.test(category.kinds[j].key)) {
                        category.canupload = !0;
                    }
                }
            }
            category.ischecked = !0;
            this.categories.push(category);
        }
    },
    cancelcategory: function (id) {
        this.getcategorybyid(id).ischecked = !1;
    },
    getcategorybyid: function (id) {
        for (var i = 0, len = this.categories.length; i < len; i++) {
            if (this.categories[i].id == id) {
                return this.categories[i];
            }
        }
        return null;
    },
    clearcategory: function () {
        this.categories = [];
    },
    isexist: function () {
        var e = !1;
        var args = $m.makeArray(arguments), len = args.length, kinds;
        for (var i = 0; i < this.categories.length; i++) {
            kinds = this.categories[i].kinds;
            if (kinds.length == len) {
                for (var j = 0; j < len; j++) {
                    e = (args[j] == kinds[j].value);
                    if (!e) {
                        break;
                    }
                }
                if (e) {
                    return e;
                }
            } else {
                e = !1;
            }
        }
        return e;
    },
    clearsingle: function () {
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].kinds.length == 1) {
                this.categories.splice(i, 1);
                i--;
            }
        }
    },
    createcategory: function (isdel) {
        if (this.isInitStart) {
            return;
        }
        if (this._isnull) {
            this.clearcategory();
        }
        var kinds = this.categorykinds, k1, k2;
        var i = 0, j = 0, len;

        if (kinds.length == 0) {
            this.clearcategory();
            this.showcategory();
            return;
        }

        var arr = [], allhasvalue = !1;
        if (kinds.length > 1) {
            for (i = 0, len = kinds.length; i < len; i++) {
                allhasvalue = kinds[i].values.length > 0;
            }
        } else {
            //==1
            for (i = 0, len = kinds[0].values.length; i < len; i++) {
                if (!this.isexist(kinds[0].values[i])) {
                    this.addcategoryitem({
                        kinds: [{
                            key: kinds[0].name,
                            value: kinds[0].values[i]
                        }]
                    });
                }
            }
            this.showcategory();
            return;
        }

        //>1
        var v1, v2, m = 0, n = 0;

        for (i = 0, len = kinds.length; i < len; i++) {
            for (j = kinds.length - 1; j >= 0; j--) {
                if (kinds[i] != kinds[j] && i < j) {
                    v1 = kinds[i].values;
                    v2 = kinds[j].values;
                    if (allhasvalue) {
                        for (m = 0; m < v1.length; m++) {
                            for (n = 0; n < v2.length; n++) {
                                if (!this.isexist(v1[m], v2[n])) {
                                    //arr.push([v1[m], v2[n]]);
                                    arr.push(
                                        [
                                            {
                                                key: kinds[i].name,
                                                value: v1[m]
                                            },
                                            {
                                                key: kinds[j].name,
                                                value: v2[n]
                                            }
                                        ]
                                    )
                                }
                            }
                        }
                    } else {
                        if (v1.length > 0) {
                            for (m = 0; m < v1.length && !this.isexist(v1[m]) ; m++) {
                                arr.push(
                                        [
                                            {
                                                key: kinds[i].name,
                                                value: v1[m]
                                            }
                                        ]
                                    );
                            }
                        }
                        if (v2.length > 0) {
                            for (m = 0; m < v2.length && !this.isexist(v2[m]) ; m++) {
                                arr.push(
                                        [
                                            {
                                                key: kinds[j].name,
                                                value: v2[m]
                                            }
                                        ]
                                    );
                            }
                        }
                    }

                }
            }
        }

        for (i = 0, len = arr.length; i < len; i++) {
            this.addcategoryitem({
                kinds: arr[i]
            });
        }

        if (allhasvalue) {
            this.clearsingle();
        }

        this.showcategory();

    },
    showcategory: function () {
        $(this.config.container).html(this.template.tmpl(this))
    },
    isnumber: function (val) {
        return val && /^[0-9\.]*$/.test(val) && parent(val) > 0;
    },
    submitcategory: function () {
        var i = 0, c = this.categories, len = c.length, result = [];
        // ['kinds', 'price', 'count', 'number', 'imgsrc', 'ischecked', 'canupload']
        for (i; i < len; i++) {
            if (this.categories[i].ischecked) {
                try {
                    if (!this.isnumber(c[i].price)) {
                        alert(ResourceJS.ProductPublish_AddStep2_alert_ErrorPrice)
                        return;
                    }
                    if (!this.isnumber(c[i].count)) {
                        alert(ResourceJS.ProductPublish_AddStep2_alert_ErrorStock)
                        return;
                    }
                } catch (e) { }
                //result.push({
                //    kinds: c[i].kinds,
                //    price: c[i].price,
                //    count: c[i].count,
                //    number: c[i].number
                //})
                var resultItem = {
                    Price: c[i].price,
                    Num: c[i].count,
                    SKU: c[i].number
                };
                var property = [];
                for (var j = 0; j < this.categories[i].kinds.length; j++) {
                    var propertyItem = {
                        PropertyId: "",
                        PropertyName: this.categories[i].kinds[j].key,
                        PropertyValues: [{ PropertyValue: this.categories[i].kinds[j].value, AttributeUrl: /颜色|Color/.test(this.categories[i].kinds[j].key) ? this.categories[i].imgsrc : "" }]
                    };
                    property.push(propertyItem);
                }
                resultItem.PropertyValues = property;
                result.push(resultItem);
            }
        }
        return result;
    }

}