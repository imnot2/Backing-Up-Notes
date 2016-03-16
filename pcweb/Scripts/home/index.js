$(function () {
    Ymt.load('widget.Slide,widget.SeamlesScroll,widget.Tabs,home.indexmenu', function () {
        Ymt.widget.Slide('#sitebanner', {
            panels: '.mod-slide-panel li',
            triggers: '.mod-slide-trigger li',
            effect: 'scrollx',
            triggerType: 'mouse'
        });
        var s1 = $('#sellerStar .slide-item').size(), s2 = $('#sellerRecommend .slide-item').size(), s3 = $('#sellerUsa .slide-item').size();
        var r0 = parseInt(Math.random() * s1), r1 = parseInt(Math.random() * s2), r2 = parseInt(Math.random() * s3);

        $('#sellerStar .number').html(r0+1 + "/" + s1).show();
        $('#sellerRecommend .number').html(r1+1 + "/" + s2).show();
        $('#sellerUsa .number').html(r2+1 + "/" + s3).show();

        var s0=Ymt.widget.SeamlesScroll('#sellerStar', {
            panels: '.bd .slide-item',
            btnPrev: '.icon-left',
            btnNext: '.icon-right',
            speed: 500,
            visible: s1,
            start: r0
        }).on('switch', function (a) {
            a.container.find('.number').html(a.currentIndex + "/" + a.amount).show()
        });
        //s0.go(r0)

        var s1=Ymt.widget.SeamlesScroll('#sellerRecommend', {
            panels: '.bd .slide-item',
            btnPrev: '.icon-left',
            btnNext: '.icon-right',
            speed: 500,
            visible: s2,
            start: r1
        }).on('switch', function (a) {
            a.container.find('.number').html(a.currentIndex + "/" + a.amount).show()
        });
        //s1.go(r1)

        var s2=Ymt.widget.SeamlesScroll('#sellerUsa', {
            panels: '.bd .slide-item',
            btnPrev: '.icon-left',
            btnNext: '.icon-right',
            speed: 500,
            visible: s3,
            start: r2
        }).on('switch', function (a) {
            a.container.find('.number').html(a.currentIndex + "/" + a.amount).show()
        });

        

        //s2.go(r2)
        //热卖商品
        var tabs=Ymt.widget.Tabs('#new-product', {
            panels: '.bd-item',
            triggers: '.hd-item',
            activeTriggerCls: 'current',
            triggerType: 'mouse'
        });
        if ($('#new-product .hd-item').size() >= 2) {
            tabs.switchTo(1)
        }
        //所有商品
        Ymt.widget.Tabs('#oth-product', {
            panels: '.bd-item',
            triggers: '.hd-item',
            activeTriggerCls: 'current',
            triggerType: 'mouse'
        });

        
    }, true)

})