$m.load('widget/tabs',function(tabs){
    tabs('.c-tabs', {
        panels: ".tab-content .tab-content-item",
        triggers: ".tab-header li",
        activeTriggerCls: 'active',
        triggerType: "click"
    });
    //更新“您当前选择的是”
    function RefreshSelectedCategory() {
        var mainCategory = $(".mainCategoryItem.active").attr("cname");
        var subCategory = $(".subCategoryItem.active").attr("cname");
        var thirdCategory = $(".thirdCategoryItem.active").attr("cname");
        var selectedCategoryContent = "";
        if(mainCategory!=undefined) {
            selectedCategoryContent = mainCategory + "<i>></i>";
            if (subCategory != undefined) {
                selectedCategoryContent += subCategory + "<i>></i>";
            }
            if (thirdCategory != undefined) {
                selectedCategoryContent += thirdCategory;
            }
        }
        brandAppendedForc = false;
        $("#SubFromCategory").addClass("c-btn-disabled");
        $("#SelectedCategory").html(selectedCategoryContent);
    }

    //更新“您当前选择的是”搜索分类中
    function RefreshSelectedCategoryForB() {
        var mainCategory = $(".mainCategoryItemForB.active").attr("cname");
        var subCategory = $(".subCategoryItemForB.active").attr("cname");
        var thirdCategory = $(".thirdCategoryItemForB.active").attr("cname");
        var selectedCategoryContent = "";
        if (mainCategory != undefined) {
            selectedCategoryContent = mainCategory + "<i>></i>";
            if (subCategory != undefined) {
                selectedCategoryContent += subCategory + "<i>></i>";
            }
            $("#SubFromBrand").addClass("c-btn-disabled");
            if (thirdCategory != undefined) {
                selectedCategoryContent += thirdCategory;
                $("#SubFromBrand").removeClass("c-btn-disabled");
            }
        }
        $("#SelectedCategoryForB").html(selectedCategoryContent);
    }

    $("input[name=group]").click(function() {
        $("#SubFromUsed").removeClass("c-btn-disabled");
    });

    /********************************************/
    //一级分类
    $("#MainCategoryForC a").live("click", function () {
        $("#MainCategoryForC a").removeClass("active");
        var currentTag = $(this).addClass("active");
        $("#SubCategoryForC").load("/Product/ProductPublish/SubCategorys?cid=" + $(this).attr("data"), function () {
            $("#SelectBrand").hide();
            RefreshSelectedCategory();
        });
    })

    //选择二级分类，显示三级分类，更新“您当前选择的是”
    $("#SubCategoryForC a").live("click", function () {
        $("#SubCategoryForC a").removeClass("active");
        $(this).addClass("active");
        $("#ThirdcategoryForC").html("");
        $("#ThirdcategoryForC").load("/Product/ProductPublish/ThirdCategorys?cid=" + $(this).attr("data"),function () {
            $("#SelectBrand").hide();
            RefreshSelectedCategory();
        });
    });

    //选择三级分类，清空显示品牌选择
    $("#ThirdcategoryForC a").live("click", function () {
        $(".thirdCategoryItem").removeClass("active");
        $(this).addClass("active");
        $("#SelectBrand").show();
        $("#SelectBrandText").val("");
        $("#RecommendBrands").load("/Product/ProductPublish/BrandsBySubCategory?c=" + $(this).attr("data"),function () {
            RefreshSelectedCategory();
            if($("#RecommendBrands").html()==""){
                $("#RecommendBrands").hide()
            }
        });
    });
    var brandAppendedForc = false;
    //品牌选择，显示推荐品牌
    $("#SelectBrandText").focus(function () {
        if ($(this).val() == "" && $("#RecommendBrands").html()!="") {
            $("#RecommendBrands").show();
        }
        else {
            $("#RecommendBrands").hide();
        }
    }).blur(function () {
        var selectBrandId = GetBrandId($(this).val());
        if (selectBrandId == -1) {
            $("#SelectBrandText").val("");
            brandAppendedForc = false;
            $("#SubFromCategory").addClass("c-btn-disabled");
        }
        else if (!brandAppendedForc) {
            $("#SelectedBrandId").val(selectBrandId);
            $("#SelectedCategory").append("<i>></i>" + $(this).val());
            brandAppendedForc = true;
        }
        if($(this).val() != ""){
            $("#SubFromCategory").removeClass("c-btn-disabled");
        }
    }).keyup(function () { //输入品牌，隐藏推荐
        RefreshSelectedCategory();
        if ($(this).val() == "") {
            $("#RecommendBrands").show();
            $("#SubFromCategory").addClass("c-btn-disabled");
        }
        else {
            $("#RecommendBrands").hide();
        }
    }).change(function () {
        if ($(this).val() != "") {
            $("#SubFromCategory").removeClass("c-btn-disabled");
        }
    });


    $("#SelectBrandTextInBrand").blur(function () {
        if ($(this).val() == "") {
            return;
        }
        var selectBrandId = GetBrandId($(this).val());
        $("#SelectedBrandId").val(selectBrandId);
        if (selectBrandId == -1) {
            $("#SelectBrandTextInBrand").val("");
        }
    });

    //根据品牌搜索分类
    $("#SearchCategory").click(function () {
        $("#SubFromUsed").addClass("c-btn-disabled");
        if($("#SelectBrandTextInBrand").val()=="") {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoBrandMsg);
        }
        else {
            var selectBrandId = GetBrandId($("#SelectBrandTextInBrand").val());
            $("#SelectedBrandIdForB").val(selectBrandId);

            $.post("/Product/ProductPublish/HaveSuggestedCategories?b=" + selectBrandId, function(data) {
                if (data=="True") {
                    $("#MainCategoryForB").show();
                    $("#SubCategoryForB").show();
                    $("#ThirdcategoryForB").show();
                    $("#NoCategorysForB").hide();
                    
                    $("#MainCategoryForB").load("/Product/ProductPublish/CategorysByBrand?b=" + selectBrandId);
                    $("#SubCategoryForB").html("");
                    $("#ThirdcategoryForB").html("");
                }
                else {
                    $("#MainCategoryForB").hide();
                    $("#SubCategoryForB").hide();
                    $("#ThirdcategoryForB").hide();
                    $("#NoCategorysForB").show();
                }
            });
        }
    });

    //搜索品牌后选择一级分类，显示二级分类，更新“您当前选择的是”
    $(".mainCategoryItemForB").live("click", function () {
        var currentTag = $(this);
        $("#SubCategoryForB").load("/Product/ProductPublish/SubCategorysByBrandAndMainCategory?c=" + $(this).attr("data") + "&b=" + $("#SelectedBrandIdForB").val(),function() {
            $("#ThirdcategoryForB").html("");
            $(".mainCategoryItemForB").removeClass("active");
            currentTag.addClass("active");
            RefreshSelectedCategoryForB();
        });
    });

    //搜索品牌后选择二级分类，显示三级分类，更新“您当前选择的是”
    $(".subCategoryItemForB").live("click", function () {
        var currentTag = $(this);
        $("#ThirdcategoryForB").load("/Product/ProductPublish/ThirdCategorysByBrandAndSubCategory?c=" + $(this).attr("data") + "&b=" + $("#SelectedBrandIdForB").val(), function () {
            $(".subCategoryItemForB").removeClass("active");
            currentTag.addClass("active");
            RefreshSelectedCategoryForB();
        });
        
    });

    //搜索品牌后选择三级分类，清空显示品牌选择
    $(".thirdCategoryItemForB").live("click", function () {
        $(".thirdCategoryItemForB").removeClass("active");
        $(this).addClass("active");
        RefreshSelectedCategoryForB();
        $("#SelectedCategoryForB").append("<i>></i>" + $("#SelectBrandTextInBrand").val());
    });

    //选择推荐品牌
    $(".RecommendBrandItem").live("click", function () {
        $("#SelectBrandText").val($(this).text());
        $("#SelectedBrandId").val($(this).attr("data"));
        $("#RecommendBrands").hide();
        if (!brandAppendedForc) {
            $("#SubFromCategory").removeClass("c-btn-disabled");
            $("#SubFromCategoryProduct").removeClass("c-btn-disabled")
            $("#SelectedCategory").append("<i>></i>" + $(this).html());
            brandAppendedForc = true;
        }
        
    });

    //autocomplete所有品牌
    var allBrands = [];
    $("ul#AllBrands li").each(function () {
        allBrands.push($(this).text());
    });

    $("#SelectBrandText").autocomplete(allBrands, {
        width:190
    });

    $("#SelectBrandTextInBrand").autocomplete(allBrands, {
        width: 190
    });

    //从分类选择的下一步
    $("#SubFromCategory").click(function () {
        var self = $(this);
        //判断按钮是否失效
        if (!brandAppendedForc) {
            return;
        }

        var selectCategoryId = -1;
        if ($(".thirdCategoryItem.active")[0]) {
            selectCategoryId = $(".thirdCategoryItem.active").attr("data");
        }

        var selectBrandId = GetBrandId($("#SelectBrandText").val());
        $("#SelectedBrandId").val(selectBrandId);
        if (selectCategoryId == -1) {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoCategoryMsg);
        } else if (selectBrandId == -1) {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoBrandMsg);
        } else {
            location.href = "/publishproduct/step2/c_" + selectCategoryId + "/b_" + selectBrandId;
        }
    });

    $("#SubFromCategoryProduct").click(function () {
        var self = $(this);
        //判断按钮是否失效
        if (!brandAppendedForc) {
            return;
        }
        var selectCategoryId = -1;
        if ($(".thirdCategoryItem.active") != undefined) {
            selectCategoryId = $(".thirdCategoryItem.active").attr("data");
        }

        var selectBrandId = GetBrandId($("#SelectBrandText").val());
        
        if (selectCategoryId == -1) {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoCategoryMsg);
        } else if (selectBrandId == -1) {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoBrandMsg);
        } else {
            $.post("/Product/ProductManage/ChangeProductCategoryAndBrand?pid=" + $(this).attr("data") + "&cid=" + selectCategoryId + "&bid=" + selectBrandId, function(data) {
                if(data.success) {
                    alert(ResourceJS.ProductPublish_AddStep1_button_ChangeProductCategorySuccess);
                    location.href = "/productsmanage";
                }
                else {
                    alert(ResourceJS.ProductPublish_AddStep1_button_ChangeProductCategoryFail);
                }
            });
        }
    });

    //使用已用分类
    $("#SubFromUsed").click(function () {
        var self = $(this);
        //判断按钮是否失效
        if (self.hasClass("c-btn-disabled")) {
            return;
        }
        var inputChecked = $("input[name=group]:checked");
        if (inputChecked.length > 0) {
            var categoryAndBrand = inputChecked.val().split("|");
            var categoryId = categoryAndBrand[0];
            var brandId = categoryAndBrand[1];
            location.href = "/publishproduct/step2/c_" + categoryId + "/b_" + brandId;
        }
        else {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoUsedInfoMsg);
        }
    });

    $("#SubFromUsedProduct").click(function () {
        if ($("input[name=group]:checked").length > 0) {
            var categoryAndBrand = $("input[name=group]:checked").val().split("|");
            var categoryId = categoryAndBrand[0];
            var brandId = categoryAndBrand[1];
            $.post("/Product/ProductManage/ChangeProductCategoryAndBrand?pid=" + $(this).attr("data") + "&cid=" + categoryId + "&bid=" + brandId, function (data) {
                if (data.success) {
                    alert(ResourceJS.ProductPublish_AddStep1_button_ChangeProductCategorySuccess);
                    location.href = "/productsmanage";
                }
                else {
                    alert(ResourceJS.ProductPublish_AddStep1_button_ChangeProductCategoryFail);
                }
            });
        }
        else {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoUsedInfoMsg);
        }
    });

    //从品牌选择下一步
    $("#SubFromBrand").click(function() {
        var brandId = $("#SelectedBrandIdForB").val();
        var categoryId = $(".thirdCategoryItemForB.active").attr("data");
        if (brandId == "") {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoBrandMsg);
            return;
        } else if (categoryId == undefined) {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoCategoryMsg);
            return;
        }
        location.href = "/publishproduct/step2/c_" + categoryId + "/b_" + brandId;
    });

    $("#SubFromBrandProduct").click(function () {
        var brandId = $("#SelectedBrandIdForB").val();
        var categoryId = $(".thirdCategoryItemForB.active").attr("data");
        if (brandId == "") {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoBrandMsg);
            return;
        } else if (categoryId == undefined) {
            alert(ResourceJS.ProductPublish_AddStep1_label_NoCategoryMsg);
            return;
        }
        $.post("/Product/ProductManage/ChangeProductCategoryAndBrand?pid=" + $(this).attr("data") + "&cid=" + categoryId + "&bid=" + brandId, function (data) {
            if (data.success) {
                alert(ResourceJS.ProductPublish_AddStep1_button_ChangeProductCategorySuccess);
                location.href = "/productsmanage";
            }
            else {
                alert(ResourceJS.ProductPublish_AddStep1_button_ChangeProductCategoryFail);
            }
        });
    });

    //查询品牌ID
    function GetBrandId(brandName) {
        var selectBrandId = -1;
        $("ul#AllBrands li").each(function () {
            if (brandName == $.trim($(this).text())) {
                selectBrandId = $(this).attr("data");
                return false;
            }
        });
        return selectBrandId;
    }
});