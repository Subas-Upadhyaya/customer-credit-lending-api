const express = require("express");
const router = express.Router();

const {
    addCreditGap,
    resolveCreditGap
} = require("../controllers/creditGapController");

// Add Credit Gap
router.post("/customers/:id/credit-gaps", addCreditGap);

router.patch("/credit-gaps/:id/resolve", resolveCreditGap);

module.exports = router;