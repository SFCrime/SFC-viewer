/*global SFCViewer, Backbone*/

SFCViewer.Models = SFCViewer.Models || {};

(function () {
    'use strict';

    SFCViewer.Models.CrimeArea = Backbone.Model.extend({

        urlRoot: "http://localhost:5000/api/v1/crime/?",

        initialize: function() {
            if (this.get("shape_layer") !== undefined) {
                this.setId();
            }
            this.fetch(window.XHRHelper);
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
            this.set("geojson_shape",this.get("shape_layer").toGeoJSON());

            var temp = this.get("geojson_shape")
                .geometry
                .coordinates[0]
                .map(function(d){ return String(d[0]).concat(" ", d[1])})
                .join();

            this.set("id", $.param({
                "type":this.get("geojson_shape").geometry.type,
                "coordinates": temp,
                "start_date": "09-07-2014",
                "end_date":"09-10-2014"
            }));

        },

        defaults: {
            "crossfilter_object":undefined,
            "geojson_shape":undefined,
            "geojson_crime":undefined,
            "shape_layer":undefined,
            "points_layer":undefined
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            var tmp = crossfilter(response.geojson_crime.features);
            var crime = tmp.dimension(function(d) { return d.geometry.coordinates[1] + "," + d.geometry.coordinates[0]; });

            var category = tmp.dimension(function(d) { return d.properties.category; });

            var dayofweek = tmp.dimension(function(d) { return d.properties.dayofweek; });

            var crimesbyday =  tmp.dimension(function (d) { return new Date(d.properties.date); });
            response.crossfilter_object = {
              "data": tmp,
              "groupname": "marker-area",
              "crime": crime,
              "crimeGroup": crime.group().reduceCount(),
              "category": category,
              "categoryGroup": category.group().reduceCount(),
              "dayofweek": dayofweek,
              "dayofweekGroup": dayofweek.group().reduceCount(),
              "crimesbyday":crimesbyday,
              "crimesbydayGroup": crimesbyday.group().reduceCount()
            };
            return response;
        }
    });

})();
