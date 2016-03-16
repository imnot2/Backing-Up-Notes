/*=======================ProductProperty.js===========================*/
var NewPropertyIndex = 1;
j$(function () {
    //    j$(".newAttrText").live('change', function () {
    //        if (j$(this).val() != "") {
    //            j$(this).prev().attr('checked', true);
    //            j$(this).parent().append('<input type="checkbox" class="newAttr" /><input type="text" style="width:40px" class="newAttrText" />');
    //        }
    //    });
    //    j$(".newAttr").live('click', function () {
    //        var propertyId = j$(this).attr("name");
    //        if (j$(this).attr('checked') == false) {
    //            j$(this).next().nextAll().remove();
    //        }
    //        else {
    //            j$(this).val("user_" + j$(this).next().val());
    //            if (j$(this).next().val() == "") {
    //                alert('请填写规格值');
    //                j$(this).attr('checked', false);
    //            }
    //            else {
    //                j$(this).parent().append('<input type="checkbox" class="newAttr" name="' + propertyId + '" /><input type="text" style="width:40px" class="newAttrText" />');
    //            }
    //        }
    //    });
    //    j$(".openPro").live('click', function () {
    //        if (j$(this).attr('checked') == false) {
    //            j$(this).parent().parent().children(".attributeId").children("input:checkbox").attr('checked', false);
    //            j$(this).parent().parent().children(".attributeId").children().attr("disabled", true);
    //        }
    //        else {
    //            j$(this).parent().parent().children(".attributeId").children().attr("disabled", false);
    //        }
    //    });
    //    j$(".openNewPro").live('click', function () {
    //        if (j$(this).attr('checked') == false) {
    //            j$(this).parent().parent().children(".attributeId").children("input:checkbox").attr('checked', false);
    //            j$(this).parent().parent().children(".attributeId").children().attr("disabled", true);
    //            j$(this).parent().parent().children(".newPropertyTd").children().attr("disabled", true);
    //            j$(this).parent().parent().nextAll().remove();
    //        }
    //        else {
    //            j$(this).parent().parent().children(".newPropertyTd").children().attr("disabled", false);
    //            j$(this).parent().parent().children(".attributeId").children().attr("disabled", false);
    //            var newProCount = j$('.openNewPro').length;
    //            j$(this).parent().parent().parent().append('<tr><td><input type="checkbox" class="openNewPro" id="NewProperty_' + newProCount + '" /><label for="NewProperty_' + newProCount + '">启用规格</label></td><td style="text-align:right" class="newPropertyTd"><input type="text" style="width:40px" class="newProperty" name="NewPropertyName_' + newProCount + '" disabled="disabled" />(<input type="text" style="width:40px" class="newUnit" name="NewPropertyUnit_' + newProCount + '" disabled="disabled" />)：</td><td style="text-align:left" class="attributeId"><input type="checkbox" class="newAttr" name="NewProperty_' + newProCount + '" disabled="disabled" /><input type="text" style="width:40px" class="newAttrText" disabled="disabled" /></td></tr>');
    //        }
    //    });
    j$("#saveProductProperty").click(function () {
        var data = j$('#AddProductPropertyDiv *').serialize();
        alert(data);
    });
    j$("#saveEditProductProperty").click(function () {
        var data = j$('#EditProductPropertyDiv *').serialize();
        alert(data);
    });

    j$(".CancleNew").live('click', function () {
        j$(this).parent().parent().remove();
    });

    j$(".AddNewBtn").live('click', function () {
        j$("#ProductPropertyTable").append('<tr><td style="text-align:right; width:100px" class="newPropertyTd"><input type="text" style="width:40px;color:#ccc" class="newProperty" value="属性名" name="NewPropertyName_' + NewPropertyIndex + '" />：</td><td style="text-align:left" class="attributeId"><input type="text" class="newAttrText" style="color:#ccc" value="属性内容" name="NewProperty_' + NewPropertyIndex + '" /> <a style="color:Red" class="CancleNew" href="javascript:void(0)">取消</a></td></tr>');
        NewPropertyIndex++;
    });

    j$(".newProperty").live('focus', function () {
        if (j$(this).val() == "属性名") {
            j$(this).val("");
            j$(this).css({ "color": "#000" });
        }
    });

    j$(".newAttrText").live('focus', function () {
        if (j$(this).val() == "属性内容") {
            j$(this).val("");
            j$(this).css({ "color": "#000" });
        }
    });

    j$(".newProperty").live('blur', function () {
        if (j$(this).val() == "") {
            j$(this).val("属性名");
            j$(this).css({ "color": "#ccc" });
        }
    });

    j$(".newAttrText").live('blur', function () {
        if (j$(this).val() == "") {
            j$(this).val("属性内容");
            j$(this).css({ "color": "#ccc" });
        }
    });
});

