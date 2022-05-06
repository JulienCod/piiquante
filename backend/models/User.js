const mongoose = require('mongoose'); // import du module mongoose
const uniqueValidator = require('mongoose-unique-validator'); // import du module mongoose unique validator

// configuration du schema de la base de données mongodb
const userSchema = mongoose.Schema({
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true}
});

//plugin de validation d'adresse mail unique
userSchema.plugin(uniqueValidator);

//exports du modèle mongoose
module.exports = mongoose.model('User',userSchema);