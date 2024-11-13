const adminRoutineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminRoutine', adminRoutineSchema);
