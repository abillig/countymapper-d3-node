var json_to_map = function(array){

 var features = array;
var purples = ["#dcefd5","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#005a32", "#032f20"]

if (document.getElementById("loading")){
document.getElementById("loading").remove()
}

var colorScale = function(num){
    if (num < 30) return purples[0];
    else if (num > 30 && num <=35) return purples[1]
    else if (num > 35 && num <=40) return purples[2]
    else if (num > 40 && num <=45) return purples[3]
    else if (num > 45 && num <=50) return purples[4]
    else if (num > 50 && num <=55) return purples[5]
    else if (num > 55 && num <=60) return purples[6]
    else if (num > 60 && num <=185) return purples[7]
    // else if (num > 65 && num <=75) return purples[8]

}


//  var colorScale = d3.scale.linear()
//  .domain(d3.extent(features, function(d) { return d.properties.ALICE + d.properties.poverty; }))
//  .range([purples[0], purples[6]])

mapLayer.selectAll('path')
 .data(features)
 .enter().append('path')
 .attr('d', path)
 .attr('vector-effect', 'non-scaling-stroke')
 .style('fill', function(d) { return colorScale(Number(d.properties.data_point)); })


svg.selectAll(".subunit")
                .data(features)
            .enter().append("path")
                .attr("d", path)
                .style('fill', function(d) { return colorScale(Number(d.properties.data_point)); })




}
