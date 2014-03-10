/**
 * @author Jan-Philipp Heine
 * 
 * This class contains methods for creating the REST requests which queries the envirocar API. Spatial and temporal querying is contained.
 */

var startDate;
var endDate;
var baseurl = "https://envirocar.org/api/stable/tracks?during="; //Global variable specifying the URL for the temporal filter contributed by the envirocar API
var allTracks = "https://envirocar.org/api/stable/tracks/";
var baseurlBBox = "https://envirocar.org/api/stable/tracks?bbox=";
var hyphen = "-";
var literalT = "T";
var literalZ = "Z";
var comma = ",";
var doublePoint = ":";

/*
 * getDateTime() This method gets the values from the date-from and date-to boxes using this values building a string. Afterwards it will 
 * query the envirocar API to get the tracks.
 * Additionally it is parsing the requested information, and the Car Model and track ID is displayed in the trackSelectionList element.
 * On change an alert will appear which displays additional information.
 * 
 * @return JSON
 */

function getDateTime() {
	// Getting the values of the boxes where datetime is displayed
	startDate = $('#date-from').val();
	endDate = $('#date-to').val();
	
	// Check if a start and end date is specifyed. If not the user gets an alert
	if (startDate == '' || endDate == '') {
		if (getParam('lang') == 'en') {
			alert('No start and / or end date selected');
		} else {
			alert('Kein Start- und / oder Endzeitpunkt ausgewählt');
		}
	} else {
		
		// Storing the value of the date-from box in a variable
		var startDate = $('#date-from').val();
		
		// Storing the value of the date-to box in a variable
		var endDate = $('#date-to').val();
		
		alert("Sie haben den Startzeitpunkt " + startDate + " und den Endzeitpunkt " + endDate + " ausgewählt.");
		
		//Getting the literals from the date-from box and start building the first part of the string
		
		var year = startDate.charAt(6);
		var year1 = startDate.charAt(7);
		var year2 = startDate.charAt(8);
		var year3 = startDate.charAt(9);
		
		var baseurlYear = baseurl.concat(year, year1, year2, year3,hyphen);
		
		var month = startDate.charAt(3);
		var month1 = startDate.charAt(4);
		
		var baseurlYearMonth = baseurlYear.concat(month, month1, hyphen);
		
		var day = startDate.charAt(0);
		var day1 = startDate.charAt(1);
		
		var baseurlYearMonthDay = baseurlYearMonth.concat(day, day1, literalT);
		
		var hour = startDate.charAt(11);
		var hour1 = startDate.charAt(12);
		var minute = startDate.charAt(14);
		var minute1 = startDate.charAt(15);
		var seconds = "00";
		
		var baseurlStartDate = baseurlYearMonthDay.concat(hour, hour1, doublePoint, minute, minute1, doublePoint, seconds,literalZ , comma);
		//alert(baseurlStartDate) should be https://envirocar.org/api/stable/tracks?during=YYYY-MM-DDTHH:MM:SSZ,
		
		//Getting the literals from the date-to box and start building the second part of the string
		var endYear = endDate.charAt(6);
		var endYear1 = endDate.charAt(7);
		var endYear2 = endDate.charAt(8);
		var endYear3 = endDate.charAt(9);
		
		var baseurlEndDateYear = baseurlStartDate.concat(endYear, endYear1, endYear2, endYear3,hyphen);
		
		var endMonth = endDate.charAt(3);
		var endMonth1 = endDate.charAt(4);
		
		var baseurlEndDateYearMonth = baseurlEndDateYear.concat(endMonth, endMonth1, hyphen);
		
		var endDay = endDate.charAt(0);
		var endDay1 = endDate.charAt(1);
		
		var baseurlEndDateYearMonthDay = baseurlEndDateYearMonth.concat(endDay, endDay1, literalT);
		
		var endHour = endDate.charAt(11);
		var endHour1 = endDate.charAt(12);
		var endMinute = endDate.charAt(14);
		var endMinute1 = endDate.charAt(15);
		var seconds = "00";
		
		//alert(baseurlEndDate) should be https://envirocar.org/api/stable/tracks?during=YYYY-MM-DDTHH:MM:SSZ,YYYY-MM-DDTHH:MM:SSZ
		var baseurlEndDate = baseurlEndDateYearMonthDay.concat(endHour, endHour1, doublePoint, endMinute, endMinute1, doublePoint, seconds,literalZ);
		
		var requestURL = baseurlEndDate;
				
		// Requesting the JSON File from envirocar
		
		var json = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'url': requestURL,
				'dataType': "json",
				'beforeSend': function(){showProgressAnimation();},
				'complete': function(){hideProgressAnimation();},
				// If request succeeded the callback function stores the requested JSON to var = json 
				'success': function (data) {json = data;},
				'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}

			});
			
			// returns the object
			return json;
		})();
			
		// stores the returned object in the variable JSONFile.
		var JSONFile = json;
		
		// Loops through the requested JSONFile and gets with the use of the trackID the additional information for all specified tracks
					
		$.each(JSONFile.tracks, function (key, value) {
			trackURL = allTracks.concat(value.id);
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					'url': trackURL,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			// The requested JSON File is cast to a string
			var jsonTrackData = JSON.stringify(json);
			
			// The JSON File is now parsed and could be entered
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			// Text for the dropdown menu
            $("#trackSelectionList").append($('<option></option>').val(value.id).html(jsonTrackDataObj.properties.sensor.properties.manufacturer + " " + jsonTrackDataObj.properties.sensor.properties.model + " TrackID: " + value.id));
		});
		
		// onChange alert with more specific car data
		$('#trackSelectionList').change(function () {
			trackURL = allTracks.concat($(this).val());
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					// Requesting a local file due to the cross domain constrait explained above
					'url': trackURL,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			var jsonTrackData = JSON.stringify(json);
			
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			alert("Manufacturer: " + jsonTrackDataObj.properties.sensor.properties.manufacturer + "\n"
			+ "ModelType: " + jsonTrackDataObj.properties.sensor.properties.model + "\n"
			+ "FuelType: " + jsonTrackDataObj.properties.sensor.properties.fuelType + "\n"
			+ "ConstructionYear: " + jsonTrackDataObj.properties.sensor.properties.constructionYear);
		});
		
	}
}

/*
 * getBBox() This method gets the tracks within the user specified bounding box by building string with the use of the bounding box coordinates.
 * Afterwards it will query the envirocar API to get the tracks.
 * Additionally it is parsing the requested information, and the Car Model and track ID is displayed in the trackSelectionList element. On change
 * an alert will appear which displays additional information.
 * 
 * @return JSON
 */

function getBBox() {
	pointNorthEast = rectangle.getBounds().getNorthEast();
	pointSouthWest = rectangle.getBounds().getSouthWest();
	
	pointNorthEastX = pointNorthEast.lat();
	pointNorthEastY = pointNorthEast.lng();
	pointSouthWestX = pointSouthWest.lat();
	pointSouthWestY = pointSouthWest.lng();
	
	
	var BBoxURL = baseurlBBox.concat(pointSouthWestY, comma, pointSouthWestX, comma, pointNorthEastY, comma, pointNorthEastX);
	// The URL should look like this: https://envirocar.org/api/dev/tracks?bbox=7.559052,51.915829,7.684022,51.993903
	
	var json = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'url': BBoxURL,
				'dataType': "json",
				// If request succeeded the callback function stores the requested JSON to var = json 
				'success': function (data) {json = data;},
				'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
			});
			
			// returns the object
			return json;
		})();
		
		// stores the returned object in the variable JSONFile.
		var jsonBBoxTracks = json;
		
		$.each(jsonBBoxTracks.tracks, function (key, value) {
			trackURL = allTracks.concat(value.id);
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					'url': trackURL,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			// The requested JSON File is cast to a string
			var jsonTrackData = JSON.stringify(json);
			
			// The JSON File is now parsed and could be entered
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			// Text for the dropdown menu
            $("#trackSelectionList").append($('<option></option>').val(value.id).html(jsonTrackDataObj.properties.sensor.properties.manufacturer + " " + jsonTrackDataObj.properties.sensor.properties.model + " TrackID: " + value.id));
		});
		
		// onChange alert with more specific car data
		$('#trackSelectionList').change(function () {
			trackURL = allTracks.concat($(this).val());
			
			var json = (function () {
				var json = null;
				$.ajax({
					'async': false,
					// Requesting a local file due to the cross domain constrait explained above
					'url': trackURL,
					'dataType': "json",
					// If request succeeded the callback function stores the requested JSON to var = json 
					'success': function (data) {json = data;},
					'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
				});
				
				// returns the object
				return json;
			})();
			
			var jsonTrackData = JSON.stringify(json);
			
			var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
			
			alert("Manufacturer: " + jsonTrackDataObj.properties.sensor.properties.manufacturer + "\n"
			+ "ModelType: " + jsonTrackDataObj.properties.sensor.properties.model + "\n"
			+ "FuelType: " + jsonTrackDataObj.properties.sensor.properties.fuelType + "\n"
			+ "ConstructionYear: " + jsonTrackDataObj.properties.sensor.properties.constructionYear);
		});
	
		// return jsonBBoxTracks;	
}
