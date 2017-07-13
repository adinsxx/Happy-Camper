var ViewModel = function (data) {
  var self = this;
  this.query = ko.observable('');
  this.locationsList = ko.observableArray([]);
  this.markers = ko.observableArray([]);

  var CLIENT_ID = 'MEDC0WAGH4RJ5Q3VGZ3XYRAMPIYYY3RH04SN0QQ2FLRRZI4A'
  var CLIENT_SECRET = 'DCMTED1NBXVYU2UB1F35UUOAEROL4TA30K2XARLIWUDZGJGH'
  var url = 'https://api.foursquare.com/v2/venues/explore'
  var VERSION = '20170712'

  $.ajax({
    url: url,
    dataType: 'json',
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      v: VERSION,
      asnyc: true

    },()
    success: function(data) {

      console.log(data);

    }
  }).fail(function (e) {
    
  });
};