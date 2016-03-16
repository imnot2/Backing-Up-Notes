Ymt.add(function (require, exports, module) {
    function Address(container, options) {
        if (!(this instanceof Address)) {
            return new Address(container, $m.merge(config, options));
        }
        this.container = $(container);
        this.config = options;

        this.init();

    }
    var config = {
        editAlertCls: '',
        tipsCls: '#__FloatAddressLayer .layer-tips',
        addCls: '#AddNewAddress',
        editCls: '.edittrigger',
        delCls: '#__FloatAddressLayer .deladdress',
        importAddrssCls: '#hidAddressId',
        addAddressURL: '/Order/Order/AddReceiveAddresses',
        editAddressURL: '/Order/Order/EditReceiveAddresses',
        delAddressURL: '/Order/Order/DelReceiveAddresses',
        getAllAddressURL: '/Order/Order/GetAllReceiveAddresses',
        addressApiHost: ''
    }

    var LayerBox = require("module/widget/layerbox");
    var location = require('module/util/location');

    var CHINAAREA = null;

    var temp = LayerBox('temps', {
        Temps: '<div class="floatlayer" id="__FloatAddressLayer"><div class="layer-hd"><h2 class="h2">新增收货地址</h2></div><div class="layer-bd"><div class="layer-tips"></div><ul class="addressform" id="__SelectChinaArea"><li><label><span>所在地区</span><i>*</i></label><select name="Province"><option value="">{Province}</option></select><select name="City"><option value="">{City}</option></select><select name="County"><option value="">{County}</option></select></li><li><label><span>详细地址</span><i>*</i></label><input name="DetailAddress" type="text" value="{DetailAddress}" class="input-text" placeholder="不需要重复写省市区"></li><li><label><span>邮政编码</span><i>*</i></label><input name="PostCode" type="text" value="{PostCode}" class="input-text"></li><li><label><span>收货人</span><i>*</i></label><input name="Addressee" type="text" value="{Addressee}" class="input-text"></li><li><label><span>手机号</span><i>*</i></label><input name="Phone" type="text" value="{Phone}" class="input-text"></li><li class="default"><input type="checkbox" name="IsDefault" checked="{IsDefault}" class="input-checkbox" id="SetDefault"><label for="SetDefault">设为默认收货地址</label></li><li class="action"><input type="hidden" name="AddressId" value="{AddressId}" /><a AddressId="{AddressId}" id="___SubmitAddress" class="btn btn-buy">保存</a><a href="javascript:;" class="deladdress" AddressId="{AddressId}" >删除收货地址</a></li></ul></div><div class="layer-bt"></div><div class="layer-close">x</div></div>',
        callback: function () {

            if (CHINAAREA) {
                var ads = CHINAAREA.split(',');
                location.init({
                    container: '#__SelectChinaArea',
                    s1: ads[0],
                    s2: ads[1],
                    s3: ads[2]
                });
            } else {
                location.init({
                    container: '#__SelectChinaArea',
                    s1: '请选择省份',
                    s2: '请选择市',
                    s3: '请选择县区',
                    val: !1
                });
            }
        }
    });

    var defaultData = {
        AddressId: '',
        Area: '',
        IsDefault: !1,
        Province: '',
        City: '',
        County: '',
        Addressee: '',
        DetailAddress: '',
        PostCode: '',
        Phone: '',
        selectAddress: null
    };

    Address.prototype = {
        modifyAddress: function (address) {

            if (!address.Province) {
                this.tips("请选择省份");
                return !1
            }
            if (!address.City) {
                this.tips("请选择市");
                return !1
            }
            if (!address.County) {
                this.tips("请选择县区");
                return !1
            }
            if (!address.DetailAddress) {
                this.tips("请填写详细地址");
                return !1
            }
            if (!(address.PostCode && /^\d{6}$/.test(address.PostCode))) {
                this.tips("请填写正确邮政编码");
                return !1
            }
            if (!address.Addressee) {
                this.tips("请填写收货人");
                return !1
            }

            if (!/^[\u4E00-\u9FA5]+$/.test(address.Addressee)) {
                this.tips("收件人必须为中文");
                return !1
            }

            if (!(address.Phone && /^\d{11}$/.test(address.Phone))) {
                this.tips("请填写正确手机号码");
                return !1
            }
            this.tips();
            return !0;
        },
        tips: function (str) {
            if (str) {
                $(this.config.tipsCls).html(str).show();
            } else {
                $(this.config.tipsCls).hide();
            }
        },
        addAddress: function (address, callback) {
            var that = this;
            $.ajax({
                url: this.config.addressApiHost + this.config.addAddressURL,
                method: 'post',
                data: address,
                success: function (result) {
                    if (result.Status == 200) {
                        callback(result.Result)
                    } else {
                        that.STATUS = 0;
                        that.tips(result.Msg || "添加地址失败")
                    }
                }
            });
        },
        editAddress: function (address, callback) {
            var that = this;
            $.ajax({
                url: this.config.addressApiHost + this.config.editAddressURL,
                method: 'post',
                data: address,
                success: function (result) {
                    if (result.Status == 200) {
                        callback()
                    } else {
                        that.STATUS = 0;
                        that.tips(result.Msg || "编辑地址失败")
                    }
                }
            });
        },
        deleteAddress: function (id, callback) {
            var address = this.getAddressById(id);
            if (!address) {
                return;
            }
            $.ajax({
                url: this.config.addressApiHost + this.config.delAddressURL + "?addressid=" + id,
                method: 'get',
                success: function (result) {
                    if (result.Status == 200) {
                        callback()
                    } else {
                        that.tips("删除地址失败")
                    }
                }
            });
        },
        getAllAddress: function (callback) {
            $.ajax({
                url: this.config.getAllAddressURL + "?random=" + parseInt(Math.random() * 1000),
                method: 'get',
                success: function (result) {
                    if (result && result.Status == 200) {
                        callback(result.Result)
                    } else {
                        that.tips(result.Msg);
                    }
                }
            });
        },
        renderAddressList: function () {
            var cache = this.localAddressCache,
                arr = [];
            for (var i = 0, length = cache.length; i < length; i++) {
                if (this.currentAddressId == cache[i].AddressId || this.currentAddressId == -1 && i == (length - 1)) {
                    arr.push('<li class = "item default"><div class = "action">')
                } else {
                    arr.push('<li class = "item"><div class = "action">')
                }
                arr.push('<a href="javascript:;" class="edittrigger" AddressId="' + cache[i].AddressId + '">修改本地址</a></div><div class="info">');
                if (cache[i].IsDefault) {
                    arr.push('<input AddressId="' + cache[i].AddressId + '" class="radio" id="SELECTEDRADIO_' + i + '" checked type="radio" name="addressItem" />');
                    //$("#hidAddressId").val(cache[i].AddressId);
                } else {
                    arr.push('<input AddressId="' + cache[i].AddressId + '" class="radio" id="SELECTEDRADIO_' + i + '" type="radio" name="addressItem" />');
                }
                arr.push('<label class="detail" for="SELECTEDRADIO_' + i + '">' + (cache[i].IsDefault ? "<span class=\"isDRed\">[默认收货地址]</span>" : "") + '<span>' + cache[i].Area + ',' + cache[i].DetailAddress + '</span><span>&nbsp;&nbsp;邮编：' + cache[i].PostCode + '</span><span>&nbsp;&nbsp;姓名：' + cache[i].Addressee + '</span><span>&nbsp;&nbsp;手机：' + cache[i].Phone + '</span></label></div></li>');

                //同步变更用户收件信息
                if (cache[i].IsDefault) {
                    $(".userinfo").html([
                        '<p>寄送至：<span class="address">' + cache[i].Area + " " + cache[i].DetailAddress + '</span></p>',
                        '<p>收件人：<span class="name">' + cache[i].Addressee + '</span><span class="phone">' + cache[i].Phone + '</span></p>',
                    ].join(''));
                }
            }
            this.container.html(arr.join(''));
            if (this.localAddressCache.length >= 5) {
                this.addTrigger.hide();
            } else {
                this.addTrigger.show();
            }
        },
        init: function () {
            var config = this.config,
                that = this;
            this.addTrigger = $(config.addCls);
            this.editTrigger = $(config.editCls);
            this.localAddressCache = [];
            this.STATUS = 0;

            //获取地址数据
            that.getAllAddress(function (list) {
                that.localAddressCache = list;
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i].IsDefault) {
                        that.currentAddressId = list[i].AddressId;
                        $(that.config.importAddrssCls).val(list[i].AddressId);
                    }
                }
                that._parseAddress();
                that.renderAddressList();
            });

            //保存地址
            $('#___SubmitAddress').live('click', function () {
                var id = $(this).attr('AddressId');
                var address = that.createAddress();

                function callback(Result) {
                    if (!id && typeof Result == "number") {
                        address.AddressId = Result;
                        that.localAddressCache.push(address);
                    }
                    var IsDefault = address.IsDefault;
                    for (var i = 0, length = that.localAddressCache.length; i < length; i++) {
                        //当被修改为默认地址且当前不为自己的，则设置为false
                        if (IsDefault && that.localAddressCache[i].AddressId != address.AddressId) {
                            that.localAddressCache[i].IsDefault = false;
                        }

                        if (that.localAddressCache[i].AddressId == address.AddressId) {
                            that.localAddressCache[i] = address;
                        }
                    }

                    //输出地址
                    $(that.config.importAddrssCls).val(address.AddressId);

                    that.renderAddressList();
                    that.config.selectAddress && that.config.selectAddress.call(that, address)
                    this.STATUS = 0;
                    temp.close();
                }
                if (!that.STATUS) {
                    if (that.modifyAddress(address)) {
                        //that.STATUS = 1;
                    } else {
                        return !1;
                    }

                    if (address.AddressId) {
                        CHINAAREA = address.Area;
                        that.currentAddressId = parseInt(address.AddressId);
                        that.editAddress(address, callback);
                    } else {
                        CHINAAREA = '';
                        that.currentAddressId = -1;
                        that.addAddress(address, callback);
                    }
                }
                return !1;
            });

            //新建address
            this.addTrigger.live('click', function () {
                that.editAlert();
                return !1;
            });

            //编辑address
            this.editTrigger.live('click', function () {
                that.editAlert($(this).attr('AddressId'));
                return !1;
            });

            $(this.config.delCls).live('click', function () {
                var id = $(this).attr('AddressId');
                that.deleteAddress(id, function () {
                    for (var i = 0; i < that.localAddressCache.length; i++) {
                        if (that.localAddressCache[i].AddressId == id) {
                            that.localAddressCache.splice(i, 1);
                            --i;
                        }
                    }
                    temp.close();
                    that.renderAddressList();
                });
                return !1;
            });

            $('#__FloatAddressLayer .layer-close').live('click', function () {
                temp.close();
                return !1;
            });

            this.container.find('[type="radio"]').live('click', function () {
                that.container.find('.item').removeClass('default');
                $(this).closest('.item').addClass('default');
                var id = $(this).attr('AddressId');
                var address = that.getAddressById(id);
                address && address.Area && $(that.config.importAddrssCls).val(id);
                //同步变更用户收件信息
                $(".userinfo").html([
                    '<p>寄送至：<span class="address">' + address.Area + " " + address.DetailAddress + '</span></p>',
                    '<p>收件人：<span class="name">' + address.Addressee + '</span><span class="phone">' + address.Phone + '</span></p>',
                ].join(''));
            })

            //移动后显示修改地址
            this.container.find('.item').live('mouseover', function () {
                $(this).find('.action').show();
            })
            this.container.find('.item').live('mouseout', function () {
                $(this).find('.action').hide();
            })

            //     'hover', function(){
            //     that.container.find('.item').find('.action').show();
            // },function(){
            //     that.container.find('.item').find('.action').hide();
            // })
        },
        createAddress: function () {
            var container = $('#__FloatAddressLayer');
            var AddressId = container.find('[name="AddressId"').val() || $('#__FloatAddressLayer [name=AddressId]').val();
            var Province = container.find('[name="Province"] option:selected').html(),
                City = container.find('[name="City"] option:selected').html(),
                County = container.find('[name="County"] option:selected').html(),
                Addressee = container.find('[name="Addressee"]').val(),
                PostCode = container.find('[name="PostCode"]').val(),
                Phone = container.find('[name="Phone"]').val(),
                IsDefault = !!container.find('[name="IsDefault"]').attr("checked"),
                DetailAddress = container.find('[name="DetailAddress"]').val();

            var obj = {
                Area: [Province, City, County].join(','),
                IsDefault: IsDefault,
                Province: Province,
                City: City,
                County: County,
                Addressee: Addressee,
                DetailAddress: DetailAddress,
                PostCode: PostCode,
                Phone: Phone
            }
            if (AddressId) {
                obj['AddressId'] = AddressId;
            }
            return obj;
        },
        getAddressById: function (id) {
            var addresss = this.localAddressCache;
            for (var i = 0, len = addresss.length; i < len; i++) {
                if (addresss[i].AddressId == id) {
                    return addresss[i];
                }
            }
        },
        _parseAddress: function () {
            var addresss = this.localAddressCache,
                area = [];
            for (var i = 0, len = addresss.length; i < len; i++) {
                area = addresss[i].Area.split(',');
                addresss[i]['Province'] = area[0];
                addresss[i]['City'] = area[1];
                addresss[i]['County'] = area[2];
            }
        },
        editAlert: function (id) {
            CHINAAREA = '';
            if (id) {
                var address = this.getAddressById(id);
                CHINAAREA = address.Area;
                temp.alert(address);
                if (!address.IsDefault) {
                    $('#__FloatAddressLayer [name="IsDefault"]').attr('checked', false)
                }
            } else {
                temp.alert(defaultData);
                $('#__FloatAddressLayer [name="IsDefault"]').attr('checked', false)
            }
        }
    }
    return Address;
});