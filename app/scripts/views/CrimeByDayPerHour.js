/*global SFCViewer, Backbone, JST*/

SFCViewer.Views = SFCViewer.Views || {};

(function () {
    'use strict';

    SFCViewer.Views.CrimeByDayPerHour = Backbone.View.extend({

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
          var cf = this.model.get("crossfilter_object");

          var groupname = cf.groupname,
            dayofweek = cf.dayofweek,
            dayofweekGroup = cf.dayofweekGroup;

          dc.rowChart("#dayofweek", groupname)
            .dimension(dayofweek)
            .group(dayofweekGroup)
            .height(300)
            .width(270)
            .elasticX(true)
            .colors(["#2b8cbe"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));

          dc.renderAll(groupname);

        }

    });

})();
