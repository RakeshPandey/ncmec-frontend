(function(){
    
    $(document).ready(function(){
        $('.donate').click(function(){
            $('.donate.btn-primary').removeClass('btn-primary').addClass('btn-secondary');
            $(this).addClass('btn-primary').removeClass('btn-secondary');
            
            var amt = $(this).text();            
            var num = (amt == 'Other')?'':parseInt(amt.match(/\d+/),10);
            $('#dollars').val(num);
        });
    });
    
})();