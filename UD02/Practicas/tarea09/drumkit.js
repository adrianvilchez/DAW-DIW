document.addEventListener("keypress", habilidad);

const key = document.querySelectorAll("div");

key.forEach(boton => { boton.addEventListener('transitionend', borrarTransicion); });

function habilidad(e) {
    // alert("bla");

    const sonido = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    if (!sonido) { return; }

    sonido.play();
    sonido.currentTime = 0;

    const habilidad = document.querySelector(`div[data-key = "${e.keyCode}"]`);
    habilidad.classList.add("shadow");
}

function borrarTransicion() {
    this.classList.remove("shadow");
}