define(function (require, exports, module) {
    function Pagination(config) {
        if (!(this instanceof Pagination)) return new Pagination($m.merge(opt, config));

        var opt = {
            pageSize: 28,
            firstPage: 1,
            total: 0,
            currentPage: 1,
            template: '',
            container: '',
            minPageToHide: 10 //大于10页的时候出现省略号，如果值为0，表示显示所有页码
        }

        this.config = config;
        this.container = $(config.container);

        if (config.total > 0 && this.container.size() > 0) {
            this.init();
        }

    }

    $m.augment(Pagination, {
        init: function () {
            var opt = this.config;
            if (opt.template) {
                $m.template({
                    html: opt.template,
                    data: opt,
                    container: opt.container
                });
            }
            else {
                this.creat();
            }
        },
        creat: function () {
            var opt = this.config;
            var str = ['<i class="pre-page"></i>'];

            opt.minPageToHide = opt.total <= opt.minPageToHide ? 0 : opt.minPageToHide;

            for (var i = 1, len = opt.total; i <= len; i++) {
                if (opt.minPageToHide && i == opt.minPageToHide) {
                    str.push('<span>...</span>')
                }
                else {
                    if (i == opt.currentPage) {
                        str.push('<a href="javascript:;" class="' + opt.currentCls + '">' + i + '</a>')
                    }
                    else {
                        str.push('<a href="javascript:;">' + i + '</a>')
                    }
                }
            }

            str.push('<i class="next-page"></i>');

            if (this.container.size() > 0) {
                str.unshift('<span class="pagination">');
                str.push('</span>')
                this.container.html(str.join(''));
            }
        }
    });

    return Pagination;
})