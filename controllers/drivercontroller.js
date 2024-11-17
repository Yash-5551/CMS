const {CourierTracking} = require('../models/couriertracking.model');

// Update Courier Tracking (Driver only)
exports.updateCourierTracking = async (req, res) => {
    try {
        const {  courierId } = req.params;
        const { status, location } = req.body;

        if (req.user.role !== 'driver')
            return res.status(403).json(
                { 
                    message: 'Access denieddddd'
                });
        // Find the tracking record
        const courier = await CourierTracking.findByIdAndUpdate(courierId, { status, location  }, { new: true });
        if (!courier) {
            return res.status(404).json({ message: 'Tracking record not found' });
        }

        // Update status and location
        courier.status = status || courier.status;
        courier.location = location || courier.location;
        courier.timestamp = Date.now();
        courier.updatedBy = req.user._id;

        await courier.save();
        res.status(200).json({ message: 'Tracking updated successfully', courier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
