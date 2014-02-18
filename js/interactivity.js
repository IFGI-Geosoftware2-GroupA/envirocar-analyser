/**
 * @author Daniel Sawatzky, Marius Runde
 */
 
// Global variables
	var wHeight = getWindowHeight();
	var wWidth = getWindowWidth();
	var pos = getScrollXY();
	
	var streetmode = false;
	var alerted = false;
	
// Screen resolution
//alert("Höhe: " + wHeight + "Breite: " + wWidth);


// Function to change between normal and analysis mode
function changeMode() {
	
	var mapWidth = document.getElementById('map-container').style.width;

	if (mapWidth == "50%") {
		document.getElementById('analyseModeBtn').value ="Aus";
		document.getElementById('analyseModeBtn').style.color ="#1D83C3";
		document.getElementById('analyseModeBtn').style.border ="1px solid #1D83C3";
		
		document.getElementById('map-container').style.display = "block";
		document.getElementById('map-container').style.width = "100%";
		resizeMap();
		document.getElementById('analyser-panel').style.display = "none";
		document.getElementById('analyser-chart').style.display = "none";
		document.getElementById('analyser-table').style.display = "none";
		
		document.getElementById('header-nav').style.background = "#fff";	
		
	} else {
		document.getElementById('analyseModeBtn').value ="An";
		document.getElementById('analyseModeBtn').style.color ="red";
		document.getElementById('analyseModeBtn').style.border ="1px solid red";
		
		document.getElementById('map-container').style.width = "50%";
		resizeMap();
		
		document.getElementById('analyser-panel').style.display = "block";
		document.getElementById('analyser-chart').style.display = "block";
		document.getElementById('analyser-table').style.display = "block";
		/*document.getElementById('header-nav').style.background = "#1D83C3";*/
		
		
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
		} catch(e){
			value = window.innerWidth;
		}
		return value; //window.innerWidth;
	}
	function getWindowHeight(){
		var value;
		try {
			value = document.body.clientHeight;
		} catch(e){
			value = window.innerHeight;
		}
		return value; //window.innerHeight;
	}
	
	function getScrollXY() {
		var scrOfX = 0, scrOfY = 0;
		if( typeof( window.pageYOffset ) == 'number' ) {
			//Netscape compliant
			scrOfY = window.pageYOffset;
			scrOfX = window.pageXOffset;
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			//DOM compliant
			scrOfY = document.body.scrollTop;
			scrOfX = document.body.scrollLeft;
		} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			//IE6 standards compliant mode
			scrOfY = document.documentElement.scrollTop;
			scrOfX = document.documentElement.scrollLeft;
		}
		return [ scrOfX, scrOfY ];
	}



function streetMode(){
  	if(map.getMapTypeId()=="OSM"){
  		alert("Change map layer to a google map");
  	}else{
  		if(alerted==false){
  			alert("Remove the last points with 'rightclick' somewhere in the map, but not at a point!");
  			alerted =true;
  		}
  		if(streetmode==false){ 
  			 
  			// Call enableStreetmode() function
  			enableStreetmode();
  		}else if(streetmode==true){
  			// Call disableStreetmode() function for clearing the overlay and removing Listener
  			disableStreetmode();
  		}
 }}