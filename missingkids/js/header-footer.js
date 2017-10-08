// Object fill polyfill 
!function(){"use strict";if("undefined"!=typeof window){if("objectFit"in document.documentElement.style!=!1)return void(window.objectFitPolyfill=function(){return!1});var t=function(t){var e=window.getComputedStyle(t,null),i=e.getPropertyValue("position"),o=e.getPropertyValue("overflow"),n=e.getPropertyValue("display");i&&"static"!==i||(t.style.position="relative"),"hidden"!==o&&(t.style.overflow="hidden"),n&&"inline"!==n||(t.style.display="block"),0===t.clientHeight&&(t.style.height="100%"),-1===t.className.indexOf("object-fit-polyfill")&&(t.className=t.className+" object-fit-polyfill")},e=function(t){var e=window.getComputedStyle(t,null),i={"max-width":"none","max-height":"none","min-width":"0px","min-height":"0px",top:"auto",right:"auto",bottom:"auto",left:"auto","margin-top":"0px","margin-right":"0px","margin-bottom":"0px","margin-left":"0px"};for(var o in i){e.getPropertyValue(o)!==i[o]&&(t.style[o]=i[o])}},i=function(t,e,i){var o,n,l,a,d;if(i=i.split(" "),i.length<2&&(i[1]=i[0]),"x"===t)o=i[0],n=i[1],l="left",a="right",d=e.clientWidth;else{if("y"!==t)return;o=i[1],n=i[0],l="top",a="bottom",d=e.clientHeight}return o===l||n===l?void(e.style[l]="0"):o===a||n===a?void(e.style[a]="0"):"center"===o||"50%"===o?(e.style[l]="50%",void(e.style["margin-"+l]=d/-2+"px")):o.indexOf("%")>=0?(o=parseInt(o),void(o<50?(e.style[l]=o+"%",e.style["margin-"+l]=d*(o/-100)+"px"):(o=100-o,e.style[a]=o+"%",e.style["margin-"+a]=d*(o/-100)+"px"))):void(e.style[l]=o)},o=function(o){var n=o.dataset?o.dataset.objectFit:o.getAttribute("data-object-fit"),l=o.dataset?o.dataset.objectPosition:o.getAttribute("data-object-position");n=n||"cover",l=l||"50% 50%";var a=o.parentNode;t(a),e(o),o.style.position="absolute",o.style.height="100%",o.style.width="auto","scale-down"===n&&(o.style.height="auto",o.clientWidth<a.clientWidth&&o.clientHeight<a.clientHeight?(i("x",o,l),i("y",o,l)):(n="contain",o.style.height="100%")),"none"===n?(o.style.width="auto",o.style.height="auto",i("x",o,l),i("y",o,l)):"cover"===n&&o.clientWidth>a.clientWidth||"contain"===n&&o.clientWidth<a.clientWidth?(o.style.top="0",o.style.marginTop="0",i("x",o,l)):"scale-down"!==n&&(o.style.width="100%",o.style.height="auto",o.style.left="0",o.style.marginLeft="0",i("y",o,l))},n=function(t){if(void 0===t)t=document.querySelectorAll("[data-object-fit]");else if(t&&t.nodeName)t=[t];else{if("object"!=typeof t||!t.length||!t[0].nodeName)return!1;t=t}for(var e=0;e<t.length;e++)if(t[e].nodeName){var i=t[e].nodeName.toLowerCase();"img"===i?t[e].complete?o(t[e]):t[e].addEventListener("load",function(){o(this)}):"video"===i&&(t[e].readyState>0?o(t[e]):t[e].addEventListener("loadedmetadata",function(){o(this)}))}return!0};document.addEventListener("DOMContentLoaded",function(){n()}),window.addEventListener("resize",function(){n()}),window.objectFitPolyfill=n}}();
// Object fill polyfill ends


$(document).ready(function(){
  $(".search-container .search-icon").on("click", function(){
    var searchContainer = $(this).parents(".search-container");
    searchContainer.toggleClass("opened");
    (searchContainer.hasClass('opened')) ? searchContainer.find('input').focus() : "";
    //================
    // header logics
    //================
    var navbar = $(this).parents().siblings('#navbar');
    var viewport = window.innerWidth;
    var offset = 58;
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
});


//===============================
// Statistics counter initiation
//===============================
(function(){
  // initiate pollyfill for image object fit
  var elements = document.querySelectorAll('.statistics-content img');
  objectFitPolyfill(elements);

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
  // initiate pollyfill for image object fit
  var elements = document.querySelectorAll('.hero-banner-wrapper img');
  objectFitPolyfill(elements);

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

//=======================================================
// Header dropdown navigation fixes
//=======================================================
(function(){
  if(window.innerWidth > 1024){
    $("#navbar a.dropdown-toggle").on("click", function(e){
      e.stopPropagation();
    });
  }
})();

//=======================================================
// Header navbar collapse event handler
//=======================================================

(function(){
  $('.navbar-collapse').on('shown.bs.collapse', function() {
   console.log( "shown");
   var $body = $('body');
   (!$body.find('.breadcrumbs').length) ? $body.toggleClass('secondary-nav-open') : '';
 }).on('hidden.bs.collapse', function() {
   var $body = $('body');
   (!$body.find('.breadcrumbs').length) ? $body.toggleClass('secondary-nav-open') : '';
  console.log( " hidden");
})
})();
