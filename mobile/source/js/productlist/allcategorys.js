define(function (require, exports, module) {

    require('search/index');
    //浮动工具条
    var toobar=require("component/floattoolbar");

    toobar({
        type:0
    });

    var hds = $m.node('.mod-collapsible .hd').items;
    $m.event.bind(hds, 'click', function (e) {
        console.log(11)
        var style, fn1, fn2;
        for (var i = 0, len = hds.length; i < len; i++) {
            style = $m.node.next(hds[i]).style;
            if (hds[i] == e.currentTarget) {
                style.display = style.display == "block" ? "none" : "block";
                if ($(this).find(".icon-arrow").hasClass("icon-arrow-down")) {
                    fn1 = "removeClass";
                    fn2 = "addClass";
                } else {
                    fn2 = "removeClass";
                    fn1 = "addClass";
                }
                $(this).find(".icon-arrow")[fn1]("icon-arrow-down")[fn2]("icon-arrow-up");
            } else {
                style.display = "none";
                $(hds[i]).find(".icon-arrow")["removeClass"]("icon-arrow-down")["addClass"]("icon-arrow-up");
            }
        }
    });
    $m.node('.SecondList dd').bind('click', function () {        
        $m.node.toggleClass($m.node('.threemenu', this)[0], 'show', 'none')
    })
    $m.node('.threemenu .tm').bind('click', function () {
        //美容护肤男士护理
        exports.selectedCategory = this.innerHTML;
    })
})