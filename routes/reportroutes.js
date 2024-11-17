const express = require('express');
const router = express.Router();
const { generateReport } = require('../controllers/reportcontroller');
const { auth } = require('../middleware/authmiddleware');
const { authorizeRoles } = require('../middleware/rolemiddleware');

router.get('/reportgen', auth, authorizeRoles('admin'), generateReport);

module.exports = router;
