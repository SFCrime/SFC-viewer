window.setupApp = function() {
    'use strict';
    var XHRHelper = {
        xhrFields: {
            withCredentials: true,
        }
    };

    var api_url_base = "http://localhost:5000/api/v1/crime/?";

    //Query Parameter Parsing
    var getParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var url_params = ["type", "geo_type", "coordinates", "start_date_1", "end_date_1", "start_date_2", "end_date_2"];
    var res = {};

    for (var x in url_params) {
        res[url_params[x]] = getParameterByName(url_params[x]);
    }

    console.log(res);
    
    return {
        getParams: function() {
            return res;
        },
        api_url_base: api_url_base,

    }
}
