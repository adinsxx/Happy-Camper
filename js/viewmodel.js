var Location = function (data) {
	this.locations = data.title;
}

var ViewModel = function (data) {
  var self = this;
  this.title = ko.observableArray([]);
  this.locationList = ko.observableArray([]);
  this.query = ko.observable();
  this.markers = ko.observableArray([]);

  locations.forEach(function (locationItem) {
  	self.locationList.push(new Location(locationItem) );
  });

  this.activateMarker = function(location) {
	
	console.log(location)
  };
};