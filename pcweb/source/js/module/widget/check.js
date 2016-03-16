define(function (require, exports, module) {
    function Check(checkbox, options) {
        var me = this;
        if (!(me instanceof Check)) return new Check(checkbox, $m.merge(config, options));

        checkbox = $(checkbox);

        var c = 0,
            h;

        //单选
        checkbox.click(function () {
            if (this.checked) {
                c++
            } else {
                c--
            }
        });

        //全选
        $(options.allcheck).click(function () {
            var index = 0;
            if (!$(this).attr('selected')) {
                checkbox.each(function () {
                    if (!$(this).attr('disabled')) {
                        $(this).attr("checked", true);
                        index++
                    }
                });
                $(this).html('全取消')
                $(this).attr('selected', '1')
            } else {
                checkbox.each(function () {
                    if (!$(this).attr('disabled')) {
                        $(this).attr("checked", false);
                    }
                });
                $(this).html('全选')
                $(this).removeAttr('selected');
            }

            c = index;
        });

        //取消选择
        $(options.notallcheck).click(function () {
            var index = 0;
            checkbox.each(function () {
                if (!$(this).attr('disabled')) {
                    $(this).attr("checked", false);
                    index++
                }
            });
            $(options.Inverse).attr("checked", false);
            c = 0
        });

        //反选
        $(options.Inverse).click(function () {
            checkbox.each(function () {
                $(this).attr("checked", this.checked ? false : true);
                if (this.checked) c++;
                else c--;
            })
        })
    }
    var config = {
        notallcheck: null,
        Inverse: null,
        allcheck: null,
        callback: null
    };
    return Check
});