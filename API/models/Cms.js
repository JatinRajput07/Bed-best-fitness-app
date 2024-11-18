const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Cms = mongoose.model('Cms', cmsSchema);

module.exports = Cms;
