const jwt = require('jsonwebtoken');
require('dotenv').config();
const Sauce = require('../models/Sauce');

// 
module.exports = (req, res, next) => {
  try {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const userId = decodedToken.userId;

      if (sauce.userId && sauce.userId !== userId) {
        res.status(403).json({ message: 'Requête non autorisée' });
      } else {
        next();
      }
    })
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};