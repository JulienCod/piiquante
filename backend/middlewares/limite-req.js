const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // limite chaque adresse IP à 50 requêtes par fenêtre  ici pour 15 minutes 
	standardHeaders: true, // Informations sur la limite de taux de retour dans les en-têtes 'RateLimit-*'
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = apiLimiter;