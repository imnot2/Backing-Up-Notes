$(function () {
    
    var domslider = $('.slider > .slider-item');
    $('.s-title', domslider.eq(0)).css('border-top', '0');
    domslider.each(function () {
        var $this = $(this),
			$list = $('.s-list', $this),
			$title = $('.s-title', $this);
        $title.click(function () {
            $list.toggle();
        })
    })

    var _url = window.location.href,
		_length = _url.indexOf('#'),
		_newUrl = _url.substr(_length + 1);
    $('.J-slider a').each(function () {
        var $this = $(this),
            _aUrl = $this.attr('href').slice(1);
        if (_newUrl == _aUrl) {
            $this.parent('li').addClass('active');
            $this.closest('.s-list').show();
        }
    })
    getData(_newUrl);



    $('.J-slider a').each(function () {
        var $this = $(this);
        $this.click(function () {
            //$this.parent('li').siblings().removeClass('active');
            $this.closest('.J-slider').find('li').removeClass('active');
            $this.parent('li').addClass('active');
            var _url = $this.attr('href').slice(1);
            getData(_url);
        })
    })

    function getData(url) {
        $.ajax({
            url: url + '.html',
            dataType: 'html',
            success: function (html) {
                var _content = $("#J-content");
                $(_content).html(html);

                $('.J-tab > li').click(function () {
                    var $this = $(this);
                    $this.siblings().removeClass('current');
                    $this.addClass('current');
                    var _index = $this.index(),
                        _content = $('.c-tab-content .c-tab-item');
                    _content.siblings().css('display', 'none');
                    _content.eq(_index).css('display', 'block');
                });
            }
        });
    }
})