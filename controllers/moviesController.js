// // IMPORT multer
// const upload = require("../middleware/imageFile");
// IMPORT DB Config file
const connection = require("../config/db");

// Functions

// INDEX
function index(req, res) {
  // QUERY
  const showMovies = `SELECT * FROM movies`;

  // DB Connection
  connection.query(showMovies, (err, moviesResults) => {
    // Query Failed
    if (err) return res.status(500).json({ error: "Database query failed" });
    // Query Empty
    if (moviesResults.length === 0)
      return res.status(404).json({ error: "Movies List is Empty" });

    // mapped version of moviesResults
    const movies = moviesResults.map((movie) => {
      return {
        ...movie,
        image: req.imagePath + movie.image,
      };
    });

    // Send RES
    res.json(movies);
  });
}

// SHOW
function show(req, res) {
  // GET ID from URL
  const id = req.params.id;
  // QUERY
  const showMovie = `SELECT * FROM movies WHERE id = ?`;
  const showReviews = `SELECT * FROM reviews WHERE movie_id = ?`;

  // DB Connection
  connection.query(showMovie, [id], (err, movieResults) => {
    // Query Failed
    if (err) return res.status(500).json({ error: "Database query failed" });
    // Query Empty
    if (movieResults.length === 0)
      return res.status(404).json({ error: "Movies List is Empty" });

    // Save Movie returned from DB
    const movie = movieResults[0];
    // update movie image path
    movie.image = req.imagePath + movie.image;

    connection.query(showReviews, [id], (err, reviewsResults) => {
      // Query Failed
      if (err) return res.status(500).json({ error: "Database query failed" });
      // Query Empty
      if (reviewsResults.affectedRows === 0)
        return res.status(404).json({ error: "Reviews List is Empty" });

      // Add reviews property in movie object filled with reviews
      movie.reviews = reviewsResults;

      // Send RES
      res.json(movie);
    });
  });
}

// STORE
function store(req, res) {
  // GET BODY REQ
  const { title, director, genre, release_year, abstract } = req.body;

  // Handle IMG File
  const imgName = `${req.file.filename}`;

  // QUERY
  const addMovie = `INSERT INTO movies (title, director, genre, release_year, abstract, image, created_at, updated_at) 
  VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;

  // Check For Empty Values in BODY REQ
  if (!title || !director || !genre || !release_year || !abstract)
    return res.status(404).json({ error: "Missing values" });

  // DB Connection
  connection.query(addMovie, [title, director, genre, release_year, abstract, imgName], (err, resAddMovie) => {
    // Query Failed
    if (err) return res.status(500).json({ error: "Database query failed" });

    // Send RES
    res.status(201).json({ message: "Movie Added" });
  });
}

// EXPORT functions
module.exports = { index, show, store };
