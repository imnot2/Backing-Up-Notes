Ymt.add(function(a,b,c){function c(a,b){function e(){h=setInterval(function(){g.prevIndex=g.currentIndex,g.currentIndex=g.currentIndex+1,g.currentIndex=g.currentIndex>g.length-1?0:g.currentIndex,i.switchTo(g.currentIndex,g.prevIndex)},g.interval)}function f(){h&&clearInterval(h)}if(!(this instanceof c))return new c(a,$m.merge(d,b));var g,h=null,i=this,j=0;if(g=this.config=b,g.container=$(a),0!=g.container.size()){for(g.content=g.container.find(g.content),g.panel=g.container.find(g.panel),g.trigger=g.container.find(g.trigger),g.length=g.trigger.size(),g.currentIndex=0,g.prevIndex=0,g.interval=1e3*g.interval,g.li=g.content.children().first().outerHeight(),$(g.panel).mouseleave(function(){e()}),$(g.panel).mouseenter(function(){f()}),j=0;j<g.length;j++)(function(a){var b=g.trigger[a];"click"==g.event.toLowerCase()&&$(b).click(function(){i.switchTo(a,g.currentIndex),g.currentIndex=a}),"mouse"==g.event.toLowerCase()&&($(b).mouseenter(function(){f(),a!=g.currentIndex&&i.switchTo(a,g.currentIndex),g.currentIndex=a}),$(b).mouseleave(function(){e()}))})(j);e()}}var d={panel:"",content:"",trigger:"",event:"click",time:500,auto:!1,interval:4};return $m.augment(c,{switchTo:function(a,b){var c=this.config,d=c.content.outerHeight()/c.length;c.panel.css({position:"relative",overflow:"hidden"}),c.content.css({position:"absolute"}),c.content.animate({top:-d*a},c.time),$(c.trigger[a]).addClass("current"),$(c.trigger[b]).removeClass("current")}}),c});