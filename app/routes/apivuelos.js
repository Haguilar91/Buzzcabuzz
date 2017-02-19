var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat')

var Vuelo = require('../models/vuelo');




router.get('/',function (req, res){
    Vuelo.find(function (err, vuelos) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
        	console.log('Se encontro vuelos')
            res.status(200).json(vuelos);
        }
    });
});

router.get('/:id',function(req,res){
    Vuelo.findById(req.params.id,function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos' + err);
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });
});

router.get('/fecha/:filter',function(req,res){        

        var start =  new Date(req.params.filter)
        var end= new Date(start.getFullYear(),  start.getMonth(),  start.getDate()+1,17,59,59);
        start=start.toISOString().slice(0, 19);
        end=end.toISOString().slice(0, 19);
        console.log('Fecha recibida: ' + start  + 'end' + end)
        
        Vuelo.find( {$or:[{fechahr_salida: {$gte:start, $lte:end} },{fechahr_llegada: {$gte:start, $lte:end} }]},function(err, vuelo) {

        if (err)
            res.status(500).send('Error en la base de datos' + err);
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });
});


router.get('/salidas/rangos',function(req,res){
    
    var start =  new Date(req.query.desde);
    var end =  new Date(req.query.hasta);
    end= new Date(end.getFullYear(),  end.getMonth(),  end.getDate()+1,17,59,59);
    
    start=start.toISOString().slice(0, 19);
    end=end.toISOString().slice(0, 19);

    console.log('Fechas recibidas:' + 'Desde:' + start + ' Hasta:'+ end)

    Vuelo.find({fechahr_salida: {$gte:start, $lte:end} },function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos' + err);
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });
});

router.get('/llegadas/rangos',function(req,res){
    
    var start =  new Date(req.query.desde);
    var end =  new Date(req.query.hasta);
    end= new Date(end.getFullYear(),  end.getMonth(),  end.getDate()+1,17,59,59);
    
    start=start.toISOString().slice(0, 19);
    end=end.toISOString().slice(0, 19);

    console.log('Fechas recibidas:' + 'Desde:' + start + ' Hasta:'+ end)

    Vuelo.find({fechahr_llegada: {$gte:start, $lte:end} },function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos' + err);
        else{
            if (vuelo != null) {
                res.status(200).json(vuelo);
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });
});

router.post('/',function(req,res){
    //crea un objeto pero del modelo Vuelo
    console.log('Id del Body' + req.body.id +' d ' +req.body.aerolinea )

    var vuelo1 = new Vuelo({      
        _id:req.body.id,
        aerolinea:req.body.aerolinea,
        ciudad_origen: req.body.ciudad_origen,
        ciudad_destino:req.body.ciudad_destino,
        fechahr_salida: req.body.fechahr_salida,
        fechahr_llegada: req.body.fechahr_llegada        
    });

    //guarda una persona en la base de datos
    vuelo1.save(function (error, vuelo1) {
        if (error) {
            res.status(500).send('No se ha podido agregar.' + error);
        }
        else {
              res.status(200).json('Agregado exitosamente'); //envía al cliente el id generado
        }
    });
});


router.put('/:id',function(req,res){
    //Modificar con Find ID
    Vuelo.findById(req.params.id,function(err, vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null){
                vuelo.aerolinea=req.body.aerolinea;
                vuelo.ciudad_origen=req.body.ciudad_origen;
                vuelo.ciudad_destino=req.body.ciudad_destino;
                vuelo.fechahr_salida=req.body.fechahr_salida;
                vuelo.fechahr_llegada=req.body.fechahr_llegada; 

                vuelo.save(function (error, vuelo) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Se Modificado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro ese vuelo');
        }
    });
});


router.delete('/:id',function(req,res){
    //Eliminar con Find ID
    Vuelo.findById(req.params.id,function(err,vuelo) {
        if (err)
            res.status(500).send('Error en la base de datos');
        else{
            if (vuelo != null) {
                vuelo.remove(function (error, result) {
                    if (error)
                        res.status(500).send('Error en la base de datos');
                    else {
                        res.status(200).send('Eliminado exitosamente');
                    }
                });
            }
            else
                res.status(404).send('No se encontro esa vuelo');
        }
    });
});

module.exports = router;