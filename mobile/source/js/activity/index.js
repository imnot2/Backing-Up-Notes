define(function (require, exports, module) {

	var toolbar=require("component/floattoolbar");
    toolbar({
    	type:0
    })
	
    var lazyimg = require('util/imglazyload');
    lazyimg('.mod-product-show');


})