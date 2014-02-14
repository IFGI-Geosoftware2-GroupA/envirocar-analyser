<?php 
	if(!isset($_GET['l'])){
		include 'php/translation_de.php';
	}	
	
	else if(isset($_GET['l']) && $_GET['l'] == 'en'){
		include 'php/translation_en.php';
	}
	else if(isset($_GET['l']) && $_GET['l'] != 'en'){
	    include 'php/translation_de.php';
	}
?>

<?php
	if (isset($_GET['l'])) {
		$lang = $_GET['l'];
		if ($lang != 'en') {
			$lang = 'de';
			$other_lang = 'en';
		} else {
			$other_lang = 'de';
		}
	}
?>

<!DOCTYPE html>
<html l="de">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>envirocar-analyser</title>
		<meta name="description" content="Internet Applikation zur Exploration und Visualisierung von raum-zeitvarianten Fahrzeug-Messdaten" />
		<meta name="author" content="Marius Runde, Jens Balmert, Daniel Sawatzky" />

		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- Stylesheets and Favicon -->
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="shortcut icon" href="img/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui.css">
		<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui-timepicker-addon.min.css" />
		<link rel="stylesheet" type="text/css" href="css/lib/bootstrap-duallistbox.css" />
		<link rel="stylesheet" type="text/css" href="css/lib/bootstrap.css" />
		<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10-dev/css/jquery.dataTables.css">
		
		<!-- Fonts, Icons and Flags -->
		<link href='https://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/icons.css" />
		<link href="css/flags.css" rel="stylesheet">
		
		<!-- Google Maps API v3.14 -->
		<script src="https://maps.googleapis.com/maps/api/js?v=3.14&key=AIzaSyAmIbYf9N82UMsx0t2-CUCNmQLhG9asRlA&sensor=true&language=<?php echo $lang; ?>&libraries=geometry,places"></script>
		
		<!-- MarkerClusterer -->
		<!-- <script src="js/lib/markerclusterer_compiled.js"></script> -->
		<script src="js/lib/markerclusterer.js"></script>
		
		<!-- jQuery 2.0.3, jQuery UI 1.10.3, jQuery.timepicker, Bootstrap Dual Listbox and jQuery.dataTables -->
		<script src="js/lib/jquery-2.0.3.min.js"></script>
		<script src="js/lib/jquery-ui.min.js"></script>
		<script src="js/lib/jquery-ui-timepicker-addon.min.js"></script>
		<script src="js/lib/jquery.bootstrap-duallistbox.js"></script>
		<script src="js/lib/bootstrap.min.js"></script>
		<script src="js/lib/jquery.dataTables.min.js"></script>
		
		<!-- Highcharts 3.0 -->
		<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>-->
		<script src="js/lib/highcharts.js"></script>
		
		<!-- Functions for Website Interactivity -->
		<script src="js/interactivity.js"></script>
		<script src="js/getParameters.js"></script> 
		
		<!-- Custom classes -->
		<script src="js/envirocar-analyser.js"></script>
		
		<!-- Functions of the map, table and chart -->
		<script src="js/chart.js"></script>
		<script src="js/map.js"></script>
		<script src="js/table.js"></script>
		
		<!-- Boundaries of NRW -->
		<script src="js/boundaries.js"></script>
		
		<!-- SmartInfoWindow -->
		<script src="js/smartinfowindow.js"></script> 
		
		<!--<script src="Scripts/jquery-1.3.2.js" type="text/javascript"></script>
    								<script type="text/javascript">
        								$(document).ready(function() {
            								$('#btnHide').click(function() {
                								$('td:nth-child(2),th:nth-child(2)').hide();
                							
            								});
        								});
    								</script> 
    		-->						
	</head>

	<body onload="initMap();">
		<div class="body-container">
			<header>
				<div id="nav-bar">
					<div id="container">
						<table>
							<colgroup>
							   <col width="200">
							   <col width="25">
							   <col width="350">
							   <col width="25">
							   <col width="600">
							   <col width="25">
							   <col width="80">
							   <col width="30">
							</colgroup>
							<tr>
								<td>
									<div id="logo-container">
									  <a href="./index.php" title="Homepage"><img id="logo" alt="Logo" width="200px" src="img/enviroCarLogo_transparent.png"></a>
									  <label for="logo" id="logo-label"><?php echo $logoLabel; ?></label>
									</div>
								</td>
								<td></td>
								<td>
									<div id="calendar">
										<table>
											<tr>
												<td>
													<label for="from"><?php echo $from; ?> </label>
												</td>
						                 		<td>
													<input type="text" id="date-from" size="14">
												</td>
												<td>
												
													<div id="timerange-btn" class="button_base b03_skewed_slide_in">
												        <div><?php echo $select; ?></div>
												        <div></div>
														<div><?php echo $display; ?></div>
													</div>
													
												</td>
											</tr>
											<tr>
												<td>
													<label for="to"><?php echo $to; ?> </label>
												</td>
						                 		<td>
													<input type="text" id="date-to" size="14">
												</td>
												<td>
													<div id="trackSelection">
					                    			<form action="">
					                    				<label for="trackSel"><?php echo $track; ?> </label>
														<select id="trackSel">
															
															<option>51c97d05e4b0fe5a04e9e735</option>
															<option>51c97d05e4b0fe5a04e9e737</option>
															<option>51c97d05e4b0fe5a04e9e739</option>
															<option>51c97d05e4b0fe5a04e9e73b</option>
															
															<script type="text/javascript">	
																var sel = document.getElementById('trackSel');
																var query = new Query('measurements');
																var measurements = query.getData();		
																for (var i=0; i < measurements.length; i++) {
																	var id = measurements[i].getId();
																	var option = document.createElement('option');
																	option.innerHTML = measurements[i].getId();
																	option.value = measurements[i].getId();
																	sel.appendChild(option);
																}

															</script>
															
														
														</select>
														</div>
														<br><br>
													</form>	
												</td>				
											</tr>
											<tr>
												<td><input type="button" name="BoundingBox" id="BoundingBox" onClick="initBoundingBox()"></td>
												<td></td>
												<td>
													<div id="streetModeBtn" class="button_base b03_skewed_slide_in" onClick="streetMode();">
												        <div><?php echo $streets_on; ?></div>
												        <div></div>
												        <div><?php echo $streets_off; ?></div>
												    </div>
													<div id="analysis-interpolation">
														<label id="analysis-mode-interpolation-label" for="analysis-interpolation">Interpolation</label>
														<input id="interpolation-btn" type="image" onclick="interpolateAnimation()" src="img/run_interpolation.png" width="48" height="48" />
													</div>
													
													<progress id="progressbar" value="0" max="100"></progress>
													
												</td>
											</tr>
				                     	</table>
				                    </div>
				                 </td>
				              	 <td></td>
								 <td>	
									<div id ="phenomenSelection">
										
													<form action="">
														<select multiple="multiple" size="4" id="duallistbox_phenomenons">
															<option value="co2"><?php echo $co2_emission; ?></option>

															<option value="geschwindigkeit"><?php echo $speed; ?></option>
															<option value="luftmasse"><?php echo $air_mass; ?></option>
															<option value="verbrauch"><?php echo $consumption; ?></option>
														</select>
														<script>
															var l = getParam('l');
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
								</td>
								<td></td>
								<td>
									<label id="analysis-mode-label" for="analysis-mode"><?php echo $analysis_mode_label; ?></label>
									<?php
										if(isset($_GET['l']) && $_GET['l'] == 'en'){
										echo 
										'<div class="onoffswitch" >
											<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-en" onClick="changeMode()">
											<label class="onoffswitch-label" for="myonoffswitch-en">
												<div class="onoffswitch-inner-en">							                         
												<div class="onoffswitch-switch"></div>
											</label>
										</div>'; 
										}
										else {
					                    echo 
					                    '<div class="onoffswitch" >
											<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-de" onClick="changeMode()">
											<label class="onoffswitch-label" for="myonoffswitch-de">
												<div class="onoffswitch-inner-de">							                         
												<div class="onoffswitch-switch"></div>
											</label>
										</div>';
										}
					                ?>
									
								</td>
								<td>
									
									<div id="help-button">
										<a href="#" title=<?php echo $help; ?>><img src="./img/help.png" height="48px" width="48px"></a>
									</div>
									<!--
									<div class="hi-icon-wrap hi-icon-effect-1 hi-icon-effect-1a">
										<a href="#" class="hi-icon icon-question">Help</a>
									</div>
									-->
								</td>
							</tr>
						</table>
					</div>
				</div>
			</header>

			<div id="content">
				<div class="clearfix">
					<div id="map-container" class="left">
						<input id="search-input" class="controls" type="text" placeholder="<?php echo $mapSearch ?>">
							
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
						
						<i class="map-top"></i>
						<i class="map-bottom"></i>
					</div>
				
					<div class="right">
						<div id="table" class="bottom">
							 <form name="checkbox">
				                <!-- <p>Kreuzen Sie die gewünschten Measurements an:</p>-->
				                   <p>
				                     <input type="checkbox" name="id" checked> <?php echo $id; ?>
				                     <input type="checkbox" name="verbrauch" checked> <?php echo $consumption; ?>
				                     <input type="checkbox" name="co2" checked> <?php echo $co2; ?>
				                     <input type="checkbox" name="geschwindigkeit" checked> <?php echo $speed; ?>
				                     <input type="checkbox" name="luftmasse"checked> <?php echo $air_mass; ?>
				                     <input id="btnHide" type="button" onclick="refreshTable();" value="Aktualisieren">
				                   </p>
			                 </form>
							<script type="text/javascript">
								initTable();
								dataTable();
							</script>
						</div>
						
						<div id="chart" class="top">
							<script type="text/javascript">
								var lineChart = new LineChart();
								lineChart.initChart();
								lineChart.createChartFromTrack();
							</script>						
						</div>
					</div>
				</div>
			</div>
			
			<footer>
				<div class="footer">

					<?php
						if(isset($_GET['l']) && $_GET['l'] == 'en'){
							echo '<a href="index.php"><img src="./img/blank.png" class="flag flag-de" alt="English"></a> &middot;';	
						}
						else{
							echo '<a href="index.php?l=en"><img src="./img/blank.png" class="flag flag-gb" alt="English"></a> &middot;';	
						}
					?>

					2014 enviroCar &middot; &copy; Copyright by Axel Virnich, Daniel Sawatzky, Jan-Philipp Heine, Jens Balmert, Mario Gerdes, Marius Runde, Thiemo Gärtner
				</div>
			</footer>
		</div>
	</body>
</html>

