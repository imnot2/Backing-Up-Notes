/*=======================centerObj.js===========================*/
// JavaScript Document
var d=document, m = {
            ie: function() {
                return !! window.ActiveXObject
            },
            version: function() {
                if (window.ActiveXObject) {
                    var e = !!window.ActiveXObject,
                    a = e && !window.XMLHttpRequest,
                    b = e && !!document.documentMode;
                    if (e) if (a) return "6.0";
                    else if (b) return "8.0";
                    else if (e && !a && !b) return "7.0"
                }
            }
        },s = {
            addEvent: d.addEventListener ? 
            function(a, b, d) {
                a.addEventListener && a.addEventListener(b, d, !1)
            }: function(a, b, d) {
                a.attachEvent && a.attachEvent("on" + b, d)
            },
            removeEvent: d.removeEventListener ? 
            function(a, b, d) {
                a.removeEventListener && a.removeEventListener(b, d, !1)
            }: function(a, 
            b, d) {
                a.detachEvent && a.detachEvent("on" + b, d)
            }
        },elementPlace=function(e,place) {
                e.style.display = "block";
                var a = e.offsetHeight,
                h = e.offsetWidth;
				var placeVertical=(place[0]=='center'&&(m.version() != 6 ? (d.documentElement.clientHeight - a) / 2: (d.documentElement.clientHeight - a) / 2 + d.documentElement.scrollTop) + "px"||place[0]=='bottom'&&(m.version() != 6 ? (d.documentElement.clientHeight - a): (d.documentElement.clientHeight - a) + d.documentElement.scrollTop) + "px");
				var placeLevel=place[1]=='center'&&(d.documentElement.clientWidth - h) / 2 + "px"||place[1]=='right'&&(d.documentElement.clientWidth - h) + "px";
                e.style.top = placeVertical;
                e.style.left = placeLevel;
                e.style.position = "fixed";
                s.addEvent(d, "resize", 
                function() {
                    e.style.top = placeVertical;
                    e.style.left =placeLevel;
                });
                if (m.version() == 6) e.style.position = "absolute",
                s.addEvent(window, "scroll", 
                function() {
                    e.style.top =(place[0]=='center'&&(d.documentElement.clientHeight - a)/2+ d.documentElement.scrollTop + "px"||place[0]=='bottom'&&(d.documentElement.clientHeight - a)+ d.documentElement.scrollTop + "px");
                })
            };
