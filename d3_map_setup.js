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

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .call(zoom);
    // .append("g");


    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", clicked);

    var g = svg.append("g");
