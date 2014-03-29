/**
 * @author Axel Virnich
 */

// builds the Json file from the current measurement selection and executes the request
function startAggregation() {
	var speedAgg = new Array();
	var co2Agg = new Array();
	var engineLoadAgg = new Array();
	var rpmAgg = new Array();
	var consumptionAgg = new Array();
	// build JSON from measurement object
	for (var i = 0; i < analyserMeasurements.length; i++) {
		for ( j = 0; j < analyserMeasurements[i].phenomenons.length; j++) {
			if (analyserMeasurements[i].getPhenomenons()[j].name == "Consumption") {
				consumptionAgg.push(analyserMeasurements[i].getValues()[j]);
			} else if (analyserMeasurements[i].getPhenomenons()[j].name == "CO2") {
				co2Agg.push(analyserMeasurements[i].getValues()[j]);
			} else if (analyserMeasurements[i].getPhenomenons()[j].name == "Speed") {
				speedAgg.push(analyserMeasurements[i].getValues()[j]);
			} else if (analyserMeasurements[i].getPhenomenons()[j].name == "Engine Load") {
				engineLoadAgg.push(analyserMeasurements[i].getValues()[j]);
			} else if (analyserMeasurements[i].getPhenomenons()[j].name == "Rpm") {
				rpmAgg.push(analyserMeasurements[i].getValues()[j]);
			}
		}
	}
	var measurementJSON = {Speed : speedAgg, CO2 : co2Agg, EngineLoad : engineLoadAgg, Rpm : rpmAgg, Consumption : consumptionAgg};
	measurementJSON = JSON.stringify(measurementJSON);
	// execute AJAX Request
	var param = 'json=' + measurementJSON;
	sendRequest("php/aggregation.php", param);
}

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

// waits for the results from the server and displays the data in chart and table
function displayAggregationResults() {
	if (req.readyState == 4) {
		if (req.responseText == 'JSON File Validation Failed') {
			alert("Aggregation failed. JSON File is malformed!");
		} else {
			setChart('bar', req.responseText);
			initAggregationTable(req.responseText);
			tablestyle();
		}
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


























