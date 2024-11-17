const mongoose  = require('mongoose');
const Company = require('./company.model');


const courierSchema =  new mongoose.Schema({
    sender_name:{
        type: String,
        required: true 
    },
    sender_address: { 
        type: String, 
        required: true 

    },
    sender_contact: { 
        type: Number, 
        required: true 

    },
    recipient_name: { 
        type: String, 
        required: true 

    },
    recipient_address: { 
        type: String,
        required: true 

    },
    recipient_contact: { 
        type: Number,
        required: true 
    },
    recipient_email: { 
        type: String,
        required: true 

    },
    package_weight:{ 
        type: Number, 
        required: true 
    },
    package_dimensions: { 
        type: String 
    },
    package_type: { 
        type: String 
    },
    trackingNumber: {
        type: String,
        required: true,
        unique: true 
    },
    courierStatus: {
        type: String,
        enum: ['pending', 'dispatched', 'in_transit', 'delivered', 'failed'],
        default: 'pending'
    },
    deliveryTime: {
        type: Date
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    }

},{timesstamps: true})

const Courier = mongoose.model('Courier', courierSchema);
module.exports = {Courier};