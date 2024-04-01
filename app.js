const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

mongoose.connect('mongodb://localhost:27017/pedicare')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

module.exports = app;