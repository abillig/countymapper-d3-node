//alterAndMapJson is the function called in the index file.
//It takes in the JSON contents with this structure:
// {county1 => dataPoint1, county2 => dataPoint2}

function alterAndMapJson(csvContentsAsObject, colorSelection, mapTitle) {
  var alteredJSON = []
    //load the counties shapefile. Then, go county by county altering the JSON.
    loadJSON('Counties.geojson',
       function(geoData, elements) {
         geoData.features.forEach(function(county) {
           //attach the relevant data point to the county shapefile
           //this is the 'alter' part of alterAndMapJSON
           //the JSON object will now have a dataPoint property that is equal to
           //the value in csvContentsAsObject corresponding to the key of the relevant county's name.
         county.properties.dataPoint = csvContentsAsObject[county.properties.NAME]
         alteredJSON.push(county)
          })
        });




var csvDataPoints = Object.values(csvContentsAsObject)
var colorScale = colorScaleBuilder(csvDataPoints, colorSelection)

//feed the altered JSON into the json_to_map function, which will map it using D3.
json_to_map(alteredJSON, colorScale, mapTitle);
legendBuilder(csvDataPoints)
}
