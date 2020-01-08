// Created the map and map settings(styles and map starting point) to be displayed on the page.
  
var map, marker;
var options = {
  center: {lat: 41.850033, lng: -87.6500523},
  zoom: 13,
  styles: [
      {elementType: "geometry", stylers: [{color: "#ebe3cd"}]},
      {elementType: "labels.text.fill", stylers: [{color: "#523735"}]},
      {elementType: "labels.text.stroke", stylers: [{color: "#f5f1e6"}]},
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{color: "#c9b2a6"}]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{color: "#dcd2be"}]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{color: "#ae9e90"}]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{color: "#dfd2ae"}]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{color: "#dfd2ae"}]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c"}]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{color: "#a5b076"}]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{color: "#447530"}]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{color: "#f5f1e6"}]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{color: "#fdfcf8"}]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{color: "#f8c967"}]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{color: "#e9bc62"}]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{color: "#e98d58"}]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{color: "#db8555"}]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{color: "#806b63"}]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{color: "#dfd2ae"}]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{color: "#8f7d77" }]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{color: "#ebe3cd"}]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{color: "#dfd2ae"}]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{color: "#b9d3c2"}]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{color: "#92998d"}]
    },
    ]
};

// Created a function to handle Map creation 

function createMap(){

  map = new google.maps.Map(document.getElementById("mapDisplay"), options); 

    
  var input = document.getElementById("inputDestination");
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener("bounds_changed" , function() {
    searchBox.setBounds(map.getBounds());
  });

// !!--This code was first created to change to the destination entere, The code doesn't really influence the functinoality, so I commented it out.

  // var markers = [];
   
  // searchBox.addListener('places_changed' , function(){
  //   var places = seachbox.getPlaces();

  //   if (places.length === 0) 
  //     return;

  // markers.forEach(function(m) { m.setMap(null); });
  // markers = [];

  // var bounds = new google.maps.LatLngBounds();

  // places.forEach(function (p) {
  //   if (lp.geometery)
  //     return;

  //   markers.push(new google.maps.Marker({
  //     map: map,
  //     title: p.name,
  //     position: p.geometery.location 
  //   }));

  //   if (p.geometery.viewport)
  //     bounds.union(p.geometery.viewport);
  //   else
  //     bounds.extend(p.geometery.location);
  // });
  // map.fitBounds(bounds);
  // })

// Getting current location info, and displays a marker of the user current location


  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
      var position = {
        lat: p.coords.latitude,
        lng: p.coords.longitude
      };
      infoWindow.setPosition(position);
      infoWindow.setContent("You're here!")
      infoWindow.open(map);
    }, function () {
      handleLocationError('Geolocation service failed', map.center());
    })
  } else{
    handleLocationError('No Geolocation Avaiable' , map.center());
  }
}

// This function handles a location error.


function handleLocationError (content, position){
infoWindow.setPosition(position);
infoWindow.setContent(content);
infoWindow.open(map);
}

google.maps.event.addListener(map, 'click', function(event) {
placeMarker(event.latLng);
});

// This function handles what happens when the button is clicked.  It renders the polyline for directions and marks the current time and the travel time.  

function handleBtnClick(){

var directionsRenderer = new google.maps.DirectionsRenderer();

var map = new google.maps.Map(document.getElementById("mapDisplay"), options);
directionsRenderer.setMap(map);

var destination = document.getElementById('inputDestination').value;
var directionObject = {
  origin: "Robins School of Business",
  destination: destination,
  travelMode: "WALKING",
}

var directionsService = new google.maps.DirectionsService();

directionsService.route(directionObject, function(result, status) { 
  if (status == 'OK') { 
    directionsRenderer.setDirections(result); 
    
    const duration = result.routes[0].legs[0].duration.text
    
    document.getElementById("arrivalOutput").innerHTML = duration;

    document.getElementById("departureOutput").innerHTML = moment().format("hh:mm A");
  }
  }
  );

  // This API call handles the weather data,  It will ask the user for current location information again.  We couldn't figure out how to have one location grab for both API calls.
  
let rainChance = document.querySelector('#rain-chance');


    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
         long = position.coords.longitude;
         lat = position.coords.latitude;

           const proxy = `https://cors-anywhere.herokuapp.com/`;
           const api = `${proxy}https://api.darksky.net/forecast/9c3f1b2093600100e3b6d747fa501d3f/${lat},${long}`; 
                
                fetch(api)
                    .then(response => {
                         return response.json()
                 })
                    .then(data => {
                        console.log(data);
                        const {summary} = data.minutely;
                      rainChance.textContent = summary;
                    });

                 });
}
}
