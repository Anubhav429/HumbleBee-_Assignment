const express = require('express');
const router = express.Router();
const { addCrop, getNearbyCrops } = require('../controllers/cropController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, addCrop);
router.get('/nearby', authenticate, getNearbyCrops);

module.exports = router;
