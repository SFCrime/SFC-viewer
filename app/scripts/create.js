$(document).ready(function() {

    //Date Picker
    $('#datePicker').datepicker();

    // Mapping Setup
    var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";
    window.Map = L.map('map').setView([37.77, -122.44], 12);

    L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(window.Map);

    var drawnItems = new L.FeatureGroup(); // the items that will be drawn
    window.Map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
        draw: { // controls what features show up
            polyline: false,
            marker: false
        },
        edit: { // adds the feature groups
            featureGroup: drawnItems,
        }
    });
    window.Map.addControl(drawControl);

    window.Map.on('draw:created', function(e) {
        var type = e.layerType,
            layer = e.layer;
        drawnItems.addLayer(layer);

        // Need to setup drawing
        if (layer.toGeoJSON().geometry.type === "Polygon") {

        }
    });
    // End Mapping Setup

    // Create Form submit
    function createFormSubmit(){
        var startDate1 = $('#startDate1').val(),
            endDate1 = $('#endDate1').val(),
            startDate2 = $('#startDate2').val(),
            endDate2 = $('#endDate2').val(),
            eventName = $('#eventName').val();

        console.log(startDate);
        console.log(endDate);
        console.log(eventName);
        return false; // prevent refresh of page
    }

    $("#creationForm").submit(createFormSubmit);
});
