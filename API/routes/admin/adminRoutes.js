const express = require('express');
const { uploadFiles } = require('../../controllers/userController');
const { getUserList, getCms, updateCms, getContactUsList, uploadVideos, getVideos, dashboard, adminLogin, assign, getassign, editassign, deleteassign, createUser, updateUser } = require('../../controllers/adminController');
const router = express.Router();



router.post('/login', adminLogin)

router.get('/dashboard', dashboard)

router.post('/upload-file', uploadFiles)

router.get('/user-list', getUserList)

router.post('/users', createUser)
router.put('/users/:id', updateUser)

router.get('/cms/:title', getCms)
router.patch('/cms/:title', updateCms)
router.get('/contacts', getContactUsList)

router.post('/upload-videos', uploadVideos)
router.get('/video-list/:category', getVideos)


router.post('/assign', assign)
router.get('/assignments', getassign)
router.put('/assign/:id', editassign)
router.delete('/assign/:id', deleteassign)


module.exports = router;