/*global SFCViewer, $*/


window.SFCViewer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    'use strict';
    var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";
    window.XHRHelper = {
      xhrFields: {
        withCredentials: true,
      }
    }

    window.Map = L.map('map').setView([37.77, -122.44], 13);

    L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(window.Map);

    // Initialise the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    window.Map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
        }
    });
    window.Map.addControl(drawControl);

      window.Map.on('draw:created', function(e) {
      var type = e.layerType,
          layer = e.layer;
          if (layer.toGeoJSON().geometry.type === "Polygon") {
              var temp = new window.SFCViewer.Models.CrimeArea({"shape_layer":layer});
              var temp_view = new window.SFCViewer.Views.MapPointDisplay({"model":temp});
              var dayofweekview = new window.SFCViewer.Views.CrimeByDayPerHour({"model":temp});
              // window.temp = temp_view;


          }

      drawnItems.addLayer(layer);


    });

  }
};

$(document).ready(function() {
  'use strict';
    SFCViewer.init();

  var hardly = new SFCViewer.Models.SfEvent({
    "id": "hardly-strictly-2014"
  });

});

