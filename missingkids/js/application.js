$(function () {
    //  alert('fsdfsd');
    var $divs = $("#js-forms-content > .ncmec-form-content");
    $divs.hide();
    $divs.first().show();
    $("input[name$='ncmec-forms-online']").on("change", function () {
        $divs.hide();
        $divs.eq($("input[name$='ncmec-forms-online']").index(this)).show();
    });

    //   $('.match-height').matchHeight({byRow: false})



    window.onresize = function () {

        ///////////////////////////////////////////////////////////////////
        /** Make desktop header navigation hoverable instead of click **/
        if (window.matchMedia("(min-width: 1024px)").matches) {
            $('#navbar > ul > li').hover(
                    function () {
                        $(this).addClass('open');
                    },
                    function () {
                        $(this).removeClass('open');
                    }
            );
        }
        /** -- END -- Make desktop header navigation hoverable instead of click **/
        ////////////////////////////////////////////////////////////////////
    };

//    var height_arr = [];
//    $(".content-wrapper > .container > .row > div:lt(2)").each(function () {
//        height_arr.push(parseInt($(this).height()));
//    });
//    var maxHeight = Math.max.apply(null, height_arr);
//    $(".content-wrapper > .container > .row > div").each(function () {
//        $(this).find('>.teaser, >.inner-wrapper').height(maxHeight);
//
//    });



    function onScroll() {
        var $body = $('body');
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
    $(window).scroll(onScroll);
    onScroll();

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