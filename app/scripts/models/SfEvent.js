/*global SFCViewer, Backbone*/

SFCViewer.Models = SFCViewer.Models || {};

(function() {
  'use strict';

  SFCViewer.Models.SfEvent = Backbone.Model.extend({

    urlRoot: "http://localhost:5000/api/v1/events/",

    initialize: function() {},

    defaults: {},

    validate: function(attrs, options) {},

    parse: function(response, options) {
      response.coordinates = response.shape_list.map(function(d) {
        return [d[1], d[0]];
      });
      return response;
    }
  });

})();
