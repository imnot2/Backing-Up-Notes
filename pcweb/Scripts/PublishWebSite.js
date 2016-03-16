/*=======================PublishWebSite.js===========================*/
j$(function () {
    //Theme1 -------------------------------------------
    j$(".bt_dialog").hover(function () { j$(this).addClass("ui-state-hover"); }, function () { j$(this).removeClass("ui-state-hover"); });
    j$('#BrandList').listnav({
        initLetter: 'all',
        includeAll: false,
        includeOther: false,
        flagDisabled: true,
        showCounts: false,
        noMatchText: '当前首字母没有品牌 ... ',
        cookieName: 'myBrandList',
        prefixes: ['xcasdasdas', 'asdasdczx'],
        extendClass: []
    });

    //Action1 -------------------------------------------
    j$("#mainCat").change(function () {
        var o = j$(this).val();
        var selectElement = document.getElementById("subCat");
        for (var i = selectElement.options.length - 1; i > 0; i--) {
            selectElement.remove(i);
        }
        if (o == 0) {
            selectElement.disabled = true;
            return false;
        }
        j$.ajax({
            type: "GET",
            url: "/ajax/getsubcat",
            data: "p=" + o,
            dataType: "json",
            success: function (msg) {
                if (msg.length > 0) {
                    selectElement.disabled = false;
                    for (var i = 0; i < msg.length; i++) {
                        selectElement.options.add(new Option(msg[i].Value, msg[i].Key));
                    }
                }
            }
        });
    });

    j$(".validationBox").validationEngine({ validationEventTriggers: "keyup" });

    j$("#mainCat").change(function () {
        j$("input#cateId").val(j$(this).val());
        getProductsNum(j$("input#siteId").val(), j$("input#brandId").val(), j$(this).val());
    });

    j$("#subCat").change(function () {
        if (j$(this).val() != 0) {
            j$("input#cateId").val(j$(this).val());
        }
        else {
            j$("input#cateId").val(j$("#mainCat").val());
        }
        getProductsNum(j$("input#siteId").val(), j$("input#brandId").val(), j$("input#cateId").val());
    });

    if (j$("#mainCat").val() != "0") {
        j$("input#cateId").val(j$("#mainCat").val());
    }
    if (j$("#subCat").val() != "0") {
        j$("input#cateId").val(j$("#subCat").val());
    }

    j$("#bntBroweBrand").click(function () {
        AttentionDialog("#BrandDialog", "#PadB");
    });
    j$("#BrandList a").click(function () {
        var brandId = j$(this).attr("charset");
        j$("#txtBrand").text(j$(this).text());
        j$("#cloBrand").removeClass("hidden").one("click", function () {
            j$(this).prev("span#txtBrand").empty();
            j$("input#brandId").val("0");
            j$(this).addClass("hidden");
            getProductsNum(j$("input#siteId").val(), 0, j$("input#cateId").val());
        });
        j$("input#brandId").val(brandId);
        getProductsNum(j$("input#siteId").val(), brandId, j$("input#cateId").val());
        j$("#BrandDialog,#BrandDialogShadow,#PadB").hide();
    });

    j$("#bntBroweSite").click(function () {
        ///选择商家
        AttentionDialog("#SiteDialog", "#PadB");
    });
    j$("ul#SiteList a").click(function () {
        ///确认选择的商家
        j$("#divhidden").removeClass("hidden");
        var val = j$(this).attr("charset");
        j$("span#txtSite").text(j$(this).text());
        j$("span#txtSite").attr('data', val);
        j$("#cloSite").removeClass("hidden").one("click", function () {
            //网站信息清空
            j$(this).prev("span#txtSite").empty();
            j$("input#siteId").val("0");
            //品牌信息清空
            j$("#txtBrand").empty();
            j$("input#brandId").val("0");
            //分类信息清空
            j$("#subCat").get(0).selectedIndex = 0;
            j$("#mainCat").get(0).selectedIndex = 0;
            j$("input#cateId").val("0");
            //清空产品数量
            j$("#productsNum").html("0");
            //隐藏层
            j$(this).addClass("hidden");
            j$("#divhidden").addClass("hidden");
        });
        j$("input#siteId").val(val);
        getProductsNum(val, j$("input#brandId").val(), j$("input#cateId").val());
        j$("#SiteDialog,#SiteDialogShadow,#PadB").hide();
    });

    j$("#btnPubDialog").click(function () {
        AttentionDialog("#PubDialog", "#PadB", ".PubDialogSub", ".validationBox");
    });
    j$("#bntPub").unbind("click").click(function () {

        var ServiceCharge = document.getElementById("ServiceCharge").value;
        var Freight = document.getElementById("Freight").value;
        //        var siteId = document.getElementById("siteId").value;
        j$('#siteId').val(j$('span#txtSite').attr('data'));
        if (ServiceCharge < 0 || ServiceCharge == "" || ServiceCharge > 100 || Freight < 0 || Freight == "") {
            alert("请填写正确的代购服务费率和单件商品运费。");
            return false;
        }
        else if (siteId == 0) {
            alert("请选择您要发布的商品所在的网站。");
            return false;
        }
        else if (j$("#productsNum").html() == "0") {
            alert("您选择的产品数为0，请重新选择。");
            return false;
        }
        else {
            j$("form#PublishWebSiteForm").submit();
        }
    });


    function getProductsNum(siteId, brandId, cateId) {
        j$.ajax({
            type: "GET",
            url: "/PublishProduct/GetProductsNum",
            data: "siteId=" + siteId + "&brandId=" + brandId + "&categoryId=" + cateId,
            success: function (msg) {
                j$("#productsNum").html(msg);
            }
        });
    }


    j$("td.btnBox div#zicBnt").bind("click", delPublish);
});

var delPublish = function () {
    if (confirm("确定删除？")) {
        var subform = document.getElementById("delFrom");
        subform.submit();
    }

}
