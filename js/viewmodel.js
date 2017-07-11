var ViewModel = function (map, data) {
  var self = this;
  this.query = ko.observable('');
  this.locationsList = ko.observableArray([]);
  this.markers = ko.observableArray([]);
  this.title = ko.observableArray([]);

  var config = {
    apiKey: "MEDC0WAGH4RJ5Q3VGZ3XYRAMPIYYY3RH04SN0QQ2FLRRZI4A",
    authUrl: "https://foursquare.com/",
    apiUrl: 'https://api.foursquare.com/'
  };

  function doAuthRedirect() {
    var redirect = window.location.href.replace(window.location.hash, '');
    var url = config.authUrl + 'oauth2/authenticate?response_type=token&client_id=' + config.apiKey + 
        '&redirect_uri=' + encodeURIComponent(redirect) + 
        '&state=' + encodeURIComponent(window.location.hash);
    window.location.href = url;
  };

  $.getJSON(config.apiUrl + 'v2/venues/explore?11=' + lat + ',' + lng + '&oauth_token=' + window.token + '&v=20170711', {}, function(data){
    venues = data['response']['groups'][0]['items'];
    for (var i = 0; i < venues.length; i++) {
      var latLng = new L.LatLng(
        venues[i]['venue']['location']['lat'],
        venues[i]['venue']['location']['lng']
      );
      var fsqIcon = venues[i]['venue']['categories'][0]['icon'];
      var leafletIcon = L.Icon.extend({
        iconUrl: fsqIcon['prefix'] + '32' + fsqIcon['suffix'],
        shadowUrl: null,
        iconSize: new L.Point(32, 32),
        iconAnchor: new L.Point(16, 41),
        popupAnchor: new L.Point(0, -51)
      });
      var icon = new leafletIcon();
      var marker = new L.Marker(latLng, {icon: icon})
        .bindPopup(venues[i]['venue']['name'], {closeButton: false})
        .on('mouseover', function(e) { this.openPopup();})
        .on('mouseout', function(e) { this.closePopup();})
      map.addLayer(marker);
    }
  })
};