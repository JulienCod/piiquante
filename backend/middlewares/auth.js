const jwt = require('jsonwebtoken'); // import du module jwt
require('dotenv').config(); // variable d'environnement 

module.exports = (req, res, next) => {  
  try {
    const token = req.headers.authorization.split(' ')[1]; // récupére la valeur du token présent dans les headers
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);  // comparaison du token présent dans le headers avec la clé secrète
    const userId = decodedToken.userId; 
    if (req.body.userId && req.body.userId !== userId) { // si le token est différent
      res.status(403).json({ message: 'Requête non autorisée' });   // message d'erreur
    } else {
      next(); // sinon on continue l'exécution
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')  // message d'erreur
    });
  }
};