// IMPORT .env
require("dotenv").config();

// IMPORT mysql2
const mysql = require("mysql2");

// DB Base Configuration
const connection = mysql.createConnection({
  host: process.env.PORT || 3000,
  user: process.env.DB_USER || "localhost",
  password: process.env.DB_PASS || "y38T*aqC2lPkJp",
  database: process.env.DB_NAME || "movies_db",
});

// Connection to DB
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// EXPORT DB Module
module.exports = connection;
