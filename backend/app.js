const express = require('express'); // import de express
const app = express();
const mongoose = require('mongoose') //import du module mongoose
const userRoutes = require("./routes/user"); // import du fichier routes user
const userSauces = require('./routes/sauces'); // import du fichier routes des sauces
const path = require('path');
// importation des modules de protections
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');


require('dotenv').config();

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limite chaque adresse IP à 100 requêtes par fenêtre  ici pour 15 minutes 
	standardHeaders: true, // Informations sur la limite de taux de retour dans les en-têtes 'RateLimit-*'
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// connexion a la base de données mongoDB
mongoose.connect(`mongodb+srv://${process.env.ID_MONGO_DB}:${process.env.PWD_MONGO_DB}@cluster0.58bjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=> console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Permet d'analyser le corps de la requête.
app.use(express.json()); 

app.use(helmet()); 
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
// configuration des CORS doit être placé avant les routes de l'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH', 'OPTIONS');
    next();
})

app.use('/images', express.static(path.join(__dirname, 'images')))

// configuration des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', userSauces);


module.exports = app;