const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true }, // URL to the image
    caption: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
