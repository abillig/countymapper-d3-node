function calculateCountyTotals(dataArray){
  var countyObject={}
  //will ultimately list total data points for county by adding up data point zip code by zip code
  //structure will be {county: total, county2: total2}
  dataArray.forEach(function(element) {
    if(Object.keys(countyObject).includes(element.properties.county)){
      countyObject[element.properties.county] += Number(element.properties.data_point)
    } else {
      countyObject[element.properties.county] = Number(element.properties.data_point)
    }
})
return countyObject
}

function addCountyTotalsToCounty(object, loadJSON){

  //this should not be repeated here. need to find a way to have this callback pass in successfully!

  var loadJSON = function loadJSON(path, success, error){
    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    };

    var alteredJSON = []
  // debugger;
  loadJSON('Counties.geojson',
         function(data, elements) {
           data.features.forEach(function(element) {
           element.properties.data_total = this[element.properties.NAME]
           alteredJSON.push(element)

          //THIS IS WHERE YOU'VE BROKEN INTO EACH JSON ELEMENT. DO WHATEVER.
          // contentsArray[element.properties.NAME]

  }.bind(object))
  // console.log(alteredJSON)

  return alteredJSON
  // return alteredJSON
});
};


function alter_and_map_json(array) {
  var loadJSON = function loadJSON(path, success, error){
    var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    };

    var array_to_object = {}
    array.map(function(zip_row){
      var zip_row_sections = zip_row.split(",")
      array_to_object[zip_row_sections[0]] = zip_row_sections[1]
    })


    //no idea why but the loadjson function doesn't recognize another variable
    //declared out here. only when it's named elements. curious and infuriating. so have to pack both the
    //array and the empty array into one array.
    var elements = [array_to_object, []]


loadJSON('ny_zips_with_counties2.geojson',
       function(data) { data.features.forEach(function(element) {
        //THIS IS WHERE YOU'VE BROKEN INTO EACH JSON ELEMENT. DO WHATEVER.
        // contentsArray[element.properties.NAME]
          element.properties.data_point = elements[0][element.properties.ZCTA5CE10]
          elements[1].push(element)
          // debugger;

})

var countyTotalsObject = calculateCountyTotals(data.features)


json_to_map(elements[1], countyTotalsObject, addCountyTotalsToCounty);

},
       function(xhr) { console.error(elements[1]); }

)


}
