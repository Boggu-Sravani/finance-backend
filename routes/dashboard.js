const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/", auth, role("analyst", "admin"), getDashboard);

module.exports = router;