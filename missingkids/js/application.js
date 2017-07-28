$(function () {
    var $divs = $("#js-forms-content > div");
    $divs.first().show()
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