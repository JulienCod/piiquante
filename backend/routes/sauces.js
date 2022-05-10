const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');     //  contrôle d'identification
const multer = require('../middlewares/multer-config');  // configuration de multer pour les formats d'images
const idCompare = require('../middlewares/id-compare');  // compare les tokens de l'identifiant pour autoriser au non la modification ou la suppresion des sauces
const limited =require('../middlewares/limite-req');    //limite de nombre de requète pour un temps donné
const sauceValidator = require('../middlewares/sauce-validator');
const saucesCtrl = require('../controllers/sauces');    // contrôleur des sauces

router.get('/',auth, saucesCtrl.getAllSauces); // route pour afficher toute les sauces

router.get('/:id',auth, saucesCtrl.getOneSauce); // route pour afficher une sauce en fonction de son identifiant

router.post('/',auth , limited ,  multer, sauceValidator, saucesCtrl.createSauce); // route pour créer une sauce

router.put('/:id', auth, limited, idCompare, sauceValidator,  multer, saucesCtrl.modifySauce);   // route pour modifier une sauce

router.delete('/:id',auth, idCompare , saucesCtrl.deleteSauce); // route pour supprimer une sauce

router.post('/:id/like',auth, limited, saucesCtrl.likeSauce); // route pour les likes des sauces

module.exports = router; // export des routes