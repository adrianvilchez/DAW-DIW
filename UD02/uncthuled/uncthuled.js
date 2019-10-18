// Array del mapa
var mapa;

// Posición del personaje
var xet = 1;
var yet = 8;

window.onload = function() {
    var divCuadricula;

    mapa = new Array(16);

    for (let index = 0; index < mapa.length; index++) {
        mapa[index] = new Array(23);   
    }

    cuadricula(23, 16);
};

document.addEventListener('keydown', function(event) {

    let tecla = event.key;

    switch (tecla) {

        case "w":
        case "ArrowUp":
            if(mapa[xet-1][yet].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                xet--;
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "a":
        case "ArrowLeft":
            if(mapa[xet][yet-1].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                yet--;
                mapa[xet][yet].classList.add("personaje");
        }
            break;
        case "s":
        case "ArrowDown":
            if(mapa[xet+1][yet].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                xet++;
                mapa[xet][yet].classList.add("personaje");
            }
            break;
        case "d":
        case "ArrowRight":
            if(mapa[xet][yet+1].className.indexOf("pasillo") >= 0) {
                mapa[xet][yet].classList.remove("personaje");
                yet++;
                mapa[xet][yet].classList.add("personaje");
            }
            break;
    }
});

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
/*
            if (divCuadricula.className.indexOf("fondo") == - 1) {
                divCuadricula.classList.remove("pasillo");
            }*/

            //divCuadricula.innerHTML = i + " - " + j;
            document.getElementById("contenedor").appendChild(divCuadricula);
            
            mapa[i][j] = divCuadricula;

            contador++;
        }
    }

    console.table(mapa);
}