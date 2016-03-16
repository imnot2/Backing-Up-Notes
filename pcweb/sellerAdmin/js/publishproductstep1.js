$(function () {
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
            if (thirdCategory != undefined) {
                selectedCategoryContent += thirdCategory;
            }
        }
        $("#SelectedCategoryForB").html(selectedCategoryContent);
    }

    //选择一级分类，显示二级分类，更新“您当前选择的是”
    $(".mainCategoryItem").click(function () {
        var currentTag = $(this);
        $("#SubCategoryForC").load("/Product/ProductPublish/SubCategorys?cid=" + $(this).attr("data"),function () {
            $("#ThirdcategoryForC").html("");
            $(".mainCategoryItem").removeClass("active");
            currentTag.addClass("active");
            $("#SelectBrand").hide();
            RefreshSelectedCategory();
        });
    });

    //选择二级分类，显示三级分类，更新“您当前选择的是”
    $(".subCategoryItem").live("click", function () {
        var currentTag = $(this);
        $("#ThirdcategoryForC").load("/Product/ProductPublish/ThirdCategorys?cid=" + $(this).attr("data"),function () {
            $(".subCategoryItem").removeClass("active");
            currentTag.addClass("active");
            $("#SelectBrand").hide();
            RefreshSelectedCategory();
        });
    });

    //选择三级分类，清空显示品牌选择
    $(".thirdCategoryItem").live("click", function () {
        $(".thirdCategoryItem").removeClass("active");
        $(this).addClass("active");
        $("#SelectBrand").show();
        $("#SelectBrandText").val("");
        $("#RecommendBrands").load("/Product/ProductPublish/BrandsBySubCategory?c=" + $(this).attr("data"),function () {
            RefreshSelectedCategory();
        });
    });

    //品牌选择，显示推荐品牌
    $("#SelectBrandText").focus(function() {
        if($(this).val()=="") {
            $("#RecommendBrands").show();
        }
        else {
            $("#RecommendBrands").hide();
        }
    });

    //输入品牌，隐藏推荐
    $("#SelectBrandText").keyup(function () {
        RefreshSelectedCategory();
        if ($(this).val() == "") {
            $("#RecommendBrands").show();
        }
        else {
            $("#RecommendBrands").hide();
        }
    });

    var brandAppendedForc = false;
    $("#SelectBrandText").blur(function () {
        if ($(this).val() == "") {
            return;
        }
        var selectBrandId = GetBrandId($(this).val());
        $("#SelectedBrandId").val(selectBrandId);
        if (selectBrandId == -1) {
            $("#SelectBrandText").val("");
        }
        else if (!brandAppendedForc) {
            $("#SelectedCategory").append("<i>></i>" + $(this).val());
            brandAppendedForc = true;
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
    $("#SearchCategory").click(function() {
        if($("#SelectBrandTextInBrand").val()=="") {
            alert("请选择品牌");
        }
        else {
            var selectBrandId = GetBrandId($("#SelectBrandTextInBrand").val());
            $("#SelectedBrandIdForB").val(selectBrandId);

            $.post("/Product/ProductPublish/HaveSuggestedCategories?b=" + selectBrandId, function(data) {
                if (data) {
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
        $("#SelectBrandText").val($(this).html());
        $("#SelectedBrandId").val($(this).attr("data"));
        $("#RecommendBrands").hide();
        if (!brandAppendedForc) {
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
        max: 200,
        scrollHeight: 220
    });

    $("#SelectBrandTextInBrand").autocomplete(allBrands, {
        max: 200,
        scrollHeight: 220
    });

    //从分类选择的下一步
    $("#SubFromCategory").click(function() {
        var selectCategoryId = -1;
        if ($(".thirdCategoryItem.active") != undefined) {
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

    $("#SubFromCategoryProduct").click(function() {
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
    $("#SubFromUsed").click(function() {
        if ($("input[name=group]:checked").length > 0) {
            var categoryAndBrand = $("input[name=group]:checked").val().split("|");
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
            if (brandName == $(this).html()) {
                selectBrandId = $(this).attr("data");
                return;
            }
        });
        return selectBrandId;
    }
});