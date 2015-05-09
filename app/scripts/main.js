$(document).ready(function() {
    'use strict';

    var setUp = window.setupApp();

    var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";
    var urlBase = "http://localhost:5000/api/v1/crime/?";


    var story = function(divId) {
        var map = L.map(divId + "map").setView([37.77, -122.44], 13);
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        }).addTo(map);

        var selector;
        for (var divclass in this.divs) {
            selector = "#" + divId + " > ." + divclass; // as long as it's in the map story part
            $(selector).text(this.divs[divclass]);
        }

        var feats = this.geoJSON.features;
        var chunk = this.geoJSON.features.length / 24;

        for (var i = 0; i < 5; i++) {
            setTimeout(this.renderFunc, i * 1000, map, {
                type: "FeatureCollection",
                features: feats.slice(i * chunk, (i + 1) * chunk)
            });
        }
        // d3
        var groups = _.groupBy(feats, function(d) {
            return d.properties.date
        });

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        var data = [];
        for (var f in groups) {
            data.push({
                date: parseDate(f),
                details: groups[f].length
            });
        }
        var margin = {
                top: 2,
                right: 2,
                bottom: 3,
                left: 5
            },
            width = 400 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;


        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.details);
            });

        var svg = d3.select("#"+divId + "-d3").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function(d) {
            return d.date;
        }));
        y.domain(d3.extent(data, function(d) {
            return d.details;
        }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Total Crime");
        
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
        



        //end d3

        return {
            map: map
        }

    }

    // Story 1
    d3.xhr(urlBase + $.param({
        start_date: "10-30-2014",
        end_date: "11-3-2014"
    }), function(resp) {
        story.call({
            geoJSON: JSON.parse(resp.response).geojson_crime,
            divs: {
                title: "First Story Title",
                descrip: "This is the description, someone did something. We can see that we have a rise in something over the time of this. Click the button below to animate the story and see the next thing that comes along."
            },
            renderFunc: function(map, geoJSON) {
                L.geoJson(geoJSON).addTo(map);
            }

        }, "story1");
    });


});
