document.querySelector("button").addEventListener("click", function( event ) {
    
    let divs = document.getElementsByClassName("caja");

    for (let i = 0; i < divs.length; i++) {
        desplazarTransicion(divs[i]);
    }

}, false);


function desplazarTransicion(cthulitos) {
    cthulitos.classList.toggle("transicionable");
}