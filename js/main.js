$(function() {
	
	var owl = $('#owl-slider');
	owl.owlCarousel({
		itemsCustom : [
		[0, 2],
		[704, 3]
		]
	});
	$(".next").click(function(){
		owl.trigger('owl.next');
	});
	$(".prev").click(function(){
		owl.trigger('owl.prev');
	});



	function paddingForNavItem(){
		var $nav = $('nav ul'),
		$navItem = $nav.find('li:not(.delimiter)'),
		$navLink = $navItem.find('a'),
		$delimiter = $nav.find('.delimiter');

		$navLink.css({
			'padding-left':0,
			'padding-right':0
		});
		$nav.css({
			'margin-left': 0,
			'margin-right': 0
		});
		var paddingItem = Math.floor($delimiter.position().left - $navItem.width());
		
		$navLink.css({
			'padding-left':paddingItem +"px",
			'padding-right':paddingItem +'px'
		});
		$nav.css({
			'margin-left': - paddingItem +'px',
			'margin-right': - paddingItem +'px'
		});
	};

	
	var $nav = $('nav ul'),
		$menu_small = $('#menu_small');
	$menu_small.on('click', function(event) {
		event.preventDefault();
		$(this).toggleClass('active_menu');
		$nav
			.stop()
			.slideToggle(500);
	});
	var $win = $(window);

	if($win.width()<=883){
		$(document).click(function(event) {
			if($(event.target).closest($nav).length==0 && $(event.target).closest($menu_small).length==0){
				$nav.fadeOut(500);
				$menu_small.removeClass('active_menu');
			}
		});
	}


		$win.on('load', function(event) {
			if ( $(this).width() > 883) {
					paddingForNavItem();
			}
		});
		$win.on('resize', function(event) {
			event.preventDefault();
			if ( $(this).width() > 883 && $nav.is(':visible') ){
				paddingForNavItem();
			}else if ( $(this).width() > 883 && !$nav.is(':visible') ) {
					$nav.show();
					$menu_small.removeClass('active_menu');
					paddingForNavItem();
				}else if($(this).width() <= 883 && $nav.is(':visible')){
						$nav.hide();
						$menu_small.removeClass('active_menu');
					}
		});
		
});
