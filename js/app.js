//Model
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
  }
];

$(document).ready(function() {
  ko.applyBindings(viewModel);
});

function ViewModel() {
  var self = this;
  self.mapOne = ko.observable({
    lat: ko.observable(43.428447),
    lng: ko.observable(-89.731368)
  });

}

ko.bindingHandler.maps = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel){
    var mapObj = ko.utils.unwrapObservable(valueAccessor());
    var latLng = new google.maps.LatLng(
      ko.)
  }

}