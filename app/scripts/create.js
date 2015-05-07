$(document).ready(function() {


    // Mapping Setup
    var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";
    window.Map = L.map('creationMap').setView([37.77, -122.44], 12);

    L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(window.Map);

    var drawnItems = new L.FeatureGroup(); // the items that will be drawn


    var drawControl = new L.Control.Draw({
        draw: { // controls what features show up
            polyline: false,
            marker: false,
            circle: false // hope to enable in the future
        },
        edit: { // adds the feature groups
            featureGroup: drawnItems,
        }
    });

    // should disable functionality to draw multiple
    var onDrawComplete = function(e) {
        var layer = e.layer;
        drawnItems.addLayer(layer);
        if (layer.toGeoJSON().geometry.type === "Polygon") {
            window.formGeoJSON = layer.toGeoJSON();
            console.log(window.formGeoJSON);
        }
    }

    var onEditComplete = function(e) {
            var layer = e.layers.getLayers()[0];
            if (layer.toGeoJSON().geometry.type === "Polygon") {
                window.formGeoJSON = layer.toGeoJSON();
                console.log(window.formGeoJSON);
            }
        }
        // End Mapping Setup

    // Create Form submit
    var createFormSubmit = function() {
        var dirtyParams = {};
        dirtyParams.start_date_1 = $('#startDate1').val();
        dirtyParams.end_date_1 = $('#endDate1').val();
        dirtyParams.start_date_2 = $('#startDate2').val();
        dirtyParams.end_date_2 = $('#endDate2').val();
        dirtyParams.event_name = $('#eventName').val();
        dirtyParams.type = window.formGeoJSON.geometry.type;
        dirtyParams.coordinates = window.formGeoJSON
            .geometry
            .coordinates[0]
            .map(function(d) {
                return String(d[0]).concat(" ", d[1]);
            }).join();

        console.log(dirtyParams.coordinates);

        var params = $.param(dirtyParams);
        var url = "http://localhost:9000/event_comparison.html?" + params;
        window.location.href = url;
        return false; // prevent refresh of page
    }

    // Instantiations
    $('#datePicker1').datepicker({format:"mm-dd-yyyy"});
    $('#datePicker2').datepicker({format:"mm-dd-yyyy"});
    window.Map.addLayer(drawnItems);
    window.Map.addControl(drawControl);
    window.Map.on('draw:created', onDrawComplete);
    window.Map.on('draw:edited', onEditComplete);
    $("#creationForm").submit(createFormSubmit);
});
