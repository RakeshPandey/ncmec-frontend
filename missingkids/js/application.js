$(function() {
    var $divs = $("#js-forms-content > div");
    $divs.first().show()
    $("input[name$='ncmec-forms-online']").on("change", function() {
            $divs.hide();
            $divs.eq( $("input[name$='ncmec-forms-online']").index( this ) ).show();
    });

    $('.content-wrapper > .container > .row > div').matchHeight({byRow: false})

});