var json_to_map = function(
  jsonAsArrayElement,
  colorScale,
  mapTitle
) {
  if (document.getElementById("loading")) {
    document.getElementById("loading").remove();
  }

  //allow for async with the d3.json function
  //note: come up with a better way of dealing with this async.
  d3.json("Counties.geojson", function(
    error,
    counties_json
  ) {
    //In d3_map_setup, we created a variable called g which will house our map
    //Here, we go county by county, appending the shapefile to the g element on the DOM
    var tooltip = d3
      .select("svg")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#000")
      .text("a simple tooltip");

    g.append("g")
      .attr("id", "counties")
      .selectAll("path")
      .data(jsonAsArrayElement)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "state")
      .style("fill", function(d) {
        return colorScale(Number(d.properties.dataPoint));
      })
      .on("mouseover", function(d) {
        // svg.append("svg").append("text")
        //     .attr("id", "tooltip")
        //     .attr("x", xPosition)
        //     .attr("y", yPosition)
        //     .attr("text-anchor", "middle")
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", "19px")
        //     .attr("font-weight", "bold")
        //     // .attr("fill", "black")
        //     .text(d.properties.dataPoint);
        d3.select("#tooltip3")
          .append("div")
          .attr("id", "tooltip2");
        document.getElementById(
          "tooltip2"
        ).innerHTML = "<p>" + d.properties.NAME +
          " County <br><br>" +
          d.properties.dataPoint +
          " " +
          mapTitle +
          "" +
          "</p>";
        var xPosition = d3.mouse(this)[0];
        var yPosition = d3.mouse(this)[1];

        $("#tooltip2")
          .css({
            top: yPosition,
            left: xPosition,
            visibility: "visible"
          })
          .fadeIn("slow");

        d3.select(this).style("fill", "#fff");
      })
      .on("mouseout", function(d) {
        $("#tooltip2").remove();
        // d3.select("#tooltip").remove();
        d3.select(this)
          .transition()
          .duration(250)
          .style("fill", function(d) {
            var dataPoint = d.properties.dataPoint;

            if (dataPoint) {
              return colorScale(
                Number(d.properties.dataPoint)
              );
            } else {
              return "#ddd";
            }
          });
      });
  });
};
