const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        const decoded = jwt.verify(token, "secretkey");

        const user = await User.findById(decoded.id).select("-password");

        if (!user || !user.isActive) {
            return res.status(403).json({ message: "User not active" });
        }

        req.user = user; // ⭐ VERY IMPORTANT
        next();

    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};