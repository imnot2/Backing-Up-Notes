define(function (require, exports, module) {
    
    var layer = require('widget/layerbox')
    

    $m.node('input[name="addressRadio"]').bind('click', function () {
        var parent = this.parentNode.parentNode;
        var data = {};
        $m.node(parent).find('input[type="hidden"]').each(function (d, i) {
            if (d.name == "sAddress1") {
                var pcc = d.value.split(',');
                data.TProvince = pcc[0];
                data.TCity = pcc[1];
                data.TCounty = pcc[2];
            } else {
                data[d.name] = d.value;
            }
        })
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
            layer.alert('请按"区号电话号码"正确填写电话');
            return
        }
        if (!!data.TextboxCellphone && !/(?:\+?\d{1,4}[\s-]?)?\d{11}$/.test(data.TextboxCellphone)) {
            layer.alert('请填写正确手机号码');
            return
        }

        $m.post('/UserAddress/UpdateAddress', data, function (d) {
            if (d.success == 0) {
                layer.alert(d.message);
            } else {
                if (/#usercenter/.test(location.href)) {
                    location.href = "/usercenter/";
                } else {
                    location.href = "/Purchase/";
                }
            }
        });
    })

   


})