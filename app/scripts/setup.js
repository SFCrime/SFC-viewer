window.setupApp = function() {

    window.XHRHelper = {
        xhrFields: {
            withCredentials: true,
        }
    }

    //Mapping Information
    // var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";
    // window.Map = L.map('map').setView([37.77, -122.44], 13);

    // L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    // }).addTo(window.Map);

    // // Initialise the FeatureGroup to store editable layers
    // var drawnItems = new L.FeatureGroup();
    // window.Map.addLayer(drawnItems);

    // // Initialise the draw control and pass it the FeatureGroup of editable layers
    // var drawControl = new L.Control.Draw({
    //     edit: {
    //         featureGroup: drawnItems,
    //     }
    // });
    // window.Map.addControl(drawControl);

    // window.Map.on('draw:created', function(e) {
    //     var type = e.layerType,
    //         layer = e.layer;

    //     // Need to setup drawing
    //     if (layer.toGeoJSON().geometry.type === "Polygon") {

    //     }

    //     drawnItems.addLayer(layer);

    // });
    // // End Mapping Information


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
