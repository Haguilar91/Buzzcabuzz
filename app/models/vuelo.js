// grab the mongoose module
var mongoose = require('mongoose');




var vueloSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
  	_id: Number,
    aerolinea:String,
    ciudad_origen: String,
    ciudad_destino:String,
    fechahr_salida:{type: Date, default: Date.Now},
    fechahr_llegada: {type: Date, default: Date.Now}
});



// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('vuelo', vueloSchema);


