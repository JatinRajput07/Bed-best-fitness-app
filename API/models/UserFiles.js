const mongoose = require('mongoose');

const userFileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  path: String,
  type: String,
}, {
  timestamps: true,
});


module.exports = mongoose.model('UserFiles', userFileSchema);
