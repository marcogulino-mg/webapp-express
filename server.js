// IMPORT .env
require("dotenv").config();
// IMPORT express
const express = require("express");
// Server Base Configuration
const app = express();
const port = process.env.PORT;
// IMPORT Middlewares
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");
// IMPORT Routers
const moviesRouter = require("./routers/movies");

// MIDDLEWARES
// Static File Folder
app.use(express.static("public"));
//Registro il body-parser per "application/json"
app.use(express.json());

// Routers
app.use("/movies", moviesRouter);

// HomePage
app.get("/", (req, res) => {
  res.send("<h1>Rotta di Partenza</h1>");
});

// MIDDLEWARES
// Non-existent ROUTES
app.use(notFound);
// Errors Handler
app.use(errorsHandler);

//Server start (port: 3000)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
