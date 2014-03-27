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
<html lang="de">
<head>
	<meta charset="utf-8" />
	
	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
	Remove this if you use the .htaccess -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
	<title>envirocar-analyser</title>
	<meta name="description" content="Internet Applikation zur Exploration und Visualisierung von raum-zeitvarianten Fahrzeug-Messdaten" />
	<meta name="author" content="Marius Runde, Daniel Sawatzky, Jens Balmert" />
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- Stylesheets and Favicon -->
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<link rel="shortcut icon" href="img/favicon.ico" />
	<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui-timepicker-addon.min.css" />
	<link rel="stylesheet" type="text/css" href="css/lib/bootstrap-duallistbox.css" />
	<link rel="stylesheet" type="text/css" href="css/lib/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="css/icons.css" />
	<link rel="stylesheet" type="text/css" href="css/flags.css" >
	<link rel="stylesheet" type="text/css" href="css/lib/jquery.dataTables.css" >
	<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui-1.8.4.custom.css" >
	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10-dev/css/jquery.dataTables.css">
	
	<!-- Fonts -->
	<link href='https://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>

	<!-- Google Maps API v3.14 -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.14&key=AIzaSyAmIbYf9N82UMsx0t2-CUCNmQLhG9asRlA&sensor=true&language=<?php echo $lang; ?>&libraries=geometry,places"></script>
	
	<!-- MarkerClusterer -->
	<script src="js/lib/markerclusterer.js"></script>
	
	<!-- jQuery 2.0.3, jQuery UI 1.10.3, jQuery.timepicker, Bootstrap Dual Listbox -->
	<script src="js/lib/jquery-2.0.3.min.js"></script>
	<script src="js/lib/jquery-migrate-1.2.1.js"></script>
	<script src="js/lib/jquery.dataTables.min.js"></script>
	<script src="js/lib/jquery-ui.min.js"></script>
	<script src="js/lib/jquery-ui-timepicker-addon.min.js"></script>
	<script src="js/lib/jquery.bootstrap-duallistbox.js"></script>
	<script src="js/lib/bootstrap.min.js"></script>
	
	<!-- Highcharts 3.0 -->
	<script src="js/lib/highcharts.js"></script>
	
	<!-- Functions for Website Interactivity -->
	<script src="js/interactivity.js"></script>
	<script src="js/getParameters.js"></script> 
	
	<!-- Custom classes -->
	<script src="js/envirocar-analyser.js"></script>
	
	<!-- Functions of the map, table, chart and filter -->
	<script src="js/chart.js"></script>
	<script src="js/map.js"></script>
	<script src="js/aggregation.js"></script>
	<script src="js/table.js"></script>
	<script src="js/filter.js"></script>
	
	<!-- Boundaries of NRW -->
	<script src="js/boundaries.js"></script>
	
	<!-- SmartInfoWindow -->
	<script src="js/smartinfowindow.js"></script>
	
	<!-- JQuery Functions used when changing the view of the table or/and the chart -->
	<script type="text/javascript">
		$(document).ready(function() {
			$("#analyser-chart").width($("#map").width());
			$("#analyser-table").css('top', $("#header-nav").height());
// 			Executed when table and chart are requested
			$("#dualView").click(function() {
				viewMode = 'dual';
				if(activeChart == 'line') lineChart.getChart().setSize($("#map").width(), $("#map").height() / 3);
				if(activeChart == 'bar') barChart.getChart().setSize($("#map").width(), $("#map").height() / 3);
				$("#analyser-chart").show(200);
				$("#analyser-chart").css('top', $("#header-nav").height() * 1.3);
				$("#analyser-table").show(200);
				$("#analyser-table").css('top', $("#header-nav").height() * 1.3);
				$('.dataTables_scrollBody').css('height', 200);
				$('.dataTables_scrollBody').css('height', $("#map").height() * 1 / 4);
			});
// 			Executed when only the table is requested
			$("#tableView").click(function() {
				viewMode = 'table';
				if ($("#analyser-table").is(":hidden") || $("#analyser-chart").is(":visible")) {
					$("#analyser-chart").hide(200);
					$("#analyser-table").css('top', $("#header-nav").height());
					$('.dataTables_scrollBody').css('height', 0);
					$('.dataTables_scrollBody').css('height', $("#map").height() * 3/5);
					$("#analyser-table").show(200);
				}
			});
// 			Executed when only the chart is requested
			$("#chartView").click(function() {
				viewMode = 'chart';
				if(activeChart == 'line') lineChart.getChart().setSize($("#map").width(), $("#map").height() / 1.5);
				if(activeChart == 'bar') barChart.getChart().setSize($("#map").width(), $("#map").height() / 1.5);
				$("#analyser-chart").show(200);
				$("#analyser-table").hide(200);
				
			});
		});
	</script>	
	
		
</head>

<body onload="initMap();">
	
	<div id="application-wrapper" >

		<div id="header-nav" >
			<div class="logo">
				<a href="./index.php" title="Homepage">
					<img id="logo" alt="enivroCar analyser logo" width="150px" src="img/enviroCarAnalyser.png">
				</a>
			</div>
			
			<div id="space">
				<div id="spaceSelection">
					<input type="button" name="boundingBox" id="boundingBoxBtn" class="left spaceButton" 
					value="<?php echo $selectSpace ?>" onClick="initBoundingBox()">
				</div>
				<br>
				<div id="streetSelection">
					<input type="button" name="streetSelection" id="streetSelectionBtn" class="left spaceButton"
					value="<?php echo $selectStreet ?>" onClick="streetMode();">
				</div>
				<br>
				<div id="trackSelection">
					<select id="trackSelectionList" onchange="applyAllFilter()" size="1">
					</select>
				</div>
			</div>
			
			<div id="timeSelection">
				<label for="timeSelection"></label>
				<form action="" method="post">
					
					<label for="from" class="timelabel"><?php echo $from; ?> </label>
					<input type="text" id="date-from" class="controls" size="12">	
					<br><br>			
					<label for="to" class="timelabel"><?php echo $to; ?> </label>
					<input type="text" id="date-to" class="controls" size="12">
					<br>
					<input type="button" name="selectTimeBtn" id="selectTimeBtn" 
						value="<?php echo $getData; ?>" onClick="getDateTimeBBox();">
				</form>
			</div>
			
			<div id ="carModelSelection">
				<form action="">
					<select multiple="multiple" size="4" onchange="applyAllFilter()" id="duallistbox_carmodels"></select>
					<script>
						var l = getParam('lang');
						if (l == "en") {
							var duallistbox_carmodels = $('#duallistbox_carmodels').bootstrapDualListbox({
								nonselectedlistlabel : 'Possible Car Models',
								selectedlistlabel : 'Selected Car Models',
								infotext : 'Show all {0}',
								infotextfiltered : '{0} of {1}',
								infotextempty : 'No entries',
								filterplaceholder : 'Search for car model...',
								filtertextclear : 'Show all',
								preserveselectiononmove : 'moved',
								moveonselect : true
							});
						} else {
							var duallistbox_carmodels = $('#duallistbox_carmodels').bootstrapDualListbox({
								nonselectedlistlabel : 'M&ouml;gliche Automodelle',
								selectedlistlabel : 'Ausgew&auml;hlte Automodelle',
								infotext : 'Zeige alle {0}',
								infotextfiltered : '{0} von {1}',
								infotextempty : 'Keine Eintr&auml;ge',
								filterplaceholder : 'Suche nach Automodell...',
								filtertextclear : 'Zeige alle',
								preserveselectiononmove : 'moved',
								moveonselect : true,
							});
						}
					</script>
				</form> 
			</div>
			
			<div id="analysisInterpolation">
				<label id="analysisInterpolation-label" for="analysisInterpolation-label"><?php echo $interpolation_label; ?></label>
				<br/><br/>
				<a href="#" id="interpolationBtn" onclick="interpolate();" title="Start Interpolation"><img src="img/interpolationIcon.png" width="48px" height="48px" alt="Interpolation"></a>
				<br><br>
				<select id="idwid" onchange="IDWSelection()">
 					<option value="select"><?php echo $selectIDW; ?></option>
 					<option value="co2"><?php echo $selectIDWco2; ?></option>
 					<option value="consumption"><?php echo $selectIDWconsumption; ?></option>
  					<option value="speed"><?php echo $selectIDWspeed; ?></option>
  				</select>
  				<input type="button" id="clearidw" name"clearidw" class="spaceButton" onClick="clearIdwDisplay()" value="<?php echo $ClearIDW; ?>">
			</div>
			
			<div id="aggregation">
				<label id="aggregation-label" for="aggregation-label"><?php echo $aggregation_label; ?></label>
				<br/><br/>
				<a href="#" id="aggregationBtn" onclick="startAggregation();" title="Aggregation"><img src="img/aggregationIcon.png" width="48px" height="48px" alt="Aggreation"></a>
			</div>
			
			<div id="limit-filter">
				<label id="limitFilter-label" for="limitFilter-label"><?php echo $filter_label; ?></label>
				<br/><br/>
				<a href="#" id="filterBtn" onclick="limitFilter()" title="Limit Filter"><img src="img/limitFilterIcon.png" width="48px" height="48px" alt="Limit Filter"></a>
			</div>
			
			<div id="analysis-mode" >
				<label id="analysis-mode-label" for="analysis-mode"><?php echo $analysis_mode_label; ?></label>
				<br/>
				<input type="button" class="left" name="analyseModeBtn" id="analyseModeBtn" 	value="<?php echo $off ?>" onClick="changeMode();">
			</div>
			
			<!-- Contains the Dropdown Menu with the View Selection -->
			<div id="analyser-switcher" >
				<ul>
					<li class="analyser-switcher-topmenu">
						<a href="#"><?php echo $display; ?></a>
						<ul>
							<li class="analyser-switcher-submenu">
								<a id="tableView" href="#"><?php echo $table; ?></a>
							</li>
							<li class="analyser-switcher-submenu">
								<a id="chartView" href="#"><?php echo $chart; ?></a>
							</li>
							<li class="analyser-switcher-submenu">
								<a id="dualView" href="#"><?php echo $chartAndTable; ?></a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			
			<div id="helpButton" >
				<a href="#" onclick="toggleHelp();" title="Hilfe"><img src="img/help.png" width="48px" height="48px" alt="Hilfe"></a>
			</div>
			
		</div> <!-- end div header-nav -->	
	
		<div id="application-content" >
			
			<div id="map-container" >
				<div id="map">
					<!-- the map will be displayed here -->
				</div>
				<script type="text/javascript">
					// display the simple example
					var q = new Query('measurements');
					measurements = q.getData();
					$(document).ready(function() {
						setTimeout(function(){
							redrawData(true,true,true,true,true);
						}, 2000);
					});
				</script>
				
				<div class="search-container">	
					<input id="search-input" class="controls" type="text" placeholder="<?php echo $mapSearch ?>">
					<input id="search-button" class="controls" type="button" >
				</div>
				
				<!-- map shadows -->
				<i class="map-top"></i>
				<i class="map-bottom"></i>
			</div>
			
			<div id="analyser-panel">

				<div id="analyser-chart" class="top">
					<script type="text/javascript">
						// setChart('line');
					</script>	
					
				</div>
		
				<div id="analyser-table" class="top">
					<form name="checkbox">
						   <p>
							 <input type="checkbox" name="id" checked> <?php echo $id; ?>
							 <input type="checkbox" name="verbrauch" checked> <?php echo $consumption; ?>
							 <input type="checkbox" name="co2" checked> <?php echo $co2; ?>
							 <input type="checkbox" name="geschwindigkeit" checked> <?php echo $speed; ?>
							 <input type="checkbox" name="motorlast" checked> <?php echo $engine_load; ?>
							 <input type="checkbox" name="umdrehungen" checked> <?php echo $rpm; ?>
							 <input id="refreshBtn" type="button" onclick="refreshTable();" value="<?php echo $refresh; ?>">
						   </p>
					</form>
					<script type="text/javascript">
						// initTable();
						// tablestyle();
					</script>
				</div>
				
				<div id="analyser-help" class="top blue" style="display: none">
					<?php echo $help_content; ?>
				</div>
				
				<div id="analyser-help-mapview" class="top blue" style="display: none">
					<?php echo $help_mapview; ?>
				</div>
				
				<div id="analyser-help-getdata" class="top blue" style="display: none">
					<?php echo $help_getdata; ?>
				</div>
				
				<div id="analyser-help-interpolation" class="top blue" style="display: none">
					<?php echo $help_interpolation; ?>
				</div>
				
				<div id="analyser-help-aggregation" class="top blue" style="display: none">
					<?php echo $help_aggregation; ?>
				</div>
				
				<div id="analyser-help-filter" class="top blue" style="display: none">
					<?php echo $help_filter; ?>
				</div>
				
				<div id="analyser-contact" class="top blue" style="display: none">
					<?php echo $contact_content; ?>
				</div>
				
				<div id="analyser-imprint" class="top blue" style="display: none">
					<?php echo $imprint_content; ?>
				</div>
				
				<div id="analyser-terms" class="top blue" style="display: none">
					<?php echo $terms_content; ?>
				</div>
			</div>
			
			<script>
				$(document).ready(function() {
					$("#analyser-help-mapview").hide(200);
					
					$("#maphelp").click(function() {
						$("#analyser-help-mapview").show(200);
						$("#analyser-help").hide(200);			
					});
					
					$("#getdatahelp").click(function() {
						$("#analyser-help-getdata").show(200);
						$("#analyser-help").hide(200);			
					});
					
					$("#interpolationhelp").click(function() {
						$("#analyser-help-interpolation").show(200);
						$("#analyser-help").hide(200);			
					});
					
					$("#aggregationhelp").click(function() {
						$("#analyser-help-aggregation).show(200);
						$("#analyser-help").hide(200);			
					});
					
					$("#filterhelp").click(function() {
						$("#analyser-help-filter").show(200);
						$("#analyser-help").hide(200);			
					});
					
					$(".back").click(function() {
						$("#analyser-help").show(200);	
						$("#analyser-help-mapview").hide(200);
						$("#analyser-help-getdata").hide(200);
						$("#analyser-help-interpolation").hide(200);
						$("#analyser-help-aggregation").hide(200);
						$("#analyser-help-filter").hide(200);		
					});
				});
			</script>
			<!-- Hides Analysis Panel and Chart right after they are created -->
			<script type="text/javascript">
				$("#analyser-chart").hide();
				$("#analyser-panel").hide();	
			</script>
			
			<!-- loading window -->
			<div id="loading-div-background" class="transparent">
			    <div id="loading-div">
			      <img style="height:16px;margin:30px;" src="img/loading.gif" alt="Loading..."/>
			      <h4 style="color:gray;font-weight:normal;"><?php echo $wait; ?></h4>
			      <button id="hideLoadingWindowBtn" onClick="hideProgressAnimation(); return cancelEvent()"><?php echo $cancel; ?></button>
			    </div>
			</div>
			
		</div> <!-- end div application-content -->	
		
		<div id="footer" >
			<span>
				<?php
				if (isset($_GET['lang']) && $_GET['lang'] == 'en') {
					echo '<a href="index.php"><img src="./img/blank.png" class="flag flag-de" alt="deutsch"></a> &middot';
				} else {
					echo '<a href="index.php?lang=en"><img src="./img/blank.png" class="flag flag-gb" alt="english"></a> &middot;';
				}
				?>
								
				&copy 2014 &middot; enviroCar &middot; <a href="#" onclick="toggleContact();"><?php echo $contact ?></a> 
				&middot; <a href="#" onclick="toggleImprint();"><?php echo $imprint ?></a>
				&middot; <a href="#" onclick="toggleTerms();"><?php echo $terms ?></a>
			
			</span>
		</div> <!-- end div footer -->	
	</div> <!-- end div application-wrapper -->	
</body>
</html>
