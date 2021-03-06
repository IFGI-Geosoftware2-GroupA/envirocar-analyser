<?php
if (isset($_GET['lang']) && $_GET['lang'] == 'en') {
	include 'php/translation_en.php';
	$other_lang = 'de';
} else {
	include 'php/translation_de.php';
	$lang = 'de';
	$other_lang = 'en';
}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title><?php echo $limit_filter; ?></title>    
		<meta name="description" content="">
		<meta name="author" content="Axel">
		<script src="js/lib/jquery-2.0.3.min.js"></script>
		<script src="js/lib/jquery-ui.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui.css">
		<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
		<!-- Style Elements of the Dialog -->
		<style type="text/css">
			body {
				font-family: 'Roboto', sans-serif;
			}
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
				background-color: #1D83C3;
			}
			.infobox{
				margin: 15px auto;
				background-color: #FF9933;
				padding: 5px;
				border: 1px solid black;
			}
			.confirm-button{
				padding: 5px;
				font-size: large;
				font-weight: bold;
				text-align: center;
				width: 245px;
			}
			input:hover{
				background-color: #92C049;
			}
			p input:hover{
				background-color: #FFF;
			}
		</style>

		<script type="text/javascript">
			// variables to save the limits chosen
			var speedMin = 0;
			var speedMax = 130;
			var engineLoadMin = 0;
			var engineLoadMax = 100;
			var consumptionMin = 6;
			var consumptionMax = 10;
			var co2Min = 5;
			var co2Max = 50;
			var rpmMin = 0;
			var rpmMax = 4000;
			
			// if there is already a filter set, set the values to this filter settings
			if(window.opener.limitFilterSettings[0] != 'reset'){
				switch(window.opener.limitFilterSettings[0]){
					case 'Speed' :
						speedMin = window.opener.limitFilterSettings[1];
						speedMax = window.opener.limitFilterSettings[2];
						break;
					case 'CO2' :
						co2Min = window.opener.limitFilterSettings[1];
						co2Max = window.opener.limitFilterSettings[2];
						break;
					case 'Consumption' :
						consumptionMin = window.opener.limitFilterSettings[1];
						consumptionMax = window.opener.limitFilterSettings[2];
						break;
					case 'Engine Load' :
						engineLodaMin = window.opener.limitFilterSettings[1];
						engineLoadMax = window.opener.limitFilterSettings[2];
						break;
					case 'Rpm' :
						rpmMin = window.opener.limitFilterSettings[1];
						rpmMax = window.opener.limitFilterSettings[2];
						break;
				}
			}
			
			// function to change the values when using the slider
			function setValue(phen,value){
				switch(phen){
					case 'speedMin':
						speedMin = value;
						break;
					case 'speedMax':
						speedMax = value;
						break;
					case 'engineLoadMin':
						engineLoadMin = value;
						break;
					case 'engineLoadMax':
						engineLoadMax = value;
						break;
					case 'consumptionMin':
						consumptionMin = value;
						break;
					case 'consumptionMax':
						consumptionMax = value;
						break;
					case 'co2Min':
						co2Min = value;
						break;
					case 'co2Max':
						co2Max = value;
						break;
					case 'rpmMin':
						rpmMin = value;
						break;
					case 'rpmMax':
						rpmMax = value;
						break;
				}
			}
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
					values : [speedMin, speedMax],
					slide : function(event, ui) {
						$("#amount-speed").val(ui.values[0] + " km/h - " + ui.values[1] + " km/h");
						setValue("speedMin", ui.values[0]);
						setValue("speedMax", ui.values[1]);
					}
				});
				$("#amount-speed").val($("#slider-range-speed").slider("values", 0) + " km/h - " + $("#slider-range-speed").slider("values", 1) + " km/h");
			});
			$(function() {
				$("#slider-range-consumption").slider({
					range : true,
					min : 0,
					max : 30,
					values : [consumptionMin, consumptionMax],
					slide : function(event, ui) {
						$("#amount-consumption").val(ui.values[0] + " l/h - " + ui.values[1] + " l/h");
						setValue("consumptionMin", ui.values[0]);
						setValue("consumptionMax", ui.values[1]);
					}
				});
				$("#amount-consumption").val($("#slider-range-consumption").slider("values", 0) + " l/h - " + $("#slider-range-consumption").slider("values", 1) + " l/h");
			});
			$(function() {
				$("#slider-range-engineLoad").slider({
					range : true,
					min : 0,
					max : 100,
					values : [engineLoadMin, engineLoadMax],
					slide : function(event, ui) {
						$("#amount-engineLoad").val(ui.values[0] + " % - " + ui.values[1] + " %");
						setValue("engineLoadMin", ui.values[0]);
						setValue("engineLoadMax", ui.values[1]);
					}
				});
				$("#amount-engineLoad").val($("#slider-range-engineLoad").slider("values", 0) + " % - " + $("#slider-range-engineLoad").slider("values", 1) + " %");
			});
			$(function() {
				$("#slider-range-rpm").slider({
					range : true,
					min : 0,
					max : 10000,
					values : [rpmMin, rpmMax],
					slide : function(event, ui) {
						$("#amount-rpm").val(ui.values[0] + " u/min - " + ui.values[1] + " u/min");
						setValue("rpmMin", ui.values[0]);
						setValue("rpmMax", ui.values[1]);
					}
				});
				$("#amount-rpm").val($("#slider-range-rpm").slider("values", 0) + " u/min - " + $("#slider-range-rpm").slider("values", 1) + " u/min");
			});
			$(function() {
				$("#slider-range-co2").slider({
					range : true,
					min : 0,
					max : 100,
					values : [co2Min, co2Max],
					slide : function(event, ui) {
						$("#amount-co2").val(ui.values[0] + " g/h - " + ui.values[1] + " g/h");
						setValue("co2Min", ui.values[0]);
						setValue("co2Max", ui.values[1]);
					}
				});
				$("#amount-co2").val($("#slider-range-co2").slider("values", 0) + " g/h - " + $("#slider-range-co2").slider("values", 1) + " g/h");
			});
		</script>

	</head>

	<body style="height: 400px; width: 600px;">
		<h1 align="center"><?php echo $limit_filter; ?></h1>
		
		<!-- Table with the links to switch between the phenomenons which can be filtered -->
		<table width="600px" align="center">
			<tr>
				<td class="t_element"><a id="speed" href="#"><?php echo $speed; ?></a></td>
				<td class="t_element"><a id="consumption" href="#"><?php echo $consumption; ?></a></td>
				<td class="t_element"><a id="engineLoad" href="#"><?php echo $engine_load; ?></a></td>
				<td class="t_element"><a id="rpm" href="#"><?php echo $rpm; ?></a></td>
				<td class="t_element"><a id="co2" href="#">CO2/h</a></td>
			</tr>
		</table>
		
		<!-- Only one of the following five containers is shown at the same time -->
		<!-- Container containing the Speed filter -->
		<div id="speed-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount"><?php echo $speed; ?>:</label>
				<input type="text" disabled="" id="amount-speed" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-speed"> </p>
			<div class="infobox">
				<?php echo $speed_info; ?>
			</div>
			<table>
				<tr>
					<td style="width: 40%; margin-right: 20px;"><input align="center" class="confirm-button" type="button" value="<?php echo $filter_by_speed; ?>" onclick="window.opener.applyLimitFilter('Speed', speedMin, speedMax)" /></td>
					<td style="width: 40%;"><input align="center" class="confirm-button" type="button" value="<?php echo $reset_filter; ?>" onclick="window.opener.applyLimitFilter('reset',0,0)" /></td>
				</tr>
			</table>
		</div>
		
		<!-- Container containing the Consumption filter -->
		<div id="consumption-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount"><?php echo $consumption; ?>:</label>
				<input type="text" disabled=""  id="amount-consumption" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-consumption"> </p>
			<div class="infobox">
				<?php echo $consumption_info; ?>
			</div>
			<table>
				<tr>
					<td style="width: 30%; margin-right: 20px;"><input align="center" class="confirm-button" type="button" value="<?php echo $filter_by_consumption; ?>" onclick="window.opener.applyLimitFilter('Consumption', consumptionMin, consumptionMax)" /></td>
					<td style="width: 30%;"><input align="center" class="confirm-button" type="button" value="<?php echo $reset_filter; ?>" onclick="window.opener.applyLimitFilter('reset',0,0)" /></td>
				</tr>
			</table>
		</div>
		
		<!-- Container containing the Engine Load filter -->
		<div id="engineLoad-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount"><?php echo $engine_load; ?>:</label>
				<input type="text" disabled="" id="amount-engineLoad" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-engineLoad"> </p>
			<table>
				<tr>
					<td style="width: 40%; margin-right: 20px;"><input align="center" class="confirm-button" type="button" value="<?php echo $filter_by_engine_load; ?>" onclick="window.opener.applyLimitFilter('Engine Load', engineLoadMin, engineLoadMax)" /></td>
					<td style="width: 40%;"><input align="center" class="confirm-button" type="button" value="<?php echo $reset_filter; ?>" onclick="window.opener.applyLimitFilter('reset',0,0)" /></td>
				</tr>
			</table>
		</div>
		
		<!-- Container containing the Rpm filter -->
		<div id="rpm-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount"><?php echo $rpm; ?>:</label>
				<input type="text" disabled="" id="amount-rpm" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-rpm"> </p>
			<table>
				<tr>
					<td style="width: 40%; margin-right: 20px;"><input align="center" class="confirm-button" type="button" value="<?php echo $filter_by_rpm; ?>" onclick="window.opener.applyLimitFilter('Rpm', rpmMin, rpmMax)" /></td>
					<td style="width: 40%;"><input align="center" class="confirm-button" type="button" value="<?php echo $reset_filter; ?>" onclick="window.opener.applyLimitFilter('reset',0,0)" /></td>
				</tr>
			</table>
		</div>
		
		<!-- Container containing the CO2/h filter -->
		<div id="co2-div" style="margin: auto; width: 500px;">
			<p>
				<label for="amount-co2">CO2/h:</label>
				<input type="text" disabled="" id="amount-co2" style="border:0; background-color: #FFFFFF; color:#f6931f; font-weight:bold;">
			</p>
			<p id="slider-range-co2"> </p>
			<table>
				<tr>
					<td style="width: 40%; margin-right: 20px;"><input align="center" class="confirm-button" type="button" value="<?php echo $filter_by_CO2; ?>" onclick="window.opener.applyLimitFilter('CO2/h', co2Min, co2Max)" /></td>
					<td style="width: 40%;"><input align="center" class="confirm-button" type="button" value="<?php echo $reset_filter; ?>" onclick="window.opener.applyLimitFilter('reset',0,0)" /></td>
				</tr>
			</table>		
		</div>
	</body>
</html>
