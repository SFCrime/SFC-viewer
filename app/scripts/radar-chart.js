$(document)
    .ready(function() {
        var w = 800,
            h = 800;
        d3.xhr("scripts/radar.csv", function(csv) {

            function showLegend(data) {

                console.log(data);
                var colors = d3.scale.category10().range().slice(0, 7);
                var cols = _.zip(data.map(function(d) {
                    return d.className;
                }), colors);

                console.log(cols);



                var newhtml = cols.map(function(d) {

                    var name = d[0];
                    var color = d[1];

                    return "<div class='" + d[0] + "' style='color:" + color + ";'>" + name + "</div>";
                });
                $('#legend').html(newhtml);

            }

            function showRadar() {
                var data = [];
                var chart = RadarChart.chart();

                var c = csv.response;
                csv = c.split("\n").map(function(i) {
                    return i.split(",")
                })
                headers = []
                csv.forEach(function(item, i) {
                    if (i == 0) {
                        headers = item;
                    } else {
                        newSeries = {};
                        item.forEach(function(v, j) {
                            if (j == 0) {
                                newSeries.className = v;
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
                RadarChart.defaultConfig.radius = 0;
                RadarChart.defaultConfig.w = w;
                RadarChart.defaultConfig.h = h;
                RadarChart.defaultConfig.circles = false;
                RadarChart.draw("#radar-chart", data);
                showLegend(data);
            }
            showRadar();
            // is the hover object...
            $('.area').hover(function(e) {

                
            }, function(e) {
            });
        });
    });





//         var truecsv = 
// //        console.log(truecsv);
//         _.each(truecsv, function(item, i) {
//             if (i == 0) {
//                 headers = item.split(",");
//             } else {
//                 newSeries = {};
//                 _.each(item.split(","), function(v, j) {
//                     if (j == 0) {
//                         newSeries.className = v;
//                         newSeries.axes = [];
//                     } else {
//                         newSeries.axes.push({
//                             "axis": headers[j],
//                             "value": parseFloat(v)
//                         });
//                     }
//                 });
//                 console.log(newSeries);
//                 data.push(newSeries);
//             }
//         })
//         RadarChart.defaultConfig.radius = 3;
//         RadarChart.defaultConfig.w = w;
//         RadarChart.defaultConfig.h = h;
//         console.log(data);

//         RadarChart.draw("#radar-chart", data);

//         function animate(elem, time) {
//             if (!elem) return;
//             var to = elem.offsetTop;
//             var from = window.scrollY;
//             var start = new Date().getTime(),
//                 timer = setInterval(function() {
//                     var step = Math.min(1, (new Date().getTime() - start) / time);
//                     window.scrollTo(0, (from + step * (to - from)) + 1);
//                     if (step == 1) {
//                         clearInterval(timer);
//                     };
//                 }, 25);
//             window.scrollTo(0, (from + 1));
//         }

//         var divVal = document.getElementById('#radar-chart');
//         animate(divVal, 600);

//     });

// });
