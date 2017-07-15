var Location = function (data) {
	this.locations = data.title;
	this.marker = data.locationList;
}

var ViewModel = function (data) {
  var self = this;
  this.title = ko.observableArray([]);
  this.locationList = ko.observableArray([]);
  this.query = ko.observable();

  locations.forEach(function (locationItem) {
  	self.locationList.push(new Location(locationItem) );
  });

  this.activateMarker = function(location) {
		google.maps.event.trigger(marker, 'click')
		console.log(location)
  };
};