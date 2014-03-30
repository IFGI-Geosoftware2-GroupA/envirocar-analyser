/**
 * @author Axel Virnich
 */


var req = null;

// returns the XMLHTTPRequest, considering the browser used
function getXMLHttpRequest() {
	var httpReq = null;
	if (window.XMLHttpRequest) {
		httpReq = new XMLHttpRequest();
	} else if ( typeof ActiveXObject != "undefined") {
		httpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return httpReq;
}

// sends the post-request to the server
function sendRequest(url, param) {
	req = getXMLHttpRequest();
	if (req) {
		req.onreadystatechange = function() {
			displayAggregationResults();
		};
		req.open("POST", url, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(param);
	}
}


// sends the post-request to the server
function sendTrackRequest(url, param, trackId) {
	req = getXMLHttpRequest();
	if (req) {
		req.onreadystatechange = function() {
			processTrackInformation(trackId);
		};
		req.open("POST", url, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(param);
	}
}

// function to get Track information from server
function getTrackInformation(){
	animiere();
	// function is called up as long as there are still tracks to process
	if(toDoArray.length > 0){
		var tid = toDoArray[0];
		var param = 'id=' + toDoArray[0];
		toDoArray.splice(0,1);
		// execute AJAX Request
		sendTrackRequest("php/trackRequest.php", param, tid);	
	}
	else{
		// if all tracks are processed, the loading screen disappears and the data is displayed
		redrawData(true,true,true,true,true);	
		hideProgressAnimation();
	}	
}

function processTrackInformation(trackId) {
	if (req.readyState == 4) {
		if (req.responseText == 'JSON File Validation Failed') {
			alert("Request failed. JSON File is malformed!");
		} else {
			var resultJSON = JSON.parse(req.responseText);
			// process json returned from server
			for(var i = 0; i < resultJSON.length; i++){
				resultJSON[i]['point'] = new google.maps.LatLng(resultJSON[i]['point'][1],resultJSON[i]['point'][0]);	
				var sensor = new Sensor(resultJSON[i]['sensors']['type'], resultJSON[i]['sensors']['id'], resultJSON[i]['sensors']['model'], resultJSON[i]['sensors']['fuelType'], resultJSON[i]['sensors']['manufacturer'], resultJSON[i]['sensors']['constructionYear']);
				measurements.push(new Measurement(resultJSON[i]['id'], resultJSON[i]['point'], resultJSON[i]['timestamp'], resultJSON[i]['phenomenons'], resultJSON[i]['values'], sensor, trackId));
			}
			getTrackInformation();
		}
	}
}