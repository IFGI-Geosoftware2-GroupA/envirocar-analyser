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

function createTable() {
	try {
		var query = new Query('measurements');
		var measurements = query.getData();
		var myTable     = document.createElement("table");
		var mytablehead = document.createElement("thead");
		var mytablebody = document.createElement("tbody");
		
		myTable.setAttribute("id", "tableID");
		
		consumption = new Array();
		co2 = new Array();
		speed = new Array();
		maf = new Array();

	
	setTimeout(function() {
		//Put Phenomenons in Arrays
		for (i=0, j=0; i< measurements.length; i++){
			for (j=0;j<measurements[i].phenomenons.length;j++){
				
				if (measurements[i].getPhenomenons()[j].name == "Consumption"){
					consumption.push((Number(measurements[i].getValues()[j]).toFixed(6)) + " " + measurements[i].getPhenomenons()[j].unit);		
				}
				else
				if (measurements[i].getPhenomenons()[j].name == "CO2"){
					co2.push((Number(measurements[i].getValues()[j]).toFixed(2)) + " " + measurements[i].getPhenomenons()[j].unit);	
				}
				else
				if (measurements[i].getPhenomenons()[j].name == "Speed"){
					speed.push((Number(measurements[i].getValues()[j]).toFixed(2)) + " " + measurements[i].getPhenomenons()[j].unit);		
				}
				else
				if (measurements[i].getPhenomenons()[j].name == "MAF"){
					maf.push((Number(measurements[i].getValues()[j]).toFixed(6)) + " " + measurements[i].getPhenomenons()[j].unit);		
				}
			}
		}
			
	for (var i=0; i < measurements.length; i++) {
					
//Creating the Headrow of the Table
		if (i == 0)	{
			
			headrow = document.createElement("tr");
			
			headcell1 = document.createElement("th");
			headcell2 = document.createElement("th");
			headcell3 = document.createElement("th");
			headcell4 = document.createElement("th");
			headcell5 = document.createElement("th");
			
			
			headtext1 = document.createTextNode("ID");
			headtext2 = document.createTextNode("Verbrauch");
			headtext3 = document.createTextNode("CO2");
			headtext4 = document.createTextNode("Geschwindigkeit");
			headtext5 = document.createTextNode("Luftmasse");
			
			headcell1.appendChild(headtext1);
			headcell2.appendChild(headtext2);
			headcell3.appendChild(headtext3);
			headcell4.appendChild(headtext4);
			headcell5.appendChild(headtext5);
			
			headrow.appendChild(headcell1);
			headrow.appendChild(headcell2);
			headrow.appendChild(headcell3);
			headrow.appendChild(headcell4);
			headrow.appendChild(headcell5);			
			
			mytablehead.appendChild(headrow);
		}

//Creating the rest of the Table
		
		currentRow = document.createElement("tr");
		
		currentCell0 = document.createElement("td");	
		currentCell1 = document.createElement("td");
		currentCell2 = document.createElement("td");
		currentCell3 = document.createElement("td");
		currentCell4 = document.createElement("td");

		//ID-Column
		var idatt = document.createAttribute("id"); 
		idatt.nodeValue = measurements[i].getId();
		currentCell0.setAttributeNode(idatt);
		currentText0 = document.createTextNode(measurements[i].getId());
		//Consumption-Column
		currentText1 = document.createTextNode(consumption[i]);
		//CO2-Column
		currentText2 = document.createTextNode(co2[i]); 
		//Speed-Column
		currentText3 = document.createTextNode(speed[i]); 
		//MAF-Column
		currentText4 = document.createTextNode(maf[i]); 
		
		currentCell0.appendChild(currentText0);
		currentCell1.appendChild(currentText1);
		currentCell2.appendChild(currentText2);
		currentCell3.appendChild(currentText3);
		currentCell4.appendChild(currentText4);
		
		currentRow.appendChild(currentCell0);
		currentRow.appendChild(currentCell1);
		currentRow.appendChild(currentCell2);
		currentRow.appendChild(currentCell3);
		currentRow.appendChild(currentCell4);
	
	mytablebody.appendChild(currentRow);

}

}, 4000);
	myTable.appendChild(mytablehead);
	myTable.appendChild(mytablebody);
	myTable.setAttribute("border",1);
		
	return myTable;
} catch(e) {
		alert(e.message);
	}
}

function dataTable(){

	$(document).ready(function() {

		$('#tableID').dataTable({

				"aoColumnDefs": [
      { "asSorting": [ "asc" ], "aTargets": [ 1] },],		
				"sPaginationType": "full_numbers",
				"sScrollY" : "200px",
				"bPaginate" : true,
				"bScrollCollapse" : true,
				"oLanguage": {
					    "sLengthMenu": "Zeige _MENU_ Einträge pro Seite",
					    "sZeroRecords": "Keine Einträge gefunden",
					    "sInfo": "Zeige _START_ bis _END_ von _TOTAL_ Einträgen",
					    "sInfoEmpty": "Zeige 0 bis 0 von 0 Einträgen",
					    "sInfoFiltered": "(aus _MAX_ Einträgen gefilterte Daten)",
					    "sFirst": "Erste",
					    "sNext": "Nächste",
					    "sPrevious": "Zurück",
					    "sLast": "Letzte",
					    "sSearch": "Suche:"
				}
			});
	});

}
//Refresh the Table after the ButtonClick with the marked checkboxes
function refreshTable() {

	if(document.checkbox.id.checked == true) {
      	$('#table td:nth-child(1), #table th:nth-child(1)').show();
	}
	else {
		$('#table td:nth-child(1),#table th:nth-child(1)').hide();
	}
	
	if(document.checkbox.verbrauch.checked == true) {
      	$('#table td:nth-child(2),#table th:nth-child(2)').show();
	}
	else {
		$('#table td:nth-child(2),#table th:nth-child(2)').hide();
	}
	
	if(document.checkbox.co2.checked == true) {
       	$('#table td:nth-child(3),#table th:nth-child(3)').show();
	}
	else {
		$('#table td:nth-child(3),#table th:nth-child(3)').hide();
	}
	
	if(document.checkbox.geschwindigkeit.checked == true) {
       	$('#table td:nth-child(4),#table th:nth-child(4)').show();
	}
	else {
		$('#table td:nth-child(4),#table th:nth-child(4)').hide();
	}
	
	if(document.checkbox.luftmasse.checked == true) {
       	$('#table td:nth-child(5),#table th:nth-child(5)').show();
	}
	else {
		$('#table td:nth-child(5),#table th:nth-child(5)').hide();	
	}
	
}
// ------------------------------------
// --- End of methods for the table ---
// ------------------------------------
