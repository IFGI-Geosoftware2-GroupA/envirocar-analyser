<?php
    
	$contact = "Kontakt";
	$contact_content = "<h1>Kontakt</h1>
	                    <br/>
	                    <br/>
	                    Bei Problemen und Fragen zu unserer Webseite erreichen Sie uns unter den folgenden E-Mail-Adresse: 
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
	$imprint_content = "<h1>Impressum</h1>
	                    <br/>
	                    Bei envirocar-analyser handelt es sich um eine Webseite zur Darstellung und Analyse der Umweltdaten der Community 
	                    Plattform enviroCar. Das envirocar analyser Entwickler-Team übernimmt keinerlei Verantwortung für Aktualität, 
	                    Genauigkeit oder Vollständigkeit der auf dieser Webseite dargestellten Inhalte, es sei denn der Fehler sei unter 
	                    Absicht oder aufgrund grober Fahrlässigkeit entstanden. Für Fehler bei der Darstellung oder der 
	                    Benutzerschnittstelle ist das envirocar analyser Entwickler-Team verantwortlich. Besitzer der Daten und somit 
	                    Besitzer der Rechte der Daten ist enviroCar.
	                    <br />
	                    <br />
	                    Betreiber der Webseite:
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
	
	$terms = "Nutzungsbedingungen";
	$terms_content = "The MIT License (MIT)<br />
				  	  <br />
					  Copyright (c) 2014 Jens Balmert, Thiemo G&auml;rtner, Mario Gerdes, Jan-Philipp Heine, 
					  Marius Runde, Daniel Sawatzky, Axel Virnich<br />
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
	
	
    $help = "Hilfe";
    
    $help_aggregation = "Aggregation";
	
	$help_filter = "Filter";
    
    $help_content = "<h1>Hilfe</h1> <br>
    				<a href='#analyser-help-mapview' id='maphelp'>Kartenausschnitt</a><br>
    				<a href='#analyser-help-getdata' id='getdatahelp'>Daten abrufen</a><br>
    				<a href='#analyser-help-interpolation' id='interpolationhelp'>Interpolation</a><br>
    				<a href='#analyser-help-aggregation' id='aggregationhelp'>Aggregation</a><br>
    				<a href='#analyser-help-filter' id='filterhelp'>Filter</a><br>
    				<a href='#analyser-help-filter' id='environmenthelp'>Umweltanalyse</a>
    				";
	
	$help_mapview = "
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Kartenausschnitt</h2>
	                <br>
	                <img src='img/help/suchenVerschieben.jpg' width='190' height='31' align='left' vspace='5' hspace='5' alt='Text?'>
		         	<p> Beim Öffnen der Webseite wird automatisch auf den Ort mit den jüngsten 24 Stunden an Daten gezoomt. Durch Eingabe eines 
		            anderen Ortes in NRW in das Suchfeld der Karte, wird zu einer anderen Stadt gezoomt. 
		            Es können nur Orte innerhalb NRWs ausgewählt werden. Entweder durch Klicken des 
		            Feldes mit den Pfeilen oder durch gedrückte linke Maustaste kann ein anderer 
		            Kartenausschnitt ausgewählt werden. <br><br>  </p>
		            <img src='img/help/zoom.jpg' width='18' height='100' align='left' vspace='5' hspace='5' alt='Text?'>
		            <p> Durch Benutzung des Scrollrades der Maus, 
		            durch Klicken auf das Plus- und das Minussymbol der Zoomskala oder durch Klicken auf selbige, 
		            kann hinein und herausgezoomt werden. <br><br> <br><br>  </p>
		            <img src='img/help/karte.jpg' width='130' height='31' align='left' vspace='5' hspace='5' alt='Text?'>
		            <p> Durch Klicken auf die Wahlfelder 'Karte', 'Hybrid' und 'OSM' kann zwischen der 
		            reinen Vektorkarte von Google Maps, dem Hybrid aus Satellitenfoto und Straßenvektoren von Google Maps und einer 
		            OpenStreepMap-Karte gewählt werden. 
		            <br/> </p>";
	
	$help_getdata ="
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Daten abrufen</h2>
					<br>
		            <img src='img/help/data.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
		            <img src='img/help/kalender.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Möchten Sie Daten für eine bestimmte Zeit 
		            analysieren, so wählen Sie unter 'Von:' und 'Bis:' das Zeitintervall 
		            aus, in dem Sie auf die entsprechende Tage klicken und ggf. zusätzlich mit Hilfe der Schieberegler noch die Zeit wählen. Durch 
		            Klicken in die obere linke oder rechte Ecke des Kalenderfensters kann in der Zeit zurück- oder vorgegangen werden. <br><br>
		            Um nach Daten für ein Gebiet zu filtern, klicken Sie auf 'Raumauswahl', um mit einer Bounding Box, deren Größe 
		            man durch Ziehen des Randes beliebig verändern kann, einen Raumausschnitt auszuwählen. Wird die Bounding Box zu groß, färbt sie 
		            sich rot. <br>
		            Zum Schluss klicken Sie auf 'Daten abrufen'.  <br><br>  
		            Wenn Sie anschließend nur die Daten einer bestimmten Fahrt haben möchten, können Sie diese unter 'Tracks' auswählen. <br>
		            <img src='img/help/autos.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
					<p> Unter 'Mögliche Automodelle' können Sie dann noch entweder durch Klicken auf die 
		            Doppelpfeile alle Automodelle abwählen oder auch gezielt nur einzelne durch Anklicken abwählen. Ebenso können Sie auch Automodelle 
		            auf die gleiche Weise wieder auswählen. Die Daten werden anschließend neu geladen.</p>  <br>";
	            
	$help_interpolation = "
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Interpolation</h2>
					<br>
		            <img src='img/help/analyse.jpg' width='75' height='40' align='left' vspace='10' hspace='5' alt='Text?'>
		            <img src='img/help/analyse_aus.jpg' width='75' height='60' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Um die von Ihnen ausgewählten Daten nun zu interpolieren, 
		            klicken Sie auf das Feld 'Analyse-Modus'. Danach erscheint ein Drop-down-Menü, in dem Sie 'Interpolation' auswählen können. 
		            Falls Sie für die Interpolation statt der Daten der Bounding Box nur Daten einiger Straßensegmente auswählen möchten, 
		            können Sie auf 'Straßenauswahl' klicken. Danach können Sie mit linker Maustaste Punkte auf die Straßen 
		            setzen, um so die Daten aller Straßensegmente zwischen diesen Punkten zu bekommen. <br><br> 
		            Direkt unter dem Interpolationsknopf befindet sich das Feld 
		            'Anzeige' und die Tabelle. Fährt man mit der Maus über das Feld 'Anzeige', so kann zwischen der Darstellung als Tabelle, 
		            Graph oder Graph und Tabelle gewählt werden.<br><br> </p>
		            Bei der Tabelle können Phänomene in Form von  
		            Spalten durch Setzen und Entfernen der Haken in den Kästchen und Drücken von 
		            'Aktualisieren' entfernt und hinzugefügt werden. <br><br>
		            <img src='img/help/legende.jpg' width='120' height='31' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Bei dem Graphen können Phänomene durch Klicken in dessen Legende ausgewählt werden.
		            Durch halten der linken Maustaste und aufziehen eines Rechtecks kann innerhalb des Graphs gezoomed werden und dies durch
		            den daraufhin erscheinenden Knopf wieder rückgängig gemacht werden. <br><br>  </p>
		            <img src='img/help/interpolationIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Durch drücken des Interpolationsknopfes werden die Werte für CO2, Verbrauch und Geschwindigkeit interpoliert. 
		            Daraufhin erscheint ein Drop-down-Menü, bei dem Sie auswählen können, welches dieser Resultate angezeigt werden soll. </p>";   
		            
    $help_aggregation2 = "
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Aggregation</h2>
					<br>
					<img src='img/help/aggregationIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Um die von Ihnen ausgewählten Daten nun zu aggregieren, klicken Sie auf das Feld 'Analyse-Modus'. Nach dem Klicken auf das 
		            Aggregationsfeld erscheinen Durchschnitt, Minimum, Maximum, und Standardfehler. Diese werden sowohl
		            in Form eines Graphen, als auch in Tabellenform dargestellt. Durch klicken in die Legende rechts von der Grafik kann ein einzelnes 
		            Phänomen zur Aggregation ausgewählt werden. Zur Kennzeichnung zu hoher/niedriger Werte wird das Minimum vom Maximum abgezogen. 
		            Dann werden die 25% über und 25% unter dem Mittelwert als grüne Punkte dargestellt. Die Werte darüber bis zum Maximum und darunter 
		            bis zum Minimum werden gelb gekennzeichnet. Alle Werte, die noch höher als das Maximum bzw. niedriger als das Minimum liegen, 
		            werden als rote Punkte dargestellt. </p>";    
		            
    $help_filter2 = "
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Filter</h2>
					<br>  
		            <img src='img/help/limitFilterIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Nachdem Sie auf das Feld 'Analyse-Modus' geklickt haben, können Sie mit dem Filter für Grenzwerte ein Phänomen 
		            (Geschwindigkeit, Verbrauch, Motorlast, Umdrehungen/min, CO2) auswählen und selbst mit Hilfe des Schiebereglers 
		            Grenzwerte festlegen. <br> So können Sie sehen, welche Messwerte über und welche unter dem festgelegten Grenzwert liegen. Als 
		            Einschätzungshilfe werden im Info-Fenster typische Grenzwerte für Geschwindigkeit und Verbrauch angezeigt. </p>";     
		            
    $help_environment = "
                    <h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Filter</h2>
					<br>  
					<img src='img/help/enviroFilter.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
					<p>Nach Drücken auf 'Umweltanalyse' wird der CO2-Ausstoß im Verhältnis zur zurückgelegten Strecke (in km) errechnet. 
					Die sich daraus ergebenden Marker werden grün (nicht mehr als 95g CO2/km, dem EU-Neuwagengrenzwert ab 2015), gelb (über 95g bis 
					130g CO2/km, dem EU-Neuwagengrenzwert ab 2020) oder rot (über 130g CO2/km) dargestellt. Die Werte werden in Tabelle und Graphen 
					angezeigt. Dazu muss zu jeder dargestellten Messung CO2-Wert und Geschwindigkeitswert vorhanden sein.</p>";  
                 
	$speed_info = "
	                <b>Info: </b> Innerorts gilt in Deutschland eine Höchstgeschwindigkeit von 50 km/h. Außerhalb geschlossener Ortschaften 
	                gilt eine Geschwindigkeitsbeschränkung von 100 km/h. Auf Autobahnen liegt die Richtgeschwindigkeit bei 130 km/h.";
	
	$consumption_info = "
	                <b>Info: </b> In Deutschland gilt ein Verbrauch von 6 - 10 Liter pro 100 gefahrener Kilometer als normal. 
                    Weitere Information zu einzelnen Automodellen finden Sie hier: <a href='http://www.autoverbrauch.at/ireds-124318.html' 
                    target='blank'>www.autoverbrauch.at</a>";
	
	$id = "ID";
	
	$consumption = "Verbrauch";
	
	$co2 = "CO2";
	
	$co2_emission = "CO2-Emission";
	
	$speed = "Geschwindigkeit";
	
	// $air_mass = "Luftmasse";
	
	$engine_load = "Motorlast";
	
	// $gps_accuracy = "GPS-Genauigkeit";
	
	// $gps_altitude = "GPS-Höhe";

	// $gps_bearing = "GPS-Richtung";
	
	// $gps_hdop = "GPS-HDOP";
	
	// $gps_pdop = "GPS-PDOP";

	// $gps_speed = "GPS-Geschwindigkeit";
	
	// $gps_vdop = "GPS VDOP";
	
	// $intake_pressure = "Einlassdruck";
	
	// $intake_temperature = "Einlasstemperatur";

	// $maf = "LMM";

	$rpm = "Umdrehungen/min";
	
	// $throttle_position = "Throttle-Position";

	// $fsl = "Kraftstoffanlagenkreislauf";

	// $fssc = "Kraftstoffanlagenstatus-Code";
	
	// $ltft = "Langzeitkraftstofftrimm";
	
	// $o2_lambda_current = "O2-Lambda-Strömung";
	
	// $o2_lambda_current_er = "O2-Lambda-Ströung ER";
	
	// $o2_lambda_voltage = "O2-Lambda-Spannung";

	// $o2_lambda_voltage_er = "O2-Lambda-Spannung-ER";
	
	// $stft_1 = "Kurzzeitkraftstofftrimm 1";
	
	    $on = "An";
	
	$off = "Aus";
    
    $logoLabel = "Exploration und Visualisierung";
	
	$from = "Von:";
	
	$to = "Bis:";
	
	$getData = "Daten abrufen";
	
	$selectSpace = "Raumauswahl";
	
	$display = "Tracks anzeigen";
	
	$track = "Track-ID:";
	
	$phenomenon = "Phänomen:";
	
	$selectStreet = "Straßenauswahl";
	
	$streets_on = "Straßenauswahl An";
	
	$streets_off = "Straßenauswahl Aus";
	
	$analysis_mode_label = "Analyse-Modus";
	
	$mapSearch = "Suche nach St&auml;dten";
	
	$refresh = "Aktualisieren";
	
	$wait = "Bitte warten...";
	
	$cancel ="Abbrechen";
	
	$interpolation_label = "Interpolation";
	
	$ClearIDW = "Löschen";
	
	$selectIDW = "Auswählen";
	
	$selectIDWco2 = "CO2";
	
	$selectIDWconsumption = "Verbrauch";
	
	$selectIDWspeed = "Geschwindigkeit";
	
	$display = "Anzeige";
	
	$table = "Tabelle";
	
	$chart = "Graph";
	
	$chartAndTable = "Graph und Tabelle";
	
	$filter_label = "Grenzwert-Filter";
	
	$aggregation_label = "Aggregation";
	
	$limit_filter = "Grenzwert-Filter";
	
	$filter_by_speed = "Geschwindigkeit filtern";
	
	$reset_filter = "Filter zurücksetzen";
	             
    $filter_by_speed = "Geschwindigkeit filtern";
    
	$filter_by_consumption = "Verbrauch filtern";
	
	$filter_by_engine_load = "Motorlast filtern";
	
	$filter_by_rpm = "Umdrehungen/min filtern";
	
	$filter_by_CO2 = "CO2 filtern";
	
	$environment_label = "Umweltanalyse";
	
	$functions = "Funktionen";
	
	$co2perkm = "CO2 pro Kilometer";
		
?>