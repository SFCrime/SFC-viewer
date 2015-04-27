/*global SFCViewer, Backbone*/

SFCViewer.Models = SFCViewer.Models || {};

(function() {
  'use strict';

  SFCViewer.Models.Polygon = Backbone.Model.extend({
    urlRoot: "http://localhost:5000/api/v1/crime/polygon/",

    initialize: function() {
      this.setCoordsToId();
    },

    setCoordsToId: function() {
      this.set("id", this.get("coordinates").map(function(d){
          return String(d[1]).concat(" ", d[0]);
        }).join());
    },

    defaults: {
      "map": window.Map,
      "coordinates": [],
      "server_coordinates":"",
      "data": {},
      "id": ""
    },

    validate: function(attrs, options) {

    },

    parse: function(response, options) {
      var coordinates = response.coordinates.map(function(d) {
        return [d[1], d[0]]; // becomes lat, long
      });
      return {
        "coordinates": coordinates,
        "data": response.data,
      };
    }
  });

})();
