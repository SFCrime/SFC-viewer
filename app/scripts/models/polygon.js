/*global SFCViewer, Backbone*/

SFCViewer.Models = SFCViewer.Models || {};

(function() {
  'use strict';

  SFCViewer.Models.Polygon = Backbone.Model.extend({

    urlRoot: "http://localhost:5000/api/v1/crime/?",
    // http://localhost:5000/api/v1/crime/?type=Polygon&coordinates=-122.42841124534607+37.76128348360843%2C-122.42810010910034+37.7580942260561%2C-122.42584705352783+37.75822145970878%2C-122.42613673210143+37.76141071177564%2C-122.42841124534607+37.76128348360843
    initialize: function() {
      this.setCoordsToId();
    },

    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1') + this.id;
    },

    setCoordsToId: function() {
      var temp = this.get("coordinates").map(function(d) {
        return String(d[1]).concat(" ", d[0]);
      }).join();
      this.set("id", $.param({
        "type": "Polygon",
        "coordinates": temp
      }));

    },

    defaults: {
      "coordinates": [],
      "data": {},
      "id": ""
    },

    validate: function(attrs, options) {},

    parse: function(response, options) {
//      console.log(response);
      var coordinates = response.coordinates.map(function(d) {
        return [d[1], d[0]]; // becomes lat, long
      });
      return {
        "coordinates": coordinates,
        "type": "polygon",
        "data": response.data,
      };
    }
  });

})();
