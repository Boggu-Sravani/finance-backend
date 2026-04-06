const Record = require("../models/Record");

exports.getDashboard = async (req, res) => {
    try {
        const totalIncome = await Record.aggregate([
            { $match: { type: "income", user: req.user.id } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpense = await Record.aggregate([
            { $match: { type: "expense", user: req.user.id } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const categoryWise = await Record.aggregate([
            { $match: { user: req.user.id } },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        res.json({
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            balance:
                (totalIncome[0]?.total || 0) -
                (totalExpense[0]?.total || 0),
            categoryWise
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};