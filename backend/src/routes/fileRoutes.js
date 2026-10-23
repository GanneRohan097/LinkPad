const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/upload");
const { upload, list,download,remove,getStorageUsage } = require("../controllers/fileController");

router.use(authMiddleware);

const handleUpload = (req, res, next) => {
  uploadMiddleware.single("file")(req, res, (err) => {
    if (err) {
      const message =
        err.code === "LIMIT_FILE_SIZE" ? "File too large (max 100 MB)" : err.message;
      return res.status(400).json({ success: false, message });
    }
    next();
  });
};

router.post("/", handleUpload, upload);
router.get("/", list);
router.get("/:id/download",download)
router.delete("/:id", remove);
router.get("/storage", getStorageUsage);
module.exports = router;