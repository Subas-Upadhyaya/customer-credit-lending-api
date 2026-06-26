const CreditGap = require("../models/CreditGap");
const Customer = require("../models/Customer");

// Add Credit Gap
const addCreditGap = async (req, res) => {

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
            factor,
            current_value,
            ideal_value,
            impact,
            estimated_score_gain,
            action_description
        } = req.body;

        const creditGap = await CreditGap.create({
            customer_id: customerId,
            factor,
            current_value,
            ideal_value,
            impact,
            estimated_score_gain,
            action_description
        });

        return res.status(201).json({
            id: creditGap.id,
            factor: creditGap.factor,
            status: creditGap.status
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error",
            code: "SERVER_ERROR"
        });

    }

};

// Resolve Credit Gap
const resolveCreditGap = async (req, res) => {

    try {

        const gapId = req.params.id;

        const creditGap = await CreditGap.findByPk(gapId);

        if (!creditGap) {
            return res.status(404).json({
                error: "Credit gap not found",
                code: "CREDIT_GAP_NOT_FOUND"
            });
        }

        creditGap.status = "resolved";
        creditGap.resolved_at = new Date();

        await creditGap.save();

        return res.status(200).json({
            id: creditGap.id,
            factor: creditGap.factor,
            status: creditGap.status,
            resolved_at: creditGap.resolved_at
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
    addCreditGap,
    resolveCreditGap
};