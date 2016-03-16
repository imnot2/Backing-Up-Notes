/*=======================slide.js===========================*/
j$(function () {
    //大Banner ------------------------------------------------------------------
    //b1.jpg|b1t.png, b2.jpg|b2t.png, b3.jpg|b3t.png, b4.jpg|b4t.png, 
    var bb = ["/Topic/t_186", "/Topic/t_188", "/Topic/t_190", "/Topic/t_181"];

    //公告栏 ------------------------------------------------------------------
    var pp = [
        { "t": "帮助中心", "d": "[02.29]", "l": "/Help/Rookie/" },
        { "t": "洋码头网站问题和建议汇总贴", "d": "[02.28]", "l": "/Topic/T_189" },
        { "t": "最新加入商品库的品牌清单", "d": "[02.28]", "l": "/Topic/T_194/" },
        { "t": "最新加入商品库的品牌清单", "d": "[02.28]", "l": "/Topic/T_194/" }
    ];

    //广场资讯 ------------------------------------------------------------------
    //g1.jpg|g2.jpg|g3.jpg
    var ss = [
    { tt: { "t": "GUCCI白菜包包，我抢到了，真人兽：99-199-299刀", "d": "[02.29]", "l": "/Topic/T_171" },
        item: [
        { "t": "我们都爱香奈儿 我们都是双C调", "d": "[02.29]", "l": "/Topic/T_172/" },
        { "t": "【资料】世界牛仔裤品牌大全...", "d": "[02.28]", "l": "/Topic/T_176/" },
        { "t": "【Juicy Couture】这个春天有点...", "d": "[02.28]", "l": "/Topic/T_174/" }
    ]
    },
    { tt: { "t": "BURBERRY、GUCCI、FENDI、GIVENCHY这些奢侈品牌", "d": "[02.29]", "l": "/Topic/T_178" },
        item: [
        { "t": "倩碧满35美金就送超值九件套...", "d": "[02.29]", "l": "/Topic/T_175" },
        { "t": "瑰柏翠旅行套装惊天的4刀价格", "d": "[02.28]", "l": "/Topic/T_187" },
        { "t": "【AE】清仓区额外7折", "d": "[02.28]", "l": "/Topic/T_182" }
    ]
    },
    { tt: { "t": "【伊丽莎白.雅顿】母亲节重推买满50刀送10件套", "d": "[02.29]", "l": "/Topic/T_179/" },
        item: [
        { "t": "全球十大最奢侈购物区(香港太古...", "d": "[02.29]", "l": "/Topic/T_184/" },
        { "t": "Express新品有买第二件打5折优惠", "d": "[02.28]", "l": "/Topic/T_180/" }
    ]
    }
    ];

    //打折促销 ------------------------------------------------------------------
    //p1.jpg|p2.jpg|p3.jpg
//    var dd = [
//        { "t": "全场额外6折", "l": "/Topic/t_191" },
//        { "t": "瑰柏翠活动", "l": "/Topic/t_187/" },
//        { "t": "保健品买2送3", "l": "/Topic/t_192/" }
//    ];

    //=============================================================================================

    (function () {
        j$("div.sgitem a").each(function (i) {
            j$(this).attr("href", bb[i]);
        });

        j$("ul#fixp li").each(function (i) {
            if (pp[i] == null) {
                j$("a", this).text("");
                j$("span", this).text("");
            } else {
                j$("a", this).attr("href", pp[i].l).text(pp[i].t);
                j$("span", this).text(pp[i].d);
            }
        });

        j$("div.foritem").each(function (i) {
            var fortt = j$("div.fortt", this);
            j$("a.h6", fortt).text(ss[i].tt.t).attr("href", ss[i].tt.l);
            j$("a.fimg", fortt).attr("href", ss[i].tt.l);
            j$("span", fortt).text(ss[i].tt.d);

            j$("ul li", this).each(function (j) {
                if (ss[i].item[j] == null) {
                    j$("a", this).text("");
                    j$("span", this).text("");
                } else {
                    j$("a", this).attr("href", ss[i].item[j].l).text(ss[i].item[j].t);
                    j$("span", this).text(ss[i].item[j].d);
                }
            });
        });

//        j$("div#pushbrand a").each(function (i) {
//            j$(this).attr("href", dd[i].l);
//            j$("h4", this).text(dd[i].t);
//        });
    })();
});


