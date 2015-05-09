window.setupApp = function() {
    'use strict';
    var XHRHelper = {
        xhrFields: {
            withCredentials: true,
        }
    };
    var api_url_base = "http://localhost:5000/api/v1/crime/?";

    var sizing = function() {
        // Make sure window size is nice...
        $('#map').height($(window).height() - 70);
        $("#story1-d3").width($("#story1")
                              .width());
        // End window resize
    }

    sizing();
    return {
        api_url_base: api_url_base,
    }
}
