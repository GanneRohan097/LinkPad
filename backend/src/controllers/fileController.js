const fileService = require("../services/fileService");
const fs = require("fs/promises");
const path = require("path");
const upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  try {
    const data = await fileService.uploadFile(req.userId, req.file);
    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const list = async (req, res) => {
  try {
    const data = await fileService.listFiles(req.userId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const download = async (req, res) => {
  try {
    const file = await fileService.downloadFile(
      req.userId,
      req.params.id
    );

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    res.download(file.file_path, file.original_name, (err) => {
      if (err && !res.headersSent) {
        console.error(err);
        res.status(500).json({
          success: false,
          message: "File download failed",
        });
      }
    });
  } catch (err) {
    console.error(err);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
const remove = async (req, res) => {
  try {
    const file = await fileService.deleteFile(
      req.userId,
      req.params.id
    );

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const filePath = path.resolve(file.file_path);
    const uploadDir = path.resolve(__dirname, "../../uploads");

    if (path.dirname(filePath) !== uploadDir) {
      return res.status(400).json({
        success: false,
        message: "Invalid file path",
      });
    }

    await fs.unlink(filePath).catch((err) => {
      if (err.code !== "ENOENT") throw err;
    });

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "File deletion failed",
    });
  }
};
const getStorageUsage = async (req, res) => {
  try {
    const usage = await fileService.getStorageUsage(req.userId);

    return res.status(200).json({
      success: true,
      data: {
        usedBytes: Number(usage.used_bytes),
        totalFiles: Number(usage.total_files),
      },
    });
  } catch (error) {
    console.error("Get storage usage error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch storage usage",
    });
  }
};

module.exports = { upload, list, download,remove,getStorageUsage };