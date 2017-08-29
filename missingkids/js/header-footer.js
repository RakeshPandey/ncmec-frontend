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
    (searchContainer.hasClass('opened')) ?
        ((viewport <= 768) ? navbar.css('left', '-10px') : navbar.css('left', '-60px'))
        : navbar.css('left', '104px');
    }
});
