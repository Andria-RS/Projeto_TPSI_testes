const express = require("express");
const router = express.Router();
const optionController = require("../controllers/optionController");
const { sendEmail } = require('../controllers/emailController');

router.post('/send-email', sendEmail);
module.exports = router;