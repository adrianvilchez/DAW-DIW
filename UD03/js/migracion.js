/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

async function startMigration(){

    // Fragmentos perdidos
    // ^(;,;)^

    

    
    barrasProgreso();
}

async function barrasProgreso() {

    let barrasProgreso = document.querySelectorAll("progress");

    console.log(barrasProgreso);

    

    barrasProgreso.forEach(progreso => {

        for (let i = 0; i < 100; i++) {

            let valorProgreso = progreso.value;
    
            console.log(valorProgreso);
    
            progreso.value += i;

            await delay(500);
        }
    });



}

function init(){
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click",startMigration);
}

// Init the environment when all is ready
window.onload=init;
