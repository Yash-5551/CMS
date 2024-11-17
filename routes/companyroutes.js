const express = require('express');
const router = express.Router();
const { createCompany } = require('../controllers/companycontroller');

router.post('/create', createCompany);

module.exports = router;
