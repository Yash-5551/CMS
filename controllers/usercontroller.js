const User = require('../models/user.model');

// Create new user (admin only)
exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const user = new User({
        name,
        email,
        password,
        role,
        company: req.user.company
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
};

// Update user (admin only)
exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, role } = req.body;

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findByIdAndUpdate(userId, { name, email, role }, { new: true });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
};
