var ViewModel = function (data) {
  var self = this;
  this.query = ko.observable('');
  this.locationsList = ko.observableArray([]);
  this.markers = ko.observableArray([]);
};