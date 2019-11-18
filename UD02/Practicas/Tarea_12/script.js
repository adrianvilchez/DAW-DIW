/* 
 
    ^(;,;)^ : Fragmento perdido

*/


function init() {
    
    crearCaja();

}

function crearCaja() {

    let contador = 0;

    document.querySelector("button").addEventListener("click", function( event ) {
    
        let cajita = document.createElement("box");
        let caja = document.querySelector("container");

        cajita.addEventListener("click", evolucionar);

        if (contador < 20) {
            caja.appendChild(cajita);
        }

        contador++;
    });
}

function evolucionar() {

    this.classList.add("evoluciona");
    this.addEventListener("click", desEvolucionar);
}

function desEvolucionar() {
    
    this.classList.remove("evoluciona");
    this.classList.add("desevoluciona");
    this.addEventListener("click", ultimate);
}

function ultimate() {
    this.classList.remove("desevoluciona");
    this.classList.add("ultimate");
}

window.onload=init;
