const wellnessContentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['wallpaper', 'quote', 'audio', 'music', 'podcast', 'audiobook'],
        required: true,
    },
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('WellnessContent', wellnessContentSchema);
