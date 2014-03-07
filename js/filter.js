/**
 * @author Jan-Philipp Heine
 * 
 * Class for selecting different attributes from the JSON File.
 * Actually the jFunk library is used but it can change in the future due to some difficulties.
 * Usage: jF("*[attribute=foo]",JSONFile).get() is equal to select * from JSONFile where attribute=foo
 * 
 */


/*
 * getManufacturerX(), getFuelTypeX(),getXX() are functions for filtering the JSON File. The JSON File is load by calling
 * the loadJSON() function and then stored as a variable. Afterwards the data get filtered and stored in a new variable.
 * 
 * @return filtered JSONFile as a JavaScript Object
 */

var startDate;
var endDate;
var baseurl = "https://envirocar.org/api/stable/tracks?during=";
var hyphen = "-";
var literalT = "T";
var literalZ = "Z";
var comma = ",";
var doublePoint = ":";

function getDateTime() {
	
	 	startDate = $('#date-from').val();
		endDate = $('#date-to').val();
	
	
	if(startDate == '' && endDate == '') {
		
		alert("Kein Start- und Endzeitpunkt ausgewählt");
		
	} 
	else{
	
		var startDate = $('#date-from').val();
	
		var endDate = $('#date-to').val();
	
		alert("Sie haben den Startzeitpunkt " + startDate + " und den Endzeitpunkt " + endDate + " ausgewählt.");
		
		//StartDate
		
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
		
		var baseurlstartDate = baseurlYearMonthDay.concat(hour, hour1, doublePoint, minute, minute1, doublePoint, seconds,literalZ , comma);
		
		//EndDate
		
		var endYear = endDate.charAt(6);
		var endYear1 = endDate.charAt(7);
		var endYear2 = endDate.charAt(8);
		var endYear3 = endDate.charAt(9);
		
		var baseurlEndDateYear = baseurlstartDate.concat(endYear, endYear1, endYear2, endYear3,hyphen);
		
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
		
		var requestURL = baseurlEndDate;
		
		alert("Die URL für die RESTAbfrage " + requestURL);
		
		// Requesting the JSON File from envirocar
		
		var json = (function () {
	
	
									var json = null;
									$.ajax({
										'async': false,
										// Requesting a local file due to the cross domain constrait explained above
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
		
		alert("Das ist der abgerufene JSONFile " + JSON.stringify(JSONFile));
		
		// returns the JSONFile where the data is stored.
		return JSONFile;
			
	}
	
	
}

// old stuff

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


function getManufacturerVW() {   

    json = loadJSON();
    
    var VW = jF("*[manufacturer=VW]",json).get();
	
	// document.getElementById("ManufacturerVW").innerHTML = JSON.stringify(VW);
	document.getElementById("simplyatest").innerHTML = JSON.stringify(VW);
	
	return VW;
	
}

function getFuelTypeDiesel() {   
	
	json = loadJSON();
	
    var diesel=jF("*[fuelType=diesel]",json).get();
	
	// document.getElementById("FuelTypeDiesel").innerHTML = JSON.stringify(diesel);
	document.getElementById("simplyatest").innerHTML = JSON.stringify(diesel);
	
	return diesel;

}

function getDIESELVW() {
	
	json = getFuelTypeDiesel();
	
	var dieselVW = jF("*[manufacturer=VW]",json).get();
	
	// document.getElementById("FuelTypeDiesel").innerHTML = JSON.stringify(dieselVW);
	document.getElementById("simplyatest").innerHTML = JSON.stringify(dieselVW);
	
	return dieselVW;
}




