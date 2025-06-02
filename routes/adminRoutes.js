const express = require('express');
const router = express.Router();
const path = require('path');

// admin dashboard end point 
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin.html'));
});

module.exports = router;
