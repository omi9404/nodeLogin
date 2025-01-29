const express = require("express");
const authController = require('../Controller/auth');
const router = express.Router();
router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/changePassword',authController.changePassword);
router.post('/loginWithOtp',authController.loginWithOtp);
router.post('/editProfile',authController.editProfile);
router.post('/sendOtp',authController.sendOtp);
module.exports = router;