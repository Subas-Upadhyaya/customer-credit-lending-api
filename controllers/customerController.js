const Customer = require("../models/Customer");
const CreditGap = require("../models/CreditGap");

// Create Customer
const createCustomer = async (req, res) => {
  try {
    const { name, mobile, pan } = req.body;

    // Check if all fields are provided
    if (!name || !mobile || !pan) {
      return res.status(400).json({
        error: "All fields are required",
        code: "VALIDATION_ERROR",
      });
    }

    // Mobile Validation
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        error: "Mobile must be exactly 10 digits",
        code: "INVALID_MOBILE",
      });
    }

    // PAN Validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panRegex.test(pan)) {
      return res.status(400).json({
        error: "Invalid PAN format",
        code: "INVALID_PAN",
      });
    }

    // Check duplicate mobile
    const existingCustomer = await Customer.findOne({
      where: { mobile },
    });

    if (existingCustomer) {
      return res.status(409).json({
        error: "Mobile number already exists",
        code: "MOBILE_EXISTS",
      });
    }

    // Create customer
    const customer = await Customer.create({
      name,
      mobile,
      pan,
    });

    return res.status(201).json({
      id: customer.id,
      name: customer.name,
      mobile: customer.mobile,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal Server Error",
      code: "SERVER_ERROR",
    });
  }
};

// Update Credit Score
const updateCreditScore = async (req, res) => {

    try {

        const customerId = req.params.id;

        const { cibil_score } = req.body;

        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).json({
                error: "Customer not found",
                code: "CUSTOMER_NOT_FOUND"
            });
        }

        customer.cibil_score = cibil_score;
        customer.score_fetched_at = new Date();

        await customer.save();

        return res.status(200).json({
            message: "Credit score updated successfully",
            customer_id: customer.id,
            cibil_score: customer.cibil_score,
            score_fetched_at: customer.score_fetched_at
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error",
            code: "SERVER_ERROR"
        });

    }

};

// Get Customer Credit Profile
const getCreditProfile = async (req, res) => {

    try {

        const customerId = req.params.id;

        // Find customer
        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).json({
                error: "Customer not found",
                code: "CUSTOMER_NOT_FOUND"
            });
        }

        // Find all credit gaps of this customer
        const creditGaps = await CreditGap.findAll({
            where: {
                customer_id: customerId
            }
        });

        // Calculate potential score
        let potentialScore = customer.cibil_score || 0;

        let openGaps = 0;
        let resolvedGaps = 0;

        creditGaps.forEach(gap => {

            if (gap.status === "open") {
                openGaps++;
                potentialScore += gap.estimated_score_gain;
            } else {
                resolvedGaps++;
            }

        });

        return res.status(200).json({

            customer_id: customer.id,
            name: customer.name,
            mobile: customer.mobile,
            pan: customer.pan,

            cibil_score: customer.cibil_score,
            score_fetched_at: customer.score_fetched_at,

            potential_score: potentialScore,

            open_gaps: openGaps,
            resolved_gaps: resolvedGaps,

            gaps: creditGaps

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
    createCustomer,
    updateCreditScore,
    getCreditProfile,
};