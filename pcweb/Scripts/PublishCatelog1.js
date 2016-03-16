/*=======================PublishCatelog1.js===========================*/
j$(function() {
    //Theme1 -------------------------------------------
    j$(".bt_dialog").hover(function() { j$(this).addClass("ui-state-hover") }, function() { j$(this).removeClass("ui-state-hover") });
    
    j$('#BrandList').listnav({
        initLetter: 'hot',
        includeAll: false,
        includeOther: false,
        flagDisabled: true,
        showCounts: true,
        noMatchText: '当前首字母没有品牌 ... ',
        cookieName: 'myBrandList',
        prefixes: ['xcasdasdas', 'asdasdczx'],
        extendClass: ['hot']
    });

    //Action1 -------------------------------------------
    j$("#mainCat").change(function() {
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
            success: function(msg) {
                if (msg.length > 0) {
                    selectElement.disabled = false;
                    for (var i = 0; i < msg.length; i++) {
                        selectElement.options.add(new Option(msg[i].Value, msg[i].Key));
                    }
                }
            }
        });
    });

    j$("#mainCat").change(function() {
        j$("input#cateId").val(j$(this).val());
    });
    j$("#subCat").change(function() {
        j$("input#cateId").val(j$(this).val());
    });
    if(j$("#mainCat").val() != "0"){
        j$("input#cateId").val(j$("#mainCat").val());
    }
    if(j$("#subCat").val() != "0"){
        j$("input#cateId").val(j$("#subCat").val());
    }

    j$("#bntBroweBrand").click(function() {
        AttentionDialog("#AttentionDialog", ".bntAttentionClose", "#PadB");
    });
    j$("#BrandList a").click(function() {
        var val = j$(this).attr("charset");
        j$("#txtBrand").text(j$(this).text());
        j$("#cloBrand").removeClass("hidden").one("click",function(){
            j$(this).prev("span#txtBrand").empty();
            j$("input#brandId").val("0");
            j$(this).addClass("hidden");
        });
        j$("input#brandId").val(val);
        j$("#AttentionDialog,#AttentionDialogShadow,#PadB").hide();
    });
    j$("#btnSearchProduct").click(function() {
        j$("form#GetProductsByConditionsForm").submit();
    });
});
