Ymt.add(function(){function a(b){if(!(this instanceof a))return new a($m.merge(c,b));var d=b.html;this.options=b,this.innerHTML=function(a){return void 0===a?d:d=a}}var b=Array.prototype.slice,c={html:"",filterKey:"taobao 淘宝 etao tmall hitao 天猫",place:"***"};return a.prototype={constructor:a,closeTags:function(){},filter:function(a){var c=/(<script[^>]*>[\S\s]*?<\/script[^>]*>|\s*on[a-z]+\s*=\s*(["']?)[^'"]*\2|\s*href\s*=\s*['"]?(?:javascript|vbscript):[^>]*(?=>))/gi,d=/<link[^>]*\/*>[\S\s]*(?:<\/link[^>]*>)*/gi,e=/(<style[^>]*>[\S\s]*?<\/style[^>]*>)/gi,f=b.call(arguments),g=/<iframe[^>]*>[\S\s]*<\/iframe[^>]*>/gi,h=this.innerHTML();if(f.length>1)for(var i=0,j=f.length;j>i;i++)this.filter(f[i]);else if("string"==typeof a){switch(a=a.toLowerCase()){case"script":h=h.replace(c,"");break;case"link":h=h.replace(d,"");case"style":h=h.replace(e,"");break;case"iframe":h=h.replace(g,"");break;default:var k=new RegExp("("+this.options.filterKey.split(/[ ,]/).join("|")+")","gi"),l=/(href|src)\s*=\s*(["']*)([^'">]+)\2/gi;h=h.replace(l,function(a,b,c,d){k.lastIndex=0;var e=k.exec(d);return"href"==b&&e?b+"='#'":"src"==b&&e?b+"="+d.replace(e[1],e[1].split("").join("&&&&&")):a}),h=h.replace(k,this.options.place),h=h.replace(l,function(a,b,c,d){return k.lastIndex=0,"src"==b?(d=d.replace(/&&&&&/gi,""),b+"="+c+d+c):a})}return this.innerHTML(h)}},purge:function(){}},a});