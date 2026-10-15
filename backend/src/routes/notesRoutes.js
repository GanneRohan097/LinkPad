const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
router.use(authMiddleware)
const {createNotes,getNotesByUser} = require("../controllers/notesController")

router.post("/create",createNotes)
router.get("/getNotes",getNotesByUser)

module.exports = router
