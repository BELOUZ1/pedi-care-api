const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const rdvRoutes = require("./routes/rdv");
const blogsRoutes = require("./routes/blogs");

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/rdv", rdvRoutes);
app.use("/api/blogs", blogsRoutes);

mongoose.connect('mongodb://localhost:27017/pedicare')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

module.exports = app;