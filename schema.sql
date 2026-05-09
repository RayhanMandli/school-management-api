-- ============================================================
--  School Management API  —  MySQL Schema
-- ============================================================

-- 1. Create database (run this once)
CREATE DATABASE IF NOT EXISTS school_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE school_management;

-- 2. Schools table
CREATE TABLE IF NOT EXISTS schools (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) NOT NULL,
  address    VARCHAR(500) NOT NULL,
  latitude   FLOAT        NOT NULL,
  longitude  FLOAT        NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. (Optional) Seed data for quick testing
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('ABC School',    'Rajkot, Gujarat',       22.3039,  70.8022),
  ('XYZ Academy',   'Surat, Gujarat',        21.1702,  72.8311),
  ('Sunrise High',  'Ahmedabad, Gujarat',    23.0225,  72.5714),
  ('Green Valley',  'Vadodara, Gujarat',     22.3072,  73.1812),
  ('Blue Ridge',    'Bhavnagar, Gujarat',    21.7645,  72.1519);
