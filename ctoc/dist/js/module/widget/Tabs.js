Ymt.add(function(a){function b(a,c){if(void 0===c.panels&&void 0!==$(c.triggers)){for(var e=$(a+" "+c.triggers),f=e.length,g=document.createElement("div"),h=0;f>h;h++)g.appendChild(document.createElement("div"));c.panels=$(g.children),c.triggers=e}return this instanceof b?void b.superclass.constructor.call(this,a,c):new b(a,$m.merge(d,c))}var c=a("module/widget/switchable"),d={navCls:"wy-tabs-nav",contentCls:"wy-tabs-content"};return $m.extend(b,c),b});