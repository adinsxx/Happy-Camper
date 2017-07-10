// Map constructor
var map;
var markers = [];

function initMap(data) {
  var LatLng = {lat:43.78444, lng:-88.787868};
  map = new google.maps.Map(document.getElementById('map'), {
    center: LatLng,
    zoom: 8,
    mapTypeControl: false,
    MapTypeId: google.maps.MapTypeId.HYBRID
  });

    // Location Data
  var locations = [
      { 
        title: "Devil's Lake State Park",
        lat: 43.428447,
        lng: -89.731368
      },
      { 
        title: "High Cliff State Park",
        lat: 44.163103,
        lng: -88.29097
      },
      { 
        title: "Harrington Beach State Park",
        lat: 43.492876,
        lng: -87.803664
      },
      { 
        title: "Kohler-Andrae State Park",
        lat: 43.664985,
        lng: -87.719721
      },
      { 
        title: "Blue Mound State Park",
        lat: 43.0295,
        lng: -89.840716
      },
      { 
        title: "Rocky Arbor State Park",
        lat: 43.641944,
        lng: -89.805833
      },
      { 
        title: "Governor Dodge State Park",
        lat: 43.027903,
        lng: -90.110189
      }
    ];

    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < locations.length; i++) {
    var position = {lat: locations[i].lat, lng: locations[i].lng};
    var title = locations[i].title;
    var  marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
    markers.push(marker);

    marker.addListener('click', function() {
      populateInfoWindow(this, infoWindow);
    });
  }

  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.setContent('');
      infowindow.marker = marker;
      infowindow.addListener('closelick', function(){
        infowindow.marker = null;
      });
    } 
  }

}

var Place = function (map, data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
};



// function ViewModel() {
//   var self = this;

// };


