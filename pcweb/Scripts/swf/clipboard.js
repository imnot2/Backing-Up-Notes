/*=======================clipboard.js===========================*/
Ymt.add("swf.Clipboard", 
function(g) {
    var b = {},
    h = 0;
    return {
        addCopyButton: function(a) {
            var i = a.swfContainerId,
            c = a.dateSource,
            j = a.btnImgURL,
            d = a.btnWidth,
            e = a.btnHeight,
            k = a.isDebug;
            a = a.callBack || 
            function() {};
            var f = "btn" + h++;
            b[f] = {
                dateSource: c,
                callBack: a
            };
            d = d || "100%";
            e = e || "100%";
            c = {
                content: "",
                uri: j,
                btnName: f,
                isDebug: ( !! k).toString()
            };
            Ymt.swf.SwfObject.embedSWF(g.Config.base + "swf/clipboard.swf", i, d, e, "10.0.0", null, c, {
                wmode: "transparent",
                allowScriptAccess: "always"
            })
        },
        copyContent: function(a) {
            a = b[a];
            return a.dateSource.value || a.dateSource.innerHTML || a.dateSource
        },
        callBack: function(a) {
            b[a].callBack()
        }
    }
});

