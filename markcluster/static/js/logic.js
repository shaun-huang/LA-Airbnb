console.log("in logic:");
var stringdata = JSON.stringify(mydata);
var jsondata = JSON.parse(stringdata);
console.log(jsondata[0]);
d3.json(jsondata, function(data){
  console.log(data)
});

// // Creating map object
// var myMap = L.map("map", {
//   center: [34.0522,-118.2437],
//   zoom: 11
// });

// // Adding tile layer to the map
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// }).addTo(myMap);

// // Store Database query variables
// var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";

// // Assemble API query URL
// var url = baseURL + date + complaint + limit;

// // Grab the data with d3
// d3.json(mydata, function(response) {
//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();
//   // Loop through data
//   for (var i = 0; i < response.length; i++) {

//     // Set the data location property to a variable
//     var location = response[i].location;

//     // Check for location property
//     if (location) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(response[i].descriptor));
//     }

//   }

//   // Add our marker cluster layer to the map
//   myMap.addLayer(markers);

// });
