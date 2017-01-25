var width = 960,
 height = 1160;


//note: for phone, change .attr("viewBox", "0 100 1000 1300") 700 number to be 700.

var svg = d3.select("#the_map")
 .append("div")
//  .classed("svg-container", true)
 .append("svg")
 .attr("preserveAspectRatio", "xMinYMin meet")
 .attr("viewBox", "-100 100 700 1300")
 .classed("svg-content-responsive-state", true);
  // .append("foreignObject")
  //    .attr("width", 100)
  //    .attr("height", 100)
  //    .append("xhtml:div")
  //    .style("color", "red")
  //    .html("Object in SVG");


//LEGEND



var purples = [["> 60 ", "#032f20"], ["55 - 60", "#005a32"], ["50 - 54", "#238b45"], ["45 - 49", "#41ab5d"], ["40 - 44", "#74c476"], ["35 - 39", "#a1d99b"], ["30 - 34", "#c7e9c0"], ["< 30", "#dcefd5"]]

// d3.select('.svg-container').append('text')
//         .attr('class', 'legend-explainer')
//         .html('% of households <br> below ALICE <br>threshold');



//MAP

var g = svg.append('g');

var mapLayer = g.append('g')
 .classed('map-layer', true);


var projection = d3.geo.mercator()
 .scale(4500)
 .center([-74.0059, 40.7128])
 .translate([width / 2, height / 2]);


var path = d3.geo.path()
 .projection(projection);




var scale0 = (width - 1) / 2 / Math.PI;

var zoom = d3.behavior.zoom()
    .translate([width / 2, height / 2])
    .scale(scale0)
    .scaleExtent([scale0, 8 * scale0])
    .on("zoom", zoomed);

    function zoomed() {
      projection
          .translate(zoom.translate())
          .scale(zoom.scale());

      g.selectAll("path")
          .attr("d", path);
    }

    d3.select(self.frameElement).style("height", height + "px");
