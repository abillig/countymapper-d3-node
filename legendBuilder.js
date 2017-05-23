function legendBuilder(jsonObject) {
  //in building the legend, I have to feed into the d3 loop information containing
  //the relevant gradients and for each of them, the associated data range
  //corresponding to the map.
  //to minimize what I pass into d3, I take the geo object and strip out its values.
  //then i build a scale that can take in a number 1-9 and spit out a pair of values representing the range.
  //those (hex value, min and max) are combined into an array and added to an array of arrays.
  //using d3, i loop through those arrays of hex + data values and each time, add to the legend.
  var colorsAndGradients = {
    "purple": ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
    "green": ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"] ,
    "blue": ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
    "red": ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
    "black_and_white": ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
    "orange": ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"]
  }

  var zerosub = jsonObject.map(function(num) {
    if (num === "" || num === "greene") {
      return 0;
    }
    return Number(num);
  });

  var objectValuesMax = zerosub.reduce(function(a, b) {
    return Math.max(a, b);
  });
  var objectValuesMin = zerosub.reduce(function(a, b) {
    return Math.min(a, b);
  });

  var scale = d3.scale
    .linear()
    .domain([ 1, 9 ])
    .range([ objectValuesMin, objectValuesMax ]);

  // var selectedGradient = colorsAndGradients[document.getElementById('color_dropdown').value]
  var selectedGradient = colorsAndGradients["red"];

  var hexAndAssociatedDataValues = [];

  var numberArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

  numberArray.forEach(function(num) {
    hexAndDataValuesArray = [
      selectedGradient[num],
      scale(num),
      scale(num + 1)
    ];
    hexAndAssociatedDataValues.push(hexAndDataValuesArray);
  });

  var legend = d3
    .select("#legend")
    .append("svg")
    .attr("class", "legend-mobile-local")
    .attr("viewBox", function() {
      if (window.innerWidth < 1000) return "0 0 0 0";
      else return "50 0 220 120";
    })
    .append("g")
    .style("position", "absolute")
    .selectAll("g")
    .data(hexAndAssociatedDataValues)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
      var height = "6";
      var x = i * 18 + 120;
      var y = 18;
      return "translate(" + x + "," + y + ")";
    });

  legend.append("rect")
    .attr("width", "15")
    .attr("height", "15")
    .attr("x", "-45")
    .attr("y", "28")
    .style("fill", function(d, i) {
      return d[0];
    });

  legend.append("text")
    .attr("x", "-95")
    .attr("y", "-5")
    .style("font-size", function() {
      if (window.innerWidth < 900) return "1.5vh";
      else return "1.5vh";
    })
    .text(function(d, i) {
      return Math.round(d[1]) + " - " + Math.round(d[2]);
    })
    .style("fill", "black")
    .attr("transform", "rotate(-65)");

  legend.append("text")
    .attr("x", "-47")
    .attr("y", "14")
    .style("font-size", function() {
      if (window.innerWidth < 1000) return "1.8vh";
      else return "1.7vh";
    })
    .html(function(d, i) {
      if (i == 0) {
        return document.getElementById(
          "data_measure"
        ).value;
      } else if (i == 1) {
      } else if (i == 2) {
      }
    })
    .classed("legend-labels", true)
    .style("font-style", "italic")
    .style("fill", "black");
  //     .attr('transform', function(d, i) {
  //     var height = '6';
  //     var x = i * 170 / 2.7 - 50;
  //     var y = -25;
  //     return 'translate(' + x + ',' + y + ')';
  // });
}
