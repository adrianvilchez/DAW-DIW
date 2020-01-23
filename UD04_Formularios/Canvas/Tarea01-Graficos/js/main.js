const dioses = [
    { nombre: "Cthulhu", poder: 1000, color: "green"},
    { nombre: "Nyarlatothep", poder: 600, color: "red"},
    { nombre: "Azazoth", poder: 1400, color: "grey"},
    { nombre: "Pepe", poder: 800, color: "purple"}
];

const colores = [
    {color: "green"},
    { color: "red"},
    { color: "grey"},
    { color: "purple"}
];

const canvas = document.querySelector("canvas");

// contexto -> ctx
var ctx = canvas.getContext("2d");

ctx.font = "25px Arial";
ctx.lineWidth = 8;

let sumaTotal = 0;

let valores = document.querySelectorAll("input[class='right']");
let claves = document.querySelectorAll("input[class='left']");

let ancho = canvas.width / valores.length;
let alto = canvas.height;


function buildGrafico() {
    console.info(" * Construyendo grafico ");

    comprobarTipoEstadistica();
}

function comprobarTipoEstadistica() {
    
    let estadistica = document.querySelector("#estadistica").value;

    limpiarLienzo();

    switch (estadistica) {
        case "tarta":
            dibujarEstadisticaTarta();     
            break;
        case "rectangulos":
            dibujarEstadisticaRectangulo();
            break;
        case "montanya":
            dibujarEstadisticaMontanya();
            break;
    
        default:
            break;
    }
}

function loadListeners() {
    document.querySelector("input[name='grafiqueame']").addEventListener("click", buildGrafico);
}

function rellenarFormulario() {
    let keys = document.querySelectorAll("input[class='left']");
    let values = document.querySelectorAll("input[class='right']");

    let contador = 1;

    keys.forEach(key => {
        key.value = "bla_" + contador++;
    });

    contador = 1;

    values.forEach(value => {
        value.value  = contador += 1000;
    });
}

function dibujarEstadisticaTarta() {
    
    ctx.lineWidth = 1;

    //Empezamos arriba del todo, en vertical
    let inicioAngulo = -Math.PI / 2;
    let finAngulo = 0;
        
    for (let i = 0; i < valores.length; i++) {

        ctx.beginPath();
        ctx.moveTo(200, 200);
        
        finAngulo = inicioAngulo + (parseInt(valores[i].value) / sumaTotal) * 2 * Math.PI;

        ctx.fillStyle = colores[i].color;
        ctx.arc(200, 200, 100, inicioAngulo, finAngulo);
        ctx.moveTo(200, 200);
        //ctx.fillText(claves[i].value, 30 * inicioAngulo / 4, 200 *  finAngulo / 4);
        ctx.fillStyle = colores[i].color;
        ctx.fillText(claves[i].value, ancho * i, alto);
        ctx.fill();

        inicioAngulo = finAngulo;
    }
}

function dibujarEstadisticaRectangulo() {

    ctx.lineWidth = 1;

    let inicioX = 0;
    let porcentaje = 0;

    for (let i = 0; i < valores.length; i++) {

        ctx.beginPath();

        porcentaje = (parseInt(valores[i].value) / sumaTotal);
    
        ctx.moveTo(200, 1000);
        ctx.fillStyle = colores[i].color;
        ctx.fillRect(inicioX, 400, ancho, -alto * porcentaje);
        ctx.strokeStyle = colores[i].color;
        ctx.strokeText(claves[i].value, inicioX + ancho / 2, 450);

        inicioX += ancho;

        ctx.fill();
        ctx.stroke();
    }
        
}

function dibujarEstadisticaMontanya() {

    let altoMontanya = alto / sumaTotal;
    let inicioX = 0;
    let inicioY = alto - valores[0].value * altoMontanya;

    for (let i = 0; i < valores.length; i++) {

        let dibujarLinea = alto - altoMontanya * valores[i].value;

        ctx.beginPath();
        ctx.moveTo(inicioX, inicioY);
        ctx.strokeStyle = colores[i].color;
        ctx.lineTo(inicioX + ancho, dibujarLinea);
        ctx.stroke();

        inicioX += ancho;
        inicioY = dibujarLinea;

        ctx.fillStyle = colores[i].color;
        ctx.fillText(claves[i].value, ancho * i, alto);
    }
}

function sumarCampos() {
    
    valores.forEach(valor => {
        sumaTotal += parseInt(valor.value);
    });
}

function limpiarLienzo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
    console.log(" * Init ");

    loadListeners();
    rellenarFormulario();
    sumarCampos();
}

window.onload = init;