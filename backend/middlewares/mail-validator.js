const mailValidator = require('email-validator'); // import du module de validation d'email


module.exports = (req, res, next) => {
    if (!mailValidator.validate(req.body.email)) {  // si le mail n'est pas valide
        res.writeHead(400, "Veuillez entrer un format d'email valide, exemple: piquante@gmail.com", { // envoie la réponse de l'erreur à l'utilisateur
            'content-type': 'application/json'
        });
        res.end("L'adresse email est invalide");    
    } else {
        next();     // sinon on continue l'execution
    }
};