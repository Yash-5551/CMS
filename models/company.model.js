const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    address: { type: String, 
        required: true 
    },
    service_plan:{
        type:String,
        enum:['basic','premium'],
        default:['basic']
    },
    contact: {
        type:Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
