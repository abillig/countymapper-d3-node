var width = 960,
    height = 600,
    centered;

var projection = d3.geo.mercator()
 .scale(3800)
 .center([-74.0059, 42.2128])
 .translate([width / 2, height / 2]);

var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

function zoomed() {
    svg.attr("transform",
        "translate(" + zoom.translate() + ")" +
        "scale(" + zoom.scale() + ")"
    );
}

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#embed").append("svg")
//this makes it responsive
.attr('viewBox', function(){if(window.innerWidth < 1000) return '0 0 1250 500'
      else return '0 0 1250 500';} )
    .append("g")
    .call(zoom);


var g = svg.append("g")
.style('position', 'absolute');
