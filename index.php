<!DOCTYPE html>
<html lang="de">
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
		<link rel="stylesheet" href="css/style.css" />
		<link rel="shortcut icon" href="img/favicon.ico" />
		<link rel="stylesheet" href="css/lib/jquery-ui.css">
		<link rel="stylesheet" href="css/lib/jquery-ui-timepicker-addon.min.css" />
		<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10-dev/css/jquery.dataTables.css">
		
		<!-- Fonts and Flags -->
		<link href='https://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
		<link href="css/flags.css" rel="stylesheet">
		
		<!-- Google Maps API v3.14 -->
		<script src="https://maps.googleapis.com/maps/api/js?v=3.14&key=AIzaSyAmIbYf9N82UMsx0t2-CUCNmQLhG9asRlA&sensor=true&language=de&libraries=geometry,places"></script>
		
		<!-- MarkerClusterer -->
		<script src="js/lib/markerclusterer_compiled.js"></script>
		
		<!-- jQuery 2.0.3, jQuery UI 1.10.3, jQuery.timepicker and jQuery.dataTables -->
		<script src="js/lib/jquery-2.0.3.min.js"></script>
		<script src="js/lib/jquery-ui.min.js"></script>
		<script src="js/lib/jquery-ui-timepicker-addon.min.js"></script>
		<script src="js/lib/jquery.dataTables.min.js"></script>
		
		<!-- Highcharts 3.0 -->
		<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>-->
		<script src="js/lib/highcharts.js"></script>
		
		<!-- Functions for Website Interactivity -->
		<script src="js/interactivity.js"></script> 
		
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
							   <col width="100">
							   <col width="400">
							   <col width="100">
							   <col width="80">
							   <col width="30">
							</colgroup>
							<tr>
								<td>
									<div id="logo-container">
									  <a href="./index.html" title="Homepage"><img id="logo" alt="Logo" width="200px" src="img/enviroCarLogo_transparent.png"></a>
									  <label for="logo" id="logo-label">Exploration und Visualisierung</label>
									</div>
								</td>
								<td></td>
								<td>
									<div id="calendar">
										<table>
											<tr>
												<td>
													<label for="from">Von: </label>
												</td>
						                 		<td>
													<input type="text" id="date-from" size="16">
												</td>
											</tr>
											<tr>
												<td>
													<label for="to">Bis: </label>
												</td>
						                 		<td>
													<input type="text" id="date-to" size="16">
												</td>
												<td>
													<div id="timerange-btn" class="button_base b03_skewed_slide_in">
												        <div>Zeitraum auswählen</div>
												        <div></div>
														<div>Tracks anzeigen</div>
													</div>
												</td>
											</tr>
				                     	</table>
				                    </div>
								</td>
								<td></td>
								<td>
									<div id ="trackSelection">
										<table>
											<tr>
												<td>
					                    			<form action="">
					                    				<label for="trackSel">Track-ID: </label>
														<select id="trackSel">
															
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
													</form>
												</td>
											</tr>
											<tr>
												<td>
													<label for="phenomen">Phänomen: </label>
													<form action="">
					                    				<select id="trackSel">
					                    					<option>Verbrauch</option>	
															<option>CO2-Emission</option>	
															<option>Geschwindigkeit</option>		
															<option>Luftmasse</option>	
														</select>
													</form>
												</td>
												<td>
												    <div class="button_base b03_skewed_slide_in" onClick="streetMode();">
												        <div>Straßenauswahl aus</div>
												        <div></div>
												        <div>Straßenauswahl an</div>
												    </div>
										    	</td>
										    </tr>
									    </table>
				                    </div>
								</td>
								<td>
									
									<div id="analysis-interpolation">
										<label id="analysis-mode-interpolation-label" for="analysis-interpolation">Interpolation</label>
										<input id="interpolation-btn" type="image" onclick="interpolateAnimation()" src="img/run_interpolation.png" width="48" height="48" />
									</div>
									<progress id="progressbar" value="0" max="100"></progress>
								</td>
								<td>
									<label id="analysis-mode-label" for="analysis-mode">Analysemodus</label>
									<div class="onoffswitch" >
										<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" onClick="changeMode()">
										<label class="onoffswitch-label" for="myonoffswitch">
											<div class="onoffswitch-inner"></div>
											<div class="onoffswitch-switch"></div>
										</label>
									</div>
								</td>
								<td>
									<div id="help-button">
										<a href="#" title="Hilfe"><img src="./img/help.png" height="48px" width="48px"></a>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</header>

			<div id="content">
				<div class="clearfix">
					<div id="map-container" class="left">
						<input id="search-input" class="controls" type="text" placeholder="Suche nach St&auml;dten">
							
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
				                     <input type="checkbox" name="id" checked> ID
				                     <input type="checkbox" name="verbrauch" checked> Verbrauch
				                     <input type="checkbox" name="co2" checked> CO2
				                     <input type="checkbox" name="geschwindigkeit" checked> Geschwindigkeit
				                     <input type="checkbox" name="luftmasse"checked> Luftmasse
				                     <input id="btnHide" type="button" onclick="refreshTable();" value="Aktualisieren">
				                   </p>
			                 </form>
							<script type="text/javascript">
								createTable();
								dataTable();
								floatHead();
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
					<img src="./img/blank.png" onClick="changeFlag('1')" class="flag flag-gb" alt="English"> &middot;
					2014 enviroCar &middot; &copy; Copyright by Axel Virnich, Daniel Sawatzky, Jan-Philipp Heine, Jens Balmert, Mario Gerdes, Marius Runde, Thiemo Gärtner
				</div>
			</footer>
		</div>
	</body>
</html>