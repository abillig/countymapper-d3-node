var colorScaleBuilder = function(
  arrayOfValues,
  colorSelection
) {
  //this function prepares a customized colorScale function, which incorporates
  //the values from the csv, finds their minimum and maximum,
  //and then uses d3's scale creator to take in any value included in the dataset,
  //and return a hexidecimal color value along the gradient passed in from the user's selection.
  //the colorScale function will then be passed on to jsonToMap so that each county
  //can have a particular gradient.
  var zerosub = arrayOfValues.map(function(num) {
    if (num === "") {
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

  var colorsAndGradients = {
    "purple": ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
    "green": ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"] ,
    "blue": ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
    "red": ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
    "black_and_white": ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
    "orange": ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"]
  }

  var colorScale = function(num) {
    var colorScale = colorsAndGradients[colorSelection];
    var scale = d3.scale
      .linear()
      .domain([ objectValuesMin, objectValuesMax ])
      .range([ 1, 9 ]);
    return colorScale[Math.round(scale(num))];
  };

  return colorScale;
};
