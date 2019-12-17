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

// Esta es la funcion de filtrado para
// obtener todas las fallas


function filtroFallas(elemento) {
	//console.log(elemento.properties);

	let secc = document.querySelector(`select[name="seccion"]`).value;

	if(!elemento.properties.seccion.startsWith(secc) && secc != "Todas") return false;

	return elemento.properties.boceto;
}

/*function filtroDesdeHasta(elemento) {
	let desde = document.querySelector(`.input[name="desde"]`).value;
	let hasta = document.querySelector(`.input[name="hasta"]`).value;

	let anyoFundacion = elemento.properties.anyo_fundacion;

	console.log(elemento.properties.anyo_fundacion);

	console.log(elemento.properties.anyo_fundacion_i);

	if (anyoFundacion > desde && anyoFundacion < hasta) {
		
		return elemento.properties.boceto, elemento.properties.boceto_i;
	}

}*/

// filter
// mapas
// reduce

let secciones = [];
let seccionesInfantiles = [];

// api ETRS89 / UTM zone 30N to WGS84
function buscar() {

	eliminarHijos();

    // Obtenemos el JSON que esta definido
    

    // Cuando se resuelva la promesa
    /*fetchPromesa.then(response => {
		// la pasamos a JSON
		return response.json();
		// Y entonces
    }).then(respuesta => {*/
		// Filtramos los resultados con el filtro definido anteriormente

		console.log(fallas.features[1].properties);
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
			console.log(desde);
			let hasta = document.querySelector(`.input[name="hasta"]`);
		/*
			let anyoFundacion = falla.properties.anyo_fundacion;
		
		
			if (desde == null || hasta == null) {

				desde = 1970;
				hasta = 2005;
				if (anyoFundacion > desde.value && anyoFundacion < hasta.value || anyoFundacion > desde || anyoFundacion < hasta) {

					imgFalla.src = falla.properties.boceto;
				}
			} else {*/

				

				if (radio.value == "principal")  imgFalla.src = falla.properties.boceto;
				else imgFalla.src = falla.properties.boceto_i;
			//}

			if (!secciones.includes(falla.properties.seccion)) secciones.push(falla.properties.seccion);

			secciones.sort();
			let nombreFalla = document.createElement("p");
			nombreFalla.innerText = falla.properties.nombre;

			let ubicacionFalla = document.createElement("button");
			ubicacionFalla.innerText = "Ubicación";



			// Lo anyadimos
			listado.appendChild(contenedorFalla);
			contenedorFalla.appendChild(imgFalla);
			contenedorFalla.appendChild(nombreFalla);
			contenedorFalla.appendChild(ubicacionFalla);
		});



		// Establecemos el listado en la Web
		document.querySelector(".resultados").innerHTML = "";
		document.querySelector(".resultados").appendChild(listado);
    //});
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
}

function cargarSecciones() {

	console.log("bla");

	let seccion = document.querySelector("select");
	secciones.forEach(item => {
		var option = document.createElement("option");
		option.textContent = item;
		option.value = item;
		seccion.add(option);
	});

}

function init() {

	const fetchPromesa = fetch(fallasUrl);

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
	
}

// The mother of the lamb.
window.onload = init;
