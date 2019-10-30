// Array del mapa
var mapa;

var posicionesPrimeraColumnaX;
var posicionesPrimeraColumnaY;

// Posición del personaje
var xet = 1;
var yet = 8;

var xpredator = 14;
var ypredator = 20;

var xpredatorTesoro;
var ypredatorTesoro;

var xpredator2 = 14;
var ypredator2 = 18;

var xinicioColumnas;
var yinicioColumnas;

var nivel = 1;

var vidas = 5;

var puntos = 0;

var llave = 0;
var pergamino = 0;

var tienePergamino = false;
var urna = 0;

var momia = 1;

var momiasEnJuego = 1;

var velocidadMomia = 250;

var personajeEnTablero = true;

var descubrirTesoros = [ "llave", "pergamino", "urna", "momia",
"tesoro", "tesoro", "tesoro", "tesoro",
"tesoro", "tesoro", "tesoro", "nada",
"nada", "nada", "nada", "nada",
"nada", "nada", "nada", "nada" ];

var movPredator = [ "arr" ,"ab", "izq", "der" ];

var intervaloPrincipal;

window.onload = function() {

    var divCuadricula;

    mapa = new Array(16);

    posicionesPrimeraColumnaX = new Array();
    posicionesPrimeraColumnaY = new Array();

    for (let index = 0; index < mapa.length; index++) {
        mapa[index] = new Array(23);   
    }

    cuadricula(23, 16);


    correrMomia();


    shuffleArray(descubrirTesoros);

    mapa[14][21].classList.remove("momia");

};

function correrMomia() {
    intervaloPrincipal = setInterval(() => {

        if (esInterseccion()) moverPredator();

        

    }, velocidadMomia);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// INICIO Mover Personaje
document.addEventListener('keydown', function(event) {

    let tecla = event.key;

    mapa[1][8].classList.remove("personaje");

    switch (tecla) {

        case "w":
        case "ArrowUp":
            if (mapa[xet-1][yet].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                xet--;
                mapa[xet][yet].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "a":
        case "ArrowLeft":
            if (mapa[xet][yet-1].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                yet--;
                mapa[xet][yet].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "s":
        case "ArrowDown":
            if (mapa[xet+1][yet].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                xet++;
                mapa[xet][yet].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "d":
        case "ArrowRight":
            if (mapa[xet][yet+1].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                yet++;
                mapa[xet][yet].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
    }


    // Contamos las pisadas de cada caja
    if (mapa[xet-1][yet].classList.contains("columnas")) { comprobarCajas(xet-1, yet); }
    if (mapa[xet+1][yet].classList.contains("columnas")) { comprobarCajas(xet+1, yet); }
    if (mapa[xet][yet-1].classList.contains("columnas")) { comprobarCajas(xet, yet-1); }
    if (mapa[xet][yet+1].classList.contains("columnas")) { comprobarCajas(xet, yet+1); }


    // Comprobamos si es jugador puede salir
    comprobarSalida();

});
// FIN Mover Personaje

// INICIO Mover Momia
function moverPredator(x, y) {
    //console.log("mover predator");
    var direccion = Math.floor(Math.random() * 4);
    
    var salir = false;

    

    switch (movPredator[direccion]) {

        case "izq":
            if (!mapa[xpredator][ypredator-1].classList.contains("pasillo")) salir = false;
            else { 
                mapa[xpredator][ypredator].classList.remove("momia");
                ypredator--;
                mapa[xpredator][ypredator].classList.add("momia");
            }
            break;
        case "der":
            if (!mapa[xpredator][ypredator+1].classList.contains("pasillo")) salir = false;
            else { 
                mapa[xpredator][ypredator].classList.remove("momia");
                ypredator++;
                mapa[xpredator][ypredator].classList.add("momia");
            }
            break;
        case "arr":
            if (!mapa[xpredator+1][ypredator].classList.contains("pasillo")) salir = false;
            else { 
                mapa[xpredator][ypredator].classList.remove("momia");
                xpredator++;
                mapa[xpredator][ypredator].classList.add("momia");
            }
            break;
        case "ab":
            if (!mapa[xpredator-1][ypredator].classList.contains("pasillo")) salir = false;
            else { 
                mapa[xpredator][ypredator].classList.remove("momia");
                xpredator--;
                mapa[xpredator][ypredator].classList.add("momia");
            }
            break;
        default:
            break;
    }

    if (mapa[xet][yet] == mapa[xpredator][ypredator] && !tienePergamino) {
            
        //volverAlJuego();
        personajeEnTablero = false;
        volverAlJuego();
    } else if (mapa[xet][yet] == mapa[xpredator][ypredator] && tienePergamino) {
        clearInterval(intervaloPrincipal);
        mapa[xpredator][ypredator].classList.remove("momia");

        momia--;

        document.querySelector(".momias").innerHTML = momia;
    }
}

function esInterseccion() {
    var existe = false;

    if (existePasillo(xpredator-1, ypredator)
    || existePasillo(xpredator+1, ypredator)
    || existePasillo(xpredator, ypredator-1)
    || existePasillo(xpredator, ypredator+1)) {
        existe = true;
    }
    return existe;
}

function existePasillo(x, y) {
    if (mapa[x][y].classList.contains("pasillo")) {
        return true;
    } else {
        return false;
    }
}
// FIN Mover Momia

// INICIO Columnas
function comprobarCajas(xs, ys) {

    var x = parseInt(xs);
    var y = parseInt(ys);

    if (!mapa[x-1][y].classList.contains("pasillo")) {
        x--;
    }

    while (mapa[x][y-1].classList.contains("columnas")) {
        y--;
    }

    //comprobamos si está rodeada
    comprobarRodeada(x-1, y-1);
}

function eliminarElementoArray(arr, item)  {

    var i = arr.indexOf(item);
 
    if (i !== -1) {
        arr.splice(i, 1);
    }
}

function comprobarRodeada(x, y) {

    var pisadas = 0;

    for (let i = x; i <= x + 3; i++) {
        for (let j = y; j <= y + 4 ; j++) {

            //console.log(i + " - " + j );
            if (mapa[i][j].classList.contains("pisadas")) {
                pisadas++;
            }
        }
    }

    if (pisadas >= 14) {

        if (!mapa[x+1][y+1].classList.contains("momia")
            && !mapa[x+1][y+1].classList.contains("llave")
            && !mapa[x+1][y+1].classList.contains("urna")
            && !mapa[x+1][y+1].classList.contains("nada")
            && !mapa[x+1][y+1].classList.contains("pergamino")
            && !mapa[x+1][y+1].classList.contains("tesoro")) {

            var seleccionAleatoria = Math.floor(Math.random() * descubrirTesoros.length);

            var tesoro = descubrirTesoros[seleccionAleatoria];

            eliminarElementoArray(descubrirTesoros, tesoro);

            mapa[x+1][y+1].classList.add(tesoro);
            mapa[x+1][y+2].classList.add(tesoro);
            mapa[x+1][y+3].classList.add(tesoro);
            mapa[x+2][y+1].classList.add(tesoro);
            mapa[x+2][y+2].classList.add(tesoro)
            mapa[x+2][y+3].classList.add(tesoro);

            switch (tesoro) {
                case "tesoro":
                    puntos += 100;

                    document.querySelector(".puntos").innerHTML = puntos;
                    break;
                case "llave":
                    llave = 1;

                    document.querySelector(".llaves").innerHTML = llave;
                    break;
                case "urna":
                    urna = 1;

                    document.querySelector(".urnas").innerHTML = urna;
                    break;
                case "pergamino":
                    pergamino = 1;

                    tienePergamino = true;
                    break;
                case "momia":
                        xpredatorTesoro = x+3;
                        ypredatorTesoro= y+3;

                        setInterval(() => {

                            mapa[xpredatorTesoro][ypredatorTesoro].classList.add("momia");
                        }, 1000);
                    
                    momia += 1;

                    document.querySelector(".momias").innerHTML = momia;
                    break;
                default:
                    break;
            }
        }
    }
}
// FIN Columnas

// INICIO Resetear Juego
function volverAlJuego() {
    
    vidas--;

    var contadorVidas = document.querySelector(".vidas");

    contadorVidas.innerHTML = vidas;

    // Si las vidas se terminan, logicamente el juego termina
    if (vidas == 0) {
        finalizarJuego();
    }

    // Posicionamos al jugador en la casilla de salida
    posicionarJugador();

    // Indicamos a la momia que el personaje se encuentra en el tablero
    personajeEnTablero = true;
}

function posicionarJugador() {
        // Mandamos al personaje a la casilla de salida
        mapa[xet][yet].classList.remove("personaje");

        xet = 1;
        yet = 8;
    
        mapa[xet][yet].classList.remove("pisadas");
        mapa[xet][yet].classList.add("personaje");
}

function finalizarJuego() {
    alert("Serás gili******...");
}
// FIN Resetear Juego

// INICIO Crear Cuadrícula
function cuadricula(ancho, alto) {
    
    var contador = 0;

    // i horizontal, j vertical
    for (let i = 0; i < alto; i++) {

        for (let j = 0; j < ancho; j++) {
            
            divCuadricula = document.createElement("div");
            
            divCuadricula.classList.add("cuadricula");

            //divCuadricula.dataset.indice = contador;

            // Fondo verde asqueroso
            if (i == 0 || j == 0 || i == 1 || i == 22 || j == 22 || i == 15) {
                divCuadricula.classList.add("fondo"); 
            }
            
            // Columnas en horizontal
            // i % 3 == 0, columnas superiores
            // (i - 1) % 3 == 0, columnas inferiores
            else if (i % 3 == 0 || (i - 1) % 3 == 0) {
                divCuadricula.classList.add("columnas"); 
            }

            // Pasillos en horizontal
            if ((i + 1) % 3 == 0 && j != 0 && j != 22) {
                divCuadricula.classList.add("pasillo"); 
            }

            // Pasillo en vertical
            else if ((j - 1) % 4 == 0 && i != 1 && i != 15) {
                divCuadricula.classList.add("pasillo");
                divCuadricula.classList.remove("columnas");
            }

            // Casilla de salida
            if (i == 1 && j == 8) {
                divCuadricula.classList.add("personaje");
                divCuadricula.classList.add("pasillo");
                divCuadricula.classList.remove("fondo");
            }

            if (i == 0 && j == 1) {
                    
                divCuadricula.classList.add("score");
            }

            if (i == 0 && j == 3) {
                    
                divCuadricula.classList.add("puntuacion");
            }

            if (i == 0 && j == 5) {
                    
                divCuadricula.classList.add("niveles");
            }

            // Casilla de salida momia
            if (i == 14 && j == 21) {
                divCuadricula.classList.add("momia");
            }

            if (i == 0 && j == 10) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("momia");
                divCuadricula.style.backgroundColor = "black";
            }

            if (i == 0 && j == 11) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("momias");
                divCuadricula.innerHTML = momia;
                
            }

            if (i == 0 && j == 13) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("pergamino");
            }

            if (i == 0 && j == 14) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("pergaminos");
                divCuadricula.innerHTML = pergamino;
            }

            if (i == 0 && j == 16) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("corazon");
            }

            if (i == 0 && j == 17) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("vidas");
                divCuadricula.innerHTML = vidas;
            }

            if (i == 0 && j == 18) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("llave");
            }

            if (i == 0 && j == 19) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("llaves");
                divCuadricula.innerHTML = llave;
            }

            if (i == 0 && j == 20) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("urna");
            }

            if (i == 0 && j == 21) {
                divCuadricula.classList.remove("fondo");
                divCuadricula.classList.add("urnas");
                divCuadricula.innerHTML = urna;
            }

            mapa[i][j] = divCuadricula;

            if (i % 3 == 0 && (j - 2) % 4 == 0 && mapa[i][j].classList.contains("columnas")) {

                
                divCuadricula.dataset.indice = contador;
                contador++;   
                
            }

            //divCuadricula.innerHTML = i + " - " + j;

            divCuadricula.dataset.x = i;
            divCuadricula.dataset.y = j;
            document.getElementById("contenedor").appendChild(divCuadricula);
            
            mapa[i][j] = divCuadricula;

            //divCuadricula.dataset.indice = contador;

            //contador++;

            if (i == 0 && j == 1) {

                var divHijo = document.createElement("div");
                    
                document.querySelector(".score").appendChild(divHijo);

                divHijo.classList.add("scoreP");

                divHijo.innerHTML = "Puntuación: ";
            }

            if (i == 0 && j == 3) {

                var divHijo = document.createElement("div");
                    
                document.querySelector(".puntuacion").appendChild(divHijo);

                divHijo.classList.add("puntos");

                divHijo.innerHTML = puntos;
            }

            if (i == 0 && j == 5) {

                var divHijo = document.createElement("div");
                    
                document.querySelector(".niveles").appendChild(divHijo);

                divHijo.classList.add("nivel");

                divHijo.innerHTML = "Nivel: " + nivel;
            }
        }
    }



    //console.table(mapa);
}
// FIN Crear Cuadrícula

function comprobarSalida() {
    
    if (xet == 1 && yet == 8 && llave == 1 && urna == 1) {
        
        puntos += 1000;
        document.querySelector(".puntos").innerHTML = puntos;

        nivel++;

        document.querySelector(".nivel").innerHTML =  "Nivel: " + nivel;

        momia++;
        alert("pasas de nivel");

        generarMomias();

        llave = 0;
        document.querySelector(".llaves").innerHTML = llave;
        
        urna = 0;
        document.querySelector(".urnas").innerHTML = urna;

        pergamino = 0;

        tienePergamino = false;


        // Eliminamos todas las pisadas
        var eliminarPisadas = document.querySelectorAll(".pisadas");

        for (let i = 0; i < eliminarPisadas.length; i++) {
            eliminarPisadas[i].classList.remove("pisadas");
        }

        var eliminarTesoros = document.querySelectorAll(".columnas");
        
        for (let i = 0; i < eliminarTesoros.length; i++) {
            eliminarTesoros[i].classList.remove("nada");
            eliminarTesoros[i].classList.remove("tesoro");
            eliminarTesoros[i].classList.remove("llave");
            eliminarTesoros[i].classList.remove("urna");
            eliminarTesoros[i].classList.remove("momia");
            eliminarTesoros[i].classList.remove("pergamino");
        }

        descubrirTesoros = [ "llave", "pergamino", "urna", "momia",
            "tesoro", "tesoro", "tesoro", "tesoro",
            "tesoro", "tesoro", "tesoro", "nada",
            "nada", "nada", "nada", "nada",
            "nada", "nada", "nada", "nada" ];

            shuffleArray(descubrirTesoros);

            correrMomia();
    }
}

function generarMomias() {

    momia++;

    document.querySelector(".momias").innerHTML = momia;

    mapa[xpredator][ypredator -2].classList.add("momia");
    
}