// Map constructor
var map;
var markers = [];
var infoWindow;

function initMap(data) {

  var Place = function(data) {
  var self = this;
  self.title = data.title;
  self.lat = data.lat;
  self.lng = data.lng;
};


  var LatLng = {lat:43.78444, lng:-88.787868};
  map = new google.maps.Map(document.getElementById('map'), {
    center: LatLng,
    zoom: 8,
    mapTypeControl: false,
    MapTypeId: google.maps.MapTypeId.HYBRID
  });

      var infoWindow = new google.maps.InfoWindow();


      for (var i = 0; i < locations.length; i++) {
      var position = {lat: locations[i].lat, lng: locations[i].lng};
      var title = locations[i].title;
      var marker = new google.maps.Marker({
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

  function populateInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
      infoWindow.setContent('');
      infoWindow.marker = marker;
      infoWindow.addListener('closelick', function(){
        infoWindow.marker = null;
      });
          infoWindow.open(map, marker);
      }
  }
ko.applyBindings(new ViewModel(data));

}


