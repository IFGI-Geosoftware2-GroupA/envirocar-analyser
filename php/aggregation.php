<?php

/**
 * @author Axel Virnich
 */

$json_string = $_POST['json'];
$json = json_decode(trim($json_string));
//if JSON is malformed, an error message is returned 
if ($json === null) {
	echo 'JSON File Validation Failed';
} else {
	//Amount of Measurements
	$jsonSize = sizeof($json -> features);

	// Arrays of measured phenomenons
	$co2 = array();
	$calMaf = array();
	$speed = array();
	$consumption = array();
	$engineLoad = array();
	$gpsAccuracy = array();
	$gpsAltitude = array();
	$gpsBearing = array();
	$gpsHDOP = array();
	$gpsPDOP = array();
	$gpsSpeed = array();
	$gpsVDOP = array();
	$intakePressure = array();
	$maf = array();
	$intakeTemperature = array();
	$rpm = array();
	$throttlePosition = array();
	$longTermFuelTrim = array();
	$o2Current = array();
	$o2CurrentER = array();
	$o2Voltage = array();
	$o2VoltageER = array();
	$shortTermFuelTrim = array();

	//arrays to save the names and the data of the phenomenons
	$m_names = array('CO2', 'Calculated MAF', 'Consumption', 'Engine Load', 'GPS Accuracy', 'GPS Altitude', 'GPS Bearing', 'GPS HDOP', 'GPS PDOP', 'GPS Speed', 'GPS VDOP', 'Intake Pressure', 'Intake Temperature', 'MAF', 'Rpm', 'Speed', 'Throttle Position', 'Long Term Fuel Trim', 'O2 Lambda Current', 'O2 Lambda Current ER', 'O2 Lambda Voltage', 'O2 Lambda Voltage ER', 'Short-Term Fuel Trim');
	$m_arrays = array($co2, $calMaf, $consumption, $engineLoad, $gpsAccuracy, $gpsAltitude, $gpsBearing, $gpsHDOP, $gpsPDOP, $gpsSpeed, $gpsVDOP, $intakePressure, $intakeTemperature, $maf, $rpm, $speed, $throttlePosition, $longTermFuelTrim, $o2Current, $o2CurrentER, $o2Voltage, $o2VoltageER, $shortTermFuelTrim);

	//Amount of Phenomenons
	$number_phenomenons = sizeof($m_names);

	//iterate thorugh array and sort values to arrays
	for ($x = 0; $x < $jsonSize; $x++) {
		$current = $json -> features[$x] -> properties -> phenomenons;
		for ($i = 0; $i < $number_phenomenons; $i++) {
			if (isset($current -> $m_names[$i]))
				array_push($m_arrays[$i], $current -> $m_names[$i] -> value);
		}
	}

	// 	return Minimum
	function getMin(array $array) {
		if (sizeof($array) == 0)
			return 'No Data';
		return min($array);
	}

	// 	returns Maximum
	function getMax(array $array) {
		if (sizeof($array) == 0)
			return 'No Data';
		return max($array);
	}

	// 	calculate Mean
	function getMean(array $array) {
		if (sizeof($array) == 0)
			return 'No Data';
		return array_sum($array) / count($array);
	}

	// 	calculate Standard Error
	function getStandardError(array $array) {
		if (sizeof($array) == 0)
			return 'No Data';
		$mean = getMean($array);
		$temp = 0;
		for ($x = 0; $x < count($array); $x++) {
			$temp += pow(($array[$x] - $mean), 2);
		}
		$standard_deviation = sqrt($temp / count($array));
		return $standard_deviation / sqrt(count($array));
	}

	//	Build Return JSON
	$returnArray = array();
	for ($x = 0; $x < $number_phenomenons; $x++) {
		array_push($returnArray, array($m_names[$x] => array('Mean' => getMean($m_arrays[$x]), 'Min' => getMin($m_arrays[$x]), 'Max' => getMax($m_arrays[$x]), 'Standard Error' => getStandardError($m_arrays[$x]))));
	}
	// 	Return Result as JSON
	echo json_encode($returnArray);
}
?>