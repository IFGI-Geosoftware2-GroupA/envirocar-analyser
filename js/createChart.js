/**
 * @author Marius Runde
 */

function initChart() {
	//Get the context of the canvas element we want to select
	var ctx = $("#chart").get(0).getContext("2d");
	
	var data = {
		labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli"],
		datasets: [
			{
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				data: [65, 59, 90, 81, 56, 55, 40]
			},
			{
				fillColor: "rgba(151,187,205,0.5)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				data: [28, 48, 40, 19, 96, 27, 100]
			}
		]
	}
	
	var chart = new Chart(ctx).Line(data);
}