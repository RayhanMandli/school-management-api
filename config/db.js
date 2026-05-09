'use strict';

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool for better performance and scalability
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// SQL to create the schools table if it does not exist
const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS schools (
    id         INT          NOT NULL AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    address    VARCHAR(500) NOT NULL,
    latitude   FLOAT        NOT NULL,
    longitude  FLOAT        NOT NULL,
    created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

/**
 * Initialise the database:
 *  1. Verify the pool can connect.
 *  2. Auto-create the `schools` table if it is missing.
 */
const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅  MySQL connected successfully.');

    await connection.query(CREATE_TABLE_SQL);
    console.log('✅  `schools` table verified / created.');
    console.log("Connected DB Host:", process.env.DB_HOST);
console.log("Connected DB Name:", process.env.DB_NAME);
    connection.release();
  } catch (error) {
    console.error('❌  Database initialisation failed:', error.message);
    process.exit(1); // Hard stop — app cannot run without a DB
  }
};

module.exports = { pool, initDB };
