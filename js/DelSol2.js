var gmap, mapExtension, identifyTask, layers, overlays;

function initialize(){
    // create the map
    gmap = new GMap2(document.getElementById("map-canvas"));
    gmap.addControl(new GLargeMapControl());
    gmap.addControl(new GMapTypeControl());
    gmap.setCenter(new GLatLng(33.698,-112.311), 9);
    gmap.enableScrollWheelZoom();
    gmap.setMapType(G_SATELLITE_MAP);

    mapExtension = new esri.arcgis.gmaps.MapExtension(gmap);

    // create a dynamic map service layer
    var dynamicMap = new esri.arcgis.gmaps.DynamicMapServiceLayer("http://23.20.54.226/ArcGIS/rest/services/DelSol_Map/MapServer", null, 0.75, dynmapcallback);

    // create an identify task
    identifyTask = new esri.arcgis.gmaps.IdentifyTask("http://23.20.54.226/ArcGIS/rest/services/DelSol_Map/MapServer");

    // register click event listener for the map
    GEvent.addListener(gmap, "click", identify);
}

function identify(overlay, latLng) {
    if (overlay) return;
    clearResults();

    // set the identify parameters
    var identifyParameters = new esri.arcgis.gmaps.IdentifyParameters();
    identifyParameters.geometry = latLng; // location where the user clicked on the map
    identifyParameters.tolerance = 3;
    identifyParameters.layerIds = [ 3, 7 ];
    identifyParameters.layerOption = "all";
    identifyParameters.bounds = gmap.getBounds();
    var mapSize = gmap.getSize();
    identifyParameters.width = mapSize.width;
    identifyParameters.height = mapSize.height;

    // execute the identify operation
    identifyTask.execute(identifyParameters, function(response, error) { // function to be called when the result is available
        // display error message (if any) and return
        if (hasErrorOccurred(error)) return;

        // note that the location where the user clicked on the map (latLng) is visible in this function through closure
        addResultToMap(response, latLng);
    });
}

function addResultToMap(response, point) {
    // aggregate the result per map service layer
    var idResults = response.identifyResults;
    layers = { "3": [], "7": [] };
    for (var i = 0; i < idResults.length; i++) {
        var result = idResults[i];
        layers[result.layerId].push(result);
    }

    // create and show the info-window with tabs, one for each map service layer
    var tabs = [];
    for (var layerId in layers) {
        var results = layers[layerId];
        var count = results.length;
        var label = "", content = "";
        switch(layerId) {
            case "3":
                label = "Exchanges";
                content = "Location: <b>" + count + "</b>";
                if (count == 0) break;
                content += "<table class='identify' border='1'><th>Location</th><th>Type</th>";
                for (var j = 0; j < count; j++) {
                    var attributes = results[j].feature.attributes;
                    content += "<tr>";
                    content += "<td><a href='#' onclick='showFeature(" + layerId + "," + j + ")'>" + attributes["Location"]  + "</a></td>";
                    content += "<td>" + attributes["Type2"]  + "</td>";
                    content += "</tr>";
                }
                content += "</table>";
                break;
            case "7":
                label = "Legs";
                content = "Legs: <b>" + count + "</b>";
                if (count == 0) break;
                content += "<table class='identify'  border='1'><th>Type</th><th>Support</th>";
                for (var j = 0; j < count; j++) {
                    var attributes = results[j].feature.attributes;
                    content += "<tr>";
                    content += "<td><a href='#' onclick='showFeature(" + layerId + "," + j + ")'>" + attributes["Type2"]  + "</td>";
                    content += "<td>" + attributes["Info"]  + "</td>";
                    content += "</tr>";
                }
                content += "</table>";
                break;
        }
        tabs.push(new GInfoWindowTab(label, content));
    }
    gmap.openInfoWindowTabsHtml(point, tabs);
}

function showFeature(layerId, index) {
    mapExtension.removeFromMap(overlays);
    var idResult = layers[layerId][index];
    overlays = mapExtension.addToMap(idResult, {polygonOptions: { clickable: false}});
}

function dynmapcallback(groundov) {
    //Add groundoverlay to map using gmap.addOverlay()
    gmap.addOverlay(groundov); 
}	  

function clearResults() {
    mapExtension.removeFromMap(overlays);
    gmap.closeInfoWindow();
}

function hasErrorOccurred(error) {
    if (error) {
        alert("Error " + error.code + ": " + (error.message || (error.details && error.details.join(" ")) || "Unknown error" ));
        return true;
    }
    return false;
}
	 