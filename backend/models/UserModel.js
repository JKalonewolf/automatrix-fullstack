const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Auto-generate userID

const userSchema = new mongoose.Schema({
    userID: { 
        type: String, 
        required: true, 
        unique: true, 
        default: uuidv4 // auto-generate if not provided
    },
    name: { 
        type: String, 
        required: [true, "Name is required"] 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: [true, "Password is required"] 
    },
    role: { 
        type: String, 
        enum: ['admin', 'customer'], // only allow admin or customer
        default: 'customer' 
    },
}, { timestamps: true });

// ✅ Pre-save hook to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ✅ Method to compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// ✅ Export User model
module.exports = mongoose.model('User', userSchema);
