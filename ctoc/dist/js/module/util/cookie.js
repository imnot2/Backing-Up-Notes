Ymt.add(function(a,b,c){c.exports={set:function(a,b,c,d,e,f){c||(c=365),e||(e="/"),c*=864e5;var g=new Date((new Date).getTime()+c);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+g.toGMTString():"")+(e?";path="+e:"")+(d?";domain="+d:"")+(f?";secure":"")},get:function(a){for(var b=document.cookie.split("; "),c=0;c<b.length;c++){var d=b[c].split("=");if(a==d[0])try{return decodeURIComponent(d[1])}catch(e){return null}}return null},del:function(a,b,c){document.cookie=a+"=1"+(c?"; path="+c:"; path=/")+(b?"; domain="+b:"")+";expires=Fri, 02-Jan-1970 00:00:00 GMT"},getDomain:function(){return"."+location.host.split(".").slice(-2).join(".")}}});