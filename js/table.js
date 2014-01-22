/**
 * @author Marius Runde, Mario Gerdes
 */

// -----------------------------
// --- Methods for the table ---
// -----------------------------
// Initialize the table
function createTable() {
    node = document.getElementById("table");
    node.appendChild(initTable());
    }

function initTable() {
	try {
		var query = new Query('measurements');
		var measurements = query.getData();
		
		var myTable     = document.createElement("table");
		var mytablebody = document.createElement("tbody");
		
		consumption = new Array();
		co2 = new Array();
		speed = new Array();
		maf = new Array();

	
	setTimeout(function() {
		//alert(measurements[4].phenomenons[0] + measurements[4].phenomenons[1] + measurements[4].phenomenons[2]);
		
		for (i=0, j=0 /*, k=0, l=1,m=2,n=3*/; i< measurements.length; i++/*, k=k+4,l=l+4,m=m+4,n=n+4*/){
			for (j=0;j<measurements[i].phenomenons.length;j++){
				
				if (measurements[i].getPhenomenons()[j].name == "Consumption"){
					//alert("Consumption");
					consumption.push(measurements[i].getPhenomenons()[j].unit + " " + measurements[i].getValues()[j]);		
				}
				else
				if (measurements[i].getPhenomenons()[j].name == "CO2"){
					//alert("co2");
					co2.push(measurements[i].getPhenomenons()[j].unit + " " + measurements[i].getValues()[j]);	
				}
				else
				if (measurements[i].getPhenomenons()[j].name == "Speed"){
					//alert("speed");
					speed.push(measurements[i].getPhenomenons()[j].unit + " " + measurements[i].getValues()[j]);		
				}
				else
				if (measurements[i].getPhenomenons()[j].name == "MAF"){
					//alert("maf");
					maf.push(measurements[i].getPhenomenons()[j].unit + " " + measurements[i].getValues()[j]);		
				}
			}
		}
			
	for (var i=0/*, j=0, k=1,l=2,m=3*/; i < measurements.length; i++/*,j=j+4,k=k+4,l=l+4,m=m+4*/) {
					
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
			
			mytablebody.appendChild(headrow);
		}

//Creating the rest of the Table
		
		currentRow = document.createElement("tr");
		
		currentCell0 = document.createElement("td");	
		currentCell1 = document.createElement("td");
		currentCell2 = document.createElement("td");
		currentCell3 = document.createElement("td");
		currentCell4 = document.createElement("td");

		//ID-Column
		currentText0 = document.createTextNode(measurements[i].getId());
		//Consumption-Column
		currentText1 = document.createTextNode(consumption[i]); // + " Value: " + measurements[i].getValues()[j]);
		//currentFragment1 = document.createTextNode(currentText1.substring(41,43) + " " + currentText1.substring(30,33));
		//CO2-Column
		currentText2 = document.createTextNode(co2[i]); // + " Value: " + measurements[i].getValues()[k]);
		//currentFragment2 = document.createTextNode(currentText2.substring(34,35) + " " + currentText2.substring(22,25));
		//Speed-Column
		currentText3 = document.createTextNode(speed[i]); // + " Value: " + measurements[i].getValues()[l]);
		//currentFragment3 = document.createTextNode(currentText3.substring(37,38) + " " + currentText3.substring(24,28));
		//MAF-Column
		currentText4 = document.createTextNode(maf[i]); // + " Value: " + measurements[i].getValues()[m]);
		//currentFragment4 = document.createTextNode(currentText4.substring(33,36) + " " + currentText4.substring(22,25));
		
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
	myTable.appendChild(mytablebody);
	myTable.setAttribute("border",1);
		
	return myTable;
} catch(e) {
		alert(e.message);
	}
}

	$(function() {
		var $table = $('myTable');
		
		$('table').floatThead({
    	scrollingTop: pageTop,
    	useAbsolutePositioning: true,
    	scrollContainer: function($table){
        
        return $table.closest('#table');
    }
});
}

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