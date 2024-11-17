const {Courier} = require('../models/courier.model');
const{CourierTracking} = require('../models/couriertracking.model');

//add courier
exports.addCourier = async (req, res) => {
    const { sender_name,sender_address,sender_contact,recipient_name,recipient_address,recipient_contact,recipient_email,package_weight,package_dimensions,package_type,trackingNumber } = req.body;
    
   /* if (req.user.role !== 'courier_manager','admin')*/if (req.user.role !== 'courier_manager' && req.user.role !== 'admin') {
        return res.status(403).json(
            { 
                message: 'Access denieddddd'
            });
    }
    
    const courierExisted= await Courier.findOne({package_weight,package_dimensions,package_type,trackingNumber});
    
    if(courierExisted){
      return res.status(409).json(
          {
              message: "Courier Already exists" 
          }
      )
    } 

    const courier =  new Courier({
        sender_name,
        sender_address,
        sender_contact,
        recipient_name,
        recipient_address,
        recipient_contact,
        recipient_email,
        package_weight,
        package_dimensions,
        package_type,
        trackingNumber,
        company: req.user.company,
    });
    await courier.save();
    res.status(201).json({ message: 'courier added successfully'});
};


//update courier
exports.updateCourier = async (req, res) => {
    const { courierId } = req.params;
    const { recipient_address } = req.body;

    /*if (req.user.role !== 'courier_manager')*/ if (req.user.role !== 'courier_manager' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const courier = await Courier.findByIdAndUpdate(courierId, { recipient_address }, { new: true });

    if (!courier) {
        return res.status(404).json({ message: 'Courier not found' });
    }

    courier.updatedAt = Date.now();

    await courier.save();

    res.status(200).json({ message: 'Courier updated successfully' });

};


// Create Courier Tracking 
exports.createCourierTracking = async (req, res) => {
    try {
        const { courierId, location, status } = req.body;
        
        if (req.user.role !== 'courier_manager')
            return res.status(403).json(
                { 
                    message: 'Access denieddddd'
                });
        //  courier exists
        const courier = await Courier.findById(courierId);
        if (!courier) {
            return res.status(404).json({ message: 'Courier not found' });
        }

        // Create a new tracking 
        const newTracking = new CourierTracking({
            courierId,
            location,
            status,
            updatedBy: req.user._id
        });

        await newTracking.save();
        res.status(201).json({ message: 'Courier tracking created successfully', newTracking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};