const express = require('express');
const router = express.Router();
const { updateCourierTracking  } = require('../controllers/drivercontroller');
const { auth } = require('../middleware/authmiddleware');
const { authorizeRoles } = require('../middleware/rolemiddleware');

// Driver can update tracking
router.put('/update/:courierId', auth, authorizeRoles('driver'), updateCourierTracking);

module.exports = router;
