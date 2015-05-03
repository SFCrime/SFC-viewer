/*global SFCViewer, Backbone*/

SFCViewer.Models = SFCViewer.Models || {};

(function () {
    'use strict';

    SFCViewer.Models.CrimeArea = Backbone.Model.extend({

        urlRoot: "http://localhost:5000/api/v1/crime/?",

        initialize: function() {
            console.log(this);
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
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
