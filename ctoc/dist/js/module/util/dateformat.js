Ymt.add(function(a,b,c){var d=function(){var a=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,b=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,c=/[^-+\dA-Z]/g,e=function(a,b){for(a=String(a),b=b||2;a.length<b;)a="0"+a;return a},f=function(a){var b=new Date(a.getFullYear(),a.getMonth(),a.getDate());b.setDate(b.getDate()-(b.getDay()+6)%7+3);var c=new Date(b.getFullYear(),0,4);c.setDate(c.getDate()-(c.getDay()+6)%7+3);var d=b.getTimezoneOffset()-c.getTimezoneOffset();b.setHours(b.getHours()-d);var e=(b-c)/6048e5;return 1+Math.floor(e)},g=function(a){var b=a.getDay();return 0===b&&(b=7),b};return function(h,i,j,k){var l=d;if(1!=arguments.length||"[object String]"!=Object.prototype.toString.call(h)||/\d/.test(h)||(i=h,h=void 0),h=h||new Date,h instanceof Date||(h=new Date(h)),isNaN(h))throw TypeError("Invalid date");i=String(l.masks[i]||i||l.masks["default"]);var m=i.slice(0,4);("UTC:"==m||"GMT:"==m)&&(i=i.slice(4),j=!0,"GMT:"==m&&(k=!0));var n=j?"getUTC":"get",o=h[n+"Date"](),p=h[n+"Day"](),q=h[n+"Month"](),r=h[n+"FullYear"](),s=h[n+"Hours"](),t=h[n+"Minutes"](),u=h[n+"Seconds"](),v=h[n+"Milliseconds"](),w=j?0:h.getTimezoneOffset(),x=f(h),y=g(h),z={d:o,dd:e(o),ddd:l.i18n.dayNames[p],dddd:l.i18n.dayNames[p+7],m:q+1,mm:e(q+1),mmm:l.i18n.monthNames[q],mmmm:l.i18n.monthNames[q+12],yy:String(r).slice(2),yyyy:r,h:s%12||12,hh:e(s%12||12),H:s,HH:e(s),M:t,MM:e(t),s:u,ss:e(u),l:e(v,3),L:e(Math.round(v/10)),t:12>s?"a":"p",tt:12>s?"am":"pm",T:12>s?"A":"P",TT:12>s?"AM":"PM",Z:k?"GMT":j?"UTC":(String(h).match(b)||[""]).pop().replace(c,""),o:(w>0?"-":"+")+e(100*Math.floor(Math.abs(w)/60)+Math.abs(w)%60,4),S:["th","st","nd","rd"][o%10>3?0:(o%100-o%10!=10)*o%10],W:x,N:y};return i.replace(a,function(a){return a in z?z[a]:a.slice(1,a.length-1)})}}();d.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},d.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},"undefined"!=typeof b&&(c.exports=d)});