const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user-controller');
router.get('/get-all',userControllers.getAll);

router.post('/get',userControllers.getUser);

router.post('/update', userControllers.updateUser);

module.exports = router;
