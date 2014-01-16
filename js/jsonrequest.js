/**
 * @author Jan-Philipp Heine
 * 
 * Class for loading a JSON File from a specified URL.
 * 
 */


/*
 * The loadJSON() function sends a ajax request to the specified URL.
 * Actually only local files can be requested because the cross domain constrait doesnt allow it. Furthermore most browers
 * reject such a request.
 * 
 * @return JSON File as a JavaScript Object. Content can be checked by casting the object to a string by using JSON.stringify()
 */

function loadJSON(){

// AJAX Request
var json = (function () {
		var json = null;
		$.ajax({
			'async': false,
			// Requesting a local file due to the cross domain constrait explained above
			'url': 'examples/simpleExample_sensors.json',
			'dataType': "json",
			// If request succeeded the callback function stores the requested JSON to var = json 
			'success': function (data) {json = data;},
			'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
		});
		
		// returns the object
		return json;
	})();
	
	// stores the returned object in the variable JSONFile.
	var JSONFile = json;
	
	// returns the JSONFile where the data is stored.
	return JSONFile;
}

/*
 * The testJSON() function only casts the returned object of the loadJSON() function to an string. It is only a testing issue.
 * 
 */

function testJSON() {
	
	// Popup if the returns work. Result should be [object Object].
	alert(loadJSON());

	// Popup if the correct data was requested and object is cast to a string. Result should be the JSON file from /*/*/*/
	alert(JSON.stringify(loadJSON()));
	
	// Output the content of the JSON File on HTML Page
	document.getElementById("TestingRequestJSON").innerHTML = JSON.stringify(loadJSON());
}
