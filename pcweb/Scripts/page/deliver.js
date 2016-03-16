/*=======================deliver.js===========================*/
/*@zhangdong 2012.6.19*/
function position(o, obj, display) {
    var o = o.offset();
    obj.css('left', Math.floor(o.left - 20) + 'px');
    obj.css('top', Math.floor(o.top - 42) + 'px');
    obj.css('display', display);
}
var tooltip = $('#tooltip-1');
function fill(str) {
    tooltip.find('.c').html(str);
}
//
$('.question').bind({ mouseenter: function () { fill($(this).html()); position($(this), tooltip) }, mouseleave: function () { fill(''); position($(this), tooltip) } });
$('.delete').live("mouseenter", function () { fill('移除的记录将不会被导出'); position($(this), tooltip, 'block') });
$('.delete').live("mouseleave", function () { /*fill('');*/position($(this), tooltip, 'none') });
$('.delete').live("click", function () { /*fill('');*/position($(this), tooltip, 'none') });

$('.single').live("mouseenter", function () { fill('单独发货：该订单将分拆成一个新的包裹'); position($(this), tooltip, 'block') });
$('.single').live("mouseleave", function () { /*fill('');*/position($(this), tooltip, 'none') });

$('#radio-1').click(function () {
    if ($(this).attr('checked')) {
        $('.seleteitem').hide();
        $('#seleteitem-1').show();
    } else {
        $('#seleteitem-1').hide();
    }
})
$('#radio-2').click(function () {
    if ($(this).attr('checked')) {
        $('.seleteitem').hide();
        $('#seleteitem-2').show();
    } else {
        $('#seleteitem-2').hide();
    }
})
