﻿/*=======================fg.menu.js===========================*/
/*-------------------------------------------------------------------- 
Scripts for creating and manipulating custom menus based on standard <ul> markup
Version: 3.0, 03.31.2009

By: Maggie Costello Wachs (maggie@filamentgroup.com) and Scott Jehl (scott@filamentgroup.com)
	http://www.filamentgroup.com
	* reference articles: http://www.filamentgroup.com/lab/jquery_ipod_style_drilldown_menu/
		
Copyright (c) 2009 Filament Group
Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
--------------------------------------------------------------------*/


var allUIMenus = [];

j$.fn.menu = function(options){
	var caller = this;
	var options = options;
	var m = new Menu(caller, options);	
	allUIMenus.push(m);
	
	j$(this)
	.mousedown(function(){
		if (!m.menuOpen) { m.showLoading(); };
	})	
	.click(function(){
		if (m.menuOpen == false) { m.showMenu(); }
		else { m.kill(); };
		return false;
	});	
};

function Menu(caller, options){
	var menu = this;
	var caller = j$(caller);
	var container = j$('<div class="fg-menu-container ui-widget ui-widget-content ui-corner-all">'+options.content+'</div>');
	
	this.menuOpen = false;
	this.menuExists = false;
	
	var options = jQuery.extend({
		content: null,
		width: 180, // width of menu container, must be set or passed in to calculate widths of child menus
		maxHeight: 180, // max height of menu (if a drilldown: height does not include breadcrumb)
		positionOpts: {
			posX: 'left', 
			posY: 'bottom',
			offsetX: 0,
			offsetY: 0,
			directionH: 'right',
			directionV: 'down', 
			detectH: true, // do horizontal collision detection  
			detectV: true, // do vertical collision detection
			linkToFront: false
		},
		showSpeed: 200, // show/hide speed in milliseconds
		callerOnState: 'ui-state-active', // class to change the appearance of the link/button when the menu is showing
		loadingState: 'ui-state-loading', // class added to the link/button while the menu is created
		linkHover: 'ui-state-hover', // class for menu option hover state
		linkHoverSecondary: 'li-hover', // alternate class, may be used for multi-level menus		
	// ----- multi-level menu defaults -----
		crossSpeed: 200, // cross-fade speed for multi-level menus
		crumbDefaultText: 'Choose an option:',
		backLink: true, // in the ipod-style menu: instead of breadcrumbs, show only a 'back' link
		backLinkText: 'Back',
		flyOut: false, // multi-level menus are ipod-style by default; this parameter overrides to make a flyout instead
		flyOutOnState: 'ui-state-default',
		nextMenuLink: 'ui-icon-triangle-1-e', // class to style the link (specifically, a span within the link) used in the multi-level menu to show the next level
		topLinkText: 'All',
		nextCrumbLink: 'ui-icon-carat-1-e'	
	}, options);
	
	var killAllMenus = function(){
		j$.each(allUIMenus, function(i){
			if (allUIMenus[i].menuOpen) { allUIMenus[i].kill(); };	
		});
	};
	
	this.kill = function(){
		caller
			.removeClass(options.loadingState)
			.removeClass('fg-menu-open')
			.removeClass(options.callerOnState);	
		container.find('li').removeClass(options.linkHoverSecondary).find('a').removeClass(options.linkHover);		
		if (options.flyOutOnState) { container.find('li a').removeClass(options.flyOutOnState); };	
		if (options.callerOnState) { 	caller.removeClass(options.callerOnState); };			
		if (container.is('.fg-menu-ipod')) { menu.resetDrilldownMenu(); };
		if (container.is('.fg-menu-flyout')) { menu.resetFlyoutMenu(); };	
		container.parent().hide();	
		menu.menuOpen = false;
		j$(document).unbind('click', killAllMenus);
		j$(document).unbind('keydown');
	};
	
	this.showLoading = function(){
		caller.addClass(options.loadingState);
	};

	this.showMenu = function() {
		killAllMenus();
		if (!menu.menuExists) { menu.create() };
		caller
			.addClass('fg-menu-open')
			.addClass(options.callerOnState);
		container.parent().show().click(function(){ menu.kill(); return false; });
		container.hide().slideDown(options.showSpeed).find('.fg-menu:eq(0)');
		menu.menuOpen = true;
		caller.removeClass(options.loadingState);
		j$(document).click(killAllMenus);
		
		// assign key events
		j$(document).keydown(function(event){
			var e;
			if (event.which !="") { e = event.which; }
			else if (event.charCode != "") { e = event.charCode; }
			else if (event.keyCode != "") { e = event.keyCode; }
			
			var menuType = (j$(event.target).parents('div').is('.fg-menu-flyout')) ? 'flyout' : 'ipod' ;
			
			switch(e) {
				case 37: // left arrow 
					if (menuType == 'flyout') {
						j$(event.target).trigger('mouseout');
						if (j$('.'+options.flyOutOnState).size() > 0) { j$('.'+options.flyOutOnState).trigger('mouseover'); };
					};
					
					if (menuType == 'ipod') {
						j$(event.target).trigger('mouseout');
						if (j$('.fg-menu-footer').find('a').size() > 0) { j$('.fg-menu-footer').find('a').trigger('click'); };
						if (j$('.fg-menu-header').find('a').size() > 0) { j$('.fg-menu-current-crumb').prev().find('a').trigger('click'); };
						if (j$('.fg-menu-current').prev().is('.fg-menu-indicator')) {
							j$('.fg-menu-current').prev().trigger('mouseover');							
						};						
					};
					return false;
					break;
					
				case 38: // up arrow 
					if (j$(event.target).is('.' + options.linkHover)) {	
						var prevLink = j$(event.target).parent().prev().find('a:eq(0)');						
						if (prevLink.size() > 0) {
							j$(event.target).trigger('mouseout');
							prevLink.trigger('mouseover');
						};
					}
					else { container.find('a:eq(0)').trigger('mouseover'); }
					return false;
					break;
					
				case 39: // right arrow 
					if (j$(event.target).is('.fg-menu-indicator')) {						
						if (menuType == 'flyout') {
							j$(event.target).next().find('a:eq(0)').trigger('mouseover');
						}
						else if (menuType == 'ipod') {
							j$(event.target).trigger('click');						
							setTimeout(function(){
								j$(event.target).next().find('a:eq(0)').trigger('mouseover');
							}, options.crossSpeed);
						};				
					}; 
					return false;
					break;
					
				case 40: // down arrow 
					if (j$(event.target).is('.' + options.linkHover)) {
						var nextLink = j$(event.target).parent().next().find('a:eq(0)');						
						if (nextLink.size() > 0) {							
							j$(event.target).trigger('mouseout');
							nextLink.trigger('mouseover');
						};				
					}
					else { container.find('a:eq(0)').trigger('mouseover'); }		
					return false;						
					break;
					
				case 27: // escape
					killAllMenus();
					break;
					
				case 13: // enter
					if (j$(event.target).is('.fg-menu-indicator') && menuType == 'ipod') {							
						j$(event.target).trigger('click');						
						setTimeout(function(){
							j$(event.target).next().find('a:eq(0)').trigger('mouseover');
						}, options.crossSpeed);					
					}; 
					break;
			};			
		});
	};

	this.create = function() {
	    container.css({ width: options.width }).appendTo('body').find('ul:first').not('.fg-menu-breadcrumb').addClass('fg-menu');
	    container.find('ul, li a').addClass('ui-corner-all');
	    //container.find('a').addClass('rel').append("<span class='searchico'></span>");

	    // aria roles & attributes
	    container.find('ul').attr('role', 'menu').eq(0).attr('aria-activedescendant', 'active-menuitem').attr('aria-labelledby', caller.attr('id'));
	    container.find('li').attr('role', 'menuitem');
	    container.find('li:has(ul)').attr('aria-haspopup', 'true').find('ul').attr('aria-expanded', 'false');
	    container.find('a').attr('tabindex', '-1');

	    // when there are multiple levels of hierarchy, create flyout or drilldown menu
	    if (container.find('ul').size() > 1) {
	        if (options.flyOut) { menu.flyout(container, options); }
	        else { menu.drilldown(container, options); }
	    }
	    else {
	        container.find('a').click(function() {
	            menu.chooseItem(this);
	            return false;
	        });
	    };

	    if (options.linkHover) {
	        var allLinks = container.find('.fg-menu li a');
	        allLinks.hover(
				function() {
				    var menuitem = j$(this);
				    j$('.' + options.linkHover).removeClass(options.linkHover).blur().parent().removeAttr('id');
				    j$(this).addClass(options.linkHover).focus().parent().attr('id', 'active-menuitem');
				},
				function() {
				    j$(this).removeClass(options.linkHover).blur().parent().removeAttr('id');
				}
			);
	    };

	    if (options.linkHoverSecondary) {
	        container.find('.fg-menu li').hover(
				function() {
				    j$(this).siblings('li').removeClass(options.linkHoverSecondary);
				    if (options.flyOutOnState) { j$(this).siblings('li').find('a').removeClass(options.flyOutOnState); }
				    j$(this).addClass(options.linkHoverSecondary);
				},
				function() { j$(this).removeClass(options.linkHoverSecondary); }
			);
	    };

	    menu.setPosition(container, caller, options);
	    menu.menuExists = true;
	};

	this.chooseItem = function(item) {
	    menu.kill();
	    // edit this for your own custom function/callback:
	    j$('a.fg-button').html("<span class='ui-icon ui-icon-triangle-1-s'></span>搜索类别：" + j$(item).text());
	    // location.href = j$(item).attr('href');
	};
};

Menu.prototype.flyout = function(container, options) {
    var menu = this;
    this.resetFlyoutMenu = function() {
        var allLists = container.find('ul ul');
        allLists.removeClass('ui-widget-content').hide();
    };

    container.addClass('fg-menu-flyout').find('li:has(ul)').each(function() {
        var linkWidth = container.width();
        var showTimer, hideTimer;
        var allSubLists = j$(this).find('ul');

        allSubLists.css({ left: linkWidth, width: linkWidth }).hide();
        j$(this).find('a:eq(0)').addClass('fg-menu-indicator').html('<span>' + j$(this).find('a:eq(0)').text() + '</span><span class="ui-icon ' + options.nextMenuLink + '"></span>').hover(
			function() {
			    clearTimeout(hideTimer);
			    var subList = j$(this).next();
			    if (!fitVertical(subList, j$(this).offset().top)) { subList.css({ top: 'auto', bottom: 0 }); };
			    if (!fitHorizontal(subList, j$(this).offset().left + 100)) { subList.css({ left: 'auto', right: linkWidth, 'z-index': 999 }); };
			    showTimer = setTimeout(function() {
			        subList.addClass('ui-widget-content').show(options.showSpeed).attr('aria-expanded', 'true');
			    }, 300);
			},
			function() {
			    clearTimeout(showTimer);
			    var subList = j$(this).next();
			    hideTimer = setTimeout(function() {
			        subList.removeClass('ui-widget-content').hide(options.showSpeed).attr('aria-expanded', 'false');
			    }, 400);
			}
		);

        j$(this).find('ul a').hover(
			function() {
			    clearTimeout(hideTimer);
			    if (j$(this).parents('ul').prev().is('a.fg-menu-indicator')) {
			        j$(this).parents('ul').prev().addClass(options.flyOutOnState);
			    }
			},
			function() {
			    hideTimer = setTimeout(function() {
			        allSubLists.hide(options.showSpeed);
			        container.find(options.flyOutOnState).removeClass(options.flyOutOnState);
			    }, 500);
			}
		);
    });

    container.find('a').click(function() {
        menu.chooseItem(this);
        return false;
    });
};


Menu.prototype.drilldown = function(container, options) {
	var menu = this;	
	var topList = container.find('.fg-menu');
	var breadcrumb = j$('<ul class="fg-menu-breadcrumb ui-widget-header ui-corner-all ui-helper-clearfix"></ul>');
	var crumbDefaultHeader = j$('<li class="fg-menu-breadcrumb-text">'+options.crumbDefaultText+'</li>');
	var firstCrumbText = (options.backLink) ? options.backLinkText : options.topLinkText;
	var firstCrumbClass = (options.backLink) ? 'fg-menu-prev-list' : 'fg-menu-all-lists';
	var firstCrumbLinkClass = (options.backLink) ? 'ui-state-default ui-corner-all' : '';
	var firstCrumbIcon = (options.backLink) ? '<span class="ui-icon ui-icon-triangle-1-w"></span>' : '';
	var firstCrumb = j$('<li class="'+firstCrumbClass+'"><a href="#" class="'+firstCrumbLinkClass+'">'+firstCrumbIcon+firstCrumbText+'</a></li>');
	
	container.addClass('fg-menu-ipod');
	
	if (options.backLink) { breadcrumb.addClass('fg-menu-footer').appendTo(container).hide(); }
	else { breadcrumb.addClass('fg-menu-header').prependTo(container); };
	breadcrumb.append(crumbDefaultHeader);
	
	var checkMenuHeight = function(el){
		if (el.height() > options.maxHeight) { el.addClass('fg-menu-scroll') };	
		el.css({ height: options.maxHeight });
	};
	
	var resetChildMenu = function(el){ el.removeClass('fg-menu-scroll').removeClass('fg-menu-current').height('auto'); };
	
	this.resetDrilldownMenu = function(){
		j$('.fg-menu-current').removeClass('fg-menu-current');
		topList.animate({ left: 0 }, options.crossSpeed, function(){
			j$(this).find('ul').each(function(){
				j$(this).hide();
				resetChildMenu(j$(this));				
			});
			topList.addClass('fg-menu-current');			
		});		
		j$('.fg-menu-all-lists').find('span').remove();	
		breadcrumb.empty().append(crumbDefaultHeader);		
		j$('.fg-menu-footer').empty().hide();	
		checkMenuHeight(topList);		
	};
	
	topList
		.addClass('fg-menu-content fg-menu-current ui-widget-content ui-helper-clearfix')
		.css({ width: container.width() })
		.find('ul')
			.css({ width: container.width(), left: container.width() })
			.addClass('ui-widget-content')
			.hide();		
	checkMenuHeight(topList);	
	
	topList.find('a').each(function(){
		// if the link opens a child menu:
		if (j$(this).next().is('ul')) {
			j$(this)
				.addClass('fg-menu-indicator')
				.each(function() { j$(this).html('<span>' + j$(this).text() + '</span><span class="ui-icon ' + options.nextMenuLink + '"></span></span>'); })
				.click(function(){ // ----- show the next menu			
					var nextList = j$(this).next();
		    		var parentUl = j$(this).parents('ul:eq(0)');   		
		    		var parentLeft = (parentUl.is('.fg-menu-content')) ? 0 : parseFloat(topList.css('left'));    		
		    		var nextLeftVal = Math.round(parentLeft - parseFloat(container.width()));
		    		var footer = j$('.fg-menu-footer');
		    		
		    		// show next menu   		
		    		resetChildMenu(parentUl);
		    		checkMenuHeight(nextList);
					topList.animate({ left: nextLeftVal }, options.crossSpeed);						
		    		nextList.show().addClass('fg-menu-current').attr('aria-expanded', 'true');    
		    		
		    		var setPrevMenu = function(backlink){
		    			var b = backlink;
		    			var c = j$('.fg-menu-current');
			    		var prevList = c.parents('ul:eq(0)');
			    		c.hide().attr('aria-expanded', 'false');
		    			resetChildMenu(c);
		    			checkMenuHeight(prevList);
			    		prevList.addClass('fg-menu-current').attr('aria-expanded', 'true');
			    		if (prevList.hasClass('fg-menu-content')) { b.remove(); footer.hide(); };
		    		};		
		
					// initialize "back" link
					if (options.backLink) {
						if (footer.find('a').size() == 0) {
							footer.show();
							j$('<a href="#"><span class="ui-icon ui-icon-triangle-1-w"></span> <span>Back</span></a>')
								.appendTo(footer)
								.click(function(){ // ----- show the previous menu
									var b = j$(this);
						    		var prevLeftVal = parseFloat(topList.css('left')) + container.width();		    						    		
						    		topList.animate({ left: prevLeftVal },  options.crossSpeed, function(){
						    			setPrevMenu(b);
						    		});			
									return false;
								});
						}
					}
					// or initialize top breadcrumb
		    		else { 
		    			if (breadcrumb.find('li').size() == 1){				
							breadcrumb.empty().append(firstCrumb);
							firstCrumb.find('a').click(function(){
								menu.resetDrilldownMenu();
								return false;
							});
						}
						j$('.fg-menu-current-crumb').removeClass('fg-menu-current-crumb');
						var crumbText = j$(this).find('span:eq(0)').text();
						var newCrumb = j$('<li class="fg-menu-current-crumb"><a href="javascript://" class="fg-menu-crumb">'+crumbText+'</a></li>');	
						newCrumb
							.appendTo(breadcrumb)
							.find('a').click(function(){
								if (j$(this).parent().is('.fg-menu-current-crumb')){
									menu.chooseItem(this);
								}
								else {
									var newLeftVal = - (j$('.fg-menu-current').parents('ul').size() - 1) * 180;
									topList.animate({ left: newLeftVal }, options.crossSpeed, function(){
										setPrevMenu();
									});
								
									// make this the current crumb, delete all breadcrumbs after this one, and navigate to the relevant menu
									j$(this).parent().addClass('fg-menu-current-crumb').find('span').remove();
									j$(this).parent().nextAll().remove();									
								};
								return false;
							});
						newCrumb.prev().append(' <span class="ui-icon '+options.nextCrumbLink+'"></span>');
		    		};			
		    		return false;    		
    			});
		}
		// if the link is a leaf node (doesn't open a child menu)
		else {
			j$(this).click(function(){
				menu.chooseItem(this);
				return false;
			});
		};
	});
};


/* Menu.prototype.setPosition parameters (defaults noted with *):
	referrer = the link (or other element) used to show the overlaid object 
	settings = can override the defaults:
		- posX/Y: where the top left corner of the object should be positioned in relation to its referrer.
				X: left*, center, right
				Y: top, center, bottom*
		- offsetX/Y: the number of pixels to be offset from the x or y position.  Can be a positive or negative number.
		- directionH/V: where the entire menu should appear in relation to its referrer.
				Horizontal: left*, right
				Vertical: up, down*
		- detectH/V: detect the viewport horizontally / vertically
		- linkToFront: copy the menu link and place it on top of the menu (visual effect to make it look like it overlaps the object) */

Menu.prototype.setPosition = function(widget, caller, options) {
	var el = widget;
	var referrer = caller;
	var dims = {
		refX: referrer.offset().left,
		refY: referrer.offset().top,
		refW: referrer.getTotalWidth(),
		refH: referrer.getTotalHeight()
	};	
	var options = options;
	var xVal, yVal;
	
	var helper = j$('<div class="positionHelper"></div>');
	helper.css({ position: 'absolute', left: dims.refX, top: dims.refY, width: dims.refW, height: dims.refH });
	el.wrap(helper);
	
	// get X pos
	switch(options.positionOpts.posX) {
		case 'left': 	xVal = 0; 
			break;				
		case 'center': xVal = dims.refW / 2;
			break;				
		case 'right': xVal = dims.refW;
			break;
	};
	
	// get Y pos
	switch(options.positionOpts.posY) {
		case 'top': 	yVal = 0;
			break;				
		case 'center': yVal = dims.refH / 2;
			break;				
		case 'bottom': yVal = dims.refH;
			break;
	};
	
	// add the offsets (zero by default)
	xVal += options.positionOpts.offsetX;
	yVal += options.positionOpts.offsetY;
	
	// position the object vertically
	if (options.positionOpts.directionV == 'up') {
		el.css({ top: 'auto', bottom: yVal });
		if (options.positionOpts.detectV && !fitVertical(el)) {
			el.css({ bottom: 'auto', top: yVal });
		}
	} 
	else {
		el.css({ bottom: 'auto', top: yVal });
		if (options.positionOpts.detectV && !fitVertical(el)) {
			el.css({ top: 'auto', bottom: yVal });
		}
	};
	
	// and horizontally
	if (options.positionOpts.directionH == 'left') {
		el.css({ left: 'auto', right: xVal });
		if (options.positionOpts.detectH && !fitHorizontal(el)) {
			el.css({ right: 'auto', left: xVal });
		}
	} 
	else {
		el.css({ right: 'auto', left: xVal });
		if (options.positionOpts.detectH && !fitHorizontal(el)) {
			el.css({ left: 'auto', right: xVal });
		}
	};
	
	// if specified, clone the referring element and position it so that it appears on top of the menu
	if (options.positionOpts.linkToFront) {
		referrer.clone().addClass('linkClone').css({
			position: 'absolute', 
			top: 0, 
			right: 'auto', 
			bottom: 'auto', 
			left: 0, 
			width: referrer.width(), 
			height: referrer.height()
		}).insertAfter(el);
	};
};


/* Utilities to sort and find viewport dimensions */

function sortBigToSmall(a, b) { return b - a; };

jQuery.fn.getTotalWidth = function(){
	return j$(this).width() + parseInt(j$(this).css('paddingRight')) + parseInt(j$(this).css('paddingLeft')) + parseInt(j$(this).css('borderRightWidth')) + parseInt(j$(this).css('borderLeftWidth'));
};

jQuery.fn.getTotalHeight = function(){
	return j$(this).height() + parseInt(j$(this).css('paddingTop')) + parseInt(j$(this).css('paddingBottom')) + parseInt(j$(this).css('borderTopWidth')) + parseInt(j$(this).css('borderBottomWidth'));
};

function getScrollTop(){
	return self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
};

function getScrollLeft(){
	return self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
};

function getWindowHeight(){
	var de = document.documentElement;
	return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
};

function getWindowWidth(){
	var de = document.documentElement;
	return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
};

/* Utilities to test whether an element will fit in the viewport
	Parameters:
	el = element to position, required
	leftOffset / topOffset = optional parameter if the offset cannot be calculated (i.e., if the object is in the DOM but is set to display: 'none') */
	
function fitHorizontal(el, leftOffset){
	var leftVal = parseInt(leftOffset) || j$(el).offset().left;
	return (leftVal + j$(el).width() <= getWindowWidth() + getScrollLeft() && leftVal - getScrollLeft() >= 0);
};

function fitVertical(el, topOffset){
	var topVal = parseInt(topOffset) || j$(el).offset().top;
	return (topVal + j$(el).height() <= getWindowHeight() + getScrollTop() && topVal - getScrollTop() >= 0);
};

/*-------------------------------------------------------------------- 
 * javascript method: "pxToEm"
 * by:
   Scott Jehl (scott@filamentgroup.com) 
   Maggie Wachs (maggie@filamentgroup.com)
   http://www.filamentgroup.com
 *
 * Copyright (c) 2008 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Description: Extends the native Number and String objects with pxToEm method. pxToEm converts a pixel value to ems depending on inherited font size.  
 * Article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/
 * Demo: http://www.filamentgroup.com/examples/pxToEm/	 	
 *							
 * Options:  	 								
 		scope: string or jQuery selector for font-size scoping
 		reverse: Boolean, true reverses the conversion to em-px
 * Dependencies: jQuery library						  
 * Usage Example: myPixelValue.pxToEm(); or myPixelValue.pxToEm({'scope':'#navigation', reverse: true});
 *
 * Version: 2.0, 08.01.2008 
 * Changelog:
 *		08.02.2007 initial Version 1.0
 *		08.01.2008 - fixed font-size calculation for IE
--------------------------------------------------------------------*/

Number.prototype.pxToEm = String.prototype.pxToEm = function(settings){
	//set defaults
	settings = jQuery.extend({
		scope: 'body',
		reverse: false
	}, settings);
	var pxVal = (this == '') ? 0 : parseFloat(this);
	var scopeVal;
	var getWindowWidth = function(){
		var de = document.documentElement;
		return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
	};	
	
	/* When a percentage-based font-size is set on the body, IE returns that percent of the window width as the font-size. 
		For example, if the body font-size is 62.5% and the window width is 1000px, IE will return 625px as the font-size. 	
		When this happens, we calculate the correct body font-size (%) and multiply it by 16 (the standard browser font size) 
		to get an accurate em value. */
				
	if (settings.scope == 'body' && j$.browser.msie && (parseFloat(j$('body').css('font-size')) / getWindowWidth()).toFixed(1) > 0.0) {
		var calcFontSize = function(){		
			return (parseFloat(j$('body').css('font-size'))/getWindowWidth()).toFixed(3) * 16;
		};
		scopeVal = calcFontSize();
	}
	else { scopeVal = parseFloat(jQuery(settings.scope).css("font-size")); };
			
	var result = (settings.reverse == true) ? (pxVal * scopeVal).toFixed(2) + 'px' : (pxVal / scopeVal).toFixed(2) + 'em';
	return result;
};
