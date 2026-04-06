const express = require("express");
const router = express.Router();

const {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord
} = require("../controllers/recordController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/", auth, role("admin"), createRecord);
router.get("/", auth, role("analyst", "admin"), getRecords);
router.put("/:id", auth, role("admin"), updateRecord);
router.delete("/:id", auth, role("admin"), deleteRecord);

module.exports = router;