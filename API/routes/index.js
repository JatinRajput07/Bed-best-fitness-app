const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin/adminRoutes');
const apiRoutes = require('./users/apiRoutes');
const Cms = require('../models/Cms');

router.use('/admin', adminRoutes);
router.use('/api', apiRoutes);
router.use('/page/:title', async (req, res) => {
    try {
        let page = await Cms.findOne({ title: req.params.title })
        if (page.title === "privacy-policy") page.title = "Privacy Policy"
        if (page.title === "terms-condition") page.title = "Terms & Conditions"
        if(page.title === "community_guidelines") page.title = "Community Guidelines"
        return res.render('page', {
            page
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;


