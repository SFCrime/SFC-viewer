/*global SFCViewer, Backbone, JST*/

SFCViewer.Views = SFCViewer.Views || {};

(function() {
  'use strict';

  SFCViewer.Views.PolygonMap = Backbone.View.extend({
    id: '',

    className: '',

    events: {},

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var polygon = window.L.polygon(this.model.get("coordinates")).addTo(window.Map);
    }

  });

})();
