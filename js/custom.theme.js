// Art Theme Js file
var JS_PATH = "js";
(function($){

    "use strict"; 
	
	var themeData                    = [];
	var parallaxImages               = [];
	
	//window
	themeData.win                    = $(window);
	themeData.winHeight              = themeData.win.height();
	themeData.winScrollTop           = themeData.win.scrollTop();
	themeData.winHash                = window.location.hash.replace('#', '');
	themeData.stateObject            = {};
	
	//document
	themeData.doc                    = $(document);
	themeData.docHeight              = themeData.doc.height();

	//ID A~Z
	themeData.backTop                = $('#back-top');
	themeData.footer                 = $('#footer');
	themeData.headerWrap             = $('#header');
	themeData.header                 = $('#header-main');
	themeData.MenuOverPanel          = $('#mobile-panel');
	themeData.MenuOverTrigger        = $('#navi-trigger');
	themeData.jplayer                = $('#jquery_jplayer');
	themeData.logo                   = $('.navi-logo'); 
	themeData.navi                   = $('#navi'); 
	themeData.container              = $('#wrap');
	themeData.WrapOurter             = $('#wrap-outer');
	themeData.searchOpen             = $('.search-top-btn-class');
	themeData.socialHeader           = $('#social-header-out'); 
	themeData.contentWrap            = $('#content_wrap');
	themeData.TopsliderTrggleDown    = $('#ux-slider-down');

	//tag
	themeData.body                   = $('body');
	
	//tag class
	themeData.carousel               = $('.owl-carousel');
	themeData.uxResponsive           = $('body.responsive-ux');
	themeData.pageCover	             = $('.post-cover');
	themeData.audioUnit              = $('.audio-unit');
	themeData.pageLoading            = $('.page-loading'); 
	themeData.lightboxPhotoSwipe     = $('.lightbox-photoswipe');
	themeData.Menu                   = $('.menu');
	themeData.pagenumsDefault        = $('.pagenums-default');
	themeData.searchForm             = $('.search-overlay-form');
	themeData.videoFace              = $('.blog-unit-img-wrap, .archive-item');
	themeData.videoOverlay           = $('.video-overlay'); 
	themeData.listLayout             = $('.list-layout');
	themeData.singleGalleryFilled    = $('.single-gallery-wrap-inn[data-style="filled"]');
	themeData.singleGalleryGoBack    = $('.post-navi-go-back-a');
	themeData.topParallax           = $('.top-parallax'); 
	themeData.themeParallax         = $('.ux-background-parallax .ux-background-img');
	
	//define
	themeData.globalFootHeight       = 0;
	themeData.itemParallax           = [];

	var resizeTimer = null;
	
	//condition
	themeData.isResponsive = function(){
		if(themeData.uxResponsive.length){
			return true;
		}else{
			return false;
		} 
	}
	
	var switchWidth = 767;
	
	
	themeData.isMobile = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || themeData.win.width() < switchWidth){
			return true; 
		}else{
			return false;
		}
	}

	var ios = navigator.userAgent.match(/(iPod|iPhone|iPad)/);

	function art_get_browser(){
	    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
	    if(/trident/i.test(M[1])){
	        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
	        return {name:'IE',version:(tem[1]||'')};
	        }   
	    if(M[1]==='Chrome'){
	        tem=ua.match(/\bOPR\/(\d+)/)
	        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
	        }   
	    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	    return {
	      name: M[0],
	      version: M[1]
	    };
	}

	function art_getOS() {
		var userAgent = window.navigator.userAgent,
		  platform = window.navigator.platform,
		  macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		  iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		  os = null;

		if (macosPlatforms.indexOf(platform) !== -1) {
			os = 'MacOS';
		} else if (iosPlatforms.indexOf(platform) !== -1) {
			os = 'iOS';
		} else if (windowsPlatforms.indexOf(platform) !== -1) {
			os = 'Windows';
		} else if (/Android/.test(userAgent)) {
			os = 'Android';
		} else if (!os && /Linux/.test(platform)) {
			os = 'Linux';
		}

		return os;
	}

	var art_browser = art_get_browser();
	var art_os = art_getOS();

	themeData.body.addClass(art_browser.name + art_browser.version + ' ' + art_os);
	

	//Function 

	// Top slider Triggle Down Click
	themeData.TopsliderTrggleDownFn = function(){

		var _win_real_h = themeData.win.height();

		themeData.TopsliderTrggleDown.on({'touchstart click': function(){ 
			$('html, body').animate({scrollTop:_win_real_h}, 400);
		}});
	}

	//Calc Fullscreen wrap / slider Height  
	themeData.fnFullscreenWrapHeight = function(){ 
		if (!Modernizr.cssvhunit) {
			if($('.fullscreen-wrap').length) {
				$('.fullscreen-wrap').each(function(){
					$(this).css('height',themeData.win.height());
				});
			}
		}
	}

	// Page Cover Activated Scrolled
	themeData.CoverScroll = function(){ 
			if(themeData.pageCover.length) {
				if(themeData.pageCover.hasClass('fullscreen-wrap')) {
					themeData.doc.on('mousewheel DOMMouseScroll MozMousePixelScroll', function (e) {
						if(themeData.win.scrollTop() == 0){
							e.preventDefault();
							var _deltaY = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
							if (_deltaY < 0) {
								 $('html, body').animate({scrollTop:themeData.winHeight}, 300);
							}
						}
					}); 
				}
			} 
		
	}


	// Top slider
	themeData.carouselFn = function(carouselWrap){

		carouselWrap.each(function(){

			var 
			_carousel 	= $(this),
			_margin   	= $(this).data('margin'),
			_center   	= $(this).data('center'),
			_item    	= $(this).data('item'),
			_autoW   	= $(this).data('autowidth'),
			_slideby  	= $(this).data('slideby'),
			_auto    	= $(this).data('auto'),
			_showdot  	= $(this).data('showdot'),
			_shownav  	= $(this).data('nav'),
			_animateIn 	= $(this).data('animatein'),
			_animateOut = $(this).data('animateout'),
			_loop		= $(this).data('loop'),
			_lazyLoad   = $(this).data('lazy');

			
			setTimeout(function(){
				if(_lazyLoad){
					if(themeData.body.hasClass('single-portfolio-fullwidth-slider')){
						_carousel.on('refreshed.owl.carousel', function (e) {
							_carousel.find('.owl-item').each(function(){ 
								if($(this).hasClass('cloned')){
									var data_src = $(this).find('img').data('src');
									$(this).find('img').attr('src', data_src);
								}
							});
						});
					}
				}
				
				_carousel.owlCarousel({
				    margin: _margin,
				    loop: _loop,
				    autoWidth:_autoW,
				    center: _center,
				    animateIn: _animateIn,
				    animateOut: _animateOut,
				    slideSpeed : 300,
		            paginationSpeed : 400,
				    items: _item,
				    autoplay: _auto,
				    responsiveClass:true,
				    navText:["",""],
				    slideBy:_slideby,
				    dots:_showdot, 
				    nav:_shownav,
				    responsive:{
				        0:{
				            items:1,
				            margin:0,
				        }, 
				        481:{
				            items: _item,
				            margin:10
				        }, 
				        769:{
				        	items: _item,
				            margin: _margin
				        }
				    }
				});

				// BM Slider - Text color changed auto based on BGimage(Featured Image)
				if($('.top-slider').length && $('.page_from_top').length) {

					var _default_logo = 'dark-logo'; 

					if(themeData.body.hasClass('light-logo')) {
						_default_logo = 'light-logo';
					}

					_carousel.on('changed.owl.carousel', function(event) {
						var _current_item = event.item.index + 1,
						    _section = _carousel.find('.owl-item:nth-child('+_current_item+')').find('section'),
						    _logo_color = _section.attr('data-color');
							 
						if(_default_logo != _logo_color) {
					  		themeData.body.removeClass(_default_logo).addClass(_logo_color);
					 		_default_logo = _logo_color;
					 	}
					});
				}
				

				if($('#bm-slider-prev').length) {
					$('#bm-slider-prev').on('touchstart click', function() { 
					    _carousel.trigger('prev.owl.carousel', [300]);
					    return false;
					});
				}
				
				if($('#bm-slider-next').length) {
					$('#bm-slider-next').on('touchstart click', function() { 
					    _carousel.trigger('next.owl.carousel', [300]);
					    return false;
					});
				}

				if(themeData.body.hasClass('single-portfolio-fullscreen-slider')){
					_carousel.on('mousewheel DOMMouseScroll', '.owl-stage', function (e) {
						if(themeData.win.scrollTop() == 0){
							e.preventDefault();
							var _deltaY = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
							if (_deltaY > 0) {
								_carousel.trigger('prev.owl');
								
							} else {
								_carousel.trigger('next.owl'); 
							}
						}
					});
				}
				
				if(_lazyLoad){
					_carousel.on('translated.owl.carousel', function(event){
						if(Number(_item) > 1){
							var current_items = $(event.target).find('.owl-item.active, .owl-item.cloned');
							current_items.each(function(){
                                var current_item = $(this);
								var current_item_img = current_item.find('img');
								var current_item_img_bg = current_item_img.attr('data-src');
								
								if(current_item_img_bg){
									current_item_img.addClass('lazy-loaded').attr('src', current_item_img_bg);
									current_item_img.removeAttr('data-src');
								}
                            });
						}else{
							var current_item = $(event.target).find('.owl-item.active');
							var current_item_img = current_item.find('.carousel-img-wrap');
							var current_item_img_bg = current_item_img.attr('data-bg');
							
							if(current_item_img_bg){
								current_item_img.addClass('lazy-loaded').css('background-image', 'url("' +current_item_img_bg+ '")');
								current_item_img.removeAttr('data-bg');
							}
						}
					})
				}

			},10)
				
			

		});
	}

	//Search show
	themeData.fnSerchShow = function(){

		var 
		_search_btn = themeData.searchOpen.find('.fa-search'),
		_search_form = _search_btn.siblings('form'),
		_panel_bottom_right = $('.menu-panel-bottom-right'),
		_panel_wpml = $('.menu-panel-bottom-left .wpml-translation');

		_search_btn.click(function(){

			if(_search_form.hasClass('search_top_form_shown')){
				_search_form.removeClass('search_top_form_shown');
				_search_form.find('.search_top_form_text').blur();
				_panel_bottom_right.css('opacity','1');
				_panel_wpml.css('opacity','1');
			} else {
				_search_form.addClass('search_top_form_shown');
				_search_form.find('.search_top_form_text').focus();
				_panel_bottom_right.css('opacity','0');
				_panel_wpml.css('opacity','0');
			}
			return false;
			 
		});

	}

	//Responsive Mobile Menu function
	themeData.fnResponsiveMenu = function(){ 
						
		if(themeData.win.width() > switchWidth) {
			themeData.body.removeClass('ux-mobile');
		} else {
			themeData.body.addClass('ux-mobile');
		}
		
		themeData.win.resize(function(){
			
			if(themeData.win.width() > switchWidth) {
				themeData.body.removeClass('ux-mobile');
			} else {
				themeData.body.addClass('ux-mobile');
			}

		});

		var $post_logo_color = false;

		if(themeData.body.hasClass('light-logo')){
			$post_logo_color = 'light-logo';
		} else if(themeData.body.hasClass('dark-logo')){
			$post_logo_color = 'dark-logo';
		}  

		themeData.MenuOverTrigger.on('click', function(){

			if(themeData.body.is('.show_mobile_menu')){

				setTimeout(function() {
					if(themeData.body.hasClass('show_mobile_menu')) {
						themeData.body.removeClass('show_mobile_menu');
					}

					setTimeout(function() { 
						themeData.body.addClass($post_logo_color);
					},1000);
					
					if($('#navi-wrap .sub-menu').length) {
						$('#navi-wrap .sub-menu').velocity("transition.fadeOut");
						$('#navi-wrap .sub-menu').siblings('a').css('display','inline-block');
						$('#navi-wrap > ul > li').velocity("transition.fadeIn"); 
					}

				},10);

			}else{

				setTimeout(function() {
					if(!themeData.body.hasClass('show_mobile_menu')) {
						if(themeData.win.scrollTop() > 1){
							$('html, body').animate({scrollTop:0}, 200,function(){
								themeData.body.addClass('show_mobile_menu');
							});
						} else {
							themeData.body.addClass('show_mobile_menu');
						}
					}

					if( $('.navi-show-h').length && !themeData.body.hasClass('ux-mobile') ) {}else{
						setTimeout(function() { 
							if(themeData.body.hasClass('light-logo')){
								themeData.body.removeClass('light-logo');
							}
							if(themeData.body.hasClass('dark-logo')){
								themeData.body.removeClass('dark-logo');
							}
						},1000);
					}
					

				},10); 
			}
			return false;
        });
 		
		
		if(!themeData.body.hasClass('navi-show-h')) {
			window.addEventListener('scroll', function() {

				if(themeData.body.is('.show_mobile_menu')){
					if(themeData.win.scrollTop() > 500){
						setTimeout(function() { 
							themeData.body.addClass($post_logo_color);
						},1000);
						setTimeout(function() {
							themeData.body.removeClass('show_mobile_menu'); 

							if($('#navi-wrap .sub-menu').length) {
								$('#navi-wrap .sub-menu').velocity("transition.fadeOut");
								$('#navi-wrap .sub-menu').siblings('a').css('display','inline-block');
								$('#navi-wrap > ul > li').velocity("transition.fadeIn"); 
							}
						},10);
					}
				} 
	        }, false);
		}
        

		if(themeData.navi.length) {
			themeData.fnSubMenu($('#menu-panel .menu'));
		} 
	
    }
	
	//audio player function
	themeData.fnJplayerCall = function(){
		if(themeData.jplayer.length){
			themeData.jplayer.jPlayer({
				ready: function(){
					$(this).jPlayer("setMedia", {
						mp3:""
					});
				},
				swfPath: JS_PATH,
				supplied: "mp3",
				wmode: "window"
			});
			
			$('.audiobutton').each(function(){
                themeData.fnAudioPlay($(this));
            });
		}
	}
	
	//call player play
	themeData.fnAudioPlay = function(el){
		el.click(function(){
			var thisID = $(this).attr("id");
			if($(this).hasClass('pause')){
				$('.audiobutton').removeClass('play').addClass('pause');
				$(this).removeClass('pause').addClass('play');
				themeData.jplayer.jPlayer("setMedia", {
					mp3: $(this).attr("rel")
				});
				themeData.jplayer.jPlayer("play");
				themeData.jplayer.bind($.jPlayer.event.ended, function(event) {
					$('#'+thisID).removeClass('play').addClass('pause');
				});
			}else if($(this).hasClass('play')){
				$(this).removeClass('play').addClass('pause');
				themeData.jplayer.jPlayer("stop");
			}
		});
	}
	
	//video face
	themeData.fnVideoFace = function(arrayVideo){
		arrayVideo.each(function(){
			var videoFace = [];
			var videoOverlay = [];
			
			videoFace.item = $(this);
			videoFace.playBtn = videoFace.item.find('.blog-unit-video-play');
			videoFace.videoWrap = videoFace.item.find('.video-wrap');
			videoFace.videoIframe = videoFace.videoWrap.find('iframe');
			
			videoOverlay.item = themeData.videoOverlay;
			videoOverlay.videoWrap = videoOverlay.item.find('.video-wrap');
			videoOverlay.close = videoOverlay.item.find('.video-close');
			
			videoFace.playBtn.click(function(){
				var src = videoFace.videoIframe.attr('data-src').replace('autoplay=0', 'autoplay=1');
				videoFace.videoIframe.attr('src', src);
				videoOverlay.close.before(videoFace.videoWrap.removeClass('hidden').attr('style', 'height:100%;padding-bottom:0px;'));
				videoOverlay.item.addClass('video-slidedown'); 
				return false;
			});
			
			videoOverlay.close.click(function(){
				videoOverlay.item.removeClass('video-slidedown');
				videoOverlay.item.find('.video-wrap').remove(); 
				return false;
			});
		});
	}
	
	//Module Load Ajax
	themeData.fnModuleLoad = function(data, container){
		$.post(AJAX_M, {
			'mode': 'module',
			'data': data
		}).done(function(content){ 
			var newElems = $(content); 
			switch(data['mode']){
				case 'pagenums': 
					var this_pagenums = container.find('a[data-post=\"'+data["module_post"]+'\"][data-paged=\"'+data["paged"]+'\"]');
					
					this_pagenums.text(data["paged"]);
					$('html,body').animate({
						scrollTop: container.parent().offset().top - 80
					},
					1000); 
	
					container.parent().find('section').remove();
					container.before(newElems);
				break;
				case 'twitter': 
					var this_twitter = container.find('a[data-post=\"'+data["module_post"]+'\"]');
					var pagination_text = this_twitter.parent('.page_twitter').data('pagetext');
	
					this_twitter.attr('data-paged',Number(data['paged']) + 1).text(pagination_text).removeClass('tw-style-loading');
	
					if(data['paged'] == this_twitter.data('count')){
						this_twitter.fadeOut(300);
						this_twitter.parent('.page_twitter').css('margin-top','0');
					}
	
					container.before(newElems);
				break;
			}
			
			//Fadein theitems of next page 
			newElems.animate({opacity:1}, 1000); 
			
			//gallery
			themeData.gallerycarousel = $('.blog-gallery-carousel');
			if(themeData.gallerycarousel.length){
				themeData.fnGalleryCarousel();
			}
			
			if(newElems.find('.audio_player_list').length){	
	
				//Audio player
				newElems.find('.audiobutton').each(function(){
					themeData.fnAudioPlay($(this));
				});
				themeData.jplayer.jPlayer("stop");
			
			}
			
			//Video play
			if(newElems.find('.blog-unit-video-play').length){
				themeData.fnVideoFace(newElems.find('.blog-unit-img-wrap'));
				themeData.fnVideoFace(newElems.find('.archive-item'));
			}
	
			//gallery list
			if(newElems.find('.Collage').length){
				$('.Collage').imagesLoaded(function(){ 
					$('.Collage').collagePlus({
						'fadeSpeed'     : 2000,
						'targetHeight'  : 200
					});
				});
			}
			
			//call carousel
			if(newElems.find('.owl-carousel').length){
				themeData.carouselFn(newElems.find('.owl-carousel'));
			}
	
		});
	}
	
	//gallery collage
	themeData.fnGalleryCollage = function(collageWrap){
		collageWrap.collagePlus({
			'fadeSpeed'     : 2000,
			'targetHeight'  : 200
		});
	}
	 
	
	//List Layout Height
	themeData.fnListLayoutHeight = function(){
		
		themeData.listLayout.find('.list-layout-col2, .list-layout-col3, .list-layout-col4').each(function(){
			var layoutGetmin = new Array();
			var changeColWidthSum = 0;
			var base = 1;
			var lastWidthSum = 0;
			var colItems = $(this).find('.list-layout-item');
			var colWidth = $(this).width();
			var colCount = colItems.length;
			var colGap = Number(themeData.listLayout.data('gap'));

			colItems.each(function(){
				
				var thisWidth = $(this).width();
				
                layoutGetmin.push(Number($(this).find('img').attr('height')));
				if(colWidth != thisWidth){
					colWidth = colWidth - colGap;
				}
            }); 
			
			var itemHeight = eval("Math.min("+layoutGetmin.toString()+")");
			colItems.each(function(index){
				var imgWidth = parseFloat(Number($(this).find('img').attr('width')));
				var imgHeight = parseFloat(Number($(this).find('img').attr('height')));
				var imgBase = itemHeight / imgHeight;
				
				imgWidth = imgWidth * imgBase;
				imgHeight = itemHeight;
				
				changeColWidthSum = changeColWidthSum + imgWidth;
			});
			
			base = colWidth / changeColWidthSum;
			
			colItems.each(function(){
				var imgWidth = parseFloat(Number($(this).find('img').attr('width')));
				var imgHeight = parseFloat(Number($(this).find('img').attr('height')));
				var imgBase = itemHeight / imgHeight;
				var thisWidth = $(this).width();
				
				imgWidth = (imgWidth * imgBase) * base; 
				imgHeight = itemHeight * base;
				
				if(colWidth != thisWidth){
					$(this).css('width', 'auto');
					
					$(this).find('.lightbox-item').css({
						'width': imgWidth,
						'height': imgHeight,
						'overflow': 'hidden'
					});
					
					$(this).find('img').css({
						'width': '100%',
						'height': 'auto'
					});
					
					lastWidthSum = lastWidthSum + imgWidth;
					if(Math.round(lastWidthSum) > colWidth){
						$(this).find('.lightbox-item').width(imgWidth - (lastWidthSum - colWidth));
					}else if(Math.round(lastWidthSum) == colWidth){
						$(this).find('.lightbox-item').css({
							'width': imgWidth - 0.5
						});
					}
				}else{
					$(this).find('.lightbox-item').css({
						'width': 'auto',
						'height': 'auto',
						'overflow': 'hidden'
					});
				}
			});
		});
	}


	//Sub Menu
	themeData.fnSetMenuLevel = function(index, el){
		if(el){
			el.each(function(i){
				$(this).addClass('level-' +index);
				if($(this).hasClass('menu-item-has-children')){
					themeData.fnSetMenuLevel(index + 1, $(this).find('> .sub-menu > li'));
				}
			});
		}
	}

	themeData.fnSubMenu = function(menu) {
		themeData.NaviWrapMobile = menu;
		themeData.fnSetMenuLevel(1, themeData.NaviWrapMobile.find('> li'));
		
		themeData.NaviWrapMobile.find('li').each(function(index){
			var _this = $(this),
			    _this_link = _this.find('> a');
			
			if(_this.hasClass('menu-item-has-children')){

				_this.find('> .sub-menu').prepend('<li class="menu-item-back"><a href="#" class="menu-item-back-a archive-arrow"><span class="archive-arrow-inn"></span></a></li>');
				_this_link.append('<span class="submenu-icon"></span>');
				
				_this_link.on('click', function(){
					if(themeData.body.hasClass('navi-hide-pop2') && themeData.win.width() > switchWidth) {
						 
					} else {

						themeData.NaviWrapMobile.find('li').velocity("transition.slideLeftOut",200, function() {
						    _this_link.hide();
					        _this_link.next().velocity("transition.slideLeftIn", 100);
					        _this_link.next().children().velocity("transition.slideLeftIn", 100);
					        _this_link.parents('.menu-item').velocity("transition.slideLeftIn", 100);
						    
						});
					}
					return false;
				});
				
				_this.find('> .sub-menu > .menu-item-back > a').on('click', function(){
					var sub_menu = $(this).parent().parent();
					var parent_item = sub_menu.parent();
					var parent_item_link = parent_item.find('> a');
					
					if(parent_item.not('.level-1')){ 
						sub_menu.velocity("transition.fadeOut",1, function(){
							parent_item.parent().children().velocity("transition.slideLeftIn", 300);
							parent_item_link.velocity("transition.fadeIn", 300);
						});
					} 
						
					return false;
				});

			} else {

				_this_link.on('click', function(){

					if(!Modernizr.touchevents){
						if(!$(this).parent().hasClass('current-menu-anchor')){
							themeData.fnPageLoadingEvent($(this));
							return false;
						}
					} else {
						if(!$(this).parent().hasClass('current-menu-anchor')&& !$(this).parent().hasClass('menu-item-has-children')){ 
							themeData.fnPageLoadingEvent($(this));
							return false;
						}
					}
					
				});
			}
			
		});
    	
    };


    // Single Post Scrolled Animation
    themeData.fnSingleAnima = function(){
    	if($('.social-bar').length) {
    		var _social_bar = $('.social-bar');
    		_social_bar.waypoint(function(direction) { 
				if (direction === 'down') { 
					_social_bar.find('.fa').velocity("transition.expandIn", { stagger: 160 }); 
				}
				this.destroy();
			},{
				offset: '95%'
			});
    	}
    }

    // Main Scrolled Animation
	themeData.fnMainAnima = function(){

    	if($('.pagenums .tw-style-a').length) {
    		var _tw_loadmore_btn = $('.pagenums .tw-style-a');
    		_tw_loadmore_btn.waypoint(function(direction) { 
				if (direction === 'down') { 
					_tw_loadmore_btn.velocity("transition.fadeIn"); 
				}
				this.destroy();
			},{
				offset: '95%'
			});
    	}


    	if($('.pagetemplate-social').length) {
    		var _social_bar = $('.pagetemplate-social .socialmeida');
    		_social_bar.waypoint(function(direction) { 
				if (direction === 'down') { 
					_social_bar.find('.socialmeida-a').velocity("transition.expandIn", { stagger: 260 }); 
				}
				this.destroy();
			},{
				offset: '95%'
			});
    	}

    	if(themeData.backTop.length) {

    		themeData.backTop.waypoint(function(direction) {
	    		if(direction === 'down') {
	    			if(!themeData.backTop.hasClass('backtop-shown')) {
					 	themeData.backTop.addClass('backtop-shown');
					}else{

					}
	    		}

	    	},{
	    		offset: '95%'
	    	});

    	}

    }
	
	//Portfolio list
	themeData.fnSingleGalleryList = function(){
		themeData.singleGalleryGoBack.on('click',function(){
			var _back_btn = $(this);
			var singleGalleryListWrap = $('.ux-portfolio-ajaxed-list-wrap');
			var singlePostID = _back_btn.attr('data-postid');
			
			if(_back_btn.hasClass('back-close')){
				_back_btn.removeClass('back-close');
				singleGalleryListWrap.fadeOut();
			}else{
				if(!themeData.body.hasClass('open-nav')){
					themeData.body.addClass('open-nav');
				}	
				_back_btn.addClass('back-close');
				$('#related-wrap-popup-close').on('click', function(){
					_back_btn.removeClass('back-close');
					singleGalleryListWrap.fadeOut();
					if(themeData.body.hasClass('open-nav')){
						themeData.body.removeClass('open-nav');
					}	
					return false;
				});
				if(singleGalleryListWrap.length){
					singleGalleryListWrap.fadeIn();
				}else{
					 
						var singleGalleryBottom = $('#related-wrap-popup');
						var singleGalleryListWrap = $('.ux-portfolio-ajaxed-list-wrap');
						
						setTimeout(function() {
							$(window).lazyLoadXT(); 
						}, 50);
						
						
						singleGalleryListWrap.fadeIn();
						
						
						$('html, body').animate({scrollTop:themeData.singleGalleryGoBack.offset().top - 50}, 400);
					 
				}
			}
			return false;
		});
	};

	//page loading event
	themeData.fnPageLoadingEvent = function(el){
		var _url = el.attr('href');
		if(_url){
			if(themeData.pageLoading.length){ 
				setTimeout(function(){
					themeData.pageLoading.addClass('visible');
				}, 100);
			}
			themeData.body.addClass('ux-start-hide');
			themeData.body.find('#wrap').animate({opacity: 0}, 300);
			setTimeout(function(){
				window.location.href = _url;
			}, 400);
			
		}
	}

	//Functoin Parallax
	themeData.fnThemeParallax = function(){
		
		var theme_parallax = themeData.themeParallax; 
		
		var footer_height = themeData.footer.outerHeight();
		var document_height = themeData.docHeight;
		
		theme_parallax.each(function(){
			var parallaxImage = {};
			parallaxImage.element = $(this);
			parallaxImage.ratio = parallaxImage.element.data('ratio');
			parallaxImage.ratio_speed = 1 + parallaxImage.ratio;
			
			parallaxImage.height = parallaxImage.element.height();
			parallaxImage.width = parallaxImage.element.width();
			
			parallaxImage.maxWidth = parallaxImage.width * 1;
			parallaxImage.halfWidth = parallaxImage.element.width() / 2;
			
			if(themeData.isMobile()){
				parallaxImage.maxHeight = parallaxImage.height;
			}else{
				parallaxImage.maxHeight = parallaxImage.height * parallaxImage.ratio_speed;
			}
			parallaxImage.parent = parallaxImage.element.parent();
			
			parallaxImage.image = parallaxImage.element.find('img');
			parallaxImage.image_height = parallaxImage.image.height();
			parallaxImage.image_width = parallaxImage.image.width();
			
			parallaxImage.offsetTop = parallaxImage.element.offset().top;
			parallaxImage.variable = false;
			
			parallaxImage.xPosition = 0;
			parallaxImage.yPosition = 0;
			parallaxImage.outHeight = 0;
			parallaxImage.outWidth = 0;
			
			//if image height less than parallax height
			if(parallaxImage.image_height <= parallaxImage.maxHeight){
				parallaxImage.image.css({
					'width': 'auto',
					'height': parallaxImage.maxHeight + 'px',
					'max-width': 'inherit'
				});
			}
			
			parallaxImage.outWidth = (parallaxImage.width - parallaxImage.image.width()) / 2;
			parallaxImage.outHeight = (parallaxImage.height - parallaxImage.image.height()) / 2;
			
			parallaxImage.xPosition = parallaxImage.outWidth;
			
			parallaxImages.push(parallaxImage);
			parallaxImage.yPosition = (themeData.winScrollTop - parallaxImage.offsetTop) * (parallaxImage.ratio / 3);
			
			if(!themeData.win.scrollTop() == 0){
				if(!parallaxImage.variable){
					parallaxImage.yPosition = - parallaxImage.yPosition;
				}
			}
			
			themeData.fnSetTranslate3DTransform(parallaxImage.element, parallaxImage.yPosition);
			
		});

	}

	//setTranslate3DTransform
	themeData.fnSetTranslate3DTransform = function(el, yPosition){
		var value = "translate3d(0" + ", " + yPosition + "px" + ", 0)";
		
		el.css({
			'transform': value,
			'msTransform': value,
			'webkitTransform': value,
			'mozTransform': value,
			'oTransform': value,
		});
	}

	//Single Gallery Filled
	themeData.fnSingleGalleryFilled = function(){
		var singleCol2TextWrap = $('.single-col2-text-wrap');
		var singleCol2GalleryWrap = $('.single-col2-gallery-wrap');
		var singleCol2GalleryWrapLeft = singleCol2GalleryWrap.css('padding-left');
		var singleCol2GalleryWrapRight = singleCol2GalleryWrap.css('padding-right');
		var singleGalleryWrapInn = $('.single-gallery-wrap-inn');
		var singleArticle = themeData.contentWrap.find('> article');
		var singleArticleLeft = singleArticle.css('padding-left');
		var singleArticleRight = singleArticle.css('padding-right');
		if(singleArticle.hasClass('container')){
			var singleArticleLeft = singleArticle.css('margin-left');
			var singleArticleRight = singleArticle.css('margin-right');
		}
		
		if(singleCol2TextWrap.is('.pull-right')){
			$('.single-gallery-wrap-inn').css('margin-left', '0px').velocity({ opacity : 1 });
			var singleGalleryLeft = Number(singleArticleLeft.replace('px', '')) + Number(singleCol2GalleryWrapLeft.replace('px', ''));
			singleGalleryWrapInn.css({
				'margin-left': '-' + singleGalleryLeft + 'px'
			});
		}else{
			$('.single-gallery-wrap-inn').css('margin-right', '0px').velocity({ opacity : 1 });
			var singleGalleryRight = Number(singleArticleRight.replace('px', '')) + Number(singleCol2GalleryWrapRight.replace('px', ''));
			singleGalleryWrapInn.css({
				'margin-right': '-' + singleGalleryRight + 'px'
			});
			
		}
		
		themeData.fnListLayoutHeight();
	}


	//Portfolio fix hover on touch screen
	themeData.fnPofrtoliloFixHover = function(item){
		item.each(function(){
			var _this = $(this),
			_this_url = _this.find('.grid-item-mask-link').attr('href'); 
			if(Modernizr.touchevents && _this.hasClass('bm-touch-tab')){
				_this.on('click', function(){
					if(!_this.find('.grid-item-con').hasClass('bm-hover')){
						_this.find('.grid-item-con').addClass('bm-hover');
						if(_this.parent('.grid-item').length){
							_this.parent('.grid-item').siblings().find('.grid-item-con').removeClass('bm-hover'); 
						}
						if(_this.parents('.grid-stack-item').length){ 
							_this.parents('.grid-stack-item').siblings().find('.grid-item-con').removeClass('bm-hover'); 
						}
					}else{
						_this.find('.grid-item-con').removeClass('bm-hover');
							if(themeData.pageLoading.length){ 
								themeData.fnPageLoadingEvent(_this.find('.grid-item-mask-link'));
							} else {
								setTimeout(function(){
									window.location.href = _this_url;
								}, 10);
							}
					} 
					return false;
				});
			}
		});
	}

	//Document ready
	themeData.doc.ready(function(){

		//Top slider 1st image logo color
		if($('.top-slider').length && $('.page_from_top').length) {

			var _default_logo = 'dark-logo',
			_first_logo =  $('.top-slider .owl-carousel').find('.item:first-child').data('color'); 

			if(themeData.body.hasClass('light-logo')) {
				_default_logo = 'light-logo';
			}

			if(_default_logo != _first_logo) {
				_default_logo = _first_logo;
				themeData.body.removeClass(_default_logo).addClass(_first_logo);
				 
			}
		}

		// Slider template in gallery post, forse scroll or owl will be a right gap
		if(themeData.body.hasClass('single-portfolio-fullwidth-slider')){
			$('html').css('overflow-y','scroll');
		}

		//Justified menu
		if($('.ux-justified-menu').length) {
			$('.navi-logo').insertBefore($('.ux-justified-menu .menu>li:first-child'));
			if($('.header-portfolio-icon').length) {
				$('.ux-justified-menu .menu').append($('.header-portfolio-icon'));
			} else {
				if($('#woocomerce-cart-side').length) {
					$('.ux-justified-menu .menu').append($('#woocomerce-cart-side'));
				}
			}
			setTimeout(function(){
				if(!themeData.headerWrap.hasClass('ux-justified-menu-shown')) {
					themeData.headerWrap.addClass('ux-justified-menu-shown');
				}
			},100)
		}

		//call menu
		if(themeData.isResponsive()){
			themeData.win.find('img').imagesLoaded(function(){ 
				themeData.fnResponsiveMenu();
			}); 
		} 

		// Run Single Scroll Animation
		themeData.fnSingleAnima();

		if($('.pagenums').length) {
			$('.pagenums').each(function(){
				if ($(this).is(':empty')){
					$(this).hide();
				}
			});
		}
		
		themeData.fnFullscreenWrapHeight();
		$(window).bind('resize', themeData.fnFullscreenWrapHeight);

		
		//Pagenumber re-layout
		if(themeData.pagenumsDefault.length) {
			themeData.pagenumsDefault.each(function(){
				if($(this).find('.prev').length && $(this).find('.next').length){
					$(this).find('.next').after($(this).find('.prev'));
				}
			});
		}
		
		//Call audio player
		themeData.fnJplayerCall();

		//call video popup
		if(themeData.videoFace.length){
			themeData.fnVideoFace(themeData.videoFace);
		}
		
		//call portfolio list
		if(themeData.singleGalleryGoBack.length){
			themeData.fnSingleGalleryList();
		}

		//Page Loading
		if(themeData.pageLoading.length) {

			//Logo
			$('#logo a,.carousel-des-wrap-tit-a').click(function(){
				themeData.fnPageLoadingEvent($(this));
				return false;
			});

			//Navi, WPML 
			$('#navi li:not(.menu-item-has-children) a,#navi-header li:not(.menu-item-has-children) a,.ux-justified-menu li:not(.menu-item-has-children) a,.wpml-language-flags a,.ux-woocomerce-cart-a').on('click', function(){
				if(themeData.body.hasClass('show_mobile_menu')) {
					themeData.body.removeClass('show_mobile_menu')
				}
				if(!$(this).attr('target')=='_blank') {
					themeData.fnPageLoadingEvent($(this));
					return false;
				}
			});
			
			//blog, post 
			$('.grid-item-mask-link:not(.lightbox-item),.grid-item-tit-a, .title-wrap a, .page-numbers,.archive-item a,.arrow-item,.article-meta-unit a,.blog-unit-more-a').on('click', function(){
				if(!$(this).attr('target')=='_blank') {
					themeData.fnPageLoadingEvent($(this));
					return false;
				}
			});
		
			//sidebar widget
			$('.widget_archive a, .widget_recent_entries a, .widget_search a, .widget_pages a, .widget_nav_menu a, .widget_tag_cloud a, .widget_calendar a, .widget_text a, .widget_meta a, .widget_categories a, .widget_recent_comments a, .widget_tag_cloud a').on('click', function(){
				if(!$(this).attr('target')=='_blank') {
					themeData.fnPageLoadingEvent($(this));
					return false;
				}
			});
		}
		

	});
	
	//win load
	themeData.win.load(function(){

		//Call Gallery list layout
		if(themeData.listLayout.length && !themeData.singleGalleryFilled.length) {
			themeData.fnListLayoutHeight();
			themeData.win.bind('resize', themeData.fnListLayoutHeight);
		}

		//Call Gallery 2col filled layout
		if(themeData.singleGalleryFilled.length) {
			themeData.fnSingleGalleryFilled();
		}
		
		//Call Sticky sidebar in gallery post
		if($(".sticky_column").length && !themeData.isMobile()) {
			$('.sticky_column').stick_in_parent();
		}

		setTimeout(function(){
			themeData.pageLoading.removeClass('visible'); 
		},10);	

		themeData.body.removeClass('preload');
		
		themeData.body.removeClass('ux-start-hide');

		//Call down button in gallery post
		if(themeData.TopsliderTrggleDown.length){
			themeData.TopsliderTrggleDownFn();
		}

		//Call Lightbox 
		if(themeData.lightboxPhotoSwipe.length && themeData.body.hasClass('single-ux-portfolio')){
			fnInitPhotoSwipeFromDOM('.lightbox-photoswipe');
		}

		//Call top silder
		if(themeData.carousel.length) {
			themeData.carouselFn(themeData.carousel);
		}

		// Back top 
		if(themeData.backTop.length){
			themeData.backTop.on({'touchstart click': function(){ 
				$('html, body').animate({scrollTop:0}, 1200);
			}});
		}

		//Call Search
		if(themeData.searchOpen.length){
			themeData.fnSerchShow();
		} 
		

		themeData.CoverScroll();

		if(themeData.themeParallax.length){
			themeData.win.find('img').imagesLoaded(function(){
				themeData.fnThemeParallax();
			});
		}
		
		// Run Main  Scroll Animation
		themeData.fnMainAnima();

		// call Portfolio fix hover on touch screen
		if($('.bm-touch-tab').length) {
			themeData.fnPofrtoliloFixHover($('.bm-touch-tab'));
		}
		
	});


	window.onpageshow = function(event) {
	    if (event.persisted) {
	        window.location.reload() 
	    }
	};

	//win scroll
	themeData.win.scroll(function(){
		if(!themeData.isMobile()) {
			themeData.winScrollTop = themeData.win.scrollTop();
			
			$.each(parallaxImages, function(index, parallaxImage){
				parallaxImage.yPosition = (themeData.winScrollTop - parallaxImage.offsetTop) * (parallaxImage.ratio / 3);
				if(parallaxImage.variable){
					parallaxImage.yPosition = - 1 * parallaxImage.yPosition;
				}
				themeData.fnSetTranslate3DTransform(parallaxImage.element, parallaxImage.yPosition);
			});
		} 
	});
	
})(jQuery); 


/* call LazyloadXT */
jQuery.extend(jQuery.lazyLoadXT, {
	edgeY:  200 
}); 


function fnInitPhotoSwipeFromDOM(gallerySelector){
    var parseThumbnailElements = function(el){
		var thumbElements = jQuery(el).find('[data-lightbox=\"true\"]'),
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			type,
			item;

		for(var i = 0; i < numNodes; i++){

			figureEl = thumbElements[i]; // <figure> element

			// include only element nodes 
			if(figureEl.nodeType !== 1){
				continue;
			}

			//linkEl = figureEl.children[0]; // <a> element
			linkEl = jQuery(figureEl).find('.lightbox-item');

			size = linkEl.attr('data-size').split('x');
			type = linkEl.attr('data-type');

			// create slide object
			if(type == 'video'){
				item = {
					html: linkEl.find('> div').html()
				}
			}else{
				item = {
					src: linkEl.attr('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};
			}

			if(figureEl.children.length > 0){
				// <figcaption> content
				item.title = linkEl.attr('title'); 
			}

			if(linkEl.find('img').length > 0){
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.find('img').attr('src');
			} 

			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}

		return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn){
		return el && (fn(el) ? el : closest(el.parentNode, fn));
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function(e){
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var eTarget = e.target || e.srcElement;

		// find root element of slide
		var clickedListItem = closest(eTarget, function(el){
			if(el.tagName){
				return (el.hasAttribute('data-lightbox') && el.getAttribute('data-lightbox') === 'true'); 
			}
		});

		if(!clickedListItem){
			if(e.target.nodeName == 'A'){
				return window.location.href = e.target.href;
			}
			return;
		}

		// find index of clicked item by looping through all child nodes
		// alternatively, you may define index via data- attribute
		var clickedGallery = jQuery(clickedListItem).parents('.lightbox-photoswipe'),
			childNodes = clickedGallery.find('[data-lightbox=\"true\"]'),
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

		for (var i = 0; i < numChildNodes; i++){
			if(childNodes[i].nodeType !== 1){ 
				continue; 
			}

			if(childNodes[i] === clickedListItem){
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}
		
		if(index >= 0){
			// open PhotoSwipe if valid index found
			openPhotoSwipe(index, clickedGallery[0]);
		}
		
		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function(){
		var hash = window.location.hash.substring(1),
		params = {};

		if(hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if(!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');  
			if(pair.length < 2) {
				continue;
			}           
			params[pair[0]] = pair[1];
		}

		if(params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		if(!params.hasOwnProperty('pid')) {
			return params;
		}
		params.pid = parseInt(params.pid, 10);
		return params;
	};

	var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL){
		var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery,
			options,
			items;

		items = parseThumbnailElements(galleryElement);

		// define options (if needed)
		options = {
			index: index,

			// define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			showHideOpacity:true,

			getThumbBoundsFn: function(index) {
				// See Options -> getThumbBoundsFn section of documentation for more info
				var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect(); 

				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			},
			
			addCaptionHTMLFn: function(item, captionEl, isFake) {
				if(!item.title) {
					captionEl.children[0].innerText = '';
					return false;
				}
				captionEl.children[0].innerHTML = item.title;
				return true;
			},
			
			getImageURLForShare: function( shareButtonData ) { 
				return items[index].src || '';
			},
			
			getPageURLForShare: function( shareButtonData ) {
				return items[index].src || '';
			},
			
			getTextForShare: function( shareButtonData ) {
				return items[index].title || '';
			},
			
			// Parse output of share links
			parseShareButtonOut: function(shareButtonData, shareButtonOut) { 
				return shareButtonOut;
			}
		};
        
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        var radios = document.getElementsByName('gallery-style');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                if(radios[i].id == 'radio-all-controls') {

                } else if(radios[i].id == 'radio-minimal-black') {
                    options.mainClass = 'pswp--minimal--dark';
                    options.barsSize = {top:0,bottom:0};
                    options.captionEl = false;
                    options.fullscreenEl = false;
                    options.shareEl = false;
                    options.bgOpacity = 0.85;
                    options.tapToClose = true;
                    options.tapToToggleControls = false;
                }
                break;
            }
        }

		if(disableAnimation) {
			options.showAnimationDuration = 0;
		}

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
		gallery.listen('beforeChange', function() {
	      var currItem = jQuery(gallery.currItem.container);
	      jQuery('.videoWrapper iframe').removeClass('active');
	      var currItemIframe = currItem.find('.videoWrapper iframe').addClass('active');
	      jQuery('.videoWrapper iframe').each(function() {
	        if (!jQuery(this).hasClass('active')) {
	          jQuery(this).attr('src', jQuery(this).attr('src'));
	        }
	      });
	    });

	    gallery.listen('close', function() {
	      jQuery('.videoWrapper iframe').each(function() {
	        jQuery(this).attr('src', jQuery(this).attr('src'));
	      });
	    }); 
	};

	// loop through all gallery elements and bind events
	var galleryElements = document.querySelectorAll(gallerySelector);
	
	for(var i = 0, l = galleryElements.length; i < l; i++){
		galleryElements[i].setAttribute('data-pswp-uid', i+1);
		galleryElements[i].onclick = onThumbnailsClick;
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if(hashData.pid > 0 && hashData.gid > 0) {
		openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true, true );
	}
}