const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const crypto = require('crypto-js');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String },
    googleId: { type: String },
    role: {
        type: String,
        enum: ['admin', 'host', 'user'],
        default: 'user'
    },
    additionalInfo: {
        ADS_id: { type: String },
        address: { type: String },
        batchNo: { type: String },
        joiningDate: { type: Date },
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (planpassword) {
    return await bcrypt.compare(planpassword, this.password);
};

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});


userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.lib.WordArray.random(32).toString();
    console.log(resetToken)
    this.passwordResetToken = crypto.SHA256(resetToken).toString(crypto.enc.Hex);   
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);
