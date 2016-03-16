/*=======================AddProjectStep1.js===========================*/

j$(function () {
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

    j$("#bntBroweBrand").click(function () {
        AttentionDialog("#AttentionDialog", ".bntAttentionClose", "#PadB");
    });
});

j$(document).ready(function () {
    j$("#mainCat").change(function () {
        FillSubCat(j$(this).val());
    });

    j$(".yq").click(function () {
        document.getElementById("Brand").value = j$(this).html();
        document.getElementById("txtBrand").value = j$(this).html();
        document.getElementById("BrandId").value = j$(this).attr("charset");
        j$("#AttentionDialogShadow,#AttentionDialog,#PadB").hide();
    });

    j$(".bntAttentionClose").click(function () {
        j$("#AttentionDialogShadow,#AttentionDialog,#PadB").hide();
    });

    j$("#next").click(function () {
        if (j$("#subCat").val() == "0") {
            alert("请选择分类");
        }
        else if (j$("#txtBrand").val() == "") {
            alert("请选择品牌");
        }
        else if (j$("#txtProduct").val() == "") {
            alert("请填写单品名称");
        }
        else {
            var mainCat = document.getElementById("mainCat");
            var subCat = document.getElementById("subCat");
            document.getElementById("HMainCategory").value = mainCat.options[mainCat.selectedIndex].text;
            document.getElementById("HSubCategoryName").value = subCat.options[subCat.selectedIndex].text;
            j$("#ProjectForm").submit();
        }
    });
});
j$(function () {
    FillSubCat(j$("#mainCat").val());
});


function FillSubCat(o) {
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
                var HsubCategory = document.getElementById("HsubCat").value;
                var key = 0;
                for (var i = 0; i < msg.length; i++) {
                    if (HsubCategory == msg[i].Key) {
                        key = i + 1;
                    }
                    selectElement.options.add(new Option(msg[i].Value, msg[i].Key));
                }
                selectElement.selectedIndex = key;
            }
        }
    });
}
    
