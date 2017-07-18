var Location = function (data) {
	this.name = data.title;
	this.marker = data.marker;
}

var ViewModel = function (data) {
  var self = this;
  this.title = ko.observableArray([]);
  this.locationList = ko.observableArray([]);
  this.filter = ko.observable('');


  locations.forEach(function (locationItem) {
  	self.locationList.push(new Location(locationItem) );
  });

  this.activateMarker = function(location) {
		console.log(location)
		google.maps.event.trigger(location.marker, 'click')
  };

  this.filteredPlaces = ko.computed(function() {
  	var filter = self.filter().toLowerCase();
  	if(!filter) {
  		self.locationList().forEach(function(location) {
  			if (location.marker) {
  						location.marker.setVisible(true);
  			}
  		});
  			return self.locationList()
  	} else {
  		return ko.utils.arrayFilter(self.locationList(), function(location) {
  			console.log(location);
  			var searchValue = location.name.toLowerCase().indexOf(filter) !== -1;
  			location.marker.setVisible(searchValue);
  			return searchValue
  		});
  	}
  });	
};