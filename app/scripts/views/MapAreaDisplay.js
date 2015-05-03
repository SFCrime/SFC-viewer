/*global SFCViewer, Backbone, JST*/

SFCViewer.Views = SFCViewer.Views || {};

(function() {
  'use strict';

  SFCViewer.Views.MapAreaDisplay = Backbone.View.extend({

    events: {},

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

      render: function() {
          if (this.model.get("shape_layer") === undefined){   
              var layer = window.L.geoJson(this.model.get("geojson_shape"));
              this.model.set("shape_layer", layer);
              layer.addTo(window.Map);
          }
    }

  });

})();
