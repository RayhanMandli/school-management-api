'use strict';

const { body, query, validationResult } = require('express-validator');

// ─── Reusable result handler ──────────────────────────────────────────────────

/**
 * Reads validation errors from express-validator and responds with 422
 * if any exist. Call this as the last item in the validation chain array.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

// ─── addSchool validation rules ───────────────────────────────────────────────

const validateAddSchool = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('School name is required.')
    .isLength({ max: 255 })
    .withMessage('School name must not exceed 255 characters.'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required.')
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters.'),

  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required.')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90.'),

  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required.')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180.'),

  handleValidationErrors,
];

// ─── listSchools validation rules ────────────────────────────────────────────

const validateListSchools = [
  query('latitude')
    .notEmpty()
    .withMessage('Latitude query parameter is required.')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90.'),

  query('longitude')
    .notEmpty()
    .withMessage('Longitude query parameter is required.')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180.'),

  handleValidationErrors,
];

module.exports = { validateAddSchool, validateListSchools };
