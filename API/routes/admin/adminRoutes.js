const express = require('express');
const { uploadFiles } = require('../../controllers/userController');
const { getUserList } = require('../../controllers/adminController');
const router = express.Router();


router.post('/upload-file',uploadFiles)
router.get('/user-list',getUserList)

module.exports = router;