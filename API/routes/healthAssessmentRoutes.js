const express = require('express');
const router = express.Router();
const healthAssessmentController = require('../controllers/healthAssessmentController');

router.post('/health-assessments', healthAssessmentController.createFormData);
router.get('/health-assessments', healthAssessmentController.getFormData);
router.get('/health-assessments/:id', healthAssessmentController.getFormDataById);

module.exports = router;