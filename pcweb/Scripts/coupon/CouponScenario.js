/*=======================CouponScenario.js===========================*/
String.prototype.format = function() {
    var args = arguments;
    return this.replace( /\{(\d+)\}/g ,
        function(m, i) {
            return args[i];
        });
};

var sellerHtml = '<tr><td value="{0}">{1}<input type="hidden" value="{2}"/></td><td><span class="delete"><a href="javascript:void(0)">删除</a></span></td></tr>';
var productHtml = '<tr><td value="{0}">{1}<input type="hidden" value="{2}"/></td><td><span><a href="/promptgood-{3}" target="_black">查看</a></span></td><td><span class="delete"><a href="javascript:void(0)">删除</a></span></td></tr>';    

function addSeller() {

    var text_input = $(this).closest("div").find("input[type=text]");

    var loginId = text_input.val();

    if (loginId == "") {
        $("#type_sellers .msg span").text("请输入用户名后，再点击确定按钮");
        return;
    }

    var data = '{loginId:"' + loginId + '"}';

    if ($("#type_sellers table td[value='" + loginId + "']").length > 0) {
        $("#type_sellers .msg span").text("已存在相同的用户名，请重新输入");
        return;
    }

    $.ajax({
        url: "/Admin/CouponManage/GetSellerId",
        dataType: "json",
        async: true,
        data: data,
        success: function (result) {
            if (result.id != null) {
                //查询正确的结果
                $("#type_sellers table").append(sellerHtml.format(loginId, loginId, result.id));

                //清除输入框
                text_input.val("");

                //清除消息
                $("#type_sellers .msg span").text("");
            }
            else {
                $("#type_sellers .msg span").text(result.msg);
            }
        }
    });
}


function addProduct() {

    var text_input = $(this).closest("div").find("input[type=text]");

    var productLink = text_input.val();

    if (productLink == "") {
        $("#type_products .msg span").text("请输入商品链接后，再点击确定按钮");
        return;
    }

    var data = '{productLink:"' + productLink + '"}';

    
    if ($("#type_products table td[value='" + productLink + "']").length > 0) {

        $("#type_products .msg span").text("已存在相同的商品，请重新输入");
        
        return;
    }

    $.ajax({
        url: "/Admin/CouponManage/GetProductName",
        dataType: "json",
        async: true,
        data: data,
        success: function (result) {
            if (result.title != null) {
                //查询正确的结果
                $("#type_products table").append(productHtml.format(productLink, result.title, result.id, result.id));

                //清除输入框
                text_input.val("");

                $("#type_products .msg span").text("");
            }
            else {
                $("#type_products .msg span").text(result.msg);
            }
        }
    });
}

function setType(value) {
    //隐藏
    $(".type_content").css("display", "none");
    $(".type input[name=scenario_type]").closest("span").removeClass("current");
    $(".type input[name=scenario_type]").removeAttr("checked");

    //显示当前
    $("#type_" + value).css("display", "block");
    $(".type input[value=" + value + "]").attr("checked", "checked");
    $(".type input[name=scenario_type][value=" + value + "]").eq(0).closest("span").addClass("current");
}

//根据数据设置页面选项
function setData(data) {

    var value = data.ScenarioType;
    
    //设置类型多选框
    setType(value);

    if (value == "all") {
        setCheckBox("Domestic", data.Domestic, "all");
        setCheckBox("Direct", data.Direct, "all");
        setCheckBox("SailProtected", data.SailProtected, "all");
        setCheckBox("Purchasing", data.Purchasing, "all");

//        if (data.Spot) {
//            $("#coupon_scenario #type_all .direct").css("display", "inline-block");
//            $("#coupon_scenario #type_all .protected").css("display", "inline-block");
//        }
//        else {
//            $("#coupon_scenario #type_all .direct").css("display", "none");
//            $("#coupon_scenario #type_all .protected").css("display", "none");
//        }
    }
    else if (value == "categories") {

        setCheckBox("Domestic", data.Domestic, "categories");
        setCheckBox("Direct", data.Direct, "categories");
        setCheckBox("SailProtected", data.SailProtected, "categories");


        $("#cate_type option").removeAttr("selected");
        $("#cate_type option[value=" + data.CateType + "]").attr("selected", "selected");

        //设定CheckBox
        if (data.CateType == "categories") {
            var categoies = data.Categories.split(",");
            for (var i = 0; i < categoies.length; i++) { 
                var cate = categoies[i];

                $("#categories input[type=checkbox][value=" + cate + "]").attr("checked", "checked");
            }

            var parent_cate = $("#categories input[type=checkbox][value=" + categoies[0] + "]").closest("div.item").attr("parent_key");

            setFirstCateSelected(parent_cate);
        }
        else {
            var brands = data.Brands.split(",");
            for (var i = 0; i < brands.length; i++) {
                var brand = brands[i];
                $("#brands input[type=checkbox][value=" + brand + "]").attr("checked", "checked");
            }

            var parent_brand = $("#brands input[type=checkbox][value=" + brands[0] + "]").closest("div.item").attr("parent_key");

            setFirstBrandSelected(parent_brand);
        }
    }
    else if (value == "sellers") {

        //下单器可用
        if (data.Purchasing) {
            $(".order_tool input[name=Purchasing]").attr("checked", "checked");
        }

        $("#type_sellers table").append(sellerAppendHtml);
    }
    else if (value == "products") {

        $("#type_products table").append(productsAppendHtml);
    }

    $("#coupon_scenario :input:not(input[type=button])").attr("disabled", "disabled");
}

function setFirstCateSelected(cate_id) {

    $("#categories .item").css("display", "none");
    $("#categories .item[parent_key=" + cate_id + "]").css("display", "block");

    $("#categories table span a").removeClass("current");
    $("#categories table span[value=" + cate_id + "] a").addClass("current");
}

function setFirstBrandSelected(brand_id) {

    $("#brands .item").css("display", "none");
    $("#brands .item[parent_key=" + brand_id + "]").css("display", "block");

    $("#brands table span a").removeClass("current");
    $("#brands table span[value=" + brand_id + "] a").addClass("current");
}

function setCheckBox(name, value, type) {

    var element = $("#type_" + type + " input[name=" + name + "]");
    if (value) {
        element.attr("checked", "checked");
    }
    else {
        element.removeAttr("checked", "checked");
    }
}

function getData() {

    var typeValue = $(".type input[type=radio][name=scenario_type]:checked").val();

    var data = {
        ScenarioType : "",
        Domestic: false,
        Direct: false,
        SailProtected: false,
        Purchasing: false,
        CateType: "",
        Categories : "",
        Brands : "",
        Sellers : "",
        Products : ""
    };

    if (typeValue == "all") {
        data.ScenarioType = "all";

        data.Domestic = $("#type_all input[name=Domestic]").attr("checked");
        data.Direct = $("#type_all input[name=Direct]").attr("checked");
        data.SailProtected = $("#type_all input[name=SailProtected]").attr("checked");
        data.Purchasing = $("#type_all input[name=Purchasing]").attr("checked");
    }
    else if (typeValue == "categories") {

        data.ScenarioType = "categories";

        data.Domestic = $("#type_categories input[name=Domestic]").attr("checked");
        data.Direct = $("#type_categories input[name=Direct]").attr("checked");
        data.SailProtected = $("#type_categories input[name=SailProtected]").attr("checked");
        //data.Purchasing = $("#type_categories input[name=Purchasing]").attr("checked");

        data.CateType = $("#cate_type").val();

        if (data.CateType == "categories") {

            var categories = "";

            //检查所有选中的分类
            $("#categories input[type=checkbox]:checked:not([name=allselect])").each(function () {
                categories += $(this).val() + ",";
            });

            data.Categories = categories;
        }
        else if (data.CateType == "brands") {

            var brands = "";

            //检查所有选中的品牌
            $("#brands input[type=checkbox]:checked:not([name=allselect])").each(function () {
                brands += $(this).val() + ",";
            });

            data.Brands = brands;
        }
    }
    else if (typeValue == "sellers") {

        data.ScenarioType = "sellers";

        var sellers = "";

        $("#type_sellers input[type=hidden]").each(function () {
            sellers += $(this).val() + ",";
        });

        data.Sellers = sellers;
    }
    else if (typeValue == "products") {

        data.ScenarioType = "products";
        var products = "";

        $("#type_products input[type=hidden]").each(function () {
            products += $(this).val() + ",";
        });

        data.Products = products;
    }

    return data;
}

function submit() {
    
    $(this).attr("disabled", "disabled");
    var data = getData();
    $.ajax({
        url: "/Admin/CouponManage/SaveCouponScenario",
        dataType: "json",
        type: "post",
        async: false,
        data: $.toJSON(data),
        success: function (result) {
            window.location.href = "/Admin/CouponManage/CreateCoupon?" + result.param;
        },
        error: function () {
            alert("提交失败，请重试");
            $(this).removeAttr("disabled");
        }
    });
}

function setDefault() {

    $("#categories .item").eq(0).css("display", "block");
    $("#categories table span a").eq(0).addClass("current");

    $("#brands .item").eq(0).css("display", "block");
    $("#brands table span a").eq(0).addClass("current");
}

function setCateDropDown(value) {
    if (value == "categories") {
        $("#categories").css("display", "block");
        $("#brands").css("display", "none");
    }
    else {
        $("#categories").css("display", "none");
        $("#brands").css("display", "block");
    }
}

$(function () {

    //绑定类型选择事件
    $("#coupon_scenario .type input[name=scenario_type]").bind("click", function () {
        value = $(this).val();

        setType(value);
    });

    //绑定下拉框事件
    $("#cate_type").bind("change", function () {
        var value = $("#cate_type").val();
        setCateDropDown(value);
    });

    //二级分类控制
    $(".cate_type table span").live("click", function () {
        var cateId = $(this).attr("value");
        //隐藏其他分类

        var cate_type = $(this).closest(".cate_type");

        cate_type.find(".item").css("display", "none");
        cate_type.find("table span a").removeClass("current");

        //显示当前分类
        cate_type.find(".item[parent_key=" + cateId + "]").css("display", "block");
        $(this).find("a").addClass("current");
    });

    //绑定全选按钮
    $("#type_categories input[name=allselect][type=checkbox]").live("click", function () {

        var allChecked = $(this).closest("div.item").find("input[type=checkbox]");
        if ($(this).attr("checked")) {
            allChecked.attr("checked", "checked");
        }
        else {
            allChecked.removeAttr("checked");
        }
    });


    $("#type_sellers input[type=button]").bind("click", addSeller);
    $("#type_sellers td span.delete").live("click", function () {
        $(this).closest("tr").remove();
    });

    //指定商品
    $("#type_products input[type=button]").bind("click", addProduct);
    $("#type_products td span.delete").live("click", function () {
        $(this).closest("tr").remove();
    });

    $("#btn input[type=button]").bind("click", submit);

    $("#return input[type=button]").bind("click", function () {
        //history.back();
        window.location.href = document.referrer;
    });

    $("#coupon_scenario span.stop input[type=checkbox]").bind("click", function () {
        var current = $(this).closest("div.alltype");

        if (current.find("span.stop input").attr("checked")) {
            current.find("span.direct").css("display", "inline");
            current.find("span.protected").css("display", "inline");
        }
        else {
            current.find("span.direct").css("display", "none");
            current.find("span.protected").css("display", "none");
            current.find("span.direct input").removeAttr("checked");
            current.find("span.protected input").removeAttr("checked");
        }
    });

    //初始化数据
    initData();
});
