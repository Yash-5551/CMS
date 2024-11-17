const express = require('express');
const router = express.Router();
const { assignCourierToDriver  } = require('../controllers/dispatchercontroller');
const { auth } = require('../middleware/authmiddleware');
const { authorizeRoles } = require('../middleware/rolemiddleware');

// Driver can update tracking
router.post('/assign/:courierId', auth, authorizeRoles('dispatcher'), assignCourierToDriver);

module.exports = router;
