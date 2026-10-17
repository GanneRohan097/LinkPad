
const userService = require("../services/userService");
const devicesService = require("../services/devicesService");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await userService.registration(name, email, password);

    if (result === "User already exists") {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("Registration error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginuser = async (req, res) => {
  const {
    email,
    password,
    deviceName,
    deviceType,
    browser,
    os,
    deviceIdentifier,
  } = req.body;

  try {
    const result = await userService.loginuser(email, password);

    if (deviceName && deviceIdentifier) {
      try {
        await devicesService.registerDevice(
          result.user.id,
          deviceName,
          deviceType,
          browser,
          os,
          deviceIdentifier
        );
      } catch (deviceError) {
        console.error(
          "Device registration error:",
          deviceError.message
        );
      }
    }

    return res.status(200).json({
      message: "Login success",
      user: result,
    });
  } catch (err) {
    console.error("Login error:", err.message);

    return res.status(400).json({
      message: "Login failed",
    });
  }
};

const me = (req, res) => {
  return res.status(200).json({
    success: true,
    userId: req.userId,
  });
};

module.exports = {
  createUser,
  loginuser,
  me,
};
