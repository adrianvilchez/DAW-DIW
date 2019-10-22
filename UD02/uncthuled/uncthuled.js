// Array del mapa
var mapa;

// Posición del personaje
var xet = 1;
var yet = 8;

var xpredator = 14;
var ypredator = 20;

var vidas = 5;

velocidadMomia = 500;

var personajeEnTablero = true;

window.onload = function() {
    var divCuadricula;

    mapa = new Array(16);

    for (let index = 0; index < mapa.length; index++) {
        mapa[index] = new Array(23);   
    }

    cuadricula(23, 16);

    setInterval(() => {
        // Comentamos para que no de por culo
        //moverMomia();
    }, velocidadMomia);

};

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
    comprobarCajas();
    
    comprobarColumnasAdyecentes();

});

// Comprobamos si hay columans adyacentes al personaje
function comprobarColumnasAdyecentes() {
    
    // Comprobar si hay columna a la derecha
    if (mapa[xet][yet + 1].className.indexOf("columna") >= 0) {
        mapa[xet][yet + 1].classList.remove("columnas");
        mapa[xet][yet + 1].classList.add("columnasAdyacentes");
    }

    // Comprobar si hay columna a la izquierda
    if (mapa[xet][yet - 1].className.indexOf("columna") >= 0) {
        mapa[xet][yet - 1].classList.remove("columnas");
        mapa[xet][yet - 1].classList.add("columnasAdyacentes");
    }

    // Comprobar si hay columna debajo
    if (mapa[xet + 1][yet].className.indexOf("columna") >= 0) {
        mapa[xet + 1][yet].classList.remove("columnas");
        mapa[xet + 1][yet].classList.add("columnasAdyacentes");

    }

    // Comprobar si hay columna a la arriba
    if (mapa[xet - 1][yet].className.indexOf("columna") >= 0) {
        mapa[xet - 1][yet].classList.remove("columnas");
        mapa[xet - 1][yet].classList.add("columnasAdyacentes");
    }
}


function moverMomia() {

    if (mapa[xpredator-1][ypredator].className.indexOf("pasillo") >= 0) {
        buscandoAEt();
    } else if (mapa[xpredator][ypredator-1].className.indexOf("pasillo") >= 0) {
        buscandoAEt();
    } else if (mapa[xpredator+1][ypredator].className.indexOf("pasillo") >= 0) {
        buscandoAEt();
    } else if (mapa[xpredator][ypredator+1].className.indexOf("pasillo") >= 0) {
        buscandoAEt();
    }


    if (mapa[xet][yet] == mapa[xpredator][ypredator]) {
            
        //volverAlJuego();
        personajeEnTablero = false;
        finalizarJuego();
    }


}

function buscandoAEt() {
    if (xpredator < xet) {
        mapa[xpredator][ypredator].classList.remove("momia");
        mapa[xpredator][ypredator].classList.add("pasillo");
        xpredator++;
        mapa[xpredator][ypredator].classList.add("momia");
    } else if (xpredator > xet) {
        mapa[xpredator][ypredator].classList.remove("momia");
        mapa[xpredator][ypredator].classList.add("pasillo");
        xpredator--;
        mapa[xpredator][ypredator].classList.add("momia");
    }

    if (ypredator < yet) {
        mapa[xpredator][ypredator].classList.remove("momia");
        mapa[xpredator][ypredator].classList.add("pasillo");
        ypredator++;
        mapa[xpredator][ypredator].classList.add("momia");
    } else if (ypredator > yet) {
        mapa[xpredator][ypredator].classList.remove("momia");
        mapa[xpredator][ypredator].classList.add("pasillo");
        ypredator--;
        mapa[xpredator][ypredator].classList.add("momia");
    }
}
function volverAlJuego() {
    
    vidas--;

    // Mandamos al personaje a la casilla de salida
    mapa[xet][yet].classList.remove("personaje");

    xet = 1;
    yet = 8;

    mapa[xet][yet].classList.add("personaje");

    // Si las vidas se terminan, logicamente el juego termina
    if (vidas == 0) {
        finalizarJuego();
    }

    // Indicamos a la momia que el personaje se encuentra en el tablero
    personajeEnTablero = true;

    // Invicamos a la función para que la movia vuelva a moverse
    moverMomia();
}

function finalizarJuego() {
    alert("Serás gili******...");
}

function comprobarCajas() {
    
    let bloquesColumnas = document.querySelectorAll(".columnas");

    console.log(bloquesColumnas.length);

    for (let i = 0; i < 120; i++) {

        if (i % 3 == 0) {
            
            
        }
    }

    
}

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
/*
            if (divCuadricula.className.indexOf("fondo") == - 1) {
                divCuadricula.classList.remove("pasillo");
            }*/

            divCuadricula.innerHTML = i + " - " + j;
            document.getElementById("contenedor").appendChild(divCuadricula);
            
            mapa[i][j] = divCuadricula;

            contador++;
        }
    }

    //console.table(mapa);
}