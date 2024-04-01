const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/pedicare");
const User = require('./modeles/user');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/signup', async(req, res, next) => {

    delete req.body._id;
    const user = new User({
        ...req.body
    });

    try{
        const exist = await User.findOne({email:req.body.email});
        if(exist){
            res.status(201).json({message : "Utilisateur " + req.body.email + " existe déjà"})
        }else{
            await user.save();
            res.status(200).json({message : "Utilisateur " + req.body.email + " ajouté"})
        }
    }catch(e){
        res.status(503).json(e)
    }

});

app.post("/api/login", async function(req, res, next){
    try {
        const user = await User.findOne({email:req.body.email});
        
        if (user) {
          const result = req.body.password === user.password;
          if (result) {
            res.status(200).json(user);
          } else {
            res.status(401).json({ message: "Mot de passe n'est pas correcte" });
          }
        } else {
          res.status(404).json({ message: "Utilisateur " + req.body.email + " n'existe pas"  });
        }
      } catch (error) {
        res.status(503).json({ error });
      }
});

module.exports = app;