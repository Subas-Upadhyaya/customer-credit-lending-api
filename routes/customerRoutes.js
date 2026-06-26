const express = require("express");
const router = express.Router();

const {
    createCustomer,
    updateCreditScore,
    getCreditProfile
} = require("../controllers/customerController");

// POST /customers
router.post("/customers", createCustomer);

router.post("/customers/:id/credit-score", updateCreditScore);

router.get("/customers/:id/credit-profile", getCreditProfile);

module.exports = router;