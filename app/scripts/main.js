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
            featureGroup: drawnItems
        }
    });
    window.Map.addControl(drawControl);

    window.Map.on('draw:created', function(e) {
      var type = e.layerType,
          layer = e.layer;

	// This is where we'll be creating a new model
	// a call back to do so
      window.Map.addLayer(e.layer);

    });

  }
};

$(document).ready(function() {
  'use strict';
  SFCViewer.init();



  var hardly = new SFCViewer.Models.SfEvent({
    "id": "hardly-strictly-2014"
  });
  // hardly.fetch(window.XHRHelper);


  var temp = new SFCViewer.Models.Polygon({
    "coordinates": [
      [
        37.76128348360843, -122.42841124534607
      ],
      [
        37.7580942260561, -122.42810010910034
      ],
      [
        37.75822145970878, -122.42584705352783
      ],
      [
        37.76141071177564, -122.42613673210143
      ],
      [
        37.76128348360843, -122.42841124534607
      ]
    ],
    "data": {}
  });
  // temp.fetch(window.XHRHelper);
  //var temp_render = new SFCViewer.Views.MapDisplay({
    //model: temp
//  });


});

