# Product Management System – Architecture

## Overview

This document describes the software architecture for the **Product Management System** used in the workshop. The architecture follows a **Layered Architecture** approach to ensure separation of concerns, maintainability, and testability.

---

## C1: System Context Diagram

```
┌─────────────────────────────────────────────────────┐
│                    System User                      │
│         (Owner, Staff, Manager)                     │
└────────────┬────────────────────────────────────────┘
             │ HTTP/JSON (CRUD Operations)
             ▼
┌─────────────────────────────────────────────────────┐
│       Product Management System                     │
│  • Manage products (CRUD)                           │
│  • Calculate total product value                    │
│  • Filter by category                               │
└────────────┬────────────────────────────────────────┘
             │ SQL Queries
             ▼
┌─────────────────────────────────────────────────────┐
│              SQLite Database                        │
│               (products.db)                         │
└─────────────────────────────────────────────────────┘
```

### Actors

* **System User**: Owner, staff, or manager who manages products

### System

* **Product Management System**: Handles product data, calculations, and filtering

### External System

* **SQLite Database**: Stores product information

---

## C2: Container Diagram – Layered Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                        │
└────────────┬───────────────────────────────────────────────────┘
             │ HTTP/JSON
             ▼
╔════════════════════════════════════════════════════════════════╗
║                  PRODUCT MANAGEMENT SYSTEM                     ║
╠════════════════════════════════════════════════════════════════╣
║  ┌───────────────────────────────────────────────────────────┐ ║
║  │           PRESENTATION LAYER                              │ ║
║  │  • Routes (productRoutes.js)                              │ ║
║  │  • Controllers (productController.js)                     │ ║
║  │  • Middlewares (errorHandler.js)                          │ ║
║  └──────────────────────┬────────────────────────────────────┘ ║
║                         ▼                                      ║
║  ┌───────────────────────────────────────────────────────────┐ ║
║  │           BUSINESS LOGIC LAYER                            │ ║
║  │  • Services (productService.js)                           │ ║
║  │  • Validators (productValidator.js)                       │ ║
║  │                                                           │ ║
║  │  Business Rules:                                          │ ║
║  │    ✓ Name, price, category required                       │ ║
║  │    ✓ Price > 0                                            │ ║
║  │    ✓ Stock ≥ 0                                            │ ║
║  │    ✓ totalValue = Σ(price × stock)                        │ ║
║  └──────────────────────┬────────────────────────────────────┘ ║
║                         ▼                                      ║
║  ┌───────────────────────────────────────────────────────────┐ ║
║  │           DATA ACCESS LAYER                               │ ║
║  │  • Repositories (productRepository.js)                    │ ║
║  │  • Database (connection.js)                               │ ║
║  │                                                           │ ║
║  │  Methods:                                                 │ ║
║  │    • findAll(category)                                    │ ║
║  │    • findById(id)                                         │ ║
║  │    • create(productData)                                  │ ║
║  │    • update(id, productData)                              │ ║
║  │    • delete(id)                                           │ ║
║  └──────────────────────┬────────────────────────────────────┘ ║
╚═════════════════════════╪══════════════════════════════════════╝
                          │ SQL
                          ▼
              ┌─────────────────────────┐
              │    SQLite Database      │
              │     (products.db)       │
              │  Table: products        │
              │  - id                   │
              │  - name                 │
              │  - price                │
              │  - stock                │
              │  - category             │
              │  - created_at           │
              └─────────────────────────┘
```

---

## Layer Responsibilities

### 1. Presentation Layer

**Responsibilities**:

* Receive HTTP requests
* Parse request parameters
* Call Business Logic layer
* Return HTTP responses
* Handle errors

**Must NOT**:

* Write SQL queries
* Implement business rules

---

### 2. Business Logic Layer

**Responsibilities**:

* Validate input data
* Enforce business rules
* Perform calculations
* Coordinate with repositories

**Business Rules**:

* Name, price, and category are required
* Price must be greater than 0
* Stock must not be negative
* totalValue = Σ(price × stock)

**Must NOT**:

* Handle HTTP requests/responses
* Execute SQL directly

---

### 3. Data Access Layer

**Responsibilities**:

* Manage database connections
* Execute CRUD operations
* Map database rows to objects

**Must NOT**:

* Contain business logic
* Perform validation

---

## Data Flow Example: Create Product

```
Client
  → Controller
    → Service
      → Repository
        → Database
        ←
      ←
    ←
  ← Response (201 Created)
```

**Steps**:

1. Client sends POST /api/products
2. Controller parses request and calls Service
3. Service validates data and applies business rules
4. Repository executes INSERT SQL
5. Database stores data
6. Created product returned to client

---

## Summary

**Architecture Benefits**:

* Clear separation of concerns
* Easy maintenance and refactoring
* Improved testability
* Scalable structure

**Key Principles**:

* Each layer has a single responsibility
* Dependencies flow downward
* No layer skipping
* Business rules live in the Business Logic layer
