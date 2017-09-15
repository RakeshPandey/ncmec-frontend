$(document).on("click", ".search-container .search-icon", function(){
  var searchContainer = $(this).parents(".search-container");
  searchContainer.toggleClass("opened");
  (searchContainer.hasClass('opened')) ? searchContainer.find('input').focus() : "";
  //================
  // header logics
  //================
  var navbar = $(this).parents().siblings('#navbar');
  if(navbar){
    var viewport = window.innerWidth;
    var offset = 24;
      if(viewport >= 768) {
        var width = navbar.find('ul:first-child > li:first-child').width();
        if(!navbar.data('actualLeft')) {
          var actualLeft = navbar.css('left');
          navbar.data('actualLeft', actualLeft);
        }else {
          var actualLeft = navbar.data('actualLeft');
        }
        (searchContainer.hasClass('opened'))
            ? navbar.css('left', -width)
            : navbar.css('left', actualLeft);
      }
    }
});

//===============================
// Statistics counter initiation
//===============================
(function(){
  $('.statistics-content .counter').counterUp({
      delay: 10,
      time: 1000
  });
})();

//==================================
// Hero banner carousel initiation
//===================================
(function(){
  if($('.hero-carousel').length) {
    $('.hero-carousel').owlCarousel({
        loop:true,
        nav:false,
        autoplay: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            }
        }
    });
  }
})();
