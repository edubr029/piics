(function($){

    "use strict";
	
	var UxCBModules                = [];
	
	//window
	UxCBModules.win                = $(window);
	UxCBModules.winHeight          = UxCBModules.win.height();
	UxCBModules.winScrollTop       = UxCBModules.win.scrollTop();
	
	//document
	UxCBModules.doc                = $(document);
	
	//selector
	UxCBModules.body               = $('body');
	UxCBModules.html               = $('html');
	UxCBModules.module             = $('.module');
	UxCBModules.moduleHasAnimation = $('.module.moudle_has_animation');
	UxCBModules.isotope            = UxCBModules.module.find('.container-masonry');
	UxCBModules.photoSwipe         = $('.lightbox-photoswipe');
	UxCBModules.gridStack          = UxCBModules.module.find('.grid-stack');
	UxCBModules.contactform        = UxCBModules.module.find('.contact_form');
	UxCBModules.videoFace          = UxCBModules.module.find('.embed-wrap-has-cover');
	UxCBModules.moduleGoogleMap    = UxCBModules.module.find('.module-map-canvas');
	
	UxCBModules.itemQueue          = [];
	UxCBModules.itemDelay          = 150;
	UxCBModules.queueTimer;
	UxCBModules.moduleIsotope      = [];
	
	//condition
	UxCBModules.isMobile = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || UxCBModules.win.width() < 769){
			return true; 
		}else{
			return false;
		}
	}
	
	//List Item Queue
	UxCBModules.fnListItemQueue = function() {
		if (UxCBModules.queueTimer) return  
		UxCBModules.queueTimer = window.setInterval(function () {
			if (UxCBModules.itemQueue.length) {
				var moudleHasAnimation = $(UxCBModules.itemQueue).parents('.moudle_has_animation');
				
				if(moudleHasAnimation.length){
					var animationScroll = moudleHasAnimation.find('.animation-scroll-ux');
					UxCBModules.fnModuleAnimationScroll(animationScroll, moudleHasAnimation);
				}else{
					$(UxCBModules.itemQueue.shift()).addClass('grid-show');
				}
				
				UxCBModules.fnListItemQueue();
			}
			else {
				window.clearInterval(UxCBModules.queueTimer);
				UxCBModules.queueTimer = null;
			}
		}, UxCBModules.itemDelay);
	}
	
	//Grid Stack Init Size
	UxCBModules.fnGridStackInitSize = function(items){
		items.each(function(){
			var gs_x = Number($(this).attr('data-gs-x'));
			var gs_y = Number($(this).attr('data-gs-y'));
			var gs_width = Number($(this).attr('data-gs-width'));
			var gs_height = Number($(this).attr('data-gs-height'));
			
			$(this).attr({
				'data-o-x': gs_x,
				'data-o-y': gs_y,
				'data-o-width': gs_width,
				'data-o-height': gs_height
			});
		});
	}
	
	//Grid Stack Resize
    UxCBModules.fnGridStackResize = function(gridStack){
		var gridStackWidth = gridStack.width(); 
		var gridStackSpacing = gridStack.data('spacing');
		var gridStackColWidth = (gridStackWidth + gridStackSpacing) / 12;
		var gridStackOffsetTop = gridStack.offset().top;
		var gridOffsetTop = [];
		
		gridStack.find('.grid-stack-item').each(function(){
			var gs_x = Number($(this).attr('data-gs-x'));
			var gs_y = Number($(this).attr('data-gs-y'));
			var gs_width = Number($(this).attr('data-gs-width'));
			var gs_height = Number($(this).attr('data-gs-height'));
			
			var set_height = gridStackColWidth * gs_height;
			var set_top = gridStackColWidth * gs_y;
			
			var gs_content = $(this).find('.grid-stack-item-content');
			var gs_brick_content = $(this).find('.brick-content');
			
			$(this).css({
				width: gridStackColWidth * gs_width + 'px',
				height: set_height + 'px',
				left: gridStackColWidth * gs_x + 'px',
				top: set_top + 'px'
			});
			if(gridStackSpacing > 0) {
				gs_content.css({
					left: gridStackSpacing * 0.5 + 'px',
					right: gridStackSpacing * 0.5 + 'px',
					top: gridStackSpacing * 0.5 + 'px',
					bottom: gridStackSpacing * 0.5 + 'px'
				});
			} else {
				gs_content.css({
					left: '0px',
					right: '0px',
					top: '0px',
					bottom: '-1px'
				});
			}
			
			
			if(gs_content.height() > 0 && gs_content.width() > 0){
				gs_brick_content.css('padding-top', (gs_content.height() / gs_content.width()) * 100 + '%');
			}
			
			gridOffsetTop.push(set_top + $(this).height());
			 
		});
		
		var gridStackHeight = Math.max.apply(Math,gridOffsetTop);
		gridStack.height(gridStackHeight);
		
		
		if(UxCBModules.win.width() <= 768){
			gridStack.addClass('grid-stack-one-column-mode');
		}else{
			gridStack.removeClass('grid-stack-one-column-mode');
		}
	}

	UxCBModules.fnContactForm = function(){
		UxCBModules.contactform.each(function(){
			
			var form = $(this),
				formMessage = form.find('input[type=\"hidden\"].info-tip').data('message'),
				formSending = form.find('input[type=\"hidden\"].info-tip').data('sending'),
				formErrorTip = form.find('input[type=\"hidden\"].info-tip').data('error'),
				formVerifyWrap = form.find('.verify-wrap');
				
				form.submit(function() {
					var hasError = false;
					
					form.find('.requiredField').each(function(){
						if($.trim($(this).val()) == '' || $.trim($(this).val()) == 'Name*' || $.trim($(this).val()) == 'Email*' || $.trim($(this).val()) == 'Required' || $.trim($(this).val()) == 'Invalid email'){
						
							$(this).attr("value", "Required");
							hasError = true;
							
						}else if($(this).hasClass('email')){
							var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
							
							if(!emailReg.test($.trim($(this).val()))){
								$(this).attr("value", "Invalid email");
								hasError = true;
							}
						
						}

					});

					//After verification, print some infos. 
					if(!hasError){	
						if(form.hasClass('single-feild')){
							form.find('#idi_send').val(formSending).attr('disabled','disabled');
						}else{	
							form.find('#idi_send').fadeOut('normal', function(){
								form.append('<p class="sending">' + formSending + '</p>');
							});
						}
						var formInput = form.serialize();
						
						$.post(form.attr('action'), formInput, function(data){
							form.slideUp("fast", function() {
								if(form.hasClass('single-feild')){
									form.before('<p class="success" style=" text-align:center">' + formMessage + '</p>');
								}else{
									form.before('<p class="success">' + formMessage + '</p>');
									form.find('.sending').fadeOut();
								}
							});
						});
					}
					
					return false;
				});
				
		});//End each
	}
	
	//Isotope List Resize
	UxCBModules.fnIsotopeListResize = function(_this_wrap){
		var winWidth   = window.innerWidth,
			ListWidth  = _this_wrap.find('.masonry-list').width(),
			GridSpacer = _this_wrap.data('spacer'),
			columnNumb = _this_wrap.data('col'),
			GridWith   = Math.floor(ListWidth / columnNumb),
			GridRatio  = _this_wrap.data('ratio'),
			GridText   = _this_wrap.data('text');  

		if (winWidth >= 768) { 

			_this_wrap.find('.masonry-list').find('.grid-item').each(function () { 
				$('.grid-item').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * GridRatio - GridSpacer + GridText + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * GridRatio - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				);
			});

		} else {
			
			GridWith = Math.floor(ListWidth / 1);

			_this_wrap.find('.masonry-list').find('.grid-item.grid-item-small').each(function () { 
				$('.grid-item').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * GridRatio - GridSpacer + GridText + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * GridRatio - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				);
			});	
		}
	}
	
	//module infiniti scroll
	UxCBModules.fnModuleInfinitiScroll = function(module){
		var moduleParents = module.find('.container-masonry');
		var moduleMasonryList = moduleParents.find('.masonry-list');
		var moduleUnique = moduleMasonryList.data('unique');
		
		var waypoints = moduleMasonryList.find('section:last').waypoint({
			handler: function(direction){
				var postID = moduleMasonryList.attr('data-postid');
				var postFound = 0;
				var catID = 0;
				var post__not_in = [];
				var filters = module.find('.filters');
				var moduleIsotope = UxCBModules.moduleIsotope[moduleUnique];
			
				if(moduleParents.hasClass('container-masonry')){
					postFound = Number(moduleParents.attr('data-found'));
				}
		
				moduleMasonryList.find('section').each(function(){
					var section_postid = $(this).attr('data-postid');
					
					if(filters.length){
						var filterActive = filters.find('li.active');
						var filterValue = filterActive.find('> a').attr('data-filter');
						var postCount = Number(filterActive.find('.filter-num').text());
						
						if(filterValue == '*'){
							post__not_in.push(section_postid);
						}else{
							catID = filterActive.find('> a').attr('data-catid');
							if($(this).is(filterValue)){
								post__not_in.push(section_postid);
							}
						}
					}else{
						post__not_in.push(section_postid);
					}
				});
				
				if(!moduleMasonryList.hasClass('infiniti-scrolling')){
					moduleMasonryList.addClass('infiniti-scrolling'); 
					
					$.post(ajaxurl, {
						'action': 'ux_cb_module_grid_container',
						'catID': catID,
						'postID': postID,
						'post__not_in': post__not_in,
						'moduleUnique': moduleUnique
					}).done(function(result){ 
						console.log($(result))
						var content = $(result); 
						moduleIsotope.isotope('insert', content); 
						if(moduleMasonryList.hasClass('masonry-grid')) {
							UxCBModules.fnIsotopeListResize(moduleParents);
							moduleIsotope.isotope('layout'); 
						}
						
						var thisPostCount = moduleMasonryList.find('section').length;
						if(filters.length){
							var filterActive = filters.find('li.active');
							var filterValue = filterActive.find('> a').attr('data-filter');
							var postCount = Number(filterActive.find('.filter-num').text());
							if(filterValue != '*'){
								thisPostCount = moduleIsotope.find('section' +filterValue).length;
								postFound = postCount;
							}
						}
						
						if(thisPostCount < postFound){
							moduleMasonryList.removeClass('infiniti-scrolling');
						}
						
						UxCBModules.fnModuleInfinitiScroll(module);
						
						setTimeout(function() {
							$(window).lazyLoadXT();
							if(content.find('.grid-item-mask-link').length) {
								content.find('.grid-item-mask-link').removeAttr('title');
							}
						}, 100);
					});
				}
			},
			offset: 'bottom-in-view'
		});
	}
	
	//module loadmore
	UxCBModules.fnModuleLoadmore = function(module){
		var loadMore = module.find('.page_twitter');
		var loadMoreClick = loadMore.find('> a');
		var moduleParents = module.find('.container-masonry');
		var moduleMasonryList = moduleParents.find('.masonry-list');
		var moduleUnique = moduleMasonryList.data('unique');
		
		loadMoreClick.click(function(){
			var postID = $(this).attr('data-postid');
			var pagedMAX = Number($(this).attr('data-max'));
			var paged = Number($(this).attr('data-paged'));
			var pageText = loadMore.attr('data-pagetext');
			var pageLoadingText = loadMore.attr('data-loadingtext');
			var postFound = 0;
			var catID = 0;
			var post__not_in = [];
			var filters = module.find('.filters');
			var moduleIsotope = UxCBModules.moduleIsotope[moduleUnique];
			
			if(moduleParents.hasClass('container-masonry')){
				postFound = Number(moduleParents.attr('data-found'));
			}
			
			moduleMasonryList.find('section').each(function(){
				var section_postid = $(this).attr('data-postid');
				
				if(filters.length){
					var filterActive = filters.find('li.active');
					var filterValue = filterActive.find('> a').attr('data-filter');
					var postCount = Number(filterActive.find('.filter-num').text());
					
					if(filterValue == '*'){
						post__not_in.push(section_postid);
					}else{
						catID = filterActive.find('> a').attr('data-catid');
						if($(this).is(filterValue)){
							post__not_in.push(section_postid);
						}
					}
				}else{
					post__not_in.push(section_postid);
				}
			});
			
			loadMoreClick.text(pageLoadingText);
	
			if(!moduleMasonryList.hasClass('loading-more')){
				moduleMasonryList.addClass('loading-more');
				$.post(ajaxurl, {
					'action': 'ux_cb_module_grid_container',
					'catID': catID,
					'postID': postID,
					'post__not_in': post__not_in,
					'moduleUnique': moduleUnique
				}).done(function(result){
					var content = $(result);
					moduleIsotope.isotope('insert', content);
					if(moduleMasonryList.hasClass('masonry-grid')) {
						UxCBModules.fnIsotopeListResize(moduleParents);
						moduleIsotope.isotope('layout');
					}
					
					loadMoreClick.text(pageText);
					moduleMasonryList.removeClass('loading-more');
					
					var thisPostCount = moduleMasonryList.find('section').length;
					if(filters.length){
						var filterActive = filters.find('li.active');
						var filterValue = filterActive.find('> a').attr('data-filter');
						var postCount = Number(filterActive.find('.filter-num').text());
						if(filterValue != '*'){
							thisPostCount = moduleIsotope.find('section' +filterValue).length;
							postFound = postCount;
						}
					}
					
					if(thisPostCount >= postFound){
						loadMore.hide();
					}else{
						loadMore.show();
					}
					
					setTimeout(function() {
						$(window).lazyLoadXT(); 
						
						if(content.find('.grid-item-inside').length){
							content.find('.grid-item-inside').each(function(){
								UxCBModules.itemQueue.push($(this));
								UxCBModules.fnListItemQueue();
							});
						}
						if(content.find('.grid-item-mask-link').length) {
							content.find('.grid-item-mask-link').removeAttr('title');
						}
					}, 10);
				});
			}
			
			return false;
		});
	}
	
	//module filter
	UxCBModules.fnModuleFilters = function(module){
		var filters = module.find('.filters [data-filter]');
		var moduleParents = module.find('.container-masonry');
		var moduleMasonryList = moduleParents.find('.masonry-list');
		var moduleUnique = moduleMasonryList.data('unique');
		//var moduleMod = moduleParents.attr('data-mod');
		
		if(filters.length){
			filters.each(function(){
				var filter = $(this);
				
				filter.click(function(){
					var filterValue = $(this).attr('data-filter');
					var postID = $(this).attr('data-postid');
					var postCount = Number($(this).find('.filter-num').text());
					var postFound = 0;
					var postNumber = 0;
					var post__not_in = [];
					var catID = 0;
					
					if(moduleParents.hasClass('container-masonry')){
						postFound = Number(moduleParents.attr('data-found'));
						postNumber = Number(moduleParents.attr('data-number'));
					}
					
					if(moduleMasonryList.hasClass('infiniti-scroll')){
						moduleMasonryList.addClass('infiniti-scrolling');
					}
					
					var moduleIsotope = UxCBModules.moduleIsotope[moduleUnique];
					moduleIsotope.isotope({ filter: filterValue }); 
					module.find('.filters').find('li').removeClass('active');
					$(this).parent().addClass('active');
					
					if(filterValue != '*'){
						catID = $(this).attr('data-catid');
						postFound = postCount;
					}
					
					moduleMasonryList.find('section').each(function(){
						var section_postid = $(this).attr('data-postid');
						
						if(filterValue == '*'){
							post__not_in.push(section_postid);
						}else{
							if($(this).is(filterValue)){
								post__not_in.push(section_postid);
								if(!$(this).find('.ux-lazyload-img').hasClass('lazy-loaded')){
									$(this).find('.ux-lazyload-img').addClass('lazy-loaded');
									$(this).find('.ux-lazyload-img').attr('src', $(this).find('.ux-lazyload-img').attr('data-src'));
								}
								if($(this).find('.ux-lazyload-bgimg.ux-background-img-1st[data-bg]').length){
									$(this).find('.ux-lazyload-bgimg.ux-background-img-1st').attr('style', 'background-image: url(' +$(this).find('.ux-lazyload-bgimg.ux-background-img-1st').data('bg')+ ');');
								}
								UxCBModules.itemQueue.push($(this).find('.grid-item-inside'));
								UxCBModules.fnListItemQueue();
							}
						}
					});
					
					var isotopeLoadMore = moduleParents.find('.page_twitter');
					if(post__not_in.length >= postFound){
						isotopeLoadMore.hide();
					}else{
						isotopeLoadMore.show();
					}
					
					if((post__not_in.length < postNumber) && (filterValue != '*')){
						var thisPostNumber = postNumber - post__not_in.length;
						
						$.post(ajaxurl, {
							'action': 'ux_cb_module_grid_container',
							'catID': catID,
							'postID': postID,
							'post__not_in': post__not_in,
							'postNumber': thisPostNumber,
							'moduleUnique': moduleUnique
						}).done(function(result){
							var content = $(result);
							moduleIsotope.isotope('insert', content);
							if(moduleMasonryList.hasClass('masonry-grid')) {
								UxCBModules.fnIsotopeListResize(moduleParents);
								moduleIsotope.isotope('layout');
							}
							
							if(moduleMasonryList.hasClass('infiniti-scroll')){
								moduleMasonryList.removeClass('infiniti-scrolling');
							}else{
								var thisPostCount = moduleMasonryList.find('section' +filterValue).length;
								if(thisPostCount >= postFound){
									isotopeLoadMore.hide();
								}else{
									isotopeLoadMore.show();
								}
							}
							
							setTimeout(function() {
								$(window).lazyLoadXT(); 
								if(content.find('.grid-item-inside').length){
									content.find('.grid-item-inside').each(function(){
										UxCBModules.itemQueue.push($(this).find('.grid-item-inside'));
										UxCBModules.fnListItemQueue();
									});
								}
								if(content.find('.grid-item-mask-link').length) {
									content.find('.grid-item-mask-link').removeAttr('title');
								}
							}, 10);
						});
					}else{
						moduleMasonryList.removeClass('infiniti-scrolling');
					}
					
					return false;
				});
				
			});
		}
	}

	UxCBModules.fnModuleVideoCover = function(arrayVideo){
		arrayVideo.each(function(){

			var videoFace = [];
			videoFace.item = $(this);
			videoFace.playBtn = videoFace.item.find('.video-play-btn');
			videoFace.videoIframe = videoFace.item.find('iframe');
			videoFace.playBtn.on('click',function(){
				console.log(videoFace.videoIframe);
				videoFace.item.find('.embed-video-cover').css('display','none');
				var src = videoFace.videoIframe.attr('src').replace('autoplay=0', 'autoplay=1');
				videoFace.videoIframe.attr('src', src); 
				return false;
			});
		});

	}
	
	//module animation scroll
	UxCBModules.fnModuleAnimationScroll = function(animationScroll, animationWrap){
		if(animationScroll.length){
			animationScroll.each(function(index){
				var animationItem = [];
				
				animationItem.item = $(this);
				animationItem.classB = animationItem.item.data('animationend');
				
				animationItem.item.waypoint(function(){
					animationWrap.css({'opacity': 1});
					animationItem.item.css('transform', null);
					setInterval(function(){
						animationItem.item.css({'opacity': 1});
						if(!animationItem.item.hasClass(animationItem.classB)){
							animationItem.item.addClass(animationItem.classB);
						}
						setTimeout(function(){
							animationItem.item.removeClass('animation-default-ux').removeClass('animation-scroll-ux');
						}, 1500);
					}, index * 150);
				}, {
					offset: '110%',
					triggerOnce: true
				});
			});
		}
	}

	//GoogleMap initialize
	UxCBModules.fnMapInit = function(gm){
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(gm.l, gm.r);
		var dismouse = gm.dismouse == 't' ? true : false;
		var markers = [];
		var map_type;
		//var draggable_touch = themePB.isMobile == true ? 'false' : 'true';
		switch(gm.view){
			case 'map': map_type = google.maps.MapTypeId.ROADMAP; break;
			case 'satellite': map_type = google.maps.MapTypeId.SATELLITE; break;
			case 'map_terrain': map_type = google.maps.MapTypeId.TERRAIN; break;
		}
		 
		var mapOptions = {
			zoom: gm.zoom,
			center: latlng,
			mapTypeId: map_type,
			scrollwheel: dismouse,
			draggable: true,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		}

		 
		var google_map = new google.maps.Map(gm.element, mapOptions);
		
		if(gm.pin == 't'){
			if(gm.pin_custom != ''){
				var image = {
					url: gm.pin_custom
				};
				
				var marker = new google.maps.Marker({
					position: latlng,
					map: google_map,
					icon: image
				});
			}else{
				var marker = new google.maps.Marker({
					position: latlng,
					map: google_map
				});
			}
		}
		
		if(gm.style == 't' && eval(gm.style_code)){
			var styledMap = new google.maps.StyledMapType(eval(gm.style_code), {name: "Styled Map"});
			 
			google_map.mapTypes.set('map_style', styledMap);
			google_map.setMapTypeId('map_style');
		}
	}


	////////////////////
	// CALL FUNCTIONS
	///////////////////
	//
	//document ready
	UxCBModules.doc.ready(function(){
		//Contact Form
		if(UxCBModules.contactform.length) {
			UxCBModules.fnContactForm();
		}

		//Call embed video
		if(UxCBModules.videoFace.length) {
			UxCBModules.fnModuleVideoCover(UxCBModules.videoFace);
		}
	});
	
	//win load
	UxCBModules.win.load(function(){

		//remove title of tag a
		if($('.grid-item-mask-link').length) {
			$('.grid-item-mask-link').removeAttr('title');
		}

		//Call Lightbox 
		if(UxCBModules.photoSwipe.length){
			UxCBInitPhotoSwipeFromDOM('.lightbox-photoswipe');
		}

		//call isotope (portfolio)
		if(UxCBModules.isotope.length){
			UxCBModules.isotope.each(function(){
				var _list_wrap = $(this),
				    _list = $(this).find('.masonry-list'),
					_listUnique = _list.data('unique');

				if(!_list.hasClass('masonry-auto')) {

					UxCBModules.moduleIsotope[_listUnique] =  _list.isotope({
						itemSelector: '.grid-item',
						layoutMode: 'fitRows',
						stagger: 40,
						hiddenStyle: {
						  opacity: 0
						},
						visibleStyle: {
						  opacity: 1
						}
					});

				} else { 
					UxCBModules.moduleIsotope[_listUnique] = _list.isotope({ 
						itemSelector: '.grid-item',
						layoutMode: 'packery',
						stagger: 40,
						hiddenStyle: {
						  opacity: 0
						},
						visibleStyle: {
						  opacity: 1
						}
					}); 
				}
			});
		}
		
		//grid Stack(custom portfolio)
		if(UxCBModules.gridStack.length){
			UxCBModules.gridStack.each(function(){
				var gridStack = $(this);
                var gridStackSpacing = gridStack.data('spacing');
				var module = gridStack.parents('.module');
				
				gridStack.css('margin', - gridStackSpacing * 0.5 + 'px');
				
				UxCBModules.fnGridStackInitSize(gridStack.find('.grid-stack-item'));
				 
				
				var isoGridStack = gridStack.isotope({ 
					itemSelector: '.grid-stack-item',
					layoutMode: 'packery',
					stagger: 40,
					resize: false
				});
				
				UxCBModules.fnGridStackResize(gridStack);
				
				UxCBModules.win.resize(function(){
					var filters = module.find('.filters');
					
					var filterActive = filters.find('li.active');
					var filterValue = filterActive.find('> a').attr('data-filter');
					
					if(filterValue){
						if(filterValue != '*'){
							isoGridStack.isotope('layout');
						}else{
							UxCBModules.fnGridStackResize(gridStack);
						}
					}else{
						UxCBModules.fnGridStackResize(gridStack);
					}
				});
				
				var grid = gridStack.data('gridstack');
				
				var filterHidden = false;
				if(module.find('.filters').length){
					var _filters = module.find('.filters [data-filter]');
					
					_filters.click(function(){
						var filterValue = $(this).attr('data-filter');
						var filterCatID = $(this).attr('data-catid');
						var filterItems = [];
						var filterCount = Number($(this).find('.filter-num').text());
						var post__not_in = [];
						var postCount = 0;
						
						$(this).parent().parent().find('li').removeClass('active');
						$(this).parent().addClass('active');
						
						if(filterValue == '*'){
							filterCatID = 0;
							filterHidden = gridStack.find('.grid-stack-item:hidden');
							UxCBModules.fnGridStackResize(gridStack);
							filterHidden.show();
						}else{
							if(filterHidden){
								filterHidden.hide();
							}
							
							isoGridStack.isotope({ filter: filterValue });
						}
						return false;
					});
				}
            });
		}
		
		if(UxCBModules.module.find('.grid-item-inside').length) {
			UxCBModules.module.find('.grid-item-inside').waypoint(function (direction) {
				UxCBModules.itemQueue.push(this.element);
				UxCBModules.fnListItemQueue();
			}, {
				offset: '100%'
			});
			UxCBModules.module.find('.grid-item-inside').each(function(index, element) {
				if($(this).parent().offset().top < UxCBModules.winScrollTop + UxCBModules.winHeight){
					var lazyload = $(this).find('.ux-lazyload-bgimg');
					var lazyload_bgimg = lazyload.data('bg');
					if(lazyload_bgimg) {
						lazyload.addClass('lazy-loaded').css('background-image', 'url("' +lazyload_bgimg+ '")');
					}
					
					UxCBModules.itemQueue.push($(this).find('.grid-item-inside'));
					UxCBModules.fnListItemQueue();
				} 
            
            });
		}
		
		//page module init
		if(UxCBModules.module.length){
			var containerModuleWidthSum = 0;
			UxCBModules.module.each(function(index){
				var module = $(this);
				var moduleWidth = module.width();
				var moduleCol = Number(module.attr('data-module-col'));
				
				containerModuleWidthSum = containerModuleWidthSum + moduleCol;
				
				if(containerModuleWidthSum > 12 || index == 0 || moduleCol == 0){
					//if(!module.hasClass('ux-first-mod-row') {
						module.addClass('ux-first-mod-row');
					//}
					
				}
				
				if(containerModuleWidthSum > 12){
					containerModuleWidthSum = 0 + moduleCol;
				}
				
				if(moduleCol == 0){
					containerModuleWidthSum = 12;
				}
				
				if(module.hasClass('col-0')){
					var containerWidth = UxCBModules.body.outerWidth();
					var containerMargin = (containerWidth - moduleWidth) / 2;

					$(window).trigger('resize'); 
				}
				
				if(UxCBModules.body.hasClass('page') || UxCBModules.body.hasClass('single')){
					if(module.find('.filters').length){
						UxCBModules.fnModuleFilters(module);
					}
					if(module.find('.page_twitter').length){
						UxCBModules.fnModuleLoadmore(module);
					}
					if(module.find('.infiniti-scroll').length){
						UxCBModules.fnModuleInfinitiScroll(module);
					}
				}
			});
		} 
		
		//module animation scroll
		if(UxCBModules.moduleHasAnimation.length){
			UxCBModules.moduleHasAnimation.imagesLoaded(function(){
				UxCBModules.moduleHasAnimation.each(function(){
					var animationScroll = $(this).find('.animation-scroll-ux');
					
					UxCBModules.fnModuleAnimationScroll(animationScroll, $(this))
				});
			});
		}

		//Pagebuild: GoogleMap Moudle
		if(UxCBModules.moduleGoogleMap.length){
			UxCBModules.moduleGoogleMap.each(function(index, element) {
				var googlemap = [];
				
				googlemap.item = $(this);
				googlemap.element = element;
				googlemap.l = Number(googlemap.item.data('l'));
				googlemap.r = Number(googlemap.item.data('r'));
				googlemap.zoom = Number(googlemap.item.data('zoom'));
				googlemap.pin = googlemap.item.data('pin');
				googlemap.pin_custom = googlemap.item.data('pin-custom');
				googlemap.view = googlemap.item.data('view');
				googlemap.dismouse = googlemap.item.data('dismouse');
				googlemap.style = googlemap.item.data('style');
				googlemap.style_code = googlemap.item.next('.module-map-style-code').val();
				
				UxCBModules.fnMapInit(googlemap);
			});
		}
	});
	
})(jQuery);

jQuery.extend(jQuery.lazyLoadXT, {
	edgeY:  200 
}); 

function UxCBInitPhotoSwipeFromDOM(gallerySelector){
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