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

// waits for the results from the server and displays the data in chart and table
function displayAggregationResults() {
	if (req.readyState == 4) {
		if (req.responseText == 'JSON File Validation Failed') {
			alert("Aggregation failed. JSON File is malformed!");
		} else {
			// display aggregation results
			setChart('bar', req.responseText);
			initAggregationTable(req.responseText);
			tablestyle();
		}
	}
}


























