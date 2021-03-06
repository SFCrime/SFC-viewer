$(document).ready(function() {
    'use strict';
    var setUp = window.setupApp();
    var url;
    var renderData = function(data) {
        var response = JSON.parse(data.response);
        console.log(response);
        drawMarkerArea(response.geojson_crime[0]);
        //drawMarkerArea(response.geojson_crime[1].features);
    }

    var RedIcon = L.Icon.Default.extend({
        options: {
            iconUrl: 'images/marker-icon-red.png'
        }
    });
    var redIcon = new RedIcon();


    if (!((setUp.getParams().type == "") || (setUp.getParams().type === undefined))) {
        url = setUp.api_url_base + $.param(setUp.getParams()); // do we have query params? if so set the url
    } else { // give a default view...likely change this in the future
        url = "http://localhost:5000/api/v1/crime/?type=1v1&geo_type=Polygon&coordinates=-122.43114709854127+37.75737492779443%2C-122.43114709854127+37.76243022568955%2C-122.42318630218506+37.76243022568955%2C-122.42318630218506+37.75737492779443%2C-122.43114709854127+37.75737492779443&start_date=09-07-2014&end_date=09-20-2014"
    }

    d3.xhr(url, renderData);


    function drawMarkerArea(inputGeoJSON) { // must accept only a geojson object
        var data = crossfilter(inputGeoJSON.features),
            groupname = "marker-area",
            crime = data.dimension(function(d) {
                return d.geometry.coordinates[1] + "," + d.geometry.coordinates[0];
            }),
            crimeGroup = crime.group(),
            category = data.dimension(function(d) {
                return d.properties.category;
            }),
            categoryGroup = category.group().reduceCount(),
            dayofweek = data.dimension(function(d) {
                var day = new Date(d.properties.date).getDay();
                var name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satday'];
                return day + '.' + name[day];
            }),
            dayofweekGroup = dayofweek.group().reduceCount(),
            crimesbyday = data.dimension(function(d) {
                return new Date(d.properties.date);
            }),
            crimesbydayGroup = crimesbyday.group().reduceCount();

        window.data = data;

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
            .marker(function(d, map) {
                // console.log(d);
                // console.log(inputGeoJSON);
                var marker = new L.Marker(d.key.split(","), {
                    title: "fuck off",
                    riseOnHover: true,
                    //         icon: redIcon
                });
                return marker;
            })
            .popup(function(d, marker) {
                // d.value = number of points there
                //console.log(d);
                var filterFunc = function(d) {
                        return d.geometry.coordinates[1] + "," + d.geometry.coordinates[0] === this.key;
                }
                var filtered = inputGeoJSON.features.filter(filterFunc, d);

                var cats = filtered.map(function(d){return d.properties.category}).join(", ");
                //var cats = filtered.map(function(d){});
                var returnDiv = "<h5>Categories:</h5> " + cats;
                returnDiv = returnDiv + "<h5>Number of Records</h5> " + d.value;
                return returnDiv;
            })
            .center([37.77, -122.44])
            .zoom(12)
            .renderPopup(true)
            .filterByArea(true);

        dc.rowChart("#category", groupname)
            .dimension(category)
            .group(categoryGroup)
            .height(300)
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
            .label(function(d) {
                return d.key.split('.')[1];
            })
            .xAxis().ticks(2).tickFormat(d3.format("s"));

        dc.barChart("#crimesbyday", groupname)
            .dimension(crimesbyday)
            .group(crimesbydayGroup)
            .width(450)
            .height(200)
            .transitionDuration(500)
            .elasticY(true)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .yAxis().ticks(2).tickFormat(d3.format("s"));

        dc.renderAll(groupname);
    }
});
