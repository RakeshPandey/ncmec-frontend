(function ($, Handlebars) {




    var _this, searchMod = {
        el: {
            searchBtn: $("#searchBtn"),
            siteSearchResults: $("#siteSearchResults"),
            siteSearchResultsWrapper:$(".siteSearchResultsWrapper")
        },
        templates: {
            searchItem: Handlebars.compile($("#search-result-item").html())
        },
        init: function () {
            _this = this;
            _this.initHandlebarRegisters();
            _this.el.searchBtn.click(_this.performSearch);
            _this.el.siteSearchResults.on('click', '.pagination a', _this.performSearch);
        },
        performSearch: function (e) {
            if (e) {
                e.preventDefault();
            }
           _this.el.siteSearchResultsWrapper.find('.ajax-loader').show();
           
            $.get('./missingkids/js/search-results.json', function (data) {
                var html = _this.templates.searchItem(data);
                _this.el.siteSearchResults.empty().html(html);
                _this.el.siteSearchResultsWrapper.find('.ajax-loader').hide();
            });
        },

        initHandlebarRegisters: function () {

            Handlebars.registerHelper("inc", function (value, options) {
                return parseInt(value) + 1;
            });

            Handlebars.registerHelper('ifPdf', function (v1,  options) {
                if (v1 === "pdf") {
                    return options.fn(this);
                }
                return options.inverse(this);
            });
        }
    };


    searchMod.init();



})(jQuery, Handlebars);