/*=======================index.js===========================*/
j$(function () {
    j$('#checkboxSelectAllProduct,#checkboxSelectAllProduct2').click(function () {
        j$('#divProductList').find('input[name="CheckedProductIds"]').attr('checked', j$(this).attr('checked'));
        j$('#checkboxSelectAllProduct').attr('checked', j$(this).attr('checked'));
        j$('#checkboxSelectAllProduct2').attr('checked', j$(this).attr('checked'));
    });

    //    j$('#buttonRemoveSelected').click(function () {
    //        if (confirm('您确认要删除选择的商品吗？')) {
    //            var form = j$('form#formRemoveMulit');
    //            var div = j$('#divProductList');
    //            var items = div.find('input:checked');
    //            var ids = new Array();
    //            items.each(function (index, data) {
    //                ids.push(j$(data).val());
    //            });
    //            j$.post(form.attr('action'), j$.toJSON({ 'checkedCatalogIds': ids }), function (data) {
    //                if (data.success == '1') {
    //                    alert("删除成功");
    //                    window.location.href = data.redirct;
    //                } else {
    //                    alert(data.message);
    //                }
    //            }, 'json');
    //        }formRemoveMulit
    //    });



    j$('.buttonRemoveSelected').click(function () {
        if (confirm('您确认要删除选择的商品吗？')) {
            var form = j$('form#formRemoveMulit');
            var div = j$('#divProductList');
            var items = div.find('input[name="CheckedProductIds"]:checked');
            var ids = new Array();
            items.each(function (index, data) {
                ids.push(j$(data).val());
            });
            j$.post(form.attr('action'), j$.toJSON({ 'checkedProductIds': ids }), function (data) {
                if (data.success == '1') {
                    alert("删除成功");
                    window.location.href = data.redirect;
                } else if (data.success == '2') {
                    alert("以下商品因锁定，未删除成功：" + data.message);
                    window.location.href = data.redirect;
                } else {
                    alert("删除失败");
                }
            }, 'json');
        }
    });


    j$('.editPic').click(function () {
        j$(this).parent().parent().children('.editSpan').show();
        j$(this).parent().hide();
    });
    j$('.editCancle').click(function () {
        j$(this).parent().parent().children('.numShow').show();
        j$(this).parent().hide();
    });
    j$('.editOk').click(function () {
        var newNum = j$(this).parent().children('.cNumEdit').val();
        if (parseInt(newNum) != newNum || newNum < 0) {
            alert('库存填写错误');
            return;
        }
        var catalogId = j$(this).parent().children('.cId').val();
        var data = { cid: catalogId, num: newNum };
        var okButton = j$(this);
        j$.ymatoupost('/SellerProduct/EditCatalogNum', data, function (er) {
            if (er == '') {
                okButton.parent().parent().find('.showNumLab').html(newNum);
                okButton.parent().parent().children('.numShow').show();
                okButton.parent().hide();
            } else {
                alert(er);
            }
        }, 'text');
    });

    j$('.editQuotePriceOk').click(function () {
        var newNum = j$(this).parent().children('.fQuotePriceEdit').val();
        if (parseFloat(newNum) != newNum || newNum < 0) {
            alert('价格填写错误');
            return;
        }
        var catalogId = j$(this).parent().children('.cId').val();
        var data = { cid: catalogId, num: newNum };
        var okButton = j$(this);
        j$.ymatoupost('/SellerProduct/EditQuotePrice', data, function (d) {
            if (d.success) {
                okButton.parent().parent().find('.showQuotePriceLab').html(newNum);
                okButton.parent().parent().children('.numShow').show();
                okButton.parent().hide();
                j$(this).parent().children('.cId').val(d.newId);
            } else {
                alert(d.msg);
            }
        }, 'json');
    });


    j$('.editProductNameOk').click(function () {
        var newName = j$(this).parent().children('.sProductNameEdit').val();
        if (newName.length == 0) {
            alert('商品名称填写错误');
            return;
        }

        var productId = $(this).parent().children('.pId').val();
        var data = { pid: productId, newName: newName };
        var okButton = j$(this);
        j$.ymatoupost('/SellerProduct/EditProductName', data, function (d) {
            if (d.success) {
                okButton.parent().parent().find('.showProductName').html(newName);
                okButton.parent().parent().children('.nameShow').show();
                okButton.parent().hide();
            } else {
                alert(d.msg);
            }
        }, 'json');
    });



    j$('.limitNumEditOk').click(function () {
        var newNum = j$(this).parent().children('.cLimitNumEdit').val();
        if (parseInt(newNum) != newNum || newNum < 0 || newNum > 999) {
            alert('限购数量填写错误，限购范围在1~999');
            return;
        }
        var productId = j$(this).parent().children('.pId').val();
        var data = { pid: productId, num: newNum };
        var okButton = j$(this);
        j$.ymatoupost('/SellerProduct/EditCatalogLimitNum', data, function (er) {
            if (er == '') {
                var showNum;
                if (newNum > 0)
                    showNum = newNum;
                else
                    showNum = "无限制";
                okButton.parent().parent().find('.showLimitNumLab').html(showNum);
                okButton.parent().parent().children('.numShow').show();
                okButton.parent().hide();
            } else {
                alert(er);
            }
        }, 'text');
    });

});

