$(document)
    .ready(function() {
        var w = 800,
            h = 800;
        d3.xhr("scripts/radar.csv", function(csv) {
            function showLegend(data) {
                var LegendOptions = cols = data.map(function(d, i) {
                    return {
                        text: "World Series Game " + (i + 1),
                        classed: d.className//.split("-").join("")
                    }
                });

                var colorscale = d3.scale.category10();
                //Legend titles
                var svg = d3.select('#legend')
                    .selectAll('svg')
                    .data([1])
                    .enter()
                    .append('svg')
                    .attr("width", 300)
                    .attr("height", 300);

                //Initiate Legend
                var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 300)
                    .attr("width", 300)
                    .attr('transform', 'translate(10,20)');
                //Create colour squares
                legend.selectAll('rect')
                    .data(LegendOptions)
                    .enter()
                    .append("rect")
                    .attr("x", 20)
                    .attr("y", function(d, i) {
                        return i * 20;
                    })
                    .attr("class", function(d) {
                        return d.class;

                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function(d, i) {
                        return colorscale(i);
                    });
                //Create text next to squares
                legend.selectAll('text')
                    .data(LegendOptions)
                    .enter()
                    .append("text")
                    .attr("x", 40)
                    .attr("y", function(d, i) {
                        return i * 20 + 9;
                    })
                    .attr("class", function(d) {
                        return d.classed;
                    })
                    .attr("font-size", "11px")
                    .attr("fill", "#737373")
                    .text(function(d) {
                        return d.text;
                    });


                var rects = d3.select("#legend").selectAll("svg").selectAll("rect");
                var texts = d3.select("#legend").selectAll("svg").selectAll("text");
                var mousov = function (el){
                    var graphed = d3.select("#radar-chart").selectAll("svg").selectAll("polygon."+el.classed);
                    graphed.classed("focused", true);
                    console.log(graphed);
                };
                var mousout = function (el){
                    var graphed = d3.select("#radar-chart").selectAll("svg").selectAll("polygon."+el.classed);
                    graphed.classed("focused", false);
                    console.log(graphed);
                };
                rects.on("mouseover", mousov);
                texts.on("mouseover", mousov);
                rects.on("mouseout", mousout);
                texts.on("mouseout", mousout);
                
            }

            function showRadar() {
                var data = [];
                var chart = RadarChart.chart();
                var c = csv.response;
                csv = c.split("\n").map(function(i) {
                    return i.split(",");
                })
                var headers = [];
                csv.forEach(function(item, i) {
                    if (i == 0) {
                        headers = item;
                    } else {
                        newSeries = {};
                        item.forEach(function(v, j) {
                            if (j == 0) {
                                newSeries.className = "a"+v;
                                newSeries.axes = [];
                            } else {
                                newSeries.axes.push({
                                    "axis": [headers[j]],
                                    "value": parseFloat(v)
                                });
                            }
                        });
                        data.push(newSeries);
                    }
                })
                data = data.slice(0, 7);
                RadarChart.defaultConfig.w = w;
                RadarChart.defaultConfig.h = h;
                RadarChart.defaultConfig.levels = 10;
                RadarChart.defaultConfig.circles = false;
                RadarChart.draw("#radar-chart", data);
                showLegend(data);
            }
            showRadar();



            // is the hover object...
            $('.area').hover(function(e) {


            }, function(e) {});
        });
    });
