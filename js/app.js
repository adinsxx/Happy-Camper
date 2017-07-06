var locations = [
    { 
      name: "Devil's Lake State Park",
      lat: 43.428447,
      lng: -89.731368
    },
    { 
      name: "High Cliff State Park",
      lat: 44.163103,
      lng: -88.29097
    },
    { 
      name: "Harrington Beach State Park",
      lat: 43.492876,
      lng: -87.803664
    },
    { 
      name: "Kohler-Andrae State Park",
      lat: 43.664985,
      lng: -87.719721
    },
    { 
      name: "Blue Mound State Park",
      lat: 43.0295,
      lng: -89.840716
    },
    { 
      name: "Rocky Arbor State Park",
      lat: 43.641944,
      lng: -89.805833
    },
    { 
      name: "Governor Dodge State Park",
      lat: 43.027903,
      lng: -90.110189
    },
    
];

// Map constructors 
var map;
var marker;

function initMap() {
  var styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:43.78444, lng:-88.787868},
    zoom: 8,
    mapTypeControl: false,
    styles: styles,
    MapTypeId: google.maps.MapTypeId.HYBRID
  });

};

function CampViewModel(){
  var self = this;
  this.name = ko.observable();
  this.lat = ko.observable();
  this.lng = ko.observable();

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var name = locations[i].name;
    var marker = new.google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.animation.DROP
    });
  }
}