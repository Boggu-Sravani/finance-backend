exports.createRecord = async (req, res) => {
    const record = await Record.create({
        ...req.body,
        user: req.user.id
    });
    res.status(201).json(record);
};

// read
exports.getRecords = async (req, res) => {
    const records = await Record.find({ user: req.user.id });
    res.json(records);
};

// update

exports.updateRecord = async (req, res) => {
    const record = await Record.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(record);
};
// create
exports.deleteRecord = async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
};


//validateRecord
const { validateRecord } = require("../utils/validators");

exports.createRecord = async (req, res) => {
    try {
        const error = validateRecord(req.body);

        if (error) {
            return res.status(400).json({ message: error });
        }

        const record = await Record.create({
            ...req.body,
            user: req.user.id
        });

        res.status(201).json(record);

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};