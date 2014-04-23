function initialize() {
	var mapDiv = document.getElementById('map-canvas');
	var map = new google.maps.Map(mapDiv, {
		center: new google.maps.LatLng(33.426535,-111.932702),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});
}

google.maps.event.addDomListener(window, 'load', initialize);