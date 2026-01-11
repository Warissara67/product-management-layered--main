const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../../../products.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (!err) initializeDatabase();
});

function initializeDatabase() {
  db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0,
        category TEXT NOT NULL
    )`);
}
module.exports = db;
