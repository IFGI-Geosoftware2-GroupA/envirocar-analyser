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
}
/**
 * Create the Table on the basis of the json File
 */
function createTable() {	
	try {
		if (document.getElementById("tableID") != null) {
			deleteTable();
		}
		var myTable = document.createElement("table");
		var mytablehead = document.createElement("thead");
		var mytablebody = document.createElement("tbody");

		myTable.setAttribute("id", "tableID");

		consumption = new Array();
		co2 = new Array();
		speed = new Array();
		//maf = Array();
		engineload = new Array();
		rpm = new Array();

		//Put Phenomenons in Arrays
		for ( i = 0, j = 0; i < measurements.length; i++) {

			for ( j = 0; j < measurements[i].phenomenons.length; j++) {

				if (measurements[i].getPhenomenons()[j].name == "Consumption") {
					consumption.push((Number(measurements[i].getValues()[j]).toFixed(3)) + " " + measurements[i].getPhenomenons()[j].unit);
				} else if (measurements[i].getPhenomenons()[j].name == "CO2") {
					co2.push((Number(measurements[i].getValues()[j]).toFixed(2)) + " " + measurements[i].getPhenomenons()[j].unit);
				} else if (measurements[i].getPhenomenons()[j].name == "Speed") {
					speed.push((Number(measurements[i].getValues()[j]).toFixed(2)) + " " + measurements[i].getPhenomenons()[j].unit);
				} else if (measurements[i].getPhenomenons()[j].name == "Engine Load") {
					engineload.push((Number(measurements[i].getValues()[j]).toFixed(2)) + " " + measurements[i].getPhenomenons()[j].unit);
				} else if (measurements[i].getPhenomenons()[j].name == "Rpm") {
					rpm.push((Number(measurements[i].getValues()[j]).toFixed(0)) + " " + measurements[i].getPhenomenons()[j].unit);
				}
			}
		}

		for (var i = 0; i < measurements.length; i++) {

			//Creating the Headrow of the Table
			if (i == 0) {
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
							
							headtext0 = document.createTextNode("ID");
							headtext1 = document.createTextNode("Consumption");
							headtext2 = document.createTextNode("CO2");
							headtext3 = document.createTextNode("Speed");
							headtext4 = document.createTextNode("Engine Load");
							headtext5 = document.createTextNode("Revolut./Minute");
						}
						else {		
				
							headtext0 = document.createTextNode("ID");
							headtext1 = document.createTextNode("Verbrauch");
							headtext2 = document.createTextNode("CO2");
							headtext3 = document.createTextNode("Geschwindigkeit");
							headtext4 = document.createTextNode("Motorlast");
							headtext5 = document.createTextNode("Umdrehungen");
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
			}

			//Creating the rest of the Table
			currentRow = document.createElement("tr");
			var id = document.createAttribute("id");
			id.nodeValue = measurements[i].getId();
			currentRow.setAttributeNode(id);
			// currentRow.onclick = openMarkerInfoWindow(id.nodeValue);

			currentCell0 = document.createElement("td");
			currentCell1 = document.createElement("td");
			currentCell2 = document.createElement("td");
			currentCell3 = document.createElement("td");
			currentCell4 = document.createElement("td");
			currentCell5 = document.createElement("td");

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
		
	} catch(e) {
		alert(e.message);
	}
}


function deleteTable(){
	var tbl = document.getElementById("tableID");
       	tbl.parentNode.removeChild(tbl);
       	
       	if (document.getElementById("tableID_wrapper") != null) {
			var div = document.getElementById("tableID_wrapper");
			div.parentNode.removeChild(div);
		}
}

function deleteRows(value){
		
		var index = value;
		document.getElementById("tableID").deleteRow(index);
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
		$('#tableID').dataTable({
			"sPaginationType" : "full_numbers",
			"sScrollY" : "0px",
			"bPaginate" : false,
			"oLanguage" : {
				"sZeroRecords" : "Keine Einträge gefunden",
				"sInfo" : "Zeige _START_ bis _END_ von _TOTAL_ Einträgen",
				"sInfoEmpty" : "Zeige 0 bis 0 von 0 Einträgen",
				"sSearch" : "Suche:"
			}
		});
// 		Scrollable Area is determined dynamically when loading the page initially
		$('.dataTables_scrollBody').css('height', $("#map").height() * 2/3);
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

}

// ------------------------------------
// --- End of methods for the table ---
// ------------------------------------
