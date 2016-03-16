define(function (require, exports, module) {
    
    var config = {
        handle: '',
        template: '<article id="floatAddress" class="float-center float-address out" temp-data="d"><header class="hd"><span class="fr pointer btn-close" class="fr">关闭</span><b class="tit">选择您的城市</b></header><div class="bd"><div class="pad">当前所选城市：${d.ToArea}</div><address class="address"><for e="c in d.Areas"><if e="c.Name==d.ToArea"><a class="as selected" areaid="${c.Id}" href="javascript:void 0">${c.Name}</a></if><else><a class="as" areaid="${c.Id}" href="javascript:void 0">${c.Name}</a></else></for></address></div></article>',
        data: '',
        event: 'click',
        method: 'post',
        container: '#floatAddress',
        closed: '.btn-close'
    };
    exports.init = function (options) {
        var op = $m.merge(config, options), c = document.body;
        op.handle = typeof op.handle == "string" ? $m.node(op.handle)[0] : op.handle;

        if (typeof op.data == "string") {
            $m[op.method](op.data, function (data) {
                if (op.handle) {
                    $m.template({
                        container: c,
                        html: op.template,
                        data: {
                            ToArea: op.handle.innerHTML,
                            Areas: data
                        },
                        add: !0
                    });
                    $m.event.bind(op.handle, op.event, function () {
                        $m.node.toggleClass(op.container, 'out', 'in');
                    });
                    $m.event.delegate(op.closed, op.event, function () {
                        $m.node.toggleClass(op.container, 'out', 'in');
                        return !1
                    });
                }
                op.container = typeof op.container == "string" ? $m.node(op.container)[0] : op.container;
            });
        }
    };
    
})

