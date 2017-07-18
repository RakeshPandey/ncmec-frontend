/*******************************
* EXPANDABLE WITH TOGGLE ICONS
*******************************/
$(function (){
    $('.js-readmore').on('click', function(){
        $('.js-read-more-wrapper').removeClass('hide');
        $(this).addClass('hide');
        $('.js-close').removeClass('hide');
        $(this).parents('.js-read-more-wrapper').slideDown(5000);
        return false;
    })
    $('.js-close').on('click', function(){
        $('.js-read-more-wrapper').addClass('hide');
        $(this).addClass('hide');
        $('.js-readmore').removeClass('hide');
        $(this).parents('.js-read-more-wrapper').slideUp(5000);
        return false;
    })
}) 
