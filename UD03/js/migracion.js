/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function hacerNonos(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startMigration(){

    // Fragmentos perdidos
    // ^(;,;)^

    
    barrasProgreso();
}

async function barrasProgreso() {
    let barrasProgreso = document.querySelectorAll("progress");


    for (let i = 0; i < barrasProgreso.length; i++) {

        for (let j = 0; j < 100; j++) {

            
            //let valorProgreso = progreso.value;
    
            if (barrasProgreso[i].value < 100) {
                barrasProgreso[i].value += j;
                //progreso.value += j;
    
                await hacerNonos(100);
    
                console.log(barrasProgreso[i].value);
            }

            
            
        }
    }
}

async function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);
}

// Init the environment when all is ready
window.onload=init;
