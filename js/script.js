'use strict';
// Model containing locations
var locations = [
	{
		name: "Devil's Lake State Park",
		lat: 43.428447,
		lng: -89.731368
	},
	{
		name: "High Cliff State Park",
		lat: 44.163103,
		lng: -88.29097
	},
	{
		name: "Harrington Beach State Park",
		lat: 43.492876,
		lng: -87.803664
	},
	{
		name: "Kohler-Andrae State Park",
		lat: 43.664985,
		lng: -87.719721
	},
	{
		name: "Blue Mound State Park",
		lat: 43.0295,
		lng: -89.840716
	}
];

//Global variables for the application
var map;
var client_ID;
var client_Secret;

//Used this function to format the phone numbers of the locations properly
function formatPhone(phonenum) {
    var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regexObj.test(phonenum)) {
        var parts = phonenum.match(regexObj);
        var phone = "";
        if (parts[1]) { phone += "+1 (" + parts[1] + ") "; }
        phone += parts[2] + "-" + parts[3];
        return phone;
    }
    else {
        //invalid phone number
        return phonenum;
    }
}

//Contstructor for all of the data being applied to the map
var Location = function (data) {
	var self = this;
	this.name = data.name;
	this.lat = data.lat;
	this.lng = data.lng;
	this.URL = "";
	this.street = "";
	this.state = "";
	this.phone = "";

	this.visible = ko.observable(true);

	//JSON request to grab foursquare info
	var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + this.lat + ',' + this.lng  + '&client_id=' + client_ID + '&client_secret=' + client_Secret +'&v=20170627' + '&query=' + this.name;

	$.getJSON(foursquareURL).done(function(data) {
		var results = data.response.venues[0];
		self.URL = results.url;
		if (typeof self.URL === 'undefined'){
			self.URL = "";

		}
		self.street = results.location.formattedAddress[0];
		self.state = results.location.formattedAddress[1];
		self.phone = results.contact.phone;
	if (typeof self.phone === 'undefined'){
			   self.phone = "";
		} else {
		self.phone = formatPhone(self.phone);
		}
	}).fail(function(){
		alert("There was an error retreiving information from foursquare. Please refresh the page try again.")
	});

	this.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
	'<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" +
	'<div class="content">' + self.street + "</div>" +
	'<div class="content">' + self.state + "</div>" +
	'<div class="content">' + self.phone + "</div></div>";

	this.infoWindow = new google.maps.InfoWindow({content: self.contentString});
	//Set up marker
	this.marker = new google.maps.Marker({
		position: new google.maps.LatLng(data.lat, data.lng),
		map: map,
		title: data.name
	});

	this.showMarker = ko.computed(function() {
		if(this.visible() === true) {
			this.marker.setMap(map);
		} else {
			this.marker.setMap(null);
		}
		return true;
	}, this);

	this.marker.addListener('click', function() {
		self.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
	'<div class="content"><a href="' + self.URL +'">' + self.URL + "</a></div>" + 
	'<div class="content">' + self.street + "</div>" +
	'<div class="content"><a href="tel:' + self.phone + '">' + self.phone +"</a></div></div>";

	self.infoWindow.setContent(self.contentString);

		self.infoWindow.open(map, this);

		self.marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function() {
			self.marker.setAnimation(null);
	}, 2100)
	});

	this.bounce = function(place) {
		google.maps.event.trigger(self.marker, 'click');
	};
};
//Communicates between the model and the view
function ViewModel() {
	//Adds a certain style to the map
	var styles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d2d2d2"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dad6c3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a1a5bb"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#6ab360"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#5eacf0"
            }
        ]
    }
];
	var self = this;

	this.searchInput = ko.observable("");

	this.locationsList = ko.observableArray([]);

	//displays the map and centers on Wisconsin specifically
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: {lat: 43.78444, lng: -88.787868},
		styles: styles
	});

	client_ID = "MEDC0WAGH4RJ5Q3VGZ3XYRAMPIYYY3RH04SN0QQ2FLRRZI4A";
	client_Secret = "DCMTED1NBXVYU2UB1F35UUOAEROL4TA30K2XARLIWUDZGJGH";

	locations.forEach(function(locationItem){
		self.locationsList.push(new Location(locationItem));
	});

	//Filtered the locations by search params
	self.filteredList = ko.computed(function() {
		var filter = self.searchInput().toLowerCase();
		if(!filter) {
			self.locationsList().forEach(function(locationItem) {
				locationItem.visible(true);
			});
			return self.locationsList();
		} else {
			return ko.utils.arrayFilter(self.locationsList(), function(locationItem){
				var string = locationItem.name.toLowerCase();
				var result = (string.search(filter) >= 0);
				locationItem.visible(result);
				return result;
			});
		}
	}, self);

	this.mapElem = document.getElementById('map');
	this.mapElem.style.height = window.innerHeight - 50;
}

function startApp() {
	ko.applyBindings(new ViewModel());
}

function errorHandling() {
	alert("Google Maps pooped out. Refresh the page and maybe it'll stop being lazy.")
}

