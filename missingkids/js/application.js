$(document).ready(function() {
    $("input[name$='ncmec-forms-online']").on('change', function() {
        var formval = $(this).val();
        console.log(formval)
        $("div.ncmec-form-content").hide();
        $("#" + formval).show();
    });
});