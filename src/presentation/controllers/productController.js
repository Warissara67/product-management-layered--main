const productService = require("../../business/services/productService");

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const result = await productService.getAllProducts(req.query.category);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async createProduct(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (e) {
      next(e);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({ message: "Deleted" });
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new ProductController();
