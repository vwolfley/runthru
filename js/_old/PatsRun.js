var gmap = null;

function initialize() {
    //Load Google Maps
    gmap = new GMap2(document.getElementById("map-canvas"));
    var centerat = new GLatLng(33.432500,-111.932702);

    gmap.addControl(new GLargeMapControl());
    gmap.addControl(new GMapTypeControl());
    gmap.setCenter(centerat, 14);
    gmap.enableScrollWheelZoom();
	gmap.setMapType(G_SATELLITE_MAP);
	
    //create custom dynamic layer
    //esri.arcgis.gmaps.DynamicMapServiceLayer(url,esri.arcgis.gmaps.ImageParameters?,opacity?,callback?);
    var dynamicMap = new esri.arcgis.gmaps.DynamicMapServiceLayer("http://23.20.54.226/ArcGIS/rest/services/PatsRun_Map/MapServer", null, 0.75, dynmapcallback);
}

function dynmapcallback(groundov) {
    //Add groundoverlay to map using gmap.addOverlay()
    gmap.addOverlay(groundov);
}
