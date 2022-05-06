
const bcrypt = require('bcrypt');  //import du module bcrypt
const User = require('../models/User');  //import du schema du models user
const jwt = require('jsonwebtoken');    //import du module  jsonwebtoken
require('dotenv').config(); // variable d'environnement

// route signup
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hash du mot du passe
    .then(hash => {
        const user = new User({ //création de l'objet contenant le mail et le mot de passe
            email: req.body.email, // enregistrement de l'adresse mail dans la bd
            password: hash  // enregistrement du mot de passe hasher dans la base de données
        });
        user.save() // enregistrement de l'objet user
            .then(() => res.status(201).json({message: 'Utilisateur créé !'})) // réponse en cas de success
            .catch(error => res.status(400).json({message : error + " L'adresse mail a été utilisée"} )); // réponse en cas d'échec
    })
    .catch(error => res.status(500).json({error})) // erreur de server
};

// route login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // recherche de l'adresse mail dans la base de données  
        .then(user => {
            if (!user) {    // si elle n'a pas été trouvé
                return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // message d'erreur
            }
            bcrypt.compare(req.body.password, user.password)    //bcrypt compare si le mot de passe saisi et identique a celui présent dans la base de donnée
                .then(valid => {    
                    if (!valid) {   // si le mot de passe saisi est incorrect
                        return res.status(401).json({ error: 'Mot de passe incorrect !' }); // message d'erreur'
                    }
                    res.status(200).json({  // si le mot de passe est correct
                        userId: user._id,   // l'user id prends la valeur de l'id de l'utilisateur
                        token: jwt.sign(    // création du token
                            { userId: user._id },   // payload sera l'identifiant de l'utilisateur
                            process.env.TOKEN_KEY,  // Clé secret pour effectuer l'encryptage
                            { expiresIn: '24h' }    // expiration du token
                        )
                    });
                })
                .catch(error => res.status(500).json({message : error }))  //erreur server      
        })
    .catch(error => res.status(500).json({error}))  //erreur server
};