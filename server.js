var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');

var vuelos       = require('./app/routes/vuelos');
var index       = require('./app/routes/index');
var app            = express();
var apivuelos       = require('./app/routes/apivuelos');


app.listen(3000, function () {
  console.log('App escuchando en el puerto 3000!');
});


app.use(bodyParser.urlencoded({ extended: true }));



var db = require('./config/db');

mongoose.connect(db.url, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var port = process.env.PORT || 3000; // set our ports



///////ROUTER//////
app.use('/', index);
app.use('/api/vuelos', apivuelos);
app.use('/vuelos', vuelos);


///////Siempre se define al final///////
app.use(function(req, res, next) {
  res.status(404).send('Esa pagina no existe!');
});
