const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "TrojanHorse",
  database: "whisperbox",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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
