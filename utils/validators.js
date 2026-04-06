exports.validateRecord = (data) => {
    const { amount, type, category } = data;

    if (!amount || amount <= 0) {
        return "Amount must be greater than 0";
    }

    if (!["income", "expense"].includes(type)) {
        return "Type must be income or expense";
    }

    if (!category) {
        return "Category is required";
    }

    return null;
};