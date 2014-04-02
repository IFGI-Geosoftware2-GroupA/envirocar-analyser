<?php
	
	$contact = "Contact";
	$contact_content = "<h1>Contact</h1>
	                    <br/>
	                    <br/>
	                    In case of problems or questions you can contact us through the following email addresses: 
	                    <br />
	                    <br />
	                    marius.runde@uni-muenster.de, 
	                    <br />
	                    axelvirnich@uni-muenster.de, 
	                    <br />
	                    t_gaer03@uni-muenster.de
	                    <br />
	                    d_sawa02@uni-muenster.de
	                    <br />
	                    j_balm01@uni-muenster.de
	                    <br />
	                    j_hein25@uni-muenster.de
	                    <br />
	                    m_gerd06@uni-muenster.de";
	
	$imprint = "Impressum";
	$imprint_content = "
	                    <h1>Impressum</h1>
	                    <br/>
	                    envirocar-analyser is a web page for displaying and analyzing the environmental data of the 
	                    community platform envirocar. The envirocar analyser development team does not take any 
	                    responsibility for the currentness, accuracy, and completeness of the contents displayed 
	                    on this web page, unless the mistake was made on purpose or due to gross negligence. 
	                    The envirocar analyser development team is responsible for mistakes of the displaying and
	                    for the user interface. Owner of the data and therefore owner of the rights of the data is
	                    envirocar.
	                    <br />
	                    <br />
	                    Operators of the web page:
	                    <br />
	                    Thiemo Gärtner
	                    <br />
	                    Jens Balmert
	                    <br />
	                    Mario Gerdes
	                    <br />
	                    Jan-Philipp Heine
	                    <br />
	                    Marius Runde
	                    <br />
	                    Daniel Sawatzky
	                    <br />
	                    Axel Peter Virnich";
	
	$terms = "Terms of Use";
	$terms_content = "
	                    The MIT License (MIT)<br />
					    <br />
					    Copyright (c) 2014 Jens Balmert, Thiemo G&auml;rtner, Mario Gerdes, Jan-Philipp 
					    Heine, Marius Runde, Daniel Sawatzky, Axel Virnich<br />
					    <br />
					    Permission is hereby granted, free of charge, to any person obtaining a copy
					    of this software and associated documentation files (the 'Software'), to deal
					    in the Software without restriction, including without limitation the rights
					    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
					    copies of the Software, and to permit persons to whom the Software is
					    furnished to do so, subject to the following conditions:<br />
					    <br />
					    The above copyright notice and this permission notice shall be included in
					    all copies or substantial portions of the Software.<br />
					    <br />
					    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
					    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
					    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
					    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
					    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
					    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
					    THE SOFTWARE.";
	
	$on = "On";
	
	$off = "Off";
	
	$logoLabel = "Exploration and Visualisation";
	
	$from = "From:";
	
	$to = "To:";
	
	$getData = "Get Data";
	
	$selectSpace = "Select space segment";
	
	$display = "Display Tracks";
	
	$track = "Track-ID:";
	
	$phenomenon = "Phenomenon:";
	
	$selectStreet = "Street Selection";
	
	$streets_on = "Street Selection On";
	
	$streets_off = "Street Selection Off";
	
	$analysis_mode_label = "Analysis Mode";
	
	$help = "Help";
	                 
	$help_content = "<h1>Help</h1> <br>
    				<a href='#analyser-help-mapview' id='maphelp'>Map Section</a><br>
    				<a href='#analyser-help-getdata' id='getdatahelp'>Call Up Data</a><br>
    				<a href='#analyser-help-interpolation' id='interpolationhelp'>Interpolation</a><br>
    				<a href='#analyser-help-aggregation' id='aggregationhelp'>Aggregation</a><br>
    				<a href='#analyser-help-filter' id='filterhelp'>Filter</a><br>
    				<a href='#analyser-help-filter' id='environmenthelp'>Environment Analysis</a>
    				";
	
	$help_mapview = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Map Section</h2>
	                <br>
	                <img src='img/help/suchenVerschieben.jpg' width='190' height='31' align='left' vspace='5' hspace='5' alt='Text?'>
		         	<p> When you open the website, the last measured 24 hours are automatically displayed and the map is centered to the last measurements. 
					If the user wants to search for a place in North-Rhine-Westphalia, you can use the search box using the Google Places API. 
					After confirming the selection, the map is centered on the choice of the user. It is only possible to search for places located in North-Rhine-Westphalia.<br><br>  </p>
	                <img src='img/help/zoom.jpg' width='18' height='100' align='left' vspace='5' hspace='5' alt='Text?'>
	                <p> Using standard mouse interaction, the user can pan the map arbitrarily within the limits of North-Rhine-Westphalia.
					By using the scroll wheel or by clicking on the plus and the minus symbol of the zoom scale, the user is able to zoom in or out. <br><br> <br><br>  </p>
	                <img src='img/help/karte.jpg' width='130' height='31' align='left' vspace='5' hspace='5' alt='Text?'>
	                <p> Clicking the selection fields 'map', 'hybrid' and 'OSM', the user can chose between the pure vector map of Google Maps, the hybrid satellite photo and road 
					vectors of Google Maps or a OpenStreepMap map. </p>";
	
	$help_getdata ="
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Call Up Data</h2>
					<br>
					<img src='img/help/data.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
					<img src='img/help/calendar.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> If the user wants to analyze data for a certain time, so the user can determine a time interval by clicking on 'From' and 'To'. By clicking in a field in the date box, a calendar opens where you can select the date and time. By actuating the 
					'Get Data' button, all tracks within the time interval are visualized.<br><br>
	                To select a certain region of space, the user has to click on 'Select space segment'. Now a bounding box is appearing, which can be dragged to the desired area. 
					The size of the bounding box can be flexibly changed. However, you must make sure that the bounding box is colored green. A query is only possible if the bounding box is green.´
					If the bounding box is colored red, no query is possible because the query of the data may be too computationally intensive. This in turn could affect the experience with our site. 
					By pressing the 'Get Data' button, all the records which are in the region of space defined by the user, is visualized. <br>  
					<br>Would you like to have data for a certain region of space during a specific time interval, so the user can simply combine the steps above with each other.<br>
					<br> If the user wants to have only the data of a particular track, he can select the specific track by opening the drop-down-menu 'tracks'. 
					Using the duallistbox 'Possible Car Models' the user can then either deselect all by clicking on the double arrows or select individual car models 
					by clicking on them. Likewise, you can also deselect car models in the same way again. The data is then reloaded.
					<br>
					Finally, you click on 'Get Data'.  <br><br>  </p>";
					
	$help_selection = "
	                <h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Selection</h2>
					<br>
					<img src='img/help/data.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
					<img src='img/help/cars.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
	                If you only want the data of a particular track after you selected the data, you can select this track in the field 'Tracks'.
	                In 'Possible Car Models' you can deselect all car models by clicking on the double arrow or a particular car model by clicking on it.
	                You can select the car models again by the same way. Afterwards, the data will be refreshed. 
	                <p> A single phenomenon for the aggregation can be selected by clicking on the legend right from the chart. By letting the left mouse button clicked and 
	                pulling the appearing rectangle you can also zoom in the chart. While doing so, a button appears for canceling the zooming. <br><br> </p>
	                ";
					
	            
	$help_interpolation = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Interpolation</h2>
					<br>
					<img src='img/help/analysis.jpg' width='75' height='40' align='left' vspace='10' hspace='5' alt='Text?'>
					<img src='img/help/analysis_off.jpg' width='75' height='60' align='left' vspace='10' hspace='5' alt='Text?'>
					<img src='img/help/interpolationIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> In order to interpolate the data the user has selected now, click on the field 'Analysis Mode'. 
					Now a button 'Functions' appears. When you press this button, a drop-down-menu, where you can select 'Interpolation', is displayed.<br>
					You can choose three different types of interpolation:<br>  
					<br>* Data selection by Bounding Box: Drag the bounding box over the desired area of space.<br>
					* Data selection via TrackID: Select the track from the drop-down menu 'tracks'.<br>
					* Data selection by street segment: Click the button 'Street Selection'. Now you can select the street segments which are subsequently labeled.<br>
					
					<br>If the user has chosen one of the three different types of data selection, the user click 'interpolation' which starts the interpolation. 
					The interpolated results can now be viewed by selecting the measurement type from the drop-down menu 'Select'. <br>
					<br>Directly under the button 'Interpolation' there is a button 'Display'. When pressing this button the user can chose between the representation as a table, graph or graph and table.<br>
					<br>By placing or removing the hook and click 'Refresh', the table is updated and there are only the user selected phenomena displayed.<br>
					<br>By clicking on one phenomena listed in the legend, it can be selected or deselected. You can zoom in by creating a box by left clicking. 
					It will now be zoomed to the values ​​within the box. By clicking on 'Reset zoom' the entire graph is displayed again.</p>";
					
	    $help_aggregation2 = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Aggregation</h2>
					<br>
					<img src='img/help/aggregationIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> In order to aggregate the data you have selected now, click on the field 'Analysis Mode'. 
					Now a button 'Functions' appears. When pressing this button, a drop-down-menu is displayed where you can select 'Aggregation'. 
					The calculations are performed server sided with PHP. When the calculations are completed, the Data is returned to the client in JSON format. 
					The time required for the presentation of the results depends on the scope of the data selected and the server load. The results are then displayed in the graph and the chart.<br>
		            <br>By placing or removing the hook and click 'Refresh', the table is updated and there are only the user selected phenomena displayed.<br>
		            <br>By clicking on one phenomena listed in the legend, it can be selected or deselected. You can zoom in by creating a box by left clicking. 
					It will now be zoomed to the values ​​within the box. By clicking on 'Reset zoom' the entire graph is displayed again.
		            </p>";    
		            
        $help_filter2 = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Limit Filter</h2>
					<br>
		            <img src='img/help/limitFilterIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p>If the user wants to filter any limits, the 'Analysis Mode' must be enabled. Now the user can click on the 'Functions' button. When pressing this button a drop-down-menu is displayed where you can select 'limit filter'. 
					A new window will open where the user can select the desired phenomena and is able to chose the desired phenomena and limits.<br>
					<br>The orange colored box displays information about the respective phenomena.<br>
					<br>For example: 'The recommended speed limit on German motorways is 130 km/h'<br>
					<br>By confirming the selection the markers will be colored according to the user specified limits.<br>
					<br>* red marker: The value lies outside the selected limits.
					<br>* yellow marker: The value is within the 25% - or 75% quartile of the selected limits.
					<br>* green marker: The value is between the 25% - and 75% quartile of the selected limits. </p>";   
		            
	    $help_environment = "
	                <h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2Environmental Analysis</h2>
					<br>  
					<img src='img/help/enviroFilter.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
	                If the user wants to start the environmental analysis, the 'Analysis Mode' has to be turned on. 
					By pressing the 'Functions' button a drop-down-menu opens where the user can select 'Environmental Analysis'. 
					After pressing 'Environmental Analysis' the CO2 emission is related to the traveled distance (in kilometeres). 
					The resulting markers are green (no more than 95g CO2/km, the EU new car limit from 2015), yellow (about 95g to 
					130g CO2/km, the EU limit new cars from 2020 onwards) or red (about 130g CO2/km) are shown. The results ​​are displayed in the table and graph.
					This function is available to each measurement containing a CO2 value and a speed value.";  
                 
					         
	$id = "ID";
	
	$consumption = "Consumption";
	
	$co2 = "CO2";
	
	$co2_emission = "CO2 emission";
	
	$speed = "Speed";
	
	// $air_mass = "Air Mass";
	
	$engine_load = "Engine Load";
	
	// $gps_accuracy = "GPS Accuracy";
	
	// $gps_altitude = "GPS Altitude";
	
	// $gps_bearing = "GPS Bearing";
	
	// $gps_hdop = "GPS HDOP";
	
	// $gps_pdop = "GPS PDOP";
	
	// $gps_speed = "GPS Speed";
	
	// $gps_vdop = "GPS-VDOP";
	
	// $intake_pressure = "Intake Pressure";
	
	// $intake_temperature = "Intake Temperature";
	
	// $maf = "MAF";
	
	$rpm = "Revolutions/Minute";
	
	// $throttle_position = "Throttle Position";
	
	// $fsl = "Fuel System Loop";
	
	// $fssc = "Fuel System Status Code";
	
	// $ltft = "Long-Term Fuel Trim";
	
	// $o2_lambda_current = "O2 Lambda Current";
	
	// $o2_lambda_current_er = "O2 Lambda Current ER";
	
	// $o2_lambda_voltage = "O2 Lambda Voltage";
	
	// $o2_lambda_voltage_er = "O2 Lambda Voltage ER";
	
	// $stft_1 = "Short-Term Fuel Trim 1";
	
	$mapSearch = "Search for cities";
	
	$refresh = "Refresh";
	
	$wait = "Please wait...";
	
	$cancel ="Cancel";
	
	$interpolation_label = "Interpolation";
	
	$ClearIDW = "Clear";
	
	$selectIDW = "Select";
	
	$selectIDWco2 = "CO2";
	
	$selectIDWconsumption = "Consumption";
	
	$selectIDWspeed = "Speed";
	
	$display = "Display";
	
	$table = "Table";
	
	$chart = "Chart";
	
	$chartAndTable = "Chart and Table";
	
	$filter_label = "Limit Filter";
	
	$aggregation_label = "Aggregation";
	
	$help_aggregation = "Aggregation";
	
	$help_filter = "Filter";
	
	$limit_filter = "Limit Filter";
	
	$filter_by_speed = "Filter by Speed";
	
	$reset_filter = "Filter reset";
	
	$speed_info = "<b>Info: </b> In Germany inside a built-up area the speed limit is 50km/h. Outside a built-up area the speed limit is 100km/h. 
	               On motorways the advisory speed limit is 130km/h.";
	
	$filter_by_speed = "Filter by speed";
	
	$consumption_info = "A consumption of 6 - 10 litres of fuel per 100km  driven is considered normal in Germany. Click here for more information 
	                     on particular car models: <a href='http://www.autoverbrauch.at/ireds-124318.html' target='blank'>www.autoverbrauch.at</a>";
	
	$filter_by_consumption = "Filter by consumption";
	
	$filter_by_engine_load = "Filter by engine load";
	
	$filter_by_rpm = "Filter by revol./min";
	
	$filter_by_CO2 = "Filter by CO2";
	
	$environment_label = "Environmental Analysis";
	
	$functions = "Functions";
	
	$co2perkm = "CO2 per kilometre";
	
?>