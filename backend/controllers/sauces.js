const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(async sauce => res.status(200).json(await sauce))
    .catch(error => res.status(400).json({error}));
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const image = (req.body.image);
    delete sauceObject._id;
    if(sauceObject.name && sauceObject.manufacturer && sauceObject.description && sauceObject.mainPepper && !image  ) {
        const sauce = new Sauce({
            ...sauceObject,
            imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistré !'}))
        .catch(error => res.status(400).json({message: error}))
    }else{
        res.status(402).send({message: 'Sauce non enregistré !'})

    }
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then( sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
            .then( () => res.status(200).json({message: 'Sauce supprimé !'}))
            .catch(error => res.status(400).json({error}));
        })
    })
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :{...req.body };
    Sauce.findOne({_id: req.params.id})
    .then( sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message: 'Sauce modifié !'}))
            .catch(error => res.status(400).json({error}))
        })
    })
    .catch(error => res.status(400).json({error}))
   
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(async sauce => {
        const userId = req.body.userId;
        const like = req.body.like;
        let usersLiked = sauce.usersLiked;
        let usersDisliked = sauce.usersDisliked;
        switch (like) {
            case 1:
                usersLiked.addToSet(userId);
                break;
            case 0:
                usersLiked = usersLiked.filter(element => element !== userId);
                usersDisliked = usersDisliked.filter(element => element !== userId);
                break;
            case -1:
                usersDisliked.addToSet(userId);
                break;
            default:
                break;
        }
        let likes = usersLiked.length;
        let dislikes = usersDisliked.length;
        await sauce.updateOne({
            usersLiked: usersLiked,
            usersDisliked: usersDisliked,
            likes: likes,
            dislikes: dislikes
        });
        res.status(200).send({message: 'Modification like effectué'})
    })
    .catch(error => res.status(400).json({error}))
}