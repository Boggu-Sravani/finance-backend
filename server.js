const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recordRoutes = require("./routes/records");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const dashboardRoutes = require("./routes/dashboard");

const app = express(); // ⭐ VERY IMPORTANT

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/financeDB")
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});