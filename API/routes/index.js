const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin/adminRoutes');
const apiRoutes = require('./users/apiRoutes');
const userDetailrouting = require('./admin/userDetailrouting');
const Cms = require('../models/Cms');

router.use('/admin', adminRoutes);
router.use('/user', userDetailrouting);
router.use('/api', apiRoutes);
router.use('/page/:title', async (req, res) => {
    try {
        let page = await Cms.findOne({ title: req.params.title })
        if (page.title === "privacy-policy") page.title = "Privacy Policy"
        if (page.title === "terms-condition") page.title = "Terms & Conditions"
        if (page.title === "community_guidelines") page.title = "Community Guidelines"
        if (page.title === "help-and-support") page.title = "Help And Support"
        if (page.title === "delete-account") page.title = "Delete Account"
        return res.render('page', {
            page
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
