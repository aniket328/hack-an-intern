const express = require('express');
const router = express.Router();

const notificationControllers = require('../controllers/notification-controller');
router.get('/get-all',notificationControllers.getAll);
router.post('/add-notification',notificationControllers.addNotification);
module.exports = router;
