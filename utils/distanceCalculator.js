'use strict';

const EARTH_RADIUS_KM = 6371;

/**
 * Convert degrees to radians.
 * @param {number} degrees
 * @returns {number}
 */
const toRadians = (degrees) => (degrees * Math.PI) / 180;

/**
 * Calculate the great-circle distance between two coordinates
 * using the Haversine formula.
 *
 * @param {number} lat1  - Latitude of point A  (decimal degrees)
 * @param {number} lon1  - Longitude of point A (decimal degrees)
 * @param {number} lat2  - Latitude of point B  (decimal degrees)
 * @param {number} lon2  - Longitude of point B (decimal degrees)
 * @returns {number}     Distance in kilometres (rounded to 2 decimal places)
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS_KM * c;

  return Math.round(distance * 100) / 100; // 2 decimal places
};

module.exports = { calculateDistance };
