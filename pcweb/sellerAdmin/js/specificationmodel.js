function SpecificationModel(config) {
    this.isset = !1;
    this.categorykinds = [];
    //this.categorykinds=[new categorykinds(name)];
    this.categories = [];
    this.categorykindnames = [];
    this.categoryAttribute = ['kinds', 'price', 'count', 'number', 'imgsrc', 'ischecked'];
    this._uid = 0;

    this.config = $m.merge({
        categoryimport: '.categoryimport',
        addspecification: '#AddSpecification',
        delspecification: '[delspecification]',
        addspecificationfield: '#AddSpecificationField',
        addcategory: '[addcategory]',
        container: '#SpecificationContainer',
        template: '#SpecificationTemplate',
        setspecification: '#setspecification',
        max: 2,
        data: null
    }, config);

    this.init(this.config.data);

    this.template = $(this.config.template);
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
            }
        }
    }
}

SpecificationModel.prototype = {
    controller: function () {
        var c = this.config, that = this;
        //添加规格种类
        $(c.addspecification).live('click', function () {
            var val = $(c.addspecificationfield).val();
            if (val) {
                if ($m.indexOf(val, that.categorykindnames) < 0 && that.categorykindnames.length < c.max) {
                    that.categorykindnames.push(val);
                }
                that.addkind(val);
            }
        })

        //删除规格种类
        $(c.delspecification).live('click', function () {
            var val = $(this).attr('delspecification');
            if (val) {
                var index = $m.indexOf(val, that.categorykindnames);
                if (index >= 0) {
                    that.categorykindnames.splice(index, 1);
                }
                that.delkind(val);
            }
        })

        var addtemp = '<span class="c-input-sm"><input type="text" class="c-input-text-md w50 addcategoryfield" ><button class="iconfont btn-confirm" id="addcategorykind">&#xf0002;</button></span>';
        //
        var currentname = null;
        $(c.addcategory).live('click', function () {
            var val = $(this).attr('addcategory');
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

        //修改规格内容
        $(c.categoryimport).live('change', function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            var id = $(this).closest('tr').attr('categoryid');
            if (val) {
                that.getcategorybyid(id)[name] = val;
            }
        })

        //set specification or not
        $(c.setspecification).live('click', function () {
            that.set($(this).attr('checked'))
        })

    },
    set: function (bool) {
        this.isset = bool;
        this.showcategory();
    },
    init: function (data) {
        if (data) {
            this.isInitStart = !0;
            for (var i = 0, len = data.length; i < len; i++) {
                this.addcategoryitem(data[i]);
                for (var j = 0; j < data.categorykindnames.length; j++) {
                    this.addkind(data.categorykindnames[j], data[i][j]);
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
                    if (kinds[i].values.length == 0) {
                        kinds.splice(i, 1);
                    }
                } else {
                    kinds.splice(i, 1);
                }
            }
        }
        this.createcategory();
    },
    addcategoryitem: function (category) {
        if (category) {
            for (var i = 0, len = this.categoryAttribute.length; i < len; i++) {
                category[this.categoryAttribute[i]] = category[this.categoryAttribute[i]] || null;
            }
            if (!category.id) {
                category.id = this._uid;
                this._uid++;
            }
            //category.ischecked = !0;
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
                    e = (args[j] == kinds[j]);
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
    createcategory: function () {
        if (this.isInitStart) {
            return;
        }
        var kinds = this.categorykinds, k1, k2;
        var i = 0, j = 0, len;

        if (kinds.length == 0) {
            this.clearcategory();
            this.showcategory();
            return;
        }

        var allhasvalue = !1;
        if (kinds.length > 1) {
            for (i = 0, len = kinds.length; i < len; i++) {
                allhasvalue = kinds[i].values.length > 0;
            }
        } else {
            //==1
            for (i = 0, len = kinds[0].values.length; i < len; i++) {
                if (!this.isexist(kinds[0].values[i])) {
                    this.addcategoryitem({
                        kinds: [kinds[0].values[i]]
                    });
                }
            }
            this.showcategory();
            return;
        }

        //>1
        var v1, v2, arr = [], m = 0, n = 0;

        for (i = 0, len = kinds.length; i < len; i++) {
            for (j = kinds.length - 1; j >= 0; j--) {
                if (kinds[i] != kinds[j] && i < j) {
                    v1 = kinds[i].values;
                    v2 = kinds[j].values;
                    if (allhasvalue) {
                        for (m = 0; m < v1.length; m++) {
                            for (n = 0; n < v2.length; n++) {
                                if (!this.isexist(v1[m], v2[n])) {
                                    arr.push([v1[m], v2[n]]);
                                }
                            }
                        }
                    }else{
                        if (v1.length > 0) {
                            for (m = 0; m < v1.length&&!this.isexist(v1[m]); m++) {
                                arr.push([v1[m]]);
                            }
                        }
                        if (v2.length > 0) {
                            for (m = 0; m < v2.length&&!this.isexist(v2[m]); m++) {
                                arr.push([v2[m]]);
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
    }

}