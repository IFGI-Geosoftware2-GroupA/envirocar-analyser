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
		         	<p> After opening the web page the data of the lastly measured 24 hours will be displayed and for that the map will 
		         	automatically be adjusted. You can choose another 
	                location in North Rhine-Westphalia by entering its name in the search field and the map will automatically zoom to this place. 
	                Only locations within North Rhine-Westphalia can be selected. You can choose a different map section either 
	                by clicking on the arrow field or by leaving the left mouse button clicked on the map and 
	                moving the mouse. <br><br>  </p>
	                <img src='img/help/zoom.jpg' width='18' height='100' align='left' vspace='5' hspace='5' alt='Text?'>
	                <p> You can zoom in and out either by: <br> - Using the scroll wheel of the mouse <br> - Clicking on the plus and minus 
	                symbol of the zoom scale <br> - Clicking on the zoom scale itself. <br><br> <br><br>  </p>
	                <img src='img/help/karte.jpg' width='130' height='31' align='left' vspace='5' hspace='5' alt='Text?'>
	                <p> By clicking on the fields 'Karte', 'Hybrid' and 'OSM' you can choose between: 
	                <br> - A vector map <br> - A hybrid of a satellite image and street vectors <br> - A map of OpenStreetMaps. </p>";
	
	$help_getdata ="
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Call Up Data</h2>
					<br>
					<img src='img/help/data.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
					<img src='img/help/calendar.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> If you want to analyse data of a certain time interval you need to click on the 
		            'From:' and the 'To:' field and then on the corresponding days. By clicking on the top left or 
	                right corner of the calendar window you can go back and forth in time. Additionally, you can also add a time by using the 
	                calendar's slider bars.  <br><br>
	                You can select an certain area within North Rhine-Westphalia by clicking on 'Select space segment' to select a segment with a 
	                bounding box. Its size can be varied by pulling its edges with the left mouse button pushed. If the bounding box colours red if it 
	                becomes too large. <br>  
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
		            <p> To interpolate the selected data, click on the analyse mode field. After that the drop-down menu 'Functions' will appear in which
		            you can select 'Interpolation'. <br><br> If you only want to interpolate the data of some street segments you can click on 'Select Street 
		            Segments'. Subsequently, you can click with your left mouse button on the streets to get the data between these points only. 
	                If you pull the mouse over the field 'Display' you can choose if you would like to see the data in a table, 
	                chart or chart and table. <br><br>  </p>";
					
	    $help_aggregation2 = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Aggregation</h2>
					<br>
					<img src='img/help/aggregationIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> To aggregate the selected data, click first on the field 'Analyse Mode'. After that, the drop-down menu 'Functions' 
	                appears in which you can select 'Aggregation'. The Aggregation will show you minimum, maximum, mean, and standard error. <br> 
	                Those will be displayed as chart and as table. A single phenomenon for the 
		            aggregation can be selected by clicking on the legend right from the chart.<br><br>  For the identification of to high/low values 
		            the minimum will be substracted from the maximum. Then, all values 25% over and 25% under the average will be displayed in green. 
		            The values above till the maximum und below till the minimum will be displayed in yellow. All values above the maximum and below 
		            the minimum will be displayed in red. </p>";    
		            
        $help_filter2 = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Limit Filter</h2>
					<br>
		            <img src='img/help/limitFilterIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p>To filter the selected data by limits, click first on the field 'Analyse Mode'. After that, the drop-down menu 'Functions' 
	                appears in which you can select 'Limit Filter'. Subsequently, a small window will open. Then you can 
		            use its filter for limits to choose a phenomenon (Speed, Consumption, Engine Load, Revolutions/Minute, CO2) and set a limit with the 
		            slider bar by yourself. This way you can see which measurements are over and which are below the set limit. The info window will 
		            show some typical limits for speed and consumption as valuation help.  </p>";   
		            
	    $help_environment = "
	                <h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2Environment Analysis</h2>
					<br>  
					<img src='img/help/enviroFilter.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
	                To analyse the selected data for CO2 consumption click first on the field 'Analysis Mode'. After that, the drop-down menu 'Functions' 
	                appears in which you can select 'Environment Analysis'. <br><br> The Environment Analysis calculates the ratio of CO2 emission and distance 
	                travelled (in km). The resulting markers will be displayed in green (not more than 95g CO2/km, the EU-limit for new cars for 2015), 
	                yellow (over 95g till 130 g CO2/km, the EU-limit for new cars for 2020) or red (over 130g CO2/km). <br><br> The values will be displayed in 
	                the table and chart if there is a CO2 value and speed value for every marker.";  
                 
					         
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
	
	$environment_label = "Environment Analyses";
	
	$functions = "Functions";
	
	$co2perkm = "CO2 per kilometre";
	
?>