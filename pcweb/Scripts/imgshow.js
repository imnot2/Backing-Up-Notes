/*=======================imgshow.js===========================*/
//by Eysa
//订单大图提示
j$(function () {
    j$("img.olistimg").mouseenter(function () {
        var t = j$(this);
        var src = t.attr("src");
        var div = j$("div#bimgshow");
        div.html("");
        var img = document.createElement("img");
        function load () {
            if (this.width > 340) {
                var h = this.height * 340 / this.width;
                this.height = h;
                this.width = 340;
            }
            var top, bottom;
            var iatop = t.position().top;
            var iabottom = t.position().bottom;
            var wheight = j$(window).height();
            var itop = t.offset().top - j$(window).scrollTop();

            if (wheight - itop > this.height + 30) {
                top = iatop - 6;
                div.css("top", top);
            }
            if (wheight - itop < this.height + 30) {
                var v = iatop - this.height + 80;
                div.css("top", v);
            }

            div.append(img);
            div.fadeIn(500);
            img = null;
        }
        if (/MSIE/gi.test(navigator.userAgent)) {
            img.onreadystatechange = function () {
                if(img.readyState=="complete"||img.readyState=="loaded"){
                    load.call(img);
                }
            }
        }else{
            img.onload=load;
        }
        img.src = src;
    })
    j$("img.olistimg").mouseleave(function () {
        var div = j$("div#bimgshow");
        div.html("");
        div.hide();
    })
})
