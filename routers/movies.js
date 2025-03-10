// IMPORT express
const express = require("express");
// Function for router creation
const router = express.Router();
// IMPORT Controllers
const moviesController = require("../controllers/moviesController");

// C.R.U.D

// Route INDEX (List of Movies)
router.get("/", moviesController.index);

// EXPORT Router
module.exports = router;
