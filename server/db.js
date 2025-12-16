const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "whisperbox"
});

// Create database if it doesn't exist
const tempConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234"
});

tempConnection.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
    return;
  }
  tempConnection.query("CREATE DATABASE IF NOT EXISTS whisperbox", (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database 'whisperbox' ensured.");
    }
    tempConnection.end();
  });
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

module.exports = db;
