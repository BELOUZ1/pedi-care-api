const express = require("express");
const blogsRouter = express.Router();
const Blogs = require('../models/blogs');

blogsRouter.post('/add', async (req, res, next) => {

    try {
        delete req.body._id;
        const blog = new Blogs({
            ...req.body
        });
        await blog.save();
        res.status(200).json({ message: "Blog ajouté" })

    } catch (e) {
        console.log(e);
        res.status(503).json(e)
    }

});

blogsRouter.get('/all', async (req, res, next) => {
    try {
        const blogs = await Blogs.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});

blogsRouter.get('/get/:idmedecin', async (req, res, next) => {
    try {
        const blogs = await Blogs.find({
            idmedecin : { $eq: req.params.idmedecin }
        });
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});

blogsRouter.delete('/delete/:idblog', async (req, res, next) => {
    try {

        var blogtodelete = { _id: req.params.idblog };

        await Blogs.deleteOne(blogtodelete);
        res.status(200).json("Blog supprimé");
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
});

module.exports = blogsRouter;