const mongoose = require('mongoose');

const AsignUserSchema = new mongoose.Schema({
    asign_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Asign_User = mongoose.model('Asign_User', AsignUserSchema);
module.exports = Asign_User;
