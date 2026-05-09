'use strict';

const { pool } = require('../config/db');
const { calculateDistance } = require('../utils/distanceCalculator');

// ─── Add School ───────────────────────────────────────────────────────────────

/**
 * POST /addSchool
 * Inserts a new school record into the database.
 */
const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    const newSchool = {
      id: result.insertId,
      name: name.trim(),
      address: address.trim(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    return res.status(201).json({
      success: true,
      message: 'School added successfully.',
      data: newSchool,
    });
  } catch (error) {
    next(error); // Forward to centralized error handler
  }
};

// ─── List Schools ─────────────────────────────────────────────────────────────

/**
 * GET /listSchools?latitude=xx&longitude=yy
 * Fetches all schools and sorts them by distance from the user's coordinates.
 */
const listSchools = async (req, res, next) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const [rows] = await pool.execute('SELECT id, name, address, latitude, longitude FROM schools');

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No schools found in the database.',
        data: [],
      });
    }

    // Attach distance to each school object, then sort ascending
    const schoolsWithDistance = rows
      .map((school) => ({
        ...school,
        distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      message: `${schoolsWithDistance.length} school(s) found, sorted by proximity.`,
      userLocation: { latitude: userLat, longitude: userLon },
      data: schoolsWithDistance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addSchool, listSchools };
