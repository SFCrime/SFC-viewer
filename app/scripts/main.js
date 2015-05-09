$(document).ready(function() {
    'use strict';

    var setUp = window.setupApp();
    var mapbox_pk = "pk.eyJ1IjoiYmlsbGMiLCJhIjoiYllENmI2VSJ9.7 wxYGAIJoOtQ2WE3zoCJEA";
    var urlBase = "http://localhost:5000/api/v1/crime/?";
    var map = L.map("story1map").setView([37.77, -122.44], 13);
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/billc.lj7dn4cg/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    }).addTo(map);

    // Helps to Make our story Divs
    var story = function(divId, divs) {
        var selector;
        for (var divclass in divs) {
            selector = "#" + divId + " > ." + divclass; // as long as it's in the map story part
            $(selector).text(divs[divclass]);
        }
    }


    var colors = d3.scale.category10();
    var dimpleColors = colors.range().map(function(d) {
        return new dimple.color(d, d, 1);
    });
    var districts = [
        "CENTRAL", "SOUTHERN", "BAYVIEW",
        "MISSION", "PARK", "RICHMOND", "INGLESIDE",
        "TARAVAL", "NORTHERN", "TENDERLOIN"
    ];
    var districtColors = _.object(districts, colors.range());
    
    // Color Our Districts
    $.getJSON("scripts/districts.json", function(data) {
        L.geoJson(data, {
            style: function(feature) {
                return {
                    "color": districtColors[feature.properties.DISTRICT],
                    "weight": 4
                };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.DISTRICT + " District");
            }
        }).addTo(map);
    });


    // Story 1
    d3.xhr(urlBase + $.param({
        start_date: "10-30-2014",
        end_date: "11-2-2014"
    }), function(resp) {
        var divId = "story1";

        // set divs
        story(divId, {
            title: "Halloween 2014",
            descrip: "This is the description, someone did something. We can see that we have a rise in something over the time of this. Click the button below to animate the story and see the next thing that comes along."
        })


        //mapping
        var geoJSON = JSON.parse(resp.response).geojson_crime;
        //L.geoJson(geoJSON).addTo(map);
        // end mapping

        // dimple
        var groups = _.groupBy(geoJSON.features, function(d) {
            return [d.properties.date + "T" + d.properties.time.split(":")[0], d.properties.pddistrict];
        });
        var data = [];
        for (var f in groups) {
            data.push({
                date: f.split(",")[0],
                district: f.split(",")[1],
                "Total Crimes": groups[f].length
            });
        }
        var svg = dimple.newSvg("#" + divId + "-d3", 500, 200);
        var myChart = new dimple.chart(svg, data);
        myChart.addTimeAxis("x", "date", "%Y-%m-%dT%H", "%d/%m %H");
        myChart.addMeasureAxis("y", "Total Crimes");
        myChart.addSeries("district", dimple.plot.line);
        for (var col in districtColors){
            myChart.assignColor(col, districtColors[col], districtColors[col],1);
        }
        myChart.draw();
        //end dimple

    });


});
