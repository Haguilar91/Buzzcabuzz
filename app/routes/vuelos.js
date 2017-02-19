var express = require('express');
var router = express.Router(); //es para crear una miniaplicacion
var path = require('path');
var appRootDir = require('app-root-dir').get();

//METODOS DE RUTA
router.get('/', function (req, res) {   
    res.sendFile(path.join(appRootDir,'public','HomeAerolineas.html'));

});


router.get('/american', function (req, res) {
    res.download(path.join(appRootDir,'public','img','american.jpg'),'Logo.jpg',
        function(err){
            if (err){
                console.log('Ocurrio un error en la descarga.');
                res.status(404).send('No existe el recurs0!');
            }
            else
                console.log('Descarga exitosa.');
        });
});


router.get('/france', function (req, res) {
    res.download(path.join(appRootDir,'public','img','france.jpg'),'Logo.jpg',
        function(err){
            if (err){
                console.log('Ocurrio un error en la descarga.');
                res.status(404).send('No existe el recurs0!');
            }
            else
                console.log('Descarga exitosa.');
        });
});

router.get('/copa', function (req, res) {
    res.download(path.join(appRootDir,'public','img','copa.jpg'),'Logo.jpg',
        function(err){
            if (err){
                console.log('Ocurrio un error en la descarga.');
                res.status(404).send('No existe el recurs0!');
            }
            else
                console.log('Descarga exitosa.');
        });
});


router.get('/delta', function (req, res) {
    res.download(path.join(appRootDir,'public','img','delta.jpg'),'Logo.jpg',
        function(err){
            if (err){
                console.log('Ocurrio un error en la descarga.');
                res.status(404).send('No existe el recurs0!');
            }
            else
                console.log('Descarga exitosa.');
        });
});



module.exports = router;