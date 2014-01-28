var geo = require('geo');
	
$.button.addEventListener('click', function(e) {
	$.textField.blur();
	geo.forwardGeocode($.textField.value, function(geodata) {
		/* save POI in apiOmat backend */
		var poi = new Apiomat.POI;
		poi.setName($.textField.value);
		poi.setDescription($.description.value);
		poi.setPlaceLatitude(geodata.coords.latitude);
		poi.setPlaceLongitude(geodata.coords.longitude);
		poi.save({
			onOk: function() {
				Ti.App.fireEvent('addAddress', {poi: poi});
				$.addressWin.close();
			},
			onError: function(error) {
				alert("Error on adding POI");				
			}		
		});
	});
});
