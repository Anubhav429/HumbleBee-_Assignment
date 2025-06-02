const express = require('express');
const router = express.Router();
const { addHive, getHives, exportCSV } = require('../controllers/hiveController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, addHive);
router.get('/', authenticate, getHives);
router.get('/export', authenticate, exportCSV);

module.exports = router;
