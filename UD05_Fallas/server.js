const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

// Importamos MongoDB
const dbConfig = require('./config/database.conf');
const mongoose = require('mongoose');

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', (pet, res) => {
    res.json({"message":"bla"});
});

// Requieres las rutas de las puntuaciones
//require('.app/router/puntuaciones.routers.js')(app);

// Escuchemos en un puerto
app.listen(3000,() => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});
