// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err.message);

  // กำหนด HTTP Status Code เบื้องต้น
  let statusCode = 500;

  // ถ้าเป็น Error จากการ Validation ให้ส่ง 400 Bad Request
  if (err.message.includes("required") || err.message.includes("must be")) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    error: err.message || "Internal server error",
  });
}

module.exports = errorHandler;
