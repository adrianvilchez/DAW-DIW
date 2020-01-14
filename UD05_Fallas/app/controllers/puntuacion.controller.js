const Puntuacion = require('../models/puntuacion.model.js');

// Obtener todos los puntuaciones
exports.findAll = (req,res) => {

    Puntuacion.find().then(puntuaciones=>{
        res.send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};

exports.deleteAll = (req,res) => {

    Puntuacion.remove().then(data => {
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras borrabamos todo"
        });
    });
};


exports.delete = (req, res) => {

    Puntuacion.deleteOne({ "idFalla": req.body.idFalla, "ip": req.body.ip })
        .then(data => {
            console.log("data");
            console.log(data);
            res.send(data);

        }).catch(err => {
            res.status(500).send({
                message: err.message || " Algo fue mal mientras borrábamos la falla"
            });
        });

};

// Obtener puntuaciones de una ip
exports.findOne = (req, res) => {

    Puntuacion.find({ "idFalla": req.params.idFalla, "ip": req.params.ip })
        .then(puntuacion => {
            console.log("puntuacion");
            console.log(puntuacion);
            res.send(puntuacion);

        }).catch(err => {
            res.status(500).send({
                message: err.message || " Algo fue mal mientras los capturabamos a todos"
            });
        });

};

// Obtenertodas las fallas de una ip
exports.findIp = (req, res) => {

    Puntuacion.find({ "ip": req.params.ip })
        .then(ip => {

            res.send(ip);

        }).catch(err => {
            res.status(500).send({
                message: err.message || " Algo fue mal mientras los capturabamos a todos"
            });
        });

};

// Obtener puntuaciones de una ip
/*exports.findOne = (req, res) => {

    Puntuacion.find({
        id: req.params.idFalla,
        ip: req.params.ip
    }).then(puntuaciones=>{
        res.send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};*/



// Crear y salvar
exports.create = (req,res)=>{

    console.log(req.body);
    // Validamos el puntuacion
    if (!req.body){
        console.log(req.body);
        return res.status(400).send({
           message:"puntuacion Vacio..." 
        });
    }

    const puntuacion = new Puntuacion({

        idFalla: req.body.idFalla || "idFallaVacio",
        //ip: req.connection.remoteAddress.split(":")[3] || "127.0.0.1",
        ip: req.body.ip || "127.0.0.1",
        puntuacion: req.body.puntuacion|| 42
    })

    puntuacion.save().then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Something was wrong creating puntuacion"
        });
    });
};