$m.load(['widget/comfirm'], function (pop) {
    $(function () {
        var errorAlert = function (msg) {
            pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, msg, "error");
        }
        var successAlert = function (msg, fn) {
            pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Success, msg, "success", fn);
        }
        var failureAlert = function (msg) {
            pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Failure, msg, "warning");
        }
        var comfirmAlert = function (title, msg, fn) {
            pop.comfirmPop(title, msg, 'error', { comfirm: ResourceJS.SellerOrder_Common_Alert_msg_Confirm, cancel: ResourceJS.SellerOrder_Common_Alert_msg_Cancel }, fn);
        }

        $('.order-form').submit(function () {
            var $this = $(this);            
            var _key = $('.c-input-large', $this);
            if (_key.val() == _key.attr('placeholder')) {
                _key.val('');
            }     
        })
        //重置表单   
        $("#J-formReset").click(function () {
            var ua = navigator.userAgent.toLowerCase();
            var IE = "";
            if (window.ActiveXObject) {
                IE = ua.match(/msie ([\d.]+)/)[1];
                if (IE <= 9) {
                    var _input = $(":input", document.forms[0]);
                    var _select = $("select", document.forms[0]);
                    _input.each(function () {
                        var _placeholder = $(this).attr('placeholder');
                        $(this).val(_placeholder);
                        $(this).addClass('placeholder');
                    })
                    _select.val("");
                }
                return;
            }                
            $(":input", document.forms[0]).val("");
        })


        $(".CanEdit").mouseover(function () {
            var editBtn = $(this).find("a.iconfont");
            if (!editBtn.attr("canshow") || editBtn.attr("canshow") == 1) {
                $(this).find("a.iconfont").show();
            }
        });
    
        // $(".CanEdit").mouseleave(function () {
        //     $(this).find("a.iconfont").hide();
        // });

        $(".CanEdit a").click(function() {
            var currentTd = $(this).parent();
            $(this).hide();
            $(this).attr("canshow", "0");
            currentTd.find(".ForEdit").show();
            currentTd.find("input").val(currentTd.find(".ForShow").hide().html());
        });

        $(".EditNum").click(function () {
            var currentTd = $(this).parent().parent();
            var newStockNum = $(this).prev().val();
            var numRegExp = /^[0-9]*$/;
            if (!numRegExp.test(newStockNum) || newStockNum > 99999 || newStockNum < 0) {
                alert(ResourceJS.ProductPublish_AddStep2_alert_ErrorStock);
                return false;
            }
            $.post("/product/productmanage/editstocknum?catalogId=" + $(this).attr("data") + "&stockNum=" + newStockNum, function(data) {
                if (data.success) {
                    currentTd.find(".ForShow").show().html(newStockNum);
                    currentTd.find("a.iconfont").css('display','inline');             
                    // currentTd.find("a.iconfont").attr("canshow", "1");
                }
                else {
                    alert(data.msg);
                }
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
            });
        });

        $(".EditLimitNum").click(function() {
            var currentTd = $(this).parent().parent();
            var newLimitNum = $(this).prev().val();
            $.post("/product/productmanage/editlimitnum?productId=" + $(this).attr("data") + "&limitNum=" + newLimitNum, function (data) {
                if (data.success) {
                    if (newLimitNum > 0) {
                        currentTd.find(".ForShow").html(newLimitNum);
                        currentTd.find("a.iconfont").css('display','inline');
                        // currentTd.find("a.iconfont").attr("canshow", "1");
                    }
                    else {
                        currentTd.find(".ForShow").html(ResourceJS.ProductManage_ProductList_label_NoLimit);
                    }
                 
                }
                else {
                    alert(data.msg);
                }
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
            });
        });

        $(".EditPrice").click(function() {
            var currentTd = $(this).parent().parent();
            var currentTr = currentTd.parent().parent();
            var newPrice = $(this).prev().val();
            var numRegExp = /^[0-9\.]*$/;
            if (!numRegExp.test(newPrice) || newPrice > 99999 || newPrice <= 0) {
                alert(ResourceJS.ProductPublish_AddStep2_alert_ErrorPrice);
                return false;
            }
            $.post("/product/productmanage/editproductprice?catalogId=" + $(this).attr("data") + "&productPrice=" + newPrice, function (data) {
                if (data.success) {
                    currentTd.find(".ForShow").html(newPrice);
                    currentTr.find(".EditNum").attr("data", data.newId);
                    currentTr.find(".EditPrice").attr("data", data.newId);
                    currentTd.find("a.iconfont").css('display','inline');
                    // currentTd.find("a.iconfont").attr("canshow", "1");
                }
                else {
                    alert(data.msg);
                }
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
            });
        });
        /*全选操作*/
        $("input[name=selAll]").change(function () {
            $("input[name=pids]").attr("checked", $(this).attr("checked"));
        });

        $(".ReOnSellBtn").click(function () {
            distribute1("/product/productmanage/batchproductshelves");
        });

        $(".AutoSellBtn").click(function() {
            distribute1("/product/productmanage/BatchProductAutoShelves");
        });

        $(".OffSellBtn").click(function () {
            distribute1("/product/productmanage/BatchOffLine");
        });

        $(".DeleteBtn").click(function () {
            distribute("/product/productmanage/BatchDelete");
        });

        /*
        * 统一处理批量请求
        * @param url
        * 如果有回调方法，就扩展一下
        */
        //@TODO 既然请求和相应处理都是一样统一由一个方法来处理
        function distribute(url) {
            var ids = "";
            var productsCount = 0;
            var pids = $("input[name=pids]:checked");
            ids = pids.serialize();
            productsCount = pids.size();

            if (!productsCount) {
                errorAlert(ResourceJS.ProductManage_ProductList_alert_SelectProducts);
                return false;
            }
            $.post(url, ids, function (data) {
                if (data.success == 1) {
                    if (productsCount > 1) {
                        successAlert(ResourceJS.ProductManage_ProductList_label_BatchSuccess, function () {
                            location.reload();
                        });
                    }
                    else {
                        successAlert(ResourceJS.ProductManage_ProductList_label_OperationSuccess, function () {
                            location.reload();
                        });
                    }
                    
                } else if (data.success == 2) {
                    successAlert(ResourceJS.ProductManage_ProductList_label_BatchDeleteMsg + data.message, function () {
                        location.reload();
                    });
                    
                }
                else {
                    failureAlert(data.Message);
                }
            }).fail(function () {
                errorAlert("error");
            });
        }

        function distribute1(url) {
            var ids = "";
            var productsCount = 0;
            var pids = $("input[name=pids]:checked");
            ids = pids.serialize();
            productsCount = pids.size();

            if (!productsCount) {
                errorAlert(ResourceJS.ProductManage_ProductList_alert_SelectProducts);
                return false;
            }
            $.post(url, ids, function (data) {
                if (data.Success) {
                    if (productsCount > 1) {
                        successAlert(ResourceJS.ProductManage_ProductList_label_OperationSuccess, function () {
                            location.reload();
                        });
                    }
                    else {
                        successAlert(ResourceJS.ProductManage_ProductList_label_OperationSuccess, function () {
                            location.reload();
                        });
                    }
                    
                }
                else {
                    failureAlert(data.Message);
                }
            }).fail(function () {
                errorAlert("error");
            });
        }

        function completeCopy() {
            alert(ResourceJS.ProductManage_ProductList_label_CopyUrlSeuucee);
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


        //商品选择分类标签
        $(".SelectLabel").change(function() {
            var productId = $(this).attr("data");
        
        });

        $('.EditName').click(function () {
            var currentTd = $(this).parent().parent();
            var newName = $(this).prev().val();
            if (newName.length == 0) {
                alert('商品名称填写错误');
                return;
            }

            if (newName.length > 60)
            {
                alert("字符长度不能超过60");
                return;
            }

            $.post("/Product/ProductManage/EditProductName?pid=" + $(this).attr("data") + "&newName=" + encodeURIComponent(newName), function (d) {
                if (d.success) {
                    currentTd.children(".ForShow").find('.showProductName').text(decodeURIComponent(encodeURIComponent(newName)));
                } else {
                    alert(d.msg);
                }
                // currentTd.children(".ForShow").find(".editIcon").show();
                currentTd.children(".ForShow").find(".editIcon").css('display','inline');
                currentTd.find(".ForShow").show();
                currentTd.find(".ForEdit").hide();
            });
        });

        j$('.editIcon').click(function () {
            j$(this).parent().parent().children('.ForEdit').show();
            j$(this).parent().hide();
        });
    })
})