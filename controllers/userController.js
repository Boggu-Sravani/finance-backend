const User = require("../models/User");

// 🔹 Get all users
exports.getUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
};

// 🔹 Update user role
exports.updateUserRole = async (req, res) => {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
    );

    res.json(user);
};

// 🔹 Activate / Deactivate user
exports.updateUserStatus = async (req, res) => {
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive },
        { new: true }
    );

    res.json(user);
};