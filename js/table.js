/**
 * @author Marius Runde
 */
// -----------------------------
// --- Methods for the table ---
// -----------------------------
// Initialize the table
function initTable() {
	try {
		var query = new Query('examples/simpleExample.json');
		var measurements = query.getMeasurements();
		setTimeout(function() {
			alert(measurements[0].getId());
		}, 500);
	} catch(e) {
		alert(e.message);
	}
}
// ------------------------------------
// --- End of methods for the table ---
// ------------------------------------