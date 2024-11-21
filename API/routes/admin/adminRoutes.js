const express = require('express');
const { uploadFiles } = require('../../controllers/userController');
const { getUserList, getCms, updateCms, getContactUsList, uploadVideos, getVideos } = require('../../controllers/adminController');
const router = express.Router();


router.post('/upload-file', uploadFiles)
router.get('/user-list', getUserList)

router.get('/cms/:title', getCms)
router.patch('/cms/:title', updateCms)
router.get('/contacts', getContactUsList)


router.post('/upload-videos', uploadVideos)
router.get('/video-list/:category', getVideos)

module.exports = router;