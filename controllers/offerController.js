const Offer = require("../models/Offer");
const Customer = require("../models/Customer");

// Create Offer
const createOffer = async (req, res) => {
    try {

        const customerId = req.params.id;

        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).json({
                error: "Customer not found",
                code: "CUSTOMER_NOT_FOUND"
            });
        }

        const {
            lender_name,
            loan_amount,
            interest_rate,
            tenure_months,
            min_cibil_score
        } = req.body;

        const offer = await Offer.create({
            customer_id: customerId,
            lender_name,
            loan_amount,
            interest_rate,
            tenure_months,
            min_cibil_score,
            status: "locked"
        });

        return res.status(201).json({
            id: offer.id,
            lender_name: offer.lender_name,
            amount: offer.loan_amount,
            interest_rate: offer.interest_rate,
            tenure_months: offer.tenure_months,
            status: offer.status
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            code: "SERVER_ERROR"
        });
    }
};


// GET OFFERS (NEW LOGIC)
const getOffersByCustomer = async (req, res) => {

    try {

        const customerId = req.params.id;

        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).json({
                error: "Customer not found",
                code: "CUSTOMER_NOT_FOUND"
            });
        }

        const offers = await Offer.findAll({
            where: { customer_id: customerId }
        });

        const updatedOffers = offers.map(offer => {

            let status = "locked";

            if (customer.cibil_score >= offer.min_cibil_score) {
                status = "active";
            }

            return {
                id: offer.id,
                lender_name: offer.lender_name,
                loan_amount: offer.loan_amount,
                interest_rate: offer.interest_rate,
                tenure_months: offer.tenure_months,
                min_cibil_score: offer.min_cibil_score,
                status: status
            };

        });

        return res.status(200).json({
            customer_id: customer.id,
            cibil_score: customer.cibil_score,
            offers: updatedOffers
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal Server Error",
            code: "SERVER_ERROR"
        });
    }

};

// EMI Calculator
const calculateEMI = async (req, res) => {

    try {

        const offerId = req.params.id;

        const offer = await Offer.findByPk(offerId);

        if (!offer) {
            return res.status(404).json({
                error: "Offer not found",
                code: "OFFER_NOT_FOUND"
            });
        }

        const P = offer.loan_amount;

        // Convert yearly interest to monthly
        const annualRate = offer.interest_rate;
        const r = annualRate / 12 / 100;

        const n = offer.tenure_months;

        const emi =
            (P * r * Math.pow(1 + r, n)) /
            (Math.pow(1 + r, n) - 1);

        const totalPayable = emi * n;

        return res.status(200).json({
            offer_id: offer.id,
            loan_amount: P,
            monthly_emi: parseFloat(emi.toFixed(2)),
            total_payable: parseFloat(totalPayable.toFixed(2))
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error",
            code: "SERVER_ERROR"
        });
    }
};

module.exports = {
    createOffer,
    getOffersByCustomer,
    calculateEMI
};

