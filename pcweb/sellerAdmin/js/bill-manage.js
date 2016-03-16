$m.load(['widget/layerbox', 'ui/json', 'widget/comfirm'], function (LayerBox, JSON, pop) {
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });

    var layerboxtwolevel = LayerBox('struc', {
        close: '.J-close'
    });

    /*

    */
    var errorAlert = function (msg) {
        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Prompt, msg, "error");
    }
    var successAlert = function (msg, fn) {
        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Success, msg, "success", fn);
    }
    var failureAlert = function (msg) {
        pop.alertPop(ResourceJS.SellerOrder_Common_Alert_msg_Failure, msg, "warning");
    }
    var comfirmAlert = function (title, msg, fn) {
        pop.comfirmPop(title, msg, 'error', { comfirm: ResourceJS.SellerOrder_Common_Alert_msg_Confirm, cancel: ResourceJS.SellerOrder_Common_Alert_msg_Cancel }, fn);
    }

    textflow(".textflow-title", 2);
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
        $("[name=st]").datepicker();
        $("[name=et]").datepicker();
    }

    /**
    *
    * 运单删除申请
    *
    **/
    $(".DeleteApply").click(function () {
        var billId = $(this).attr("billId");
        $("#dr").val("");
        $("#bid").val(billId);
        layerbox.alert("#wndDelete");
    });

    /**
    *
    * 运单删除申请提交
    *
    **/
    $(".btnDeleteOrderApply").click(function () {
        var billId = $("#bid").val();
        var deleteReason = $("#dr").val();
        var postData = JSON.stringify({
            'bid': billId,
            'dr': deleteReason
        });
        $.ajax({
            url: "/Bills/DeleteBillApply",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    successAlert(data.message);
                } else {
                    layerbox.close();
                    window.location.reload();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /**
    *
    * 删除2天内新生成的运单
    *
    **/
    $(".DeleteSelf").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#deleteBillSelf");
    });

    /*
    *
    * 确认删除运单
    *
    */
    $(".btnDeleteBillSelf").click(function () {
        //alert($("#bid").val());
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/DeleteBillSelf",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    successAlert(data.message);
                } else {
                    layerbox.close();
                    window.location.reload();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /*
    *
    * 运费补款
    *
    */
    $(".NeedToFreight").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#needToFreight");
    });

    /*
    *
    * 确认运费补款
    *
    */
    $(".btnNeedToFreight").click(function () {
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/PayWeightChargeToBill",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    window.location.reload();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /*
    *
    * 缴税补款
    *
    */
    $(".NeedToTxt").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#needToTxt");
    });

    /*
    *
    * 确认缴税补款
    *
    */
    $(".btnNeedToTxt").click(function () {
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/PayTxtChargeToBill",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    window.location.reload();
                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /*
   *
   * 其他补款
   *
   */
    $(".NeedToOther").click(function () {
        var billId = $(this).attr("billId");
        $("#bid").val(billId);
        layerbox.alert("#needToOther");
    });

    /*
    *
    * 确认其他补款
    *
    */
    $(".btnNeedToOther").click(function () {
        var billId = $("#bid").val();
        var postData = JSON.stringify({
            'bid': billId
        });
        $.ajax({
            url: "/Bills/PayOtherChargeToBill",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    successAlert(data.message, function () {
                        window.location.reload();
                    })
                    //$(".successMessageInfo").empty();
                    //$(".successMessageInfo").append(data.message);
                    //layerbox.alert("#successMessage");

                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });
    $(".btnSuccess").click(function () {
        layerbox.close();
        window.location.reload();
    });

    /**
    *
    * 多选运单
    *
    **/
    $(".allBillCheck").click(function () {
        $(".signBillCheck:enabled").attr('checked', $(this).attr('checked'));
        $(".allBillCheck").attr('checked', $(this).attr('checked'));
    });

    /**
    *
    * 批量下载运单
    *
    **/
    $(".downloadBills").click(function () {
        if ($("input.signBillCheck:checked").length > 0) {
            layerbox.alert("#downloadPending");
            var billCodes = "";
            $("input.signBillCheck:checked").each(function () {
                billCodes += $(this).val() + ",";
            });

            var iFrame = document.getElementById("downloadBillsFrame");
            iFrame.src = "/Bills/DownloadBills?bcs=" + billCodes;

            setTimeout(function () { layerbox.close(); }, 2000);
        } else {
            layerbox.alert("#noChooesOrderError");
        }
    });

    /**
    *
    * 批量补运费
    *
    **/
    $(".btnNeedWeightToBills").click(function () {
        if ($("input.signBillCheck:checked").length > 0) {
            var billNum = $("input.signBillCheck:checked").length;
            var billCodes = "";
            var fee = 0;
            $("input.signBillCheck:checked").each(function () {
                billCodes += $(this).val() + ",";
                fee += parseFloat($(this).attr("weightFee"));
            });

            $(".needToFreightBillNum").empty();
            $(".needToFreightAmount").empty();
            $(".needToFreightBillNum").append(billNum);
            $(".needToFreightAmount").append(fee.toFixed(2));
            layerbox.alert("#needToFreightBills");
            //alert($("input.signBillCheck:checked").length + "\r\n" + fee.toFixed(2));
        } else {
            layerbox.alert("#noChooesOrderError");
        }
    });

    $(".btnNeedToFreightBills").click(function () {
        var billCodes = "";
        $("input.signBillCheck:checked").each(function () {
            billCodes += $(this).val() + ",";
        });
        var postData = JSON.stringify({
            'bcs': billCodes
        });
        $.ajax({
            url: "/Bills/PayWeightChargeToBills",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    successAlert(data.message, function () {
                        window.location.reload();
                    })
                    
                    //$(".successMessageInfo").empty();
                    //$(".successMessageInfo").append(data.message);
                    //layerbox.alert("#successMessage");

                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /**
    *
    * 批量缴关税
    *
    **/
    $(".btnNeedTxtToBills").click(function () {
        if ($("input.signBillCheck:checked").length > 0) {
            var billNum = $("input.signBillCheck:checked").length;
            var billCodes = "";
            var fee = 0;
            $("input.signBillCheck:checked").each(function () {
                billCodes += $(this).val() + ",";
                fee += parseFloat($(this).attr("txtFee"));
            });

            $(".needToTxtBillNum").empty();
            $(".needToTxtAmount").empty();
            $(".needToTxtBillNum").append(billNum);
            $(".needToTxtAmount").append(fee.toFixed(2));
            layerbox.alert("#needToTxtBills");
            //alert($("input.signBillCheck:checked").length + "\r\n" + fee.toFixed(2));
        } else {
            layerbox.alert("#noChooesOrderError");
        }
    });

    $(".btnNeedToTxtBills").click(function () {
        var billCodes = "";
        $("input.signBillCheck:checked").each(function () {
            billCodes += $(this).val() + ",";
        });
        var postData = JSON.stringify({
            'bcs': billCodes
        });
        //debugger;
        $.ajax({
            url: "/Bills/PayTxtChargeToBills",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    successAlert(data.message, function () {
                        window.location.reload();
                    })
                    //$(".successMessageInfo").empty();
                    //$(".successMessageInfo").append(data.message);
                    //layerbox.alert("#successMessage");

                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /**
    *
    * 批量补其他费用
    *
    **/
    $(".btnNeedOtherToBills").click(function () {
        if ($("input.signBillCheck:checked").length > 0) {
            var billNum = $("input.signBillCheck:checked").length;
            var billCodes = "";
            var fee = 0;
            $("input.signBillCheck:checked").each(function () {
                billCodes += $(this).val() + ",";
                fee += parseFloat($(this).attr("otherFee"));
            });

            $(".needToOtherBillNum").empty();
            $(".needToOtherAmount").empty();
            $(".needToOtherBillNum").append(billNum);
            $(".needToOtherAmount").append(fee.toFixed(2));
            layerbox.alert("#needToOtherBills");
           //alert($("input.signBillCheck:checked").length + "\r\n" + fee.toFixed(2));
        } else {
            layerbox.alert("#noChooesOrderError");
        }
    });

    $(".btnNeedToOtherBills").click(function () {
        var billCodes = "";
        $("input.signBillCheck:checked").each(function () {
            billCodes += $(this).val() + ",";
        });
        var postData = JSON.stringify({
            'bcs': billCodes
        });
        $.ajax({
            url: "/Bills/PayOtherChargeToBills",
            data: postData,
            type: "post",
            async: false,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == 0) {
                    layerbox.close();
                    $(".errorMessageInfo").empty();
                    $(".errorMessageInfo").append(data.message);
                    layerbox.alert("#errorMessage");
                } else {
                    layerbox.close();
                    successAlert(data.message, function () {
                        window.location.reload();
                    })
                    //$(".successMessageInfo").empty();
                    //$(".successMessageInfo").append(data.message);
                    //layerbox.alert("#successMessage");

                }
                //alert(data.result + "\r\n" + data.message);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(textStatus);
            }
        });
    });

    /**
    *
    *修改配送地址
    *
    **/
    $(".btnModifyAddress").click(function () {
        var transpotNo = $.trim($(this).closest("tr").find("td[name='transportNoVal']").html());
        var postdata = JSON.stringify({ 'transPostNo': transpotNo });
        $.ajax({
            url: '/BillsManage/GetOriginalAddress',
            data: postdata,
            type: "post",
            async: true,
            cache: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.result == "1") {
                    data = data.data;
                    var htmlResult = "";
                    $(data).each(function () {
                        htmlResult += "<div class='address-item'>";
                        htmlResult += "<div>";
                        htmlResult += "<label class='label-title'>" + ResourceJS.SellerOrder_Logistics_label_BillCode + "</label>";
                        htmlResult += "<span name='BillCodeVal'></span>";
                        htmlResult += "</div>";
                        htmlResult += "<div>";
                        htmlResult += "<label class='label-title'>" + ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_ReceiverName + "：</label>";
                        htmlResult += "<input type='text' name='txtReceieverName' class='c-input-text-md'>";
                        htmlResult += "<p class='error-tips'></p>";
                        htmlResult += "</div>";
                        htmlResult += "<div>";
                        htmlResult += "<label for='' class='label-title'>" + ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_ReceiverArea + "：</label>";
                        htmlResult += "<span name='ChangeAddressArea'>";
                        htmlResult += "<select class='c-input-text-md w80' name='selProvince'></select>";
                        htmlResult += ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_Province;
                        htmlResult += "<select class='c-input-text-md w80' name='selCity'></select>";
                        htmlResult += ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_City;
                        htmlResult += "<select class='c-input-text-md w80' name='selArea'></select >";
                        htmlResult += ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_District;
                        htmlResult += "</span>";
                        htmlResult += "<p class='error-tips'></p>";
                        htmlResult += "</div>";
                        htmlResult += "<div>";
                        htmlResult += "<label for='' class='label-title'>" + ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_Street + "：</label>";
                        htmlResult += "<textarea rows='6' cols='50' id='' name='txtStreetAddress'></textarea>";
                        htmlResult += "<p class='error-tips'></p>";
                        htmlResult += "</div>";
                        htmlResult += "<div>";
                        htmlResult += "<label for='' class='label-title'>" + ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_Post + "：</label>";
                        htmlResult += "<input type='text' name='txtPostCode' class='c-input-text-md w50'>";
                        htmlResult += "<p class='error-tips'></p>";
                        htmlResult += "</div>";
                        htmlResult += "<div>";
                        htmlResult += "<label for='' class='label-title'>" + ResourceJS.Order_SellerOrder_SellerOrderChangeAddress_label_ContactWay + "：</label>";                        
                        htmlResult += "<input type='text' name='txtContact' class='c-input-text-md w80'>";
                        htmlResult += "<p class='error-tips'></p>";
                        htmlResult += "</div>";
                        htmlResult += "</div>";
                    });
                    $("#modifyAddressContent").html(htmlResult);

                    $(".address-item").each(function (index, obj) {
                        var addressItem = $(obj);
                        var tempDataVal = data[index];
                        $(addressItem).find("span[name='BillCodeVal']").html(tempDataVal.BillCode);
                        $(addressItem).find("input[name='txtReceieverName']").val(tempDataVal.ReceiverName);
                        $("span[name='ChangeAddressArea']").jChinaArea({
                            aspnet: true,
                            s1: tempDataVal.ReceiverProvince, //默认选中的省名
                            s2: tempDataVal.ReceiverCity, //默认选中的市名
                            s3: tempDataVal.ReceiverRegion//默认选中的县区名
                        });
                        $(addressItem).find("textarea[name='txtStreetAddress']").val(tempDataVal.ReceiverAddress);
                        $(addressItem).find("input[name='txtPostCode']").val(tempDataVal.ReceiverPostCode);
                        $(addressItem).find("select[name='selContact']").val(tempDataVal.ReceiverPhone ? 0 : 1);
                        $(addressItem).find("input[name='txtContact']").val(tempDataVal.ReceiverPhone ? tempDataVal.ReceiverPhone : "");
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddressFailure);
            }
        });
        layerbox.alert("#modifyAddress");
        $('.error-tips').hide();
    });

    /**
    * 文字显示固定行数，超过显示省略号
    * 
    * @param {number} 行数
    */
    function textflow(row) {
        $(".textflow").each(function () {
            var $this = $(this),
                clientHeight = this.clientHeight, //容器高度
                fontSize = parseFloat($this.css("fontSize")),
                lineHeight = parseFloat($this.css("lineHeight"));
            var title = $this.attr("title");
            //将原来的值保存到title中
            if (title === undefined || title === "") {
                $this.attr("title", title = $this.text());
            }
            //将原来的值还原重新计算
            $this.text(title);

            var dheight = parseInt(row * lineHeight);
            if (clientHeight >= dheight) {
                while (dheight * 3 < this.clientHeight) {
                    $this.text(title.substring(0, title.length / 2));
                    title = $this.text();
                }
                //减去末尾文字
                while (dheight < this.clientHeight) {
                    title = $this.text();
                    $this.text(title.replace(/(\s)*([a-zA-Z0-9]?|\W)(\.\.\.)?$/, "..."));
                }
            }
        });
    }

    $("button[name='btnConfirm']").live('click', function () {
        var info = [];
        var isSuccess = true;
        $('.address-item').each(function (index, obj) {

            var billCodeValue = $("[name='BillCodeVal']", this).html().trim();
            //收件人姓名
            var txtReceieverName = $("[name='txtReceieverName']", this),
                nameValue = txtReceieverName.val();
            if (nameValue == "") {
                errorTip(txtReceieverName, ResourceJS.SellerBill_ModifyAddress_jsmsg_ReceieverNameEmpty);
                isSuccess = false;
            } else {
                successTip(txtReceieverName);
            }
            //街道地址
            var txtStreetAddress = $("[name='txtStreetAddress']", this),
                addressValue = txtStreetAddress.val();
            if (addressValue == "") {
                errorTip(txtStreetAddress, ResourceJS.SellerBill_ModifyAddress_jsmsg_AddressEmpty);
                isSuccess = false;
            } else {
                successTip(txtStreetAddress);
            }
            //邮编
            var txtPostCode = $("[name='txtPostCode']", this),
                postCodeValue = txtPostCode.val();
            if (postCodeValue == "") {
                errorTip(txtPostCode, ResourceJS.SellerBill_ModifyAddress_jsmsg_PostCodeEmpty);
                isSuccess = false;
            } else {
                successTip(txtPostCode);
            }
            //电话
            var txtContact = $("[name='txtContact']", this),
                txtContactValue = txtContact.val();
            if (txtContactValue == "") {
                errorTip(txtContact, ResourceJS.SellerBill_ModifyAddress_jsmsg_PhoneEmpty);
                isSuccess = false;
            } else {
                successTip(txtContact);
            }
            //省
            var selProvince = $("[name='selProvince']", this),
                selProvinceValue = selProvince.val(),
                parentNode = selProvince.closest('span');
            if (selProvinceValue == "" || selProvinceValue == null) {
                selProvince.addClass('c-input-error');
                parentNode.next('.error-tips').html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerBill_ModifyAddress_jsmsg_AreaEmpty).show();
                isSuccess = false;
            } else {
                selProvince.removeClass('c-input-error');
                parentNode.next('.error-tips').hide();
            }
            //市
            var selCity = $("[name='selCity']", this),
                selCityValue = selCity.val(),
                parentNode = selCity.closest('span');
            if (selCityValue == "" || selCityValue == null) {
                selCity.addClass('c-input-error');
                parentNode.next('.error-tips').html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerBill_ModifyAddress_jsmsg_AreaEmpty).show();
                isSuccess = false;
            } else {
                selCity.removeClass('c-input-error');
                parentNode.next('.error-tips').hide();
            }
            //区
            var selArea = $("[name='selArea']", this),
                selAreaValue = selArea.val(),
                parentNode = selArea.closest('span');
            if (selAreaValue == "" || selAreaValue == null) {
                selArea.addClass('c-input-error');
                parentNode.next('.error-tips').html('<i class="order-icon order-error-s"></i>' + ResourceJS.SellerBill_ModifyAddress_jsmsg_AreaEmpty).show();
                isSuccess = false;
            } else {
                selArea.removeClass('c-input-error');
                parentNode.next('.error-tips').hide();
            }

            info.push({
                sBillCode: billCodeValue,
                sReceiveName: nameValue,
                sReceiveAddress: addressValue,
                sReceivePostcode: postCodeValue,
                sReceivePhone: txtContactValue,
                sReceiveProvince: $("[name='selProvince'] option:selected", this).text(),
                sReceiveCity: $("[name='selCity'] option:selected", this).text(),
                sReceiveRegion: $("[name='selArea'] option:selected", this).text()
            });
        });
        if (isSuccess) {
            $.ajax({
                url: '/BillsManage/SaveBillAdress',
                data: JSON.stringify(info),
                type: "post",
                async: true,
                cache: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == "1") {
                        layerbox.close();
                        successAlert(data.msg);
                    } else {
                        layerbox.close();
                        failureAlert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorAlert(ResourceJS.Order_SellerOrderList_jsmsg_ChangeAddressFailure);
                }
            });
        }        
    });
    $('.btnShowError').each(function () {

        $(this).click(function () {
            //debugger;
            layerbox.alert("#errorMessage");
        });
    });

    function errorTip(node, msg) {
        node.addClass('c-input-error');
        node.next('.error-tips').html('<i class="order-icon order-error-s"></i>' + msg).show();
    }
    function successTip(node) {
        node.removeClass('c-input-error');
        node.next('.error-tips').hide();
    }
    $('.order-form').submit(function () {
        var $this = $(this);
        var _key = $('.c-input-large', $this);
        var _st = $("input[name='st']", $this);
        var _et = $("input[name='et']", $this);
        if (_key.val() == _key.attr('placeholder')) {
            _key.val('');
        }
        if (_st.val() == _st.attr('placeholder')) {
            _st.val('');
        }
        if (_et.val() == _et.attr('placeholder')) {
            _et.val('');
        }
    })
    //重置表单   
    $("#J-formReset").click(function () {
        var ua = navigator.userAgent.toLowerCase();
        var IE = "";
        if (window.ActiveXObject) {
            IE = ua.match(/msie ([\d.]+)/)[1];
            if (IE <= 9) {
                var _input = $(":input", document.forms[0]);
                _input.each(function () {
                    var _placeholder = $(this).attr('placeholder');
                    $(this).val(_placeholder);
                    $(this).addClass('placeholder');
                })
                $('#J-tiperror').hide();
            }
            return;
        }
        $(":input", document.forms[0]).val("");
        $('#J-tiperror').hide();
    })
})