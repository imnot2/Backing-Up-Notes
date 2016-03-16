/*=======================index.js===========================*/
j$(function () {

    var isDatePick = false;
    var dptraget;
    j$("a#pickdate").click(function () {
        var DP = j$("#datepicker");
        if (!isDatePick) {
            DP.datepicker({ changeMonth: true, changeYear: true, minDate: 0 });
            isDatePick = true;
        }
        AttentionDialog("#DPAttentionDialog", "#PadB");

        dptraget = j$("select#odata");
        j$("#DPAttentionDialog .Close").bind("click", function () {
            dptraget.get(0).selectedIndex = 0;
        });
        j$("#bntDPSub").one("click", function () {
            var day = j$("td a.ui-state-active", DP).text();
            var month = parseInt(j$("select.ui-datepicker-month", DP).val()) + 1;
            var year = j$("select.ui-datepicker-year", DP).val();
            var dataval = year + "/" + month + "/" + day;
            var datatext = year + "年" + month + "月" + day + "日";
            dptraget.addOption(datatext, dataval);
            dptraget.get(0).value = dataval;
        });
    });
});
j$(function () {
    j$(".buttonDelete").click(function () {
        if (confirm("确认删除指定的代购设置吗？")) {
            var id = j$(this).parent().find('input[type="hidden"]').val();
            var form = j$('#formRemovePublish');
            form.find('input[name="publishId"]').val(id);
            form.submit();
        }
    });
});
j$(function () {
    j$("#mainCat").change(function () {
        var o = j$(this).val();
        //            var selectElement = document.getElementById("subCat");
        //            for (var i = selectElement.options.length - 1; i > 0; i--) {
        //                selectElement.remove(i);
        //            }
        //            if (o == 0) {
        //                selectElement.disabled = true;
        //                return false;
        //            }

        j$.ajax({
            type: "GET",
            url: "/ajax/getsubcat",
            data: "p=" + o,
            dataType: "json",
            success: function (msg) {
                var sub = j$("#subCat");
                sub.children().remove();
                if (msg.length > 0) {
                    sub.attr('disable', false);
                    for (var i = 0; i < msg.length; i++) {
                        sub.append('<option value="' + msg[i].Key + '">' + msg[i].Value + '</option>');
                    }
                }
            }
        });
    }).change();

});
j$(function () {
    j$('#buttonAddSellerProductAgent').click(function () {
        var form = j$('form#formAddSellerProductAgent');
        j$.ymatoupost(form.attr('action'), form.serialize(), function (data) {
            if (data.success == "1") {
                alert('发布代购设置成功');
                location.reload();
            } else {
                alert(data.message);
            }
        }, 'json');
    });
});

