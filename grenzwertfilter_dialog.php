<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title>Grenzwertfilter</title>
		<meta name="description" content="">
		<meta name="author" content="Axel">
		<script src="js/lib/jquery-2.0.3.min.js"></script>
		<script src="js/lib/jquery-ui.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui.css">
		<!-- Style Elements of the Dialog -->
		<style type="text/css">
			.t_element a {
				padding: 5px;
				margin: 1px;
				border: 1px solid black;
				font-size: large;
				text-align: center;
				text-decoration: none;
				color: black;
				display: block;
			}
			.t_element a:hover {
				background-color: #00FFFF;
			}
			.infobox{
				margin: 15px auto;
				background-color: #FF9933;
				padding: 5px;
				border: 1px solid black;
			}
			.confirm-button{
				margin: auto 100px;
				padding: 5px;
				font-size: large;
				font-weight: bold;
				text-align: center;
				width: 290px;
			}
			input:hover{
				background-color: #33FF00;
			}
			p input:hover{
				background-color: #FFF;
			}
		</style>

		<script type="text/javascript">
// 			JQuery Functions to only show the filter selected
			$(document).ready(function() {
				$("#consumption-div").hide();
				$("#engineLoad-div").hide();
				$("#co2-div").hide();
				$("#rpm-div").hide();

				$("#speed").click(function() {
					$("#speed-div").show(300);
					$("#consumption-div").hide();
					$("#engineLoad-div").hide();
					$("#co2-div").hide();
					$("#rpm-div").hide();
				});

				$("#consumption").click(function() {
					$("#consumption-div").show(300);
					$("#speed-div").hide();
					$("#engineLoad-div").hide();
					$("#co2-div").hide();
					$("#rpm-div").hide();
				});

				$("#engineLoad").click(function() {
					$("#engineLoad-div").show(300);
					$("#consumption-div").hide();
					$("#speed-div").hide();
					$("#co2-div").hide();
					$("#rpm-div").hide();
				});

				$("#co2").click(function() {
					$("#co2-div").show(300);
					$("#consumption-div").hide();
					$("#engineLoad-div").hide();
					$("#speed-div").hide();
					$("#rpm-div").hide();
				});

				$("#rpm").click(function() {
					$("#rpm-div").show(300);
					$("#consumption-div").hide();
					$("#engineLoad-div").hide();
					$("#co2-div").hide();
					$("#speed-div").hide();
				});

			});

// 			Slider Handler for Speed, Consumption, EngineLoad, Rpm and CO2
			$(function() {
				$("#slider-range-speed").slider({
					range : true,
					min : 0,
					max : 300,
					values : [0, 120],
					slide : function(event, ui) {
						$("#amount-speed").val(ui.values[0] + " km/h - " + ui.values[1] + " km/h");
					}
				});
				$("#amount-speed").val($("#slider-range-speed").slider("values", 0) + " km/h - " + $("#slider-range-speed").slider("values", 1) + " km/h");
			});
			$(function() {
				$("#slider-range-consumption").slider({
					range : true,
					min : 0,
					max : 30,
					values : [6, 10],
					slide : function(event, ui) {
						$("#amount-consumption").val(ui.values[0] + " l/h - " + ui.values[1] + " l/h");
					}
				});
				$("#amount-consumption").val($("#slider-range-consumption").slider("values", 0) + " l/h - " + $("#slider-range-consumption").slider("values", 1) + " l/h");
			});
			$(function() {
				$("#slider-range-engineLoad").slider({
					range : true,
					min : 0,
					max : 100,
					values : [10, 20],
					slide : function(event, ui) {
						$("#amount-engineLoad").val(ui.values[0] + " % - " + ui.values[1] + " %");
					}
				});
				$("#amount-engineLoad").val($("#slider-range-engineLoad").slider("values", 0) + " % - " + $("#slider-range-engineLoad").slider("values", 1) + " %");
			});
			$(function() {
				$("#slider-range-rpm").slider({
					range : true,
					min : 0,
					max : 30000,
					values : [1000, 4000],
					slide : function(event, ui) {
						$("#amount-rpm").val(ui.values[0] + " u/min - " + ui.values[1] + " u/min");
					}
				});
				$("#amount-rpm").val($("#slider-range-rpm").slider("values", 0) + " u/min - " + $("#slider-range-rpm").slider("values", 1) + " u/min");
			});
			$(function() {
				$("#slider-range-co2").slider({
					range : true,
					min : 0,
					max : 400,
					values : [110, 150],
					slide : function(event, ui) {
						$("#amount-co2").val(ui.values[0] + " g/h - " + ui.values[1] + " g/h");
					}
				});
				$("#amount-co2").val($("#slider-range-co2").slider("values", 0) + " g/h - " + $("#slider-range-co2").slider("values", 1) + " g/h");
			});
		</script>

	</head>

	<body style="height: 400px; width: 600px;">
		<h1 align="center">Grenzwert-Filter</h1>
		
		<!-- Table with the links to switch between the phenomenons which can be filtered -->
		<table width="600px" align="center">
			<tr>
				<td class="t_element"><a id="speed" href="#">Geschwindigkeit</a></td>
				<td class="t_element"><a id="consumption" href="#">Verbrauch</a></td>
				<td class="t_element"><a id="engineLoad" href="#">Motorlast</a></td>
				<td class="t_element"><a id="rpm" href="#">Umdrehungen</a></td>
				<td class="t_element"><a id="co2" href="#">CO2</a></td>
			</tr>
		</table>
		
		<!-- Only one of the following five containers is shown at the same time -->
		<!-- Container containing the Speed filter -->
		<div id="speed-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount">Geschwindigkeit:</label>
				<input type="text" disabled="" id="amount-speed" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-speed"> </p>
			<div class="infobox">
				<b>Info: </b>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			</div>
			<input align="center" class="confirm-button" type="button" value="Geschwindigkeit filtern" onclick="" />
		</div>
		
		<!-- Container containing the Consumption filter -->
		<div id="consumption-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount">Verbrauch:</label>
				<input type="text" disabled=""  id="amount-consumption" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-consumption"> </p>
			<div class="infobox">
				<b>Info: </b>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			</div>
			<input align="center" class="confirm-button" type="button" value="Verbrauch filtern" onclick="" />
		</div>
		
		<!-- Container containing the Engine Load filter -->
		<div id="engineLoad-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount">Motorlast:</label>
				<input type="text" disabled="" id="amount-engineLoad" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-engineLoad"> </p>
			<div class="infobox">
				<b>Info: </b>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			</div>
			<input align="center" class="confirm-button" type="button" value="Motorlast filtern" onclick="" />
		</div>
		
		<!-- Container containing the Rpm filter -->
		<div id="rpm-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount">Umdrehungen:</label>
				<input type="text" disabled="" id="amount-rpm" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-rpm"> </p>
			<div class="infobox">
				<b>Info: </b>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			</div>
			<input align="center" class="confirm-button" type="button" value="Umdrehungen filtern" onclick="" />
		</div>
		
		<!-- Container containing the CO2 filter -->
		<div id="co2-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount-co2">CO2:</label>
				<input type="text" disabled="" id="amount-co2" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-co2"> </p>
			<div class="infobox">
				<b>Info: </b>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
			</div>
			<input align="center" class="confirm-button" type="button" value="CO2 filtern" onclick="" />
		</div>
	</body>
</html>
