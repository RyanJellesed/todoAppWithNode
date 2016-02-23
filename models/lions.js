var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LionSchema = new Schema ({
	name: String, 
	id: Number,
	age: Number, 
	pride: String,
	gender: String,
 });


module.exports = mongoose.model('Lion', LionSchema);
