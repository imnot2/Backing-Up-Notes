/*=======================PublishCatelog22.js===========================*/
j$(function () {
    navTurn("#nav_my"); j$(".pojcheck").each(function () {
        if (j$(this).attr("checked")) {
            j$(this).button({ icons: { secondary: "ui-icon-check"} });
        } else {
            j$(this).button({ icons: { secondary: "ui-icon-cancel"} });
        }
    });
    j$("label.ui-button,input.pojcheck", ".pojone").unbind();
    if (j$.browser.msie && j$.browser.version == "7.0") {
        j$("textarea#txtProDes").attr("cols", "109");
    }
    j$("#FAttentionDialog").validationEngine({ validationEventTriggers: "keyup" });
    adbox = j$("#FAttentionDialog");
    pbox = j$("#FAttentioProp", adbox);
    j$(".bntAddPrice").click(function () {
        var f = j$(this).closest("tr.pojone");
        if (f.validationEngine({ returnIsValid: true })) {
            var e = new Catelog(f);
            e.AddInit();
        }
    });
    j$(".btcatadel").click(function () {
        var e = j$(this).closest("div.catetd").attr("title"); var f = confirm("确定删除?"); if (f) {
            j$.ajax({
                url: "/PublishProduct/DelCatalog?cataId=" + e,
                data: "{}",
                msg: e,
                success: function (g) { if (g != 0) { var h = j$("div.catetd[title='" + this.msg + "']"); h.closest("tr.cateone").remove(); alert("删除成功！！") } else { alert("删除失败！！"); } }
            });
        }
    }); var c = false; var a;
    j$("select#odata").change(function () {
        var f = j$(this).val(); if (f == "add") {
            var e = j$("#datepicker");
            if (!c) {
                e.datepicker({ changeMonth: true, changeYear: true, minDate: 0 });
                c = true;
            }
            AttentionDialog("#DPAttentionDialog");
            j$("#DPAttentionDialog .Close").bind("click", function () { j$("select#odata").get(0).selectedIndex = 0 }); a = j$(this); j$("#bntDPSub").one("click", function () {
                var g = j$("td a.ui-state-active", e).text();
                var j = parseInt(j$("select.ui-datepicker-month", e).val()) + 1;
                var h = j$("select.ui-datepicker-year", e).val(); var i = h + "/" + j + "/" + g; var k = h + "年" + j + "月" + g + "日"; a.addOption(k, i); a.get(0).value = i;
            });
        }
    });
    var b = false; var d;
    j$(".bntCusDis").bind("click", function () {
        if (!b) {
            KISSY.Editor("txtProDes");
            b = true; AttentionDialog("#DAttentionDialog", "#PadB");
        } else {
            AttentionDialog("#DAttentionDialog", "#PadB");
        }
        d = j$(this).next("input.hdCusDis");
        pojId = j$(this).closest("tr.pojone").attr("title");
        j$(".ks-editor-content iframe").contents().find("body").html(d.val());
        j$("#btnDesSub").one("click", function () {
            d.val(j$(".ks-editor-content iframe").contents().find("body").html());
            j$.ajax({
                async: false,
                type: "POST",
                url: "/PublishProduct/AddProductCustomDesciption",
                data: j$.toJSON({ 'pid': pojId, 'pcc': d.val() }),
                msg: this,
                success: function (e) {
                    if (e.errorCode == 0) {
                        alert("您成功地添加了自定义描述！！");
                    } else {
                        if (e.errorMessage == "") {
                            alert("添加自定义描述失败，请稍后再试，或联系客服人员。");
                        } else {
                            alert(e.errorMessage);
                        }
                    }
                    j$("#DAttentionDialog,#DAttentionDialogShadow,#PadB").hide();
                }
            });
        });
    });
});
var Catelog = function (a) {
    this.pojtr = a;
    this.pojId = a.attr("title");
    this.index = a.nextAll("tr.cateone").size();
    this.Property = { 'ProductId': this.pojId, 'Descript': '', 'CatelogId': '' };
    j$.ajax({
        async: false,
        url: "/PublishProduct/GetProductProperty?pojId=" + this.pojId,
        data: "{}",
        msg: this,
        success: function (b) { this.msg.Property.CatelogPropertysPre = b; }
    });
};
Catelog.prototype.AddInit = function () {
    this.initPop();
    j$("#FASubAdd").unbind("click").bind("click", { o: this }, this.SubAdd);
    AttentionDialog("#FAttentionDialog", "#PadB");
};
Catelog.prototype.SubAdd = function (b) {
    if (adbox.validationEngine({ returnIsValid: true })) {
        var c = b.data.o;
        c.Getprop();
        var a = j$.toJSON(c.Property);
        j$.ajax({
            type: "POST",
            contentType: 'application/json;charset=utf-8',
            url: "/PublishProduct/AddCatalog",
            data: j$.toJSON({ 'json': a }),
            msg: c,
            success: function (d) {
                if (d.errorCode == 0) {
                    j$("#FAttentionDialog,#FAttentionDialogShadow,#PadB").hide(); var g = this.msg; g.Property.CatelogId = d.data; g.pojtr.after("<tr class='cateone'><td class='nonebd' colspan='9'><div class='catetd' title='" + g.Property.CatelogId + "'></div></td></tr>"); var f = j$("div.catetd[title='" + g.Property.CatelogId + "']"); g.InitCatalogSpan(f); var e = j$(".iaction", f); e.append("<a href='javascript:void(0);' class='slinkd btcatamod mr10' href='#'>修改</a><a href='javascript:void(0);' class='slinkd btcatadel' href='#'>删除</a>"); j$("a.btcatadel", e).bind("click", { o: g }, g.bntDel); g.SetState(); alert("您已成功发布报价，买家在30秒后即可看到此报价。");
                } else {
                    if (d.errorMessage == "") { alert("添加报价失败，请稍后再试，或联系客服人员。"); } else {
                        alert(d.errorMessage);
                    }
                }
            }
        });
    } else {
        alert("请按要求填写");
    }
};
Catelog.prototype.bntModif = function (a) {
    var b = a.data.o;
    b.initPopWithV();
    AttentionDialog("#FAttentionDialog", "#PadB");
    j$("#FASubAdd").unbind("click").bind("click", { o: b }, b.SubModif);
};
Catelog.prototype.SubModif = function (b) {
    if (adbox.validationEngine({ returnIsValid: true })) {
        var c = b.data.o;
        c.Getprop();
        var a = j$.toJSON(c.Property);
        j$.ajax({
            type: "POST",
            url: "/PublishProduct/ModifCatalog",
            data: j$.toJSON({'json': a}),
            msg: c,
            success: function (d) {
                if (d.errorCode == 0) {
                    j$("#FAttentionDialog,#FAttentionDialogShadow,#PadB").hide();
                    var g = this.msg;
                    var f = j$("div.catetd[title='" + g.Property.CatelogId + "']");
                    f.attr("title", d.data); g.Property.CatelogId = d.data; f.empty();
                    g.InitCatalogSpan(f);
                    var e = j$(".iaction", f);
                    e.append("<a href='javascript:void(0);' class='slinkd btcatamod mr10' href='#'>修改</a><a href='javascript:void(0);' class='slinkd btcatadel' href='#'>删除</a>");
                    j$("a.btcatadel", e).bind("click", { o: g }, g.bntDel);
                    j$("a.btcatamod", e).bind("click", { o: g }, g.bntModif);
                    g.SetState(); alert("您已成功修改报价！！");
                } else {
                    if (d.errorMessage == "") { alert("修改报价失败，请稍后再试，或联系客服人员。"); } else { alert(d.errorMessage); }
                }
            }
        });
    } else {
        alert("请按要求填写");
    }
};
Catelog.prototype.bntDel = function (b) {
    var a = confirm("确定删除?"); if (a) {
        var c = b.data.o; j$.ajax({ url: "/PublishProduct/DelCatalog?cataId=" + c.Property.CatelogId, data: "{}", msg: c, success: function (d) {
            if (d != 0) {
                var f = this.msg; var e = j$("div.catetd[title='" + f.Property.CatelogId + "']"); e.closest("tr.cateone").remove(); f.SetState(); alert("删除成功！");
            } else {
                alert("删除失败，请稍后再试。");
            }
        }
        });
    }
};
Catelog.prototype.initPop = function () {
    this.PopRestore();
    pbox.empty();
    var d = this.Property.CatelogPropertysPre;
    for (var c = 0; c < d.length; c++) {
        pbox.append("<div class='zf_item clearfix'><span class='d hidden'>" + d[c].PropertyId + "</span><div class='zf_dis'><span class='n'>" + d[c].PropertyName + "</span>(<span class='t'>" + d[c].PropertyType + "</span>)：</div><div class='zf_con'><div id='radprop" + c + "' gg='" + c + "' class='radprop'></div></div></div>"); var a = j$("#radprop" + c, pbox); for (var b = 0; b < d[c].PropertyValues.length; b++) { a.append("<input type='checkbox' id='" + c + "popck" + b + "' /><label for='" + c + "popck" + b + "'>" + d[c].PropertyValues[b].PropertyValue + "</label>"); } a.append("<a class='popAdd'>添加新数值</a>"); a.buttonset(); j$("a.popAdd", a).bind("click", { ro: a }, this.bntPopVal);
    }
};
Catelog.prototype.initPopWithV = function () {
    this.PopRestore();
    pbox.empty();
    var f = this.Property.CatelogPropertysPre;
    var e = this.Property.CatelogPropertys;
    for (var d = 0; d < f.length; d++) { pbox.append("<div class='zf_item clearfix'><span class='d hidden'>" + f[d].PropertyId + "</span><div class='zf_dis'><span class='n'>" + f[d].PropertyName + "</span>(<span class='t'>" + f[d].PropertyType + "</span>)：</div><div class='zf_con'><div id='radprop" + d + "' gg='" + d + "' class='radprop'></div></div></div>"); var a = j$("#radprop" + d, pbox); var c = false; j$(e).each(function () { if (this.PropertyId == f[d].PropertyId) { var h = MergeObj(f[d].PropertyValues, this.PropertyValues); for (var g = 0; g < h.length; g++) { a.append("<input type='checkbox' id='" + d + "popck" + g + "' /><label for='" + d + "popck" + g + "'>" + h[g] + "</label>"); j$(this.PropertyValues).each(function () { if (this.PropertyValue == h[g]) { j$("input#" + d + "popck" + g).click() } }) } c = true } }); if (!c) { for (var b = 0; b < f[d].PropertyValues.length; b++) { a.append("<input type='checkbox' id='" + d + "popck" + b + "' /><label for='" + d + "popck" + b + "'>" + f[d].PropertyValues[b].PropertyValue + "</label>") } } a.append("<a class='popAdd'>添加新数值</a>"); a.buttonset(); j$("a.popAdd", a).bind("click", { ro: a }, this.bntPopVal) } j$("input#FAtxtprice", adbox).val(this.Property.QuotePrice); j$("input#FAtxtFlightPrice", adbox).val(this.Property.FlightPrice); j$("select#oback", adbox).val(this.Property.AcceptReturn); j$("select#ostore", adbox).val(); if (j$("select#odata", adbox).isExistItem(this.Property.ExpireTime)) { j$("select#odata", adbox).get(0).value = this.Property.ExpireTime } else { j$("select#odata", adbox).addOption(this.Property.ExpireTime, this.Property.ExpireTime) }
}; Catelog.prototype.InitCatalogSpan = function (c) { c.append("<span class='gray'>您的报价" + (this.index + 1) + "：</span><span class='green'>价格:</span><span class='pp'>" + this.Property.QuotePrice + "</span>人民币；；<span class='green'>单件运费:</span><span class='y'>" + this.Property.FlightPrice + "</span>；<span class='green'>现货状况:</span><span class='x hidden'>" + this.Property.CatalogStatus + "</span>" + GetEnumTxt(cataEm, this.Property.CatalogStatus) + "；<span class='green'>退货条款:</span><span class='t hidden'>" + this.Property.AcceptReturn + "</span>" + GetEnumTxt(returnEm, this.Property.AcceptReturn) + "；<span class='green'>报价日期:</span><span class='b'>" + GetTimeNow() + "</span>；<span class='green'>截止日期:</span><span class='j'>" + this.Property.ExpireTime + "</span>；<br /><span class='in_bk' style='width:68px'></span>"); var d = this.Property.CatelogPropertys; for (var b = 0; b < d.length; b++) { if (d[b].PropertyType == "") { c.append("<span class='cp' id='" + d[b].PropertyId + "'><span class='green n'>" + d[b].PropertyName + "</span>:</span>") } else { c.append("<span class='cp' id='" + d[b].PropertyId + "'><span class='green n'>" + d[b].PropertyName + "</span><span class='gray'> (<span class='t'>" + d[b].PropertyType + "</span>):</span></span>") } var e = j$("span#" + d[b].PropertyId, c); if (d[b].PropertyValues.length == 0) { e.append("所有；") } else { for (var a = 0; a < d[b].PropertyValues.length; a++) { if (a == d[b].PropertyValues.length - 1) { e.append("<span class='v'>" + d[b].PropertyValues[a].PropertyValue + "</span>；") } else { e.append("<span class='v'>" + d[b].PropertyValues[a].PropertyValue + "</span>|") } } } } c.append("<div class='iaction'><div>") };
Catelog.prototype.Getprop = function () {
    this.Property.QuotePrice = j$("input#FAtxtprice").val();
    this.Property.FlightPrice = j$("input#FAtxtFlightPrice", adbox).val();
    this.Property.AcceptReturn = j$("select#oback", adbox).val();
    this.Property.CatalogStatus = j$("select#ostore", adbox).val();
    this.Property.ExpireTime = j$("select#odata", adbox).val();
    var a = []; j$(".zf_item", pbox).each(function () {
        var b = [];
        j$("label[aria-pressed='true']", this).each(function () {
            var d = { PropertyValue: j$(this).children("span").text()
            };
            b.push(d);
        });
        var c = { PropertyId: j$("span.d", this).text(), PropertyName: j$("span.n", this).text(), PropertyType: j$("span.t", this).text(), PropertyValues: b };
        a.push(c);
    });
    this.Property.CatelogPropertys = a;
};
Catelog.prototype.PopRestore = function () {
    j$("input#FAtxtprice").val("");
    j$("input#FAtxtFlightPrice", adbox).val("");
};
Catelog.prototype.GetPropertyPageData = function (b) { this.Property.QuotePrice = j$("span.pp", b).text(); this.Property.FlightPrice = j$("span.y", b).text(); this.Property.AcceptReturn = j$("span.t", adbox).val(); this.Property.CatalogStatus = j$("span.x", adbox).val(); this.Property.ExpireTime = j$("span.j", b).text(); var a = []; j$("span.cp", b).each(function () { var c = []; j$("span.v", this).each(function () { var e = { PropertyValue: j$(this).text() }; c.push(e) }); var d = { PropertyId: j$("input#cid", this).val(), PropertyName: j$("span.n", this).text(), PropertyType: j$("span.t", this).text(), PropertyValues: c }; a.push(d) }); this.Property.CatelogPropertys = a }; Catelog.prototype.bntPopVal = function (b) { var a = b.data.ro; AttentionDialog("#PAttentionDialog", "#PApad"); j$("#PAttentionDialog input").val(""); j$("#bntPopVal").unbind("click").one("click", function () { var d = j$(this).prev("input").val(); if (d == "") { alert("不能为空值！！") } else { var c = a.attr("gg"); var e = j$("label", a).size() + 1; j$("<input type='checkbox' id='" + c + "popck" + e + "' /><label for='" + c + "popck" + e + "'>" + d + "</label>").prependTo(a); a.buttonset(); j$("span.ui-button-text", a).each(function () { if (j$(this).text() == d) { j$(this).click(); j$(this).parent("label").attr("aria-pressed", "true") } }); j$("#PAttentionDialog,#PAttentionDialogShadow,#PApad").hide() } }) }; Catelog.prototype.SetState = function () { var b = 0; var d = this.pojtr.next("tr.cateone"); while (d.size() != 0) { b++; d = d.next("tr.cateone") } var a = j$("label.ui-button", this.pojtr); if (b > 0) { a.addClass("ui-state-active").attr("aria-pressed", "true"); a.children(".ui-button-text").text("已选用"); a.children("span.ui-icon").removeClass("ui-icon-cancel").addClass("ui-icon-check"); j$("button.bntAddPrice span.ui-button-text", this.pojtr).text("继续发布") } else { a.removeClass("ui-state-active").attr("aria-pressed", "fales"); a.children(".ui-button-text").text("未选用"); a.children("span.ui-icon").removeClass("ui-icon-check").addClass("ui-icon-cancel"); j$("button.bntAddPrice span.ui-button-text", this.pojtr).text("发布报价") } }; var MergeObj = function (i, d) { var g = []; for (var a = 0, h; (h = i[a]) != null; a++) { g.push(h.PropertyValue) } var f = {}; for (var a = 0, b; (b = d[a]) != null; a++) { f[a] = false; for (var e = 0; e < g.length; e++) { if (b.PropertyValue == g[e]) { f[a] = false; break } else { f[a] = true } } if (f[a]) { g.push(b.PropertyValue) } } return g }; var GetTimeNow = function () { var a = new Date(); var b = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate(); return b; };
