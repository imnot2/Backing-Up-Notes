/*
* 商家后台 账号管理
* @author river
* @email lijiang@ymatou.com
*/
$m.load(['widget/layerbox', 'ui/json' ], function (LayerBox,JSON) {
    'use strict';
    var layerbox = LayerBox('struc', {
        close: '.J-close'
    });
    $("#addAccount").click(function() {
        clearData();
        layerbox.alert("#addAccountPop");
    });

    accountBind();


//账号新增弹窗功能绑定
    function accountBind() {
        //初始化地区选择
        $("#ChangeAddressArea").jChinaArea({
            aspnet: true
        });
        //绑定账号切换
        $(".account-type input").click(function() {
            var $this = $(this);
            if (this.checked) {
                switchAccount($(this).val());
            }
        });

        //切换账号
        function switchAccount(val) {
            $(".account").hide();
            $("." + val).show();
        }

        //绑定保存
        $(".renminbi-submit").click(function() {
            var renminbi = $(".renminbi"),
                InstitutionId = renminbi.find("[name=InstitutionId]").val(),
                Institution = renminbi.find("[name=InstitutionId]").find("option:selected").text(),
                AccountNo = renminbi.find("[name=AccountNo]").val(),
                AccountName = renminbi.find("[name=AccountName]").val(),
                Province = renminbi.find("[name=Province]").val(),
                City = renminbi.find("[name=City]").val(),
                TradingPassword = renminbi.find("[name=TradingPassword]").val();
            var postdata = {
                InstitutionId: InstitutionId,
                Institution: Institution,
                AccountNo: AccountNo,
                AccountName: AccountName,
                Province: Province,
                City: City,
                TradingPassword: TradingPassword
            };
            var url = "/fund/AddNewBankAccount",
                msg = ResourceJS.FundAccount_FundManage_AccountManage_js_AddSuccess;
            var AccountId = renminbi.find("[name=AccountId]").val();
            if (AccountId !== "") {
                postdata.AccountId = AccountId;
                url = "/Fund/SaveAmendAccount";
                msg = ResourceJS.FundAccount_FundManage_AccountManage_js_UpdateSuccess;
            }

            amindRequest(url, postdata, msg);

        });

        //绑定保存
        $(".alipay-submit").click(function () {
            var alipay = $(".alipay");
            var AccountName = alipay.find("[name=AccountName]").val();
            var AccountNo = alipay.find("[name=AccountNo]").val();
            var TradingPassword = alipay.find("[name=TradingPassword]").val();
            var postdata = {
                AccountName: AccountName,
                AccountNo: AccountNo,
                TradingPassword: TradingPassword
            };
            var url = "/fund/AddAliPayAccount",
                msg = ResourceJS.FundAccount_FundManage_AccountManage_js_AddSuccess;
            var AccountId = alipay.find("[name=AccountId]").val();
            if (AccountId !== "") {
                postdata.AccountId = AccountId;
                url = "/Fund/SaveAmendAccount";
                msg = ResourceJS.FundAccount_FundManage_AccountManage_js_UpdateSuccess;
            }
            amindRequest(url, postdata,msg);
        })
        //绑定保存（美国帐号）
        $(".dollar-submit").click(function() {
            var dollar = $(".dollar"),
                AccountName = dollar.find("[name=AccountName]").val(),
                OwnerType = dollar.find("[name=OwnerType]").val(),
                AccountType = dollar.find("[name=AccountType]").val(),
                BankName = dollar.find("[name=BankName]").val(),
                RoutingNumber = dollar.find("[name=RoutingNum]").val(),
                BankAccNumber = dollar.find("[name=BankAccountNum]").val(),
                BranchAddress = dollar.find("[name=BranchAddress]").val(),
                TradingPassWord = dollar.find("[name=TradingPassWord]").val();
            var postdata = {
                AccountName: AccountName,
                AccountType: AccountType,
                BankName: BankName,
                RoutingNumber: RoutingNumber,
                BankAccNumber: BankAccNumber,
                BranchAddress: BranchAddress,
                TradingPassWord: TradingPassWord,
                OwnerType: OwnerType,
                Country: "US",
                Currency: "USD"
            };
            var url = "/fund/AddNewAbroadAccount",
                msg = ResourceJS.FundAccount_FundManage_AccountManage_js_AddSuccess;
            var AccountId = dollar.find("[name=AccountId]").val();
            if (AccountId !== "") {
                postdata.AccountId = AccountId;
                url = "/Fund/SaveAmendAbroadAccount";
                msg = ResourceJS.FundAccount_FundManage_AccountManage_js_UpdateSuccess;
            }
                        amindRequest(url, postdata, msg);
        });
        /*
        * 保存支付宝账户和银行账户的修改
        * @param url {String} 请求url
        * @param postdata {Object} 请求数据
        * @parma msg {String} 成功提示信息
        */
            function amindRequest(url, postdata, msg) {
                $.ajax({
                    url: url,
                    data: JSON.stringify(postdata),
                    type: "post",
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        if (data.result == 1) {
                            alert(msg);
                            window.location.reload();
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(ResourceJS.FundAccount_FundManage_AccountManage_js_AddFail);
                    }
                });
            }
        /*
        * 修改数据
        * @param accountId {String} 账号id
        * @param accountType {String} 账号类别
        */
        function updateAccount(accountId, accountType) {
            var url = '/Fund/GetFundAccountById';
            if (accountType === "dollar") {
                url = '/Fund/GetAbroadFundAccountById';
            }
            $.ajax({
                url: url + "?id=" + accountId,
                type: "get",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.result == 1) {
                        clearData()
                        //绑定修改数据
                        bindData(data.FundAccountInfo);
                        layerbox.alert("#addAccountPop");
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(ResourceJS.Seller_Share_js_ProcessFail);
                }
            });
            //执行绑定数据
            function bindData(data) {
                var owner = $("." + accountType);
                switchAccount(accountType);
                $("[name=account][value=" + accountType + "]").attr("checked", true);
                
                for (var i in data) {
                    var prop= i;
                    if (accountType !== "dollar") {
                        prop = i.substr(1);
                    }
                    owner.find("[name=" + prop + "]").val(data[i]);
                    if (i == "sInstitutionCity" && data[i]) {
                        var city = data[i].split(",");
                        $("#ChangeAddressArea").jChinaArea({
                            aspnet: true,
                            txtOrCode:false,
                            s1: city[0], //默认选中的省名
                            s2: city[1] //默认选中的市名
                        });
                    }
                }
            }

        }

        /**
        * 绑定修改数据
        * @param updateData {Object} 更新数据
        * @param accountType {Object} 账号类型
        */
        //先判断账号类型
        $(".updateAccount").click(function() {
            var accountId = $(this).attr("accountId"),
                accountType = $(this).attr("accountType");
            updateAccount(accountId, accountType);
        });

        /*
        * @name显示错误
        * @param errInput{element} 错误的输入框
        * @param errText {element} 错误的信息
        * @param msg {string} 错误信息
        */
        var ariseErr = function(errInput, errText, msg) {
            msg = msg || "";
            errText.text(msg);
            errInput[msg ? "addClass" : "removeClass"]("error");
            errText.parent()[msg ? "show" : "hide"]();
        };
    }

    //清除数据
    function clearData() {
        $("#addAccountPop input[type=text],#addAccountPop input[type=hidden]").val("");
    }
});