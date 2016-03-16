/*=======================cshop.js===========================*/
/******author zhangdong 2012.5.23*******/

/**编辑商品**/
function mask(a,b) {
    var config = {
        container: '',
        trigger: '',
        maskedpart: '',
        spetrigger: ''
    }, c, o;
    //<a href="#" class="redbtn">编辑店铺名称</a>
    o = Ymt.merge(config,b);
    c = $(a);
    $(o.maskedpart, c).each(function (m, n) {
        var mask = $('<div>'), d = $(this), e = d.position();
        mask.css({
            position: 'absolute',
            left: e.left,
            top: e.top,
            width: d.outerWidth(),
            height: d.outerHeight(),
            backgroundColor: '#000',
            opacity: '0.4'
        })
        mask.insertAfter(d);
    })
    //c.bind('click', handler);
}
mask('#cshop-edit', {
    container: '.editmod',
    trigger: '.ehd',
    maskedpart: '.ebd',
    spetrigger: '.redbtn'
})
$('.img_160').css({
maxHeight:'160px',
maxWidth:'160px'
})
