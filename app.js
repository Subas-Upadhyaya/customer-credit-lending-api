require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const sequelize = require("./config/db");
const customerRoutes = require("./routes/customerRoutes");

const creditGapRoutes = require("./routes/creditGapRoutes");

const offerRoutes = require("./routes/offerRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

app.use(customerRoutes);

app.use(creditGapRoutes);

app.use(offerRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to SoftLend Backend API"
    });
});

// Connect Database and Start Server
sequelize.authenticate()
    .then(() => {
        console.log("Connected to MySQL Database");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed");
        console.error(err);
    });