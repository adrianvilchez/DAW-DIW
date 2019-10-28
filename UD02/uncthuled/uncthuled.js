// Array del mapa
var mapa;

var posicionesPrimeraColumnaX;
var posicionesPrimeraColumnaY;

// Posición del personaje
var xet = 1;
var yet = 8;

var xpredator = 14;
var ypredator = 20;

var xpredator2 = 14;
var ypredator2 = 18;

var xinicioColumnas;
var yinicioColumnas;

var nivel = 1;

var vidas = 5;

var llave = 1;
var pergamino = 1;
var urna = 1;

var momia = 1;

var momiasEnJuego = 1;

var velocidadMomia = 250;

var personajeEnTablero = true;

var descubrirTesoros = [ "llave", "pergamino", "urna", "momia", "nada" ];

var movPredator = [ "arr" ,"ab", "izq", "der" ];

window.onload = function() {
    var divCuadricula;

    mapa = new Array(16);

    posicionesPrimeraColumnaX = new Array();
    posicionesPrimeraColumnaY = new Array();

    for (let index = 0; index < mapa.length; index++) {
        mapa[index] = new Array(23);   
    }

    cuadricula(23, 16);

    comprobarCajas();

    setInterval(() => {

        if (esInterseccion()) moverPredator();

    }, velocidadMomia);

};

// INICIO Mover Personaje
document.addEventListener('keydown', function(event) {

    let tecla = event.key;

    switch (tecla) {

        case "w":
        case "ArrowUp":
            if (mapa[xet-1][yet].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                mapa[xet-1][yet].classList.remove("pisadas");
                xet--;
                mapa[xet+1][yet].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "a":
        case "ArrowLeft":
            if (mapa[xet][yet-1].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                mapa[xet][yet-1].classList.remove("pisadas");
                yet--;
                mapa[xet][yet+1].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "s":
        case "ArrowDown":
            if (mapa[xet+1][yet].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet-1].classList.remove("personaje");
                mapa[xet+1][yet].classList.remove("pisadas");
                xet++;
                mapa[xet-1][yet].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "d":
        case "ArrowRight":
            if (mapa[xet][yet+1].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                mapa[xet][yet+1].classList.remove("pisadas");
                yet++;
                mapa[xet][yet-1].classList.add("pisadas");
                mapa[xet][yet].classList.add("personaje");
            }
            break;
    }

    marcarColumnasAdyecentes();
    obtenerColumnas();
    comprobarSalida();

});
// FIN Mover Personaje

// INICIO Mover Momia
function moverPredator() {

    var direccion = Math.floor(Math.random() * 4);
    
    var salir = false;

    mapa[14][21].classList.remove("momia");

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

    if (mapa[xet][yet] == mapa[xpredator][ypredator]) {
            
        //volverAlJuego();
        personajeEnTablero = false;
        volverAlJuego();
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
function comprobarCajas() {
    
    let bloquesColumnas = document.querySelectorAll(".columnas");

    let bloqueColumnas;

    console.log(bloquesColumnas.length);

    for (let i = 0; i < bloquesColumnas.length; i++) {

        bloqueColumnas = bloquesColumnas[i].getAttribute("data-indice");
        //bloqueColumnas = bloquesColumnas[i].dataset.indice;

        // Calculamos si el bloque está en una línea par
        if (parseInt(i / 15) % 2 == 0) {
          
            if (i % 3 == 0) {
                
                posicionesPrimeraColumnaX.push(bloquesColumnas[i].getAttribute("data-x"));
                posicionesPrimeraColumnaY.push(bloquesColumnas[i].getAttribute("data-y"));
            }  
        }

    }

    /*while (mapa[xinicioColumnas][yinicioColumnas - 1].classList.contains("columnas")) {
        
        xinicioColumnas--;

        while (mapa[xinicioColumnas - 1][yinicioColumnas].classList.contains("columnas")) {

            yinicioColumnas--;
        }
    }*/
}

function obtenerColumnas() {
    
    for (let i = 0; i < 20; i++) {
        comprobarColumna(parseInt(posicionesPrimeraColumnaX[i]), parseInt(posicionesPrimeraColumnaY[i]));
    }
}

function comprobarColumna(x, y) {
    
    if (!mapa[x][y].classList.contains("momia")
    || !mapa[x][y].classList.contains("pergamino")
    || !mapa[x][y].classList.contains("urna")
    || !mapa[x][y].classList.contains("llave")
    || !mapa[x][y].classList.contains("nada")) {
        if (mapa[x][y].classList.contains("rodeada")
        && mapa[x][y+1].classList.contains("rodeada")
        && mapa[x][y+2].classList.contains("rodeada")
        && mapa[x+1][y].classList.contains("rodeada")
        && mapa[x+1][y+1].classList.contains("rodeada")
        && mapa[x+1][y+2].classList.contains("rodeada")
        
        && mapa[x][y-1].classList.contains("pisadas")
        && mapa[x+1][y-1].classList.contains("pisadas")
        && mapa[x+2][y].classList.contains("pisadas")
        && mapa[x+2][y+1].classList.contains("pisadas")
        && mapa[x+2][y+2].classList.contains("pisadas")
        && mapa[x+1][y+3].classList.contains("pisadas")
        && mapa[x][y+3].classList.contains("pisadas")
        && mapa[x-1][y+3].classList.contains("pisadas")
        && mapa[x-1][y+2].classList.contains("pisadas")
        && mapa[x-1][y].classList.contains("pisadas")) {
            console.log("Los 6 divs contienen la clase 'rodeada'.  " + x + "    " + y);
            pintarTesoro(x, y, descubrirTesoro(x, y));
        }   
    }

}

// Comprobamos si hay columans adyacentes al personaje
function marcarColumnasAdyecentes() {
    
    if (mapa[xet + 1][yet].className.indexOf("columna") >= 0
        || mapa[xet - 1][yet].className.indexOf("columna") >= 0
        || mapa[xet][yet + 1].className.indexOf("columna") >= 0
        || mapa[xet][yet - 1].className.indexOf("columna") >= 0) {

        mapa[xet+1][yet].classList.add("rodeada");
        mapa[xet][yet+1].classList.add("rodeada");
        mapa[xet-1][yet].classList.add("rodeada");
        mapa[xet][yet-1].classList.add("rodeada");
        
    }
}

function pintarTesoro(x, y, tesoro) {
    mapa[x][y].classList.add(tesoro)
    && mapa[x][y+1].classList.add(tesoro)
    && mapa[x][y+2].classList.add(tesoro)
    && mapa[x+1][y].classList.add(tesoro)
    && mapa[x+1][y+1].classList.add(tesoro)
    && mapa[x+1][y+2].classList.add(tesoro);
}

function descubrirTesoro(x, y) {
    var tesoro = Math.floor(Math.random() * 5);
    
    var tesoroDescubierto  = descubrirTesoros[tesoro];

    switch (tesoroDescubierto) {
        case "llave":
            if (llave == 1 &&
                !mapa[x][y].classList.contains("momia")
                || !mapa[x][y].classList.contains("urna")
                || !mapa[x][y].classList.contains("pergamino")
                || !mapa[x][y].classList.contains("nada")) {
                // Poner llave
                llave--;
            } else if (llave == 0 && !mapa[x][y].classList.contains("llave")
            || !mapa[x][y].classList.contains("momia")
                || !mapa[x][y].classList.contains("urna")
                || !mapa[x][y].classList.contains("pergamino")) {
                // No poner nada
                tesoroDescubierto = "nada";
            }
            break;
        case "urna":
            if (urna == 1 &&
                !mapa[x][y].classList.contains("momia")
                || !mapa[x][y].classList.contains("pergamino")
                || !mapa[x][y].classList.contains("llave")
                || !mapa[x][y].classList.contains("nada")) {
                // Poner urna
                urna--;
            } else if (urna == 0 && !mapa[x][y].classList.contains("urna")
            || !mapa[x][y].classList.contains("momia")
                || !mapa[x][y].classList.contains("pergamino")
                || !mapa[x][y].classList.contains("llave")) {
                // No poner nada
                tesoroDescubierto = "nada";
            }
            break;
        case "pergamino":
                if (pergamino == 1 &&
                    !mapa[x][y].classList.contains("momia")
                    || !mapa[x][y].classList.contains("urna")
                    || !mapa[x][y].classList.contains("llave")
                    || !mapa[x][y].classList.contains("nada")) {
                    // Poner pergamino
                    pergamino--;
                } else if (pergamino == 0 && !mapa[x][y].classList.contains("pergamino")
                || !mapa[x][y].classList.contains("momia")
                || !mapa[x][y].classList.contains("urna")
                || !mapa[x][y].classList.contains("llave")) {
                    // No poner nada
                    tesoroDescubierto = "nada";
                }
            break;
        case "momia":
                if (momia == 1 &&
                !mapa[x][y].classList.contains("pergamino")
                || !mapa[x][y].classList.contains("urna")
                || !mapa[x][y].classList.contains("llave")
                || !mapa[x][y].classList.contains("nada")) {
                    // Poner pergamino
                    momia--;
                } else if (momia == 0 && !mapa[x][y].classList.contains("momia")
                || !mapa[x][y].classList.contains("pergamino")
                || !mapa[x][y].classList.contains("urna")
                || !mapa[x][y].classList.contains("llave")) {
                    // No poner nada
                    tesoroDescubierto = "nada";
                }
            break;
        // case "nada":
        //         tesoroDescubierto = "nada";
        //     break;
        default:
            break;
    }
    return tesoroDescubierto;
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

            divCuadricula.dataset.indice = contador;

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

            // Casilla de salida momia
            if (i == 14 && j == 21) {
                divCuadricula.classList.add("momia");
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

            //divCuadricula.innerHTML = i + " - " + j;

            divCuadricula.dataset.x = i;
            divCuadricula.dataset.y = j;
            document.getElementById("contenedor").appendChild(divCuadricula);
            
            mapa[i][j] = divCuadricula;

            contador++;
        }
    }

    //console.table(mapa);
}
// FIN Crear Cuadrícula

function comprobarSalida() {
    
    if (xet == 1 && yet == 8 && llave <= 0 && urna <= 0) {
        
        nivel++;
        momia++;
        alert("pasas de nivel");

        generarMomias();

        llave = 1;
        urna = 1;
        pergamino = 1;
        momia = 1;

    }
}

function generarMomias() {

    momia++;

    mapa[xpredator][ypredator -2].classList.add("momia");
    
}