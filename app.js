const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

const user = require("./route/user.js");
const movie = require("./route/movie.js");

app.use("/api/v1", user);
app.use("/api/v1", movie);

app.use((req,res) => {
    res.status(404).json({ message: '404_NOT_FOUND'})
  })
module.exports = app;
