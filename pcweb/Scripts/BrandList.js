/*=======================BrandList.js===========================*/
j$(function() {
    navTurn("#nav_brand");

    j$('#BrandList').listnav({
        initLetter: 'all',
        includeAll: true,
        includeOther: true,
        flagDisabled: true,
        showCounts: true,
        noMatchText: '当前首字母没有品牌 ... ',
        cookieName: 'myBrandList',
        prefixes: ['xcasdasdas', 'asdasdczx'],
        extendClass: [],
        afterClick: function() {
            
            j$("ul#BrandList a").tooltip({
                open: function() {
                    var tooltip = j$(this).tooltip("widget");
                    j$("body").mousemove(function(event) {
                        tooltip.position({my: "left bottom",at: "center bottom",offset: "-20 -10",of: event});
                    }).mousemove();
                },
                close: function() {
                    j$("body").unbind("mousemove");
                }
            });

        }
    });
});
