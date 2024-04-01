const express = require("express");
const authRouter = express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");


authRouter.post('/signup', async (req, res, next) => {

    delete req.body._id;
    const user = new User({
        ...req.body
    });

    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) return res.status(201).json({ message: "Utilisateur " + req.body.email + " existe déjà" });

        await user.save();
        res.status(200).json({ message: "Utilisateur " + req.body.email + " ajouté" })

    } catch (e) {
        console.log(e);
        res.status(503).json(e)
    }

});


authRouter.post("/login", async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).json({ message: "Email ou Mot de passe n'est pas correcte" });

        if (req.body.password !== user.password) return res.status(400).json({ message: "Email ou Mot de passe n'est pas correcte" });

        user.token = jwt.sign({ userId: user.id }, "pedi-care-secret-key");

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});

module.exports = authRouter;