const express = require ('express');

const smsController = require("../controllers/sms.js")

const router = express.Router();

router.post('/send-sms-all/', smsController.sendSmsAll )

router.post('/send-sms/', smsController.sendSms )

module.exports = router;