define(function(){function a(a){a=$m.merge(b,a);var c=!1,d=window.onresize=function(){{var b=navigator.userAgent.match(/MSIE\s(\d)/),d=(document.body||document.documentElement).clientWidth,e=b&&b[1]&&b[1]<9;document.getElementsByTagName("head")[0]}1024>=d?(!c&&e&&(elem=$m.onload(a.stylesheet),c=!0),a.callback(!1)):(e&&c&&(location.reload(),c=!1),a.callback(!0))};d()}var b={stylesheet:"",callback:null};return a});