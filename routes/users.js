const express = require("express");
const router = express.Router();

const {
    getUsers,
    updateUserRole,
    updateUserStatus
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// only admin can manage users
router.get("/", auth, role("admin"), getUsers);

router.put("/:id/role", auth, role("admin"), updateUserRole);

router.put("/:id/status", auth, role("admin"), updateUserStatus);

module.exports = router;