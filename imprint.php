<?php 
	if(!isset($_GET['lang'])){
		include 'php/translation_de.php';
	}	
	
	else if(isset($_GET['lang']) && $_GET['lang'] == 'en'){
		include 'php/translation_en.php';
	}
	else if(isset($_GET['lang']) && $_GET['lang'] != 'de'){
	    include 'php/translation_de.php';
	}
	if (isset($_GET['lang'])) {
		$lang = $_GET['lang'];
		if ($lang != 'en') {
			$lang = 'de';
			$other_lang = 'en';
		} else {
			$other_lang = 'de';
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>enviroCar analyser</title>
    <meta name="description" content="Internet Applikation zur Exploration und Visualisierung von raum-zeitvarianten Fahrzeug-Messdaten" />
    <meta name="author" content="Marius Runde, Daniel Sawatzky, Jens Balmert" >
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<!-- Icons, Fonts and Style sheets -->
	<link rel="shortcut icon" href="img/favicon.ico" />
	<link href='https://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
    <link href="css/flags.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="css/lib/jquery-ui-timepicker-addon.min.css" />
	<link rel="stylesheet" type="text/css" href="css/lib/bootstrap-duallistbox.css" />
	<link rel="stylesheet" type="text/css" href="css/lib/bootstrap.css" />
	
</head>

<body>
	
<div id="imprint-wrapper" >

<div id="header-nav" >
	<div class="logo">
		<a href="./index.php" title="Homepage">
			<img id="logo" alt="enivroCar analyser logo" width="150px" src="img/enviroCarAnalyser.png">
		</a>
	</div>

</div> <!-- end div header-nav -->	

<div id="imprint-content" >

</div> <!-- end div imprint-content -->	
	
<div id="footer" >
	<span>
	<?php
		if(isset($_GET['lang']) && $_GET['lang'] == 'en'){
			echo '<a href="imprint.php"><img src="./img/blank.png" class="flag flag-de" alt="deutsch"></a> &middot';	
		}
		else{
			echo '<a href="imprint.php?lang=en"><img src="./img/blank.png" class="flag flag-gb" alt="english"></a> &middot;';	
		}
	?>
					
	&copy 2014 &middot; enviroCar &middot; <a href="contact.php"><?php echo $contact ?></a> 
	&middot; <a href="imprint.php"><?php echo $imprint ?></a>
	&middot; <a href="terms.php"><?php echo $terms ?></a>
	
	</span>
</div> <!-- end div footer -->	
</div> <!-- end div imprint-wrapper -->	
</body>
</html>