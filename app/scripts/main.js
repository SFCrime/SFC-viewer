/*global SFCViewer, $*/


window.SFCViewer = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    'use strict';
    var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";

    window.Map = L.map('map').setView([37.76, -122.44], 12);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(window.Map);

  }
};

$(document).ready(function() {
  'use strict';
  SFCViewer.init();
  var temp = new SFCViewer.Models.Polygon();
  var temp_render = new SFCViewer.Views.PolygonMap({
    model: temp
  });



});
