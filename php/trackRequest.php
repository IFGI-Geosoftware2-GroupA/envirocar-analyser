<?php
	$trackId;
	if(isset($_POST['id'])){
		$trackId = $_POST['id'];
	}
	else{
		$trackId = $_GET['id'];	
	}
    $json = file_get_contents('https://envirocar.org/api/stable/tracks/'.$trackId.'/measurements');
	$obj = json_decode($json);
	
	// phenomenons to take over from json file
	$phenomenonsUsed = array("Speed", "CO2", "Consumption", "Engine Load", "Rpm");
	
	$returnArray = array();
	
	// build array to transform into json and send back to client
	for($x = 0; $x < sizeof($obj -> features); $x++){
		
		// current measurement of the measurement array
		$current = $obj -> features[$x];
		
		$id = $current->properties->id;
		$point = $current->geometry->coordinates;
		$timestamp = $current->properties->time;
		$sensor = $current->properties->sensor -> properties;
		$sensor -> type = $current -> properties->sensor -> type;
		
		$phenomenon = array();
		$values = array();
		
		
		// sort existing phenomenons with their values to arrays, respecting the order
		for($i = 0; $i < sizeof($phenomenonsUsed); $i++){
			if(isset($current -> properties -> phenomenons -> {$phenomenonsUsed[$i]})){
				$phenomenon[] = array("name" => $phenomenonsUsed[$i], "unit" => $current -> properties -> phenomenons -> {$phenomenonsUsed[$i]} -> unit);
				$values[] = $current -> properties -> phenomenons -> {$phenomenonsUsed[$i]} -> value;		
			}
		}
		
		$returnArray[] = array("id" => $id, "phenomenons" => $phenomenon, "point" => $point, "sensors" => $sensor, "timestamp" => $timestamp, "values" => $values);
		
	}
	echo json_encode($returnArray);
?>