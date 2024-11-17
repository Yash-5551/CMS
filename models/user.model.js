const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'courier_manager', 'dispatcher', 'driver'], 
        required: true 
    },
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company' 
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        { _id: this._id, 
          role: this.role, 
          company: this.company
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '10d' }
    );
};

const User = mongoose.model('User', userSchema);
module.exports = User;
