// IMPORT express
const express = require("express");
// Function for router creation
const router = express.Router();
// IMPORT Controllers
const moviesController = require("../controllers/moviesController");

// C.R.U.D

// Route INDEX (List of Movies)
router.get("/", moviesController.index);

// Router SHOW (Single Movie)
router.get("/:id", moviesController.show);

// Router STORE
// router.post("/", moviesController.store);

// EXPORT Router
module.exports = router;
