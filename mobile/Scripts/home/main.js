define(function (require, exports, module) {
    //搜索
    require('search/index');

    //from page
    var active = 0,
        as = document.getElementById('indicator').getElementsByTagName('li');
    for (var i = 0; i < as.length; i++) {
        (function () {
            var j = i;
            as[i].onclick = function () {
                t2.slide(j);
                return false;
            }
        })();
    }
    var t1 = new TouchScroll({ id: 'wrapper', 'width': 5, 'opacity': 0.7, color: '#555', minLength: 20 });
    var t2 = new TouchSlider({
        id: 'thelist', speed: 600, timeout: 6000, before: function (index) {
            as[active].className = '';
            active = index;
            as[active].className = 'active';
        }
    });
    $(function() {
        $("#subEdmEmail").click(function () {
            var email = $("#edmEmail").val();
            if (/^[a-zA-Z0-9_\.\-]+\@@([a-zA-Z0-9\_]+\.)+[a-zA-Z0-9]{2,4}$/.test(email)) {
                $.post("/Home/AddEmailForEDM?email=" + $("#edmEmail").val(), function(data) {
                    alert("感谢您的订阅，我们会定期给您发送最新的优惠资讯。谢谢！");
                });
            }
            else {
                alert("请输入正确的邮箱");
            }
        });
    });


    //$m.node('.ChangeHref .lk-img').each(function () {
    //    var href = $m.node.attr(this, 'href');
    //    href = href.replace("www", 'm');
    //    $m.node.attr(this, 'href', href);
    //})
});