$(document).ready(function() {
    'use strict';
    var setUp = window.setupApp();
    var url;

    var getGroupDict = function(crossfilterObj) {
        var crime = crossfilterObj.dimension(function(d) {
                return d.geometry.coordinates[1] + "," + d.geometry.coordinates[0];
            }),
            crimeGroup = crime.group(),
            category = crossfilterObj.dimension(function(d) {
                return d.properties.category;
            }),
            categoryGroup = category.group().reduceCount(),
            dayofweek = crossfilterObj.dimension(function(d) {
                var day = new Date(d.properties.date).getDay();
                var name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satday'];
                return day + '.' + name[day];
            }),
            dayofweekGroup = dayofweek.group().reduceCount(),
            crimesbyday = crossfilterObj.dimension(function(d) { // this needs to be fixed to do the timing right
                return new Date(d.properties.date);
            }),
            crimesbydayGroup = crimesbyday.group().reduceCount();

        return {
            crime: crime,
            crimeGroup: crimeGroup,
            category: category,
            categoryGroup: categoryGroup,
            dayofweek: dayofweek,
            dayofweekGroup: dayofweekGroup,
            crimesbyday: crimesbyday,
            crimesbydayGroup: crimesbydayGroup
        }
    }

    var renderData = function(data) {
        console.log(data);
        var response = JSON.parse(data.response);
        console.log(response);
        var geo1 = response.geojson_crime[0];
        var geo2 = response.geojson_crime[1];
        var crossfilter1 = crossfilter(geo1.features);
        var crossfilter2 = crossfilter(geo2.features);
        var geo1Groups = getGroupDict(crossfilter1);
        var geo2Groups = getGroupDict(crossfilter2);
        geo1Groups.group = "g1";
        geo1Groups.features = geo1.features;
        geo2Groups.group = "g2";
        geo2Groups.features = geo2.features;
        renderMarkerArea.call(geo1Groups, "#category", "#dayofweek");
        renderMarkerArea.call(geo2Groups, "#category2", "#dayofweek2");
        dc.renderAll("g1");
        dc.renderAll("g2");
    }

    var renderRowChart = function(divId, groupname, dimension, group) {
        var height = 300,
            width = 450;
        if (group.size() < 4) {
            height = 200;
        }
        return dc.rowChart(divId, groupname)
            .dimension(dimension)
            .group(group)
            .height(height);
    }

    var renderBarChart = function(divId, groupname, dimension, group) {
        var height = 200,
            width = 450;
        return dc.barChart(divId, groupname)
            .dimension(dimension)
            .group(group)
            .height(height);
    }

    var renderLeafletChart = function(divId, groupname, dimension, group, rawFeatures) {
        return dc.leafletMarkerChart(divId, groupname)
            .dimension(dimension)
            .group(group)
            .width(500)
            .height(500)
            .marker(function(d, map) {
                var marker = new L.Marker(d.key.split(","), {
                    title: "fuck off",
                    riseOnHover: true,
                    //icon: redIcon
                });
                return marker;
            })
            .popup(function(d, marker) {
                // d.value = number of points there
                //console.log(d);
                var filterFunc = function(d) {
                    return d.geometry.coordinates[1] + "," + d.geometry.coordinates[0] === this.key;
                }
                var filtered = rawFeatures.filter(filterFunc, d);

                var cats = filtered.map(function(d) {
                    return d.properties.category
                }).join(", ");
                //var cats = filtered.map(function(d){});
                var returnDiv = "<h5>Categories:</h5> " + cats;
                returnDiv = returnDiv + "<h5>Number of Records</h5> " + d.value;
                return returnDiv;
            })
            .center([37.77, -122.44])
            .zoom(12)
            .renderPopup(true)
            .filterByArea(true);
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



    function renderMarkerArea(div1,div2) {
        // be sure to only call with .call
        console.log(this);

        renderLeafletChart("#map", this.group, this.crime, this.crimeGroup, this.features);
        renderRowChart(div1, this.group, this.category, this.categoryGroup)
            .elasticX(true)
            .colors(["#2ca25f"])
            .xAxis().ticks(2).tickFormat(d3.format("s"));

        renderRowChart(div2,  this.group, this.dayofweek, this.dayofweekGroup)
            .elasticX(true)
            .colors(["#2b8cbe"])
            .label(function(d) {
                return d.key.split('.')[1];
            })
            .xAxis().ticks(2).tickFormat(d3.format("s"));

        // var topDate = crimesbyday.top(1),
        //     maxTmp = new Date(topDate[0].properties.date),
        //     maxDate = new Date(maxTmp.setHours(maxTmp.getHours() + 1)),
        //     bottomDate = crimesbyday.bottom(1),
        //     minTmp = new Date(bottomDate[0].properties.date),
        //     minDate = new Date(minTmp.setHours(minTmp.getHours() - 1));


        // dc.lineChart("#crimesbyday", groupname)
        //     .renderArea(true)
        //     .width(450)
        //     .height(200)
        //     .dimension(crimesbyday)
        //     .group(crimesbydayGroup)
        //     .x(d3.time.scale().domain([minDate, maxDate]))
        //     .elasticY(true)
        //     .yAxis().ticks(2).tickFormat(d3.format("s"));

        // console.log(crimesbyday);

        // dc.renderAll(groupname);
    }
});
