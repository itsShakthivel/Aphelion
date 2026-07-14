import Investment from "../models/Investment.js";

// ==========================
// Create Investment
// ==========================

export const createInvestment = async (req, res) => {

    try {

        const investment = await Investment.create({

            user: req.user.id,

            name: req.body.name,

            type: req.body.type,

            investedAmount: req.body.investedAmount,

            currentValue: req.body.currentValue,

            purchaseDate: req.body.purchaseDate,

            notes: req.body.notes,

        });

        res.status(201).json(investment);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get All Investments
// ==========================

export const getInvestments = async (req, res) => {

    try {

        const investments = await Investment.find({

            user: req.user.id,

        }).sort({

            purchaseDate: -1,

        });

        res.json(investments);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Get Single Investment
// ==========================

export const getInvestment = async (req, res) => {

    try {

        const investment = await Investment.findOne({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!investment) {

            return res.status(404).json({

                message: "Investment not found",

            });

        }

        res.json(investment);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Update Investment
// ==========================

export const updateInvestment = async (req, res) => {

    try {

        const investment = await Investment.findOneAndUpdate(

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

        if (!investment) {

            return res.status(404).json({

                message: "Investment not found",

            });

        }

        res.json(investment);

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

// ==========================
// Delete Investment
// ==========================

export const deleteInvestment = async (req, res) => {

    try {

        const investment = await Investment.findOneAndDelete({

            _id: req.params.id,

            user: req.user.id,

        });

        if (!investment) {

            return res.status(404).json({

                message: "Investment not found",

            });

        }

        res.json({

            message: "Investment deleted successfully",

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};