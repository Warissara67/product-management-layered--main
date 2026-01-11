const productRepository = require("../../data/repositories/productRepository");
const productValidator = require("../validators/productValidator");

class ProductService {
  async getAllProducts(category = null) {
    const products = await productRepository.findAll(category);
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    return { products, totalValue: totalValue.toFixed(2) }; // คืนค่าเพื่อให้ Stat แสดงถูกต้อง
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async updateProduct(id, data) {
    // เช็คก่อนว่ามีสินค้าไหม
    await this.getProductById(id);
    // ถ้ามี ค่อยสั่ง update
    return await productRepository.update(id, data);
  }

  async createProduct(data) {
    productValidator.validate(data);
    return await productRepository.create(data);
  }

  async deleteProduct(id) {
    const product = await productRepository.findById(id);
    if (!product) throw new Error("Product not found");
    return await productRepository.delete(id);
  }
}
module.exports = new ProductService();
