/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

// Hacemos un nonito asíncrono para poder utilizarlo en los bucles
function hacerNonos(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startMigration(){

    // Fragmentos perdidos
    // ^(;,;)^

    barrasProgreso();
}

// Almacenamos las barras de progreso y comprobamos su valor, si es menor
// a 100 sumamos hasta llegar y hacemos un nonitos
async function barrasProgreso() {
    let barrasProgreso = document.querySelectorAll("progress");

    let pasos = document.querySelectorAll("[data-step]");

    for (let i = 0; i < pasos.length; i++) {
        
        pasos[i].classList.add("estabaEscondido");
        
        await hacerNonos(1000);

        for (let j = 0; j < 100; j++) {
            if (pasos[i].value < 100) {
                pasos[i].value += j;
                await hacerNonos(30);
            }
        }
    } 
}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);
}

// Init the environment when all is ready
window.onload=init;
