/*global SFCViewer, $*/


window.SFCViewer = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    'use strict';
    SFCViewer.init();
    var temp = new SFCViewer.Models.Polygon({});
});
