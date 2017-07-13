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
  self.foursquareID = data.foursquareID;
};


  var LatLng = {lat:43.78444, lng:-88.787868};
  map = new google.maps.Map(document.getElementById('map'), {
    center: LatLng,
    zoom: 8,
    mapTypeControl: false,
    MapTypeId: google.maps.MapTypeId.HYBRID
  });



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

      var infoWindow = new google.maps.InfoWindow();

      var CLIENT_ID = 'MEDC0WAGH4RJ5Q3VGZ3XYRAMPIYYY3RH04SN0QQ2FLRRZI4A';
      var CLIENT_SECRET = 'DCMTED1NBXVYU2UB1F35UUOAEROL4TA30K2XARLIWUDZGJGH';
      var VERSION = '20170712';

        var url = 'https://api.foursquare.com/v2/venues/explore?v=20170713' 

        $.ajax({
        url: url,
        dataType: 'json',
        data: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          v: VERSION,
          near:,
          query: "food",
          asnyc: true

        },
        success: function(data) {
        var venue = data.title;

         if (infoWindow.marker != marker) {
          infoWindow.marker = marker;
          infoWindow.setContent('<div>' + '<b>' + venue + '</b>');
          infoWindow.addListener('closelick', function(){
            infoWindow.marker = null;
          infoWindow.open(map, marker);
          }); 
          }
          console.log(venue);

        }
      }).fail(function (e) {
        
      });
  }
ko.applyBindings(new ViewModel(locations[0]));

}


