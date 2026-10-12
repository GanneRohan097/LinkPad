const express = require('express')

const router = express.Router()
const {createUser,loginuser,me} = require("../controllers/authController")
const authMiddleware = require('../middlewares/authMiddleware')
router.post("/registration",createUser)
router.post("/login",loginuser)

router.get("/me",authMiddleware,me)

module.exports = router