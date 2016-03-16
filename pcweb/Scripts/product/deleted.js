Ymt.load("widget.Vscroll", function () {
    Ymt.widget.Vscroll("#deletedProduct1", {
        panel: ".bd",
        content: ".bd ul",
        event: "mouse",
        auto:!0,
        trigger: ".trigger .it"
    })
    setTimeout(function () {
        Ymt.widget.Vscroll("#deletedProduct2", {
            panel: ".bd",
            content: ".bd ul",
            event: "mouse",
            auto: !0,
            trigger: ".trigger .it"
        })
    },2000)
}, true)
$(function(){
    var opt = window.options || {};
    //您可能感兴趣的商品
    $.ajax({
        url:opt.hobby,
        //url:'http://t.ymatou.com/Rec?bsize=2&bcount=6',
        dataType: "jsonp",
        success:function(res){  
            createHtml("#RecommendPart0",res,"recmd=prd_detail");
        }
    })
    //热卖商品
    $.ajax({
        url:opt.hotsale,
        //url:'http://t.ymatou.com/Rec?bsize=2&bcount=6',
        dataType: "jsonp",
        success:function(res){
            createHtml("#RecommendPart1",res,"search=prd_detail");  
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
                    html.push('<li class="item"><div class="pic" style="line-height:160px;"><a href="/product/' + o.PID + '.html?'+rec+'" target="_blank">');
                    html.push('<!--[if lte ie 7]><i class="mid"></i><![endif]--><img src="' + o.Pic + '" class="img" alt="' + o.Name + '" title="' + o.Name + '"><i class="r center"></i></a></div>');
                    html.push('<div class="txt"><h3 class="title"><a class="link blue" href="/product/' + o.PID + '.html?'+rec+'" target="_blank" title="' + o.Name + '">' + o.Name + '</a></h3>');
                    html.push('<div class="price"><span class="matou"><i class="yen">¥</i><em class="em">' + o.Price + '</em></span></div></div>');
                    html.push('</li>');
                }
            }
        $(node).append(html.join(''));
    }
})