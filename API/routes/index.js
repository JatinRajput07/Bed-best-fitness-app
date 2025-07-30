const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin/adminRoutes');
const apiRoutes = require('./users/apiRoutes');
const healthAssessmentRoutes = require('./healthAssessmentRoutes');
const userDetailrouting = require('./admin/userDetailrouting');
const Cms = require('../models/Cms');

router.use('/admin', adminRoutes);
router.use('/user', userDetailrouting);
router.use('/api', apiRoutes);
router.use('/hra', healthAssessmentRoutes);

router.use('/page/:title', async (req, res) => {
    try {
        let page = await Cms.findOne({ title: req.params.title });
        if (!page) {
            return res.status(404).render('error', { message: 'Page not found' });
        }
        if (page.title === "privacy-policy") page.title = "Privacy Policy";
        if (page.title === "terms-condition") page.title = "Terms & Conditions";
        if (page.title === "community_guidelines") page.title = "Community Guidelines";
        if (page.title === "help-and-support") page.title = "Help & Support";
        if (page.title === "delete-account") page.title = "Delete Account";
        if (page.title === "privacy-policy-coach") page.title = "Coach Privacy Policy";
        return res.render('page', { page });
    } catch (error) {
        console.error(error);
        return res.status(500).render('error', { message: 'Server error' });
    }
});

module.exports = router;
