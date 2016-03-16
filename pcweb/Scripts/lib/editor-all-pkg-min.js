/*=======================editor-all-pkg-min.js===========================*/
/*
Constructor for kissy editor and module dependency definition
thanks to CKSource's intelligent work on CKEditor
@author: yiminghe@gmail.com, lifesinger@gmail.com
@version: 2.0
@buildtime: 2010-11-10 13:03:14
*/
KISSY.add("editor", function (r, p) {
    function t(n, g) {
        function a(A) { for (var q = t.Env.mods, j = 0; j < A.length; j++) { for (var w = A[j], s = u, B = 0; B < j; B++) if (w == A[B]) { s = z; break } B = q[w]; if (s && B) { s = r.clone(B); w = w + "_" + j; s.name = w; A[j] = w; q[w] || (q[w] = s) } } } var c = this; if (!(c instanceof t)) return new t(n, g); if (r.isString(n)) n = r.one(n); n = v._4e_wrap(n); g = g || {}; g.pluginConfig = g.pluginConfig || {}; c.cfg = g; g.pluginConfig = g.pluginConfig; c.cfg = g; r.app(c, r.EventTarget); var o = ["htmldataprocessor", "enterkey", "clipboard"], m = u; c.use = function (A,
q) { A = A.split(","); a(A); if (!m) for (var j = 0; j < o.length; j++) { var w = o[j]; r.inArray(w, A) || A.unshift(w) } r.use.call(c, A.join(","), function () { c.ready(function () { q && q.call(c); if (!m) { c.setData(n.val()); if (g.focus) c.focus(); else { var s = c.getSelection(); s && s.removeAllRanges() } c.fire("save"); m = z } }) }, { order: z, global: t }); return c }; c.use = c.use; c.init(n); return c
    } function y(n) {
        var g = r.Config.debug; n = g ? g === "dev" ? "../src/" + n : n : n.replace(/\.(js|css)/i, "-min.$1"); n += n.indexOf("?") != -1 ? "&" : "?"; n += "t=" + encodeURIComponent("2010-11-10 13:03:14");
        return n
    } var v = r.DOM, z = true, u = false; r.app(t, r.EventTarget); t.Config.base = r.Config.base + "editor/"; var k = ["separator", "sourcearea/support", "tabs", "flashbridge", "flashutils", "clipboard", { name: "colorsupport", requires: ["overlay"] }, { name: "colorsupport/dialog" }, { name: "forecolor", requires: ["colorsupport"] }, { name: "bgcolor", requires: ["colorsupport"] }, { name: "elementpaths" }, "enterkey", { name: "pagebreak", requires: ["fakeobjects"] }, { name: "fakeobjects", requires: ["htmldataprocessor"] }, { name: "draft", requires: ["localStorage"] },
{ name: "flash", requires: ["flash/support"] }, { name: "flash/dialog" }, { name: "flash/support", requires: ["flashutils", "contextmenu", "fakeobjects", "bubbleview"] }, { name: "font", requires: ["select"] }, "format", { name: "htmldataprocessor" }, { name: "image", requires: ["contextmenu", "bubbleview"] }, { name: "image/dialog", requires: ["tabs"] }, "indent", "justify", { name: "link", requires: ["bubbleview"] }, { name: "link/dialog" }, "list", "maximize", { name: "music", requires: ["flash/support"] }, { name: "music/dialog", requires: ["flash/dialog"] },
"preview", "removeformat", { name: "smiley" }, { name: "sourcearea", requires: ["sourcearea/support"] }, { name: "table", requires: ["contextmenu"] }, { name: "table/dialog" }, { name: "templates", requires: ["overlay"] }, "undo", { name: "resize", requires: ["dd"]}], h, i, d, b, e = {}; h = 0; for (i = k.length; h < i; h++) { d = k[h]; if (r.isString(d)) d = k[h] = { name: d + "", requires: null }; b = d.requires || []; var f = ["button"]; d.name.indexOf("/dialog") != -1 && f.push("overlay"); d.requires = b.concat(f) } k = [{ name: "localStorage", requires: ["flashutils", "flashbridge"] },
{ name: "button" }, { name: "dd" }, { name: "progressbar" }, { name: "overlay", requires: ["dd"] }, { name: "contextmenu", requires: ["overlay"] }, { name: "bubbleview", requires: ["overlay"] }, { name: "select", requires: ["overlay"]}].concat(k); h = 0; for (i = k.length; h < i; h++) { d = k[h]; b = d.name; e[b] = { attach: u, charset: "utf-8", requires: d.requires, csspath: d.useCss ? y("plugins/" + b + "/plugin.css") : p, path: y("plugins/" + b + "/plugin.js")} } t.add(e); r.Editor = t; r.Editor = t
});
KISSY.Editor.add("utils", function (r) {
    var p = null, t = KISSY, y = t.Node, v = t.DOM, z = t.UA, u = t.Event, k = { debugUrl: function (h) { var i = t.Config.debug; h = i ? i === "dev" ? "../src/" + h : h : h.replace(/\.(js|css)/i, "-min.$1"); h += h.indexOf("?") != -1 ? "&" : "?"; h += "t=" + encodeURIComponent("2010-11-16 12:37:26"); return h }, lazyRun: function (h, i, d) { var b = h[i], e = h[d]; h[i] = function () { b.apply(this, arguments); h[i] = h[d]; return e.apply(this, arguments) } }, getXY: function (h, i, d, b) {
        d = d.defaultView || d.parentWindow; h -= v.scrollLeft(d); i -= v.scrollTop(d);
        if (b) if (d != (b.defaultView || b.parentWindow) && d.frameElement) { b = v._4e_getOffset(d.frameElement, b); h += b.left; i += b.top } return { left: h, top: i}
    }, tryThese: function () { for (var h, i = 0, d = arguments.length; i < d; i++) { var b = arguments[i]; try { h = b(); break } catch (e) { } } return h }, arrayCompare: function (h, i) { if (!h && !i) return true; if (!h || !i || h.length != i.length) return false; for (var d = 0; d < h.length; d++) if (h[d] !== i[d]) return false; return true }, getByAddress: function (h, i, d) {
        h = h.documentElement; for (var b = 0; h && b < i.length; b++) {
            var e =
i[b]; if (d) for (var f = -1, n = 0; n < h.childNodes.length; n++) { var g = h.childNodes[n]; if (!(d === true && g.nodeType == 3 && g.previousSibling && g.previousSibling.nodeType == 3)) { f++; if (f == e) { h = g; break } } } else h = h.childNodes[e]
        } return h ? new y(h) : p
    }, clearAllMarkers: function (h) { for (var i in h) h[i]._4e_clearMarkers(h, true) }, htmlEncodeAttr: function (h) { return h.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/, "&gt;") }, ltrim: function (h) { return h.replace(/^\s+/, "") }, rtrim: function (h) { return h.replace(/\s+$/, "") }, trim: function (h) { return this.ltrim(this.rtrim(h)) },
        mix: function () { for (var h = {}, i = 0; i < arguments.length; i++) h = t.mix(h, arguments[i]); return h }, isCustomDomain: function () { if (!z.ie) return false; var h = document.domain, i = window.location.hostname; return h != i && h != "[" + i + "]" }, duplicateStr: function (h, i) { return Array(i + 1).join(h) }, throttle: function (h, i, d) { d = d || 150; if (d === -1) return function () { h.apply(i, arguments) }; var b = (new Date).getTime(); return function () { var e = (new Date).getTime(); if (e - b > d) { b = e; h.apply(i, arguments) } } }, buffer: function (h, i, d) {
            d = d || 0; var b = p; return function () {
                b &&
clearTimeout(b); var e = arguments; b = setTimeout(function () { return h.apply(i, e) }, d)
            } 
        }, isNumber: function (h) { return /^\d+(.\d+)?$/.test(t.trim(h)) }, verifyInputs: function (h) { for (var i = 0; i < h.length; i++) { var d = v._4e_wrap(h[i]), b = t.trim(d.val()), e = d.attr("data-verify"); d = d.attr("data-warning"); if (e && !RegExp(e).test(b)) { alert(d); return false } } return true }, sourceDisable: function (h, i) { h.on("sourcemode", i.disable, i); h.on("wysiwygmode", i.enable, i) }, resetInput: function (h) {
            var i = h.attr("placeholder"); if (i && !z.webkit) {
                h.addClass("ke-input-tip");
                h.val(i)
            } else z.webkit && h.val("")
        }, valInput: function (h, i) { h.removeClass("ke-input-tip"); h.val(i) }, placeholder: function (h, i) { h.attr("placeholder", i); if (!z.webkit) { h.on("blur", function () { if (!t.trim(h.val())) { h.addClass("ke-input-tip"); h.val(i) } }); h.on("focus", function () { h.removeClass("ke-input-tip"); t.trim(h.val()) == i && h.val("") }) } }, clean: function (h) { h = h[0] || h; for (var i = t.makeArray(h.childNodes), d = 0; d < i.length; d++) { var b = i[d]; b.nodeType == r.NODE.NODE_TEXT && !t.trim(b.nodeValue) && h.removeChild(b) } }, htmlEncode: function (h) {
            return !h ?
h : String(h).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
        }, htmlDecode: function (h) { return !h ? h : String(h).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") }, equalsIgnoreCase: function (h, i) { return h.toLowerCase() == i.toLowerCase() }, normParams: function (h) { h = t.clone(h); for (var i in h) if (h.hasOwnProperty(i)) { var d = h[i]; if (t.isFunction(d)) h[i] = d() } return h }, doFormUpload: function (h, i, d) {
            function b() {
                var o = { responseText: "", responseXML: p };
                o.argument = h ? h.argument : p; try { var m; if ((m = z.ie ? f.contentWindow.document : f.contentDocument || window.frames[e].document) && m.body) o.responseText = m.body.innerHTML; o.responseXML = m && m.XMLDocument ? m.XMLDocument : m } catch (A) { t.log(A) } u.remove(f, "load", b); h.callback && h.callback(o); setTimeout(function () { v._4e_remove(f) }, 100)
            } var e = t.guid("form-upload-"), f = document.createElement("iframe"); f.id = e; f.name = e; f.className = "ke-hidden"; var n = "document.open();" + (k.isCustomDomain() ? 'document.domain="' + document.domain + '";' :
"") + "document.close();"; if (z.ie) f.src = z.ie ? "javascript:void(function(){" + encodeURIComponent(n) + "}())" : ""; t.log("doFormUpload : " + f.src); document.body.appendChild(f); if (z.ie) document.frames[e].name = e; n = v._4e_unwrap(h.form); var g = { target: n.target, method: n.method, encoding: n.encoding, enctype: n.enctype, action: n.action }; n.target = e; n.method = "POST"; n.enctype = n.encoding = "multipart/form-data"; if (d) n.action = d; var a; if (i) {
                a = []; i = r.Utils.normParams(i); for (var c in i) if (i.hasOwnProperty(c)) {
                    d = document.createElement("input");
                    d.type = "hidden"; d.name = c; d.value = i[c]; n.appendChild(d); a.push(d)
                } 
            } u.on(f, "load", b); n.submit(); n.target = g.target; n.method = g.method; n.enctype = g.enctype; n.encoding = g.encoding; n.action = g.action; if (a) { i = 0; for (c = a.length; i < c; i++) v._4e_remove(a[i]) } return f
        }, extern: function (h, i) { for (var d in i) h[d] = i[d] }, map: function (h, i) { for (var d = 0; d < h.length; d++) h[d] = i(h[d]); return h } 
    }; r.Utils = k; r.Utils = k; k.extern(k, { debugUrl: k.debugUrl, lazyRun: k.lazyRun, getXY: k.getXY, tryThese: k.tryThese, arrayCompare: k.arrayCompare, getByAddress: k.getByAddress,
        clearAllMarkers: k.clearAllMarkers, htmlEncodeAttr: k.htmlEncodeAttr, ltrim: k.ltrim, rtrim: k.rtrim, trim: k.trim, mix: k.mix, isCustomDomain: k.isCustomDomain, duplicateStr: k.duplicateStr, buffer: k.buffer, isNumber: k.isNumber, verifyInputs: k.verifyInputs, sourceDisable: k.sourceDisable, resetInput: k.resetInput, placeholder: k.placeholder, clean: k.clean, htmlEncode: k.htmlEncode, htmlDecode: k.htmlDecode, equalsIgnoreCase: k.equalsIgnoreCase, normParams: k.normParams, throttle: k.throttle, doFormUpload: k.doFormUpload, map: k.map
    })
});
KISSY.Editor.add("focusmanager", function (r) {
    function p() { this.iframeFocus = h; k = this } function t() { this.iframeFocus = i; k = d } var y = KISSY, v = y.DOM, z = y.Event, u = {}, k; y = { refreshAll: function () { for (var b in u) { var e = u[b]; e.document.designMode = "off"; e.document.designMode = "on" } }, currentInstance: function () { return k }, getInstance: function (b) { return u[b] }, add: function (b) { var e = v._4e_getWin(b.document); z.on(e, "focus", p, b); z.on(e, "blur", t, b) }, register: function (b) { u[b._UUID] = b }, remove: function (b) {
        delete u[b._UUID]; var e =
v._4e_getWin(b.document); z.remove(e, "focus", p, b); z.remove(e, "blur", t, b)
    } 
    }; var h = true, i = false, d = null; r.focusManager = y; r.focusManager = y; r.getInstances = function () { return u }; r.getInstances = r.getInstances
});
KISSY.Editor.add("definition", function (r) {
    var p = true, t = false, y = document, v = KISSY, z = v.UA, u = v.DOM, k = v.Node, h = v.Event, i = r.focusManager, d = r.Utils.tryThese, b = r.Utils.debugUrl("theme/editor-iframe.css"), e = 1, f = "document.open();" + (r.Utils.isCustomDomain() ? 'document.domain="' + y.domain + '";' : "") + "document.close();", n = "<div  class='ke-editor-wrap'  > <div class='" + ".ke-editor-tools".substring(1) + "'></div><div class='" + ".ke-textarea-wrap".substring(1) + '\'><iframe  style="width:100%;height:100%;border:none;"  width="100%"  height="100%"  frameborder="0"  title="kissy-editor"  src="' +
(z.ie ? "javascript:void(function(){" + encodeURIComponent(f) + "}())" : "") + '"  tabIndex="' + (z.webkit ? -1 : "$(tabIndex)") + '"  allowTransparency="true" ></iframe></div><div class=\'' + ".ke-editor-status".substring(1) + "'></div></div>"; r.SOURCE_MODE = 0; r.WYSIWYG_MODE = 1; r.SOURCE_MODE = r.SOURCE_MODE; r.WYSIWYG_MODE = r.WYSIWYG_MODE; v.augment(r, { init: function (g) {
    if (z.ie) u.addClass(y.body, "ie" + z.ie); else if (z.gecko) u.addClass(y.body, "gecko"); else z.webkit && u.addClass(y.body, "webkit"); var a = this, c = new k(n.replace(/\$\(tabIndex\)/,
g.attr("tabIndex"))); c.on("mousedown", function (A) { if (z.webkit) { var q = u._4e_name(A.target); if (q == "select" || q == "option") return p } A.halt() }); g.on("mousedown", function (A) { A.stopPropagation() }); a.editorWrap = c; a._UUID = e++; i.register(a); a.wrap = c.one(".ke-textarea-wrap"); a.wrap = a.wrap; a.iframe = a.wrap.one("iframe"); a.iframe = a.iframe; a.toolBarDiv = c.one(".ke-editor-tools"); a.toolBarDiv = a.toolBarDiv; a.textarea = g; a.textarea = a.textarea; a.statusDiv = c.one(".ke-editor-status"); a.statusDiv = a.statusDiv; a.toolBarDiv._4e_unselectable();
    a._commands = {}; a._dialogs = {}; var o = g._4e_style("width"), m = g._4e_style("height"); if (o) { c.css("width", o); g.css("width", "100%") } a.textarea.css("display", "none"); c.insertAfter(g); a.wrap[0].appendChild(g[0]); if (m) { a.wrap.css("height", m); g.css("height", "100%") } c = a.iframe; a.on("dataReady", function () { a._ready = p; r.fire("instanceCreated", { editor: a }) }); z.gecko ? c.on("load", a._setUpIFrame, a) : a._setUpIFrame(); a.cfg.attachForm && g[0].form && a._attachForm()
}, _attachForm: function () {
    (new k(this.textarea[0].form)).on("submit",
this.sync, this)
}, useDialog: function (g, a) { var c = this, o = r.SimpleOverlay; o.loading(); c.use(g, function () { var m = c.getDialog(g); a(m); o.unloading() }) }, addDialog: function (g, a) { this._dialogs[g] = a }, getDialog: function (g) { return this._dialogs[g] }, addPlugin: function (g) { this.ready(g) }, addCommand: function (g, a) { this._commands[g] = a }, hasCommand: function (g) { return this._commands[g] }, execCommand: function (g) { var a = this._commands[g], c = v.makeArray(arguments); c.shift(); c.unshift(this); return a.exec.apply(a, c) }, getMode: function () {
    return this.textarea.css("display") ==
"none" ? r.WYSIWYG_MODE : r.SOURCE_MODE
}, getData: function (g) { var a; a = this.getMode() == r.WYSIWYG_MODE ? this.document.body.innerHTML : this.textarea.val(); if (this.htmlDataProcessor) a = g ? this.htmlDataProcessor.toHtml(a, "p") : this.htmlDataProcessor.toServer(a, "p"); a = v.trim(a); if (/^<p>((&nbsp;)|\s)*<\/p>$/.test(a)) a = ""; return a }, setData: function (g) { var a = g; if (this.htmlDataProcessor) a = this.htmlDataProcessor.toDataFormat(g, "p"); this.document.body.innerHTML = a; this.getMode() != r.WYSIWYG_MODE && this.textarea.val(g) }, sync: function () { this.textarea.val(this.getData()) },
    baseZIndex: function (g) { g = g || 0; return g + (this.cfg.baseZIndex || 0) }, _getRawData: function () { return this.document.body.innerHTML }, _setRawData: function (g) { this.document.body.innerHTML = g }, _prepareIFrameHtml: function (g) {
        var a = this.cfg, c = a.customLink, o = ""; if (c) for (var m = 0; m < c.length; m++) o += '<link href="' + c[m] + '" rel="stylesheet"/>'; return "<!doctype html><html><head><title>${title}</title><link href='" + r.Config.base + b + "' rel='stylesheet'/><style>" + (a.customStyle || "") + "</style>" + o + "</head><body class='ke-editor'>&nbsp;" +
(g ? '<script id="ke_actscript" type="text/javascript">' + (r.Utils.isCustomDomain() ? 'document.domain="' + y.domain + '";' : "") + 'window.parent.KISSY.Editor._initIFrame("' + g + '");<\/script>' : "") + "</body></html>"
    }, getSelection: function () { return r.Selection.getSelection(this.document) }, focus: function () { var g = this.document, a = u._4e_getWin(g); z.webkit && a && a.parent && a.parent.focus(); a && a.focus(); g && g.body.focus(); this.notifySelectionChange() }, blur: function () { u._4e_getWin(this.document).blur(); this.document && this.document.body.blur() },
    addCustomStyle: function (g) { var a = this.cfg, c = this.document; a.customStyle = a.customStyle || ""; a.customStyle += "\n" + g; a = c.createElement("style"); c.getElementsByTagName("head")[0].appendChild(a); if (a.styleSheet) a.styleSheet.cssText = g; else a.appendChild(c.createTextNode(g)) }, addCustomLink: function (g) { var a = this.cfg, c = this.document; a.customLink = a.customLink || []; a.customLink.push(g); a = c.createElement("link"); a.rel = "stylesheet"; c.getElementsByTagName("head")[0].appendChild(a); a.href = g }, removeCustomLink: function (g) {
        for (var a =
this.cfg, c = v.makeArray(this.document.getElementsByTagName("link")), o = 0; o < c.length; o++) c[o].href == g && u._4e_remove(c[o]); a.customLink = a.customLink || []; a = a.customLink; g = v.indexOf(g, a); g != -1 && a.splice(g, 1)
    }, _setUpIFrame: function () { function g() { A = m.document; a.document = A; c.detach(); A.open("text/html", "replace"); A.write(o); A.close() } var a = this, c = a.iframe, o = a._prepareIFrameHtml(a._UUID), m = c[0].contentWindow, A; try { A = m.document } catch (q) { c[0].src = c[0].src; if (z.ie < 7) { setTimeout(g, 10); return } } g() }, ready: function (g) {
        this._ready ?
g() : this.on("dataReady", g)
    }, _monitor: function () { var g = this; g._monitorId && clearTimeout(g._monitorId); g._monitorId = setTimeout(function () { var a = g.getSelection(); if (a && !a.isInvalid) { var c = a.getStartElement(), o = new r.ElementPath(c); if (!g.previousPath || !g.previousPath.compare(o)) { g.previousPath = o; g.fire("selectionChange", { selection: a, path: o, element: c }) } } }, 100) }, notifySelectionChange: function () { this.previousPath = null; this._monitor() }, insertElement: function (g, a) {
        var c = this; c.focus(); var o = g._4e_name(), m =
r.XHTML_DTD, A = r.RANGE, q = r.NODE, j = m.$block[o], w = c.getSelection(), s = w && w.getRanges(), B, l, x, C, E; if (!s || s.length == 0) { var D = arguments, F = D.callee; setTimeout(function () { F.apply(c, D) }, 30) } else {
            c.fire("save"); for (var L = s.length - 1; L >= 0; L--) {
                B = s[L]; B.deleteContents(); l = !L && g || g._4e_clone(p); a && a(l); if (j) for (; (C = B.getCommonAncestor(t, p)) && (E = m[C._4e_name()]) && !(E && E[o]); ) if (C._4e_name() in m.span) B.splitElement(C); else if (B.checkStartOfBlock() && B.checkEndOfBlock()) { B.setStartBefore(C); B.collapse(p); C._4e_remove() } else B.splitBlock();
                B.insertNode(l); x || (x = l)
            } if (x) {
                o = x._4e_nextSourceNode(p); m = c.document; E = r.XHTML_DTD; if (E.$inline[l._4e_name()]) { o = new k(m.createTextNode(" ")); o.insertAfter(x) } else if (o) { if (o._4e_name() == "br" && E[o.parent()._4e_name()].p) { E = new k("<p>&nbsp;</p>", null, m); o[0].parentNode.replaceChild(E[0], o[0]); o = E } } else { E = new k("<p>&nbsp;</p>", null, m); E.insertAfter(x); o = E } B.moveToPosition(x, A.POSITION_AFTER_END); o && o[0].nodeType == q.NODE_ELEMENT && B.moveToElementEditablePosition(o); w.selectRanges([B]); c.focus(); l && l._4e_scrollIntoView();
                setTimeout(function () { c.fire("save") }, 10); return l
            } 
        } 
    }, insertHtml: function (g) {
        var a = this; if (a.htmlDataProcessor) g = a.htmlDataProcessor.toDataFormat(g); if (z.webkit) { var c = u.create(g, null, this.document); c = c.nodeType == 11 ? v.makeArray(c.childNodes) : [c]; for (var o = 0; o < c.length; o++) a.insertElement(new k(c[o])) } else {
            a.focus(); o = (c = a.getSelection()) && c.getRanges(); if (!o || o.length == 0) { var m = arguments, A = m.callee; setTimeout(function () { A.apply(a, m) }, 30) } else {
                a.fire("save"); if (z.ie) {
                    c = c.getNative(); c.type == "Control" &&
c.clear(); c.createRange().pasteHTML(g)
                } else a.document.execCommand("inserthtml", t, g); a.focus(); setTimeout(function () { a.fire("save") }, 10)
            } 
        } 
    } 
}); r._initIFrame = function (g) {
    function a(l) { d(function () { m.designMode = "on"; setTimeout(function () { m.designMode = "off"; j.focus(); if (!arguments.callee.retry) arguments.callee.retry = p }, 50) }, function () { m.designMode = "off"; u.attr(j, "contentEditable", t); u.attr(j, "contentEditable", p); !l && a(1) }) } var c = i.getInstance(g); g = c.textarea[0]; var o = c.iframe[0].contentWindow, m = c.document,
A = c.cfg, q = m.getElementById("ke_actscript"); u._4e_remove(q); var j = m.body; if (z.ie) { j.hideFocus = p; j.disabled = p; j.contentEditable = p; j.removeAttribute("disabled") } else setTimeout(function () { if (z.gecko || z.opera) j.contentEditable = p; else if (z.webkit) j.parentNode.contentEditable = p; else m.designMode = "on" }, 0); if (z.webkit) {
        h.on(m, "click", function (l) { var x = new k(l.target); v.inArray(x._4e_name(), ["input", "select"]) && l.preventDefault() }); h.on(m, "mouseup", function (l) {
            var x = new k(l.target); v.inArray(x._4e_name(),
["input", "textarea"]) && l.preventDefault()
        })
    } if (z.gecko || z.ie || z.opera) { var w; w = new k(u.insertAfter((new k('<span tabindex="-1" style="position:absolute; left:-10000" role="presentation"></span>'))[0], g)); w.on("focus", function () { c.focus() }); c.activateGecko = function () { z.gecko && c.iframeFocus && w[0].focus() }; c.on("destroy", function () { }) } if (z.ie && m.compatMode == "CSS1Compat" || z.gecko || z.opera) { var s = new k(m.documentElement); s.on("mousedown", function (l) { if (l.target == s[0]) { z.gecko && a(t); w[0].focus() } }) } h.on(o,
"focus", function () { if (z.gecko) a(t); else z.opera && j.focus(); c.notifySelectionChange() }); z.gecko && h.on(c.document, "mousedown", function () { c.iframeFocus || a(t) }); if (z.ie) {
        h.on(m, "keydown", function (l) { if (l.keyCode in { 8: 1, 46: 1 }) { var x = c.getSelection(), C = x.getSelectedElement(); if (C) { c.fire("save"); var E = x.getRanges()[0].createBookmark(); C._4e_remove(); x.selectBookmarks([E]); c.fire("save"); l.preventDefault() } } }); if (m.compatMode == "CSS1Compat") {
            var B = { 33: 1, 34: 1 }; h.on(m, "keydown", function (l) {
                l.keyCode in B &&
setTimeout(function () { c.getSelection().scrollIntoView() }, 0)
            })
        } 
    } setTimeout(function () { z.ie && setTimeout(function () { if (m) { j.runtimeStyle.marginBottom = "0px"; j.runtimeStyle.marginBottom = "" } }, 1E3) }, 0); setTimeout(function () { c.fire("dataReady"); var l = A.disableObjectResizing, x = A.disableInlineTableEditing; if (l || x) try { m.execCommand("enableObjectResizing", t, !l); m.execCommand("enableInlineTableEditing", t, !x) } catch (C) { h.on(j, z.ie ? "resizestart" : "resize", function (E) { if (l || u._4e_name(E.target) === "table" && x) E.preventDefault() }) } },
10); z.webkit && h.on(m, "mousedown", function (l) { l = new k(l.target); v.inArray(l._4e_name(), ["img", "hr", "input", "textarea", "select"]) && c.getSelection().selectElement(l) }); z.gecko && h.on(m, "dragstart", function (l) { var x = new k(l.target); x._4e_name() === "img" && /ke_/.test(x[0].className) && l.preventDefault() }); i.add(c)
}; f = r.prototype; r.Utils.extern(f, { setData: f.setData, getData: f.getData, insertElement: f.insertElement, insertHtml: f.insertHtml, ready: f.ready, addCustomStyle: f.addCustomStyle, addCommand: f.addCommand, hasCommand: f.hasCommand,
    execCommand: f.execCommand, addPlugin: f.addPlugin, useDialog: f.useDialog, addDialog: f.addDialog, getDialog: f.getDialog, getMode: f.getMode, sync: f.sync, baseZIndex: f.baseZIndex, getSelection: f.getSelection, focus: f.focus, blur: f.blur, notifySelectionChange: f.notifySelectionChange
})
});
KISSY.Editor.add("zindex", function () { var r = KISSY.Editor; if (!r.zIndexManager) { r.zIndexManager = { BUBBLE_VIEW: 1100, POPUP_MENU: 1200, DD_PG: 99999, MAXIMIZE: 900, OVERLAY: 9999, LOADING: 11E3, LOADING_CANCEL: 12E3, SELECT: 1200 }; r.baseZIndex = function (p) { var t = p, y = r.getInstances(), v; for (v in y) { if (!y.hasOwnProperty(v)) return; t = Math.max(t, y[v].baseZIndex(p)) } return t }; r.baseZIndex = r.baseZIndex; r.zIndexManager = r.zIndexManager } });
KISSY.Editor.add("dtd", function (r) {
    r.XHTML_DTD = function () {
        function p(q) { for (var j = arguments.length - 1; j > 0; ) KISSY.mix(q, arguments[j--]); return q } var t = { isindex: 1, fieldset: 1 }, y = { input: 1, button: 1, select: 1, textarea: 1, label: 1 }, v = p({ a: 1 }, y), z = p({ iframe: 1 }, v), u = { hr: 1, ul: 1, menu: 1, div: 1, blockquote: 1, noscript: 1, table: 1, center: 1, address: 1, dir: 1, pre: 1, h5: 1, dl: 1, h4: 1, noframes: 1, h6: 1, ol: 1, h1: 1, h3: 1, h2: 1 }, k = { ins: 1, del: 1, script: 1, style: 1 }, h = p({ b: 1, acronym: 1, bdo: 1, "var": 1, "#": 1, abbr: 1, code: 1, br: 1, i: 1, cite: 1, kbd: 1,
            u: 1, strike: 1, s: 1, tt: 1, strong: 1, q: 1, samp: 1, em: 1, dfn: 1, span: 1
        }, k), i = p({ sub: 1, img: 1, object: 1, sup: 1, basefont: 1, map: 1, applet: 1, font: 1, big: 1, small: 1 }, h), d = p({ p: 1 }, i); y = p({ iframe: 1 }, i, y); i = { img: 1, noscript: 1, br: 1, kbd: 1, center: 1, button: 1, basefont: 1, h5: 1, h4: 1, samp: 1, h6: 1, ol: 1, h1: 1, h3: 1, h2: 1, form: 1, font: 1, "#": 1, select: 1, menu: 1, ins: 1, abbr: 1, label: 1, code: 1, table: 1, script: 1, cite: 1, input: 1, iframe: 1, strong: 1, textarea: 1, noframes: 1, big: 1, small: 1, span: 1, hr: 1, sub: 1, bdo: 1, "var": 1, div: 1, object: 1, sup: 1, strike: 1, dir: 1, map: 1,
            dl: 1, applet: 1, del: 1, isindex: 1, fieldset: 1, ul: 1, b: 1, acronym: 1, a: 1, blockquote: 1, i: 1, u: 1, s: 1, tt: 1, address: 1, q: 1, pre: 1, p: 1, em: 1, dfn: 1
        }; var b = p({ a: 1 }, y), e = { tr: 1 }, f = { "#": 1 }, n = p({ param: 1 }, i), g = p({ form: 1 }, t, z, u, d), a = { li: 1 }, c = { base: 1, link: 1, meta: 1, title: 1 }, o = p(c, { style: 1, script: 1 }), m = { head: 1, body: 1 }, A = { address: 1, blockquote: 1, center: 1, dir: 1, div: 1, dl: 1, fieldset: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, hr: 1, isindex: 1, menu: 1, noframes: 1, ol: 1, p: 1, pre: 1, table: 1, ul: 1 }; return { $nonBodyContent: p({ html: 1 }, m, c), $block: A,
            $blockLimit: { body: 1, div: 1, td: 1, th: 1, caption: 1, form: 1 }, $inline: b, $body: p({ script: 1, style: 1 }, A), $cdata: { script: 1, style: 1 }, $empty: { area: 1, base: 1, br: 1, col: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, param: 1 }, $listItem: { dd: 1, dt: 1, li: 1 }, $list: { ul: 1, ol: 1, dl: 1 }, $nonEditable: { applet: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, script: 1, textarea: 1, param: 1 }, $removeEmpty: { abbr: 1, acronym: 1, address: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1,
                strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1
            }, $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 }, $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }, html: m, head: o, style: f, body: g, base: {}, link: {}, meta: {}, title: f, col: {}, tr: { td: 1, th: 1 }, img: {}, colgroup: { col: 1 }, noscript: g, td: g, br: {}, th: g, center: g, kbd: b, button: p(d, u), basefont: {}, h5: b, h4: b, samp: b, h6: b, ol: a, h1: b, h3: b, option: f, h2: b, form: p(t, z, u, d), select: { optgroup: 1, option: 1 }, font: b, ins: b, menu: a, abbr: b, label: b, table: { thead: 1,
                col: 1, tbody: 1, tr: 1, colgroup: 1, caption: 1, tfoot: 1
            }, code: b, script: f, tfoot: e, cite: b, li: g, input: {}, iframe: g, strong: b, textarea: f, noframes: g, big: b, small: b, span: b, hr: {}, dt: b, sub: b, optgroup: { option: 1 }, param: {}, bdo: b, "var": b, div: g, object: n, sup: b, dd: g, strike: b, area: {}, dir: a, map: p({ area: 1, form: 1, p: 1 }, t, k, u), applet: n, dl: { dt: 1, dd: 1 }, del: b, isindex: {}, fieldset: p({ legend: 1 }, i), thead: e, ul: a, acronym: b, b: b, a: y, blockquote: g, caption: b, i: b, u: b, tbody: e, s: b, address: p(z, d), tt: b, legend: b, q: b, pre: p(h, v), p: b, em: b, dfn: b
        }
    } (); r.XHTML_DTD =
r.XHTML_DTD
});
KISSY.Editor.add("dom", function (r) {
    function p(a) { return a.replace(/-(\w)/g, function (c, o) { return o.toUpperCase() }) } var t = KISSY, y = t.DOM, v = t.UA, z = t.Node, u = r.Utils, k = { abbr: 1, acronym: 1, address: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }; r.NODE = { NODE_ELEMENT: 1, NODE_TEXT: 3, NODE_COMMENT: 8, NODE_DOCUMENT_FRAGMENT: 11 }; r.NODE = r.NODE; r.POSITION = { POSITION_IDENTICAL: 0, POSITION_DISCONNECTED: 1, POSITION_FOLLOWING: 2,
        POSITION_PRECEDING: 4, POSITION_IS_CONTAINED: 8, POSITION_CONTAINS: 16
    }; r.POSITION = r.POSITION; var h = r.NODE, i = r.POSITION, d = {}, b = { block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1, "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1 }, e = { hr: 1 }, f = function (a) { return a[0] || a }, n = function (a) { if (a && !a[0]) return new z(a); return a }, g = { _4e_wrap: n, _4e_unwrap: f, _4e_equals: function (a, c) {
        if (!a && !c) return true; if (!a || !c) return false; a = f(a);
        c = f(c); return a === c
    }, _4e_isBlockBoundary: function (a, c) { a = n(a); var o = t.mix(t.mix({}, e), c || {}); return b[a.css("display")] || o[a._4e_name()] }, _4e_getWin: function (a) { return a && "scrollTo" in a && a.document ? a : a && a.nodeType === 9 ? a.defaultView || a.parentWindow : false }, _4e_index: function (a) { a = f(a); for (var c = a.parentNode.childNodes, o = 0; o < c.length; o++) if (c[o] === a) return o; return -1 }, _4e_first: function (a, c) { a = f(a); var o = a.firstChild; if ((o = o && new z(o)) && c && !c(o)) o = o._4e_next(c); return o }, _4e_move: function (a, c, o) {
        a = f(a);
        y._4e_remove(a); c = f(c); o ? c.insertBefore(a, c.firstChild) : c.appendChild(a)
    }, _4e_name: function (a) { a = f(a); var c = a.nodeName.toLowerCase(); if (v.ie) if ((a = a.scopeName) && a != "HTML") c = a.toLowerCase() + ":" + c; return c }, _4e_isIdentical: function (a, c) {
        if (a._4e_name() != c._4e_name()) return false; var o = a[0].attributes, m = c[0].attributes, A = o.length, q = m.length; if (!v.ie && A != q) return false; for (var j = 0; j < A; j++) { var w = o[j]; if ((!v.ie || w.specified && w.nodeName != "_ke_expando") && w.nodeValue != c.attr(w.nodeName)) return false } if (v.ie) for (j =
0; j < q; j++) { w = m[j]; if (w.specified && w.nodeName != "_ke_expando" && w.nodeValue != a.attr(w.nodeName)) return false } return true
    }, _4e_isEmptyInlineRemoveable: function (a) { a = f(a).childNodes; for (var c = 0, o = a.length; c < o; c++) { var m = a[c], A = m.nodeType; if (!(A == h.NODE_ELEMENT && m.getAttribute("_ke_bookmark"))) if (A == h.NODE_ELEMENT && !g._4e_isEmptyInlineRemoveable(m) || A == h.NODE_TEXT && t.trim(m.nodeValue)) return false } return true }, _4e_moveChildren: function (a, c, o) {
        a = f(a); c = c[0] || c; if (a != c) if (o) for (; o = a.lastChild; ) c.insertBefore(a.removeChild(o),
c.firstChild); else for (; o = a.firstChild; ) c.appendChild(a.removeChild(o))
    }, _4e_mergeSiblings: function () {
        function a(c, o, m) {
            if (o[0] && o[0].nodeType == h.NODE_ELEMENT) {
                for (var A = []; o.attr("_ke_bookmark") || o._4e_isEmptyInlineRemoveable(); ) { A.push(o); o = m ? new z(o[0].nextSibling) : new z(o[0].previousSibling); if (!o[0] || o[0].nodeType != h.NODE_ELEMENT) return } if (c._4e_isIdentical(o)) {
                    for (var q = m ? c[0].lastChild : c[0].firstChild; A.length; ) A.shift()._4e_move(c, !m); o._4e_moveChildren(c, !m); o._4e_remove(); q[0] && q[0].nodeType ==
h.NODE_ELEMENT && q._4e_mergeSiblings()
                } 
            } 
        } return function (c) { if (c[0]) if (k[c._4e_name()] || c._4e_name() == "a") { a(c, new z(c[0].nextSibling), true); a(c, new z(c[0].previousSibling)) } } 
    } (), _4e_unselectable: v.gecko ? function (a) { a = f(a); a.style.MozUserSelect = "none" } : v.webkit ? function (a) { a = f(a); a.style.KhtmlUserSelect = "none" } : function (a) {
        a = f(a); if (v.ie || v.opera) {
            var c, o = 0; for (a.unselectable = "on"; c = a.all[o++]; ) switch (c.tagName.toLowerCase()) {
                case "iframe": case "textarea": case "input": case "select": break; default: c.unselectable =
"on"
            } 
        } 
    }, _4e_getOffset: function (a, c) { a = f(a); var o, m = 0; o = 0; var A = a.ownerDocument.defaultView || a.ownerDocument.parentWindow, q = a.ownerDocument, j = q.documentElement; c = c || q; if (a.getBoundingClientRect) { if (a !== q.body && j !== a) { o = a.getBoundingClientRect(); m = o.left + (c === q ? y.scrollLeft(A) : 0); o = o.top + (c === q ? y.scrollTop(A) : 0) } if (c) if (A != (c.defaultView || c.parentWindow) && A.frameElement) { A = g._4e_getOffset(A.frameElement, c); m += A.left; o += A.top } } return { left: m, top: o} }, _4e_getFrameDocument: function (a) { return (a = f(a)) && a.contentWindow.document },
        _4e_splitText: function (a, c) { a = f(a); var o = a.ownerDocument; if (!(!a || a.nodeType != h.NODE_TEXT)) { if (v.ie && c == a.nodeValue.length) { var m = o.createTextNode(""); y.insertAfter(m, a); return new z(m) } m = new z(a.splitText(c)); if (o.documentMode) { o = o.createTextNode(""); y.insertAfter(o, m[0]); y._4e_remove(o) } return m } }, _4e_parents: function (a, c) { a = n(a); var o = []; do o[c ? "push" : "unshift"](a); while (a = a.parent()); return o }, _4e_clone: function (a, c, o) {
            a = f(a); a = a.cloneNode(c); if (!o) {
                var m = function (A) {
                    if (A.nodeType == h.NODE_ELEMENT) {
                        A.removeAttribute("id",
false); A.removeAttribute("_ke_expando", false); A = A.childNodes; for (var q = 0; q < A.length; q++) m(A[q])
                    } 
                }; m(a)
            } return new z(a)
        }, _4e_nextSourceNode: function (a, c, o, m) {
            a = f(a); if (m && !m.call) { var A = m[0] || m; m = function (j) { j = j[0] || j; return j !== A } } c = !c && a.firstChild; var q = new z(a); if (!c) { if (a.nodeType == h.NODE_ELEMENT && m && m(a, true) === false) return null; c = a.nextSibling } for (; !c && (q = q.parent()); ) { if (m && m(q, true) === false) return null; c = q[0].nextSibling } if (!c) return null; c = y._4e_wrap(c); if (m && m(c) === false) return null; if (o &&
o != c[0].nodeType) return c._4e_nextSourceNode(false, o, m); return c
        }, _4e_previousSourceNode: function (a, c, o, m) {
            a = f(a); if (m && !m.call) { var A = m[0] || m; m = function (j) { j = j[0] || j; return j !== A } } c = !c && a.lastChild; var q = new z(a); if (!c) { if (a.nodeType == h.NODE_ELEMENT && m && m(a, true) === false) return null; c = a.previousSibling } for (; !c && (q = q.parent()); ) { if (m && m(q, true) === false) return null; c = q[0].previousSibling } if (!c) return null; c = y._4e_wrap(c); if (m && m(c) === false) return null; if (o && c[0].nodeType != o) return c._4e_previousSourceNode(false,
o, m); return c
        }, _4e_contains: v.ie || v.webkit ? function (a, c) { a = f(a); c = f(c); return c.nodeType != h.NODE_ELEMENT ? a.contains(c.parentNode) : a != c && a.contains(c) } : function (a, c) { a = f(a); c = f(c); return !!(a.compareDocumentPosition(c) & 16) }, _4e_commonAncestor: function (a, c) { if (a._4e_equals(c)) return a; if (c[0].nodeType != h.NODE_TEXT && c._4e_contains(a)) return c; var o = a[0].nodeType == h.NODE_TEXT ? a.parent() : a; do if (o[0].nodeType != h.NODE_TEXT && o._4e_contains(c)) return o; while (o = o.parent()); return null }, _4e_ascendant: function (a,
c, o) { a = f(a); if (!o) a = a.parentNode; if (c && !t.isFunction(c)) { var m = c; c = function (A) { return A._4e_name() == m } } for (; a && a.nodeType != 9; ) { if (!c || c(new z(a)) === true) return new z(a); a = a.parentNode } return null }, _4e_hasAttribute: function (a, c) { a = f(a); var o = a.attributes.getNamedItem(c); return !!(o && o.specified) }, _4e_hasAttributes: v.ie ? function (a) { a = f(a); for (var c = a.attributes, o = 0; o < c.length; o++) { var m = c[o]; switch (m.nodeName) { case "class": if (a.getAttribute("class")) return true; break; case "_ke_expando": continue; default: if (m.specified) return true } } return false } :
function (a) { a = f(a); v.gecko && a.removeAttribute("_moz_dirty"); a = a.attributes; return a.length > 1 || a.length == 1 && a[0].nodeName != "_ke_expando" }, _4e_position: function (a, c) {
    var o = f(a), m = f(c); if (o.compareDocumentPosition) return o.compareDocumentPosition(m); if (o == m) return i.POSITION_IDENTICAL; if (o.nodeType == h.NODE_ELEMENT && m.nodeType == h.NODE_ELEMENT) {
        if (o.contains) { if (o.contains(m)) return i.POSITION_CONTAINS + i.POSITION_PRECEDING; if (m.contains(o)) return i.POSITION_IS_CONTAINED + i.POSITION_FOLLOWING } if ("sourceIndex" in
o) return o.sourceIndex < 0 || m.sourceIndex < 0 ? i.POSITION_DISCONNECTED : o.sourceIndex < m.sourceIndex ? i.POSITION_PRECEDING : i.POSITION_FOLLOWING
    } o = a._4e_address(); m = c._4e_address(); for (var A = Math.min(o.length, m.length), q = 0; q <= A - 1; q++) if (o[q] != m[q]) { if (q < A) return o[q] < m[q] ? i.POSITION_PRECEDING : i.POSITION_FOLLOWING; break } return o.length < m.length ? i.POSITION_CONTAINS + i.POSITION_PRECEDING : i.POSITION_IS_CONTAINED + i.POSITION_FOLLOWING
}, _4e_address: function (a, c) {
    a = f(a); for (var o = [], m = a.ownerDocument.documentElement,
A = a; A && A != m; ) { var q = A.parentNode, j = -1; if (q) { for (var w = 0; w < q.childNodes.length; w++) { var s = q.childNodes[w]; if (!(c && s.nodeType == 3 && s.previousSibling && s.previousSibling.nodeType == 3)) { j++; if (s == A) break } } o.unshift(j) } A = q } return o
}, _4e_breakParent: function (a, c) { var o = new r.Range(a[0].ownerDocument); o.setStartAfter(a); o.setEndAfter(c); var m = o.extractContents(); o.insertNode(a._4e_remove()); a[0].parentNode.insertBefore(m, a[0].nextSibling) }, _4e_style: function (a, c, o) {
    a = n(a); if (o !== undefined) return a.css(c, o);
    a = f(a); return a.style[p(c)]
}, _4e_remove: function (a, c) { var o = f(a), m = o.parentNode; if (m) { if (c) for (var A; A = o.firstChild; ) m.insertBefore(o.removeChild(A), o); m.removeChild(o) } return a }, _4e_trim: function (a) { y._4e_ltrim(a); y._4e_rtrim(a) }, _4e_ltrim: function (a) { a = f(a); for (var c; c = a.firstChild; ) { if (c.nodeType == h.NODE_TEXT) { var o = u.ltrim(c.nodeValue), m = c.nodeValue.length; if (o) { if (o.length < m) { (new z(c))._4e_splitText(m - o.length); a.removeChild(a.firstChild) } } else { a.removeChild(c); continue } } break } }, _4e_rtrim: function (a) {
    a =
f(a); for (var c; c = a.lastChild; ) { if (c.type == h.NODE_TEXT) { var o = u.rtrim(c.nodeValue), m = c.nodeValue.length; if (o) { if (o.length < m) { (new z(c))._4e_splitText(o.length); a.removeChild(a.lastChild) } } else { a.removeChild(c); continue } } break } if (!v.ie && !v.opera) (c = a.lastChild) && c.nodeType == 1 && c.nodeName.toLowerCase() == "br" && c.parentNode.removeChild(c)
}, _4e_appendBogus: function (a) {
    a = f(a); for (var c = a.lastChild; c && c.nodeType == h.NODE_TEXT && !t.trim(c.nodeValue); ) c = c.previousSibling; if (!c || c.nodeType == h.NODE_TEXT || y._4e_name(c) !==
"br") { c = v.opera ? a.ownerDocument.createTextNode("") : a.ownerDocument.createElement("br"); v.gecko && c.setAttribute("type", "_moz"); a.appendChild(c) } 
}, _4e_previous: function (a, c) { var o = f(a), m; do m = (o = o.previousSibling) && new z(o); while (m && c && !c(m)); return m }, _4e_last: function (a, c) { a = y._4e_wrap(a); var o = a[0].lastChild; if ((o = o && new z(o)) && c && !c(o)) o = o._4e_previous(c); return o }, _4e_next: function (a, c) { var o = f(a), m; do m = (o = o.nextSibling) && new z(o); while (m && c && !c(m)); return m }, _4e_outerHtml: function (a) {
    a = f(a);
    if (a.outerHTML) return a.outerHTML.replace(/<\?[^>]*>/, ""); var c = a.ownerDocument.createElement("div"); c.appendChild(a.cloneNode(true)); return c.innerHTML
}, _4e_setMarker: function (a, c, o, m) { a = y._4e_wrap(a); var A = a._4e_getData("list_marker_id") || a._4e_setData("list_marker_id", t.guid())._4e_getData("list_marker_id"), q = a._4e_getData("list_marker_names") || a._4e_setData("list_marker_names", {})._4e_getData("list_marker_names"); c[A] = a; q[o] = 1; return a._4e_setData(o, m) }, _4e_clearMarkers: function (a, c, o) {
    a = n(a);
    var m = a._4e_getData("list_marker_names"), A = a._4e_getData("list_marker_id"), q; for (q in m) a._4e_removeData(q); a._4e_removeData("list_marker_names"); if (o) { a._4e_removeData("list_marker_id"); delete c[A] } 
}, _4e_setData: function (a, c, o) { var m = y._4e_getUniqueId(a); (d[m] || (d[m] = {}))[c] = o; return a }, _4e_getData: function (a, c) { a = f(a); var o = a.getAttribute("_ke_expando"); return (o = o && d[o]) && o[c] }, _4e_removeData: function (a, c) {
    a = f(a); var o = a.getAttribute("_ke_expando"); var m = (o = o && d[o]) && o[c]; typeof m != "undefined" &&
o && delete o[c]; t.isEmptyObject(o) && y._4e_clearData(a); return m || null
}, _4e_clearData: function (a) { a = f(a); var c = a.getAttribute("_ke_expando"); c && delete d[c]; c && a.removeAttribute("_ke_expando") }, _4e_getUniqueId: function (a) { a = f(a); var c = a.getAttribute("_ke_expando"); if (c) return c; c = t.guid(); a.setAttribute("_ke_expando", c); return c }, _4e_copyAttributes: function (a, c, o) {
    a = f(a); c = n(c); var m = a.attributes; o = o || {}; for (var A = 0; A < m.length; A++) {
        var q = m[A], j = q.nodeName.toLowerCase(), w; if (!(j in o)) if (j == "checked" &&
(w = y.attr(a, j))) c.attr(j, w); else if (q.specified || v.ie && q.nodeValue && j == "value") { w = y.attr(a, j); if (w === null) w = q.nodeValue; c.attr(j, w) } 
    } if (a.style.cssText !== "") c[0].style.cssText = a.style.cssText
}, _4e_isEditable: function (a) { a = y._4e_name(a); var c = r.XHTML_DTD; return (a = !c.$nonEditable[a] && (c[a] || c.span)) && a["#"] }, _4e_scrollIntoView: function (a) { a = n(a); var c = a[0].ownerDocument, o = y.scrollLeft(c), m = y.scrollTop(c), A = a.offset(), q = A.left; A = A.top; if (y.viewportHeight(c) + m < A || A < m || y.viewportWidth(c) + o < q || q < o) a.scrollIntoView(c) },
        _4e_getElementsByTagName: function (a, c, o) { a = f(a); if (!v.ie && o) c = o + ":" + c; o = []; a = a.getElementsByTagName(c); for (c = 0; c < a.length; c++) o.push(new z(a[c])); return o } 
    }; t.DOM._4e_inject = function (a) { t.mix(y, a); for (var c in a) a.hasOwnProperty(c) && function (o) { z.prototype[o] = function () { var m = [].slice.call(arguments, 0); m.unshift(this); return a[o].apply(null, m) } } (c) }; u.extern(g, { _4e_wrap: g._4e_wrap, _4e_unwrap: g._4e_unwrap, _4e_equals: g._4e_equals, _4e_isBlockBoundary: g._4e_isBlockBoundary, _4e_getWin: g._4e_getWin, _4e_index: g._4e_index,
        _4e_first: g._4e_first, _4e_move: g._4e_move, _4e_name: g._4e_name, _4e_isIdentical: g._4e_isIdentical, _4e_isEmptyInlineRemoveable: g._4e_isEmptyInlineRemoveable, _4e_moveChildren: g._4e_moveChildren, _4e_mergeSiblings: g._4e_mergeSiblings, _4e_unselectable: g._4e_unselectable, _4e_getOffset: g._4e_getOffset, _4e_getFrameDocument: g._4e_getFrameDocument, _4e_splitText: g._4e_splitText, _4e_parents: g._4e_parents, _4e_clone: g._4e_clone, _4e_nextSourceNode: g._4e_nextSourceNode, _4e_previousSourceNode: g._4e_previousSourceNode,
        _4e_contains: g._4e_contains, _4e_commonAncestor: g._4e_commonAncestor, _4e_ascendant: g._4e_ascendant, _4e_hasAttribute: g._4e_hasAttribute, _4e_hasAttributes: g._4e_hasAttributes, _4e_position: g._4e_position, _4e_address: g._4e_address, _4e_breakParent: g._4e_breakParent, _4e_style: g._4e_style, _4e_remove: g._4e_remove, _4e_trim: g._4e_trim, _4e_ltrim: g._4e_ltrim, _4e_rtrim: g._4e_rtrim, _4e_appendBogus: g._4e_appendBogus, _4e_last: g._4e_last, _4e_previous: g._4e_previous, _4e_next: g._4e_next, _4e_outerHtml: g._4e_outerHtml,
        _4e_setMarker: g._4e_setMarker, _4e_clearMarkers: g._4e_clearMarkers, _4e_setData: g._4e_setData, _4e_getData: g._4e_getData, _4e_removeData: g._4e_removeData, _4e_clearData: g._4e_clearData, _4e_removeData: g._4e_removeData, _4e_getUniqueId: g._4e_getUniqueId, _4e_copyAttributes: g._4e_copyAttributes, _4e_isEditable: g._4e_isEditable, _4e_scrollIntoView: g._4e_scrollIntoView, _4e_getElementsByTagName: g._4e_getElementsByTagName
    }); y._4e_inject(g)
});
KISSY.Editor.add("elementpath", function (r) {
    function p(i) {
        var d = z, b = z, e = []; for (i = i; i && i[0]; ) { if (i[0].nodeType == v.NODE_ELEMENT) { if (!this.lastElement) this.lastElement = i; var f = i._4e_name(); if (!b) { if (!d && u[f]) d = i; if (k[f]) { var n; if (n = !d) { if (n = f == "div") { a: { n = i; n = n[0] || n; n = n.childNodes; for (var g = 0, a = n.length; g < a; g++) { var c = n[g]; if (c.nodeType == v.NODE_ELEMENT && y.$block[c.nodeName.toLowerCase()]) { n = true; break a } } n = false } n = !n } n = n } if (n) d = i; else b = i } } e.push(i); if (f == "body") break } i = i.parent() } this.block = this.block =
d; this.blockLimit = this.blockLimit = b; this.elements = this.elements = e
    } var t = KISSY.DOM, y = r.XHTML_DTD, v = r.NODE, z = null, u = { address: 1, blockquote: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, li: 1, dt: 1, dd: 1 }, k = { body: 1, div: 1, table: 1, tbody: 1, tr: 1, td: 1, th: 1, caption: 1, form: 1 }; p.prototype = { compare: function (i) { var d = this.elements; i = i && i.elements; if (!i || d.length != i.length) return false; for (var b = 0; b < d.length; b++) if (!t._4e_equals(d[b], i[b])) return false; return true }, contains: function (i) {
        for (var d = this.elements, b = 0; b <
d.length; b++) if (d[b]._4e_name() in i) return d[b]; return z
    } 
    }; r.ElementPath = r.ElementPath = p; var h = p.prototype; r.Utils.extern(h, { compare: h.compare, contains: h.contains })
});
KISSY.Editor.add("walker", function (r) {
    function p(e, f) {
        if (this._.end) return u; var n, g = this.range, a, c = this.guard, o = this.type, m = e ? "_4e_previousSourceNode" : "_4e_nextSourceNode"; if (!this._.start) { this._.start = 1; g.trim(); if (g.collapsed) { this.end(); return u } } if (!e && !this._.guardLTR) { var A = g.endContainer, q = new d(A[0].childNodes[g.endOffset]); this._.guardLTR = function (B, l) { return (B = i._4e_wrap(B)) && B[0] && (!l || !i._4e_equals(A, B)) && (!q[0] || !B._4e_equals(q)) && (B[0].nodeType != h.NODE_ELEMENT || !l || B._4e_name() != "body") } } if (e &&
!this._.guardRTL) { var j = g.startContainer, w = g.startOffset > 0 && new d(j[0].childNodes[g.startOffset - 1]); this._.guardRTL = function (B, l) { return (B = i._4e_wrap(B)) && B[0] && (!l || !B._4e_equals(j)) && (!w[0] || !B._4e_equals(w)) && (B[0].nodeType != h.NODE_ELEMENT || !l || B._4e_name() != "body") } } var s = e ? this._.guardRTL : this._.guardLTR; a = c ? function (B, l) { if (s(B, l) === z) return z; return c(B, l) } : s; if (this.current) n = this.current[m](z, o, a); else if (e) {
            n = g.endContainer; if (g.endOffset > 0) {
                n = new d(n[0].childNodes[g.endOffset - 1]); if (a(n) ===
z) n = u
            } else n = a(n, v) === z ? u : n._4e_previousSourceNode(v, o, a)
        } else { n = g.startContainer; if ((n = new d(n[0].childNodes[g.startOffset])) && n[0]) { if (a(n) === z) n = u } else n = a(g.startContainer, v) === z ? u : g.startContainer._4e_nextSourceNode(v, o, a) } for (; n && n[0] && !this._.end; ) { this.current = n; if (!this.evaluator || this.evaluator(n) !== z) { if (!f) return n } else if (f && this.evaluator) return z; n = n[m](z, o, a) } this.end(); return this.current = u
    } function t(e) { for (var f, n = u; f = p.call(this, e); ) n = f; return n } function y(e) {
        this.range = e; this._ =
{}
    } var v = true, z = false, u = null, k = KISSY, h = r.NODE, i = k.DOM, d = k.Node; k.augment(y, { end: function () { this._.end = 1 }, next: function () { return p.call(this) }, previous: function () { return p.call(this, v) }, checkForward: function () { return p.call(this, z, v) !== z }, checkBackward: function () { return p.call(this, v, v) !== z }, lastForward: function () { return t.call(this) }, lastBackward: function () { return t.call(this, v) }, reset: function () { delete this.current; this._ = {} } }); y.blockBoundary = function (e) {
        return function (f) {
            f = i._4e_wrap(f); return !(f &&
f[0].nodeType == h.NODE_ELEMENT && f._4e_isBlockBoundary(e))
        } 
    }; y.listItemBoundary = function () { return this.blockBoundary({ br: 1 }) }; y.bookmark = function (e, f) { function n(g) { return g && g[0] && g._4e_name() == "span" && g.attr("_ke_bookmark") } return function (g) { var a, c; a = g && g[0] && g[0].nodeType == h.NODE_TEXT && (c = g.parent()) && n(c); a = e ? a : a || n(g); return f ^ a } }; y.whitespaces = function (e) { return function (f) { f = (f = f[0] || f) && f.nodeType == h.NODE_TEXT && !k.trim(f.nodeValue); return e ^ f } }; y.invisible = function (e) {
        var f = y.whitespaces();
        return function (n) { n = f(n) || n[0].nodeType == h.NODE_ELEMENT && !n[0].offsetHeight; return e ^ n } 
    }; r.Walker = y; r.Walker = y; var b = y.prototype; r.Utils.extern(b, { end: b.end, next: b.next, previous: b.previous, checkForward: b.checkForward, checkBackward: b.checkBackward, lastForward: b.lastForward, lastBackward: b.lastBackward, reset: b.reset }); r.Utils.extern(y, { blockBoundary: y.blockBoundary, listItemBoundary: y.listItemBoundary, bookmark: y.bookmark, whitespaces: y.whitespaces, invisible: y.invisible })
});
KISSY.Editor.add("range", function (r) {
    function p(l) { this.endOffset = this.endContainer = this.startOffset = this.startContainer = i; this.collapsed = k; this.document = l } function t(l) { var x = l[0].nodeType != b.NODE_TEXT && l._4e_name() in o.$removeEmpty, C = !d.trim(l[0].nodeValue); l = !!l.parent().attr("_ke_bookmark"); return x || C || l } function y(l) { return !w(l) && !s(l) } function v(l) {
        var x = h, C = n.bookmark(k); return function (E) {
            if (C(E)) return k; if (E[0].nodeType == b.NODE_TEXT) { if (d.trim(E[0].nodeValue).length) return h } else if (E[0].nodeType ==
b.NODE_ELEMENT) if (!j[E._4e_name()]) if (!l && !c.ie && E._4e_name() == "br" && !x) x = k; else return h; return k
        } 
    } function z(l, x) { function C(E) { return E && E.nodeName == "span" && E.getAttribute("_ke_bookmark") } return function (E) { var D, F; D = E && !E.nodeName && (F = E.parentNode) && C(F); D = l ? D : D || C(E); return x ^ D } } function u(l) { return function (x) { x = (x = x[0] || x) && x.nodeType == b.NODE_TEXT && !d.trim(x.nodeValue); return l ^ x } } r.RANGE = { POSITION_AFTER_START: 1, POSITION_BEFORE_END: 2, POSITION_BEFORE_START: 3, POSITION_AFTER_END: 4, ENLARGE_ELEMENT: 1,
        ENLARGE_BLOCK_CONTENTS: 2, ENLARGE_LIST_ITEM_CONTENTS: 3, START: 1, END: 2, STARTEND: 3, SHRINK_ELEMENT: 1, SHRINK_TEXT: 2
    }; r.RANGE = r.RANGE; var k = true, h = false, i = null, d = KISSY, b = r.NODE, e = r.RANGE, f = r.POSITION, n = r.Walker, g = d.DOM, a = r.Utils.getByAddress, c = d.UA, o = r.XHTML_DTD, m = r.ElementPath, A = d.Node, q = { area: 1, base: 1, br: 1, col: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, param: 1 }; p.prototype.toString = function () {
        var l = []; l.push((this.startContainer[0].id || this.startContainer[0].nodeName) + ":" + this.startOffset); l.push((this.endContainer[0].id ||
this.endContainer[0].nodeName) + ":" + this.endOffset); return l.join("<br/>")
    }; d.augment(p, { updateCollapsed: function () { this.collapsed = this.startContainer && this.endContainer && g._4e_equals(this.startContainer, this.endContainer) && this.startOffset == this.endOffset }, optimize: function () {
        var l = this.startContainer, x = this.startOffset; if (l[0].nodeType != b.NODE_ELEMENT) if (x) x >= l[0].nodeValue.length && this.setStartAfter(l); else this.setStartBefore(l); l = this.endContainer; x = this.endOffset; if (l[0].nodeType != b.NODE_ELEMENT) if (x) x >=
l[0].nodeValue.length && this.setEndAfter(l); else this.setEndBefore(l)
    }, setStartAfter: function (l) { this.setStart(l.parent(), l._4e_index() + 1) }, setStartBefore: function (l) { this.setStart(l.parent(), l._4e_index()) }, setEndAfter: function (l) { this.setEnd(l.parent(), l._4e_index() + 1) }, setEndBefore: function (l) { this.setEnd(l.parent(), l._4e_index()) }, optimizeBookmark: function () {
        var l = this.startContainer, x = this.endContainer; l && l._4e_name() == "span" && l.attr("_ke_bookmark") && this.setStartAt(l, e.POSITION_BEFORE_START);
        x && x._4e_name() == "span" && x.attr("_ke_bookmark") && this.setEndAt(x, e.POSITION_AFTER_END)
    }, setStart: function (l, x) { if (l[0].nodeType == b.NODE_ELEMENT && q[l._4e_name()]) { l = l.parent(); x = l._4e_index() } this.startContainer = l; this.startOffset = x; if (!this.endContainer) { this.endContainer = l; this.endOffset = x } this.updateCollapsed() }, setEnd: function (l, x) {
        if (l[0].nodeType == b.NODE_ELEMENT && q[l._4e_name()]) { l = l.parent(); x = l._4e_index() + 1 } this.endContainer = l; this.endOffset = x; if (!this.startContainer) {
            this.startContainer =
l; this.startOffset = x
        } this.updateCollapsed()
    }, setStartAt: function (l, x) { switch (x) { case e.POSITION_AFTER_START: this.setStart(l, 0); break; case e.POSITION_BEFORE_END: l[0].nodeType == b.NODE_TEXT ? this.setStart(l, l[0].nodeValue.length) : this.setStart(l, l[0].childNodes.length); break; case e.POSITION_BEFORE_START: this.setStartBefore(l); break; case e.POSITION_AFTER_END: this.setStartAfter(l) } this.updateCollapsed() }, setEndAt: function (l, x) {
        switch (x) {
            case e.POSITION_AFTER_START: this.setEnd(l, 0); break; case e.POSITION_BEFORE_END: l[0].nodeType ==
b.NODE_TEXT ? this.setEnd(l, l[0].nodeValue.length) : this.setEnd(l, l[0].childNodes.length); break; case e.POSITION_BEFORE_START: this.setEndBefore(l); break; case e.POSITION_AFTER_END: this.setEndAfter(l)
        } this.updateCollapsed()
    }, execContentsAction: function (l, x) {
        var C = this.startContainer, E = this.endContainer, D = this.startOffset, F = this.endOffset, L, N = this.document, O; this.optimizeBookmark(); if (E[0].nodeType == b.NODE_TEXT) E = E._4e_splitText(F); else if (E[0].childNodes.length > 0) if (F >= E[0].childNodes.length) {
            E = new A(E[0].appendChild(N.createTextNode("")));
            O = k
        } else E = new A(E[0].childNodes[F]); if (C[0].nodeType == b.NODE_TEXT) { C._4e_splitText(D); if (C._4e_equals(E)) E = new A(C[0].nextSibling) } else if (D) if (D >= C[0].childNodes.length) { L = new A(N.createTextNode("")); C.append(L); C = L; L = k } else C = new A(C[0].childNodes[D].previousSibling); else { L = new A(N.createTextNode("")); (D = C[0].firstChild) ? g.insertBefore(L[0], D) : C.append(L); C = L; L = k } D = C._4e_parents(); F = E._4e_parents(); var Q, T, S; for (Q = 0; Q < D.length; Q++) { T = D[Q]; S = F[Q]; if (!T._4e_equals(S)) break } N = x; for (var G, K, H, I = Q; I <
D.length; I++) { G = D[I]; if (N && !G._4e_equals(C)) K = N.appendChild(G._4e_clone()[0]); for (G = G[0].nextSibling; G; ) { if (g._4e_equals(F[I], G) || g._4e_equals(E, G)) break; H = G.nextSibling; if (l == 2) N.appendChild(G.cloneNode(k)); else { G.parentNode.removeChild(G); l == 1 && N.appendChild(G) } G = H } if (K) N = K } N = x; for (Q = Q; Q < F.length; Q++) {
            G = F[Q]; if (l > 0 && !G._4e_equals(E)) K = N.appendChild(G._4e_clone()[0]); if (!D[Q] || !G.parent()._4e_equals(D[Q].parent())) for (G = G[0].previousSibling; G; ) {
                if (g._4e_equals(D[Q], G) || g._4e_equals(C, G)) break; H =
G.previousSibling; if (l == 2) N.insertBefore(G.cloneNode(k), N.firstChild); else { g._4e_remove(G); l == 1 && N.insertBefore(G, N.firstChild) } G = H
            } if (K) N = K
        } if (l == 2) { S = this.startContainer[0]; if (S.nodeType == b.NODE_TEXT && S.nextSibling && S.nextSibling.nodeType == b.NODE_TEXT) { S.data += S.nextSibling.data; S.parentNode.removeChild(S.nextSibling) } S = this.endContainer[0]; if (S.nodeType == b.NODE_TEXT && S.nextSibling && S.nextSibling.nodeType == b.NODE_TEXT) { S.data += S.nextSibling.data; S.parentNode.removeChild(S.nextSibling) } } else {
            if (T &&
S && (!C.parent()._4e_equals(T.parent()) || !E.parent()._4e_equals(S.parent()))) { T = S._4e_index(); L && S.parent()._4e_equals(C.parent()) && T--; this.setStart(S.parent(), T) } this.collapse(k)
        } L && C._4e_remove(); O && E[0].parentNode && E._4e_remove()
    }, collapse: function (l) { if (l) { this.endContainer = this.startContainer; this.endOffset = this.startOffset } else { this.startContainer = this.endContainer; this.startOffset = this.endOffset } this.collapsed = k }, clone: function () {
        var l = new p(this.document); l.startContainer = this.startContainer;
        l.startOffset = this.startOffset; l.endContainer = this.endContainer; l.endOffset = this.endOffset; l.collapsed = this.collapsed; return l
    }, getEnclosedNode: function () { var l = this.clone(); l.optimize(); if (l.startContainer[0].nodeType != b.NODE_ELEMENT || l.endContainer[0].nodeType != b.NODE_ELEMENT) return i; var x = new r.Walker(l), C = z(k, undefined), E = u(k); l.evaluator = function (D) { return E(D) && C(D) }; l = x.next(); x.reset(); x = x.previous(); return l && l._4e_equals(x) ? l : i }, shrink: function (l, x) {
        if (!this.collapsed) {
            l = l || e.SHRINK_TEXT;
            var C = this.clone(), E = this.startContainer, D = this.endContainer, F = this.startOffset, L = this.endOffset, N = 1, O = 1; if (E && E[0].nodeType == b.NODE_TEXT) if (F) if (F >= E[0].nodeValue.length) C.setStartAfter(E); else { C.setStartBefore(E); N = 0 } else C.setStartBefore(E); if (D && D[0].nodeType == b.NODE_TEXT) if (L) if (L >= D[0].nodeValue.length) C.setEndAfter(D); else { C.setEndAfter(D); O = 0 } else C.setEndBefore(D); C = new n(C); C.evaluator = function (T) { T = T[0] || T; return T.nodeType == (l == e.SHRINK_ELEMENT ? b.NODE_ELEMENT : b.NODE_TEXT) }; var Q; C.guard =
function (T, S) { T = T[0] || T; if (l == e.SHRINK_ELEMENT && T.nodeType == b.NODE_TEXT) return h; if (S && T == Q) return h; if (!S && T.nodeType == b.NODE_ELEMENT) Q = T; return k }; if (N) (E = C[l == e.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(E, x ? e.POSITION_AFTER_START : e.POSITION_BEFORE_START); if (O) { C.reset(); (C = C[l == e.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(C, x ? e.POSITION_BEFORE_END : e.POSITION_AFTER_END) } return !!(N || O)
        } 
    }, getTouchedStartNode: function () {
        var l = this.startContainer; if (this.collapsed || l[0].nodeType !=
b.NODE_ELEMENT) return l; return l.childNodes[this.startOffset] || l
    }, createBookmark2: function (l) {
        var x = this.startContainer, C = this.endContainer, E = this.startOffset, D = this.endOffset, F, L; if (!x || !C) return { start: 0, end: 0 }; if (l) {
            if (x[0].nodeType == b.NODE_ELEMENT) if ((F = new A(x[0].childNodes[E])) && F[0] && F[0].nodeType == b.NODE_TEXT && E > 0 && F[0].previousSibling.nodeType == b.NODE_TEXT) { x = F; E = 0 } for (; x[0].nodeType == b.NODE_TEXT && (L = x._4e_previous()) && L[0].nodeType == b.NODE_TEXT; ) { x = L; E += L[0].nodeValue.length } if (!this.collapsed) {
                if (C[0].nodeType ==
b.NODE_ELEMENT) if ((F = new A(C[0].childNodes[D])) && F[0] && F[0].nodeType == b.NODE_TEXT && D > 0 && F[0].previousSibling.nodeType == b.NODE_TEXT) { C = F; D = 0 } for (; C[0].nodeType == b.NODE_TEXT && (L = C._4e_previous()) && L[0].nodeType == b.NODE_TEXT; ) { C = L; D += L[0].nodeValue.length } 
            } 
        } return { start: x._4e_address(l), end: this.collapsed ? i : C._4e_address(l), startOffset: E, endOffset: D, normalized: l, is2: k}
    }, createBookmark: function (l) {
        var x, C, E, D, F = this.collapsed; x = new A("<span>", i, this.document); x.attr("_ke_bookmark", 1); x.css("display",
"none"); x.html("&nbsp;"); if (l) { E = d.guid("ke_bm_"); x.attr("id", E + "S") } if (!F) { C = x._4e_clone(); C.html("&nbsp;"); l && C.attr("id", E + "E"); D = this.clone(); D.collapse(); D.insertNode(C) } D = this.clone(); D.collapse(k); D.insertNode(x); if (C) { this.setStartAfter(x); this.setEndBefore(C) } else this.moveToPosition(x, e.POSITION_AFTER_END); return { startNode: l ? E + "S" : x, endNode: l ? E + "E" : C, serializable: l, collapsed: F}
    }, moveToPosition: function (l, x) { this.setStartAt(l, x); this.collapse(k) }, trim: function (l, x) {
        var C = this.startContainer,
E = this.startOffset, D = this.collapsed; if ((!l || D) && C[0] && C[0].nodeType == b.NODE_TEXT) { if (E) if (E >= C[0].nodeValue.length) { E = C._4e_index() + 1; C = C.parent() } else { var F = C._4e_splitText(E); E = C._4e_index() + 1; C = C.parent(); if (g._4e_equals(this.startContainer, this.endContainer)) this.setEnd(F, this.endOffset - this.startOffset); else if (g._4e_equals(C, this.endContainer)) this.endOffset += 1 } else { E = C._4e_index(); C = C.parent() } this.setStart(C, E); if (D) { this.collapse(k); return } } C = this.endContainer; E = this.endOffset; if (!(x || D) &&
C[0] && C[0].nodeType == b.NODE_TEXT) { if (E) { E >= C.nodeValue.length || C._4e_splitText(E); E = C._4e_index() + 1 } else E = C._4e_index(); C = C.parent(); this.setEnd(C, E) } 
    }, insertNode: function (l) { this.optimizeBookmark(); this.trim(h, k); var x = this.startContainer, C = x[0].childNodes[this.startOffset]; C ? g.insertBefore(l[0] || l, C) : x[0].appendChild(l[0] || l); g._4e_equals(l.parent(), this.endContainer) && this.endOffset++; this.setStartBefore(l) }, moveToBookmark: function (l) {
        if (l.is2) {
            var x = a(this.document, l.start, l.normalized), C = l.startOffset,
E = l.end && a(this.document, l.end, l.normalized); l = l.endOffset; this.setStart(x, C); E ? this.setEnd(E, l) : this.collapse(k)
        } else { x = (C = l.serializable) ? d.one("#" + l.startNode, this.document) : l.startNode; l = C ? d.one("#" + l.endNode, this.document) : l.endNode; this.setStartBefore(x); x._4e_remove(); if (l && l[0]) { this.setEndBefore(l); l._4e_remove() } else this.collapse(k) } 
    }, getCommonAncestor: function (l, x) {
        var C = this.startContainer, E = this.endContainer; C = g._4e_equals(C, E) ? l && C[0].nodeType == b.NODE_ELEMENT && this.startOffset == this.endOffset -
1 ? new A(C[0].childNodes[this.startOffset]) : C : C._4e_commonAncestor(E); return x && C[0].nodeType == b.NODE_TEXT ? C.parent() : C
    }, enlarge: function (l) {
        switch (l) {
            case e.ENLARGE_ELEMENT: if (this.collapsed) break; l = this.getCommonAncestor(); var x = new A(this.document.body), C, E, D, F, L, N = h, O, Q; O = this.startContainer; Q = this.startOffset; if (O[0].nodeType == b.NODE_TEXT) { if (Q) { O = !d.trim(O[0].nodeValue.substring(0, Q)).length && O; N = !!O } if (O) if (!(F = O[0].previousSibling)) D = O.parent() } else {
                    if (Q) F = O[0].childNodes[Q - 1] || O[0].lastChild;
                    F || (D = O)
                } for (; D || F; ) {
                    if (D && !F) { if (!L && g._4e_equals(D, l)) L = k; if (!x._4e_contains(D)) break; if (!N || D.css("display") != "inline") { N = h; if (L) C = D; else this.setStartBefore(D) } F = D[0].previousSibling } for (; F; ) {
                        O = h; if (F.nodeType == b.NODE_TEXT) { Q = F.nodeValue; if (/[^\s\ufeff]/.test(Q)) F = i; O = /[\s\ufeff]$/.test(Q) } else if (F.offsetWidth > 0 && !F.getAttribute("_ke_bookmark")) if (N && o.$removeEmpty[F.nodeName.toLowerCase()]) {
                            Q = g.text(F); if (/[^\s\ufeff]/.test(Q)) F = i; else for (var T = F.all || F.getElementsByTagName("*"), S = 0, G; G = T[S++]; ) if (!o.$removeEmpty[G.nodeName.toLowerCase()]) {
                                F =
i; break
                            } if (F) O = !!Q.length
                        } else F = i; if (O) if (N) if (L) C = D; else D && this.setStartBefore(D); else N = k; if (F) { O = F.previousSibling; if (!D && !O) { D = new A(F); F = i; break } F = O } else D = i
                    } if (D) D = D.parent()
                } O = this.endContainer; Q = this.endOffset; D = F = i; L = N = h; if (O[0].nodeType == b.NODE_TEXT) { O = !d.trim(O[0].nodeValue.substring(Q)).length && O; N = !(O && O[0].nodeValue.length); if (O) if (!(F = O[0].nextSibling)) D = O.parent() } else (F = O[0].childNodes[Q]) || (D = O); for (; D || F; ) {
                    if (D && !F) {
                        if (!L && g._4e_equals(D, l)) L = k; if (!x._4e_contains(D)) break; if (!N ||
D.css("display") != "inline") { N = h; if (L) E = D; else D && this.setEndAfter(D) } F = D[0].nextSibling
                    } for (; F; ) {
                        O = h; if (F.nodeType == b.NODE_TEXT) { Q = F.nodeValue; if (/[^\s\ufeff]/.test(Q)) F = i; O = /^[\s\ufeff]/.test(Q) } else if (F.offsetWidth > 0 && !F.getAttribute("_ke_bookmark")) if (N && o.$removeEmpty[F.nodeName.toLowerCase()]) { Q = g.text(F); if (/[^\s\ufeff]/.test(Q)) F = i; else { T = F.all || F.getElementsByTagName("*"); for (S = 0; G = T[S++]; ) if (!o.$removeEmpty[G.nodeName.toLowerCase()]) { F = i; break } } if (F) O = !!Q.length } else F = i; if (O) if (N) if (L) E =
D; else this.setEndAfter(D); if (F) { O = F.nextSibling; if (!D && !O) { D = new A(F); F = i; break } F = O } else D = i
                    } if (D) D = D.parent()
                } if (C && E) { l = C._4e_contains(E) ? E : C; this.setStartBefore(l); this.setEndAfter(l) } break; case e.ENLARGE_BLOCK_CONTENTS: case e.ENLARGE_LIST_ITEM_CONTENTS: D = new p(this.document); x = new A(this.document.body); D.setStartAt(x, e.POSITION_AFTER_START); D.setEnd(this.startContainer, this.startOffset); D = new n(D); var K, H, I = n.blockBoundary(l == e.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1} : i), J = function (P) {
                    var M = I(P); M ||
(K = P); return M
                }; C = function (P) { var M = J(P); if (!M && P[0] && P._4e_name() == "br") H = P; return M }; D.guard = J; D = D.lastBackward(); K = K || x; this.setStartAt(K, K._4e_name() != "br" && (!D && this.checkStartOfBlock() || D && K._4e_contains(D)) ? e.POSITION_AFTER_START : e.POSITION_AFTER_END); D = this.clone(); D.collapse(); D.setEndAt(x, e.POSITION_BEFORE_END); D = new n(D); D.guard = l == e.ENLARGE_LIST_ITEM_CONTENTS ? C : J; K = i; D = D.lastForward(); K = K || x; this.setEndAt(K, !D && this.checkEndOfBlock() || D && K._4e_contains(D) ? e.POSITION_BEFORE_END : e.POSITION_BEFORE_START);
                H && this.setEndAfter(H)
        } 
    }, checkStartOfBlock: function () { var l = this.startContainer, x = this.startOffset; if (x && l[0].nodeType == b.NODE_TEXT) if (d.trim(l[0].nodeValue.substring(0, x)).length) return h; this.trim(); l = new m(this.startContainer); x = this.clone(); x.collapse(k); x.setStartAt(l.block || l.blockLimit, e.POSITION_AFTER_START); l = new n(x); l.evaluator = v(k); return l.checkBackward() }, checkEndOfBlock: function () {
        var l = this.endContainer, x = this.endOffset; if (l[0].nodeType == b.NODE_TEXT) if (d.trim(l[0].nodeValue.substring(x)).length) return h;
        this.trim(); l = new m(this.endContainer); x = this.clone(); x.collapse(h); x.setEndAt(l.block || l.blockLimit, e.POSITION_BEFORE_END); l = new n(x); l.evaluator = v(h); return l.checkForward()
    }, deleteContents: function () { this.collapsed || this.execContentsAction(0) }, extractContents: function () { var l = this.document.createDocumentFragment(); this.collapsed || this.execContentsAction(1, l); return l }, checkBoundaryOfElement: function (l, x) {
        var C = this.clone(); C[x == e.START ? "setStartAt" : "setEndAt"](l, x == e.START ? e.POSITION_AFTER_START :
e.POSITION_BEFORE_END); C = new n(C); C.evaluator = t; return C[x == e.START ? "checkBackward" : "checkForward"]()
    }, getBoundaryNodes: function () {
        var l = this.startContainer, x = this.endContainer, C = this.startOffset, E = this.endOffset, D; if (l[0].nodeType == b.NODE_ELEMENT) { D = l[0].childNodes.length; if (D > C) l = new A(l[0].childNodes[C]); else if (D < 1) l = l._4e_previousSourceNode(); else { for (l = l[0]; l.lastChild; ) l = l.lastChild; l = new A(l); l = l._4e_nextSourceNode() || l } } if (x[0].nodeType == b.NODE_ELEMENT) {
            D = x[0].childNodes.length; if (D > E) x =
(new A(x[0].childNodes[E]))._4e_previousSourceNode(k); else if (D < 1) x = x._4e_previousSourceNode(); else { for (x = x[0]; x.lastChild; ) x = x.lastChild; x = new A(x) } 
        } if (l._4e_position(x) & f.POSITION_FOLLOWING) l = x; return { startNode: l, endNode: x}
    }, fixBlock: function (l, x) { var C = this.createBookmark(), E = new A(this.document.createElement(x)); this.collapse(l); this.enlarge(e.ENLARGE_BLOCK_CONTENTS); E[0].appendChild(this.extractContents()); E._4e_trim(); c.ie || E._4e_appendBogus(); this.insertNode(E); this.moveToBookmark(C); return E },
        splitBlock: function (l) {
            var x = new m(this.startContainer), C = new m(this.endContainer), E = x.block, D = C.block, F = i; if (!x.blockLimit._4e_equals(C.blockLimit)) return i; if (l != "br") { if (!E) { E = this.fixBlock(k, l); D = (new m(this.endContainer)).block } D || (D = this.fixBlock(h, l)) } l = E && this.checkStartOfBlock(); x = D && this.checkEndOfBlock(); this.deleteContents(); if (E && g._4e_equals(E, D)) if (x) { F = new m(this.startContainer); this.moveToPosition(D, e.POSITION_AFTER_END); D = i } else if (l) {
                F = new m(this.startContainer); this.moveToPosition(E,
e.POSITION_BEFORE_START); E = i
            } else { D = this.splitElement(E); !c.ie && !d.inArray(E._4e_name(), ["ul", "ol"]) && E._4e_appendBogus() } return { previousBlock: E, nextBlock: D, wasStartOfBlock: l, wasEndOfBlock: x, elementPath: F}
        }, splitElement: function (l) { if (!this.collapsed) return i; this.setEndAt(l, e.POSITION_BEFORE_END); var x = this.extractContents(), C = l._4e_clone(h); C[0].appendChild(x); C.insertAfter(l); this.moveToPosition(l, e.POSITION_AFTER_END); return C }, moveToElementEditablePosition: function (l, x) {
            var C, E = r.XHTML_DTD; if (E.$empty[l._4e_name()]) return h;
            for (; l && l[0].nodeType == b.NODE_ELEMENT; ) { if (C = l._4e_isEditable()) this.moveToPosition(l, x ? e.POSITION_BEFORE_END : e.POSITION_AFTER_START); else if (E.$inline[l._4e_name()]) { this.moveToPosition(l, x ? e.POSITION_AFTER_END : e.POSITION_BEFORE_START); return k } if ((l = E.$empty[l._4e_name()] ? l[x ? "_4e_previous" : "_4e_next"](y) : l[x ? "_4e_last" : "_4e_first"](y)) && l[0].nodeType == b.NODE_TEXT) { this.moveToPosition(l, x ? e.POSITION_AFTER_END : e.POSITION_BEFORE_START); return k } } return C
        }, selectNodeContents: function (l) {
            this.setStart(l,
0); this.setEnd(l, l[0].nodeType == b.NODE_TEXT ? l[0].nodeValue.length : l[0].childNodes.length)
        } 
    }); var j = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, "var": 1 }, w = new n.whitespaces, s = new n.bookmark; r.Range = p; r.Range = p; var B = p.prototype; r.Utils.extern(B, { updateCollapsed: B.updateCollapsed, optimize: B.optimize, setStartAfter: B.setStartAfter, setEndAfter: B.setEndAfter, setStartBefore: B.setStartBefore,
        setEndBefore: B.setEndBefore, optimizeBookmark: B.optimizeBookmark, setStart: B.setStart, setEnd: B.setEnd, setStartAt: B.setStartAt, setEndAt: B.setEndAt, execContentsAction: B.execContentsAction, collapse: B.collapse, clone: B.clone, getEnclosedNode: B.getEnclosedNode, shrink: B.shrink, getTouchedStartNode: B.getTouchedStartNode, createBookmark2: B.createBookmark2, createBookmark: B.createBookmark, moveToPosition: B.moveToPosition, trim: B.trim, insertNode: B.insertNode, moveToBookmark: B.moveToBookmark, getCommonAncestor: B.getCommonAncestor,
        enlarge: B.enlarge, checkStartOfBlock: B.checkStartOfBlock, checkEndOfBlock: B.checkEndOfBlock, deleteContents: B.deleteContents, extractContents: B.extractContents, checkBoundaryOfElement: B.checkBoundaryOfElement, getBoundaryNodes: B.getBoundaryNodes, fixBlock: B.fixBlock, splitBlock: B.splitBlock, splitElement: B.splitElement, moveToElementEditablePosition: B.moveToElementEditablePosition, selectNodeContents: B.selectNodeContents
    })
});
KISSY.Editor.add("domiterator", function (r) {
    function p(n) { if (!(arguments.length < 1)) { this.range = n; this.forceBrBreak = y; this.enlargeBr = t; this.enforceRealBlocks = y; this._ || (this._ = {}) } } var t = true, y = false, v = KISSY, z = v.UA, u = r.Walker, k = r.Range, h = r.RANGE, i = r.NODE, d = r.ElementPath, b = v.Node, e = v.DOM, f = /^[\r\n\t ]*$/; u.bookmark(); v.augment(p, { getNextParagraph: function (n) {
        var g, a, c, o, m; if (!this._.lastNode) {
            a = this.range.clone(); a.shrink(h.SHRINK_ELEMENT, t); a.enlarge(this.forceBrBreak || !this.enlargeBr ? h.ENLARGE_LIST_ITEM_CONTENTS :
h.ENLARGE_BLOCK_CONTENTS); var A = new u(a), q = u.bookmark(t, t); A.evaluator = q; this._.nextNode = A.next(); A = new u(a); A.evaluator = q; A = A.previous(); this._.lastNode = A._4e_nextSourceNode(t); if (this._.lastNode && this._.lastNode[0].nodeType == i.NODE_TEXT && !v.trim(this._.lastNode[0].nodeValue) && this._.lastNode.parent()._4e_isBlockBoundary()) { q = new k(a.document); q.moveToPosition(this._.lastNode, h.POSITION_AFTER_END); if (q.checkEndOfBlock()) { q = new d(q.endContainer); this._.lastNode = (q.block || q.blockLimit)._4e_nextSourceNode(t) } } if (!this._.lastNode) {
                this._.lastNode =
this._.docEndMarker = new b(a.document.createTextNode("")); e.insertAfter(this._.lastNode[0], A[0])
            } a = null
        } q = this._.nextNode; A = this._.lastNode; for (this._.nextNode = null; q; ) {
            var j = y, w = q[0].nodeType != i.NODE_ELEMENT, s = y; if (w) { if (q[0].nodeType == i.NODE_TEXT) if (f.test(q[0].nodeValue)) w = y } else {
                var B = q._4e_name(); if (q._4e_isBlockBoundary(this.forceBrBreak && { br: 1 })) {
                    if (B == "br") w = t; else if (!a && !q[0].childNodes.length && B != "hr") { g = q; c = q._4e_equals(A); break } if (a) {
                        a.setEndAt(q, h.POSITION_BEFORE_START); if (B != "br") this._.nextNode =
q
                    } j = t
                } else { if (q[0].firstChild) { if (!a) { a = new k(this.range.document); a.setStartAt(q, h.POSITION_BEFORE_START) } q = new b(q[0].firstChild); continue } w = t } 
            } if (w && !a) { a = new k(this.range.document); a.setStartAt(q, h.POSITION_BEFORE_START) } c = (!j || w) && q._4e_equals(A); if (a && !j) for (; !q[0].nextSibling && !c; ) { B = q.parent(); if (B._4e_isBlockBoundary(this.forceBrBreak && { br: 1 })) { j = t; c || B._4e_equals(A); break } q = B; w = t; c = q._4e_equals(A); s = t } w && a.setEndAt(q, h.POSITION_AFTER_END); q = q._4e_nextSourceNode(s, null, A); if ((c = !q) || j && a) break
        } if (!g) {
            if (!a) {
                this._.docEndMarker &&
this._.docEndMarker._4e_remove(); return this._.nextNode = null
            } g = new d(a.startContainer); q = g.blockLimit; j = { div: 1, th: 1, td: 1 }; g = g.block; if ((!g || !g[0]) && !this.enforceRealBlocks && j[q._4e_name()] && a.checkStartOfBlock() && a.checkEndOfBlock()) g = q; else if (!g || this.enforceRealBlocks && g._4e_name() == "li") { g = new b(this.range.document.createElement(n || "p")); g[0].appendChild(a.extractContents()); g._4e_trim(); a.insertNode(g); o = m = t } else if (g._4e_name() != "li") {
                if (!a.checkStartOfBlock() || !a.checkEndOfBlock()) {
                    g = g._4e_clone(y);
                    g[0].appendChild(a.extractContents()); g._4e_trim(); m = a.splitBlock(); o = !m.wasStartOfBlock; m = !m.wasEndOfBlock; a.insertNode(g)
                } 
            } else if (!c) this._.nextNode = g._4e_equals(A) ? null : a.getBoundaryNodes().endNode._4e_nextSourceNode(t, null, A)
        } if (o) { a = new b(g[0].previousSibling); if (a[0] && a[0].nodeType == i.NODE_ELEMENT) if (a._4e_name() == "br") a._4e_remove(); else a[0].lastChild && e._4e_name(a[0].lastChild) == "br" && e._4e_remove(a[0].lastChild) } if (m) {
            a = u.bookmark(y, t); o = new b(g[0].lastChild); if (o[0] && o[0].nodeType == i.NODE_ELEMENT &&
o._4e_name() == "br") if (z.ie || o._4e_previous(a) || o._4e_next(a)) o._4e_remove()
        } if (!this._.nextNode) this._.nextNode = c || g._4e_equals(A) ? null : g._4e_nextSourceNode(t, null, A); return g
    } 
    }); k.prototype.createIterator = function () { return new p(this) } 
});
KISSY.Editor.add("selection", function (r) {
    function p(q) { this.document = this.document = q; this._ = { cache: {} }; if (h.ie) { var j = this.getNative().createRange(); if (!j || j.item && j.item(0).ownerDocument != q || j.parentElement && j.parentElement().ownerDocument != q) this.isInvalid = v } } function t(q) { q = new p(q); return !q || q.isInvalid ? u : q } function y(q) {
        var j = q.document, w = new b(j.body), s = new b(j.documentElement); if (h.ie) {
            if (h.ie < 8 || document.documentMode == 7) s.on("click", function (N) { i._4e_name(N.target) === "html" && q.getSelection().getRanges()[0].select() });
            var B, l, x = 1; s.on("mousedown", function () { x = 0 }); s.on("mouseup", function () { x = 1 }); w.on("focusin", function (N) { if (i._4e_name(N.target) == "body") if (B) { try { x && B.select() } catch (O) { } B = u } }); w.on("focus", function () { l = v; E() }); w.on("beforedeactivate", function (N) { if (!N.relatedTarget) { l = z; x = 1 } }); d.on(i._4e_getWin(j), "blur", function () { j && j.selection.empty() }); w.on("mousedown", function () { C() }); w.on("mouseup", function () { l = v; setTimeout(function () { E(v) }, 0) }); var C = function () { l = z }, E = function (N) {
                if (l) {
                    var O = q.document, Q =
q.getSelection(), T = Q && Q.getType(), S = Q && Q.getNative(); if (N && S && T == e.SELECTION_NONE) if (!O.queryCommandEnabled("InsertImage")) { setTimeout(function () { E(v) }, 50); return } var G; if (!(S && T == e.SELECTION_TEXT && (G = i._4e_name(S.createRange().parentElement())) && G in { input: 1, textarea: 1 })) { B = S && Q.getRanges()[0]; q._monitor() } 
                } 
            }; w.on("keydown", C); w.on("keyup", function () { l = v; E() }); d.on(j, "selectionchange", E)
        } else { d.on(j, "mouseup", q._monitor, q); d.on(j, "keyup", q._monitor, q) } var D = { table: 1, pre: 1 }, F = /\s*<(p|div|address|h\d|center)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\1>)?(?=\s*$|<\/body>)/gi,
L = r.Walker.whitespaces(v); q.on("selectionChange", function (N) {
    var O = N.path; N = (N = N.selection) && N.getRanges()[0]; var Q = O.blockLimit; if (N) if (N.collapse && !O.block && Q._4e_name() == "body") {
        O = N.fixBlock(v, "p"); if (O._4e_outerHtml().match(F)) if ((Q = O._4e_next(L)) && Q[0].nodeType == n.NODE_ELEMENT && !D[Q._4e_name()]) { N.moveToElementEditablePosition(Q); O._4e_remove() } else if ((Q = O._4e_previous(L)) && Q[0].nodeType == n.NODE_ELEMENT && !D[Q._4e_name()]) { N.moveToElementEditablePosition(Q, Q._4e_outerHtml().match(F) ? z : v); O._4e_remove() } N.select();
        h.ie || q.notifySelectionChange()
    } 
})
    } r.SELECTION = { SELECTION_NONE: 1, SELECTION_TEXT: 2, SELECTION_ELEMENT: 3 }; var v = true, z = false, u = null, k = KISSY, h = k.UA, i = k.DOM, d = k.Event, b = k.Node, e = r.SELECTION, f = r.RANGE, n = r.NODE, g = r.Walker, a = r.Range, c = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; k.augment(p, { getNative: h.ie ? function () { var q = this._.cache; return q.nativeSel || (q.nativeSel = this.document.selection) } : function () {
        var q =
this._.cache; return q.nativeSel || (q.nativeSel = i._4e_getWin(this.document).getSelection())
    }, getType: h.ie ? function () { var q = this._.cache; if (q.type) return q.type; var j = e.SELECTION_NONE; try { var w = this.getNative(), s = w.type; if (s == "Text") j = e.SELECTION_TEXT; if (s == "Control") j = e.SELECTION_ELEMENT; if (w.createRange().parentElement) j = e.SELECTION_TEXT } catch (B) { } return q.type = j } : function () {
        var q = this._.cache; if (q.type) return q.type; var j = e.SELECTION_TEXT, w = this.getNative(); if (w) {
            if (w.rangeCount == 1) {
                w = w.getRangeAt(0);
                var s = w.startContainer; if (s == w.endContainer && s.nodeType == n.NODE_ELEMENT && w.endOffset - w.startOffset === 1 && c[s.childNodes[w.startOffset].nodeName.toLowerCase()]) j = e.SELECTION_ELEMENT
            } 
        } else j = e.SELECTION_NONE; return q.type = j
    }, getRanges: h.ie ? function () {
        var q = function (j, w) {
            j = j.duplicate(); j.collapse(w); for (var s = j.parentElement(), B = s.childNodes, l, x = 0; x < B.length; x++) {
                var C = B[x]; if (C.nodeType == n.NODE_ELEMENT) {
                    l = j.duplicate(); l.moveToElementText(C); C = l.compareEndPoints("StartToStart", j); var E = l.compareEndPoints("EndToStart",
j); l.collapse(); if (C > 0) break; else if (!C || E == 1 && C == -1) return { container: s, offset: x }; else if (!E) return { container: s, offset: x + 1 }; l = u
                } 
            } if (!l) { l = j.duplicate(); l.moveToElementText(s); l.collapse(z) } l.setEndPoint("StartToStart", j); l = l.text.replace(/(\r\n|\r)/g, "\n").length; try { for (; l > 0; ) l -= B[--x].nodeValue.length } catch (D) { l = 0 } return l === 0 ? { container: s, offset: x} : { container: B[x], offset: -l}
        }; return function () {
            var j = this._.cache; if (j.ranges) return j.ranges; var w = this.getNative(), s = w && w.createRange(), B = this.getType();
            if (!w) return []; if (B == e.SELECTION_TEXT) { w = new a(this.document); B = q(s, v); w.setStart(new b(B.container), B.offset); B = q(s); w.setEnd(new b(B.container), B.offset); return j.ranges = [w] } else if (B == e.SELECTION_ELEMENT) { j = j.ranges = []; for (B = 0; B < s.length; B++) { var l = s.item(B), x = l.parentNode, C = 0; for (w = new a(this.document); C < x.childNodes.length && x.childNodes[C] != l; C++); w.setStart(new b(x), C); w.setEnd(new b(x), C + 1); j.push(w) } return j } return j.ranges = []
        } 
    } () : function () {
        var q = this._.cache; if (q.ranges) return q.ranges;
        var j = [], w = this.getNative(); if (!w) return []; for (var s = 0; s < w.rangeCount; s++) { var B = w.getRangeAt(s), l = new a(this.document); l.setStart(new b(B.startContainer), B.startOffset); l.setEnd(new b(B.endContainer), B.endOffset); j.push(l) } return q.ranges = j
    }, getStartElement: function () {
        var q = this._.cache; if (q.startElement !== undefined) return q.startElement; var j, w = this.getNative(); switch (this.getType()) {
            case e.SELECTION_ELEMENT: return this.getSelectedElement(); case e.SELECTION_TEXT: var s = this.getRanges()[0]; if (s) if (!s.collapsed) {
                    for (s.optimize(); v; ) {
                        j =
s.startContainer; if (s.startOffset == (j[0].nodeType === n.NODE_ELEMENT ? j[0].childNodes.length : j[0].nodeValue.length) && !j._4e_isBlockBoundary()) s.setStartAfter(j); else break
                    } j = s.startContainer; if (j[0].nodeType != n.NODE_ELEMENT) return j.parent(); j = new b(j[0].childNodes[s.startOffset]); if (!j[0] || j[0].nodeType != n.NODE_ELEMENT) return s.startContainer; for (s = j[0].firstChild; s && s.nodeType == n.NODE_ELEMENT; ) { j = new b(s); s = s.firstChild } return j
                } if (h.ie) { s = w.createRange(); s.collapse(v); j = s.parentElement() } else if ((j =
w.anchorNode) && j.nodeType != n.NODE_ELEMENT) j = j.parentNode
        } return q.startElement = j ? i._4e_wrap(j) : u
    }, getSelectedElement: function () { var q = this, j, w = q._.cache; if (w.selectedElement !== undefined) return w.selectedElement; if (h.ie) { j = q.getNative().createRange(); j = j.item && j.item(0) } j || (j = function () { for (var s = q.getRanges()[0], B, l, x = 2; x && !((B = s.getEnclosedNode()) && B[0].nodeType == n.NODE_ELEMENT && c[B._4e_name()] && (l = B)); x--) s.shrink(f.SHRINK_ELEMENT); return l && l[0] } ()); return w.selectedElement = i._4e_wrap(j) }, reset: function () {
        this._.cache =
{}
    }, selectElement: function (q) { var j; if (h.ie) try { j = this.document.body.createControlRange(); j.addElement(q[0]); j.select() } catch (w) { j = this.document.body.createTextRange(); j.moveToElementText(q[0]); j.select() } finally { } else { j = this.document.createRange(); j.selectNode(q[0]); q = this.getNative(); q.removeAllRanges(); q.addRange(j) } this.reset() }, selectRanges: function (q) {
        if (h.ie) { if (q.length > 1) { var j = q[q.length - 1]; q[0].setEnd(j.endContainer, j.endOffset); q.length = 1 } q[0] && q[0].select() } else {
            j = this.getNative(); if (!j) return;
            j.removeAllRanges(); for (var w = 0; w < q.length; w++) { var s = q[w], B = this.document.createRange(), l = s.startContainer; s.collapsed && h.gecko && h.gecko < 1.09 && l[0].nodeType == n.NODE_ELEMENT && !l[0].childNodes.length && l[0].appendChild(this.document.createTextNode("")); B.setStart(l[0], s.startOffset); B.setEnd(s.endContainer[0], s.endOffset); j.addRange(B) } 
        } this.reset()
    }, createBookmarks2: function (q) { for (var j = [], w = this.getRanges(), s = 0; s < w.length; s++) j.push(w[s].createBookmark2(q)); return j }, createBookmarks: function (q, j) {
        var w =
[], s = this.document, B; j = j || this.getRanges(); for (var l = j.length, x = 0; x < l; x++) { w.push(B = j[x].createBookmark(q, v)); var C = (q = B.serializable) ? k.one("#" + B.startNode, s) : B.startNode; B = q ? k.one("#" + B.endNode, s) : B.endNode; for (var E = x + 1; E < l; E++) { var D = j[E], F = D.startContainer, L = D.endContainer; i._4e_equals(F, C.parent()) && D.startOffset++; i._4e_equals(F, B.parent()) && D.startOffset++; i._4e_equals(L, C.parent()) && D.endOffset++; i._4e_equals(L, B.parent()) && D.endOffset++ } } return w
    }, selectBookmarks: function (q) {
        for (var j = [],
w = 0; w < q.length; w++) { var s = new a(this.document); s.moveToBookmark(q[w]); j.push(s) } this.selectRanges(j); return this
    }, getCommonAncestor: function () { var q = this.getRanges(); return q[0].startContainer._4e_commonAncestor(q[q.length - 1].endContainer) }, scrollIntoView: function () { var q = this.getStartElement(); q && q._4e_scrollIntoView() }, removeAllRanges: function () { var q = this.getNative(); if (h.ie) q && q.clear(); else q && q.removeAllRanges() } 
    }); var o = { table: 1, tbody: 1, tr: 1 }, m = g.whitespaces(v), A = /\ufeff|\u00a0/; a.prototype.select =
a.prototype.select = h.ie ? function (q) {
    var j = this.collapsed, w, s; if (this.startContainer[0] === this.endContainer[0] && this.endOffset - this.startOffset == 1) { var B = this.startContainer[0].childNodes[this.startOffset]; if (B.nodeType == n.NODE_ELEMENT) { (new p(this.document)).selectElement(new b(B)); return } } if (this.startContainer[0].nodeType == n.NODE_ELEMENT && this.startContainer._4e_name() in o || this.endContainer[0].nodeType == n.NODE_ELEMENT && this.endContainer._4e_name() in o) this.shrink(f.SHRINK_ELEMENT, v); var l = this.createBookmark();
    B = l.startNode; var x; if (!j) x = l.endNode; l = this.document.body.createTextRange(); l.moveToElementText(B[0]); l.moveStart("character", 1); if (x) { q = this.document.body.createTextRange(); q.moveToElementText(x[0]); l.setEndPoint("EndToEnd", q); l.moveEnd("character", -1) } else {
        for (w = B[0].nextSibling; w && !m(w); ) w = w.nextSibling; w = !(w && w.nodeValue && w.nodeValue.match(A)) && (q || !B[0].previousSibling || B[0].previousSibling && i._4e_name(B[0].previousSibling) == "br"); s = this.document.createElement("span"); s.innerHTML = "&#65279;";
        s = new b(s); i.insertBefore(s[0], B[0]); w && i.insertBefore(this.document.createTextNode("\ufeff"), B[0])
    } this.setStartBefore(B); B._4e_remove(); if (j) { if (w) { l.moveStart("character", -1); l.select(); this.document.selection.clear() } else l.select(); if (s) { this.moveToPosition(s, f.POSITION_BEFORE_START); s._4e_remove() } } else { this.setEndBefore(x); x._4e_remove(); l.select() } 
} : function () {
    var q = this.startContainer; this.collapsed && q[0].nodeType == n.NODE_ELEMENT && !q[0].childNodes.length && q[0].appendChild(this.document.createTextNode(""));
    var j = this.document.createRange(); j.setStart(q[0], this.startOffset); try { j.setEnd(this.endContainer[0], this.endOffset) } catch (w) { if (w.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) { this.collapse(v); j.setEnd(this.endContainer[0], this.endOffset) } else throw w; } q = t(this.document).getNative(); q.removeAllRanges(); q.addRange(j)
}; p.getSelection = t; r.Selection = p; r.Selection = p; g = p.prototype; r.Utils.extern(g, { getNative: g.getNative, getType: g.getType, getRanges: g.getRanges, getStartElement: g.getStartElement, getSelectedElement: g.getSelectedElement,
    reset: g.reset, selectElement: g.selectElement, selectRanges: g.selectRanges, createBookmarks2: g.createBookmarks2, createBookmarks: g.createBookmarks, getCommonAncestor: g.getCommonAncestor, scrollIntoView: g.scrollIntoView, selectBookmarks: g.selectBookmarks, removeAllRanges: g.removeAllRanges
}); r.on("instanceCreated", function (q) { y(q.editor) })
});
KISSY.Editor.add("styles", function (r) {
    function p(G, K) { for (var H in G) G[H] = G[H].replace(T, function (I, J) { return K[J] }) } function t(G, K) { if (K) { G = j.clone(G); p(G.attributes, K); p(G.styles, K) } var H = this.element = this.element = (G.element || "*").toLowerCase(); this.type = this.type = H == "#" || N[H] ? s.STYLE_BLOCK : O[H] ? s.STYLE_OBJECT : s.STYLE_INLINE; this._ = { definition: G} } function y(G, K) {
        var H = K ? this.removeFromRange : this.applyToRange; G.body.focus(); for (var I = new l(G), J = I.getRanges(), P = 0; P < J.length; P++) H.call(this, J[P]);
        I.selectRanges(J)
    } function v(G, K) { var H; H = G.element; if (H == "*") H = "span"; H = new D(K.createElement(H)); return z(H, G) } function z(G, K) { var H = K._.definition, I = H.attributes; H = t.getStyleText(H); if (I) for (var J in I) G.attr(J, I[J]); if (H) G[0].style.cssText = H; return G } function u(G) {
        var K = G.createBookmark(m), H = G.createIterator(); H.enforceRealBlocks = m; H.enlargeBr = m; for (var I, J = G.document; I = H.getNextParagraph(); ) {
            var P = v(this, J); I = I; var M = P; P = M._4e_name == "pre"; var R = I._4e_name == "pre", X = !P && R; if (P && !R) {
                R = I; M = M; X = R.html();
                X = k(X, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""); X = X.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"); X = X.replace(/([ \t\n\r]+|&nbsp;)/g, " "); X = X.replace(/<br\b[^>]*>/gi, "\n"); if (F.ie) { R = R[0].ownerDocument.createElement("div"); R.appendChild(M[0]); M[0].outerHTML = "<pre>" + X + "</pre>"; M = new D(R.firstChild); M._4e_remove() } else M.html(X); M = M
            } else if (X) M = i(h(I), M); else I._4e_moveChildren(M); I[0].parentNode.replaceChild(M[0], I[0]); if (P) {
                I = M; P = void 0; if ((P = I._4e_previousSourceNode(m, x.NODE_ELEMENT)) && P._4e_name() ==
"pre") { M = k(P.html(), /\n$/, "") + "\n\n" + k(I.html(), /^\n/, ""); if (F.ie) I[0].outerHTML = "<pre>" + M + "</pre>"; else I.html(M); P._4e_remove() } 
            } 
        } G.moveToBookmark(K)
    } function k(G, K, H) { var I = "", J = ""; G = G.replace(/(^<span[^>]+_ke_bookmark.*?\/span>)|(<span[^>]+_ke_bookmark.*?\/span>$)/gi, function (P, M, R) { M && (I = M); R && (J = R); return "" }); return I + G.replace(K, H) + J } function h(G) {
        var K = []; k(G._4e_outerHtml(), /(\S\s*)\n(?:\s|(<span[^>]+_ck_bookmark.*?\/span>))*\n(?!$)/gi, function (H, I, J) { return I + "</pre>" + J + "<pre>" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,
function (H, I) { K.push(I) }); return K
    } function i(G, K) { for (var H = K[0].ownerDocument.createDocumentFragment(), I = 0; I < G.length; I++) { var J = G[I]; J = J.replace(/(\r\n|\r)/g, "\n"); J = k(J, /^[ \t]*\n/, ""); J = k(J, /\n$/, ""); J = k(J, /^[ \t]+|[ \t]+$/g, function (M, R) { return M.length == 1 ? "&nbsp;" : R ? " " + Array(M.length).join("&nbsp;") : Array(M.length).join("&nbsp;") + " " }); J = J.replace(/\n/g, "<br>"); J = J.replace(/[ \t]{2,}/g, function (M) { return Array(M.length).join("&nbsp;") + " " }); var P = K._4e_clone(); P.html(J); H.appendChild(P[0]) } return H }
    function d(G) {
        var K = G.document; if (G.collapsed) { K = v(this, K); G.insertNode(K); G.moveToPosition(K, B.POSITION_BEFORE_END) } else {
            var H = this.element, I = this._.definition, J, P = r.XHTML_DTD[H] || (J = m, r.XHTML_DTD.span), M = G.createBookmark(); G.enlarge(B.ENLARGE_ELEMENT); G.trim(); var R = G.createBookmark(), X = R.startNode; R = R.endNode; for (var W = X, Z; W && W[0]; ) {
                var U = A; if (w._4e_equals(W, R)) { W = q; U = m } else {
                    var V = W[0].nodeType, ba = V == x.NODE_ELEMENT ? W._4e_name() : q; if (ba && W.attr("_ke_bookmark")) { W = W._4e_nextSourceNode(m); continue } if (!ba ||
P[ba] && (W._4e_position(R) | C.POSITION_PRECEDING | C.POSITION_IDENTICAL | C.POSITION_IS_CONTAINED) == C.POSITION_PRECEDING + C.POSITION_IDENTICAL + C.POSITION_IS_CONTAINED && (!I.childRule || I.childRule(W))) {
                        var Y = W.parent(); if (Y && Y[0] && ((r.XHTML_DTD[Y._4e_name()] || r.XHTML_DTD.span)[H] || J) && (!I.parentRule || I.parentRule(Y))) {
                            if (!Z && (!ba || !r.XHTML_DTD.$removeEmpty[ba] || (W._4e_position(R) | C.POSITION_PRECEDING | C.POSITION_IDENTICAL | C.POSITION_IS_CONTAINED) == C.POSITION_PRECEDING + C.POSITION_IDENTICAL + C.POSITION_IS_CONTAINED)) {
                                Z =
new E(K); Z.setStartBefore(W)
                            } if (V == x.NODE_TEXT || V == x.NODE_ELEMENT && !W[0].childNodes.length) { V = W; for (var $; !V[0].nextSibling && ($ = V.parent(), P[$._4e_name()]) && ($._4e_position(X) | C.POSITION_FOLLOWING | C.POSITION_IDENTICAL | C.POSITION_IS_CONTAINED) == C.POSITION_FOLLOWING + C.POSITION_IDENTICAL + C.POSITION_IS_CONTAINED && (!I.childRule || I.childRule($)); ) V = $; Z.setEndAfter(V); V[0].nextSibling || (U = m) } 
                        } else U = m
                    } else U = m; W = W._4e_nextSourceNode()
                } if (U && Z && !Z.collapsed) {
                    U = v(this, K); for (V = Z.getCommonAncestor(); U && V &&
U[0] && V[0]; ) { if (V._4e_name() == H) { for (var aa in I.attributes) U.attr(aa) == V.attr(aa) && U[0].removeAttribute(aa); for (var ea in I.styles) U._4e_style(ea) == V._4e_style(ea) && U._4e_style(ea, ""); if (!U._4e_hasAttributes()) { U = q; break } } V = V.parent() } if (U) {
                        U[0].appendChild(Z.extractContents()); V = U; ba = n(this); Y = V.all(this.element); for (var ca = Y.length; --ca >= 0; ) g(this, new D(Y[ca])); var da = void 0; for (da in ba) if (da != this.element) { Y = V.all(da); for (ca = Y.length - 1; ca >= 0; ca--) { var fa = new D(Y[ca]); c(fa, ba[da]) } } Z.insertNode(U);
                        U._4e_mergeSiblings(); F.ie || U[0].normalize()
                    } Z = q
                } 
            } X._4e_remove(); R._4e_remove(); G.moveToBookmark(M); G.shrink(B.SHRINK_TEXT)
        } 
    } function b(G) {
        G.enlarge(B.ENLARGE_ELEMENT); var K = G.createBookmark(), H = K.startNode; if (G.collapsed) {
            for (var I = new L(H.parent()), J, P = 0, M; P < I.elements.length && (M = I.elements[P]); P++) {
                if (M == I.block || M == I.blockLimit) break; if (this.checkElementRemovable(M)) {
                    var R = G.checkBoundaryOfElement(M, B.END), X = !R && G.checkBoundaryOfElement(M, B.START); if (X || R) { J = M; J.match = X ? "start" : "end" } else {
                        M._4e_mergeSiblings();
                        M._4e_name() == this.element ? g(this, M) : c(M, n(this)[M._4e_name()])
                    } 
                } 
            } if (J && J[0]) { M = H; for (P = 0; ; P++) { R = I.elements[P]; if (w._4e_equals(R, J)) break; else if (R.match) continue; else R = R._4e_clone(); R[0].appendChild(M[0]); M = R } w[J.match == "start" ? "insertBefore" : "insertAfter"](M[0], J[0]) } 
        } else {
            var W = K.endNode, Z = this; I = function () {
                for (var U = new L(H.parent()), V = new L(W.parent()), ba = q, Y = q, $ = 0; $ < U.elements.length; $++) { var aa = U.elements[$]; if (aa == U.block || aa == U.blockLimit) break; if (Z.checkElementRemovable(aa)) ba = aa } for ($ =
0; $ < V.elements.length; $++) { aa = V.elements[$]; if (aa == V.block || aa == V.blockLimit) break; if (Z.checkElementRemovable(aa)) Y = aa } Y && W._4e_breakParent(Y); ba && H._4e_breakParent(ba)
            }; I(); for (J = new D(H[0].nextSibling); J[0] !== W[0]; ) { P = J._4e_nextSourceNode(); if (J[0] && J[0].nodeType == x.NODE_ELEMENT && this.checkElementRemovable(J)) { J._4e_name() == this.element ? g(this, J) : c(J, n(this)[J._4e_name()]); if (P[0].nodeType == x.NODE_ELEMENT && P._4e_contains(H)) { I(); P = new D(H[0].nextSibling) } } J = P } 
        } G.moveToBookmark(K)
    } function e(G) {
        var K =
{}; G.replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (H, I, J) { K[I] = J }); return K
    } function f(G, K) { var H; if (K !== A) { H = document.createElement("span"); H.style.cssText = G; H = H.style.cssText || "" } else H = G; return H.replace(/\s*([;:])\s*/, "$1").replace(/([^\s;])$/, "$1;").replace(/,\s+/g, ",").toLowerCase() } function n(G) {
        if (G._.overrides) return G._.overrides; var K = G._.overrides = {}, H = G._.definition.overrides; if (H) {
            j.isArray(H) || (H = [H]); for (var I = 0; I < H.length; I++) {
                var J = H[I], P, M; if (typeof J ==
"string") P = J.toLowerCase(); else { P = J.element ? J.element.toLowerCase() : G.element; M = J.attributes } J = K[P] || (K[P] = {}); if (M) { J = J.attributes = J.attributes || []; for (var R in M) J.push([R.toLowerCase(), M[R]]) } 
            } 
        } return K
    } function g(G, K) {
        var H = G._.definition, I = j.mix(j.mix({}, H.attributes), n(G)[K._4e_name()]); H = H.styles; var J = j.isEmptyObject(I) && j.isEmptyObject(H), P; for (P in I) if (!((P == "class" || G._.definition.fullMatch) && K.attr(P) != a(P, I[P]))) { J = J || !!K._4e_hasAttribute(P); K.removeAttr(P) } for (var M in H) if (!(G._.definition.fullMatch &&
K._4e_style(M) != a(M, H[M], m))) { J = J || !!K._4e_style(M); K._4e_style(M, "") } J && o(K)
    } function a(G, K, H) { var I = new D("<span>"); I[H ? "_4e_style" : "attr"](G, K); return I[H ? "_4e_style" : "attr"](G) } function c(G, K) { var H = K && K.attributes; if (H) for (var I = 0; I < H.length; I++) { var J = H[I][0], P; if (P = G.attr(J)) { var M = H[I][1]; if (M === q || M.test && M.test(P) || typeof M == "string" && P == M) G[0].removeAttribute(J) } } o(G) } function o(G) {
        if (!G._4e_hasAttributes()) {
            var K = G[0].firstChild, H = G[0].lastChild; G._4e_remove(m); if (K) {
                K.nodeType == x.NODE_ELEMENT &&
w._4e_mergeSiblings(K); H && !K === H && H.nodeType == x.NODE_ELEMENT && w._4e_mergeSiblings(H)
            } 
        } 
    } var m = true, A = false, q = null, j = KISSY, w = j.DOM, s = { STYLE_BLOCK: 1, STYLE_INLINE: 2, STYLE_OBJECT: 3 }, B = r.RANGE, l = r.Selection, x = r.NODE, C = r.POSITION, E = r.Range, D = j.Node, F = j.UA, L = r.ElementPath, N = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1 }, O = { embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1 }, Q = /\s*(?:;\s*|$)/, T = /#\((.+?)\)/g; r.STYLE = s; t.prototype = { apply: function (G) {
        y.call(this,
G, A)
    }, remove: function (G) { y.call(this, G, m) }, applyToRange: function (G) { return (this.applyToRange = this.type == s.STYLE_INLINE ? d : this.type == s.STYLE_BLOCK ? u : this.type == s.STYLE_OBJECT ? q : q).call(this, G) }, removeFromRange: function (G) { return (this.removeFromRange = this.type == s.STYLE_INLINE ? b : q).call(this, G) }, applyToObject: function (G) { z(G, this) }, checkElementRemovable: function (G, K) {
        if (!G) return A; var H = this._.definition; if (G._4e_name() == this.element) {
            if (!K && !G._4e_hasAttributes()) return m; var I = H._AC; if (I) H = I; else {
                I =
{}; var J = 0, P = H.attributes; if (P) for (var M in P) { J++; I[M] = P[M] } if (P = t.getStyleText(H)) { I.style || J++; I.style = P } I._length = J; H = H._AC = I
            } if (H._length) { for (var R in H) if (R != "_length") { J = G.attr(R) || ""; if (R == "style")a: { I = H[R]; J = f(J, A); typeof I == "string" && (I = e(I)); typeof J == "string" && (J = e(J)); P = void 0; for (P in I) if (!(P in J && (J[P] == I[P] || I[P] == "inherit" || J[P] == "inherit"))) { I = A; break a } I = m } else I = H[R] == J; if (I) { if (!K) return m } else if (K) return A } if (K) return m } else return m
        } if (R = n(this)[G._4e_name()]) {
            if (!(H = R.attributes)) return m;
            for (I = 0; I < H.length; I++) { R = H[I][0]; if (R = G.attr(R)) { J = H[I][1]; if (J === q || typeof J == "string" && R == J || J.test && J.test(R)) return m } } 
        } return A
    }, checkActive: function (G) {
        switch (this.type) {
            case s.STYLE_BLOCK: return this.checkElementRemovable(G.block || G.blockLimit, m); case s.STYLE_OBJECT: case s.STYLE_INLINE: for (var K = G.elements, H = 0, I; H < K.length; H++) {
                    I = K[H]; if (!(this.type == s.STYLE_INLINE && (w._4e_equals(I, G.block) || w._4e_equals(I, G.blockLimit)))) if (!(this.type == s.STYLE_OBJECT && !(I._4e_name() in O))) if (this.checkElementRemovable(I,
m)) return m
                } 
        } return A
    } 
    }; t.getStyleText = function (G) { var K = G._ST; if (K) return K; K = G.styles; var H = G.attributes && G.attributes.style || "", I = ""; if (H.length) H = H.replace(Q, ";"); for (var J in K) { var P = K[J], M = (J + ":" + P).replace(Q, ";"); if (P == "inherit") I += M; else H += M } if (H.length) H = f(H); H += I; return G._ST = H }; r.Style = t; r.Style = t; var S = t.prototype; r.Utils.extern(S, { apply: S.apply, remove: S.remove, applyToRange: S.applyToRange, removeFromRange: S.removeFromRange, applyToObject: S.applyToObject, checkElementRemovable: S.checkElementRemovable,
        checkActive: S.checkActive
    })
});
KISSY.Editor.add("htmlparser", function () {
    function r() { this._ = { htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:[^\"'>]+)|(?:\"[^\"]*\")|(?:'[^']*'))*)\\/?>))", "g")} } var p = KISSY, t = function () { }, y = p.Editor, v = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, z = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }, u = y.XHTML_DTD; p.augment(r, { onTagOpen: t, onTagClose: t,
        onText: t, onCDATA: t, onComment: t, parse: function (k) {
            for (var h, i, d = 0, b; h = this._.htmlPartsRegex.exec(k); ) {
                i = h.index; if (i > d) { d = k.substring(d, i); b ? b.push(d) : this.onText(d) } d = this._.htmlPartsRegex.lastIndex; if (i = h[1]) { i = i.toLowerCase(); if (b && u.$cdata[i]) { this.onCDATA(b.join("")); b = null } if (!b) { this.onTagClose(i); continue } } if (b) b.push(h[0]); else if (i = h[3]) {
                    i = i.toLowerCase(); if (!/="/.test(i)) {
                        var e = {}, f; h = h[4]; var n = !!(h && h.charAt(h.length - 1) == "/"); if (h) for (; f = v.exec(h); ) {
                            var g = f[1].toLowerCase(); f = f[2] || f[3] ||
f[4] || ""; e[g] = !f && z[g] ? g : f
                        } this.onTagOpen(i, e, n); if (!b && u.$cdata[i]) b = []
                    } 
                } else if (i = h[2]) this.onComment(i)
            } k.length > d && this.onText(k.substring(d, k.length))
        } 
    }); y.HtmlParser = r; y.HtmlParser = r
});
KISSY.Editor.add("htmlparser-basicwriter", function () {
    function r() { this._ = { output: []} } var p = KISSY, t = p.Editor, y = t.Utils; p.augment(r, { openTag: function (v) { this._.output.push("<", v) }, openTagClose: function (v, z) { z ? this._.output.push(" />") : this._.output.push(">") }, attribute: function (v, z) { if (typeof z == "string") z = y.htmlEncodeAttr(z); this._.output.push(" ", v, '="', z, '"') }, closeTag: function (v) { this._.output.push("</", v, ">") }, text: function (v) { this._.output.push(v) }, comment: function (v) {
        this._.output.push("<!--",
v, "--\>")
    }, write: function (v) { this._.output.push(v) }, reset: function () { this._.output = []; this._.indent = false }, getHtml: function (v) { var z = this._.output.join(""); v && this.reset(); return z } 
    }); t.HtmlParser.BasicWriter = r; t.HtmlParser.BasicWriter = r; p = r.prototype; t.Utils.extern(p, { openTag: p.openTag, openTagClose: p.openTagClose, attribute: p.attribute, closeTag: p.closeTag, text: p.text, comment: p.comment, write: p.write, reset: p.reset, getHtml: p.getHtml })
});
KISSY.Editor.add("htmlparser-htmlwriter", function () {
    function r() {
        r.superclass.constructor.call(this); this.indentationChars = "\t"; this.selfClosingEnd = " />"; this.lineBreakChars = "\n"; this.forceSimpleAmpersand = z; this.sortAttributes = v; this._.indent = z; this._.indentation = ""; this._.rules = {}; var u = t.XHTML_DTD, k; for (k in y.mix({}, u.$nonBodyContent, u.$block, u.$listItem, u.$tableContent)) this.setRules(k, { indent: v, breakBeforeOpen: v, breakAfterOpen: v, breakBeforeClose: !u[k]["#"], breakAfterClose: v }); this.setRules("br",
{ breakAfterOpen: v }); this.setRules("title", { indent: z, breakAfterOpen: z }); this.setRules("style", { indent: z, breakBeforeClose: v }); this.setRules("pre", { indent: z })
    } var p = KISSY, t = p.Editor, y = t.Utils, v = true, z = false; p.extend(r, t.HtmlParser.BasicWriter, { openTag: function (u) { var k = this._.rules[u]; if (this._.indent) this.indentation(); else if (k && k.breakBeforeOpen) { this.lineBreak(); this.indentation() } this._.output.push("<", u) }, openTagClose: function (u, k) {
        var h = this._.rules[u]; if (k) this._.output.push(this.selfClosingEnd);
        else { this._.output.push(">"); if (h && h.indent) this._.indentation += this.indentationChars } h && h.breakAfterOpen && this.lineBreak()
    }, attribute: function (u, k) { if (typeof k == "string") { this.forceSimpleAmpersand && (k = k.replace(/&amp;/g, "&")); k = y.htmlEncodeAttr(k) } this._.output.push(" ", u, '="', k, '"') }, closeTag: function (u) {
        var k = this._.rules[u]; if (k && k.indent) this._.indentation = this._.indentation.substr(this.indentationChars.length); if (this._.indent) this.indentation(); else if (k && k.breakBeforeClose) {
            this.lineBreak();
            this.indentation()
        } this._.output.push("</", u, ">"); k && k.breakAfterClose && this.lineBreak()
    }, text: function (u) { if (this._.indent) { this.indentation(); u = y.ltrim(u) } this._.output.push(u) }, comment: function (u) { this._.indent && this.indentation(); this._.output.push("<!--", u, "--\>") }, lineBreak: function () { this._.output.length > 0 && this._.output.push(this.lineBreakChars); this._.indent = v }, indentation: function () { this._.output.push(this._.indentation); this._.indent = z }, setRules: function (u, k) {
        var h = this._.rules[u]; if (h) y.mix(h,
k); else this._.rules[u] = k
    } 
    }); t.HtmlParser.HtmlWriter = r; t.HtmlParser.HtmlWriter = r; p = r.prototype; t.Utils.extern(p, { openTag: p.openTag, openTagClose: p.openTagClose, attribute: p.attribute, closeTag: p.closeTag, text: p.text, comment: p.comment, lineBreak: p.lineBreak, indentation: p.indentation, setRules: p.setRules })
});
KISSY.Editor.add("htmlparser-fragment", function () {
    function r() { this.children = []; this.parent = y; this._ = { isBlockLike: p, hasInlineStarted: t} } var p = true, t = false, y = null, v = KISSY.Editor, z = { colgroup: 1, dd: 1, dt: 1, li: 1, option: 1, p: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }, u = KISSY, k = v.Utils, h = v.NODE, i = v.XHTML_DTD, d = k.mix({ table: 1, ul: 1, ol: 1, dl: 1 }, i.table, i.ul, i.ol, i.dl), b = i.$list, e = i.$listItem; r.FromHtml = function (f, n) {
        function g(x) {
            var C; if (A.length > 0) for (var E = 0; E < A.length; E++) {
                var D = A[E], F = D.name, L = i[F], N = j.name && i[j.name];
                if ((!N || N[F]) && (!x || !L || L[x] || !i[x])) { if (!C) { a(); C = 1 } D = D.clone(); D.parent = j; j = D; A.splice(E, 1); E-- } 
            } 
        } function a() { for (; q.length; ) j.add(q.shift()) } function c(x, C, E) {
            C = C || j || m; if (n && !C.type) { var D, F; if ((D = x.attributes && (F = x.attributes._ke_real_element_type) ? F : x.name) && !(D in i.$body) && !(D in i.$nonBodyContent)) { D = j; j = C; o.onTagOpen(n, {}); C = j; if (E) j = D } } if (x._.isBlockLike && x.name != "pre") {
                E = x.children.length; if ((D = x.children[E - 1]) && D.type == h.NODE_TEXT) if (F = k.rtrim(D.value)) D.value = F; else x.children.length =
E - 1
            } C.add(x); if (x.returnPoint) { j = x.returnPoint; delete x.returnPoint } 
        } var o = new v.HtmlParser, m = new r, A = [], q = [], j = m, w = t, s; o.onTagOpen = function (x, C, E) {
            var D = new v.HtmlParser.Element(x, C); if (D.isUnknown && E) D.isEmpty = p; if (i.$removeEmpty[x]) A.push(D); else {
                if (x == "pre") w = p; else if (x == "br" && w) { j.add(new v.HtmlParser.Text("\n")); return } if (x == "br") q.push(D); else {
                    var F = j.name, L = F && (i[F] || (j._.isBlockLike ? i.div : i.span)); if (L && !D.isUnknown && !j.isUnknown && !L[x]) {
                        L = t; var N; if (x in b && F in b) {
                            F = j.children; (F = F[F.length -
1]) && F.name in e || c(F = new v.HtmlParser.Element("li"), j); s = j; N = F
                        } else if (x == F) c(j, j.parent); else { if (d[F]) s || (s = j); else { c(j, j.parent, p); z[F] || A.unshift(j) } L = p } j = N ? N : j.returnPoint || j.parent; if (L) { o.onTagOpen.apply(this, arguments); return } 
                    } g(x); a(); D.parent = j; D.returnPoint = s; s = 0; if (D.isEmpty) c(D); else j = D
                } 
            } 
        }; o.onTagClose = function (x) {
            for (var C = A.length - 1; C >= 0; C--) if (x == A[C].name) { A.splice(C, 1); return } for (var E = [], D = [], F = j; F.type && F.name != x; ) { F._.isBlockLike || D.unshift(F); E.push(F); F = F.parent } if (F.type) {
                for (C =
0; C < E.length; C++) { var L = E[C]; c(L, L.parent) } j = F; if (j.name == "pre") w = t; F._.isBlockLike && a(); c(F, F.parent); if (F == j) j = j.parent; A = A.concat(D)
            } if (x == "body") n = t
        }; o.onText = function (x) { if (!j._.hasInlineStarted && !w) { x = k.ltrim(x); if (x.length === 0) return } a(); g(); if (n && (!j.type || j.name == "body") && k.trim(x)) this.onTagOpen(n, {}); w || (x = x.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")); j.add(new v.HtmlParser.Text(x)) }; o.onCDATA = function () { }; o.onComment = function (x) { j.add(new v.HtmlParser.Comment(x)) }; o.parse(f); for (a(); j.type; ) {
            var B =
j.parent, l = j; if (n && (!B.type || B.name == "body") && !i.$body[l.name]) { j = B; o.onTagOpen(n, {}); B = j } B.add(l); j = B
        } return m
    }; u.augment(r, { add: function (f) { var n = this.children.length; if (n = n > 0 && this.children[n - 1] || y) { if (f._.isBlockLike && n.type == h.NODE_TEXT) { n.value = k.rtrim(n.value); if (n.value.length === 0) { this.children.pop(); this.add(f); return } } n.next = f } f.previous = n; f.parent = this; this.children.push(f); this._.hasInlineStarted = f.type == h.NODE_TEXT || f.type == h.NODE_ELEMENT && !f._.isBlockLike }, writeHtml: function (f, n) {
        var g;
        this.filterChildren = this.filterChildren = function () { var a = new v.HtmlParser.BasicWriter; this.writeChildrenHtml.call(this, a, n, p); a = a.getHtml(); this.children = (new r.FromHtml(a)).children; g = 1 }; !this.name && n && n.onFragment(this); this.writeChildrenHtml(f, g ? y : n)
    }, writeChildrenHtml: function (f, n) { for (var g = 0; g < this.children.length; g++) this.children[g].writeHtml(f, n) } 
    }); v.HtmlParser.Fragment = r; v.HtmlParser.Fragment = r; r.FromHtml = r.FromHtml; u = r.prototype; v.Utils.extern(u, { add: u.add, writeHtml: u.writeHtml, writeChildrenHtml: u.writeChildrenHtml })
});
KISSY.Editor.add("htmlparser-element", function () {
    function r(z, u) { this.name = z; this.attributes = u || (u = {}); this.children = []; var k = u._ke_real_element_type || z, h = p.XHTML_DTD; k = !!(h.$nonBodyContent[k] || h.$block[k] || h.$listItem[k] || h.$tableContent[k] || h.$nonEditable[k] || k == "br"); var i = !!h.$empty[z]; this.isEmpty = i; this.isUnknown = !h[z]; this._ = { isBlockLike: k, hasInlineStarted: i || !k} } var p = KISSY.Editor, t = p.NODE, y = function (z, u) { z = z[0]; u = u[0]; return z < u ? -1 : z > u ? 1 : 0 }; KISSY.augment(r, { type: t.NODE_ELEMENT, add: p.HtmlParser.Fragment.prototype.add,
        clone: function () { return new r(this.name, this.attributes) }, writeHtml: function (z, u) {
            var k = this.attributes, h = this, i = h.name, d, b, e, f; h.filterChildren = function () { if (!f) { var a = new p.HtmlParser.BasicWriter; p.HtmlParser.Fragment.prototype.writeChildrenHtml.call(h, a, u); h.children = (new p.HtmlParser.Fragment.FromHtml(a.getHtml())).children; f = 1 } }; h.filterChildren = h.filterChildren; if (u) {
                for (; ; ) {
                    if (!(i = u.onElementName(i))) return; h.name = i; if (!(h = u.onElement(h))) return; h.parent = this.parent; if (h.name == i) break; if (h.type !=
t.NODE_ELEMENT) { h.writeHtml(z, u); return } i = h.name; if (!i) { this.writeChildrenHtml.call(h, z, f ? null : u); return } 
                } k = h.attributes
            } z.openTag(i, k); for (var n = [], g = 0; g < 2; g++) for (d in k) { b = d; e = k[d]; if (g == 1) n.push([d, e]); else if (u) { for (; ; ) if (b = u.onAttributeName(d)) if (b != d) { delete k[d]; d = b } else break; else { delete k[d]; break } if (b) if ((e = u.onAttribute(h, b, e)) === false) delete k[b]; else k[b] = e } } z.sortAttributes && n.sort(y); k = n.length; for (g = 0; g < k; g++) { d = n[g]; z.attribute(d[0], d[1]) } z.openTagClose(i, h.isEmpty); if (!h.isEmpty) {
                this.writeChildrenHtml.call(h,
z, f ? null : u); z.closeTag(i)
            } 
        }, writeChildrenHtml: function () { p.HtmlParser.Fragment.prototype.writeChildrenHtml.apply(this, arguments) } 
    }); p.HtmlParser.Element = r; p.HtmlParser.Element = r; var v = r.prototype; p.Utils.extern(v, { type: v.type, add: v.add, clone: v.clone, writeHtml: v.writeHtml, writeChildrenHtml: v.writeChildrenHtml })
});
KISSY.Editor.add("htmlparser-filter", function () {
    function r(d) { this._ = { elementNames: [], attributeNames: [], elements: { $length: 0 }, attributes: { $length: 0} }; d && this.addRules(d, 10) } function p(d, b) { for (var e = 0; d && e < b.length; e++) { var f = b[e]; d = d.replace(f[0], f[1]) } return d } function t(d, b, e) { if (typeof b == "function") b = [b]; var f, n; n = d.length; var g = b && b.length; if (g) { for (f = 0; f < n && d[f].pri < e; f++); for (n = g - 1; n >= 0; n--) if (g = b[n]) { g.pri = e; d.splice(f, 0, g) } } } function y(d, b, e) {
        if (b) for (var f in b) {
            var n = d[f]; d[f] = v(n, b[f],
e); n || d.$length++
        } 
    } function v(d, b, e) { if (b) { b.pri = e; if (d) { if (d.splice) t(d, b, e); else { d = d.pri > e ? [b, d] : [d, b]; d.filter = z } return d } else return b.filter = b } } function z(d) { for (var b = d.type || d instanceof k.HtmlParser.Fragment, e = 0; e < this.length; e++) { if (b) var f = d.type, n = d.name; var g = this[e].apply(window, arguments); if (g === i) return g; if (b) { if (g && (g.name != n || g.type != f)) return g } else if (typeof g != "string") return g; g != undefined && (d = g) } return d } var u = KISSY, k = u.Editor, h = k.NODE, i = false; u.augment(r, { addRules: function (d,
b) { if (typeof b != "number") b = 10; t(this._.elementNames, d.elementNames, b); t(this._.attributeNames, d.attributeNames, b); y(this._.elements, d.elements, b); y(this._.attributes, d.attributes, b); this._.text = v(this._.text, d.text, b) || this._.text; this._.comment = v(this._.comment, d.comment, b) || this._.comment; this._.root = v(this._.root, d.root, b) || this._.root }, onElementName: function (d) { return p(d, this._.elementNames) }, onAttributeName: function (d) { return p(d, this._.attributeNames) }, onText: function (d) {
    var b = this._.text;
    return b ? b.filter(d) : d
}, onComment: function (d, b) { var e = this._.comment; return e ? e.filter(d, b) : d }, onFragment: function (d) { var b = this._.root; return b ? b.filter(d) : d }, onElement: function (d) { for (var b = [this._.elements["^"], this._.elements[d.name], this._.elements.$], e, f = 0; f < 3; f++) if (e = b[f]) { e = e.filter(d, this); if (e === i) return null; if (e && e != d) return this.onNode(e); if (d.parent && !d.name) break } return d }, onNode: function (d) {
    var b = d.type; return b == h.NODE_ELEMENT ? this.onElement(d) : b == h.NODE_TEXT ? new k.HtmlParser.Text(this.onText(d.value)) :
null
}, onAttribute: function (d, b, e) { if (b = this._.attributes[b]) { d = b.filter(e, d, this); if (d === i) return i; if (typeof d != "undefined") return d } return e } 
    }); k.HtmlParser.Filter = r; u = r.prototype; k.Utils.extern(u, { addRules: u.addRules, onElementName: u.onElementName, onAttributeName: u.onAttributeName, onText: u.onText, onComment: u.onComment, onFragment: u.onFragment, onElement: u.onElement, onNode: u.onNode, onAttribute: u.onAttribute }); k.HtmlParser.Filter = r
});
KISSY.Editor.add("htmlparser-text", function () { function r(v) { this.value = v; this._ = { isBlockLike: y} } var p = KISSY, t = p.Editor, y = false; p.augment(r, { type: t.NODE.NODE_TEXT, writeHtml: function (v, z) { var u = this.value; z && !(u = z.onText(u, this)) || v.text(u) } }); t.HtmlParser.Text = r; t.HtmlParser.Text = r });
KISSY.Editor.add("htmlparser-comment", function () { function r(y) { this.value = y; this._ = { isBlockLike: false} } var p = KISSY.Editor, t = p.NODE; p.HtmlParser.Comment = r; p.HtmlParser.Comment = r; r.prototype = { constructor: r, type: t.NODE_COMMENT, writeHtml: function (y, v) { var z = this.value; if (v) { if (!(z = v.onComment(z, this))) return; if (typeof z != "string") { z.parent = this.parent; z.writeHtml(y, v); return } } y.comment(z) } } });
KISSY.Editor.add("bgcolor", function (r) { var p = KISSY.Editor.ColorSupport, t = { element: "span", styles: { "background-color": "#(color)"} }; r.addPlugin(function () { new p({ editor: r, styles: t, title: "\u80cc\u666f\u989c\u8272", contentCls: "ke-toolbar-bgcolor", text: "bgcolor" }) }) });
KISSY.Editor.add("bubbleview", function () {
    function r(k) { r.superclass.constructor.apply(this, arguments); k.init && k.init.call(this) } var p = KISSY.Editor, t = KISSY, y = t.Event, v = t.DOM, z = t.Node; if (!p.BubbleView) {
        var u = {}; r.attach = function (k) {
            var h = k.pluginInstance, i = k.pluginName; k = h.editor; var d = u[i]; if (d) {
                var b = d.cfg.func, e = u[i].bubble; k.on("selectionChange", function (f) {
                    f = f.path; var n = f.elements; if (f && n) if (f = f.lastElement) if (f = b(f)) {
                        n = u[i]; if (!n.bubble) n.bubble = new r(n.cfg); e = n.bubble; e._selectedEl = f; e._plugin =
h; e.show()
                    } else if (e) { e._selectedEl = e._plugin = null; e.hide() } 
                }); y.on(v._4e_getWin(k.document), "scroll blur", function () { e && e.hide() }); y.on(document, "click", function () { e && e.hide() })
            } 
        }; r.register = function (k) { u[k.pluginName] = { cfg: k} }; r.ATTRS = { focusMgr: { value: false }, draggable: { value: false }, zIndex: { value: p.baseZIndex(p.zIndexManager.BUBBLE_VIEW)} }; t.extend(r, p.SimpleOverlay, { _createEl: function () {
            var k = (new z('<div class="ke-bubbleview-bubble" onmousedown="return false;"></div>')).appendTo(document.body);
            this.el = k; this.set("el", k)
        }, show: function () { var k = this._selectedEl, h = k._4e_getOffset(document); h.top += k.height() + 5; r.superclass.show.call(this, h) } 
        }); p.BubbleView = r
    } 
});
KISSY.Editor.add("button", function () {
    function r(v) { r.superclass.constructor.call(this, v); this._init() } var p = KISSY.Editor, t = KISSY, y = t.Node; if (!p.TripleButton) {
        r.ON = "on"; r.OFF = "off"; r.DISABLED = "disabled"; r.ON_CLASS = "ke-triplebutton-on"; r.OFF_CLASS = "ke-triplebutton-off"; r.DISABLED_CLASS = "ke-triplebutton-disabled"; r.ATTRS = { state: { value: "off" }, container: {}, text: {}, contentCls: {}, cls: {}, el: {} }; t.extend(r, t.Base, { _init: function () {
            var v = this, z = v.get("container"), u = v.get("el"), k = v.get("title"), h = v.get("text"),
i = v.get("contentCls"); v.el = new y("<a class='ke-triplebutton ke-triplebutton-off' href='#' role=\"button\"></a>"); var d = v.el; d._4e_unselectable(); v._attachCls(); if (h) d.html(h); else if (i) { d.html("<span class='ke-toolbar-item " + i + "'></span>"); d.one("span")._4e_unselectable() } k && d.attr("title", k); if (u) u[0].parentNode.replaceChild(d[0], u[0]); else z && z.append(d); d.on("click", v._action, v); v.on("afterStateChange", v._stateChange, v); if (!v.get("cls")) {
                d.on("mousedown", function () { v.get("state") == "off" && d.addClass("ke-triplebutton-active") });
                d.on("mouseup mouseleave", function () { v.get("state") == "off" && d.hasClass("ke-triplebutton-active") && setTimeout(function () { d.removeClass("ke-triplebutton-active") }, 300) })
            } 
        }, _attachCls: function () { var v = this.get("cls"); v && this.el.addClass(v) }, _stateChange: function (v) { this["_" + v.newVal](); this._attachCls() }, disable: function () { this._savedState = this.get("state"); this.set("state", "disabled") }, enable: function () { this.get("state") == "disabled" && this.set("state", this._savedState) }, _action: function (v) {
            this.fire(this.get("state") +
"Click", v); this.fire("click", v); v.preventDefault()
        }, bon: function () { this.set("state", "on") }, boff: function () { this.set("state", "off") }, _on: function () { this.el[0].className = "ke-triplebutton ke-triplebutton-on" }, _off: function () { this.el[0].className = "ke-triplebutton ke-triplebutton-off" }, _disabled: function () { this.el[0].className = "ke-triplebutton ke-triplebutton-disabled" } 
        }); p.TripleButton = r
    } 
});
KISSY.Editor.add("clipboard", function (r) {
    var p = KISSY, t = p.Editor, y = p.Node, v = p.UA, z = t.Range, u = t.RANGE, k = p.Event; t.Paste || function () {
        function h(a) { this.editor = a; this._init() } function i(a) {
            if (!(!v.ie || a.document.compatMode == "BackCompat")) {
                var c = a.getSelection(), o; if (c.getType() == n.SELECTION_ELEMENT && (o = c.getSelectedElement())) {
                    var m = c.getRanges()[0], A = new y(a.document.createTextNode("")); A.insertBefore(o); m.setStartBefore(A); m.setEndAfter(o); c.selectRanges([m]); setTimeout(function () {
                        if (o.parent()) {
                            A.remove();
                            c.selectElement(o)
                        } 
                    }, 0)
                } 
            } 
        } p.augment(h, { _init: function () { var a = this.editor; v.ie ? k.on(a.document, "keydown", this._paste, this) : k.on(a.document, "paste", this._paste, this); a.addCommand("copy", new f("copy")); a.addCommand("cut", new f("cut")); a.addCommand("paste", new f("paste")) }, _paste: function (a) {
            if (!(a.type === "keydown" && !(a.keyCode === 86 && (a.ctrlKey || a.metaKey)))) {
                var c = this, o = c.editor, m = o.document; if (c._running) a.halt(); else {
                    var A = o.getSelection(); a = new z(m); var q = new y(v.webkit ? "<body></body>" : "<div></div>",
null, m); v.webkit && q[0].appendChild(m.createTextNode("\u00a0")); m.body.appendChild(q[0]); q.css({ position: "absolute", top: A.getStartElement().offset().top + "px", width: "1px", height: "1px", overflow: "hidden" }); q.css("left", "-1000px"); var j = A.createBookmarks(); a.setStartAt(q, u.POSITION_AFTER_START); a.setEndAt(q, u.POSITION_BEFORE_END); a.select(true); c._running = true; setTimeout(function () {
    q._4e_remove(); var w; q = v.webkit && (w = q._4e_first()) && w.hasClass("Apple-style-span") ? w : q; A.selectBookmarks(j); o.insertHtml(q.html());
    c._running = false
}, 0)
                } 
            } 
        } 
        }); t.Paste = h; var d = function (a, c) { var o = a.document, m = new y(o.body), A = false, q = function () { A = true }; m.on(c, q); (v.ie > 7 ? o : o.selection.createRange()).execCommand(c); m.detach(c, q); return A }, b = v.ie ? function (a, c) { return d(a, c) } : function (a, c) { try { return a.document.execCommand(c) } catch (o) { return false } }, e = { cut: "\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u7f16\u8f91\u5668\u81ea\u52a8\u6267\u884c\u526a\u5207\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl/Cmd+X)\u6765\u5b8c\u6210", copy: "\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u7f16\u8f91\u5668\u81ea\u52a8\u6267\u884c\u590d\u5236\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl/Cmd+C)\u6765\u5b8c\u6210", paste: "\u60a8\u7684\u6d4f\u89c8\u5668\u5b89\u5168\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u7f16\u8f91\u5668\u81ea\u52a8\u6267\u884c\u7c98\u8d34\u64cd\u4f5c\uff0c\u8bf7\u4f7f\u7528\u952e\u76d8\u5feb\u6377\u952e(Ctrl/Cmd+V)\u6765\u5b8c\u6210" }, f = function (a) {
            this.type =
a; this.canUndo = this.type == "cut"
        }; f.prototype = { exec: function (a) { this.type == "cut" && i(a); (a = b(a, this.type)) || alert(e[this.type]); return a } }; var n = t.Selection, g = { copy: "\u590d\u5236", paste: "\u7c98\u8d34", cut: "\u526a\u5207" }; t.on("contextmenu", function (a) {
            var c = a.contextmenu, o = c.cfg.editor, m = c.el.originalEl, A = { copy: 0, cut: 0, paste: 0 }, q; for (q in A) {
                if (!A.hasOwnProperty(q)) break; A[q] = m.one(".ke-paste-" + q); (function (j) {
                    var w = A[j]; if (!w) {
                        w = (new y("<a href='#'class='ke-paste-" + j + "'>" + g[j] + "</a>")).appendTo(m); w.on("click", function (s) {
                            s.halt();
                            if (!w.hasClass("ke-menuitem-disable")) { c.hide(); setTimeout(function () { o.execCommand(j) }, 30) } 
                        })
                    } A[j] = w
                })(q); a = A[q]; (o.document.queryCommandEnabled(q) ? true : false) ? a.removeClass("ke-menuitem-disable") : a.addClass("ke-menuitem-disable")
            } 
        })
    } (); r.addPlugin(function () { new t.Paste(r) })
});
KISSY.Editor.add("colorsupport", function () {
    function r(m) { return ("0" + m).slice(m.length - 1, m.length + 1) } function p(m) { m = v.trim(m); if (m.charAt(0) == "#") m = m.substring(1); m = m.replace(/\s+/g, ""); var A = ""; if (/^[0-9a-f]{3,3}$/i.test(m)) A = m.replace(/[0-9a-f]/ig, function (j) { return j + j }); else { var q = m.match(d); if (q && q[0]) for (m = 1; m < 4; m++) A += r(parseInt(q[m]).toString(16)); else A = m } return "#" + A.toLowerCase() } function t(m) { t.superclass.constructor.call(this, m); this._init() } var y = KISSY.Editor, v = KISSY, z = v.Node, u = v.Event,
k = y.SimpleOverlay, h = y.TripleButton, i = v.DOM; if (!y.ColorSupport) {
        i.addStyleSheet(".ke-color-panel a {display: block;color:black;text-decoration: none;}.ke-color-panel a:hover {color:black;text-decoration: none;}.ke-color-panel a:active {color:black;}.ke-color-palette {    margin: 5px 8px 8px;}.ke-color-palette table {    border: 1px solid #666666;    border-collapse: collapse;}.ke-color-palette td {    border-right: 1px solid #666666;    height: 18px;    width: 18px;}a.ke-color-a {    height: 18px;    width: 18px;}a.ke-color-a:hover {    border: 1px solid #ffffff;    height: 16px;    width: 16px;}a.ke-color-remove {  padding:3px 8px;  margin:2px 0 3px 0;}a.ke-color-remove:hover {    background-color: #D6E9F8;}",
"ke-color-plugin"); for (var d = /^rgb\((\d+),(\d+),(\d+)\)$/i, b = [["000", "444", "666", "999", "CCC", "EEE", "F3F3F3", "FFF"], ["F00", "F90", "FF0", "0F0", "0FF", "00F", "90F", "F0F"], ["F4CCCC", "FCE5CD", "FFF2CC", "D9EAD3", "D0E0E3", "CFE2F3", "D9D2E9", "EAD1DC", "EA9999", "F9CB9C", "FFE599", "B6D7A8", "A2C4C9", "9FC5E8", "B4A7D6", "D5A6BD", "E06666", "F6B26B", "FFD966", "93C47D", "76A5AF", "6FA8DC", "8E7CC3", "C27BAD", "CC0000", "E69138", "F1C232", "6AA84F", "45818E", "3D85C6", "674EA7", "A64D79", "990000", "B45F06", "BF9000", "38761D", "134F5C", "0B5394",
"351C75", "741B47", "660000", "783F04", "7F6000", "274E13", "0C343D", "073763", "20124D", "4C1130"]], e = "<div class='ke-color-panel'><a class='ke-color-remove' href=\"javascript:void('\u6e05\u9664');\">\u6e05\u9664</a>", f = 0; f < 3; f++) { e += "<div class='ke-color-palette'><table>"; for (var n = b[f], g = n.length / 8, a = 0; a < g; a++) { e += "<tr>"; for (var c = 0; c < 8; c++) { var o = p(n[8 * a + c]); e += "<td>"; e += "<a href='javascript:void(0);' class='ke-color-a' style='background-color:" + o + "'></a>"; e += "</td>" } e += "</tr>" } e += "</table></div>" } e += "<div><a class='ke-button ke-color-others'>\u5176\u4ed6\u989c\u8272</a></div></div>";
        t.ATTRS = { editor: {}, styles: {}, contentCls: {}, text: {} }; v.extend(t, v.Base, { _init: function () { var m = this.get("editor"), A = new h({ container: m.toolBarDiv, title: this.get("title"), contentCls: this.get("contentCls") }); A.on("offClick", this._showColors, this); this.el = A; y.Utils.lazyRun(this, "_prepare", "_real"); y.Utils.sourceDisable(m, this) }, disable: function () { this.el.disable() }, enable: function () { this.el.enable() }, _hidePanel: function (m) {
            var A = this.el.el; m = m.target; var q = this.colorWin; A._4e_equals(m) || A._4e_contains(m) ||
q.hide()
        }, _selectColor: function (m) { m.halt(); m = m.target; if (i._4e_name(m) == "a" && !i.hasClass(m, "ke-button")) { m = new z(m); this._applyColor(p(m._4e_style("background-color"))); this.colorWin.hide() } }, _applyColor: function (m) { var A = this.get("editor"), q = A.document, j = this.get("styles"); A.fire("save"); m ? (new y.Style(j, { color: m })).apply(q) : (new y.Style(j, { color: "inherit" })).remove(q); A.fire("save") }, _prepare: function () {
            var m = this, A = document, q = m.el, j = m.get("editor"), w = new z(e); m.colorWin = new k({ el: w, width: "170px",
                zIndex: j.baseZIndex(y.zIndexManager.POPUP_MENU), mask: false, focusMgr: false
            }); w._4e_unselectable(); w.on("click", m._selectColor, m); m.colorPanel = w; u.on(A, "click", m._hidePanel, m); u.on(j.document, "click", m._hidePanel, m); var s = m.colorWin; s.on("show", q.bon, q); s.on("hide", q.boff, q); w.one(".ke-color-others").on("click", function (B) { B.halt(); s.hide(); j.useDialog("colorsupport/dialog", function (l) { l.show(m) }) })
        }, _real: function () {
            var m = this.el.el, A = this.colorPanel, q = m.offset(); q.top += m.height() + 5; if (q.left + A.width() >
i.viewportWidth() - 60) q.left = i.viewportWidth() - A.width() - 60; this.colorWin.show(q)
        }, _showColors: function (m) { var A = this.colorWin; A && A.get("visible") ? A.hide() : this._prepare(m) } 
        }); y.ColorSupport = t
    } 
});
KISSY.Editor.add("contextmenu", function () {
    function r(i) { this.cfg = i; t.Utils.lazyRun(this, "_prepareShow", "_realShow") } function p(i, d) { for (var b = 0; b < d.length; b++) { var e = d[b]; if (y.isFunction(e)) { if (e(new v(i))) return true } else if (z.test(i, e)) return true } return false } var t = KISSY.Editor, y = KISSY, v = y.Node, z = y.DOM, u = y.Event; if (!t.ContextMenu) {
        r.ATTRS = { editor: {} }; var k = []; r.register = function (i) {
            var d = new r(i), b = i.editor.document; k.push({ doc: b, rules: i.rules || [], instance: d }); if (!b.ke_contextmenu) {
                b.ke_contextmenu =
1; u.on(b, "mousedown", r.hide); u.on(b, "contextmenu", function (e) { r.hide.call(this); for (var f = new v(e.target); f; ) { var n = false; if (f._4e_name() == "body") break; for (var g = 0; g < k.length; g++) { var a = k[g].instance, c = k[g].rules; if (b === k[g].doc && p(f[0], c)) { e.preventDefault(); n = true; setTimeout(function () { a.show(t.Utils.getXY(e.pageX, e.pageY, b, document)) }, 30); break } } if (n) break; f = f.parent() } })
            } return d
        }; r.hide = function () { for (var i = 0; i < k.length; i++) { var d = k[i].instance; this === k[i].doc && d.hide() } }; var h = t.SimpleOverlay;
        y.augment(r, { _init: function () { var i = this, d = i.cfg, b = d.funcs; i.elDom = new v("<div onmousedown='return false;'>"); var e = i.elDom; i.el = new h({ el: e, width: d.width, cls: "ke-menu" }); for (var f in b) { d = new v("<a href='#'>" + f + "</a>"); e[0].appendChild(d[0]); (function (n, g) { n._4e_unselectable(); n.on("click", function (a) { i.hide(); a.halt(); setTimeout(g, 30) }) })(d, b[f]) } }, hide: function () { this.el && this.el.hide() }, _realShow: function (i) { t.fire("contextmenu", { contextmenu: this }); this.el.show(i) }, _prepareShow: function () { this._init() },
            show: function (i) { this._prepareShow(i) } 
        }); t.ContextMenu = r
    } 
});
KISSY.Editor.add("dd", function () {
    function r() { r.superclass.constructor.apply(this, arguments); this._init() } function p() { p.superclass.constructor.apply(this, arguments); this._init() } function t() { t.superclass.constructor.apply(this, arguments) } var y = KISSY, v = y.Editor, z = y.Event, u = y.UA, k = y.DOM, h = y.Node; if (!v.DD) {
        v.DD = {}; r.ATTRS = { bufferTime: { value: 200 }, activeDrag: {} }; y.extend(r, y.Base, { _init: function () { this._showShimMove = v.Utils.throttle(this._move, this, 30) }, _move: function (d) {
            var b = this.get("activeDrag");
            y.log("move"); if (b) { d.preventDefault(); this._clearSelection(); b._move(d) } 
        }, _start: function (d) { var b = this, e = b.get("bufferTime") || 0; b._registerEvent(); if (e) b._bufferTimer = setTimeout(function () { b._bufferStart(d) }, e); else b._bufferStart(d) }, _bufferStart: function (d) { this.set("activeDrag", d); this._activeShim(); d._start() }, _end: function (d) {
            var b = this.get("activeDrag"); this._unregisterEvent(); if (this._bufferTimer) { clearTimeout(this._bufferTimer); this._bufferTimer = null } this._shim && this._shim.css({ display: "none" });
            if (b) { b._end(d); this.set("activeDrag", null) } 
        }, _activeShim: function () { var d = document; this._shim = (new h("<div style='background-color:red;position:absolute;left:0;width:100%;top:0;z-index:" + v.baseZIndex(v.zIndexManager.DD_PG) + ";'></div>")).appendTo(d.body); this._shim.css("opacity", 0); this._activeShim = this._showShim; this._showShim() }, _showShim: function () { this._shim.css({ display: "", height: k.docHeight() }); this._clearSelection() }, _clearSelection: function () {
            if (window.getSelection) window.getSelection().removeAllRanges();
            else document.selection && document.selection.empty()
        }, _registerEvent: function () { var d = document; y.log("_registerEvent"); z.on(d, "mouseup", this._end, this); z.on(d, "mousemove", this._showShimMove, this) }, _unregisterEvent: function () { var d = document; y.log("_unregisterEvent"); z.remove(d, "mousemove", this._showShimMove, this); z.remove(d, "mouseup", this._end, this) } 
        }); v.DD.DDM = new r; var i = v.DD.DDM; p.ATTRS = { node: {}, handlers: { value: {}} }; y.extend(p, y.Base, { _init: function () {
            var d = this.get("node"), b = this.get("handlers");
            if (y.isEmptyObject(b)) b[d[0].id] = d; for (var e in b) if (b.hasOwnProperty(e)) { var f = b[e], n = f.css("cursor"); if (!f._4e_equals(d)) if (!n || n === "auto") f.css("cursor", "move") } d.on("mousedown", this._handleMouseDown, this)
        }, _check: function (d) { var b = this.get("handlers"), e; for (e in b) if (b.hasOwnProperty(e)) if (b[e]._4e_contains(d) || b[e]._4e_equals(d)) return true; return false }, _handleMouseDown: function (d) {
            if (this._check(new h(d.target))) {
                u.webkit || d.preventDefault(); i._start(this); var b = this.get("node"), e = d.pageX;
                d = d.pageY; b = b.offset(); this.startMousePos = { left: e, top: d }; this.startNodePos = b; this._diff = { left: e - b.left, top: d - b.top}
            } 
        }, _move: function (d) { this.fire("move", d) }, _end: function () { this.fire("end") }, _start: function () { this.fire("start") } 
        }); y.extend(t, p, { _init: function () { var d = this; t.superclass._init.apply(d, arguments); var b = d.get("node"); d.on("move", function (e) { b.offset({ left: e.pageX - d._diff.left, top: e.pageY - d._diff.top }) }) } }); v.Draggable = p; v.Drag = t
    } 
});
KISSY.Editor.add("draft", function (r) {
    var p = KISSY, t = p.Editor; t.Draft || function () {
        function y(d, b, e) { for (d += ""; d.length < b; ) d = e + d; return d } function v(d) { if (p.isNumber(d)) d = new Date(d); return d instanceof Date ? [d.getFullYear(), "-", y(d.getMonth() + 1, 2, "0"), "-", y(d.getDate(), 2, "0"), " ", y(d.getHours(), 2, "0"), ":", y(d.getMinutes(), 2, "0"), ":", y(d.getSeconds(), 2, "0")].join("") : d } function z(d) { this.editor = d; this._init() } var u = p.Node, k = p.Event, h = p.JSON, i = window[t.STORE]; p.augment(z, { _init: function () {
            var d = this,
b = d.editor, e = b.statusDiv, f = b.cfg.pluginConfig; f.draft = f.draft || {}; d.draftInterval = f.draft.interval = f.draft.interval || 5; d.draftLimit = f.draft.limit = f.draft.limit || 5; e = (new u("<div class='ke-draft'><spa class='ke-draft-title'>\u5185\u5bb9\u6b63\u6587\u6bcf" + f.draft.interval + "\u5206\u949f\u81ea\u52a8\u4fdd\u5b58\u4e00\u6b21\u3002</span></div>")).appendTo(e); d.timeTip = (new u("<span class='ke-draft-time'>")).appendTo(e); var n = (new u("<a class='ke-button ke-draft-save-btn' style='vertical-align:middle;padding:1px 9px;'><span class='ke-draft-mansave'></span><span>\u7acb\u5373\u4fdd\u5b58</span></a>")).appendTo(e),
g = new t.Select({ container: e, menuContainer: document.body, doc: b.document, width: "85px", popUpWidth: "225px", align: ["r", "t"], title: "\u6062\u590d\u7f16\u8f91\u5386\u53f2" }), a = i.getItem("ke-draft-save"), c = []; d.versions = g; if (a) c = p.isString(a) ? h.parse(decodeURIComponent(a)) : a; d.drafts = c; d.sync(); n.on("click", function () { d.save(false) }); (function () { var o = b.textarea[0].form; o && k.on(o, "submit", function () { d.save(false) }) })(); setInterval(function () { d.save(true) }, d.draftInterval * 60 * 1E3); g.on("click", d.recover, d); d.holder = e; if (f.draft.helpHtml) {
                f =
new t.TripleButton({ cls: "ke-draft-help", title: "\u5e2e\u52a9", text: "\u5e2e\u52a9", container: e }); f.on("click", function () { d._prepareHelp() }); t.Utils.lazyRun(d, "_prepareHelp", "_realHelp"); d.helpBtn = f.el
            } d._holder = e
        }, _prepareHelp: function () {
            var d = this, b = d.editor, e = d.helpBtn, f = (new u(b.cfg.pluginConfig.draft.helpHtml || "")).appendTo(document.body), n = new u("<div style='height:0;position:absolute;font-size:0;width:0;border:8px #000 solid;border-color:#000 transparent transparent transparent;border-style:solid dashed dashed dashed;border-top-color:#CED5E0;'><div style='height:0;position:absolute;font-size:0;width:0;border:8px #000 solid;border-color:#000 transparent transparent transparent;border-style:solid dashed dashed dashed;left:-8px;top:-10px;border-top-color:white;'></div></div>");
            f.append(n); f.css({ border: "1px solid #ACB4BE", "text-align": "left" }); d._help = new t.SimpleOverlay({ el: f, focusMgr: false, draggable: false, width: f.width() + "px", mask: false }); d._help.el.css("border", "none"); d._help.arrow = n; k.on([document, b.document], "click", function (g) { g = g.target; g == e[0] || e._4e_contains(g) || d._help.hide() })
        }, _realHelp: function () {
            var d = this._help, b = this.helpBtn, e = d.arrow; d.show(); b = b.offset(); d.el.offset({ left: b.left - d.el.width() + 17, top: b.top - d.el.height() - 7 }); e.offset({ left: b.left - 2, top: b.top -
8
            })
        }, disable: function () { this.holder.css("visibility", "hidden") }, enable: function () { this.holder.css("visibility", "") }, sync: function () { var d = this.draftLimit, b = this.timeTip, e = this.versions, f = this.drafts; f.length > d && f.splice(0, f.length - d); d = []; for (var n, g = 0; g < f.length; g++) { n = f[g]; n = (n.auto ? "\u81ea\u52a8" : "\u624b\u52a8") + "\u4fdd\u5b58\u4e8e : " + v(n.date); d.push({ name: n, value: g }) } e.set("items", d.reverse()); b.html(n); i.setItem("ke-draft-save", encodeURIComponent(h.stringify(f))) }, save: function (d) {
            var b = this.drafts, e = r.getData(true); if (e) {
                if (b[b.length -
1] && e == b[b.length - 1].content) b.length -= 1; this.drafts = b.concat({ content: e, date: (new Date).getTime(), auto: d }); this.sync()
            } 
        }, recover: function (d) { var b = this.editor, e = this.drafts; d = d.newVal; this.versions.reset("value"); if (confirm("\u786e\u8ba4\u6062\u590d " + v(e[d].date) + " \u7684\u7f16\u8f91\u5386\u53f2\uff1f")) { b.fire("save"); b.setData(e[d].content); b.fire("save") } } 
        }); t.Draft = z
    } (); r.addPlugin(function () { t.storeReady(function () { new t.Draft(r) }) })
});
KISSY.Editor.add("elementpaths", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.Node, v = t.DOM; p.ElementPaths || function () {
        function z(u) { this.cfg = u; this._cache = []; this._init() } v.addStyleSheet(".elementpath {   padding: 0 5px;    text-decoration: none;}.elementpath:hover {    background: #CCFFFF;    text-decoration: none;}", "ke-ElementPaths"); t.augment(z, { _init: function () {
            var u = this.cfg.editor; this.holder = new y("<span>"); this.holder.appendTo(u.statusDiv); u.on("selectionChange", this._selectionChange, this);
            p.Utils.sourceDisable(u, this)
        }, disable: function () { this.holder.css("visibility", "hidden") }, enable: function () { this.holder.css("visibility", "") }, _selectionChange: function (u) {
            var k = this.cfg.editor, h = this.holder; h = h[0] || h; u = u.path.elements; var i, d; i = this._cache; for (d = 0; d < i.length; d++) { i[d].detach("click"); i[d]._4e_remove() } this._cache = []; for (d = 0; d < u.length; d++) {
                i = u[d]; var b = new y("<a href='#' class='elementpath'>" + (i.attr("_ke_real_element_type") || i._4e_name()) + "</a>"); this._cache.push(b); (function (e) {
                    b.on("click",
function (f) { f.halt(); k.focus(); setTimeout(function () { k.getSelection().selectElement(e) }, 50) })
                })(i); h.firstChild ? v.insertBefore(b[0], h.firstChild) : h.appendChild(b[0])
            } 
        } 
        }); p.ElementPaths = z
    } (); r.addPlugin(function () { new p.ElementPaths({ editor: r }) })
});
KISSY.Editor.add("enterkey", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.UA, v = /^h[1-6]$/, z = p.XHTML_DTD, u = t.Node, k = t.Event, h = p.Walker, i = p.ElementPath; p.enterBlock || function () {
        function d(b) { k.on(b.document, "keydown", function (e) { if (e.keyCode === 13) if (!e.shiftKey) { b.fire("save"); var f = b.execCommand("enterBlock"); b.fire("save"); f !== false && e.preventDefault() } }) } d.enterBlock = function (b) {
            var e; e = b.getSelection().getRanges(); for (var f = e.length - 1; f > 0; f--) e[f].deleteContents(); e = e[0]; f = e.document; if (e.checkStartOfBlock() &&
e.checkEndOfBlock()) { var n = (new i(e.startContainer)).block; if (n && (n._4e_name() == "li" || n.parent()._4e_name() == "li")) if (b.hasCommand("outdent")) { b.fire("save"); b.execCommand("outdent"); b.fire("save"); return } else return false } var g = e.splitBlock("p"); if (g) {
                b = g.previousBlock; n = g.nextBlock; var a = g.wasStartOfBlock, c = g.wasEndOfBlock, o; if (n) { o = n.parent(); if (o._4e_name() == "li") { n._4e_breakParent(o); n._4e_move(n._4e_next(), true) } } else if (b && (o = b.parent()) && o._4e_name() == "li") {
                    b._4e_breakParent(o); e.moveToElementEditablePosition(b._4e_next());
                    b._4e_move(b._4e_previous())
                } if (!a && !c) { if (n._4e_name() == "li" && (o = n._4e_first(h.invisible(true))) && t.inArray(o._4e_name(), ["ul", "ol"])) (y.ie ? new u(f.createTextNode("\u00a0")) : new u(f.createElement("br"))).insertBefore(o); n && e.moveToElementEditablePosition(n) } else {
                    var m; if (b) { if (b._4e_name() == "li" || !v.test(b._4e_name())) m = b._4e_clone() } else if (n) m = n._4e_clone(); m || (m = new u("<p>", null, f)); if (o = g.elementPath) {
                        g = 0; for (var A = o.elements.length; g < A; g++) {
                            var q = o.elements[g]; if (q._4e_equals(o.block) || q._4e_equals(o.blockLimit)) break;
                            if (z.$removeEmpty[q._4e_name()]) { q = q._4e_clone(); m._4e_moveChildren(q); m.append(q) } 
                        } 
                    } y.ie || m._4e_appendBogus(); e.insertNode(m); if (y.ie && a && (!c || !b[0].childNodes.length)) { e.moveToElementEditablePosition(c ? b : m); e.select() } e.moveToElementEditablePosition(a && !c ? n : m)
                } if (!y.ie) if (n) { m = new u(f.createElement("span")); m.html("&nbsp;"); e.insertNode(m); m._4e_scrollIntoView(); e.deleteContents() } else m._4e_scrollIntoView(); e.select()
            } 
        }; p.EnterKey = d
    } (); r.addPlugin(function () {
        r.addCommand("enterBlock", { exec: p.EnterKey.enterBlock });
        p.EnterKey(r)
    })
});
KISSY.Editor.add("fakeobjects", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.Node, v = p.NODE, z = p.Config.base + "theme/spacer.gif", u = p.HtmlParser; p = t.Editor; var k = (r = r.htmlDataProcessor) && r.htmlFilter, h = { elements: { $: function (i) {
        var d = i.attributes; if ((d = (d = (d = d && d._ke_realelement) && new u.Fragment.FromHtml(decodeURIComponent(d))) && d.children[0]) && i.attributes._ke_resizable) {
            var b = i.attributes.style; if (b) {
                var e = /(?:^|\s)width\s*:\s*(\d+)/i.exec(b); i = e && e[1]; b = (e = /(?:^|\s)height\s*:\s*(\d+)/i.exec(b)) && e[1];
                if (i) d.attributes.width = i; if (b) d.attributes.height = b
            } 
        } return d
    } 
    }
    }; k && k.addRules(h); r && t.mix(r, { createFakeParserElement: function (i, d, b, e, f) {
        var n; n = new u.BasicWriter; i.writeHtml(n); n = n.getHtml(); var g = i.attributes.style; if (i.attributes.width) g = "width:" + i.attributes.width + "px;" + g; if (i.attributes.height) g = "height:" + i.attributes.height + "px;" + g; i = { "class": d, src: z, _ke_realelement: encodeURIComponent(n), _ke_real_node_type: i.type, style: g, align: i.attributes.align || "" }; f && delete f.width; f && delete f.height; f &&
t.mix(i, f, false); if (b) i._ke_real_element_type = b; if (e) i._ke_resizable = e; return new u.Element("img", i)
    } 
    }); t.augment(p, { createFakeElement: function (i, d, b, e, f, n) {
        var g = i.attr("style") || ""; if (i.attr("width")) g = "width:" + i.attr("width") + "px;" + g; if (i.attr("height")) g = "height:" + i.attr("height") + "px;" + g; i = { "class": d, src: z, _ke_realelement: encodeURIComponent(f || i._4e_outerHtml()), _ke_real_node_type: i[0].nodeType, style: g }; n && delete n.width; n && delete n.height; n && t.mix(i, n, false); if (b) i._ke_real_element_type = b; if (e) i._ke_resizable =
e; return new y("<img/>", i, this.document)
    }, restoreRealElement: function (i) { if (i.attr("_ke_real_node_type") != v.NODE_ELEMENT) return null; i = decodeURIComponent(i.attr("_ke_realelement")); var d = new y("<div>", null, this.document); d.html(i); return d._4e_first(function (b) { return b[0].nodeType == v.NODE_ELEMENT })._4e_remove() } 
    })
}); KISSY.Editor.add("flash", function (r) { r.addPlugin(function () { new KISSY.Editor.Flash(r) }) });
KISSY.Editor.add("flash/support", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.UA, v = t.Event, z = p.ContextMenu, u = t.Node, k = p.BubbleView, h = p.TripleButton, i = r.htmlDataProcessor, d = "ke_flash", b = p.Utils.flash; r = i && i.dataFilter; p.Flash || function () {
        function e(a) { this.editor = a; this._init() } function f(a) { return a._4e_name() === "img" && !!a.hasClass(d) && a } var n = /\.swf(?:$|\?)/i; e.isFlashEmbed = function (a) { a = a.attributes; return a.type == "application/x-shockwave-flash" || n.test(a.src || "") }; t.augment(e, { _config: function () {
            this._cls =
d; this._type = "flash"; this._contentCls = "ke-toolbar-flash"; this._tip = "\u63d2\u5165Flash"; this._contextMenu = g; this._flashRules = ["img." + d]
        }, _init: function () {
            this._config(); var a = this.editor, c = {}, o = this._contextMenu; a._toolbars = a._toolbars || {}; a._toolbars[this._type] = this; this.el = new h({ container: a.toolBarDiv, contentCls: this._contentCls, title: this._tip }); this.el.on("offClick", this.show, this); if (o) for (var m in o) (function (A) { c[A] = function () { o[A](a) } })(m); z.register({ editor: a, rules: this._flashRules, width: "120px",
                funcs: c
            }); k.attach({ pluginName: this._type, pluginInstance: this }); v.on(a.document, "dblclick", this._dbclick, this); p.Utils.sourceDisable(a, this)
        }, disable: function () { this.el.set("state", h.DISABLED) }, enable: function () { this.el.set("state", h.OFF) }, _getFlashUrl: function (a) { return b.getUrl(a) }, _updateTip: function (a, c) { var o = this.editor.restoreRealElement(c); if (o) { o = this._getFlashUrl(o); a.html(o); a.attr("href", o) } }, _dbclick: function (a) {
            var c = new u(a.target); if (c._4e_name() === "img" && c.hasClass(this._cls)) {
                this.show(null,
c); a.halt()
            } 
        }, show: function (a, c) { this.editor.useDialog(this._type + "/dialog", function (o) { o.show(c) }) } 
        }); p.Flash = e; e.registerBubble = function (a, c, o) {
            k.register({ pluginName: a, func: o, init: function () {
                var m = this, A = m.el; A.html(c + ' <a class="ke-bubbleview-url" target="_blank" href="#"></a> -  <span class="ke-bubbleview-link ke-bubbleview-change">\u7f16\u8f91</span> -  <span class="ke-bubbleview-link ke-bubbleview-remove">\u5220\u9664</span>'); var q = A.one(".ke-bubbleview-url"), j = A.one(".ke-bubbleview-change"); A = A.one(".ke-bubbleview-remove");
                j._4e_unselectable(); q._4e_unselectable(); A._4e_unselectable(); j.on("click", function (w) { m._plugin.show(null, m._selectedEl); w.halt() }); A.on("click", function (w) { var s = m._plugin; if (y.webkit) { var B = s.editor.getSelection().getRanges(); B && B[0] && (B[0].collapse(true) || 1) && B[0].select() } m._selectedEl._4e_remove(); m.hide(); s.editor.notifySelectionChange(); w.halt() }); m.on("beforeVisibleChange", function (w) { var s = m._selectedEl; w.newVal && s && m._plugin._updateTip(q, s) })
            } 
            })
        }; e.registerBubble("flash", "Flash \u7f51\u5740\uff1a ",
f); e.checkFlash = f; var g = { "Flash\u5c5e\u6027": function (a) { var c = a.getSelection(); c = c && c.getStartElement(); c = f(c); a = a._toolbars.flash; c && a.show(null, c) } }; e.CLS_FLASH = d; e.TYPE_FLASH = "flash"
    } (); r && r.addRules({ elements: { object: function (e) {
        var f = e.attributes; if (!(f.classid && String(f.classid).toLowerCase())) { for (f = 0; f < e.children.length; f++) if (e.children[f].name == "embed") { if (!p.Flash.isFlashEmbed(e.children[f])) break; return i.createFakeParserElement(e, d, "flash", true) } return null } return i.createFakeParserElement(e,
d, "flash", true)
    }, embed: function (e) { if (!p.Flash.isFlashEmbed(e)) return null; return i.createFakeParserElement(e, d, "flash", true) } 
    }
    }, 5)
});
KISSY.Editor.add("flashbridge", function () {
    function r(d) { this._init(d) } function p(d) { var b = y.isString(d) ? d.match(/(\d)+/g) : d; d = d; if (y.isArray(b)) d = parseFloat(b[0] + "." + t(b[1], 3) + t(b[2], 5)); return d || 0 } function t(d, b) { for (var e = (d + "").length; e++ < b; ) d = "0" + d; return d } var y = KISSY, v = y.Editor; if (!v.FlashBridge) {
        var z = {}; y.augment(r, y.EventTarget, { _init: function (d) {
            var b = y.guid("flashbridge-"); d.flashVars = d.flashVars || {}; d.attrs = d.attrs || {}; d.params = d.params || {}; var e = d.flashVars, f = d.params; y.mix(d.attrs,
{ id: b, width: "100%", height: "100%" }, false); y.mix(f, { allowScriptAccess: "always", allowNetworking: "all", scale: "noScale" }, false); y.mix(e, { shareData: false, useCompression: false }, false); f = { YUISwfId: b, YUIBridgeCallback: "KISSY.Editor.FlashBridge.EventHandler" }; if (d.ajbridge) f = { swfID: b, jsEntry: "KISSY.Editor.FlashBridge.EventHandler" }; y.mix(e, f); z[b] = this; this.id = b; this.swf = v.Utils.flash.createSWFRuntime(d.movie, d); this._expose(d.methods)
        }, _expose: function (d) {
            for (var b = this, e = 0; e < d.length; e++) (function (f) {
                b[f] =
function () { return b._callSWF(f, y.makeArray(arguments)) } 
            })(d[e])
        }, _callSWF: function (d, b) { b = b || []; try { if (this.swf[d]) return this.swf[d].apply(this.swf, b) } catch (e) { var f = ""; if (b.length !== 0) f = "'" + b.join("', '") + "'"; return (new Function("self", "return self.swf." + d + "(" + f + ");"))(this) } }, _eventHandler: function (d) { var b = d.type; if (b === "log") y.log(d.message); else b && this.fire(b, d) }, _destroy: function () { delete z[this.id] } 
        }); r.EventHandler = function (d, b) {
            var e = z[d]; e && setTimeout(function () {
                e._eventHandler.call(e,
b)
            }, 100)
        }; v.FlashBridge = r; var u = y.UA, k, h, i = true; u.fpv = function (d) { if (d || i) { i = false; var b; if (navigator.plugins && navigator.mimeTypes.length) b = (navigator.plugins["Shockwave Flash"] || 0).description; else if (window.ActiveXObject) try { b = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version") } catch (e) { } k = b ? b.match(/(\d)+/g) : void 0; h = p(k) } return k }; u.fpvGEQ = function (d, b) { i && u.fpv(b); return !!h && h >= p(d) } 
    } 
});
KISSY.Editor.add("flashutils", function () {
    var r = KISSY, p = r.Editor, t = p.Utils.flash; if (!t) {
        var y = r.DOM, v = r.Node, z = r.UA; t = { getUrl: function (u) { var k = "", h = p.NODE; if (u._4e_name() == "object") { u = u[0].childNodes; for (var i = 0; i < u.length; i++) if (u[i].nodeType == h.NODE_ELEMENT) if ((y.attr(u[i], "name") || "").toLowerCase() == "movie") k = y.attr(u[i], "value"); else if (y._4e_name(u[i]) == "embed") k = y.attr(u[i], "src"); else if (y._4e_name(u[i]) == "object") k = y.attr(u[i], "data") } else if (u._4e_name() == "embed") k = u.attr("src"); return k },
            createSWF: function (u, k, h) {
                var i = k.attrs || {}, d = k.flashVars, b = "", e = ""; k = k.params || {}; var f = ""; h = h || document; r.mix(i, { wmode: "transparent" }); for (var n in i) if (i.hasOwnProperty(n)) b += n + "='" + i[n] + "' "; r.mix(k, { quality: "high", movie: u, wmode: "transparent" }); for (var g in k) if (k.hasOwnProperty(g)) e += "<param name='" + g + "' value='" + k[g] + "'/>"; if (d) { for (var a in d) if (d.hasOwnProperty(a)) f += "&" + a + "=" + encodeURIComponent(d[a]); f = f.substring(1) } u = "<object " + b + ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" >' +
e + (f ? '<param name="flashVars" value="' + f + '"/>' : "") + "<embed " + b + " " + (f ? 'FlashVars="' + f + '"' : "") + ' pluginspage="http://www.macromedia.com/go/getflashplayer"  quality="high"  src="' + u + '"  type="application/x-shockwave-flash"/></object>'; return { el: new v(u, null, h), html: u}
            }, createSWFRuntime2: function (u, k, h) { h = h || document; var i = (new v("<div style='width:0;height:0;overflow:hidden;'>", null, h)).appendTo(h.body); i = t.createSWF.apply(this, arguments).el.appendTo(i); z.ie || (i = i.one("object")); return i[0] }, createSWFRuntime: function (u,
k, h) {
                var i = k.attrs || {}, d = k.flashVars || {}, b = k.params || {}, e = "", f = "", n = ""; h = h || document; i.id = i.id || r.guid("ke-runtimeflash-"); for (var g in i) if (i.hasOwnProperty(g)) e += g + "='" + i[g] + "' "; for (var a in b) if (b.hasOwnProperty(a)) f += "<param name='" + a + "' value='" + b[a] + "'/>"; for (var c in d) if (d.hasOwnProperty(c)) n += "&" + c + "=" + encodeURIComponent(d[c]); n = n.substring(1); u = z.ie ? "<object " + e + ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" >' + f + '<param name="movie" value="' + u + '" />' + (n ? '<param name="flashVars" value="' +
n + '" />' : "") + "</object>" : "<object type='application/x-shockwave-flash' data='" + u + "' " + e + ">" + f + (n ? '<param name="flashVars" value="' + n + '"/>' : "") + "</object>"; var o = k.holder; if (!o) { o = (new v("<div style='" + (k.style ? k.style : "width:1px;height:1px;position:absolute;" + +"overflow:hidden;") + "'>", null, h)).appendTo(h.body); setTimeout(function () { o.offset({ left: y.scrollLeft(), top: y.scrollTop() }) }, 100) } o.html(u); return h.getElementById(i.id)
            } 
        }; p.Utils.flash = t
    } 
});
KISSY.Editor.add("font", function (r) {
    function p(m) { for (var A = [], q = 0; q < m.length; q++) A.push({ name: m[q], value: m[q] }); return A } var t = KISSY, y = t.Editor, v = y.Style, z = y.TripleButton, u = r.cfg.pluginConfig, k = t.Node, h = u["font-size"]; if (h !== false) {
        h = h || {}; t.mix(h, { items: p(["8px", "10px", "12px", "14px", "18px", "24px", "36px", "48px", "60px", "72px", "84px", "96px"]), width: "55px" }, false); var i = {}, d = [], b = { element: "span", styles: { "font-size": "#(size)" }, overrides: [{ element: "font", attributes: { size: null}}] }; for (o = 0; o < h.items.length; o++) {
            var e =
h.items[o], f = e.name, n = e.attrs; e = e.value; i[e] = new v(b, { size: e }); d.push({ name: f, value: e, attrs: n })
        } u["font-size"] = h
    } var g = u["font-family"]; if (g !== false) {
        g = g || {}; t.mix(g, { items: [{ name: "\u5b8b\u4f53", value: "SimSun" }, { name: "\u9ed1\u4f53", value: "SimHei" }, { name: "\u96b6\u4e66", value: "LiSu" }, { name: "\u6977\u4f53", value: "KaiTi_GB2312" }, { name: "\u5fae\u8f6f\u96c5\u9ed1", value: "Microsoft YaHei" }, { name: "Georgia", value: "Georgia" }, { name: "Times New Roman", value: "Times New Roman" }, { name: "Impact", value: "Impact" }, { name: "Courier New", value: "Courier New" }, { name: "Arial", value: "Arial" },
{ name: "Verdana", value: "Verdana" }, { name: "Tahoma", value: "Tahoma"}], width: "130px"
        }, false); var a = {}, c = []; b = { element: "span", styles: { "font-family": "#(family)" }, overrides: [{ element: "font", attributes: { face: null}}] }; var o; u["font-family"] = g; for (o = 0; o < g.items.length; o++) { e = g.items[o]; f = e.name; n = e.attrs || {}; e = e.value; n.style = n.style || ""; n.style += ";font-family:" + e; a[e] = new v(b, { family: e }); c.push({ name: f, value: e, attrs: n }) } 
    } y.Font || function () {
        function m(j) { m.superclass.constructor.call(this, j); this._init() } function A(j) {
            A.superclass.constructor.call(this,
j); this._init()
        } m.ATTRS = { title: {}, html: {}, styles: {}, editor: {} }; var q = y.Select; t.extend(m, t.Base, { _init: function () {
            var j = this.get("editor"), w = j.toolBarDiv; this.get("html"); this.el = new q({ container: w, doc: j.document, width: this.get("width"), popUpWidth: this.get("popUpWidth"), title: this.get("title"), items: this.get("html"), showValue: this.get("showValue"), menuContainer: new k(document.body) }); this.el.on("click", this._vChange, this); j.on("selectionChange", this._selectionChange, this); y.Utils.sourceDisable(j,
this)
        }, disable: function () { this.el.set("state", q.DISABLED) }, enable: function () { this.el.set("state", q.ENABLED) }, _vChange: function (j) { var w = this.get("editor"), s = j.newVal; j = j.prevVal; var B = this.get("styles"); w.focus(); w.fire("save"); if (s == j) { B[s].remove(w.document); this.el.set("value", "") } else B[s].apply(w.document); w.fire("save") }, _selectionChange: function (j) {
            this.get("editor"); j = j.path.elements; for (var w = this.get("styles"), s = 0, B; s < j.length; s++) {
                B = j[s]; for (var l in w) if (w[l].checkElementRemovable(B, true)) {
                    this.el.set("value",
l); return
                } 
            } this.el.reset("value")
        } 
        }); A.ATTRS = { editor: {}, text: {}, contentCls: {}, title: {}, style: {} }; t.extend(A, t.Base, { _init: function () { var j = this.get("editor"), w = this.get("text"); this.get("style"); var s = this.get("title"); this.el = new z({ text: w, title: s, contentCls: this.get("contentCls"), container: j.toolBarDiv }); this.el.on("offClick", this._on, this); this.el.on("onClick", this._off, this); j.on("selectionChange", this._selectionChange, this); y.Utils.sourceDisable(j, this) }, disable: function () {
            this.el.set("state",
z.DISABLED)
        }, enable: function () { this.el.set("state", z.OFF) }, _on: function () { var j = this.get("editor"); this.get("text"); var w = this.get("style"); this.get("title"); j.fire("save"); w.apply(j.document); j.fire("save"); j.notifySelectionChange(); j.focus() }, _off: function () { var j = this.get("editor"); this.get("text"); var w = this.get("style"); this.get("title"); j.fire("save"); w.remove(j.document); j.fire("save"); j.notifySelectionChange(); j.focus() }, _selectionChange: function (j) {
            this.get("editor"); this.get("text"); var w =
this.get("style"); this.get("title"); var s = this.el; j = j.path; if (s.get("state") != z.DISABLED) w.checkActive(j) ? s.set("state", z.ON) : s.set("state", z.OFF)
        } 
        }); m.SingleFont = A; y.Font = m
    } (); r.addPlugin(function () {
        false !== u["font-size"] && new y.Font({ editor: r, title: "\u5927\u5c0f", width: "30px", showValue: true, popUpWidth: h.width, styles: i, html: d }); false !== u["font-family"] && new y.Font({ editor: r, title: "\u5b57\u4f53", width: "110px", popUpWidth: g.width, styles: a, html: c }); false !== u["font-bold"] && new y.Font.SingleFont({ contentCls: "ke-toolbar-bold",
            title: "\u7c97\u4f53 ", editor: r, style: new v({ element: "strong", overrides: [{ element: "b" }, { element: "span", attributes: { style: "font-weight: bold;"}}] })
        }); false !== u["font-italic"] && new y.Font.SingleFont({ contentCls: "ke-toolbar-italic", title: "\u659c\u4f53 ", editor: r, style: new v({ element: "em", overrides: [{ element: "i" }, { element: "span", attributes: { style: "font-style: italic;"}}] }) }); false !== u["font-underline"] && new y.Font.SingleFont({ contentCls: "ke-toolbar-underline", title: "\u4e0b\u5212\u7ebf ", editor: r, style: new v({ element: "u", overrides: [{ element: "span",
            attributes: { style: "text-decoration: underline;"}
        }]
        })
        }); false !== u["font-strikeThrough"] && new y.Font.SingleFont({ contentCls: "ke-toolbar-strikeThrough", title: "\u5220\u9664\u7ebf ", editor: r, style: new v({ element: "del", overrides: [{ element: "span", attributes: { style: "text-decoration: line-through;"} }, { element: "s"}] }) })
    })
});
KISSY.Editor.add("forecolor", function (r) { var p = KISSY.Editor.ColorSupport, t = { element: "span", styles: { color: "#(color)" }, overrides: [{ element: "font", attributes: { color: null}}] }; r.addPlugin(function () { new p({ editor: r, styles: t, title: "\u6587\u672c\u989c\u8272", contentCls: "ke-toolbar-color", text: "color" }) }) });
KISSY.Editor.add("format", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.Node, v = [], z = { "\u666e\u901a\u6587\u672c": "p", "\u6807\u98981": "h1", "\u6807\u98982": "h2", "\u6807\u98983": "h3", "\u6807\u98984": "h4", "\u6807\u98985": "h5", "\u6807\u98986": "h6" }, u = { p: "1em", h1: "2em", h2: "1.5em", h3: "1.17em", h4: "1em", h5: "0.83em", h6: "0.67em" }, k = {}, h = p.Style, i; for (i in z) if (z[i]) { k[z[i]] = new h({ element: z[i] }); v.push({ name: i, value: z[i], attrs: { style: "font-size:" + u[z[i]]} }) } p.Format || function () {
        function d(e) { d.superclass.constructor.call(this, e); this._init() } d.ATTRS = { editor: {} }; var b = p.Select; t.extend(d, t.Base,
{ _init: function () { var e = this.get("editor"); this.el = new b({ container: e.toolBarDiv, value: "", doc: e.document, width: this.get("width"), popUpWidth: this.get("popUpWidth"), title: this.get("title"), items: this.get("html"), menuContainer: new y(document.body) }); this.el.on("click", this._vChange, this); e.on("selectionChange", this._selectionChange, this); p.Utils.sourceDisable(e, this) }, disable: function () { this.el.set("state", b.DISABLED) }, enable: function () { this.el.set("state", b.ENABLED) }, _vChange: function (e) {
    var f = this.get("editor"),
n = e.newVal; e = e.prevVal; f.fire("save"); if (n != e) k[n].apply(f.document); else { k.p.apply(f.document); this.el.set("value", "p") } f.fire("save")
}, _selectionChange: function (e) { this.get("editor"); e = e.path; for (var f in k) if (k[f].checkActive(e)) { this.el.set("value", f); return } this.el.reset("value") } 
}); p.Format = d
    } (); r.addPlugin(function () { new p.Format({ editor: r, html: v, title: "\u6807\u9898", width: "100px", popUpWidth: "120px" }) })
});
KISSY.Editor.add("htmldataprocessor", function (r) {
    var p = p, t = KISSY, y = t.Editor, v = t.Node, z = t.UA, u = y.NODE, k = y.HtmlParser, h = new k.Filter, i = new k.Filter, d = y.XHTML_DTD; if (!r.htmlDataProcessor) {
        (function () {
            var b = y.HtmlParser.Fragment.prototype, e = y.HtmlParser.Element.prototype; b.onlyChild = e.onlyChild = function () { var f = this.children; return f.length == 1 && f[0] || null }; e.removeAnyChildWithName = function (f) {
                for (var n = this.children, g = [], a, c = 0; c < n.length; c++) {
                    a = n[c]; if (a.name) {
                        if (a.name == f) { g.push(a); n.splice(c--, 1) } g =
g.concat(a.removeAnyChildWithName(f))
                    } 
                } return g
            }; e.getAncestor = function (f) { for (var n = this.parent; n && !(n.name && n.name.match(f)); ) n = n.parent; return n }; b.firstChild = e.firstChild = function (f) { for (var n, g = 0; g < this.children.length; g++) { n = this.children[g]; if (f(n)) return n; else if (n.name) if (n = n.firstChild(f)) return n } return null }; e.addStyle = function (f, n, g) {
                var a = ""; if (typeof n == "string") a += f + ":" + n + ";"; else { if (typeof f == "object") for (var c in f) { if (f.hasOwnProperty(c)) a += c + ":" + f[c] + ";" } else a += f; g = n } if (!this.attributes) this.attributes =
{}; f = this.attributes.style || ""; f = (g ? [a, f] : [f, a]).join(";"); this.attributes.style = f.replace(/^;|;(?=;)/, "")
            }; d.parentOf = function (f) { var n = {}, g; for (g in this) if (g.indexOf("$") == -1 && this[g][f]) n[g] = 1; return n } 
        })(); (function () {
            function b(j) { if (/mso-list\s*:\s*Ignore/i.test(j.attributes && j.attributes.style)) return true; return p } function e(j, w) {
                var s = new y.HtmlParser.Element("ke:listbullet"), B; if (j) if (j[2]) {
                    j = isNaN(j[1]) ? /^[a-z]+$/.test(j[1]) ? "lower-alpha" : /^[A-Z]+$/.test(j[1]) ? "upper-alpha" : "decimal" :
"decimal"; B = "ol"
                } else { j = /[l\u00B7\u2002]/.test(j[1]) ? "disc" : /[\u006F\u00D8]/.test(j[1]) ? "circle" : /[\u006E\u25C6]/.test(j[1]) ? "square" : "disc"; B = "ul" } else { j = "decimal"; B = "ol" } s.attributes = { "ke:listtype": B, style: "list-style-type:" + j + ";" }; s.add(new y.HtmlParser.Text(w)); return s
            } function f(j) {
                var w = j.attributes, s; if ((s = j.removeAnyChildWithName("ke:listbullet")) && s.length && (s = s[0])) {
                    j.name = "ke:li"; if (w.style) w.style = n([["text-indent"], ["line-height"], [/^margin(:?-left)?$/, null, function (B) {
                        B = B.split(" ");
                        B = B[3] || B[1] || B[0]; B = parseInt(B, 10); if (!c && o && B > o) c = B - o; w["ke:margin"] = o = B
                    } ]], p)(w.style, j) || ""; s = s.attributes; j.addStyle(s.style); t.mix(w, s); return true
                } return false
            } function n(j, w) {
                return function (s, B) {
                    var l = []; s.replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (C, E, D) {
                        E = E.toLowerCase(); E == "font-family" && (D = D.replace(/["']/g, "")); for (var F, L, N, O = 0; O < j.length; O++) if (j[O]) {
                            C = j[O][0]; F = j[O][1]; L = j[O][2]; N = j[O][3]; if (E.match(C) && (!F || D.match(F))) {
                                E = N || E; w && (L = L || D); if (typeof L ==
"function") L = L(D, B, E); if (L && L.push) { E = L[0]; L = L[1] } typeof L == "string" && l.push([E, L]); return
                            } 
                        } !w && l.push([E, D])
                    }); for (var x = 0; x < l.length; x++) l[x] = l[x].join(":"); return l.length ? l.join(";") + ";" : false
                } 
            } function g(j) {
                j = j.children; for (var w, s, B, l, x, C, E, D = 0; D < j.length; D++) {
                    w = j[D]; if ("ke:li" == w.name) {
                        w.name = "li"; w = w; s = w.attributes; B = w.attributes["ke:listtype"]; l = parseInt(s["ke:indent"], 10) || c && Math.ceil(s["ke:margin"] / c) || 1; s.style && (s.style = n([["list-style-type", B == "ol" ? "decimal" : "disc"]], p)(s.style) || "");
                        if (C) { if (l > E) { C = new y.HtmlParser.Element(B); C.add(w); x.add(C) } else { if (l < E) { x = E - l; for (var F; x-- && (F = C.parent); ) C = F.parent } C.add(w) } j.splice(D--, 1) } else { C = new y.HtmlParser.Element(B); C.add(w); j[D] = C } x = w; E = l
                    } else C = null
                } c = 0
            } var a = n([[/mso/i], [/^-ms/i], [/^-moz/i], [/^-webkit/i], [/line-height/i], [/display/i, /none/i]], p), c, o = 0, m = d.parentOf("ol"), A = { elementNames: [[/^script$/i, ""], [/^iframe$/i, ""], [/^style$/i, ""], [/^link$/i, ""], [/^meta$/i, ""], [/^\?xml.*$/i, ""], [/^.*namespace.*$/i, ""]], root: function (j) {
                j.filterChildren();
                g(j)
            }, elements: { font: function (j) { delete j.name }, p: function (j) { j.filterChildren(); if (f(j)) return p }, $: function (j) { var w = j.name || ""; w.indexOf(":") != -1 && w.indexOf("ke") == -1 && delete j.name; var s = j.attributes.style; if (w == "span" && (!s || !a(s))) delete j.name; if (w in m) { j.filterChildren(); g(j) } }, span: function (j) { if (!z.gecko && b(j.parent)) return false; if (!z.gecko && b(j)) { j = (j = j.firstChild(function (s) { return s.value || s.name == "img" })) && (j.value || "l."); var w = j.match(/^([^\s]+?)([.)]?)$/); return e(w, j) } }, a: function (j) {
                j =
j.attributes; if (j.href) j._ke_saved_href = j.href
            } 
            }, comment: !z.ie ? function (j, w) { var s = j.match(/<img.*?>/), B = j.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/); if (B) { B = (s = B[1] || s && "l.") && s.match(/>([^\s]+?)([.)]?)</); return e(B, s) } if (z.gecko && s) { s = y.HtmlParser.Fragment.FromHtml(s[0]).children[0]; (B = (B = (B = w.previous) && B.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/)) && B[1]) && (s.attributes.src = B); return s } return false } : function () { return false }, attributes: { "class": function (j) {
                if (/(^|\s+)ke_/.test(j)) return j;
                return false
            }, style: function (j) { j = a(j); if (!j) return false; return j } 
            }, attributeNames: [[/^on/, "ke_on"], [/^lang$/, ""]]
            }, q = { elementNames: [[/^ke:/, ""], [/^\?xml:namespace$/, ""]], elements: { embed: function (j) { var w = j.parent; if (w && w.name == "object") { var s = w.attributes.width; w = w.attributes.height; s && (j.attributes.width = s); w && (j.attributes.height = w) } }, param: function (j) { j.children = []; j.isEmpty = true; return j }, a: function (j) {
                if (!(j.children.length || j.attributes.name)) return false; j = j.attributes; if (j._ke_saved_href) j.href =
j._ke_saved_href
            }, td: function (j) { for (var w = j.children, s = 0; s < w.length; s++) if (w[s].name == "br") { w.splice(s, 1); --s } if (!j.children.length) { w = new y.HtmlParser.Text("&nbsp;"); j.children.push(w) } }, span: function (j) { if (!j.children.length) return false } 
            }, attributes: { style: function (j) { if (!t.trim(j)) return false } }, attributeNames: [[/^ke_on/, "on"], [/^_ke.*/, ""], [/^ke:.*$/, ""]]
            }; if (z.ie) q.attributes.style = function (j) { return j.toLowerCase() }; h.addRules(q); i.addRules(A)
        })(); (function () {
            function b(q) {
                for (var j = q.children.length,
w = q.children[j - 1]; w && w.type == u.NODE_TEXT && !t.trim(w.value); ) w = q.children[--j]; return w
            } function e(q) { var j = b(q); return !j || j.type == u.NODE_ELEMENT && j.name == "br" || q.name == "form" && j.name == "input" } function f(q, j) { var w = q.children, s = b(q); if (s) { if ((j || !z.ie) && s.type == u.NODE_ELEMENT && s.name == "br") w.pop(); s.type == u.NODE_TEXT && a.test(s.value) && w.pop() } } function n(q) { f(q, true); if (e(q)) z.ie ? q.add(new y.HtmlParser.Text("\u00a0")) : q.add(new y.HtmlParser.Element("br", {})) } function g(q) { f(q); e(q) && q.add(new y.HtmlParser.Text("\u00a0")) }
            var a = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, c = y.XHTML_DTD, o = y.Utils.mix({}, c.$block, c.$listItem, c.$tableContent), m; for (m in o) "br" in c[m] || delete o[m]; delete o.pre; c = { elements: {} }; var A = { elements: {} }; for (m in o) { c.elements[m] = n; A.elements[m] = g } i.addRules(c); h.addRules(A)
        })(); (function () { h.addRules({ text: function (b) { return b.replace(/\xa0/g, "&nbsp;") } }) })(); r.htmlDataProcessor = { htmlFilter: h, dataFilter: i, toHtml: function (b, e) { var f = new k.HtmlWriter; k.Fragment.FromHtml(b, e).writeHtml(f, h); return f.getHtml(true) },
            toDataFormat: function (b, e) { if (z.gecko) b = b.replace(/(<!--\[if[^<]*?\])--\>([\S\s]*?)<!--(\[endif\]--\>)/gi, "$1$2$3"); var f = new v("<div>"); f.html("a" + b); b = f.html().substr(1); f = new k.BasicWriter; var n = k.Fragment.FromHtml(b, e); f.reset(); n.writeHtml(f, i); return f.getHtml(true) }, toServer: function (b, e) { var f = new k.BasicWriter; k.Fragment.FromHtml(b, e).writeHtml(f, h); return f.getHtml(true) } 
        }
    } 
});
KISSY.Editor.add("image", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.UA, v = t.Node, z = t.Event, u = p.BubbleView; p.ImageInserter || function () {
        function k(b) { k.superclass.constructor.call(this, b); this._init() } var h = function (b) { return b._4e_name() === "img" && !/(^|\s+)ke_/.test(b[0].className) && b }, i = p.TripleButton; k.ATTRS = { editor: {} }; var d = { "\u56fe\u7247\u5c5e\u6027": function (b) { var e = b.getSelection(); e = e && e.getStartElement(); e = h(e); b = b._toolbars.image; e && b.show(null, e) } }; t.extend(k, t.Base, { _init: function () {
            var b = this.get("editor"),
e = b.toolBarDiv, f = {}; this.editor = b; this.el = new i({ contentCls: "ke-toolbar-image", title: "\u63d2\u5165\u56fe\u7247", container: e }); this.el.on("offClick", this.show, this); z.on(b.document, "dblclick", this._dblclick, this); p.Utils.lazyRun(this, "_prepare", "_real"); b._toolbars = b._toolbars || {}; b._toolbars.image = this; if (d) { for (var n in d) (function (g) { f[g] = function () { d[g](b) } })(n); p.ContextMenu.register({ editor: b, rules: [h], width: "120px", funcs: f }) } u.attach({ pluginName: "image", pluginInstance: this }); p.Utils.sourceDisable(b, this)
        }, disable: function () { this.el.disable() },
            enable: function () { this.el.boff() }, _dblclick: function (b) { var e = new v(b.target); if (h(e)) { this.show(null, e); b.halt() } }, _updateTip: function (b, e) { var f = e.attr("src"); b.html(f); b.attr("href", f) }, show: function (b, e) { this.get("editor").useDialog("image/dialog", function (f) { f.show(e) }) } 
        }); p.ImageInserter = k; (function (b, e, f) {
            u.register({ pluginName: b, func: f, init: function () {
                var n = this, g = n.el; g.html(e + '  <a class="ke-bubbleview-url" target="_blank" href="#"></a> -     <span class="ke-bubbleview-link ke-bubbleview-change">\u7f16\u8f91</span> -     <span class="ke-bubbleview-link ke-bubbleview-remove">\u5220\u9664</span>');
                var a = g.one(".ke-bubbleview-url"), c = g.one(".ke-bubbleview-change"); g = g.one(".ke-bubbleview-remove"); c._4e_unselectable(); a._4e_unselectable(); g._4e_unselectable(); c.on("click", function (o) { n._plugin.show(null, n._selectedEl); o.halt() }); g.on("click", function (o) { var m = n._plugin; if (y.webkit) { var A = m.editor.getSelection().getRanges(); A && A[0] && (A[0].collapse(true) || 1) && A[0].select() } n._selectedEl._4e_remove(); n.hide(); m.editor.notifySelectionChange(); o.halt() }); n.on("afterVisibleChange", function (o) {
                    var m =
n._selectedEl; o.newVal && m && n._plugin._updateTip(a, m)
                })
            } 
            })
        })("image", "\u56fe\u7247\u7f51\u5740\uff1a ", h)
    } (); r.addPlugin(function () { new p.ImageInserter({ editor: r }) })
});
KISSY.Editor.add("indent", function (r) {
    var p = KISSY.Editor, t = { ol: 1, ul: 1 }, y = KISSY, v = p.Walker, z = y.DOM, u = y.Node, k = y.UA, h = p.NODE; p.Indent || function () {
        function i(c) { this.type = c; this.indentCssProperty = "margin-left"; this.indentOffset = 40; this.indentUnit = "px" } function d(c) { return c.type = CKEDITOR.NODE_ELEMENT && c.is("li") } function b(c, o, m) {
            var A = o.startContainer; for (c = o.endContainer; A && !A.parent()._4e_equals(m); ) A = A.parent(); for (; c && !c.parent()._4e_equals(m); ) c = c.parent(); if (A && c) {
                var q = A; A = []; for (var j = false; !j; ) {
                    if (q._4e_equals(c)) j =
true; A.push(q); q = q.next()
                } if (!(A.length < 1)) {
                    q = m._4e_parents(true); for (c = 0; c < q.length; c++) if (t[q[c]._4e_name()]) { m = q[c]; break } q = this.type == "indent" ? 1 : -1; c = A[0]; j = A[A.length - 1]; A = {}; var w = p.ListUtils.listToArray(m, A), s = w[j._4e_getData("listarray_index")].indent; for (c = c._4e_getData("listarray_index"); c <= j._4e_getData("listarray_index"); c++) { w[c].indent += q; var B = w[c].parent; w[c].parent = new u(B[0].ownerDocument.createElement(B._4e_name())) } for (c = j._4e_getData("listarray_index") + 1; c < w.length && w[c].indent >
s; c++) w[c].indent += q; j = p.ListUtils.arrayToList(w, A, null, "p", 0); q = []; if (this.type == "outdent") { var l; if ((l = m.parent()) && l._4e_name() == "li") { w = j.listNode.childNodes; var x; for (c = w.length - 1; c >= 0; c--) if ((x = new u(w[c])) && x._4e_name() == "li") q.push(x) } } if (j) { z.insertBefore(j.listNode, m[0]); m._4e_remove() } if (q && q.length) for (c = 0; c < q.length; c++) {
                        for (x = m = q[c]; (x = x.next()) && x._4e_name() in t; ) { k.ie && !m._4e_first(function (C) { return n(C) && g(C) }) && m[0].appendChild(o.document.createTextNode("\u00a0")); m[0].appendChild(x[0]) } z.insertAfter(m[0],
l[0])
                    } for (c in A) A[c]._4e_clearMarkers(A, true)
                } 
            } 
        } function e(c, o) { var m = parseInt(o._4e_style(this.indentCssProperty), 10); if (isNaN(m)) m = 0; m += (this.type == "indent" ? 1 : -1) * this.indentOffset; if (m < 0) return false; m = Math.max(m, 0); m = Math.ceil(m / this.indentOffset) * this.indentOffset; o.css(this.indentCssProperty, m ? m + this.indentUnit : ""); o[0].style.cssText === "" && o[0].removeAttribute("style"); return true } function f(c) {
            f.superclass.constructor.call(this, c); c = this.get("editor").toolBarDiv; this.el = new a({ container: c,
                contentCls: this.get("contentCls"), title: this.get("title")
            }); this.indentCommand = new i(this.get("type")); this._init()
        } var n = v.whitespaces(true), g = v.bookmark(false, true); y.augment(i, { exec: function (c) {
            for (var o = c.getSelection(), m = o && o.getRanges()[0], A = m.startContainer, q = m.endContainer, j = m.getCommonAncestor(); j && !(j[0].nodeType == h.NODE_ELEMENT && t[j._4e_name()]); ) j = j.parent(); if (j && A[0].nodeType == h.NODE_ELEMENT && A._4e_name() in t) { A = new v(m); A.evaluator = d; m.startContainer = A.next() } if (j && q[0].nodeType == h.NODE_ELEMENT &&
q._4e_name() in t) { A = new v(m); A.evaluator = d; m.endContainer = A.previous() } q = o.createBookmarks(true); if (j) { for (A = j._4e_first(); A && A[0] && A._4e_name() != "li"; ) A = A.next(); var w = m.startContainer; (A[0] == w[0] || A._4e_contains(w)) && e.call(this, c, j) || b.call(this, c, m, j) } else { m = m.createIterator(); m.enforceRealBlocks = true; for (m.enlargeBr = true; j = m.getNextParagraph(); ) e.call(this, c, j) } o.selectBookmarks(q)
        } 
        }); var a = p.TripleButton; f.ATTRS = { type: {}, contentCls: {}, editor: {} }; y.extend(f, y.Base, { _init: function () {
            var c = this.get("editor"),
o = this.el; o.on("offClick", this.exec, this); this.get("type") == "outdent" ? c.on("selectionChange", this._selectionChange, this) : o.set("state", a.OFF); p.Utils.sourceDisable(c, this)
        }, disable: function () { this.el.set("state", a.DISABLED) }, enable: function () { this.el.set("state", a.OFF) }, exec: function () { var c = this.get("editor"), o = this; c.fire("save"); setTimeout(function () { o.indentCommand.exec(c); c.fire("save"); c.notifySelectionChange() }, 10) }, _selectionChange: function (c) {
            this.get("editor"); this.get("type"); var o = c.path,
m = o.blockLimit; c = this.el; if (o.contains(t)) c.set("state", a.OFF); else (o = o.block || m) && o._4e_style(this.indentCommand.indentCssProperty) ? c.set("state", a.OFF) : c.set("state", a.DISABLED)
        } 
        }); p.Indent = f
    } (); r.addPlugin(function () { r.addCommand("outdent", new p.Indent({ editor: r, title: "\u51cf\u5c11\u7f29\u8fdb\u91cf ", contentCls: "ke-toolbar-outdent", type: "outdent" })); r.addCommand("indent", new p.Indent({ editor: r, title: "\u589e\u52a0\u7f29\u8fdb\u91cf ", contentCls: "ke-toolbar-indent", type: "indent" })) })
});
KISSY.Editor.add("justify", function (r) {
    var p = KISSY.Editor, t = KISSY, y = p.TripleButton; p.Justify || function () {
        function v(u, k, h, i) { this.editor = u; this.v = k; this.contentCls = i; this.title = h; this._init() } var z = /(-moz-|-webkit-|start|auto)/i; t.augment(v, { _init: function () { var u = this.editor; this.el = new y({ contentCls: this.contentCls, title: this.title, container: u.toolBarDiv }); u.on("selectionChange", this._selectionChange, this); this.el.on("offClick", this._effect, this); p.Utils.sourceDisable(u, this) }, disable: function () {
            this.el.set("state",
y.DISABLED)
        }, enable: function () { this.el.set("state", y.OFF) }, _effect: function () { var u = this.editor, k = u.getSelection(), h = this.el.get("state"); if (k) { var i = k.createBookmarks(), d = k.getRanges(), b, e; u.fire("save"); for (var f = d.length - 1; f >= 0; f--) { b = d[f].createIterator(); for (b.enlargeBr = true; e = b.getNextParagraph(); ) { e.removeAttr("align"); h == y.OFF ? e.css("text-align", this.v) : e.css("text-align", "") } } u.notifySelectionChange(); k.selectBookmarks(i); u.fire("save") } }, _selectionChange: function (u) {
            var k = this.el; u = u.path;
            u = u.block || u.blockLimit; if (!u || u._4e_name() === "body") k.set("state", y.OFF); else { u = u.css("text-align").replace(z, ""); u == this.v || !u && this.v == "left" ? k.set("state", y.ON) : k.set("state", y.OFF) } 
        } 
        }); p.Justify = v
    } (); r.addPlugin(function () { new p.Justify(r, "left", "\u5de6\u5bf9\u9f50 ", "ke-toolbar-alignleft"); new p.Justify(r, "center", "\u5c45\u4e2d\u5bf9\u9f50 ", "ke-toolbar-aligncenter"); new p.Justify(r, "right", "\u53f3\u5bf9\u9f50 ", "ke-toolbar-alignright") })
});
KISSY.Editor.add("link", function (r) {
    var p = KISSY, t = p.Editor; t.Link || function () {
        function y(b) { this.editor = b; this._init() } function v(b) { return b._4e_ascendant(function (e) { return e._4e_name() === "a" && !!e.attr("href") }, true) } function z(b, e) { var f = { href: b.attr("href"), _ke_saved_href: b.attr(h) }; if (b._4e_hasAttribute("target")) f.target = b.attr("target"); f = new k(d, f); e.fire("save"); f.remove(e.document); e.fire("save") } var u = t.TripleButton, k = t.Style, h = "_ke_saved_href", i = t.BubbleView, d = { element: "a", attributes: { href: "#(href)",
            _ke_saved_href: "#(_ke_saved_href)", target: "#(target)"
        }
        }; y.link_Style = d; y._ke_saved_href = h; y.checkLink = v; i.register({ pluginName: "link", func: v, init: function () {
            var b = this, e = b.el; e.html('\u524d\u5f80\u94fe\u63a5\uff1a  <a href=""  target="_blank" class="ke-bubbleview-url"></a> -  <span class="ke-bubbleview-link ke-bubbleview-change">\u7f16\u8f91</span> -  <span class="ke-bubbleview-link ke-bubbleview-remove">\u53bb\u9664</span>'); var f = e.one(".ke-bubbleview-url"), n = e.one(".ke-bubbleview-change"); e = e.one(".ke-bubbleview-remove"); n._4e_unselectable();
            f._4e_unselectable(); e._4e_unselectable(); n.on("click", function (g) { b._plugin.show(); g.halt() }); e.on("click", function (g) { var a = b._plugin.editor; z(b._selectedEl, a); a.notifySelectionChange(); g.halt() }); b.on("afterVisibleChange", function () { var g = b._selectedEl; if (g) { g = g.attr(h) || g.attr("href"); f.html(g); f.attr("href", g) } })
        } 
        }); y._removeLink = z; p.augment(y, { _init: function () {
            var b = this.editor; this.el = new u({ container: b.toolBarDiv, contentCls: "ke-toolbar-link", title: "\u63d2\u5165\u94fe\u63a5 " }); this.el.on("offClick", this.show,
this); i.attach({ pluginName: "link", pluginInstance: this }); t.Utils.sourceDisable(b, this)
        }, disable: function () { this.el.disable() }, enable: function () { this.el.enable() }, show: function () { this.editor.useDialog("link/dialog", function (b) { b.show() }) } 
        }); t.Link = y
    } (); r.addPlugin(function () { new t.Link(r) })
});
KISSY.Editor.add("list", function (r) {
    var p = KISSY.Editor, t = { ol: 1, ul: 1 }, y = ["ol", "ul"], v = KISSY, z = p.RANGE, u = p.ElementPath, k = p.Walker, h = p.NODE, i = v.UA, d = v.Node, b = v.DOM; p.List || function () {
        function e(c) { this.type = c } function f(c) { f.superclass.constructor.call(this, c); c = this.get("editor").toolBarDiv; this.el = new a({ contentCls: this.get("contentCls"), title: this.get("title"), container: c }); this.listCommand = new e(this.get("type")); this.listCommand.state = this.get("status"); this._init() } var n = { listToArray: function (c,
o, m, A, q) {
            if (!t[c._4e_name()]) return []; A || (A = 0); m || (m = []); for (var j = 0, w = c[0].childNodes.length; j < w; j++) {
                var s = new d(c[0].childNodes[j]); if (s._4e_name() == "li") {
                    var B = { parent: c, indent: A, element: s, contents: [] }; if (q) B.grandparent = q; else { B.grandparent = c.parent(); if (B.grandparent && B.grandparent._4e_name() == "li") B.grandparent = B.grandparent.parent() } o && s._4e_setMarker(o, "listarray_index", m.length); m.push(B); for (var l = 0, x = s[0].childNodes.length, C; l < x; l++) {
                        C = new d(s[0].childNodes[l]); C[0].nodeType == h.NODE_ELEMENT &&
t[C._4e_name()] ? n.listToArray(C, o, m, A + 1, B.grandparent) : B.contents.push(C)
                    } 
                } 
            } return m
        }, arrayToList: function (c, o, m, A) {
            m || (m = 0); if (!c || c.length < m + 1) return null; for (var q = c[m].parent[0].ownerDocument, j = q.createDocumentFragment(), w = null, s = m, B = Math.max(c[m].indent, 0), l = null; ; ) {
                var x = c[s]; if (x.indent == B) {
                    if (!w || c[s].parent._4e_name() != w._4e_name()) { w = c[s].parent._4e_clone(false, true); j.appendChild(w[0]) } l = w[0].appendChild(x.element._4e_clone(false, true)[0]); for (var C = 0; C < x.contents.length; C++) l.appendChild(x.contents[C]._4e_clone(true,
true)[0]); s++
                } else if (x.indent == Math.max(B, 0) + 1) { s = n.arrayToList(c, null, s, A); l.appendChild(s.listNode); s = s.nextIndex } else if (x.indent == -1 && !m && x.grandparent) {
                    if (t[x.grandparent._4e_name()]) l = x.element._4e_clone(false, true)[0]; else if (x.grandparent._4e_name() != "td") { l = q.createElement(A); x.element._4e_copyAttributes(new d(l)) } else l = q.createDocumentFragment(); for (C = 0; C < x.contents.length; C++) {
                        w = x.contents[C]._4e_clone(true, true); l.nodeType == h.NODE_DOCUMENT_FRAGMENT && x.element._4e_copyAttributes(new d(w));
                        l.appendChild(w[0])
                    } if (l.nodeType == h.NODE_DOCUMENT_FRAGMENT && s != c.length - 1) { l.lastChild && l.lastChild.nodeType == h.NODE_ELEMENT && l.lastChild.getAttribute("type") == "_moz" && b._4e_remove(l.lastChild); b._4e_appendBogus(l) } if (l.nodeType == h.NODE_ELEMENT && b._4e_name(l) == A && l.firstChild) { b._4e_trim(l); w = l.firstChild; if (w.nodeType == h.NODE_ELEMENT && b._4e_isBlockBoundary(w)) { w = q.createDocumentFragment(); b._4e_moveChildren(l, w); l = w } } w = b._4e_name(l); if (!i.ie && (w == "div" || w == "p")) b._4e_appendBogus(l); j.appendChild(l);
                    w = null; s++
                } else return null; if (c.length <= s || Math.max(c[s].indent, 0) < B) break
            } if (o) for (c = new d(j.firstChild); c && c[0]; ) { c[0].nodeType == h.NODE_ELEMENT && c._4e_clearMarkers(o, true); c = c._4e_nextSourceNode() } return { listNode: j, nextIndex: s}
        } 
        }, g = /^h[1-6]$/; e.prototype = { changeListType: function (c, o, m, A) {
            var q = n.listToArray(o.root, m), j = []; for (c = 0; c < o.contents.length; c++) {
                var w = o.contents[c]; w = w._4e_ascendant("li", true); if (!(!w || !w[0] || w._4e_getData("list_item_processed"))) {
                    j.push(w); w._4e_setMarker(m, "list_item_processed",
true)
                } 
            } w = new d(o.root[0].ownerDocument.createElement(this.type)); for (c = 0; c < j.length; c++) { var s = j[c]._4e_getData("listarray_index"); q[s].parent = w } m = n.arrayToList(q, m, null, "p"); var B; q = m.listNode.childNodes.length; for (c = 0; c < q && (B = new d(m.listNode.childNodes[c])); c++) B._4e_name() == this.type && A.push(B); b.insertBefore(m.listNode, o.root[0]); o.root._4e_remove()
        }, createList: function (c, o, m) {
            var A = o.contents; c = o.root[0].ownerDocument; var q = []; if (A.length == 1 && A[0][0] === o.root[0]) {
                var j = new d(c.createElement("div"));
                A[0][0].nodeType != h.NODE_TEXT && A[0]._4e_moveChildren(j); A[0][0].appendChild(j[0]); A[0] = j
            } o = o.contents[0].parent(); for (j = 0; j < A.length; j++) o = o._4e_commonAncestor(A[j].parent()); for (j = 0; j < A.length; j++) for (var w = A[j], s; s = w.parent(); ) { if (s[0] === o[0]) { q.push(w); break } w = s } if (!(q.length < 1)) {
                A = new d(q[q.length - 1][0].nextSibling); j = new d(c.createElement(this.type)); for (m.push(j); q.length; ) {
                    m = q.shift(); w = new d(c.createElement("li")); if (g.test(m._4e_name())) w[0].appendChild(m[0]); else {
                        m._4e_copyAttributes(w);
                        m._4e_moveChildren(w); m._4e_remove()
                    } j[0].appendChild(w[0]); i.ie || w._4e_appendBogus()
                } A[0] ? b.insertBefore(j[0], A[0]) : o[0].appendChild(j[0])
            } 
        }, removeList: function (c, o, m) {
            function A(C) { if ((l = new d(B[C ? "firstChild" : "lastChild"])) && !(l[0].nodeType == h.NODE_ELEMENT && l._4e_isBlockBoundary()) && (x = o.root[C ? "_4e_previous" : "_4e_next"](k.whitespaces(true))) && !(l[0].nodeType == h.NODE_ELEMENT && x._4e_isBlockBoundary({ br: 1 }))) b[C ? "insertBefore" : "insertAfter"](c.document.createElement("br"), l[0]) } for (var q = n.listToArray(o.root,
m), j = [], w = 0; w < o.contents.length; w++) { var s = o.contents[w]; s = s._4e_ascendant("li", true); if (!(!s || s._4e_getData("list_item_processed"))) { j.push(s); s._4e_setMarker(m, "list_item_processed", true) } } s = null; for (w = 0; w < j.length; w++) { s = j[w]._4e_getData("listarray_index"); q[s].indent = -1; s = s } for (w = s + 1; w < q.length; w++) if (q[w].indent > Math.max(q[w - 1].indent, 0)) { j = q[w - 1].indent + 1 - q[w].indent; for (s = q[w].indent; q[w] && q[w].indent >= s; ) { q[w].indent += j; w++ } w-- } var B = n.arrayToList(q, m, null, "p").listNode, l, x; A(true); A(undefined);
            b.insertBefore(B, o.root); o.root._4e_remove()
        }, exec: function (c) {
            var o = c.getSelection(), m = o && o.getRanges(); if (!(!m || m.length < 1)) {
                for (var A = o.createBookmarks(true), q = [], j = {}; m.length > 0; ) {
                    var w = m.shift(), s = w.getBoundaryNodes(), B = s.startNode, l = s.endNode; B[0].nodeType == h.NODE_ELEMENT && B._4e_name() == "td" && w.setStartAt(s.startNode, z.POSITION_AFTER_START); l[0].nodeType == h.NODE_ELEMENT && l._4e_name() == "td" && w.setEndAt(s.endNode, z.POSITION_BEFORE_END); w = w.createIterator(); for (w.forceBrBreak = false; s = w.getNextParagraph(); ) if (!s._4e_getData("list_block")) {
                        s._4e_setMarker(j,
"list_block", 1); l = new u(s); var x = l.elements, C = null, E = false, D = l.blockLimit, F; for (B = x.length - 1; B >= 0 && (F = x[B]); B--) if (t[F._4e_name()] && D.contains(F)) { D._4e_removeData("list_group_object"); if (B = F._4e_getData("list_group_object")) B.contents.push(s); else { B = { root: F, contents: [s] }; q.push(B); F._4e_setMarker(j, "list_group_object", B) } E = true; break } if (!E) {
                            l = D || l.block; if (l._4e_getData("list_group_object")) l._4e_getData("list_group_object").contents.push(s); else {
                                B = { root: l, contents: [s] }; l._4e_setMarker(j, "list_group_object",
B); q.push(B)
                            } 
                        } 
                    } 
                } for (m = []; q.length > 0; ) { B = q.shift(); if (this.state == "off") t[B.root._4e_name()] ? this.changeListType(c, B, j, m) : this.createList(c, B, m); else this.state == "on" && t[B.root._4e_name()] && this.removeList(c, B, j) } for (B = 0; B < m.length; B++) { C = m[B]; var L = this; (c = function (N) { var O = C[N ? "_4e_previous" : "_4e_next"](k.whitespaces(true)); if (O && O[0] && O._4e_name() == L.type) { O._4e_remove(); O._4e_moveChildren(C, N ? true : false) } })(); c(true) } p.Utils.clearAllMarkers(j); o.selectBookmarks(A)
            } 
        } 
        }; var a = p.TripleButton; f.ATTRS =
{ editor: {}, type: {}, contentCls: {} }; v.extend(f, v.Base, { _init: function () { var c = this.get("editor"); this.el.on("offClick onClick", this._change, this); c.on("selectionChange", this._selectionChange, this); p.Utils.sourceDisable(c, this) }, disable: function () { this.el.set("state", a.DISABLED) }, enable: function () { this.el.set("state", a.OFF) }, _change: function () { var c = this.get("editor"); this.get("type"); var o = this.el; c.fire("save"); this.listCommand.state = o.get("state"); this.listCommand.exec(c); c.fire("save"); c.notifySelectionChange() },
    _selectionChange: function (c) { this.get("editor"); var o = this.get("type"), m = c.path, A; c = this.el; var q = m.blockLimit; m = m.elements; if (q) { if (m) for (var j = 0; j < m.length && (A = m[j]) && A[0] !== q[0]; j++) { var w = v.indexOf(m[j]._4e_name(), y); if (w !== -1) if (y[w] === o) { c.set("state", a.ON); return } else break } c.set("state", a.OFF) } } 
}); p.ListUtils = n; p.List = f
    } (); r.addPlugin(function () { new p.List({ editor: r, title: "\u9879\u76ee\u5217\u8868", contentCls: "ke-toolbar-ul", type: "ul" }); new p.List({ editor: r, title: "\u7f16\u53f7\u5217\u8868", contentCls: "ke-toolbar-ol", type: "ol" }) })
});
KISSY.Editor.add("localStorage", function () {
    var r = KISSY, p = r.Editor, t; t = p.STORE = "localStorage"; if (!p.storeReady) { p.storeReady = function (v) { p.on("storeReady", v) }; p.on("storeReady", function () { p.storeReady = function (v) { v() }; p.detach("storeReady") }) } if (window[t]) window[t]._ke || p.fire("storeReady"); else {
        var y = p.Config.base + p.Utils.debugUrl("plugins/localStorage/swfstore.swf?rand=" + +new Date); window[t] = new p.FlashBridge({ movie: y, methods: ["setItem", "removeItem", "getValueOf"] }); r.mix(window[t], { _ke: 1, getItem: function (v) { return this.getValueOf(v) } });
        window[t].on("contentReady", function () { p.fire("storeReady") })
    } 
});
KISSY.Editor.add("maximize", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.UA, v = t.Node, z = t.Event, u = p.TripleButton, k = t.DOM, h; if (!(y.gecko < 1.92)) {
        p.Maximize || function () {
            function i(d) { this.editor = d; this._init() } k.addStyleSheet(".ke-toolbar-padding {padding:5px;}", "ke-maximize"); i.init = function () { h = (new v("<iframe  class='ke-maximize-shim' style='position:absolute;top:-9999px;left:-9999px;' frameborder='0'></iframe>")).appendTo(document.body); i.init = null }; t.augment(i, { _init: function () {
                var d = this.editor, b =
new u({ container: d.toolBarDiv, title: "\u5168\u5c4f", contentCls: "ke-toolbar-maximize" }); this.el = b; b.on("offClick", this.maximize, this); b.on("onClick", this.restore, this); p.Utils.lazyRun(this, "_prepare", "_real"); this._toolBarDiv = d.toolBarDiv
            }, restore: function () { var d = this, b = d.editor; d._resize && z.remove(window, "resize", d._resize); d._saveEditorStatus(); d._restoreState(); d.el.boff(); setTimeout(function () { d._restoreEditorStatus(); b.notifySelectionChange(); b.fire("restoreWindow") }, 30) }, _restoreState: function () {
                var d =
document, b = this.editor, e = this._savedParents; if (e) { for (var f = 0; f < e.length; f++) { var n = e[f]; n.el.css("position", n.position) } this._savedParents = null } b.wrap.css({ height: this.iframeHeight }); k.css(d.body, { width: "", height: "", overflow: "" }); d.documentElement.style.overflow = ""; b.editorWrap.css({ position: "static", width: this.editorWrapWidth }); h.css({ left: "-99999px", top: "-99999px" }); window.scrollTo(this.scrollLeft, this.scrollTop); d = this.el.el; d.one("span").removeClass("ke-toolbar-restore").addClass("ke-toolbar-maximize");
                d.attr("title", "\u5168\u5c4f"); y.ie < 8 && this._toolBarDiv.removeClass("ke-toolbar-padding")
            }, _saveSate: function () {
                var d = this.editor, b = [], e = d.editorWrap; this.iframeHeight = d.wrap._4e_style("height"); this.editorWrapWidth = e._4e_style("width"); this.scrollLeft = k.scrollLeft(); this.scrollTop = k.scrollTop(); window.scrollTo(0, 0); for (d = e.parent(); d; ) { e = d.css("position"); if (e != "static") { b.push({ el: d, position: e }); d.css("position", "static") } d = d.parent() } this._savedParents = b; b = this.el.el; this.el.el.one("span").removeClass("ke-toolbar-maximize").addClass("ke-toolbar-restore");
                b.attr("title", "\u53d6\u6d88\u5168\u5c4f"); y.ie < 8 && this._toolBarDiv.addClass("ke-toolbar-padding")
            }, _saveEditorStatus: function () { var d = this.editor; this.savedRanges = null; if (y.gecko && d.iframeFocus) this.savedRanges = (d = d.getSelection()) && d.getRanges() }, _restoreEditorStatus: function () { var d = this.editor, b = d.getSelection(), e = this.savedRanges; d.activateGecko(); e && b && b.selectRanges(e); if (d.iframeFocus && b) (d = b.getStartElement()) && d[0] && d._4e_scrollIntoView(); y.ie < 8 && this.el.el.one("span").css("background-image", "") }, _maximize: function (d) {
                var b =
document, e = this.editor, f = e.editorWrap, n = k.viewportHeight(), g = k.viewportWidth(), a = e.statusDiv ? e.statusDiv[0].offsetHeight : 0, c = e.toolBarDiv[0].offsetHeight; if (y.ie) b.body.style.overflow = "hidden"; else k.css(b.body, { width: 0, height: 0, overflow: "hidden" }); b.documentElement.style.overflow = "hidden"; f.css({ position: "absolute", zIndex: e.baseZIndex(p.zIndexManager.MAXIMIZE), width: g + "px" }); h.css({ zIndex: e.baseZIndex(p.zIndexManager.MAXIMIZE - 5), height: n + "px", width: g + "px" }); f.offset({ left: 0, top: 0 }); h.css({ left: 0,
    top: 0
}); e.wrap.css({ height: n - a - c + "px" }); d !== true && arguments.callee.call(this, true)
            }, _real: function () { var d = this, b = d.editor; d._saveEditorStatus(); d._saveSate(); d._maximize(); d._resize = d._resize || p.Utils.buffer(d._maximize, d, 100); z.on(window, "resize", d._resize); d.el.set("state", u.ON); setTimeout(function () { d._restoreEditorStatus(); b.notifySelectionChange(); b.fire("maximizeWindow") }, 30) }, _prepare: function () { i.init && i.init() }, maximize: function () { this._prepare() } 
            }); p.Maximize = i
        } (); r.addPlugin(function () { new p.Maximize(r) })
    } 
});
KISSY.Editor.add("music", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.DOM, v = t.UA, z = t.Event, u = p.Flash, k = "ke_music", h = r.htmlDataProcessor, i = h && h.dataFilter; i && i.addRules({ elements: { object: function (d) {
        var b = d.attributes; if (!(b.classid && String(b.classid).toLowerCase())) { for (b = 0; b < d.children.length; b++) if (d.children[b].name == "embed") { if (!u.isFlashEmbed(d.children[b])) break; if (d.children[b].attributes.src.indexOf("niftyplayer.swf") != -1) return h.createFakeParserElement(d, k, "music", true) } return null } for (b =
0; b < d.children.length; b++) { var e = d.children[b]; if (e.name == "param" && e.attributes.name == "movie") if (e.attributes.value.indexOf("niftyplayer.swf") != -1) return h.createFakeParserElement(d, k, "music", true) } 
    }, embed: function (d) { if (!u.isFlashEmbed(d)) return null; if (d.attributes.src.indexOf("niftyplayer.swf") != -1) return h.createFakeParserElement(d, k, "music", true) } 
    }
    }, 4); p.MusicInserter || function () {
        function d(n) {
            d.superclass.constructor.apply(this, arguments); n.cfg.disableObjectResizing || z.on(n.document.body, v.ie ?
"resizestart" : "resize", function (g) { y.hasClass(g.target, k) && g.preventDefault() })
        } function b(n) { return n._4e_name() === "img" && !!n.hasClass(k) && n } var e = ["img." + k]; t.extend(d, u, { _config: function () { this._cls = k; this._type = "music"; this._contentCls = "ke-toolbar-music"; this._tip = "\u63d2\u5165\u97f3\u4e50"; this._contextMenu = f; this._flashRules = e } }); u.registerBubble("music", "\u97f3\u4e50\u7f51\u5740\uff1a ", b); p.MusicInserter = d; var f = { "\u97f3\u4e50\u5c5e\u6027": function (n) { var g = n.getSelection(); g = (g = g && g.getStartElement()) && b(g); n = n._toolbars.music; g && n.show(null, g) } }
    } (); r.addPlugin(function () { new p.MusicInserter(r) })
});
KISSY.Editor.add("overlay", function () {
    function r() { r.superclass.constructor.apply(this, arguments); this._init() } var p = KISSY, t = p.Editor, y = p.UA, v = t.focusManager, z = p.Node, u = p.Event, k = p.DOM, h, i, d = { left: "-9999px", top: "-9999px" }, b = t.baseZIndex(t.zIndexManager.LOADING); if (!t.SimpleOverlay) {
        r.mask = function (e) {
            if (!h) { h = new r({ el: new z("<div>"), cls: "ke-mask", focusMgr: false, draggable: false }); h.el.css({ width: "100%", "background-color": "#000000", height: k.docHeight(), opacity: 0.15 }) } e = e || b; h.el.css("z-index", e); h.show({ left: 0,
                top: 0
            })
        }; r.unmask = function () { h && h.hide() }; r.loading = function (e) { if (!i) { i = new r({ el: new z("<div>"), focusMgr: false, cls: "ke-loading", shortkey: false, draggable: false }); i.el.css({ opacity: 0.15, border: 0 }) } var f, n, g; if (e) { g = e.offset(); f = e[0].offsetWidth; n = e[0].offsetHeight; e = parseInt(e.css("z-index")) + 1; i.el.css("background-attachment", "scroll") } else { g = { left: 0, top: 0 }; f = "100%"; n = k.docHeight(); e = b; i.el.css("background-attachment", "fixed") } i.el.css({ width: f, height: n, "z-index": e }); i.show(g); return i }; r.unloading =
function () { i && i.hide() }; r.ATTRS = { title: { value: "" }, width: { value: "500px" }, height: {}, cls: {}, shortkey: { value: true }, visible: { value: false }, zIndex: { value: t.baseZIndex(t.zIndexManager.OVERLAY) }, focusMgr: { value: true }, mask: { value: false }, draggable: { value: true} }; p.extend(r, p.Base, { _init: function () {
    var e = this; e._createEl(); var f = e.el; f.css("z-index", e.get("zIndex")); e.on("afterVisibleChange", function (n) { if (n = n.newVal) { typeof n == "boolean" ? e.center() : f.offset(n); e.fire("show") } else { f.css(d); e.fire("hide") } }); if (e.get("focusMgr")) {
        e._initFocusNotice();
        e.on("afterVisibleChange", e._editorFocusMg, e)
    } e.on("afterVisibleChange", function (n) { n.newVal && e.get("shortkey") ? e._register() : e._unregister() }); if (e.get("mask")) { e.on("show", function () { r.mask(e.get("zIndex") - 1) }); e.on("hide", function () { r.unmask() }) } e.on("afterZIndexChange", function (n) { f.css("z-index", n.newVal) }); t.Utils.lazyRun(this, "_prepareShow", "_realShow")
}, _register: function () { u.on(document, "keydown", this._keydown, this) }, _keydown: function (e) { if (e.keyCode == 27) { this.hide(); e.halt() } }, _unregister: function () {
    u.remove(document,
"keydown", this._keydown, this)
}, _createEl: function () {
    var e = this, f = e.get("el"); if (f) { e.originalEl = f; if (!f[0].parentNode || f[0].parentNode.nodeType != t.NODE.NODE_ELEMENT) f = (new z("<div class='ke-dialog'>")).append((new z("<div class='ke-dialog-wrapper'>")).append(f)).appendTo(document.body); else { var n = new z("<div class='ke-dialog'>"); n.insertBefore(f); n.append((new z("<div class='ke-dialog-wrapper'>")).append(f)); f = n } } else {
        f = (new z("<div class='ke-dialog' ><div class='ke-dialog-wrapper'><div class='ke-hd'><span class='ke-hd-title'>@title@</span><a class='ke-hd-x' href='#'><span class='ke-close'>X</span></a></div><div class='ke-bd'></div><div class='ke-ft'></div></div></div>".replace(/@title@/,
e.get("title")))).appendTo(document.body); n = f.one(".ke-hd"); var g = e.get("height"); e.body = f.one(".ke-bd"); e.foot = f.one(".ke-ft"); e._title = n.one("h1"); f.one(".ke-hd-x").on("click", function (c) { c.preventDefault(); e.hide() }); g && e.body.css({ height: g, overflow: "auto" }); if (g = e.get("draggable")) { var a = { all: f, foot: e.foot, body: e.body, head: n }; (g = g === true ? n : a[g]) && new t.Drag({ node: f, handlers: { id: g} }) } 
    } e.get("cls") && f.addClass(e.get("cls")); e.get("width") && f.css("width", e.get("width")); e.set("el", f); e.el = f; f.css(d)
},
    center: function () { var e = this.el, f = e.width(), n = e.height(), g = k.viewportWidth(), a = k.viewportHeight(); f = (g - f) / 2 + k.scrollLeft(); n = (a - n) / 2 + k.scrollTop(); if (n - k.scrollTop() > 200) n -= 150; f = Math.max(f, k.scrollLeft()); n = Math.max(n, k.scrollTop()); e.css({ left: f + "px", top: n + "px" }) }, _getFocusEl: function () { var e = this._focusEl; if (e) return e; return this._focusEl = e = (new z("<a href='#' class='ke-focus' style='width:0;height:0;margin:0;padding:0;overflow:hidden;outline:none;font-size:0;'></a>")).appendTo(this.el) }, _initFocusNotice: function () {
        var e =
this, f = e._getFocusEl(); f.on("focus", function () { e.fire("focus") }); f.on("blur", function () { e.fire("blur") })
    }, _editorFocusMg: function (e) { var f = this._focusEditor; if (e.newVal) { f = this._focusEditor = v.currentInstance(); y.webkit || this._getFocusEl()[0].focus(); if (y.ie && f) if (e = f.document.selection.createRange()) if (e.item && e.item(0).ownerDocument == f.document) { f = document.body.createTextRange(); f.moveToElementText(this.el._4e_first()[0]); f.collapse(true); f.select() } } else f && f.focus() }, _prepareShow: function () {
        if (y.ie ==
6) { var e = new z("<iframe class='ke-dialog-iframe'></iframe>"); e.css(p.mix({ opacity: 0 })); e.insertBefore(this.el.one(".ke-dialog-wrapper")) } 
    }, loading: function () { return r.loading(this.el) }, unloading: function () { r.unloading() }, _realShow: function (e) { this.set("visible", e || true) }, show: function (e) { this._prepareShow(e) }, hide: function () { this.set("visible", false) } 
}); t.Utils.lazyRun(r.prototype, "_prepareLoading", "_realLoading"); t.SimpleOverlay = r
    } 
});
KISSY.Editor.add("pagebreak", function (r) {
    var p = KISSY, t = p.Editor, y = r.htmlDataProcessor, v = y && y.dataFilter, z = "ke_pagebreak", u = "div"; v && v.addRules({ elements: { div: function (k) { var h = k.attributes; var i = (h = h && h.style) && k.children.length == 1 && k.children[0]; if ((i = i && i.name == "span" && i.attributes.style) && /page-break-after\s*:\s*always/i.test(h) && /display\s*:\s*none/i.test(i)) return y.createFakeParserElement(k, z, u) } } }); t.PageBreak || function () {
        function k(b) {
            var e = new i({ container: b.toolBarDiv, title: "\u5206\u9875", contentCls: "ke-toolbar-pagebreak" });
            e.on("offClick", function () { var f = new h(d, null, b.document); f = b.createFakeElement ? b.createFakeElement(f, z, u, true, d) : f; f = (new h("<div>", null, b.document)).append(f); b.insertElement(f) }); this.el = e; t.Utils.sourceDisable(b, this)
        } var h = p.Node, i = t.TripleButton, d = '<div style="page-break-after: always; "><span style="DISPLAY:none">&nbsp;</span></div>'; p.augment(k, { disable: function () { this.el.set("state", i.DISABLED) }, enable: function () { this.el.set("state", i.OFF) } }); t.PageBreak = k
    } (); r.addPlugin(function () { new t.PageBreak(r) })
});
KISSY.Editor.add("preview", function (r) {
    var p = KISSY.Editor, t = KISSY, y = p.TripleButton; p.Preview || function () {
        function v(z) { this.editor = z; this._init() } t.augment(v, { _init: function () { this.el = new y({ container: this.editor.toolBarDiv, title: "\u9884\u89c8", contentCls: "ke-toolbar-preview" }); this.el.on("offClick", this._show, this) }, _show: function () {
            var z = this.editor, u = 640, k = 420, h = 80; try { var i = window.screen; u = Math.round(i.width * 0.8); k = Math.round(i.height * 0.7); h = Math.round(i.width * 0.1) } catch (d) { } z = z._prepareIFrameHtml().replace(/<body[^>]+>.+<\/body>/,
"<body>\n" + z.getData(true) + "\n</body>").replace(/\${title}/, "\u9884\u89c8"); u = window.open("", "", "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + u + ",height=" + k + ",left=" + h); u.document.open(); u.document.write(z); u.document.close(); u.focus()
        } 
        }); p.Preview = v
    } (); r.addPlugin(function () { new p.Preview(r) })
});
KISSY.Editor.add("progressbar", function () {
    function r() { r.superclass.constructor.apply(this, arguments); this._init() } var p = KISSY, t = p.Editor; if (!t.ProgressBar) {
        var y = p.Node; p.DOM.addStyleSheet(".ke-progressbar {border:1px solid #D6DEE6;position:relative;margin-left:auto;margin-right:auto;background-color: #EAEFF4;background: -webkit-gradient(linear, left top, left bottom, from(#EAEFF4), .to(#EBF0F3)); background: -moz-linear-gradient(top, #EAEFF4, #EBF0F3);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#EAEFF4', endColorstr = '#EBF0F3');}.ke-progressbar-inner {border:1px solid #3571B4;background-color:#6FA5DB;padding:1px;}.ke-progressbar-inner-bg {height:100%;background-color: #73B1E9;background: -webkit-gradient(linear, left top, left bottom, from(#73B1E9), .to(#3F81C8)); background: -moz-linear-gradient(top, #73B1E9, #3F81C8);filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#73B1E9', endColorstr = '#3F81C8');}.ke-progressbar-title {width:30px;top:0;left:40%;line-height:1.2;position:absolute;}", "ke_progressbar");
        r.ATTRS = { container: {}, width: {}, height: {}, progress: { value: 0} }; p.extend(r, p.Base, { destroy: function () { this.detach(); this.el._4e_remove() }, _init: function () {
            var v = this.get("height"), z = new y("<div class='ke-progressbar'  style='width:" + this.get("width") + ";height:" + v + ";'></div>"), u = this.get("container"); v = (new y("<div style='overflow:hidden;'><div class='ke-progressbar-inner' style='height:" + (parseInt(v) - 4) + "px'><div class='ke-progressbar-inner-bg'></div></div></div>")).appendTo(z); var k = (new y("<span class='ke-progressbar-title'>")).appendTo(z);
            u && z.appendTo(u); this.el = z; this._title = k; this._p = v; this.on("afterProgressChange", this._progressChange, this); this._progressChange({ newVal: this.get("progress") })
        }, _progressChange: function (v) { v = v.newVal; this._p.css("width", v + "%"); this._title.html(v + "%") } 
        }); t.ProgressBar = r
    } 
});
KISSY.Editor.add("removeformat", function (r) {
    function p(b) { this.editor = b; this._init() } function t(b, e) { for (var f = 0; f < e.length; f++) b.removeAttr(e[f]) } var y = KISSY.Editor, v = KISSY, z = y.RANGE, u = y.ElementPath, k = y.NODE, h = y.TripleButton, i = "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var,s", d = "class,style,lang,width,height,align,hspace,valign".split(","); i = RegExp("^(?:" + i.replace(/,/g, "|") + ")$", "i"); v.augment(p, { _init: function () {
        var b = this.editor; this.el = new h({ title: "\u6e05\u9664\u683c\u5f0f",
            contentCls: "ke-toolbar-removeformat", container: b.toolBarDiv
        }); this.el.on("offClick", this._remove, this); y.Utils.sourceDisable(b, this)
    }, disable: function () { this.el.set("state", h.DISABLED) }, enable: function () { this.el.set("state", h.OFF) }, _remove: function () {
        var b = this.editor, e = i; e.lastIndex = 0; var f = b.getSelection().getRanges(); b.fire("save"); for (var n = 0, g; g = f[n]; n++) if (!g.collapsed) {
            g.enlarge(z.ENLARGE_ELEMENT); var a = g.createBookmark(), c = a.startNode, o = a.endNode, m = function (A) {
                for (var q = new u(A), j = q.elements,
w = 1, s; s = j[w]; w++) { if (s._4e_equals(q.block) || s._4e_equals(q.blockLimit)) break; e.test(s._4e_name()) && A._4e_breakParent(s) } 
            }; m(c); m(o); for (c = c._4e_nextSourceNode(true, k.NODE_ELEMENT); c; ) { if (c._4e_equals(o)) break; m = c._4e_nextSourceNode(false, k.NODE_ELEMENT); c._4e_name() == "img" && c.attr("_cke_realelement") || (e.test(c._4e_name()) ? c._4e_remove(true) : t(c, d)); c = m } g.moveToBookmark(a)
        } b.getSelection().selectRanges(f); b.fire("save")
    } 
    }); r.addPlugin(function () { new p(r) })
});
KISSY.Editor.add("resize", function (r) {
    var p = KISSY, t = p.Editor, y = p.Node; t.Resizer || function () {
        function v(u) { this.editor = u; this._init() } var z = t.Draggable; p.augment(v, { _init: function () {
            var u = this.editor, k = u.statusDiv, h = new y("<div class='ke-resizer'></div>"), i = u.cfg.pluginConfig.resize || {}; i = i.direction || ["x", "y"]; h.appendTo(k); u.on("maximizeWindow", function () { h.css("display", "none") }); u.on("restoreWindow", function () { h.css("display", "") }); k = new z({ node: h }); var d = 0, b = 0, e = u.wrap, f = u.editorWrap; k.on("start",
function () { d = e.height(); b = f.width() }); k.on("move", function (n) { var g = n.pageX - this.startMousePos.left; n = n.pageY - this.startMousePos.top; p.inArray("y", i) && e.height(d + n); p.inArray("x", i) && f.width(b + g) })
        } 
        }); t.Resizer = v
    } (); r.addPlugin(function () { new t.Resizer(r) })
});
KISSY.Editor.add("select", function () {
    function r(k) { r.superclass.constructor.call(this, k); this._init() } var p = KISSY, t = p.Node, y = p.Event, v = p.DOM, z = p.Editor; if (!z.Select) {
        r.DISABLED = 0; r.ENABLED = 1; var u = z.XHTML_DTD; r.ATTRS = { showValue: {}, el: {}, cls: {}, container: {}, doc: {}, value: {}, width: {}, title: {}, items: {}, align: { value: ["l", "b"] }, menuContainer: { valueFn: function () { for (var k = this.el.parent(); k; ) { var h = k._4e_name(); if (u[h] && u[h].div) return k; k = k.parent() } return new t(document.body) } }, state: { value: 1} }; r.decorate =
function (k) { for (var h = k.width(), i = [], d = k.all("option"), b = 0; b < d.length; b++) { var e = d[b]; i.push({ name: v.html(e), value: v.attr(e, "value") }) } return new r({ width: h + "px", el: k, items: i, cls: "ke-combox", value: k.val() }) }; p.extend(r, p.Base, { _init: function () {
    var k = this.get("container"), h = this.get("el"), i = new t("<span class='ke-select-wrap'><a onclick='return false;' class='ke-select'><span class='ke-select-text'><span class='ke-select-text-inner'></span></span><span class='ke-select-drop-wrap'><span class='ke-select-drop'></span></span></a></span>"),
d = this.get("title") || "", b = this.get("cls"), e = i.one(".ke-select-text"), f = i.one(".ke-select-text-inner"); i.one(".ke-select-drop"); this.get("value") !== undefined ? f.html(this._findNameByV(this.get("value"))) : f.html(d); e.css("width", this.get("width")); i._4e_unselectable(); d && i.attr("title", d); b && i.addClass(b); if (h) h[0].parentNode.replaceChild(i[0], h[0]); else k && i.appendTo(k); i.on("click", this._click, this); this.el = i; this.title = f; this._focusA = i.one("a.ke-select"); z.Utils.lazyRun(this, "_prepare", "_real"); this.on("afterValueChange",
this._valueChange, this); this.on("afterStateChange", this._stateChange, this)
}, _findNameByV: function (k) { var h = this.get("title") || "", i = this.get("items"); if (this.get("showValue")) return k || h; for (var d = 0; d < i.length; d++) { var b = i[d]; if (b.value == k) { h = b.name; break } } return h }, _valueChange: function (k) { this.title.html(this._findNameByV(k.newVal)) }, _itemsChange: function (k) {
    k = k.newVal; var h = this._selectList; h.html(""); if (k) for (var i = 0; i < k.length; i++) {
        var d = k[i]; (new t("<a class='ke-select-menu-item' href='#' data-value='" +
d.value + "'>" + d.name + "</a>", d.attrs)).appendTo(h)._4e_unselectable()
    } this.as = h.all("a")
}, val: function (k) { if (k !== undefined) { this.set("value", k); return this } else return this.get("value") }, _resize: function () { this.menu.get("visible") && this._real() }, _prepare: function () {
    var k = this, h = k.el, i = k.get("popUpWidth"), d = k._focusA, b = new t("<div onmousedown='return false;'></div>"); b.appendTo(k.get("menuContainer")); var e = new z.SimpleOverlay({ el: b, cls: "ke-menu", width: i ? i : h.width(), zIndex: z.baseZIndex(z.zIndexManager.SELECT),
        focusMgr: false
    }); i = k.get("items"); k.menu = e; y.on(window, "resize", k._resize, k); k.get("title") && (new t("<div class='ke-menu-title ke-select-menu-item' style='margin-top:-6px;' >" + k.get("title") + "</div>")).appendTo(b); k._selectList = (new t("<div>")).appendTo(b); k._itemsChange({ newVal: i }); e.on("show", function () { d.addClass("ke-select-active") }); e.on("hide", function () { d.removeClass("ke-select-active") }); y.on([document, k.get("doc")], "click", function (f) { h._4e_contains(f.target) || e.hide() }); b.on("click", k._select,
k); k.as = k._selectList.all("a"); y.on(b[0], "mouseenter", function () { k.as.removeClass("ke-menu-selected") }); k.on("afterItemsChange", k._itemsChange, k)
}, _stateChange: function (k) { var h = this.el; k.newVal == 1 ? h.removeClass("ke-select-disabled") : h.addClass("ke-select-disabled") }, enable: function () { this.set("state", 1) }, disable: function () { this.set("state", 0) }, _select: function (k) {
    k.halt(); var h = this.menu, i = h.el; if (k = (new t(k.target))._4e_ascendant(function (e) { return i._4e_contains(e) && e._4e_name() == "a" }, true)) {
        var d =
this.get("value"), b = k.attr("data-value"); this.set("value", b); this.fire("click", { newVal: b, prevVal: d, name: k.html() }); h.hide()
    } 
}, _real: function () {
    var k = this.el, h = k.offset(), i = p.clone(h), d = this.menu.el.height(), b = this.menu.el.width(), e = v.scrollTop(), f = v.scrollLeft(), n = v.viewportHeight(), g = v.viewportWidth(); g = f + g - 60; n = e + n; var a = h.top + (k.height() - 2); k = h.left + k.width() - 2; var c = this.get("align"), o = c[0]; if (c[1] == "b") { h.top = a; if (h.top + d > n && i.top - e > n - a) h.top = i.top - d } else {
        h.top = i.top - d; if (h.top < e && i.top - e < n -
a) h.top = a
    } if (o == "l") { if (h.left + b > g && k - f > g - i.left) h.left = k - b } else { h.left = k - b; if (h.left < f && k - f < g - i.left) h.left = i.left } this.menu.show(h)
}, _click: function (k) { k.preventDefault(); k = this.el; var h = this.get("value"); if (!k.hasClass("ke-select-disabled")) if (this._focusA.hasClass("ke-select-active")) this.menu.hide(); else { this._prepare(); h && this.menu && this.as.each(function (i) { i.attr("data-value") == h ? i.addClass("ke-menu-selected") : i.removeClass("ke-menu-selected") }) } } 
}); z.Select = r
    } 
});
KISSY.Editor.add("separator", function (r) { r.addPlugin(function () { (new KISSY.Node('<span class="ke-toolbar-separator">&nbsp;</span>')).appendTo(r.toolBarDiv) }) });
KISSY.Editor.add("smiley", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.DOM, v = t.Event, z = t.Node, u = p.SimpleOverlay, k = p.TripleButton; p.Smiley || function () {
        function h(b) { this.editor = b; this._init() } y.addStyleSheet('.ke-smiley-sprite { background: url("http://a.tbcdn.cn/sys/wangwang/smiley/sprite.png") no-repeat scroll -1px 0 transparent; height: 235px; width: 288px; margin: 5px;zoom: 1; overflow: hidden;}.ke-smiley-sprite a {   width: 24px;height: 24px; border: 1px solid white; float: left;}.ke-smiley-sprite a:hover { border: 1px solid #808080;}', "smiley");
        for (var i = "<div class='ke-smiley-sprite'>", d = 0; d <= 98; d++) i += "<a href='#' data-icon='http://a.tbcdn.cn/sys/wangwang/smiley/48x48/" + d + ".gif'></a>"; i += "</div>"; t.augment(h, { _init: function () { var b = this.editor; this.el = new k({ contentCls: "ke-toolbar-smiley", title: "\u63d2\u5165\u8868\u60c5", container: b.toolBarDiv }); this.el.on("offClick", this._show, this); p.Utils.lazyRun(this, "_prepare", "_real"); p.Utils.sourceDisable(b, this) }, disable: function () { this.el.set("state", k.DISABLED) }, enable: function () { this.el.set("state", k.OFF) }, _hidePanel: function (b) {
            var e =
this.el.el; b = b.target; var f = this.smileyWin; e._4e_equals(b) || e._4e_contains(b) || f.hide()
        }, _selectSmiley: function (b) { b.halt(); var e = this.editor; b = b.target; var f; if (y._4e_name(b) == "a" && (f = y.attr(b, "data-icon"))) { f = new z("<img class='ke_smiley'alt='' src='" + f + "'/>", null, e.document); e.insertElement(f); this.smileyWin.hide() } }, _prepare: function () {
            var b = this.editor; this.smileyPanel = new z(i); this.smileyWin = new u({ el: this.smileyPanel, width: "297px", zIndex: b.baseZIndex(p.zIndexManager.POPUP_MENU), focusMgr: false,
                mask: false
            }); this.smileyPanel.on("click", this._selectSmiley, this); v.on(document, "click", this._hidePanel, this); v.on(b.document, "click", this._hidePanel, this)
        }, _real: function () { var b = this.el.el.offset(); b.top += this.el.el.height() + 5; if (b.left + this.smileyPanel.width() > y.viewportWidth() - 60) b.left = y.viewportWidth() - this.smileyPanel.width() - 60; this.smileyWin.show(b) }, _show: function (b) { var e = this.smileyWin; e && e.get("visible") ? e.hide() : this._prepare(b) } 
        }); p.Smiley = h
    } (); r.addPlugin(function () { new p.Smiley(r) })
});
KISSY.Editor.add("sourcearea", function (r) {
    var p = KISSY.Editor, t = KISSY, y = p.TripleButton; if (!(t.UA.gecko < 1.92)) {
        p.SourceArea || function () {
            function v(k) { this.editor = k; this._init() } var z = p.SOURCE_MODE, u = p.WYSIWYG_MODE; t.augment(v, { _init: function () { var k = this.editor; var h = this.el = new y({ container: k.toolBarDiv, title: "\u6e90\u7801", contentCls: "ke-toolbar-source" }); h.on("offClick", this._show, this); h.on("onClick", this._hide, this); k.on("sourcemode", function () { h.bon() }); k.on("wysiwygmode", function () { h.boff() }) }, _show: function () {
                this.editor.execCommand("sourceAreaSupport",
z); this.el.bon()
            }, _hide: function () { var k = this.el; this.editor.execCommand("sourceAreaSupport", u); k.boff() } 
            }); p.SourceArea = v
        } (); r.addPlugin(function () { new p.SourceArea(r) })
    } 
});
KISSY.Editor.add("sourcearea/support", function (r) {
    var p = KISSY, t = p.Editor, y = p.UA; t.SourceAreaSupport || function () {
        function v() { var k = this.mapper = {}; k[z] = this._show; k[u] = this._hide } var z = t.SOURCE_MODE, u = t.WYSIWYG_MODE; p.augment(v, { exec: function (k, h) { var i = this.mapper; i[h] && i[h].call(this, k) }, _show: function (k) { k.textarea.val(k.getData(true)); this._showSource(k); k.fire("sourcemode") }, _showSource: function (k) {
            var h = k.textarea, i = k.iframe; h.css("display", ""); i.css("display", "none"); y.ie < 8 && h.css("height",
k.wrap.css("height")); h[0].focus()
        }, _hideSource: function (k) { var h = k.textarea; k.iframe.css("display", ""); h.css("display", "none") }, _hide: function (k) { var h = k.textarea; this._hideSource(k); k.fire("save"); k.setData(h.val()); k.fire("wysiwygmode"); k.fire("save"); y.gecko && k.activateGecko() } 
        }); t.SourceAreaSupport = new v
    } (); r.addPlugin(function () { r.addCommand("sourceAreaSupport", t.SourceAreaSupport) })
});
KISSY.Editor.add("table", function (r, p) {
    var t = KISSY, y = t.Editor, v = t.Node, z = y.Walker, u = t.UA, k = y.NODE, h = y.TripleButton, i = y.ContextMenu, d = ["tr", "th", "td", "tbody", "table"], b = t.trim, e; e = (u.ie === 6 ? ["table.%2,", "table.%2 td, table.%2 th,", "{", "border : #d3d3d3 1px dotted", "}"] : [" table.%2,", " table.%2 > tr > td,  table.%2 > tr > th,", " table.%2 > tbody > tr > td,  table.%2 > tbody > tr > th,", " table.%2 > thead > tr > td,  table.%2 > thead > tr > th,", " table.%2 > tfoot > tr > td,  table.%2 > tfoot > tr > th",
"{", "border : #d3d3d3 1px dotted", "}"]).join("").replace(/%2/g, "ke_show_border"); var f = r.htmlDataProcessor, n = f && f.dataFilter; f = f && f.htmlFilter; n && n.addRules({ elements: { table: function (g) { g = g.attributes; var a = g["class"], c = parseInt(g.border, 10); if (!c || c <= 0) g["class"] = (a || "") + " ke_show_border" } } }); f && f.addRules({ elements: { table: function (g) { g = g.attributes; var a = g["class"]; if (a) g["class"] = b(a.replace("ke_show_border", "").replace(/\s{2}/, " ")) } } }); y.TableUI || function () {
    function g(s) {
        this.editor = s; s._toolbars =
s._toolbars || {}; s._toolbars.table = this; this._init()
    } function a(s) {
        function B(N) { if (!(C.length > 0)) if (N[0].nodeType == k.NODE_ELEMENT && j.test(N._4e_name()) && !N._4e_getData("selected_cell")) { N._4e_setMarker(E, "selected_cell", true); C.push(N) } } for (var l = s.createBookmarks(), x = s.getRanges(), C = [], E = {}, D = 0; D < x.length; D++) {
            var F = x[D]; if (F.collapsed) { F = F.getCommonAncestor(); (F = F._4e_ascendant("td", true) || F._4e_ascendant("th", true)) && C.push(F) } else {
                F = new z(F); var L; for (F.guard = B; L = F.next(); ) if ((L = L.parent()) &&
j.test(L._4e_name()) && !L._4e_getData("selected_cell")) { L._4e_setMarker(E, "selected_cell", true); C.push(L) } 
            } 
        } y.Utils.clearAllMarkers(E); s.selectBookmarks(l); return C
    } function c(s, B) { var l = s.getStartElement()._4e_ascendant("tr"); if (l) { var x = l._4e_clone(true); x.insertBefore(l); l = (B ? x[0] : l[0]).cells; for (x = 0; x < l.length; x++) { l[x].innerHTML = ""; u.ie || (new v(l[x]))._4e_appendBogus() } } } function o(s) {
        if (s instanceof y.Selection) {
            var B = a(s), l = B.length; s = []; for (var x, C, E = 0; E < l; E++) {
                var D = B[E].parent(), F = D[0].rowIndex;
                !E && (x = F - 1); s[F] = D; E == l - 1 && (C = F + 1)
            } E = D._4e_ascendant("table"); x = new v(C < E[0].rows.length && E[0].rows[C] || x > 0 && E[0].rows[x] || E[0].parentNode); for (E = s.length; E >= 0; E--) s[E] && o(s[E]); return x
        } else if (s instanceof v) { E = s._4e_ascendant("table"); E[0].rows.length == 1 ? E._4e_remove() : s._4e_remove() } return 0
    } function m(s, B) {
        var l = s.getStartElement(); if (l = l._4e_ascendant("td", true) || l._4e_ascendant("th", true)) for (var x = l._4e_ascendant("table"), C = l[0].cellIndex, E = 0; E < x[0].rows.length; E++) {
            var D = x[0].rows[E]; if (!(D.cells.length <
C + 1)) { l = new v(D.cells[C].cloneNode(false)); u.ie || l._4e_appendBogus(); D = new v(D.cells[C]); B ? l.insertBefore(D) : l.insertAfter(D) } 
        } 
    } function A(s) {
        if (s instanceof y.Selection) {
            var B = a(s), l, x = []; s = B[0] && B[0]._4e_ascendant("table"); var C, E, D; C = 0; for (E = B.length; C < E; C++) x.push(B[C][0].cellIndex); x.sort(); C = 1; for (E = x.length; C < E; C++) if (x[C] - x[C - 1] > 1) { D = x[C - 1] + 1; break } D || (D = x[0] > 0 ? x[0] - 1 : x[x.length - 1] + 1); x = s[0].rows; C = 0; for (E = x.length; C < E; C++) if (l = x[C].cells[D]) break; l = l ? new v(l) : s._4e_previous(); for (D = B.length -
1; D >= 0; D--) B[D] && A(B[D]); return l
        } else if (s instanceof v) { B = s._4e_ascendant("table"); if (!B) return null; l = s[0].cellIndex; for (D = B[0].rows.length - 1; D >= 0; D--) { s = new v(B[0].rows[D]); if (!l && s[0].cells.length == 1) o(s); else s[0].cells[l] && s[0].removeChild(s[0].cells[l]) } } return null
    } function q(s, B) { var l = new y.Range(s[0].ownerDocument); if (!l.moveToElementEditablePosition(s, B ? true : p)) { l.selectNodeContents(s); l.collapse(B ? false : true) } l.select(true) } g.showBorderClassName = "ke_show_border"; t.augment(g, { _init: function () {
        var s =
this.editor, B = {}; this.el = new h({ contentCls: "ke-toolbar-table", title: "\u63d2\u5165\u8868\u683c", container: s.toolBarDiv }); this.el.on("offClick", this._tableShow, this); for (var l in w) (function (x) { B[x] = function () { s.fire("save"); w[x](s); s.fire("save") } })(l); i.register({ editor: s, rules: d, width: "120px", funcs: B }); y.Utils.sourceDisable(s, this)
    }, disable: function () { this.el.disable() }, enable: function () { this.el.enable() }, _tableShow: function (s, B, l) { this.editor.useDialog("table/dialog", function (x) { x.show(B, l) }) } 
    }); var j = /^(?:td|th)$/,
w = { "\u8868\u683c\u5c5e\u6027": function (s) { var B = s.getSelection(), l = B && B.getStartElement(); if (B = l && l._4e_ascendant("table", true)) { s = s._toolbars.table; l = l._4e_ascendant(function (x) { x = x._4e_name(); return x == "td" || x == "th" }, true); s._tableShow(null, B, l) } }, "\u5220\u9664\u8868\u683c": function (s) {
    var B = (s = s.getSelection()) && s.getStartElement(); if (B = B && B._4e_ascendant("table", true)) {
        s.selectElement(B); var l = s.getRanges()[0]; l.collapse(); s.selectRanges([l]); s = B.parent(); s[0].childNodes.length == 1 && s._4e_name() != "body" && s._4e_name() != "td" ? s._4e_remove() :
B._4e_remove()
    } 
}, "\u5220\u9664\u884c ": function (s) { s = s.getSelection(); q(o(s), p) }, "\u5220\u9664\u5217 ": function (s) { s = s.getSelection(); (s = A(s)) && q(s, true) }, "\u5728\u4e0a\u65b9\u63d2\u5165\u884c": function (s) { s = s.getSelection(); c(s, true) }, "\u5728\u4e0b\u65b9\u63d2\u5165\u884c": function (s) { s = s.getSelection(); c(s, p) }, "\u5728\u5de6\u4fa7\u63d2\u5165\u5217": function (s) { s = s.getSelection(); m(s, true) }, "\u5728\u53f3\u4fa7\u63d2\u5165\u5217": function (s) { s = s.getSelection(); m(s, p) } 
}; y.TableUI = g
} (); r.addPlugin(function () { new y.TableUI(r); r.addCustomStyle(e) })
});
KISSY.Editor.add("tabs", function () {
    function r(z) { this.cfg = z; this._init() } var p = KISSY, t = p.Editor, y = p.DOM, v = p.Node; if (!t.Tabs) {
        p.augment(r, p.EventTarget, { _init: function () { var z = this, u = z.cfg, k = u.tabs, h = u.contents.children("div"), i = k.children("li"); k.on("click", function (d) { d = new v(d.target); if (d = d._4e_ascendant(function (e) { return e._4e_name() === "li" && k._4e_contains(e) }, true)) { i.removeClass("ke-tab-selected"); var b = d.attr("rel"); d.addClass("ke-tab-selected"); h.hide(); y.show(h[p.indexOf(d[0], i)]); z.fire(b) } }) },
            getTab: function (z) { var u = this.cfg, k = u.tabs; u = u.contents.children("div"); k = k.children("li"); for (var h = 0; h < k.length; h++) { var i = new v(k[h]), d = new v(u[h]); if (p.isNumber(z) && z == h || p.isString(z) && z == i.attr("rel")) return { tab: i, content: d} } }, remove: function (z) { z = this.getTab(z); z.tab.remove(); z.content.remove() }, _getActivate: function () { var z = this.cfg, u = z.tabs; z.contents.children("div"); z = u.children("li"); for (u = 0; u < z.length; u++) { var k = new v(z[u]); if (k.hasClass("ke-tab-selected")) return k.attr("rel") } }, activate: function (z) {
                if (arguments.length ==
0) return this._getActivate(); var u = this.cfg, k = u.tabs; u = u.contents.children("div"); k.children("li").removeClass("ke-tab-selected"); u.hide(); k = this.getTab(z); k.tab.addClass("ke-tab-selected"); k.content.show()
            } 
        }); t.Tabs = r
    } 
});
KISSY.Editor.add("templates", function (r) {
    var p = KISSY.Editor, t = KISSY, y = t.Node, v = t.DOM, z = p.TripleButton, u = p.SimpleOverlay; p.TplUI || function () {
        function k(h) { this.editor = h; this._init() } v.addStyleSheet(".ke-tpl {    border: 2px solid #EEEEEE;    width: 95%;    margin: 20px auto 0 auto;}.ke-tpl-list {    border: 1px solid #EEEEEE;    margin: 5px;    padding: 7px;    display: block;    text-decoration: none;    zoom: 1;}.ke-tpl-list:hover, .ke-tpl-selected {    background-color: #FFFACD;    text-decoration: none;    border: 1px solid #FF9933;}", "ke-templates");
        t.augment(k, { _init: function () { var h = this.editor, i = new z({ container: h.toolBarDiv, contentCls: "ke-toolbar-template", title: "\u6a21\u677f" }); i.on("offClick", this._show, this); p.Utils.lazyRun(this, "_prepare", "_real"); this.el = i; p.Utils.sourceDisable(h, this) }, disable: function () { this.el.set("state", z.DISABLED) }, enable: function () { this.el.set("state", z.OFF) }, _prepare: function () {
            for (var h = this.editor, i = h.cfg.pluginConfig.templates || [], d = "<div class='ke-tpl'>", b = 0; b < i.length; b++) d += "<a href='javascript:void(0)' class='ke-tpl-list' tabIndex='-1'>" +
i[b].demo + "</a>"; d += "</div>"; this._initDialogOk = true; var e = new u({ mask: true, title: "\u5185\u5bb9\u6a21\u677f" }); e.body.html(d); e.body.all(".ke-tpl-list").on("click", function (f) { f.halt(); f = (new y(f.target))._4e_index(); f != -1 && h.insertHtml(i[f].html); e.hide() }); this.ui = e
        }, _real: function () { this.ui.show() }, _show: function () { this._prepare() } 
        }); p.TplUI = k
    } (); r.addPlugin(function () { new p.TplUI(r) })
});
KISSY.Editor.add("undo", function (r) {
    var p = KISSY, t = p.Editor, y = t.Utils.arrayCompare, v = p.UA, z = p.Event; t.UndoManager || function () {
        function u(f) { var n = f._getRawData(); f = n && f.getSelection(); this.contents = n; this.bookmarks = f && f.createBookmarks2(true) } function k(f) { this.history = []; this.index = -1; this.editor = f; this.bufferRunner = t.Utils.buffer(this.save, this, 500); this._init() } function h(f, n, g, a) { this.editor = f; this.title = g; this.text = n; this.contentCls = a; this._init() } p.augment(u, { equals: function (f) {
            if (this.contents !=
f.contents) return false; var n = this.bookmarks; f = f.bookmarks; if (n || f) { if (!n || !f || n.length != f.length) return false; for (var g = 0; g < n.length; g++) { var a = n[g], c = f[g]; if (a.startOffset != c.startOffset || a.endOffset != c.endOffset || !y(a.start, c.start) || !y(a.end, c.end)) return false } } return true
        } 
        }); var i = { 16: 1, 17: 1, 18: 1 }, d = { 37: 1, 38: 1, 39: 1, 40: 1, 33: 1, 34: 1 }; p.augment(k, { _keyMonitor: function () {
            var f = this.editor; z.on([f.document, f.textarea], "keydown", function (n) {
                var g = n.keyCode; if (!(g in d || g in i)) if (g === 90 && (n.ctrlKey ||
n.metaKey)) { f.fire("restore", { d: -1 }); n.halt() } else if (g === 89 && (n.ctrlKey || n.metaKey)) { f.fire("restore", { d: 1 }); n.halt() } else f.fire("save", { buffer: 1 })
            })
        }, _init: function () { var f = this, n = f.editor; n.on("save", function (g) { if (n.getMode() == t.WYSIWYG_MODE) g.buffer ? f.bufferRunner() : f.save() }); n.on("restore", function (g) { n.getMode() == t.WYSIWYG_MODE && f.restore(g) }); f._keyMonitor() }, save: function () {
            var f = this.history, n = this.index; f.length > n + 1 && f.splice(n + 1, f.length - n - 1); var g = this.editor; n = f[f.length - 1]; var a =
new u(g); if (!n || !n.equals(a)) { f.length === 30 && f.shift(); f.push(a); this.index = n = f.length - 1; g.fire("afterSave", { history: f, index: n }) } 
        }, restore: function (f) { f = f.d; var n = this.history, g = this.editor, a = n[this.index + f]; if (a) { g._setRawData(a.contents); if (a.bookmarks) g.getSelection().selectBookmarks(a.bookmarks); else if (v.ie) { a = g.document.body.createTextRange(); a.collapse(true); a.select() } (a = g.getSelection()) && a.scrollIntoView(); this.index += f; g.fire("afterRestore", { history: n, index: this.index }); g.notifySelectionChange() } } 
        });
        var b = t.TripleButton, e = { redo: 1, undo: -1 }; p.augment(h, { _init: function () { var f = this, n = f.editor; f.el = new b({ contentCls: f.contentCls, title: f.title, container: n.toolBarDiv }); var g = f.el; g.set("state", b.DISABLED); n.on("afterSave afterRestore", f._respond, f); g.on("offClick", function () { n.fire("restore", { d: e[f.text] }) }); t.Utils.sourceDisable(n, f) }, disable: function () { this._saveState = this.el.get("state"); this.el.set("state", b.DISABLED) }, enable: function () { this.el.set("state", this._saveState) }, _respond: function (f) {
            this.updateUI(f.history,
f.index)
        }, updateUI: function (f, n) { var g = this.el, a = this.text; if (a == "undo") n > 0 ? g.set("state", b.OFF) : g.set("state", b.DISABLED); else if (a == "redo") n < f.length - 1 ? g.set("state", b.OFF) : g.set("state", b.DISABLED) } 
        }); t.UndoManager = k; t.RestoreUI = h
    } (); r.addPlugin(function () { new t.UndoManager(r); new t.RestoreUI(r, "undo", "\u64a4\u9500", "ke-toolbar-undo"); new t.RestoreUI(r, "redo", "\u91cd\u505a", "ke-toolbar-redo") })
});
