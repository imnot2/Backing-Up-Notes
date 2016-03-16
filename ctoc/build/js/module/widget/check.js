Ymt.add(function() {
    function e(a, b, d) {
        var g = this;
        if (! (g instanceof e)) return new e(a, b, $m.merge(i, d));
        a = $(a);
        b = $(b);
        var c = 0,
        h;
        a.click(function() {
            if (this.checked) c++;
            else c--;
            c == a.length ? b.attr("checked", true) : b.attr("checked", false);
            h = this;
            d.callback && d.callback.call(g, h)
        });
        b.click(function() {
            if (this.checked) {
                a.attr("checked", true);
                c = a.length
            } else {
                a.attr("checked", false);
                c = 0
            }
        });
        $(d.allcheck).click(function() {
            a.attr("checked", true);
            b.attr("checked", true);
            c = a.length
        });
        $(d.notallcheck).click(function() {
            a.attr("checked", 
            false);
            b.attr("checked", false);
            $(d.Inverse).attr("checked", false);
            c = 0
        });
        $(d.Inverse).click(function() {
            a.each(function() {
                $(this).attr("checked", this.checked ? false: true);
                if (this.checked) c++;
                else c--;
                c == a.length ? b.attr("checked", true) : b.attr("checked", false)
            })
        })
    }
    var i = {
        notallcheck: null,
        Inverse: null,
        allcheck: null,
        callback: null
    };
    $m.namespace("widget").Check = e
});
