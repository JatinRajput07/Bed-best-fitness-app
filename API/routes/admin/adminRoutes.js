const express = require('express');
const { uploadFiles } = require('../../controllers/userController');
const { getUserList, getCms, updateCms, getContactUsList, uploadVideos, getVideos, dashboard, adminLogin, assign, getassign, editassign, deleteassign, createUser, updateUser, getUserProfile, getVideosByCategoryAndSubcategory, createNutrition, getNutritions, createMeal, getMeals, getUserRoutine, getCategories, createCategory, updateCategory, deleteCategory, createSubCategory, updateSubCategory, deleteSubCategory } = require('../../controllers/adminController');
const router = express.Router();



router.post('/login', adminLogin)

router.get('/dashboard', dashboard)
router.post('/upload-file', uploadFiles)

router.get('/user-list', getUserList)

router.get('/get-user-profile/:id', getUserProfile)
router.post('/users', createUser)
router.put('/users/:id', updateUser)

router.get('/cms/:title', getCms)
router.patch('/cms/:title', updateCms)
router.get('/contacts', getContactUsList)

router.post('/upload-videos', uploadVideos)
router.get('/video-list', getVideos)
router.get('/video-list-byCategory/:category', getVideosByCategoryAndSubcategory)


router.post('/assign', assign)
router.get('/assignments', getassign)
router.put('/assign/:id', editassign)
router.delete('/assign/:id', deleteassign)


router.post('/nutrition', createNutrition); // Create a new nutrition

router.post('/meal', createMeal);
router.get('/meal', getMeals);
router.get('/nutrition', getNutritions);


router.get('/user-daily-report/:userId', getUserRoutine);


// Category Routes
router
    .route("/categories")
    .get(getCategories)
    .post(createCategory);

router
    .route("/categories/:id")
    .patch(updateCategory)
    .delete(deleteCategory);

// SubCategory Routes
router
    .route("/subcategories")
    .post(createSubCategory);

router
    .route("/subcategories/:id")
    .patch(updateSubCategory)
    .delete(deleteSubCategory);


module.exports = router;