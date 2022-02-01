// Add console.log to check to see if our code is working.
console.log("working");

// We create the satellite street view tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{styleId}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    styleId: "streets-v11",
    accessToken: API_KEY
});

// We create the dark view tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{styleId}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    styleId: "satellite-streets-v11",
    accessToken: API_KEY
});

// Create a base layer map that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers control and add the layers to the map.
L.control.layers(baseMaps).addTo(map);

let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing pur GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    console.log(data);

    // This function returns the style data for ech of the earthquakes we plot on the map.
    // We pass the magnitude of the earthquake into a function to calculate the radius.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude  > 4) {
            return "#ea822c";
        }
        if (magnitude  > 3) {
            return "#ee9c00";
        }
        if (magnitude  > 2) {
            return "#eecc00";
        }
        if (magnitude  > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }
    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

// Creating a DeoJSON layer with the retrieved data.
    L.geoJson(data, {

// We turn each feature into a cirlceMarker on the map
pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
    },
    // We set the syle for each circleMarker using our styleInfo function
    style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude
    // and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }).addTo(map);
});