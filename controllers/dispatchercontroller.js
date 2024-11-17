const { Courier } = require('../models/courier.model');
const User = require('../models/user.model');

// Assign a courier to a driver
exports.assignCourierToDriver = async (req, res) => {
    const { courierId } = req.params;
    const { driverId } = req.body;

    if (req.user.role !== 'dispatcher')
        return res.status(403).json(
            { 
                message: 'Access denieddddd'
            });
    try {
        const courier = await Courier.findById(courierId);
        if (!courier) {
            return res.status(404).json({ message: 'Courier not found' });
        }

        const driver = await User.findById(driverId);
        if (!driver || driver.role !== 'driver') {
            return res.status(404).json({ message: 'Driver not found or not a valid driver' });
        }

        courier.assignedDriver = driverId;
        await courier.save();

        res.status(200).json({ message: 'Courier assigned to driver successfully', courier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};