$(document).on("click", ".search-container .search-icon", function(){
  var searchContainer = $(this).parents(".search-container");
  searchContainer.toggleClass("opened");
  (searchContainer.hasClass('opened')) ? searchContainer.find('input').focus() : "";
  //================
  // header logics
  //================
  var navbar = $(this).parents().siblings('#navbar');
  var viewport = window.innerWidth;
  var offset = 50;
  var pOffset = 8;
  if(navbar.length){
      if(viewport >= 768) {
        var width = navbar.find('ul:first-child > li:first-child').width();
        if(!navbar.data('actualLeft')) {
          var actualLeft = navbar.css('left');
          navbar.data('actualLeft', actualLeft);
        }else {
          var actualLeft = navbar.data('actualLeft');
        }
        (searchContainer.hasClass('opened'))
            ? navbar.css('left', parseInt(actualLeft) - width - offset)
            : navbar.css('left', actualLeft);
      }
    }
    if(viewport < 768) {
      if(searchContainer.parents('.secondary-header').length) {
          if(searchContainer.hasClass('opened')) {
              var sRight = document.querySelector(".secondary-header .social-icons").getBoundingClientRect().right;
              var searchLeft = document.querySelector(".site-functionalities .search-wrapper input[name='search']").getBoundingClientRect().left;
              if(sRight > searchLeft){
                $(".secondary-header .social-icons").css('right', sRight - searchLeft);
              }
          }else{
              $(".secondary-header .social-icons").css('right', 0);
          }
      }else if(searchContainer.parents('.footer-links-wrapper').length){
        if(searchContainer.hasClass('opened')) {
            var sRight = document.querySelector(".footer-links-wrapper .social-icons").getBoundingClientRect().right;
            var searchLeft = document.querySelector(".footer-links-wrapper .search-wrapper input[name='search']").getBoundingClientRect().left;
            if(sRight > searchLeft){
              $(".footer-links-wrapper .social-icons").css('left', searchLeft - sRight - pOffset);
            }
        }else{
            $(".footer-links-wrapper .social-icons").css('left', 0);
        }
      }
    }
});

//===============================
// Statistics counter initiation
//===============================
(function(){
  if($.fn.counterUp){
    $('.statistics-content .counter').counterUp({
        delay: 10,
        time: 1000
    });
  }
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

//===============================
// Error popup initiation
//===============================
(function(){
  if($("#error-popup"))
    $("#error-popup").modal('show');
})();

//=======================================================
// Prevent body scroll on nav contetnt scroll in mobile
//=======================================================
(function(){
  $(document).on("touchstart", "#navbar .dropdown-menu", function(e){
    $('body').css({overflow: 'hidden'});
  });
  $(document).on("touchend", "#navbar .dropdown-menu", function(e){
    $('body').css({overflow: 'auto'});
  });
})();
