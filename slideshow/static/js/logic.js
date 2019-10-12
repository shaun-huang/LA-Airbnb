console.log("in logic:");

// Creating map object
var myMap = L.map("map", {
  center: [34.0522,-118.2437],
  zoom: 10
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store Database query variables
var baseURL = '/json';


// Assemble API query URL
var url = baseURL

// Grab the data with d3
d3.json(url, function(response) {
  // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([response[i].latitude, response[i].longitude])
      .bindPopup(response[i].descriptor));

  };

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
