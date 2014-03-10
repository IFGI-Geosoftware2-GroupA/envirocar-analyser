/**
 * @author Jan-Philipp Heine
 * 
 * Class for selecting different attributes from the JSON File.
 * Actually the jFunk library is used but it can change in the future due to some difficulties.
 * Usage: jF("*[attribute=foo]",JSONFile).get() is equal to select * from JSONFile where attribute=foo
 */

/*
 * getManufacturerX(), getFuelTypeX(),getXX() are functions for filtering the JSON File. The JSON File is loaded by calling
 * the loadJSON() function and then stored as a variable. Afterwards the data is filtered and stored in a new variable.
 * 
 * @return filtered JSONFile as a JavaScript Object
 */

var startDate;
var endDate;
var baseurl = "https://envirocar.org/api/stable/tracks?during="; //Global variable specifying the URL for the temporal filter contributed by the envirocar API
var allTracks = "https://envirocar.org/api/stable/tracks/";
var hyphen = "-";
var literalT = "T";
var literalZ = "Z";
var comma = ",";
var doublePoint = ":";

// TODO missing documentation!!!
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
		
		var baseurlEndDate = baseurlEndDateYearMonthDay.concat(endHour, endHour1, doublePoint, endMinute, endMinute1, doublePoint, seconds,literalZ);
		//alert(baseurlEndDate) should be https://envirocar.org/api/stable/tracks?during=YYYY-MM-DDTHH:MM:SSZ,YYYY-MM-DDTHH:MM:SSZ
		
		var requestURL = baseurlEndDate;
		
		// alert("Die URL für die RESTAbfrage " + requestURL);
				
		// Requesting the JSON File from envirocar
		
		var json = (function () {
			var json = null;
			$.ajax({
				'async': false,
				'url': requestURL,
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
		
		// alert("Das ist der abgerufene JSONFile " + JSON.stringify(JSONFile));
		
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
		
		// testParsing(JSONFile);
		// return JSONFile;
	}
}

function getBBox() {
	pointNorthEast = rectangle.getBounds().getNorthEast().toString();
	pointSouthWest = rectangle.getBounds().getSouthWest().toString();
	
	// alert("NE: " + pointNorthEast + "\n" + "SW: " + pointSouthWest); // TODO delete before release
	
	pointNorthEastX = pointNorthEast.slice(1,18);
	pointNorthEastY = pointNorthEast.slice(20,37);
	pointSouthWestX = pointSouthWest.slice(1,18);
	pointSouthWestY = pointSouthWest.slice(20,37);
	
	var pnex = pointNorthEastX;
	var pney = pointNorthEastY;
	var pswx = pointSouthWestX;
	var pswy = pointSouthWestY;
	
	var BBoxURL = baseurlBBox.concat(pswx, comma, pswy, comma, pnex, comma, pney);
	
	// https://envirocar.org/api/stable/tracks?bbox=51.94526347230317,7.626482342364511,51.95054506839408,7.603436801737075
	// findet keine Tracks
	alert(BBoxURL);
}

// TODO delete function before release
// function testBBox(bounds) {
// 	
	// var point1 = map.getBounds().getNorthEast();
	// var point2 = map.getBounds().getSouthWest();
// 	
	// alert(bounds);

	// var jsonTrackIDs = JSON.stringify(JSONFile);
// 
	// var objtest = jQuery.parseJSON(jsonTrackIDs);
// 	
	// var track = objtest.tracks[0].id;
// 	
	// var allTracks = "https://envirocar.org/api/stable/tracks/";
// 	
	// var trackURL = allTracks.concat(track);
// 	
	// alert(trackURL);
// 	
	// var json = (function () {
// 		
// 		
			// var json = null;
			// $.ajax({
				// 'async': false,
				// // Requesting a local file due to the cross domain constrait explained above
				// 'url': trackURL,
				// 'dataType': "json",
				// // If request succeeded the callback function stores the requested JSON to var = json 
				// 'success': function (data) {json = data;},
				// 'error': function(jqXHR, textStatus, errorThrown) {alert('Error ' + errorThrown);}
			// });
// 			
			// // returns the object
			// return json;
		// })();
// 	
	// var jsonTrackData = JSON.stringify(json);
// 
	// var jsonTrackDataObj = jQuery.parseJSON(jsonTrackData);
// 	
	// alert(jsonTrackDataObj.properties.sensor.properties.manufacturer);
	
	// alert(JSON.stringify(JSONFile));
//}	

// old stuff

// Get measurements with manufacturer = BMW
function getManufacturerBMW() {
	// Load JSON File via AJAX Request from URL
    json = loadJSON();
    
    // Filtering JSONFile
    var BMW = jF("*[manufacturer=BMW]",json).get();
	
	// document.getElementById("ManufacturerBMW").innerHTML = JSON.stringify(BMW);
	document.getElementById("simplyatest").innerHTML = JSON.stringify(BMW);
	
	// Returns filtered JSONFile
	return BMW;
}

// Get measurements with manufacturer = VW
function getManufacturerVW() {
    json = loadJSON();
    
    var VW = jF("*[manufacturer=VW]",json).get();
	
	// document.getElementById("ManufacturerVW").innerHTML = JSON.stringify(VW);
	document.getElementById("simplyatest").innerHTML = JSON.stringify(VW);
	
	return VW;
}

// Get measurements with fuel type = Diesel
function getFuelTypeDiesel() {
	json = loadJSON();
	
    var diesel=jF("*[fuelType=diesel]",json).get();
	
	// document.getElementById("FuelTypeDiesel").innerHTML = JSON.stringify(diesel);
	document.getElementById("simplyatest").innerHTML = JSON.stringify(diesel);
	
	return diesel;
}

// Get measurements with manufacturer = BMW and fuel type = Diesel
function getDIESELVW() {
	json = getFuelTypeDiesel();
	
	var dieselVW = jF("*[manufacturer=VW]",json).get();
	
	// document.getElementById("FuelTypeDiesel").innerHTML = JSON.stringify(dieselVW);
	document.getElementById("simplyatest").innerHTML = JSON.stringify(dieselVW);
	
	return dieselVW;
}
