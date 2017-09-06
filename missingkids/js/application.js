$(function () {
    //  alert('fsdfsd');
    var $divs = $("#js-forms-content > .ncmec-form-content");
    $divs.hide();
    $divs.first().show();
    $("input[name$='ncmec-forms-online']").on("change", function () {
        $divs.hide();
        $divs.eq($("input[name$='ncmec-forms-online']").index(this)).show();
    });

    function appChangeContent() {
        var $content = $(".js-application-type-content > .js-app-content");
        $content.hide();
        $("input[name$='applicantType']").on("change", function () {
            $content.hide();
            $content.eq($("input[name$='applicantType']").index(this)).show();
        });
    }



    window.onresize = function () {

        ///////////////////////////////////////////////////////////////////
        /** Make desktop header navigation hoverable instead of click **/
        // if (window.matchMedia("(min-width: 1024px)").matches) {
        //     $('#navbar > ul > li').hover(
        //             function () {
        //                 $(this).addClass('open');
        //                 $(this).parents('.container').css('overflow', 'hidden');
        //             },
        //             function () {
        //                 $(this).removeClass('open');
        //                 $(this).parents('.container').css('overflow', 'initial');
        //             }
        //     );
        // }
        /** -- END -- Make desktop header navigation hoverable instead of click **/
        ////////////////////////////////////////////////////////////////////

    };

    $(document).on("click", ".scroll-started-action", function() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        $('body').toggleClass('fixed-breadcrump');
      }
    });

    function matchHeight(){
        var mainContentHeight = parseInt($(".content-wrapper > .container > .row > div:first").height()),
            sideContentHeight = parseInt($(".content-wrapper > .container > .row > div:eq(1)").height());


            if (sideContentHeight > mainContentHeight){
                $(".content-wrapper > .container > .row > div:first .inner-wrapper:not(.dont-set-height)").height(sideContentHeight);
            }
    }
    window.onload = function(){
        matchHeight();
        appChangeContent();

    }


    function onScroll() {
        var $body = $('body');
        $body.removeClass('fixed-breadcrump');
        if (document.body.scrollTop > 1) {
            if (!$body.hasClass('scroll-started')) {
                $body.addClass('scroll-started');
            }
        } else {
            if ($body.hasClass('scroll-started')) {
                $body.removeClass('scroll-started');
            }
        }
    }
    if(!$(".header-container").hasClass('home')){
      $(window).scroll(onScroll);
      onScroll();
    }
});

function mobileViewUpdate() {
    var viewportWidth = $(window).width();
    if (viewportWidth < 767) {
        $("#js-partner-listing").removeClass("mk-lg mk-md").addClass("mk-sm");
    } else if (viewportWidth < 944) {
        $("#js-partner-listing").removeClass("mk-lg mk-sm").addClass("mk-md");
    }
}

$(window).load(mobileViewUpdate);
$(window).resize(mobileViewUpdate);
