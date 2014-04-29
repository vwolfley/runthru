function initialize() {
    var map = new google.maps.Map(document.getElementById('map-home'), {
        center: new google.maps.LatLng(38.043333,-98.583333),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

	var layer = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: 3855936
        },
        map: map
    });
	
    var layer = new google.maps.FusionTablesLayer({
        query: {
            select: 'Lat',
            from: 3418711
        },
        map: map
    });
	
}

google.maps.event.addDomListener(window, 'load', initialize);

