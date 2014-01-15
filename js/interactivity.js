/**
 * @author Daniel Sawatzky, Marius Runde
 */
 
// Function to change between normal and analysis mode

function changeMode() {

	var curWidth = document.getElementById('map').style.width;

	if (curWidth == "770px") {

			//alert('yes');

			document.getElementById('map').style.display = "block";
			document.getElementById('map').style.width = "100%";
			document.getElementById('chart').style.display = "none";
			document.getElementById('table').style.display = "none";
			document.getElementById('nav-bar').style.background = "#fff";
			document.getElementById('logo').src = "img/enviroCarLogo_transparent.png";
			resizeMap();
			document.getElementById('search-input').style.display = "block";
			document.getElementById('logo-label').style.color = "#000";
			
			
		} else {
		
			//alert('no');
			
			document.getElementById('map').style.width = "770px";
			document.getElementById('chart').style.display = "block";
			document.getElementById('table').style.display = "block";
			document.getElementById('nav-bar').style.background = "#1D83C3";
			document.getElementById('logo').src = "img/enviroCarLogo_trans_white.png";
			resizeMap();
			document.getElementById('search-input').style.display = "block";
			document.getElementById('logo-label').style.color = "#fff";
			
			
			
		
		}

}

/**
 * jQuery-Function to select a time range 
 * additonal: datepicker in german language
 */

$(function() {
	$( "#calendar-from" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 3,
		onClose: function( selectedDate ) {
			$( "#calendar-to" ).datepicker( "option", "minDate", selectedDate );
		}
	});
	$( "#calendar-to" ).datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 3,
		onClose: function( selectedDate ) {
			$( "#calendar-from" ).datepicker( "option", "maxDate", selectedDate );
		}
	});
	
	$.datepicker.regional['de'] = {clearText: 'löschen', clearStatus: 'aktuelles Datum löschen',
                closeText: 'schließen', closeStatus: 'ohne Änderungen schließen',
                prevText: '<zurück', prevStatus: 'letzten Monat zeigen',
                nextText: 'Vor>', nextStatus: 'nächsten Monat zeigen',
                currentText: 'heute', currentStatus: '',
                monthNames: ['Januar','Februar','März','April','Mai','Juni',
                'Juli','August','September','Oktober','November','Dezember'],
                monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
                'Jul','Aug','Sep','Okt','Nov','Dez'],
                monthStatus: 'anderen Monat anzeigen', yearStatus: 'anderes Jahr anzeigen',
                weekHeader: 'Wo', weekStatus: 'Woche des Monats',
                dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
                dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
                dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
                dayStatus: 'Setze DD als ersten Wochentag', dateStatus: 'Wähle D, M d',
                dateFormat: 'dd.mm.yy', firstDay: 1, 
                initStatus: 'Wähle ein Datum', isRTL: false};
        $.datepicker.setDefaults($.datepicker.regional['de']);
});

