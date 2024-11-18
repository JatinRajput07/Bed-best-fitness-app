const express = require('express');
const { uploadFiles } = require('../../controllers/userController');
const { getUserList, getCms, updateCms, getContactUsList } = require('../../controllers/adminController');
const router = express.Router();


router.post('/upload-file', uploadFiles)
router.get('/user-list', getUserList)

router.get('/cms/:title', getCms)
router.patch('/cms/:title', updateCms)
router.get('/contacts', getContactUsList)

module.exports = router;