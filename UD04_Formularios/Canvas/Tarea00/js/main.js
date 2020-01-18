
function draw() {

    var canvas = document.getElementById('canvas');

    var ctx = canvas.getContext('2d');

    // Con getBoundingClientRect() podemos obtener pixeles fraccionados además de el tamaño escalable por css
    var obtenerTamanyoLienzo = canvas.getBoundingClientRect();

    let anchura = obtenerTamanyoLienzo.width;
    let altura = obtenerTamanyoLienzo.height;

    let tamanyoTablero = 8;

    let casilla = "blanca";

    for (let i = 0; i <= tamanyoTablero; i++) {

        for (let j = 0; j <= tamanyoTablero; j++) {
            
            if (casilla == "blanca") {
                ctx.fillStyle = "#FFFFFF";
                casilla = "negra";
            } else {
                ctx.fillStyle = "#000000";
                casilla = "blanca";
            }
            ctx.fillRect(j * (anchura / tamanyoTablero), i * (altura / tamanyoTablero), altura / tamanyoTablero, anchura / tamanyoTablero);
        }

        
    }
}


window.onload = draw;