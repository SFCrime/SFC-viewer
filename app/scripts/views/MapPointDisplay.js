/*global SFCViewer, Backbone, JST*/

SFCViewer.Views = SFCViewer.Views || {};

(function () {
    'use strict';

    SFCViewer.Views.MapPointDisplay = Backbone.View.extend({

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            if (this.model.get("points_layer") === undefined) {
                var layer = window.L.geoJson(this.model.get("geojson_crime"));
                this.model.set("points_layer", layer);
                layer.addTo(window.Map);
            }
        }

    });

})();
