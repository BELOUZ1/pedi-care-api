const express = require("express");
const rdvRouter = express.Router();
const User = require('../models/user');
const RDV = require('../models/rdvs')

rdvRouter.get('/etablissements/:specialite/:ville', async (req, res, next) => {
    try {
        const etablissements = await User.find({
            type: { $eq: 'medecin' },
            specialite: { $eq: req.params.specialite },
            ville: { $eq: req.params.ville }
        });
        res.status(200).json(etablissements);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});

rdvRouter.post('/add', async (req, res, next) => {

    delete req.body._id;

    try {
        const rdv = new RDV({
            ...req.body
        });
        await rdv.save();
        res.status(200).json({ message: "Rendez vous ajouté" })
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});

rdvRouter.get('/getbyid/:type/:id', async (req, res, next) => {

    try {
        if(req.params.type === 'patient'){
            const rdvs = await RDV.find({
                idpatient: { $eq: req.params.id },
            });
            res.status(200).json(rdvs);
        }else{
            const rdvs = await RDV.find({
                idmedecin: { $eq: req.params.id },
            });
            res.status(200).json(rdvs);
        }

    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});


rdvRouter.delete('/deletebyid/:idrdv', async (req, res, next) => {

    try {

        var rdvtodelete = { _id: req.params.idrdv };

        await RDV.deleteOne(rdvtodelete);

        res.status(200).json("RDV supprimé");

    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});

module.exports = rdvRouter;