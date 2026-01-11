// server.js
const express = require("express");
const productRoutes = require("./src/presentation/routes/productRoutes");
const errorHandler = require("./src/presentation/middlewares/errorHandler");

const app = express();

// Middleware พื้นฐาน
app.use(express.json()); // สำหรับอ่านข้อมูล JSON จาก Body
app.use(express.static("public")); // สำหรับให้บริการไฟล์หน้าเว็บ (HTML/CSS)

// เชื่อมต่อ Routes ของระบบสินค้า
app.use("/api/products", productRoutes);

// ⚠️ Error handling ต้องอยู่หลังสุดเสมอ
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║  Product Management System (Layered)         ║
║  Server running on http://localhost:${PORT}  ║
╚══════════════════════════════════════════════╝
    `);
});
