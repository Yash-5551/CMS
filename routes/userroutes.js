const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser } = require('../controllers/usercontroller');
const { auth } = require('../middleware/authmiddleware');
const { authorizeRoles } = require('../middleware/rolemiddleware');

router.post('/', auth, authorizeRoles('admin'), createUser);
router.put('/:userId', auth, authorizeRoles('admin'), updateUser);
router.delete('/:userId', auth, authorizeRoles('admin'), deleteUser);

module.exports = router;
