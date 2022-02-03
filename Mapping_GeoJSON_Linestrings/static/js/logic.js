// Add console.log to check to see if our code is working.
console.log("working");

// We create the satellite street view tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{styleId}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    styleId: "light-v10",
    accessToken: API_KEY
});

// We create the dark view tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{styleId}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    styleId: "dark-v10",
    accessToken: API_KEY
});

// Create a base layer map that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [44.0, -80],
    zoom: 2,
    layers: [streets]
});

// Pass our map layers our layers control and add the layers to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto Airline Routes GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/boborodono/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/static/js/torontoRoutes.json";

// Grabbing pur GeoJSON data.
d3.json(torontoData).then(function(data) {
        console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    color: "#ffffa1",
    weight: 2,
    onEachFeature: function(feature, layer)  {
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: " + feature.properties.dst + "</h3>");

    }
})
.addTo(map);
});