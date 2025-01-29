const express = require("express");
const authController = require('../Controller/auth');
const router = express.Router();
router.post('/register',authController.register);

module.exports = router;