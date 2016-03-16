define(function (require, exports, module) {
    var area = require('module/location'), ads;
    var iAddressId = $m.node('#iAddressId');
    var layer = require('widget/layerbox')
    iAddressId = iAddressId.length > 0 ? iAddressId.val() : 0;
    var ProvinceCity = $m.node('#ProvinceCity').val();
    var syncFn = function (elm) {
        var $elm = $(elm)
        $elm.parent().find("input").val($elm.find("option").eq($elm.get(0).selectedIndex).text())
    }
    if (ProvinceCity) {
        ads = ProvinceCity.split(',');
        area.init({
            container: '#chinaArea',
            s1: ads[0],
            s2: ads[1],
            s3: ads[2],
            fn:syncFn
        });
    } else {
        area.init({
            container: '#chinaArea',
            s1: '上海市',
            s2: '上海市',
            s3: '宝山区',
            fn: syncFn
        });
    }

    $(".simulate").on("change", function () {
        var $this = $(this)
        $this.parent().find("input").val($this.find("option").eq($this.get(0).selectedIndex).text())
        //var inx = $(this).attr("data-inx")
        //$(".simulate").map(function (i,n) {
        //    if(i>inx){
        //        $(n).trigger("change")
        //    }
        //})
    })

    $m.node('#submitAddress').bind('click', function () {
        var ca = [];
        $m.node('#chinaArea select').each(function (a, b) {
            ca.push(a.options[a.selectedIndex].innerHTML);
        });
        var data = {
            AdsText: $m.node('#sAddress2')[0].value,
            TextboxRecipient: $m.node('#sRecipient')[0].value,
            TextboxTelephone: $m.node('#sTelphone')[0].value,
            TextboxCellphone: $m.node('#sCellPhone')[0].value,
            TextboxPostCode: $m.node('#sPostCode')[0].value,
            TProvince: ca[0],
            TCity: ca[1],
            TCounty: ca[2]
        }
        if (iAddressId) {
            data.AddressId = iAddressId
        }
        if (!data.TProvince || !data.TCity || !data.TCounty) {
            layer.alert('请选择完整省、市、县区');
            return
        }
        if (!data.AdsText) {
            layer.alert('请填写详细地址');
            return
        }
        if (!data.TextboxRecipient) {
            layer.alert('请填写联系人');
            return
        }
        if (!data.TextboxPostCode || !/^\d{6}$/.test(data.TextboxPostCode)) {
            layer.alert('请填写6位邮政编码');
            return
        }
        if (!data.TextboxTelephone && !data.TextboxCellphone) {
            layer.alert('电话号码和手机号码至少填写一项');
            return
        }
        if (!!data.TextboxTelephone && !/^\d{3,4}-?[\d-]{5,9}$/.test(data.TextboxTelephone)) {
            layer.alert('请按"区号-电话号码"正确填写电话');
            return
        }
        if (!!data.TextboxCellphone && !/(?:\+?\d{1,4}[\s-]?)?\d{11}$/.test(data.TextboxCellphone)) {
            layer.alert('请填写正确手机号码');
            return
        }

        $m.post(iAddressId ? '/UserAddress/UpdateAddress' : '/UserAddress/AddNewAddress', data, function (d) {
            if (d.success == 0) {
                layer.alert(d.message);
            } else {
                if ($m.node('#redirectField').val() == "usercenter") {
                    location.href = "/usercenter/";
                } else {
                    location.href = "alladdresses";
                }
            }
        });
        return !1
    })
})