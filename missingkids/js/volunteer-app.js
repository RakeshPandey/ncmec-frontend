(function(){

  // form validation handler
  $('.volunteerAppAccordion form').each(function($index, $form){

    $($form).validate({
      submitHandler: function(form) {
        var panelWrapper = $(form).parents('.panel');
        panelWrapper.addClass('has-valid-form');
        var len = panelWrapper.next('.panel').length;
        if(len){
          panelWrapper.next('.panel').find('.panel-heading a').trigger('click');
        }
        else {
          //============================
          // Add your submit logic here
          //============================

        }
      }
    });
  });

  $(document).on('click', '.volunteerAppAccordion > .panel > .panel-heading  a', function(e){
    //e.preventDefault();
    var panelWrapper = $(e.target).parents('.panel');
    panelWrapper.nextAll('.panel').removeClass('has-valid-form');
  });

})();
