// IMPORT Express
const express = require("express");
// Function for router creation
const routerReviews = express.Router();
// IMPORT Controllers
const reviewsController = require("../controllers/reviewsController");

// C.R.U.D

// Route STORE
routerReviews.post("/:id", reviewsController.store);

// EXPORT Router
module.exports = routerReviews;
