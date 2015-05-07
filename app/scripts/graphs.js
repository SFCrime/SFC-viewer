$(document).ready(function() {
    'use strict';
    window.setupApp();

    d3.xhr("http://localhost:5000/api/v1/crime/?type=Polygon&coordinates=-122.43114709854127+37.75737492779443%2C-122.43114709854127+37.76243022568955%2C-122.42318630218506+37.76243022568955%2C-122.42318630218506+37.75737492779443%2C-122.43114709854127+37.75737492779443&start_date=09-07-2014&end_date=09-20-2014", function(data) {
        drawMarkerArea(JSON.parse(data.response));
    });

    function drawMarkerArea(data) {
        var data = crossfilter(data.geojson_crime.features),
            groupname = "marker-area",
            crime = data.dimension(function(d) {
                return d.geometry.coordinates[1] + "," + d.geometry.coordinates[0];
            }),
            crimeGroup = crime.group().reduceCount(),
            category = data.dimension(function(d) {
                return d.properties.category;
            }),
            categoryGroup = category.group().reduceCount(),
            dayofweek = data.dimension(function(d) {
                return d.properties.dayofweek;
            }),
            dayofweekGroup = dayofweek.group().reduceCount(),
            crimesbyday = data.dimension(function(d) {
                return new Date(d.properties.date);
            }),
            crimesbydayGroup = crimesbyday.group().reduceCount();

        // find earliest and latest dates and add 1 hour buffer
        var topDate = crimesbyday.top(1),
            maxTmp = new Date(topDate[0].properties.date),
            maxDate = new Date(maxTmp.setHours(maxTmp.getHours() + 1)),
            bottomDate = crimesbyday.bottom(1),
            minTmp = new Date(bottomDate[0].properties.date),
            minDate = new Date(minTmp.setHours(minTmp.getHours() - 1));

        dc.leafletMarkerChart("#map", groupname)
            .dimension(crime)
            .group(crimeGroup)
            .width(500)
            .height(500)
            .center([37.7595, -122.427])
            .zoom(16)
            .renderPopup(true)
            .filterByArea(true);

        dc.rowChart("#category", groupname)
            .dimension(category)
            .group(categoryGroup)
            .height(225)
            .width(450)
            .elasticX(true)
            .colors(["#2ca25f"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));

        dc.rowChart("#dayofweek", groupname)
            .dimension(dayofweek)
            .group(dayofweekGroup)
            .height(150)
            .width(450)
            .elasticX(true)
            .colors(["#2b8cbe"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));

        dc.barChart("#crimesbyday", groupname)
            .dimension(crimesbyday)
            .group(crimesbydayGroup)
            .width(450)
            .height(100)
            .transitionDuration(500)
            .elasticY(true)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .yAxis().ticks(2).tickFormat(d3.format("s"));

        dc.renderAll(groupname);
    }
});
