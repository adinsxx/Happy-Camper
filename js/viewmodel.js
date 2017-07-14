var ViewModel = function (data) {
  var self = this;
  this.title = ko.observableArray([]);
  this.locationList = ko.observableArray([]);
  this.query = ko.observable();

  this.queryResult = ko.computed(function() {
  	return this.locationList() + this.title;
  }, this);
};