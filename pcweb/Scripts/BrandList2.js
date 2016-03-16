/*=======================BrandList2.js===========================*/
j$(function () {
    navTurn("#nav_brand");

    j$('#BrandList').listnav({
        initLetter: 'a',
        includeAll: false,
        includeOther: true,
        flagDisabled: true,
        showCounts: true,
        noMatchText: '当前首字母没有品牌 ... ',
        cookieName: 'myBrandList',
        prefixes: ['xcasdasdas', 'asdasdczx'],
        extendClass: [],
        afterClick: function () {

        }
    });
});
