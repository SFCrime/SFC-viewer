/*global SFCViewer, Backbone*/

SFCViewer.Models = SFCViewer.Models || {};

(function () {
    'use strict';

    SFCViewer.Models.CrimeArea = Backbone.Model.extend({

        urlRoot: "http://localhost:5000/api/v1/crime/?",
        
        initialize: function() {
            if (this.get("layer") !== undefined) {
                this.setId();
            }
        },

        url: function() {
            var base =
                _.result(this, 'urlRoot') ||
                _.result(this.collection, 'url') ||
                urlError();
            if (this.isNew()) return base;
            return base.replace(/([^\/])$/, '$1') + this.id;
        },

        setId: function() {
            this.set("geojson_shape",this.get("layer").toGeoJSON());
            
            var temp = this.get("geojson_shape")
                .geometry
                .coordinates[0]
                .map(function(d){ return String(d[0]).concat(" ", d[1])})
                .join();
            
            this.set("id", $.param({
                "type":this.get("geojson_shape").geometry.type,
                "coordinates": temp
            }));

        },
        
        defaults: {
            "geojson_shape":{},
            "geojson":{},
            "layer":{}
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
