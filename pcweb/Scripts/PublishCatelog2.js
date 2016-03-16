/*=======================PublishCatelog2.js===========================*/
j$(function () {
    j$(".pojcheck").each(function () {
        if (j$(this).attr("checked")) {
            j$(this).button({ icons: { secondary: 'ui-icon-check'} });
        } else {
            j$(this).button({ icons: { secondary: 'ui-icon-cancel'} });
        }
    });
    j$("label.ui-button,input.pojcheck", ".pojone").unbind();

    j$("table#productList").validationEngine({ validationEventTriggers: "keyup" });

    if (j$.browser.msie) {
        if (j$.browser.version == "7.0") {
            j$("textarea#txtProDes").attr("cols", "109");
        } else {

        }
    } else {

    }


    j$(".bntAddPrice").button({ icons: {
        secondary: 'ui-icon-plusthick'
    }
    }).click(function () {
        var fat = j$(this).closest("tr.pojone");
        if (fat.validationEngine({ returnIsValid: true })) {
            var pojId = fat.attr("title");
            var index = fat.nextAll("tr.cateone").size();
            var CatelogObj = new Catelog(index, pojId);
            AttentionDialog("#FAttentionDialog", ".bntFAttentionClose", "#PadB", "#FAttentionDialog");
            j$("#FAttentionDialog").validationEngine({ validationEventTriggers: "keyup" });
        }
    });
    j$(".btcatadel").click(function () {
        var catelogId = j$(this).closest("div.catetd").attr("title");
        var delanswer = confirm("确定删除?");
        if (delanswer) {
            j$.ajax({
                url: "/PublishProduct/DelCatalog?cataId=" + catelogId,
                data: '{}',
                msg: catelogId,
                success: function (m) {
                    if (m != 0) {
                        var catetd = j$("div.catetd[title='" + this.msg + "']");
                        catetd.closest("tr.cateone").remove();
                        Catelog_Alert(3);
                    } else {
                        Catelog_Alert(31);
                    }
                }
            });
        }
    });
    j$(".btcatamod").click(function () {
        var cateone = j$(this).closest("tr.cateone");
        var fat = j$(cateone.prevAll("tr.pojone")[0]);
        var pojId = fat.attr("title");
        var index = fat.nextAll("tr.cateone").size();
        var CatelogObj = new Catelog(index, pojId);
        CatelogObj.Property.CatelogPropertys = InitPropertyPageData(cateone);
        CatelogObj.initPopWithV();
        var div = j$(this).closest("div.catetd");
        CatelogObj.Property.QuotePrice = j$("span.pp", div).text();
        CatelogObj.Property.CatelogId = div.attr("title");
        AttentionDialog("#FAttentionDialog", ".bntFAttentionClose", "#PadB", "#FAttentionDialog");
        j$("#FAttentionDialog").validationEngine({ validationEventTriggers: "keyup" });
        j$("#FASubAdd").unbind("click").bind("click", { o: CatelogObj }, CatelogObj.SubModif);
    });
    //http://blog.csdn.net/drworm/archive/2010/03/30/5426842.aspx

    var isDatePick = false;
    var dptraget;
    j$("select.odata").change(function () {
        var val = j$(this).val();
        if (val == "add") {
            var DP = j$("#datepicker");
            if (!isDatePick) {
                AttentionDialog("#DPAttentionDialog", ".bntDPAttentionClose", "#PadB");
                DP.datepicker({ changeMonth: true, changeYear: true, minDate: 0 });
                isDatePick = true;
            } else {
                AttentionDialog("#DPAttentionDialog", ".bntDPAttentionClose", "#PadB");
            }
            dptraget = j$(this);
            j$("#bntDPSub").one("click", function () {
                var day = j$("td a.ui-state-active", DP).text();
                var month = parseInt(j$("select.ui-datepicker-month", DP).val()) + 1;
                var year = j$("select.ui-datepicker-year", DP).val();
                var dataval = year + "/" + month + "/" + day;
                var datatext = year + "年" + month + "月" + day + "日";
                dptraget.addOption(datatext, dataval);
                dptraget.get(0).value = dataval;
            });
        }
    });

    var isEditor = false;
    var par;
    j$(".odes").bind("click", function () {
        if (!isEditor) {
            AttentionDialog("#DAttentionDialog", ".bntDAttentionClose", "#PadB");
            KISSY.Editor("txtProDes");
            isEditor = true;
        } else {
            AttentionDialog("#DAttentionDialog", ".bntDAttentionClose", "#PadB");
        }
        par = j$(this);
        j$(".ks-editor-content iframe").contents().find("body").html(par.val());
        j$("#btnDesSub").click(function () {
            par.val(j$(".ks-editor-content iframe").contents().find("body").html());
        });
    });

    j$("#ajaxload").ajaxStart(function () {
        j$(this).show();
    }).ajaxStop(function () {
        j$(this).hide();
    });
});

//Catelog Class -------------------------------------------------------------
var Catelog = function(index, pojId) {
    this.index = index;
    this.ProductId = pojId;
    this.ad = j$("#FAttentionDialog");
    this.pbox = j$("#FAttentioProp", this.ad);
    this.pojtr = j$("tr.pojone[title='" + pojId + "']");
    this.Property = {
        ProductId: pojId,
        CatelogId: ""
    };
    this.Getprop();
    j$.ajax({
            url: "/PublishProduct/GetProductProperty?pojId=" + pojId,
            data: "{}",
            msg: this,
            success: this.Su_Init
        });
};
Catelog.prototype.Su_Init = function(val) {
    this.msg.Property.CatelogPropertysPre = val;
    this.msg.initPop();
    j$("#FASubAdd").unbind("click").bind("click", { o: this.msg }, this.msg.SubAdd);
};
Catelog.prototype.SubAdd = function (e) {
    if (j$("#FAttentionDialog").validationEngine({ returnIsValid: true })) {
        var o = e.data.o;
        o.Property.QuotePrice = j$("input#FAtxtprice").val();
        o.Property.CatelogPropertys = InitPropertyData();
        //var jsons = encodeURIComponent(j$.toJSON(o.Property));
        var jsons = j$.toJSON(o.Property);
        j$.ajax({
            type: "POST",
            url: "/PublishProduct/AddCatalog",
            data: j$.toJSON({ json: jsons }),
            msg: o,
            success: o.su_Add
        });
    }
}
Catelog.prototype.su_Add = function (m) {
    j$("#FAttentionDialog,#FAttentionDialogShadow,#PadB").hide();
    if (m != "0") {
        var o = this.msg;
        o.Property.CatelogId = m;
        o.pojtr.after("<tr class='cateone'><td class='nonebd' colspan='9'><div class='catetd' title='" + m + "'></div></td></tr>");
        var catetd = j$("div.catetd[title='" + m + "']");
        catetd.append("<span class='catetop gray'>您的报价" + (o.index + 1) + "：</span>");
        var cp = o.Property.CatelogPropertys;
        o.InitCatalogSpan(cp, catetd);
        catetd.append("<span class='green'>价格：</span><span class='pp'>" + o.Property.QuotePrice + "</span>人民币<div class='iaction'><div>");

        var iact = j$(".iaction", catetd);
        iact.append("<a href='javascript:void(0);' class='slinkd btcatamod mr10' href='#'>修改</a><a href='javascript:void(0);' class='slinkd btcatadel' href='#'>删除</a>");
        j$("a.btcatadel", iact).bind("click", { o: o }, o.bntDel);
        j$("a.btcatamod", iact).bind("click", { o: o }, o.bntModif);
        o.SetState();
        Catelog_Alert(1);
        j$("#FApad").hide();
    } else {
        Catelog_Alert(11);
    }
}
Catelog.prototype.bntModif = function (e) {
    AttentionDialog("#FAttentionDialog", ".bntFAttentionClose", "#PadB", "#FAttentionDialog");
    j$("#FAttentionDialog").validationEngine({ validationEventTriggers: "keyup" });
    var o = e.data.o;
    o.initPopWithV();
    j$("#FASubAdd").unbind("click").bind("click", { o: o }, o.SubModif);
}
Catelog.prototype.SubModif = function (e) {
    var o = e.data.o;
    o.Property.QuotePrice = j$("input#FAtxtprice").val();
    o.Property.CatelogPropertys = InitPropertyData();
    o.Getprop();
    var jsons = j$.toJSON(o.Property);
    j$.ajax({
        type: "POST",
        url: "/PublishProduct/ModifCatalog",
        data: "json=" + jsons,
        msg: o,
        success: o.su_Modif
    });
}
Catelog.prototype.su_Modif = function (m) {
    j$("#FAttentionDialog,#FAttentionDialogShadow,#PadB").hide();
    if (m != 0) {
        var o = this.msg;
        var catetd = j$("div.catetd[title='" + o.Property.CatelogId + "']");
        catetd.attr("title", m);
        o.Property.CatelogId = m;
        catetd.empty();

        catetd.append("<span class='catetop gray'>您的报价" + (o.index + 1) + "：</span>");
        var cp = o.Property.CatelogPropertys;
        o.InitCatalogSpan(cp, catetd);

        catetd.append("<span class='green'>价格：</span><span class='pp'>" + o.Property.QuotePrice + "</span>人民币<div class='iaction'><div>");
        var iact = j$(".iaction", catetd);
        iact.append("<a href='javascript:void(0);' class='slinkd btcatamod mr10' href='#'>修改</a><a href='javascript:void(0);' class='slinkd btcatadel' href='#'>删除</a>");
        j$("a.btcatadel", iact).bind("click", { o: o }, o.bntDel);
        j$("a.btcatamod", iact).bind("click", { o: o }, o.bntModif);
        o.SetState();
        Catelog_Alert(2);
    } else {
        Catelog_Alert(21);
    }
}

Catelog.prototype.bntDel = function (e) {
    var delanswer = confirm("确定删除?");
    if (delanswer) {
        var o = e.data.o;
        j$.ajax({
            url: "/PublishProduct/DelCatalog?cataId=" + o.Property.CatelogId,
            data: '{}',
            msg: o,
            success: o.su_Del
        });
    }
}
Catelog.prototype.su_Del = function (m) {
    if (m != 0) {
        var o = this.msg;
        var catetd = j$("div.catetd[title='" + o.Property.CatelogId + "']");
        catetd.closest("tr.cateone").remove();
        o.SetState();
        Catelog_Alert(3);
    } else {
        Catelog_Alert(31);
    }
}
Catelog.prototype.Getprop = function () {
    this.Property.FlightPrice = j$("input.oTrPrice", this.pojtr).val();
    this.Property.AcceptReturn = j$("select.oback", this.pojtr).val();
    this.Property.CatalogStatus = j$("select.ostore", this.pojtr).val();
    this.Property.Descript = j$("input.odes", this.pojtr).val();
    this.Property.ExpireTime = j$("select.odata", this.pojtr).val();
}
Catelog.prototype.initPop = function () {
    this.pbox.empty();
    var cp = this.Property.CatelogPropertysPre;
    for (var i = 0; i < cp.length; i++) {
        this.pbox.append("<div class='zf_item clearfix'><span class='d hidden'>" + cp[i].PropertyId + "</span><div class='zf_dis'><span class='n'>" + cp[i].PropertyName + "</span>(<span class='t'>" + cp[i].PropertyType + "</span>)：</div><div class='zf_con'><div id='radprop" + i + "' gg='" + i + "' class='radprop'></div></div></div>");
        var radprop = j$("#radprop" + i, this.pbox);
        for (var j = 0; j < cp[i].PropertyValues.length; j++) {
            radprop.append("<input type='checkbox' id='" + i + "popck" + j + "' /><label for='" + i + "popck" + j + "'>" + cp[i].PropertyValues[j].PropertyValue + "</label>");
        }
        radprop.append("<a class='popAdd'>添加新数值</a>");
        radprop.buttonset();
        j$("a.popAdd", radprop).bind("click", { ro: radprop }, bntPopVal);
    }
}
Catelog.prototype.initPopWithV = function () {
    this.pbox.empty();
    var cp = this.Property.CatelogPropertysPre;
    var vv = this.Property.CatelogPropertys;
    for (var i = 0; i < cp.length; i++) {
        this.pbox.append("<div class='zf_item clearfix'><span class='d hidden'>" + cp[i].PropertyId + "</span><div class='zf_dis'><span class='n'>" + cp[i].PropertyName + "</span>(<span class='t'>" + cp[i].PropertyType + "</span>)：</div><div class='zf_con'><div id='radprop" + i + "' gg='" + i + "' class='radprop'></div></div></div>");
        var radprop = j$("#radprop" + i, this.pbox);
        var boo = false;
        j$(vv).each(function () {
            if (this.PropertyId == cp[i].PropertyId) {
                var hash = MergeObj(cp[i].PropertyValues, this.PropertyValues);
                for (var j = 0; j < hash.length; j++) {
                    radprop.append("<input type='checkbox' id='" + i + "popck" + j + "' /><label for='" + i + "popck" + j + "'>" + hash[j] + "</label>");
                    j$(this.PropertyValues).each(function () {
                        if (this.PropertyValue == hash[j]) {
                            j$("input#" + i + "popck" + j).click();
                        }
                    });
                }
                boo = true;
            }
        });
        if (!boo) {
            for (var j = 0; j < cp[i].PropertyValues.length; j++) {
                radprop.append("<input type='checkbox' id='" + i + "popck" + j + "' /><label for='" + i + "popck" + j + "'>" + cp[i].PropertyValues[j].PropertyValue + "</label>");
            }
        }
        radprop.append("<a class='popAdd'>添加新数值</a>");
        radprop.buttonset();
        j$("a.popAdd", radprop).bind("click", { ro: radprop }, bntPopVal);
    }
    j$("input#FAtxtprice").val(this.Property.QuotePrice);
}
Catelog.prototype.SetState = function () {
    var i = 0;
    var c = this.pojtr.next("tr.cateone");
    while (c.size() != 0) {
        i++;
        c = c.next("tr.cateone");
    }
    var lab = j$("label.ui-button", this.pojtr);
    if (i > 0) {
        lab.addClass("ui-state-active").attr("aria-pressed", "true");
        lab.children(".ui-button-text").text("已选用");
        lab.children("span.ui-icon").removeClass("ui-icon-cancel").addClass("ui-icon-check");
        j$("button.ui-button span.ui-button-text", this.pojtr).text("继续发布");
    } else {
        lab.removeClass("ui-state-active").attr("aria-pressed", "fales");
        lab.children(".ui-button-text").text("未选用");
        lab.children("span.ui-icon").removeClass("ui-icon-check").addClass("ui-icon-cancel");
        j$("button.ui-button span.ui-button-text", this.pojtr).text("发布报价");
    }
}
Catelog.prototype.InitCatalogSpan = function (cp, catetd) {
    for (var i = 0; i < cp.length; i++) {
        if (cp[i].PropertyType == "") {
            catetd.append("<span class='cp' id='" + cp[i].PropertyId + "'><span class='green n'>" + cp[i].PropertyName + "</span>：</span>");
        } else {
            catetd.append("<span class='cp' id='" + cp[i].PropertyId + "'><span class='green n'>" + cp[i].PropertyName + "</span><span class='gray'>(<span class='t'>" + cp[i].PropertyType + "</span>)：</span></span>");
        }
        var scp = j$("span#" + cp[i].PropertyId, catetd);
        if (cp[i].PropertyValues.length == 0) {
            scp.append("所有；");
        } else {
            for (var j = 0; j < cp[i].PropertyValues.length; j++) {
                if (j == cp[i].PropertyValues.length - 1) {
                    scp.append("<span class='v'>" + cp[i].PropertyValues[j].PropertyValue + "</span>；");
                } else {
                    scp.append("<span class='v'>" + cp[i].PropertyValues[j].PropertyValue + "</span>，");
                }
            }
        }
    }
}
// Catelog Class Help --------------------------------------------------
var Catelog_Alert = function (i) {
    if (i == 11) {
        alert("添加失败！！");
    } else if (i == 1) {
        alert("添加成功！！");
    } else if (i == 21) {
        alert("修改失败！！");
    } else if (i == 2) {
        alert("修改成功！！");
    } else if (i == 31) {
        alert("删除失败！！");
    } else if (i == 3) {
        alert("删除成功！！");
    }
};
var InitPropertyData = function () {
    var CatelogPropertys = [];
    j$("#FAttentioProp .zf_item").each(function () {
        var CatelogPropertyV = [];
        j$("label[aria-pressed='true']", this).each(function () {
            var v = { PropertyValue: j$(this).children("span").text() };
            CatelogPropertyV.push(v);
        });
        var onep = {
            PropertyId: j$("span.d", this).text(),
            PropertyName: j$("span.n", this).text(),
            PropertyType: j$("span.t", this).text(),
            PropertyValues: CatelogPropertyV
        }
        CatelogPropertys.push(onep);
    });
    return CatelogPropertys;
}
var InitPropertyPageData = function (o) {
    var div = j$("div.catetd", o);
    var CatelogPropertys = [];
    j$("span.cp", div).each(function () {
        var CatelogPropertyV = [];
        j$("span.v", this).each(function () {
            var v = { PropertyValue: j$(this).text() };
            CatelogPropertyV.push(v);
        });
        var onep = {
            PropertyId: j$("input#cid", this).val(),
            PropertyName: j$("span.n", this).text(),
            PropertyType: j$("span.t", this).text(),
            PropertyValues: CatelogPropertyV
        }
        CatelogPropertys.push(onep);
    });
    return CatelogPropertys;
}
var bntPopVal = function (e) {
    j$("#PApad").show();
    var traget = e.data.ro;
    if (j$("#PAttentionDialog").css("display") == "block") {
        alert("请完成一个数值后再增加另一个。");
    } else {
        AttentionDialog("#PAttentionDialog", ".bntPAttentionClose", "#PadA");
        j$(".bntPAttentionClose").click(function () { j$("#PApad").hide() });
        j$("#PAttentionDialog input").val("");
        j$("#bntPopVal").one("click", function () {
            var vall = j$(this).prev("input").val();
            if (vall == "") {
                alert("不能为空值！！");
            } else {
                var gg = traget.attr("gg");
                var ind = j$("label", traget).size() + 1;
                j$("<input type='checkbox' id='" + gg + "popck" + ind + "' /><label for='" + gg + "popck" + ind + "'>" + vall + "</label>").prependTo(traget);
                traget.buttonset();
                j$("span.ui-button-text", traget).each(function () {
                    if (j$(this).text() == vall) {
                        j$(this).click();
                        j$(this).parent("label").attr("aria-pressed", "true");
                    }
                });
                j$("#PAttentionDialog,#PAttentionDialogShadow").hide();
            }
            j$("#PApad").hide();
        });
    }
}
var MergeObj = function (c, v) {
    var hash = [];
    for (var x = 0, elm; (elm = c[x]) != null; x++) {
        hash.push(elm.PropertyValue);
    }
    var pbool = {};
    for (var x = 0, elmv; (elmv = v[x]) != null; x++) {
        pbool[x] = false;
        for (var j = 0; j < hash.length; j++) {
            if (elmv.PropertyValue == hash[j]) {
                pbool[x] = false;
                break;
            } else {
                pbool[x] = true;
            }
        }
        if (pbool[x]) {
            hash.push(elmv.PropertyValue);
        }
    }
    return hash;
}

