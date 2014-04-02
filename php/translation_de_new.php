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
	                    Bei enviroCar analyser handelt es sich um eine Webseite zur Darstellung und Analyse der Umweltdaten der Community 
	                    Plattform enviroCar. Das enviroCar analyser Entwickler-Team übernimmt keinerlei Verantwortung für Aktualität, 
	                    Genauigkeit oder Vollständigkeit der auf dieser Webseite dargestellten Inhalte, es sei denn der Fehler sei unter 
	                    Absicht oder aufgrund grober Fahrlässigkeit entstanden. Für Fehler bei der Darstellung oder der 
	                    Benutzerschnittstelle ist das enviroCar analyser Entwickler-Team verantwortlich. Besitzer der Daten und somit 
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
		         	<p> Beim Öffnen der Webseite werden automatisch die 24 zuletzt gemessenen Stunden angezeigt und die Karte wird dementsprechent zentriert.
					Wenn der Nutzer nach einem beliebigen Ort in NRW suchen möchte, kann er dies über das Suchfeld mit Hilfe der Google Places API tun. Nach dem
					Bestätigen seiner Auswahl wird die Karte auf die Auswahl des Nutzers zentriert. Hierbei können nur Orte innerhalb NRWs ausgewählt werden. 
					Mit Hilfe der gängigen Mausinteraktionen kann der Nutzer den Kartenausschnitt beliebig, innerhalb der Grenzen von NRW, verschieben. Zu den
					gängigen Maus- und Tastaturinteraktionen gehört das Panning per Maus und den Pfeiltasten. <br><br>  </p>
		            <img src='img/help/zoom.jpg' width='18' height='100' align='left' vspace='5' hspace='5' alt='Text?'>
		            <p> Durch Benutzung des Scrollrades oder durch Klicken 
					auf das Plus- und das Minussymbol der Zoomskala, kann hinein und herausgezoomt werden. <br><br> <br><br>  </p>
		            <img src='img/help/karte.jpg' width='130' height='31' align='left' vspace='5' hspace='5' alt='Text?'>
		            <p> Durch Klicken auf die Wahlfelder 'Karte', 'Hybrid' und 'OSM' kann zwischen der reinen Vektorkarte von Google Maps, dem Hybrid aus Satellitenfoto und 
		            Straßenvektoren von Google Maps und einer OpenStreepMap-Karte gewählt werden. 
		            <br/> </p>";
	
	$help_getdata ="
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Daten abrufen</h2>
					<br>
		            <img src='img/help/daten.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Möchten Sie Daten für eine bestimmte Zeit analysieren, so können Sie unter 'Von:' und 'Bis:' das Zeitintervall bestimmen. Durch einen Klick in
					ein Feld der Datumsbox, öffnet sich ein Kalendar in dem sie das Datum und die Uhrzeit auswählen können. 
					<img src='img/help/kalender.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
					Durch die Betätigung des 'Daten abrufen' Buttons werden alle Datensätze, die in dem von ihnen definierten Zeitintervall liegen, visualisiert. <br><br><br>
					Möchten Sie einen bestimmten Raumausschnitt auswählen, so klicken Sie auf 'Raumauswahl'. Jetzt erscheint eine Bounding Box, die sie auf das von
					ihnen gewünschte Gebiet ziehen können. Die Größe der Bounding Box kann flexibel verändert werden. Allerdings müssen Sie darauf achten, dass die
					Bounding Box grün gefärbt ist, nur so ist eine Abfrage möglich. Ist die Bounding Box allerdings rot gefärbt, ist keine Abfrage möglich, da die
					Abfrage der Daten möglicherweise zu rechenintensiv ist. Dies wiederrum könnte die Erfahrung mit unserer Website beeinträchtigen. <br><br>
					Durch die Betätigung des 'Daten abrufen' Buttons werden alle Datensätze, die in dem von ihnen definierten Raumausschnitt liegen, visualisiert.<br>
		            <br>Möchten Sie Daten zu einem bestimmtem Raumausschnitt während eines bestimmten Zeitintervalls haben, so können sie einfach die oben genannten Schritte
					miteinander kombinieren.<br> 
		            <br>Wenn Sie anschließend nur die Daten einer bestimmten Fahrt haben möchten, können Sie diese unter 'Tracks' auswählen.<br>
		            <img src='img/help/autos.jpg' width='200' height='80' align='left' vspace='10' hspace='5' alt='Text?'>
					<p> Unter 'Mögliche Automodelle' können Sie dann entweder durch Klicken auf die Doppelpfeile alle Automodelle abwählen oder auch gezielt nur 
					einzelne durch Anklicken abwählen. Ebenso können Sie auch Automodelle auf die gleiche Weise wieder auswählen. Die Daten werden anschließend neu geladen.</p>  
					<br>";
	            
	$help_interpolation = "
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Interpolation</h2>
					<br>
		            <img src='img/help/analyse.jpg' width='75' height='40' align='left' vspace='10' hspace='5' alt='Text?'>
		            <img src='img/help/analyse_aus.jpg' width='75' height='60' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Um die von Ihnen ausgewählten Daten nun zu interpolieren, klicken Sie auf das Feld 'Analyse-Modus'. 
					Nun erscheint ein Button 'Funktionen'. Bei Betätigen dieses Buttons erscheint ein Drop-Down-Menü, in dem Sie 'Interpolation' auswählen können. 
					Sie können für die Interpolation drei verschiedene Arten wählen:<br>
					<br>* Datenauswahl per Bounding Box: Legen sie die Bounding Box über den gewünschten Raumausschnitt.<br>
					* Datenauswahl per TrackID: Wählen sie im Drop-Down-Menü 'Tracks' den von ihnen gewünschten Track aus.<br>
					* Datenauswahl per Straßenauswahl: Klicken sie den Button 'Straßensegmente'. Nun können sie Straßensegmente auswählen, die anschließend markiert werden.<br>
		            <br>Haben sie eine der 3 verschiedenen Arten der Datenauswahl gewählt, können sie mit einem Klick auf 'Interpolation' die Interpolation starten.
					Die interpolierten Ergebnisse können nun per Auswahl aus dem Drop-Down-Menü 'Messwert auswählen' ausgewählt und visualisiert werden.<br><br>
		            <img src='img/help/legende.jpg' width='120' height='31' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Durch einen Klick auf eines in der Legende gelisteten Phänomene kann jenes aus- oder abgewählt werden. Sie können innerhalb des Graphen zoomen, 
					indem sie per Linksklick eine Box erstellen. Es wird nun auf die Werte innerhalb der Box gezoomt. Mit einem Klick auf 'Reset zoom' wird wieder
					der komplette Graph angezeigt.<br>
					<br>Durch Setzen und Entfernen der Haken und einem Klick auf 'Aktualisieren', wird die Tabelle aktualisiert und es werden nur noch die von ihnen 
					ausgewählten Phänomene angezeigt.<br>  </p>
		            <img src='img/help/interpolationIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Haben sie eine der 3 verschiedenen Arten der Datenauswahl gewählt, können sie mit einem Klick auf 'Interpolation' die Interpolation starten.
					Die interpolierten Ergebnisse können nun per Auswahl aus dem Drop-Down-Menü 'Messwert auswählen' ausgewählt und visualisiert werden. </p>";   
		            
    $help_aggregation2 = "
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Aggregation</h2>
					<br>
					<img src='img/help/aggregationIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Um die von Ihnen ausgewählten Daten nun zu aggregieren, klicken Sie auf das Feld 'Analyse-Modus'. 
					Nun erscheint ein Button 'Funktionen'. Bei betätigen dieses Buttons erscheint ein Drop-Down-Menü, in dem Sie 'Aggregation' auswählen können.
					Die Berechnungen werden serverseitig mit PHP durchgeführt. Die Ergebnisse werden, nach Abschluss der Berechnungen, im JSON Format wieder an den Client zurückgegeben. 
					Die benötigte Zeit bis zur Darstellung der Ergebnisse ist dabei abhängig vom Umfang der selektierten Daten und der Auslastung des Servers. 
					Anschließend werden die Ergebnisse in Graph und Tabelle dargestellt.<br>
					<br>Durch einen Klick auf das in der Legende gelisteten Phänomen kann dies aus- oder abgewählt werden. Sie können innerhalb des Graphen zoomen, 
					indem sie per Linksklick eine Box erstellen. Es wird nun auf die Werte innerhalb der Box gezoomt. Mit einem Klick auf 'Reset zoom' wird wieder
					der komplette Graph angezeigt.<br>
					<br>Durch Setzen und Entfernen der Haken und einem Klick auf 'Aktualisieren', wird die Tabelle aktualisiert und es werden nur noch die von ihnen 
					ausgewählten Phänomene angezeigt.<br></p>";    
		            
    $help_filter2 = "
					<h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Filter</h2>
					<br>  
		            <img src='img/help/limitFilterIcon.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
		            <p> Wenn sie nach Grenzwerten filtern möchten, müssen sie in den 'Analyse-Modus' wechseln.
					Nun erscheint ein Button 'Funktionen'. Bei betätigen dieses Buttons erscheint ein Drop-Down-Menü, in dem Sie 'Grenzwertfilter' auswählen können.
					Es erscheint ein neues Fenster in dem sie das gewünschte Phänomenen auswählen können und die von ihnen gewünschten Grenzwerte festlegen können.
					In der orange gefärbten Box werden Informationen zu den jeweiligen Phänomenen angezeigt. 
					<br>Zum Beispiel: 'Die Richtgeschwindigkeit auf deutschen Autobahnen beträgt 130 km/h.'
					<br>Bei Bestätigung ihrer Auswahl werden die Marker der Messwerte, die auf ihre Auswahl zutreffen, dementsprechend eingefärbt.<br>
					<br>* Rote Marker: Der Wert liegt außerhalb der gewählten Grenzen.<br>
					* Gelbe Marker: Der Wert liegt innerhalb des 25%- oder 75% Quartil der gewählten Grenzen.<br>
					* Grüne Marker: Der Wert liegt zwischen dem 25%- und 75% Quartil der gewählten Grenzen.<br> </p>";     
		            
    $help_environment = "
                    <h1>Hilfe</h1> <br>
					<a href='#analyser-help' class='back'>Zurück</a><br>
					<h2>Filter</h2>
					<br>  
					<img src='img/help/enviroFilter.png' width='75' height='75' align='left' vspace='10' hspace='5' alt='Text?'>
					<p>Wenn sie die Umweltanalyse starten möchten, müssen sie in den 'Analyse-Modus' wechseln.
					Nun erscheint ein Button 'Funktionen'. Bei betätigen dieses Buttons erscheint ein Drop-Down-Menü, in dem Sie 'Umweltanalyse' auswählen können.
					Nach drücken auf 'Umweltanalyse' wird der CO2-Ausstoß in Verhältnis zu zurückgelegter Strecke (in Kilometern) gesetzt. 
					Die sich daraus ergebenden Marker werden grün (nicht mehr als 95g CO2/km, dem EU-Neuwagengrenzwert ab 2015), gelb (über 95g bis 
					130g CO2/km, dem EU-Neuwagengrenzwert ab 2020) oder rot (über 130g CO2/km) dargestellt. Die Werte werden in Tabelle und Graphen 
					angezeigt. Dazu muss zu jede dargestellte Messung einen CO2-Wert und einen Geschwindigkeitswert beinhalten.</p>";  
                 
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
	
	$selectIDW = "Messwerte auswählen";
	
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