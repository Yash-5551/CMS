const Company = require('../models/company.model');
const User = require('../models/user.model');

// Create a new company and its admin
exports.createCompany = async (req, res) => {
    const { companyName, companyAddress,companyContact, companyService_plan, adminName, adminEmail, adminPassword } = req.body;

    try {
        // Create the company
        const company = new Company({ name: companyName, address: companyAddress, contact: companyContact, service_plan: companyService_plan});
        await company.save();

        // Create the admin user
        const adminUser = new User({
            name: adminName,
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            company: company._id
        });
        await adminUser.save();

        // Generate JWT token for admin
        const token = adminUser.generateAuthToken();
    
        res.status(201).json({ token, message: 'Company and admin created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
