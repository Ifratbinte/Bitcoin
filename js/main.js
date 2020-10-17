(function ($) {
	
	$(document).ready(function () {
	
		/* responsive menu */
		$("#cssmenu").menumaker({
			title: "Menu",
			format: "Multitoggle",
		});
		
		
		//homepage-Carousel
		$(".homepage-slider").owlCarousel({
			items:1,
			autoplay:true,
			loop:true,
			nav:true,
			dots:false,
			navText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
		});
		
		//slick-slider
			$(".vertical-slider").slick({
				autoplay:true,
				dots: false,
				vertical: true,
				centerMode: true,
				slidesToShow: 2,
				slidesToScroll: 3,
		});
		
		//counter
		$(".counter_value").counterUp({
			delay:5,
			time:1000,
		});
		
		//feedback-Carousel
		$(".feedback-slider").owlCarousel({
			items:1,
			autoplay:true,
			loop:true,
			nav:true,
			dots:false,
			navText:["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
		});
		
		//homepage-Carousel
		$(".homepage2-slider").owlCarousel({
			items:1,
			autoplay:true,
			loop:true,
			nav:false,
			dots:true,
		});
	
	
	
	});
	
	$(document).ready(function () {
		function myFunction() {
			var x = document.getElementById("faq-ans");
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
			} else { 
				x.className = x.className.replace(" w3-show", "");
			}
		}
	});
	
})(jQuery);