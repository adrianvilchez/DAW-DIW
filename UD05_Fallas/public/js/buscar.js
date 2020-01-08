/*objeto puntuacion = {
	id_falla:
	ip:
	puntuacion:
}

npm install mongoose body-parser --save

npm run dev
*/

const fallasUrl = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";

const fetchPromesa = fetch(fallasUrl);

var fallas;

// Funcion de filtrado para obtener las fallas filtradas por la sección
function filtroFallas(elemento) {
	//console.log(elemento.properties);

	let secc = document.querySelector(`select[name="seccion"]`).value;

	if(!elemento.properties.seccion.startsWith(secc) && secc != "Todas") return false;

	return elemento.properties.boceto;
}

// filter
// mapas
// reduce

let secciones = [];
let coordFallas = [];

// api ETRS89 / UTM zone 30N to WGS84
function buscar() {

	eliminarHijos();
	coordFallas = "";

	//console.log(fallas.features[1].properties);
	

	const resultado = fallas.features.filter(filtroFallas);

	// Una vez tenemos el listado filtrado pasamos a crear
	// cada uno de los <div> que representan
	let listado = document.createElement("div");
	listado.classList.add("contenedor");

	// Por cada uno de ellos
	resultado.forEach(falla => {
		// Creamos un <img>

		let contenedorFalla = document.createElement("div");
		contenedorFalla.classList.add("falla");

		let imgFalla = document.createElement("img");

		let radio = document.querySelector(`input[name="tipoFalla"]:checked`);

		let desde = document.getElementById("desde");
		
		let hasta = document.getElementById("hasta");
	
		let anyoFundacion = falla.properties.anyo_fundacion;

		let principal;
	
		if (!secciones.includes(falla.properties.seccion)) secciones.push(falla.properties.seccion);

		secciones.sort();

		// if (radio.value == "principal") {imgFalla.src = falla.properties.boceto;
		// 	else imgFalla.src = falla.properties.boceto_i;

		if (radio.value == "principal") {

			principal = true;

			comprobarFallas(desde, hasta, imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal);

		} else {

			principal = false;

			comprobarFallas(desde, hasta, imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal);
		}
	});

	// Establecemos el listado en la Web
	document.querySelector(".resultados").innerHTML = "";
	document.querySelector(".resultados").appendChild(listado);
}

function comprobarFallas(desde, hasta, imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal, coordFallas) {
	if (desde.value == '' && hasta.value == '') {
				
		cargarFallas(imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal);
	} else if (anyoFundacion >= desde.value && hasta.value == '') {

		cargarFallas(imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal);
	} else if (anyoFundacion <= hasta.value && desde.value == '') {

		cargarFallas(imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal);
	} else if (anyoFundacion >= desde.value && anyoFundacion <= hasta.value) {

		cargarFallas(imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal);
	}
}

function cargarFallas(imgFalla, falla, anyoFundacion, listado, contenedorFalla, principal, coordFallas) {
	let nombreFalla = document.createElement("p");
	let ubicacionFalla = document.createElement("button");

	var fallaP = falla.properties.boceto;
	var fallaI = falla.properties.boceto_i;

	// Imágenes
	if (principal) {
		imgFalla.src = falla.properties.boceto;

		ubicacionFalla.onclick = function () { crearMapa(falla.geometry.coordinates, falla.properties.boceto); };
	} else {
		imgFalla.src = falla.properties.boceto_i;
		
		ubicacionFalla.onclick = function () { crearMapa(falla.geometry.coordinates, falla.properties.boceto_i); };
	}

	// Nombre y anyo
	nombreFalla.innerText = falla.properties.nombre + " (" + anyoFundacion + ")";

	// Ubicación y mapa
	ubicacionFalla.innerText = "Ubicación";

	//ubicacionFalla.onclick = function () { crearMapa(falla.geometry.coordinates, falla.properties.boceto); };


	listado.appendChild(contenedorFalla);
	contenedorFalla.appendChild(imgFalla);
	contenedorFalla.appendChild(nombreFalla);
	contenedorFalla.appendChild(ubicacionFalla);
}

function crearMapa(coordenadas, urlImagen) {


	mapaContainer = document.getElementById('mapa');
	mapaContainer.style.visibility = 'visible';

	let coordenadasMapa = traducirCoodenadas(coordenadas);

	var map = L.map('mapa', { closePopupOnClick: false }).setView([coordenadasMapa[0], coordenadasMapa[1]], 16);
	mapaContainer.addEventListener('focusout', function () {
		mapaContainer.style.visibility = 'hidden';
		map.off();
		map.remove();

		padreMapa = document.getElementById('mapa').parentNode;
		padreMapa.removeChild(mapaContainer);

		var newMapaContainer = document.createElement("div");
		newMapaContainer.setAttribute("id", "mapa");
		padreMapa.appendChild(newMapaContainer);
	});


	let tilerMapUrl = 'https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=FeZF25xvZUuP463NS59g';
	L.tileLayer(tilerMapUrl, {
		attribution: 'Map data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Imagery © <a href="http://www.kartena.se/">Kartena</a>',
	}).addTo(map);


	/* var imagenFalla = L.icon({
		iconUrl: urlImagen,
	
		iconSize:     [50, 50], // size of the icon
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	}); */

	var popup = L.popup()
	.setContent(
		`<div class="popUpMapa">
		 <img src="${urlImagen}">
		 </div>`)
	.openPopup();

	L.marker(coordenadasMapa).addTo(map).bindPopup(popup).openPopup();

	mapaContainer.focus();
}

function traducirCoodenadas(coordenadas) {

	// Cambiar la proyeccion de la referencia espacial 25830 a 4326
	let firstProjection = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
	let secondProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

	coordenadas = proj4(firstProjection, secondProjection, coordenadas);

	return [coordenadas[1], coordenadas[0]];
}

// 1 muestra información de las fallas principales, 0 de las infantiles
function buscarTipo(tipo, propiedad) {

	/*if (tipo == 1) {
		console.log(respuesta.features[0].properties[propiedad]);
	} else if (tipo == 0) {
		console.log(respuesta.features[0].properties[propiedad] + "_i");
	} else {
		console.log(respuesta.features[0].properties[propiedad]);
		console.log(respuesta.features[0].properties[propiedad] + "_i");
	}*/
}

function eliminarHijos() {
	document.querySelector(".resultados").innerHTML = "";

	var elemento = document.querySelector('map');

	if (elemento != null) {
		elemento.remove;
	}
	
	
}

function cargarSecciones() {

	let seccion = document.querySelector("select");
	secciones.forEach(item => {
		var option = document.createElement("option");
		option.textContent = item;
		option.value = item;
		seccion.add(option);
	});

}

/*var starRating = raterJs( {
	element:document.querySelector("#rater5"), 
	rateCallback:function rateCallback(rating, done) {
		this.setRating(rating); 
		done(); 
	}, 
	onHover:function(currentIndex, currentRating) {
		document.querySelector('.live-rating').textContent = currentIndex; 
	}, 
	onLeave:function(currentIndex, currentRating) {
		document.querySelector('.live-rating').textContent = currentRating; 
	}
});*/

function init() {

	const fetchPromesa = fetch(fallasUrl);

	mapaDeFallas = new Map();

	fetchPromesa.then(response => {
		return response.json();
		
	}).then(res => {
		fallas = res;
		buscar();
		cargarSecciones();
	});
	
    // Binding de los eventos correspondientes.

	document.querySelector(`select[name="seccion"]`).addEventListener("change", buscar);

	// Evento escuchando a ambos radio button
	document.querySelectorAll(`.radio[name="tipoFalla"]`).forEach(item => {
		item.addEventListener("change", buscar);
	});
	
	document.querySelector(`input[name="desde"]`).addEventListener("change", buscar);
	document.querySelector(`input[name="hasta"]`).addEventListener("change", buscar);

	// document.querySelectorAll('button').forEach(item => {
	// 	item.addEventListener("click", crearMapa(falla.geometry.coordinates));
	// });

	//window.addEventListener("load", starRating, false); 
	
}

// The mother of the lamb.
window.onload = init;
