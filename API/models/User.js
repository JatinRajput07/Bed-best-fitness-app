const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const crypto = require('crypto-js');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, default: "" },
    phone: { type: String},
    socialId: String,
    socialType: String,   // google , facebook
    password: { type: String },
    googleId: { type: String },
    Occupation: { type: String, required: false, },
    BusinessAddress: { type: String, required: false, },
    City: { type: String, required: false, },
    State: { type: String, required: false, },
    Country: { type: String, required: false, },
    Nationality: { type: String, required: false, },
    ABHA_No: { type: String, unique: false, sparse: true, },
    AadharNo: { type: String, unique: false, sparse: true, minlength: 12, maxlength: 12, },
    SOS_Contact_No: { type: String, required: false, },
    RelationWithSOS: { type: String, required: false, },
    AlternativeContactNo: { type: String, required: false, },
    HealthInsuranceNo: { type: String, required: false, },
    HealthInsuranceCompany: { type: String, required: false, },
    OfficeAddress: { type: String, required: false, },
    Gender: { type: String,  required: false, },
    DOB: { type: Date, required: false, },
    Goal: { type: String, required: false, },
    ReferBy: { type: String, required: false, },
    Height:{ type: String, required: false},
    Weight:{ type: String, required: false },
    OritationDate: { type: Date, required: false, },
    FirstReportDate: { type: Date, required: false, },
    JourneyStartDate: { type: Date, required: false, },
    FavouriteAuthor: { type: String, required: false, },
    role: { type: String, enum: ['admin', 'host', 'user'], default: 'user' },
    additionalInfo: {
        ADS_id: { type: String },
        address: { type: String },
        batchNo: { type: String },
        joiningDate: { type: Date },
    },
    active: { type: Boolean, default: true, select: false },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    socketId: String,
    isOnline: String,
    profilePicture:String,
    isVerified: { type: Boolean, default: false },
    device_token: String,
    device_type: String,    // 'android'  , 'iso'
    permissions: {
        type: Object,
        default: {}, // Structure: { sectionName: { permission: true/false } }
    },
}, {
    timestamps: true,
});


userSchema.pre('save', async function (next) {
    if (!this.name) {
        this.name = this.email;
    }

    if (!this.isModified('password')) return next();
    console.log(this.password, '==-dd=d=d=d==d=d')
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
    // const resetToken = crypto.lib.WordArray.random(32).toString();
    // console.log(resetToken)
    // this.passwordResetToken = crypto.SHA256(resetToken).toString(crypto.enc.Hex); 
    const resetToken = Math.floor((100000 + Math.random() * 900000));
    this.passwordResetToken = resetToken
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);
