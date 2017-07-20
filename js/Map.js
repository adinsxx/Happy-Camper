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

  var LatLng = {lat:43.527642, lng:-88.790131};
  map = new google.maps.Map(document.getElementById('map'), {
    center: LatLng,
    zoom: 8,
    styles: styles,
    mapTypeControl: false,
    MapTypeId: google.maps.MapTypeId.HYBRID
  });



  for (var i = 0; i < locations.length; i++) {
  var position = {lat: locations[i].lat, lng: locations[i].lng};
  var title = locations[i].title;
  locations[i].marker = new google.maps.Marker({
    position: position,
    map: map,
    title: title,
    animation: google.maps.Animation.DROP,
    id: i
  });  


  markers.push(locations[i].marker);
  locations[i].marker.addListener('click', function() {
    map.setZoom(12);
    map.setCenter(position)
    populateInfoWindow(this, infoWindow);
  });
  }

  var searchBox = new google.maps.places.Autocomplete(
    document.getElementById('search'));

  function populateInfoWindow(marker, infoWindow) {

      var infoWindow = new google.maps.InfoWindow();

      var CLIENT_ID = 'MEDC0WAGH4RJ5Q3VGZ3XYRAMPIYYY3RH04SN0QQ2FLRRZI4A';
      var CLIENT_SECRET = 'DCMTED1NBXVYU2UB1F35UUOAEROL4TA30K2XARLIWUDZGJGH';
      var VERSION = '20170712';

        var url = 'https://api.foursquare.com/v2/venues/explore?v=20170713';

        $.ajax({
        url: url,
        dataType: 'json',
        data: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          v: VERSION,
          ll: marker.position.lat() + ',' + marker.position.lng(),
          section: 'drinks',
          asnyc: true
        },
        success: function(data) {

         if (infoWindow.marker != marker) {
          infoWindow.marker = marker;
          infoWindow.setContent('<div>' + '<b>' + marker.title + '</b>' + '</div>' + '<br>' + data.response.groups[0].items[0].venue.name);
          infoWindow.addListener('closelick', function(){
          infoWindow.marker = null;
          }); 
          

          infoWindow.open(map, marker);
          console.log(data);
        }

        }
      }).fail(function (e) {
        
      });

  }
ko.applyBindings(new ViewModel(locations[0]));

}
