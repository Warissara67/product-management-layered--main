// src/business/validators/productValidator.js
class ProductValidator {
  /**
   * ฟังก์ชันหลักสำหรับตรวจสอบข้อมูลสินค้า (ชื่อต้องตรงกับที่ Service เรียก)
   */
  validate(data) {
    // 1. ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (
      !data.name ||
      data.price === undefined ||
      data.price === null ||
      !data.category
    ) {
      throw new Error("Name, price, and category are required");
    }

    // 2. ตรวจสอบเงื่อนไขราคา (เรียกใช้ validatePrice ภายในนี้เลย)
    this.validatePrice(data.price);

    return true;
  }

  // ตรวจสอบเงื่อนไขราคา (Business Rule)
  validatePrice(price) {
    if (parseFloat(price) <= 0) {
      throw new Error("Price must be greater than 0");
    }
    return true;
  }

  // ตรวจสอบความถูกต้องของ ID
  validateId(id) {
    const numId = parseInt(id);
    if (isNaN(numId) || numId <= 0) {
      throw new Error("Invalid product ID");
    }
    return numId;
  }
}

module.exports = new ProductValidator();
