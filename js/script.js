//Model
var locations = [
       {
	       title: "Devil's Lake State Park", 
	       lat:43.428447, 
	       lng:-89.731368
	     },
       {
	       title: "High Cliff State Park", 
	       lat:44.163103, 
	       lng:-88.29097
       },
       {
       	 title: "Rock Island State Park", 
       	 lat:45.409337, 
       	 lng:-86.829068 
       },
       {
       	 title: "Newport State Park", 
       	 lat:45.245478, 
       	 lng:-86.998189
       },
       {
       	title: "Peninsula State Park", 
       	at:45.148943, 
       	lng:-87.210988
       }

    ];

//This makes the map viewable
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 43.78444, lng: -88.787868 },
      zoom: 8,
      disableDefaultUI: true
    });

    ko.applyBindings(new ViewModel());
 }
 
//Display error when google maps isn't functioning
function gError() {
	document.getElementById('error').innerHTML = "<h2>Google maps experienced an issue, please try refreshing the page/h2>";
}

//Constructor
 var Place = function (data) {
 		this.name = ko.observable(data.name);
 		this.lat = ko.observable(data.lat);
 		this.lng = ko.observable(data.lng);
 		this.marker = ko.observable();
 		this.phone = ko.observable('');
 		this.address = ko.observable('');
 };

//ViewModel
function ViewModel() {
	//Binding
	var self = this;

	//Create a blank array to store locations
	this.placeList = ko.observableArray([]);

	//Create the inforwindow
	var infowindow = new google.maps.InfoWindow({
			maxWidth: 200,
			maxHeight: 200
	});

	//Create the marker
	var marker;
		//Create markers, info for locations and set event listeneres for the IW
		self.placeList().forEach(function(placeItem){
			//Define markers
				marker = new google.maps.Marker({
						position: new google.maps.LatLng(placeItem.lat(), placeItem.lng()),
						map: map,
						animation: google.maps.Animation.DROP
				});
				placeItem.marker = marker;

				//AJAX request for NYT
				$.ajax({
						url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + placeItem.id() + '&sort=newest&api-key=811c11907c2f4cc0b1badc65bd16229f',
						dataType: "json",
				});


				//Create event listeners for InfoWindow
				google.maps.event.addListener(placeItem.marker, 'click', function () {
                    infowindow.open(map, this);
                    // Bounce animation credit https://github.com/Pooja0131/FEND-Neighbourhood-Project5a/blob/master/js/app.js
                    placeItem.marker.setAnimation(google.maps.Animation.DROP);
                    setTimeout(function () {
                        placeItem.marker.setAnimation(null);
                    }, 500);
                    infowindow.setContent(contentString);
                    map.setCenter(placeItem.marker.getPosition());
                });

                google.maps.event.addListener(marker, 'click', function (){
					infowindow.open(map, this);
					placeItem.marker.setAnimation(google.maps.Animation.DROP);
					setTimeout(function () {
						placeItem.marker.setAnimation(null);
					  }, 500);
				});


			},
			error = function (e) {
				infowindow.setContent('<h2>New York Times is currently unavailable. Please try refreshing.</h2>');
				document.getElementById("error").innerHTML = "<h2>New York Times is currently unavailable. Please try refreshing.</h2>";
		});

				
		self.showInfo = function(placeItem) {
			google.maps.event.trigger(placeItem.marker, 'click');
			self.hideElements();
		};


		self.visible = ko.observableArray();

		self.placeList().forEach(function (place) {
			self.visible.push(place);
		});

		self.userInput = ko.observable('');

		self.filterMarkers = function () {
			var searchInput = self.userInput().toLowerCase();
			self.visible.removeAll();
			self.placeList().forEach(function (place) {
					place.marker.setVisible(false);
					if (place.name().toLowerCase().indexOf(searchInput) !== -1){
							self.visible.push(place);
					}
			});
			self.visible().forEach(function (place) {
					place.marker.setVisible(true);
			});
		};



		//Display error when GET request fails for AJAX
		//Create the messages in the DOM and infowindow

		//EListener that displays AJAX error in IW

	//Activates marker from corresponding list item

	//Filters markers based on input

	//Array containing markers based on search

	//Makes all markers visible by default

	//Tracks user input
	}
	



	



