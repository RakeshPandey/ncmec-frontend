(function ($, Handlebars) {




    var _this, anniversariesMod = {
        el: {
            siteSearchResults: $("#missing-anniversary-grid"),
            siteSearchResultsWrapper: $("#missing-anniversary-grid-wrapper"),
            timeframeRadio: $('[name=timeframe]')
        },
        templates: {
            searchItem: Handlebars.compile($("#tmpl-anniversary-grid-item").html())
        },
        init: function () {
            _this = this;
            //_this.initHandlebarRegisters();
            _this.el.timeframeRadio.change(_this.performSearch);
            _this.performSearch();
            $(window).scroll(_this.onScroll);
        },
        performSearch: function (e) {
            if (e) {
                e.preventDefault();
            }
            _this.el.siteSearchResultsWrapper.find('.ajax-loader').show();

            $.get('./missingkids/js/json/anniversaries-grid-results.json', {timeframe: _this.el.timeframeRadio.val()}, function (data) {
                var html = _this.templates.searchItem(data);
                _this.el.siteSearchResults.empty().html(html);
                _this.el.siteSearchResultsWrapper.find('.ajax-loader').hide();
            });
        },
        onScroll: function () {
            if (($(window).scrollTop() + $(window).height()) == $(document).height()) {

                _this.el.siteSearchResultsWrapper.find('.ajax-loader').show();
                $.get('./missingkids/js/json/anniversaries-grid-results.json', {timeframe: _this.el.timeframeRadio.val()}, function (data) {
                    var html = _this.templates.searchItem(data);
                    _this.el.siteSearchResults.append(html);
                    _this.el.siteSearchResultsWrapper.find('.ajax-loader').hide();
                });

            }
        },
        initHandlebarRegisters: function () {
            Handlebars.registerHelper("inc", function (value, options) {
                return parseInt(value) + 1;
            });

            Handlebars.registerHelper('ifPdf', function (v1, options) {
                if (v1 === "pdf") {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
        }
    };


    anniversariesMod.init();



})(jQuery, Handlebars);