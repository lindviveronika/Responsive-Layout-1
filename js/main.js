$(document).ready(function(){

/*  SCROLLING HEADER EFFECT  ============================================================================= */

	//cache DOM
	var $logo = $('.logo');
	var $desktopHeader = $('.desktop-header');

	//scroll effect config
	var changeOnPositionTop = 150;

	$(this).scroll(function(){
		if($(this).scrollTop() > changeOnPositionTop){
			$logo.removeClass('logo-big');
			$desktopHeader.addClass('header-scrolling');
		}
		else{
			$logo.addClass('logo-big');
			$desktopHeader.removeClass('header-scrolling');
		} 
	});

/*  OPEN AND CLOSE DESKTOP MENU  ============================================================================= */

	$('.dropdown').click(function(e){
		e.preventDefault();
		$(this).find('i').toggleClass("rotate");
		$(this).find('.dropdown-menu').slideToggle();
	});


/*  OPEN AND CLOSE MOBILE MENU  ============================================================================= */

	//cache DOM
	var $mobileNavigationWrapper = $('.mobile-navigation-wrapper');

	$('.mobile-menu').click(function(e){
		e.preventDefault();
		$mobileNavigationWrapper.css('left','0');
	});

	$('.mobile-menu-close').click(function(e){
		e.preventDefault();
		$mobileNavigationWrapper.css('left','100%');
	});


/*  HOVER EFFECT ON CARDS  ============================================================================= */

	$('.card').hover(function(){
		$(this).siblings('.card').toggleClass('card-inactive');
		$(this).parent().siblings('.section').find('.card').toggleClass('card-inactive');
	});


/*  GALLERY SLIDER  ============================================================================= */

	//cache DOM
	var $gallery = $('#galleryContainer');
	var $slider = $gallery.find('#slider');
	var $galleryCells = $slider.find('.gallery-cell');

	//gallery config
	var animationSpeed = 600; 
	var pause = 5000;
	var currentSlide = 1; 

	var interval;

	function slideRight(){
		
		$slider.animate({'margin-left': (-100 * (currentSlide + 1) + '%')}, animationSpeed, 'easeInOutQuad', function(){

			currentSlide++;
			if(currentSlide === ($galleryCells.length - 1)){
				currentSlide = 1;
				$slider.css('margin-left', '-100%');
			}
		});
	}

	function slideLeft(){
		$slider.animate({'margin-left': (-100 * (currentSlide - 1) + '%')}, animationSpeed, 'easeInOutQuad', function(){

			currentSlide--;
			if(currentSlide === 0){
				currentSlide = $galleryCells.length - 2;
				$slider.css('margin-left', -100 * currentSlide + '%');

			}
		});
	}

	function startSlider(){
		interval = setInterval(function(){
			slideRight();
		}, pause);
	};

	function stopSlider(){
		clearInterval(interval);
	};

	//stop sliding on mouseenter
	$gallery.on('mouseleave',startSlider).on('mouseenter',stopSlider);

	
	//restart sliding function on window resize
	$(window).on('resize',function(){
		stopSlider();
		width = $('.gallery-cell').width(); //get new width
		startSlider();
	});

	//slide on click events
	var $paging = $('.paging');
	$paging.find('.next').click(function(e){
		e.preventDefault();
		slideRight();
	});
	$paging.find('.prev').click(function(e){
		e.preventDefault();
		slideLeft();
	});

	startSlider(); //initiate sliding
	
});


/*  EASING PLUGIN ============================================================================= */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',

	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
});
