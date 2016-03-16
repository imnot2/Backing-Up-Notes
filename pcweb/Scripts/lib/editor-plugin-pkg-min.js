/*=======================editor-plugin-pkg-min.js===========================*/
KISSY.Editor.add("bangpai-music", function (k) {
    var g = KISSY, h = g.UA, l = g.Event, d = g.Editor, m = g.DOM, j = d.Flash, i = "ke_xiami", n = k.htmlDataProcessor, b = n && n.dataFilter; b && b.addRules({ elements: { object: function (a) {
        var e = a.attributes, o = a.attributes.title, c; if (!(e.classid && String(e.classid).toLowerCase())) { for (e = 0; e < a.children.length; e++) { c = a.children[e]; if (c.name == "embed") { if (!j.isFlashEmbed(c)) break; if (/xiami\.com/i.test(c.attributes.src)) return n.createFakeParserElement(a, i, "bangpai-music", true, { title: o }) } } return null } for (e =
0; e < a.children.length; e++) { c = a.children[e]; if (c.name == "param" && c.attributes.name == "movie") if (/xiami\.com/i.test(c.attributes.value)) return n.createFakeParserElement(a, i, "bangpai-music", true, { title: o }) } 
    }, embed: function (a) { if (!j.isFlashEmbed(a)) return null; if (/xiami\.com/i.test(a.attributes.src)) return n.createFakeParserElement(a, i, "bangpai-music", true, { title: a.attributes.title }) } 
    }
    }, 4); d.BangPaiMusic || function () {
        function a(c) {
            a.superclass.constructor.apply(this, arguments); c.cfg.disableObjectResizing ||
l.on(c.document.body, h.ie ? "resizestart" : "resize", function (f) { m.hasClass(f.target, i) && f.preventDefault() })
        } function e(c) { return c._4e_name() === "img" && !!c.hasClass(i) && c } g.extend(a, j, { _config: function () { this._cls = i; this._type = "bangpai-music"; this._contentCls = "ke-toolbar-music"; this._tip = "\u63d2\u5165\u867e\u7c73\u97f3\u4e50"; this._contextMenu = o; this._flashRules = ["img." + i] }, _updateTip: function (c, f) { var p = this.editor.restoreRealElement(f); if (p) { c.html(f.attr("title")); c.attr("href", this._getFlashUrl(p)) } } }); var o = { "\u867e\u7c73\u5c5e\u6027": function (c) {
            var f =
c.getSelection(); f = f && f.getStartElement(); f = e(f); c = c._toolbars["bangpai-music"]; f && c.show(null, f)
        } 
        }; j.registerBubble("bangpai-music", "\u867e\u7c73\u97f3\u4e50\uff1a ", e); d.BangPaiMusic = a; d.add({ "bangpai-music/dialog": { attach: false, charset: "utf-8", requires: ["flash/dialog"], path: d.Utils.debugUrl("biz/bangpai/plugins/music/dialog/plugin.js")} })
    } (); k.addPlugin(function () { new d.BangPaiMusic(k) })
}, { attach: false, requires: ["flash/support"] });
KISSY.Editor.add("bangpai-sourcearea", function (k) {
    var g = KISSY.Editor, h = KISSY, l = h.Node; if (!(h.UA.gecko < 1.92)) {
        g.BangPaiSourceArea || function () {
            function d(i) { this.editor = i; this._init() } var m = g.SOURCE_MODE, j = g.WYSIWYG_MODE; h.augment(d, { _init: function () {
                var i = this.editor, n = i.statusDiv, b = this.el = (new l("<span style='zoom:1;display:inline-block;height:22px;line-height:22px;'><input style='margin:0 5px;vertical-align:middle;' type='checkbox' /><span style='vertical-align:middle;'>\u7f16\u8f91\u6e90\u4ee3\u7801</span></span>")).appendTo(n).one("input");
                b.on("click", this._check, this); i.on("sourcemode", function () { b[0].checked = true }); i.on("wysiwygmode", function () { b[0].checked = false })
            }, _check: function () { this.el[0].checked ? this._show() : this._hide() }, _show: function () { this.editor.execCommand("sourceAreaSupport", m) }, _hide: function () { this.editor.execCommand("sourceAreaSupport", j) } 
            }); g.BangPaiSourceArea = d
        } (); k.addPlugin(function () { new g.BangPaiSourceArea(k) })
    } 
}, { attach: false, requires: ["sourcearea/support"] });
KISSY.Editor.add("bangpai-upload", function (k) {
    var g = KISSY, h = g.Editor; h.BangPaiUpload || function () {
        function l(d) { this.editor = d; this._init() } g.augment(l, g.EventTarget, { _init: function () { var d = this, m = d.editor, j = new h.TripleButton({ contentCls: "ke-toolbar-mul-image", title: "\u6279\u91cf\u63d2\u56fe", container: m.toolBarDiv }); j.on("offClick", d.show, d); d.el = j; h.Utils.sourceDisable(m, d); d.disable(); h.storeReady(function () { d.enable() }) }, disable: function () { this.el.disable() }, enable: function () { this.el.boff() }, show: function () {
            this.editor.useDialog("bangpai-upload/dialog",
function (d) { d.show() })
        } 
        }); h.add({ "bangpai-upload/dialog": { attach: false, charset: "utf-8", requires: ["flashutils", "progressbar", "flashbridge", "overlay"], path: h.Utils.debugUrl("biz/bangpai/plugins/upload/dialog/plugin.js")} }); h.BangPaiUpload = l
    } (); k.addPlugin(function () { new h.BangPaiUpload(k) })
}, { attach: false, requires: ["localStorage", "button"] });
KISSY.Editor.add("bangpai-video", function (k) {
    function g(b) { for (var a = 0; a < n.length; a++) { var e = n[a]; if (e.reg.test(b)) return e } } var h = KISSY, l = h.Editor, d = "ke_video", m = l.Flash, j = k.htmlDataProcessor, i = j && j.dataFilter, n = [{ reg: /youku\.com/i, width: 480, height: 400, detect: function (b) { var a = b.match(/id_([^.]+)\.html$/); if (a) return "http://player.youku.com/player.php/sid/" + a[1] + "/v.swf"; a = b.match(/v_playlist\/([^.]+)\.html$/); if (!a) return b } }, { reg: /tudou\.com/i, width: 480, height: 400, detect: function (b) { return b } },
{ reg: /ku6\.com/i, width: 480, height: 400, detect: function (b) { var a = b.match(/show[^\/]*\/([^.]+)\.html$/); if (a) return "http://player.ku6.com/refer/" + a[1] + "/v.swf"; return b } }]; i && i.addRules({ elements: { object: function (b) {
    var a = b.attributes; if (!(a.classid && String(a.classid).toLowerCase())) { for (a = 0; a < b.children.length; a++) if (b.children[a].name == "embed") { if (!m.isFlashEmbed(b.children[a])) break; if (g(b.children[a].attributes.src)) return j.createFakeParserElement(b, d, "bangpai-video", true) } return null } for (a = 0; a <
b.children.length; a++) { var e = b.children[a]; if (e.name == "param" && e.attributes.name == "movie") if (g(e.attributes.value)) return j.createFakeParserElement(b, d, "bangpai-video", true) } 
}, embed: function (b) { if (!m.isFlashEmbed(b)) return null; if (g(b.attributes.src)) return j.createFakeParserElement(b, d, "bangpai-video", true) } 
}
}, 4); l.BangPaiVideo || function () {
    function b() { b.superclass.constructor.apply(this, arguments) } function a(c) { return c._4e_name() === "img" && !!c.hasClass(d) && c } var e = ["img." + d]; b.getProvider = g; h.extend(b,
m, { _config: function () { this._cls = d; this._type = "bangpai-video"; this._contentCls = "ke-toolbar-video"; this._tip = "\u63d2\u5165\u89c6\u9891"; this._contextMenu = o; this._flashRules = e } }); m.registerBubble("bangpai-video", "\u89c6\u9891\u94fe\u63a5\uff1a ", a); l.BangPaiVideo = b; var o = { "\u89c6\u9891\u5c5e\u6027": function (c) { var f = c.getSelection(); f = (f = f && f.getStartElement()) && a(f); c = c._toolbars["bangpai-video"]; f && c.show(null, f) } }; l.add({ "bangpai-video/dialog": { attach: false, charset: "utf-8", requires: ["flash/dialog"], path: l.Utils.debugUrl("biz/bangpai/plugins/video/dialog/plugin.js")} })
} ();
    k.addPlugin(function () { new l.BangPaiVideo(k) })
}, { attach: false, requires: ["flash/support"] });
