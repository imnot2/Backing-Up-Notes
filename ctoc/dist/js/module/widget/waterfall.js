Ymt.add(function(a){function b(a){h=$.extend({selector:"",url:"",type:"get",increment:"",offset:400,options:{},timeout:1,isCol:!1},a||{}),0!=$(h.selector).size()&&g()}function c(){i&&clearTimeout(i),i=setTimeout(function(){d.call()},h.timeout)}function d(){var a,b,c=$(window).scrollTop(),d=$(window).height(),f=$(h.selector)||[];for(b=0;b<f.length;b++)if(a=parseInt($(f[b]).css("height")),a+$(f[b]).offset().top<=c+d-h.offset)return e(),void g()}function e(){$(window).unbind("scroll",c)}function f(){m=!1}function g(){var a=h,b=/\?$/.test(a.url)?a.url:a.url+"?";if(b+=$.param(a.options),"jsonp"==a.dataType&&(b+="callback=?"),!k[b]){var d=$(h.selector).eq(0);a.isCol&&(d=$(h.selector).parent()),d.find(".__isloading__")[0]||d.append("<div class='__isloading__'></div>"),j&&(j=!1,$.getJSON(l+b,function(c){if(c.Result&&0==c.Result.length||0==c.length)return void(k[b]=!0);var d;a.options[h.increment]++,a.callback&&(d=a.callback(c,a.options[h.increment],f),d&&(a.options[h.increment]=d))}).complete(function(){j=!0,$(".__isloading__").remove(),m&&$(window).bind("scroll",c)}))}}var h={},i=null,j=!0,k={},l=a("module/config/apiCDN");$(window).bind("scroll",c);var m=!0;return b});