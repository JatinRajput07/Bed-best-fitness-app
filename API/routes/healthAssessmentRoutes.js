const express = require('express');
const router = express.Router();
const healthAssessmentController = require('../controllers/healthAssessmentController');
const Auth = require('../middleware/Auth');

router.post(
  "/health-assessments",
  Auth,
  healthAssessmentController.createFormData
);
router.get(
  '/health-assessments',
  Auth,
  healthAssessmentController.getFormData
);
router.get('/health-assessments/:id', healthAssessmentController.getFormDataById);

module.exports = router;