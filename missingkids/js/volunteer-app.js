(function(){

  // personal Info form validation handler
  $('.volunteerAppAccordion form').each(function($index, $form){

    $($form).validate({
      submitHandler: function(form) {
        //$(form).submit();
        var panelWrapper = $(form).parents('.panel');
        panelWrapper.addClass('has-valid-form');
        var len = panelWrapper.next('.panel').length;
        if(len){
          panelWrapper.next('.panel').find('.panel-heading a').trigger('click');
        }
      }
    });
  });
  // $('.volunteerAppAccordion').on('hidden.bs.collapse', function (e) {
  //   var panelWrapper = $(e.target).parents('.panel');
  //   //panelWrapper.removeClass('has-valid-form');
  //   panelWrapper.nextAll('.panel').removeClass('has-valid-form');
  // });
  //
  // $(document).on('mouseenter', '.volunteerAppAccordion > .panel > .panel-heading  a', function(e){
  //   e.preventDefault();
  // });

})();
