const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin/adminRoutes');
const apiRoutes = require('./users/apiRoutes');

router.use('/admin', adminRoutes);
router.use('/api', apiRoutes);

module.exports = router;
