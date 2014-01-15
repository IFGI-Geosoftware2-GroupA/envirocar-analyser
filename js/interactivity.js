/**
 * @author Daniel Sawatzky
 */
 
// Function to change between normal and analysis mode

function changeMode() {

	var curWidth = document.getElementById('map').style.width;

	if (curWidth == "770px") {

			//alert('yes');

			document.getElementById('map').style.display = "block";
			document.getElementById('map').style.width = "100%";
			document.getElementById('chart').style.display = "none";
			document.getElementById('table').style.display = "none";
			document.getElementById('nav-bar').style.background = "#fff";
			document.getElementById('logo').src = "img/enviroCarLogo_transparent.png";
			initMap();
			document.getElementById('search-input').style.display = "block";
			
			
		} else {
		
			//alert('no');
			
			document.getElementById('map').style.width = "770px";
			document.getElementById('chart').style.display = "block";
			document.getElementById('table').style.display = "block";
			document.getElementById('nav-bar').style.background = "#1D83C3";
			document.getElementById('logo').src = "img/enviroCarLogo_trans_white.png";
			initMap();
			document.getElementById('search-input').style.display = "block";
			
			
			
		
		}

}
