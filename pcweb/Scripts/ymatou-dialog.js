/*=======================ymatou-dialog.js===========================*/
var AttentionDialog = function (div, pad, sub, error) {
    ///弹出窗口
    var $Dialog = j$(div);
    var $DialogShadow = j$(div + "Shadow");
    var top = (document.documentElement.clientHeight - $Dialog.height() - 20) / 2;
    var left = (document.documentElement.clientWidth - $Dialog.width() - 20) / 2;
    $Dialog.css({ 'top': top, 'left': left }).show();
    $DialogShadow.css({ 'top': top, 'left': left, 'height': $Dialog.height(), 'width': $Dialog.width() }).show();

    j$("iframe", $Dialog).css({ "width": "100%", "height": "100%" });
    $Dialog.bgiframe();
    $DialogShadow.bgiframe();

    var closeFn = function () {
        $Dialog.hide();
        $DialogShadow.hide();
        if (pad != null) {
            $Pad.hide();
        }
    };
    j$(".Close", $Dialog).click(function () {
        closeFn();
        return false;
    });

    if (pad != null) {
        var $Pad = j$(pad);
        $Pad.show();
        $Pad.bgiframe();
    }
    if (sub != null) {
        j$(sub, $Dialog).click(function () {
            if (error != null) {
                if (j$(error).validationEngine({ returnIsValid: true })) {
                    closeFn();
                } else {
                    alert("请按要求填写！");
                }
            } else {
                closeFn();
            }
        });
    }
};
var AlertDialog = function (txt) {
    j$("#LoadingDialog h5").text(txt);
    AttentionDialog("#LoadingDialog", "#PadA");
};
var CheckDialog = function (txt, fun) {
    j$("#txtCheck").text(txt);
    AttentionDialog("#CheckDialog", "#PadA");
    j$("#btncheckok").one("click", function () {
        fun();
        return false;
    });
};
//var alert = function (txt) {
//j$("#txtAlert").text(txt);
//  AttentionDialog("#AlertDialog", "#PadA");
//}
var ConvertJson = function (m) {
    var json = m.d;
    var value = eval("(" + json + ")");
    return value;
};

