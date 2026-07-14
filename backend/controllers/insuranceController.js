import Insurance from "../models/Insurance.js";

// ==========================
// Create Insurance
// ==========================

export const createInsurance = async (req, res) => {

    try {

        const insurance = await Insurance.create({

            user: req.user.id,

            policyName: req.body.policyName,

            type: req.body.type,

            provider: req.body.provider,

            premium: req.body.premium,

            coverage: req.body.coverage,

            startDate: req.body.startDate,

            expiryDate: req.body.expiryDate,

            notes: req.body.notes,

        });

        res.status(201).json(insurance);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get All Insurance
// ==========================

export const getInsurances = async (req, res) => {

    try {

        const insurances = await Insurance.find({

            user: req.user.id,

        }).sort({

            expiryDate: 1,

        });

        res.json(insurances);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get Single Insurance
// ==========================

export const getInsurance = async (req, res) => {

    try {

        const insurance = await Insurance.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!insurance) {

            return res.status(404).json({

                message: "Insurance not found",

            });

        }

        res.json(insurance);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Update Insurance
// ==========================

export const updateInsurance = async (req, res) => {

    try {

        const insurance = await Insurance.findOneAndUpdate(

            {

                _id: req.params.id,

                user: req.user.id,

            },

            req.body,

            {

                new: true,

                runValidators: true,

            }

        );

        if (!insurance) {

            return res.status(404).json({

                message: "Insurance not found",

            });

        }

        res.json(insurance);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Delete Insurance
// ==========================

export const deleteInsurance = async (req, res) => {

    try {

        const insurance = await Insurance.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!insurance) {

            return res.status(404).json({

                message: "Insurance not found",

            });

        }

        res.json({

            message: "Insurance deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};