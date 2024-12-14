const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    path: String,
    title: String,
    category: String,
    filetype:String,
    thumbnail:String,
    subcategories: String,
    views: { type: Number, default: 0 },
    description: String,
    audioThumbnail:String,
    duration: { type: Number },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);