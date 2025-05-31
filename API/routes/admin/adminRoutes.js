const express = require("express");
const {
  getUserList,
  getCms,
  updateCms,
  getContactUsList,
  uploadVideos,
  getVideos,
  dashboard,
  adminLogin,
  assign,
  getassign,
  editassign,
  deleteassign,
  createUser,
  updateUser,
  getUserProfile,
  getVideosByCategoryAndSubcategory,
  createNutrition,
  getNutritions,
  createMeal,
  getMeals,
  getUserRoutine,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteUser,
  createBanner,
  getUserRecomenedVideo,
  getAllUserReminders,
  deleteVideo,
  getHealthOtherdata,
  getGoalAnalytics,
  createMeeting,
  getMeeting,
  getBanners,
  deleteBanner,
  toggleBannerStatus,
  getuserAndCoachStats,
  updateNutrition,
  deleteNutrition,
  deleteMeal,
  updateMeal,
  updateMeeting,
  deleteMeeting,
  addHighlight,
  getHighlights,
  deleteHighlight,
  createIntroduction,
  getIntroductions,
  toggleIntroductionStatus,
  deleteIntroduction,
  unique_categories,
  unique_filetypes,
  assignImageUpdate,
} = require("../../controllers/adminController");
const { uploadFiles, getUserRecommendations, getVideoRecommendations, deleteVideoRecommendation } = require("../../controllers/userController");
const {
  createInventory,
  getInventory,
  deleteInventory
} = require("../../controllers/InventoryController");
const Auth = require("../../middleware/Auth");
const { deleteUserUploadFiles } = require("../../controllers/adminUserDetail");
const router = express.Router();

router.post("/login", adminLogin);

router.get("/dashboard", Auth, dashboard);
router.get("/getGoalAnalytics", getGoalAnalytics);
router.get("/getuserAndCoachStats", getuserAndCoachStats);
getuserAndCoachStats;

router.post("/upload-file", uploadFiles);

router.get("/user-list", Auth, getUserList);
router.delete("/user-delete/:id", deleteUser);

router.get("/get-user-profile/:id", getUserProfile);
router.post("/users", createUser);
router.put("/users/:id", updateUser);

router.get("/cms/:title", getCms);
router.patch("/cms/:title", updateCms);
router.get("/contacts", getContactUsList);

router.post("/upload-videos", uploadVideos);
router.get("/video-list", getVideos);
router.get(
  "/video-list-byCategory/:category",
  getVideosByCategoryAndSubcategory
);
router.delete("/video-list/:id", deleteVideo);

router.post("/assign", assign);
router.get("/assignments", getassign);
router.put("/assign/:id", editassign);
router.delete("/assign/:id", deleteassign);
router.patch("/assign-image/:id", assignImageUpdate);

router.post("/meal", Auth, createMeal);
router.get("/meal", Auth, getMeals);
router.put("/meal/:mealId", Auth, updateMeal);
router.delete("/meal/:mealId", Auth, deleteMeal);

router.post("/nutrition", Auth, createNutrition); // Create a new nutrition
router.get("/nutrition", Auth, getNutritions);
router.put("/nutrition/:id", Auth, updateNutrition);
router.delete("/nutrition/:id", Auth, deleteNutrition);

router.get("/user-daily-report/:userId", getUserRoutine);

// router.post('/create_banner', createBanner);

router.post("/highlights", addHighlight);
router.get("/highlights", getHighlights);
router.delete("/highlights/:id", deleteHighlight);

router.delete(
  "/user-upload-file/:id/delete_blood_report",
  deleteUserUploadFiles
);

// Category Routes
router.route("/categories").get(getCategories).post(createCategory);

router.route("/categories/:id").patch(updateCategory).delete(deleteCategory);

router.route("/subcategories").post(createSubCategory);

router
  .route("/subcategories/:id")
  .patch(updateSubCategory)
  .delete(deleteSubCategory);

router.get("/getUserRecomenedVideo/:id", getUserRecomenedVideo);
router.get("/user/reminders/:id", getAllUserReminders);

router.get("/getHealthHabits/:id", getHealthOtherdata);

router.post("/createMeeting", createMeeting);
router.get("/getMeeting", getMeeting);
router.put("/updateMeeting/:id", updateMeeting);
router.delete("/deleteMeeting/:id", deleteMeeting);

router.post("/banner", createBanner);
router.get("/banner", getBanners);
router.delete("/banner/:bannerId", deleteBanner);
router.patch("/banner/:bannerId/status", toggleBannerStatus);

router.post("/introduction", createIntroduction);
router.get("/introduction", getIntroductions);
router.delete("/introduction/:introductionId", deleteIntroduction);
router.patch("/introduction/:introductionId/status", toggleIntroductionStatus);

router.get("/inventory/:userId", Auth, getInventory);
router.delete("/inventory/delete/:id", Auth, deleteInventory);
router.post("/inventory/add", Auth, createInventory);
router.get("/recommendations", Auth, getVideoRecommendations);
router.delete('/video-recommendation/:recommendationId', deleteVideoRecommendation);

router.get("/unique-categories", unique_categories);
router.get("/unique-filetypes", unique_filetypes);



module.exports = router;
