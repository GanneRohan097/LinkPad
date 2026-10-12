const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const dir = path.join(__dirname, "../../uploads");
fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) =>
    cb(null, crypto.randomUUID() + path.extname(file.originalname)),
});

module.exports = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });