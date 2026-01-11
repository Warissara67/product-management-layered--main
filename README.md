# 📦 Product Management System – Layered Architecture

โปรเจกต์ตัวอย่างสำหรับการ **Refactor จาก Monolithic Architecture → Layered Architecture**  
ใช้เป็น **Template สำหรับสอบ Midterm วิชา ENGSE207 (Software Architecture)**

---

## 🎯 วัตถุประสงค์
- แยกความรับผิดชอบของระบบออกเป็น Layer
- ลดปัญหา code ปนกันแบบ Monolithic
- ทำให้ระบบดูแลง่าย ทดสอบง่าย
- ใช้เป็นตัวอย่างอ้างอิงในการทำข้อสอบ

---

## 📁 โครงสร้างโปรเจกต์



```
PRODUCT-MANAGEMENT/
├── node_modules/
├── public/                 # Frontend (UI)
│   ├── css/
│   ├── js/
│   └── index.html
├── src/                    # Backend (Layered Architecture)
│   ├── presentation/       # Controllers, Routes
│   ├── business/           # Services, Validators
│   └── data/               # Repositories, DB connection
├── ARCHITECTURE.md         # Architecture documentation
├── README.md               # Project documentation
├── package.json
├── package-lock.json
├── server.js               # Application entry point
├── products.db             # SQLite database (runtime)
└── .gitignore
```


---

## 🧱 Layer Responsibilities

### 🎨 Presentation Layer
- รับ HTTP Request
- เรียก Service
- ส่ง HTTP Response
- ส่ง error ไปที่ middleware

❌ ไม่ทำ validation / business logic / database

---

### 🧠 Business Layer
- Validation
- Business Rules
- Calculations
- ประสานงานกับ Data Layer

❌ ไม่ใช้ req / res / SQL

---

### 💾 Data Layer
- Database connection
- CRUD operations
- Return raw data

❌ ไม่ทำ validation / business logic / HTTP

---

## 🚀 How to Run

```bash
npm install
npm start
```
---

**ผู้จัดทำ:** นางสาว วริศรา สรรพกรพิเศษ
**รหัสนักศึกษา:** 67543210073-2
**วิชา:** ENGSE207 Software Architecture
