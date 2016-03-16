define(function (require, exports, module) {
    function InputHover(d, config) {
        if (!(this instanceof InputHover)) return new InputHover(d, $m.merge(f, config));

        this.config = config;

        var container = this.container = $(d).eq(0);
        if (!config.noDef) config.noDef = container.css(COLOR);
        if (!config.defaultValue) config.defaultValue = container.attr("defaultValue");

        if ("placeholder" in document.createElement("input")) {
            container.attr('placeholder', config.defaultValue)
        } else {
            if (container.val() == "") {
                container.val(config.defaultValue).css(COLOR, config.isDef);
            } else {
                container.val() == config.defaultValue ? container.css(COLOR, config.isDef) : container.css(COLOR, config.noDef);
            }

            container.bind({
                focus: function () {
                    container.val() == config.defaultValue && container.val("").css(COLOR, config.noDef)
                },
                blur: function () {
                    if (container.val() == "") container.val(config.defaultValue).css(COLOR,
                        config.isDef);
                    else container.val() == config.defaultValue && container.css(COLOR, config.isDef)
                }
            })

            //form提交前清除defaultvalue
            var form = container.parents("form").first(),
                m = form.data("formArray"),
                arr = m ? m : [];
            arr.push(this);
            form.data("formArray", arr);
            form.unbind("submit").bind("submit",
                function () {
                    $.each(arr,
                        function (a, c) {
                            if (c.container.val() == c.config.defaultValue) {
                                c.config.submitClearDefault && c.container.val('');
                            }
                        });
                    return !0;
                });

        }
    }
    var f = {
        submitClearDefault: !0,
        defaultValue: "",
        isDef: "#CCC",
        noDef: "#000"
    };
    COLOR = "color";
    return InputHover
});