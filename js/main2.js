
var MENU = (function(){

	function Menu (){
		var $nav = $('nav ul'),
			$navItem = $nav.find('li:not(.delimiter)'),
			$navLink = $navItem.find('a'),
			$delimiter = $nav.find('.delimiter'),
			$menu_small = $('#menu_small');
		this.element = {
			nav : $nav,
			item: $navItem,
			link: $navLink,
			del: $delimiter,
			menuButton: $menu_small
		};
		this.event(); 

	};
	Menu.prototype.resetIndent = function() {
		this.element.link.css({
			'padding-left':'',
			'padding-right': ''
		});
		this.element.nav.css({
			'margin-left': '',
			'margin-right': ''
		});
		console.log('обнулили');
		return this;
	};
	Menu.prototype.getPaddingForNavItem = function() {
		var paddingItem = 0;
		paddingItem = Math.floor(this.element.del.position().left - this.element.item.width());
		console.log('посчитали');
		return paddingItem;
	};
	
	Menu.prototype.setPaddingForNavItem = function() {
		var padding = this.getPaddingForNavItem();
		this.element.link.css({
			'padding-left':padding +"px",
			'padding-right':padding +'px'
		});
		this.element.nav.css({
			'margin-left': - padding +'px',
			'margin-right': - padding +'px'
		});
		console.log('задали');
	};
	Menu.prototype.event = function() {
		var $menu = this.element.menuButton,
			$nav = this.element.nav;
		$menu.on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass('active_menu');
			$nav
				.stop()
				.slideToggle(500);
			console.log('событие клик');
		});
		
		$(document).click(function(e) {
			if($(e.target).closest($nav).length==0 && $(e.target).closest($menu).length==0 && $menu.hasClass('active_menu')){
				$nav.fadeOut(500);
				$menu.removeClass('active_menu');
			}

		});
		
	};
	return Menu;
})();


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


	var menu = new MENU,
		$win = $(window);

	$win.on('load', function(event) {
		if ( $win.width() > 883) {		
			menu.resetIndent().setPaddingForNavItem();
		};
	});
	$win.on('resize', function(event) {
		event.preventDefault();
		var $nav = menu.element.nav,
		$menuButton = menu.element.menuButton;
		if( $(this).width() > 883){
			if(!$nav.is(':visible')){
				$nav.show();
				$menuButton.removeClass('active_menu');
			};
			menu.resetIndent().setPaddingForNavItem();
		}else{
			if($nav.is(':visible')){
				$nav.hide();
				$menuButton.removeClass('active_menu');
				menu.resetIndent();
			};
			menu.resetIndent();
			console.log('w<900');

		}
	});
	
});

