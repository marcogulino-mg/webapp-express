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

// EXPORT functions
module.exports = { index };
