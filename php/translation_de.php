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
	                    t_gaer03@uni-muenster.de";
	
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
	
	$analysis_mode_label = "Analyse Modus";
	
    $help = "Hilfe";
	
	$help_content = "<h1>Hilfe</h1>
	                 <br/>
	                 <h2>Kartenausschnitt</h2>
	                 Beim Öffnen der Webseite wird automatisch auf Münster gezoomt. Durch Eingabe eines 
	                 anderen Ortes in NRW in das Suchfeld der Karte, wird zu einer anderen Stadt gezoomt. 
	                 Es können nur Orte innerhalb NRWs ausgewählt werden. Entweder durch Klicken des 
	                 Feldes mit den Pfeilen oder durch gedrückte linke Maustaste kann ein anderer 
	                 Kartenausschnitt ausgewählt werden. Durch Klicken auf das Plus- und das Minussymbol 
	                 der Zoomskala oder durch Klicken auf selbige, kann hinein und herausgezoomt werden. 
	                 Durch Klicken auf die Wahlfelder 'Karte', 'Hybrid' und 'OSM' kann zwischen einer 
	                 reinen Vektorkarte, einem Hybrid aus Satellitenfoto und Straßenvektoren und einer 
	                 OpenStreepMap-Karte gewählt werden. 
	                 <br/> 
	                 <h2>Daten abrufen</h2>
	                 Möchten Sie Daten für eine bestimmte Zeit 
	                 analysieren, so wählen Sie zunächst unter 'Von:' und 'Bis:' das Zeitintervall 
	                 aus, in dem Sie auf die entsprechende Tage klicken (durch Klicken in die obere linke 
	                 oder rechte Ecke des Kalenderfensters kann in der Zeit zurück- oder vorgegangen werden). 
	                 Danach können Sie optional noch ein Gebiet innerhalb NRWs auswählen, indem 
	                 Sie entweder auf 'Raumauswahl' klicken, um mit einer Bounding Box, deren Größe man 
	                 durch Ziehen des Randes beliebig verändern kann, einen Raumausschnitt auszuwählen. 
	                 Oder aber durch Klicken des Feldes 'Straßenauswahl' mit linker Maustaste mehrere Punkte 
	                 setzen, um alle Straßensegmente zwischen diesen Punkten auszuwählen. Zum Schluss klicken 
	                 Sie auf 'Daten abrufen', um die Daten dieser Zeit sowie ggf. dieses Raumes angezeigt 
	                 zu bekommen. <br/> Unter 'Mögliche Automodelle' können Sie entweder durch Klicken auf die 
	                 Doppelpfeile alle Phänomene oder durch Klicken auf eines der Automodelle, Automodelle 
	                 einzeln auswählen. Ebenso können Sie unter 'Ausgewählte Automodelle' auch Automodelle 
	                 auf die gleiche Weise wieder abwählen. <br/> 
	                 <h2>Interpolation</h2>
	                 Um die Daten nun zu Analysieren, 
	                 klicken Sie auf das Feld 'Analyse Modus'. Danach erscheint oben der Interpolationsknopf zum 
	                 Interpolieren der Daten sowie weiter unten das Feld 'Anzeige' und die Tabelle. Fährt man mit 
	                 der Maus über das Feld 'Anzeige', so kann zwischen der Darstellung als Tabelle, 
	                 Graph oder Graph und Tabelle gewählt werden. Unter dem Interpolationsknopf können Sie auswählen, 
	                 was Sie genau interpolieren möchten: CO2, Verbrauch oder Geschwindigkeit. Danach müssen Sie nur 
	                 noch auf den Interpolationsknopf drücken, um die Resultate zu erhalten. Bei der Tabelle können 
	                 Spalten durch Setzen und Entfernen der Haken in den Kästchen und Drücken von 
	                 'Aktualisieren' entfernt und hinzugefügt werden. Mit der Scrollbalken an der Seite der 
	                 Tabelle können auch die weiter unten liegenden Daten eingesehen werden.";
	
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

	$rpm = "Umdreh./Minute";
	
	// $throttle_position = "Throttle-Position";

	// $fsl = "Kraftstoffanlagenkreislauf";

	// $fssc = "Kraftstoffanlagenstatus-Code";
	
	// $ltft = "Langzeitkraftstofftrimm";
	
	// $o2_lambda_current = "O2-Lambda-Strömung";
	
	// $o2_lambda_current_er = "O2-Lambda-Ströung ER";
	
	// $o2_lambda_voltage = "O2-Lambda-Spannung";

	// $o2_lambda_voltage_er = "O2-Lambda-Spannung-ER";
	
	// $stft_1 = "Kurzzeitkraftstofftrimm 1";
	
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
	
?>