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
	for (var i = 0; i < measurements.length; i++) {
		for ( j = 0; j < measurements[i].phenomenons.length; j++) {
			if (measurements[i].getPhenomenons()[j].name == "Consumption") {
				consumptionAgg.push(measurements[i].getValues()[j]);
			} else if (measurements[i].getPhenomenons()[j].name == "CO2") {
				co2Agg.push(measurements[i].getValues()[j]);
			} else if (measurements[i].getPhenomenons()[j].name == "Speed") {
				speedAgg.push(measurements[i].getValues()[j]);
			} else if (measurements[i].getPhenomenons()[j].name == "Engine Load") {
				engineLoadAgg.push(measurements[i].getValues()[j]);
			} else if (measurements[i].getPhenomenons()[j].name == "Rpm") {
				rpmAgg.push(measurements[i].getValues()[j]);
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
		}
	}
}
