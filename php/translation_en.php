<?php
	
	$contact = "Contact";
	$contact_content = "<h1>Kontakt</h1>
	                    <br/>
	                    <br/>
	                    In case of problems or questions you can contact us via the following email addresses: 
	                    <br />
	                    <br />
	                    marius.runde@uni-muenster.de, 
	                    <br />
	                    axelvirnich@uni-muenster.de, 
	                    <br />
	                    t_gaer03@uni-muenster.de";
	
	$imprint = "Imprint";
	$imprint_content = "envirocar-analyser is a web page for displaying and analyzing the environmental data of the 
	                    community platform envirocar. The envirocar analyser development team does not take any 
	                    responsibility for the currentness, accuracy, and completeness of the contents displayed 
	                    on this web page, unless the mistake was made on purpose or due to gross negligence. 
	                    The envirocar analyser development team is responsible for mistakes of the displaying and
	                    for the user interface. Owner of the data and therefore owner of the rights of the data is
	                    envirocar.
	                    ";
	
	$terms = "Terms of Use";
	$terms_content = "The MIT License (MIT)<br />
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
    				<a href='#analyser-help-aggregation' id='interpolationhelp'>Aggregation</a><br>
    				<a href='#analyser-help-filter' id='interpolationhelp'>Filter</a>
    				";
	
	$help_mapview = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Map Section</h2>
	                <br>
		         	While opening the web page the map will automatically zoom to Münster. You can choose another 
	                location in North Rhine-Westphalia by entering its name in the search field. Only locations 
	                within North Rhine-Westphalia can be selected. You can choose a different map section either 
	                by clicking on the arrow field or by leaving the left mouse button clicked on the map and 
	                moving the mouse. You can zoom in and out by either clicking on the plus and minus symbol of the 
	                zoom scale or by simply clicking on the zoom scale itself. By clicking on the fields 'Karte',
	                'Hybrid' and 'OSM' you can choose between a vector map, a hybrid of a satellite image and 
	                street vectors and a map of OpenStreetMaps.  
		            <br/> ";
	
	$help_getdata ="
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Call Up Data</h2>
					<br>
		            If you want to analyse data of a certain time interval 
	                you need to click in the 'From:' and the 'To:' and then on the corresponding days (by clicking on the top left or 
	                right corner of the calendar window you can go back and forth in time). Optionally, you can select an area
	                within NRW in addition either by clicking on 'Select space segment' to select a segment with a bounding box, whose 
	                size can be varied by pulling its edges with the left mouse button pushed. Or you can click on 'Street
	                Selection' and set several points in the map with the left mouse button to select all street segments 
	                between those points. Finally, you click on 'Get Data' to get the data for that time period and possibly that area. 
	                In 'Possible Car Models' you can select all car models by clicking on the double arrows or select single model by 
	                clicking on each of them. In 'Selected Car Models' you can deselect car models in the same way.  <br/> ";
	            
	$help_interpolation = "
					<h1>Help</h1> <br>
					<a href='#analyser-help' class='back'>Back</a><br>
					<h2>Interpolation</h2>
					<br>
		            Now, to analyse the data, you click on the analyse mode field. After that the interpolation button for 
	                interpolating the data appears at the top and a table on the right side of the web page. 
	                If you pull the mouse over the field 'Display' you can choose if you would like to see the data in a table, 
	                chart or chart and table. Below the interpolation button you can choose what you would like to interpolate: 
	                CO2, consumption or speed. As last step you only need to click on the interpolation button to get the results.
	                You can delete and undelete columns of the table by setting and unsetting the ticks in the boxes and pushing 
	                'Refresh'. By moving the scroll bar of the table you can also see the data below.";
					
	    $help_aggregation2 = "
					<h1>Aggregation</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Aggregation</h2>
					<br>
		            After you clicked on the field 'Analysis Mode' you can aggregate the data with clicking on 'Aggregation' to 
		            get maximum, minimum, average, and standard error.";    
		            
        $help_filter2 = "
					<h1>Filter</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Filter</h2>
					<br>
		            After you clicked on the field 'Analysis Mode' you can use the filter for limits to choose a phenomenon 
		            (consumption, CO2, speed, engine load, revolut./minute) and set a limit with the slider bar by yourself. 
		            This way you can see which measurements are over and which are below the set limit. The info window will 
		            show some typical limits as valuation help.";       
                 
					         
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
	
	$rpm = "Revolut./Minute";
	
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
	
?>