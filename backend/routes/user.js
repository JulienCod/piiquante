const express = require('express'); // import express
const router = express.Router();    // fonction router de express
const userCtrl = require('../controllers/user'); //import du fichier de contrôle user
const mailValidator = require('../middlewares/mail-validator')
const passValidator = require('../middlewares/password-validator');

router.post('/signup', mailValidator, passValidator, userCtrl.signup); // étape a valider pour accéder a la fonction singup
router.post('/login', userCtrl.login); // étape a valider pour accéder a la fonction login

module.exports = router; // export des routes