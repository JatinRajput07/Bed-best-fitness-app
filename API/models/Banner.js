
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

bannerSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
