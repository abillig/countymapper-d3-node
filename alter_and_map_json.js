function alter_and_map_json(array) {
  function loadJSON(path, success, error, json_to_map){
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
    }

    var array_to_object = {}
    array.map(function(zip_row){
      var zip_row_sections = zip_row.split(",")
      array_to_object[zip_row_sections[0]] = zip_row_sections[1]
    })


    //no idea why but the loadjson function doesn't recognize another variable
    //declared out here. curious and infuriating. so have to pack both the
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

json_to_map(elements[1]);

},
       function(xhr) { console.error(elements[1]); }
)


}
