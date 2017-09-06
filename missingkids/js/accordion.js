/*******************************
* ACCORDION WITH TOGGLE ICONS
*******************************/
    // $(function() {
    //     $('#accordion .collapse').collapse('hide');
    // });

	function toggleIcon(e) {
    var hasPlusClass = $(e.target).prev('.panel-heading').find(".more-less").hasClass('fa-plus-circle');
    var hasMinusClass = $(e.target).prev('.panel-heading').find(".more-less").hasClass('fa-minus-circle');
    if((e.type == "hidden" && hasMinusClass) || (e.type == "shown" && hasPlusClass)){
      $(e.target)
          .prev('.panel-heading')
          .find(".more-less")
          .toggleClass('fa-plus-circle fa-minus-circle');
    }
  }
  $('.panel-group').on('hidden.bs.collapse', toggleIcon);
  $('.panel-group').on('shown.bs.collapse', toggleIcon);

 // $('#form-accordion .collapse').collapse('show');
