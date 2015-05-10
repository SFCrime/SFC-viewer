

function showRadar(){
    var data = [];
    var chart = RadarChart.chart();

    var c = document.getElementById("data").value,
        w = document.getElementById("w").value,
        h = document.getElementById("h").value,
        csv = c.split("\n").map(function(i){return i.split(",")})
    headers = []
 
}
