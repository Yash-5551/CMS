const express = require('express');
const router = express.Router();
const { addCourier, updateCourier, createCourierTracking } = require('../controllers/managercontroller');
const { auth } = require('../middleware/authmiddleware');
const { authorizeRoles } = require('../middleware/rolemiddleware');

router.post('/', auth, authorizeRoles('courier_manager','admin'), addCourier);
router.put('/:courierId', auth, authorizeRoles('courier_manager','admin'), updateCourier);
router.post('/create', auth, authorizeRoles('courier_manager'), createCourierTracking);

module.exports = router;
