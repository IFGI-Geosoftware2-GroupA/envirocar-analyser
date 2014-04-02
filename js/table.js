/**
 * @author Marius Runde, Mario Gerdes
 */
// -----------------------------
// --- Methods for the table ---
// -----------------------------
// Initialize the table
function initTable() {

	node = document.getElementById("analyser-table");
	node.appendChild(createTable());
	$('#analyser-table td:nth-child(7),#analyser-table th:nth-child(7)').hide();
}

// Initialize special table for Aggregation Results
function initAggregationTable(json){
	node = document.getElementById('analyser-table');
	node.appendChild(createAggregationTable(json));	
}

// create Table displaying only the aggregation results
function createAggregationTable(json){
	try{
		if (document.getElementById("tableID") != null) {
			deleteTable();
		}
		var json = JSON.parse(json);
		// hide the checkbox selection used for the 'normal' table
		if ($("#analyser-table-checkbox").is(":visible") ) {
			$("#analyser-table-checkbox").hide();
		}
		var myTable = document.createElement("table");
		var mytablehead = document.createElement("thead");
		var mytablebody = document.createElement("tbody");

		myTable.setAttribute("id", "tableID");
		
		//Creating the Headrow of the Table
		headrow = document.createElement("tr");

		headcell0 = document.createElement("th");
		headcell0.setAttribute("id", "idrow");
		headcell1 = document.createElement("th");
		headcell2 = document.createElement("th");
		headcell3 = document.createElement("th");
		headcell4 = document.createElement("th");
		headcell5 = document.createElement("th");

		var l = getParam('lang');
		if (l == "en") {
			headtext0 = document.createTextNode("Value");
			headtext1 = document.createTextNode("CO2");
			headtext2 = document.createTextNode("Consumption");
			headtext3 = document.createTextNode("Engine Load");
			headtext4 = document.createTextNode("Revolut./Minute");
			headtext5 = document.createTextNode("Speed");
		} else {
			headtext0 = document.createTextNode("Wert");
			headtext1 = document.createTextNode("CO2");
			headtext2 = document.createTextNode("Verbrauch");
			headtext3 = document.createTextNode("Engine Load");
			headtext4 = document.createTextNode("Umdrehungen/Minute");
			headtext5 = document.createTextNode("Geschwindigkeit");
		}

		headcell0.appendChild(headtext0);
		headcell1.appendChild(headtext1);
		headcell2.appendChild(headtext2);
		headcell3.appendChild(headtext3);
		headcell4.appendChild(headtext4);
		headcell5.appendChild(headtext5);

		headrow.appendChild(headcell0);
		headrow.appendChild(headcell1);
		headrow.appendChild(headcell2);
		headrow.appendChild(headcell3);
		headrow.appendChild(headcell4);
		headrow.appendChild(headcell5);

		mytablehead.appendChild(headrow);
		
		var temp, text1, text2, text3, text4, text5;
		for(var i = 0; i < 4; i++){
			//	Create Columns for Mean, Standard Error, Min and Max
			currentRow = document.createElement("tr");

			currentCell0 = document.createElement("th");
			currentCell1 = document.createElement("td");
			currentCell2 = document.createElement("td");
			currentCell3 = document.createElement("td");
			currentCell4 = document.createElement("td");
			currentCell5 = document.createElement("td");
			
			//Value-Column
			switch(i){
				case 0: 
					if(l == "en") temp = "Mean";
					else temp = "Durchschnitt";
					text1 = Number(json[0]['CO2']['Mean']).toFixed(2);
					text2 = Number(json[1]['Consumption']['Mean']).toFixed(2);
					text3 = Number(json[2]['Engine Load']['Mean']).toFixed(2);
					text4 = Number(json[3]['Rpm']['Mean']).toFixed(0);
					text5 = Number(json[4]['Speed']['Mean']).toFixed(2);
					break;
				case 1: 
					if(l == "en") temp = "Standard Error";
					else temp = "Standardfehler";
					text1 = Number(json[0]['CO2']['Standard Error']).toFixed(2);
					text2 = Number(json[1]['Consumption']['Standard Error']).toFixed(2);
					text3 = Number(json[2]['Engine Load']['Standard Error']).toFixed(2);
					text4 = Number(json[3]['Rpm']['Standard Error']).toFixed(0);
					text5 = Number(json[4]['Speed']['Standard Error']).toFixed(2);
					break;
				case 2: 
					if(l == "en") temp = "Minimum";
					else temp = "Minimum";
					text1 = Number(json[0]['CO2']['Min']).toFixed(2);
					text2 = Number(json[1]['Consumption']['Min']).toFixed(2);
					text3 = Number(json[2]['Engine Load']['Min']).toFixed(2);
					text4 = Number(json[3]['Rpm']['Min']).toFixed(0);
					text5 = Number(json[4]['Speed']['Min']).toFixed(2);
					break;
				case 3: 
					if(l == "en") temp = "Maximum";
					else temp = "Maximum";
					text1 = Number(json[0]['CO2']['Max']).toFixed(2);
					text2 = Number(json[1]['Consumption']['Max']).toFixed(2);
					text3 = Number(json[2]['Engine Load']['Max']).toFixed(2);
					text4 = Number(json[3]['Rpm']['Max']).toFixed(0);
					text5 = Number(json[4]['Speed']['Max']).toFixed(2);
					break;
			}
			if(text1 == "NaN") text1 = "No Data";
			if(text2 == "NaN") text2 = "No Data";
			if(text3 == "NaN") text3 = "No Data";
			if(text4 == "NaN") text4 = "No Data";
			if(text5 == "NaN") text5 = "No Data";
			
			currentText0 = document.createTextNode(temp);

			//Consumption-Column
			currentText1 = document.createTextNode(text1);

			//CO2-Column
			currentText2 = document.createTextNode(text2);

			//Speed-Column
			currentText3 = document.createTextNode(text3);

			//Engine Load-Column
			currentText4 = document.createTextNode(text4);

			//RPM-Column
			currentText5 = document.createTextNode(text5);

			currentCell0.appendChild(currentText0);
			currentCell1.appendChild(currentText1);
			currentCell2.appendChild(currentText2);
			currentCell3.appendChild(currentText3);
			currentCell4.appendChild(currentText4);
			currentCell5.appendChild(currentText5);

			currentRow.appendChild(currentCell0);
			currentRow.appendChild(currentCell1);
			currentRow.appendChild(currentCell2);
			currentRow.appendChild(currentCell3);
			currentRow.appendChild(currentCell4);
			currentRow.appendChild(currentCell5);

			mytablebody.appendChild(currentRow);
		}
		
		myTable.appendChild(mytablehead);
		myTable.appendChild(mytablebody);
		myTable.setAttribute("border", 1);

		return myTable;
		
	}
	catch(e){
		alert(e.message);
	}
}

/**
 * Create the Table on the basis of the json File
 */
function createTable() {
	try {
		if (document.getElementById("tableID") != null) {
			deleteTable();
		}
		if ($("#analyser-table-checkbox").is(":hidden") ) {
			$("#analyser-table-checkbox").show();
		}
		var myTable = document.createElement("table");
		var mytablehead = document.createElement("thead");
		var mytablebody = document.createElement("tbody");

		myTable.setAttribute("id", "tableID");

		consumption = new Array();
		co2 = new Array();
		speed = new Array();
		engineload = new Array();
		rpm = new Array();
		ratio = new Array();

		//Put Phenomenons in Arrays
		for ( i = 0, j = 0; i < measurements.length; i++) {
			for ( j = 0; j < measurements[i].phenomenons.length; j++) {
				
				if (measurements[i].getPhenomenons()[j].name == "Consumption") {
					consumption.push((Number(measurements[i].getValues()[j]).toFixed(2)));
					
				} else if (measurements[i].getPhenomenons()[j].name == "CO2") {
					co2.push((Number(measurements[i].getValues()[j]).toFixed(2)));
					
				} else if (measurements[i].getPhenomenons()[j].name == "Speed") {
					speed.push((Number(measurements[i].getValues()[j]).toFixed(2)));
					
				} else if (measurements[i].getPhenomenons()[j].name == "Engine Load") {
					engineload.push((Number(measurements[i].getValues()[j]).toFixed(2)));
					
				} else if (measurements[i].getPhenomenons()[j].name == "Rpm") {
					rpm.push((Number(measurements[i].getValues()[j]).toFixed(0)));
				}
			}
			
			//The ratio array will be filled with the values of the Divison of CO2 and Speed 
			//which will be multiplie with the factor 1000 to get the unit g/km
			ratio.push((Number((co2[i]/speed[i]).toFixed(2))*1000));
			
			// If values are not measured,
			// this will make sure that there is a value entered in the corresponding arrays
			if (consumption[i] == undefined) {
				consumption[i] = '-';
			}
			if (co2[i] == undefined) {
				co2[i] = '-';
			}
			if (speed[i] == undefined) {
				speed[i] = '-';
			}
			if (engineload[i] == undefined) {
				engineload[i] = '-';
			}
			if (rpm[i] == undefined) {
				rpm[i] = '-';
			}
			if (ratio[i] == "Infinity") {
				ratio[i] = '0';
			}
		}
		//Creating the Headrow of the Table
		headrow = document.createElement("tr");

		headcell0 = document.createElement("th");
		headcell0.setAttribute("id", "idrow");
		headcell1 = document.createElement("th");
		headcell2 = document.createElement("th");
		headcell3 = document.createElement("th");
		headcell4 = document.createElement("th");
		headcell5 = document.createElement("th");
		headcell6 = document.createElement("th");

		var l = getParam('lang');
		if (l == "en") {

			headtext0 = document.createTextNode("ID");
			headtext1 = document.createTextNode("Consumption (l/h)");
			headtext2 = document.createTextNode("CO2 (kg/h)");
			headtext3 = document.createTextNode("Speed (km/h)");
			headtext4 = document.createTextNode("Engine Load (%)");
			headtext5 = document.createTextNode("Revolut./Minute (u/min)");
			headtext6 = document.createTextNode("CO2 per Kilometre (g/km)");
		} else {

			headtext0 = document.createTextNode("ID");
			headtext1 = document.createTextNode("Verbrauch (l/h)");
			headtext2 = document.createTextNode("CO2 (kg/h)");
			headtext3 = document.createTextNode("Geschwindigkeit (km/h)");
			headtext4 = document.createTextNode("Motorlast (%)");
			headtext5 = document.createTextNode("Umdrehungen (u/min)");
			headtext6 = document.createTextNode("CO2 pro Kilometer (g/km)");
		}

		headcell0.appendChild(headtext0);
		headcell1.appendChild(headtext1);
		headcell2.appendChild(headtext2);
		headcell3.appendChild(headtext3);
		headcell4.appendChild(headtext4);
		headcell5.appendChild(headtext5);
		headcell6.appendChild(headtext6);

		headrow.appendChild(headcell0);
		headrow.appendChild(headcell1);
		headrow.appendChild(headcell2);
		headrow.appendChild(headcell3);
		headrow.appendChild(headcell4);
		headrow.appendChild(headcell5);
		headrow.appendChild(headcell6);

		mytablehead.appendChild(headrow);
		

		for (var i = 0; i < measurements.length; i++) {

			//Creating the rest of the Table
			currentRow = document.createElement("tr");
			var id = document.createAttribute("id");
			id.nodeValue = measurements[i].getId();
			currentRow.setAttributeNode(id);

			currentCell0 = document.createElement("td");
			currentCell1 = document.createElement("td");
			currentCell2 = document.createElement("td");
			currentCell3 = document.createElement("td");
			currentCell4 = document.createElement("td");
			currentCell5 = document.createElement("td");
			currentCell6 = document.createElement("td");

			//ID-Column
			currentText0 = document.createTextNode(measurements[i].getId());

			//Consumption-Column
			currentText1 = document.createTextNode(consumption[i]);

			//CO2-Column
			currentText2 = document.createTextNode(co2[i]);

			//Speed-Column
			currentText3 = document.createTextNode(speed[i]);

			//Engine Load-Column
			currentText4 = document.createTextNode(engineload[i]);

			//RPM-Column
			currentText5 = document.createTextNode(rpm[i]);
			
			//CO2_per_Kilometre-Column
			currentText6 = document.createTextNode(ratio[i]);
			
			currentCell0.appendChild(currentText0);
			currentCell1.appendChild(currentText1);
			currentCell2.appendChild(currentText2);
			currentCell3.appendChild(currentText3);
			currentCell4.appendChild(currentText4);
			currentCell5.appendChild(currentText5);
			currentCell6.appendChild(currentText6);

			currentRow.appendChild(currentCell0);
			currentRow.appendChild(currentCell1);
			currentRow.appendChild(currentCell2);
			currentRow.appendChild(currentCell3);
			currentRow.appendChild(currentCell4);
			currentRow.appendChild(currentCell5);
			currentRow.appendChild(currentCell6);

			mytablebody.appendChild(currentRow);
		}

		myTable.appendChild(mytablehead);
		myTable.appendChild(mytablebody);
		myTable.setAttribute("border", 1);
		
		return myTable;

	} catch(e) {
		alert(e.message);
	}
}

/**
 * Delete the entire table out of the DOM
 */
function deleteTable() {
	var tbl = document.getElementById("tableID");
	tbl.parentNode.removeChild(tbl);

	if (document.getElementById("tableID_wrapper") != null) {
		var div = document.getElementById("tableID_wrapper");
		div.parentNode.removeChild(div);
	}
}

/**
 * Delete the rows of the table with a specific index
 */
function deleteRows(value) {

	var index = value;
	document.getElementById("tableID").deleteRow(index);
}

/**
 * Show the column with the co2 per kilometre values
 */
function ratiocolumn(){
	$('#analyser-table td:nth-child(7),#analyser-table th:nth-child(7)').show();
	document.getElementById("co2prokmid").style.display ="block";
	document.getElementById("co2prokm").checked = true;
}

/**
 * create DIV element and append to the table cell
 */
function createCell(cell, text) {
    var div = document.createElement('div'), 
        txt = document.createTextNode(text); 
    	div.appendChild(txt);                    
    	cell.appendChild(div);                   
}

/**
 * Open the marker info window of the belonging measurement
 * by triggering the 'click' event
 */
function openMarkerInfoWindow(id) {
	for (var i = 0; i < markers.length; i++) {
		if (markers[i].id == id) {
			google.maps.event.trigger(markers[i], 'click');
		}
	}
}

/**
 * Use the existing HTML Table and changes some style parameters
 */
function tablestyle() {
	//$(document).ready(function() {
	if (getParam('lang') == 'en') {
		$('#tableID').dataTable({
			"sPaginationType" : "full_numbers",
			"aaSorting": [],
			"sScrollY" : "0px",
			"bPaginate" : false,
			"oLanguage" : {
				"sZeroRecords" : "No entries found",
				"sInfo" : "Show _TOTAL_ entries",
				"sInfoEmpty" : "Show no entries",
				"sInfoFiltered": "(filtered from _MAX_ total records)",
				"sSearch" : "Search:"
			}
		});
	} else {
		$('#tableID').dataTable({
			"sPaginationType" : "full_numbers",
			"aaSorting": [],
			"sScrollY" : "0px",
			"bPaginate" : false,
			"oLanguage" : {
				"sZeroRecords" : "Keine Eintr&auml;ge gefunden",
				"sInfo" : "Zeige _TOTAL_ Eintr&auml;ge",
				"sInfoEmpty" : "Zeige keine Eintr&auml;ge",
				"sInfoFiltered": "(gefiltert aus _MAX_ Eintr&auml;gen insgesamt)",
				"sSearch" : "Suche:"
			}
		});
	}
	// 		Scrollable Area is determined dynamically when loading the page initially
	if (viewMode == "table")
		$('.dataTables_scrollBody').css('height', $("#map").height() * 3 / 5);
	if (viewMode == "dual")
		$('.dataTables_scrollBody').css('height', $("#map").height() * 1 / 3);
	//});
}

/**
 * Refresh the Table with the marked checkboxes by clicking the 'Aktualisieren' Button
 */
function refreshTable() {
	if (document.checkbox.id.checked == true) {
		$('#analyser-table td:nth-child(1), #analyser-table th:nth-child(1)').show();

	} else {
		$('#analyser-table td:nth-child(1),#analyser-table th:nth-child(1)').hide();
	}

	if (document.checkbox.verbrauch.checked == true) {
		$('#analyser-table td:nth-child(2),#analyser-table th:nth-child(2)').show();

	} else {
		$('#analyser-table td:nth-child(2),#analyser-table th:nth-child(2)').hide();
	}

	if (document.checkbox.co2.checked == true) {
		$('#analyser-table td:nth-child(3),#analyser-table th:nth-child(3)').show();

	} else {
		$('#analyser-table td:nth-child(3),#analyser-table th:nth-child(3)').hide();
	}

	if (document.checkbox.geschwindigkeit.checked == true) {
		$('#analyser-table td:nth-child(4),#analyser-table th:nth-child(4)').show();

	} else {
		$('#analyser-table td:nth-child(4),#analyser-table th:nth-child(4)').hide();
	}

	if (document.checkbox.motorlast.checked == true) {
		$('#analyser-table td:nth-child(5),#analyser-table th:nth-child(5)').show();

	} else {
		$('#analyser-table td:nth-child(5),#analyser-table th:nth-child(5)').hide();
	}

	if (document.checkbox.umdrehungen.checked == true) {
		$('#analyser-table td:nth-child(6),#analyser-table th:nth-child(6)').show();

	} else {
		$('#analyser-table td:nth-child(6),#analyser-table th:nth-child(6)').hide();
	}
	
	if (document.checkbox.co2prokm.checked == true) {
		$('#analyser-table td:nth-child(7),#analyser-table th:nth-child(7)').show();

	} else {
		$('#analyser-table td:nth-child(7),#analyser-table th:nth-child(7)').hide();
	}

}

// ------------------------------------
// --- End of methods for the table ---
// ------------------------------------
