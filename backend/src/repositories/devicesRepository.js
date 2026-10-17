
const pool = require("../config/database");

const createDevice = async (
  userId,
  deviceName,
  deviceType,
  browser,
  os,
  deviceIdentifier
) => {
  const result = await pool.query(
    `INSERT INTO devices (
      user_id,
      device_name,
      device_type,
      browser,
      os,
      device_identifier,
      last_active
    )
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, device_identifier)
    DO UPDATE SET
      device_name = EXCLUDED.device_name,
      device_type = EXCLUDED.device_type,
      browser = EXCLUDED.browser,
      os = EXCLUDED.os,
      last_active = CURRENT_TIMESTAMP
    RETURNING *`,
    [userId, deviceName, deviceType, browser, os, deviceIdentifier]
  );

  return result.rows[0];
};


const getDevicesByUser = async (userId) => {
  const result = await pool.query(
    `SELECT id, device_name, device_type, browser, os,
            last_active, created_at
     FROM devices
     WHERE user_id = $1
     ORDER BY last_active DESC`,
    [userId]
  );

  return result.rows;
};

const updateDeviceActivity = async (userId, deviceId) => {
  const result = await pool.query(
    `UPDATE devices
     SET last_active = CURRENT_TIMESTAMP
     WHERE user_id = $1 AND id = $2
     RETURNING *`,
    [userId, deviceId]
  );

  return result.rows[0];
};

module.exports = {
  createDevice,
  getDevicesByUser,
  updateDeviceActivity,
};
