Ymt.load("widget.Vscroll,widget.Tooltip", function () {
    //支付成功页，底部热卖商品与推荐，垂直翻转
    Ymt.widget.Vscroll("#bottomProductList", {
        panel: ".bd",
        content: ".bd ul",
        event: "mouse",
        auto: !0,
        trigger: ".trigger .it"
    })
    setTimeout(function () {
        Ymt.widget.Vscroll("#bottomProductList-1", {
            panel: ".bd",
            content: ".bd ul",
            event: "mouse",
            auto: !0,
            trigger: ".trigger .it"
        })
    }, 2000);

    //prepayfail,postpayfail
    var tooltip = Ymt.widget.Tooltip('struc', {
        container: 'ordertootip',
        content: '#ordercon-0',
        trigger: '.widget-0',
        event: 'mouse',
        time: 100,
        offsety: 60,
        offsetx: 40
    });
    tooltip.init();
    tooltip.init({
        content: "#ordercon-1",
        trigger: '.widget-1',
        offsety: 88
    });
    tooltip.init({
        content: "#ordercon-2",
        trigger: '.widget-2',
        offsety: 88
    });


    //提交身份证提示
    if ($("#submitIdCart").size() > 0) {
        var tooltip2 = Ymt.widget.Tooltip('struc', {
            container: "submitIdCart",
            content: '.tooltip-3',
            trigger: '.trigger',
            event: 'mouse',
            time: 100,
            offsety: 96,
            offsetx: 260,
            up: !0
        });
        tooltip2.init();
    }

})
$(function(){
    var opt = window.options || {};
    $.ajax({
        url:opt.hobby,
        //url:'http://t.ymatou.com/Rec?bsize=2&bcount=6',
        dataType: "jsonp",
        success:function(res){  
            createHtml("#RecommendPart0",res,"recmd=pay_success");
        }
    })
    //猜你喜欢
    $.ajax({
        url:opt.guess,
        //url:'http://t.ymatou.com/Rec?bsize=2&bcount=6',
        dataType: "jsonp",
        success:function(res){
            createHtml("#RecommendPart1",res,"guess=pay_success");  
        }
    })

     function createHtml(node,res,rec){
            var html = [],
                i,
                j,
                data = res.Blocks || [],
                o;
            for (j = 0; j < data.length; j++) {
                for (i = 0; i < data[j].Products.length; i++) {
                    o = data[j].Products[i];
                    html.push('<li class="item"><div class="pic"><a href="/product/' + o.PID + '.html?' + rec + '" target="_blank">');
                    html.push('<!--[if lte ie 7]><i class="mid"></i><![endif]--><img src="' + o.Pic + '" class="img" alt="' + o.Name + '" title="' + o.Name + '"><i class="r center"></i></a></div>');
                    html.push('<div class="txt"><h3 class="title"><a class="link blue" href="/product/' + o.PID + '.html?' + rec + '" target="_blank" title="' + o.Name + '">' + o.Name + '</a></h3>');
                    html.push('<div class="price"><span class="matou"><i class="yen">¥</i><em class="em">' + o.Price + '</em></span></div></div>')
                    html.push('</li>');
                }
            }
            $(node).append(html.join('')); 
        }
})