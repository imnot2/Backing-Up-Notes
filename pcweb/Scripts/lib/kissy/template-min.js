﻿/*=======================template-min.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 21 20:57
*/
KISSY.add("template",function(f){function h(a){if(!g[a]){var d=f.guid(o),e,m,c=[p,d,q,m=r(a),s];try{e=new Function(d,c.join(""))}catch(b){c[3]=i+j+t+","+b.message+i+j,e=new Function(d,c.join(""))}g[a]={name:d,o:m,parser:c.join(""),render:e}}return g[a]}var g={},n={"#":"start","@":"start","/":"end"},u=RegExp("KS_TEMPL_STAT_PARAM","g"),o="KS_DATA_",i='");',j='KS_TEMPL.push("',t="KISSY.Template: Syntax Error. ",p="var KS_TEMPL=[],KS_TEMPL_STAT_PARAM=false;with(",q='||{}){try{KS_TEMPL.push("',s='");}catch(e){KS_TEMPL=["KISSY.Template: Render Error. " + e.message]}};return KS_TEMPL.join("");',
v=function(a){return a.replace(/"/g,'\\"')},k=f.trim,r=function(a){var d,e;return v(k(a).replace(/[\r\t\n]/g," ").replace(/\\/g,"\\\\")).replace(/\{\{([#/@]?)(?!\}\})([^}]*)\}\}/g,function(a,c,b){d="";b=k(b).replace(/\\"/g,'"');if(c){if(e=b.indexOf(" "),b=-1===e?[b,""]:[b.substring(0,e),b.substring(e)],a=b[0],b=k(b[1]),(a=l[a])&&n[c])c=a[n[c]],d=""+(f.isFunction(c)?c.apply(this,b.split(/\s+/)):c.replace(u,b))}else d="KS_TEMPL.push(typeof ("+b+') ==="undefined"?"":'+b+");";return i+d+j})},l={"if":{start:'if(typeof (KS_TEMPL_STAT_PARAM) !=="undefined" && KS_TEMPL_STAT_PARAM){',
end:"}"},"else":{start:"}else{"},elseif:{start:"}else if(KS_TEMPL_STAT_PARAM){"},each:{start:function(a,d,e,f){var c="_ks_value",b="_ks_index";"as"===d&&e&&(c=e||c,b=f||b);return"KISSY.each("+a+", function("+c+", "+b+"){"},end:"});"},"!":{start:"/*KS_TEMPL_STAT_PARAM*/"}};f.mix(h,{log:function(a){a in g||(h(a),this.log(a))},addStatement:function(a,d){f.isString(a)?l[a]=d:f.mix(l,a)}});return h});

