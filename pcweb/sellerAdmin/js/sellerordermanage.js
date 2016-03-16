$m.load(['widget/layerbox', 'ui/form/datepicker'], function (LayerBox, datepicker) {
    /**
       商家后台订单模块  cpx 2014年7月4日 
    **/
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });
    //layerbox.alert('#wndCancelOrder')
    //layerbox.close();
    //datepicker({
    //    cont: 'st',
    //    trigger: 'st',
    //    lang: 'cn',
    //    inputField: 'st',
    //    dateFormat: '%Y-%m-%d %H-%M',
    //    showTime: true,
    //    onBlur: function () {
    //        this.hide()
    //    },
    //    onSelect: function (a) {
    //        console.log(a)
    //        this.hide()
    //    }
    //});
    CancelOrder();
    EditPrice();
    BatchAcceptOrder();
    BatchDelayReceiveDate();
    DelayOrder();
    Delivery();
    ChangeAddress();
    Refund();
    Evaluate();
    AcceptSingleOrder();
    addRemarks();
    $.datepicker.regional['zh-CN'] =  
  {
      
      clearText: '清除', clearStatus: '清除已选日期',  
      closeText: '关闭', closeStatus: '不改变当前选择',  
      prevText: '<上月', prevStatus: '显示上月',  
      nextText: '下月>', nextStatus: '显示下月',  
      currentText: '今天', currentStatus: '显示本月',  
      monthNames: ['一月','二月','三月','四月','五月','六月',  
      '七月','八月','九月','十月','十一月','十二月'],  
      monthNamesShort: ['一','二','三','四','五','六',  
      '七','八','九','十','十一','十二'],  
      monthStatus: '选择月份', yearStatus: '选择年份',  
      weekHeader: '周', weekStatus: '年内周次',  
      dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
      dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
      dayNamesMin: ['日','一','二','三','四','五','六'],  
      dayStatus: '设置 DD 为一周起始', dateStatus: '选择 m月 d日, DD',  
      dateFormat: 'yy-mm-dd', firstDay: 1,  
      initStatus: '请选择日期', isRTL: false  
  }
   
    
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);  
    $("[name=st]").datepicker();
    $("[name=et]").datepicker();
    //绑定弹窗功能
    $("a[plugin=pop]").each(function () {
        var $this = $(this),
            href = $this.attr("href");
        $this.click(function (e) {
            e.preventDefault();
            layerbox.alert(href);
        });        
    });

    allSelect($("[name=selAll]"), "no");
    /**
    * @name全选事件
    * @param ctrlEle     {element} 控制对象
    * @param checkBoxName {string} checkBox name 值 
    * @param isReverse {Boolen} 是否反选 默认：false
    */
    function allSelect(ctrlEle, checkBoxName, reverse) {
        ctrlEle.live("click", function () {
            var checked = this.checked & !reverse;
            ctrlEle.attr("checked", checked);
            $("[name=" + checkBoxName + "]").attr("checked", checked);
        });
    }

    //用户评价
    function Evaluate() {
        $("a[name='ShowEvaluate']").click(function () {
            var selTr = $(this).parent().parent().parent();
        var buyerName = $(selTr).find("td[name='buyerVal']").text();
        $("b[name='BuyerName']").text(buyerName);
            var orderIdVal = $(selTr).find("td[name='OrderIdVal']").find("a").text().trim();
            var postdata = JSON.stringify({ 'orderId': orderIdVal });
            var canSellerReply = $(selTr).find("div[name='CanSellerReply']").text().trim();
            $("div[name='CanReply']").text(canSellerReply);
            $("div[name='orderId']").text(orderIdVal);

            $.ajax({
                url: '/Order/ShowOrderCreditDetail',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.success) {
                        $("div[name='CreditServiceRange']").text(data.fPoint + "分");
                        var point = "";
                    switch (data.iPoint3) {
                        case 1:
                                point = "差评";
                                break;
                        case 2:
                                point = "中评";
                                break;
                        case 3:
                                point = "好评";
                                break;
                        }
                    $("div[name='CreditScoreRange']").text(point);

                    $("span[name='CreditUniformityRange']").text(data.fPoint2 + "分");
                    $("span[name='CreditDescript']").text(data.sDescription);
                    $("span[name='FinalDate']").text(data.dUpdateTime);
                    $("input[name=creditId]").val(data.iCreditDetailId);
                        var isCanReply = $("div[name='CanReply']").text();
                        if (isCanReply == "True") {
                            $("#lblMyExplain").hide();
                        }
                        else {
                            if (data.sSellerReply != "" && data.sSellerReply != undefined) {
                                $("#lblMyExplain span").text(data.sSellerReply);
                            }
                            $("#txtExplain").hide();
                        }
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('查看卖家订单评论失败,请联系客服');
                }
            });
            $("button[name='btnEvaluate']").click(function () {
                var creditId = $("input[name=creditId]").val();
                var replyStr = $("textarea[name='txtExplain']").val();
                if (!replyStr) {
                    alert("回复内容不能为空");
                    return;
                }
                if (replyStr.length > 250) {
                    alert("回复内容不能超过250字");
                    return;
                }
                var saveData = JSON.stringify({ 'iCreditDetailId': creditId, 'sSellerReply': replyStr, 'dSellerReplyUpdateTime': Date.now });
                $.ajax({
                    url: '/Order/SaveOrderCreditDetail',
                    data: saveData,
                    type: "post",
                    async: true,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data && data.result && data.result == "true") {
                            alert(data.msg);
                            window.location.reload();
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('保存卖家订单评论解释失败,请联系客服');
                    }
                });
            });
        });
    }

    //退款
    function Refund() {
        $("a[name='Refund']").click(function () {
            //清除错误信息
            ariseErr($("input[name='txtRefundAmount']"), $("#WndRefund").find(".error-text"), "");

           // var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(this).attr("data-OrderId")//$(selTr).find("td[name='OrderIdVal']").text().trim() || $("#orderId").text().trim();
            var postdata = JSON.stringify({ "item": orderIdVal }) //{ item : orderIdVal };
            $("div[name='orderId']").text(orderIdVal);
            $.ajax({
                url: '/Order/SellerRefund',
                data: postdata,
                type: "post",
                async: true,
                dataType: "json",
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.Success == "true" || data.Success) {
                        $("#BuyerName").val(data.BuyerName);
                        $("[name=lastRefund]").val(data.LastRefund);
                        
                        $("input[name='txtRefundAmount']").val("0.00");
                        var selTr = $(this).parent().parent().parent();
                        var orderIdVal = $(selTr).find("td[name='OrderIdVal']").find("a").text().trim();
                        $("div[name='OrderIdVal']").text(orderIdVal);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('卖家退款失败,请联系客服');
                }
            });
        });
        $("button[name='btnRefund']").click(function () {
            var txtRefundAmount = $("input[name='txtRefundAmount']");
            var refundAmount = txtRefundAmount.val();
            var orderId = $("div[name='orderId']").text();
            var errText = $("#WndRefund").find(".error-text");
            var userName = $("#BuyerName").val();
            var lastRefund = $("[name=lastRefund]").val();

            if (!valiNumberFormate(refundAmount)) {
                ariseErr(txtRefundAmount, errText, "输入格式不正确，请重新输入。");
                txtRefundAmount.val("0.00");
                return;
            }
            if (confirm(refundAmount + "元退款将实时退回到" + userName + "用户的洋码头账户中。\n确定退款吗？")) {
                if (isNaN(refundAmount) || parseFloat(lastRefund) < parseFloat(refundAmount) || parseFloat(refundAmount) <= 0) {
                    ariseErr(txtRefundAmount, errText, "退款金额不能大于订单剩余金额，请填写正确的退款金额。");
                    return;
                }
                else {
                    var refundData = JSON.stringify({ 'operateOrderId': orderId, 'refund': refundAmount, 'lastRefund': lastRefund });
                    $.ajax({
                        url: '/Order/SaveSellerRefund',
                        data: refundData,
                        type: "post",
                        async: true,
                        cache: false,
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.result == "true" || data.result) {
                                alert(data.msg);
                                window.location.reload();
                            } else {
                                alert(data.msg);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert('卖家退款失败,请联系客服');
                        }
                    });
                }
            }
        });
    }

    //修改收货人地址
    function ChangeAddress() {
        var telePhone = "", phone;
        $("a[name='ChangeAddress']").click(function () {
            
           // var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(this).attr("data-OrderId")//$(selTr).find("td[name='OrderIdVal']").find("a").text().trim();

            $("div[name='orderId']").text(orderIdVal);
            var postdata = JSON.stringify({ 'orderId': orderIdVal });
            $.ajax({
                url: '/Order/SellerChangeAddress',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data != undefined) {
                        $("input[name='txtReceieverName']").val(data.Receiver);                       
                        $("textarea[name='txtStreetAddress']").val(data.Address);
                        $("input[name='txtPostCode']").val(data.PostCode);
                        $("input[name='txtContact']").val(data.Phone ? data.Phone : data.Telephone);
                        $("select[name='selContact']").val(data.Phone ? 1 : 0);
                        telePhone = data.Telephone;
                        phone = data.Phone;
                        $("#ChangeAddressArea").jChinaArea({
                            aspnet: true,
                            s1: data.Province, //默认选中的省名
                            s2: data.City, //默认选中的市名
                            s3: data.Region//默认选中的县区名
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('修改地址失败,请联系客服');
                }
            });

            $("select[name='selContact']").change(function () {
                var selVal = $(this).val();
                if (selVal == "0") {
                    $("input[name='txtContact']").val(phone);
                } else {
                    $("input[name='txtContact']").val(telePhone);
                }
            });
            $("button[name='btnConfirm']").click(function () {
                var receieverName = $("input[name='txtReceieverName']").val();
                var province = $("select[name='selProvince']").find("option:selected").text();
                var city = $("select[name='selCity']").find("option:selected").text();
                var region = $("select[name='selArea']").find("option:selected").text();
                var address = $("textarea[name='txtStreetAddress']").val();
                var postCode = $("input[name='txtPostCode']").val();
                var phone = $("input[name='txtContact']").val();
                var orderId = $("div[name='orderId']").text();
                if (receieverName == "") {
                    alert("请填写收件人");
                    return;
                }
                if (province == "无") {
                    alert("请选择省市区");
                    return;
                }
                if (city == "无") {
                    alert("请选择省市区");
                    return;
                }
                if (region == "无") {
                    alert("请选择省市区");
                    return;
                }
                if (address == "") {
                    alert("请填写详细地址");
                    return;
                }
                if (postCode == "") {
                    alert("请填写邮编");
                    return;
                }
                if (phone == "") {
                    alert("手机号或者固话号码至少填写一个");
                    return;
                }
                var info = {
                    'OrderId': orderId,
                    'Receiver': receieverName,
                    'Province': province,
                    'City': city,
                    'Region': region,
                    'Address': address,
                    'PostCode': postCode,
                    'Phone': phone
                };
                if ($("select[name='selContact']").val() == "1") {
                    info.Telephone = phone;
                    info.Phone = undefined;
                }
                info = JSON.stringify(info);
                $.ajax({
                    url: '/Order/SaveChangedAddress',
                    data: info,
                    type: "post",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (""+data.result == "true") {
                            alert(data.msg);
                          //  window.location.reload();
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('修改地址失败,请联系客服');
                    }
                });
            });
        });
    }

    //发货
    function Delivery() {                
        $("a[name='Delivery']").click(function () {
            var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(this).attr("data-OrderId")////$(selTr).find("td[name='OrderIdVal']").find("a").text().trim();
            $("div[name='orderId']").text(orderIdVal);
            var xlobo = $(selTr).find("div[name='IsXlobo']").text();
            $("div[name='xloboVal']").text(xlobo);

            //判断是否为护航直邮
            var selLogisticsProvider = $("select[name='selLogisticsProvider']");
            selLogisticsProvider.val("0");
            if (xlobo == "True") {
                selLogisticsProvider.attr("disabled", "true").addClass("bg-eee");
            } else {
                selLogisticsProvider.removeAttr("disabled").removeClass("bg-eee");
            }
            $("textarea[name='txtLogistics']").val("");

        });
        //绑定提交
        $("button[name='btnDelivery']").click(function () {
            var orderIdVal = $("div[name='orderId']").text().trim();
            var billCodeListStr = $("textarea[name='txtLogistics']").val();
            if (billCodeListStr == "" || billCodeListStr == undefined) {
                alert("运单号不能为空");
                return;
            }
            var reg = /^[dD][bB][0-9]{9}([uU][sS]|[cC][aA]|[uU][kK]|[dD][eE]|[jJ][pP]|[aA][uU]|[nN][zZ]|[fF][rR])$/;
            var billCodeList = billCodeListStr.split("\n");
            var isError = false;
            for (var i = 0; i < billCodeList.length; i++) {
                if (billCodeList[i] != "" && !reg.test(billCodeList[i])) {
                    alert("运单号格式错误，请重新输入！");
                    isError = true;
                    break;                    
                }
            }
            if (isError)
                return;
            
            var providerName = $("select[name='selLogisticsProvider']  option:selected").text();
            var provideValue = $("select[name='selLogisticsProvider']").val();
            var isXlobo = provideValue == "0";

            var postdata = JSON.stringify({ 'isXlobo': isXlobo, 'providerName': providerName, 'deliveryType': 0, 'billCodeList': billCodeListStr, 'orderId': orderIdVal });
            $.ajax({
                url: '/OrderDetail/Delivery',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (""+data.Success == 'true') {
                        alert(data.Message);
                        window.location.reload();
                    }
                    else {
                        alert(data.Message);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('卖家发货失败,请联系客服');
                }
            });
        });
        //生产物流承运商
        $.ajax({
            url: '/OrderDetail/GetLogisticsCompanyList',
            type: "post",
            async: true,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.length > 0) {
                    $.each(data, function (index, item) {
                        $("select[name='selLogisticsProvider']").append("<option value='" + index + "'>" + item + "</option>");
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('卖家发货失败,请联系客服');
            }
        });
        
    }

    //延迟收货
    function DelayOrder() {
        $("a[name='UnDelayOrderDate']").click(function () {
            alert($("div[name='delayAlertText']").text());
        });
        $("a[name='DelayOrderDate']").click(function () {
            $("input[name='txtDelayDays']").val("3");
            $("#WndDelayOrder").css("display", "block");
            var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(selTr).find("td[name='OrderIdVal']").text().trim();
            $("div[name='orderId']").text(orderIdVal);
        });
        $("button[name='btnDelayOrder']").click(function () {
            var delayDays = $('input[name=txtDelayDays]').val();
            var orderIdVal = $("div[name='orderId']").text();
            var regInt = /^[0-9]*$/;
            if (!regInt.test(delayDays)) {
                alert("延迟天数必须为数字");
                $('input[name=txtDelayDays]').val("3");
                return;
            }
            if (delayDays < 3 || delayDays > 15) {
                $('input[name=txtDelayDays]').val("3");
                alert("输入天数不在允许的天数范围内！");
                return;
            }
            var postdata = JSON.stringify({ 'orderId': orderIdVal, 'delayDays': delayDays });
            $.ajax({
                url: '/Order/SellerDelayOrderReceive',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.success == '1') {
                        alert("延迟收货成功");
                        window.location.reload();
                    }
                    else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('取消接单失败,请联系客服');
                }
            });
        });
    }

    //修改价格与运费
    function EditPrice() {
        $("a[name='EditPriceAndFreight']").click(function () {
        var buyerName = $("div[name='BuyerName'] span");

            $("input[name='UpOrDown']").eq(0).attr("checked", "true");
            $("input[name='txtUpOrDownPrice']").val("0.00");
            $("input[name='txtFrieightPrice']").val("0.00");
            $("i[name='CutOrRisePrice']").text("0.00");
            $("i[name='Frieight']").text("0.00");
            $("b[name='OrderTotalPrice']").text("0.00");
            $("i[name='CutOrRisePrice']").removeClass("cut-price").addClass("rise-price")
            .text("+￥0.00");
        
            var selTr = $(this).parent().parent().parent();
            var orderIdVal = $(this).attr("data-OrderId")//$(selTr).find("td[name='OrderIdVal']").text().trim();

            $("div[name='orderId']").text(orderIdVal || $("[name=orderId]").text().trim());
            var buyerName = $(selTr).find("td[name='buyerVal']"),
                totalPrice = $(selTr).find("td[name='TotalPrice']").text().trim();
            totalPrice = totalPrice.substr(2, totalPrice.length - 1);

            $("b[name='OrderTotalPrice']").text("￥" + totalPrice);
            $("i[name='ProductPriceTotal']").text("￥" + totalPrice);
            buyerName.text(buyerName);
        });

        $("input[name='UpOrDown']").click(function () {
            var radioIdVal = $("input[name='UpOrDown']:checked").attr("id");
            var changePriceVal = $("input[name='txtUpOrDownPrice']").val();
            switch (radioIdVal) {
                case "RadioUp":
                    $("small[name='CutOrRise']").text("涨价：");
                    $("i[name='CutOrRisePrice']").removeClass("cut-price").addClass("rise-price")
                    $("i[name='CutOrRisePrice']").text("+￥" + changePriceVal);
                    break;
                case "RadioDown":
                    $("small[name='CutOrRise']").text("降价：");
                    $("i[name='CutOrRisePrice']").removeClass("rise-price").addClass("cut-price")
                    $("i[name='CutOrRisePrice']").text("-￥" + changePriceVal);
                    break;
            }
            CalculateOrderTotalPrice();
        });
               
        $("input[name='txtFrieightPrice']").keyup(function () {
            var val = $(this).val().trim();
          
            if (val != "" && !valiNumberFormate(val)) {
                alert("输入格式不正确,请重新输入");
                $("i[name='Frieight']").text("￥ 0.00");
                return;
            }
            var priceVal = val > 0 ? val : "0.00"

            $("i[name='Frieight']").text("￥" + priceVal);
            CalculateOrderTotalPrice();
        });
        $("input[name='txtUpOrDownPrice']").keyup(function () {
            var val = $(this).val().trim();
            var cutOrRisePriceTxt = $("i[name='CutOrRisePrice']").text().substr(0, 2);
            
            if (val != "" && !valiNumberFormate(val)) {
                alert("输入格式不正确,请重新输入");
                $("i[name='CutOrRisePrice']").text("￥ 0.00");
                return;
            }
            var number = val > 0 ? val : "0.00";
            $("i[name='CutOrRisePrice']").text(cutOrRisePriceTxt + number);

            CalculateOrderTotalPrice();
        });
        $("button[name='btnEditPrice']").click(function () {
            var orderIdVal = $("div[name='orderId']").text().trim();
            var radioIdVal = $("input[name='UpOrDown']:checked").attr("id");
            var frieightPrice = parseFloat($("input[name='txtFrieightPrice']").val().toString().trim());
            var changePrice = 0;
            switch (radioIdVal) {
                case "RadioUp":
                    changePrice = parseFloat($("input[name='txtUpOrDownPrice']").val().toString().trim());
                    break;
                case "RadioDown":
                    changePrice = parseFloat("-" + $("input[name='txtUpOrDownPrice']").val().toString().trim());
                    break;
            }
            var postdata = JSON.stringify({ 'item': orderIdVal, 'discount': changePrice, 'freight': frieightPrice });
            $.ajax({
                url: '/Order/SellerOrderDiscount',
                data: postdata,
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.success == '1') {
                        alert(data.msg);
                        window.location.reload();
                    }
                    else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('修改价格与运费失败,请联系客服');
                }
            });
        });
    }

    //计算修改价格与运费中订单的总价格
    function CalculateOrderTotalPrice() {
    //买家实付（订单总金额） = 商品合计 +涨价或降价+运费
        var radioIdVal = $("input[name='UpOrDown']:checked").attr("id");
        var frieightPrice = parseFloat($("input[name='txtFrieightPrice']").val().toString().trim());
        var changePrice = parseFloat($("input[name='txtUpOrDownPrice']").val().toString().trim());
    var OriginalTotalPrice = $("i[name='ProductPriceTotal']").text().toString();
    OriginalTotalPrice = parseFloat(OriginalTotalPrice.substring(1, OriginalTotalPrice.length - 1));
        var totalPrice = 0;
        switch (radioIdVal) {
            case "RadioUp":
            totalPrice = OriginalTotalPrice + frieightPrice + changePrice;
                break;
            case "RadioDown":
            totalPrice = OriginalTotalPrice + frieightPrice - changePrice;
                break;
        }
        totalPrice = isNaN(totalPrice) ? 0 : totalPrice;
        $("b[name='OrderTotalPrice']").val("￥" + totalPrice);
        $("b[name='OrderTotalPrice']").html("￥" + totalPrice);
    }

    //打开取消订单弹出层
    function OpenCancelOrderWnd() {
        var orderName = $("input[name='no']:checked").parents("tr").find("td[name='OrderStatusName']").find("span").text().trim();
        $("span[name='CancelOrderStatusName']").text(orderName);
        layerbox.alert("#wndCancelOrder");
    }

//接受单个订单
function AcceptSingleOrder() {
    $("a[name='AcceptSingleOrder']").click(function () {
        var selTr = $(this).parent().parent().parent();
        var orderIdVal = $(selTr).find("td[name='OrderIdVal']").find("a").text().trim();
        var postdata = JSON.stringify({ 's': orderIdVal });
        $.ajax({
            url: '/Order/SellerAcceptOneOrder',
            data: postdata,
            type: "post",
            async: true,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.success == '1') {
                    alert(data.message);
                    window.location.reload();
                }
                else {
                    alert(data.message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('取消接单失败,请联系客服');
            }
        });
    });
}

    //取消单个订单
    function CancelSingleOrder(orderId) {
        OpenCancelOrderWnd();
        $("button[name='btnCancelOrder']").click(function () {
            var reasonText = $("textarea[name='txtCancelOrderReason']").val();
            var postdata = JSON.stringify({ 'item': orderId, 'reason': reasonText });
            $.ajax({
                url: '/Order/SellerOrderCancel',
                data: postdata,
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.success == '1') {
                        alert(data.message);
                        window.location.reload();
                    }
                    else {
                        alert(data.message);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('取消接单失败,请联系客服');
                }
            });
        });
    }
    //取消订单
    function CancelOrder() {
        $("button[name='BatchCancelOrder']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            if (orderIdList == null || orderIdList.length == 0) {
                alert("请选择至少一个订单");
                return;
            }
            if (orderIdList.length == 1) {
                CancelSingleOrder(orderIdList[0]);
            }
            else {
                var postdata = JSON.stringify({ 'orderIds': orderIdList });
                if (confirm("您确定要批量取消这些订单吗？")) {
                    $.ajax({
                        url: '/Order/SellerCancelOrderBatch',
                        data: postdata,
                        type: "post",
                        async: true,
                        cache: false,
                        contentType: "application/json;charset=utf-8",
                        success: function (data) {
                            if (data.success == '1') {
                                alert('取消接单成功');
                                window.location.reload();
                            }
                            else {
                                alert(data.message);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert('取消接单失败,请联系客服');
                        }
                    });
                    return false;
                }
            }
        });
    }

    //批量接单
    function BatchAcceptOrder() {
        $("button[name='BatchAcceptOrder']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            if (orderIdList == null || orderIdList.length == 0) {
                alert("请选择至少一个订单");
                return;
            }
            var postdata = JSON.stringify({ 'orderIds': orderIdList });
            if (confirm("您确定要批量接受这些订单吗？")) {
                $.ajax({
                    url: '/Order/SellerAcceptOrderBatch',
                    data: postdata,
                    type: "post",
                    async: false,
                    cache: false,
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.success == '1') {
                            alert('接单成功');
                            window.location.reload();
                        }
                        else {
                            alert(data.message);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('接单失败,请联系客服');
                    }
                });
            }
        });
    }

    //批量延长收货时间
    function BatchDelayReceiveDate() {
        $("button[name='BatchDelayReceive']").click(function () {
            var orderIdList = $("input[name='no']:checked").map(function (index, obj) {
                return $(obj).val();
            }).get();
            if (orderIdList == null || orderIdList.length == 0) {
                alert("请选择至少一个订单");
                return;
            }
            var postdata = JSON.stringify({ 'orderIds': orderIdList });
            if (confirm("您确定要批量对已选订单进行批量延长收货时间的操作吗？")) {
                $.ajax({
                    url: '/Order/SellerBatchDelayOrderAtuoReceive',
                    data: postdata,
                    type: "post",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.success == '1') {
                            alert(data.msg);
                            window.location.reload();
                        }
                        else {
                            alert(data.message);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert('批量延长收货时间失败,请联系客服');
                    }
                });
            }
        });
    }

    //添加备注
    function addRemarks() {
        $("button[name='btnRemarks']").click(function () {
            var Content = $("[name=remarks]").val(),
                UserId = "",
                OrderId = "";
            if (Content.length > 500) {
                alert("文本长度不能超过500个字符。");
                return;
            }
            var data  = {
                    Content: Content,
                    UserId: UserId,
                    OrderId: OrderId
                }
            $.ajax({
                url: '/Order/SaveOrderNote',
                data: JSON.stringify(data),
                type: "post",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.success == '1') {
                        alert(data.msg);
                        window.location.reload();
                    }
                    else {
                        alert(data.message);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('添加备注失败,请联系客服');
                }
            });

        });
    }

    ///验证数字格式
    function valiNumberFormate(number) {
        var regInt = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
        return regInt.test(number);
    }

    /*
    * @name显示错误
    * @param errInput{element} 错误的输入框
    * @param errText {element} 错误的信息
    * @param msg {string} 错误信息
    */
    var ariseErr = function (errInput, errText, msg) {
        msg = msg || "";
        errText.text(msg);
        errInput[msg ? "addClass" : "removeClass"]("error");
        errText.parent()[msg ? "show" : "hide"]();
    };

})