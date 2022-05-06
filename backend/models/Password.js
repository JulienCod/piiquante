const passwordValidator = require ('password-validator'); // import du module de password-validator

// Création d'un schéma de validation du mot de passe

let passwordSchema = new passwordValidator();   

passwordSchema
.is().min(8, 'Le mot de passe doit contenir minimum 8 caractères')                       // Longueur minimale 8
.is().max(100, 'Le mot de passe doit contenir maximum 100 caractères')                   // Longueur maximale 100
.has().uppercase(1, 'Le mot de passe doit contenir minimum 1 lettre majuscule')          // Doit avoir des lettres majuscules
.has().lowercase(1, 'Le mot de passe doit contenir minimum 1 lettre minuscule')          // Doit avoir des lettres minuscules
.has().digits(2, 'Le mot de passe doit contenir au moins 2 chiffres')                    // Doit comporter au moins 2 chiffres
.has().not().spaces(0,'Le mot de passe ne doit pas contenir d\'espace')                  // Ne devrait pas avoir d’espaces
.is().not().oneOf(['Passw0rd', 'Password123']);                                          // Mettre ces valeurs sur liste noire

module.exports = passwordSchema; // exports du schema 