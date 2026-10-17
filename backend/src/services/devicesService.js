const devicesRepository = require("../repositories/devicesRepository");

const registerDevice = async (
  userId,
  deviceName,
  deviceType,
  browser,
  os,
  deviceIdentifier
) => {
  return await devicesRepository.createDevice(
    userId,
    deviceName,
    deviceType,
    browser,
    os,
    deviceIdentifier
  );
};

const getUserDevices = async (userId) => {
  return await devicesRepository.getDevicesByUser(userId);
};

const updateDeviceActivity = async (userId, deviceId) => {
  return await devicesRepository.updateDeviceActivity(
    userId,
    deviceId
  );
};

module.exports = {
  registerDevice,
  getUserDevices,
  updateDeviceActivity,
};