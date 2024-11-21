const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    path: String,
    title: String,
    category:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videoSchema);
