
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  registerDevice,
  getUserDevices,
  updateDeviceActivity,
} = require("../controllers/devicesController");

router.use(authMiddleware);

router.post("/register", registerDevice);
router.get("/", getUserDevices);
router.patch("/activity", updateDeviceActivity);

module.exports = router;
