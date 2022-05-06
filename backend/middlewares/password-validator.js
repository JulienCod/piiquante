const passwordSchema = require('../models/Password');

// On vérifie que le mot de passe respecte le schéma et on renvoie un message si c'est incorrect.
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {  // si le format du mot de passe est incorrect
        let messages = passwordSchema.validate(req.body.password, {details: true }) ;  // enregistrement du détails des erreurs dans une variable
        let errorMessage = '';  // initialisation message d'affichage
        for (const message of messages) {
            errorMessage+= message.message + ' ';       // concaténation des messages d'erreur
        }
        res.writeHead(400, errorMessage, {  // affichage du message d'erreur
            'content-type': 'application/json'
        });
        res.end('Le format du mot de passe est incorrect.');
    } else {
        next(); //sinon on continue l'execution
    }
};