/**
 * @author Daniel Sawatzky, Marius Runde
 */
 
// Global variables
	var wHeight = getWindowHeight();
	var wWidth = getWindowWidth();
	var pos = getScrollXY();

// Map Window Height
//alert("Höhe: " + wHeight + "Breite: " + wWidth);
//document.getElementById('map').style.height = '"' + wHeight + 'px"';

// Function to change between normal and analysis mode
function changeMode() {
	var curWidth = document.getElementById('map').style.width;

	if (curWidth == "50%") {
		document.getElementById('map').style.display = "block";
		document.getElementById('map').style.width = "100%";
		//document.getElementById('map').style.height = '"' + wHeight + 'px"';
		document.getElementById('chart').style.display = "none";
		document.getElementById('table').style.display = "none";
		document.getElementById('nav-bar').style.background = "#fff";
		document.getElementById('calendar').style.display = "block";
		document.getElementById('trackSelection').style.display = "block";
		document.getElementById('logo').src = "img/enviroCarLogo_transparent.png";
		resizeMap();
		document.getElementById('search-input').style.display = "block";
		document.getElementById('logo-label').style.color = "#000";
		document.getElementById('analysis-mode-label').style.color = "#000";
		document.getElementById('analysis-interpolation').style.display = "none";
		document.getElementById('progressbar').style.display = "none";
		
	} else {
		document.getElementById('map').style.width = "50%";
		document.getElementById('chart').style.display = "block";
		document.getElementById('table').style.display = "block";
		document.getElementById('nav-bar').style.background = "#1D83C3";
		document.getElementById('calendar').style.display = "block";
		document.getElementById('trackSelection').style.display = "block";
		document.getElementById('logo').src = "img/enviroCarLogo_trans_white.png";
		resizeMap();
		document.getElementById('search-input').style.display = "block";
		document.getElementById('logo-label').style.color = "#fff";
		document.getElementById('analysis-mode-label').style.color = "#fff";
		document.getElementById('analysis-interpolation').style.display = "block";
		document.getElementById('progressbar').style.display = "block";
	}
}

/**
 * jQuery-Function to select a time range 
 * additonal: datepicker in german language and timepicker
 */
$(function() {
	
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
	
// Animations for interpolation progressbar and buttons

function interpolateAnimation() {
	if (document.getElementById("interpolation-btn").src == "img/stop_interpolation.png") {
		//alert("stop");
		document.getElementById("interpolation-btn").src = "img/run_interpolation.png";
	} else {
		//alert("run");
		document.getElementById("interpolation-btn").src = "img/stop_interpolation.png";
	}
}

$('#interpolation-btn').ready(function() {
	var progressbar = $('#progressbar'), max = progressbar.attr('max'), time = (1000 / max) * 5, value = progressbar.val();

	var loading = function() {
		value += 1;
		addValue = progressbar.val(value);

		if (value == max) {
			clearInterval(animate);
		}
	};

	var animate = setInterval(function() {
		loading();
	}, time);

	$('#interpolation-btn').click(function() {
		loading();
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

/* Change flag */

function changeFlag(directionValue) {
		
		if (directionValue == 1)
		{
			document.getElementById("ger_eng").style.display = '';
			document.getElementById("eng_ger").style.display = 'none';
			document.getElementById("direction").options[0].selected = true;
			direction = 1;
		}
		
		
		if (directionValue == 2)
		{
			document.getElementById("ger_eng").style.display = 'none';
			document.getElementById("eng_ger").style.display = '';
			document.getElementById("direction").options[1].selected = true;
			direction = 2;
		}
		

}