const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "whisperbox",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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

db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
  } else {
    console.log("MySQL Connected!");
    connection.release();
  }
});

module.exports = db;
