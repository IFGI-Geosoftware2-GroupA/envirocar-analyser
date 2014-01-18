/**
 * @author Daniel Sawatzky, Marius Runde
 */
 
// Function to change between normal and analysis mode
function changeMode() {
	var curWidth = document.getElementById('map').style.width;

	if (curWidth == "50%") {
		document.getElementById('map').style.display = "block";
		document.getElementById('map').style.width = "100%";
		document.getElementById('chart').style.display = "none";
		document.getElementById('table').style.display = "none";
		document.getElementById('nav-bar').style.background = "#fff";
		document.getElementById('calendar').style.display = "block";
		document.getElementById('trackSelection').style.display = "none";
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
		document.getElementById('calendar').style.display = "none";
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
	

function interpolate() {
	if (document.getElementById("interpolation-btn").src == "img/stop_interpolation.png") {
		//alert("stop");
		document.getElementById("interpolation-btn").src = "img/run_interpolation.png";
	} else {
		//alert("run");
		document.getElementById("interpolation-btn").src = "img/stop_interpolation.png";
	}
}

$(document).ready(function() {
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
