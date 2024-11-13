const healthRiskAssessmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assessmentUrl: { type: String, required: true }, // URL to Google Form
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('HealthRiskAssessment', healthRiskAssessmentSchema);
