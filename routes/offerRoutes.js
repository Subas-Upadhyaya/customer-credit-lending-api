const express = require("express");
const router = express.Router();

const {
    createOffer,
    getOffersByCustomer,
    calculateEMI
} = require("../controllers/offerController");
// Create Offer
router.post("/customers/:id/offers", createOffer);

// Get Offers (NEW)
router.get("/customers/:id/offers", getOffersByCustomer);

router.get("/offers/:id/emi", calculateEMI);

module.exports = router;