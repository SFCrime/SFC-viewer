/*global SFCViewer, Backbone*/

SFCViewer.Models = SFCViewer.Models || {};

(function () {
    'use strict';

    SFCViewer.Models.Polygon = Backbone.Model.extend({
    url: "http://localhost:5000/api/v1/crime/polygon/%2D122.42841124534607%2037.76128348360843%2C%2D122.42810010910034%2037.7580942260561%2C%2D122.42584705352783%2037.75822145970878%2C%2D122.42613673210143%2037.76141071177564%2C%2D122.42841124534607%2037.76128348360843",

        initialize: function() {
            this.fetch({xhrFields:{withCredentials:true}});
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
