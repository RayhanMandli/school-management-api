# 🏫 School Management API

A production-ready **REST API** built with **Node.js**, **Express.js**, and **MySQL** that allows you to add schools and retrieve them sorted by proximity to a user-specified location using the **Haversine formula**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [MySQL Setup](#mysql-setup)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Example Requests & Responses](#example-requests--responses)
- [Deployment](#deployment)

---

## Overview

The **School Management API** exposes two primary REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/addSchool` | Add a new school |
| `GET` | `/listSchools` | Get all schools sorted by proximity |

---

## ✨ Features

- ✅ Add schools with full validation (name, address, lat/lon)
- ✅ List all schools sorted nearest-first using the **Haversine formula**
- ✅ MySQL connection **pooling** for scalability
- ✅ Auto-creates the `schools` table on startup
- ✅ Centralized error handling
- ✅ Input validation via `express-validator`
- ✅ CORS enabled for cross-origin access
- ✅ Environment-based configuration via `dotenv`
- ✅ Production-ready structure: controllers, routes, middleware, utils

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js (≥ 18) | Runtime |
| Express.js 4 | Web framework |
| MySQL 8 | Database |
| mysql2 | MySQL client with pool support |
| express-validator | Request validation |
| dotenv | Environment variables |
| cors | Cross-origin resource sharing |
| nodemon | Dev auto-reload |

---

## 📁 Project Structure

```
school-management-api/
│
├── config/
│   └── db.js                 # MySQL pool + auto table creation
│
├── controllers/
│   └── schoolController.js   # addSchool & listSchools logic
│
├── routes/
│   └── schoolRoutes.js       # Express router
│
├── middleware/
│   └── validation.js         # express-validator rules
│
├── utils/
│   └── distanceCalculator.js # Haversine formula
│
├── .env.example              # Environment variable template
├── .gitignore
├── app.js                    # App entry point
├── package.json
├── schema.sql                # MySQL schema + seed data
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MySQL](https://dev.mysql.com/downloads/) v8 or higher
- npm (bundled with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

### 2. Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment (`development` / `production`) | `development` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | *(empty)* |
| `DB_NAME` | Database name | `school_management` |

---

## 🗄 MySQL Setup

### Option A — Automatic (Recommended)

The app automatically creates the `schools` table on startup. You only need to create the database:

```sql
CREATE DATABASE IF NOT EXISTS school_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### Option B — Full Schema Import

```bash
mysql -u root -p < schema.sql
```

This runs `schema.sql` which creates the database, table, and optional seed data.

---

## 🏃 Running Locally

### Development (with auto-reload)

```bash
npm run dev
```

### Production

```bash
npm start
```

You should see:

```
✅  MySQL connected successfully.
✅  `schools` table verified / created.

╔══════════════════════════════════════════╗
║      School Management API  v1.0.0       ║
╠══════════════════════════════════════════╣
║  🚀  Server   : http://localhost:3000    ║
║  🌍  Env      : development              ║
╚══════════════════════════════════════════╝
```

---

## 📡 API Endpoints

### `GET /` — Health Check

**Response:**
```json
{
  "success": true,
  "message": "School Management API is running.",
  "version": "1.0.0",
  "timestamp": "2026-05-08T14:00:00.000Z"
}
```

---

### `POST /addSchool` — Add School

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "ABC School",
  "address": "Rajkot, Gujarat",
  "latitude": 22.3039,
  "longitude": 70.8022
}
```

**Success Response `201`:**
```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "ABC School",
    "address": "Rajkot, Gujarat",
    "latitude": 22.3039,
    "longitude": 70.8022
  }
}
```

**Validation Error Response `422`:**
```json
{
  "success": false,
  "message": "Validation failed. Please check your input.",
  "errors": [
    { "field": "latitude", "message": "Latitude must be a number between -90 and 90." }
  ]
}
```

---

### `GET /listSchools?latitude=22.3&longitude=70.8` — List Schools

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `latitude` | float | ✅ | User's latitude (-90 to 90) |
| `longitude` | float | ✅ | User's longitude (-180 to 180) |

**Success Response `200`:**
```json
{
  "success": true,
  "message": "3 school(s) found, sorted by proximity.",
  "userLocation": {
    "latitude": 22.3,
    "longitude": 70.8
  },
  "data": [
    {
      "id": 1,
      "name": "ABC School",
      "address": "Rajkot, Gujarat",
      "latitude": 22.3039,
      "longitude": 70.8022,
      "distance": 0.48
    },
    {
      "id": 3,
      "name": "Sunrise High",
      "address": "Ahmedabad, Gujarat",
      "latitude": 23.0225,
      "longitude": 72.5714,
      "distance": 194.32
    }
  ]
}
```

## 📝 License

MIT © 2026
