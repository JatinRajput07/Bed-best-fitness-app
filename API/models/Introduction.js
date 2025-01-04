const mongoose = require('mongoose');

const IntroductionSchema = new mongoose.Schema({
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

IntroductionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Introduction = mongoose.model('Introduction', IntroductionSchema);

module.exports = Introduction;
