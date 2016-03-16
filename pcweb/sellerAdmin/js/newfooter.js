$(function () {
    //function footerxianshi() {
    //    if ($(this).height() > $("body").height()) {
    //        $("#footer").css({
    //            position: 'absolute',
    //            bottom: '0px',
    //            left: '0px'
    //        });
    //        //判断页面内容的高度和页面可见区域的高度，如果小于可见区域的高度，就用绝对定位。
    //    } else {
    //        $("#footer").css('position', 'relative');
    //    }
    //}
    //footerxianshi();
    //$(window).resize(function () {
    //    footerxianshi();
    //});

    $(".dropdown").mouseover(function () {
        $(this).addClass("active");
        $(this).find(".dropdown-item").show();
        textflow(".textflow", 3)
    }).mouseout(function () {
        $(this).removeClass("active");
        $(this).find(".dropdown-item").hide();
    });


    //文字显示 超出省略
    function textflow(seletor, row) {
        $(seletor).each(function () {
            var $this = $(this),
                clientHeight = this.clientHeight,//容器高度
                fontSize = parseFloat($this.css("fontSize")),
                lineHeight = parseFloat($this.css("lineHeight"));
            var title = $this.attr("title");
            //将原来的值保存到title中
            if (title === undefined || title === "") {
                $this.attr("title", title = $this.text());
            }
            //将原来的值还原重新计算
            $this.text(title);

            var dheight = parseInt(row * lineHeight);
            if (clientHeight >= dheight) {
                while (dheight * 3 < this.clientHeight) {
                    $this.text(title.substring(0, title.length / 2));
                    title = $this.text();
                }
                //减去末尾文字
                while (dheight < this.clientHeight) {
                    title = $this.text();
                    $this.text(title.replace(/(\s)*([a-zA-Z0-9]?|\W)(\.\.\.)?$/, "..."));
                }
            }
        })

    }

    //申请补款原因为空按钮无法点击

    var domReason = $('#form0 #Reason'),
        btnReason = $('#form0 .zicBtn'),
        amount = $('#form0 #Amount'),
        reasonVal = domReason.val();
    reasonFun(reasonVal);
    
    domReason.keyup(function () {
        var reasonVal = domReason.val();
        reasonFun(reasonVal);
    })
    function reasonFun(val) {
        if (val == "" || val == null) {
            btnReason.attr('disabled', true);
        } else {
            btnReason.attr('disabled', false);
        }
    }
    $('#form0').submit(function(){
        var _val = amount.val();
        if (parseFloat(_val) <= 0) {
            $('#Amount_validationMessage').text('补款金额不能小于等于0');
            return false;
        }
        if (parseFloat(_val) > 100000 || parseFloat(_val) < 0.0099999997764825821) {
            $('#Amount_validationMessage').text('补款金额不能大于100000');
            return false;
        }

    })
})
