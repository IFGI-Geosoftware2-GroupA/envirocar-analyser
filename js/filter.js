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




