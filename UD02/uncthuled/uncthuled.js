window.onload = function() {
    cuadricula(23, 16);
};

function cuadricula(ancho, alto) {
    
    var contador = 0;

    

    // i horizontal, j vertical
    for (let i = 0; i < alto; i++) {

        for (let j = 0; j < ancho; j++) {
            
            var divCuadricula = document.createElement("div");
            
            divCuadricula.classList.add("cuadricula");
            divCuadricula.classList.add("cuadricula_" + contador);


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
            if ((i + 1) % 3 == 0) {
                divCuadricula.classList.add("pasillo"); 
            }

            // Pasillo en vertical
            else if ((j - 1) % 4 == 0) {
                divCuadricula.classList.add("pasillo");
                divCuadricula.classList.remove("columnas");
            }

            // Casilla de salida
            if (i == 1 && j == 8) {
                divCuadricula.classList.add("casillaSalida"); 
            }

            divCuadricula.innerHTML = i + " - " + j;
            document.getElementById("contenedor").appendChild(divCuadricula);
 
            contador++;
        }
    }
}