// IMPORT DB Config file
const connection = require("../config/db");

// Functions
function store(req, res) {
  // GET ID From URL
  const { id } = req.params;
  // GET BODY REQ
  const { name, vote, text } = req.body;

  // QUERY
  const addReview = `INSERT INTO reviews (movie_id, name, vote, text, created_at, updated_at)
    VALUES (?, ?, ?, ?, NOW(), NOW())`;

  // Check For Empty Values in BODY REQ
  if (!name || !vote || !text)
    return res.status(404).json({ error: "Missing values" });

  // DB Connection
  connection.query(addReview, [id, name, vote, text], (err, resultReview) => {
    // Query Failed
    if (err) return res.status(500).json({ error: "Database query failed" });

    // Send RES
    res.json(resultReview);
  });
}

// EXPORT functions
module.exports = { store };
