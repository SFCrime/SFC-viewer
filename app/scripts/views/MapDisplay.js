/*global SFCViewer, Backbone, JST*/

SFCViewer.Views = SFCViewer.Views || {};

(function() {
  'use strict';

  SFCViewer.Views.MapDisplay = Backbone.View.extend({

    id: '',

    className: '',

    events: {},

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var polygon;
      switch (this.model.get("shape_type")) {
        case "polygon":
          polygon = window.L.polygon(this.model.get("coordinates")).addTo(window.Map);
          break;
        case "line":
          break;
        case "point":
          break;
      }
    }

  });

})();
