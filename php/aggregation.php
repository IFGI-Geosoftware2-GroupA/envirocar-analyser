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
	$jsonSize = sizeof($json -> Speed);
	
	// Arrays of measured phenomenons
	$co2 = array();
	$speed = array();
	$consumption = array();
	$engineLoad = array();
	$rpm = array();

	//arrays to save the names and the data of the phenomenons
	$m_names = array('CO2', 'Consumption', 'Engine Load', 'Rpm', 'Speed');
	$m_arrays = array($co2, $consumption, $engineLoad, $rpm, $speed);

	//Amount of Phenomenons
	$number_phenomenons = sizeof($m_names);

	// iterate through json file and sort values to arrays
	for($x = 0; $x < $jsonSize; $x++){
		if(isset($json -> CO2[$x]))
			array_push($m_arrays[0], $json -> CO2[$x]);
		if(isset($json -> Consumption[$x]))
			array_push($m_arrays[1], $json -> Consumption[$x]);
		if(isset($json -> EngineLoad[$x]))
			array_push($m_arrays[2], $json -> EngineLoad[$x]);
		if(isset($json -> Rpm[$x]))
			array_push($m_arrays[3], $json -> Rpm[$x]);
		if(isset($json -> Speed[$x]))
			array_push($m_arrays[4], $json -> Speed[$x]);
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