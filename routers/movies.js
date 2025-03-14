// IMPORT express
const express = require("express");
// Function for router creation
const router = express.Router();
// IMPORT Controllers
const moviesController = require("../controllers/moviesController");
// IMPORT multer
const upload = require("../middleware/imageFile")

// C.R.U.D

// Route INDEX (List of Movies)
router.get("/", moviesController.index);

// Router SHOW (Single Movie)
router.get("/:id", moviesController.show);

// Router STORE
router.post("/", upload.single("image"), moviesController.store);

// EXPORT Router
module.exports = router;
