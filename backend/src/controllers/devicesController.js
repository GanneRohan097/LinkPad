
const devicesService = require("../services/devicesService");

const registerDevice = async (req, res) => {
  try {
    const { deviceName, deviceType, browser, os } = req.body;

    if (!deviceName) {
      return res.status(400).json({
        success: false,
        message: "Device name is required",
      });
    }

    const device = await devicesService.registerDevice(
      req.userId,
      deviceName,
      deviceType,
      browser,
      os
    );

    return res.status(201).json({
      success: true,
      message: "Device registered successfully",
      device,
    });
  } catch (error) {
    console.error("Register device error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to register device",
    });
  }
};

const getUserDevices = async (req, res) => {
  try {
    const devices = await devicesService.getUserDevices(req.userId);

    return res.status(200).json({
      success: true,
      devices,
    });
  } catch (error) {
    console.error("Get devices error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch devices",
    });
  }
};
const updateDeviceActivity = async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "Device ID is required",
      });
    }

    const device = await devicesService.updateDeviceActivity(
      req.userId,
      deviceId
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Device activity updated",
      device,
    });
  } catch (error) {
    console.error("Update device activity error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update device activity",
    });
  }
};

module.exports = {
  registerDevice,
  getUserDevices,
  updateDeviceActivity
};
