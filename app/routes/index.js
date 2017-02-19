var express = require('express');
var router = express.Router(); //es para crear una miniaplicacion


//METODOS DE RUTA
router.get('/',function (req, res) {
	res.send('Bienvenidos Examen I Desarrollo de Aplicaciones de Vanguardia.');
});


module.exports = router;