window.setupApp = function() {

    window.XHRHelper = {
        xhrFields: {
            withCredentials: true,
        }
    }

    //Query Parameter Parsing
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var url_params = ["type", "coordinates", "start_date", "end_date"];
    var res = {};
    for (var x in url_params) {
        res[url_params[x]] = getParameterByName(url_params[x]);
    };
    // Do This only if query parameters exist
    if (res['type'] !== "") {
        // need to set up query parsing to model
    }
}
