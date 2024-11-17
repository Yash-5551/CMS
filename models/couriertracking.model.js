const mongoose = require('mongoose');

const courierTrackingSchema = new mongoose.Schema({
    courierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courier',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'dispatched', 'in_transit', 'delivered', 'cancelled'],
        default: 'pending',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the Driver or Courier Manager updating the status
        required: true
    }
});

const CourierTracking = mongoose.model('CourierTracking', courierTrackingSchema);
module.exports = {CourierTracking};
