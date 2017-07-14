var ViewModel = function (data) {
  var self = this;
  this.title = ko.observableArray([]);
  this.locationList = ko.observableArray([]);
  this.query = ko.observable();

  locations.forEach(function (locationItem) {
  	self.locationList.push(new Location(locationItem) );
  });
};