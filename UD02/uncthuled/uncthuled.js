window.onload = function() {
    cuadricula(21, 13);
};

function cuadricula(ancho, alto) {
    
    for (let i = 1; i <= ancho; i++) {

        for (let j = 0; j <= alto; j++) {
            
            
            var divCuadricula = document.createElement("div");
            
            divCuadricula.classList.add("cuadricula");

            document.getElementById("contenedor").appendChild(divCuadricula);
        }
    }
}