$(function () {
    $(".CanEdit").mouseover(function () {
        var editBtn = $(this).find("a.iconfont");
        if (!editBtn.attr("canshow") || editBtn.attr("canshow") == 1) {
            $(this).find("a.iconfont").show();
        }
    });
    
    $(".CanEdit").mouseleave(function () {
        $(this).find("a.iconfont").hide();
    });

    $(".CanEdit a").click(function() {
        var currentTd = $(this).parent();
        $(this).hide();
        $(this).attr("canshow", "0");
        currentTd.find(".ForShow").hide();
        currentTd.find(".ForEdit").show();
        currentTd.find("input").val(currentTd.find(".ForShow").html());
    });

    $(".EditNum").click(function () {
        var currentTd = $(this).parent();
        var newStockNum = $(this).prev().val();
        $.post("/product/productmanage/editstocknum?catalogId=" + $(this).attr("data") + "&stockNum=" + newStockNum, function(data) {
            if (data == "") {
                currentTd.find(".ForShow").html(newStockNum);
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
                window.location.reload();
            }
            else {
                alert(data);
            }
        });
    });

    $(".EditLimitNum").click(function() {
        var currentTd = $(this).parent();
        var newLimitNum = $(this).prev().val();
        $.post("/product/productmanage/editlimitnum?productId=" + $(this).attr("data") + "&limitNum=" + newLimitNum, function (data) {
            if (data == "") {
                if (newLimitNum > 0) {
                    currentTd.find(".ForShow").html(newLimitNum);
                }
                else {
                    currentTd.find(".ForShow").html(ResourceJS.ProductManage_ProductList_label_NoLimit);
                }
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
            }
            else {
                alert(data);
            }
        });
    });

    $(".EditPrice").click(function() {
        var currentTd = $(this).parent();
        var currentTr = currentTd.parent();
        var newPrice = $(this).prev().val();
        $.post("/product/productmanage/editproductprice?catalogId=" + $(this).attr("data") + "&productPrice=" + newPrice, function (data) {
            if (data.success) {
                currentTd.find(".ForShow").html(newPrice);
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
                currentTr.find(".EditNum").attr("data", data.newId);
                currentTr.find(".EditPrice").attr("data", data.newId);
                window.location.reload();
            }
            else {
                alert(data.msg);
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
            }
        });
    });

    $("input[name=selAll]").change(function () {
        $("input[name=no]").attr("checked", $(this).attr("checked"));
    });

    $(".ReOnSellBtn").click(function () {
        var ids = "";
        $("input[name=no]:checked").each(function() {
            ids += ("pids=" + $(this).val() + "&");
        });
        $.post("/product/productmanage/batchproductshelves?"+ids, function(data) {
            if (data.Success) {
                alert(ResourceJS.ProductManage_ProductList_label_BatchSuccess);
                location.reload();
            }
            else {
                alert(data.Message);
            }
        });
    });

    $(".AutoSellBtn").click(function() {
        var ids = "";
        $("input[name=no]:checked").each(function () {
            ids += ("pids=" + $(this).val() + "&");
        });
        $.post("/product/productmanage/BatchProductAutoShelves?" + ids, function (data) {
            if (data.Success) {
                alert(ResourceJS.ProductManage_ProductList_label_BatchSuccess);
                location.reload();
            }
            else {
                alert(data.Message);
            }
        });
    });

    $(".OffSellBtn").click(function () {
        var ids = "";
        $("input[name=no]:checked").each(function () {
            ids += ("pids=" + $(this).val() + "&");
        });
        $.post("/product/productmanage/BatchOffLine?" + ids, function (data) {
            if (data.Success) {
                alert(ResourceJS.ProductManage_ProductList_label_BatchSuccess);
                location.reload();
            }
            else {
                alert(data.Message);
            }
        });
    });

    $(".DeleteBtn").click(function () {
        var ids = "";
        $("input[name=no]:checked").each(function () {
            ids += ("pids=" + $(this).val() + "&");
        });
        $.post("/product/productmanage/BatchDelete?" + ids, function (data) {
            if (data.success == 1) {
                alert(ResourceJS.ProductManage_ProductList_label_BatchSuccess);
                location.reload();
            } else if (data.success == 2) {
                alert("部分删除成功，以下商品不能删除：" + data.cantDeleteProductsNames);
                location.reload();
            }
            else {
                alert(data.Message);
            }
        });
    });

    function completeCopy() {
        alert("商品链接已复制！请粘贴链接至邮件或者IM对话框中。");
    }

    ZeroClipboard.setMoviePath("http://static.ymatou.com//content/flash/zeroclipboard.swf");
    $('.copyclip').live({
        mouseenter: function() {
            var rowId = $(this).attr('data');
            var clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.addEventListener('complete', completeCopy);
            clip.setText("http://www.ymatou.com/product/" + rowId + ".html");
            clip.glue($(this).attr('id'));
            return false;
        }
    });

    function InitSetLabel() {
        $("#setLabel").show();
        $("#setLabel .pop-content").load("/product/productmanage/ShowAllLabels");
    }

    //设置分类标签
    $("#SetLabelBtn").click(function() {
        InitSetLabel();
    });

    $(".SetLabels").click(function() {
        InitSetLabel();
    });

    $("#setLabel .close").click(function() {
        $("#setLabel").hide();
    });

    //商品选择分类标签
    $(".SelectLabel").change(function() {
        var productId = $(this).attr("data");
        
    });

})