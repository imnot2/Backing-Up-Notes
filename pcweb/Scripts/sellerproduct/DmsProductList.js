/*=======================DmsProductList.js===========================*/
$.ajaxSetup({
    async: false
}); 

function GetSelectedGroup() {
    var group = [];
    $('.SelectItem').each(function () {
        if ($(this).attr('checked') == true) {
            group.push($(this));
        }
    });
    return group;
}

function DelOneProduct(productId) {
    $.post('/DMSProduct/DeleteProduct?productId=' + productId, null, function (data) {
        if (data.result == true) {
            alert('删除成功');
            location.reload();
        } else {
            alert('删除失败，该商品不能删除');
        }
    }, "json");
}

function OnSell() {
    var groups = GetSelectedGroup();
    if (groups.length == 0) {
        alert("请选择要上架的商品");
        return false;
    }
    var groupIds = [];
    for (var i = 0; i < groups.length; i++) {
        if($(groups[i]).hasClass('canNotOnOff')) {
            alert('您选的商品不能上架');
            return false;
        }
        else {
            groupIds.push($(groups[i]).val());
        }
    }
    $.post('/DMSProduct/GroupOnSell?groupids='+groupIds.toString(), function (data) {
        if (data.result == true) {
            alert("上架成功");
            location.reload();
        }
        else {
            alert("上架失败");
        }
    }, "json");
    return false;
}

function OnOneProduct(productId) {
    $.post('/DMSProduct/ProductOnSell?productId=' + productId, null, function (data) {
        if (data.result == true) {
            alert('上架成功');
            location.reload();
        } else {
            alert('上架失败');
        }
    }, "json");
}

function OffSell() {
    var groups = GetSelectedGroup();
    if (groups.length == 0) {
        alert("请选择要上架的商品");
        return false;
    }
    var groupIds = [];
    for (var i = 0; i < groups.length; i++) {
        if($(groups[i]).hasClass('canNotOnOff')) {
            alert('您选的商品不能下架');
            return false;
        }
        else {
            groupIds.push($(groups[i]).val());
        }
    }
    $.post('/DMSProduct/GroupOffSell?groupids=' + groupIds.toString(), function (data) {
        if (data.result == true) {
            alert("下架成功");
            location.reload();
        }
        else {
            alert("下架失败");
        }
    }, "json");
    return false;
}

function OffOneProduct(productId) {
    $.post('/DMSProduct/ProductOffSell?productId=' + productId, null, function (data) {
        if (data.result == true) {
            alert('下架成功');
            location.reload();
        } else {
            alert('下架失败');
        }
    }, "json");
}

function DelGroup() {
    var groups = GetSelectedGroup();
    if (groups.length == 0) {
        alert("请选择要删除的商品");
        return false;
    }
    var groupIds = [];
    for (var i = 0; i < groups.length; i++) {
        if ($(groups[i]).hasClass('canNotEdit') || $(groups[i]).hasClass('canNotDelete')) {
            alert('您选的商品不能删除');
            return false;
        }
        else {
            groupIds.push($(groups[i]).val());
        }
    }
    $.post('/DMSProduct/DeleteGroup?groupids='+groupIds.toString(), function (data) {
        if (data.result == true) {
            alert("删除成功");
            location.reload();
        }
        else {
            alert("删除失败");
        }
    }, "json");
    return false;
}


$(function () {
    $('#SelectCheck').click(function () {
        if ($(this).attr('checked') == true) {
            $('.SelectItem').attr('checked', true);
        } else {
            $('.SelectItem').attr('checked', false);
        }
    });
    $m.load('widget/layerbox', function (layerbox) {
        var struc = layerbox('struc', {
            close: '.shut',
            isloc: !0
        });
        $('.AmendManuStock').click(function () {
            $('#alert_box').load('/DMSProduct/AmendManuStock?pid=' + $(this).attr('data'));
            struc.alert('#alert_box');
            return false;
        });

        $('.AmendAutoStock').live('click', function () {
            $('#alert_box').load('/DMSProduct/AmendAutoStock?gid=' + $(this).attr('data'));
            struc.alert('#alert_box');
            return false;
        });
    })
    
    $('#alert_box').delegate("input.Amount", 'keyup', function () {
        var o = $(this);
        if (o.val != "") {
            var str = o.val().replace(/[^\d]*/g, "");
            o.val(str == "" ? "" : parseInt(str));
        }

    })
    $('#alert_box').delegate("input.Amount", 'blur', function () {
        var o = $(this), parent = o.closest('.stock_row'), count = parseInt(o.val()), total = parseInt(parent.find('.al').text());
        o.trigger("keyup");
        if (isNaN(count)) {
            if (o.val() == "") {
                return;
            }
        }
        count = count * parseInt(parent.find("input:radio:checked").val());
        if (count + total < 0) {
            alert("扣减库存不能大于渠道当前的实际库存");
            o.val("")
            o.focus();
        }
    })
    $('#alert_box').delegate("input:radio", "change", function () {
        var o = $(this), parent = o.closest('.stock_row'), input = parent.find("input.Amount");
        !!input.attr("disabled") && input.attr("disabled", false)
        input.focus();
        input.trigger("blur");
    })
    $('#btnChangeCatalogStock').live('click', function () {
        var rows = $('.stock_row');
        var ammendStock = [], total, amount;
        for (var i = 0; i < rows.length; i++) {
            var mode = $(rows[i]).find(":checked");
            var amountInput = $(rows[i]).find("input[name='Amount']");

            total = parseInt($(rows[i]).find('.al').text())
            amount = parseInt(mode.val() || 1) * parseInt(amountInput.val() || 0);
            if (amount + total < 0) {
                alert("扣减库存不能大于渠道当前的实际库存");
                return;
            }
            var minStock = $(rows[i]).find("input[name='realstock']").val();
            if (minStock + amount < 0) {
                alert("扣减库存不能小于渠道当前的实时库存（实际库存减去在途库存）");
                $(amountInput).focus();
            }

            var catalogId = $(rows[i]).find("input[name='catalogId']").val();

            amount != 0 && (ammendStock[ammendStock.length] = catalogId + "_" + amount);
        }
        if (ammendStock.length > 0)
            $.post('/DMSProduct/DoAmendManuStock?data=' + ammendStock.join("|"), function (data) {
                alert(data.Message);
                if (data.Success) {
                    location.reload();
                }
            }, "json");
        else
            alert("您没有任何修改")
    });

    $('#btnChangeCatalogsStock').live('click', function () {
        var rows = $('.stock_row');
        var ammendStock = [], amount;
        for (var i = 0; i < rows.length; i++) {
            var mode = $(rows[i]).find(":checked");
            var amountInput = $(rows[i]).find("input[name='Amount']");

            amount = parseInt(mode.val() || 1) * parseInt(amountInput.val() || 0);

            var minStock = parseInt($(rows[i]).find("input[name='realstock']").val());

            if (minStock + amount < 0) {
                alert("扣减库存不能小于渠道当前的实时库存（实际库存减去在途库存）");
                $(amountInput).focus();
                return;
            }

            var settingId = $(rows[i]).find("input[name='inventorySettingId']").val();

            amount != 0 && (ammendStock[ammendStock.length] = settingId + "_" + amount);
        }
        if (ammendStock.length > 0)
            $.post('/DMSProduct/DoAmendAutoStock?data=' + ammendStock.join("|"), function (data) {
                alert(data.Message);
                if (data.Success) {
                    location.reload();
                }
            }, "json");
        else
            alert("您没有任何修改")
    });

    $(".o_view_reason").click(function () {
        var productId = $(this).attr("pid");
        $.post("/DMSProduct/GetRejectReason", JSON.stringify({ productId: productId }), function (data) {
            if (data.result == "success") {
                alert("拒绝原因:" + data.msg);
            }
            else {
                alert("操作出错:" + data.msg);
            }
        });
    });
});

