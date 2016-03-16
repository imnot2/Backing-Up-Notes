$m.load(['widget/comfirm','ui/json'], function (pop,JSON) {
    //导出订单详细信息
    $("#btnExportOrderInfo").click(function () {
        if (checkInput()) {
            var searchText = $("#searchText").val();
            if (searchText == $("#searchText").attr('placeholder')) {
                searchText = "";
            }
            var params = {
                SearchText: searchText,
                DateType: $("#searchDateType").val(),
                StartDate: $("#startDate").val(),
                EndDate: $("#endDate").val() + " 23:59:59",
                OrderTypes: getOrderTypes(),
                OrderStates: getOrderStates()
            };
            $.ajax({
                url: "/ExportTool/GetExcelOfOrderInfo",
                type: "POST",
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                async: false,
                success: function (objData) {
                    if (objData != null) {
                        if (objData.IsSuccess == true) {
                            $("input[name=searchTextO]").val(params.SearchText);
                            $("input[name=dateTypeO]").val(params.DateType);
                            $("input[name=startDateO]").val(params.StartDate);
                            $("input[name=endDateO]").val(params.EndDate);
                            $("input[name=orderTypesO]").val(getStrOrderTypes());
                            $("input[name=orderStatesO]").val(getStrOrderStates());

                            $('#formExportExcelOfOrderInfo').submit();
                        } else {
                            pop.alertPop(objData.MsgTitle, objData.Msg, "warning");
                        }
                    } else {
                        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Failure, ResourceJS.Order_ExportTool_ExportOrderInfo_js_ExportFail, "error");
                    }
                }
            });
        }
    });

    //导出商品信息
    $("#btnExportProductInfo").click(function () {
        if (checkInput()) {
            var searchText = $("#searchText").val();
            if (searchText == $("#searchText").attr('placeholder')) {
                searchText = "";
            }
            var params = {
                SearchText: searchText,
                DateType: $("#searchDateType").val(),
                StartDate: $("#startDate").val(),
                EndDate: $("#endDate").val() + " 23:59:59",
                OrderTypes: getOrderTypes(),
                OrderStates: getOrderStates()
            };
            $.ajax({
                url: "/ExportTool/GetExcelOfProductInfo",
                type: "POST",
                data: JSON.stringify(params),
                dataType: "json",
                contentType: 'application/json;charset=utf-8',
                async: false,
                success: function (objData) {
                    if (objData != null) {
                        if (objData.IsSuccess == true) {
                            $("input[name=searchTextP]").val(params.SearchText);
                            $("input[name=dateTypeP]").val(params.DateType);
                            $("input[name=startDateP]").val(params.StartDate);
                            $("input[name=endDateP]").val(params.EndDate);
                            $("input[name=orderTypesP]").val(getStrOrderTypes());
                            $("input[name=orderStatesP]").val(getStrOrderStates());

                            $('#formExportExcelOfProductInfo').submit();
                        } else {
                            pop.alertPop(objData.MsgTitle, objData.Msg, "warning");
                        }
                    } else {
                        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Failure, ResourceJS.Order_ExportTool_ExportOrderInfo_js_ExportFail, "error");
                    }
                }
            });
        }
    });

    //
    if ($.datepicker) {
        $.datepicker.regional['zh-CN'] =
        {
            clearText: '清除',
            clearStatus: '清除已选日期',
            closeText: '关闭',
            closeStatus: '不改变当前选择',
            prevText: '<上月',
            prevStatus: '显示上月',
            nextText: '下月>',
            nextStatus: '显示下月',
            currentText: '今天',
            currentStatus: '显示本月',
            monthNames: [
                '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'
            ],
            monthNamesShort: [
                '一', '二', '三', '四', '五', '六',
                '七', '八', '九', '十', '十一', '十二'
            ],
            monthStatus: '选择月份',
            yearStatus: '选择年份',
            weekHeader: '周',
            weekStatus: '年内周次',
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
            dayStatus: '设置 DD 为一周起始',
            dateStatus: '选择 m月 d日, DD',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            initStatus: '请选择日期',
            isRTL: false
        };
        var culture = ResourceJS.CurrentLanguage || "";
        if (culture !== "" && culture.toLocaleLowerCase() === "zh-cn")
            $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
        $("[name=startDate]").datepicker();
        $("[name=endDate]").datepicker();
    }

    $("#orderStateAll").change(function (event) {
        $("[name=OrderState]").attr("checked", $(this).attr("checked"))
    });
    $("#orderTypeAll").change(function (event) {
        $("[name=OrderType]").attr("checked", $(this).attr("checked"))
    });
    $("#searchDateType").change(function (event) {
        //清空选择和作废
        $("#orderStateAll,#orderTypeAll,[name=OrderType],[name=OrderState]").attr("disabled", false).attr("checked", false);
       
        var val = this.value;
        if (val == 2 || val == 3 || val == 4) {
            autoSelect(val);
        }
    });

    function autoSelect(type) {
        switch (type) {
            case "2":
                select({
                    selecteds: [2, 17],
                    disableds: [1]
                });
                break;
            case "3":
                select({
                    selecteds: [3, 4],
                    disableds: [1, 2, 101, 16, 17]
                });
                break;
            case "4":
                select({
                    selecteds: [16],
                    disableds: [1, 2, 101]
                }, {
                    selecteds: [1, 2],
                    disableds: [0]
                });
                break;
        }
    }

    function select(states, types) {
        var OrderType = $("[name=OrderType]"),
             OrderState = $("[name=OrderState]");//订单状态
        var exec = function(execs, sets, attr) {
            if (execs)
                for (var i = 0; i < execs.length; i++) {
                    sets.filter("[value=" + execs[i] + "]").attr(attr, true)
                }
        };
        exec(states.selecteds, OrderState, "checked");
        states.disableds && exec(states.disableds, OrderState, "disabled");

        if (types) {
            exec(types.selecteds, OrderType, "checked");
            types.disableds && exec(types.disableds, OrderType, "disabled");
        }

    }

    function checkInput() {
        if ($("#startDate").val() == $("#startDate").attr('placeholder') || $("#startDate").val() == "") {
            pop.alertPop(ResourceJS.Order_ExportTool_ExportOrderInfo_js_SearchTitle, ResourceJS.Order_ExportTool_ExportOrderInfo_js_RequiredData, "error");
            return false;
        }
        if ($("#endDate").val() == $("#endDate").attr('placeholder') || $("#endDate").val() == "") {
            pop.alertPop(ResourceJS.Order_ExportTool_ExportOrderInfo_js_SearchTitle, ResourceJS.Order_ExportTool_ExportOrderInfo_js_RequiredData, "error");
            return false;
        }
        var orderTypes = getOrderTypes();
        if ($("#orderTypeAll").attr("checked") == false && orderTypes.length == 0) {
            pop.alertPop(ResourceJS.Order_ExportTool_ExportOrderInfo_js_SearchTitle, ResourceJS.Order_ExportTool_ExportOrderInfo_js_RequiredOrderType, "error");
            return false;
        }
        var orderStates = getOrderStates();
        if ($("#orderStateAll").attr("checked") == false && orderStates.length == 0) {
            pop.alertPop(ResourceJS.Order_ExportTool_ExportOrderInfo_js_SearchTitle, ResourceJS.Order_ExportTool_ExportOrderInfo_js_RequiredOrderState, "error");
            return false;
        }
        return true;
    }

    function getOrderTypes() {
        var r = [];
        $("input[name=OrderType]:checked").each(function() {
            r.push($(this).val());
        });
        return r;
    }

    function getOrderStates() {
        var r = [];
        $("input[name=OrderState]:checked").each(function () {
            r.push($(this).val());
        });
        return r;
    }
    function getStrOrderStates() {
        var orderStates = "";
        $("input[name=OrderState]:checked").each(function () {
            orderStates = orderStates + $(this).val() + ","
        });
        return orderStates;
    }
    function getStrOrderTypes() {
        var orderTypes = "";
        $("input[name=OrderType]:checked").each(function () {
            orderTypes = orderTypes + $(this).val() + ","
        });
        return orderTypes;
    }
});