/*
* 商家后台 账号管理
* @author river
* @email lijiang@ymatou.com
*/
$m.load(['widget/layerbox'], function (LayerBox) {
    'use strict';
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });
    $("#addAccount").click(function () {
        layerbox.alert("#addAccountPop");
    })

    accountBind();


});

//账号新增弹窗功能绑定
function accountBind() {
    $("#ChangeAddressArea").jChinaArea({
        aspnet: true,
      
    });
    //绑定账号切换
    $(".account-type input").click(function () {
        var $this = $(this);
        if (this.checked) {
            $(".account").hide();
            $("." + $(this).val()).show();
        }
    })

    //绑定保存
    $(".renminbi-submit").click(function () {
        var renminbi = $(".renminbi"),
            InstitutionId = renminbi.find("[name=InstitutionId]").val(),
            Institution = renminbi.find("[name=InstitutionId]").find("option:checked").text(),
            CardNo = renminbi.find("[name=CardNo]").val(),
            AccountName = renminbi.find("[name=AccountName]").val(),
            Province = renminbi.find("[name=Province]").val(),
            City = renminbi.find("[name=City]").val(),
            TradingPassword = renminbi.find("[name=TradingPassword]").val();
        var postdata = {
            InstitutionId: InstitutionId,
            Institution: Institution,
            CardNo: CardNo,
            AccountName: AccountName,
            Province: Province,
            City: City,
            TradingPassword: TradingPassword
        };
        $.ajax({
            url: '/fund/AddNewBankAccount',
            data: JSON.stringify(postdata),
            type: "post",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.success == 1) {
                    alert("新增账号成功!");
                    layerbox.close();
                } else {
                    alert(data.msg)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('新增账号错误,请联系客服');
            }
        });
    })
    //绑定保存
    $(".alipay-submit").click(function () {
        var AccountName = $(".alipay [name=AccountName]").val();
        var RealName = $(".alipay [name=RealName]").val();
        var TradingPassword = $(".alipay [name=TradingPassword]").val();
        var postdata = {
            AccountName: AccountName,
            RealName: RealName,
            TradingPassword:TradingPassword
        }
        $.ajax({
            url: '/fund/AddNewBankAccount',
            data: JSON.stringify(postdata),
            type: "post",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.success == 1) {
                    alert("新增账号成功!");
                    layerbox.close();
                } else {
                    alert(data.msg)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('新增账号错误,请联系客服');
            }
        });
    })
    //绑定保存
    $(".dollar-submit").click(function () {
        var dollar = $(".dollar"),
           AccountName = dollar.find("[name=AccountName]").val(),
           AccountType = dollar.find("[name=AccountType]").val(),
           BankName = dollar.find("[name=BankName]").val(),
           RoutingNumber = dollar.find("[name=RoutingNumber]").val(),
           BankAccNumber = dollar.find("[name=BankAccNumber]").val(),
           BranchAddress = dollar.find("[name=BranchAddress]").val(),
           BankCountry = dollar.find("[name=BankCountry]").val(),
           TradingPassWord = dollar.find("[name=TradingPassword]").val();
        var postdata = {
            AccountName: AccountName,
            AccountType:AccountType,
            BankName: BankName,
            RoutingNumber: RoutingNumber,
            BankAccNumber: BankAccNumber,
            BranchAddress: BranchAddress,
            TradingPassWord: TradingPassWord,
            BankCountry: BankCountry
        }
        $.ajax({
            url: '/fund/AddNewBankAccount',
            data: postdata,
            type: "post",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.success == 1) {
                    alert("新增账号成功!");
                    layerbox.close();
                } else {
                    alert(data.msg)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('新增账号错误,请联系客服');
            }
        });
    })
    /*
    * 修改数据
    * @param accountId {String} 账号id
    * @param accountType {String} 账号类别
    */
    function updateAccount(accountId,accountType) {
        var postdata = { accountId: accountId };
        $.ajax({
            url: '/FundManage/AmendAbroadAccount',
            data: postdata,
            type: "post",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.success == 1) {
                    //绑定修改数据
                    bindUpdate(data, accountType)
                    layerbox.alert("#addAccountPop");
                } else {
                    alert(data.msg)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('获取数据失败,请联系客服');
            }
        });
    }
    /**
    * 绑定修改数据
    * @param updateData {Object} 更新数据
    * @param accountType {Object} 账号类型
    */
    function bindUpdate(updateData, accountType) {
        //先判断账号类型


        //执行绑定数据

    }


    function delAccount(accountId) {
        if (confirm("确定删除该提现账户？")) {
            $.ajax({
                url: "/FundManage/DelAccount?c=" + accountId,
                type: "POST",
                dataType: "json",
                success: function (m) {
                    if (m.success == 1) {
                        alert('删除成功');
                        location.reload();
                    } else {
                        alert('删除失败：' + m.msg);
                    }
                }
            });
        }
    }

    function delAbroadAccount(accountId) {
        if (confirm("确定删除该提现账户？")) {
            $.ajax({
                url: "/FundManage/DelAbroadAccount?c=" + accountId,
                type: "POST",
                dataType: "json",
                success: function (m) {
                    if (m.success == 1) {
                        alert('删除成功');
                        location.reload();
                    } else {
                        alert('删除失败：' + m.msg);
                    }
                }
            });
        }
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
    }
}