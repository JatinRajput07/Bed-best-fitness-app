const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    path: String,
    title: String,
    category: String,
    subcategories: String,
    views: { type: Number, default: 0 },
    duration: { type: Number },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);