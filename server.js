// IMPORT .env
require("dotenv").config();
// IMPORT express
const express = require("express");
// Server Base Configuration
const app = express();
const port = process.env.PORT;

// HomePage
app.get("/", (req, res) => {
  res.send("<h1>Rotta di Partenza</h1>");
});

//Server start (port: 3000)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
