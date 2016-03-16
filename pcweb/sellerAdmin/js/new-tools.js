$(function () {
    function findtooltip(e) {
        var o = $(e.target), parent = o.closest(e.data.parent), find = parent.find(e.data.find);
        if (e.data.enter) {
            find.css('top', '-43px');
            find.show();
        } else {
            find.hide();
        }
        e.stopPropagation();
    }

    $('.tooltips .query').bind('mouseenter', { parent: '.node', find: '.tooltip-1', enter: true }, findtooltip);
    $('.tooltips .query').bind('mouseleave', { parent: '.node', find: '.tooltip-1', enter: false }, findtooltip);

    $('input[name=OrderType]').click(function () {
        if ($('#OrderTypeNormal').attr('checked') == true) {
            $('#CatalogDiv').show();
        } else {
            //j$('input[name="CatalogType"]').attr('checked', false);
            j$('input[name="CatalogStatu"]').attr('checked', false);
            $('#CatalogDiv').hide();
        }
    });
})


