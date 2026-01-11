const db = require("../database/connection");

class ProductRepository {
  async findAll(category = null) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM products";
      let params = [];
      if (category) {
        sql += " WHERE category = ?";
        params.push(category);
      }
      db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) =>
        err ? reject(err) : resolve(row)
      );
    });
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      const { name, price, stock, category } = data;
      const sql =
        "INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)";
      db.run(sql, [name, price, stock || 0, category], function (err) {
        if (err) return reject(err);
        db.get("SELECT * FROM products WHERE id = ?", [this.lastID], (e, row) =>
          e ? reject(e) : resolve(row)
        );
      });
    });
  }
  
  async update(id, data) {
    return new Promise((resolve, reject) => {
      const { name, price, stock, category } = data;
      const sql =
        "UPDATE products SET name = ?, price = ?, stock = ?, category = ? WHERE id = ?";
      db.run(sql, [name, price, stock, category, id], (err) => {
        if (err) reject(err);
        else resolve({ id, ...data });
      });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM products WHERE id = ?", [id], (err) =>
        err ? reject(err) : resolve(true)
      );
    });
  }
}
module.exports = new ProductRepository();
