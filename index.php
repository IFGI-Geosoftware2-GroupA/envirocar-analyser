<?php 
	if(!isset($_GET['lang'])){
		include 'php/translation_de.php';
	}	
	
	else if(isset($_GET['lang']) && $_GET['lang'] == 'en'){
		include 'php/translation_en.php';
	}
	else if(isset($_GET['lang']) && $_GET['lang'] != 'de'){
	    include 'php/translation_de.php';
	}
	
	if (isset($_GET['lang'])) {
		$lang = $_GET['lang'];
		if ($lang != 'en') {
			$lang = 'de';
			$other_lang = 'en';
		} else {
			$other_lang = 'de';
		}
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
	<link rel="stylesheet" type="text/css" href="css/lib/base.css" >
	<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui-1.8.4.custom.css" >
	
	<!-- Fonts -->
	<link href='https://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>

	<!-- Google Maps API v3.14 -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.14&key=AIzaSyAmIbYf9N82UMsx0t2-CUCNmQLhG9asRlA&sensor=true&language=<?php echo $lang; ?>&libraries=geometry,places"></script>
	
	<!-- MarkerClusterer -->
	<script src="js/lib/markerclusterer.js"></script>
	
	<!-- jQuery 2.0.3, jQuery UI 1.10.3, jQuery.timepicker, Bootstrap Dual Listbox -->
	<script src="js/lib/jquery-2.0.3.min.js"></script>
	<script src="js/lib/jquery.fixheadertable.js"></script>
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
	<script src="js/table.js"></script>
	<script src="js/filter.js"></script>
	
	<!-- Boundaries of NRW -->
	<script src="js/boundaries.js"></script>
	
	<!-- SmartInfoWindow -->
	<script src="js/smartinfowindow.js"></script> 
		
</head>

<body onload="initMap();">
	
	<div id="application-wrapper" >

		<div id="header-nav" >
			<div class="logo">
				<a href="./index.php" title="Homepage">
					<img id="logo" alt="enivroCar analyser logo" width="150px" src="img/enviroCarAnalyser.png">
				</a>
			</div>
			<div id="timeSelection">
				<label for="timeSelection"><?php $selectTimeRange ?></label>
				<form action="" method="post">
					
					<label for="from" class="timelabel"><?php echo $from; ?> </label>
					<input type="text" id="date-from" class="controls" size="12">	
					<br><br>			
					<label for="to" class="timelabel"><?php echo $to; ?> </label>
					<input type="text" id="date-to" class="controls" size="12">
					<br>
					<input type="button" name="selectTimeBtn" id="selectTimeBtn" 
						value="<?php echo $selectTime ?>" onClick="getDateTime()">
				</form>
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
					<select id="trackSelectionList">
				  		<!-- <option value="Track-ID">selektierte Track-IDs</option>
				  		<option value="Track-ID2">test</option> -->
					</select>
				</div>
			</div>
			
			
			<div id ="phenomenSelection">
								
				<form action="">
					<select multiple="multiple" size="4" id="duallistbox_phenomenons">
						<option value="co2"><?php echo $co2_emission; ?></option>
						<option value="geschwindigkeit"><?php echo $speed; ?></option>
						<option value="verbrauch"><?php echo $consumption; ?></option>
					</select>
					<script>
						var l = getParam('lang');
						if (l == "en") {
							var dlb_phenomenons = $('#duallistbox_phenomenons').bootstrapDualListbox({
								nonselectedlistlabel: 'Possible Phenomenons',
								selectedlistlabel: 'Selected Phenomenons',
								infotext: 'Show all {0}',
								infotextfiltered: '{0} of {1}',
								infotextempty: 'No entries',
								filterplaceholder: 'Search phenomenons...',
								filtertextclear: 'Show all',
								preserveselectiononmove: 'moved',
								moveonselect: true
							});
						} else {
							var dlb_phenomenons = $('#duallistbox_phenomenons').bootstrapDualListbox({
								nonselectedlistlabel: 'M&ouml;gliche Ph&auml;nomene',
								selectedlistlabel: 'Ausgew&auml;hlte Ph&auml;nomene',
								infotext: 'Zeige alle {0}',
								infotextfiltered: '{0} von {1}',
								infotextempty: 'Keine Eintr&auml;ge',
								filterplaceholder: 'Suche Ph&auml;nomene...',
								filtertextclear: 'Zeige alle',
								preserveselectiononmove: 'moved',
								moveonselect: true
							});
						}
					</script>
					
				</form> 
				
			</div>
			
			
			<div id="analysis-mode" class="right">
				<label id="analysis-mode-label" class="right" for="analysis-mode"><?php echo $analysis_mode_label; ?></label>
				<br>
				<input type="button" name="analyseModeBtn" id="analyseModeBtn" 	value="<?php echo $off ?>" onClick="changeMode();">
			</div>
			
			
			<div id="helpButton" class="right">
				<a href="help.php"><img src="img/help.png" width="48px" height="48px" alt="Hilfe"></a>
				
			</div>
			
		</div> <!-- end div header-nav -->	
	
		<div id="application-content" >
			
			<div id="map-container" >
		
				<div id="map">
					<!-- the map will be displayed here -->
				</div>
		
				<script type="text/javascript">
					// display the simple example
					$(document).ready(function() {
						var q = new Query('measurements');
						showMarkers(q);
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
						var lineChart = new LineChart();
						lineChart.initChart();
						lineChart.createChartFromTrack();
					</script>	
				</div>
		
				<div id="analyser-table" class="bottom">
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
						initTable();
						tablestyle();
					</script>
				</div>
			</div>
		</div> <!-- end div application-content -->	
		
		<div id="footer" >
			<span>
				<?php
					if(isset($_GET['lang']) && $_GET['lang'] == 'en'){
						echo '<a href="index.php"><img src="./img/blank.png" class="flag flag-de" alt="deutsch"></a> &middot';	
					}
					else{
						echo '<a href="index.php?lang=en"><img src="./img/blank.png" class="flag flag-gb" alt="english"></a> &middot;';	
					}
				?>
								
				&copy 2014 &middot; enviroCar &middot; <a href="contact.php"><?php echo $contact ?></a> 
				&middot; <a href="imprint.php"><?php echo $imprint ?></a>
				&middot; <a href="terms.php"><?php echo $terms ?></a>
			
			</span>
		</div> <!-- end div footer -->	
	</div> <!-- end div application-wrapper -->	
</body>
</html>
