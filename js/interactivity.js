/**
 * @author Daniel Sawatzky, Marius Runde
 */
 
// Global variables
var wHeight = getWindowHeight();
var wWidth = getWindowWidth();
var pos = getScrollXY();
var viewMode = "table";

var streetmode = false;
var alerted = false;

// Enable or disable the help, contact, imprint or terms of usage in the analyser-panel
var toggled = false;
var lastContent = '';
	
// Screen resolution
//alert("Höhe: " + wHeight + "Breite: " + wWidth);

// Function to change between normal and analysis mode
function changeMode() {
	var on, off;
	if (getParam('lang') == 'en') {
		on = 'On';
		off = 'Off';
	} else {
		on = 'An';
		off = 'Aus';
	}
	
	var mapWidth = document.getElementById('map-container').style.width;

	if (mapWidth == "50%") {
		document.getElementById('analyseModeBtn').value = off;
		document.getElementById('analyseModeBtn').style.color = "#1D83C3";
		document.getElementById('analyseModeBtn').style.border = "1px solid #1D83C3";
		document.getElementById('analyseModeBtn').style.background = "#fff";
		
		document.getElementById('map-container').style.display = "block";
		document.getElementById('map-container').style.width = "100%";
		resizeMap();
		$("#analyser-panel").hide();
		
		document.getElementById('analysisInterpolation').style.display = "none";
		document.getElementById('limit-filter').style.display = "none";
		document.getElementById('aggregation').style.display = "none";
		document.getElementById("analyser-switcher").style.display = "none";
		
	} else {
		if (toggled) {
			toggleAnalyserPanel('');
		}
		
		document.getElementById('analyseModeBtn').value = on;
		document.getElementById('analyseModeBtn').style.color = "#fff";
		document.getElementById('analyseModeBtn').style.border = "#990000";
		document.getElementById('analyseModeBtn').style.background = "#990000";
		
		document.getElementById('map-container').style.width = "50%";
		resizeMap();
		
		$("#analyser-panel").show(200);
		
		document.getElementById('analysisInterpolation').style.display = "block";
		document.getElementById('limit-filter').style.display = "block";
		document.getElementById('aggregation').style.display = "block";
		
		document.getElementById("clearidw").style.display = "none";
		document.getElementById("idwid").style.display = "none";
		document.getElementById("analyser-switcher").style.display = "block";
		
	}
}

/**
 * jQuery-Function to select a time range 
 * additonal: datepicker in german language and timepicker
 */
$(function() {
	var l = getParam('lang');
	if (l == "en") {
		$.timepicker.regional['en'] = {
			timeOnlyTitle : 'Choose time',
			timeText : 'Time',
			hourText : 'Houe',
			minuteText : 'Minute',
			secondText : 'Second',
			currentText : 'Now',
			closeText : 'Choose',
			monthNames : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			monthNamesShort : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
			dayNames : ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			dayNamesShort : ['Sun', 'Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat'],
			dayNamesMin : ['Sun', 'Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat'],
			weekHeader : 'We',
			weekStatus : 'Week of the month',
			ampm : false
		};
		$.timepicker.setDefaults($.timepicker.regional['en']);
	} else {
		$.timepicker.regional['de'] = {
			timeOnlyTitle : 'Uhrzeit auswählen',
			timeText : 'Zeit',
			hourText : 'Stunde',
			minuteText : 'Minute',
			secondText : 'Sekunde',
			currentText : 'Jetzt',
			closeText : 'Auswählen',
			monthNames : ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
			monthNamesShort : ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
			dayNames : ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
			dayNamesShort : ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			dayNamesMin : ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			weekHeader : 'Wo',
			weekStatus : 'Woche des Monats',
		ampm : false
		};
		$.timepicker.setDefaults($.timepicker.regional['de']);
	}	
	
	$("#date-from").datetimepicker({
		minDate: new Date(2013,5,8),
		maxDate: "+0",
		changeMonth: false,
		changeYear: false,
		numberOfMonths: 3,
		showWeek: false,
		dateFormat: "dd-mm-yy"
	});
	
	$("#date-to").datetimepicker({
		changeMonth: false,
		changeYear: false,
		numberOfMonths: 3,
		showWeek: false,
		dateFormat: "dd-mm-yy",
		onClose: function( selectedDate ) {
			$("#date-from").datepicker("option", "maxDate", selectedDate);
		},
		beforeShow: function (selectedDate) {
			var min = $("#date-from").datepicker("getDate");
			$("#date-to").datepicker("option","minDate", min);
			$("#date-to").datepicker("option","maxDate", "+0");
		}
	});
});


/**
 * Window functions (height, width, scroll position)
 * Author: Daniel Sawatzky 
 */
function getWindowWidth(){
	var value;
	try {
		value = document.body.clientWidth;
	} catch(e) {
		value = window.innerWidth;
	}
	return value; //window.innerWidth;
}
function getWindowHeight(){
	var value;
	try {
		value = document.body.clientHeight;
	} catch(e) {
		value = window.innerHeight;
	}
	return value; //window.innerHeight;
}

function getScrollXY() {
	var scrOfX = 0, scrOfY = 0;
	if ( typeof( window.pageYOffset ) == 'number' ) {
		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if ( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if ( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return [ scrOfX, scrOfY ];
}

// Enable or disable the street selection mode
function streetMode(){
  	if (map.getMapTypeId() == "OSM") {
  		var l = getParam('lang');
		if (l == "en") {
			alert("Change map layer to a google map.");
		} else {
			alert("Bitte ändern Sie die Karte zu einer Google-Karte.");
	    }
  	} else {
  		if (alerted == false) {
  			var l = getParam('lang');
			if (l == "en") {
				alert("Remove the last points with 'rightclick' somewhere on the map, but not on a point.");
			} else {
  				alert("Entfernen Sie den letzten Punkt mit Rechtsklick auf einen beliebigen Ort auf der Karte, aber nicht auf einen Punkt.");
  		}
  			alerted =true;
  		}
  		if (streetmode == false) { 
  			// Call enableStreetmode() function
  			enableStreetmode();
  		} else if (streetmode == true) {
  			// Call disableStreetmode() function for clearing the overlay and removing Listener
  			disableStreetmode();
  		}
}}

/* Click Handler Styles */
$(document).ready(function() {
	$("#boundingBoxBtn").click(function() {
		if (BoundingBox == true) {
		  $(this).css("color","#fff");	
		  $(this).css("background","#92C049");	
		} else {
		  $(this).css("color","#92C049");	
		  $(this).css("background","#fff");
		}
	});
	
	$("#streetSelectionBtn").click(function() {
		if (streetmode == true) {
		  $(this).css("color","#fff");	
		  $(this).css("background","#92C049");	
		} else {
		  $(this).css("color","#92C049");	
		  $(this).css("background","#fff");	
		}
	});
});

/*
 * Change the content of the analyser panel.
 * The id must specify the id of the element (without the 'analyser-' before).
 * E.g. if the element has the id 'analyser-help', you will have to pass the id 'help' to the function.
 */
function toggleAnalyserPanel(id) {
	var possibleIDs = ['help', 'contact', 'imprint', 'terms'];
	
	if (lastContent == '' || lastContent != id) {
		toggled = false;
	}
	lastContent = id;
	
	// Hide all content of the help submenus
	document.getElementById('analyser-help').style.display = 'none';
	document.getElementById('analyser-help-mapview').style.display = 'none';
	document.getElementById('analyser-help-getdata').style.display = 'none';
	document.getElementById('analyser-help-interpolation').style.display = 'none';
	document.getElementById('analyser-help-aggregation').style.display = 'none';
	document.getElementById('analyser-help-filter').style.display = 'none';
	
	document.getElementById('map-container').style.width = '50%';
	resizeMap();
	document.getElementById('analyser-panel').style.display = 'block';
	
	if (toggled) {
		// First hide all other content
		document.getElementById('analyser-help').style.display = 'none';
		document.getElementById('analyser-contact').style.display = 'none';
		document.getElementById('analyser-imprint').style.display = 'none';
		document.getElementById('analyser-terms').style.display = 'none';
		
		// Change the analyser status button
		var on;
		if (getParam('lang') == 'en') {
			on = 'On';
		} else {
			on = 'An';
		}
		document.getElementById('analyseModeBtn').value = on;
		document.getElementById('analyseModeBtn').style.color = '#fff';
		document.getElementById('analyseModeBtn').style.border = '#990000';
		document.getElementById('analyseModeBtn').style.background = '#990000';
		
		// Then display the analyser content
		document.getElementById('analyser-chart').style.display = 'block';
		document.getElementById('analyser-table').style.display = 'block';
		document.getElementById("analyser-switcher").style.visibility = 'visible';
		
		// Last change the toggled variable
		toggled = false;
	} else {
		// First hide the analyser content
		document.getElementById('analyser-chart').style.display = 'none';
		document.getElementById('analyser-table').style.display = 'none';
		document.getElementById("analyser-switcher").style.visibility = 'hidden';
		
		// Then display the expected content
		for (var i = 0; i < possibleIDs.length; i++) {
			if (id == possibleIDs[i]) {
				document.getElementById('analyser-' + possibleIDs[i]).style.display = 'block';
			} else {
				document.getElementById('analyser-' + possibleIDs[i]).style.display = 'none';
			}
		}
		
		// Last change the toggled variable
		toggled = true;
	}
}

// Enable or disable the help content in the analyser-panel
function toggleHelp() {
	toggleAnalyserPanel('help');
}

// Enable or disable the contact content in the analyser-panel
function toggleContact() {
	toggleAnalyserPanel('contact');
}

// Enable or disable the imprint content in the analyser-panel
function toggleImprint() {
	toggleAnalyserPanel('imprint');
}

// Enable or disable the terms of usage content in the analyser-panel
function toggleTerms() {
	toggleAnalyserPanel('terms');
}

// Load car models into Dual Listbox
function loadCarModels() {
	this.cars = new Array();
	var k = 0;
	for (var i = 0; i < measurements.length; i++) {
		// Add car model to cars array if it is not contained there yet
		if ($.inArray(measurements[i].sensors.manufacturer + ' ' + measurements[i].sensors.model, this.cars) < 0) {
			this.cars[k] = measurements[i].sensors.manufacturer + ' ' + measurements[i].sensors.model;
			duallistbox_carmodels.append('<option value="' + this.cars[k] + '" selected>' + this.cars[k] + '</option>');
			k++;
			// alert(cars[k]);
		}
	}
	duallistbox_carmodels.trigger('bootstrapduallistbox.refresh', true);
	
	// added
	// Clears the array and empties the duallistbox
	this.clearArray = function() {
		this.cars.length = 0;
		console.log(this.cars);
		var k = 0;
		for (var i = 0; i < measurements.length; i++) {
			// Add car model to cars array if it is not contained there yet
			if ($.inArray(measurements[i].sensors.manufacturer + ' ' + measurements[i].sensors.model, this.cars) < 0) {
				this.cars[k] = measurements[i].sensors.manufacturer + ' ' + measurements[i].sensors.model;
				duallistbox_carmodels.append('<option value="' + this.cars[k] + '" selected>' + this.cars[k] + '</option>');
				console.log(this.cars[k]);
				k++;
			}	
		}
		duallistbox_carmodels.trigger('bootstrapduallistbox.refresh', true);
	};
	// added off 
};

// Show loading window
function showProgressAnimation() {      
    $("#loading-div-background").show();
}

// Hide loading window
function hideProgressAnimation() { 
	$("#loading-div-background").hide();
}

/* Cancel an onClick event */
function cancelEvent() {
    try {
        var e = window.event;
        if(!e) e = window.Event;
        if(e) {
            e.returnValue = false;
            e.cancelBubble = true;
            e.stopPropagation();
        }
    } catch(c) {}
    return false;
}

// create a popup window at the center of the screen
function popupwindow(url, title, w, h) {
	var left = (screen.width / 2) - (w / 2);
	var top = (screen.height / 2) - (h / 2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

// open the popup window with the filter selection
function limitFilter() {
	fenster1 = popupwindow("grenzwertfilter_dialog.php", "Grenzwert-Filter", 630, 430);
}
