window.setupApp = function() {
    'use strict';
    var XHRHelper = {
        xhrFields: {
            withCredentials: true,
        }
    };
    var api_url_base = "http://localhost:5000/api/v1/crime/?";

    // Make sure window size is nice...
    $('#map').height($(window).height()-70);
    // End window resize
    
    return {
        api_url_base: api_url_base,
    }
}
