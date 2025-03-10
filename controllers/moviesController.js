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

    // Send RES
    res.json(moviesResults);
  });
}

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

    connection.query(showReviews, [id], (err, reviewsResults) => {
      // Query Failed
      if (err) return res.status(500).json({ error: "Database query failed" });
      // Query Empty
      if (reviewsResults.length === 0)
        return res.status(404).json({ error: "Reviews List is Empty" });

      // Add reviews property in movie object filled with reviews
      movie.reviews = reviewsResults;

      // Send RES
      res.json(movie);
    });
  });
}

// EXPORT functions
module.exports = { index, show };
