/*=======================DmsEditCatalogs.js===========================*/
$(function () {
    $('#SaveEditedCatalogs').click(function () {
        var subData = {
            GroupId: $('#GroupId').val(),
            Catalogs: getCatalogs()
        };
        if ($('input[name=openProCheck]:checked').val() == "0") {
            location.href = "/DMSProduct";
            return false;
        }
        if (subData.Catalogs.length == 0) {
            alert('请添加规格报价');
            return false;
        }
        var postUrl = '/DMSProduct/SaveAmendedCatalogs';
        $.ajax({
            url: postUrl,
            type: "POST",
            dataType: "json",
            data: $.toJSON(subData),
            contentType: 'application/json',
            success: function (data) {
                if (data.HasNewCatalogs) {
                    alert("您添加了新规格，请继续完善报价信息");
                    location.href = "/DMSProductAdd/AddStep3?fc=true&productsGroupId=" + data.GroupId;
                }
                else {
                    alert("修改成功");
                    location.href = "/DMSProduct";
                }
            }
        });
    })
})


