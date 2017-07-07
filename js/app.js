// Location Data
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
    }
    
];

// Map constructor
var map;
var markers = [];

var Place = function (data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:43.78444, lng:-88.787868},
    zoom: 8,
    mapTypeControl: false,
    MapTypeId: google.maps.MapTypeId.HYBRID
  });

  infoWindow = new google.maps.InfoWindow();
  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(),
    map: map,
    title: this.name
  });
};

function ViewModel() {
  var self = this;

  this.locationList = ko.observableArray([]);

  locations.forEach(function(locationItem){
    self.locationList.push(new Place(locationItem) );
  });

  this.currentPlace = ko.observable(this.locationList[0]);

};

ko.applyBindings(new ViewModel());

