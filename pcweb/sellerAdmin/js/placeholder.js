$(function () {
    $('input[type=text]').each(function () {
        // if('placeholder' in document.createElement('input')){
        // 	return;
        // }
        var $this = $(this),
			 _text = $this.attr('placeholder');
        if (_text && !$this.val()) {
            $this.val(_text).addClass('placeholder');
        }
        $this.bind({
            "focusin": function () {
                if ($this.val() == _text) {
                    $this.val("").removeClass('placeholder');
                }
            },
            "focusout": function () {
                if ($this.val() == "") {
                    $this.val(_text).addClass('placeholder');
                }

            }
        })
    })

})