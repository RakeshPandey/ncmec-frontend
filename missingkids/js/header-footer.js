$(document).on("click", ".footer-container .search-icon", function(){
  var searchContainer = $(this).parents(".search-container");
  searchContainer.toggleClass("opened");
  (searchContainer.hasClass('opened')) ? searchContainer.find('input').focus() : "";
});
