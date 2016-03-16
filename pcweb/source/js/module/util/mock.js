define(function (require, exports, module) {

    function Mock(options) {
        if (!(this instanceof Mock)) return new Mock($m.merge(config, options));
        if (typeof jQuery != 'undefined') Mock.mockjax(jQuery);
    }

    function find(options) {

        for (var sUrlType in Mock._mocked) {
            var item = Mock._mocked[sUrlType]
            if (
                (!item.rurl || match(item.rurl, options.url)) &&
                (!item.rtype || match(item.rtype, options.type.toLowerCase()))
            ) {
                return item
            }
        }

        function match(expected, actual) {
            if (Util.type(expected) === 'string') {
                return expected === actual
            }
            if (Util.type(expected) === 'regexp') {
                return expected.test(actual)
            }
        }

    }

    function convert(item, options) {
        return Util.isFunction(item.template) ?
            item.template(options) : Mock.mock(item.template)
    }

    // 拦截 Ajax 请求for jQuery
    Mock.mockjax = function mockjax(jQuery) {

        function mockxhr() {
            return {
                readyState: 4,
                status: 200,
                statusText: '',
                open: jQuery.noop,
                send: function () {
                    if (this.onload) this.onload()
                },
                setRequestHeader: jQuery.noop,
                getAllResponseHeaders: jQuery.noop,
                getResponseHeader: jQuery.noop,
                statusCode: jQuery.noop,
                abort: jQuery.noop
            }
        }

        function prefilter(options, originalOptions, jqXHR) {
            var item = find(options)
            if (item) {
                options.dataFilter =
                    options.converters['text json'] =
                    options.converters['text jsonp'] =
                    options.converters['text script'] =
                    options.converters['script json'] = function () {
                        return convert(item, options)
                }
                options.xhr = mockxhr

                if (originalOptions.dataType !== 'script') return 'json'
            }
        }

        jQuery.ajaxPrefilter('json jsonp script', prefilter)

        return Mock
    }

    return Mock;
})