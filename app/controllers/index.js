$.on('addAnnotationForPOI', function(e) {
	$.map.addAnnotationForPOI(e.poi);
});

$.on('zoomToPOIs', function(e) {
	$.map.zoomToPOIs(e.pois);
});

Ti.App.addEventListener('addAddress',function(e)
{
  $.map.addAnnotationForPOI(e.poi, true);
});

// Show the loading icon.
$.loading.setOpacity(1.0);

// Load some content...
$.index.open(); 
/* Login to apiOmat */ 
var user = new Apiomat.User;
user.setUserName("phimi");
user.setPassword("12345");
user.loadMe({
	onOk : function() {
		//user successfully logged in
		Ti.API.log("user logged in");
		addAnnotations();
	},
	onError : function(error) {
		//seems user not to be there try signup
		user.save({
			onOk: function(){
				addAnnotations();
			},
			onError : function(err) {
				alert("Error occurred on signup: " + err);
			}
		});
	}
});

function addAnnotations()
{
	/* download all POIs */
	Apiomat.POI.getPOIs(undefined, {
		onOk: function(pois) {
			for (var i = pois.length - 1; i >= 0; i--){
				var poi = pois[i];
			  	/* create annotation on GMap */
			  	$.trigger('addAnnotationForPOI', {poi: poi});
			};
			/* set region */
			// For the iOS platform, wait for the complete event to ensure the region is set
			$.trigger('zoomToPOIs', {pois: pois});
		},
		onError: function(error) {
			alert("Can't load POIs: " + error);			
		}
	});
	/* hide loading icon */
	$.loading.setOpacity(0.0);	
}
