var json_to_map = function(array, object){

  // var countyObject = addCountyTotalsToCounty(countyTotalsObject)
  json_to_map_complete(array, object)

function json_to_map_complete(array, object){
  debugger;
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
  }

  g.append("g")
       .attr("id", "counties")
       .selectAll('path')
   .data(features)
   .enter().append('path')
   .attr('d', path)
  .attr("class", "county-boundary")
      .on("click", countyclicked)
   .style('fill', function(d) { return colorScale(Number(d.properties.data_point)); })


        function countyclicked(d) {
          alert(d.properties.ZCTA5CE10);
        };

d3.json("Counties.geojson", function(error, counties_json) {

  g.append("g")
      .attr("id", "states")
    .selectAll("path")
    .data(counties_json.features)
    .enter().append("path")
  .attr("d", path)
  .attr("class", "state")
      .on("click", clicked);

  g.append("path")
      .datum(topojson.mesh(counties_json, counties_json.features))
      .attr("id", "state-borders")
      .attr("d", path);
});

};

};
