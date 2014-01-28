$.button.addEventListener('click', function(e) {
	var win=Alloy.createController('addAddress').getView();
	win.open();
	
});

$.map.addEventListener('click', function(e) {
	if (e.annotation && (e.clicksource === 'leftButton' || e.clicksource == 'leftPane')) {
		$.map.removeAnnotation(e.annotation);
	}
});

exports.addAnnotationForPOI = function(poi, setToLocation) {
	var annotation = Alloy.createController('annotation', {
		title : poi.getName(),
		subtitle : poi.getDescription(),
		latitude : poi.getPlaceLatitude(),
		longitude : poi.getPlaceLongitude()
	});
	$.map.addAnnotation(annotation.getView());
	/* set map to this location */
	if(typeof setToLocation !== 'undefined' && setToLocation)
	{
		Titanium.API.info("Set new location");
		$.map.setLocation({
			latitude: poi.getPlaceLatitude(),
			longitude: poi.getPlaceLongitude(),
			latitudeDelta: 1,
			longitudeDelta: 1, 
			animate:true
		});
	}
};

exports.zoomToPOIs = function(points) {
	var nbPtToShow = points.length - 1;
	var tmpDeltatLat = 0, tmpDeltatLong = 0, maxDeltatLat = 0, maxDeltatLong = 0, centerLat = 0, centerLong = 0;

	for (var i = 0; i <= Math.floor(points.length / 2); i++) {
		for (var j = nbPtToShow; j >= Math.floor(points.length / 2); j--) {
			if (j != i) {
				tmpDeltatLat = Math.abs(Math.abs(points[i].getPlaceLatitude()) - Math.abs(points[j].getPlaceLatitude()));
				if (tmpDeltatLat > maxDeltatLat) {
					maxDeltatLat = tmpDeltatLat;
					centerLat = Math.min(points[i].getPlaceLatitude(), points[j].getPlaceLatitude()) + maxDeltatLat / 2;
				}
				tmpDeltatLong = Math.abs(Math.abs(points[i].getPlaceLongitude()) - Math.abs(points[j].getPlaceLongitude()));
				if (tmpDeltatLong > maxDeltatLong) {
					maxDeltatLong = tmpDeltatLong;
					centerLong = Math.min(points[i].getPlaceLongitude(), points[j].getPlaceLongitude()) + maxDeltatLong / 2;
				}
			}
		}
	}
	$.map.region = {
		latitude : centerLat,
		longitude : centerLong,
		latitudeDelta : maxDeltatLat,
		longitudeDelta : maxDeltatLong
	};
};
